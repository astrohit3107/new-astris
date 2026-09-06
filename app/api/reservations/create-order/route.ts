import { NextResponse } from 'next/server'

import { reservationSchema, quoteFor, friendlyIssue, dateProblem } from '@/lib/reservations'
import { createOrder, isCashfreeConfigured, bookingHash, cashfreeEnv } from '@/lib/cashfree'
import { availabilityFor, canAccept, availabilityLabel } from '@/lib/availability'
import { SITE_URL } from '@/lib/site-config'

export const runtime = 'nodejs'

/**
 * Step 1 of a reservation: price it here, check there is room, open an order.
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

  if (!isCashfreeConfigured()) {
    console.error('[reservations] Cashfree is not configured (need APP_ID, SECRET_KEY and ENV)')
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
      { error: parsed.error.issues[0] ? friendlyIssue(parsed.error.issues[0]) : 'Please check the form.' },
      { status: 422 }
    )
  }
  const data = parsed.data

  // Honeypot: answer 200 so a bot learns nothing from the status code, but
  // open no order. Logged loudly, because a false positive here costs a real
  // booking and the client deliberately does NOT show success for it.
  if (data.refCode) {
    console.error('[reservations] honeypot tripped', { ip, email: data.email })
    return NextResponse.json({ ok: true, skipped: true })
  }

  // Refuse the date before pricing it: no order should exist for a night we
  // cannot honour.
  const badDate = dateProblem(data.date)
  if (badDate) return NextResponse.json({ error: badDate }, { status: 400 })

  const quote = quoteFor(data)
  if (!quote) {
    return NextResponse.json({ error: 'That option is no longer available.' }, { status: 400 })
  }

  // Is there room? `unknown` (the ledger could not be read) is permissive —
  // see lib/availability. A spreadsheet outage must not stop every sale, but
  // it is recorded on the booking so a human can check it.
  const availability = await availabilityFor(data.experienceSlug, data.date)
  if (!canAccept(availability, data.guests)) {
    return NextResponse.json(
      {
        error:
          availability.state === 'full'
            ? `That night is fully booked. ${availabilityLabel(availability)}.`
            : availabilityLabel(availability),
        soldOut: true,
      },
      { status: 409 }
    )
  }

  const orderId = `nk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`

  try {
    const order = await createOrder({
      amountPaise: quote.amountPaise,
      orderId,
      customer: {
        // Cashfree wants a stable customer id; the phone is what we have.
        id: `g_${data.phone.replace(/\D/g, '').slice(-10)}`,
        name: data.fullName,
        email: data.email,
        phone: data.phone,
      },
      returnUrl: `${SITE_URL}/experiences/${data.experienceSlug}?order={order_id}`,
      notifyUrl: `${SITE_URL}/api/reservations/webhook`,
      // These ride along to the Cashfree dashboard, so a payment there can be
      // matched to a booking even if everything else failed.
      tags: {
        booking_hash: bookingHash({
          experienceSlug: data.experienceSlug,
          tierLabel: data.tierLabel,
          date: data.date,
          guests: data.guests,
          email: data.email,
          amountPaise: quote.amountPaise,
        }),
        experience: quote.experienceTitle,
        slug: data.experienceSlug,
        tier: quote.tier.label,
        date: data.date,
        guests: String(data.guests),
        name: data.fullName,
        phone: data.phone,
        availability: availability.state,
      },
    })

    return NextResponse.json({
      ok: true,
      orderId: order.orderId,
      paymentSessionId: order.paymentSessionId,
      mode: cashfreeEnv(),
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
