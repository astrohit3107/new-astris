/**
 * ============================================================================
 *  NAKSHATRAALAY GURGAON — SINGLE SOURCE OF CONTENT
 * ============================================================================
 *  Everything the destination and First Light pages render reads from here:
 *  copy, experiences, stay types, campaign state and the WhatsApp enquiry
 *  intents. Edit this file and both pages update — no component changes.
 *
 *  BOOKINGS GO TO WHATSAPP
 *  -----------------------
 *  There is no payment gateway and no booking database on this site, and this
 *  file does not pretend otherwise. Every booking action opens WhatsApp on the
 *  official Astris number with the experience, and where relevant the chosen
 *  date, already written into the message — so an enquiry arrives with context
 *  instead of "hi".
 *
 *  NOTHING HERE IS INVENTED
 *  ------------------------
 *  Anything the business has not confirmed is null or flagged, never guessed:
 *  `opensAt: null` renders "date to be announced" rather than a fake
 *  countdown, and sample experiences carry no prices and are badged as
 *  samples. Fill these in as they are decided.
 * ========================================================================== */

import { whatsappHref } from '@/lib/site-config'

export interface NakshatraalayExperience {
  slug: string
  kind: 'public_event' | 'workshop' | 'private' | 'family'
  title: string
  summary: string
  /** Null renders "on enquiry" — never a placeholder number. */
  fromPriceLabel: string | null
  durationLabel: string
  /** Illustrative programming, clearly badged so it reads as a sample. */
  sample: boolean
}

export interface StayType {
  name: string
  description: string
  /** Approximate, as briefed. */
  countLabel: string
}

export const NAKSHATRAALAY = {
  brand: 'Nakshatraalay',
  slug: 'gurgaon',
  name: 'Nakshatraalay Gurgaon',
  shortName: 'Gurgaon',
  city: 'Gurgaon',
  region: 'Delhi NCR',
  tagline: 'Delhi NCR, look up.',
  positioning: 'Delhi NCR’s gateway to the universe.',

  /** Centre of Gurgaon — the exact site is not public yet. Used only to
   *  describe the Moon tonight, which is accurate to within a few km. */
  latitude: 28.4595,
  longitude: 77.0266,

  intro:
    'Close enough for a Saturday. Far enough that the sky comes back. A place to spend a night with real telescopes, a dark horizon, and people who know what they are pointing at.',

  /**
   * When First Light happens. NULL until the business commits to a date.
   * Set to an ISO string with offset, e.g. '2026-11-15T18:30:00+05:30'.
   */
  opensAt: null as string | null,
  status: 'announced' as 'announced' | 'open',

  roomsPlanned: 5,
  tentsExpandable: true,
} as const

export const experiences: NakshatraalayExperience[] = [
  {
    slug: 'cosmic-friday',
    kind: 'public_event',
    title: 'Cosmic Friday',
    summary:
      'An evening of guided stargazing — the Moon, whichever planets are up, and a proper tour of the night sky.',
    fromPriceLabel: null,
    durationLabel: 'Evening',
    sample: true,
  },
  {
    slug: 'saturday-under-the-stars',
    kind: 'public_event',
    title: 'Saturday Under The Stars',
    summary:
      'The flagship weekend night: telescope observation, deep-sky targets when conditions allow, and the option to stay over.',
    fromPriceLabel: null,
    durationLabel: 'Evening into night',
    sample: true,
  },
  {
    slug: 'beginner-astrophotography-workshop',
    kind: 'workshop',
    title: 'Beginner Astrophotography Workshop',
    summary:
      'Learn to photograph the night sky from scratch — camera settings, focus, tracking, and a first real image to take home.',
    fromPriceLabel: null,
    durationLabel: 'One night',
    sample: true,
  },
  {
    slug: 'date-with-the-universe',
    kind: 'private',
    title: 'Date With The Universe',
    summary:
      'A private telescope evening for two, with a guide who stays as long as the sky is worth watching.',
    fromPriceLabel: null,
    durationLabel: 'Private evening',
    sample: true,
  },
  {
    slug: 'family-under-the-stars',
    kind: 'family',
    title: 'Family Under The Stars',
    summary:
      'Built for curious kids and the adults they drag along — the Moon through a telescope, and questions taken seriously.',
    fromPriceLabel: null,
    durationLabel: 'Evening',
    sample: true,
  },
]

export const stayTypes: StayType[] = [
  {
    name: 'Rooms',
    description:
      'A small number of rooms on site, so the night stays quiet and everybody gets real time at the eyepiece.',
    countLabel: 'Up to 5 rooms',
  },
  {
    name: 'Tents',
    description:
      'Tented stays that scale up for the bigger nights — a meteor shower draws a different crowd to an ordinary weekend.',
    countLabel: 'Expandable',
  },
]

export const EXPERIENCE_KIND_LABEL: Record<NakshatraalayExperience['kind'], string> = {
  public_event: 'Public night',
  workshop: 'Workshop',
  private: 'Private',
  family: 'Family',
}

/* ---------------------------------------------------------------------------
 * WhatsApp enquiry intents
 * ------------------------------------------------------------------------- */

/** General booking enquiry for the destination. */
export const bookHref = whatsappHref(
  `Hello Astris Space — I'd like to book a night at ${NAKSHATRAALAY.name}. Could you share available dates and details?`,
)

/** Enquiry for one specific experience, with its name already filled in. */
export function experienceHref(experience: NakshatraalayExperience): string {
  return whatsappHref(
    `Hello Astris Space — I'm interested in "${experience.title}" at ${NAKSHATRAALAY.name}. Could you share upcoming dates and pricing?`,
  )
}

/** Waitlist enquiry, used as the instant alternative to the form. */
export const firstLightHref = whatsappHref(
  `Hello Astris Space — please add me to the ${NAKSHATRAALAY.brand} First Light list for ${NAKSHATRAALAY.city}. I'd like to hear when it opens.`,
)

/** Group / corporate / school enquiries. */
export const groupHref = whatsappHref(
  `Hello Astris Space — I'd like to plan a group astronomy experience at ${NAKSHATRAALAY.name}.\n\nOrganisation:\nGroup size:\nPreferred date:`,
)
