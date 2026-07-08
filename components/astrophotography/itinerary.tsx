import { MapPin, Check, Sunrise, Sun, Sunset, Moon, Clock } from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroItinerary, ASTRO } from '@/lib/astrophotography-data'

/** Time-of-day → icon, so each session reads at a glance. */
const timeIcon: Record<string, typeof Sun> = {
  Morning: Sunrise,
  Afternoon: Sun,
  Midday: Sun,
  Evening: Sunset,
  Night: Moon,
}

export default function AstroItinerary() {
  return (
    <section id="itinerary" className="relative bg-white py-24 text-neutral-900 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-6 bg-amber-500/60" />
            Detailed Itinerary
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            Six days, mapped hour by hour
          </h2>
          <p className="mt-4 text-pretty text-base font-light leading-relaxed text-neutral-500">
            {ASTRO.durationLabel} · {ASTRO.locationsLabel}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-300 via-neutral-200 to-transparent sm:left-[27px]" />

          <ol className="space-y-6">
            {astroItinerary.map((d, i) => (
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

                    <div className="mt-5 space-y-5">
                      {d.sessions.map((s) => {
                        const Icon = timeIcon[s.time] ?? Clock
                        return (
                          <div key={s.time + s.title} className="relative pl-8">
                            <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                              <Icon size={13} />
                            </span>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-600">
                              {s.time}
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-neutral-900">
                              {s.title}
                            </p>
                            {s.body && (
                              <p className="mt-1 text-sm font-light leading-relaxed text-neutral-500">
                                {s.body}
                              </p>
                            )}
                            {s.points && s.points.length > 0 && (
                              <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                                {s.points.map((p) => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-2 text-sm text-neutral-600"
                                  >
                                    <Check size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )
                      })}
                    </div>
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
