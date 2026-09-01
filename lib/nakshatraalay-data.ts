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
  /** Longer copy for the detail page. */
  description?: string
  /** Null renders "on enquiry" — never a placeholder number. */
  fromPriceLabel: string | null
  durationLabel: string
  /** What the evening actually consists of, in order. */
  runOfNight?: { time: string; title: string; detail: string }[]
  includes?: string[]
  bring?: string[]
  ageGuidance?: string
  skillLevel?: string
  equipmentProvided?: string[]
  /**
   * Group size we plan for. A label, never a live seat count — this site has
   * no booking database and must not imply one.
   */
  groupSizeLabel?: string
  /** Illustrative programming, clearly badged so it reads as a sample. */
  sample: boolean
}

/**
 * A dated night. Configured here rather than generated, so nothing appears on
 * the calendar that has not actually been planned.
 *
 * `date` is ISO (YYYY-MM-DD). Past dates are filtered out at render time, so
 * the calendar shrinks by itself rather than showing stale nights.
 */
export interface ScheduledNight {
  date: string
  experienceSlug: string
  /** Optional note, e.g. 'Perseid peak'. */
  note?: string
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
   * First Light: 15 September 2026.
   *
   * The evening time is set to 18:00 IST because a first night at an
   * astronomy property begins at dusk, not at midnight — change the time here
   * if the opening is meant to land at a different hour.
   */
  opensAt: '2026-09-15T18:00:00+05:30' as string | null,
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
    description:
      'The full weekend night. We start while there is still light in the sky, set up, and work through the evening as objects rise — the Moon if it is up, the planets that are visible, then star clusters and whatever deep sky the conditions allow. You can stay over and carry on until you are done.',
    runOfNight: [
      { time: 'Dusk', title: 'Arrival & setup', detail: 'Settle in, meet the group, and watch the telescopes go up while the light drops.' },
      { time: 'Early evening', title: 'Naked-eye sky tour', detail: 'Learning to actually read the sky — the bright stars, the constellations that anchor the season, and how to find your way around.' },
      { time: 'Evening', title: 'Telescope observation', detail: 'The Moon and visible planets first, while the sky finishes darkening.' },
      { time: 'Night', title: 'Deep sky', detail: 'Star clusters, and nebulae or galaxies where the conditions and the Moon allow.' },
    ],
    includes: ['Guided observation throughout', 'Use of telescopes', 'Sky orientation for beginners'],
    bring: ['Warm layers — it gets colder than you expect', 'A red-light torch if you have one', 'Flat shoes'],
    ageGuidance: 'All ages. Children welcome with an adult.',
    groupSizeLabel: 'Small group',
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
    description:
      'A hands-on introduction to photographing the night sky. We start with what your camera can already do, get you to a real exposure, and work through focus, tracking and stacking — so you leave with an image you took, and the understanding to take the next one alone.',
    runOfNight: [
      { time: 'Evening', title: 'Camera fundamentals', detail: 'Manual mode, ISO, aperture, shutter — and why the night sky breaks the rules you learned in daylight.' },
      { time: 'Dusk', title: 'Focus & framing', detail: 'Getting genuinely sharp stars, which is where most first attempts fall down.' },
      { time: 'Night', title: 'Shooting', detail: 'Wide-field night sky, star trails, and tracked exposures where conditions permit.' },
      { time: 'Late', title: 'Stacking & processing', detail: 'Turning a stack of frames into a single finished image.' },
    ],
    includes: ['Hands-on guidance all night', 'Use of tripods and tracking where available', 'Processing walkthrough'],
    bring: ['A camera with manual mode (DSLR, mirrorless — or ask us)', 'Any lens you own, ideally a fast wide one', 'A tripod if you have one', 'Spare batteries — cold drains them fast'],
    skillLevel: 'Beginner — no prior astrophotography needed',
    equipmentProvided: ['Telescopes', 'Tripods and tracking mounts, subject to availability'],
    groupSizeLabel: 'Small group, so everyone gets hands-on time',
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
    description:
      'A private evening with a telescope and a guide who is there for the two of you — no group, no schedule beyond what the sky is doing. Tell us the occasion and we will build the night around it.',
    includes: ['Private guide for the evening', 'Dedicated telescope time', 'The night paced to you'],
    bring: ['Warm layers', 'Anything you would like set up for the occasion — tell us in advance'],
    groupSizeLabel: 'Private — just your party',
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
    description:
      'An evening built for children who ask a lot of questions. The Moon through a telescope is usually the moment it lands — craters and mountains, sharp enough to feel real — and we take every question seriously, including the hard ones.',
    runOfNight: [
      { time: 'Early evening', title: 'Finding your way', detail: 'The brightest things up tonight, and how to spot them without a telescope.' },
      { time: 'Evening', title: 'The Moon and planets', detail: 'The bit everyone remembers — the Moon at high magnification, and Jupiter or Saturn when they are up.' },
      { time: 'Later', title: 'Questions', detail: 'How far, how old, how do we know. Answered properly.' },
    ],
    includes: ['Guided observation', 'Use of telescopes', 'Astronomy suited to younger explorers'],
    bring: ['Warm layers for everyone', 'Curiosity'],
    ageGuidance: 'Designed for families. Younger children welcome with an adult.',
    groupSizeLabel: 'Small group',
    sample: true,
  },
]

