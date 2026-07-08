/**
 * ============================================================================
 *  ASTROVENTURE ASTROPHOTOGRAPHY EXPEDITION · SINGLE SOURCE OF CONTENT
 * ============================================================================
 *
 *  Everything about the Astroventure Astrophotography Expedition — hero,
 *  trainer, curriculum, itinerary, pricing, galleries, FAQ and the booking
 *  form — reads from THIS file. Edit copy, dates, pricing, trainer details,
 *  images or links here and the whole page updates. No component changes
 *  needed. The page is fully self-contained and does not affect other pages.
 *
 *  IMAGES: cinematic placeholders reuse the existing `/astroventure-assets`
 *  library so the experience looks premium out of the box. Every image is a
 *  placeholder — drop your own files into /public and update the paths below.
 *  Portfolio & student galleries intentionally use neutral placeholders to be
 *  replaced with the real photography of Jhankrit Ahuja and future batches.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. CORE EXPEDITION DETAILS  (edit freely)
 * ------------------------------------------------------------------------- */
export const ASTRO = {
  name: 'Astroventure Astrophotography Expedition',
  shortName: 'Astrophotography',
  heading: 'Astroventure Astrophotography Expedition',
  subheading: 'Master the Night Sky in the Himalayas.',
  intro:
    'Join a six-day immersive expedition to learn Milky Way photography, deep-space imaging, star trails, timelapse creation, landscape composition, and professional post-processing under some of India’s darkest skies.',

  /** Marketing positioning line used across the page. */
  positioning: 'A Premium Astrophotography Masterclass & Adventure',

  /** Duration */
  days: 6,
  nights: 5,
  durationLabel: '6 Days · 5 Nights',
  durationLabelShort: '6D / 5N',

  /** Where */
  locations: ['Leh', 'Pangong', 'Hanle', 'Tso Moriri'],
  locationsLabel: 'Leh • Pangong • Hanle • Tso Moriri',
  region: 'Ladakh, India',

  /** When — editable placeholder batch windows. */
  batchesLabel: 'September & October New Moon Batches',
  batches: [
    { id: 'sep', label: 'September New Moon Batch', note: 'Aligned to the darkest skies' },
    { id: 'oct', label: 'October New Moon Batch', note: 'Crisp autumn nights' },
  ],

  /** Group / level */
  groupLabel: 'Limited Small-Group Mentoring',
  levelLabel: 'Beginners & Intermediate Photographers',

  /** Pricing tiers (₹). Edit amounts or add tiers freely. */
  fromPriceLabel: '₹50,000',

  /** Routes used by CTAs across the page. */
  path: '/astroventure-astrophotography',
  bookingPath: '/astroventure-astrophotography#book',
  brochurePath: '#', // TODO: replace with the brochure PDF URL when available

  /** Seats. */
  seatsLabel: 'Limited Seats',
} as const

/* ---------------------------------------------------------------------------
 * 2. CONTACT  (shared with the rest of the Astris ecosystem)
 * ------------------------------------------------------------------------- */
export const ASTRO_CONTACT = {
  brand: 'Astris Space',
  phone: '+91 75818 21834',
  whatsapp: '917581821834',
  email: 'astriseducation@gmail.com',
  bookingPhone: '+91 75818 21834',
} as const

/** The Astris Space brand logo. */
export const ASTRO_BRAND_LOGO = '/logo.svg'

/* ---------------------------------------------------------------------------
 * 3. IMAGE ASSETS  (all placeholders — replace with your own photography)
 * ------------------------------------------------------------------------- */
const A = '/astroventure-assets'

