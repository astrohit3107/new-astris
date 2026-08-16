/**
 * ============================================================================
 *  DELHI DEEP-SKY ASTROPHOTOGRAPHY WORKSHOP · SINGLE SOURCE OF CONTENT
 * ============================================================================
 *
 *  A flagship, technical weekend workshop: photographing deep-sky objects from
 *  heavily light-polluted Delhi using narrowband imaging. Everything on the
 *  page reads from this file — edit copy, dates, sessions, outcomes, FAQ here.
 *
 *  TRAINER & IMAGES are REUSED from the existing Astroventure Astrophotography
 *  (Ladakh) workshop — the same real trainer profile and the same deep-sky /
 *  narrowband photography — so nothing is duplicated or fabricated.
 *
 *  ⚠ MANUAL CONFIG BEFORE LAUNCH: the workshop fee is intentionally shown as
 *  "on enquiry" — set a real amount in `WORKSHOP.feeLabel` when confirmed, and
 *  confirm the trainer name (the repo's existing profile is "Jhankrit Ahuja").
 * ============================================================================
 */

import {
  ASTRO_TRAINER,
  ASTRO_CONTACT,
  ASTRO_IMAGES,
} from './astrophotography-data'

/* Re-export the shared trainer + contact so the page has one import surface. */
export const WORKSHOP_TRAINER = ASTRO_TRAINER
export const WORKSHOP_CONTACT = ASTRO_CONTACT
export const WORKSHOP_IMAGES = ASTRO_IMAGES

/* ---------------------------------------------------------------------------
 * 1. CORE DETAILS
 * ------------------------------------------------------------------------- */
export const WORKSHOP = {
  name: 'Delhi Deep-Sky Astrophotography Workshop',
  shortName: 'Deep-Sky from Delhi',
  headingLead: 'Deep-Sky Astrophotography',
  headingAccent: 'from Delhi',
  subheading:
    'Learn how modern astrophotographers capture nebulae and deep-sky objects even from heavily light-polluted urban skies.',
  positioning: 'A Flagship Narrowband & Deep-Sky Imaging Workshop',
  intro:
    'A hands-on weekend workshop that takes you through the complete deep-sky imaging workflow — sky, equipment, acquisition, calibration, stacking and processing — from one of the most light-polluted skies in the country, using the same narrowband techniques professionals rely on.',

  durationLabel: '2 Days · 2 Nights',
  durationShort: '2D / 2N',
  format: 'Weekend workshop · Saturday night + Sunday night',
  location: 'Delhi',
  locationNote: 'A heavily light-polluted urban sky — that is the point.',
  monthsLabel: 'September & October 2026',
  levelLabel: 'Beginner-friendly · valuable to intermediate imagers',
  groupLabel: 'Limited Small-Group Workshop',

  /** ⚠ No fabricated price — set the real fee here once confirmed. */
  feeLabel: 'On enquiry',
  feeNote: 'Workshop fee is shared on enquiry. Limited seats per weekend.',

  path: '/delhi-deep-sky-astrophotography-workshop',
} as const

/* ---------------------------------------------------------------------------
 * 2. HERO FACT CHIPS
 * ------------------------------------------------------------------------- */
export interface WFact {
  icon: string
  value: string
}

export const workshopHeroFacts: WFact[] = [
  { icon: 'Clock', value: '2 Days · 2 Nights' },
  { icon: 'MapPin', value: 'Delhi (urban sky)' },
  { icon: 'Moon', value: 'September & October 2026' },
  { icon: 'Filter', value: 'Narrowband + DSO Imaging' },
  { icon: 'UsersRound', value: 'Limited Small-Group Workshop' },
]

/* ---------------------------------------------------------------------------
 * 3. CORE PROMISE  (light pollution → narrowband)
 * ------------------------------------------------------------------------- */
export const WORKSHOP_PROMISE_LEAD =
  'Everyone is told the same thing: you cannot photograph the deep sky from a city. This workshop exists to prove the exception — and to teach you exactly how it is done.'

