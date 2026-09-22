/**
 * ============================================================================
 *  METEOR SHOWERS
 * ============================================================================
 *
 *  Shower parameters — active period, peak, ZHR and radiant — follow the
 *  International Meteor Organization's published working list. Peak dates
 *  shift by up to a day year to year; the solar-longitude figure is the
 *  precise anchor and the calendar date is the conventional one.
 *
 *  ---------------------------------------------------------------------------
 *  ZHR IS NOT THE NUMBER YOU WILL SEE. This is the single most misreported
 *  figure in amateur astronomy.
 *
 *  Zenithal Hourly Rate is a normalised laboratory quantity: what a single
 *  observer would count under a perfectly dark sky with the radiant directly
 *  overhead. Every real observation falls short of it, usually by a lot:
 *
 *    • the radiant is rarely at the zenith — rates scale with sin(altitude),
 *      so a radiant 30° up yields half the meteors, and one below the horizon
 *      yields none at all
 *    • moonlight erases the faint majority of meteors
 *    • so does light pollution
 *    • cloud, haze and an obstructed horizon all subtract further
 *
 *  `expectedRate()` below applies the first two corrections honestly and says
 *  what it cannot account for.
 * ============================================================================
 */

export interface MeteorShower {
  id: string
  name: string
  /** Parent body, where identified. */
  parent?: string
  /** Month/day the shower becomes active. */
  activeFrom: { month: number; day: number }
  activeTo: { month: number; day: number }
  /** Conventional peak date. */
  peak: { month: number; day: number }
  /** IMO zenithal hourly rate at maximum, under ideal conditions. */
  zhr: number
  /** Radiant, J2000. */
  radiant: { raHours: number; decDeg: number; constellation: string }
  /** Typical entry speed, km/s — fast showers give brighter, shorter trails. */
  velocityKmS: number
  notes: string
}

