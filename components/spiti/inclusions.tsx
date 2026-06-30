import { Check, Minus } from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { spitiInclusions, spitiExclusions } from '@/lib/spiti-data'

export default function SpitiInclusions() {
  return (
    <section className="relative bg-white py-24 text-neutral-900 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-6 bg-amber-500/60" />
            Inclusions &amp; Exclusions
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            Clear, all-in, no surprises
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Inclusions */}
          <ScrollReveal direction="left">
            <div className="h-full rounded-3xl border border-neutral-200 bg-neutral-50 p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-neutral-900">What’s included</h3>
              <ul className="mt-6 space-y-3">
                {spitiInclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Exclusions */}
          <ScrollReveal direction="right" delay={80}>
            <div className="h-full rounded-3xl border border-neutral-200 bg-neutral-50 p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-neutral-900">Not included</h3>
              <ul className="mt-6 space-y-3">
                {spitiExclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-500">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                      <Minus size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-neutral-400">
                Optional travel insurance is strongly recommended. Anything not explicitly listed
                under Inclusions is not part of the package.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
