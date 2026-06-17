'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { upcomingEvents, getDestination, type SlotEvent } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function EventCalendar() {
  // Map of ISO date -> events on that date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, SlotEvent[]>()
    const add = (key: string, ev: SlotEvent) => {
      const arr = map.get(key) ?? []
      arr.push(ev)
      map.set(key, arr)
    }
    for (const ev of upcomingEvents) {
      if (ev.flexible && ev.endDate) {
        // flexible window — every day in the range is a bookable slot.
        // Parse parts locally so keys match the calendar cells' ymd().
        const [ys, ms, ds] = ev.date.split('-').map(Number)
        const [ye, me, de] = ev.endDate.split('-').map(Number)
        const end = new Date(ye, me - 1, de)
        for (let d = new Date(ys, ms - 1, ds); d <= end; d.setDate(d.getDate() + 1)) {
          add(ymd(d), ev)
        }
      } else {
        add(ev.date, ev)
      }
    }
    return map
  }, [])

  // Start on the month of the first upcoming event
  const firstEventDate = upcomingEvents[0] ? new Date(upcomingEvents[0].date) : new Date()
  const [cursor, setCursor] = useState(
    new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1),
  )
  const [selected, setSelected] = useState<string | null>(upcomingEvents[0]?.date ?? null)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const selectedEvents = selected ? (eventsByDate.get(selected) ?? []) : []

  const monthLabel = cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plan ahead"
          title="Event Calendar"
          subtitle="Browse upcoming Astroventure Nights at a glance. Highlighted dates mark a departure — tap one to see availability."
        />

        <ScrollReveal className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Calendar */}
          <div className="glass rounded-3xl p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-white">{monthLabel}</h3>
              <div className="flex gap-2">
                <button
                  aria-label="Previous month"
                  onClick={() => setCursor(new Date(year, month - 1, 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Next month"
                  onClick={() => setCursor(new Date(year, month + 1, 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((w) => (
                <span key={w} className="py-2 text-xs font-semibold uppercase text-white/40">
                  {w}
                </span>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <span key={`e-${i}`} />
                const iso = ymd(new Date(year, month, day))
                const evs = eventsByDate.get(iso)
                const hasEvent = !!evs?.length
                const allSoldout = hasEvent && evs!.every((e) => e.status === 'soldout')
                const isSelected = selected === iso
                return (
                  <button
                    key={iso}
                    disabled={!hasEvent}
                    onClick={() => setSelected(iso)}
                    className={cn(
                      'relative flex aspect-square items-center justify-center rounded-xl text-sm transition-all duration-300',
                      hasEvent
                        ? 'cursor-pointer font-semibold text-white hover:scale-105'
                        : 'text-white/35',
                      hasEvent && !isSelected && 'bg-white/[0.04] ring-1 ring-inset ring-[var(--av-gold)]/30',
                      isSelected && 'bg-[var(--av-gold)] text-black ring-0',
                    )}
                  >
                    {day}
                    {hasEvent && !isSelected && (
                      <span
                        className={cn(
                          'absolute bottom-1 h-1 w-1 rounded-full',
                          allSoldout ? 'bg-white/40' : 'bg-[var(--av-gold)]',
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--av-gold)]" /> Available departure
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/40" /> Sold out
              </span>
            </div>
          </div>

          {/* Selected day detail */}
          <div className="lg:col-span-2">
            <div className="glass h-full rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                {selected
                  ? new Date(selected).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })
                  : 'Select a date'}
              </p>

              {selectedEvents.length ? (
                <div className="mt-4 space-y-4">
                  {selectedEvents.map((ev) => {
                    const dest = getDestination(ev.destinationSlug)
                    return (
                      <div
                        key={ev.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <h4 className="font-semibold text-white">{ev.batchName}</h4>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                          <MapPin size={12} className="text-[var(--av-gold)]" />
                          {dest?.name} · {dest?.valley}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                          <CalendarDays size={12} /> {ev.dateLabel}
                        </p>
                        <div className="mt-3 flex items-center justify-end">
                          {ev.status === 'soldout' ? (
                            <span className="text-xs font-medium text-white/40">Sold out</span>
                          ) : (
                            <a
                              href="#register"
                              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[var(--av-gold)]"
                            >
                              Book your slot <ArrowRight size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm font-light text-white/50">
                  No departures on this date. Tap a highlighted day to see availability, or browse all
                  upcoming nights above.
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
