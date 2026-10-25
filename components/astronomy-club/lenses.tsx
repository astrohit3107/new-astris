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

function ExplorersOverlay() {
  const clip = `ex-clip-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <defs>
        <clipPath id={clip}>
          <circle cx="100" cy="100" r="71" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="71" fill="#FBF3E2" />
      <g clipPath={`url(#${clip})`} stroke="#CBB892" strokeWidth="0.6">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1="20" x2="180" y1={40 + i * 10} y2={40 + i * 10} />
        ))}
      </g>
      {/* Hand-drawn Moon: wobbly outline, hatched shadow side. */}
      <path
       
        d="M100 46c30 1 54 25 53 55-1 30-24 53-54 53-29-1-52-25-52-54 0-30 24-55 53-54z"
        fill="none"
        stroke="#B8741A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g stroke="#B8741A" strokeWidth="1.3" strokeLinecap="round" opacity="0.75">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={54 + i * 5} y1={70 + (i % 2) * 4} x2={48 + i * 5} y2={130 - (i % 3) * 4} />
        ))}
      </g>
      <g fill="none" stroke="#B8741A" strokeWidth="1.2">
        <circle cx="118" cy="82" r="5" />
        <circle cx="128" cy="118" r="3.5" />
      </g>
      <text x="100" y="174" textAnchor="middle" fontSize="9" fill="#8A5A12" fontStyle="italic">
        Moon diary · Night 1
      </text>
    </svg>
  )
}

function NavigatorsOverlay() {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = Math.PI - (i * Math.PI) / 4
    return { n: i + 1, x: 100 + 62 * Math.cos(a), y: 100 + 62 * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <circle cx="100" cy="100" r="96" fill="#0E1A3A" opacity="0.92" />
      <g stroke="#E8A33D" strokeWidth="1.6" strokeLinecap="round">
        {[60, 80, 100, 120, 140].map((y) => (
          <g key={y}>
            <line x1="10" x2="30" y1={y} y2={y} />
            <path d={`M27 ${y - 3}l4 3-4 3`} fill="none" />
          </g>
        ))}
      </g>
      <circle
       
        cx="100"
        cy="100"
        r="62"
        fill="none"
        stroke="#5CC6D6"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      <circle cx="100" cy="100" r="13" fill="#0B7285" />
      <path d="M100 87a13 13 0 0 1 0 26z" fill="#063F4A" />
      {pts.map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="7" fill="#1C2A52" />
          {/* Lit half always faces the Sun (to the left). */}
          <path d={`M${p.x} ${p.y - 7}a7 7 0 0 0 0 14z`} fill="#F6EBCB" />
          <text
            x={100 + 80 * ((p.x - 100) / 62)}
            y={100 + 80 * ((p.y - 100) / 62) + 3}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#5CC6D6"
          >
            {p.n}
          </text>
        </g>
      ))}
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
