'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { prefersReducedMotion, useInView } from './motion'
import { TB07_DIAGRAM } from './textbook-diagram'

/**
 * Scene 11's centrepiece: one real textbook page and one real logbook sheet,
 * rebuilt from the club's book designs (Year A · Navigators: Session 7, and
 * Sky-watch 1). Each page is laid out at true A4 size (794 × 1123 CSS px) and
 * scaled to fit, so it reads exactly like the printed page.
 *
 * Five numbered callouts explain the anatomy. When a page scrolls into view
 * the callouts light up one by one; afterwards hovering, focusing or tapping
 * a callout (on the page or in the legend) highlights its part of the page.
 */

const W = 794
const H = 1123

export interface Callout {
  title: string
  body: string
}

export const TEXTBOOK_CALLOUTS: Callout[] = [
  { title: 'Band and session tag', body: 'Every page shows who it is for and when it is used.' },
  { title: 'One big idea', body: 'The whole page builds to a single sentence the student can repeat.' },
  { title: 'Picture first', body: 'A diagram does the explaining; text only supports it.' },
  { title: 'Something to do', body: 'Each page ends with a short activity that leads into the logbook.' },
  { title: 'Linked to class', body: 'The footer names the school textbook chapter it supports.' },
]

export const LOGBOOK_CALLOUTS: Callout[] = [
  { title: 'Real observing habits', body: 'Date, time, place and direction, just as working astronomers log them.' },
  { title: 'Sky conditions', body: 'Members learn how haze and city lights change what they can see.' },
  { title: 'Draw, don’t just write', body: 'Sketching trains the eye before any camera is used.' },
  { title: 'Notice, then predict', body: 'Every sheet asks for a prediction they can test next time.' },
  { title: 'Counts towards levels', body: 'Each sheet maps to a level skill and is stamped by the educator.' },
]

/* ------------------------------------------------------------ mechanics */

/** Steps through the callouts once when the page first comes into view. */
function useCalloutTour(count: number) {
  const [ref, inView] = useInView<HTMLDivElement>(0.35)
  const [step, setStep] = useState(0) // how many markers are lit
  const [active, setActive] = useState(0) // which one is highlighted, 0 = none
  // Once someone picks a callout, the automatic tour stops steering.
  const touched = useRef(false)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setStep(count)
      return
    }
    let i = 0
    const t = setInterval(() => {
      i += 1
      if (i > count) {
        clearInterval(t)
        if (!touched.current) setActive(0)
        return
      }
      if (touched.current) {
        clearInterval(t)
        return
      }
      setStep(i)
      setActive(i)
    }, 1300)
    return () => clearInterval(t)
  }, [inView, count])

  const pick = (n: number) => {
    touched.current = true
    setStep(count)
    setActive(n)
  }
  return { ref, step, active, pick }
}

