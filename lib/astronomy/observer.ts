/**
 * ============================================================================
 *  THE OBSERVER — WHO IS LOOKING, AND FROM WHERE
 * ============================================================================
 *
 *  Every calculation in this engine is topocentric: it answers "what can be
 *  seen from this point on the Earth's surface", not "where is this object in
 *  the solar system". Latitude, longitude and elevation are therefore inputs
 *  to everything, never assumptions.
 *
 *  India spans roughly 8°N to 35°N and 68°E to 97°E. That is enough spread
 *  that an object 20° above the horizon at Kanyakumari can be below it at Leh,
 *  so a single "visible from India" answer would be wrong about half the time.
 *
 *  LIGHT POLLUTION IS DELIBERATELY ABSENT.
 *  `bortle` exists in the type and is populated for nowhere, because we have
 *  no measured sky-brightness data for these sites. A plausible-looking number
 *  per city would be invention. The UI says "light pollution data unavailable"
 *  rather than guessing, and the field is here so real SQM data can be dropped
 *  in later without a schema change.
 * ============================================================================
 */

import { Observer } from 'astronomy-engine'

export interface SkyLocation {
  slug: string
  name: string
  /** Larger administrative area, for grouping and disambiguation. */
  region: string
  /** Degrees north, negative south. */
  latitude: number
  /** Degrees east, negative west. */
  longitude: number
  /** Metres above sea level. Affects rise/set times by a few seconds to a minute. */
  elevation: number
  /** IANA zone. All of India is Asia/Kolkata, but the field is explicit. */
  timeZone: string
  /** Measured sky brightness, when we have it. We do not. See header. */
  bortle?: number
  /** Why this site is of interest to an observer. */
  note?: string
}

/**
 * Observing locations across India.
 *
 * Coordinates and elevations are the published values for each place. The list
 * is a convenience, not a limit — any latitude/longitude can be supplied.
 */
