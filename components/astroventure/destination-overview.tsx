'use client'

import { Check, X, CalendarRange, Sparkles } from 'lucide-react'
import { type Destination, TAILORED_PACKAGE_NOTE } from '@/lib/astroventure-data'
import ScrollReveal from './scroll-reveal'

export default function DestinationOverview({ destination: d }: { destination: Destination }) {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <ScrollReveal direction="left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
            The destination
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
            About {d.name}
          </h2>
          <p className="mt-5 text-pretty text-base font-light leading-relaxed text-white/65">
            {d.overview}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/75">
            <CalendarRange size={15} className="text-[var(--av-gold)]" />
            <span className="font-semibold text-white">Best season:</span> {d.bestSeason}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="glass rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold text-white">Experience highlights</h3>
            <ul className="mt-5 space-y-4">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--av-gold)]">
                    <Check size={14} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/75">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="font-display flex items-center gap-2 text-xl font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--av-gold)]/15 text-[var(--av-gold)]">
                  <Check size={15} />
                </span>
                Inclusions
              </h3>
              <ul className="mt-5 space-y-3.5">
                {d.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                    <span className="text-sm leading-relaxed text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="font-display flex items-center gap-2 text-xl font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60">
                  <X size={15} />
                </span>
                Exclusions
              </h3>
              <ul className="mt-5 space-y-3.5">
                {d.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X size={16} className="mt-0.5 shrink-0 text-white/40" />
                    <span className="text-sm leading-relaxed text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-6">
          <p className="flex items-start justify-center gap-2.5 rounded-2xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.06] px-5 py-4 text-center text-sm font-light leading-relaxed text-white/80 sm:items-center">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)] sm:mt-0" />
            {TAILORED_PACKAGE_NOTE}
          </p>
        </ScrollReveal>

        {d.partner && (
          <ScrollReveal className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              In partnership with
            </p>
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
                <img
                  src={d.partner.logo}
                  alt={`${d.partner.name} logo`}
                  loading="lazy"
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <span className="font-display text-lg font-semibold text-white">{d.partner.name}</span>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
