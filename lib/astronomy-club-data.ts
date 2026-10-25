/**
 * ============================================================================
 *  ASTRIS ASTRONOMY CLUB — PAGE CONTENT
 * ============================================================================
 *  Every fact, number and line on /astronomy-club lives here, carried over
 *  verbatim from the club proposal brief. Nothing is invented: no partner
 *  schools, no testimonials, no outcome results (the KPIs are TARGETS and are
 *  labelled as such on the page), and no internal kit costs.
 *
 *  Anything still waiting on a decision is marked TODO(Rohit).
 * ========================================================================== */

import { CONTACT } from '@/lib/site-config'

export const CLUB_PATH = '/astronomy-club'
export const CLUB_PDF = '/downloads/astris-astronomy-club-proposal.pdf'

/**
 * The club's own inbox. The rest of the site uses astriseducation@gmail.com;
 * school outreach goes from this address, so club leads go here too.
 * TODO(Rohit): confirm which address should be the public one site-wide.
 */
export const CLUB_EMAIL = 'contact@astriseducation.in'

export const CLUB_WHATSAPP_MESSAGE =
  "Hi Astris, I'd like to know more about the Astronomy Club for our school."
export const CLUB_WHATSAPP = `https://wa.me/${CONTACT.phoneDigits}?text=${encodeURIComponent(
  CLUB_WHATSAPP_MESSAGE,
)}`
export const CLUB_PHONE_LABEL = '+91 7581821834'

export const CLUB_SEO = {
  title: 'Astronomy Club for Schools in Delhi NCR | Astris Space',
  description:
    'A weekly, NCERT-linked astronomy club for Grades 4–12 with real telescopes and family sky-watches. Run by an ISRO-registered Space Tutor. Zero cost to schools.',
}

/* ------------------------------------------------------------------ bands */
export type BandId = 'explorers' | 'navigators' | 'astronomers'
export type YearId = 'A' | 'B' | 'C'

export const BANDS: {
  id: BandId
  name: string
  grades: string
  verb: string
  /** Brand band colour, for fills, rules and rims. */
  color: string
  /** The same hue, lightened where needed to pass WCAG AA as text on the night background. */
  text: string
}[] = [
  { id: 'explorers', name: 'Explorers', grades: 'Grades 4–6', verb: 'notice and describe', color: '#E8A33D', text: '#E8A33D' },
  { id: 'navigators', name: 'Navigators', grades: 'Grades 7–9', verb: 'explain and measure', color: '#0B7285', text: '#3BB2C3' },
  { id: 'astronomers', name: 'Astronomers', grades: 'Grades 10–12', verb: 'calculate and analyse', color: '#5CC6D6', text: '#A8E4EC' },
]

export const YEAR_COLORS: Record<YearId, string> = { A: '#E8A33D', B: '#0B7285', C: '#5CC6D6' }
/** Year colours as text on the night background (Year B's teal is too dark for text there). */
export const YEAR_TEXT: Record<YearId, string> = { A: '#E8A33D', B: '#3BB2C3', C: '#A8E4EC' }

/* -------------------------------------------------------------- chapters */
export const CHAPTERS = [
  { id: 'question', label: 'The question' },
  { id: 'answer', label: 'The answer' },
  { id: 'how', label: 'How it works' },
  { id: 'year', label: 'The year' },
  { id: 'results', label: 'Results' },
  { id: 'start', label: 'Start' },
] as const
export type ChapterId = (typeof CHAPTERS)[number]['id']

/* ---------------------------------------------------------------- scene 1 */
export const HERO = {
  kicker: 'Every child has asked it.',
  question: 'What’s up there?',
  title: 'Astris Astronomy Club',
  subtitle:
    'Real astronomy, every week, linked to the syllabus your students already study. At zero cost to your school.',
}

/* ---------------------------------------------------------------- scene 2 */
export const SPARK = [
  'When Chandrayaan-3 touched down near the Moon’s south pole, children across India looked up.',
  'India now celebrates National Space Day on 23 August.',
  'Aditya-L1, India’s solar observatory, watches the Sun from about 1.5 million km away.',
  'The curiosity is already there.',
]

/* ---------------------------------------------------------------- scene 3 */
export const GAP = {
  headline: 'Good ideas meet real constraints.',
  constraints: [
    { title: 'Budget', body: 'Labs and equipment need approvals and time.' },
    { title: 'Timetable', body: 'No room for a new subject or new exams.' },
    {
      title: 'NEP 2020',
      body: 'Schools are expected to show experiential, inquiry-led STEM, which needs specialist staff and equipment.',
    },
    { title: 'Parents', body: 'They back what shows visible results.' },
  ],
  closing: 'Curiosity is everywhere. A way to keep it going every week is not.',
}

