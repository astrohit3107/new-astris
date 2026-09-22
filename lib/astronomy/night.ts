/**
 * ============================================================================
 *  ONE NIGHT, FROM ONE PLACE
 * ============================================================================
 *
 *  Sun, twilight, darkness window, Moon, and which planets are actually up.
 *
 *  CONVENTION — WHAT "A NIGHT" MEANS HERE
 *  A night labelled 2026-09-19 runs from that afternoon through to the
 *  following sunrise. Anyone asking "what can I see on Friday night" means
 *  the small hours of Saturday too, and a calendar that cut off at midnight
 *  would drop the best part of most sessions.
 *
 *  ALL CALCULATIONS ARE TOPOCENTRIC and use astronomy-engine, which derives
 *  from VSOP87 and the NOVAS reference implementation. Rise and set times
 *  include atmospheric refraction at the standard 34 arcminutes; altitudes
 *  quoted for observation use refracted values, because that is what the eye
 *  and the telescope actually see.
 * ============================================================================
 */

import {
  Body,
  Equator,
  Horizon,
  Illumination,
  SearchAltitude,
  SearchHourAngle,
  SearchRiseSet,
  MoonPhase,
  Observer,
} from 'astronomy-engine'

import { observerFor, DEFAULT_MIN_ALTITUDE, type SkyLocation } from './observer'

/* -------------------------------------------------------------------------- *
 *  Time helpers. Everything is computed in UTC and presented in the
 *  location's zone; no calculation ever depends on the server's timezone.
 * -------------------------------------------------------------------------- */

export function istParts(d: Date, timeZone = 'Asia/Kolkata') {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hour12: false,
  })
  return f.format(d)
}

/** Local noon on `isoDate`, as the anchor for a night's searches. */
export function anchorNoon(isoDate: string, longitude: number): Date {
  // Local mean solar noon, offset by longitude — better than assuming IST for
  // a site 29° of longitude away from the meridian the clock is set to.
  const utcNoon = Date.UTC(
    Number(isoDate.slice(0, 4)),
    Number(isoDate.slice(5, 7)) - 1,
    Number(isoDate.slice(8, 10)),
    12, 0, 0
  )
  return new Date(utcNoon - (longitude / 15) * 3600_000)
}

/* -------------------------------------------------------------------------- *
 *  Twilight
 * -------------------------------------------------------------------------- */

export interface TwilightTimes {
  sunset: Date | null
  civilEnd: Date | null
  nauticalEnd: Date | null
  astronomicalEnd: Date | null
  astronomicalStart: Date | null
  nauticalStart: Date | null
  civilStart: Date | null
  sunrise: Date | null
  /** Minutes of true astronomical darkness. Null when it never gets dark. */
  darknessMinutes: number | null
}

/** Sun-altitude thresholds that define each twilight, in degrees. */
const CIVIL = -6
const NAUTICAL = -12
const ASTRONOMICAL = -18

export function twilight(location: SkyLocation, isoDate: string): TwilightTimes {
  const ob = observerFor(location)
  const noon = anchorNoon(isoDate, location.longitude)

  const sunset = SearchRiseSet(Body.Sun, ob, -1, noon, 1)?.date ?? null
  const start = sunset ?? noon

  // Each twilight boundary is the Sun crossing a fixed altitude, searched
  // forward from sunset for the evening and onward for the morning.
  const down = (deg: number) => SearchAltitude(Body.Sun, ob, -1, start, 1, deg)?.date ?? null
  const civilEnd = down(CIVIL)
  const nauticalEnd = down(NAUTICAL)
  const astronomicalEnd = down(ASTRONOMICAL)

  const afterMidnight = new Date(start.getTime() + 6 * 3600_000)
  const up = (deg: number) => SearchAltitude(Body.Sun, ob, +1, afterMidnight, 1, deg)?.date ?? null
  const astronomicalStart = up(ASTRONOMICAL)
  const nauticalStart = up(NAUTICAL)
  const civilStart = up(CIVIL)
  const sunrise = SearchRiseSet(Body.Sun, ob, +1, afterMidnight, 1)?.date ?? null

  const darknessMinutes =
    astronomicalEnd && astronomicalStart
      ? Math.max(0, Math.round((astronomicalStart.getTime() - astronomicalEnd.getTime()) / 60_000))
      : null

  return {
    sunset, civilEnd, nauticalEnd, astronomicalEnd,
    astronomicalStart, nauticalStart, civilStart, sunrise,
    darknessMinutes,
  }
}

/* -------------------------------------------------------------------------- *
 *  Moon
 * -------------------------------------------------------------------------- */

