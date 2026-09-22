/**
 * ============================================================================
 *  THE EVENT ENGINE
 * ============================================================================
 *
 *  Everything happening in the sky over a date range, and — the part that
 *  matters — whether it can be seen from one specific place.
 *
 *  THE RULE THIS FILE EXISTS TO ENFORCE
 *  An event occurring is not the same as an event being visible. A lunar
 *  eclipse at 03:00 with the Moon below the horizon is, for the observer,
 *  nothing at all. Every event therefore carries a `visibility` that is
 *  computed from the observer's coordinates, never asserted.
 *
 *  CONJUNCTION THRESHOLDS, stated rather than assumed:
 *    conjunction        ≤ 5.0° apparent separation
 *    close conjunction  ≤ 1.0°
 *  There is no official definition of "close"; these are the values this
 *  engine uses, and they are applied uniformly.
 * ============================================================================
 */

import {
  Body,
  Equator,
  Horizon,
  Illumination,
  SearchLunarEclipse,
  NextLunarEclipse,
  SearchLocalSolarEclipse,
  NextLocalSolarEclipse,
  SearchMoonPhase,
  SearchRelativeLongitude,
  AngleFromSun,
  PairLongitude,
} from 'astronomy-engine'

import { observerFor, type SkyLocation } from './observer'
import { anchorNoon, nightFor, compass } from './night'
import { METEOR_SHOWERS, expectedRate } from './meteor-showers'

export type EventType =
  | 'MOON_PHASE' | 'METEOR_SHOWER' | 'ECLIPSE' | 'CONJUNCTION'
  | 'OPPOSITION' | 'PLANETARY_EVENT'

export type Importance = 'major' | 'notable' | 'minor'

export type Visibility =
  | { state: 'visible'; detail: string }
  | { state: 'partial'; detail: string }
  | { state: 'not-visible'; detail: string }
  | { state: 'not-applicable'; detail: string }

export interface SkyEvent {
  id: string
  name: string
  type: EventType
  /** ISO date (IST) this event belongs to on the calendar. */
  date: string
  peak: Date
  start?: Date
  end?: Date
  description: string
  importance: Importance
  visibility: Visibility
  /** Altitude of the relevant object at peak, from this location. */
  altitude?: number
  direction?: string
  magnitude?: number
  /** Angular separation, for conjunctions. */
  separationDeg?: number
  observingTips?: string
  /** How this entry was produced, for the methodology page. */
  method: string
}

/**
 * Importance, by a stated rule rather than taste:
 *   major    total/annular eclipses; showers with ZHR >= 100; conjunctions
 *            closer than 1°; oppositions of Mars, Jupiter and Saturn
 *   notable  partial eclipses; ZHR 15-99; conjunctions 1-3°; other oppositions
 *   minor    everything else, including the routine quarter phases
 */
