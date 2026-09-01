import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SITE_URL } from '@/lib/site-config'
import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'
import FirstLightCountdown from '@/components/nakshatraalay/first-light-countdown'
import FirstLightSignup from '@/components/nakshatraalay/first-light-signup'
import NakshatraalayNav from '@/components/nakshatraalay/nav'

/**
 * NAKSHATRAALAY FIRST LIGHT — the opening campaign.
 *
 * "First light" is the astronomical term for the first time a new instrument
 * is pointed at the sky. The page borrows the shape of that moment: the city,
 * the escape, the universe — then the invitation.
 *
 * No opening date, price or capacity is stated that the business has not
 * confirmed. The countdown handles the unannounced date honestly.
 */

const PATH = '/first-light'
const TITLE = 'Nakshatraalay First Light — Delhi NCR, Look Up'
const DESCRIPTION =
  'The universe has a new home in Delhi NCR. Nakshatraalay Gurgaon is opening — telescopes, dark-sky nights, astrophotography and a place to stay under the stars. Join the First Light list.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    'stargazing near Delhi',
    'stargazing near Gurgaon',
    'astronomy experience Delhi NCR',
    'astrophotography workshop Delhi',
    'weekend getaway near Delhi',
    'astronomy stay near Delhi',
  ],
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: 'Astris Space',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const CHAPTERS = [
  {
    heading: 'The city',
    body: 'Delhi NCR holds close to thirty million people, and a sky that shows perhaps a dozen stars on a good night. Not because the stars left — because we lit everything else.',
  },
  {
    heading: 'The escape',
    body: 'Close enough to leave after work on a Saturday. Far enough out that the horizon goes properly dark, and your eyes finally get the forty minutes they need to adapt.',
  },
  {
    heading: 'The universe',
    body: 'Telescopes worth queuing for. The Moon along the terminator, Jupiter’s belts, Saturn’s rings — and on the right night, something very much further away.',
  },
]

export default function FirstLightPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    isPartOf: { '@type': 'WebSite', name: 'Astris Space', url: `${SITE_URL}/` },
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <NakshatraalayNav backHref="/" backLabel="Astris Space" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero ----------------------------------------------------------- */}
      <section className="relative flex min-h-[90svh] items-center overflow-hidden px-5 py-24 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-10%,#151c31_0%,#080a12_55%,#05060a_100%)]"
        />
        <div className="relative mx-auto w-full max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
            {NAKSHATRAALAY.brand}
          </p>
          <h1 className="font-display mt-6 text-balance text-5xl font-light leading-[1.04] tracking-tight sm:text-7xl">
            First Light
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/70 sm:text-xl">
            The universe has a new home in {NAKSHATRAALAY.region}.
          </p>

          <div className="mt-14">
            <FirstLightCountdown opensAt={NAKSHATRAALAY.opensAt} />
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#join"
              className="w-full rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)] sm:w-auto"
            >
              Join the First Light list
            </a>
            <Link
              href={`/nakshatraalay/${NAKSHATRAALAY.slug}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 sm:w-auto"
            >
              See the destination
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Story ---------------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl space-y-20">
          {CHAPTERS.map((chapter) => (
            <div key={chapter.heading}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
                {chapter.heading}
              </h2>
              <p className="font-display mt-5 text-balance text-2xl font-light leading-relaxed text-white/85 sm:text-3xl">
                {chapter.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome -------------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-24 text-center sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-balance text-3xl font-light leading-tight sm:text-5xl">
            Welcome to {NAKSHATRAALAY.brand}.
            <span className="mt-3 block text-white/50">Our first home under the stars.</span>
          </h2>
        </div>
      </section>

      {/* Join ----------------------------------------------------------- */}
      <section id="join" className="scroll-mt-16 border-t border-white/10 px-5 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-light sm:text-4xl">Be there for First Light</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
              The first nights will be small. The list gets the date, and the first chance to come.
            </p>
          </div>
          <div className="mt-10">
            <FirstLightSignup />
          </div>
        </div>
      </section>
    </main>
  )
}
