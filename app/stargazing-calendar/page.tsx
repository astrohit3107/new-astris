import type { Metadata } from 'next'
import Link from 'next/link'

import { SITE_URL } from '@/lib/site-config'
import { LOCATIONS, DEFAULT_LOCATION_SLUG } from '@/lib/astronomy/observer'
import StargazingCalendar from '@/components/stargazing-calendar/calendar'
import NakshatraalayNav from '@/components/nakshatraalay/nav'

const PATH = '/stargazing-calendar'
const TITLE = 'Astris Stargazing Calendar — The Night Sky Over India'
const DESCRIPTION =
  'Moon phases, meteor showers, eclipses, conjunctions and planetary visibility, calculated for your location in India. See which nights are actually worth going out.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    'stargazing calendar India', 'astronomy calendar India', 'astronomical events India',
    'meteor shower India', 'what can I see in the sky tonight', 'planet visibility India',
  ],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** The sky changes nightly, so this is never statically frozen. */
export const dynamic = 'force-dynamic'

export default function StargazingCalendarPage() {
  const month = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).slice(0, 7)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}${PATH}#app`,
        name: 'Astris Stargazing Calendar',
        url: `${SITE_URL}${PATH}`,
        applicationCategory: 'Astronomy',
        operatingSystem: 'Any browser',
        description: DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        // Free to use; declared explicitly rather than left ambiguous.
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${PATH}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Stargazing Calendar', item: `${SITE_URL}${PATH}` },
        ],
      },
    ],
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <NakshatraalayNav backHref="/" backLabel="Astris Space" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-white/10 px-5 pb-10 pt-32 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">Astris Space</p>
          <h1 className="font-display mt-4 text-balance text-4xl font-light leading-tight sm:text-6xl">
            Stargazing Calendar
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            Your complete guide to the night sky over India — Moon phases, meteor showers, eclipses,
            planetary events and conjunctions, calculated for where you actually are.
          </p>
        </div>
      </section>

      <div className="py-10">
        <StargazingCalendar initialLocation={DEFAULT_LOCATION_SLUG} initialMonth={month} />
      </div>

      <section className="border-t border-white/10 px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-light">Calculated for these places</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            India spans 27° of latitude. An object 20° above the horizon at Kanyakumari can be below
            it at Leh, so every page below is computed from its own coordinates rather than sharing
            one national answer.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LOCATIONS.map((l) => (
              <Link
                key={l.slug}
                href={`${PATH}/${l.slug}`}
                className="rounded-full border border-white/12 px-4 py-2 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
              >
                {l.name}
              </Link>
            ))}
          </div>
          <Link href={`${PATH}/methodology`} className="mt-8 inline-block text-sm font-semibold text-[var(--av-gold)] hover:underline">
            How Astris calculates the sky →
          </Link>
        </div>
      </section>
    </main>
  )
}
