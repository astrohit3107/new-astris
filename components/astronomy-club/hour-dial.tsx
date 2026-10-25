'use client'

import { useRef, useState } from 'react'
import { HOUR } from '@/lib/astronomy-club-data'
import { useScrollProgress } from './motion'

/**
 * Scene 6 — Inside one hour. A 60-minute dial fills its three arcs in order
 * as the scene scrolls through the viewport; the matching step lights up.
 */
const R = 80
const C = 2 * Math.PI * R

export default function HourDial() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useScrollProgress(ref, (v) => setP(Math.round(v * 200) / 200), { start: 0.85, end: 0.2 })

  const minutes = p * 60
  let startMin = 0
  const arcs = HOUR.parts.map((part) => {
    const from = startMin
    startMin += part.minutes
    const fill = Math.max(0, Math.min(1, (minutes - from) / part.minutes))
    return { ...part, from, fill }
  })
  const activeIdx = Math.max(0, arcs.findIndex((a) => a.fill < 1))
  const current = p >= 1 ? arcs.length - 1 : activeIdx

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
        <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
          {arcs.map((a) => (
            <circle
              key={a.title}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={a.color}
              strokeWidth="14"
              strokeDasharray={`${(a.minutes / 60) * C * a.fill} ${C}`}
              strokeDashoffset={-(a.from / 60) * C}
              strokeLinecap="butt"
            />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="100"
              y1="8"
              x2="100"
              y2={i % 3 === 0 ? 16 : 13}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.2"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="club-display text-6xl font-extrabold text-white tabular-nums" aria-hidden="true">
            {Math.round(minutes)}
          </span>
          <span className="mt-1 text-sm uppercase tracking-[0.2em] text-white/55">of 60 minutes</span>
        </div>
      </div>

      <ol className="space-y-4">
        {arcs.map((a, i) => (
          <li
            key={a.title}
            className={`rounded-2xl border p-5 transition-all duration-500 ${
              i === current ? 'border-white/25 bg-white/[0.07]' : 'border-white/10 bg-transparent'
            }`}
          >
            <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
              <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ background: a.color }} />
              {a.title}
            </h3>
            <p className="mt-2 pl-6 text-pretty text-white/70">{a.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