/* ---------------------------------------------------------------- scene 4 */
export const ANSWER = {
  headline: 'An Astris-run astronomy club that costs your school nothing.',
  line: 'The school gives a room and a weekly slot. Astris brings the educators, telescopes, kits, enrolment and reports. Parents enrol directly with Astris, just as with the robotics, debating and F1 in Schools clubs many Delhi schools already host.',
  counters: [
    { value: 32, prefix: '', label: 'weekly sessions' },
    { value: 3, prefix: '', label: 'grade bands' },
    { value: 7, prefix: '', label: 'telescope sessions' },
    { value: 0, prefix: 'Rs ', label: 'cost to the school' },
  ],
}

/* ---------------------------------------------------------------- scene 5 */
export const LENSES = {
  headline: 'One sky, three lenses.',
  copy: 'The whole club explores the same theme each week. A Grade 4 child and a Grade 12 student never get the same lesson. Each band learns through the chapters it is studying in class.',
  emphasis: 'The club applies the syllabus a student already has. It is never an extra subject.',
  caption: 'Week 7: The Moon and its phases.',
  items: [
    {
      band: 'explorers' as BandId,
      activity: 'Act out the phases with a lamp and a ball, then start a month-long Moon diary.',
      link: 'EVS / Science: the Moon and the sky; light and shadows.',
    },
    {
      band: 'navigators' as BandId,
      activity: 'Model the Sun–Earth–Moon geometry and predict when the next eclipse is possible.',
      link: 'Science: light and shadows; motions of the Earth and Moon.',
    },
    {
      band: 'astronomers' as BandId,
      activity:
        'Use Kepler’s third law to find the Moon’s distance from its orbital period, then check against real data.',
      link: 'Physics Class 11: Gravitation.',
    },
  ],
}

/* ---------------------------------------------------------------- scene 6 */
export const HOUR = {
  headline: 'Inside one hour',
  parts: [
    {
      minutes: 10,
      title: '10 min together, the sky hook',
      body: 'The whole club meets the week’s theme through a demo, an image or a live view of the Sun.',
      color: '#E8A33D',
    },
    {
      minutes: 40,
      title: '40 min in band pods',
      body: 'Each band works with its own Astris educator, worksheet and activity, built from its own textbook chapters.',
      color: '#5CC6D6',
    },
    {
      minutes: 10,
      title: '10 min share-back',
      body: 'Each pod presents one finding. Seniors explain to juniors; juniors ask the questions seniors hadn’t thought of.',
      color: '#E8A33D',
    },
  ],
  footnotes: [
    'One Astris educator per band pod.',
    'A band with fewer than 8 students joins the next band but keeps its own worksheet tier.',
    'No exams, no homework beyond a short observation logbook.',
  ],
}

/* ---------------------------------------------------------------- scene 7 */
export const CYCLE = {
  headline: 'Grade 4 to Grade 12, never the same session twice.',
  years: [
    {
      id: 'A' as YearId,
      title: 'Earth, Moon and Sun',
      topics:
        'Seasons, Moon phases, eclipses, telescopes, the Sun up close, Chandrayaan and Aditya-L1.',
      signature: 'A year-long sunspot log.',
    },
    {
      id: 'B' as YearId,
      title: 'Planets and spaceflight',
      topics:
        'Planets, gravity and orbits, rockets, satellites, comets and asteroids, Mangalyaan and India’s launch vehicles.',
      signature: 'A water-rocket launch day.',
    },
    {
      id: 'C' as YearId,
      title: 'Stars and the Universe',
      topics:
        'Constellations, starlight and spectra, the life of stars, galaxies, exoplanets, black holes and the Big Bang.',
      signature: 'A deep-sky night on the Orion Nebula.',
    },
  ],
  points: [
    {
      title: 'No repeats within a band',
      body: 'Each band spans three grades and the cycle spans three years.',
    },
    {
      title: 'A deeper return',
      body: 'When Year A comes round again in Grade 7, it is taught through Grade 7 chapters. The Moon a student first sketched is now a geometry problem.',
    },
    { title: 'Join in any year', body: 'Every year stands alone.' },
  ],
  bigNumber: '9 years.',
  bigLine:
    'A member who stays from Grade 4 to Grade 12 goes through the cycle three times, each time at a deeper level.',
}

