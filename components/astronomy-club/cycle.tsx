'use client'

import { useRef, useState } from 'react'
import { BANDS, CYCLE, YEAR_COLORS, YEAR_TEXT, type YearId } from '@/lib/astronomy-club-data'
import { useScrollProgress, usePinMode } from './motion'

/**
 * Scene 7 — Nine years, never the same session twice.
 *
 * Three sectors (Years A, B, C) form one orbit. A single dot — one student —
 * spirals outward from Grade 4 to Grade 12, passing A → B → C three times; its
 * colour changes with the grade band at Grades 7 and 10. On desktop the scene
 * is pinned and the dot follows the scroll; elsewhere the full journey shows.
 */

const CX = 200
const CY = 200
const YEARS: YearId[] = ['A', 'B', 'C']

/** Position along the spiral; s = 0 is Grade 4, s = 8 is Grade 12. */
function at(s: number) {
  const deg = s * 120 + 60 - 90 // sector midpoints, starting from the top
  const r = 42 + s * 16.5
  const a = (deg * Math.PI) / 180
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

function spiralPath(to: number) {
  const pts: string[] = []
  const steps = Math.max(2, Math.ceil(to * 24))
  for (let i = 0; i <= steps; i++) {
    const { x, y } = at((to * i) / steps)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function sectorArc(i: number, r: number) {
  const a0 = ((i * 120 - 90 + 2) * Math.PI) / 180
  const a1 = (((i + 1) * 120 - 90 - 2) * Math.PI) / 180
  const p0 = { x: CX + r * Math.cos(a0), y: CY + r * Math.sin(a0) }
  const p1 = { x: CX + r * Math.cos(a1), y: CY + r * Math.sin(a1) }
  return `M${p0.x} ${p0.y} A${r} ${r} 0 0 1 ${p1.x} ${p1.y}`
}

const bandForGrade = (g: number) => (g <= 6 ? BANDS[0] : g <= 9 ? BANDS[1] : BANDS[2])

export default function Cycle() {
  const track = useRef<HTMLDivElement>(null)
  const pin = usePinMode()
  const [raw, setRaw] = useState(1)
  useScrollProgress(track, (p) => setRaw(Math.round(p * 400) / 400), { mode: 'pin' })

  // Leave a little dwell at both ends of the track.
  const p = pin ? Math.max(0, Math.min(1, (raw - 0.06) / 0.86)) : 1
  const s = p * 8
  const grade = 4 + Math.round(s)
  const band = bandForGrade(grade)
  const year = YEARS[(grade - 4) % 3]
  const dot = at(s)

  return (
    <div ref={track} className="relative pin:h-[280vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pin:sticky pin:top-0 pin:flex pin:h-screen pin:items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 pin:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[30rem]">
            <svg viewBox="-30 -30 460 460" aria-hidden="true" className="h-auto w-full">
              {YEARS.map((y, i) => (
                <g key={y}>
                  <path
                    d={sectorArc(i, 186)}
                    fill="none"
                    stroke={YEAR_COLORS[y]}
                    strokeWidth={year === y ? 8 : 4}
                    strokeOpacity={year === y ? 1 : 0.5}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {(() => {
                    const a = ((i * 120 + 60 - 90) * Math.PI) / 180
                    return (
                      <text
                        x={CX + 208 * Math.cos(a)}
                        y={CY + 208 * Math.sin(a) + 9}
                        textAnchor="middle"
                        fontSize="26"
                        fontWeight="800"
                        fill={YEAR_COLORS[y]}
                        className="club-display"
                      >
                        {y}
                      </text>
                    )
                  })()}
                </g>
              ))}
              {[1, 2, 3].map((k) => (
                <circle key={k} cx={CX} cy={CY} r={42 + k * 49.5} fill="none" stroke="rgba(255,255,255,0.06)" />
              ))}
              <path d={spiralPath(8)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="2 5" />
              <path d={spiralPath(Math.max(0.001, s))} fill="none" stroke={band.color} strokeWidth="2.5" strokeLinecap="round" />
              {Array.from({ length: 9 }, (_, i) => {
                const q = at(i)
                const reached = i <= s + 0.001
                const b = bandForGrade(4 + i)
                return (
                  <g key={i}>
                    <circle cx={q.x} cy={q.y} r="4" fill={reached ? b.color : 'rgba(255,255,255,0.25)'} />
                    <text x={q.x} y={q.y - 9} textAnchor="middle" fontSize="11" fill={reached ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}>
                      Gr {4 + i}
                    </text>
                  </g>
                )
              })}
              <circle cx={dot.x} cy={dot.y} r="16" fill={band.color} opacity="0.25" />
              <circle cx={dot.x} cy={dot.y} r="8" fill={band.color} />
              <circle cx={dot.x} cy={dot.y} r="3" fill="#FFFFFF" />
            </svg>
            <p className="mt-2 text-center text-sm text-white/60" aria-hidden={!pin}>
              <span className="club-display text-2xl font-bold text-white">Grade {grade}</span>
              <span className="mx-2 text-white/30">·</span>
              <span style={{ color: band.text }}>{band.name}</span>
              <span className="mx-2 text-white/30">·</span>
              <span style={{ color: YEAR_TEXT[year] }}>Year {year}</span>
            </p>
          </div>

          <div>
            <h2 className="club-h2">{CYCLE.headline}</h2>
            <ul className="mt-8 space-y-3">
              {CYCLE.years.map((y) => {
                const on = pin && y.id === year
                return (
                  <li
                    key={y.id}
                    className={`rounded-2xl border p-5 transition-all duration-300 ${
                      on ? 'bg-white/[0.08]' : 'bg-white/[0.02]'
                    }`}
                    style={{ borderColor: on ? YEAR_COLORS[y.id] : 'rgba(255,255,255,0.1)' }}
                  >
                    <h3 className="text-lg font-semibold text-white">
                      <span style={{ color: YEAR_TEXT[y.id] }}>Year {y.id}</span> · {y.title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-sm text-white/70">{y.topics}</p>
                    <p className="mt-2 text-sm italic text-white/85">Signature: {y.signature}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