export type MoonPhaseName =
  | 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous'
  | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent'

export interface MoonInfo {
  /** 0-360°, the Moon's elongation east of the Sun. Drives everything else. */
  phaseAngle: number
  phaseName: MoonPhaseName
  /** Percent of the disc lit, 0-100. The honest number, not a bucket. */
  illumination: number
  waxing: boolean
  /** Days since the last new moon. */
  age: number
  rise: Date | null
  set: Date | null
  transit: Date | null
  /** Altitude at the darkest point of the night. */
  altitudeAtDarkest: number | null
  /**
   * Fraction of the dark window the Moon spends above the horizon, 0-1.
   *
   * Sampling a single instant is not enough: a crescent that sets two hours
   * into a ten-hour night is genuinely different from one that never rises,
   * and both look identical at the midpoint. This is what interference should
   * actually be weighted by.
   */
  upFractionOfDark: number | null
  /** Mean altitude across the part of the dark window it is up. */
  meanAltitudeWhenUp: number | null
  distanceKm: number
}

const SYNODIC_DAYS = 29.530588853

/**
 * Phase names from the phase angle.
 *
 * The four "exact" phases are given a ±3.5° window rather than a single
 * instant, so a calendar cell can say "Full Moon" on the day it is full
 * rather than only in the minute it is full.
 */
function phaseNameFor(angle: number): MoonPhaseName {
  const a = ((angle % 360) + 360) % 360
  if (a < 3.5 || a >= 356.5) return 'New Moon'
  if (Math.abs(a - 90) < 3.5) return 'First Quarter'
  if (Math.abs(a - 180) < 3.5) return 'Full Moon'
  if (Math.abs(a - 270) < 3.5) return 'Last Quarter'
  if (a < 90) return 'Waxing Crescent'
  if (a < 180) return 'Waxing Gibbous'
  if (a < 270) return 'Waning Gibbous'
  return 'Waning Crescent'
}

export function moonFor(
  location: SkyLocation,
  isoDate: string,
  darkest?: Date | null,
  darkWindow?: { from: Date | null; to: Date | null }
): MoonInfo {
  const ob = observerFor(location)
  const noon = anchorNoon(isoDate, location.longitude)
  const midnightish = new Date(noon.getTime() + 12 * 3600_000)

  const illum = Illumination(Body.Moon, midnightish)
  // MoonPhase() returns the ecliptic elongation of the Moon from the Sun
  // directly: 0 new, 90 first quarter, 180 full, 270 last quarter. Deriving
  // this from the Sun-Moon-Earth angle instead needs a separate waxing test
  // to disambiguate, which mislabels the hours either side of full.
  const elongation = MoonPhase(midnightish)
  const waxing = elongation < 180

  const rise = SearchRiseSet(Body.Moon, ob, +1, noon, 1)?.date ?? null
  const set = SearchRiseSet(Body.Moon, ob, -1, noon, 1)?.date ?? null
  const transit = SearchHourAngle(Body.Moon, ob, 0, noon, +1)?.time.date ?? null

  let altitudeAtDarkest: number | null = null
  if (darkest) {
    const eq = Equator(Body.Moon, darkest, ob, true, true)
    altitudeAtDarkest = Horizon(darkest, ob, eq.ra, eq.dec, 'normal').altitude
  }

  // Walk the dark window at 10-minute steps to find how much of it the Moon
  // is actually up for, and how high it gets while it is.
  let upFractionOfDark: number | null = null
  let meanAltitudeWhenUp: number | null = null
  if (darkWindow?.from && darkWindow.to && darkWindow.to > darkWindow.from) {
    let samples = 0
    let up = 0
    let altSum = 0
    for (let t = darkWindow.from.getTime(); t <= darkWindow.to.getTime(); t += 600_000) {
      const at = new Date(t)
      const eq = Equator(Body.Moon, at, ob, true, true)
      const alt = Horizon(at, ob, eq.ra, eq.dec, 'normal').altitude
      samples++
      if (alt > 0) { up++; altSum += alt }
    }
    if (samples > 0) {
      upFractionOfDark = up / samples
      meanAltitudeWhenUp = up > 0 ? altSum / up : 0
    }
  }

  return {
    phaseAngle: elongation,
    phaseName: phaseNameFor(elongation),
    illumination: illum.phase_fraction * 100,
    waxing,
    age: (elongation / 360) * SYNODIC_DAYS,
    rise, set, transit,
    altitudeAtDarkest,
    upFractionOfDark,
    meanAltitudeWhenUp,
    distanceKm: illum.geo_dist * 149_597_870.7,
  }
}

