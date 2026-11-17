/**
 * Bright deep-sky objects for small-telescope public observing, spread across
 * the year so that some are always well placed from Indian latitudes.
 *
 * Positions are J2000 (RA and Dec in degrees), from the Messier and NGC
 * catalogues. Precession since J2000 moves them by well under a degree —
 * irrelevant to whether something is 40° up or 10° up, which is the only
 * question asked of these numbers.
 */

export type DsoKind = 'nebula' | 'galaxy' | 'open cluster' | 'globular cluster' | 'planetary nebula'

export interface Dso {
  id: string
  name: string
  catalogue: string
  kind: DsoKind
  ra: number
  dec: number
  /** Integrated visual magnitude. Lower is brighter. */
  mag: number
  blurb: string
}

export const DSOS: Dso[] = [
  { id: 'm42', name: 'Orion Nebula', catalogue: 'M42', kind: 'nebula', ra: 83.82, dec: -5.39, mag: 4.0, blurb: 'A stellar nursery — the finest nebula in the sky for a small telescope.' },
  { id: 'm45', name: 'Pleiades', catalogue: 'M45', kind: 'open cluster', ra: 56.75, dec: 24.12, mag: 1.6, blurb: 'The Seven Sisters: a young, blue-white cluster, glorious in a wide view.' },
  { id: 'm31', name: 'Andromeda Galaxy', catalogue: 'M31', kind: 'galaxy', ra: 10.68, dec: 41.27, mag: 3.4, blurb: 'Our nearest large galaxy, 2.5 million light years away — visible to the naked eye from a dark site.' },
  { id: 'ngc869', name: 'Double Cluster', catalogue: 'NGC 869/884', kind: 'open cluster', ra: 35.0, dec: 57.13, mag: 4.3, blurb: 'Two rich star clusters side by side in Perseus.' },
  { id: 'm44', name: 'Beehive Cluster', catalogue: 'M44', kind: 'open cluster', ra: 130.1, dec: 19.67, mag: 3.7, blurb: 'A swarm of stars in Cancer, best at low magnification.' },
  { id: 'm41', name: 'M41', catalogue: 'M41', kind: 'open cluster', ra: 101.5, dec: -20.73, mag: 4.5, blurb: 'A bright cluster just south of Sirius, with an orange star at its heart.' },
  { id: 'm47', name: 'M47', catalogue: 'M47', kind: 'open cluster', ra: 114.15, dec: -14.49, mag: 4.4, blurb: 'A loose, bright cluster in Puppis.' },
  { id: 'm35', name: 'M35', catalogue: 'M35', kind: 'open cluster', ra: 92.23, dec: 24.33, mag: 5.3, blurb: 'A large cluster at the feet of Gemini.' },
  { id: 'm37', name: 'M37', catalogue: 'M37', kind: 'open cluster', ra: 88.08, dec: 32.55, mag: 5.6, blurb: 'The richest of the three Auriga clusters.' },
  { id: 'm81', name: 'Bode’s Galaxy', catalogue: 'M81', kind: 'galaxy', ra: 148.89, dec: 69.07, mag: 6.9, blurb: 'A bright spiral galaxy in Ursa Major.' },
  { id: 'm3', name: 'M3', catalogue: 'M3', kind: 'globular cluster', ra: 205.55, dec: 28.38, mag: 6.2, blurb: 'Half a million stars in a tight ball.' },
  { id: 'omegacen', name: 'Omega Centauri', catalogue: 'NGC 5139', kind: 'globular cluster', ra: 201.7, dec: -47.48, mag: 3.9, blurb: 'The largest globular cluster in the sky — low from India, but unforgettable.' },
  { id: 'm104', name: 'Sombrero Galaxy', catalogue: 'M104', kind: 'galaxy', ra: 190.0, dec: -11.62, mag: 8.0, blurb: 'An edge-on galaxy with a dark lane of dust.' },
  { id: 'm5', name: 'M5', catalogue: 'M5', kind: 'globular cluster', ra: 229.64, dec: 2.08, mag: 5.7, blurb: 'One of the oldest globular clusters known.' },
  { id: 'm4', name: 'M4', catalogue: 'M4', kind: 'globular cluster', ra: 245.9, dec: -26.53, mag: 5.6, blurb: 'A loose globular next to the red star Antares.' },
  { id: 'm13', name: 'Hercules Cluster', catalogue: 'M13', kind: 'globular cluster', ra: 250.42, dec: 36.46, mag: 5.8, blurb: 'The great globular cluster of the northern sky.' },
  { id: 'm92', name: 'M92', catalogue: 'M92', kind: 'globular cluster', ra: 259.28, dec: 43.14, mag: 6.4, blurb: 'M13’s often-overlooked neighbour in Hercules.' },
  { id: 'm6', name: 'Butterfly Cluster', catalogue: 'M6', kind: 'open cluster', ra: 265.08, dec: -32.25, mag: 4.2, blurb: 'A cluster shaped like a butterfly, in Scorpius.' },
  { id: 'm7', name: 'Ptolemy Cluster', catalogue: 'M7', kind: 'open cluster', ra: 268.47, dec: -34.79, mag: 3.3, blurb: 'Bright enough to have been recorded 2,000 years ago.' },
  { id: 'm8', name: 'Lagoon Nebula', catalogue: 'M8', kind: 'nebula', ra: 270.9, dec: -24.38, mag: 6.0, blurb: 'A glowing cloud in Sagittarius, crossed by a dark lane.' },
  { id: 'm22', name: 'M22', catalogue: 'M22', kind: 'globular cluster', ra: 279.1, dec: -23.9, mag: 5.1, blurb: 'One of the closest globular clusters to us.' },
  { id: 'm11', name: 'Wild Duck Cluster', catalogue: 'M11', kind: 'open cluster', ra: 282.77, dec: -6.27, mag: 5.8, blurb: 'A dense cluster said to look like a flight of ducks.' },
  { id: 'm57', name: 'Ring Nebula', catalogue: 'M57', kind: 'planetary nebula', ra: 283.4, dec: 33.03, mag: 8.8, blurb: 'The shell of a dying star, seen as a tiny smoke ring.' },
  { id: 'm27', name: 'Dumbbell Nebula', catalogue: 'M27', kind: 'planetary nebula', ra: 299.9, dec: 22.72, mag: 7.5, blurb: 'The brightest planetary nebula in the sky.' },
  { id: 'm15', name: 'M15', catalogue: 'M15', kind: 'globular cluster', ra: 322.49, dec: 12.17, mag: 6.2, blurb: 'A compact globular cluster in Pegasus.' },
  { id: 'm2', name: 'M2', catalogue: 'M2', kind: 'globular cluster', ra: 323.36, dec: -0.82, mag: 6.5, blurb: 'A rich globular cluster in Aquarius.' },
  { id: 'ngc457', name: 'Owl Cluster', catalogue: 'NGC 457', kind: 'open cluster', ra: 19.8, dec: 58.3, mag: 6.4, blurb: 'Two bright stars as eyes — it really does look like an owl.' },
  { id: 'm33', name: 'Triangulum Galaxy', catalogue: 'M33', kind: 'galaxy', ra: 23.46, dec: 30.66, mag: 5.7, blurb: 'A faint, face-on spiral — needs a genuinely dark, moonless sky.' },
]
