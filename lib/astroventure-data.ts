/**
 * ============================================================================
 *  ASTROVENTURE NIGHTS — SINGLE SOURCE OF CONTENT
 * ============================================================================
 *
 *  Everything on the Astroventure Nights experience pages reads from this file.
 *  To update copy, destinations, dates, pricing, gallery images, testimonials
 *  or FAQ — edit here and the whole site updates. No component changes needed.
 *
 *  IMAGES
 *  ------
 *  Replace the values in `IMAGES` with your own assets. Drop files into
 *  `/public` and reference them as "/your-file.jpg", or paste a full URL.
 *  Every image used across the site is named semantically below so you can
 *  swap telescope / Milky Way / destination / participant photos in one place.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. CONTACT / BRAND CONFIG  (edit freely)
 * ------------------------------------------------------------------------- */
export const SITE = {
  brand: 'Astris SpaceEd',
  experience: 'Astroventure Nights',
  tagline: 'Himalayan Dark-Sky Astronomy Expeditions',
  phone: '+91 75818 21834',
  whatsapp: '917581821834', // digits only, used for wa.me links
  email: 'astriseducation@gmail.com',
  instagram: 'https://instagram.com/',
  twitter: 'https://twitter.com/',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',
  address: 'Delhi, India',
} as const

/* ---------------------------------------------------------------------------
 * 2. IMAGE ASSETS  (replace these with the photos you provide)
 * ------------------------------------------------------------------------- */
/** Base path for the Astroventure Nights image library (lives in /public). */
const A = '/astroventure-assets'

export const IMAGES = {
  // Hero / Milky Way (desktop + mobile for responsive <picture>)
  milkyWay: `${A}/hero/hero-himalayan-milkyway.webp`,
  milkyWayMobile: `${A}/hero/hero-himalayan-milkyway-mobile.webp`,
  milkyWayArch: `${A}/milky-way/milkyway-panoramic-arch.webp`,

  // Backgrounds
  footerNebula: `${A}/backgrounds/footer-nebula.webp`,
  footerNebulaMobile: `${A}/backgrounds/footer-nebula-mobile.webp`,
  starfieldBg: `${A}/backgrounds/background-starfield.webp`,

  // Telescopes & equipment
  telescopeHero: `${A}/telescopes/telescope-setup-general.webp`,
  telescopeDobsonian: `${A}/telescopes/telescope-dobsonian.webp`,
  telescopeApochromatic: `${A}/telescopes/telescope-apochromatic.webp`,
  telescopeGoto: `${A}/telescopes/telescope-goto-mount.webp`,

  // Destinations (desktop + mobile)
  solang: `${A}/solang-valley/solang-valley-night.webp`,
  solangMobile: `${A}/solang-valley/solang-valley-night-mobile.webp`,
  chitkul: `${A}/chitkul/chitkul-village-stars.webp`,
  chitkulMobile: `${A}/chitkul/chitkul-village-stars-mobile.webp`,
  kasol: `${A}/kasol/kasol-riverside-dusk.webp`,
  kasolMobile: `${A}/kasol/kasol-riverside-dusk-mobile.webp`,

  // Activities / stargazing
  starTrails: `${A}/activities/star-trails-mountains.webp`,
  astrophotography: `${A}/activities/astrophotography-setup.webp`,
  laserPointing: `${A}/stargazing/stargazing-pointing-laser.webp`,
  stargazingGroup: `${A}/stargazing/stargazing-group-01.webp`,
} as const

/* ---------------------------------------------------------------------------
 * 3. TYPES
 * ------------------------------------------------------------------------- */
export interface GalleryImage {
  src: string
  alt: string
  category:
    | 'Stargazing'
    | 'Telescopes'
    | 'Milky Way'
    | 'Participants'
    | 'Landscapes'
    | 'Activities'
  span?: 'tall' | 'wide' | 'normal'
}

export interface ItineraryDay {
  day: string
  title: string
  summary: string
  events: { time: string; title: string; detail: string }[]
}

