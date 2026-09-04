import { NextResponse } from 'next/server'

import { reservationSchema, quoteFor } from '@/lib/reservations'
import { createOrder, isRazorpayConfigured, razorpayKeyId } from '@/lib/razorpay'

export const runtime = 'nodejs'

/**
 * Step 1 of a reservation: price it here, then open a Razorpay order.
 *
 * The amount is computed from our catalogue, never taken from the request.
 */

const WINDOW_MS = 60_000
const MAX = 8
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  return recent.length > MAX
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Please wait a minute.' }, { status: 429 })
  }

  if (!isRazorpayConfigured()) {
    console.error('[reservations] Razorpay keys are not configured')
    return NextResponse.json(
      { error: 'Online payment is not available right now. Please contact us to book.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = reservationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form.' },
      { status: 422 }
    )
  }
  const data = parsed.data

  // Honeypot: accept silently so a bot learns nothing, but charge nothing.
  if (data.company) return NextResponse.json({ ok: true, skipped: true })

  const quote = quoteFor(data)
  if (!quote) {
    return NextResponse.json({ error: 'That option is no longer available.' }, { status: 400 })
  }

  try {
    const order = await createOrder({
      amountPaise: quote.amountPaise,
      receipt: `nk-${data.experienceSlug.slice(0, 14)}-${Date.now().toString(36)}`,
      // Notes ride along to the Razorpay dashboard, so a payment there can be
      // matched to a booking even if our confirmation email were to fail.
      notes: {
        experience: quote.experienceTitle,
        tier: quote.tier.label,
        date: data.date,
        guests: String(data.guests),
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        ...(data.gear.length ? { gear: data.gear.join(', ').slice(0, 480) } : {}),
      },
    })

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId(),
      quote: {
        amountLabel: quote.amountLabel,
        breakdown: quote.breakdown,
        experienceTitle: quote.experienceTitle,
        tierLabel: quote.tier.label,
      },
    })
  } catch (error) {
    console.error('[reservations] order creation failed', error)
    return NextResponse.json(
      { error: 'We could not start the payment. Please try again shortly.' },
      { status: 502 }
    )
  }
}
