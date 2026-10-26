import { NextResponse } from 'next/server'

import { reservationSchema, quoteFor, friendlyIssue, dateProblem } from '@/lib/reservations'
import { availabilityFor, canAccept, availabilityLabel } from '@/lib/availability'
import { appendRegistration, newRegistrationId } from '@/lib/registrations'
import { sendNotification } from '@/lib/notify'

export const runtime = 'nodejs'

/**
 * Register for a Nakshatraalay night without paying online.
 *
 * The registration goes to the registrations sheet and to the team inbox; the
 * guest then pays by UPI or bank transfer. As with the paid flow, the amount
 * is priced here from the catalogue and never taken from the request.
 *
 * Success means at least one of the sheet or the email took it. Only when
 * both fail does the guest see an error — telling someone they are registered
 * when nobody will ever see it is the one outcome this must not produce.
 */

const WINDOW_MS = 60_000
const MAX = 6
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

  const body = await request.json().catch(() => null)
  const parsed = reservationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0] ? friendlyIssue(parsed.error.issues[0]) : 'Please check the form.' },
      { status: 422 }
    )
  }
  const data = parsed.data

  // Honeypot — same handling as the paid flow: 200 with nothing recorded,
  // and the client shows no success for it.
  if (data.refCode) {
    console.error('[registrations] honeypot tripped', { ip, email: data.email })
    return NextResponse.json({ ok: true, skipped: true })
  }

  const badDate = dateProblem(data.date)
  if (badDate) return NextResponse.json({ error: badDate }, { status: 400 })

  const quote = quoteFor(data)
  if (!quote) {
    return NextResponse.json({ error: 'That option is no longer available.' }, { status: 400 })
  }

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

  const registrationId = newRegistrationId()
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const notes = [
    data.gear.length ? `Gear: ${data.gear.join(', ')}` : '',
    data.gearNotes ? `Gear notes: ${data.gearNotes}` : '',
    data.notes ?? '',
  ]
    .filter(Boolean)
    .join(' | ')

  const [sheet, email] = await Promise.all([
    appendRegistration({
      registrationId,
      submittedAt,
      experience: quote.experienceTitle,
      experienceSlug: data.experienceSlug,
      packageLabel: quote.tier.label,
      date: data.date,
      guests: data.guests,
      amountDue: `${quote.amountLabel} (${quote.breakdown})`,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      notes,
      source: 'website',
    }),
    sendNotification({
      subject: `New registration ${registrationId} — ${quote.experienceTitle}, ${data.date}`,
      fromName: 'Nakshatraalay registrations',
      replyTo: data.email,
      origin: request.headers.get('origin') || new URL(request.url).origin,
      rows: [
        ['Registration ID', registrationId],
        ['Payment status', 'PENDING — guest pays by UPI / bank transfer'],
        ['Experience', quote.experienceTitle],
        ['Package', quote.tier.label],
        ['Date', data.date],
        ['Guests', String(data.guests)],
        ['Amount due', `${quote.amountLabel} (${quote.breakdown})`],
        ['Name', data.fullName],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Notes', notes || '—'],
        ['Submitted', `${submittedAt} IST`],
      ],
    }),
  ])

  if (!sheet.ok) console.error('[registrations] sheet write failed', registrationId, sheet.reason)
  if (!email.sent) console.error('[registrations] email failed', registrationId, email.reason)

  if (!sheet.ok && !email.sent) {
    // Keep the lead in the logs so it can still be recovered by hand.
    console.error('[registrations] LOST LEAD', JSON.stringify({ registrationId, ...data, refCode: undefined }))
    return NextResponse.json(
      { error: 'We could not save your registration just now. Please message us on WhatsApp.' },
      { status: 502 }
    )
  }

  return NextResponse.json({
    ok: true,
    registrationId,
    amount: quote.amount,
    amountLabel: quote.amountLabel,
    breakdown: quote.breakdown,
    experienceTitle: quote.experienceTitle,
  })
}