/* ---------------------------------------------------------------- scene 8 */
export const LEVELS = {
  headline: 'Levels that rise every year',
  copy: 'Alongside their grade band, every member earns a personal level that carries over year to year. Educators check levels for skills shown under the sky each October and February.',
  levels: [
    {
      name: 'Sky Cadet',
      skill:
        'Finds 10 constellations, the bright planets and the Moon’s main features by eye, and reads a planisphere.',
      reward: 'Earns a Cadet badge and certificate.',
    },
    {
      name: 'Telescope Operator',
      skill: 'Sets up, aligns and focuses a telescope alone, and runs safe solar viewing for others.',
      reward: 'Earns an Operator badge and can join the sky-watch crew.',
    },
    {
      name: 'Astro-imager',
      skill:
        'Captures and processes their own images of the Moon and planets, and explains what they show.',
      reward: 'Work is shown at the showcase; eligible for Astris expeditions.',
    },
    {
      name: 'Mission Specialist',
      skill:
        'Completes an independent observation project and mentors younger members through a full year.',
      reward: 'Earns a letter of recommendation from Astris Space.',
    },
  ],
  roles: [
    { title: 'Sky-watch crew' },
    { title: 'Pod mentors for the Explorers' },
    {
      title: 'Research track',
      body: 'Real asteroid-search campaigns with the International Astronomical Search Collaboration.',
    },
    {
      title: 'Olympiad track',
      body: 'Preparation for the National Standard Examination in Astronomy (NSEA).',
    },
  ],
}

/* ---------------------------------------------------------------- scene 9 */
export const YEAR_PLAN = {
  headline: 'The year, April to February',
  equation: [
    { value: 52, label: 'calendar weeks' },
    { value: 12, label: 'breaks' },
    { value: 6, label: 'exam weeks' },
    { value: 2, label: 'buffer' },
  ],
  result: { value: 32, label: 'club weeks' },
  months: [
    { month: 'Apr', sessions: 4, note: 'Launch' },
    { month: 'May', sessions: 2, note: 'Break from mid-May' },
    { month: 'Jun', sessions: 0, note: 'Summer vacation' },
    { month: 'Jul', sessions: 4, note: 'Monsoon: indoor' },
    { month: 'Aug', sessions: 4, note: 'National Space Day' },
    { month: 'Sep', sessions: 3, note: 'Half-yearly exams' },
    { month: 'Oct', sessions: 3, note: 'World Space Week' },
    { month: 'Nov', sessions: 3, note: 'Diwali break' },
    { month: 'Dec', sessions: 3, note: 'Winter break' },
    { month: 'Jan', sessions: 4, note: 'Clear winter skies' },
    { month: 'Feb', sessions: 2, note: 'Showcase' },
    { month: 'Mar', sessions: 0, note: 'Annual exams' },
  ],
  mixNote: 'About 37 contact hours',
}

export type SessionType = 'concept' | 'build' | 'solar' | 'skywatch' | 'film' | 'scientist' | 'quiz'

export const SESSION_TYPES: Record<
  SessionType,
  { label: string; one: string; count: number; detail: string; color: string }
> = {
  concept: { label: 'Concept sessions', one: 'Concept session', count: 12, detail: '60 min: one theme, taught three ways', color: '#5CC6D6' },
  build: { label: 'Hands-on builds', one: 'Hands-on build', count: 6, detail: '60 min', color: '#E8A33D' },
  solar: {
    label: 'Solar observations', one: 'Solar observation',
    count: 4,
    detail: '60 min, daytime, through certified solar filters',
    color: '#F2D16B',
  },
  skywatch: { label: 'Night sky-watches', one: 'Night sky-watch', count: 3, detail: '2 hrs, evening, with families', color: '#8B7CF6' },
  film: {
    label: 'Space film sessions', one: 'Space film session',
    count: 3,
    detail: '90 min, then a “science or fiction?” discussion',
    color: '#E57373',
  },
  scientist: { label: 'Scientist interactions', one: 'Scientist interaction', count: 2, detail: '60 min, live talk and Q&A', color: '#7BD389' },
  quiz: { label: 'Quiz and showcase', one: 'Quiz and showcase', count: 2, detail: '', color: '#F4F1EA' },
}