export const LOCATIONS: SkyLocation[] = [
  // --- Himalaya & Ladakh: the darkest skies the country has ---------------
  { slug: 'hanle', name: 'Hanle', region: 'Ladakh', latitude: 32.7794, longitude: 78.9642, elevation: 4500, timeZone: 'Asia/Kolkata', note: 'India’s first Dark Sky Reserve, and the site of the Indian Astronomical Observatory.' },
  { slug: 'leh', name: 'Leh', region: 'Ladakh', latitude: 34.1526, longitude: 77.5771, elevation: 3500, timeZone: 'Asia/Kolkata', note: 'High, dry and thin-aired — the transparency is exceptional.' },
  { slug: 'kaza', name: 'Kaza', region: 'Himachal Pradesh', latitude: 32.2264, longitude: 78.0719, elevation: 3800, timeZone: 'Asia/Kolkata', note: 'The main settlement in Spiti, at high altitude with very little local lighting.' },
  { slug: 'kalpa', name: 'Kalpa', region: 'Himachal Pradesh', latitude: 31.5386, longitude: 78.2570, elevation: 2960, timeZone: 'Asia/Kolkata', note: 'Kinnaur, facing the Kinner Kailash range.' },
  { slug: 'manali', name: 'Manali', region: 'Himachal Pradesh', latitude: 32.2432, longitude: 77.1892, elevation: 2050, timeZone: 'Asia/Kolkata' },
  { slug: 'shimla', name: 'Shimla', region: 'Himachal Pradesh', latitude: 31.1048, longitude: 77.1734, elevation: 2276, timeZone: 'Asia/Kolkata' },
  { slug: 'nainital', name: 'Nainital', region: 'Uttarakhand', latitude: 29.3919, longitude: 79.4542, elevation: 2084, timeZone: 'Asia/Kolkata', note: 'Home to the Aryabhatta Research Institute’s observatory.' },
  { slug: 'dehradun', name: 'Dehradun', region: 'Uttarakhand', latitude: 30.3165, longitude: 78.0322, elevation: 640, timeZone: 'Asia/Kolkata' },
  { slug: 'rishikesh', name: 'Rishikesh', region: 'Uttarakhand', latitude: 30.0869, longitude: 78.2676, elevation: 372, timeZone: 'Asia/Kolkata' },
  { slug: 'darjeeling', name: 'Darjeeling', region: 'West Bengal', latitude: 27.0360, longitude: 88.2627, elevation: 2042, timeZone: 'Asia/Kolkata' },
  { slug: 'gangtok', name: 'Gangtok', region: 'Sikkim', latitude: 27.3314, longitude: 88.6138, elevation: 1650, timeZone: 'Asia/Kolkata' },

  // --- Delhi NCR and the Astris sites -------------------------------------
  { slug: 'delhi', name: 'Delhi', region: 'Delhi NCR', latitude: 28.6139, longitude: 77.2090, elevation: 216, timeZone: 'Asia/Kolkata', note: 'Heavily light-polluted, but the Moon and planets are unaffected by it.' },
  { slug: 'gurgaon', name: 'Gurgaon', region: 'Delhi NCR', latitude: 28.4595, longitude: 77.0266, elevation: 217, timeZone: 'Asia/Kolkata' },
  { slug: 'nakshatraalay-gurgaon', name: 'Nakshatraalay Gurgaon', region: 'Delhi NCR', latitude: 28.3114065, longitude: 77.0121846, elevation: 230, timeZone: 'Asia/Kolkata', note: 'Our own site, south of the city.' },
  { slug: 'sambhar-lake', name: 'Sambhar Lake', region: 'Rajasthan', latitude: 26.9080, longitude: 75.0850, elevation: 360, timeZone: 'Asia/Kolkata', note: 'Salt flats with an unobstructed horizon in every direction.' },
  { slug: 'tijara', name: 'Tijara', region: 'Rajasthan', latitude: 27.9290, longitude: 76.8560, elevation: 320, timeZone: 'Asia/Kolkata' },
  { slug: 'chandigarh', name: 'Chandigarh', region: 'Punjab & Haryana', latitude: 30.7333, longitude: 76.7794, elevation: 321, timeZone: 'Asia/Kolkata' },
  { slug: 'jaipur', name: 'Jaipur', region: 'Rajasthan', latitude: 26.9124, longitude: 75.7873, elevation: 431, timeZone: 'Asia/Kolkata' },
  { slug: 'jaisalmer', name: 'Jaisalmer', region: 'Rajasthan', latitude: 26.9157, longitude: 70.9083, elevation: 225, timeZone: 'Asia/Kolkata', note: 'Desert horizons and very dry air.' },
  { slug: 'udaipur', name: 'Udaipur', region: 'Rajasthan', latitude: 24.5854, longitude: 73.7125, elevation: 598, timeZone: 'Asia/Kolkata' },
  { slug: 'lucknow', name: 'Lucknow', region: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462, elevation: 123, timeZone: 'Asia/Kolkata' },

  // --- The rest of the country --------------------------------------------
  { slug: 'mumbai', name: 'Mumbai', region: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, elevation: 14, timeZone: 'Asia/Kolkata' },
  { slug: 'pune', name: 'Pune', region: 'Maharashtra', latitude: 18.5204, longitude: 73.8567, elevation: 560, timeZone: 'Asia/Kolkata' },
  { slug: 'ahmedabad', name: 'Ahmedabad', region: 'Gujarat', latitude: 23.0225, longitude: 72.5714, elevation: 53, timeZone: 'Asia/Kolkata' },
  { slug: 'goa', name: 'Goa', region: 'Goa', latitude: 15.2993, longitude: 74.1240, elevation: 7, timeZone: 'Asia/Kolkata' },
  { slug: 'bengaluru', name: 'Bengaluru', region: 'Karnataka', latitude: 12.9716, longitude: 77.5946, elevation: 920, timeZone: 'Asia/Kolkata' },
  { slug: 'coorg', name: 'Coorg', region: 'Karnataka', latitude: 12.3375, longitude: 75.8069, elevation: 1150, timeZone: 'Asia/Kolkata' },
  { slug: 'hyderabad', name: 'Hyderabad', region: 'Telangana', latitude: 17.3850, longitude: 78.4867, elevation: 542, timeZone: 'Asia/Kolkata' },
  { slug: 'chennai', name: 'Chennai', region: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, elevation: 6, timeZone: 'Asia/Kolkata' },
  { slug: 'ooty', name: 'Ooty', region: 'Tamil Nadu', latitude: 11.4102, longitude: 76.6950, elevation: 2240, timeZone: 'Asia/Kolkata', note: 'Near the Radio Astronomy Centre at Muthorai.' },
  { slug: 'munnar', name: 'Munnar', region: 'Kerala', latitude: 10.0889, longitude: 77.0595, elevation: 1600, timeZone: 'Asia/Kolkata' },
  { slug: 'kolkata', name: 'Kolkata', region: 'West Bengal', latitude: 22.5726, longitude: 88.3639, elevation: 9, timeZone: 'Asia/Kolkata' },
  { slug: 'guwahati', name: 'Guwahati', region: 'Assam', latitude: 26.1445, longitude: 91.7362, elevation: 55, timeZone: 'Asia/Kolkata' },
  { slug: 'shillong', name: 'Shillong', region: 'Meghalaya', latitude: 25.5788, longitude: 91.8933, elevation: 1496, timeZone: 'Asia/Kolkata' },
  { slug: 'port-blair', name: 'Port Blair', region: 'Andaman & Nicobar', latitude: 11.6234, longitude: 92.7265, elevation: 15, timeZone: 'Asia/Kolkata', note: 'India’s easternmost skies — the sun sets over an hour before it does in Gujarat, despite the shared clock.' },
]

