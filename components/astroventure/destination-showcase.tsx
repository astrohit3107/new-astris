'use client'

import { ArrowUpRight, MapPin, Star, Mountain, CalendarRange } from 'lucide-react'
import { destinations } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'

function DarkSkyRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Dark sky rating ${rating} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating ? 'fill-[var(--av-gold)] text-[var(--av-gold)]' : 'text-white/25'
          }
        />
      ))}
    </span>
  )
}

export default function DestinationShowcase() {
  return (
    <section
      id="destinations"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Choose your sky"
          title="Three Himalayan Dark-Sky Escapes"
          subtitle="Each destination offers its own character of darkness — from alpine snow-meadows to the last village before Tibet. Pick the night that calls to you."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <ScrollReveal key={d.slug} delay={i * 120}>
              <a
                href={`/astroventure-nights/${d.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <picture className="block h-full w-full">
                    <source srcSet={d.imageMobile} media="(max-width: 1024px)" />
                    <img
                      src={d.image}
                      alt={`${d.name}, ${d.valley}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-black/30 to-transparent" />

                  {/* Dark sky badge */}
                  <div className="glass absolute right-3 top-3 flex items-center gap-2 rounded-full px-3 py-1.5">
                    <DarkSkyRating rating={d.darkSkyRating} />
                    <span className="text-[11px] font-medium text-white/80">{d.bortle}</span>
                  </div>

                  {/* Name */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-3xl font-semibold text-white">{d.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                      <MapPin size={13} className="text-[var(--av-gold)]" />
                      {d.locationLabel}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-light italic leading-relaxed text-white/60">
                    “{d.tagline}”
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <span className="flex items-center gap-1.5 text-white/45">
                        <Mountain size={12} /> Altitude
                      </span>
                      <span className="mt-1 block font-semibold text-white">{d.altitude}</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <span className="flex items-center gap-1.5 text-white/45">
                        <Star size={12} /> Dark Sky
                      </span>
                      <span className="mt-1 block font-semibold text-white">{d.darkSkyLabel}</span>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
                    <span className="flex items-center gap-1.5 text-white/45">
                      <CalendarRange size={12} /> Best season
                    </span>
                    <span className="mt-1 block font-semibold text-white">{d.bestSeason}</span>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-1.5">
                    {d.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--av-gold)]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-semibold text-white transition-colors group-hover:text-[var(--av-gold)]">
                      Explore Destination
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:border-[var(--av-gold)] group-hover:bg-[var(--av-gold)] group-hover:text-black">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