/** Which week of the 32 is which type. Identical structure in all three years. */
const WEEK_TYPES: SessionType[] = (() => {
  const t: SessionType[] = Array(32).fill('concept')
  for (const w of [3, 9, 12, 17, 19, 28]) t[w - 1] = 'build'
  for (const w of [4, 15, 22, 30]) t[w - 1] = 'solar'
  for (const w of [20, 23, 26]) t[w - 1] = 'skywatch'
  for (const w of [6, 10, 25]) t[w - 1] = 'film'
  for (const w of [14, 29]) t[w - 1] = 'scientist'
  for (const w of [31, 32]) t[w - 1] = 'quiz'
  return t
})()

const PLAN_TITLES: Record<YearId, { title: string; plan: string[] }> = {
  A: {
    title: 'Earth, Moon and Sun',
    plan: [
      'Welcome to the cosmos: club launch, sky quiz, level check-in, logbooks',
      'Our place in space: Earth, Moon and Sun to scale',
      'Build: planisphere',
      'Solar observation 1: safe-viewing drill, first sunspot sketch',
      'Day, night and seasons',
      'Film session 1: a Moon film, then “science or fiction?”',
      'The Moon and its phases',
      'Eclipses',
      'Build: Moon-phase and eclipse model',
      'Film session 2',
      'How telescopes work',
      'Build: DIY telescope',
      'India to the Moon: National Space Day, Chandrayaan-1 to 3',
      'Scientist talk 1: lunar or planetary scientist',
      'Solar observation 2: sunspot count vs April',
      'Inside the Sun',
      'Build: pinhole solar projector',
      'Aditya-L1: watching the Sun (World Space Week)',
      'Build: sundial',
      'Sky-watch 1: Moon craters and mountains, with families',
      'Gravity, tides and the Moon',
      'Solar observation 3: tracking sunspots as the Sun rotates',
      'Sky-watch 2: the Moon and the season’s bright planets',
      'Sun, Moon and our calendars',
      'Film session 3',
      'Sky-watch 3: the winter Moon',
      'Auroras and space weather',
      'Build: crater experiment',
      'Scientist talk 2: solar physicist or astrophotographer',
      'Solar observation 4: the year’s sunspot results',
      'Space quiz and level checks',
      'Showcase and certificates',
    ],
  },
  B: {
    title: 'Planets and spaceflight',
    plan: [
      'Concept: The Solar System family',
      'Concept: Rocky planets (Mercury, Venus, Earth, Mars)',
      'Build: Scale Solar System walk',
      'Solar observation 1',
      'Concept: Gas and ice giants',
      'Film 1',
      'Concept: Gravity holds it all together',
      'Concept: Orbits and Kepler’s laws',
      'Build: Gravity-well orbit model',
      'Film 2',
      'Concept: Moons of the Solar System',
      'Build: Pins-and-string orbit tracer',
      'Concept: Mangalyaan, India to Mars (National Space Day)',
      'Scientist talk 1',
      'Solar observation 2',
      'Concept: Landing on another world',
      'Build: Mars lander drop challenge',
      'Concept: How rockets fly (World Space Week)',
      'Build: Water rocket',
      'Sky-watch 1: Saturn and Jupiter',
      'Concept: Satellites and what they do for us (NavIC, weather, communication)',
      'Solar observation 3',
      'Sky-watch 2: planets of the season',
      'Concept: Comets, asteroids and meteors',
      'Film 3',
      'Sky-watch 3: Geminid meteors and winter planets',
      'Concept: India’s rockets, PSLV to LVM3',
      'Build: Paper Mangalyaan model',
      'Scientist talk 2',
      'Solar observation 4',
      'Quiz and level checks',
      'Showcase',
    ],
  },
  C: {
    title: 'Stars and the Universe',
    plan: [
      'Concept: Beyond the Solar System',
      'Concept: Constellations and nakshatras',
      'Build: Constellation viewer',
      'Solar observation 1 (the Sun as a star)',
      'Concept: How far are the stars?',
      'Film 1',
      'Concept: Light, the messenger from the stars',
      'Concept: Colours and temperatures of stars',
      'Build: CD spectroscope',
      'Film 2',
      'Concept: Measuring distance with parallax',
      'Build: Parallax rangefinder',
      'Concept: AstroSat, India’s space observatory (National Space Day)',
      'Scientist talk 1',
      'Solar observation 2',
      'Concept: Birth of stars',
      'Build: Star life-cycle wheel',
      'Concept: Galaxies and the Milky Way (World Space Week)',
      'Build: Expanding-universe balloon',
      'Sky-watch 1: star clusters and double stars',
      'Concept: Death of stars, supernovae and black holes',
      'Solar observation 3',
      'Sky-watch 2: the Andromeda Galaxy and star colours',
      'Concept: The Big Bang and the expanding Universe',
      'Film 3',
      'Sky-watch 3: the Orion Nebula',
      'Concept: Exoplanets',
      'Build: Exoplanet transit detector',
      'Scientist talk 2',
      'Solar observation 4',
      'Quiz and level checks',
      'Showcase',
    ],
  },
}

