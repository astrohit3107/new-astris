import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import { ASTRO, ASTRO_IMAGES, astroHeroFacts } from '@/lib/astrophotography-data'
import AstroIcon from './icon'
import Starfield from '@/components/astroventure/starfield'

export default function AstroHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--av-deep)] pt-20">
      {/* Cinematic background — placeholder: a photographer capturing the Milky Way beside Pangong Lake */}
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source srcSet={ASTRO_IMAGES.heroMobile} media="(max-width: 1024px)" />
          <img
            src={ASTRO_IMAGES.hero}
            alt="A photographer beneath the Milky Way core in the high Himalaya"
            fetchPriority="high"
            width={2400}
            height={1600}
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
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)] animate-pulse-glow" />
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/85">
            {ASTRO.positioning}
          </span>
        </div>

        <h1
          className="animate-fade-in-up font-display mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          Astroventure
          <span className="block italic text-[var(--av-gold)]">Astrophotography Expedition</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/85 sm:text-xl"
          style={{ animationDelay: '0.18s' }}
        >
          {ASTRO.subheading}
        </p>
        <p
          className="animate-fade-in-up mx-auto mt-3 max-w-2xl text-pretty text-sm font-light leading-relaxed text-white/65 sm:text-base"
          style={{ animationDelay: '0.24s' }}
        >
          {ASTRO.intro}
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '0.34s' }}
        >
          <a
            href={ASTRO.bookingPath}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)] sm:w-auto"
          >
            Reserve Your Seat
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={ASTRO.brochurePath}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            <Download size={16} />
            Download Brochure
          </a>
        </div>

        {/* Information cards */}
        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: '0.44s' }}
        >
          {astroHeroFacts.map((f) => (
            <span
              key={f.value}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
            >
              <AstroIcon name={f.icon} size={13} className="text-[var(--av-gold)]" />
              {f.value}
            </span>
          ))}
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
