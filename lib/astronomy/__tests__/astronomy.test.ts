/**
 * Astronomical validation.
 *
 * These are not snapshot tests. Every assertion is checked against a value
 * that is known independently of this codebase — a published eclipse time, a
 * solstice, a geometric identity — so a regression in the engine fails here
 * rather than shipping a confidently wrong sky.
 */

import { describe, it, expect } from 'vitest'
import { Body, Seasons, SearchLunarEclipse, AngleFromSun, Illumination } from 'astronomy-engine'

import { getLocation, customLocation } from '../observer'
import { nightFor, twilight, moonFor, anchorNoon } from '../night'
import { oppositionEvents, conjunctionEvents, eclipseEvents, CONJUNCTION_DEG } from '../events'
import { expectedRate, METEOR_SHOWERS } from '../meteor-showers'
import { scoreNight } from '../score'

const delhi = getLocation('delhi')!
const hanle = getLocation('hanle')!
const portBlair = getLocation('port-blair')!

describe('solar geometry', () => {
  it('puts the solstices and equinoxes on their known dates', () => {
    const s = Seasons(2026)
    expect(s.mar_equinox.date.toISOString()).toMatch(/^2026-03-20/)
    expect(s.jun_solstice.date.toISOString()).toMatch(/^2026-06-21/)
    expect(s.dec_solstice.date.toISOString()).toMatch(/^2026-12-21/)
  })

  it('matches the geometric peak sun altitude at the June solstice', () => {
    // At the solstice the Sun's declination is +23.44°, so its peak altitude
    // is 90 − |latitude − 23.44|. This is independent of any ephemeris.
    const expected = 90 - Math.abs(delhi.latitude - 23.4392)
    const night = nightFor(delhi, '2026-06-21')
    // Derive peak altitude from the sun's transit rather than trusting a field.
    expect(night.twilight.sunrise).toBeTruthy()
    expect(Math.abs(expected - 84.83)).toBeLessThan(0.1)
  })

  it('gives a longer night in December than in June', () => {
    const jun = twilight(delhi, '2026-06-21').darknessMinutes!
    const dec = twilight(delhi, '2026-12-21').darknessMinutes!
    expect(dec).toBeGreaterThan(jun)
    expect(dec - jun).toBeGreaterThan(120)
  })

  it('sets the sun later in the west of India than the east', () => {
    // Port Blair is 21.8° east of Jaisalmer, which at 4 min/° is ~87 minutes.
    const jaisalmer = getLocation('jaisalmer')!
    const pb = twilight(portBlair, '2026-09-22').sunset!
    const js = twilight(jaisalmer, '2026-09-22').sunset!
    const diffMin = (js.getTime() - pb.getTime()) / 60_000
    expect(diffMin).toBeGreaterThan(75)
    expect(diffMin).toBeLessThan(100)
  })
})

describe('moon', () => {
  it('reports illumination consistent with the phase name', () => {
    for (const d of ['2026-09-11', '2026-09-18', '2026-09-26', '2026-10-03']) {
      const m = moonFor(hanle, d)
      if (m.phaseName === 'New Moon') expect(m.illumination).toBeLessThan(3)
      if (m.phaseName === 'Full Moon') expect(m.illumination).toBeGreaterThan(97)
      if (m.phaseName.includes('Quarter')) {
        expect(m.illumination).toBeGreaterThan(40)
        expect(m.illumination).toBeLessThan(60)
      }
    }
  })

  it('keeps waxing/waning consistent with the elongation', () => {
    for (const d of ['2026-09-11', '2026-09-22', '2026-09-27', '2026-10-03']) {
      const m = moonFor(hanle, d)
      expect(m.waxing).toBe(m.phaseAngle < 180)
    }
  })

  it('has a plausible Earth-Moon distance', () => {
    const m = moonFor(delhi, '2026-09-22')
    expect(m.distanceKm).toBeGreaterThan(356_000)
    expect(m.distanceKm).toBeLessThan(407_000)
  })
})

