'use client'

import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { IMAGES, SITE } from '@/lib/astroventure-data'
import Starfield from './starfield'
import TelescopeSilhouette from './telescope-silhouette'

export default function AstroHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--av-deep)]">
      {/* Slow-moving Milky Way background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.milkyWay}
          alt="The Milky Way over the Himalayas"
          fetchPriority="high"
          className="animate-drift h-full w-full object-cover"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[var(--av-deep)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--av-deep)_95%)]" />

      {/* Twinkling stars + aurora */}
      <Starfield count={70} />

      {/* Telescope silhouette */}
      <TelescopeSilhouette className="absolute bottom-0 right-2 z-10 h-[42vh] max-h-[420px] w-auto text-black/85 sm:right-10 md:h-[52vh]" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-5 text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles size={14} className="text-[var(--av-gold)]" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/85">
            {SITE.tagline}
          </span>
        </div>

        <h1
          className="animate-fade-in-up font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.1s' }}
        >
          Astroventure
          <span className="block text-gradient-gold italic">Nights</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-balance text-base font-light leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          Experience the Himalayas through the lens of astronomy. Explore pristine dark skies,
          observe celestial wonders through powerful telescopes, and create unforgettable memories
          under the stars.
        </p>

        <div
          className="animate-fade-in-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '0.32s' }}
        >
          <a
            href="#register"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)] sm:w-auto"
          >
            Reserve Your Spot
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#destinations"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            Explore Destinations
          </a>
        </div>

        {/* Trust line */}
        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60"
          style={{ animationDelay: '0.44s' }}
        >
          <span>★ Bortle 2 dark skies</span>
          <span className="hidden sm:inline">·</span>
          <span>Research-grade telescopes</span>
          <span className="hidden sm:inline">·</span>
          <span>Expert astronomer guides</span>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <a
        href="#destinations"
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