/** Lays out its child at A4 size and scales it to the container's width. */
function ScaledPage({ children, label }: { children: ReactNode; label: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }} aria-label={label} role="group">
      <div className="club-page-3d absolute inset-0">
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[18px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/** One annotated part of a page: a numbered marker and a highlight ring. */
function Part({
  n,
  tour,
  children,
  className = '',
  markerTop = 0,
}: {
  n: number
  tour: ReturnType<typeof useCalloutTour>
  children: ReactNode
  className?: string
  markerTop?: number
}) {
  const lit = tour.step >= n
  const on = tour.active === n
  return (
    <div
      className={`relative rounded-[12px] transition-[box-shadow,background-color] duration-500 ${className}`}
      style={{
        boxShadow: on ? '0 0 0 4px #FFFFFF, 0 0 0 8px #E8A33D, 0 0 40px 10px rgba(232,163,61,0.35)' : '0 0 0 0 transparent',
      }}
      onMouseEnter={() => tour.pick(n)}
    >
      <button
        type="button"
        onClick={() => tour.pick(n)}
        onFocus={() => tour.pick(n)}
        aria-label={`Callout ${n}`}
        className="absolute -left-[46px] z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#E8A33D] text-[15px] font-bold text-[#0E1A3A] shadow-[0_0_0_4px_#FFFFFF] transition-all duration-500"
        style={{
          top: markerTop,
          opacity: lit ? 1 : 0,
          transform: `scale(${on ? 1.25 : lit ? 1 : 0.4})`,
        }}
      >
        {n}
      </button>
      {children}
    </div>
  )
}

function Legend({ items, tour }: { items: Callout[]; tour: ReturnType<typeof useCalloutTour> }) {
  return (
    <ol className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((c, i) => {
        const n = i + 1
        const on = tour.active === n
        return (
          <li key={c.title}>
            <button
              type="button"
              aria-pressed={on}
              onMouseEnter={() => tour.pick(n)}
              onFocus={() => tour.pick(n)}
              onClick={() => tour.pick(n)}
              className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition-colors duration-300 ${
                on ? 'border-[#E8A33D] bg-[#E8A33D]/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  on ? 'bg-[#E8A33D] text-[#0E1A3A]' : 'bg-white/10 text-white'
                }`}
              >
                {n}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{c.title}</span>
                <span className="mt-0.5 block text-sm text-white/70">{c.body}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/* -------------------------------------------------------- shared pieces */

const ink = '#0E1A3A'
const body = '#3B4663'
const muted = '#5A6580'

function PageHeader({ kind }: { kind: 'Textbook' | 'Logbook' }) {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{ left: 56, right: 56, top: 48, paddingBottom: 12, borderBottom: '1px solid #D5DCE6' }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        <img src="/brand/astris-logo-navy.png" alt="" width={36} height={24} style={{ width: 36, height: 24, objectFit: 'contain' }} />
        <span className="club-display" style={{ fontWeight: 700, fontSize: 15, color: ink, letterSpacing: 0 }}>
          Astris Astronomy Club
        </span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: muted, letterSpacing: '0.04em' }}>{kind} · Year A · Navigators</span>
    </div>
  )
}

function PageFooter({ left, page }: { left: ReactNode; page: number }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ paddingTop: 10, borderTop: '1px solid #D5DCE6', fontSize: 12, color: muted }}
    >
      <span>{left}</span>
      <span className="flex items-center" style={{ gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8A33D' }} />
        <span style={{ fontWeight: 700, color: ink }}>{page}</span>
      </span>
    </div>
  )
}

const label = { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: muted }
const hand = { color: '#1F3A8A', fontWeight: 600, fontSize: 14 }
const box = (on = false) => (
  <span
    style={{
      width: 13,
      height: 13,
      border: `1.5px solid ${on ? ink : muted}`,
      background: on ? ink : 'transparent',
      borderRadius: 3,
      color: '#fff',
      fontSize: 10,
      lineHeight: '11px',
      textAlign: 'center' as const,
      display: 'inline-block',
      flex: 'none',
    }}
  >
    {on ? '✓' : ''}
  </span>
)

/* ------------------------------------------------------------- textbook */

export function TextbookSample() {
  const tour = useCalloutTour(TEXTBOOK_CALLOUTS.length)
  return (
    <div ref={tour.ref}>
      <ScaledPage label="Sample textbook page: Navigators, Year A, Session 7, Why does the Moon change shape?">
        <div className="relative h-full w-full bg-white" style={{ color: body, fontFamily: 'var(--font-instrument), sans-serif' }}>
          <PageHeader kind="Textbook" />
          <div className="absolute flex flex-col" style={{ left: 56, right: 56, top: 108, bottom: 48, gap: 18 }}>
            <Part n={1} tour={tour} className="-m-2 p-2" markerTop={14}>
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: '#CFE9EF', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: ink }}>
                  Navigators · Year A
                </span>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: ink, fontSize: 11, fontWeight: 700, color: '#fff' }}>Session 7</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#075E6C' }}>
                  Concept · The Moon and its phases
                </span>
              </div>
              <p className="club-display" style={{ margin: '18px 0 0', fontWeight: 800, fontSize: 36, lineHeight: 1.08, color: ink }}>
                Why does the Moon change shape?
              </p>
            </Part>
            <Part n={2} tour={tour} markerTop={10}>
              <div style={{ background: '#FCEBD0', borderRadius: 10, padding: '11px 14px', fontSize: 14, lineHeight: 1.45, color: ink }}>
                <strong>Big idea:</strong> The Moon is always half lit by the Sun. What changes is how much of that lit half faces us.
              </div>
            </Part>
            <Part n={3} tour={tour} markerTop={120}>
              <div style={{ borderRadius: 10, overflow: 'hidden', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: TB07_DIAGRAM }} />
            </Part>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
              The Moon makes no light of its own. Sunlight always lights the half of the Moon that faces the Sun. As the Moon travels round
              Earth, we see more of that sunlit half, then less. At position 1 the Moon sits between us and the Sun, so its dark side faces us:
              a New Moon. At position 5 it is opposite the Sun, and we see the whole lit face: a Full Moon. One full cycle of phases takes
              about 29.5 days. Because the Moon keeps moving along its orbit, it rises on average about 50 minutes later each day.
            </p>
            <Part n={4} tour={tour} markerTop={30}>
              <div className="flex" style={{ gap: 12 }}>
                <div className="flex flex-col" style={{ flex: 1.25, border: '1.5px dashed #0B7285', borderRadius: 10, padding: '11px 13px', gap: 4 }}>
                  <span style={{ ...label, color: '#075E6C' }}>Try this tonight</span>
                  <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                    Sketch the Moon at the same time on 5 nights in the Moon diary row of your Try-this notes. Note the time it rises if you can.
                    Is the lit side growing or shrinking? Predict night 6.
                  </span>
                </div>
                <div className="flex flex-col" style={{ flex: 1, background: '#EAF5F8', borderRadius: 10, padding: '11px 13px', gap: 4 }}>
                  <span style={{ ...label, color: '#075E6C' }}>Words to know</span>
                  <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                    <strong>Waxing</strong>: the lit part is growing
                    <br />
                    <strong>Waning</strong>: the lit part is shrinking
                    <br />
                    <strong>Gibbous</strong>: more than half lit
                  </span>
                </div>
              </div>
            </Part>
            <div className="mt-auto">
              <Part n={5} tour={tour} markerTop={8}>
                <PageFooter
                  page={7}
                  left={
                    <>
                      <strong style={{ color: ink }}>In your class textbook:</strong> Science, light and shadows; eclipses and the Earth–Moon–Sun
                      system
                    </>
                  }
                />
              </Part>
            </div>
          </div>
        </div>
      </ScaledPage>
      <Legend items={TEXTBOOK_CALLOUTS} tour={tour} />
    </div>
  )
}

/* -------------------------------------------------------------- logbook */

export function LogbookSample() {
  const tour = useCalloutTour(LOGBOOK_CALLOUTS.length)
  const line = <div style={{ height: 24, borderBottom: '1px solid #D5DCE6' }} />
  const field = (name: string, flex: number, value = '') => (
    <div className="flex flex-col" style={{ flex, gap: 2 }}>
      <span style={label}>{name}</span>
      <div style={{ height: 22, borderBottom: '1px solid #B9C3D3', ...hand }}>{value}</div>
    </div>
  )
  const small = (name: string, value = '') => (
    <div className="flex flex-col" style={{ flex: 1, border: '1px solid #D5DCE6', borderRadius: 8, padding: '6px 8px', background: '#fff', gap: 2 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: muted }}>{name}</span>
      <div style={{ height: 22, ...hand }}>{value}</div>
    </div>
  )
  const features: [string, boolean][] = [
    ['Mare Tranquillitatis, the Sea of Tranquillity', true],
    ['Mare Imbrium, the Sea of Showers', false],
    ['Crater Copernicus', false],
    ['Crater Tycho and its rays', true],
    ['Crater Plato', false],
    ['The Apennine mountains', false],
  ]
  return (
    <div ref={tour.ref}>
      <ScaledPage label="Sample logbook sheet: Sky-watch 1, Moon craters and mountains">
        <div className="relative h-full w-full" style={{ background: '#FBFAF6', color: body, fontFamily: 'var(--font-instrument), sans-serif' }}>
          <PageHeader kind="Logbook" />
          <div className="absolute flex flex-col" style={{ left: 56, right: 56, top: 104, bottom: 48, gap: 14 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ padding: '3px 9px', borderRadius: 999, background: ink, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>
                  Sky-watch 1
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: muted }}>Session 20 · October · with families</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: muted }}>Year A · Navigators</span>
            </div>
            <p className="club-display" style={{ margin: 0, fontWeight: 800, fontSize: 28, lineHeight: 1.1, color: ink }}>
              Moon craters and mountains
            </p>
            <Part n={1} tour={tour} className="-m-2 p-2" markerTop={12}>
              <div className="flex" style={{ gap: 12 }}>
                {field('Observer', 1.4, 'Sample page')}
                {field('Date', 1)}
                {field('Time (IST)', 0.8)}
                {field('Place', 1.4)}
              </div>
            </Part>
            <Part n={2} tour={tour} className="-m-2 p-2" markerTop={4}>
              <div className="flex items-center" style={{ gap: 14 }}>
                <span style={label}>Sky tonight</span>
                {(
                  [
                    ['Clear', true],
                    ['Hazy', false],
                    ['Some clouds', false],
                    ['City lights', true],
                  ] as [string, boolean][]
                ).map(([t, on]) => (
                  <span key={t} className="inline-flex items-center" style={{ gap: 5, fontSize: 12 }}>
                    {box(on)}
                    {t}
                    <span className="sr-only">{on ? ' (ticked)' : ''}</span>
                  </span>
                ))}
              </div>
            </Part>
            <div className="flex items-start" style={{ gap: 18 }}>
              <Part n={3} tour={tour} markerTop={150}>
                <div className="flex flex-col items-center" style={{ background: '#fff', border: '1px solid #D5DCE6', borderRadius: 10, padding: '10px 12px', gap: 6 }}>
                  <span style={{ ...label, alignSelf: 'flex-start' }}>Sketch the Moon through the telescope</span>
                  <svg width="290" height="290" viewBox="0 0 290 290" aria-hidden="true">
                    <circle cx="145" cy="145" r="143" fill="none" stroke="#9AA4B8" strokeWidth="1.5" strokeDasharray="5 5" />
                    {/* A member's pencil sketch: waxing gibbous, terminator marked. */}
                    <path d="M145 14A131 131 0 0 1 145 276A72 131 0 0 1 145 14Z" fill="#E9E3D2" stroke="#5A6580" strokeWidth="1.4" />
                    <path d="M145 14A72 131 0 0 0 145 276" fill="none" stroke="#1F3A8A" strokeWidth="1.6" strokeDasharray="4 4" />
                    <g fill="none" stroke="#5A6580" strokeWidth="1.2">
                      <ellipse cx="200" cy="110" rx="22" ry="16" fill="#CFC6B0" />
                      <ellipse cx="215" cy="170" rx="16" ry="12" fill="#CFC6B0" />
                      <circle cx="172" cy="214" r="9" />
                      <circle cx="120" cy="90" r="6" />
                      <circle cx="118" cy="180" r="5" />
                    </g>
                    <text x="96" y="150" fontSize="12" fill="#1F3A8A" fontStyle="italic">terminator</text>
                  </svg>
                  <span style={{ fontSize: 11, color: muted }}>Shade the dark part. Mark the terminator line.</span>
                </div>
              </Part>
              <div className="flex flex-1 flex-col" style={{ gap: 10 }}>
                <div className="flex" style={{ gap: 10 }}>
                  {small('Phase name', 'Waxing gibbous')}
                  {small('Magnification')}
                </div>
                <div className="flex" style={{ gap: 10 }}>
                  {small('Altitude (fists × 10°)')}
                  {small('Direction')}
                </div>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  <span style={label}>Features I found (if lit tonight)</span>
                  {features.map(([f, on]) => (
                    <span key={f} className="inline-flex items-center" style={{ gap: 6, fontSize: 12 }}>
                      {box(on)}
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span style={label}>Why do craters look sharpest near the terminator?</span>
              {line}
              {line}
            </div>
            <div className="flex flex-col">
              <span style={label}>Something I explained to my family tonight</span>
              {line}
              {line}
            </div>
            <Part n={4} tour={tour} className="-m-2 p-2" markerTop={4}>
              <div className="flex flex-col">
                <span style={label}>My prediction: the Moon’s phase one week from tonight</span>
                {line}
              </div>
            </Part>
            <Part n={5} tour={tour} markerTop={14}>
              <div className="flex items-stretch" style={{ gap: 10 }}>
                <div className="flex flex-1 flex-col" style={{ border: '1.5px solid #0B7285', borderRadius: 10, padding: '8px 10px', gap: 3 }}>
                  <span style={{ ...label, color: '#075E6C' }}>Level skill practised</span>
                  <span style={{ fontSize: 12, lineHeight: 1.35 }}>Telescope Operator: focuses on the Moon and names five lunar features</span>
                </div>
                <div
                  className="flex items-center justify-center text-center"
                  style={{ flex: 'none', width: 92, height: 60, border: '1.5px dashed #E8A33D', borderRadius: '50%', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8A5A12' }}
                >
                  Educator
                  <br />
                  stamp
                </div>
              </div>
            </Part>
            <div className="mt-auto">
              <PageFooter page={5} left="Logbook · Evening sky-watch" />
            </div>
          </div>
        </div>
      </ScaledPage>
      <Legend items={LOGBOOK_CALLOUTS} tour={tour} />
    </div>
  )
}
