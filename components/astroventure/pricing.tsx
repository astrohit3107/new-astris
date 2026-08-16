'use client'

import { ArrowRight, BedDouble, Users, MapPin, GraduationCap } from 'lucide-react'
import type { Destination } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

/**
 * Fixed per-person departure pricing for the Rajasthan weekend escapes.
 * Renders nothing if the destination has no `pricing` (Himalayan expeditions
 * keep using the tailored-package flow).
 */
export default function Pricing({ destination: d }: { destination: Destination }) {
  if (!d.pricing || d.pricing.length === 0) return null

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reserve a night"
          title="Choose Your Departure"
          subtitle={`One all-in price per person from your city — accommodation and the full astronomy programme included. ${d.durationLabel ?? ''}`}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {d.pricing.map((p, i) => (
            <ScrollReveal key={p.route} delay={i * 100}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500',
                  p.featured
                    ? 'border-[var(--av-gold)]/40 bg-[var(--av-gold)]/[0.06] shadow-[0_30px_80px_-40px_var(--av-gold)]'
                    : 'border-white/12 bg-white/[0.03] hover:border-white/25',
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[var(--av-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
                    Most popular
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--av-gold)]">
                  <MapPin size={13} /> From {p.fromCity}
                </span>
                <p className="mt-2 text-sm text-white/60">{p.route}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-semibold text-white">{p.amountLabel}</span>
                  <span className="text-sm text-white/50">/ person</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75">
                    <BedDouble size={13} className="text-[var(--av-gold)]" /> {p.accommodation}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75">
                    <Users size={13} className="text-[var(--av-gold)]" /> {d.capacity ?? 30} seats / trip
                  </span>
                </div>

                <a
                  href="#register"
                  className={cn(
                    'group mt-7 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300',
                    p.featured
                      ? 'bg-[var(--av-gold)] text-black hover:brightness-110'
                      : 'bg-white text-black hover:bg-[var(--av-gold)]',
                  )}
                >
                  Book Your Spot
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Capacity + secondary (college) CTA */}
        <ScrollReveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="flex items-center gap-2 text-sm text-white/70">
              <Users size={16} className="text-[var(--av-gold)]" />
              <span>
                <span className="font-semibold text-white">{d.capacity ?? 30} participants</span> per
                departure — sociable, but small enough for real time at the telescope.
              </span>
            </p>
            <a
              href="#college"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--av-gold)]/40 px-5 py-2.5 text-sm font-semibold text-[var(--av-gold)] transition-all duration-300 hover:bg-[var(--av-gold)] hover:text-black"
            >
              <GraduationCap size={16} />
              Have a college group? Talk to us
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
