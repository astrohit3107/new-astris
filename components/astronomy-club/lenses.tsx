'use client'

import { useId, useRef, useState } from 'react'
import { BANDS, LENSES, type BandId } from '@/lib/astronomy-club-data'
import { Moon } from './art'
import { useScrollProgress, Reveal } from './motion'

/**
 * Scene 5 — One sky, three lenses.
 *
 * Desktop with motion: a 320vh track with a sticky stage. One Moon stays
 * centre stage; each third of the scroll slides a lens across it and the Moon
 * becomes that band's version of the same lesson (a diary sketch, an orbit
 * geometry, Kepler's third law).
 *
 * Phones, tablets and reduced motion: the three lenses stack as cards, each
 * showing its final state. Both layouts are chosen by CSS (`pin:` variant), so
 * nothing shifts on hydration.
 */

const band = (id: BandId) => BANDS.find((b) => b.id === id)!

/* -------------------------------------------------------------- overlays */

/** Lit part of a Moon of radius r at (cx, cy); k = 0 new … 4 full … 8 new, waxing lit on the right. */
function phasePath(cx: number, cy: number, r: number, k: number) {
  const waxing = k <= 4
  const c = Math.cos((k / 8) * 2 * Math.PI)
  const rx = Math.abs(c) * r
  const outer = waxing ? 1 : 0
  const inner = c > 0 ? (waxing ? 0 : 1) : waxing ? 1 : 0
  return `M${cx} ${cy - r}A${r} ${r} 0 0 ${outer} ${cx} ${cy + r}A${rx} ${r} 0 0 ${inner} ${cx} ${cy - r}Z`
}

/**
 * Explorers: the Moon becomes a page of a child's Moon diary. A pencil
 * outline, a hatched lit side, and five nights of sketches along the bottom,
 * each a little fuller. When the lens is active the strokes draw themselves.
 */
