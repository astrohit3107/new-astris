'use client'

import { CalendarDays, MapPin, Users, ArrowRight } from 'lucide-react'
import {
  upcomingEvents,
  eventsForDestination,
  getDestination,
  type DestinationSlug,
  type SlotEvent,
} from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

const STATUS: Record<SlotEvent['status'], { label: string; dot: string; text: string }> = {
  open: { label: 'Open', dot: 'bg-emerald-400', text: 'text-emerald-300' },
  filling: { label: 'Filling fast', dot: 'bg-amber-400', text: 'text-amber-300' },
  soldout: { label: 'Sold out', dot: 'bg-white/40', text: 'text-white/40' },
}

interface Props {
  slug?: DestinationSlug
}

export default function BookSlots({ slug }: Props) {
  const events = slug ? eventsForDestination(slug) : upcomingEvents

  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reserve a night"
          title="Upcoming Departures"
          subtitle="Small-group batches led by expert astronomers. Secure your seat — the best skies fill up fast."
        />

        <div className="mt-14 space-y-4">
          {events.map((ev, i) => {
            const dest = getDestination(ev.destinationSlug)
            const status = STATUS[ev.status]
            const soldout = ev.status === 'soldout'
            const pct = Math.round(
              ((ev.seatsTotal - ev.seatsAvailable) / ev.seatsTotal) * 100,
            )
            return (
              <ScrollReveal key={ev.id} delay={i * 80}>
                <div
                  className={cn(
                    'group grid grid-cols-1 items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 md:grid-cols-12 md:gap-4',
                    !soldout && 'hover:border-white/25 hover:bg-white/[0.06]',
                    soldout && 'opacity-60',
                  )}
                >
                  {/* Date block */}
                  <div className="flex items-center gap-4 md:col-span-3">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[var(--av-deep)] text-center">
                      <span className="text-[10px] uppercase tracking-widest text-[var(--av-gold)]">
                        {new Date(ev.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                      <span className="font-display text-2xl font-semibold leading-none text-white">
                        {new Date(ev.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{ev.batchName}</h3>
                      <p className="flex items-center gap-1 text-xs text-white/55">
                        <CalendarDays size={12} /> {ev.dateLabel}
                        {ev.flexible ? ' · book any dates' : ` · ${ev.nights} nights`}
                      </p>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-center gap-1.5 text-sm text-white/65 md:col-span-3">
                    <MapPin size={14} className="text-[var(--av-gold)]" />
                    {dest?.name} · {dest?.valley}
                  </div>

                  {/* Seats */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                      <Users size={12} />
                      {soldout ? 'No seats' : `${ev.seatsAvailable} of ${ev.seatsTotal} left`}
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn('h-full rounded-full', soldout ? 'bg-white/30' : 'bg-[var(--av-gold)]')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">
                    <span className={cn('flex items-center gap-1.5 text-xs font-medium', status.text)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                      {status.label}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-2 md:text-right">
                    {soldout ? (
                      <span className="inline-block w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-sm font-semibold text-white/40 md:w-auto">
                        Sold Out
                      </span>
                    ) : (
                      <a
                        href="#register"
                        className="group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)] md:w-auto"
                      >
                        Book Now
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