export interface SlotEvent {
  id: string
  batchName: string
  destinationSlug: DestinationSlug
  /** ISO date (YYYY-MM-DD) of the first night */
  date: string
  /** for flexible windows, the last bookable day (inclusive) */
  endDate?: string
  /** when true, any dates within [date, endDate] can be booked */
  flexible?: boolean
  /** human readable date range */
  dateLabel: string
  nights: number
  seatsTotal: number
  seatsAvailable: number
  status: 'open' | 'filling' | 'soldout'
}

export type DestinationSlug = 'solang-valley' | 'chitkul' | 'kasol'

export interface Destination {
  slug: DestinationSlug
  name: string
  valley: string
  locationLabel: string
  tagline: string
  altitude: string
  darkSkyRating: number // out of 5
  darkSkyLabel: string
  bortle: string
  bestSeason: string
  observationConditions: string
  image: string
  imageMobile: string
  heroImage: string
  overview: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryDay[]
}

/* ---------------------------------------------------------------------------
 * 3a. SHARED INCLUSIONS / EXCLUSIONS
 * ------------------------------------------------------------------------- *
 *  Inclusions cover accommodation and every stargazing / astronomy activity.
 *  Exclusions cover everything else. When a guest reserves a slot or sends an
 *  enquiry, our experts build a tailored package around these.
 * ------------------------------------------------------------------------- */
export const TAILORED_PACKAGE_NOTE =
  'When you reserve a slot or send us your enquiry, our experts will create a tailored package for you.'

export const defaultInclusions: string[] = [
  'Accommodation for the entire stay (tents / cottages as per the site)',
  'All guided stargazing and telescope observation sessions',
  'Astrophotography workshops and Milky Way viewing',
  'Night-sky orientation and laser-guided constellation tours',
  'Astronomy storytelling sessions led by expert astronomers',
  'Use of research-grade telescopes, mounts and equipment',
]

export const defaultExclusions: string[] = [
  'Travel and transport to and from the destination',
  'Meals and beverages, unless specified in your tailored package',
  'Personal expenses, shopping and tips',
  'Travel insurance and any permits',
  'Anything not explicitly listed under Inclusions',
]

/* ---------------------------------------------------------------------------
 * 4. DESTINATIONS  (add / edit / reorder freely)
 * ------------------------------------------------------------------------- */