export const DEFAULT_LOCATION_SLUG = 'nakshatraalay-gurgaon'

export function getLocation(slug: string): SkyLocation | undefined {
  return LOCATIONS.find((l) => l.slug === slug)
}

/** Grouped for the picker, in rough north-to-south order. */
export function locationsByRegion(): { region: string; locations: SkyLocation[] }[] {
  const order: string[] = []
  const map = new Map<string, SkyLocation[]>()
  for (const l of LOCATIONS) {
    if (!map.has(l.region)) { map.set(l.region, []); order.push(l.region) }
    map.get(l.region)!.push(l)
  }
  return order.map((region) => ({ region, locations: map.get(region)! }))
}

/**
 * A location supplied as raw coordinates rather than chosen from the list.
 * Validated before use — a NaN latitude silently becomes a wrong answer
 * everywhere downstream rather than an error.
 */
export function customLocation(input: {
  latitude: number
  longitude: number
  elevation?: number
  name?: string
}): SkyLocation | null {
  const { latitude, longitude } = input
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) return null
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) return null
  const elevation = Number.isFinite(input.elevation) ? Math.max(-500, Math.min(9000, input.elevation!)) : 0
  return {
    slug: 'custom',
    name: input.name?.trim() || `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`,
    region: 'Custom location',
    latitude,
    longitude,
    elevation,
    timeZone: 'Asia/Kolkata',
  }
}

/** The astronomy-engine observer for a location. */
export function observerFor(l: SkyLocation): Observer {
  return new Observer(l.latitude, l.longitude, l.elevation)
}

/**
 * Minimum altitude for an object to count as observable.
 *
 * Below roughly 10° you are looking through more than five air masses, into
 * whatever haze, dust and building line sits on the horizon. 10° is the
 * default rather than 0° because a mathematically-risen object that nobody
 * can actually see is a false positive.
 */
export const DEFAULT_MIN_ALTITUDE = 10
export const MIN_ALTITUDE_CHOICES = [5, 10, 15, 20, 30] as const
