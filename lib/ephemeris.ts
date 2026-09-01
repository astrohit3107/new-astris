/**
 * A small ephemeris: where the planets and a handful of deep-sky objects are,
 * as seen from a given place at a given time.
 *
 * METHOD
 * ------
 * Low-precision orbital elements (Paul Schlyter's well-known formulation).
 * Accurate to roughly a arcminute for the naked-eye planets over the current
 * era — far beyond what "is Jupiter up tonight?" requires, and it needs no
 * network call or multi-megabyte data file.
 *
 * WHAT THIS IS HONEST ABOUT
 * -------------------------
 * Altitude is geometry, and geometry is exact. Whether you will actually SEE
 * something also depends on cloud, haze and the Moon — none of which this
 * knows. Callers therefore say "above the horizon", never "visible", and the
 * UI never promises a sighting.
 */

const RAD = Math.PI / 180
const sind = (d: number) => Math.sin(d * RAD)
const cosd = (d: number) => Math.cos(d * RAD)
const tand = (d: number) => Math.tan(d * RAD)
const asind = (x: number) => Math.asin(x) / RAD
const atan2d = (y: number, x: number) => Math.atan2(y, x) / RAD
const rev = (x: number) => ((x % 360) + 360) % 360

/** Julian Date. */
export function julianDate(at: Date): number {
  return at.getTime() / 86_400_000 + 2440587.5
}

/**
 * Schlyter's day number: days since 1999 Dec 31 00:00 UT (JD 2451543.5),
 * which is the epoch his orbital elements are referred to.
 */
export function dayNumber(at: Date): number {
  return julianDate(at) - 2451543.5
}

export interface Equatorial {
  /** Right ascension, degrees. */
  ra: number
  /** Declination, degrees. */
  dec: number
}

/** Obliquity of the ecliptic for the epoch. */
function obliquity(d: number): number {
  return 23.4393 - 3.563e-7 * d
}

/** Solve Kepler's equation. */
function eccentricAnomaly(M: number, e: number): number {
  let E = M + (180 / Math.PI) * e * sind(M) * (1 + e * cosd(M))
  for (let i = 0; i < 6; i++) {
    const dE = (E - (180 / Math.PI) * e * sind(E) - M) / (1 - e * cosd(E))
    E -= dE
    if (Math.abs(dE) < 1e-8) break
  }
  return E
}

/* ------------------------------------------------------------------------ */
/* The Sun — needed for sidereal time and for knowing when it is dark        */
/* ------------------------------------------------------------------------ */

function sunLongitude(d: number): { lon: number; M: number } {
  const w = 282.9404 + 4.70935e-5 * d
  const e = 0.016709 - 1.151e-9 * d
  const M = rev(356.047 + 0.9856002585 * d)
  const E = M + (180 / Math.PI) * e * sind(M) * (1 + e * cosd(M))
  const xv = cosd(E) - e
  const yv = Math.sqrt(1 - e * e) * sind(E)
  const v = atan2d(yv, xv)
  return { lon: rev(v + w), M }
}

/**
 * Local sidereal time in degrees.
 *
 * Uses the standard IAU expression for Greenwich mean sidereal time rather
 * than deriving it from the Sun's mean longitude — the derived form is easy
 * to get wrong by twelve hours, which silently inverts day and night.
 */
export function localSiderealTime(at: Date, longitudeEast: number): number {
  const T = julianDate(at) - 2451545.0
  return rev(280.46061837 + 360.98564736629 * T + longitudeEast)
}

/** The Sun's altitude — below about -15° means properly dark. */
export function sunAltitude(at: Date, latitude: number, longitudeEast: number): number {
  const d = dayNumber(at)
  const { lon } = sunLongitude(d)
  const ecl = obliquity(d)
  const ra = atan2d(sind(lon) * cosd(ecl), cosd(lon))
  const dec = asind(sind(lon) * sind(ecl))
  return altitude({ ra: rev(ra), dec }, at, latitude, longitudeEast)
}

