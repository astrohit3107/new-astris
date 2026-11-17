/**
 * ============================================================================
 *  WHAT IS UP DURING A SATURDAY SESSION
 * ============================================================================
 *
 *  For each upcoming Saturday at a site, the planets and deep-sky objects
 *  that are actually well placed DURING THE SESSION — not across the whole
 *  night. A planet that rises at 3 am is real, and useless to a group that
 *  observed from nine to midnight.
 *
 *  SESSION WINDOW: the first five hours of astronomical darkness, matching the
 *  four-to-five-hour session that starts once it is properly dark. Changing
 *  SESSION_HOURS is the only thing to touch if the programme changes.
 *
 *  Nothing is padded to hit a count. "Two or three planets every night" is
 *  not how the sky works — some Saturdays have one, a few have none — so each
 *  list holds what is genuinely there, up to three.
 * ============================================================================
 */

import { Body, Equator, Horizon } from 'astronomy-engine'

import { observerFor, type SkyLocation } from './observer'
import { nightFor, compass, PLANETS } from './night'
import { DSOS, type DsoKind } from './deep-sky'

export const SESSION_HOURS = 5
/** Planets count from 10°, the engine-wide default. */
const PLANET_MIN_ALT = 10
/** Deep-sky objects need more: low ones are lost in haze and horizon glow. */
const DSO_MIN_ALT = 25
const STEP_MS = 10 * 60_000

export interface WeekendTarget {
  name: string
  detail: string
  maxAltitude: number
  direction: string
  /** IST clock time of best placement during the session. */
  bestAt: string
}

export interface SaturdaySky {
  date: string
  sessionFrom: string | null
  sessionTo: string | null
  moon: {
    phaseName: string
    illumination: number
    phaseAngle: number
    /** Share of the session the Moon is above the horizon, 0–100. */
    upDuringSession: number
  }
  planets: (WeekendTarget & { telescopeOnly: boolean; magnitude: number })[]
  deepSky: (WeekendTarget & { kind: DsoKind; catalogue: string })[]
  /** Ranks Saturdays against each other: mostly how much the Moon intrudes. */
  darkness: 'excellent' | 'good' | 'moonlit'
}

const ist = (d: Date) =>
  d.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })

/** The next `count` Saturdays (IST), starting with the coming one. */
export function upcomingSaturdays(count: number, from = new Date()): string[] {
  const todayIST = new Date(from.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) + 'T12:00:00Z')
  const d = new Date(todayIST)
  while (d.getUTCDay() !== 6) d.setUTCDate(d.getUTCDate() + 1)
  return Array.from({ length: count }, (_, i) => {
    const x = new Date(d.getTime() + i * 7 * 86400_000)
    return x.toISOString().slice(0, 10)
  })
}

/** Highest altitude reached inside the window, and when. */
function bestInWindow(
  from: Date, to: Date,
  altAz: (t: Date) => { altitude: number; azimuth: number }
): { alt: number; az: number; at: Date } {
  let best = { alt: -90, az: 0, at: from }
  for (let t = from.getTime(); t <= to.getTime(); t += STEP_MS) {
    const at = new Date(t)
    const h = altAz(at)
    if (h.altitude > best.alt) best = { alt: h.altitude, az: h.azimuth, at }
  }
  return best
}

