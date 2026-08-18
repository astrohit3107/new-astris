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

  // Rajasthan weekend escapes — PLACEHOLDERS reusing existing night-sky assets.
  // Swap for real Sambhar Lake / Tijara photography (lake, salt flats, fort,
  // sunrise, telescope line-up) when available.
  // Rajasthan weekend escapes — real, correctly-attributed Creative Commons
  // photography self-hosted under /public (see rajasthan/_attribution.json).
  // Sambhar: sunset over the salt lake (CC BY-SA 3.0, Nawanshu91).
  // Tijara: the Aravalli range in Alwar, where Tijara sits (CC BY 3.0, Onef9day).
  sambhar: `${A}/rajasthan/sambhar-lake.jpg`,
  sambharMobile: `${A}/rajasthan/sambhar-lake.jpg`,
  tijara: `${A}/rajasthan/tijara.jpg`,
  tijaraMobile: `${A}/rajasthan/tijara.jpg`,
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

export type DestinationSlug =
  | 'solang-valley'
  | 'chitkul'
  | 'kasol'
  | 'sambhar-lake'
  | 'tijara'

/**
 * A single fixed-price departure option (used by the Rajasthan weekend
 * escapes, which run on published per-person pricing from a chosen city).
 * Himalayan expeditions leave this undefined and use the tailored-package flow.
 */
