'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Loader2, X, Info } from 'lucide-react'

import { LOCATIONS, locationsByRegion, MIN_ALTITUDE_CHOICES } from '@/lib/astronomy/observer'
import MoonGlyph from './moon-glyph'

/* ---------------------------------------------------------------- types -- */

interface DayData {
  date: string
  moon: { phaseName: string; illumination: number; waxing: boolean; altitudeAtDarkest: number | null; rise: string | null; set: string | null; distanceKm: number }
  sun: { sunset: string | null; sunrise: string | null; darkFrom: string | null; darkTo: string | null; darknessMinutes: number | null }
  planets: { name: string; maxAltitude: number | null; direction: string | null; magnitude: number; telescopeOnly: boolean }[]
  events: {
    id: string; name: string; type: string; importance: string
    visibility: { state: string; detail: string }
    description: string; observingTips?: string
    separationDeg?: number; altitude?: number; direction?: string; peak: string; method: string
  }[]
  score: number
  verdict: string
  components: { label: string; points: number; outOf: number; detail: string }[]
  goodFor: string[]
  poorFor: string[]
}

interface SkyResponse {
  location: { slug: string; name: string; region: string; latitude: number; longitude: number; elevation: number; note?: string; lightPollution: unknown }
  month: string
  minAltitude: number
  days: DayData[]
}

/* -------------------------------------------------------------- helpers -- */

const IST = 'Asia/Kolkata'
const hhmm = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString('en-GB', { timeZone: IST, hour: '2-digit', minute: '2-digit' }) : '—'
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: IST })

/**
 * Event type → colour and symbol.
 *
 * Every entry carries a shape as well as a colour, because colour alone is
 * not an accessible encoding — a red dot and a green dot are the same dot to
 * a substantial minority of readers.
 */
const EVENT_STYLE: Record<string, { dot: string; label: string; glyph: string }> = {
  METEOR_SHOWER: { dot: 'bg-amber-400', label: 'Meteor shower', glyph: '✦' },
  ECLIPSE: { dot: 'bg-red-400', label: 'Eclipse', glyph: '◐' },
  CONJUNCTION: { dot: 'bg-violet-400', label: 'Conjunction', glyph: '◈' },
  OPPOSITION: { dot: 'bg-sky-400', label: 'Opposition', glyph: '◉' },
  MOON_PHASE: { dot: 'bg-slate-300', label: 'Moon phase', glyph: '○' },
  PLANETARY_EVENT: { dot: 'bg-emerald-400', label: 'Planetary', glyph: '◇' },
}

function scoreTone(score: number) {
  if (score >= 85) return 'text-emerald-300'
  if (score >= 70) return 'text-[var(--av-gold)]'
  if (score >= 55) return 'text-amber-200'
  return 'text-white/45'
}

/* ------------------------------------------------------------ component -- */

