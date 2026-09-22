import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SITE_URL } from '@/lib/site-config'
import { LOCATIONS, getLocation } from '@/lib/astronomy/observer'
import { nightFor } from '@/lib/astronomy/night'
import { eventsFor } from '@/lib/astronomy/events'
import StargazingCalendar from '@/components/stargazing-calendar/calendar'
import NakshatraalayNav from '@/components/nakshatraalay/nav'

type Params = { location: string }

export function generateStaticParams(): Params[] {
  return LOCATIONS.map((l) => ({ location: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { location } = await params
  const l = getLocation(location)
  if (!l) return {}
  const title = `Stargazing Calendar for ${l.name} — Moon, Meteor Showers & Planets`
  const description = `What is visible in the night sky from ${l.name}, ${l.region}: moon phases, meteor showers, eclipses and planet visibility, calculated for ${l.latitude.toFixed(2)}°N ${l.longitude.toFixed(2)}°E.`
  return {
    title, description,
    alternates: { canonical: `/stargazing-calendar/${l.slug}` },
    openGraph: { type: 'website', title, description, siteName: 'Astris Space' },
  }
}

export const dynamic = 'force-dynamic'

export default async function LocationCalendarPage({ params }: { params: Promise<Params> }) {
  const { location } = await params
  const l = getLocation(location)
  if (!l) notFound()

  const month = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).slice(0, 7)
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })

  // Genuinely location-specific facts, so this is not the same page with the
  // city name swapped — the numbers below differ for every site in the list.
  const tonight = nightFor(l, today)
  const upcoming = eventsFor(l, new Date(), 90)
    .filter((e) => e.visibility.state === 'visible' || e.visibility.state === 'partial')
    .slice(0, 6)

  const hrs = tonight.twilight.darknessMinutes
    ? `${Math.floor(tonight.twilight.darknessMinutes / 60)}h ${tonight.twilight.darknessMinutes % 60}m`
    : 'none'

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <NakshatraalayNav backHref="/stargazing-calendar" backLabel="Stargazing Calendar" />

      <section className="border-b border-white/10 px-5 pb-10 pt-32 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">{l.region}</p>
          <h1 className="font-display mt-4 text-balance text-4xl font-light leading-tight sm:text-5xl">
            The night sky over {l.name}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            Calculated for {l.latitude.toFixed(4)}°N, {l.longitude.toFixed(4)}°E at {l.elevation} m.
            {l.note ? ` ${l.note}` : ''}
          </p>
          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <dt className="text-[10px] uppercase tracking-wider text-white/40">Darkness tonight</dt>
              <dd className="mt-1 text-sm text-white/85">{hrs}</dd>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <dt className="text-[10px] uppercase tracking-wider text-white/40">Moon</dt>
              <dd className="mt-1 text-sm text-white/85">
                {tonight.moon.phaseName}, {tonight.moon.illumination.toFixed(0)}%
              </dd>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <dt className="text-[10px] uppercase tracking-wider text-white/40">Planets up</dt>
              <dd className="mt-1 text-sm text-white/85">
                {tonight.planets.filter((p) => p.visible && !p.telescopeOnly).map((p) => p.name).join(', ') || 'None'}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="py-10">
        <StargazingCalendar initialLocation={l.slug} initialMonth={month} />
      </div>

      {upcoming.length > 0 && (
        <section className="border-t border-white/10 px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-light">Next 90 nights from {l.name}</h2>
            <ul className="mt-5 space-y-2.5">
              {upcoming.map((e) => (
                <li key={e.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-white">
                    {e.name}
                    <span className="ml-2 text-xs font-normal text-white/40">
                      {new Date(`${e.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })}
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{e.visibility.detail}</p>
                </li>
              ))}
            </ul>
            <Link href="/stargazing-calendar/methodology" className="mt-7 inline-block text-sm font-semibold text-[var(--av-gold)] hover:underline">
              How these are calculated →
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