export const destinations: Destination[] = [
  {
    slug: 'solang-valley',
    name: 'Groshnam Deshang',
    valley: 'Soldung Valley',
    locationLabel: 'Groshnam Deshang, Soldung Valley',
    tagline: 'Where the snow-line meets the star-river.',
    altitude: '2,560 m',
    darkSkyRating: 4,
    darkSkyLabel: 'Pristine alpine skies',
    bortle: 'Bortle 3',
    bestSeason: 'September – November · March – June',
    observationConditions:
      'Crisp, stable air above the valley fog with low horizon obstruction — ideal for planetary detail and deep-sky imaging.',
    image: IMAGES.solang,
    imageMobile: IMAGES.solangMobile,
    heroImage: IMAGES.solang,
    overview:
      'Tucked away in the high Soldung Valley, Groshnam Deshang trades the daytime mountain bustle for a profound silence after dark. We set up camp on a high meadow where every trace of town light falls away behind the ridgeline, leaving a horizon-to-horizon canopy of stars reflected in the season’s first snow.',
    highlights: [
      'Snow-meadow observation site shielded from town light',
      'Panoramic Himalayan horizon for rising constellations',
      'Bonfire astronomy storytelling under the Milky Way',
      'Sunrise over the peaks after a full night of observing',
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & First Light',
        summary: 'Settle into the high meadow camp and meet the night sky.',
        events: [
          { time: '16:00', title: 'Arrival & Welcome', detail: 'Check-in at the camp, chai and a briefing on the nights ahead.' },
          { time: '18:30', title: 'Night Sky Orientation', detail: 'Laser-guided tour of the visible constellations and planets.' },
          { time: '20:00', title: 'First Telescope Session', detail: 'Moon, Saturn and Jupiter through our premium optics.' },
          { time: '22:00', title: 'Astronomy Storytelling', detail: 'Myths and science of the night around the bonfire.' },
        ],
      },
      {
        day: 'Day 2',
        title: 'Deep-Sky & Astrophotography',
        summary: 'A full night dedicated to nebulae, clusters and the camera.',
        events: [
          { time: '10:00', title: 'Solar Observation', detail: 'Safe white-light & H-alpha views of the Sun.' },
          { time: '19:30', title: 'Milky Way Rise', detail: 'Watch the galactic core climb above the peaks.' },
          { time: '21:00', title: 'Astrophotography Workshop', detail: 'Capture the Milky Way and star trails with guidance.' },
          { time: '23:30', title: 'Deep-Sky Marathon', detail: 'Nebulae, star clusters and distant galaxies.' },
        ],
      },
      {
        day: 'Day 3',
        title: 'Dawn & Departure',
        summary: 'Sunrise over the peaks and farewell.',
        events: [
          { time: '05:30', title: 'Pre-Dawn Planets', detail: 'Final views of the morning sky and zodiacal light.' },
          { time: '07:00', title: 'Sunrise & Breakfast', detail: 'Golden light on the peaks with hot breakfast.' },
          { time: '09:30', title: 'Departure', detail: 'Wrap-up, shared photographs and goodbyes.' },
        ],
      },
    ],
  },
  {
    slug: 'chitkul',
    name: 'Chitkul',
    valley: 'Baspa Valley',
    locationLabel: 'Baspa Valley',
    tagline: 'India’s last village — and its darkest sky.',
    altitude: '3,450 m',
    darkSkyRating: 5,
    darkSkyLabel: 'Among India’s darkest skies',
    bortle: 'Bortle 2',
    bestSeason: 'May – October',
    observationConditions:
      'Exceptionally dark, dry, high-altitude air near the Indo-Tibetan border. The Milky Way casts visible shadows on a moonless night.',
    image: IMAGES.chitkul,
    imageMobile: IMAGES.chitkulMobile,
    heroImage: IMAGES.chitkul,
    overview:
      'Chitkul, the last inhabited village before the Tibetan border, sits at 3,450 m in the breathtaking Baspa Valley. With almost no artificial light for tens of kilometres, it offers some of the most pristine night skies accessible in India. Here the Milky Way is not a faint smudge but a luminous river bright enough to read by.',
    highlights: [
      'Bortle 2 sky — the galactic core in staggering detail',
      'Banks of the glacial Baspa river as our observing deck',
      'Naked-eye Milky Way bright enough to cast shadows',
      'High-altitude clarity for faint galaxies and nebulae',
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Into the Baspa Valley',
        summary: 'Acclimatise and witness a truly dark sky.',
        events: [
          { time: '15:00', title: 'Arrival & Acclimatisation', detail: 'Settle in, hydrate and rest before the altitude night.' },
          { time: '18:30', title: 'Sky Orientation', detail: 'Learn the summer constellations and Milky Way structure.' },
          { time: '20:30', title: 'Telescope Observation', detail: 'Saturn’s rings, Jupiter’s moons and the Moon’s craters.' },
          { time: '22:30', title: 'Milky Way Viewing', detail: 'The galactic core overhead, brighter than most have ever seen.' },
        ],
      },
      {
        day: 'Day 2',
        title: 'The Pristine Sky',
        summary: 'Deep-sky observing and long-exposure astrophotography.',
        events: [
          { time: '11:00', title: 'Valley Walk & Stories', detail: 'Astronomy storytelling beside the Baspa river.' },
          { time: '20:00', title: 'Deep-Sky Tour', detail: 'Nebulae, globular clusters and the Andromeda Galaxy.' },
          { time: '22:00', title: 'Astrophotography Session', detail: 'Milky Way panoramas and deep-sky stacking.' },
          { time: '01:00', title: 'Meteor Watch', detail: 'Reclined under shooting stars and satellites.' },
        ],
      },
      {
        day: 'Day 3',
        title: 'Farewell to the Frontier',
        summary: 'A final dawn at the edge of the country.',
        events: [
          { time: '05:00', title: 'Dawn Observation', detail: 'Morning planets and the fading Milky Way.' },
          { time: '07:30', title: 'Breakfast & Reflection', detail: 'Warm meal with views of the snow peaks.' },
          { time: '10:00', title: 'Departure', detail: 'Begin the scenic descent from Chitkul.' },
        ],
      },
    ],
  },
  {
    slug: 'kasol',
    name: 'Kasol',
    valley: 'Parvati Valley',
    locationLabel: 'Parvati Valley',
    tagline: 'Stars over the pine-scented Parvati.',
    altitude: '1,640 m',
    darkSkyRating: 4,
    darkSkyLabel: 'Dark valley skies',
    bortle: 'Bortle 3–4',
    bestSeason: 'March – June · September – November',
    observationConditions:
      'Sheltered riverside skies framed by pine forest and steep valley walls, keeping stray light low and the air fragrant and calm.',
    image: IMAGES.kasol,
    imageMobile: IMAGES.kasolMobile,
    heroImage: IMAGES.kasol,
    overview:
      'Set along the rushing Parvati river and surrounded by deodar pines, Kasol blends a relaxed mountain-town charm with surprisingly dark valley skies. Our observing site sits just beyond the village, where the steep valley walls block stray light and frame a ribbon of stars between the ridgelines — perfect for first-time stargazers and families.',
    highlights: [
      'Riverside observing deck wrapped in pine forest',
      'Approachable skies ideal for beginners and families',
      'Constellation identification and laser sky tours',
      'Cosy café culture by day, deep-sky wonder by night',
    ],
    inclusions: defaultInclusions,
    exclusions: defaultExclusions,
    itinerary: [
      {
        day: 'Day 1',
        title: 'Riverside Arrival',
        summary: 'Ease into the Parvati Valley and your first night.',
        events: [
          { time: '16:00', title: 'Arrival & Chai', detail: 'Riverside check-in and welcome briefing.' },
          { time: '18:30', title: 'Constellation Identification', detail: 'Find your way around the night sky with a laser tour.' },
          { time: '20:00', title: 'Telescope Observation', detail: 'Moon, Saturn and Jupiter above the pines.' },
          { time: '21:30', title: 'Storytelling by the River', detail: 'Astronomy myths over a warm bonfire.' },
        ],
      },
      {
        day: 'Day 2',
        title: 'Deep Sky & Discovery',
        summary: 'A guided journey through clusters, nebulae and the camera.',
        events: [
          { time: '12:00', title: 'Café & Solar Viewing', detail: 'Safe Sun observation and a relaxed afternoon.' },
          { time: '19:30', title: 'Laser Sky Tour', detail: 'A guided constellation and mythology walk-through.' },
          { time: '21:00', title: 'Deep-Sky Observation', detail: 'Star clusters, nebulae and distant galaxies.' },
          { time: '22:30', title: 'Astrophotography Basics', detail: 'Your first Milky Way photograph.' },
        ],
      },
      {
        day: 'Day 3',
        title: 'Morning in the Valley',
        summary: 'Gentle dawn observing and departure.',
        events: [
          { time: '05:45', title: 'Dawn Sky', detail: 'Morning planets and the last stars.' },
          { time: '08:00', title: 'Breakfast', detail: 'Riverside breakfast and shared photos.' },
          { time: '10:00', title: 'Departure', detail: 'Farewell to the Parvati Valley.' },
        ],
      },
    ],
  },
]

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

