/**
 * ============================================================================
 *  SAMBHAR LAKE — SATURDAY STAY RATES
 * ============================================================================
 *
 *  One night, every Saturday: dinner, 4–5 hours of stargazing, the stay, a
 *  morning hike and breakfast. Return travel is not included.
 *
 *  RATES ARE PENDING. The owner is sending the accommodation types and
 *  rates, with the instruction to DOUBLE every rate supplied. Enter the
 *  DOUBLED figure in `amount` — what the guest pays — and note the supplied
 *  figure beside it, so the doubling is visible rather than buried in a
 *  multiplier somewhere.
 *
 *  While this list is empty Sambhar cannot be paid for: the booking form shows
 *  an enquiry panel and the order API refuses. No rate, no charge.
 *
 *  Shape of an entry (per room, two to a room, six such rooms):
 *    { label: 'Mud-walled room', amount: 2 * X, perPerson: false,
 *      occupancy: 2, rooms: 6, note: 'Supplied ₹X, doubled.' }
 * ============================================================================
 */

import type { PriceTier } from '@/lib/nakshatraalay-data'

/**
 * Rates received 17 Nov 2026 as the property's tariff by meal plan (EP / CP /
 * MAP). The package includes dinner and breakfast, so MAP is the only plan
 * that matches it; EP and CP are not offered. Every figure is the supplied
 * MAP rate DOUBLED, per the owner's instruction, priced per room.
 */
export const SAMBHAR_RATES: PriceTier[] = [
  { label: 'Room · double occupancy', amount: 10000, perPerson: false, occupancy: 2,
    note: '₹5,000 per person, two sharing a room. (Supplied MAP ₹5,000, doubled.)' },
  { label: 'Room · single occupancy', amount: 8400, perPerson: false, occupancy: 1,
    note: 'A room to yourself. (Supplied MAP ₹4,200, doubled.)' },
  { label: 'Tent · double occupancy', amount: 8000, perPerson: false, occupancy: 2,
    note: '₹4,000 per person, two sharing a tent. (Supplied MAP ₹4,000, doubled.)' },
  { label: 'Tent · single occupancy', amount: 7000, perPerson: false, occupancy: 1,
    note: 'A tent to yourself. (Supplied MAP ₹3,500, doubled.)' },
]

/** Cheapest per-person price, for "from" labels. */
export const SAMBHAR_FROM_PER_PERSON = 4000

/** As supplied by the property. */
export const SAMBHAR_MENU = [
  { meal: 'Evening hi-tea', items: ['Tea & coffee', 'Sandwich', 'Pakoda'] },
  { meal: 'Dinner', items: ['Paneer lababdar', 'Aloo gobhi', 'Dal tadka', 'Rice', 'Tawa chapati', 'Green salad', 'Achar', 'Sweet'] },
  { meal: 'Breakfast', items: ['Poha', 'Poori suji', 'Boiled egg', 'Bread toast', 'Tea & coffee'] },
]

export const SAMBHAR_BRING = [
  'Warm layers — desert nights get cold in winter',
  'Comfortable shoes for the morning walk',
  'A head-torch, red light if you have one',
  'Any personal medication',
]

export const SAMBHAR_INCLUDES = [
  'Accommodation for Saturday night',
  'Evening hi-tea on arrival',
  'Dinner on Saturday',
  'Four to five hours of guided stargazing',
  'A short morning hike nearby',
  'Breakfast on Sunday',
]