export const WORKSHOP_PROMISE_BODY =
  'Over one weekend you will run a complete deep-sky astrophotography workflow from Delhi — from planning a target and setting up the rig, to capturing narrowband data, calibrating it, stacking it and processing it into a finished image. You will leave understanding not just which buttons to press, but why urban deep-sky imaging works, and how to keep doing it on your own.'

/* ---------------------------------------------------------------------------
 * 4. LEARNING OUTCOMES  (12)
 * ------------------------------------------------------------------------- */
export const workshopOutcomes: string[] = [
  'Why deep-sky imaging is difficult from Delhi',
  'How light pollution affects astronomical imaging',
  'How narrowband imaging overcomes urban light pollution',
  'How to select suitable deep-sky targets',
  'How to plan an imaging session',
  'How to operate the imaging setup',
  'How to capture quality data',
  'How calibration frames work',
  'How stacking improves signal-to-noise',
  'How to process deep-sky data',
  'How to build a complete final astrophotography image',
  'How to continue astrophotography independently afterwards',
]

/* ---------------------------------------------------------------------------
 * 5. NARROWBAND EXPLAINER  (Ha / OIII / SII)
 * ------------------------------------------------------------------------- */
export interface NarrowbandFilter {
  symbol: string
  name: string
  captures: string
  note: string
}

export const narrowbandFilters: NarrowbandFilter[] = [
  {
    symbol: 'Hα',
    name: 'Hydrogen-alpha',
    captures: 'Glowing hydrogen in emission nebulae',
    note: 'A narrow 656nm window that sails through most city light pollution — the backbone of urban deep-sky imaging.',
  },
  {
    symbol: 'OIII',
    name: 'Oxygen-III',
    captures: 'Doubly-ionised oxygen in planetary & emission nebulae',
    note: 'Teal-blue detail in nebulae and supernova remnants, isolated from the broadband glow of the city.',
  },
  {
    symbol: 'SII',
    name: 'Sulphur-II',
    captures: 'Ionised sulphur in emission nebulae',
    note: 'The third narrowband channel, combined with Hα and OIII into the classic SHO “Hubble palette”.',
  },
]

export const WORKSHOP_NARROWBAND_NOTE =
  'City light pollution is broadband — it smears energy across the whole spectrum. Emission nebulae glow at a few precise wavelengths. Narrowband filters accept only those wavelengths and reject nearly everything else, so a nebula can be recorded cleanly from a sky where it is otherwise invisible.'

/* ---------------------------------------------------------------------------
 * 6. THE WORKFLOW  (Sky → … → Final)
 * ------------------------------------------------------------------------- */
export const workshopWorkflow: string[] = [
  'Sky',
  'Equipment',
  'Acquisition',
  'Calibration',
  'Stacking',
  'Processing',
  'Final DSO Image',
]

/* ---------------------------------------------------------------------------
 * 7. CURRICULUM / SESSIONS  (timeline)
 * ------------------------------------------------------------------------- */
export interface WorkshopSession {
  tag: string
  title: string
  points?: string[]
  body?: string
  live?: boolean
}

export interface WorkshopDay {
  day: string
  title: string
  sessions: WorkshopSession[]
}

