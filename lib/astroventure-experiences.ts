/**
 * ============================================================================
 *  ACTIVE ASTROVENTURE EXPERIENCES — SINGLE SOURCE OF TRUTH (discovery)
 * ============================================================================
 *
 *  This is the ONE list that drives every "discovery" surface where the
 *  different Astroventure products meet:
 *
 *    • the homepage Astroventure line-up  (components/astroventure-lineup)
 *    • the header "Astroventure" dropdown (components/header)
 *
 *  Each product otherwise keeps its own rich content file
 *  (spiti-data, astroventure-data, astrophotography-data, workshop-delhi-data);
 *  this registry only carries what a card / menu item needs, plus ordering and
 *  an `active` flag. Add a new active experience here and it appears
 *  consistently across the homepage and the navigation — no other edits.
 *
 *  Completed / archived experiences (e.g. Chitkul) are simply NOT listed here,
 *  so they can never leak back into active promotion.
 * ============================================================================
 */

export type ExperienceKind = 'expedition' | 'weekend' | 'workshop'

export interface AstroventureExperience {
  /** stable id */
  id: string
  /** display name */
  name: string
  /** one-line supporting blurb for cards / menu */
  blurb: string
  /** route */
  href: string
  /** card image (self-hosted under /public) */
  image: string
  /** descriptive alt text */
  imageAlt: string
  /** short category label */
  category: string
  kind: ExperienceKind
  /** small badge, e.g. 'Flagship' | 'New' */
  badge?: string
  /** starting-price label where the product has published pricing */
  priceLabel?: string
  /** compact meta chips shown on the card / menu row */
  meta: string[]
  /** lucide-react icon name used in the nav dropdown */
  icon: 'Sparkles' | 'Camera' | 'Moon' | 'Telescope' | 'MapPin'
  /** show in the homepage featured line-up */
  featuredHome: boolean
  /** ordering across every discovery surface */
  order: number
}

const AV = '/astroventure-assets'

export const activeExperiences: AstroventureExperience[] = [
  {
    id: 'spiti',
    name: 'Astroventure Spiti ’26',
    blurb: 'Our flagship high-altitude dark-sky expedition into the Spiti Valley.',
    href: '/astroventure-spiti-26',
    image: `${AV}/spiti-real/nights-milkyway.jpg`,
    imageAlt: 'The Milky Way over the Spiti Valley at night',
    category: 'Flagship Expedition',
    kind: 'expedition',
    badge: 'Flagship',
    meta: ['8 days', 'Himalaya', 'Bortle 1–2'],
    icon: 'Sparkles',
    featuredHome: true,
    order: 1,
  },
  {
    id: 'sambhar-lake',
    name: 'Sambhar Lake',
    blurb: 'An affordable weekend astronomy escape on India’s largest salt lake.',
    href: '/astroventure-nights/sambhar-lake',
    image: `${AV}/rajasthan/sambhar-lake.jpg`,
    imageAlt: 'The salt flats of Sambhar Lake, Rajasthan, under a wide open sky',
    category: 'Weekend Escape',
    kind: 'weekend',
    priceLabel: 'From ₹3,500',
    meta: ['3D · 2N', 'Delhi / Jaipur', 'Up to 30'],
    icon: 'Moon',
    featuredHome: true,
    order: 2,
  },
  {
    id: 'tijara',
    name: 'Tijara',
    blurb: 'A dark-sky weekend within reach of Delhi, in the Aravallis of Alwar.',
    href: '/astroventure-nights/tijara',
    image: `${AV}/rajasthan/tijara.jpg`,
    imageAlt: 'The Aravalli heritage country around Tijara, Alwar, Rajasthan',
    category: 'Weekend Escape',
    kind: 'weekend',
    priceLabel: 'From ₹3,500',
    meta: ['3D · 2N', 'Delhi / Jaipur', 'Up to 30'],
    icon: 'Moon',
    featuredHome: true,
    order: 3,
  },
  {
    id: 'delhi-deep-sky',
    name: 'Delhi Deep-Sky Astrophotography Workshop',
    blurb: 'Learn narrowband deep-sky imaging from a light-polluted city sky.',
    href: '/delhi-deep-sky-astrophotography-workshop',
    image: `${AV}/astrophotography-real/orion-nebula-m42.jpg`,
    imageAlt: 'The Orion Nebula imaged in narrowband',
    category: 'Flagship Workshop',
    kind: 'workshop',
    badge: 'Narrowband',
    meta: ['2 nights', 'Sep–Oct 2026', 'Delhi'],
    icon: 'Camera',
    featuredHome: true,
    order: 4,
  },
  {
    id: 'ladakh-astro',
    name: 'Ladakh Astrophotography Expedition',
    blurb: 'A six-day field masterclass under some of Earth’s darkest skies.',
    href: '/astroventure-astrophotography',
    image: `${AV}/astrophotography-real/milkyway-silhouette.jpg`,
    imageAlt: 'A photographer beneath the Milky Way in the high Himalaya',
    category: 'Photography Expedition',
    kind: 'workshop',
    meta: ['6D · 5N', 'Ladakh'],
    icon: 'Camera',
    featuredHome: false,
    order: 5,
  },
]

/** Ordered list for every discovery surface. */
export const experiencesInOrder = [...activeExperiences].sort((a, b) => a.order - b.order)

/** The subset featured on the homepage line-up. */
export const homeExperiences = experiencesInOrder.filter((e) => e.featuredHome)