export const METEOR_SHOWERS: MeteorShower[] = [
  {
    id: 'quadrantids', name: 'Quadrantids', parent: 'Asteroid 2003 EH1',
    activeFrom: { month: 12, day: 28 }, activeTo: { month: 1, day: 12 }, peak: { month: 1, day: 3 },
    zhr: 110, radiant: { raHours: 15.33, decDeg: 49.5, constellation: 'Boötes' }, velocityKmS: 41,
    notes: 'A very sharp maximum — the peak lasts only a few hours, so the date matters more than for any other shower. The radiant is far north, which from southern India keeps it low.',
  },
  {
    id: 'lyrids', name: 'Lyrids', parent: 'Comet C/1861 G1 Thatcher',
    activeFrom: { month: 4, day: 14 }, activeTo: { month: 4, day: 30 }, peak: { month: 4, day: 22 },
    zhr: 18, radiant: { raHours: 18.07, decDeg: 34, constellation: 'Lyra' }, velocityKmS: 49,
    notes: 'Modest but reliable, and occasionally produces bright fireballs. The radiant rises late in the evening.',
  },
  {
    id: 'eta-aquariids', name: 'Eta Aquariids', parent: "Comet 1P/Halley",
    activeFrom: { month: 4, day: 19 }, activeTo: { month: 5, day: 28 }, peak: { month: 5, day: 6 },
    zhr: 50, radiant: { raHours: 22.5, decDeg: -1, constellation: 'Aquarius' }, velocityKmS: 66,
    notes: 'Debris from Halley’s Comet. The radiant sits near the celestial equator, which makes this one of the better showers from Indian latitudes — but it only rises a few hours before dawn.',
  },
  {
    id: 'delta-aquariids', name: 'Southern Delta Aquariids', parent: 'Comet 96P/Machholz (probable)',
    activeFrom: { month: 7, day: 12 }, activeTo: { month: 8, day: 23 }, peak: { month: 7, day: 30 },
    zhr: 25, radiant: { raHours: 22.67, decDeg: -16.4, constellation: 'Aquarius' }, velocityKmS: 41,
    notes: 'A broad, gentle maximum rather than a sharp peak, and favourably placed for southern latitudes. Falls in the monsoon over most of India.',
  },
  {
    id: 'perseids', name: 'Perseids', parent: 'Comet 109P/Swift-Tuttle',
    activeFrom: { month: 7, day: 17 }, activeTo: { month: 8, day: 24 }, peak: { month: 8, day: 12 },
    zhr: 100, radiant: { raHours: 3.22, decDeg: 58, constellation: 'Perseus' }, velocityKmS: 59,
    notes: 'The best-known shower of the year. From India it competes with the monsoon — the sky is often the limiting factor rather than the shower.',
  },
  {
    id: 'orionids', name: 'Orionids', parent: "Comet 1P/Halley",
    activeFrom: { month: 10, day: 2 }, activeTo: { month: 11, day: 7 }, peak: { month: 10, day: 21 },
    zhr: 20, radiant: { raHours: 6.35, decDeg: 15.5, constellation: 'Orion' }, velocityKmS: 66,
    notes: 'Halley’s other shower. Fast meteors, often leaving persistent trains, and well placed from India after midnight.',
  },
  {
    id: 'southern-taurids', name: 'Southern Taurids', parent: 'Comet 2P/Encke',
    activeFrom: { month: 9, day: 10 }, activeTo: { month: 11, day: 20 }, peak: { month: 11, day: 5 },
    zhr: 5, radiant: { raHours: 3.57, decDeg: 14, constellation: 'Taurus' }, velocityKmS: 27,
    notes: 'Low rates, but a high proportion of slow, bright fireballs. Worth watching across the whole active period rather than only at maximum.',
  },
  {
    id: 'northern-taurids', name: 'Northern Taurids', parent: 'Comet 2P/Encke',
    activeFrom: { month: 10, day: 20 }, activeTo: { month: 12, day: 10 }, peak: { month: 11, day: 12 },
    zhr: 5, radiant: { raHours: 3.87, decDeg: 22.2, constellation: 'Taurus' }, velocityKmS: 29,
    notes: 'The northern branch of the same stream, with the same fireball tendency.',
  },
  {
    id: 'leonids', name: 'Leonids', parent: 'Comet 55P/Tempel-Tuttle',
    activeFrom: { month: 11, day: 6 }, activeTo: { month: 11, day: 30 }, peak: { month: 11, day: 17 },
    zhr: 15, radiant: { raHours: 10.28, decDeg: 21.8, constellation: 'Leo' }, velocityKmS: 71,
    notes: 'The fastest meteors of any major shower. Produces storms roughly every 33 years; ordinary years are modest.',
  },
  {
    id: 'geminids', name: 'Geminids', parent: 'Asteroid 3200 Phaethon',
    activeFrom: { month: 12, day: 4 }, activeTo: { month: 12, day: 20 }, peak: { month: 12, day: 14 },
    zhr: 150, radiant: { raHours: 7.47, decDeg: 32.2, constellation: 'Gemini' }, velocityKmS: 35,
    notes: 'The richest shower of the year, and from India the best placed — the radiant is high for most of the night in clear, dry December air.',
  },
  {
    id: 'ursids', name: 'Ursids', parent: 'Comet 8P/Tuttle',
    activeFrom: { month: 12, day: 17 }, activeTo: { month: 12, day: 26 }, peak: { month: 12, day: 22 },
    zhr: 10, radiant: { raHours: 14.47, decDeg: 75.3, constellation: 'Ursa Minor' }, velocityKmS: 33,
    notes: 'A minor shower with a circumpolar-ish northern radiant, so it never rises high from southern India.',
  },
]

/**
 * Meteors per hour a real observer might reasonably expect.
 *
 * Corrects ZHR for radiant altitude and for moonlight, which are the two
 * dominant effects we can actually compute. It does NOT model cloud, haze,
 * local light pollution or the observer's own experience, all of which
 * subtract further — so this is an optimistic ceiling, not a promise.
 */
export function expectedRate(input: {
  zhr: number
  radiantAltitude: number
  moonIllumination: number
  moonAltitude: number | null
}): { perHour: number; caveat: string } {
  if (input.radiantAltitude <= 0) {
    return { perHour: 0, caveat: 'The radiant is below the horizon — no meteors from this shower are visible here.' }
  }

  // Standard ZHR-to-observed correction: rates fall with the sine of the
  // radiant's altitude above the horizon.
  const altitudeFactor = Math.sin((input.radiantAltitude * Math.PI) / 180)

  // Moonlight penalty, applied only while the Moon is actually up. A full
  // Moon costs most of the faint meteors, which are most of them.
  let moonFactor = 1
  if (input.moonAltitude !== null && input.moonAltitude > 0) {
    moonFactor = 1 - 0.7 * (input.moonIllumination / 100)
  }

  const perHour = Math.round(input.zhr * altitudeFactor * moonFactor)
  return {
    perHour,
    caveat:
      'Corrected for radiant altitude and moonlight only. Cloud, haze, local light pollution and an obstructed horizon will all reduce this further.',
  }
}