/* ------------------------------------------------------------------------ */
/* Planets                                                                   */
/* ------------------------------------------------------------------------ */

export const PLANETS = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'] as const
export type PlanetName = (typeof PLANETS)[number]

interface Elements { N: number; i: number; w: number; a: number; e: number; M: number }

function elementsFor(planet: PlanetName, d: number): Elements {
  switch (planet) {
    case 'Mercury':
      return { N: 48.3313 + 3.24587e-5 * d, i: 7.0047 + 5.0e-8 * d, w: 29.1241 + 1.01444e-5 * d,
               a: 0.387098, e: 0.205635 + 5.59e-10 * d, M: rev(168.6562 + 4.0923344368 * d) }
    case 'Venus':
      return { N: 76.6799 + 2.4659e-5 * d, i: 3.3946 + 2.75e-8 * d, w: 54.891 + 1.38374e-5 * d,
               a: 0.72333, e: 0.006773 - 1.302e-9 * d, M: rev(48.0052 + 1.6021302244 * d) }
    case 'Mars':
      return { N: 49.5574 + 2.11081e-5 * d, i: 1.8497 - 1.78e-8 * d, w: 286.5016 + 2.92961e-5 * d,
               a: 1.523688, e: 0.093405 + 2.516e-9 * d, M: rev(18.6021 + 0.5240207766 * d) }
    case 'Jupiter':
      return { N: 100.4542 + 2.76854e-5 * d, i: 1.303 - 1.557e-7 * d, w: 273.8777 + 1.64505e-5 * d,
               a: 5.20256, e: 0.048498 + 4.469e-9 * d, M: rev(19.895 + 0.0830853001 * d) }
    case 'Saturn':
      return { N: 113.6634 + 2.3898e-5 * d, i: 2.4886 - 1.081e-7 * d, w: 339.3939 + 2.97661e-5 * d,
               a: 9.55475, e: 0.055546 - 9.499e-9 * d, M: rev(316.967 + 0.0334442282 * d) }
  }
}

/** Geocentric equatorial position of a planet. */
export function planetPosition(planet: PlanetName, at: Date): Equatorial {
  const d = dayNumber(at)
  const el = elementsFor(planet, d)
  const ecl = obliquity(d)

  // Heliocentric rectangular coordinates of the planet.
  const E = eccentricAnomaly(el.M, el.e)
  const xv = el.a * (cosd(E) - el.e)
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * sind(E)
  const v = atan2d(yv, xv)
  const r = Math.hypot(xv, yv)
  const l = v + el.w
  const xh = r * (cosd(el.N) * cosd(l) - sind(el.N) * sind(l) * cosd(el.i))
  const yh = r * (sind(el.N) * cosd(l) + cosd(el.N) * sind(l) * cosd(el.i))
  const zh = r * sind(l) * sind(el.i)

  // The Sun's rectangular coordinates (i.e. minus the Earth's).
  const { lon: slon } = sunLongitude(d)
  const se = 0.016709 - 1.151e-9 * d
  const sM = rev(356.047 + 0.9856002585 * d)
  const sE = sM + (180 / Math.PI) * se * sind(sM) * (1 + se * cosd(sM))
  const sxv = cosd(sE) - se
  const syv = Math.sqrt(1 - se * se) * sind(sE)
  const sr = Math.hypot(sxv, syv)
  const xs = sr * cosd(slon)
  const ys = sr * sind(slon)

  // Geocentric ecliptic, then equatorial.
  const xg = xh + xs
  const yg = yh + ys
  const zg = zh
  const xe = xg
  const ye = yg * cosd(ecl) - zg * sind(ecl)
  const ze = yg * sind(ecl) + zg * cosd(ecl)

  return { ra: rev(atan2d(ye, xe)), dec: atan2d(ze, Math.hypot(xe, ye)) }
}

/* ------------------------------------------------------------------------ */
/* Altitude                                                                  */
/* ------------------------------------------------------------------------ */

