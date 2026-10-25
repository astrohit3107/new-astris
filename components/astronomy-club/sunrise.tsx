'use client'

import { useRef, type ReactNode } from 'react'
import { TelescopeSilhouette } from './art'
import { useScrollProgress } from './motion'

/**
 * Scene 12 — Under the real sky. The page's night turns to day here: a slow
 * sunrise behind a telescope silhouette, scrubbed by scroll, and a sunspot
 * drawing fading in on a projected solar disc. Text sits in `children`.
 */
export default function Sunrise({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref, (p) => ref.current?.style.setProperty('--dawn', p.toFixed(3)), { start: 1, end: 0.1 })

  return (
    <section
      ref={ref}
      data-sky
      aria-labelledby="safety-h"
      className="relative z-10 overflow-hidden"
      style={{ ['--dawn' as string]: 0 }}
    >
      {/* Dawn sky: fades up over the night as the scene scrolls in. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 'var(--dawn)',
          background:
            'linear-gradient(180deg, #0E1A3A 0%, #24406B 38%, #C77B4A 72%, #F2B867 88%, #F8D9A0 100%)',
        }}
      />
      {/* The Sun, rising behind the horizon. */}
      <div
        aria-hidden="true"
        className="absolute left-[62%] h-56 w-56 rounded-full sm:h-72 sm:w-72"
        style={{
          bottom: 'calc(-9rem + var(--dawn) * 9rem)',
          background: 'radial-gradient(circle, #FFF4D6 0%, #FFD58A 45%, rgba(255,190,110,0) 70%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1A1430] to-transparent" />
      <TelescopeSilhouette className="pointer-events-none absolute bottom-0 left-[4%] h-40 w-48 text-[#140F26] sm:h-56 sm:w-64" />

      <div className="relative mx-auto max-w-7xl px-4 pb-48 pt-24 sm:px-6 sm:pb-56 sm:pt-32 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">{children}</div>
          <figure className="lg:col-span-5">
            {/* Projected solar disc with a sunspot sketch. */}
            <div className="relative mx-auto aspect-square w-full max-w-[18rem] rounded-full bg-[#FFF6E2] shadow-[0_0_80px_rgba(255,214,140,0.45)]">
              <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full">
                <circle cx="100" cy="100" r="92" fill="none" stroke="#C9A36A" strokeWidth="1" strokeDasharray="3 4" />
                <line x1="8" y1="100" x2="192" y2="100" stroke="#C9A36A" strokeWidth="0.6" />
                <line x1="100" y1="8" x2="100" y2="192" stroke="#C9A36A" strokeWidth="0.6" />
                <g style={{ opacity: 'calc((var(--dawn) - 0.4) * 2.5)' }} fill="#3B2A12">
                  <circle cx="72" cy="82" r="5" />
                  <circle cx="80" cy="86" r="2.5" />
                  <circle cx="128" cy="118" r="4" />
                  <circle cx="122" cy="113" r="2" />
                  <circle cx="134" cy="122" r="1.6" />
                </g>
                <g style={{ opacity: 'calc((var(--dawn) - 0.4) * 2.5)' }} fill="none" stroke="#3B2A12" strokeOpacity="0.4">
                  <circle cx="72" cy="82" r="9" />
                  <circle cx="128" cy="118" r="8" />
                </g>
              </svg>
            </div>
            <figcaption className="mx-auto mt-4 w-fit max-w-full rounded-full bg-[#0E1A3A]/80 px-4 py-2 text-center text-sm text-white">
              A sunspot sketch on a projected solar disc. The Sun is never viewed directly.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
