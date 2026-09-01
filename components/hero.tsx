'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import { heroSlides } from '@/lib/hero-slides'

/**
 * The homepage hero — one slide per offering.
 *
 * BEHAVIOUR
 * ---------
 * Slides crossfade and drift (Ken Burns) while the copy staggers in. It
 * advances on a timer, and the timer stops whenever it should: on hover, on
 * keyboard focus inside the hero, when the tab is hidden, and permanently once
 * the visitor takes control with the arrows, dots or a swipe. Autoplay that
 * fights the person reading it is worse than no autoplay.
 *
 * ACCESSIBILITY
 * -------------
 * Marked up as a carousel with a labelled live region, so a screen reader is
 * told which slide is showing rather than having text change under it silently.
 * Arrow keys move between slides. Under prefers-reduced-motion there is no
 * autoplay, no drift and no crossfade — just the slide, changed on request.
 *
 * PERFORMANCE
 * -----------
 * Only the first image is eager and high priority; the rest are lazy, and the
 * next one is warmed as soon as a slide settles so a click never waits.
 */

const INTERVAL_MS = 7000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userTook, setUserTook] = useState(false)
  const [reduced, setReduced] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const touchX = useRef<number | null>(null)

  const count = heroSlides.length
  const slide = heroSlides[index]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduced(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  const go = useCallback(
    (next: number, byUser = false) => {
      setIndex(((next % count) + count) % count)
      if (byUser) setUserTook(true)
    },
    [count]
  )

  // Autoplay, with every reason to stop respected.
  useEffect(() => {
    if (reduced || paused || userTook) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduced, paused, userTook, count])

  // A hidden tab should not burn through the slides unseen.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Warm the next image so a click never waits on the network.
  useEffect(() => {
    const nextSrc = heroSlides[(index + 1) % count].image
    const img = new Image()
    img.src = nextSrc
  }, [index, count])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, true) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, true) }
  }

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Astris Space offerings"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), true)
        touchX.current = null
      }}
      // Height excludes the announcement bar + header stacked above, otherwise the
      // controls pinned to the section's bottom edge fall below the viewport.
      className="relative isolate flex min-h-[calc(100svh-5.5rem)] items-center overflow-hidden bg-[#05060a] text-white"
    >
      {/* ---------------------------------------------------- images ---- */}
      {heroSlides.map((s, i) => {
        const active = i === index
        return (
          <div
            key={s.id}
            aria-hidden={!active}
            className={`absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-out ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              style={{ objectPosition: s.objectPosition ?? 'center' }}
              className={`h-full w-full object-cover ${
                active && !reduced ? 'animate-hero-drift' : ''
              }`}
            />
            {/* Legibility: a horizontal wash for the copy, plus edge falloff. */}
            {/* Scrim tuned against the photograph, not guessed: strong enough
                behind the copy column for contrast, gone by mid-frame so the
                sky is actually seen. The vertical pass only darkens the very
                bottom, where the controls sit. */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,10,0.94)_0%,rgba(5,6,10,0.85)_22%,rgba(5,6,10,0.5)_42%,rgba(5,6,10,0.15)_62%,transparent_80%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,0.35)_0%,transparent_22%,transparent_70%,rgba(5,6,10,0.85)_100%)]" />
          </div>
        )
      })}

      {/* ---------------------------------------------------- copy ------ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-8 sm:px-6 lg:px-8">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="max-w-2xl"
        >
          {/* key restarts the entrance animation on every slide change */}
          <div key={slide.id} className="space-y-5">
            <p className="animate-fade-up inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
              <span className="h-px w-7 bg-[var(--av-gold)]/60" />
              {slide.eyebrow}
            </p>

            <h1
              className="font-display animate-fade-up text-balance text-4xl font-light leading-[1.04] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '90ms' }}
            >
              {slide.headline}
              {slide.headlineAccent && (
                <span className="block text-white/50">{slide.headlineAccent}</span>
              )}
            </h1>

            <p
              className="animate-fade-up max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg"
              style={{ animationDelay: '170ms' }}
            >
              {slide.body}
            </p>

            <ul
              className="animate-fade-up flex flex-wrap gap-2 pt-1"
              style={{ animationDelay: '240ms' }}
            >
              {slide.facts.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-sm"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-up flex flex-col gap-3 pt-3 sm:flex-row"
              style={{ animationDelay: '320ms' }}
            >
              <Cta {...slide.primary} primary />
              {slide.secondary && <Cta {...slide.secondary} />}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- controls -- */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Progress bars double as slide labels and buttons */}
          <ol className="flex flex-1 gap-2 sm:max-w-lg">
            {heroSlides.map((s, i) => {
              const active = i === index
              return (
                <li key={s.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => go(i, true)}
                    aria-label={`Show ${s.eyebrow}`}
                    aria-current={active ? 'true' : undefined}
                    className="group block w-full py-2"
                  >
                    <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
                      <span
                        className={`block h-full rounded-full bg-[var(--av-gold)] ${
                          active
                            ? paused || userTook || reduced
                              ? 'w-full'
                              : 'animate-hero-progress'
                            : 'w-0'
                        }`}
                        style={
                          active && !paused && !userTook && !reduced
                            ? { animationDuration: `${INTERVAL_MS}ms` }
                            : undefined
                        }
                      />
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs tabular-nums text-white/45">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            {!reduced && (
              <button
                type="button"
                onClick={() => setUserTook((v) => !v)}
                aria-label={userTook ? 'Resume automatic slides' : 'Pause automatic slides'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/45 hover:bg-white/10"
              >
                {userTook ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(index - 1, true)}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/45 hover:bg-white/10"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, true)}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/45 hover:bg-white/10"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta({
  label,
  href,
  external,
  primary,
}: {
  label: string
  href: string
  external?: boolean
  primary?: boolean
}) {
  const cls = primary
    ? 'group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)]'
    : 'inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/5'

  const inner = (
    <>
      {label}
      {external ? (
        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
