'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'

import { skyOn, scoreNight } from '@/lib/sky-calendar'
import { NAKSHATRAALAY, isClosed } from '@/lib/nakshatraalay-data'
import { whatsappHref } from '@/lib/site-config'
import { MoonGlyph, PLANET_ICON, DSO_ICON } from '@/components/nakshatraalay/celestial-icons'

/**
 * The sky calendar.
 *
 * Pick a month, hover or tap a night, and see what is actually above the
 * horizon at 22:00 that night — moon phase and illumination, which planets are
 * up and how high, and which deep-sky objects are well placed.
 *
 * The ephemeris is pure arithmetic, so it runs in the browser: a month of
 * nights is a few thousand trig operations, which is far cheaper than
 * shipping the same data as props and makes month navigation instant.
 *
 * Everything shown is geometry. Cloud is not modelled and is never implied.
 */

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function longDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}

export default function SkyCalendarInteractive() {
  const today = useMemo(() => new Date(), [])
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate())

  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selected, setSelected] = useState<string>(todayIso)

  const { year, month } = cursor
  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })

  // Monday-first grid.
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (string | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => iso(year, month, i + 1)),
  ]

  // One pass of the ephemeris per month, memoised.
  const nights = useMemo(() => {
    const map = new Map<string, ReturnType<typeof scoreNight> & { closed: boolean }>()
    for (const date of cells) {
      if (!date) continue
      map.set(date, {
        ...scoreNight(new Date(`${date}T12:00:00Z`)),
        closed: isClosed(date),
      })
    }
    return map
  }, [year, month]) // eslint-disable-line react-hooks/exhaustive-deps

  const sky = useMemo(() => skyOn(selected), [selected])
  const selectedNight = nights.get(selected) ?? {
    ...scoreNight(new Date(`${selected}T12:00:00Z`)),
    closed: isClosed(selected),
  }

  const bandTone: Record<string, string> = {
    Excellent: 'text-emerald-300',
    Good: 'text-sky-300',
    Fair: 'text-amber-300',
    Bright: 'text-white/45',
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
      {/* ------------------------------------------------ calendar ---- */}
      <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-white">{monthLabel}</h3>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setCursor(({ year: y, month: m }) => (m === 0 ? { year: y - 1, month: 11 } : { year: y, month: m - 1 }))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setCursor(({ year: y, month: m }) => (m === 11 ? { year: y + 1, month: 0 } : { year: y, month: m + 1 }))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center sm:gap-1.5">
          {WEEKDAYS.map((w) => (
            <span key={w} className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
              {w}
            </span>
          ))}

          {cells.map((date, i) => {
            if (!date) return <span key={`e${i}`} />
            const night = nights.get(date)!
            const isSelected = date === selected
            const isPast = date < todayIso
            const day = Number(date.slice(-2))

            return (
              <button
                key={date}
                type="button"
                onMouseEnter={() => setSelected(date)}
                onFocus={() => setSelected(date)}
                onClick={() => setSelected(date)}
                aria-pressed={isSelected}
                aria-label={`${longDate(date)} — moon ${Math.round(night.moon.illumination * 100)}% lit, ${night.band} for dark sky`}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/12 scale-105'
                    : 'border-white/8 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.06]'
                } ${isPast ? 'opacity-35' : ''}`}
              >
                <MoonGlyph
                  illumination={night.moon.illumination}
                  waxing={night.moon.waxing}
                  size={20}
                />
                <span className={`mt-0.5 text-[11px] font-medium ${isSelected ? 'text-white' : 'text-white/60'}`}>
                  {day}
                </span>
                {night.closed && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-400" title="Fully booked" />
                )}
                {night.isWeekend && !night.closed && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--av-gold)]/70" />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[11px] text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)]/70" /> Weekend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Fully booked
          </span>
          <span>Hover a night to see its sky</span>
        </div>
      </div>

      {/* ------------------------------------------------ detail ------ */}
      <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
          {longDate(selected)}
        </p>

        {/* Moon */}
        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <MoonGlyph illumination={sky.moon.illumination} waxing={sky.moon.waxing} size={52} />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold capitalize text-white">
              {sky.moon.name}
            </p>
            <p className="text-sm text-white/55">
              {Math.round(sky.moon.illumination * 100)}% illuminated
            </p>
            <p className={`mt-0.5 text-xs font-medium ${bandTone[selectedNight.band]}`}>
              {selectedNight.band} for dark sky
            </p>
          </div>
        </div>

        {/* Planets */}
        <div className="mt-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Planets above the horizon
          </h4>
          {sky.planets.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {sky.planets.map((p) => {
                const Icon = PLANET_ICON[p.name as keyof typeof PLANET_ICON]
                return (
                  <li
                    key={p.name}
                    className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-3 transition hover:border-white/30"
                  >
                    {Icon && <Icon size={22} />}
                    <span className="text-sm text-white">{p.name}</span>
                    <span className="text-xs text-white/40">{Math.round(p.altitude)}°</span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/45">
              No bright planets are well placed at 10 pm — a good night to look further out.
            </p>
          )}
        </div>

        {/* Deep sky */}
        <div className="mt-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Deep sky, well placed
          </h4>
          {sky.dsos.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {sky.dsos.slice(0, 5).map((d) => {
                const Icon = DSO_ICON[d.kind]
                return (
                  <li
                    key={d.id}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-2.5 transition hover:border-white/25 hover:bg-white/[0.05]"
                  >
                    <span className="mt-0.5 shrink-0"><Icon size={26} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-white">{d.name}</span>
                        <span className="text-[10px] uppercase tracking-wide text-white/35">
                          {d.catalogue}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-white/45">
                        {d.blurb}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-white/35">{Math.round(d.altitude)}°</span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/45">Nothing from our list is high enough tonight.</p>
          )}
        </div>

        {/* Action */}
        <div className="mt-6 border-t border-white/10 pt-5">
          {selectedNight.closed ? (
            <p className="text-sm font-medium text-white/45">This night is fully booked.</p>
          ) : (
            <a
              href={whatsappHref(
                `Hello Astris Space — I'd like to come to ${NAKSHATRAALAY.name} on ${longDate(selected)} (${selected}). Is that night available?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              <MessageCircle size={15} /> Ask about this night
            </a>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-white/30">
            Positions are calculated for 10 pm at the property. What you actually see depends on
            cloud and haze on the night.
          </p>
        </div>
      </div>
    </div>
  )
}
