'use client'

import { useState } from 'react'
import { SESSION_TYPES, YEAR_COLORS, YEAR_PLAN, planFor, type SessionType, type YearId } from '@/lib/astronomy-club-data'
import { Reveal, useInView } from './motion'

/**
 * Scene 9 — The year, April to February.
 * The 32-week equation, then a month strip that fills with one block per
 * session, coloured by session type, and the full week-by-week plan for the
 * chosen cycle year (Year A / B / C toggle).
 */

const YEARS: YearId[] = ['A', 'B', 'C']

export default function YearPlan() {
  const [year, setYear] = useState<YearId>('A')
  // Phones show the first eight weeks until asked for all 32.
  const [allWeeks, setAllWeeks] = useState(false)
  const [stripRef, stripIn] = useInView<HTMLDivElement>(0.25)
  const { title, weeks } = planFor(year)

  let w = 0
  const months = YEAR_PLAN.months.map((m) => {
    const list = weeks.slice(w, w + m.sessions)
    w += m.sessions
    return { ...m, list }
  })

  return (
    <div>
      {/* ------------------------------------------------------ equation */}
      <div
        className="flex flex-wrap items-end justify-center gap-x-3 gap-y-4 text-center sm:gap-x-5"
        role="img"
        aria-label="52 calendar weeks minus 12 breaks minus 6 exam weeks minus 2 buffer equals 32 club weeks"
      >
        {YEAR_PLAN.equation.map((t, i) => (
          <Reveal key={t.label} delay={i * 160} from="up" className="flex items-end gap-3 sm:gap-5">
            {i > 0 && <span className="club-display pb-6 text-3xl text-[#0E1A3A]/40 sm:text-4xl">−</span>}
            <span className="flex flex-col items-center">
              <span className="club-display text-5xl font-extrabold text-[#0E1A3A] sm:text-6xl">{t.value}</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#3B4663]">{t.label}</span>
            </span>
          </Reveal>
        ))}
        <Reveal delay={720} from="up" className="flex items-end gap-3 sm:gap-5">
          <span className="club-display pb-6 text-3xl text-[#0E1A3A]/40 sm:text-4xl">=</span>
          <span className="flex flex-col items-center">
            <span className="club-display text-6xl font-extrabold text-[#B9761C] sm:text-7xl">{YEAR_PLAN.result.value}</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0E1A3A]">
              {YEAR_PLAN.result.label}
            </span>
          </span>
        </Reveal>
      </div>

      {/* --------------------------------------------------- year toggle */}
      <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-[#3B4663]">
          Showing <strong className="text-[#0E1A3A]">Year {year} · {title}</strong>
        </p>
        <div role="group" aria-label="Choose a cycle year" className="inline-flex rounded-full border border-[#D5DCE6] bg-white p-1">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={year === y}
              onClick={() => setYear(y)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                year === y ? (y === 'B' ? 'text-white' : 'text-[#0E1A3A]') : 'text-[#3B4663] hover:text-[#0E1A3A]'
              }`}
              style={year === y ? { background: YEAR_COLORS[y] } : undefined}
            >
              Year {y}
            </button>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------- month strip */}
      <div ref={stripRef} className="mt-6 overflow-x-auto pb-2">
        <ol className="grid min-w-[44rem] grid-cols-12 gap-1.5">
          {months.map((m, mi) => (
            <li key={m.month} className="flex flex-col rounded-xl bg-white p-2 ring-1 ring-[#D5DCE6]">
              <span className="text-xs font-bold text-[#0E1A3A]">{m.month}</span>
              <span className="text-[11px] tabular-nums text-[#3B4663]">
                {m.sessions} {m.sessions === 1 ? 'session' : 'sessions'}
              </span>
              <span className="mt-2 flex min-h-[4.75rem] flex-col justify-end gap-1">
                {m.list.map((wk, i) => (
                  <span
                    key={wk.week}
                    title={`Week ${wk.week}: ${wk.title}`}
                    className="block h-4 rounded-[4px] transition-all duration-500 motion-reduce:transition-none"
                    style={{
                      background: SESSION_TYPES[wk.type].color,
                      boxShadow: wk.type === 'quiz' ? 'inset 0 0 0 1px #0E1A3A55' : undefined,
                      opacity: stripIn ? 1 : 0,
                      transform: stripIn ? 'none' : 'translateY(-8px)',
                      transitionDelay: `${(mi * 4 + i) * 35}ms`,
                    }}
                  />
                ))}
              </span>
              <span className="mt-2 text-[10.5px] leading-tight text-[#3B4663]">{m.note}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ------------------------------------------------------- legend */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-[#0E1A3A]">The session mix · {YEAR_PLAN.mixNote}</p>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(SESSION_TYPES) as SessionType[]).map((k) => {
            const t = SESSION_TYPES[k]
            return (
              <li key={k} className="flex gap-2.5 text-sm text-[#3B4663]">
                <span
                  aria-hidden="true"
                  className="mt-1 h-3 w-3 shrink-0 rounded-[3px]"
                  style={{ background: t.color, boxShadow: k === 'quiz' ? 'inset 0 0 0 1px #0E1A3A55' : undefined }}
                />
                <span>
                  <strong className="text-[#0E1A3A]">
                    {t.label} ×{t.count}
                  </strong>
                  {t.detail && <span> ({t.detail})</span>}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ------------------------------------------------ week-by-week */}
      <h3 className="club-display mt-14 text-2xl font-bold text-[#0E1A3A]">
        Year {year} week by week: {title}
      </h3>
      <ol className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {weeks.map((wk) => (
          <li
            key={`${year}-${wk.week}`}
            className={`gap-3 rounded-xl bg-white p-3 ring-1 ring-[#D5DCE6] ${wk.week > 8 && !allWeeks ? 'hidden sm:flex' : 'flex'}`}
            style={{ borderLeft: `4px solid ${SESSION_TYPES[wk.type].color === '#F4F1EA' ? '#0E1A3A' : SESSION_TYPES[wk.type].color}` }}
          >
            <span className="club-display w-7 shrink-0 text-lg font-bold tabular-nums text-[#0E1A3A]">{wk.week}</span>
            <span className="text-sm leading-snug text-[#3B4663]">
              {wk.title}
              <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-[#3B4663]/80">
                {wk.month} · {SESSION_TYPES[wk.type].one}
              </span>
            </span>
          </li>
        ))}
      </ol>
      {!allWeeks && (
        <button
          type="button"
          onClick={() => setAllWeeks(true)}
          className="mt-4 w-full rounded-full border border-[#0E1A3A]/25 px-5 py-3 text-sm font-semibold text-[#0E1A3A] sm:hidden"
        >
          Show all 32 weeks
        </button>
      )}
    </div>
  )
}
