'use client'

import { ArrowRight, CalendarDays, Clock, IndianRupee, Sparkles } from 'lucide-react'
import { SPITI, SPITI_IMAGES } from '@/lib/spiti-data'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-14">
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
      {/* Milky Way overlay + cinematic gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_95%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-5 px-4 py-16 text-center sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/40 bg-[var(--av-gold)]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          <Sparkles size={13} className="text-[var(--av-gold)] animate-pulse-glow" />
          Flagship Expedition · {SPITI.positioning}
        </div>

        <h1 className="text-5xl font-black leading-[1.02] tracking-tighter text-balance text-white sm:text-6xl lg:text-7xl">
          Astroventure
          <span className="block text-[var(--av-gold)]">Spiti ’26</span>
        </h1>

        <p className="mx-auto max-w-2xl text-balance text-base font-light leading-relaxed text-white/85 sm:text-lg">
          {SPITI.subheading}
        </p>
        <p className="text-sm italic text-white/55">{SPITI.tagline}</p>

        {/* Key facts: dates · duration · price · seats */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <CalendarDays size={13} className="text-[var(--av-gold)]" /> {SPITI.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Clock size={13} className="text-[var(--av-gold)]" /> {SPITI.durationLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <IndianRupee size={13} className="text-[var(--av-gold)]" /> from {SPITI.fromPriceLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--av-gold)]/50 bg-[var(--av-gold)]/15 px-3.5 py-1.5 text-xs font-semibold text-[var(--av-gold)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)] animate-pulse-glow" /> {SPITI.seatsLabel}
          </span>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col justify-center gap-2.5 pt-3 sm:flex-row">
          <a
            href={SPITI.bookingPath}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[var(--av-gold)] hover:shadow-2xl"
          >
            Book Now
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={SPITI.path}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/60 bg-transparent px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/5"
          >
            View Expedition
          </a>
        </div>

        {/* Ecosystem trust indicators */}
        <div className="flex flex-wrap justify-center gap-3 pt-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse-glow" />
            <span className="text-white/80">100+ Schools</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse-glow" style={{ animationDelay: '0.3s' }} />
            <span className="text-white/80">50+ Resorts</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse-glow" style={{ animationDelay: '0.6s' }} />
            <span className="text-white/80">5+ Years</span>
          </div>
        </div>

        {/* Secondary B2B entry points (Astris ecosystem) */}
        <p className="pt-2 text-xs text-white/60">
          Astris Space also partners with schools &amp; resorts —{' '}
          <button data-link-button="proposal" className="font-semibold text-white underline-offset-2 hover:underline">
            Request Proposal
          </button>
          {' '}·{' '}
          <button data-link-button="call" className="font-semibold text-white underline-offset-2 hover:underline">
            Book a Call
          </button>
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/40 p-1">
            <div className="h-1.5 w-1 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