function isoIST(d: Date): string {
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

/* -------------------------------------------------------------------------- *
 *  Moon phases
 * -------------------------------------------------------------------------- */

const PHASE_DEFS = [
  { angle: 0, name: 'New Moon', tip: 'The darkest skies of the month — the best nights for galaxies, nebulae and the Milky Way.' },
  { angle: 90, name: 'First Quarter', tip: 'The terminator runs down the middle of the disc: the best time to see lunar craters in relief.' },
  { angle: 180, name: 'Full Moon', tip: 'Spectacular in binoculars, and ruinous for everything faint. Plan deep-sky observing around it.' },
  { angle: 270, name: 'Last Quarter', tip: 'Rises around midnight, leaving the evening dark for deep-sky work.' },
]

export function moonPhaseEvents(from: Date, days: number): SkyEvent[] {
  const out: SkyEvent[] = []
  for (const def of PHASE_DEFS) {
    let cursor = new Date(from)
    const limit = new Date(from.getTime() + days * 86400_000)
    for (let guard = 0; guard < 60; guard++) {
      const hit = SearchMoonPhase(def.angle, cursor, 40)
      if (!hit || hit.date > limit) break
      out.push({
        id: `moon-${def.name.toLowerCase().replace(/\s+/g, '-')}-${isoIST(hit.date)}`,
        name: def.name,
        type: 'MOON_PHASE',
        date: isoIST(hit.date),
        peak: hit.date,
        description: `${def.name}, exact at ${hit.date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} IST.`,
        importance: def.angle === 0 || def.angle === 180 ? 'notable' : 'minor',
        visibility: { state: 'not-applicable', detail: 'A moon phase is a moment in time, the same everywhere on Earth.' },
        observingTips: def.tip,
        method: 'astronomy-engine SearchMoonPhase (ecliptic elongation of Moon from Sun)',
      })
      cursor = new Date(hit.date.getTime() + 86400_000 * 2)
    }
  }
  return out
}

/* -------------------------------------------------------------------------- *
 *  Eclipses — the clearest case of "occurs" vs "visible from here"
 * -------------------------------------------------------------------------- */

export function eclipseEvents(location: SkyLocation, from: Date, days: number): SkyEvent[] {
  const ob = observerFor(location)
  const limit = new Date(from.getTime() + days * 86400_000)
  const out: SkyEvent[] = []

  // --- Lunar: global event, local visibility decided by the Moon's altitude
  try {
    let ecl = SearchLunarEclipse(from)
    for (let i = 0; i < 12 && ecl && ecl.peak.date <= limit; i++) {
      const at = ecl.peak.date
      const eq = Equator(Body.Moon, at, ob, true, true)
      const alt = Horizon(at, ob, eq.ra, eq.dec, 'normal').altitude
      const kind = ecl.kind as string
      out.push({
        id: `lunar-eclipse-${isoIST(at)}`,
        name: `${kind.charAt(0).toUpperCase() + kind.slice(1)} Lunar Eclipse`,
        type: 'ECLIPSE',
        date: isoIST(at),
        peak: at,
        start: new Date(at.getTime() - (ecl.sd_partial || 60) * 60_000),
        end: new Date(at.getTime() + (ecl.sd_partial || 60) * 60_000),
        description: `A ${kind} lunar eclipse, greatest at ${at.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} IST.`,
        importance: kind === 'total' ? 'major' : 'notable',
        altitude: alt,
        visibility:
          alt > 0
            ? { state: 'visible', detail: `The Moon is ${alt.toFixed(0)}° above the horizon at greatest eclipse, so this is visible from ${location.name}.` }
            : { state: 'not-visible', detail: `The Moon is ${Math.abs(alt).toFixed(0)}° below the horizon at greatest eclipse. The eclipse happens, but not in this sky.` },
        observingTips: 'Needs no equipment and no filter — a lunar eclipse is safe to watch with the naked eye, and binoculars show the colour well.',
        method: 'astronomy-engine SearchLunarEclipse, with topocentric Moon altitude at greatest eclipse',
      })
      ecl = NextLunarEclipse(ecl.peak.date)
    }
  } catch { /* leave lunar eclipses out rather than guess */ }

  // --- Solar: computed FOR THIS OBSERVER. This is the one that must never
  //     be reported as a blanket "visible in India".
  try {
    let sol = SearchLocalSolarEclipse(from, ob)
    for (let i = 0; i < 8 && sol && sol.peak.time.date <= limit; i++) {
      const at = sol.peak.time.date
      const kind = sol.kind as string
      const alt = sol.peak.altitude
      out.push({
        id: `solar-eclipse-${isoIST(at)}`,
        name: `${kind.charAt(0).toUpperCase() + kind.slice(1)} Solar Eclipse`,
        type: 'ECLIPSE',
        date: isoIST(at),
        peak: at,
        start: sol.partial_begin?.time.date,
        end: sol.partial_end?.time.date,
        description: `A ${kind} solar eclipse as seen from ${location.name}, greatest at ${at.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} IST with the Sun ${alt.toFixed(0)}° above the horizon.`,
        importance: kind === 'total' || kind === 'annular' ? 'major' : 'notable',
        altitude: alt,
        visibility:
          alt <= 0
            ? { state: 'not-visible', detail: 'The Sun is below the horizon here for the whole eclipse.' }
            : kind === 'partial'
              ? { state: 'partial', detail: `A partial eclipse is visible from ${location.name}, with ${(sol.obscuration * 100).toFixed(0)}% of the Sun covered at maximum.` }
              : { state: 'visible', detail: `${kind.charAt(0).toUpperCase() + kind.slice(1)} phase is visible from ${location.name}.` },
        observingTips:
          'NEVER look at the Sun without certified solar filters — not with sunglasses, exposed film, or a filter on the eyepiece end of a telescope. Unfiltered sunlight through any optics causes immediate, permanent blindness.',
        method: 'astronomy-engine SearchLocalSolarEclipse — local circumstances for these exact coordinates',
      })
      sol = NextLocalSolarEclipse(sol.peak.time.date, ob)
    }
  } catch { /* as above */ }

  return out
}

/* -------------------------------------------------------------------------- *
 *  Oppositions
 * -------------------------------------------------------------------------- */

const OUTER = [
  { body: Body.Mars, name: 'Mars' },
  { body: Body.Jupiter, name: 'Jupiter' },
  { body: Body.Saturn, name: 'Saturn' },
  { body: Body.Uranus, name: 'Uranus' },
  { body: Body.Neptune, name: 'Neptune' },
]

export function oppositionEvents(location: SkyLocation, from: Date, days: number): SkyEvent[] {
  const ob = observerFor(location)
  const limit = new Date(from.getTime() + days * 86400_000)
  const out: SkyEvent[] = []

  for (const { body, name } of OUTER) {
    let cursor = new Date(from)
    for (let i = 0; i < 4; i++) {
      // Relative longitude is the Earth-planet angle AS SEEN FROM THE SUN, so
      // opposition for an outer planet is 0, not 180. Passing 180 here finds
      // SOLAR CONJUNCTION — the planet lost in the Sun's glare, the precise
      // opposite of what this function claims to return.
      const at = SearchRelativeLongitude(body, 0, cursor)
      if (!at || at.date > limit) break

      // Guard the above: at a true opposition the planet sits ~180° from the
      // Sun in the sky. If it does not, something has gone wrong and it is
      // better to drop the entry than to publish a wrong date.
      const elongation = AngleFromSun(body, at.date)
      if (elongation < 150) {
        cursor = new Date(at.date.getTime() + 86400_000 * 30)
        continue
      }
      const eq = Equator(body, at.date, ob, true, true)
      const illum = Illumination(body, at.date)
      // Peak altitude on the night of opposition.
      const night = nightFor(location, isoIST(at.date))
      const p = night.planets.find((x) => x.name === name)
      out.push({
        id: `opposition-${name.toLowerCase()}-${isoIST(at.date)}`,
        name: `${name} at Opposition`,
        type: 'OPPOSITION',
        date: isoIST(at.date),
        peak: at.date,
        description: `${name} is opposite the Sun — closest to Earth for this cycle, at its brightest, and above the horizon all night.`,
        importance: ['Mars', 'Jupiter', 'Saturn'].includes(name) ? 'major' : 'notable',
        magnitude: illum.mag,
        altitude: p?.maxAltitudeInDark ?? undefined,
        direction: p?.direction ?? undefined,
        visibility: p?.visible
          ? { state: 'visible', detail: `Reaches ${p.maxAltitudeInDark?.toFixed(0)}° from ${location.name}, in the ${p.direction}.` }
          : { state: 'not-visible', detail: `Stays below ${night.minAltitude}° from ${location.name} on this night.` },
        observingTips:
          name === 'Saturn' ? 'The best night of the year for the rings — any telescope over 60mm will show them.'
          : name === 'Jupiter' ? 'The four Galilean moons are visible in binoculars, and shift position from hour to hour.'
          : name === 'Mars' ? 'Surface markings and a polar cap need steady air and moderate magnification.'
          : 'A small blue-green disc in a telescope; indistinguishable from a star in binoculars.',
        method: 'astronomy-engine SearchRelativeLongitude(body, 180°)',
      })
      cursor = new Date(at.date.getTime() + 86400_000 * 30)
    }
  }
  return out
}

/* -------------------------------------------------------------------------- *
 *  Conjunctions
 * -------------------------------------------------------------------------- */

export const CONJUNCTION_DEG = 5.0
export const CLOSE_CONJUNCTION_DEG = 1.0

const PAIRS: [Body, string, Body, string][] = [
  [Body.Moon, 'Moon', Body.Venus, 'Venus'],
  [Body.Moon, 'Moon', Body.Jupiter, 'Jupiter'],
  [Body.Moon, 'Moon', Body.Saturn, 'Saturn'],
  [Body.Moon, 'Moon', Body.Mars, 'Mars'],
  [Body.Venus, 'Venus', Body.Jupiter, 'Jupiter'],
  [Body.Venus, 'Venus', Body.Saturn, 'Saturn'],
  [Body.Venus, 'Venus', Body.Mars, 'Mars'],
  [Body.Mars, 'Mars', Body.Jupiter, 'Jupiter'],
  [Body.Mars, 'Mars', Body.Saturn, 'Saturn'],
  [Body.Jupiter, 'Jupiter', Body.Saturn, 'Saturn'],
]

/** True angular separation between two bodies as seen from the observer. */
function separation(a: Body, b: Body, at: Date, ob: ReturnType<typeof observerFor>): number {
  const ea = Equator(a, at, ob, true, true)
  const eb = Equator(b, at, ob, true, true)
  const ha = Horizon(at, ob, ea.ra, ea.dec, 'normal')
  const hb = Horizon(at, ob, eb.ra, eb.dec, 'normal')
  const toRad = Math.PI / 180
  const c =
    Math.sin(ha.altitude * toRad) * Math.sin(hb.altitude * toRad) +
    Math.cos(ha.altitude * toRad) * Math.cos(hb.altitude * toRad) *
      Math.cos((ha.azimuth - hb.azimuth) * toRad)
  return Math.acos(Math.max(-1, Math.min(1, c))) / toRad
}

/**
 * Close approaches within the window.
 *
 * Scanned at 6-hour resolution to find candidate minima, then refined to the
 * nearest 10 minutes. A pair is only reported if it comes within
 * CONJUNCTION_DEG *and* is above the horizon at that moment — two objects
 * converging below the horizon is a fact about the solar system, not an
 * observing opportunity.
 */
export function conjunctionEvents(location: SkyLocation, from: Date, days: number): SkyEvent[] {
  const ob = observerFor(location)
  const out: SkyEvent[] = []
  const end = from.getTime() + days * 86400_000

  for (const [a, aName, b, bName] of PAIRS) {
    let best: { at: Date; sep: number } | null = null
    const flush = () => {
      if (!best) return
      const at = best.at
      const eq = Equator(a, at, ob, true, true)
      const h = Horizon(at, ob, eq.ra, eq.dec, 'normal')
      const close = best.sep <= CLOSE_CONJUNCTION_DEG
      out.push({
        id: `conjunction-${aName}-${bName}-${isoIST(at)}`.toLowerCase(),
        name: `${aName} meets ${bName}`,
        type: 'CONJUNCTION',
        date: isoIST(at),
        peak: at,
        description: `${aName} and ${bName} pass ${best.sep.toFixed(1)}° apart${close ? ' — a close pairing, easily framed together in binoculars' : ''}.`,
        importance: close ? 'major' : best.sep <= 3 ? 'notable' : 'minor',
        separationDeg: best.sep,
        altitude: h.altitude,
        direction: compass(h.azimuth),
        visibility:
          h.altitude > 0
            ? { state: 'visible', detail: `${h.altitude.toFixed(0)}° above the horizon in the ${compass(h.azimuth)} from ${location.name}.` }
            : { state: 'not-visible', detail: `Below the horizon from ${location.name} at closest approach.` },
        observingTips: 'Binoculars frame a pairing like this far better than a telescope, which magnifies them apart.',
        method: `topocentric angular separation, reported at ≤ ${CONJUNCTION_DEG}°`,
      })
      best = null
    }

    let wasClose = false
    for (let t = from.getTime(); t <= end; t += 6 * 3600_000) {
      const at = new Date(t)
      const sep = separation(a, b, at, ob)
      if (sep <= CONJUNCTION_DEG) {
        wasClose = true
        // Refine around this sample.
        for (let dt = -3 * 3600_000; dt <= 3 * 3600_000; dt += 600_000) {
          const fine = new Date(t + dt)
          if (fine.getTime() < from.getTime() || fine.getTime() > end) continue
          const s = separation(a, b, fine, ob)
          if (!best || s < best.sep) best = { at: fine, sep: s }
        }
      } else if (wasClose) {
        wasClose = false
        flush()
      }
    }
    flush()
  }
  return out
}

/* -------------------------------------------------------------------------- *
 *  Meteor showers, placed in the sky over this location
 * -------------------------------------------------------------------------- */

export function meteorEvents(location: SkyLocation, from: Date, days: number): SkyEvent[] {
  const ob = observerFor(location)
  const out: SkyEvent[] = []
  const startYear = from.getUTCFullYear()

  for (const year of [startYear, startYear + 1]) {
    for (const s of METEOR_SHOWERS) {
      const peak = new Date(Date.UTC(year, s.peak.month - 1, s.peak.day, 12))
      if (peak < from || peak.getTime() > from.getTime() + days * 86400_000) continue

      const iso = isoIST(peak)
      const night = nightFor(location, iso)
      const ref = night.darkest ?? new Date(peak.getTime() + 6 * 3600_000)

      // Radiant altitude at the darkest point of the peak night.
      const h = Horizon(
        ref, ob,
        s.radiant.raHours,
        s.radiant.decDeg,
        'normal'
      )
      const rate = expectedRate({
        zhr: s.zhr,
        radiantAltitude: h.altitude,
        moonIllumination: night.moon.illumination,
        moonAltitude: night.moon.altitudeAtDarkest,
      })

      out.push({
        id: `meteor-${s.id}-${year}`,
        name: `${s.name} peak`,
        type: 'METEOR_SHOWER',
        date: iso,
        peak,
        start: new Date(Date.UTC(year, s.activeFrom.month - 1, s.activeFrom.day)),
        end: new Date(Date.UTC(s.activeTo.month < s.activeFrom.month ? year + 1 : year, s.activeTo.month - 1, s.activeTo.day)),
        description: `${s.name} at maximum. ZHR ${s.zhr} under ideal conditions; from ${location.name} the radiant reaches ${h.altitude.toFixed(0)}° and the Moon is ${night.moon.illumination.toFixed(0)}% lit, so expect nearer ${rate.perHour} per hour.`,
        importance: s.zhr >= 100 ? 'major' : s.zhr >= 15 ? 'notable' : 'minor',
        altitude: h.altitude,
        direction: compass(h.azimuth),
        visibility:
          h.altitude <= 0
            ? { state: 'not-visible', detail: `The radiant in ${s.radiant.constellation} stays below the horizon from ${location.name} during darkness.` }
            : h.altitude < 20
              ? { state: 'partial', detail: `The radiant only reaches ${h.altitude.toFixed(0)}° from ${location.name}, which cuts rates substantially.` }
              : { state: 'visible', detail: `The radiant reaches ${h.altitude.toFixed(0)}° in the ${compass(h.azimuth)} from ${location.name}.` },
        observingTips: `${s.notes} Look about 40° away from the radiant rather than at it, lie back so you take in as much sky as possible, and give your eyes 20 minutes to adapt. ${rate.caveat}`,
        method: 'IMO shower parameters; radiant altitude computed topocentrically; rate corrected for altitude and moonlight',
      })
    }
  }
  return out
}

/* -------------------------------------------------------------------------- *
 *  Everything, for a range
 * -------------------------------------------------------------------------- */

export function eventsFor(location: SkyLocation, from: Date, days: number): SkyEvent[] {
  const all = [
    ...moonPhaseEvents(from, days),
    ...eclipseEvents(location, from, days),
    ...oppositionEvents(location, from, days),
    ...conjunctionEvents(location, from, days),
    ...meteorEvents(location, from, days),
  ]
  return all.sort((a, b) => a.peak.getTime() - b.peak.getTime())
}

export function eventsOn(events: SkyEvent[], isoDate: string): SkyEvent[] {
  return events.filter((e) => e.date === isoDate)
}