export function saturdaySky(location: SkyLocation, isoDate: string): SaturdaySky {
  const ob = observerFor(location)
  const night = nightFor(location, isoDate)
  const dusk = night.twilight.astronomicalEnd
  const dawn = night.twilight.astronomicalStart

  if (!dusk || !dawn) {
    return {
      date: isoDate, sessionFrom: null, sessionTo: null,
      moon: { phaseName: night.moon.phaseName, illumination: Math.round(night.moon.illumination), phaseAngle: night.moon.phaseAngle, upDuringSession: 0 },
      planets: [], deepSky: [], darkness: 'moonlit',
    }
  }

  const from = dusk
  const to = new Date(Math.min(dusk.getTime() + SESSION_HOURS * 3600_000, dawn.getTime()))

  // --- Moon during the session ------------------------------------------
  let samples = 0, up = 0
  for (let t = from.getTime(); t <= to.getTime(); t += STEP_MS) {
    const at = new Date(t)
    const eq = Equator(Body.Moon, at, ob, true, true)
    samples++
    if (Horizon(at, ob, eq.ra, eq.dec, 'normal').altitude > 0) up++
  }
  const upFrac = samples ? up / samples : 0
  const illum = night.moon.illumination
  const intrusion = (illum / 100) * upFrac

  // --- Planets ---------------------------------------------------------------
  const planets = PLANETS.map(({ body, name }) => {
    const b = bestInWindow(from, to, (t) => {
      const eq = Equator(body, t, ob, true, true)
      return Horizon(t, ob, eq.ra, eq.dec, 'normal')
    })
    const p = night.planets.find((x) => x.name === name)!
    return { name, b, magnitude: p.magnitude, telescopeOnly: p.telescopeOnly }
  })
    .filter((x) => x.b.alt >= PLANET_MIN_ALT)
    // Naked-eye planets first, brightest first; Uranus and Neptune only fill
    // spare places, since they are tiny discs even in a telescope.
    .sort((a, z) => Number(a.telescopeOnly) - Number(z.telescopeOnly) || a.magnitude - z.magnitude)
    .slice(0, 3)
    .map((x) => ({
      name: x.name,
      detail: x.telescopeOnly ? 'Telescope only' : `Magnitude ${x.magnitude.toFixed(1)}`,
      maxAltitude: Math.round(x.b.alt),
      direction: compass(x.b.az),
      bestAt: ist(x.b.at),
      telescopeOnly: x.telescopeOnly,
      magnitude: Number(x.magnitude.toFixed(1)),
    }))

  // --- Deep sky --------------------------------------------------------------
  // With the Moon bright and up, galaxies and faint objects wash out; clusters
  // and the brightest nebulae survive. Below that, everything is fair game.
  const moonlit = intrusion > 0.3
  const candidates = DSOS
    .filter((o) => !moonlit || (o.kind !== 'galaxy' && o.mag <= 6))
    .map((o) => ({
      o,
      b: bestInWindow(from, to, (t) => Horizon(t, ob, o.ra / 15, o.dec, 'normal')),
    }))
    .filter((x) => x.b.alt >= DSO_MIN_ALT)
    .sort((a, z) => a.o.mag - z.o.mag)

  // Prefer variety — a nebula, a cluster and a galaxy beat three clusters.
  const picked: typeof candidates = []
  const seenKinds = new Set<string>()
  for (const c of candidates) {
    const k = c.o.kind.includes('cluster') ? 'cluster' : c.o.kind
    if (!seenKinds.has(k)) { picked.push(c); seenKinds.add(k) }
    if (picked.length === 3) break
  }
  for (const c of candidates) {
    if (picked.length === 3) break
    if (!picked.includes(c)) picked.push(c)
  }

  const deepSky = picked.map(({ o, b }) => ({
    name: o.name,
    catalogue: o.catalogue,
    kind: o.kind,
    detail: o.blurb,
    maxAltitude: Math.round(b.alt),
    direction: compass(b.az),
    bestAt: ist(b.at),
  }))

  return {
    date: isoDate,
    sessionFrom: ist(from),
    sessionTo: ist(to),
    moon: {
      phaseName: night.moon.phaseName,
      illumination: Math.round(illum),
      phaseAngle: night.moon.phaseAngle,
      upDuringSession: Math.round(upFrac * 100),
    },
    planets,
    deepSky,
    darkness: intrusion < 0.08 ? 'excellent' : intrusion < 0.3 ? 'good' : 'moonlit',
  }
}

export function saturdaysAt(location: SkyLocation, count = 8, from = new Date()): SaturdaySky[] {
  return upcomingSaturdays(count, from).map((d) => saturdaySky(location, d))
}
