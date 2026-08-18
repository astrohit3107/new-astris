/**
 * ============================================================================
 *  ASTROTRAIN — ASTRONOMY EXPERIENCES FOR PROPERTIES
 * ============================================================================
 *  Single source of content for the homepage teaser and the /astrotrain page.
 *
 *  FACTUAL BASIS — carried over from what the site already stated about
 *  AstroTrain: complete installation (telescope setup and calibration),
 *  staff training, curated guest sessions, and ongoing maintenance and
 *  operations support for resorts and hotels. Commercial claims that appeared
 *  previously (starting price, ROI timeline, resort counts, satisfaction
 *  percentages) are intentionally NOT reproduced here — they were unverified
 *  and read as sales filler. Nothing below invents partnerships or numbers.
 * ========================================================================== */

export const ASTROTRAIN = {
  name: 'AstroTrain',
  positioning: 'Astronomy experiences, built into your property',
  /** One-line summary used on the homepage teaser. */
  teaser:
    'We equip your property, train your team and set up the sessions — so stargazing becomes something your guests remember, run by your own staff.',
  heroTitle: 'Turn the night sky into your guest experience',
  heroLead:
    'Properties with dark skies are sitting on an asset most never use. AstroTrain turns it into a running experience — professional telescopes installed and calibrated, your staff trained to lead sessions, and the operational know-how to keep it going after we leave.',
  path: '/astrotrain',
  image: '/programs/astrotrain-resort.jpeg',
  imageAlt: 'Guests observing through a Dobsonian telescope at night at a resort',
} as const

/* --- The opportunity ------------------------------------------------------ */
export const ASTROTRAIN_OPPORTUNITY = {
  eyebrow: 'The opportunity',
  title: 'Your darkest asset is the one above the property.',
  body: [
    'Guests who travel out of the city arrive under a sky they cannot see at home — and most properties leave that entirely unused. The evening ends at dinner.',
    'A properly run astronomy session changes the shape of the night. It gives guests a reason to stay outside, a story to take home, and gives the property something genuinely distinctive that competitors cannot copy by buying furniture.',
  ],
} as const

/* --- What AstroTrain does ------------------------------------------------- */
export interface AstroTrainCapability {
  title: string
  description: string
  icon: string
}

export const ASTROTRAIN_CAPABILITIES: AstroTrainCapability[] = [
  {
    title: 'Astronomy Equipment',
    description:
      'Professional telescopes specified for your site, installed and calibrated so they work on night one.',
    icon: 'Telescope',
  },
  {
    title: 'Staff Training',
    description:
      'Structured astronomy training for your team, so sessions are led in-house rather than depending on a visiting expert.',
    icon: 'Users',
  },
  {
    title: 'Astronomy Knowledge',
    description:
      'The underlying sky knowledge — what to show, when it is visible, and how to explain it well to a mixed audience.',
    icon: 'BookOpen',
  },
  {
    title: 'Stargazing Operations',
    description:
      'How a session actually runs: scheduling around the Moon and season, group handling, setup and pack-down.',
    icon: 'Compass',
  },
  {
    title: 'Guest Experience',
    description:
      'Curated sessions designed as part of the property’s evening, not a piece of equipment left on a lawn.',
    icon: 'Sparkles',
  },
  {
    title: 'Ongoing Support',
    description:
      'Continuing maintenance and operational support so the programme holds up over seasons.',
    icon: 'LifeBuoy',
  },
]

/* --- How it works --------------------------------------------------------- */
export interface AstroTrainStep {
  step: string
  title: string
  description: string
}

export const ASTROTRAIN_PROCESS: AstroTrainStep[] = [
  {
    step: '01',
    title: 'Understand the property',
    description:
      'We look at your site, sky conditions, guest profile and how the evening currently runs, then decide what the experience should be.',
  },
  {
    step: '02',
    title: 'Build the astronomy setup',
    description:
      'Equipment is specified for the location, installed and calibrated, with a workable observing spot chosen on the property.',
  },
  {
    step: '03',
    title: 'Train the team',
    description:
      'Your staff learn to operate the equipment, find objects and lead a session confidently for guests.',
  },
  {
    step: '04',
    title: 'Launch the experience',
    description:
      'The session goes live as part of the property’s offering, with the format and flow already worked out.',
  },
  {
    step: '05',
    title: 'Support & evolve',
    description:
      'Ongoing maintenance and operational support, with the programme adjusted as seasons and skies change.',
  },
]

/* --- The guest experience ------------------------------------------------- */
export const ASTROTRAIN_EXPERIENCE: { title: string; description: string }[] = [
  {
    title: 'A session, not a spectacle',
    description:
      'Guests are guided through the sky — what is up tonight, why it is there, and what they are looking at — before the eyepiece.',
  },
  {
    title: 'Real optics',
    description:
      'Professional telescopes show the Moon’s terminator, Saturn’s rings and Jupiter’s moons with the detail that makes people go quiet.',
  },
  {
    title: 'Led by your own team',
    description:
      'Because your staff run it, the experience is available on your schedule, not only when a specialist is on site.',
  },
]

/* --- Honest note about conditions ---------------------------------------- */
export const ASTROTRAIN_CONDITIONS_NOTE =
  'Observation always depends on weather, cloud cover and the lunar cycle. Training covers how to plan around them and what to run when the sky does not cooperate.'

/* --- SEO ------------------------------------------------------------------ */
export const ASTROTRAIN_SEO = {
  title: 'AstroTrain — Build an Astronomy Experience at Your Property | Astris Space',
  description:
    'AstroTrain equips resorts and hotels with professional telescopes, trains your team to lead stargazing sessions, and supports the programme long-term — turning dark skies into a guest experience your staff can run.',
  path: '/astrotrain',
} as const