export interface PlanWeek {
  week: number
  title: string
  type: SessionType
  month: string
}

/** The 32 weeks of a cycle year, each placed in its month from the month table. */
export function planFor(year: YearId): { title: string; weeks: PlanWeek[] } {
  const monthOfWeek: string[] = []
  for (const m of YEAR_PLAN.months) for (let i = 0; i < m.sessions; i++) monthOfWeek.push(m.month)
  const { title, plan } = PLAN_TITLES[year]
  return {
    title,
    weeks: plan.map((t, i) => ({ week: i + 1, title: t, type: WEEK_TYPES[i], month: monthOfWeek[i] })),
  }
}

/* --------------------------------------------------------------- scene 10 */
export const SYLLABUS = {
  headline: 'Every theme meets a chapter they already study.',
  notes: [
    'Chapter titles are matched to the school’s own NCERT editions at onboarding.',
    'ICSE mapping is available on request.',
    'Astronomers practise CBSE competency-based questions with real data.',
  ],
  editionNote:
    'Titles for Classes 9–12 are exact NCERT chapter names. Classes 4–8 use topics because the new NCERT books renamed many chapters; we match them to the school’s editions at onboarding.',
  promise:
    'The club adds no subject, no syllabus and no exam. It gives students a reason to understand the ones they already have.',
}

export const CBSE_MAP: { theme: string; year: YearId; explorers: string; navigators: string; astronomers: string }[] = [
  {
    theme: 'Scale and measurement',
    year: 'B',
    explorers: 'Maths: large numbers; Science: measuring length and distance',
    navigators: 'Maths: exponents and powers; Science: motion, speed and time',
    astronomers: 'Physics XI: Units and Measurement (parallax, the light-year)',
  },
  {
    theme: 'Day, night and seasons',
    year: 'A',
    explorers: 'EVS: the Sun, shadows, day and night; Geography: the Earth’s rotation',
    navigators: 'Geography: motions of the Earth, latitudes and longitudes',
    astronomers: 'Geography XI: solar radiation, heat balance and temperature',
  },
  {
    theme: 'The Moon and eclipses',
    year: 'A',
    explorers: 'EVS: phases of the Moon; Science: light and shadows',
    navigators: 'Science: light and shadows; eclipses and the Earth–Moon–Sun system',
    astronomers: 'Physics XI: Gravitation (orbits, Kepler’s laws)',
  },
  {
    theme: 'Constellations and star maps',
    year: 'C',
    explorers: 'EVS: our sky, the Pole Star and directions',
    navigators: 'Geography: the globe; Maths IX: Coordinate Geometry',
    astronomers: 'Maths X: Some Applications of Trigonometry; Maths XI: angles and coordinates',
  },
  {
    theme: 'Telescopes and light',
    year: 'A',
    explorers: 'Science: light, shadows and reflection',
    navigators: 'Science: light, mirrors and lenses',
    astronomers:
      'Science X: Light – Reflection and Refraction; Physics XII: Ray Optics and Optical Instruments',
  },
  {
    theme: 'Rockets and India in space',
    year: 'B',
    explorers: 'Science: force, push and pull',
    navigators: 'Science VIII: force and pressure; Science IX: Force and Laws of Motion',
    astronomers: 'Physics XI: Laws of Motion (momentum); Work, Energy and Power',
  },
  {
    theme: 'The Solar System and gravity',
    year: 'B',
    explorers: 'Geography: the Earth in the Solar System',
    navigators: 'Science IX: Gravitation',
    astronomers: 'Physics XI: Gravitation (satellites, escape velocity)',
  },
  {
    theme: 'The Sun and its energy',
    year: 'A',
    explorers: 'EVS / Science: sunlight, heat and energy',
    navigators: 'Science: heat and its transfer; sources of energy',
    astronomers: 'Physics XI: Thermal Properties of Matter; Physics XII: Nuclei',
  },
  {
    theme: 'The life of a star',
    year: 'C',
    explorers: 'Science: materials and states of matter (gases)',
    navigators: 'Science IX: Matter in Our Surroundings; Atoms and Molecules',
    astronomers: 'Physics XII: Nuclei (fusion); Atoms',
  },
  {
    theme: 'Starlight, galaxies and exoplanets',
    year: 'C',
    explorers: 'Science: light and colours (the rainbow)',
    navigators: 'Science IX: Structure of the Atom; light and colour',
    astronomers:
      'Science X: The Human Eye and the Colourful World; Physics XII: Electromagnetic Waves, Atoms',
  },
]

