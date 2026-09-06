import { NextResponse } from 'next/server'
import { z } from 'zod'

import { reservationSchema, quoteFor } from '@/lib/reservations'
import {
  fetchOrder,
  fetchOrderPayments,
  isCashfreeConfigured,
  bookingHash,
} from '@/lib/cashfree'
import { sendNotification, sendCustomerConfirmation } from '@/lib/notify'
import { appendBooking } from '@/lib/sheets'
import { getExperience, MAPS } from '@/lib/nakshatraalay-data'
import { availabilityFor } from '@/lib/availability'
import { SITE_URL } from '@/lib/site-config'

export const runtime = 'nodejs'

/**
 * Step 2: the browser says checkout finished. Establish whether it actually did.
 *
 * The browser is not evidence. Cashfree's SDK resolves without a signature —
 * its own bundle says "Payment finished. Check status." — so everything here
 * is decided by asking Cashfree directly:
 *
 *   1. the order must come back PAID
 *   2. its amount must equal the amount we priced, to the paisa
 *   3. its booking_hash tag must match the booking being claimed, so a
 *      stranger's paid order cannot be used to confirm a different booking
 *
 * Only then is the booking written to the ledger and confirmed to the guest.
 */

const schema = reservationSchema.extend({
  orderId: z.string().trim().min(4).max(64),
})

export async function POST(request: Request) {
  if (!isCashfreeConfigured()) {
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

  const quote = quoteFor(d)
  if (!quote) return NextResponse.json({ error: 'Unknown booking option.' }, { status: 400 })

  const order = await fetchOrder(d.orderId)
  if (!order) {
    return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 })
  }

  if (order.status !== 'PAID') {
    return NextResponse.json(
      { error: `Payment is not complete (${order.status || 'unknown'}).` },
      { status: 400 }
    )
  }

  // Compare in paise. Cashfree reports rupees as a float, and floats should
  // never decide whether someone paid enough.
  if (Math.round(order.amountRupees * 100) !== quote.amountPaise) {
    console.error('[reservations] amount mismatch', {
      expected: quote.amountPaise,
      got: Math.round(order.amountRupees * 100),
      order: d.orderId,
    })
    return NextResponse.json({ error: 'Payment amount did not match.' }, { status: 400 })
  }

  // Bind the payment to this exact booking. Without this, any paid order id
  // could be replayed against different booking details.
  const expectedHash = bookingHash({
    experienceSlug: d.experienceSlug,
    tierLabel: d.tierLabel,
    date: d.date,
    guests: d.guests,
    email: d.email,
    amountPaise: quote.amountPaise,
  })
  if (order.tags.booking_hash !== expectedHash) {
    console.error('[reservations] booking hash mismatch', { order: d.orderId })
    return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 })
  }

  const payments = await fetchOrderPayments(d.orderId)
  const successful = payments.find((p) => p.status === 'SUCCESS')
  const paymentId = successful?.paymentId || d.orderId
  const method = successful?.method || '—'

  const host = request.headers.get('host')
  const origin = request.headers.get('origin') || (host ? `https://${host}` : undefined)
  const experience = getExperience(d.experienceSlug)
  const bookedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  /* ---- the ledger ------------------------------------------------------ *
   * Written first, because it is what availability is counted from. If this
   * fails the booking is still real — it is flagged hard so it can be added
   * by hand before the night is oversold.                                   */
  const ledger = await appendBooking({
    bookingId: d.orderId,
    bookedAt: `${bookedAt} IST`,
    status: 'CONFIRMED',
    experience: quote.experienceTitle,
    experienceSlug: d.experienceSlug,
    packageLabel: quote.tier.label,
    date: d.date,
    guests: d.guests,
    name: d.fullName,
    email: d.email,
    phone: d.phone,
    amount: quote.amountLabel,
    paymentId,
    gear: d.gear.length ? d.gear.join(', ') : '',
    notes: [d.gearNotes, d.notes].filter(Boolean).join(' — '),
    source: 'Website',
  })
  if (!ledger.ok) {
    console.error('[reservations] PAID but NOT written to the sheet', {
      order: d.orderId,
      reason: ledger.reason,
    })
  }

  /* ---- the guest ------------------------------------------------------- */
  const customer = await sendCustomerConfirmation({
    to: d.email,
    firstName: d.fullName.trim().split(/\s+/)[0] || 'there',
    experienceTitle: quote.experienceTitle,
    tierLabel: quote.tier.label,
    date: d.date,
    guests: d.guests,
    amountLabel: quote.amountLabel,
    breakdown: quote.breakdown,
    paymentId,
    bring: experience?.bring,
    souvenir: experience?.includes?.some((i) => /souvenir|print/i.test(i)) ?? false,
    directionsUrl: MAPS.directionsUrl,
    siteUrl: SITE_URL,
  })
  if (!customer.sent) {
    console.error('[reservations] guest confirmation NOT sent', {
      order: d.orderId,
      email: d.email,
      reason: customer.reason,
    })
  }

  /* ---- us -------------------------------------------------------------- */
  const after = await availabilityFor(d.experienceSlug, d.date)
  const result = await sendNotification({
    subject: `PAID · ${quote.experienceTitle} · ${d.date} · ${d.fullName}`,
    replyTo: d.email,
    origin,
    rows: [
      ['Status', 'PAID (Cashfree)'],
      ['In the sheet', ledger.ok ? 'Yes' : `NO — ADD IT BY HAND (${ledger.reason ?? 'unknown'})`],
      [
        'Guest emailed',
        customer.sent
          ? 'Yes — confirmation delivered'
          : `NO — CONTACT THEM (${customer.reason ?? 'unknown'})`,
      ],
      [
        'Seats left after this',
        after.remaining === null ? 'Not tracked / unknown' : `${after.remaining} of ${after.capacity}`,
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
      ['Cashfree order', d.orderId],
      ['Cashfree payment', paymentId],
      ['Method', method],
      ['Confirmed at', `${bookedAt} IST`],
    ],
  })
  if (!result.sent) {
    console.error('[reservations] PAID but notification failed', {
      order: d.orderId,
      reason: result.reason,
    })
  }

  return NextResponse.json({
    ok: true,
    paymentId,
    amountLabel: quote.amountLabel,
    notified: result.sent,
    recorded: ledger.ok,
    // The form promises an email only when one actually went.
    emailed: customer.sent,
  })
}
