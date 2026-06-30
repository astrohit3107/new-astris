'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, CalendarDays, Clock, IndianRupee, Sparkles } from 'lucide-react'
import { SPITI, SPITI_IMAGES } from '@/lib/spiti-data'
import Starfield from '@/components/astroventure/starfield'

function useCountdown(targetISO: string) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const target = new Date(targetISO).getTime()
  const diff = now === null ? 0 : Math.max(0, target - now)
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { ready: now !== null, days, hours, minutes, seconds }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  )
}

export default function SpitiHero() {
  const { ready, days, hours, minutes, seconds } = useCountdown(SPITI.startDateISO)

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--av-deep)] pt-20">
      {/* Cinematic Spiti / Milky Way background */}
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source srcSet={SPITI_IMAGES.heroMilkyWayMobile} media="(max-width: 1024px)" />
          <img
            src={SPITI_IMAGES.heroMilkyWay}
            alt="The Milky Way over the Spiti Himalayas"
            fetchPriority="high"
            className="animate-drift h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[var(--av-deep)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--av-deep)_92%)]" />
      <Starfield count={64} />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-5 py-16 text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles size={14} className="text-[var(--av-gold)]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/85">
            {SPITI.positioning}
          </span>
        </div>

        <h1
          className="animate-fade-in-up font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.1s' }}
        >
          Astroventure
          <span className="block italic text-[var(--av-gold)]">Spiti ’26</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-balance text-base font-light leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {SPITI.subheading}
          <span className="mt-1 block text-sm italic text-white/55">{SPITI.tagline}</span>
        </p>

        {/* Key facts */}
        <div
          className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          style={{ animationDelay: '0.28s' }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
            <CalendarDays size={13} className="text-[var(--av-gold)]" /> {SPITI.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
            <Clock size={13} className="text-[var(--av-gold)]" /> {SPITI.durationLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
            <IndianRupee size={13} className="text-[var(--av-gold)]" /> from {SPITI.fromPriceLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--av-gold)]/40 bg-[var(--av-gold)]/15 px-3.5 py-1.5 text-xs font-semibold text-[var(--av-gold)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)] animate-pulse-glow" /> {SPITI.seatsLabel}
          </span>
        </div>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '0.36s' }}
        >
          <a
            href={SPITI.bookingPath}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)] sm:w-auto"
          >
            Book Now
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#overview"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            View Expedition
          </a>
        </div>

        {/* Countdown */}
        <div
          className="animate-fade-in-up mx-auto mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-4 backdrop-blur-md sm:gap-6"
          style={{ animationDelay: '0.46s' }}
        >
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-white/45 sm:block">
            Expedition
            <br />
            begins in
          </span>
          <div className="flex items-center gap-3 sm:gap-5" aria-live="polite">
            <CountUnit value={ready ? days : 0} label="Days" />
            <span className="text-white/25">:</span>
            <CountUnit value={ready ? hours : 0} label="Hrs" />
            <span className="text-white/25">:</span>
            <CountUnit value={ready ? minutes : 0} label="Min" />
            <span className="text-white/25">:</span>
            <CountUnit value={ready ? seconds : 0} label="Sec" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#overview"
        aria-label="Scroll to explore"
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white [animation:av-scroll-wheel_1.8s_ease-in-out_infinite]" />
        </span>
        <ChevronDown size={14} className="animate-float-slow" />
      </a>
    </section>
  )
}
