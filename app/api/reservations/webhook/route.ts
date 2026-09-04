import { NextResponse } from 'next/server'

import { verifyWebhookSignature } from '@/lib/razorpay'
import { sendNotification } from '@/lib/notify'

export const runtime = 'nodejs'

/**
 * Razorpay webhook — the authoritative record of a payment.
 *
 * The browser can close, lose signal or be closed deliberately between paying
 * and telling us. This is server-to-server, so a booking still lands.
 *
 * The RAW body must be hashed, so it is read as text and only parsed after the
 * signature passes.
 */
export async function POST(request: Request) {
  const signature = request.headers.get('x-razorpay-signature') ?? ''
  const raw = await request.text()

  if (!verifyWebhookSignature(raw, signature)) {
    // 400, not 401: Razorpay retries on 5xx, and a bad signature is not
    // something a retry will fix.
    console.error('[reservations/webhook] bad signature')
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  let event: {
    event?: string
    payload?: { payment?: { entity?: Record<string, unknown> } }
  }
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  if (event.event !== 'payment.captured') {
    // Acknowledge everything else so Razorpay stops retrying.
    return NextResponse.json({ ok: true, ignored: event.event })
  }

  const p = event.payload?.payment?.entity ?? {}
  const notes = (p.notes ?? {}) as Record<string, string>
  const amount = typeof p.amount === 'number' ? p.amount : 0

  const host = request.headers.get('host')
  await sendNotification({
    subject: `PAID (webhook) · ${notes.experience ?? 'Nakshatraalay'} · ${notes.date ?? ''} · ${notes.name ?? ''}`,
    replyTo: typeof p.email === 'string' ? p.email : undefined,
    origin: host ? `https://${host}` : undefined,
    rows: [
      ['Status', 'PAID — captured (webhook)'],
      ['Amount', `₹${(amount / 100).toLocaleString('en-IN')}`],
      ['Experience', notes.experience ?? '—'],
      ['Package', notes.tier ?? '—'],
      ['Date', notes.date ?? '—'],
      ['Guests', notes.guests ?? '—'],
      ['Name', notes.name ?? '—'],
      ['Email', notes.email ?? (typeof p.email === 'string' ? p.email : '—')],
      ['Phone', notes.phone ?? (typeof p.contact === 'string' ? p.contact : '—')],
      ['Gear carried', notes.gear ?? '—'],
      ['Razorpay payment', typeof p.id === 'string' ? p.id : '—'],
      ['Razorpay order', typeof p.order_id === 'string' ? p.order_id : '—'],
    ],
  })

  // Always 200 once handled, so Razorpay does not retry a booking we have.
  return NextResponse.json({ ok: true })
}
