'use client'

import { ArrowUpRight, MapPin, Camera } from 'lucide-react'
import { destinations, type DestinationSlug } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'

/**
 * Cross-sell strip shown at the foot of every destination page. Surfaces the
 * other Astroventures plus the flagship Delhi Deep-Sky Astrophotography
 * Workshop, using the existing card language.
 */
export default function RelatedDestinations({ currentSlug }: { currentSlug: DestinationSlug }) {
  const others = destinations.filter((d) => d.slug !== currentSlug).slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keep exploring"
          title="Explore More Astroventures"
          subtitle="More skies, more nights under the stars — and a flagship workshop for those who want to photograph the deep sky."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {others.map((d, i) => (
            <ScrollReveal key={d.slug} delay={i * 90}>
              <a
                href={`/astroventure-nights/${d.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.name}, ${d.valley}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] to-transparent" />
                  <span className="glass absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-white/85">
                    {d.bortle}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold text-white">{d.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                    <MapPin size={12} className="text-[var(--av-gold)]" />
                    {d.locationLabel}
                  </p>
                  <p className="mt-3 text-sm font-light italic leading-relaxed text-white/55">
                    “{d.tagline}”
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-white transition-colors group-hover:text-[var(--av-gold)]">
                    Explore destination
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}

          {/* Flagship workshop cross-sell */}
          <ScrollReveal delay={others.length * 90}>
            <a
              href="/delhi-deep-sky-astrophotography-workshop"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/[0.05] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--av-gold)]/60"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--av-gold)]">
                  <Camera size={12} /> Flagship workshop
                </span>
                <h3 className="font-display mt-4 text-2xl font-semibold leading-tight text-white">
                  Deep-Sky Astrophotography from Delhi
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                  Photograph nebulae and deep-sky objects from a light-polluted city using narrowband
                  imaging. A two-night, hands-on weekend workshop.
                </p>
              </div>
              <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[var(--av-gold)]">
                View the workshop
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
