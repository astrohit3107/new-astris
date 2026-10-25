'use client'

import { useState } from 'react'
import { BANDS, CBSE_MAP, IB_MAP, SYLLABUS, YEAR_COLORS, type BandId } from '@/lib/astronomy-club-data'

/**
 * Scene 10 — It meets their own textbook.
 * Pick a club theme and a band; the matching NCERT chapter slides in. The
 * IB toggle swaps the chapter for the band's PYP / MYP / DP mapping. The full
 * table is always available below for anyone who wants to read it all.
 */
export default function Syllabus() {
  const [board, setBoard] = useState<'cbse' | 'ib'>('cbse')
  const [theme, setTheme] = useState(2) // The Moon and eclipses
  const [bandId, setBandId] = useState<BandId>('navigators')
  const band = BANDS.find((b) => b.id === bandId)!
  const row = CBSE_MAP[theme]
  const ib = IB_MAP[bandId]

  const pill = (on: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      on ? 'bg-[#0E1A3A] text-white' : 'text-[#3B4663] hover:text-[#0E1A3A]'
    }`

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Board" className="inline-flex self-start rounded-full border border-[#D5DCE6] bg-white p-1">
          <button type="button" aria-pressed={board === 'cbse'} onClick={() => setBoard('cbse')} className={pill(board === 'cbse')}>
            CBSE / NCERT
          </button>
          <button type="button" aria-pressed={board === 'ib'} onClick={() => setBoard('ib')} className={pill(board === 'ib')}>
            IB
          </button>
        </div>
        <div role="group" aria-label="Grade band" className="inline-flex flex-wrap self-start rounded-full border border-[#D5DCE6] bg-white p-1">
          {BANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={bandId === b.id}
              onClick={() => setBandId(b.id)}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                bandId === b.id ? 'text-[#0E1A3A]' : 'text-[#3B4663] hover:text-[#0E1A3A]'
              }`}
              style={bandId === b.id ? { background: b.color, color: b.id === 'navigators' ? '#fff' : '#0E1A3A' } : undefined}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Themes (CBSE) or programme (IB) */}
        {board === 'cbse' ? (
          <div className="lg:col-span-5">
            <p id="theme-label" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3B4663]">
              Club theme
            </p>
            <div role="group" aria-labelledby="theme-label" className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
              {CBSE_MAP.map((r, i) => (
                <button
                  key={r.theme}
                  type="button"
                  aria-pressed={theme === i}
                  onClick={() => setTheme(i)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                    theme === i
                      ? 'border-[#0E1A3A] bg-[#0E1A3A] text-white shadow-lg'
                      : 'border-[#D5DCE6] bg-white text-[#0E1A3A] hover:border-[#0E1A3A]/40'
                  }`}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: YEAR_COLORS[r.year], color: r.year === 'B' ? '#FFFFFF' : '#0E1A3A' }}
                    aria-label={`Year ${r.year}`}
                  >
                    {r.year}
                  </span>
                  {r.theme}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#0E1A3A] p-6 text-white lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5CC6D6]">{band.grades}</p>
            <p className="club-display mt-2 text-3xl font-bold">
              {band.name} · {ib.programme}
            </p>
            <p className="mt-3 text-white/70">
              The same weekly themes, mapped to the IB framework the school already teaches.
            </p>
          </div>
        )}

        {/* The chapter that slides in. */}
        <div className="lg:col-span-7">
          <div
            key={`${board}-${theme}-${bandId}`}
            className="club-slide-in h-full rounded-3xl border-l-[6px] bg-white p-6 shadow-xl ring-1 ring-[#D5DCE6] sm:p-8"
            style={{ borderLeftColor: band.color }}
            aria-live="polite"
          >
            {board === 'cbse' ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B7285]">
                  {band.name} ({band.grades}) · in their NCERT books
                </p>
                <p className="club-display mt-3 text-2xl font-bold leading-snug text-[#0E1A3A] sm:text-3xl">
                  {row[bandId]}
                </p>
                <p className="mt-5 text-sm text-[#3B4663]">
                  Club theme: <strong className="text-[#0E1A3A]">{row.theme}</strong> · taught in Year {row.year}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B7285]">
                  {band.name} · IB {ib.programme}
                </p>
                {ib.intro && <p className="mt-3 font-semibold text-[#0E1A3A]">{ib.intro}</p>}
                <ul className="mt-3 space-y-2">
                  {ib.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[#3B4663]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: band.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                {ib.after?.map((a) => (
                  <p key={a} className="mt-4 text-sm text-[#3B4663]">
                    {a}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <ul className="mt-8 space-y-1.5 text-sm text-[#3B4663]">
        {SYLLABUS.notes.map((n) => (
          <li key={n} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0B7285]" />
            {n}
          </li>
        ))}
      </ul>

      <details className="group mt-8 rounded-2xl bg-white ring-1 ring-[#D5DCE6]">
        <summary className="cursor-pointer list-none rounded-2xl px-5 py-4 text-sm font-semibold text-[#0E1A3A] [&::-webkit-details-marker]:hidden">
          <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
            ›
          </span>
          See the full CBSE / NCERT mapping (10 themes)
        </summary>
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <caption className="sr-only">Club themes mapped to NCERT chapters for each grade band</caption>
            <thead>
              <tr className="border-b border-[#D5DCE6] text-xs uppercase tracking-[0.12em] text-[#3B4663]">
                <th scope="col" className="py-2 pr-4">Theme</th>
                <th scope="col" className="py-2 pr-4">Explorers (4–6)</th>
                <th scope="col" className="py-2 pr-4">Navigators (7–9)</th>
                <th scope="col" className="py-2">Astronomers (10–12)</th>
              </tr>
            </thead>
            <tbody>
              {CBSE_MAP.map((r) => (
                <tr key={r.theme} className="border-b border-[#D5DCE6] align-top last:border-0">
                  <th scope="row" className="py-3 pr-4 font-semibold text-[#0E1A3A]">
                    {r.theme} ({r.year})
                  </th>
                  <td className="py-3 pr-4 text-[#3B4663]">{r.explorers}</td>
                  <td className="py-3 pr-4 text-[#3B4663]">{r.navigators}</td>
                  <td className="py-3 text-[#3B4663]">{r.astronomers}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-[#3B4663]">{SYLLABUS.editionNote}</p>
        </div>
      </details>
    </div>
  )
}
