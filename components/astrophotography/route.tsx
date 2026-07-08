import { Fragment } from 'react'
import { MapPin, ArrowRight, ArrowDown } from 'lucide-react'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroRoute, ASTRO } from '@/lib/astrophotography-data'

export default function AstroRoute() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expedition Route"
          title={<>Across the roof of the world</>}
          subtitle={`A high-altitude loop through ${ASTRO.region} — from Leh to India’s darkest skies and back.`}
        />

        {/* Route — horizontal on desktop, vertical on mobile */}
        <div className="mt-16 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-2 lg:gap-4">
          {astroRoute.map((stop, i) => (
            <Fragment key={`${stop}-${i}`}>
              <ScrollReveal
                delay={i * 120}
                direction="scale"
                className="sm:flex-1"
              >
                <div className="group relative flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06] sm:flex-col sm:gap-2 sm:px-4 sm:py-6 sm:text-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--av-gold)]/12 ring-1 ring-[var(--av-gold)]/25">
                    <MapPin size={18} className="text-[var(--av-gold)]" />
                  </span>
                  <div className="sm:mt-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                      {i === 0 ? 'Start' : i === astroRoute.length - 1 ? 'Finish' : `Stop ${i}`}
                    </p>
                    <p className="font-display text-lg font-semibold text-white">{stop}</p>
                  </div>
                </div>
              </ScrollReveal>

              {i < astroRoute.length - 1 && (
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center text-[var(--av-gold)]/50"
                >
                  <ArrowDown size={18} className="animate-float-slow sm:hidden" />
                  <ArrowRight size={18} className="hidden animate-float-slow sm:block" />
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