export interface DeparturePricing {
  /** e.g. 'Delhi → Sambhar Lake → Delhi' */
  route: string
  /** short label for cards, e.g. 'Delhi' */
  fromCity: string
  /** numeric amount in ₹ (for schema.org offers) */
  amount: number
  /** display label, e.g. '₹4,500' */
  amountLabel: string
  /** e.g. 'Double sharing' */
  accommodation: string
  featured?: boolean
}

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
  /** optional on-ground partner shown on the destination page */
  partner?: { name: string; logo: string; url?: string }
  itinerary: ItineraryDay[]

  /* --- Optional fields (used by the Rajasthan weekend escapes) ----------- */
  /** State/region for schema.org PostalAddress. Defaults to Himachal Pradesh. */
  region?: string
  /** Short category label for cards, e.g. 'Weekend Astronomy Escape'. */
  categoryLabel?: string
  /** e.g. '2 Days · 1 Night'. */
  durationLabel?: string
  /** Fixed per-person departure pricing (enables the pricing section + card price). */
  pricing?: DeparturePricing[]
  /** Seats per departure (drives the capacity messaging). */
  capacity?: number
  /** Who the experience is designed for (audience chips). */
  audience?: string[]
  /** When true, renders the "Coming with your college?" group CTA. */
  collegeGroups?: boolean
  /** Destination-specific FAQ. Falls back to the shared `faqs` when omitted. */
  faqs?: { question: string; answer: string }[]
  /**
   * When true, the destination is archived: hidden from all active promo
   * surfaces (homepage, nav dropdown, index showcase, upcoming departures,
   * registration dropdowns) while its detail page stays reachable for
   * archival / reference. Completed seasons (e.g. Chitkul) use this.
   */
  archived?: boolean
  /**
   * Optional data-driven hero stat tiles. When provided, these override the
   * default Altitude / Valley / Dark-Sky / Rating strip — so non-valley
   * destinations (the Rajasthan weekend escapes) never show a "Valley" card.
   */
  heroStats?: { label: string; value: string }[]
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
    // Completed season — archived: page stays live for reference, but Chitkul
    // no longer appears in active promo surfaces (home, nav, index, departures).
    archived: true,
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
    partner: {
      name: 'Eeshum Travels',
      logo: '/partners/eeshum-travels-logo.webp',
    },
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

  /* ======================= RAJASTHAN WEEKEND ESCAPES ======================= *
   *  Affordable Saturday-morning → Sunday astronomy weekends built for
   *  students, young professionals and college societies. These run on fixed
   *  per-person pricing (Delhi / Jaipur departures) rather than the tailored
   *  Himalayan package flow.
   * ----------------------------------------------------------------------- */
  {
    slug: 'sambhar-lake',
    name: 'Sambhar Lake',
    valley: 'Rajasthan',
    locationLabel: 'Sambhar Salt Lake, Rajasthan',
    tagline: 'India’s largest salt lake — and a sky the city forgot.',
    altitude: '360 m',
    darkSkyRating: 3,
    darkSkyLabel: 'Rural desert sky',
    bortle: 'Bortle 4',
    region: 'Rajasthan',
    bestSeason: 'October – March',
    observationConditions:
      'A flat, wide-open salt basin gives an unobstructed horizon in almost every direction. Jaipur’s glow sits low on the eastern edge, but the western and overhead sky is a genuine rural Bortle 4 — the Milky Way returns to the naked eye on clear, moonless winter nights.',
    image: IMAGES.sambhar,
    imageMobile: IMAGES.sambharMobile,
    heroImage: IMAGES.sambhar,
    categoryLabel: 'Weekend Astronomy Escape',
    durationLabel: '2 Days · 1 Night',
    heroStats: [
      { label: 'Location', value: 'Sambhar, Rajasthan' },
      { label: 'Duration', value: '2D · 1N (Sat–Sun)' },
      { label: 'Departs', value: 'Delhi / Jaipur' },
      { label: 'Dark Sky', value: 'Bortle 4' },
    ],
    capacity: 30,
    collegeGroups: true,
    overview:
      'Sambhar is India’s largest inland salt lake — a 200-square-kilometre sheet of white that empties of people the moment the sun goes down. Roughly two hours from Jaipur and an overnight run from Delhi, it trades the honking, floodlit city for a horizon so low and so dark that the stars come down to meet the salt. This is not a sightseeing tour with a telescope bolted on. The night sky is the reason we go; everything else is built around it.',
    highlights: [
      'Naked-eye Milky Way over the open salt flats',
      'Guided telescope observation — Moon, planets, clusters & nebulae',
      'Beginner astrophotography with camera and mobile',
      'A dedicated Sambhar Lake sunrise',
      'Shakambhari temple & the heritage salt works',
      'A weekend that runs on astronomy, not itineraries',
    ],
    audience: [
      'College students',
      'Young professionals',
      'Beginners in astronomy',
      'Photography enthusiasts',
      'Astronomy, physics & science clubs',
      'College & university societies',
    ],
    inclusions: [
      'Return travel from your chosen departure city (Delhi or Jaipur)',
      'One night’s accommodation on a double-sharing basis',
      'All guided stargazing and telescope observation sessions',
      'Beginner astrophotography guidance — camera and mobile',
      'A dedicated Sambhar Lake sunrise session',
      'Night-sky orientation and constellation tours with expert astronomers',
    ],
    exclusions: [
      'Meals and beverages not specified in your booking confirmation',
      'Personal expenses, shopping and tips',
      'Travel insurance and any permits',
      'Anything not explicitly listed under Inclusions',
      'Observation is always subject to weather and sky conditions',
    ],
    pricing: [
      {
        route: 'Jaipur → Sambhar Lake → Jaipur',
        fromCity: 'Jaipur',
        amount: 3500,
        amountLabel: '₹3,500',
        accommodation: 'Double sharing',
      },
      {
        route: 'Delhi → Sambhar Lake → Delhi',
        fromCity: 'Delhi',
        amount: 4500,
        amountLabel: '₹4,500',
        accommodation: 'Double sharing',
        featured: true,
      },
    ],
    itinerary: [
      {
        day: 'Saturday',
        title: 'Out of the City, Into the Salt',
        summary: 'Travel, explore the lake, then let the sky take over after sunset.',
        events: [
          { time: 'Morning', title: 'Departure from Delhi', detail: 'Set off from Delhi and travel towards Sambhar Lake. Jaipur departures join the same day.' },
          { time: 'Afternoon', title: 'Arrival & Settling In', detail: 'Reach Sambhar, check in and settle before the light goes.' },
          { time: 'Afternoon', title: 'Sambhar Exploration', detail: 'A lightweight look around the region — the Shakambhari Devi temple, the heritage salt works and the vast white lakebed. Kept short so the sky stays the point.' },
          { time: 'Sunset', title: 'First Light on the Sky', detail: 'As the sun drops, telescopes go up: the visible planets and the brightest objects first, with a naked-eye tour of the constellations to get you oriented.' },
          { time: 'Night', title: 'Flagship Astronomy Night', detail: 'The main event: guided sky orientation, telescope observation of star clusters, nebulae, planets and the Moon, celestial coordinates, and how astronomers actually find objects.' },
          { time: 'Late night', title: 'Basic Astrophotography', detail: 'Beginner-friendly night photography — tripod, ISO, aperture, shutter, focus, white balance, star trails and Milky Way basics where conditions permit, plus mobile astrophotography.' },
        ],
      },
      {
        day: 'Sunday',
        title: 'Sunrise & Return',
        summary: 'A quiet dawn over the salt, then the road home.',
        events: [
          { time: 'Pre-dawn', title: 'Sambhar Sunrise', detail: 'Wake for a dedicated sunrise over the salt flats — sunrise and landscape photography in the still morning light.' },
          { time: '08:00 – 09:00', title: 'Breakfast', detail: 'A warm breakfast and a last look at the lake.' },
          { time: 'Afternoon', title: 'Lunch & Departure', detail: 'Lunch, then begin the return journey towards Delhi or Jaipur. Trip concludes.' },
        ],
      },
    ],
    faqs: [
      { question: 'What is included in the Sambhar Lake Astroventure?', answer: 'Return travel from your chosen departure city (Delhi or Jaipur), one night’s stay on a double-sharing basis, all guided stargazing and telescope sessions, beginner astrophotography guidance, a dedicated sunrise session, and expert astronomy mentoring throughout the weekend.' },
      { question: 'Where does the trip start — Delhi or Jaipur?', answer: 'Both. You choose your departure city when you book: Delhi → Sambhar → Delhi at ₹4,500 per person, or Jaipur → Sambhar → Jaipur at ₹3,500 per person. Return travel from that city is included.' },
      { question: 'What is the accommodation like?', answer: 'Comfortable accommodation near the lake on a double-sharing basis for one night. Share your preferences when you book and we’ll do our best to accommodate them.' },
      { question: 'Is telescope observation included?', answer: 'Yes. Guided telescope observation is the heart of the weekend — the Moon, planets, star clusters, nebulae and deep-sky objects, led by expert astronomers who teach you how to navigate the sky yourself.' },
      { question: 'Is astrophotography included?', answer: 'Yes — a beginner-friendly introduction to night-sky photography with both camera and mobile: tripod technique, ISO, aperture, shutter, focus and Milky Way basics where conditions permit. It is included as part of the experience, not a separate professional workshop.' },
      { question: 'Is this suitable for complete beginners?', answer: 'Completely. The weekend is designed for first-timers, students and young professionals. No equipment or prior knowledge is needed — just curiosity and warm layers.' },
      { question: 'What happens if it is cloudy?', answer: 'Astronomy depends on the sky, so observation is always subject to weather and cloud cover. We track the forecast and work the clearest windows of the night; if clouds move in we shift to sky talks, telescope demonstrations and astrophotography theory, and make the most of any clearing.' },
      { question: 'How many participants are on each trip?', answer: 'Up to 30 participants per departure, so the group stays social while everyone still gets real time at the telescope.' },
      { question: 'Can college groups or societies join?', answer: 'Yes — Sambhar is deliberately priced for students. Astronomy clubs, physics and science societies, photography clubs and college communities can book a dedicated group departure. Use “Plan a College Astronomy Trip” to talk to us.' },
      { question: 'What should I bring?', answer: 'Warm layered clothing (desert nights get cold in winter), comfortable shoes, a head-torch (red light preferred), any personal medication, and a camera or phone if you’d like to try astrophotography. A full checklist is shared on booking.' },
    ],
  },
  {
    slug: 'tijara',
    name: 'Tijara',
    valley: 'Alwar, Rajasthan',
    locationLabel: 'Tijara, Alwar · Rajasthan',
    tagline: 'A Delhi weekend where the Aravallis swallow the city glow.',
    altitude: '320 m',
    darkSkyRating: 3,
    darkSkyLabel: 'Aravalli rural sky',
    bortle: 'Bortle 4',
    region: 'Rajasthan',
    bestSeason: 'October – March',
    observationConditions:
      'Tucked into the Aravalli country of Alwar, the low ridgelines block a slice of the Delhi-NCR light dome to the north-east. It is an honest rural Bortle 4 — not a remote desert, but a dramatic step down from Delhi’s washed-out Bortle 8–9 sky, with the Milky Way and hundreds of stars back in view on clear winter nights.',
    image: IMAGES.tijara,
    imageMobile: IMAGES.tijaraMobile,
    heroImage: IMAGES.tijara,
    categoryLabel: 'Weekend Astronomy Escape',
    durationLabel: '2 Days · 1 Night',
    heroStats: [
      { label: 'Location', value: 'Tijara, Alwar · Rajasthan' },
      { label: 'Duration', value: '2D · 1N (Sat–Sun)' },
      { label: 'Departs', value: 'Delhi / Jaipur' },
      { label: 'Dark Sky', value: 'Bortle 4' },
    ],
    capacity: 30,
    collegeGroups: true,
    overview:
      'Tijara is the closest a Delhi student can get to a real dark sky on a student budget. A couple of hours south of the city in the Aravalli hills of Alwar, it swaps the NCR’s permanent orange haze for quiet heritage country — the restored Tijara Fort-Palace on one ridge, a Jain pilgrimage temple down the road, and above it all a sky that actually has stars in it. The weekend is built around the telescope and the night, with just enough of the region by day to stretch your legs.',
    highlights: [
      'A real dark-ish sky within reach of Delhi',
      'Guided telescope observation of planets, clusters & nebulae',
      'Beginner astrophotography with camera and mobile',
      'Sunrise over the Aravalli country',
      'Tijara Fort-Palace & heritage surroundings',
      'Built for college groups and first-time stargazers',
    ],
    audience: [
      'College students',
      'Young professionals',
      'Beginners in astronomy',
      'Photography enthusiasts',
      'Astronomy, physics & science clubs',
      'Delhi-NCR student communities',
    ],
    inclusions: [
      'Return travel from your chosen departure city (Delhi or Jaipur)',
      'One night’s accommodation on a double-sharing basis',
      'All guided stargazing and telescope observation sessions',
      'Beginner astrophotography guidance — camera and mobile',
      'A dedicated Aravalli sunrise session',
      'Night-sky orientation and constellation tours with expert astronomers',
    ],
    exclusions: [
      'Meals and beverages not specified in your booking confirmation',
      'Personal expenses, shopping and tips',
      'Travel insurance and any permits',
      'Anything not explicitly listed under Inclusions',
      'Observation is always subject to weather and sky conditions',
    ],
    pricing: [
      {
        route: 'Delhi → Tijara → Delhi',
        fromCity: 'Delhi',
        amount: 3500,
        amountLabel: '₹3,500',
        accommodation: 'Double sharing',
        featured: true,
      },
      {
        route: 'Jaipur → Tijara → Jaipur',
        fromCity: 'Jaipur',
        amount: 4500,
        amountLabel: '₹4,500',
        accommodation: 'Double sharing',
      },
    ],
    itinerary: [
      {
        day: 'Saturday',
        title: 'Out of the City, Into the Dark',
        summary: 'A short run from Delhi, a little Alwar heritage, then the sky.',
        events: [
          { time: 'Morning', title: 'Departure from Delhi', detail: 'Leave Delhi and drive into the Aravalli country around Tijara. Jaipur departures join the same day.' },
          { time: 'Afternoon', title: 'Arrival & Check-in', detail: 'Reach Tijara and settle in before the light goes.' },
          { time: 'Afternoon', title: 'Local Sightseeing', detail: 'A lightweight visit to the heritage Tijara Fort-Palace and the nearby Tijara Jain temple — kept short so the astronomy stays the focus.' },
          { time: 'Sunset', title: 'First Light on the Sky', detail: 'Telescopes go up as the sun drops: the visible planets and brightest objects first, with naked-eye constellation identification and seasonal sky orientation.' },
          { time: 'Night', title: 'Flagship Astronomy Night', detail: 'Guided stargazing, telescope observation of clusters, nebulae, planets and the Moon, astronomy storytelling, and hands-on practical telescope use.' },
          { time: 'Late night', title: 'Basic Astrophotography', detail: 'Camera set-up and manual controls — ISO, shutter, aperture, manual focus, tripod technique and Milky Way basics where conditions permit, plus simple mobile astrophotography.' },
        ],
      },
      {
        day: 'Sunday',
        title: 'Sunrise & Return',
        summary: 'A calm Aravalli dawn before the drive back.',
        events: [
          { time: 'Pre-dawn', title: 'Aravalli Sunrise', detail: 'A dedicated sunrise session with landscape and sunrise photography in the quiet morning light.' },
          { time: '08:00 – 09:00', title: 'Breakfast', detail: 'A warm breakfast before wrapping up.' },
          { time: 'Afternoon', title: 'Lunch & Departure', detail: 'Lunch, then depart for Delhi or Jaipur. Trip concludes.' },
        ],
      },
    ],
    faqs: [
      { question: 'What is included in the Tijara Astroventure?', answer: 'Return travel from your chosen departure city (Delhi or Jaipur), one night’s stay on a double-sharing basis, all guided stargazing and telescope sessions, beginner astrophotography guidance, a dedicated sunrise session, and expert astronomy mentoring across the weekend.' },
      { question: 'Can I join from Delhi?', answer: 'Yes — Tijara is positioned as a Delhi weekend getaway. Delhi → Tijara → Delhi is ₹3,500 per person. You can also join from Jaipur (Jaipur → Tijara → Jaipur) at ₹4,500 per person. Return travel from your chosen city is included.' },
      { question: 'How dark is the sky, really?', answer: 'Tijara is an honest rural Bortle 4 — not a remote desert, but a dramatic improvement on Delhi’s Bortle 8–9 city sky. On a clear, moonless winter night the Milky Way and hundreds of stars come back into view. We never promise a specific rating on a given night; conditions depend on weather and the Moon.' },
      { question: 'What is the accommodation?', answer: 'Comfortable accommodation in the Tijara area on a double-sharing basis for one night. Tell us your preferences when booking and we’ll try to match them.' },
      { question: 'Is telescope observation and astrophotography included?', answer: 'Both are included. Guided telescope observation of planets, clusters and nebulae is the centrepiece, alongside a beginner-friendly introduction to night-sky photography with camera and mobile. It’s an included experience, not a separate professional workshop.' },
      { question: 'Is this suitable for beginners?', answer: 'Yes — it’s designed for first-timers, students and young professionals. No prior experience or equipment is required.' },
      { question: 'What happens if the weather is cloudy?', answer: 'Observation is always subject to weather and cloud cover. We follow the forecast and use the clearest windows; if it clouds over we move to sky talks, telescope demos and astrophotography theory, and make the most of any break in the clouds.' },
      { question: 'How many people come along?', answer: 'Up to 30 participants per departure — sociable, but small enough that everyone gets real time at the eyepiece.' },
      { question: 'Can college groups join?', answer: 'Absolutely. Tijara is priced for students, and astronomy clubs, physics and science societies and photography clubs can book a dedicated group departure. Use “Plan a College Astronomy Trip” to reach us.' },
      { question: 'What should I bring?', answer: 'Warm layers (winter nights get cold), comfortable shoes, a red-light head-torch, personal medication, and a camera or phone for astrophotography. A full checklist is shared on booking.' },
    ],
  },
]

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

