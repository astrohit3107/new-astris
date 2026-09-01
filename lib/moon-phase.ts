/**
 * Moon phase for a given moment.
 *
 * SCOPE, STATED HONESTLY
 * ----------------------
 * This computes the Moon's phase and illuminated fraction from the mean
 * synodic month. That is accurate to within a few hours of the true phase —
 * comfortably good enough to tell someone whether tonight is a bright
 * gibbous night or a dark new-moon weekend, which is the only thing this
 * site uses it for.
 *
 * It deliberately does NOT compute planet positions, rise/set times or
 * visibility. Those need a real ephemeris, and a plausible-looking guess at
 * "you'll see Saturn tonight" is worse than saying nothing. Phase is a clock;
 * visibility is a forecast.
 *
 * Anchor: the new moon of 6 January 2000, 18:14 UTC — the standard epoch —
 * with the mean synodic month of 29.530588853 days.
 */

const SYNODIC_MONTH = 29.530588853
/** Unix ms of the reference new moon: 2000-01-06T18:14:00Z. */
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0)

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent'

export interface MoonPhase {
  /** Days since the last new moon, 0 – 29.53. */
  ageDays: number
  /** Illuminated fraction of the disc, 0 – 1. */
  illumination: number
  name: MoonPhaseName
  /** True while the Moon is filling out towards full. */
  waxing: boolean
}

export function moonPhase(at: Date = new Date()): MoonPhase {
  const days = (at.getTime() - REFERENCE_NEW_MOON) / 86_400_000
  // Modulo that stays positive for dates before the epoch.
  const ageDays = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH

  const phaseAngle = (2 * Math.PI * ageDays) / SYNODIC_MONTH
  // Standard illuminated-fraction relation: 0 at new, 1 at full.
  const illumination = (1 - Math.cos(phaseAngle)) / 2
  const waxing = ageDays < SYNODIC_MONTH / 2

  // Quarter boundaries sit ~1.85 days either side of the exact instants, so
  // "First Quarter" reads as a couple of nights rather than one moment.
  const name: MoonPhaseName =
    ageDays < 1.84566 ? 'New Moon'
    : ageDays < 5.53699 ? 'Waxing Crescent'
    : ageDays < 9.22831 ? 'First Quarter'
    : ageDays < 12.91963 ? 'Waxing Gibbous'
    : ageDays < 16.61096 ? 'Full Moon'
    : ageDays < 20.30228 ? 'Waning Gibbous'
    : ageDays < 23.99361 ? 'Last Quarter'
    : ageDays < 27.68493 ? 'Waning Crescent'
    : 'New Moon'

  return { ageDays, illumination, name, waxing }
}

/** Percentage, rounded, for display. */
export function illuminationPercent(at: Date = new Date()): number {
  return Math.round(moonPhase(at).illumination * 100)
}