export const IB_MAP: Record<BandId, { programme: string; intro?: string; points: string[]; after?: string[] }> = {
  explorers: {
    programme: 'PYP',
    points: [
      'Fits the transdisciplinary themes How the world works and Where we are in place and time.',
      'Moon diaries and sky journals are ready-made evidence for units of inquiry on Earth and space.',
      'Builds the ATL skills of research, thinking and communication.',
    ],
  },
  navigators: {
    programme: 'MYP',
    intro: 'Activities practise all four MYP Sciences criteria:',
    points: [
      'A · Knowing and understanding (gravity, light, energy)',
      'B · Inquiring and designing (planning a sunspot or Moon-phase study)',
      'C · Processing and evaluating (graphing water-rocket and sunspot data)',
      'D · Reflecting on the impacts of science (satellites, space debris, India’s missions)',
    ],
  },
  astronomers: {
    programme: 'MYP 5 / DP Physics',
    points: [
      'A. Space, time and motion (rocket flight, momentum, orbital speed)',
      'C. Wave behaviour (telescope optics, diffraction, the Doppler effect)',
      'D.1 Gravitational fields (Kepler’s laws, satellites, escape speed)',
      'E.5 Fusion and stars (how stars shine, their life cycle, the HR diagram)',
    ],
    after: [
      'Club observations can grow into a Physics Internal Assessment or an Extended Essay, such as measuring the Sun’s rotation from sunspots.',
      'Running sky-watches for younger students can count towards CAS.',
    ],
  },
}

/* --------------------------------------------------------------- scene 11 */
export const TAKE_HOME = {
  headline: 'What students take home',
  textbookIntro:
    'One picture-led page per session, never more, with a separate edition for each band and each cycle year.',
  logbookIntro: 'Members record what they see, build and discover.',
  logbookPoints: [
    'Observing habits: date, time, place, direction and sky conditions.',
    'Draw first, then notice, then predict.',
    'Each sheet maps to a level skill and is stamped by the educator.',
  ],
  logbookCounts: [
    { n: 4, label: 'solar sheets' },
    { n: 3, label: 'sky-watch sheets' },
    { n: 6, label: 'build records' },
    { n: 1, label: 'level checklist' },
  ],
  buildsNote:
    'Most builds go home; each is designed to use household materials, and Astris supplies only the hard-to-find parts.',
  included: [
    'LMS access for their grade',
    '2 family seats at each evening sky-watch',
    'Club T-shirt and badge',
    'End-of-year certificate from Astris Space',
  ],
}

export const BUILDS: { year: YearId; name: string; shows: string }[] = [
  { year: 'A', name: 'Planisphere star finder', shows: 'A rotating star map that shows which stars are up at any date and time' },
  { year: 'A', name: 'Moon-phase and eclipse model', shows: 'A working Sun–Earth–Moon model that recreates every phase and both kinds of eclipse' },
  { year: 'A', name: 'DIY refracting telescope', shows: 'A real two-lens telescope that shows craters on the Moon' },
  { year: 'A', name: 'Pinhole solar projector', shows: 'A box that projects a safe image of the Sun, sunspots included' },
  { year: 'A', name: 'Sundial', shows: 'A pocket sundial that tells time from the Sun’s shadow' },
  { year: 'A', name: 'Moon crater experiment', shows: 'A tray of “Moon dust” that shows how craters and rays form' },
  { year: 'B', name: 'Scale Solar System walk', shows: 'A paper strip that turns the Solar System’s distances into a walk' },
  { year: 'B', name: 'Gravity-well orbit model', shows: 'A stretched sheet that shows how gravity bends paths into orbits' },
  { year: 'B', name: 'Pins-and-string orbit tracer', shows: 'Two pins and a loop of string that draw a true planetary orbit' },
  { year: 'B', name: 'Mars lander drop challenge', shows: 'Design a lander that keeps its “astronaut” safe from a two-storey drop' },
  { year: 'B', name: 'Water rocket', shows: 'A soda-bottle rocket that flies 30 metres or more on water and air' },
  { year: 'B', name: 'Paper Mangalyaan model', shows: 'A fold-up model of India’s Mars Orbiter, with every part labelled' },
  { year: 'C', name: 'Constellation viewer', shows: 'A tube that projects constellations onto a wall or ceiling' },
  { year: 'C', name: 'CD spectroscope', shows: 'An old CD and a cereal box that split light into a rainbow spectrum' },
  { year: 'C', name: 'Parallax rangefinder', shows: 'A card sight that measures distance the way astronomers measure stars' },
  { year: 'C', name: 'Star life-cycle wheel', shows: 'A two-layer wheel that follows a star from birth to its end' },
  { year: 'C', name: 'Expanding-universe balloon', shows: 'A balloon covered in “galaxies” that shows the Universe stretching' },
  { year: 'C', name: 'Exoplanet transit detector', shows: 'A lamp, a ball and a phone light-meter that find a “planet” the way NASA does' },
]

