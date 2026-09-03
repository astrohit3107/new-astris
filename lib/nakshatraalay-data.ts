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
  /**
   * Confirmed pricing. An experience may be sold on more than one basis
   * (double sharing vs single room, or workshop-only vs workshop-with-stay),
   * so price is a list of tiers rather than a single number.
   */
  priceTiers: PriceTier[]
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
  /**
   * True only while a programme is still illustrative. All five current
   * experiences are confirmed — names, itineraries and pricing supplied by
   * the property — so nothing is badged as a sample.
   */
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

/**
 * One way to buy an experience.
 *
 * `perPerson` matters: a workshop bed is priced per head, while a private
 * evening for two is one price for the party. Getting this wrong doubles or
 * halves someone's expected bill, so it is explicit rather than inferred.
 */
export interface PriceTier {
  label: string
  amount: number
  perPerson: boolean
  note?: string
}

/** ₹8,000 — Indian digit grouping, no decimals. */
export function formatINR(rupees: number): string {
  return `₹${rupees.toLocaleString('en-IN')}`
}

/** "₹5,000 per person" / "₹14,000 total". */
export function tierLabel(tier: PriceTier): string {
  return `${formatINR(tier.amount)} ${tier.perPerson ? 'per person' : 'total'}`
}

/** The cheapest way in, for cards and list pages. */
export function fromPrice(exp: NakshatraalayExperience): PriceTier | undefined {
  return [...exp.priceTiers].sort((a, b) => a.amount - b.amount)[0]
}

