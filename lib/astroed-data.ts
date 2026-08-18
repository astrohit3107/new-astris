/**
 * ============================================================================
 *  ASTROED — SPACE LAB + ASTRONOMY CURRICULUM FOR SCHOOLS
 * ============================================================================
 *  Single source of content for the homepage teaser and the /astroed page.
 *
 *  FACTUAL BASIS — every capability below is carried over from what the site
 *  already stated about AstroEd (telescope & solar observation, model
 *  rocketry/physics STEM, ISRO-aligned space-science modules, VR solar-system
 *  experiences, Grades 4–12, trained educators, professional equipment,
 *  CBSE/ICSE/state boards) plus the ISRO Space Tutor affiliation already shown
 *  in `why-astris`. Nothing here invents statistics, pricing, outcomes,
 *  partnerships or named schools.
 * ========================================================================== */

export const ASTROED = {
  name: 'AstroEd',
  positioning: 'Space Lab + Astronomy Curriculum for Schools',
  /** One-line summary used on the homepage teaser. */
  teaser:
    'A permanent Space Lab and a year-long astronomy curriculum, built into the school — so students learn to read the sky, not just glance at it.',
  heroLead:
    'AstroEd puts a working Space Lab inside your school and wraps a structured, year-long astronomy curriculum around it. Students move from their first look through a telescope to understanding what they are actually seeing — across Grades 4 to 12, guided by trained astronomy educators using professional equipment.',
  heroSupport:
    'It is built for schools that want astronomy to be part of the academic year, not a single assembly-hall event.',
  path: '/astroed',
  image: '/programs/astroed-students.jpeg',
  imageAlt: 'School students taking part in a hands-on astronomy session',
} as const

/* --- The idea ------------------------------------------------------------- */
export const ASTROED_IDEA = {
  eyebrow: 'The idea',
  title: 'A telescope is a moment. Understanding the sky is an education.',
  body: [
    'Most schools meet astronomy once — a visiting telescope, a crowded queue, a few seconds at the eyepiece, and it is over. Students remember the novelty, not the science.',
    'AstroEd is built the other way round. The equipment stays. The curriculum runs through the year. Observation is tied to what students are learning in class, so the night sky becomes a place they can navigate rather than a photograph they were shown.',
  ],
} as const

/* --- What schools get ----------------------------------------------------- */
export interface AstroEdOffering {
  title: string
  description: string
  icon: string
}

export const ASTROED_OFFERINGS: AstroEdOffering[] = [
  {
    title: 'Space Lab',
    description:
      'A dedicated astronomy space inside the school, equipped for observation and hands-on work — the physical home of the programme.',
    icon: 'Building2',
  },
  {
    title: 'Yearly Astronomy Curriculum',
    description:
      'A structured programme that runs across the academic year for Grades 4–12, building from fundamentals to independent projects.',
    icon: 'BookOpen',
  },
  {
    title: 'Telescope & Observation',
    description:
      'Guided night-sky and safe solar observation using professional telescopes, so students see the real object, not a textbook diagram.',
    icon: 'Telescope',
  },
  {
    title: 'Hands-on Activities',
    description:
      'Model rocketry and physics-led STEM activities that turn abstract concepts into something students build and test.',
    icon: 'Rocket',
  },
  {
    title: 'Space Science Modules',
    description:
      'Space-science modules aligned to the ISRO curriculum, delivered as part of the school year.',
    icon: 'Orbit',
  },
  {
    title: 'Immersive Experiences',
    description:
      'VR journeys through the solar system for the scales and distances a classroom cannot otherwise convey.',
    icon: 'Sparkles',
  },
  {
    title: 'Faculty Enablement',
    description:
      'Sessions are delivered by trained astronomy educators, working alongside your science faculty.',
    icon: 'GraduationCap',
  },
]

/* --- Curriculum progression ----------------------------------------------
 * Deliberately expressed as a progression of stages, not as invented lesson
 * plans or module counts — the detailed syllabus is shared with the school
 * during planning.                                                          */
export interface CurriculumStage {
  stage: string
  title: string
  description: string
}

export const ASTROED_CURRICULUM: CurriculumStage[] = [
  {
    stage: '01',
    title: 'Foundation',
    description:
      'Getting oriented: scale, motion, day and night, seasons — the mental model everything else rests on.',
  },
  {
    stage: '02',
    title: 'Observation',
    description:
      'Reading the sky by eye and through a telescope. Constellations, the Moon, and how to actually find something.',
  },
  {
    stage: '03',
    title: 'Solar System',
    description:
      'The planets, the Sun observed safely, and the mechanics that hold the system together.',
  },
  {
    stage: '04',
    title: 'Deep Sky',
    description:
      'Beyond the solar system — star clusters, nebulae and galaxies, and what their light tells us.',
  },
  {
    stage: '05',
    title: 'Space Science',
    description:
      'Rocketry, spaceflight and mission science, connected to ISRO-aligned space-science modules.',
  },
  {
    stage: '06',
    title: 'Projects',
    description:
      'Students run their own observation and science projects — the point the programme has been building towards.',
  },
]

/* --- Student experience --------------------------------------------------- */
export const ASTROED_EXPERIENCE: { title: string; description: string }[] = [
  {
    title: 'They find it themselves',
    description:
      'Students are taught to locate an object and point the telescope at it, rather than queueing for a view someone else set up.',
  },
  {
    title: 'They build and test',
    description:
      'Model rocketry and physics activities put the theory in their hands, with an outcome they can measure.',
  },
  {
    title: 'They observe the Sun safely',
    description:
      'Daytime solar observation with proper equipment makes astronomy possible within the school timetable.',
  },
  {
    title: 'They keep going',
    description:
      'Because the lab and the curriculum stay in the school, interest has somewhere to go after the first session.',
  },
]

/* --- Outcomes (capability-based, deliberately not numeric) ---------------- */
export const ASTROED_OUTCOMES: string[] = [
  'Students can orient themselves in the night sky and locate objects without help',
  'Practical familiarity with telescopes and safe solar observation',
  'Physics and space-science concepts anchored to something students have seen and built',
  'A visible, year-round astronomy programme the school owns',
  'Science faculty supported by trained astronomy educators',
]

/* --- SEO ------------------------------------------------------------------ */
export const ASTROED_SEO = {
  title: 'AstroEd — Space Lab & Astronomy Curriculum for Schools | Astris Space',
  description:
    'AstroEd builds a Space Lab inside your school and runs a year-long astronomy curriculum for Grades 4–12 — telescope and solar observation, model rocketry, ISRO-aligned space science and student projects, led by trained astronomy educators.',
  path: '/astroed',
} as const
