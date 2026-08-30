/**
 * ============================================================================
 *  ASTRIS SPACE — SITE IDENTITY, CANONICAL DOMAIN & CONTACT CONFIG
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH for the production domain and brand identity.
 *
 *  CANONICAL DOMAIN
 *  ----------------
 *  https://www.astriseducation.in  — verified live (200 OK). The apex
 *  (astriseducation.in) 307-redirects here, so "www" is the canonical host.
 *
 *  Every canonical URL, Open Graph URL, sitemap entry and JSON-LD @id is built
 *  from `SITE.url`. Never hardcode a domain anywhere else, and never let a
 *  *.vercel.app deployment URL into a production SEO signal.
 *
 *  Override per-environment with NEXT_PUBLIC_SITE_URL if the domain ever moves.
 * ========================================================================== */

/** Canonical production origin, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.astriseducation.in'
).replace(/\/$/, '')

export const SITE = {
  /** Primary brand name — the single name Google should display. */
  name: 'Astris Space',
  shortName: 'Astris',
  url: SITE_URL,
  description:
    'Astris Space is an astronomy and space education ecosystem — dark-sky expeditions and astrophotography workshops (Astroventure), Space Labs and astronomy curriculum for schools (AstroEd), guest astronomy experiences for properties (AstroTrain), and Nakshatra Scopes telescopes.',
  locale: 'en_IN',
  logo: '/logo.svg',
  ogImage: '/icon-512.png',
} as const

/** Absolute URL for any site-relative path. */
export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const CONTACT = {
  brand: 'Astris Space',
  phone: '+91 75818 21834',
  /** digits only, for tel: and wa.me links */
  phoneDigits: '917581821834',
  email: 'astriseducation@gmail.com',
} as const

export const telHref = `tel:+${CONTACT.phoneDigits}`

/** Pre-filled WhatsApp link. Keeps every CTA pointed at a real conversation. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${CONTACT.phoneDigits}?text=${encodeURIComponent(message)}`
}

/** Pre-filled email link. */
export function mailHref(subject: string, body?: string): string {
  const q = new URLSearchParams({ subject, ...(body ? { body } : {}) })
  return `mailto:${CONTACT.email}?${q.toString()}`
}

/* --- Ready-made enquiry intents -------------------------------------------
 * Used by the AstroEd / AstroTrain / homepage CTAs so an enquiry arrives with
 * context instead of a blank "hi".                                          */
export const ENQUIRY = {
  astroed: {
    whatsapp: whatsappHref(
      "Hello Astris Space — I'd like to know more about bringing AstroEd (Space Lab + astronomy curriculum) to our school.",
    ),
    email: mailHref(
      'AstroEd enquiry — Space Lab & astronomy curriculum',
      'Hello Astris Space,\n\nWe would like to explore AstroEd for our school.\n\nSchool:\nCity:\nGrades:\nApproximate number of students:\n\nThank you.',
    ),
  },
  astrotrain: {
    whatsapp: whatsappHref(
      "Hello Astris Space — I'd like to discuss building an astronomy experience at our property with AstroTrain.",
    ),
    email: mailHref(
      'AstroTrain enquiry — astronomy experience for our property',
      'Hello Astris Space,\n\nWe would like to explore AstroTrain for our property.\n\nProperty:\nLocation:\nRooms / typical guest volume:\n\nThank you.',
    ),
  },
  general: {
    whatsapp: whatsappHref('Hello Astris Space — I would like to know more about your programmes.'),
    email: mailHref('Astris Space enquiry'),
  },
} as const