/* --------------------------------------------------------------- scene 12 */
export const SAFETY = {
  headline: 'Real telescopes. Safe by design.',
  sessions: [
    '4 daytime solar observations in school hours',
    '3 evening sky-watches with families: Moon craters, planets, constellations',
  ],
  rules: [
    'The Sun is only ever observed through certified solar filters or by projection, under an educator, never directly.',
    'Evening sky-watches run with school staff present, written parent consent, and attendance at arrival and departure.',
    'Builds use no chemicals; educators handle blades, rocket launches and lander drops.',
    'Educators follow the school’s own safeguarding policy.',
  ],
  telescopes: 'Astris builds its own telescopes under the Nakshatra Scopes brand.',
}

/* --------------------------------------------------------------- scene 13 */
export const KPIS = {
  headline: 'What gets measured gets better',
  label: 'Annual targets and our measurement design, not past results.',
  pillars: [
    {
      name: 'Participation',
      targets: ['Attendance ≥ 85%', 'In-year retention ≥ 90%', 'Re-enrolment ≥ 70%'],
    },
    {
      name: 'Learning',
      targets: [
        'Concept gain ≥ 25 percentage points, from the April pre-test to the February post-test (same 20 NCERT-tagged items per band)',
        '≥ 75% of NCERT-tagged questions correct at endline',
        '+0.5 on a 5-point science-attitude survey',
      ],
    },
    {
      name: 'Skills',
      targets: [
        '≥ 80% of logbook sheets completed',
        'Logbook average ≥ 3 on a 4-level observation rubric',
        '≥ 90% of members reach a new level',
      ],
    },
    {
      name: 'Community',
      targets: [
        'On average at least 1 family member per student across the three sky-watches',
        '≥ 85% of parents rate the club 4 or 5 out of 5',
        '100% of planned events delivered',
      ],
    },
  ],
  checkpoints: [
    { when: 'April', what: 'Baseline' },
    { when: 'Every week', what: 'Attendance, logbooks, parent notes' },
    { when: 'October', what: 'Midpoint and progress card 1' },
    { when: 'February', what: 'Endline and progress card 2' },
    { when: 'March', what: 'Annual impact report to the principal' },
  ],
  line: 'Parents get a WhatsApp note every week and a progress card twice a year. The school gets a termly impact view and an annual report.',
}

/* --------------------------------------------------------------- scene 14 */
export const CHANGES = [
  {
    who: 'Students',
    body: 'Find their way around the night sky, use a telescope with confidence, keep a real observation log for a full year. Board-exam physics comes alive for seniors, with projects that can feed IB Internal Assessments, Extended Essays, olympiads and university applications.',
  },
  {
    who: 'Parents',
    body: 'See their child’s curiosity first-hand at three family sky-watches and the end-of-year showcase.',
  },
  {
    who: 'The school',
    body: 'A visible, NEP-aligned STEM activity at no cost, with events that bring families onto campus.',
  },
]

/* --------------------------------------------------------------- scene 15 */
export const FEES = {
  headline: 'Simple for families, free for the school',
  numbers: [
    { value: 'Rs 0', label: 'to the school' },
    { value: 'Rs 11,000', label: 'per student, for the full year, all inclusive' },
  ],
  details: [
    'The fee covers all 32 sessions, every observation, build kits, the textbook and logbook, LMS access and the certificate.',
    'Paid once at enrolment, directly to Astris Space.',
    'A club starts at 25 students and caps at 40 per batch; a second batch opens beyond that.',
    '100% refund to every family if the club does not reach 25.',
    'Returning members re-enrol each year and keep their level.',
  ],
  trackTitle: 'From yes to first session in 4 weeks',
  track: [
    { week: 'Week 1', body: 'The school says yes; slot, room and coordinator fixed.' },
    {
      week: 'Week 2',
      body: 'A 20-minute assembly demo with a live telescope view or a safe solar projection; the parent note goes home.',
    },
    { week: 'Week 3', body: 'Enrolment opens online, with direct payment to Astris.' },
    {
      week: 'Week 4',
      body: 'The club is confirmed at 25+ students; first session and April-style baseline.',
    },
  ],
}

