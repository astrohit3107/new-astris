/**
 * ============================================================================
 *  AVAILABILITY
 * ============================================================================
 *
 *  How many seats are left on a given night, counted from the Google Sheet.
 *
 *  Three states, and the third is the one that matters:
 *
 *    'open'    — we read the ledger and there is room
 *    'full'    — we read the ledger and there is not
 *    'unknown' — we could NOT read the ledger
 *
 *  'unknown' is never collapsed into 'open'. A spreadsheet outage must not
 *  quietly present a sold-out night as available, and it must not silently
 *  stop all sales either, so the two decisions are made separately:
 *  the page shows nothing rather than a wrong number, and the payment path
 *  lets the booking through while shouting about it in the booking record.
 * ============================================================================
 */

import { isClosed, roomsNeeded } from '@/lib/nakshatraalay-data'
import { getBookable } from '@/lib/bookables'
import { readBookings, type BookingRow } from '@/lib/sheets'

export type AvailabilityState = 'open' | 'full' | 'unknown' | 'closed' | 'untracked'

export interface Availability {
  /** What is being counted: seats (guests) or rooms of one type. */
  unit: 'guests' | 'rooms'
  state: AvailabilityState
  /** Total seats for the night. Null when the experience is not sold by seat. */
  capacity: number | null
  /** Seats already taken. Null when unknown. */
  booked: number | null
  /** Seats left. Null when unknown or untracked. */
  remaining: number | null
}

/** A row counts against capacity unless it has been cancelled. */
function counts(row: BookingRow): boolean {
  return row.status !== 'CANCELLED'
}

/**
 * Seats taken for one experience on one date.
 *
 * Matching is deliberately forgiving on the slug: rows added by hand get
 * typed by a person, and "Stargazing Experience" should count the same as
 * "stargazing-experience".
 */
function bookedFor(rows: BookingRow[], slug: string, date: string): number {
  const wanted = slug.toLowerCase()
  return rows
    .filter((r) => counts(r) && r.date === date)
    .filter((r) => {
      const s = r.experienceSlug.toLowerCase().trim()
      return s === wanted || s.replace(/\s+/g, '-') === wanted
    })
    .reduce((sum, r) => sum + (r.guests > 0 ? r.guests : 1), 0)
}

export function availabilityFrom(
  rows: BookingRow[] | null,
  slug: string,
  date: string,
  tierLabel?: string
): Availability {
  const bookable = getBookable(slug)
  const tier = tierLabel ? bookable?.priceTiers.find((t) => t.label === tierLabel) : undefined

  // Room-priced stays (Sambhar) are limited by rooms of each type, not seats.
  // Every booking of this type on this date uses the rooms its party needs.
  if (tier?.rooms) {
    const capacity = tier.rooms
    if (rows === null) return { unit: 'rooms', state: 'unknown', capacity, booked: null, remaining: null }
    const booked = rows
      .filter((r) => counts(r) && r.date === date && r.packageLabel.trim() === tier.label)
      .filter((r) => r.experienceSlug.toLowerCase().trim().replace(/\s+/g, '-') === slug)
      .reduce((sum, r) => sum + (roomsNeeded(tier, r.guests > 0 ? r.guests : 1) ?? 1), 0)
    const remaining = Math.max(0, capacity - booked)
    return { unit: 'rooms', state: remaining > 0 ? 'open' : 'full', capacity, booked, remaining }
  }

  const capacity = bookable?.slotsPerNight ?? null

  // Sold as a whole night to one group — a seat counter says nothing useful.
  if (capacity === null) {
    return { unit: 'guests', state: 'untracked', capacity: null, booked: null, remaining: null }
  }

  // A night we have manually closed is closed regardless of the ledger.
  if (isClosed(date)) {
    return { unit: 'guests', state: 'closed', capacity, booked: null, remaining: 0 }
  }

  if (rows === null) {
    return { unit: 'guests', state: 'unknown', capacity, booked: null, remaining: null }
  }

  const booked = bookedFor(rows, slug, date)
  const remaining = Math.max(0, capacity - booked)
  return { unit: 'guests', state: remaining > 0 ? 'open' : 'full', capacity, booked, remaining }
}

/** Availability for one experience (and, for room-priced stays, one room type). */
export async function availabilityFor(slug: string, date: string, tierLabel?: string): Promise<Availability> {
  return availabilityFrom(await readBookings(), slug, date, tierLabel)
}

/** Availability for one experience across a run of dates, on a single read. */
export async function availabilityRange(
  slug: string,
  dates: string[]
): Promise<Record<string, Availability>> {
  const rows = await readBookings()
  const out: Record<string, Availability> = {}
  for (const d of dates) out[d] = availabilityFrom(rows, slug, d)
  return out
}

/** Consecutive ISO dates, starting at `from`. */
export function dateSeries(from: string, days: number): string[] {
  const start = new Date(`${from}T00:00:00+05:30`)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start.getTime() + i * 86_400_000)
    return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  })
}

/** Wording for a seat count, kept in one place so it never contradicts itself. */
export function availabilityLabel(a: Availability, guests = 1): string {
  switch (a.state) {
    case 'untracked':
      return 'Booked as a whole night for your group'
    case 'closed':
      return 'Not available — this night is closed'
    case 'unknown':
      return 'Availability is confirmed when you book'
    case 'full':
      return 'Fully booked'
    case 'open':
      if (a.remaining === null) return 'Available'
      if (a.unit === 'rooms') return `${a.remaining} of ${a.capacity} room${a.capacity === 1 ? '' : 's'} left`
      if (a.remaining <= 3) return `Only ${a.remaining} of ${a.capacity} left`
      return `${a.remaining} of ${a.capacity} places left`
  }
}

/**
 * Can this booking still be taken? `need` is guests, or rooms when the
 * availability counts rooms. `unknown` is permissive by design.
 */
export function canAccept(a: Availability, need: number): boolean {
  if (a.state === 'closed' || a.state === 'full') return false
  if (a.state === 'untracked' || a.state === 'unknown') return true
  return (a.remaining ?? 0) >= need
}