export const experiences: NakshatraalayExperience[] = [
  {
    slug: 'cosmic-friday',
    kind: 'public_event',
    title: 'Cosmic Friday',
    summary:
      'An evening of guided stargazing — the Moon, whichever planets are up, and a proper tour of the night sky.',
    priceTiers: [
      { label: 'Double sharing room', amount: 5000, perPerson: true },
      { label: 'Single room', amount: 8000, perPerson: true },
    ],
    durationLabel: 'Evening & overnight',
    description:
      'The Friday night. Drive out after work, arrive as the light goes, and spend the evening at the eyepiece — the Moon if it is up, the planets that are visible, and a proper tour of the sky. Everything is included, and you stay the night rather than driving back tired.',
    runOfNight: [
      { time: 'Dusk', title: 'Arrival', detail: 'Get in, settle into your room, and watch the telescopes go up while the light drops.' },
      { time: 'Early evening', title: 'Naked-eye sky tour', detail: 'The bright stars, the constellations that anchor the season, and how to find your way around without any equipment.' },
      { time: 'Evening', title: 'Telescope observation', detail: 'The Moon and visible planets while the sky finishes darkening.' },
      { time: 'Night', title: 'Deep sky', detail: 'Star clusters, and nebulae or galaxies where the Moon and conditions allow.' },
      { time: 'Overnight', title: 'Your room', detail: 'Stay the night — no drive home in the dark.' },
    ],
    includes: [
      'Guided observation throughout the night',
      'Use of telescopes',
      'Sky orientation for beginners',
      'Your room for the night',
    ],
    bring: ['Warm layers — it gets colder than you expect', 'A red-light torch if you have one', 'Flat shoes'],
    ageGuidance: 'All ages. Children welcome with an adult.',
    groupSizeLabel: 'Small group',
    sample: false,
  },
  {
    slug: 'saturday-under-the-stars',
    kind: 'public_event',
    title: 'Saturday Under The Stars',
    summary:
      'The flagship weekend night: telescope observation, deep-sky targets when conditions allow, and the option to stay over.',
    priceTiers: [
      { label: 'Double sharing room', amount: 5000, perPerson: true },
      { label: 'Single room', amount: 8000, perPerson: true },
    ],
    durationLabel: 'Evening & overnight',
    description:
      'The full weekend night. We start while there is still light in the sky, set up, and work through the evening as objects rise — the Moon if it is up, the planets that are visible, then star clusters and whatever deep sky the conditions allow. You can stay over and carry on until you are done.',
    runOfNight: [
      { time: 'Dusk', title: 'Arrival & setup', detail: 'Settle in, meet the group, and watch the telescopes go up while the light drops.' },
      { time: 'Early evening', title: 'Naked-eye sky tour', detail: 'Learning to actually read the sky — the bright stars, the constellations that anchor the season, and how to find your way around.' },
      { time: 'Evening', title: 'Telescope observation', detail: 'The Moon and visible planets first, while the sky finishes darkening.' },
      { time: 'Night', title: 'Deep sky', detail: 'Star clusters, and nebulae or galaxies where the conditions and the Moon allow.' },
    ],
    includes: [
      'Guided observation throughout the night',
      'Use of telescopes',
      'Sky orientation for beginners',
      'Your room for the night',
    ],
    bring: ['Warm layers — it gets colder than you expect', 'A red-light torch if you have one', 'Flat shoes'],
    ageGuidance: 'All ages. Children welcome with an adult.',
    groupSizeLabel: 'Small group',
    sample: false,
  },
  {
    slug: 'astrophotography-workshop',
    kind: 'workshop',
    title: 'Astrophotography Workshop',
    summary:
      'Learn to photograph the night sky from scratch — camera settings, focus, tracking, and a first real image to take home.',
    priceTiers: [
      {
        label: 'Workshop only',
        amount: 12000,
        perPerson: true,
        note: 'No accommodation — join for the sessions and the shooting nights.',
      },
      {
        // Workshop (₹12,000) plus the property's standard nightly room rate.
        label: 'With stay · double sharing',
        amount: 17000,
        perPerson: true,
        note: 'One night at the property, Saturday.',
      },
      {
        label: 'With stay · single occupancy',
        amount: 20000,
        perPerson: true,
        note: 'One night at the property, Saturday.',
      },
    ],
    durationLabel: 'Saturday & Sunday · 1 night',
    description:
      'A weekend of deep-sky imaging, run to the same curriculum as our Delhi Deep-Sky Astrophotography Workshop — acquisition, calibration, stacking and processing, including narrowband technique for shooting through light pollution. You shoot on Saturday night and process on Sunday; once the post-processing is done your time is your own.',
    runOfNight: [
      { time: 'Saturday · Afternoon', title: 'Foundations & equipment', detail: 'What deep-sky imaging actually demands: telescope, mount, camera, filters and guiding — and why light pollution is the problem the whole workflow is built around.' },
      { time: 'Saturday · Evening', title: 'Setup & alignment', detail: 'Polar alignment, focus, framing and guiding — getting the rig genuinely ready before the sky is worth shooting.' },
      { time: 'Saturday · Night', title: 'Full imaging session', detail: 'A complete night of acquisition on a chosen target, plus the calibration frames — light, dark, flat and bias — that the processing depends on.' },
      { time: 'Sunday · Morning', title: 'Stacking & calibration', detail: 'Registration, integration and what each calibration frame removes. Narrowband too: H-alpha, OIII and SII, and why they cut through a city sky.' },
      { time: 'Sunday · Afternoon', title: 'Processing to a finished image', detail: 'Stretching, background extraction, colour mapping and star handling — your own frames through to a finished picture you take home.' },
    ],
    includes: [
      'A full weekend of instruction, with Saturday night on the rig',
      'Use of imaging telescopes, mounts and narrowband filters',
      'Complete acquisition-to-processing workflow',
      'Your own processed deep-sky image to take away',
    ],
    bring: [
      'A camera with manual mode, if you have one — a setup can be shared otherwise',
      'A laptop for the processing sessions',
      'Spare batteries and storage',
      'Warm layers for the nights',
    ],
    skillLevel: 'Beginner to intermediate — no prior astrophotography required',
    equipmentProvided: ['Imaging telescopes and tracking mounts', 'Narrowband filters (H-alpha, OIII, SII)', 'Guiding and acquisition setup'],
    groupSizeLabel: 'Small group, so everyone gets real time on the rig',
    ageGuidance: 'Suited to adults and older teenagers.',
    sample: false,
  },
  {
    slug: 'date-with-the-stars',
    kind: 'private',
    title: 'Date With The Stars',
    summary:
      'A private telescope evening for two, with a guide who stays as long as the sky is worth watching.',
    priceTiers: [
      {
        label: 'For two · one room, one night',
        amount: 14000,
        perPerson: false,
        note: 'The whole experience, including the room, bonfire and dinner.',
      },
    ],
    durationLabel: 'Private evening & overnight',
    description:
      'A private night for two. It starts with your own sky observation session and a guide who is there only for you, moves to a bonfire as the night settles, and ends with dinner under the sky. A room for the night is included.',
    runOfNight: [
      { time: 'Evening', title: 'Private sky observation', detail: 'Your own telescope and a personal guide — the Moon, the planets that are up, and as much deep sky as the night allows. No group, no schedule but yours.' },
      { time: 'Night', title: 'Bonfire', detail: 'The fire goes on once your eyes have had the sky. Warm, quiet, and still under the stars.' },
      { time: 'Later', title: 'Dinner', detail: 'Dinner served under the open sky.' },
      { time: 'Overnight', title: 'Your room', detail: 'A room for the night, so nobody has to drive home afterwards.' },
    ],
    includes: [
      'Private sky observation with a personal guide',
      'Bonfire for the evening',
      'Dinner',
      'One room for the night',
    ],
    bring: ['Warm layers', 'Anything you would like set up for the occasion — tell us in advance'],
    groupSizeLabel: 'Private — for two',
    sample: false,
  },
  {
    slug: 'family-under-the-stars',
    kind: 'family',
    title: 'Family Under The Stars',
    summary:
      'Built for curious kids and the adults they drag along — the Moon through a telescope, and questions taken seriously.',
    priceTiers: [
      {
        label: 'For four · two rooms, one night',
        amount: 20000,
        perPerson: false,
        note: 'Two double-occupancy rooms, and the full evening.',
      },
    ],
    durationLabel: 'Evening & overnight',
    description:
      'The same night as Date With The Stars, built for a family of four: your own sky observation session with a personal guide, then a bonfire, then dinner under the open sky — with two double-occupancy rooms for the night.',
    runOfNight: [
      { time: 'Evening', title: 'Private sky observation', detail: 'Your own telescope and a personal guide. The Moon at high magnification is usually the moment it lands for children — craters sharp enough to feel real.' },
      { time: 'Night', title: 'Bonfire', detail: 'The fire goes on once everyone has had the sky. Questions welcome — how far, how old, how do we know.' },
      { time: 'Later', title: 'Dinner', detail: 'Dinner served under the open sky.' },
      { time: 'Overnight', title: 'Your rooms', detail: 'Two double-occupancy rooms for the night.' },
    ],
    includes: [
      'Private sky observation with a personal guide',
      'Bonfire for the evening',
      'Dinner',
      'Two double-occupancy rooms for the night',
    ],
    bring: ['Warm layers for everyone', 'Curiosity'],
    ageGuidance: 'Designed for families. Younger children welcome with an adult.',
    groupSizeLabel: 'Private — for four',
    sample: false,
  },
]

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
