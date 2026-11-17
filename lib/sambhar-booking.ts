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

export const SAMBHAR_RATES: PriceTier[] = []

export const SAMBHAR_BRING = [
  'Warm layers — desert nights get cold in winter',
  'Comfortable shoes for the morning walk',
  'A head-torch, red light if you have one',
  'Any personal medication',
]

export const SAMBHAR_INCLUDES = [
  'Accommodation for Saturday night',
  'Dinner on Saturday',
  'Four to five hours of guided stargazing',
  'A short morning hike nearby',
  'Breakfast on Sunday',
]