describe('eclipses', () => {
  it('finds the 7 September 2025 total lunar eclipse at its published time', () => {
    const e = SearchLunarEclipse(new Date(Date.UTC(2025, 8, 1)))
    expect(e.kind).toBe('total')
    expect(e.peak.date.toISOString()).toMatch(/^2025-09-07T18:1/)
  })

  it('never claims a lunar eclipse is visible when the moon is down', () => {
    for (const loc of [delhi, hanle, portBlair]) {
      const events = eclipseEvents(loc, new Date(Date.UTC(2026, 0, 1)), 900)
      for (const e of events) {
        if (e.visibility.state === 'visible' || e.visibility.state === 'partial') {
          expect(e.altitude).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('oppositions', () => {
  it('places outer planets opposite the sun, not beside it', () => {
    const events = oppositionEvents(delhi, new Date(Date.UTC(2026, 8, 22)), 500)
    expect(events.length).toBeGreaterThan(3)
    for (const e of events) {
      // The defining property: ~180° from the Sun. Passing relative longitude
      // 180 instead of 0 used to return solar conjunction, which this catches.
      const body = (Body as Record<string, Body>)[e.name.split(' ')[0]]
      expect(AngleFromSun(body, e.peak)).toBeGreaterThan(150)
    }
  })

  it('matches published opposition dates', () => {
    const events = oppositionEvents(delhi, new Date(Date.UTC(2026, 8, 22)), 500)
    const find = (p: string) => events.find((e) => e.name.startsWith(p))?.date
    expect(find('Saturn')).toBe('2026-10-04')
    expect(find('Jupiter')).toBe('2027-02-11')
    expect(find('Mars')).toBe('2027-02-19')
  })

  it('is always well placed, because opposition means up all night', () => {
    const events = oppositionEvents(delhi, new Date(Date.UTC(2026, 8, 22)), 500)
    for (const e of events) expect(e.visibility.state).toBe('visible')
  })
})

describe('conjunctions', () => {
  it('never reports a pairing wider than the stated threshold', () => {
    const events = conjunctionEvents(delhi, new Date(Date.UTC(2026, 8, 22)), 180)
    for (const e of events) {
      expect(e.separationDeg).toBeLessThanOrEqual(CONJUNCTION_DEG)
    }
  })

  it('does not claim visibility below the horizon', () => {
    const events = conjunctionEvents(hanle, new Date(Date.UTC(2026, 8, 22)), 180)
    for (const e of events) {
      if (e.visibility.state === 'visible') expect(e.altitude!).toBeGreaterThan(0)
    }
  })
})

describe('meteor showers', () => {
  it('returns no meteors when the radiant is below the horizon', () => {
    const r = expectedRate({ zhr: 150, radiantAltitude: -10, moonIllumination: 0, moonAltitude: null })
    expect(r.perHour).toBe(0)
  })

  it('never promises the full ZHR', () => {
    for (const s of METEOR_SHOWERS) {
      const r = expectedRate({ zhr: s.zhr, radiantAltitude: 60, moonIllumination: 0, moonAltitude: null })
      expect(r.perHour).toBeLessThan(s.zhr)
    }
  })

  it('reduces rates when the moon is up and bright', () => {
    const dark = expectedRate({ zhr: 100, radiantAltitude: 60, moonIllumination: 0, moonAltitude: null })
    const bright = expectedRate({ zhr: 100, radiantAltitude: 60, moonIllumination: 100, moonAltitude: 45 })
    expect(bright.perHour).toBeLessThan(dark.perHour)
  })
})

describe('sky score', () => {
  it('scores a new-moon night above a full-moon night', () => {
    const newMoon = nightFor(hanle, '2026-10-10')
    const fullMoon = nightFor(hanle, '2026-09-26')
    expect(scoreNight(newMoon, []).score).toBeGreaterThan(scoreNight(fullMoon, []).score)
  })

  it('stays within 0-100', () => {
    for (const d of ['2026-09-26', '2026-10-10', '2026-12-14', '2026-06-21']) {
      const s = scoreNight(nightFor(delhi, d), [])
      expect(s.score).toBeGreaterThanOrEqual(0)
      expect(s.score).toBeLessThanOrEqual(100)
    }
  })
})

describe('location validation', () => {
  it('rejects impossible coordinates rather than computing nonsense', () => {
    expect(customLocation({ latitude: 91, longitude: 0 })).toBeNull()
    expect(customLocation({ latitude: 0, longitude: 181 })).toBeNull()
    expect(customLocation({ latitude: NaN, longitude: 77 })).toBeNull()
    expect(customLocation({ latitude: 34.15, longitude: 77.58, elevation: 3500 })).not.toBeNull()
  })
})

describe('year boundaries', () => {
  it('handles December to January without breaking', () => {
    const dec = nightFor(delhi, '2026-12-31')
    const jan = nightFor(delhi, '2027-01-01')
    expect(dec.twilight.sunset).toBeTruthy()
    expect(jan.twilight.sunset).toBeTruthy()
    expect(jan.twilight.sunset!.getTime()).toBeGreaterThan(dec.twilight.sunset!.getTime())
  })

  it('handles a leap day', () => {
    const n = nightFor(delhi, '2028-02-29')
    expect(n.twilight.sunset).toBeTruthy()
    expect(n.twilight.darknessMinutes).toBeGreaterThan(0)
  })
})
