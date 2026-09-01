import type { Metadata } from 'next'
import Link from 'next/link'
import { Moon, ArrowRight } from 'lucide-react'

import { SITE_URL, whatsappHref } from '@/lib/site-config'
import {
  NAKSHATRAALAY,
  upcomingNights as scheduled,
  getExperience,
  isClosed,
} from '@/lib/nakshatraalay-data'
import { bestNights, upcomingNights } from '@/lib/sky-calendar'

const PATH = '/sky-calendar'
const TITLE = 'Sky Calendar — The Best Nights to Look Up near Delhi'
const DESCRIPTION =
  'The darkest upcoming nights near Delhi NCR, scored by moonlight. Find a moonless weekend for deep-sky observing and astrophotography at Nakshatraalay Gurgaon.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: ['dark sky calendar India', 'new moon dates', 'stargazing near Delhi', 'best nights stargazing'],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** Recomputed per request so the calendar is never stale. */
export const dynamic = 'force-dynamic'

const BAND_STYLE: Record<string, string> = {
  Excellent: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  Good: 'text-[var(--av-gold)] border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10',
  Fair: 'text-white/70 border-white/20 bg-white/5',
  Bright: 'text-white/45 border-white/12 bg-white/[0.03]',
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  })
}

export default function SkyCalendarPage() {
  const best = bestNights(6)
  const next30 = upcomingNights(30)
  const planned = scheduled()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-white/10 px-5 pb-14 pt-32 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
            {NAKSHATRAALAY.region}
          </p>
          <h1 className="font-display mt-5 text-balance text-4xl font-light leading-tight sm:text-6xl">
            The best nights to look up
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            Don&rsquo;t pick a date and hope. Pick the night the Moon gets out of the way.
          </p>
        </div>
      </section>

      {/* Best nights */}
      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-light sm:text-3xl">Darkest nights coming up</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Weekends first, because those are the ones you can actually take.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {best.map((night) => (
              <article key={night.date} className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-xl font-semibold">{formatDate(night.date)}</p>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${BAND_STYLE[night.band]}`}>
                    {night.band}
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-white/55">
                  <Moon size={13} className="text-[var(--av-gold)]" />
                  {night.moon.name} · {Math.round(night.moon.illumination * 100)}% lit
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {night.bestFor.map((b) => (
                    <span key={b} className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70">
                      {b}
                    </span>
                  ))}
                </div>
                {isClosed(night.date) ? (
                  <p className="mt-5 text-xs font-semibold text-white/40">Fully booked</p>
                ) : (
                  <a
                    href={whatsappHref(
                      `Hello Astris Space — I'd like to come to ${NAKSHATRAALAY.name} on ${formatDate(night.date)} (${night.date}). Is that night available?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--av-gold)] hover:underline"
                  >
                    Ask about this night <ArrowRight size={12} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Planned nights, or an honest empty state */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-light sm:text-3xl">Scheduled nights</h2>
          {planned.length > 0 ? (
            <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/12">
              {planned.map((n) => {
                const exp = getExperience(n.experienceSlug)
                return (
                  <li key={`${n.date}-${n.experienceSlug}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <p className="font-semibold">{formatDate(n.date)}</p>
                      <p className="text-sm text-white/55">{exp?.title ?? n.experienceSlug}{n.note ? ` · ${n.note}` : ''}</p>
                    </div>
                    <Link href={`/experiences/${n.experienceSlug}`} className="text-xs font-semibold text-[var(--av-gold)] hover:underline">
                      Details
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="mt-6 max-w-2xl rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-white/55">
              Dated nights open with First Light.{' '}
              <Link href="/first-light" className="font-semibold text-[var(--av-gold)] hover:underline">
                Join the list
              </Link>{' '}
              and you&rsquo;ll get them first — or pick one of the dark nights above and message us.
            </p>
          )}
        </div>
      </section>

      {/* Next 30 nights */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-light sm:text-3xl">The next 30 nights</h2>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {next30.map((n) => (
              <div
                key={n.date}
                className={`rounded-xl border px-3 py-3 text-center ${BAND_STYLE[n.band]}`}
                title={`${n.moon.name}, ${Math.round(n.moon.illumination * 100)}% illuminated`}
              >
                <p className="text-[11px] font-medium">{formatDate(n.date)}</p>
                <p className="mt-1 text-lg font-light tabular-nums">{n.darkScore}</p>
                <p className="text-[9px] uppercase tracking-wide opacity-70">dark</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/35">
            The score reflects <strong className="font-semibold text-white/55">moonlight only</strong> —
            a bright Moon washes out everything faint, and it is the one thing that can be computed
            reliably months ahead. It is not a weather forecast: cloud and haze decide what you
            actually see, and we check those close to the night. A bright-Moon night is still a
            wonderful night to look at the Moon.
          </p>
        </div>
      </section>
    </main>
  )
}
