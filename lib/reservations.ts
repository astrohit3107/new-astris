import { z } from 'zod'

import { experiences, getExperience, formatINR, type PriceTier } from '@/lib/nakshatraalay-data'

/**
 * Reservations for Nakshatraalay Gurgaon.
 *
 * THE PRICE IS NEVER SENT BY THE CLIENT.
 * The browser tells us *what* was chosen — experience, tier, how many people.
 * `quoteFor()` then recomputes the amount from the catalogue on the server.
 * If it accepted an amount, anyone could pay ₹1 for a ₹20,000 workshop by
 * editing one request.
 */

/** Gear list shown only for the astrophotography workshop. */
export const GEAR_OPTIONS = [
  'DSLR / mirrorless camera',
  'Wide-angle lens',
  'Telephoto lens',
  'Tripod',
  'Star tracker',
  'Intervalometer / remote shutter',
  'Laptop for processing',
  'Nothing — I’ll use your equipment',
] as const

/** Experiences whose booking asks about equipment. */
export const GEAR_EXPERIENCES = new Set(['astrophotography-workshop'])

export const reservationSchema = z.object({
  experienceSlug: z.string().trim().min(1).max(80),
  /** Must match a tier label on that experience. */
  tierLabel: z.string().trim().min(1).max(120),
  guests: z.coerce.number().int().min(1).max(30),
  /** ISO date, YYYY-MM-DD. */
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a date'),

  fullName: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(160),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),

  gear: z.array(z.enum(GEAR_OPTIONS)).max(GEAR_OPTIONS.length).default([]),
  gearNotes: z.string().trim().max(500).optional().or(z.literal('')),
  notes: z.string().trim().max(800).optional().or(z.literal('')),

  /** Honeypot — real people leave it empty. */
  company: z.string().max(0).optional().or(z.literal('')),
})

export type ReservationInput = z.infer<typeof reservationSchema>

export interface Quote {
  experienceTitle: string
  tier: PriceTier
  guests: number
  /** Whole rupees. */
  amount: number
  amountPaise: number
  amountLabel: string
  breakdown: string
}

/**
 * Recompute the price from the catalogue. Returns null when the experience or
 * tier does not exist, which is treated as a rejected request rather than a
 * zero-rupee booking.
 */
export function quoteFor(input: {
  experienceSlug: string
  tierLabel: string
  guests: number
}): Quote | null {
  const experience = getExperience(input.experienceSlug)
  if (!experience) return null

  const tier = experience.priceTiers.find((t) => t.label === input.tierLabel)
  if (!tier) return null

  // A per-person tier scales with the party; a whole-party tier does not, and
  // must not be multiplied by the guest count.
  const amount = tier.perPerson ? tier.amount * input.guests : tier.amount
  const breakdown = tier.perPerson
    ? `${formatINR(tier.amount)} × ${input.guests} guest${input.guests === 1 ? '' : 's'}`
    : `${formatINR(tier.amount)} for the party`

  return {
    experienceTitle: experience.title,
    tier,
    guests: input.guests,
    amount,
    amountPaise: Math.round(amount * 100),
    amountLabel: formatINR(amount),
    breakdown,
  }
}

/** Experiences that can be booked and paid for online. */
export const bookableExperiences = experiences

export function asksForGear(slug: string): boolean {
  return GEAR_EXPERIENCES.has(slug)
}
