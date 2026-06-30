/**
 * ============================================================================
 *  ASTROVENTURE SPITI '26 — FLAGSHIP EXPEDITION · SINGLE SOURCE OF CONTENT
 * ============================================================================
 *
 *  Everything about Astroventure Spiti '26 — across the homepage hero,
 *  featured section, announcement bar, calendar, navigation, promo pop-up and
 *  the dedicated expedition page — reads from THIS file. Edit copy, dates,
 *  pricing, seats, itinerary, gallery or FAQ here and the whole site updates.
 *  No component changes needed.
 *
 *  Images reuse the existing `/public/astroventure-assets` library so the
 *  experience is cinematic out of the box. Swap any value below for your own
 *  Spiti photography (drop files into /public and reference them here).
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. CORE EXPEDITION DETAILS  (edit freely)
 * ------------------------------------------------------------------------- */
export const SPITI = {
  name: 'Astroventure Spiti ’26',
  shortName: 'Spiti ’26',
  tagline: 'Where the Himalayas Meet the Milky Way.',
  subheading:
    'An Eight-Day High-Altitude Astronomy Expedition through the Himalayas.',

  /** Marketing positioning line used across the site. */
  positioning: 'India’s Most Premium High-Altitude Astronomy Expedition',

  /** Dates */
  startDateISO: '2026-09-20',
  endDateISO: '2026-09-28',
  dateLabel: '20 – 28 September 2026',
  dateLabelShort: '20–28 Sep 2026',

  /** Duration */
  days: 8,
  nights: 7,
  durationLabel: '8 Days · 7 Nights',

  /** Pricing tiers (₹). Edit amounts or add tiers freely. */
  pricing: [
    {
      id: 'delhi',
      route: 'Delhi → Delhi',
      label: 'Delhi to Delhi',
      amount: 79999,
      amountLabel: '₹79,999',
      note: 'All Delhi transfers included',
    },
    {
      id: 'spiti',
      route: 'Spiti → Spiti',
      label: 'Spiti to Spiti',
      amount: 69999,
      amountLabel: '₹69,999',
      note: 'Join the expedition on-ground',
    },
  ],

  /** Lead price shown in compact spots (announcement bar, cards). */
  fromPriceLabel: '₹69,999',

  /** Seats — kept as an editable string so it can change to a number later. */
  seatsLabel: 'Limited Seats',

  /** Route used by every CTA across the site. */
  path: '/astroventure-spiti-26',
  bookingPath: '/astroventure-spiti-26#book',

  /** Calendar status. */
  status: 'open' as 'open' | 'filling' | 'soldout',
  statusLabel: 'Open',
} as const

/* ---------------------------------------------------------------------------
 * 2. CONTACT  (shared with the rest of the Astris ecosystem)
 * ------------------------------------------------------------------------- */
export const SPITI_CONTACT = {
  brand: 'Astris Space',
  phone: '+91 75818 21834',
  whatsapp: '917581821834',
  email: 'astriseducation@gmail.com',
  bookingPhone: '+91 75818 21834',
} as const

/* ---------------------------------------------------------------------------
 * 3. IMAGE ASSETS  (reuse / replace with your own Spiti photography)
 * ------------------------------------------------------------------------- */
const A = '/astroventure-assets'

export const SPITI_IMAGES = {
  heroMilkyWay: `${A}/hero/hero-himalayan-milkyway.webp`,
  heroMilkyWayMobile: `${A}/hero/hero-himalayan-milkyway-mobile.webp`,
  milkyWayArch: `${A}/milky-way/milkyway-panoramic-arch.webp`,
  landscapePrimary: `${A}/chitkul/chitkul-village-stars.webp`,
  landscapeSecondary: `${A}/solang-valley/solang-valley-night.webp`,
  landscapeTertiary: `${A}/kasol/kasol-riverside-dusk.webp`,
  telescope: `${A}/telescopes/telescope-setup-general.webp`,
  starTrails: `${A}/activities/star-trails-mountains.webp`,
  astrophotography: `${A}/activities/astrophotography-setup.webp`,
  stargazingGroup: `${A}/stargazing/stargazing-group-01.webp`,
  laser: `${A}/stargazing/stargazing-pointing-laser.webp`,
  footerNebula: `${A}/backgrounds/footer-nebula.webp`,
} as const

/* ---------------------------------------------------------------------------
 * 4. EXPEDITION OVERVIEW
 * ------------------------------------------------------------------------- */
export const SPITI_OVERVIEW =
  'Astroventure Spiti ’26 is a premium scientific road expedition combining astronomy, astrophotography, Himalayan exploration, experiential learning and immersive night-sky observations under some of India’s darkest skies. Over eight days we travel from Delhi deep into the Spiti Valley — climbing past 4,000 metres — chasing clear, high-altitude air where the Milky Way casts shadows and the universe feels close enough to touch.'