/** Altitude in degrees of an equatorial position, from a place, at a time. */
export function altitude(
  eq: Equatorial,
  at: Date,
  latitude: number,
  longitudeEast: number
): number {
  const ha = rev(localSiderealTime(at, longitudeEast) - eq.ra)
  return asind(
    sind(latitude) * sind(eq.dec) + cosd(latitude) * cosd(eq.dec) * cosd(ha)
  )
}

/* ------------------------------------------------------------------------ */
/* Deep-sky objects                                                          */
/* ------------------------------------------------------------------------ */

export interface DeepSkyObject {
  id: string
  name: string
  catalogue: string
  kind: 'nebula' | 'galaxy' | 'cluster'
  /** J2000 right ascension in degrees. */
  ra: number
  /** J2000 declination in degrees. */
  dec: number
  /** Approximate visual magnitude. */
  magnitude: number
  blurb: string
}

/**
 * A deliberately short catalogue: the objects genuinely worth showing someone
 * through a telescope on a night near Delhi, rather than an exhaustive list
 * most of which would disappoint at this sky brightness.
 */
export const DEEP_SKY: DeepSkyObject[] = [
  { id: 'm42', name: 'Orion Nebula', catalogue: 'M42', kind: 'nebula', ra: 83.82, dec: -5.39, magnitude: 4.0,
    blurb: 'A stellar nursery, and the finest nebula in the sky for a small telescope.' },
  { id: 'm31', name: 'Andromeda Galaxy', catalogue: 'M31', kind: 'galaxy', ra: 10.68, dec: 41.27, magnitude: 3.4,
    blurb: 'Our nearest large neighbour — two and a half million light years away.' },
  { id: 'm45', name: 'Pleiades', catalogue: 'M45', kind: 'cluster', ra: 56.75, dec: 24.12, magnitude: 1.6,
    blurb: 'A young open cluster, striking even to the naked eye.' },
  { id: 'm13', name: 'Hercules Cluster', catalogue: 'M13', kind: 'cluster', ra: 250.42, dec: 36.46, magnitude: 5.8,
    blurb: 'A globular cluster of several hundred thousand stars.' },
  { id: 'm57', name: 'Ring Nebula', catalogue: 'M57', kind: 'nebula', ra: 283.40, dec: 33.03, magnitude: 8.8,
    blurb: 'A dying star’s shell — a small, distinct smoke ring at the eyepiece.' },
  { id: 'm8', name: 'Lagoon Nebula', catalogue: 'M8', kind: 'nebula', ra: 270.92, dec: -24.38, magnitude: 6.0,
    blurb: 'A bright emission nebula in the direction of the galactic centre.' },
  { id: 'm7', name: 'Ptolemy Cluster', catalogue: 'M7', kind: 'cluster', ra: 268.46, dec: -34.79, magnitude: 3.3,
    blurb: 'A large, bright open cluster, best low in the southern sky.' },
  { id: 'm81', name: 'Bode’s Galaxy', catalogue: 'M81', kind: 'galaxy', ra: 148.89, dec: 69.07, magnitude: 6.9,
    blurb: 'A grand spiral galaxy high in the northern sky.' },
  { id: 'm44', name: 'Beehive Cluster', catalogue: 'M44', kind: 'cluster', ra: 130.10, dec: 19.67, magnitude: 3.7,
    blurb: 'A wide open cluster that fills a low-power eyepiece.' },
  { id: 'm27', name: 'Dumbbell Nebula', catalogue: 'M27', kind: 'nebula', ra: 299.90, dec: 22.72, magnitude: 7.4,
    blurb: 'The brightest planetary nebula — an obvious glowing box of light.' },
]

export function dsoAltitude(
  dso: DeepSkyObject,
  at: Date,
  latitude: number,
  longitudeEast: number
): number {
  return altitude({ ra: dso.ra, dec: dso.dec }, at, latitude, longitudeEast)
}
