'use client'

import { useState } from 'react'
import { Clock } from 'lucide-react'
import { sampleItinerary, type ItineraryDay } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

interface Props {
  itinerary?: ItineraryDay[]
  /** when used inside a destination subpage we tweak the eyebrow copy */
  destinationName?: string
}

export default function Itinerary({ itinerary = sampleItinerary, destinationName }: Props) {
  const [active, setActive] = useState(0)
  const day = itinerary[active] ?? itinerary[0]

  return (
    <section
      id="itinerary"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The journey"
          title={destinationName ? `Your ${destinationName} Itinerary` : 'A Three-Night Itinerary'}
          subtitle="A rhythm of rest by day and wonder by night. Sample flow — final timings adapt to the season, weather and the sky’s best moments."
        />

        {/* Day tabs */}
        <ScrollReveal className="mt-12 flex flex-wrap justify-center gap-3">
          {itinerary.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                i === active
                  ? 'border-[var(--av-gold)] bg-[var(--av-gold)] text-black'
                  : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/40 hover:text-white',
              )}
            >
              {d.day}
            </button>
          ))}
        </ScrollReveal>

        {/* Active day */}
        <div key={active} className="animate-fade-in-up mt-10">
          <div className="mb-8 text-center">
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{day.title}</h3>
            <p className="mt-2 text-sm font-light text-white/60">{day.summary}</p>
          </div>

          {/* Timeline */}
          <ol className="relative mx-auto max-w-2xl space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%_-_1rem)] before:w-px before:bg-gradient-to-b before:from-[var(--av-gold)]/60 before:via-white/15 before:to-transparent before:content-[''] sm:before:left-[calc(7rem_+_7px)]">
            {day.events.map((ev, i) => (
              <li
                key={i}
                className="animate-fade-in-up relative flex flex-col gap-1 pl-8 sm:flex-row sm:gap-6 sm:pl-0"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {/* time */}
                <div className="flex items-center gap-2 sm:w-28 sm:justify-end sm:pr-2 sm:text-right">
                  <span className="hidden text-sm font-semibold text-[var(--av-gold)] sm:block">
                    {ev.time}
                  </span>
                </div>

                {/* node */}
                <span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:left-[7rem]">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-[var(--av-gold)] bg-[var(--av-deep)]" />
                </span>

                {/* content */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20">
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-white/40 sm:hidden" />
                    <span className="text-xs font-semibold text-[var(--av-gold)] sm:hidden">
                      {ev.time}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white">{ev.title}</h4>
                  <p className="mt-1 text-sm font-light text-white/60">{ev.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
