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

  /**
   * Honeypot. Deliberately NOT length-limited: a `max(0)` here made zod reject
   * the whole request before the honeypot branch could run, so a real customer
   * whose browser autofilled it saw a raw validation error instead of paying.
   * It is now accepted by the schema and judged explicitly by the route.
   *
   * The name is meaningless on purpose. It was called `company`, with a
   * matching <label>Company</label>, and Chrome's autofill fills such a field
   * from the saved address profile regardless of autocomplete="off".
   */
  refCode: z.string().max(200).optional().or(z.literal('')),
})

/**
 * Human-readable validation message, keyed by field.
 *
 * Zod's own text ("String must contain at most 0 character(s)") is written for
 * developers and must never reach a customer.
 */
export function friendlyIssue(issue: { path: PropertyKey[]; message: string }): string {
  const field = String(issue.path[0] ?? '')
  const byField: Record<string, string> = {
    date: 'Please choose a date.',
    fullName: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number.',
    guests: 'Please choose how many guests are coming.',
    tierLabel: 'Please choose a package.',
    experienceSlug: 'Something went wrong loading this experience. Please refresh the page.',
    gear: 'Please re-select your equipment.',
    gearNotes: 'Your equipment note is too long — please shorten it.',
    notes: 'Your note is too long — please shorten it.',
  }
  return byField[field] ?? 'Please check the form and try again.'
}

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
