/**
 * ============================================================================
 *  WORLD SPACE WEEK 2026 — COSMIC CANVAS
 * ============================================================================
 *
 *  Content source for /world-space-week-2026. Everything public on that page
 *  is here, taken from the "World Space Week 2026" brief agreed between Astris
 *  Space and Space Store.
 *
 *  What is deliberately NOT here: the profit split, the confidentiality terms
 *  and the social posting plan. Those are between the two organisers, not for
 *  parents.
 *
 *  HOW A FAMILY TAKES PART
 *    1. Pay ₹100 on the Razorpay payment page — that is the registration.
 *    2. Email the scanned entry, the payment screenshot and their details to
 *       astriseducation@gmail.com by 11 October, 11:59 pm IST.
 *  Every entry email has the same subject prefix, so one Gmail filter sorts
 *  them.
 * ============================================================================
 */

import { whatsappHref, mailHref, CONTACT } from '@/lib/site-config'

export const WSW = {
  /** The competition's name. It replaced "Paint My Universe" on 6 Oct 2026. */
  title: 'Cosmic Canvas',
  name: 'World Space Week 2026',
  /** World Space Week runs 4–11 October every year. */
  weekStart: '2026-10-04',
  weekEnd: '2026-10-11',
  /**
   * Last day to register and upload. End of the day in IST — after this the
   * page stops offering registration so nobody pays ₹100 for a closed contest.
   */
  deadline: '2026-10-11',
  deadlineLabel: '11 October 2026',
  /** As the organisers worded it, for anywhere the exact cut-off matters. */
  deadlineFull: '11 October 2026, 11:59 pm IST',
  /** Per child, whichever competition, any grade. */
  fee: 100,
  feeLabel: '₹100 per child',
  path: '/world-space-week-2026',
} as const

export const PARTNER = {
  name: 'Space Store',
  /**
   * White wordmark with a transparent background, for the dark page. Made from
   * the supplied white-on-black artwork, with alpha taken from brightness so
   * the edges stay soft. A black version sits beside it for light backgrounds.
   */
  logo: '/partners/space-store-white.png' as string | null,
  logoDark: '/partners/space-store-black.png',
}

/**
 * Razorpay payment page for the ₹100 entry fee. Checked before it went on the
 * site: active, titled "Cosmic Canvas", amount 10000 paise. Paying here IS
 * registering — there is no separate registration step.
 */
export const PAYMENT_LINK = 'https://pages.razorpay.com/world-space-week-2026'

/** Winners per competition — painting and essay are judged separately. */
export const WINNERS_PER_COMPETITION = 3

export const PAINTING = {
  id: 'painting',
  title: 'Painting',
  /** The painting brief is the theme; Cosmic Canvas names the whole competition. */
  theme: null as string | null,
  grades: 'Grades 3–8',
  brief:
    'Everyone has their own idea of how the Universe could have taken shape — and it doesn’t have to look like the usual Solar System. Use your creativity and imagination to paint the Universe of your thoughts. Don’t worry about the physics!',
}

export const ESSAY = {
  id: 'essay',
  title: 'Essay',
  theme: 'Space Policy',
  grades: 'Grades 9–12',
  brief:
    'Space is no longer only for a few governments. India has opened its space sector to private companies, thousands of satellites now circle the Earth, and missions are heading back to the Moon. Someone has to decide the rules — who gets to go, what they can take, and who cleans up afterwards. Pick a question of space policy that matters to you, and argue for what you think should happen.',
  /** Starting points, not a required list — students may set their own question. */
  questions: [
    'Who should own the Moon’s water ice and minerals — and who gets to decide?',
    'Should countries and companies be made to clean up the satellites they leave in orbit?',
    'What should India’s priorities in space be for the next 25 years?',
    'Should space be kept free of weapons, and can that actually be enforced?',
    'Space tourism: an adventure that should be open to everyone, or a luxury the planet cannot afford?',
  ],
  rules: [
    '600–1,000 words, in English.',
    'Give your essay a title that states the question you are answering.',
    'Typed or handwritten — send it as a PDF, or a clear PNG or JPEG scan.',
    'It must be your own work. Essays written by AI tools will not be considered.',
  ],
  /** What the judges look for, stated so students know what is being rewarded. */
  judging: [
    'A clear argument — taking a position and defending it.',
    'Evidence and examples, not just opinion.',
    'Original thinking: a fresh angle counts for more than a summary.',
    'Clear, well-organised writing.',
  ],
}

/**
 * Entries arrive by email. The subject prefix is fixed so one Gmail filter
 * catches every entry. A mailto: link cannot attach files, so the body says
 * plainly what to attach before sending.
 */
export const REGISTRATION_EMAIL = CONTACT.email
export const ENTRY_SUBJECT_PREFIX = 'WSW 2026 Entry'

/** Accepted file types, exactly as the organisers stated them. */
export const ENTRY_FORMATS = 'PDF, PNG or JPEG'

function entryEmail(competition: string): string {
  return mailHref(
    `${ENTRY_SUBJECT_PREFIX} — ${competition}`,
    [
      `Hello Astris Space,`,
      '',
      `Here is our entry for Cosmic Canvas — ${competition}.`,
      '',
      "Child's full name:",
      'Grade:',
      'School:',
      'City:',
      "Parent's name:",
      "Parent's phone number:",
      '',
      'ATTACHED (please attach both before sending):',
      `1. The ${competition.toLowerCase()} — scanned, as a ${ENTRY_FORMATS} file`,
      '2. A screenshot of the ₹100 payment confirmation',
    ].join('\n'),
    REGISTRATION_EMAIL
  )
}

export const REGISTER = {
  /** Both competitions pay through the same page; the entry email says which. */
  painting: PAYMENT_LINK,
  essay: PAYMENT_LINK,
  paintingEntry: entryEmail('Painting'),
  essayEntry: entryEmail('Essay'),
  /** Questions can still come on WhatsApp — only registration moved to email. */
  question: whatsappHref('Hi Astris Space — I have a question about the World Space Week 2026 competitions.'),
}

/** True until the end of the deadline day in IST. */
export function registrationsOpen(now: Date = new Date()): boolean {
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  return todayIST <= WSW.deadline
}
