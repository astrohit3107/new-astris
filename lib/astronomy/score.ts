/**
 * ============================================================================
 *  SKY SCORE — HOW GOOD IS THIS NIGHT, ASTRONOMICALLY?
 * ============================================================================
 *
 *  A single 0-100 number, built only from quantities this engine actually
 *  computes. It deliberately contains NO weather: cloud is the thing most
 *  likely to ruin a night, and we have no forecast for it. Mixing an
 *  unmeasured factor into a measured score would make the whole number
 *  dishonest, so weather is reported separately when it exists at all.
 *
 *  THE COMPONENTS, and why each is weighted as it is:
 *
 *    Moon interference   45 pts  The dominant natural factor. A full Moon
 *                                high in the sky erases everything faint;
 *                                a new Moon costs nothing. Weighted by the
 *                                Moon's altitude, because a bright Moon that
 *                                has set does not matter.
 *    Darkness duration   25 pts  How long true astronomical night lasts.
 *                                Nine hours in December is worth far more
 *                                than under seven in June.
 *    Planets up          15 pts  Planets are immune to both moonlight and
 *                                light pollution, so they rescue bad nights.
 *    Events              15 pts  A shower peak or eclipse makes a night
 *                                worth going out for on its own.
 *
 *  The score describes the SKY, not the site: it says nothing about local
 *  light pollution, for which we have no data.
 * ============================================================================
 */

import type { NightReport } from './night'
import type { SkyEvent } from './events'

export interface SkyScore {
  score: number
  verdict: string
  components: { label: string; points: number; outOf: number; detail: string }[]
  goodFor: string[]
  poorFor: string[]
}

export function scoreNight(night: NightReport, events: SkyEvent[]): SkyScore {
  const components: SkyScore['components'] = []

  /* --- Moon, 45 --------------------------------------------------------- */
  const illum = night.moon.illumination
  const moonAlt = night.moon.altitudeAtDarkest
  // A Moon below the horizon during darkness costs nothing, however full.
  const moonUp = moonAlt !== null && moonAlt > 0
  const interference = moonUp ? (illum / 100) * Math.min(1, Math.sin((moonAlt * Math.PI) / 180) + 0.3) : 0
  const moonPoints = Math.round(45 * (1 - interference))
  components.push({
    label: 'Moon',
    points: moonPoints,
    outOf: 45,
    detail: moonUp
      ? `${illum.toFixed(0)}% lit and ${moonAlt!.toFixed(0)}° up at the darkest point.`
      : illum < 5
        ? 'New Moon — no interference at all.'
        : `${illum.toFixed(0)}% lit, but below the horizon while it is dark.`,
  })

  /* --- Darkness, 25 ----------------------------------------------------- */
  const mins = night.twilight.darknessMinutes ?? 0
  // 0 pts at 4h or less, full marks at 10h — the realistic range for India.
  const darkPoints = Math.round(25 * Math.max(0, Math.min(1, (mins - 240) / 360)))
  components.push({
    label: 'Darkness',
    points: darkPoints,
    outOf: 25,
    detail: mins ? `${Math.floor(mins / 60)}h ${mins % 60}m of true astronomical darkness.` : 'No astronomical darkness tonight.',
  })

  /* --- Planets, 15 ------------------------------------------------------ */
  const nakedEye = night.planets.filter((p) => p.visible && !p.telescopeOnly)
  const planetPoints = Math.min(15, nakedEye.length * 4)
  components.push({
    label: 'Planets',
    points: planetPoints,
    outOf: 15,
    detail: nakedEye.length
      ? `${nakedEye.map((p) => p.name).join(', ')} above ${night.minAltitude}°.`
      : 'No naked-eye planets well placed.',
  })

  /* --- Events, 15 ------------------------------------------------------- */
  const worthwhile = events.filter((e) => e.visibility.state === 'visible' || e.visibility.state === 'partial')
  const major = worthwhile.some((e) => e.importance === 'major')
  const eventPoints = major ? 15 : worthwhile.length ? 8 : 0
  components.push({
    label: 'Events',
    points: eventPoints,
    outOf: 15,
    detail: worthwhile.length ? worthwhile.map((e) => e.name).join(', ') : 'Nothing specific — an ordinary sky.',
  })

  const score = components.reduce((s, c) => s + c.points, 0)

  const verdict =
    score >= 85 ? 'Outstanding — go out.'
    : score >= 70 ? 'Very good night for observing.'
    : score >= 55 ? 'Decent, with some compromise.'
    : score >= 40 ? 'Workable for the Moon and planets.'
    : 'Poor for anything faint.'

  /* --- What it is actually good for ------------------------------------- */
  const goodFor: string[] = []
  const poorFor: string[] = []

  if (interference < 0.15 && mins > 300) {
    goodFor.push('Galaxies and faint nebulae', 'The Milky Way', 'Wide-field astrophotography')
  } else if (interference < 0.4) {
    goodFor.push('Star clusters', 'Brighter nebulae', 'Double stars')
  }
  if (illum > 25 && moonUp) {
    goodFor.push('Lunar craters along the terminator')
    poorFor.push('Galaxies and faint nebulae')
  }
  if (illum > 70 && moonUp) poorFor.push('The Milky Way', 'Deep-sky astrophotography')
  if (nakedEye.length) goodFor.push(`Planets — ${nakedEye.map((p) => p.name).join(', ')}`)
  if (mins < 300) poorFor.push('Long imaging runs — the dark window is short')

  return { score, verdict, components, goodFor, poorFor }
}