/* ---------------------------------------------------------------------------
 * PACKAGES — the real, confirmed pricing
 *
 * A package is a room (or rooms) WITH the complete astronomy experience
 * included; it is not a room rate with the night sold separately. Prices are
 * per package per night, not per person.
 *
 * WEEKDAY vs WEEKEND is decided by `isWeekendNight()` below — Friday and
 * Saturday nights carry the weekend rate. Change that function if the
 * property treats Sunday as a weekend night too.
 * ------------------------------------------------------------------------- */

export interface StayPackage {
  id: string
  name: string
  occupancyLabel: string
  rooms: number
  guests: number
  /** Whole rupees, per package per night. */
  weekdayPrice: number
  weekendPrice: number
  includes: string[]
}

export const packages: StayPackage[] = [
  {
    id: 'couple',
    name: 'Couple',
    occupancyLabel: '2 guests · 1 room',
    rooms: 1,
    guests: 2,
    weekdayPrice: 8000,
    weekendPrice: 12000,
    includes: [
      'One room for the night',
      'The complete astronomy experience',
      'Guided telescope observation',
    ],
  },
  {
    id: 'family-of-four',
    name: 'Family of four',
    occupancyLabel: '4 guests · 2 rooms',
    rooms: 2,
    guests: 4,
    weekdayPrice: 15000,
    weekendPrice: 20000,
    includes: [
      'Two rooms for the night',
      'The complete astronomy experience',
      'Guided telescope observation',
    ],
  },
]

/** ₹8,000 — Indian grouping, no decimals. */
export function formatINR(rupees: number): string {
  return `₹${rupees.toLocaleString('en-IN')}`
}

/**
 * Friday and Saturday nights carry the weekend rate. `date` is an ISO
 * YYYY-MM-DD string, read in UTC so it does not shift by timezone.
 */
export function isWeekendNight(date: string): boolean {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay()
  return day === 5 || day === 6
}

export function priceFor(pkg: StayPackage, date?: string): number {
  return date && isWeekendNight(date) ? pkg.weekendPrice : pkg.weekdayPrice
}

/* ---------------------------------------------------------------------------
 * MANUALLY CLOSED NIGHTS
 *
 * There is no booking database here, so availability is managed by hand: add
 * an ISO date to this list as a night fills up and it is shown as full
 * everywhere — the sky calendar, and the enquiry wizard's date picker.
 *
 * e.g. closedDates = ['2026-09-19', '2026-09-20']
 * ------------------------------------------------------------------------- */
export const closedDates: string[] = []

export function isClosed(date: string): boolean {
  return closedDates.includes(date)
}

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
 * Policies
 *
 * Astronomy depends on weather. These are written once and shown wherever a
 * booking decision is made, because the honest version of this product says
 * plainly that a clear sky cannot be promised.
 * ------------------------------------------------------------------------- */
export const POLICIES = {
  weather:
    'Observation is always subject to cloud and sky conditions. If the sky closes in we run the session indoors — telescope walkthroughs, astrophotography theory and sky planning — and use every clear window we get. We never promise a specific object on a specific night.',
  cancellation:
    'Tell us as early as you can if your plans change and we will do our best to move you to another night. Exact terms are confirmed when your booking is confirmed on WhatsApp.',
  capacity:
    'Groups are deliberately small so everybody gets real time at the eyepiece. Availability is confirmed by message — this page does not show live seat counts.',
} as const

/* ---------------------------------------------------------------------------
 * Scheduled nights
 *
 * EMPTY BY DESIGN. Add entries as dates are fixed, e.g.
 *   { date: '2026-11-14', experienceSlug: 'saturday-under-the-stars' }
 * The events page and the sky calendar both read this list, and both handle
 * "nothing scheduled yet" as a real state rather than showing invented dates.
 * ------------------------------------------------------------------------- */
export const scheduledNights: ScheduledNight[] = []

/** Upcoming nights only, earliest first. */
export function upcomingNights(from: Date = new Date()): ScheduledNight[] {
  const today = from.toISOString().slice(0, 10)
  return scheduledNights
    .filter((n) => n.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getExperience(slug: string): NakshatraalayExperience | undefined {
  return experiences.find((e) => e.slug === slug)
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
