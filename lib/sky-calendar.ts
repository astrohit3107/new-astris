import { moonPhase, type MoonPhase } from '@/lib/moon-phase'

/**
 * Which nights are worth coming for.
 *
 * WHAT THIS SCORE IS — AND IS NOT
 * -------------------------------
 * The score is DARKNESS FROM MOONLIGHT ONLY. A bright Moon washes out
 * everything faint, and that is the one factor we can compute honestly for a
 * date months away.
 *
 * It is NOT a forecast. Cloud, haze and transparency dominate what you
 * actually see, and nobody can know those in advance — so the UI calls this a
 * "dark-sky score", never a "sky score", and never implies a night is
 * guaranteed clear. Weather is checked close to the date, not here.
 *
 * A new-moon weekend genuinely is the best time to come and see faint things.
 * That claim is defensible. "92/100 visibility" would not be.
 */

export interface SkyNight {
  /** ISO date, YYYY-MM-DD. */
  date: string
  moon: MoonPhase
  /** 0–100, driven by how dark the night is of moonlight. */
  darkScore: number
  band: 'Excellent' | 'Good' | 'Fair' | 'Bright'
  /** What this night actually suits, given the Moon. */
  bestFor: string[]
  isWeekend: boolean
}

function bandFor(score: number): SkyNight['band'] {
  if (score >= 80) return 'Excellent'
  if (score >= 55) return 'Good'
  if (score >= 30) return 'Fair'
  return 'Bright'
}

function bestFor(illumination: number): string[] {
  // A full Moon is a bad deep-sky night and a wonderful lunar one. Both are
  // true, and a calendar that only says "bad" is unhelpful.
  if (illumination < 0.15) return ['Deep sky', 'Milky Way', 'Astrophotography']
  if (illumination < 0.4) return ['Deep sky', 'Star clusters', 'Astrophotography']
  if (illumination < 0.7) return ['Planets', 'Star clusters', 'Beginners']
  return ['The Moon', 'Planets', 'First-time stargazing']
}

/** One night, scored. */
export function scoreNight(date: Date): SkyNight {
  // Sample near local midnight, when the Moon's effect on the night is
  // best represented for an evening session.
  const at = new Date(date)
  at.setUTCHours(18, 30, 0, 0) // ~00:00 IST

  const moon = moonPhase(at)
  // Darkness falls off with illumination. Squaring it reflects that a
  // half-lit Moon is far more than half as disruptive as a full one.
  const darkScore = Math.round((1 - moon.illumination ** 0.7) * 100)
  const day = date.getUTCDay()

  return {
    date: date.toISOString().slice(0, 10),
    moon,
    darkScore,
    band: bandFor(darkScore),
    bestFor: bestFor(moon.illumination),
    isWeekend: day === 5 || day === 6,
  }
}

/** The next `days` nights, scored, starting today. */
export function upcomingNights(days = 60, from: Date = new Date()): SkyNight[] {
  const out: SkyNight[] = []
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()))
  for (let i = 0; i < days; i++) {
    out.push(scoreNight(cursor))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return out
}

/**
 * The standout nights: darkest, and on a Friday or Saturday so people can
 * actually come. Falls back to the darkest nights overall if a window has no
 * good weekend in it.
 */
export function bestNights(limit = 6, days = 90, from: Date = new Date()): SkyNight[] {
  const all = upcomingNights(days, from)
  const weekends = all.filter((n) => n.isWeekend && n.darkScore >= 55)
  const pool = weekends.length >= limit ? weekends : all.filter((n) => n.darkScore >= 55)
  return pool.sort((a, b) => b.darkScore - a.darkScore).slice(0, limit)
}
