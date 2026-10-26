'use client'

import { useRef, useState } from 'react'
import { BUILDS, CLUB_KIT_PDF, TAKE_HOME, YEAR_COLORS, type YearId } from '@/lib/astronomy-club-data'
import { TrackedLink, useScrollProgress } from './motion'
import { LogbookSample, TextbookSample } from './sample-pages'

/**
 * Scene 11 — What students take home.
 * A sample textbook page and a sample logbook page, rebuilt in HTML/SVG from
 * the proposal, turning gently in 3D as they scroll past; then the 18 builds,
 * filterable by cycle year.
 */

const FILTERS: ('all' | YearId)[] = ['all', 'A', 'B', 'C']

export default function TakeHome() {
  const pages = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<'all' | YearId>('all')
  useScrollProgress(
    pages,
    (p) => pages.current?.style.setProperty('--turn', String(1 - p)),
    { start: 1, end: 0.2 },
  )

  const builds = BUILDS.filter((b) => filter === 'all' || b.year === filter)

  return (
    <div>
      <div
        ref={pages}
        className="club-pages grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10"
        style={{ ['--turn' as string]: 0 }}
      >
        <div className="club-turn-l">
          <h3 className="text-2xl font-bold text-white">The textbook</h3>
          <p className="mt-2 max-w-md text-pretty text-white/75">
            {TAKE_HOME.textbookIntro} This is the real Navigators page for Session 7.
          </p>
          <div className="mt-6">
            <TextbookSample />
          </div>
        </div>
        <div className="club-turn-r">
          <h3 className="text-2xl font-bold text-white">The logbook</h3>
          <p className="mt-2 max-w-md text-pretty text-white/75">
            {TAKE_HOME.logbookIntro} A Sky-watch 1 sheet from the Navigators logbook, labelled as a sample.
          </p>
          <div className="mt-6">
            <LogbookSample />
          </div>
          <p className="mt-6 text-sm font-semibold text-white">Every logbook, every year:</p>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {TAKE_HOME.logbookCounts.map((c) => (
              <li key={c.label} className="rounded-xl bg-white/[0.06] p-2.5 text-center">
                <span className="club-display block text-2xl font-bold text-[#E8A33D]">{c.n}</span>
                <span className="text-[11px] leading-tight text-white/70">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------- builds */}
      <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="club-display text-3xl font-bold text-white">18 builds across the cycle</h3>
          <p className="mt-2 max-w-2xl text-pretty text-white/70">{TAKE_HOME.buildsNote}</p>
          <TrackedLink
            href={CLUB_KIT_PDF}
            download
            event="club_pdf_download"
            eventProps={{ doc: 'kit_guide', from: 'builds' }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#E8A33D] underline-offset-4 hover:underline"
          >
            Download the kit guide (PDF)
            <span aria-hidden="true">↓</span>
          </TrackedLink>
        </div>
        <div role="group" aria-label="Filter builds by year" className="inline-flex self-start rounded-full border border-white/15 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filter === f ? (f === 'B' ? 'text-white' : 'text-[#0E1A3A]') : 'text-white/70 hover:text-white'
              }`}
              style={filter === f ? { background: f === 'all' ? '#FFFFFF' : YEAR_COLORS[f] } : undefined}
            >
              {f === 'all' ? 'All' : `Year ${f}`}
            </button>
          ))}
        </div>
      </div>
      <ul
        className="club-scroller -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        aria-live="polite"
        tabIndex={0}
        aria-label="Builds"
      >
        {builds.map((b, i) => (
          <li
            key={b.name}
            className="club-slide-in w-[16rem] shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.05] p-5"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: YEAR_COLORS[b.year], color: b.year === 'B' ? '#FFFFFF' : '#0E1A3A' }}
            >
              Year {b.year}
            </span>
            <h4 className="mt-3 text-lg font-semibold leading-snug text-white">{b.name}</h4>
            <p className="mt-2 text-sm text-white/70">{b.shows}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">Also included</h3>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TAKE_HOME.included.map((x) => (
            <li key={x} className="flex gap-2.5 text-white/80">
              <span aria-hidden="true" className="text-[#E8A33D]">✦</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