function ExplorersOverlay() {
  const id = useId().replace(/:/g, '')
  const nights = [1, 1.5, 2, 2.5, 3]
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <defs>
        <clipPath id={`${id}-page`}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
        <filter id={`${id}-pencil`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.6" />
        </filter>
        <pattern id={`${id}-hatch`} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="3.2" stroke="#C98A2E" strokeWidth="1.1" />
        </pattern>
      </defs>
      <circle cx="100" cy="100" r="96" fill="#FBF4E4" />
      <g clipPath={`url(#${id}-page)`}>
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1="0" x2="200" y1={20 + i * 10} y2={20 + i * 10} stroke="#9FC3CC" strokeOpacity="0.45" strokeWidth="0.5" />
        ))}
        <line x1="34" x2="34" y1="0" y2="200" stroke="#E57373" strokeOpacity="0.5" strokeWidth="0.6" />
      </g>
      <text x="100" y="34" textAnchor="middle" fontSize="8.5" fontWeight="700" letterSpacing="1.4" fill="#8A5A12">
        MY MOON DIARY
      </text>
      <g filter={`url(#${id}-pencil)`}>
        {/* Tonight's Moon, waxing gibbous: hatched lit part, pencil outline. */}
        <path d={phasePath(100, 88, 36, 2.5)} fill={`url(#${id}-hatch)`} />
        <path
          className="club-sketch"
          pathLength={1}
          d={`M100 52A${(Math.abs(Math.cos((2.5 / 8) * 2 * Math.PI)) * 36).toFixed(2)} 36 0 0 1 100 124`}
          fill="none"
          stroke="#7A4D0E"
          strokeWidth="1"
        />
        <circle className="club-sketch" pathLength={1} cx="100" cy="88" r="36" fill="none" stroke="#7A4D0E" strokeWidth="1.6" />
        <circle cx="114" cy="78" r="3.5" fill="none" stroke="#7A4D0E" strokeWidth="0.9" />
        <circle cx="120" cy="100" r="2.4" fill="none" stroke="#7A4D0E" strokeWidth="0.9" />
        {/* Five nights, five sketches. */}
        {nights.map((k, i) => {
          const cx = 52 + i * 24
          return (
            <g key={i} className="club-pop" style={{ ['--i' as string]: i }}>
              <path d={phasePath(cx, 150, 8, k)} fill="#E7B566" />
              <circle cx={cx} cy="150" r="8" fill="none" stroke="#7A4D0E" strokeWidth="0.9" />
              <text x={cx} y="168" textAnchor="middle" fontSize="6" fill="#7A4D0E">
                N{i + 1}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/**
 * Navigators: the textbook's own Session 7 diagram. Sunlight from the left,
 * the Moon at eight points of its orbit, always half lit towards the Sun,
 * and the Sun–Earth–Moon line-up that makes an eclipse possible.
 */
function NavigatorsOverlay() {
  const id = useId().replace(/:/g, '')
  const E = { x: 114, y: 100 }
  const R = 50
  const pts = Array.from({ length: 8 }, (_, i) => {
    // Numbered as in the textbook: 1 between Earth and the Sun, 3 below, 5 opposite, 7 above.
    const a = Math.PI - (i * Math.PI) / 4
    return { n: i + 1, x: E.x + R * Math.cos(a), y: E.y + R * Math.sin(a), lx: E.x + 64 * Math.cos(a), ly: E.y + 64 * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <defs>
        <clipPath id={`${id}-disc`}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" fill="#0E1A3A" opacity="0.95" />
      <g clipPath={`url(#${id}-disc)`}>
        {[72, 86, 100, 114, 128].map((y, i) => (
          <g key={y} className="club-pop" style={{ ['--i' as string]: i }} stroke="#E8A33D" strokeWidth="1.2" strokeLinecap="round" fill="none">
            <line x1="14" x2="40" y1={y} y2={y} />
            <path d={`M36 ${y - 3}l4 3-4 3`} />
          </g>
        ))}
        <text x="16" y="62" fontSize="6" fontWeight="700" letterSpacing="0.8" fill="#E8A33D">
          SUNLIGHT
        </text>
        {/* The line-up: Sun, Earth and Moon in a row is when an eclipse can happen. */}
        <line x1="40" y1={E.y} x2="190" y2={E.y} stroke="#E8A33D" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx={E.x} cy={E.y} r={R} fill="none" stroke="#5CC6D6" strokeOpacity="0.8" strokeWidth="0.9" strokeDasharray="2.5 3.5" />
        <circle cx={E.x} cy={E.y} r="11" fill="#1BB0C7" />
        <path d={`M${E.x} ${E.y - 11}A11 11 0 0 1 ${E.x} ${E.y + 11}Z`} fill="#0B4F5C" />
        <text x={E.x} y={E.y + 2.5} textAnchor="middle" fontSize="6" fontWeight="700" fill="#FFFFFF">
          Earth
        </text>
        {pts.map((p, i) => (
          <g key={p.n} className="club-pop" style={{ ['--i' as string]: i + 3 }}>
            <circle cx={p.x} cy={p.y} r="6.5" fill="#22325E" />
            <path d={`M${p.x} ${p.y - 6.5}A6.5 6.5 0 0 0 ${p.x} ${p.y + 6.5}Z`} fill="#F4E7C3" />
            <text x={p.lx} y={p.ly + 2.5} textAnchor="middle" fontSize="7" fontWeight="700" fill="#5CC6D6">
              {p.n}
            </text>
          </g>
        ))}
        <text x="100" y="178" textAnchor="middle" fontSize="6.5" fill="#BFE7EE">
          In line at 1 or 5: an eclipse is possible
        </text>
      </g>
    </svg>
  )
}

function AstronomersOverlay() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <circle cx="100" cy="100" r="96" fill="#0E1A3A" opacity="0.94" />
      <ellipse
       
        cx="100"
        cy="96"
        rx="72"
        ry="44"
        fill="none"
        stroke="#5CC6D6"
        strokeWidth="1.4"
      />
      <circle cx="84" cy="96" r="9" fill="#0B7285" />
      <circle cx="172" cy="96" r="5" fill="#F6EBCB" />
      <line x1="84" y1="96" x2="168" y2="96" stroke="#E8A33D" strokeWidth="1" strokeDasharray="2 3" />
      <text x="128" y="90" textAnchor="middle" fontSize="9" fill="#E8A33D" fontWeight="700">
        a
      </text>
      <text x="100" y="160" textAnchor="middle" fontSize="16" fill="#FFFFFF" fontWeight="700">
        T² ∝ a³
      </text>
      <text x="100" y="176" textAnchor="middle" fontSize="7.5" fill="#BFE7EE">
        T = 27.3 days → a ≈ 383,000 km
      </text>
    </svg>
  )
}

const OVERLAYS: Record<BandId, () => React.JSX.Element> = {
  explorers: ExplorersOverlay,
  navigators: NavigatorsOverlay,
  astronomers: AstronomersOverlay,
}

/** The worked example, as real text (the SVG copy is decorative). */
function WorkedDistance() {
  return (
    <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 font-mono text-xs leading-relaxed text-[#BFE7EE]">
      T = 27.3 days → a = ∛(GMT²/4π²) ≈ 383,000 km · measured: about 384,400 km
    </p>
  )
}

function BandCard({ id, compact = false }: { id: BandId; compact?: boolean }) {
  const b = band(id)
  const item = LENSES.items.find((i) => i.band === id)!
  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
        <span style={{ color: b.text }}>{b.grades}</span>
        <span className="rounded-full border px-2 py-0.5 normal-case tracking-normal" style={{ borderColor: `${b.color}99`, color: b.text }}>
          {b.verb}
        </span>
      </p>
      <h3 className={`club-display mt-2 font-bold text-white ${compact ? 'text-2xl' : 'text-3xl xl:text-4xl'}`}>
        {b.name}
      </h3>
      <p className={`mt-3 text-pretty text-white/80 ${compact ? 'text-base' : 'text-lg'}`}>{item.activity}</p>
      {id === 'astronomers' && <WorkedDistance />}
      <p className="mt-3 text-sm text-white/55">
        <span className="font-semibold text-white/75">Classroom link: </span>
        {item.link}
      </p>
    </div>
  )
}

export default function Lenses() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useScrollProgress(
    track,
    (p) => {
      const el = stage.current
      if (!el) return
      // Each band owns a third of the track.
      LENSES.items.forEach((_, i) => {
        const t = p * 3 - i
        const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x))
        const arrive = ease(t / 0.35)
        const leave = i < 2 ? ease((t - 0.85) / 0.15) : 0
        el.style.setProperty(`--lens-${i}-x`, `${(1 - arrive) * -130 + leave * 130}%`)
        el.style.setProperty(`--lens-${i}-o`, String(ease((t - 0.12) / 0.25) * (1 - leave)))
      })
      const idx = Math.min(2, Math.floor(p * 3))
      setActive((cur) => (cur === idx ? cur : idx))
    },
    { mode: 'pin' },
  )

  return (
    <section data-sky aria-labelledby="lenses-h" className="relative z-10">
      {/* ------------------------------------------------ pinned (desktop) */}
      <div ref={track} className="relative pin:h-[320vh]">
        <div
          ref={stage}
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 pin:sticky pin:top-0 pin:flex pin:h-screen pin:items-center pin:py-0"
        >
          <div className="grid w-full grid-cols-1 gap-12 pin:grid-cols-12 pin:gap-10">
            <div className="pin:col-span-5 pin:self-center">
              <p className="club-kicker">{LENSES.caption}</p>
              <h2 id="lenses-h" className="club-h2 mt-4">
                {LENSES.headline}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg text-white/75">
                {LENSES.copy}{' '}
                <strong className="font-semibold text-white">{LENSES.emphasis}</strong>
              </p>

              {/* Desktop: the active band's lesson, swapping with the lens. */}
              <div className="relative mt-10 hidden min-h-[16rem] pin:block" aria-live="polite">
                {LENSES.items.map((it, i) => (
                  <div
                    key={it.band}
                    className={`absolute inset-0 transition-[opacity,transform,visibility] duration-300 ${
                      active === i ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
                    }`}
                    aria-hidden={active !== i}
                  >
                    <BandCard id={it.band} />
                  </div>
                ))}
              </div>

              <ol className="mt-8 hidden gap-2 pin:flex" aria-hidden="true">
                {LENSES.items.map((it, i) => (
                  <li
                    key={it.band}
                    className="h-1 flex-1 rounded-full transition-colors duration-500"
                    style={{ background: i <= active ? band(it.band).color : 'rgba(255,255,255,0.15)' }}
                  />
                ))}
              </ol>
            </div>

            {/* The Moon and the lenses. */}
            <div className="relative hidden pin:col-span-7 pin:flex pin:items-center pin:justify-center">
              <div className="relative aspect-square w-[min(62vh,40rem)]">
                <Moon id="lens-moon" className="absolute inset-0 h-full w-full" />
                {LENSES.items.map((it, i) => {
                  const Overlay = OVERLAYS[it.band]
                  return (
                    <div
                      key={it.band}
                      className="absolute inset-0"
                      style={{ opacity: `var(--lens-${i}-o, ${i === 0 ? 1 : 0})` }}
                      data-active={active === i ? '' : undefined}
                    >
                      <Overlay />
                    </div>
                  )
                })}
                {/* The lens rims themselves, sliding across the Moon (clipped to it). */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
                {LENSES.items.map((it, i) => (
                  <div
                    key={it.band}
                    className="absolute inset-[2%] rounded-full"
                    style={{
                      transform: `translateX(var(--lens-${i}-x, ${i === 0 ? '0%' : '-130%'}))`,
                      boxShadow: `inset 0 0 0 3px ${band(it.band).color}, 0 0 60px ${band(it.band).color}55`,
                      background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.16), transparent 45%)`,
                    }}
                  />
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------ stacked (mobile, reduced motion) */}
          <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 pin:hidden">
            {LENSES.items.map((it, i) => {
              const Overlay = OVERLAYS[it.band]
              return (
                <Reveal as="li" key={it.band} delay={i * 120}>
                  <div
                    className="h-full rounded-3xl border bg-white/[0.04] p-6"
                    style={{ borderColor: `${band(it.band).color}55` }}
                  >
                    <div className="relative mx-auto mb-6 aspect-square w-44">
                      <Moon id={`lens-moon-${i}`} className="absolute inset-0 h-full w-full" />
                      <div className="absolute inset-0">
                        <Overlay />
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-[2%] rounded-full"
                        style={{ boxShadow: `inset 0 0 0 2px ${band(it.band).color}` }}
                      />
                    </div>
                    <BandCard id={it.band} compact />
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