export const ASTRO_IMAGES = {
  // Hero — placeholder: a photographer capturing the Milky Way beside Pangong Lake
  hero: `${A}/hero/hero-himalayan-milkyway.webp`,
  heroMobile: `${A}/hero/hero-himalayan-milkyway-mobile.webp`,
  // Introduction / editorial
  introMilkyWay: `${A}/milky-way/milkyway-panoramic-arch.webp`,
  // Trainer portrait — neutral placeholder to be replaced with a portrait of Jhankrit Ahuja
  trainer: '/placeholder-user.jpg',
  // Field / experience imagery
  astrophotographySetup: `${A}/activities/astrophotography-setup.webp`,
  starTrails: `${A}/activities/star-trails-mountains.webp`,
  telescope: `${A}/telescopes/telescope-apochromatic.webp`,
  stargazingGroup: `${A}/stargazing/stargazing-group-01.webp`,
  laser: `${A}/stargazing/stargazing-pointing-laser.webp`,
  footerNebula: `${A}/backgrounds/footer-nebula.webp`,
  // CTA / limited-seats backdrops
  ctaBackdrop: `${A}/milky-way/milkyway-panoramic-arch.webp`,
} as const

/* ---------------------------------------------------------------------------
 * 4. HERO INFORMATION CARDS
 * ------------------------------------------------------------------------- */
export interface AstroFact {
  icon: string
  value: string
}

export const astroHeroFacts: AstroFact[] = [
  { icon: 'Clock', value: '6 Days / 5 Nights' },
  { icon: 'MapPin', value: 'Leh • Pangong • Hanle • Tso Moriri' },
  { icon: 'Moon', value: 'September & October New Moon Batches' },
  { icon: 'UsersRound', value: 'Limited Small-Group Mentoring' },
  { icon: 'GraduationCap', value: 'Beginners & Intermediate Friendly' },
]

/* ---------------------------------------------------------------------------
 * 5. INTRODUCTION  (a field workshop, not a tour)
 * ------------------------------------------------------------------------- */
export const ASTRO_INTRO_LEAD =
  'This is not just another photography tour. It is a field workshop — a hands-on masterclass conducted entirely beneath the stars, where every technique is taught the moment you can use it.'

export const ASTRO_INTRO_BODY =
  'Across six days and five nights, participants learn the complete craft of night-sky photography — from the fundamentals of the camera to advanced deep-space imaging and a professional editing workflow. Every night is spent under exceptionally dark skies with continuous mentorship from a professional astrophotographer, so learning never stops when the sun goes down.'

export const astroIntroSkills: string[] = [
  'Camera fundamentals',
  'Night sky planning',
  'Landscape composition',
  'Milky Way photography',
  'Star trail photography',
  'Timelapse creation',
  'Deep-space imaging',
  'Image stacking',
  'Professional editing workflow',
  'Visual astronomy',
]

/* ---------------------------------------------------------------------------
 * 6. MEET YOUR TRAINER  (all fields editable placeholders)
 * ------------------------------------------------------------------------- */
export const ASTRO_TRAINER = {
  name: 'Jhankrit Ahuja',
  title: 'Professional Astrophotographer & Mentor',
  portrait: ASTRO_IMAGES.trainer,

  /** Placeholder biography — to be updated later. */
  bio: 'Jhankrit Ahuja is a professional astrophotographer specialising in Milky Way landscapes, deep-sky imaging, timelapse cinematography and high-altitude astrophotography. With years spent chasing dark skies across the Himalayas, his work bridges the technical precision of astronomy with the artistry of landscape photography. As an educator, he is known for a patient, hands-on teaching style that takes complete beginners to confident night-sky photographers.',
  bioNote: 'This biography is placeholder text and will be updated later.',

  /** Specialisations. */
  specialties: [
    'Milky Way Landscapes',
    'Deep Sky Imaging',
    'Timelapse Cinematography',
    'High-Altitude Astrophotography',
    'Photography Education',
  ],

  /** Editable placeholder credentials. */
  yearsExperience: '10+',
  achievements: [
    'Award-winning astrophotography (placeholder)',
    'Published landscape & night-sky work (placeholder)',
    'Featured astrophotography workshops (placeholder)',
  ],
  awards: 'Awards & recognition — to be added.',
  publications: 'Publications & features — to be added.',

  /** Links — replace with real URLs. */
  instagram: '#',
  website: '#',
  portfolio: '#',
} as const