export const workshopCurriculum: WorkshopDay[] = [
  {
    day: 'Saturday',
    title: 'Understanding, Equipment & Acquisition',
    sessions: [
      {
        tag: 'Session 1',
        title: 'Understanding Astrophotography',
        points: [
          'What astrophotography is',
          'Types of astrophotography',
          'Deep-sky astrophotography',
          'Why Delhi is challenging',
          'Understanding light pollution',
        ],
      },
      {
        tag: 'Session 2',
        title: 'Equipment',
        points: [
          'Telescope',
          'Mount',
          'Camera',
          'Filters & narrowband filters',
          'Guide camera & guiding',
          'Focusing',
          'Accessories',
        ],
      },
      {
        tag: 'Session 3',
        title: 'Narrowband Imaging',
        points: [
          'Hydrogen-alpha (Hα)',
          'Oxygen-III (OIII)',
          'Sulphur-II (SII)',
          'Why narrowband works',
          'When to use each filter',
          'Target selection',
        ],
      },
      {
        tag: 'Session 4',
        title: 'Practical Setup',
        points: [
          'Telescope & mount setup',
          'Alignment & polar alignment',
          'Camera & filter setup',
          'Focusing',
          'Guiding',
          'Acquisition software & workflow',
        ],
      },
      {
        tag: 'Saturday Night',
        title: 'Live Imaging Session',
        live: true,
        body:
          'A real deep-sky acquisition session from Delhi. You follow the actual workflow — framing, focusing, guiding and capturing narrowband subframes — rather than watching slides.',
      },
    ],
  },
  {
    day: 'Sunday',
    title: 'Calibration, Stacking & Processing',
    sessions: [
      {
        tag: 'Session 5',
        title: 'Data Calibration',
        points: [
          'Light frames',
          'Dark frames',
          'Flat frames',
          'Bias / dark-flat concepts',
          'Calibration workflow',
        ],
      },
      {
        tag: 'Session 6',
        title: 'Stacking',
        points: [
          'Registration',
          'Integration',
          'Signal-to-noise improvement',
          'Rejection',
          'Stacking workflow',
        ],
      },
      {
        tag: 'Session 7',
        title: 'Processing',
        points: [
          'Histogram & stretching',
          'Background extraction',
          'Noise reduction',
          'Colour management',
          'Narrowband colour mapping (SHO)',
          'Star & nebula processing',
          'Final composition',
        ],
      },
      {
        tag: 'Session 8',
        title: 'Final Image',
        body:
          'Take the acquired dataset through the complete workflow — Raw Data → Calibrated Data → Stacked Data → Processed Final Image — and walk away with a finished deep-sky photograph made from Delhi.',
      },
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 8. WHO SHOULD JOIN
 * ------------------------------------------------------------------------- */
export const workshopAudience: WFact[] = [
  { icon: 'Telescope', value: 'Amateur astronomers' },
  { icon: 'Camera', value: 'Astrophotographers' },
  { icon: 'Aperture', value: 'DSLR / mirrorless photographers' },
  { icon: 'Orbit', value: 'Telescope owners' },
  { icon: 'Atom', value: 'Physics & astronomy students' },
  { icon: 'GraduationCap', value: 'College astronomy & science clubs' },
  { icon: 'Sprout', value: 'Beginners who want to learn properly' },
  { icon: 'Filter', value: 'Imagers new to narrowband' },
  { icon: 'MapPin', value: 'Hobbyists from Delhi NCR' },
]

/* ---------------------------------------------------------------------------
 * 9. WHAT'S INCLUDED / WHAT TO BRING
 * ------------------------------------------------------------------------- */
export const workshopIncluded: string[] = [
  'Full two-day, two-night workshop with a professional astrophotographer',
  'Live deep-sky acquisition session on real equipment',
  'Complete narrowband imaging instruction (Hα · OIII · SII)',
  'Hands-on calibration, stacking and processing walk-through',
  'A finished deep-sky image built from the workshop dataset',
  'Guidance to continue imaging independently afterwards',
]

export const workshopBring: string[] = [
  'A laptop (for the calibration, stacking & processing sessions)',
  'Your camera and lens, if you own one (not required)',
  'Your telescope / imaging rig, if you have one (not required)',
  'Warm layers for the night sessions',
  'Curiosity and patience — imaging is a slow craft',
]

export const WORKSHOP_EQUIPMENT_NOTE =
  'You do not need to own a telescope, camera or filters to attend — the live imaging session runs on the workshop’s equipment. If you do own gear, bring it and we’ll help you set it up.'

/* ---------------------------------------------------------------------------
 * 10. WORKSHOP DATES  (recurring Sat+Sun weekends, generated from real dates)
 * ------------------------------------------------------------------------- *
 *  Weekends are GENERATED from the real calendar for Sep–Oct 2026 (never
 *  hand-typed weekdays). Extend the window by editing the dates below. Past
 *  weekends drop off automatically.
 * ------------------------------------------------------------------------- */
export const WORKSHOP_SEASON_START = '2026-09-01'
export const WORKSHOP_SEASON_END = '2026-10-31'

export interface WorkshopDate {
  id: string
  /** ISO date of the Saturday. */
  date: string
  /** e.g. '5 – 6 Sep 2026' */
  label: string
  /** e.g. 'September' */
  month: string
}

export function workshopWeekends(
  seasonStart = WORKSHOP_SEASON_START,
  seasonEnd = WORKSHOP_SEASON_END,
): WorkshopDate[] {
  const start = new Date(`${seasonStart}T12:00:00Z`)
  const end = new Date(`${seasonEnd}T12:00:00Z`)
  const now = new Date()
  const cursor = new Date(Math.max(start.getTime(), now.getTime()))
  cursor.setUTCHours(12, 0, 0, 0)
  // Advance to the next Saturday (UTC day 6).
  while (cursor.getUTCDay() !== 6) cursor.setUTCDate(cursor.getUTCDate() + 1)

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })

  const out: WorkshopDate[] = []
  while (cursor.getTime() <= end.getTime()) {
    const sat = new Date(cursor)
    const sun = new Date(cursor)
    sun.setUTCDate(sun.getUTCDate() + 1)
    const iso = sat.toISOString().slice(0, 10)
    out.push({
      id: `ws-${iso}`,
      date: iso,
      label: `${fmt(sat)} – ${fmt(sun)} ${sun.getUTCFullYear()}`,
      month: sat.toLocaleDateString('en-IN', { month: 'long', timeZone: 'UTC' }),
    })
    cursor.setUTCDate(cursor.getUTCDate() + 7)
  }
  return out
}

/* ---------------------------------------------------------------------------
 * 11. FAQ
 * ------------------------------------------------------------------------- */
export const workshopFaqs: { question: string; answer: string }[] = [
  {
    question: 'Do I need my own camera?',
    answer:
      'No. The live imaging session runs on the workshop’s equipment, so you can attend without owning a camera. If you do own a DSLR or mirrorless camera, bring it — we’ll help you understand how it fits into a deep-sky workflow.',
  },
  {
    question: 'Do I need a telescope?',
    answer:
      'No. You do not need to own a telescope or any imaging gear. Everything needed for the live acquisition session is provided. If you have a telescope or imaging rig, feel free to bring it.',
  },
  {
    question: 'Is this suitable for beginners?',
    answer:
      'Yes. The workshop is beginner-friendly and starts from first principles — what astrophotography is, why cities are hard, and how narrowband solves it. It is also genuinely valuable to intermediate photographers who want to understand narrowband and deep-sky processing properly.',
  },
  {
    question: 'What is narrowband astrophotography?',
    answer:
      'Narrowband imaging uses filters that pass only a few precise wavelengths of light — hydrogen-alpha (Hα), oxygen-III (OIII) and sulphur-II (SII) — where emission nebulae glow. Because it rejects the broadband glow of city light pollution, it lets you record nebulae cleanly from skies where they are otherwise washed out.',
  },
  {
    question: 'Can deep-sky objects really be photographed from Delhi?',
    answer:
      'Yes — that is the entire point of the workshop. Delhi’s sky is heavily light-polluted, but narrowband imaging isolates the wavelengths nebulae emit at, so emission objects can be captured and processed into finished images even from the city. We show you the technique end to end.',
  },
  {
    question: 'Will we capture actual data — and process it?',
    answer:
      'Yes to both. Saturday night is a real, live deep-sky acquisition session, and on Sunday you take that dataset through calibration, stacking and processing to a finished image. You experience the full workflow, not just slides.',
  },
  {
    question: 'Is this hands-on?',
    answer:
      'Very. You participate in the setup, the live imaging and the processing. The goal is that you leave able to plan, capture and process a deep-sky image on your own.',
  },
  {
    question: 'Who is the trainer?',
    answer:
      'The workshop is led by the same professional astrophotographer who runs our Astroventure Astrophotography expedition — a specialist in deep-sky imaging, narrowband and night-sky processing, with a patient, hands-on teaching style suited to beginners and intermediates alike.',
  },
  {
    question: 'Is prior astronomy knowledge required?',
    answer:
      'No prior astronomy or astrophotography knowledge is required. Curiosity and a willingness to work through a technical, slow craft are all you need.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Bring a laptop for the processing sessions, warm layers for the night work, and — optionally — your own camera or telescope if you own one. A full joining checklist is shared on booking.',
  },
]
