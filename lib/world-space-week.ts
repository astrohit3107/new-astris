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
 *  STILL TO COME FROM THE ORGANISERS
 *    • Space Store logo           → set `PARTNER.logo` to a /public path
 *    • Essay brief and word limit → `ESSAY.brief` (it says "shared when you
 *                                   register" until then)
 * ============================================================================
 */

import { whatsappHref } from '@/lib/site-config'

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
   * Space Store's logo, e.g. '/partners/space-store.svg'. Until it is set the
   * page shows the name in a logo-shaped slot. Drop the file in /public and
   * put its path here — nothing else needs changing.
   */
  logo: null as string | null,
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
  /**
   * The organisers' brief only says "Space policy". Until the full brief and
   * word limit are agreed, the page says they arrive with registration rather
   * than inventing either.
   */
  brief: null as string | null,
}

/** Prefilled WhatsApp messages — the fields the team needs, ready to fill. */
function registrationMessage(competition: string): string {
  return [
    `Hi Astris Space — I'd like to register for the World Space Week 2026 ${competition}.`,
    '',
    "Child's name:",
    'Grade:',
    'School:',
    'City:',
    "Parent's email (for the certificate):",
  ].join('\n')
}

export const REGISTER = {
  painting: whatsappHref(registrationMessage('Painting Competition (Paint My Universe)')),
  essay: whatsappHref(registrationMessage('Essay Competition (Space Policy)')),
  question: whatsappHref('Hi Astris Space — I have a question about the World Space Week 2026 competitions.'),
}

/** True until the end of the deadline day in IST. */
export function registrationsOpen(now: Date = new Date()): boolean {
  const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  return todayIST <= WSW.deadline
}