/* ---------------------------------------------------------------------------
 * 7. WHY THIS EXPEDITION  (premium feature cards)
 * ------------------------------------------------------------------------- */
export interface AstroFeature {
  title: string
  description: string
  icon: string
}

export const astroWhy: AstroFeature[] = [
  {
    title: 'Small-Batch Mentoring',
    description: 'A deliberately limited group so every participant gets one-on-one guidance.',
    icon: 'UsersRound',
  },
  {
    title: 'Remote Dark-Sky Locations',
    description: 'Shoot under some of the darkest, clearest skies on the planet — Hanle and beyond.',
    icon: 'Moon',
  },
  {
    title: 'Learn by Shooting in the Field',
    description: 'No lecture halls — every concept is taught with your camera, in the moment.',
    icon: 'Camera',
  },
  {
    title: 'Professional Editing Workflow',
    description: 'Take home a complete post-processing pipeline used by working professionals.',
    icon: 'SlidersHorizontal',
  },
  {
    title: 'Astronomy + Photography',
    description: 'Understand the sky you are shooting — visual astronomy paired with the craft.',
    icon: 'Telescope',
  },
  {
    title: 'Hands-on Guidance Every Night',
    description: 'Continuous mentorship under the stars, from first exposure to final frame.',
    icon: 'Sparkles',
  },
  {
    title: 'Premium Travel Experience',
    description: 'Curated stays, seamless logistics and a considered pace at high altitude.',
    icon: 'BedDouble',
  },
  {
    title: 'Portfolio Development',
    description: 'Leave with a body of finished, gallery-ready images — not just raw files.',
    icon: 'Images',
  },
]

/* ---------------------------------------------------------------------------
 * 8. WHAT YOU WILL LEARN  (icon grid)
 * ------------------------------------------------------------------------- */
export const astroCurriculum: AstroFact[] = [
  { icon: 'Camera', value: 'Camera Settings' },
  { icon: 'Sun', value: 'Exposure' },
  { icon: 'LayoutGrid', value: 'Composition' },
  { icon: 'Aperture', value: 'Lens Selection' },
  { icon: 'Focus', value: 'Infinity Focus' },
  { icon: 'Thermometer', value: 'White Balance' },
  { icon: 'Sparkles', value: 'Milky Way Photography' },
  { icon: 'Orbit', value: 'Star Trail Photography' },
  { icon: 'Film', value: 'Timelapse' },
  { icon: 'Telescope', value: 'Deep Sky Imaging' },
  { icon: 'Layers', value: 'Image Stacking' },
  { icon: 'Grid2x2', value: 'Calibration Frames' },
  { icon: 'Palette', value: 'Color Grading' },
  { icon: 'Wand2', value: 'Noise Reduction' },
  { icon: 'SlidersHorizontal', value: 'Lightroom Workflow' },
  { icon: 'Image', value: 'Photoshop Workflow' },
  { icon: 'Images', value: 'Portfolio Building' },
]

/* ---------------------------------------------------------------------------
 * 9. EXPEDITION ROUTE  (animated)
 * ------------------------------------------------------------------------- */
export const astroRoute: string[] = ['Leh', 'Pangong', 'Hanle', 'Tso Moriri', 'Leh']

/* ---------------------------------------------------------------------------
 * 10. DETAILED ITINERARY  (vertical timeline)
 * ------------------------------------------------------------------------- */
export interface AstroSession {
  /** Time of day label. */
  time: string
  /** Session title. */
  title: string
  /** Optional bullet points. */
  points?: string[]
  /** Optional descriptive paragraph. */
  body?: string
}

export interface AstroDay {
  day: number
  route: string
  title: string
  sessions: AstroSession[]
}