export default function StargazingCalendar({
  initialLocation,
  initialMonth,
}: {
  initialLocation: string
  initialMonth: string
}) {
  const [slug, setSlug] = useState(initialLocation)
  const [month, setMonth] = useState(initialMonth)
  const [minAltitude, setMinAltitude] = useState(10)
  const [data, setData] = useState<SkyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // Remember the location so a returning visitor is not asked twice.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('astris.sky.location')
      if (saved && LOCATIONS.some((l) => l.slug === saved)) setSlug(saved)
    } catch { /* private mode — fall back to the default */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('astris.sky.location', slug) } catch { /* ignore */ }
  }, [slug])

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/sky?location=${encodeURIComponent(slug)}&month=${month}&minAltitude=${minAltitude}`)
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Could not load the sky for this month.')
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [slug, month, minAltitude])

  useEffect(() => { load() }, [load])

  const byDate = useMemo(() => {
    const m = new Map<string, DayData>()
    for (const d of data?.days ?? []) m.set(d.date, d)
    return m
  }, [data])

  const today = todayIST()
  const tonight = byDate.get(today) ?? null
  const detail = selected ? byDate.get(selected) ?? null : null

  // Leading blanks so the 1st lands on the right weekday. Monday-first.
  const firstWeekday = useMemo(() => {
    const d = new Date(`${month}-01T00:00:00Z`)
    return (d.getUTCDay() + 6) % 7
  }, [month])

  const shiftMonth = (delta: number) => {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(Date.UTC(y, m - 1 + delta, 1))
    setMonth(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`)
  }

  const monthLabel = new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  })

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6">
      {/* ---- controls ---------------------------------------------------- */}
      <div className="flex flex-wrap items-end gap-4 border-b border-white/10 pb-6">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="sky-location" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/45">
            Observing from
          </label>
          <div className="relative">
            <MapPin size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <select
              id="sky-location"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.04] py-3 pl-9 pr-4 text-sm text-white outline-none transition focus:border-[var(--av-gold)]/60"
            >
              {locationsByRegion().map((g) => (
                <optgroup key={g.region} label={g.region}>
                  {g.locations.map((l) => (
                    <option key={l.slug} value={l.slug}>{l.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sky-minalt" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/45">
            Count as visible above
          </label>
          <select
            id="sky-minalt"
            value={minAltitude}
            onChange={(e) => setMinAltitude(Number(e.target.value))}
            className="appearance-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--av-gold)]/60"
          >
            {MIN_ALTITUDE_CHOICES.map((a) => <option key={a} value={a}>{a}° altitude</option>)}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={() => shiftMonth(-1)} aria-label="Previous month"
            className="rounded-lg border border-white/12 p-2.5 text-white/70 transition hover:border-white/30 hover:text-white">
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-[9.5rem] text-center text-sm font-semibold text-white">{monthLabel}</span>
          <button onClick={() => shiftMonth(1)} aria-label="Next month"
            className="rounded-lg border border-white/12 p-2.5 text-white/70 transition hover:border-white/30 hover:text-white">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ---- tonight ----------------------------------------------------- */}
      {tonight && (
        <section className="mt-8 rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-wrap items-start gap-6">
            <MoonGlyph phaseAngle={tonight.moon.waxing ? (tonight.moon.illumination / 100) * 180 : 360 - (tonight.moon.illumination / 100) * 180} size={72} />
            <div className="min-w-[12rem] flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
                Tonight at {data?.location.name}
              </p>
              <p className="font-display mt-2 text-2xl font-light text-white sm:text-3xl">{tonight.verdict}</p>
              <p className="mt-1.5 text-sm text-white/55">
                {tonight.moon.phaseName}, {tonight.moon.illumination}% lit ·{' '}
                {tonight.sun.darknessMinutes
                  ? `${Math.floor(tonight.sun.darknessMinutes / 60)}h ${tonight.sun.darknessMinutes % 60}m of darkness`
                  : 'no astronomical darkness'}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-display text-5xl font-light ${scoreTone(tonight.score)}`}>{tonight.score}</p>
              <p className="text-[11px] uppercase tracking-wider text-white/40">Sky score / 100</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Dark window" value={`${hhmm(tonight.sun.darkFrom)} – ${hhmm(tonight.sun.darkTo)}`} />
            <Stat label="Moonrise / set" value={`${hhmm(tonight.moon.rise)} / ${hhmm(tonight.moon.set)}`} />
            <Stat label="Planets up" value={tonight.planets.filter((p) => !p.telescopeOnly).map((p) => p.name).join(', ') || 'None'} />
          </div>
          <button
            onClick={() => setSelected(today)}
            className="mt-5 text-sm font-semibold text-[var(--av-gold)] hover:underline"
          >
            See tonight in full →
          </button>
        </section>
      )}

      {/* ---- calendar ---------------------------------------------------- */}
      <section className="mt-10" aria-label={`Sky calendar for ${monthLabel}`}>
        {error && (
          <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>
        )}
        {loading && !data && (
          <p className="flex items-center gap-2 py-16 text-sm text-white/50">
            <Loader2 size={16} className="animate-spin" /> Calculating the sky…
          </p>
        )}

        {data && (
          <>
            <div className="grid grid-cols-7 gap-1.5 text-center sm:gap-2">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
                <div key={d} className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">{d}</div>
              ))}
              {Array.from({ length: firstWeekday }).map((_, i) => <div key={`blank-${i}`} />)}

              {data.days.map((d) => {
                const isToday = d.date === today
                const major = d.events.filter((e) => e.importance === 'major')
                const angle = d.moon.waxing ? (d.moon.illumination / 100) * 180 : 360 - (d.moon.illumination / 100) * 180
                return (
                  <button
                    key={d.date}
                    onClick={() => setSelected(d.date)}
                    aria-label={`${d.date}: ${d.moon.phaseName}, ${d.moon.illumination}% lit, sky score ${d.score}${d.events.length ? `, ${d.events.length} events` : ''}`}
                    className={`group relative flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border p-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--av-gold)] sm:gap-1.5 sm:p-2 ${
                      isToday
                        ? 'border-[var(--av-gold)]/60 bg-[var(--av-gold)]/10'
                        : major.length
                          ? 'border-white/25 bg-white/[0.05] hover:border-white/40'
                          : 'border-white/8 hover:border-white/25 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="absolute left-1.5 top-1 text-[10px] font-medium text-white/40 sm:text-[11px]">
                      {Number(d.date.slice(8))}
                    </span>
                    <MoonGlyph phaseAngle={angle} size={26} className="mt-2 sm:mt-1" />
                    <span className={`text-[10px] font-semibold tabular-nums sm:text-xs ${scoreTone(d.score)}`}>{d.score}</span>
                    {d.events.length > 0 && (
                      <span className="absolute bottom-1 flex gap-0.5">
                        {d.events.slice(0, 4).map((e) => (
                          <span
                            key={e.id}
                            className={`h-1 w-1 rounded-full ${EVENT_STYLE[e.type]?.dot ?? 'bg-white/40'}`}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* legend — colour is never the only signal */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/45">
              {Object.entries(EVENT_STYLE).map(([k, v]) => (
                <li key={k} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${v.dot}`} aria-hidden="true" />
                  <span aria-hidden="true">{v.glyph}</span> {v.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/30">
              <Info size={12} className="mt-0.5 shrink-0" />
              Calculated for {data.location.name} ({data.location.latitude.toFixed(3)}°, {data.location.longitude.toFixed(3)}°,
              {' '}{data.location.elevation}m). Times are IST. Light pollution data unavailable, so the
              score describes the sky rather than the site.
            </p>
          </>
        )}
      </section>

      {/* ---- day detail --------------------------------------------------- */}
      {detail && <DayDetail day={detail} locationName={data!.location.name} onClose={() => setSelected(null)} />}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-1 text-sm font-medium text-white/85">{value}</p>
    </div>
  )
}

function DayDetail({ day, locationName, onClose }: { day: DayData; locationName: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const angle = day.moon.waxing ? (day.moon.illumination / 100) * 180 : 360 - (day.moon.illumination / 100) * 180
  const pretty = new Date(`${day.date}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Sky detail for ${pretty}`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/12 bg-[#0a0b11] p-6 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">{locationName}</p>
            <h3 className="font-display mt-1.5 text-2xl font-light text-white">{pretty}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg border border-white/12 p-2 text-white/60 transition hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <MoonGlyph phaseAngle={angle} size={64} />
          <div>
            <p className="text-lg font-semibold text-white">{day.moon.phaseName}</p>
            <p className="text-sm text-white/55">{day.moon.illumination}% illuminated · {day.moon.waxing ? 'waxing' : 'waning'}</p>
            <p className="mt-1 text-xs text-white/40">
              Rise {hhmm(day.moon.rise)} · Set {hhmm(day.moon.set)} · {day.moon.distanceKm.toLocaleString('en-IN')} km away
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className={`font-display text-4xl font-light ${scoreTone(day.score)}`}>{day.score}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35">/ 100</p>
          </div>
        </div>

        <h4 className="mt-7 text-[11px] font-semibold uppercase tracking-wider text-white/40">The night</h4>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <Stat label="Sunset → sunrise" value={`${hhmm(day.sun.sunset)} → ${hhmm(day.sun.sunrise)}`} />
          <Stat label="Astronomical darkness" value={day.sun.darkFrom ? `${hhmm(day.sun.darkFrom)} – ${hhmm(day.sun.darkTo)}` : 'None tonight'} />
        </div>

        {day.planets.length > 0 && (
          <>
            <h4 className="mt-7 text-[11px] font-semibold uppercase tracking-wider text-white/40">Planets up while it is dark</h4>
            <ul className="mt-2 space-y-1.5">
              {day.planets.map((p) => (
                <li key={p.name} className="flex items-baseline justify-between gap-3 rounded-lg border border-white/8 px-3.5 py-2.5 text-sm">
                  <span className="font-medium text-white/90">
                    {p.name}
                    {p.telescopeOnly && <span className="ml-2 text-[10px] uppercase tracking-wide text-white/35">telescope only</span>}
                  </span>
                  <span className="text-xs text-white/50">
                    {p.maxAltitude}° in the {p.direction} · mag {p.magnitude}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {day.events.length > 0 && (
          <>
            <h4 className="mt-7 text-[11px] font-semibold uppercase tracking-wider text-white/40">Events</h4>
            <div className="mt-2 space-y-3">
              {day.events.map((e) => (
                <article key={e.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${EVENT_STYLE[e.type]?.dot ?? 'bg-white/40'}`} aria-hidden="true" />
                    <h5 className="text-sm font-semibold text-white">{e.name}</h5>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-white/35">{hhmm(e.peak)} IST</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{e.description}</p>
                  <p className={`mt-2 text-xs ${
                    e.visibility.state === 'visible' ? 'text-emerald-300/85'
                    : e.visibility.state === 'partial' ? 'text-amber-200/85'
                    : e.visibility.state === 'not-visible' ? 'text-white/40'
                    : 'text-white/40'
                  }`}>
                    {e.visibility.detail}
                  </p>
                  {e.observingTips && <p className="mt-2 text-xs leading-relaxed text-white/40">{e.observingTips}</p>}
                </article>
              ))}
            </div>
          </>
        )}

        {(day.goodFor.length > 0 || day.poorFor.length > 0) && (
          <>
            <h4 className="mt-7 text-[11px] font-semibold uppercase tracking-wider text-white/40">What this night suits</h4>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {day.goodFor.length > 0 && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
                  <p className="text-xs font-semibold text-emerald-300">Good for</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-white/60">
                    {day.goodFor.map((g) => <li key={g}>{g}</li>)}
                  </ul>
                </div>
              )}
              {day.poorFor.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs font-semibold text-white/50">Poor for</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-white/45">
                    {day.poorFor.map((g) => <li key={g}>{g}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        <details className="mt-7 rounded-xl border border-white/8 p-4">
          <summary className="cursor-pointer text-xs font-semibold text-white/50">How these numbers were produced</summary>
          <ul className="mt-2.5 space-y-1.5 text-[11px] leading-relaxed text-white/40">
            {day.components.map((c) => (
              <li key={c.label}><span className="text-white/60">{c.label} {c.points}/{c.outOf}</span> — {c.detail}</li>
            ))}
            {day.events.map((e) => <li key={e.id}><span className="text-white/60">{e.name}</span> — {e.method}</li>)}
          </ul>
        </details>
      </div>
    </div>
  )
}