/* ---------------------------------------------------------------------------
 * 5. EXPEDITION HIGHLIGHTS  (lucide icon names)
 * ------------------------------------------------------------------------- */
export interface SpitiHighlight {
  title: string
  icon: string
}

export const spitiHighlights: SpitiHighlight[] = [
  { title: 'Premium Stay', icon: 'BedDouble' },
  { title: 'Luxury Tempo Traveller', icon: 'Bus' },
  { title: 'Delhi Transfers Included', icon: 'MapPin' },
  { title: 'All Meals', icon: 'Utensils' },
  { title: 'Professional Astronomy Team', icon: 'Users' },
  { title: 'Large Telescopes', icon: 'Telescope' },
  { title: 'Solar Observation', icon: 'Sun' },
  { title: 'Milky Way Photography', icon: 'Camera' },
  { title: 'Deep Space Observation', icon: 'Orbit' },
  { title: 'Scientific Sky Tours', icon: 'Compass' },
  { title: 'Daily Astronomy Workshops', icon: 'GraduationCap' },
  { title: 'Interactive Activities', icon: 'Sparkles' },
  { title: 'Photography Assistance', icon: 'Aperture' },
  { title: 'Small Group Experience', icon: 'UsersRound' },
  { title: 'Curated Expedition Kit', icon: 'Package' },
  { title: 'Completion Certificate', icon: 'Award' },
]

/** The seven hero-card pillars used in the homepage feature card. */
export const spitiPillars: SpitiHighlight[] = [
  { title: 'Premium Stay', icon: 'BedDouble' },
  { title: 'Travel Included', icon: 'Bus' },
  { title: 'Astronomy Expedition', icon: 'Telescope' },
  { title: 'Astrophotography', icon: 'Camera' },
  { title: 'Stargazing', icon: 'Star' },
  { title: 'Dark Sky Reserve', icon: 'Moon' },
  { title: 'Interactive Workshops', icon: 'GraduationCap' },
]

/* ---------------------------------------------------------------------------
 * 6. 8-DAY ITINERARY
 * ------------------------------------------------------------------------- */
export interface SpitiDay {
  day: number
  route: string
  title: string
  highlights: string[]
}