export const astroItinerary: AstroDay[] = [
  {
    day: 1,
    route: 'Leh → Pangong',
    title: 'Foundations Under the Stars',
    sessions: [
      {
        time: 'Morning',
        title: 'Drive through Chang La',
        points: ['Photography stops along the route', 'One of the world’s highest motorable passes'],
      },
      {
        time: 'Afternoon',
        title: 'Introduction to Astrophotography',
        points: [
          'Camera setup',
          'Exposure triangle',
          'Lens selection',
          'Composition',
          'Milky Way planning',
          'Golden-hour landscape photography',
        ],
      },
      {
        time: 'Evening',
        title: 'Visual Astronomy Session',
        body:
          'Before photography begins, observe celestial objects through professional telescopes.',
        points: ['Constellations', 'Planets', 'Deep sky objects', 'Night sky orientation'],
      },
      {
        time: 'Night',
        title: 'Milky Way Photography Workshop',
        body: 'Hands-on shooting with mentor guidance beside Pangong.',
      },
    ],
  },
  {
    day: 2,
    route: 'Pangong → Hanle',
    title: 'Motion in the Sky',
    sessions: [
      {
        time: 'Morning',
        title: 'Landscape Photography on the Drive',
        points: ['Village storytelling', 'Mountain light'],
      },
      {
        time: 'Afternoon',
        title: 'Timelapse Workshop',
        points: ['Planning', 'Motion', 'Camera movement', 'Interval settings'],
      },
      {
        time: 'Evening',
        title: 'Hands-on Timelapse & Star Trails',
        body: 'Hands-on timelapse photography followed by a star trail photography workshop.',
      },
    ],
  },
  {
    day: 3,
    route: 'Hanle',
    title: 'Into Deep Space',
    sessions: [
      {
        time: 'Morning',
        title: 'Sunrise Photography',
        points: ['Hanle landscapes', 'Observatory surroundings'],
      },
      {
        time: 'Afternoon',
        title: 'Deep Space Imaging Masterclass',
        points: [
          'Telescope imaging',
          'Tracking',
          'Stacking',
          'Calibration frames',
          'Processing workflow',
          'Equipment setup',
        ],
      },
      {
        time: 'Evening',
        title: 'Visual Astronomy Session',
        body: 'Observe the deep sky through professional optics.',
        points: ['Galaxies', 'Nebulae', 'Star clusters', 'Planets'],
      },
      {
        time: 'Night',
        title: 'Deep Space Photography Session',
        body: 'Capture selected celestial targets with instructor guidance.',
      },
    ],
  },
  {
    day: 4,
    route: 'Hanle → Tso Moriri',
    title: 'Creative Freedom',
    sessions: [
      {
        time: 'Morning',
        title: 'Drive with Multiple Photography Stops',
        points: ['Lake landscapes', 'High-altitude vistas'],
      },
      {
        time: 'Afternoon',
        title: 'Creative Exploration Session',
        body: 'Experiment using newly learned techniques, with your mentor available throughout.',
      },
      {
        time: 'Evening',
        title: 'Open Astrophotography Session',
        body: 'Choose your preferred subjects with one-on-one mentoring.',
      },
    ],
  },
  {
    day: 5,
    route: 'Tso Moriri → Leh',
    title: 'The Return',
    sessions: [
      {
        time: 'Morning',
        title: 'Drive Back to Leh',
        body: 'Photography across valleys and mountain passes.',
      },
      { time: 'Midday', title: 'Arrival in Leh', body: 'Rest and recover.' },
      {
        time: 'Evening',
        title: 'Backup & Discussion',
        points: ['Image backup', 'Discussion', 'Optional street photography in Leh'],
      },
    ],
  },
  {
    day: 6,
    route: 'Leh',
    title: 'Editing Masterclass',
    sessions: [
      {
        time: 'Morning',
        title: 'Professional Editing Workflow',
        points: [
          'Milky Way processing',
          'Deep space editing',
          'Star trail workflow',
          'Timelapse assembly',
          'Noise reduction',
          'Color grading',
          'Image stacking',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Edit Your Own Work',
        body: 'Personal mentoring as you process the images you captured.',
      },
      {
        time: 'Evening',
        title: 'Portfolio Presentation & Closing',
        points: ['Image critique', 'Certificate distribution', 'Closing ceremony'],
      },
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 11. WHO SHOULD JOIN  (audience cards)
 * ------------------------------------------------------------------------- */
export const astroAudience: AstroFact[] = [
  { icon: 'Sprout', value: 'Beginners' },
  { icon: 'TrendingUp', value: 'Intermediate Photographers' },
  { icon: 'Mountain', value: 'Landscape Photographers' },
  { icon: 'Telescope', value: 'Astronomy Enthusiasts' },
  { icon: 'Plane', value: 'Travel Photographers' },
  { icon: 'Video', value: 'Content Creators' },
  { icon: 'Clapperboard', value: 'Filmmakers' },
  { icon: 'GraduationCap', value: 'Students' },
  { icon: 'Leaf', value: 'Nature Lovers' },
]

/* ---------------------------------------------------------------------------
 * 12. EQUIPMENT
 * ------------------------------------------------------------------------- */
export interface AstroGear {
  item: string
  optional?: boolean
}

export const astroRecommendedGear: AstroGear[] = [
  { item: 'DSLR / Mirrorless Camera' },
  { item: 'Wide Angle Lens' },
  { item: 'Telephoto Lens', optional: true },
  { item: 'Heavy Duty Tripod' },
  { item: 'Remote Shutter' },
  { item: 'Headlamp' },
  { item: 'Laptop' },
  { item: 'Memory Cards' },
  { item: 'Extra Batteries' },
  { item: 'Star Tracker', optional: true },
]

export const ASTRO_RENTAL = {
  priceLabel: '₹2,000–₹3,000 per day',
  note:
    'Don’t own the gear? Professional cameras, lenses, tripods, star trackers and accessories can be rented through us. Rental equipment is limited and should be reserved in advance.',
} as const

/* ---------------------------------------------------------------------------
 * 13. WHAT WE PROVIDE  (cards)
 * ------------------------------------------------------------------------- */
export const astroProvide: AstroFact[] = [
  { icon: 'BedDouble', value: 'Accommodation' },
  { icon: 'Utensils', value: 'All Meals' },
  { icon: 'Bus', value: 'Internal Transportation' },
  { icon: 'Camera', value: 'Professional Astrophotography Training' },
  { icon: 'Telescope', value: 'Visual Astronomy Sessions' },
  { icon: 'Orbit', value: 'Telescope Access' },
  { icon: 'SlidersHorizontal', value: 'Editing Workshop' },
  { icon: 'Compass', value: 'Expedition Coordination' },
  { icon: 'MapPin', value: 'Local Logistics' },
  { icon: 'ShieldCheck', value: 'Emergency Support' },
  { icon: 'HeartHandshake', value: 'Field Assistance' },
  { icon: 'Award', value: 'Certificate' },
  { icon: 'Package', value: 'Astroventure Takeaway Kit' },
]

/* ---------------------------------------------------------------------------
 * 14. PRICING  (two premium cards)
 * ------------------------------------------------------------------------- */
export interface AstroPricing {
  id: string
  route: string
  amount: number
  amountLabel: string
  includes: string[]
  featured?: boolean
  tagline: string
}

export const astroPricing: AstroPricing[] = [
  {
    id: 'leh',
    route: 'Leh → Leh',
    amount: 50000,
    amountLabel: '₹50,000',
    tagline: 'Join the expedition on-ground in Leh',
    includes: [
      'Accommodation',
      'Meals',
      'Internal Transportation',
      'Complete Workshop',
      'Astronomy Sessions',
      'Editing Workshop',
      'Certificate',
      'Astroventure Takeaway Kit',
    ],
  },
  {
    id: 'delhi',
    route: 'Delhi → Delhi',
    amount: 70000,
    amountLabel: '₹70,000',
    featured: true,
    tagline: 'Everything in Leh, plus travel from Delhi',
    includes: [
      'Everything in the Leh → Leh package',
      'Round-trip travel from Delhi',
      'Complete travel coordination',
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 15. INCLUSIONS / EXCLUSIONS  (checklists)
 * ------------------------------------------------------------------------- */
export const astroInclusions: string[] = [
  'Accommodation',
  'Meals',
  'Internal Transportation',
  'Astrophotography Workshop',
  'Visual Astronomy Sessions',
  'Editing Masterclass',
  'Telescope Sessions',
  'Field Mentoring',
  'Expedition Certificate',
  'Astroventure Takeaway Kit',
]

export const astroExclusions: string[] = [
  'Personal expenses',
  'Camera equipment',
  'Equipment rental',
  'Travel insurance',
  'Medical expenses',
  'Any activity not specifically mentioned under inclusions',
]

/* ---------------------------------------------------------------------------
 * 16. ASTROVENTURE TAKEAWAY KIT  (product cards — editable)
 * ------------------------------------------------------------------------- */
export interface AstroKitItem {
  title: string
  description: string
  icon: string
}

export const astroKit: AstroKitItem[] = [
  { title: 'Expedition Certificate', description: 'A premium certificate marking your expedition.', icon: 'Award' },
  { title: 'Astrophotography Field Guide', description: 'A reference for shooting the night sky in the field.', icon: 'BookOpen' },
  { title: 'Night Sky Planning Guide', description: 'Plan Milky Way, deep-sky and trail sessions like a pro.', icon: 'Moon' },
  { title: 'Editing Workflow PDF', description: 'The complete post-processing pipeline, step by step.', icon: 'FileText' },
  { title: 'Exclusive Lightroom Presets', description: 'Curated presets to jump-start your night-sky edits.', icon: 'SlidersHorizontal' },
  { title: 'Observation Logbook', description: 'Record objects, settings and notes from each night.', icon: 'NotebookPen' },
  { title: 'Astroventure Merchandise', description: 'Curated apparel and accessories from the expedition.', icon: 'Shirt' },
  { title: 'Digital Resource Library', description: 'A growing library of tutorials, references and assets.', icon: 'FolderDown' },
  { title: 'Community Access', description: 'Join a private community of Astroventure photographers.', icon: 'Users' },
  { title: 'Personal Image Review Session', description: 'A one-on-one review of your finished portfolio.', icon: 'MessageSquare' },
]

/* ---------------------------------------------------------------------------
 * 17. TRAINER PORTFOLIO  (masonry gallery — placeholders)
 * ------------------------------------------------------------------------- *
 *  Replace all images with the portfolio of Jhankrit Ahuja.
 * ------------------------------------------------------------------------- */
export interface AstroGalleryImage {
  src: string
  alt: string
  category: string
  span?: 'tall' | 'wide' | 'normal'
}

const PLACEHOLDER = '/placeholder.svg'

export const astroPortfolio: AstroGalleryImage[] = [
  { src: PLACEHOLDER, alt: 'Milky Way over the mountains (placeholder)', category: 'Milky Way', span: 'wide' },
  { src: PLACEHOLDER, alt: 'Deep sky object (placeholder)', category: 'Deep Sky', span: 'tall' },
  { src: PLACEHOLDER, alt: 'Nebula (placeholder)', category: 'Nebulae', span: 'normal' },
  { src: PLACEHOLDER, alt: 'Galaxy (placeholder)', category: 'Galaxies', span: 'normal' },
  { src: PLACEHOLDER, alt: 'Star trails (placeholder)', category: 'Star Trails', span: 'wide' },
  { src: PLACEHOLDER, alt: 'Night landscape (placeholder)', category: 'Landscapes', span: 'tall' },
  { src: PLACEHOLDER, alt: 'Timelapse frame (placeholder)', category: 'Timelapse Frames', span: 'normal' },
  { src: PLACEHOLDER, alt: 'Night portrait (placeholder)', category: 'Night Portraits', span: 'normal' },
]

export const astroPortfolioCategories = [
  'All',
  'Milky Way',
  'Deep Sky',
  'Nebulae',
  'Galaxies',
  'Star Trails',
  'Landscapes',
  'Timelapse Frames',
  'Night Portraits',
] as const

/** Student gallery — placeholders for photographs from future expeditions. */
export const astroStudentGallery: AstroGalleryImage[] = Array.from({ length: 8 }, (_, i) => ({
  src: PLACEHOLDER,
  alt: `Student photograph ${i + 1} (placeholder)`,
  category: 'Student Work',
  span: (i % 5 === 0 ? 'wide' : i % 3 === 0 ? 'tall' : 'normal') as AstroGalleryImage['span'],
}))

/* ---------------------------------------------------------------------------
 * 18. FAQ
 * ------------------------------------------------------------------------- */
export const astroFaqs: { question: string; answer: string }[] = [
  {
    question: 'Can beginners join?',
    answer:
      'Absolutely. The expedition is designed to take complete beginners to confident night-sky photographers. We start from camera fundamentals and build up, session by session, so you are never left behind.',
  },
  {
    question: 'Do I need prior experience?',
    answer:
      'No prior experience is required. If you already shoot, you will accelerate quickly; if you are new, our mentor scales every session to your level. Curiosity and a willingness to stay up late under the stars are all you need.',
  },
  {
    question: 'Which camera should I bring?',
    answer:
      'Any DSLR or mirrorless camera with a manual mode works well, ideally paired with a fast wide-angle lens (f/2.8 or faster) and a sturdy tripod. A full recommended-gear list is shared on booking, and rental gear is available if you don’t own a setup.',
  },
  {
    question: 'Can I rent equipment?',
    answer:
      'Yes. Professional cameras, lenses, tripods, star trackers and accessories can be rented through us at ₹2,000–₹3,000 per day. Rental equipment is limited and allocated on a first-come, first-served basis, so reserve in advance.',
  },
  {
    question: 'Are telescopes provided?',
    answer:
      'Yes. Professional telescopes are provided for both the visual astronomy sessions and the deep-space imaging masterclass — you do not need to bring any astronomy equipment.',
  },
  {
    question: 'Is a star tracker necessary?',
    answer:
      'A star tracker is optional. It helps with deep-sky imaging and longer exposures, and we teach how to use one — but it is not required to complete the workshop. Trackers are available to rent if you’d like to try one.',
  },
  {
    question: 'Which editing software will be taught?',
    answer:
      'The editing masterclass covers a professional Lightroom and Photoshop workflow, along with image-stacking and calibration tools. You will leave with a complete post-processing pipeline and exclusive presets.',
  },
  {
    question: 'Will accommodation be on a sharing basis?',
    answer:
      'Yes, accommodation is on a twin-sharing basis with the best available comfort at each location and altitude. Let us know your preferences in advance and we will do our best to accommodate them.',
  },
  {
    question: 'What fitness level is required?',
    answer:
      'A reasonable level of general fitness is enough. This is a high-altitude road expedition with short walks — no technical trekking. We travel at a measured pace with gradual acclimatisation and monitor everyone closely.',
  },
  {
    question: 'What happens in case of bad weather?',
    answer:
      'Ladakh’s new-moon windows offer some of the clearest skies on Earth, but weather can vary. If a night clouds over, we adapt — shifting theory, planning and editing sessions around the sky so no time is wasted and every clear window is used.',
  },
]
