import { NextResponse } from 'next/server'

import { verifyWebhookSignature, fetchOrder } from '@/lib/cashfree'
import { sendNotification } from '@/lib/notify'
import { appendBooking, readBookings } from '@/lib/sheets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Cashfree's own account of what happened — the path home when the guest's
 * browser dies between paying and confirming.
 *
 * The raw body is read BEFORE anything parses it, because Cashfree signs the
 * exact bytes it sent. Re-serialising parsed JSON produces a different string
 * and every signature check would fail.
 *
 * Cashfree signs `timestamp + rawBody` with HMAC-SHA256, base64 encoded.
 */
export async function POST(request: Request) {
  const raw = await request.text()
  const signature = request.headers.get('x-webhook-signature') ?? ''
  const timestamp = request.headers.get('x-webhook-timestamp') ?? ''

  if (!verifyWebhookSignature({ rawBody: raw, timestamp, signature })) {
    // 400, not 500: this delivery is not worth retrying.
    console.error('[webhook] bad signature')
    return NextResponse.json({ error: 'bad signature' }, { status: 400 })
  }

  let event: {
    type?: string
    data?: {
      order?: { order_id?: string; order_amount?: number; order_tags?: Record<string, string> }
      payment?: { cf_payment_id?: string | number; payment_status?: string; payment_group?: string }
      customer_details?: { customer_name?: string; customer_email?: string; customer_phone?: string }
    }
  }
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: true, ignored: 'unparseable' })
  }

  const type = event.type ?? ''
  if (!/PAYMENT_SUCCESS/i.test(type)) {
    // Everything else is acknowledged so Cashfree stops retrying it.
    return NextResponse.json({ ok: true, ignored: type })
  }

  const orderId = event.data?.order?.order_id
  if (!orderId) return NextResponse.json({ ok: true, ignored: 'no order id' })

  // Has the browser already recorded this? The ledger is the check, because
  // there is no database to hold a "seen" flag.
  const rows = await readBookings()
  if (rows?.some((r) => r.bookingId === orderId)) {
    return NextResponse.json({ ok: true, duplicate: true })
  }

  // Trust our own read of the order, not the webhook body.
  const order = await fetchOrder(orderId)
  if (!order || order.status !== 'PAID') {
    return NextResponse.json({ ok: true, ignored: 'not paid on fetch' })
  }

  const t = order.tags
  const guests = Number.parseInt(t.guests || '1', 10) || 1
  const bookedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const paymentId = String(event.data?.payment?.cf_payment_id ?? orderId)

  const ledger = await appendBooking({
    bookingId: orderId,
    bookedAt: `${bookedAt} IST`,
    status: 'CONFIRMED',
    experience: t.experience || '',
    experienceSlug: t.slug || '',
    packageLabel: t.tier || '',
    date: t.date || '',
    guests,
    name: t.name || event.data?.customer_details?.customer_name || '',
    email: event.data?.customer_details?.customer_email || '',
    phone: t.phone || event.data?.customer_details?.customer_phone || '',
    amount: `₹${order.amountRupees.toLocaleString('en-IN')}`,
    paymentId,
    gear: '',
    notes: '',
    source: 'Webhook (browser did not return)',
  })

  await sendNotification({
    subject: `PAID via webhook · ${t.experience || 'booking'} · ${t.date || ''}`,
    rows: [
      ['Status', 'PAID — recorded by webhook, the guest never came back to the site'],
      ['In the sheet', ledger.ok ? 'Yes' : `NO — ADD IT BY HAND (${ledger.reason ?? 'unknown'})`],
      ['Guest emailed', 'NO — the browser never confirmed, so no email was sent. Contact them.'],
      ['Experience', t.experience || '—'],
      ['Package', t.tier || '—'],
      ['Date', t.date || '—'],
      ['Guests', String(guests)],
      ['Name', t.name || '—'],
      ['Phone', t.phone || '—'],
      ['Amount', `₹${order.amountRupees.toLocaleString('en-IN')}`],
      ['Cashfree order', orderId],
      ['Cashfree payment', paymentId],
      ['Recorded at', `${bookedAt} IST`],
    ],
  })

  return NextResponse.json({ ok: true, recorded: ledger.ok })
}
