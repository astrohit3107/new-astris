/**
 * Everything that can be booked and paid for on the site, in one shape.
 *
 * The payment flow used to read Nakshatraalay's catalogue directly. Sambhar is
 * now sold the same way, so pricing, dates, capacity and confirmation emails
 * all look things up here instead. Client-safe: plain data, no server imports.
 */

import { NAKSHATRAALAY, experiences, getExperience, MAPS, type PriceTier } from '@/lib/nakshatraalay-data'
import { SAMBHAR_RATES, SAMBHAR_BRING, SAMBHAR_INCLUDES } from '@/lib/sambhar-booking'

export interface Bookable {
  slug: string
  title: string
  /** Where it happens — used in emails and receipts. */
  venue: string
  priceTiers: PriceTier[]
  /** Seats per night across the experience; null when capacity is per room or untracked. */
  slotsPerNight: number | null
  /** Can money be taken right now? */
  open: boolean
  /** Shown instead of the form when `open` is false. */
  closedMessage: string
  /** Only Saturdays can be booked. */
  saturdaysOnly: boolean
  bring?: string[]
  includes?: string[]
  /** Directions link for the confirmation email, when the venue has one. */
  directionsUrl?: string
}

export const SAMBHAR_SLUG = 'sambhar-lake'

function sambhar(): Bookable {
  return {
    slug: SAMBHAR_SLUG,
    title: 'Sambhar Lake — Saturday Night Stargazing',
    venue: 'Sambhar Lake, Rajasthan',
    priceTiers: SAMBHAR_RATES,
    slotsPerNight: null,
    open: SAMBHAR_RATES.length > 0,
    closedMessage:
      'Rates for each room type are being finalised. Message us to hold a Saturday and we will confirm the price.',
    saturdaysOnly: true,
    bring: SAMBHAR_BRING,
    includes: SAMBHAR_INCLUDES,
    // The exact property location is shared with guests after booking.
    directionsUrl: undefined,
  }
}

export function getBookable(slug: string): Bookable | undefined {
  if (slug === SAMBHAR_SLUG) return sambhar()
  const e = getExperience(slug)
  if (!e) return undefined
  return {
    slug: e.slug,
    title: e.title,
    venue: NAKSHATRAALAY.name,
    priceTiers: e.priceTiers,
    slotsPerNight: e.slotsPerNight,
    open: NAKSHATRAALAY.bookingsOpen,
    closedMessage: 'Nakshatraalay is closed while we move to a new location. Bookings will reopen soon.',
    saturdaysOnly: false,
    bring: e.bring,
    includes: e.includes,
    directionsUrl: NAKSHATRAALAY.bookingsOpen ? MAPS.directionsUrl : undefined,
  }
}

export function allBookables(): Bookable[] {
  return [sambhar(), ...experiences.map((e) => getBookable(e.slug)!)]
}
