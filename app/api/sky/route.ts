import { NextResponse } from 'next/server'

import {
  getLocation, customLocation, DEFAULT_LOCATION_SLUG,
  DEFAULT_MIN_ALTITUDE, MIN_ALTITUDE_CHOICES,
} from '@/lib/astronomy/observer'
import { nightFor } from '@/lib/astronomy/night'
import { eventsFor, eventsOn } from '@/lib/astronomy/events'
import { scoreNight } from '@/lib/astronomy/score'

export const runtime = 'nodejs'
/** Depends on the requested location and date, so never cached globally. */
export const dynamic = 'force-dynamic'

/**
 * Sky data for one month at one place.
 *
 * GET /api/sky?location=hanle&month=2026-09&minAltitude=10
 * GET /api/sky?lat=34.15&lon=77.58&elevation=3500&month=2026-09
 *
 * Computed per request rather than pre-generated: the answer depends on
 * coordinates, and caching one location's visibility under another's would
 * be worse than not caching at all.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // --- observer -----------------------------------------------------------
  const lat = Number.parseFloat(searchParams.get('lat') ?? '')
  const lon = Number.parseFloat(searchParams.get('lon') ?? '')
  const location = Number.isFinite(lat) && Number.isFinite(lon)
    ? customLocation({
        latitude: lat,
        longitude: lon,
        elevation: Number.parseFloat(searchParams.get('elevation') ?? '0'),
        name: searchParams.get('name') ?? undefined,
      })
    : getLocation(searchParams.get('location') ?? DEFAULT_LOCATION_SLUG)

  if (!location) {
    return NextResponse.json(
      { error: 'Unknown location. Supply a known slug, or lat and lon.' },
      { status: 400 }
    )
  }

  // --- month --------------------------------------------------------------
  const month = searchParams.get('month') ?? new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).slice(0, 7)
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'month must be YYYY-MM.' }, { status: 400 })
  }
  const year = Number(month.slice(0, 4))
  const mon = Number(month.slice(5, 7))
  if (year < 1900 || year > 2100 || mon < 1 || mon > 12) {
    return NextResponse.json({ error: 'month is out of range.' }, { status: 400 })
  }

  const requested = Number.parseInt(searchParams.get('minAltitude') ?? '', 10)
  const minAltitude = (MIN_ALTITUDE_CHOICES as readonly number[]).includes(requested)
    ? requested
    : DEFAULT_MIN_ALTITUDE

  // --- compute ------------------------------------------------------------
  const daysInMonth = new Date(Date.UTC(year, mon, 0)).getUTCDate()
  const from = new Date(Date.UTC(year, mon - 1, 1))
  const events = eventsFor(location, from, daysInMonth + 1)

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const iso = `${month}-${String(i + 1).padStart(2, '0')}`
    const night = nightFor(location, iso, minAltitude)
    const dayEvents = eventsOn(events, iso)
    const score = scoreNight(night, dayEvents)

    return {
      date: iso,
      moon: {
        phaseName: night.moon.phaseName,
        illumination: Math.round(night.moon.illumination),
        waxing: night.moon.waxing,
        // Rounded: quoting altitude to six decimals is false precision.
        altitudeAtDarkest: night.moon.altitudeAtDarkest === null ? null : Math.round(night.moon.altitudeAtDarkest),
        rise: night.moon.rise?.toISOString() ?? null,
        set: night.moon.set?.toISOString() ?? null,
        distanceKm: Math.round(night.moon.distanceKm),
      },
      sun: {
        sunset: night.twilight.sunset?.toISOString() ?? null,
        sunrise: night.twilight.sunrise?.toISOString() ?? null,
        darkFrom: night.twilight.astronomicalEnd?.toISOString() ?? null,
        darkTo: night.twilight.astronomicalStart?.toISOString() ?? null,
        darknessMinutes: night.twilight.darknessMinutes,
      },
      planets: night.planets
        .filter((p) => p.visible)
        .map((p) => ({
          name: p.name,
          maxAltitude: p.maxAltitudeInDark === null ? null : Math.round(p.maxAltitudeInDark),
          direction: p.direction,
          magnitude: Number(p.magnitude.toFixed(1)),
          telescopeOnly: p.telescopeOnly,
        })),
      events: dayEvents.map((e) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        importance: e.importance,
        visibility: e.visibility,
        description: e.description,
        observingTips: e.observingTips,
        separationDeg: e.separationDeg === undefined ? undefined : Number(e.separationDeg.toFixed(1)),
        altitude: e.altitude === undefined ? undefined : Math.round(e.altitude),
        direction: e.direction,
        peak: e.peak.toISOString(),
        method: e.method,
      })),
      score: score.score,
      verdict: score.verdict,
      components: score.components,
      goodFor: score.goodFor,
      poorFor: score.poorFor,
    }
  })

  return NextResponse.json({
    ok: true,
    location: {
      slug: location.slug, name: location.name, region: location.region,
      latitude: location.latitude, longitude: location.longitude,
      elevation: location.elevation, timeZone: location.timeZone,
      note: location.note,
      // Stated, not guessed — see lib/astronomy/observer.ts.
      lightPollution: location.bortle ? { bortle: location.bortle } : null,
    },
    month,
    minAltitude,
    days,
  })
}
