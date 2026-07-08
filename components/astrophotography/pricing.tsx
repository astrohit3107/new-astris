import { Check, ArrowRight, IndianRupee, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroPricing, ASTRO, ASTRO_RENTAL } from '@/lib/astrophotography-data'

export default function AstroPricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-[var(--av-nebula)] opacity-12 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-[var(--av-aurora)] opacity-10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expedition Pricing"
          title={<>Choose your starting point</>}
          subtitle="Two all-inclusive packages. Reserve early — seats and rental gear are limited."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {astroPricing.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 90} direction="up">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 sm:p-8',
                  p.featured
                    ? 'border-[var(--av-gold)]/50 bg-gradient-to-b from-[var(--av-gold)]/[0.10] to-white/[0.02] shadow-[0_20px_70px_-30px_var(--av-gold)]'
                    : 'border-white/12 bg-white/[0.03] hover:border-white/25',
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[var(--av-gold)] px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                    <Star size={12} /> Most Complete
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  {p.route}
                </p>
                <p className="font-display mt-3 flex items-center text-4xl font-semibold text-white sm:text-5xl">
                  <IndianRupee size={30} className="text-[var(--av-gold)]" />
                  {p.amountLabel.replace('₹', '')}
                </p>
                <p className="mt-2 text-sm text-white/55">{p.tagline}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--av-gold)]/15 text-[var(--av-gold)]">
                        <Check size={12} />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>

                <a
                  href={ASTRO.bookingPath}
                  className={cn(
                    'group mt-8 flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300',
                    p.featured
                      ? 'bg-[var(--av-gold)] text-black hover:shadow-[0_14px_44px_-10px_var(--av-gold)]'
                      : 'bg-white text-black hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)]',
                  )}
                >
                  Reserve Your Seat
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Equipment rental note */}
        <ScrollReveal direction="up" delay={80}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="font-display text-lg font-semibold text-white">Equipment Rental</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
              Professional cameras, lenses, tripods, star trackers and accessories can be rented at{' '}
              <span className="font-semibold text-[var(--av-gold)]">{ASTRO_RENTAL.priceLabel}</span>.
              Rental charges are additional and depend on the equipment selected. Equipment
              availability is limited.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
