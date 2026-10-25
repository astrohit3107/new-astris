'use client'

import { useRef, useState } from 'react'
import { BUILDS, TAKE_HOME, YEAR_COLORS, type YearId } from '@/lib/astronomy-club-data'
import { useScrollProgress } from './motion'

/**
 * Scene 11 — What students take home.
 * A sample textbook page and a sample logbook page, rebuilt in HTML/SVG from
 * the proposal, turning gently in 3D as they scroll past; then the 18 builds,
 * filterable by cycle year.
 */

function MiniPhase({ lit, size = 22 }: { lit: number; size?: number }) {
  // lit: 0 new → 4 full → 8 new, waxing on the right.
  const r = size / 2
  const k = Math.cos((lit / 8) * 2 * Math.PI)
  const waxing = lit <= 4
  const rx = Math.abs(k) * r
  const sweepOuter = waxing ? 1 : 0
  const inner = k > 0 ? (waxing ? 0 : 1) : waxing ? 1 : 0
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 0.5} fill="#1C2A52" />
      {lit > 0 && lit < 8 && (
        <path
          d={`M${r} 0.5 A${r - 0.5} ${r - 0.5} 0 0 ${sweepOuter} ${r} ${size - 0.5} A${rx} ${r - 0.5} 0 0 ${inner} ${r} 0.5`}
          fill="#F6EBCB"
        />
      )}
    </svg>
  )
}

function Callout({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#E8A33D] text-[11px] font-bold text-[#0E1A3A] shadow"
    >
      {n}
    </span>
  )
}

function TextbookPage() {
  return (
    <article aria-label="Sample textbook page: Navigators, Year A, Session 7" className="relative rounded-2xl bg-white p-5 text-[#0E1A3A] shadow-2xl ring-1 ring-[#D5DCE6] sm:p-6">
      <div className="relative pl-4">
        <Callout n={1} />
        <p className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[#CFE9EF] px-2.5 py-1 text-[#075E6C]">Navigators · Year A</span>
          <span className="rounded-full bg-[#0E1A3A] px-2.5 py-1 text-white">Session 7</span>
        </p>
        <p className="club-display mt-3 text-2xl font-bold leading-tight">Why does the Moon change shape?</p>
      </div>
      <div className="relative mt-4 pl-4">
        <Callout n={2} />
        <p className="rounded-xl bg-[#FBEBD0] px-4 py-3 text-sm">
          <strong>Big idea:</strong> The Moon is always half lit by the Sun. What changes is how much of that lit
          half faces us.
        </p>
      </div>
      <div className="relative mt-4 pl-4">
        <Callout n={3} />
        <div className="flex items-center justify-between gap-1 rounded-xl bg-[#0E1A3A] px-3 py-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <MiniPhase key={i} lit={i} />
          ))}
        </div>
      </div>
      <div className="relative mt-4 grid grid-cols-2 gap-3 pl-4">
        <Callout n={4} />
        <div className="rounded-xl border border-dashed border-[#0B7285] p-3 text-xs">
          <p className="font-bold uppercase tracking-[0.12em] text-[#0B7285]">Try this tonight</p>
          <p className="mt-1">Sketch the Moon at the same time for 5 nights.</p>
        </div>
        <div className="rounded-xl bg-[#EAF5F8] p-3 text-xs">
          <p className="font-bold uppercase tracking-[0.12em] text-[#0B7285]">Words to know</p>
          <p className="mt-1">
            <strong>Waxing</strong>, <strong>gibbous</strong>
          </p>
        </div>
      </div>
      <div className="relative mt-4 border-t border-[#D5DCE6] pl-4 pt-3 text-xs">
        <Callout n={5} />
        <strong>In your class textbook:</strong> Science, light and shadows
      </div>
    </article>
  )
}

