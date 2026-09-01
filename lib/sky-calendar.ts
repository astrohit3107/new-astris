import { moonPhase, type MoonPhase } from '@/lib/moon-phase'
import {
  PLANETS,
  DEEP_SKY,
  planetPosition,
  altitude,
  dsoAltitude,
  type PlanetName,
  type DeepSkyObject,
} from '@/lib/ephemeris'
import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'

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


/* ---------------------------------------------------------------------------
 * WHAT IS ACTUALLY UP ON A GIVEN NIGHT
 *
 * Sampled at 22:00 IST — late enough to be properly dark in Delhi NCR through
 * the year, and a fixed reference so a date always reports the same sky.
 *
 * Everything below is geometry, and geometry is exact. Whether any of it is
 * SEEN depends on cloud, haze and the Moon, which this cannot know — so the UI
 * says "above the horizon", never "visible".
 * ------------------------------------------------------------------------- */

export interface SkyBody {
  name: string
  /** Degrees above the horizon at 22:00 IST. */
  altitude: number
}

export interface DsoUp extends SkyBody {
  id: string
  catalogue: string
  kind: DeepSkyObject['kind']
  blurb: string
  magnitude: number
}

export interface NightSky {
  date: string
  moon: MoonPhase
  planets: SkyBody[]
  dsos: DsoUp[]
}

/** 22:00 IST on the given ISO date, as a UTC instant. */
function observingMoment(isoDate: string): Date {
  return new Date(`${isoDate}T22:00:00+05:30`)
}

/**
 * The sky over the destination on one night.
 *
 * A body counts as "up" above 15°: below that it is in the worst of the
 * atmosphere and, near Delhi, in the worst of the light dome — listing it
 * would be technically true and practically useless.
 */
export function skyOn(isoDate: string): NightSky {
  const at = observingMoment(isoDate)
  const { latitude, longitude } = NAKSHATRAALAY

  const planets = PLANETS.map((name: PlanetName) => ({
    name,
    altitude: altitude(planetPosition(name, at), at, latitude, longitude),
  }))
    .filter((p) => p.altitude > 15)
    .sort((a, b) => b.altitude - a.altitude)

  const dsos = DEEP_SKY.map((d) => ({
    id: d.id,
    name: d.name,
    catalogue: d.catalogue,
    kind: d.kind,
    blurb: d.blurb,
    magnitude: d.magnitude,
    altitude: dsoAltitude(d, at, latitude, longitude),
  }))
    .filter((d) => d.altitude > 15)
    .sort((a, b) => b.altitude - a.altitude)

  return { date: isoDate, moon: moonPhase(at), planets, dsos }
}