/**
 * Active destinations only — everything not marked `archived`. This is the
 * single list that drives every active promo surface (index showcase,
 * registration dropdown, related destinations). Archived destinations keep
 * their detail page but never appear in discovery.
 */
export const activeDestinations: Destination[] = destinations.filter((d) => !d.archived)

/** Slugs of archived destinations, for quick lookups. */
export const archivedSlugs = new Set(
  destinations.filter((d) => d.archived).map((d) => d.slug),
)

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
 * ------------------------------------------------------------------------- *
 *  Himalayan expeditions are hand-scheduled batches (listed explicitly below).
 *  The Rajasthan weekend escapes run EVERY weekend across the season, so their
 *  Saturday→Sunday slots are GENERATED from real calendar dates (never hand-typed
 *  weekdays) by `weekendSlots()`. To extend or shorten the season, edit
 *  WEEKEND_SEASON_START / WEEKEND_SEASON_END — no other change needed. Capacity
 *  is a real number (30 seats); availability is not faked, so every generated
 *  weekend opens with all 30 seats until a booking backend is connected.
 * ------------------------------------------------------------------------- */

/** Season window for the auto-generated Rajasthan weekend departures. */
export const WEEKEND_SEASON_START = '2026-08-01'
export const WEEKEND_SEASON_END = '2026-12-31'

