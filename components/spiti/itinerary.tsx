import { MapPin, Check } from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { spitiItinerary, SPITI } from '@/lib/spiti-data'

export default function SpitiItinerary() {
  return (
    <section id="itinerary" className="relative bg-white py-24 text-neutral-900 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading (light variant) */}
        <ScrollReveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-6 bg-amber-500/60" />
            8-Day Itinerary
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            Delhi to the roof of the Himalayas — and back
          </h2>
          <p className="mt-4 text-pretty text-base font-light leading-relaxed text-neutral-500">
            {SPITI.durationLabel} · {SPITI.dateLabel}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-300 via-neutral-200 to-transparent sm:left-[27px]" />

          <ol className="space-y-6">
            {spitiItinerary.map((d, i) => (
              <ScrollReveal as="li" key={d.day} delay={i * 50} className="relative">
                <div className="flex gap-5 sm:gap-7">
                  {/* Day marker */}
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 font-display text-sm font-semibold text-white shadow-lg ring-4 ring-white sm:h-[55px] sm:w-[55px] sm:text-lg">
                    {d.day}
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.25)] sm:p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-600">
                      <MapPin size={13} /> {d.route}
                    </p>
                    <h3 className="font-display mt-1.5 text-xl font-semibold text-neutral-900 sm:text-2xl">
                      Day {d.day} · {d.title}
                    </h3>
                    <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {d.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check size={15} className="mt-0.5 shrink-0 text-amber-500" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
