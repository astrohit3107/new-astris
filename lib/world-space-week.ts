/**
 * ============================================================================
 *  WORLD SPACE WEEK 2026 — PAINT MY UNIVERSE
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
 *  REGISTRATION is by email to astriseducation@gmail.com. Every registration
 *  email carries the same subject line, so a single Gmail filter can label
 *  them all — see the setup notes that came with this page.
 * ============================================================================
 */

import { whatsappHref, mailHref, CONTACT } from '@/lib/site-config'

export const WSW = {
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

export const PAINTING = {
  id: 'painting',
  title: 'Painting Competition',
  theme: 'Paint My Universe',
  grades: 'Grades 3–8',
  brief:
    'Everyone has their own idea of how the Universe could have taken shape — and it doesn’t have to look like the usual Solar System. Use your creativity and imagination to paint the Universe of your thoughts. Don’t worry about the physics!',
}

export const ESSAY = {
  id: 'essay',
  title: 'Essay Competition',
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
    'Typed (PDF or Word) or a clear scan of a handwritten essay — both are welcome.',
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
 * Registration emails. The subject is fixed and starts the same way for both
 * competitions, so one Gmail filter catches every registration; the body
 * already asks for every field the team needs.
 */
export const REGISTRATION_EMAIL = CONTACT.email
export const REGISTRATION_SUBJECT_PREFIX = 'WSW 2026 Registration'

function registrationEmail(competition: string): string {
  return mailHref(
    `${REGISTRATION_SUBJECT_PREFIX} — ${competition}`,
    [
      `Hello Astris Space,`,
      '',
      `I'd like to register my child for the World Space Week 2026 ${competition}.`,
      '',
      "Child's full name:",
      'Grade:',
      'School:',
      'City:',
      "Parent's name:",
      "Parent's phone number:",
      '',
      'We will send the certificate to this email address.',
    ].join('\n'),
    REGISTRATION_EMAIL
  )
}

export const REGISTER = {
  painting: registrationEmail('Painting Competition'),
  essay: registrationEmail('Essay Competition'),
  /** Questions can still come on WhatsApp — only registration moved to email. */
  question: whatsappHref('Hi Astris Space — I have a question about the World Space Week 2026 competitions.'),
}

/** True until the end of the deadline day in IST. */
export function registrationsOpen(now: Date = new Date()): boolean {
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  return todayIST <= WSW.deadline
}