interface WeekendSlotOpts {
  slug: DestinationSlug
  idPrefix: string
  batchName: string
  seatsTotal?: number
  seasonStart?: string
  seasonEnd?: string
}

/**
 * Generate a Saturday→Sunday `SlotEvent` for every weekend in the season window,
 * starting from the next Saturday on or after today (so past weekends drop off
 * automatically). Weekdays are derived from the real calendar via `Date`.
 */
export function weekendSlots({
  slug,
  idPrefix,
  batchName,
  seatsTotal = 30,
  seasonStart = WEEKEND_SEASON_START,
  seasonEnd = WEEKEND_SEASON_END,
}: WeekendSlotOpts): SlotEvent[] {
  const start = new Date(`${seasonStart}T12:00:00Z`)
  const end = new Date(`${seasonEnd}T12:00:00Z`)
  const now = new Date()
  const cursor = new Date(Math.max(start.getTime(), now.getTime()))
  cursor.setUTCHours(12, 0, 0, 0)
  // Advance to the next Saturday (UTC day 6).
  while (cursor.getUTCDay() !== 6) cursor.setUTCDate(cursor.getUTCDate() + 1)

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })

  const out: SlotEvent[] = []
  while (cursor.getTime() <= end.getTime()) {
    const sat = new Date(cursor)
    const sun = new Date(cursor)
    sun.setUTCDate(sun.getUTCDate() + 1)
    const iso = sat.toISOString().slice(0, 10)
    out.push({
      id: `${idPrefix}-${iso}`,
      batchName,
      destinationSlug: slug,
      date: iso,
      dateLabel: `${fmt(sat)} – ${fmt(sun)} ${sun.getUTCFullYear()}`,
      nights: 1,
      seatsTotal,
      seatsAvailable: seatsTotal,
      status: 'open',
    })
    cursor.setUTCDate(cursor.getUTCDate() + 7)
  }
  return out
}

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

  // --- Rajasthan weekend escapes — every weekend of the season ------------
  ...weekendSlots({ slug: 'sambhar-lake', idPrefix: 'sl', batchName: 'Sambhar Lake Weekend' }),
  ...weekendSlots({ slug: 'tijara', idPrefix: 'tj', batchName: 'Tijara Weekend' }),
]

export function eventsForDestination(slug: DestinationSlug): SlotEvent[] {
  return events
    .filter((e) => e.destinationSlug === slug)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * All upcoming departures for active destinations, earliest first. Archived
 * destinations (e.g. completed Chitkul seasons) are excluded so they never
 * surface in the calendar, book-slots or registration date pickers.
 */
export const upcomingEvents = [...events]
  .filter((e) => !archivedSlugs.has(e.destinationSlug))
  .sort((a, b) => a.date.localeCompare(b.date))

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