export const spitiItinerary: SpitiDay[] = [
  {
    day: 1,
    route: 'Delhi → Narkanda',
    title: 'The Journey Begins',
    highlights: [
      'Road journey out of the plains',
      'Ice breakers & expedition briefing',
      'Introduction to Astronomy',
      'Night Sky Orientation',
      'Welcome Stargazing',
    ],
  },
  {
    day: 2,
    route: 'Narkanda → Kalpa',
    title: 'Into the Mountains',
    highlights: [
      'Photography stops en route',
      'Apple orchards of Kinnaur',
      'Telescope Session',
      'Moon & Saturn through the optics',
      'Astrophotography Workshop',
    ],
  },
  {
    day: 3,
    route: 'Kalpa → Tabo',
    title: 'Entering Spiti',
    highlights: [
      'Crossing into the Spiti Valley',
      'Ancient monastery visit',
      'Milky Way Photography',
      'Deep Sky Observation',
    ],
  },
  {
    day: 4,
    route: 'Tabo → Kaza',
    title: 'Heart of the Valley',
    highlights: [
      'Scientific exploration',
      'Telescope Workshop',
      'Deep Sky Objects',
      'Galaxies & Nebulae',
      'Night Observation',
    ],
  },
  {
    day: 5,
    route: 'Langza · Hikkim · Komic',
    title: 'The High Villages',
    highlights: [
      'Explore the world’s highest villages',
      'Solar Observation & Sunspots',
      'Astrophotography Masterclass',
      'Late Night Deep Sky Session',
    ],
  },
  {
    day: 6,
    route: 'Kaza Exploration',
    title: 'Citizen Science Day',
    highlights: [
      'Citizen Science Activities',
      'Advanced Astrophotography',
      'Nightscape Photography',
      'Milky Way Portrait Session',
    ],
  },
  {
    day: 7,
    route: 'Kaza → Chandratal / Manali Side',
    title: 'Reflection & Farewell',
    highlights: [
      'Reflection on the expedition',
      'Campfire (where permitted)',
      'Farewell Stargazing',
      'Awards & Certificates',
    ],
  },
  {
    day: 8,
    route: 'Return to Delhi',
    title: 'The Journey Home',
    highlights: [
      'Breakfast together',
      'Photo sharing',
      'The journey ends',
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 7. ASTRONOMY NIGHTS  (themed experiences instead of generic "stargazing")
 * ------------------------------------------------------------------------- */
export interface SpitiNight {
  night: number
  theme: string
  description: string
}

export const spitiNights: SpitiNight[] = [
  {
    night: 1,
    theme: 'Sky Orientation',
    description:
      'Find your bearings among the stars — constellations, planets and the architecture of the night sky.',
  },
  {
    night: 2,
    theme: 'Planets & Moon',
    description:
      'Saturn’s rings, Jupiter’s moons and the cratered surface of the Moon through premium optics.',
  },
  {
    night: 3,
    theme: 'Deep Sky Objects',
    description:
      'Nebulae, star clusters and distant galaxies emerge from the high-altitude darkness.',
  },
  {
    night: 4,
    theme: 'Professional Telescope Night',
    description:
      'A full night on large research-grade telescopes guided by our astronomy team.',
  },
  {
    night: 5,
    theme: 'Milky Way Expedition',
    description:
      'The galactic core overhead — long-exposure photography and naked-eye wonder.',
  },
  {
    night: 6,
    theme: 'Farewell Under The Stars',
    description:
      'A final night beneath the cosmos — portraits, star trails and shared silence.',
  },
]

/* ---------------------------------------------------------------------------
 * 8. EXCLUSIVE EXPERIENCES  (premium differentiators)
 * ------------------------------------------------------------------------- */
export const spitiExclusiveExperiences: string[] = [
  'Professional telescope observations',
  'Laser-guided sky tours',
  'Milky Way portrait photography',
  'Personal astrophotography assistance',
  'Solar observation through dedicated solar telescopes',
  'Dark Sky storytelling',
  'Deep Space observation',
  'Citizen Science activities',
  'Time-lapse photography',
  'Nightscape photography',
  'Star trails',
  'Constellation challenges',
  'Astronomy quiz',
  'Scientific discussions',
]

/* ---------------------------------------------------------------------------
 * 9. EXPEDITION KIT  (a premium memory package — lucide icons)
 * ------------------------------------------------------------------------- */
export interface SpitiKitItem {
  title: string
  description: string
  icon: string
}

export const spitiKit: SpitiKitItem[] = [
  {
    title: 'Premium Astroventure Certificate',
    description: 'A beautifully designed certificate marking your expedition.',
    icon: 'Award',
  },
  {
    title: 'Astronomy Field Journal',
    description: 'Log observations, sketches and notes from each night.',
    icon: 'NotebookPen',
  },
  {
    title: 'Exclusive Expedition Merchandise',
    description: 'Curated Astroventure apparel and accessories.',
    icon: 'Shirt',
  },
  {
    title: 'Printed Polaroid Photographs',
    description: 'Instant prints captured with you during the expedition.',
    icon: 'Image',
  },
  {
    title: 'Edited Milky Way Portrait',
    description: 'A professionally edited portrait of you beneath the galaxy.',
    icon: 'Camera',
  },
  {
    title: 'Curated Astronomy Souvenirs',
    description: 'Hand-picked keepsakes from the cosmos.',
    icon: 'Star',
  },
  {
    title: 'Digital Photo Collection',
    description: 'A full gallery of expedition photography to keep.',
    icon: 'FolderDown',
  },
  {
    title: 'Commemorative Keepsakes',
    description: 'Mementos to remember Spiti ’26 forever.',
    icon: 'Gift',
  },
]

/* ---------------------------------------------------------------------------
 * 10. INCLUSIONS / EXCLUSIONS
 * ------------------------------------------------------------------------- */
export const spitiInclusions: string[] = [
  'Premium Accommodation',
  'Travel',
  'Meals',
  'Internal Transfers',
  'Astronomy Equipment',
  'Professional Educators',
  'Astrophotography Sessions',
  'Photography Assistance',
  'Permits',
  'Certificates',
  'Expedition Kit',
]

export const spitiExclusions: string[] = [
  'Personal Expenses',
  'Insurance',
  'Anything not mentioned',
]

/* ---------------------------------------------------------------------------
 * 11. GALLERY  (placeholders — swap for your Spiti photography)
 * ------------------------------------------------------------------------- */
export interface SpitiGalleryImage {
  src: string
  alt: string
  category: string
  span?: 'tall' | 'wide' | 'normal'
}

export const spitiGallery: SpitiGalleryImage[] = [
  { src: `${A}/milky-way/milkyway-panoramic-arch.webp`, alt: 'The Milky Way arching over the Spiti Himalayas', category: 'Milky Way', span: 'wide' },
  { src: `${A}/telescopes/telescope-setup-general.webp`, alt: 'A research-grade telescope set up under the stars', category: 'Telescopes', span: 'normal' },
  { src: `${A}/chitkul/chitkul-village-stars.webp`, alt: 'A high Himalayan village beneath a star-filled sky', category: 'Landscapes', span: 'tall' },
  { src: `${A}/stargazing/stargazing-group-01.webp`, alt: 'Participants gathered for a night of observation', category: 'Participants', span: 'normal' },
  { src: `${A}/activities/star-trails-mountains.webp`, alt: 'Star trails circling above the mountains', category: 'Night Photography', span: 'normal' },
  { src: `${A}/solang-valley/solang-valley-night.webp`, alt: 'A high-altitude camp under the cosmos', category: 'Camp', span: 'wide' },
  { src: `${A}/activities/astrophotography-setup.webp`, alt: 'An astrophotography rig framing the night sky', category: 'Night Photography', span: 'normal' },
  { src: `${A}/stargazing/stargazing-pointing-laser.webp`, alt: 'A laser-guided sky tour in progress', category: 'Stargazing', span: 'tall' },
  { src: `${A}/kasol/kasol-riverside-dusk.webp`, alt: 'Dusk settling over the Himalayan valley', category: 'Landscapes', span: 'normal' },
]

export const spitiGalleryCategories = [
  'All',
  'Milky Way',
  'Telescopes',
  'Landscapes',
  'Participants',
  'Night Photography',
  'Camp',
  'Stargazing',
] as const

/* ---------------------------------------------------------------------------
 * 12. FAQ
 * ------------------------------------------------------------------------- */
export const spitiFaqs: { question: string; answer: string }[] = [
  {
    question: 'How fit do I need to be for this expedition?',
    answer:
      'A reasonable level of general fitness is enough. This is a road expedition with short walks and gentle village exploration — no technical trekking. We travel at a measured pace with regular stops, and our team is trained to support participants throughout.',
  },
  {
    question: 'What about altitude sickness?',
    answer:
      'The expedition is designed with gradual acclimatisation — we gain altitude steadily over several days before reaching Kaza (~3,800 m) and the high villages above 4,000 m. We carry oxygen and a first-aid kit, monitor everyone closely, and brief you on hydration and rest. Inform us in advance of any medical condition.',
  },
  {
    question: 'Which camera should I bring?',
    answer:
      'Any camera with manual mode and a tripod will let you capture the Milky Way — a DSLR or mirrorless with a fast wide-angle lens (f/2.8 or faster) is ideal. Even a modern smartphone with night mode works for many shots. Our team provides hands-on astrophotography assistance regardless of your gear.',
  },
  {
    question: 'What will the weather be like?',
    answer:
      'Late September in Spiti brings crisp, dry, exceptionally clear skies — among the best of the year for astronomy. Days are pleasant; nights at altitude are cold (often below freezing). Warm layered clothing is essential, and a full packing list is shared on booking.',
  },
  {
    question: 'Will I have phone network and internet?',
    answer:
      'Connectivity is limited in Spiti — only postpaid BSNL/Jio works in parts of the valley, and signal is patchy. Consider it a feature: disconnecting from screens is part of the experience. We stay reachable for emergencies throughout.',
  },
  {
    question: 'What is the accommodation like?',
    answer:
      'Premium handpicked stays — comfortable hotels, homestays and curated camps depending on the location — all on a twin-sharing basis with the best available comfort at each altitude. Every stay is chosen for warmth, hygiene and dark surroundings for observation.',
  },
  {
    question: 'What food is provided?',
    answer:
      'All meals are included — fresh, hot, hygienic vegetarian and local cuisine throughout the journey. Let us know dietary preferences or restrictions in advance and we will accommodate them wherever possible.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Booking amounts secure your limited seat. Cancellation terms and refund windows are shared in detail at the time of booking. We recommend optional travel insurance, which is not included in the package.',
  },
  {
    question: 'What should I carry?',
    answer:
      'Warm layered clothing, a heavy jacket, gloves and a beanie, sturdy shoes, a head-torch (red-light preferred), sunglasses, sunscreen, personal medication, a power bank and your camera. A complete checklist is shared once you book.',
  },
  {
    question: 'Is this expedition beginner friendly?',
    answer:
      'Absolutely. Astroventure Spiti ’26 is built for complete beginners as well as seasoned enthusiasts. Our astronomers start with the fundamentals and scale the depth of each session to the group — you need only bring curiosity.',
  },
]

/* ---------------------------------------------------------------------------
 * 13. CALENDAR ENTRY  (drives the Expedition Calendar surfaces)
 * ------------------------------------------------------------------------- */
export const spitiCalendarEntry = {
  name: SPITI.name,
  dateLabel: SPITI.dateLabel,
  status: SPITI.status,
  statusLabel: SPITI.statusLabel,
  href: SPITI.bookingPath,
  seatsLabel: SPITI.seatsLabel,
  fromPriceLabel: SPITI.fromPriceLabel,
} as const
