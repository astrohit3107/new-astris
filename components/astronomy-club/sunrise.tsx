'use client'

import { useRef, type ReactNode } from 'react'
import { useScrollProgress } from './motion'

/**
 * Scene 12 — Under the real sky. The page's night turns to day here: a slow
 * sunrise, scrubbed by scroll, behind a real telescope standing on the
 * horizon (a Dobsonian reflector from the Nakshatra Scopes catalogue). Text
 * sits in `children`.
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
          background: 'linear-gradient(180deg, #0E1A3A 0%, #24406B 40%, #B8744F 74%, #E9A964 90%, #F6CF92 100%)',
        }}
      />
      {/* The Sun, rising behind the horizon. */}
      <div
        aria-hidden="true"
        className="absolute left-[58%] h-64 w-64 -translate-x-1/2 rounded-full sm:h-80 sm:w-80"
        style={{
          bottom: 'calc(-10rem + var(--dawn) * 9rem)',
          background: 'radial-gradient(circle, #FFF4D6 0%, #FFD58A 42%, rgba(255,190,110,0) 70%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#120E24] via-[#120E24]/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="pb-16 lg:col-span-7 lg:pb-28">{children}</div>
          <div className="relative flex justify-center lg:col-span-5">
            {/* A soft rim of morning light behind the telescope. */}
            <span
              aria-hidden="true"
              className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'rgba(255, 214, 150, 0.28)', opacity: 'calc(0.3 + var(--dawn) * 0.7)' }}
            />
            <img
              src="/club/telescope-dobsonian.webp"
              width={446}
              height={688}
              loading="lazy"
              decoding="async"
              alt="A Dobsonian reflecting telescope standing on the ground"
              className="relative h-auto w-[min(70vw,300px)] drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] lg:w-[min(30vw,340px)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
