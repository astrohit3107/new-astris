import { Telescope, Sparkles } from 'lucide-react'

import MoonGlyph from '@/components/stargazing-calendar/moon-glyph'
import { getLocation } from '@/lib/astronomy/observer'
import { saturdaysAt, SESSION_HOURS, type SaturdaySky as Sat } from '@/lib/astronomy/weekends'

/**
 * The next eight Saturdays at a site, with what is actually up during the
 * session — computed, not curated. Server-rendered; the page revalidates so
 * the list rolls forward on its own.
 */

const DARKNESS: Record<Sat['darkness'], { label: string; cls: string }> = {
  excellent: { label: 'Darkest skies', cls: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/30' },
  good: { label: 'Good skies', cls: 'bg-sky-400/15 text-sky-200 ring-sky-300/30' },
  moonlit: { label: 'Moonlit', cls: 'bg-white/10 text-white/70 ring-white/20' },
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })

export default function SaturdaySky({ locationSlug, bookAnchor = '#book' }: { locationSlug: string; bookAnchor?: string }) {
  const location = getLocation(locationSlug)
  if (!location) return null
  const nights = saturdaysAt(location, 8)

  return (
    <section id="saturday-sky" className="scroll-mt-20 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--av-gold)]">Every Saturday</p>
        <h2 className="font-display mt-3 text-balance text-3xl font-light text-white sm:text-4xl">
          What you will see, Saturday by Saturday
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          Calculated for {location.name} during the session — the first {SESSION_HOURS} hours of full darkness.
          The Moon decides most of it: around new moon the sky is dark enough for galaxies; around full
          moon it is the Moon itself, the planets and the bright clusters.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nights.map((n) => {
            const d = DARKNESS[n.darkness]
            return (
              <article key={n.date} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{fmt(n.date)}</p>
                    {n.sessionFrom && (
                      <p className="mt-0.5 text-[11px] text-white/40">Session {n.sessionFrom} – {n.sessionTo}</p>
                    )}
                  </div>
                  <MoonGlyph phaseAngle={n.moon.phaseAngle} size={34} title={`${n.moon.phaseName}, ${n.moon.illumination}% lit`} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${d.cls}`}>{d.label}</span>
                  <span className="text-[11px] text-white/45">
                    {n.moon.phaseName} · {n.moon.illumination}%
                    {n.moon.upDuringSession > 0 ? ` · up ${n.moon.upDuringSession}% of session` : ' · set before dark'}
                  </span>
                </div>

                <h3 className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  <Sparkles size={11} /> Planets
                </h3>
                {n.planets.length ? (
                  <ul className="mt-1.5 space-y-1">
                    {n.planets.map((p) => (
                      <li key={p.name} className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="text-white/85">
                          {p.name}
                          {p.telescopeOnly && <span className="ml-1.5 text-[10px] uppercase tracking-wide text-white/35">telescope</span>}
                        </span>
                        <span className="text-[11px] text-white/45">{p.maxAltitude}° {p.direction}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1.5 text-xs text-white/40">None well placed this evening.</p>
                )}

                <h3 className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  <Telescope size={11} /> Deep sky
                </h3>
                {n.deepSky.length ? (
                  <ul className="mt-1.5 space-y-1">
                    {n.deepSky.map((o) => (
                      <li key={o.catalogue} className="flex items-baseline justify-between gap-2 text-sm" title={o.detail}>
                        <span className="text-white/85">{o.name}</span>
                        <span className="text-[11px] text-white/45">{o.catalogue}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1.5 text-xs text-white/40">The Moon washes out the faint objects.</p>
                )}

                <a
                  href={`?saturday=${n.date}${bookAnchor}`}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-[var(--av-gold)]/60 hover:text-[var(--av-gold)]"
                >
                  Book this Saturday
                </a>
              </article>
            )
          })}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-white/35">
          Positions from the astronomy-engine ephemeris for {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E.
          Planets are listed above 10°, deep-sky objects above 25°. Weather is not forecast here — the sky
          on the night always has the final say.
        </p>
      </div>
    </section>
  )
}
