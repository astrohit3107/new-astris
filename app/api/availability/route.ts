import { NextResponse } from 'next/server'

import { availabilityRange, dateSeries, availabilityLabel } from '@/lib/availability'
import { getExperience, earliestBookableDate } from '@/lib/nakshatraalay-data'

export const runtime = 'nodejs'
/** Seat counts change; never serve a cached one. */
export const dynamic = 'force-dynamic'

/**
 * Seats left, for the booking form's date picker.
 *
 * GET /api/availability?slug=stargazing-experience&days=60
 *
 * Deliberately exposes only counts — never who booked, or anything else in
 * the ledger. The sheet holds guests' names, emails and phone numbers, and
 * none of that has any business being reachable from the browser.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = (searchParams.get('slug') || '').trim()

  const experience = getExperience(slug)
  if (!experience) {
    return NextResponse.json({ error: 'Unknown experience.' }, { status: 404 })
  }

  if (experience.slotsPerNight === null) {
    return NextResponse.json({ ok: true, tracked: false, days: {} })
  }

  const days = Math.min(Math.max(Number.parseInt(searchParams.get('days') || '60', 10) || 60, 1), 120)
  const from = searchParams.get('from') || earliestBookableDate()
  const dates = dateSeries(from, days)

  const map = await availabilityRange(slug, dates)

  return NextResponse.json({
    ok: true,
    tracked: true,
    capacity: experience.slotsPerNight,
    days: Object.fromEntries(
      Object.entries(map).map(([d, a]) => [
        d,
        { state: a.state, remaining: a.remaining, label: availabilityLabel(a) },
      ])
    ),
  })
}