function LogbookPage() {
  const sky = [
    ['Clear', true],
    ['Hazy', false],
    ['Some clouds', false],
    ['City lights', true],
  ] as const
  return (
    <article aria-label="Sample logbook page: My Moon diary" className="relative rounded-2xl bg-[#FBFAF6] p-5 text-[#0E1A3A] shadow-2xl ring-1 ring-[#D5DCE6] sm:p-6">
      <p className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
        <span className="rounded-full bg-[#0E1A3A] px-2.5 py-1 text-white">Observation log · No. 3</span>
        <span className="normal-case tracking-normal text-[#3B4663]">Year A · Navigators</span>
      </p>
      <p className="club-display mt-3 text-2xl font-bold">My Moon diary</p>
      <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
        {[
          ['Observer', 'Sample page'],
          ['Time', '8:30 pm'],
          ['Looking', 'South-west'],
        ].map(([k, v]) => (
          <div key={k} className="border-b border-[#D5DCE6] pb-1">
            <dt className="font-semibold uppercase tracking-[0.1em] text-[#3B4663]">{k}</dt>
            <dd className="mt-0.5 font-semibold text-[#1F3A8A]">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3B4663]">Sky tonight</p>
      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        {sky.map(([label, on]) => (
          <li key={label} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border text-[9px] ${
                on ? 'border-[#0E1A3A] bg-[#0E1A3A] text-white' : 'border-[#3B4663]/50'
              }`}
            >
              {on ? '✓' : ''}
            </span>
            {label}
            <span className="sr-only">{on ? ' (ticked)' : ' (not ticked)'}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-end justify-between rounded-xl border border-[#D5DCE6] px-3 py-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="flex flex-col items-center gap-1 text-[10px] text-[#3B4663]">
            {n === 1 ? (
              <MiniPhase lit={2} size={28} />
            ) : (
              <span aria-hidden="true" className="h-7 w-7 rounded-full border border-dashed border-[#3B4663]/50" />
            )}
            Night {n}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3B4663]">What I noticed</p>
      <p className="border-b border-[#D5DCE6] pb-1 text-sm font-semibold text-[#1F3A8A]">
        A thin crescent, lit on the right, low over the trees.
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3B4663]">My prediction for night 5</p>
      <p className="h-5 border-b border-[#D5DCE6]" />
      <div className="mt-4 flex items-center gap-3">
        <p className="flex-1 rounded-xl border border-[#0B7285] px-3 py-2 text-xs">
          <span className="block font-bold uppercase tracking-[0.1em] text-[#0B7285]">Level skill practised</span>
          Sky Cadet: identifies Moon phases by eye
        </p>
        <p className="rotate-[-8deg] rounded-full border-2 border-dashed border-[#8A5A12] px-3 py-2 text-center text-[10px] font-bold uppercase leading-tight text-[#8A5A12]">
          Educator
          <br />
          stamp
        </p>
      </div>
    </article>
  )
}

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
        className="grid grid-cols-1 gap-10 [perspective:1400px] md:grid-cols-2 md:gap-8"
        style={{ ['--turn' as string]: 0 }}
      >
        <div>
          <div
            className="motion-reduce:!transform-none"
            style={{ transform: 'rotateY(calc(var(--turn) * 14deg)) rotateX(calc(var(--turn) * 6deg)) translateY(calc(var(--turn) * 30px))' }}
          >
            <TextbookPage />
          </div>
          <h3 className="mt-10 text-lg font-semibold text-white">The textbook</h3>
          <p className="mt-1.5 text-pretty text-white/70">{TAKE_HOME.textbookIntro}</p>
          <ol className="mt-3 grid grid-cols-1 gap-1 text-sm text-white/65 sm:grid-cols-2">
            {['Band and session tag', 'One big idea', 'Picture first', 'Something to do', 'Linked to class'].map((c, i) => (
              <li key={c}>
                <span className="mr-1.5 font-bold text-[#E8A33D]">{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div
            className="motion-reduce:!transform-none"
            style={{ transform: 'rotateY(calc(var(--turn) * -14deg)) rotateX(calc(var(--turn) * 6deg)) translateY(calc(var(--turn) * 50px))' }}
          >
            <LogbookPage />
          </div>
          <h3 className="mt-10 text-lg font-semibold text-white">The logbook</h3>
          <p className="mt-1.5 text-pretty text-white/70">{TAKE_HOME.logbookIntro}</p>
          <ul className="mt-3 space-y-1 text-sm text-white/65">
            {TAKE_HOME.logbookPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#5CC6D6]" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold text-white">Per year:</p>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {TAKE_HOME.logbookCounts.map((c) => (
              <li key={c.label} className="rounded-xl bg-white/[0.06] p-2.5 text-center">
                <span className="club-display block text-2xl font-bold text-[#E8A33D]">{c.n}</span>
                <span className="text-[11px] leading-tight text-white/65">{c.label}</span>
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
