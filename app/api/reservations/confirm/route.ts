import { NextResponse } from 'next/server'
import { z } from 'zod'

import { reservationSchema, quoteFor, dateProblem } from '@/lib/reservations'
import { verifyPaymentSignature, fetchPayment, isRazorpayConfigured } from '@/lib/razorpay'
import { sendNotification, sendCustomerConfirmation } from '@/lib/notify'
import { getExperience, MAPS } from '@/lib/nakshatraalay-data'
import { SITE_URL } from '@/lib/site-config'

export const runtime = 'nodejs'

/**
 * Step 2: the browser reports a successful Checkout. Confirm it properly.
 *
 * Two independent checks, because a client can post anything:
 *   1. the HMAC signature over `order_id|payment_id`
 *   2. the payment fetched straight from Razorpay, which must be captured or
 *      authorised AND match the amount we priced
 *
 * Only then is the booking emailed. The webhook is the belt to this braces —
 * if the browser dies after paying, the webhook still records the booking.
 */

const schema = reservationSchema.extend({
  razorpayOrderId: z.string().trim().min(4).max(64),
  razorpayPaymentId: z.string().trim().min(4).max(64),
  razorpaySignature: z.string().trim().min(16).max(256),
})

export async function POST(request: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json({ error: 'Payments are not configured.' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid confirmation.' }, { status: 422 })
  }
  const d = parsed.data

  const signatureOk = verifyPaymentSignature({
    orderId: d.razorpayOrderId,
    paymentId: d.razorpayPaymentId,
    signature: d.razorpaySignature,
  })
  if (!signatureOk) {
    console.error('[reservations] signature mismatch', { order: d.razorpayOrderId })
    return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 })
  }

  const quote = quoteFor(d)
  if (!quote) return NextResponse.json({ error: 'Unknown booking option.' }, { status: 400 })

  // Ask Razorpay directly rather than trusting the signature alone: it also
  // tells us the payment actually carries the amount we expected.
  const payment = await fetchPayment(d.razorpayPaymentId)
  if (!payment || payment.order_id !== d.razorpayOrderId) {
    return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 })
  }
  if (!['captured', 'authorized'].includes(payment.status)) {
    return NextResponse.json({ error: `Payment is ${payment.status}.` }, { status: 400 })
  }
  if (payment.amount !== quote.amountPaise) {
    console.error('[reservations] amount mismatch', {
      expected: quote.amountPaise,
      got: payment.amount,
    })
    return NextResponse.json({ error: 'Payment amount did not match.' }, { status: 400 })
  }

  const host = request.headers.get('host')
  const origin = request.headers.get('origin') || (host ? `https://${host}` : undefined)

  // Confirm to the guest and record it for ourselves. Both are attempted even
  // if one fails: the guest's confirmation and our booking record are separate
  // obligations, and neither is a reason to skip the other.
  const experience = getExperience(d.experienceSlug)
  const customer = await sendCustomerConfirmation({
    to: d.email,
    firstName: d.fullName.trim().split(/\s+/)[0] || 'there',
    experienceTitle: quote.experienceTitle,
    tierLabel: quote.tier.label,
    date: d.date,
    guests: d.guests,
    amountLabel: quote.amountLabel,
    breakdown: quote.breakdown,
    paymentId: d.razorpayPaymentId,
    bring: experience?.bring,
    souvenir: experience?.includes?.some((i) => /souvenir|print/i.test(i)) ?? false,
    directionsUrl: MAPS.directionsUrl,
    siteUrl: SITE_URL,
  })
  if (!customer.sent) {
    console.error('[reservations] guest confirmation NOT sent', {
      payment: d.razorpayPaymentId,
      email: d.email,
      reason: customer.reason,
    })
  }

  const result = await sendNotification({
    subject: `PAID · ${quote.experienceTitle} · ${d.date} · ${d.fullName}`,
    replyTo: d.email,
    origin,
    rows: [
      ['Status', `PAID (${payment.status})`],
      [
        'Guest emailed',
        customer.sent
          ? 'Yes — confirmation delivered'
          : `NO — CONTACT THEM (${customer.reason ?? 'unknown'})`,
      ],
      ['Amount', `${quote.amountLabel} — ${quote.breakdown}`],
      ['Experience', quote.experienceTitle],
      ['Package', quote.tier.label],
      ['Date', d.date],
      ['Guests', String(d.guests)],
      ['Name', d.fullName],
      ['Email', d.email],
      ['Phone', d.phone],
      ['Gear carried', d.gear.length ? d.gear.join(', ') : '—'],
      ['Gear notes', d.gearNotes || '—'],
      ['Notes', d.notes || '—'],
      ['Razorpay payment', d.razorpayPaymentId],
      ['Razorpay order', d.razorpayOrderId],
      ['Method', payment.method ?? '—'],
      ['Confirmed at', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
    ],
  })

  // The payment is real either way — never tell a paying customer it failed.
  // A delivery failure is ours to chase, and the webhook is the second path.
  if (!result.sent) {
    console.error('[reservations] PAID but notification failed', {
      payment: d.razorpayPaymentId,
      reason: result.reason,
    })
  }

  return NextResponse.json({
    ok: true,
    paymentId: d.razorpayPaymentId,
    amountLabel: quote.amountLabel,
    notified: result.sent,
    // The form tells the guest to expect an email only when one actually went.
    emailed: customer.sent,
  })
}
