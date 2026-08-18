/**
 * ============================================================================
 *  ASTRIS SPACE — SITE-WIDE CONTACT & CTA CONFIG
 * ============================================================================
 *  One source of truth for the official contact details used across the main
 *  site (header, homepage, /astroed, /astrotrain, footer). These match the
 *  numbers already configured in spiti-data / astroventure-data /
 *  astrophotography-data — change them here for the main-site surfaces.
 * ========================================================================== */

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