/* -------------------------------------------------------------------------- *
 *  Planets
 * -------------------------------------------------------------------------- */

export const PLANETS = [
  { body: Body.Mercury, name: 'Mercury' },
  { body: Body.Venus, name: 'Venus' },
  { body: Body.Mars, name: 'Mars' },
  { body: Body.Jupiter, name: 'Jupiter' },
  { body: Body.Saturn, name: 'Saturn' },
  { body: Body.Uranus, name: 'Uranus' },
  { body: Body.Neptune, name: 'Neptune' },
] as const

export interface PlanetVisibility {
  name: string
  visible: boolean
  rise: Date | null
  set: Date | null
  transit: Date | null
  /** Best altitude reached while the sky is actually dark. */
  maxAltitudeInDark: number | null
  /** Compass direction at that best moment. */
  direction: string | null
  magnitude: number
  /** When it is worth looking, within the dark window. */
  bestFrom: Date | null
  bestTo: Date | null
  /** Needs a telescope — Uranus and Neptune are never naked-eye. */
  telescopeOnly: boolean
}

const COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
export function compass(azimuth: number): string {
  return COMPASS[Math.round((((azimuth % 360) + 360) % 360) / 22.5) % 16]
}

/**
 * Which planets clear `minAltitude` during the dark window, and when.
 *
 * Sampled every 10 minutes across the window. A planet that only scrapes the
 * horizon inside a 10-minute gap is not one anybody is going to observe, so
 * the resolution is deliberate rather than a limitation.
 */
export function planetsFor(
  location: SkyLocation,
  isoDate: string,
  window: { from: Date | null; to: Date | null },
  minAltitude: number = DEFAULT_MIN_ALTITUDE
): PlanetVisibility[] {
  const ob = observerFor(location)
  const noon = anchorNoon(isoDate, location.longitude)

  return PLANETS.map(({ body, name }) => {
    const rise = SearchRiseSet(body, ob, +1, noon, 1)?.date ?? null
    const set = SearchRiseSet(body, ob, -1, noon, 1)?.date ?? null
    const transit = SearchHourAngle(body, ob, 0, noon, +1)?.time.date ?? null
    const magnitude = Illumination(body, noon).mag

    let maxAlt = -90
    let bestAt: Date | null = null
    let bestAz = 0
    let firstUp: Date | null = null
    let lastUp: Date | null = null

    if (window.from && window.to && window.to > window.from) {
      for (let t = window.from.getTime(); t <= window.to.getTime(); t += 600_000) {
        const at = new Date(t)
        const eq = Equator(body, at, ob, true, true)
        const h = Horizon(at, ob, eq.ra, eq.dec, 'normal')
        if (h.altitude > maxAlt) { maxAlt = h.altitude; bestAt = at; bestAz = h.azimuth }
        if (h.altitude >= minAltitude) {
          if (!firstUp) firstUp = at
          lastUp = at
        }
      }
    }

    return {
      name,
      visible: maxAlt >= minAltitude,
      rise, set, transit,
      maxAltitudeInDark: bestAt ? maxAlt : null,
      direction: bestAt ? compass(bestAz) : null,
      magnitude,
      bestFrom: firstUp,
      bestTo: lastUp,
      telescopeOnly: name === 'Uranus' || name === 'Neptune',
    }
  })
}

/* -------------------------------------------------------------------------- *
 *  The whole night, assembled
 * -------------------------------------------------------------------------- */

export interface NightReport {
  isoDate: string
  location: SkyLocation
  minAltitude: number
  twilight: TwilightTimes
  moon: MoonInfo
  planets: PlanetVisibility[]
  /** Midpoint of astronomical darkness — the reference instant for altitudes. */
  darkest: Date | null
}

export function nightFor(
  location: SkyLocation,
  isoDate: string,
  minAltitude: number = DEFAULT_MIN_ALTITUDE
): NightReport {
  const tw = twilight(location, isoDate)
  const darkest =
    tw.astronomicalEnd && tw.astronomicalStart
      ? new Date((tw.astronomicalEnd.getTime() + tw.astronomicalStart.getTime()) / 2)
      : null

  return {
    isoDate,
    location,
    minAltitude,
    twilight: tw,
    moon: moonFor(location, isoDate, darkest, {
      from: tw.astronomicalEnd,
      to: tw.astronomicalStart,
    }),
    planets: planetsFor(
      location,
      isoDate,
      { from: tw.astronomicalEnd, to: tw.astronomicalStart },
      minAltitude
    ),
    darkest,
  }
}

export type { Observer }
