import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/site-config'
import { NAKSHATRAALAY, experiences, POLICIES } from '@/lib/nakshatraalay-data'
import ExperienceCard from '@/components/nakshatraalay/experience-card'
import Reveal from '@/components/nakshatraalay/reveal'

const PATH = '/experiences'
const TITLE = 'Astronomy Experiences near Delhi — Nakshatraalay Gurgaon'
const DESCRIPTION =
  'Guided stargazing, astrophotography workshops, private telescope evenings and family astronomy nights at Nakshatraalay Gurgaon, an easy drive from Delhi NCR.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    'stargazing near Delhi',
    'astronomy experience Delhi NCR',
    'astrophotography workshop Delhi',
    'telescope experience Delhi NCR',
  ],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function ExperiencesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Astronomy experiences at Nakshatraalay Gurgaon',
    itemListElement: experiences.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.title,
      url: `${SITE_URL}${PATH}/${e.slug}`,
    })),
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-white/10 px-5 pb-12 pt-28 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
            {NAKSHATRAALAY.name}
          </p>
          <h1 className="font-display mt-5 text-balance text-4xl font-light leading-tight sm:text-6xl">
            The experiences
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/65">
            Nights built around what the sky is actually doing — from a first look through a
            telescope to photographing it properly.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.slug} experience={exp} />
            ))}
          </div>

          <Reveal className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs leading-relaxed text-white/45">
              <span className="font-semibold text-white/70">Weather — </span>
              {POLICIES.weather}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