/**
 * Generic 3-day itinerary used on the main landing page.
 * Each destination above carries its own tailored itinerary.
 */
export const sampleItinerary: ItineraryDay[] = [
  {
    day: 'Day 1',
    title: 'Arrival & First Light',
    summary: 'Arrive, settle in and take your first guided look at the night sky.',
    events: [
      { time: 'Afternoon', title: 'Arrival & Welcome', detail: 'Check-in, refreshments and a briefing on the nights ahead.' },
      { time: 'Dusk', title: 'Night Sky Orientation', detail: 'A laser-guided tour of the visible constellations and planets.' },
      { time: 'Evening', title: 'First Telescope Session', detail: 'Moon, Saturn and Jupiter through our premium optics.' },
      { time: 'Night', title: 'Astronomy Storytelling', detail: 'Myths and science of the night sky around the bonfire.' },
    ],
  },
  {
    day: 'Day 2',
    title: 'Deep-Sky & Astrophotography',
    summary: 'A full day and night devoted to the universe and the camera.',
    events: [
      { time: 'Morning', title: 'Solar Observation', detail: 'Safe, filtered views of the Sun and its features.' },
      { time: 'Evening', title: 'Milky Way Rise', detail: 'Watch the galactic core climb above the horizon.' },
      { time: 'Night', title: 'Astrophotography Workshop', detail: 'Capture the Milky Way and star trails with guidance.' },
      { time: 'Late Night', title: 'Deep-Sky Marathon', detail: 'Nebulae, star clusters and distant galaxies.' },
    ],
  },
  {
    day: 'Day 3',
    title: 'Dawn & Departure',
    summary: 'A final dawn in the mountains before farewell.',
    events: [
      { time: 'Pre-Dawn', title: 'Morning Planets', detail: 'The morning sky, zodiacal light and final views.' },
      { time: 'Sunrise', title: 'Sunrise & Breakfast', detail: 'Golden light on the peaks with a hot breakfast.' },
      { time: 'Morning', title: 'Departure', detail: 'Wrap-up, shared photographs and goodbyes.' },
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 5. WHAT YOU WILL EXPERIENCE  (shared across all destinations)
 * ------------------------------------------------------------------------- */
export interface Experience {
  title: string
  description: string
  /** lucide-react icon name */
  icon: string
  items?: string[]
}

export const experiences: Experience[] = [
  {
    title: 'Telescope Observation',
    description:
      'Peer through powerful, research-grade telescopes guided by expert astronomers.',
    icon: 'Telescope',
    items: ['Moon', 'Saturn', 'Jupiter', 'Nebulae', 'Star Clusters', 'Galaxies'],
  },
  {
    title: 'Astrophotography Session',
    description:
      'Capture the Milky Way, star trails and deep-sky objects with hands-on guidance.',
    icon: 'Camera',
  },
  {
    title: 'Night Sky Orientation',
    description:
      'Get your bearings among the stars, planets and seasonal constellations.',
    icon: 'Compass',
  },
  {
    title: 'Laser Sky Tour',
    description:
      'Follow a green laser across the heavens as we trace myths and science overhead.',
    icon: 'Sparkles',
  },
  {
    title: 'Constellation Identification',
    description:
      'Learn to recognise constellations and navigate the night sky on your own.',
    icon: 'Star',
  },
  {
    title: 'Milky Way Viewing',
    description:
      'Witness our galaxy stretch across pristine, light-pollution-free skies.',
    icon: 'Orbit',
  },
  {
    title: 'Astronomy Storytelling',
    description:
      'Gather around the fire for the legends and discoveries written in the stars.',
    icon: 'BookOpen',
  },
  {
    title: 'Dark Sky Experience',
    description:
      'Immerse yourself in genuine darkness — a rare and unforgettable sensation.',
    icon: 'Moon',
  },
]

/* ---------------------------------------------------------------------------
 * 6. TELESCOPE EXPERIENCE  (equipment highlights & targets)
 * ------------------------------------------------------------------------- */
export const telescopeEquipment: {
  name: string
  spec: string
  capability: string
  image: string
}[] = [
  {
    name: 'Dobsonian 8" Reflector',
    spec: '203mm aperture · f/6',
    capability: 'Bright deep-sky objects, galaxies & nebulae',
    image: IMAGES.telescopeDobsonian,
  },
  {
    name: 'Apochromatic Refractor',
    spec: '102mm ED triplet',
    capability: 'Razor-sharp planetary & lunar detail',
    image: IMAGES.telescopeApochromatic,
  },
  {
    name: 'Computerised GoTo Mount',
    spec: 'SkyAlign tracking',
    capability: 'Automated tracking for astrophotography',
    image: IMAGES.telescopeGoto,
  },
]

export const celestialTargets: { name: string; type: string }[] = [
  { name: 'The Moon', type: 'Craters & maria' },
  { name: 'Saturn', type: 'Rings & moons' },
  { name: 'Jupiter', type: 'Bands & Galilean moons' },
  { name: 'Orion Nebula', type: 'Emission nebula' },
  { name: 'Pleiades', type: 'Open star cluster' },
  { name: 'Andromeda', type: 'Spiral galaxy' },
]

/* ---------------------------------------------------------------------------
 * 7. PHOTO GALLERY  (masonry + lightbox)
 * ------------------------------------------------------------------------- */
export const galleryImages: GalleryImage[] = [
  { src: `${A}/gallery/gallery-image-01.webp`, alt: 'The Andromeda Galaxy beyond the peaks', category: 'Milky Way', span: 'tall' },
  { src: `${A}/gallery/gallery-image-02.webp`, alt: 'The Milky Way core over the Himalayas', category: 'Milky Way', span: 'normal' },
  { src: `${A}/gallery/gallery-image-03.webp`, alt: 'Stargazers gathered beneath a star-filled sky', category: 'Stargazing', span: 'wide' },
  { src: `${A}/gallery/gallery-image-04.webp`, alt: 'A telescope set up as twilight fades', category: 'Telescopes', span: 'normal' },
  { src: `${A}/gallery/gallery-image-05.webp`, alt: 'Guests observing the cosmos through a telescope', category: 'Participants', span: 'normal' },
  { src: `${A}/gallery/gallery-image-06.webp`, alt: 'The Milky Way over the mountain ridge', category: 'Landscapes', span: 'tall' },
  { src: `${A}/gallery/gallery-image-07.webp`, alt: 'The Milky Way arching over snow peaks', category: 'Milky Way', span: 'wide' },
  { src: `${A}/gallery/gallery-image-08.webp`, alt: 'A reflector telescope ready for the night', category: 'Telescopes', span: 'normal' },
  { src: `${A}/gallery/gallery-image-09.webp`, alt: 'A deep-sky view of the Milky Way', category: 'Milky Way', span: 'normal' },
  { src: `${A}/gallery/gallery-image-10.webp`, alt: 'Star trails circling the celestial pole', category: 'Activities', span: 'normal' },
]

export const galleryCategories = [
  'All',
  'Stargazing',
  'Telescopes',
  'Milky Way',
  'Participants',
  'Landscapes',
  'Activities',
] as const

/* ---------------------------------------------------------------------------
 * 8. EVENTS / BOOKABLE SLOTS  (drives Book Slots + Calendar)
 * ------------------------------------------------------------------------- */
export const events: SlotEvent[] = [
  {
    id: 'ck-2026-06-25',
    batchName: 'Chitkul Open Dates',
    destinationSlug: 'chitkul',
    date: '2026-06-25',
    endDate: '2026-07-02',
    flexible: true,
    dateLabel: 'Open daily · 25 Jun – 2 Jul 2026',
    nights: 2,
    seatsTotal: 16,
    seatsAvailable: 16,
    status: 'open',
  },
  {
    id: 'sv-2026-07-04',
    batchName: 'Soldung Summer Skies',
    destinationSlug: 'solang-valley',
    date: '2026-07-04',
    dateLabel: '4 – 6 Jul 2026',
    nights: 2,
    seatsTotal: 20,
    seatsAvailable: 6,
    status: 'filling',
  },
  {
    id: 'ck-2026-07-18',
    batchName: 'Chitkul Dark-Sky Expedition',
    destinationSlug: 'chitkul',
    date: '2026-07-18',
    dateLabel: '18 – 20 Jul 2026',
    nights: 2,
    seatsTotal: 16,
    seatsAvailable: 11,
    status: 'open',
  },
  {
    id: 'ks-2026-08-01',
    batchName: 'Kasol Riverside Nights',
    destinationSlug: 'kasol',
    date: '2026-08-01',
    dateLabel: '1 – 3 Aug 2026',
    nights: 2,
    seatsTotal: 24,
    seatsAvailable: 18,
    status: 'open',
  },
  {
    id: 'ck-2026-08-15',
    batchName: 'Chitkul Perseid Special',
    destinationSlug: 'chitkul',
    date: '2026-08-15',
    dateLabel: '15 – 17 Aug 2026',
    nights: 2,
    seatsTotal: 16,
    seatsAvailable: 0,
    status: 'soldout',
  },
  {
    id: 'sv-2026-09-12',
    batchName: 'Soldung Autumn Clarity',
    destinationSlug: 'solang-valley',
    date: '2026-09-12',
    dateLabel: '12 – 14 Sep 2026',
    nights: 2,
    seatsTotal: 20,
    seatsAvailable: 20,
    status: 'open',
  },
  {
    id: 'ks-2026-10-03',
    batchName: 'Kasol New-Moon Weekend',
    destinationSlug: 'kasol',
    date: '2026-10-03',
    dateLabel: '3 – 5 Oct 2026',
    nights: 2,
    seatsTotal: 24,
    seatsAvailable: 9,
    status: 'filling',
  },
]

export function eventsForDestination(slug: DestinationSlug): SlotEvent[] {
  return events
    .filter((e) => e.destinationSlug === slug)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date))

/* ---------------------------------------------------------------------------
 * 9. TESTIMONIALS  (placeholders — replace with real reviews)
 * ------------------------------------------------------------------------- */
export const testimonials: {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
}[] = [
  {
    quote:
      'I have never seen so many stars in my life. Watching Saturn’s rings with my own eyes from a Himalayan meadow was pure magic.',
    name: 'Ananya Sharma',
    role: 'Bengaluru · Chitkul Expedition',
    avatar: `${A}/icons/avatar-ananya-thumb.webp`,
    rating: 5,
  },
  {
    quote:
      'The astrophotography session was worth the trip alone. The guides were patient, knowledgeable and genuinely passionate.',
    name: 'Rohan Mehta',
    role: 'Mumbai · Groshnam Deshang',
    avatar: `${A}/icons/avatar-rohan-thumb.webp`,
    rating: 5,
  },
  {
    quote:
      'Perfect for our family. The kids were glued to the telescope and the storytelling around the fire was unforgettable.',
    name: 'Priya & Family',
    role: 'Delhi · Kasol Nights',
    avatar: `${A}/icons/avatar-priya-thumb.webp`,
    rating: 5,
  },
  {
    quote:
      'A genuinely premium, well-organised experience. The dark skies of Chitkul are something every Indian should witness once.',
    name: 'Vikram Nair',
    role: 'Pune · Chitkul Expedition',
    avatar: `${A}/icons/avatar-vikram-thumb.webp`,
    rating: 5,
  },
]

/* ---------------------------------------------------------------------------
 * 10. FAQ
 * ------------------------------------------------------------------------- */
export const faqs: { question: string; answer: string }[] = [
  {
    question: 'What can I observe during the experience?',
    answer:
      'Depending on the season and sky conditions, you can observe the Moon and its craters, Saturn’s rings, Jupiter and its moons, star clusters, glowing nebulae, distant galaxies, and the Milky Way stretching across the sky. Our astronomers tailor each session to that night’s best targets.',
  },
  {
    question: 'Is prior astronomy experience required?',
    answer:
      'Not at all. Astroventure Nights is designed for complete beginners as well as seasoned enthusiasts. Our guides start with the basics and adapt the depth of each session to the group.',
  },
  {
    question: 'What should I carry?',
    answer:
      'Warm layered clothing (nights at altitude get cold even in summer), a head-torch (red-light preferred), comfortable shoes, any personal medication, and a sense of wonder. Telescopes, expert guidance and warm refreshments are provided. A full checklist is shared on booking.',
  },
  {
    question: 'Is the event suitable for children?',
    answer:
      'Yes. Families are very welcome and children are often the most enthusiastic observers. Kasol and Groshnam Deshang are especially well-suited for younger participants. We recommend Chitkul for ages 10+ due to its high altitude.',
  },
  {
    question: 'How long are the observation sessions?',
    answer:
      'Observation typically runs across multiple sessions each night — an early-evening orientation, a prime-time telescope and deep-sky session, and late-night Milky Way or meteor watching. Total observing time spans several hours per night, with breaks and refreshments.',
  },
  {
    question: 'What happens if it is cloudy?',
    answer:
      'Weather is part of any expedition. We monitor forecasts closely and plan around the clearest windows. If clouds roll in, we shift to indoor astronomy talks, telescope demonstrations and storytelling, and make the most of any clearing throughout the night.',
  },
]