/* --------------------------------------------------------------- scene 16 */
export const WHY = {
  headline: 'Why Astris',
  stats: [
    { value: 'ISRO-registered', label: 'Space Tutor' },
    { value: '50,000+', label: 'students taught astronomy' },
    { value: '500+', label: 'astronomy camps conducted' },
    { value: 'Nakshatra Scopes', label: 'our own telescopes' },
  ],
  // No founder photos exist in the repo, so the page shows initials.
  // TODO(Rohit): send founder photos if you want them on the page.
  founders: [
    {
      initials: 'RA',
      name: 'Rohit Agrawal',
      role: 'Founder',
      bio: 'Founded Astris Space to make astronomy something students do, not just read about. He has taught astronomy to more than 50,000 students and has led astronomy tours and camps for years, from dark-sky nights near Delhi to astrophotography expeditions in Ladakh.',
    },
    {
      initials: 'HP',
      name: 'Harshavardhan Patil',
      role: 'Co-founder (IIT Roorkee alumnus)',
      bio: 'Leads marketing and growth at Astris Space, and brought IIT Roorkee into the programme’s development, including its quality checks.',
    },
  ],
  badge: 'Quality-checked with IIT Roorkee.',
  badgeBody:
    'IIT Roorkee was involved in creating the programme and carried out quality checks on its curriculum and activities.',
}

/* --------------------------------------------------------------- scene 17 */
export const PATH = {
  headline: 'Where the club can lead',
  steps: [
    { tag: 'Year 1', title: 'Astronomy Club', body: 'One batch of 25–40 students proves the interest.' },
    {
      tag: 'Years 2–3',
      title: 'The full cycle',
      body: 'Years B and C; members level up and mentor juniors.',
    },
    {
      tag: 'When ready',
      title: 'AstroEd Space Lab',
      body: 'A permanent lab and curriculum for the whole school.',
      href: '/astroed',
    },
  ],
  offer:
    'Schools that move to an AstroEd Space Lab within two years of starting the club receive Rs 1,00,000 off the lab package, and club members become the lab’s first student ambassadors.',
}

/* --------------------------------------------------------------- scene 18 */
export const FAQS = [
  {
    q: 'Will it clash with academics?',
    a: 'No. One weekly slot that the school chooses, no exams, and no homework beyond a short logbook.',
  },
  {
    q: 'What if not enough students enrol?',
    a: 'The club only starts at 25 students. If it doesn’t reach 25, every family gets a full refund.',
  },
  {
    q: 'Who is responsible during sessions?',
    a: 'Astris educators run every session. The school’s coordinator teacher is the point of contact.',
  },
  {
    q: 'How will parents see progress?',
    a: 'Weekly WhatsApp notes, progress cards in October and February, three family sky-watches and the end-of-year showcase.',
  },
  {
    q: 'Is solar observing safe?',
    a: 'Yes. Only certified solar filters or projection, always supervised by an educator. The Sun is never viewed directly.',
  },
  {
    q: 'What about transport for evening events?',
    a: 'Families arrange it; the school decides the timings.',
  },
  { q: 'Can our teachers join?', a: 'Yes, teachers are welcome to join sessions. It’s optional.' },
  {
    q: 'Does it work for IB and ICSE schools?',
    a: 'Yes. There is an IB mapping (PYP, MYP, DP), and ICSE mapping is available on request.',
  },
  { q: 'What does the school pay?', a: 'Nothing. Parents enrol and pay Astris directly.' },
]

/* --------------------------------------------------------------- scene 19 */
export const CLOSE = {
  headline: 'Every astronomer started with a question. Let’s give your students the next one.',
  formTitle: 'Book a free 20-minute assembly demo',
  success: 'Thank you. We’ll call you within 24 hours to fix a demo date.',
  parents: 'Are you a parent? Ask your school to start a club, and share this page with your principal.',
}

export const FORM_ROLES = ['Principal', 'Coordinator', 'Teacher', 'Parent', 'Other'] as const
export const FORM_GRADES = ['4–6', '7–9', '10–12'] as const
