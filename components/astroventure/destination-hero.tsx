'use client'

import { ArrowRight, ArrowLeft, MapPin, Mountain, Star, Eye } from 'lucide-react'
import type { Destination } from '@/lib/astroventure-data'
import Starfield from './starfield'

function DarkSkyRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'fill-[var(--av-gold)] text-[var(--av-gold)]' : 'text-white/25'}
        />
      ))}
    </span>
  )
}

export default function DestinationHero({ destination: d }: { destination: Destination }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--av-deep)]">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source srcSet={d.imageMobile} media="(max-width: 1024px)" />
          <img
            src={d.heroImage}
            alt={`${d.name}, ${d.valley}`}
            fetchPriority="high"
            className="animate-kenburns h-full w-full object-cover object-center"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-black/40 to-black/70" />
      <Starfield count={50} aurora={false} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <a
          href="/astroventure-nights#destinations"
          className="animate-fade-in-up mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} /> All destinations
        </a>

        <div className="animate-fade-in-up flex items-center gap-2 text-sm text-white/80" style={{ animationDelay: '0.05s' }}>
          <MapPin size={15} className="text-[var(--av-gold)]" />
          {d.locationLabel}
        </div>

        <h1
          className="animate-fade-in-up font-display mt-3 text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.1s' }}
        >
          {d.name}
        </h1>

        <p
          className="animate-fade-in-up font-display mt-4 max-w-2xl text-balance text-xl font-light italic text-white/80 sm:text-2xl"
          style={{ animationDelay: '0.18s' }}
        >
          {d.tagline}
        </p>

        {/* Stat strip */}
        <div
          className="animate-fade-in-up mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: '0.26s' }}
        >
          {[
            { icon: Mountain, label: 'Altitude', value: d.altitude },
            { icon: MapPin, label: 'Valley', value: d.valley },
            { icon: Star, label: 'Dark Sky', value: d.bortle },
            { icon: Eye, label: 'Rating', value: <DarkSkyRating rating={d.darkSkyRating} /> },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="glass rounded-2xl p-4">
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/50">
                <Icon size={12} className="text-[var(--av-gold)]" />
                {label}
              </span>
              <div className="mt-1 font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Observation conditions */}
        <p
          className="animate-fade-in-up mt-6 max-w-2xl text-pretty text-sm font-light leading-relaxed text-white/65"
          style={{ animationDelay: '0.34s' }}
        >
          <span className="font-semibold text-white/85">Observation conditions — </span>
          {d.observationConditions}
        </p>

        <div className="animate-fade-in-up mt-8" style={{ animationDelay: '0.42s' }}>
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)]"
          >
            Reserve Your Spot
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
