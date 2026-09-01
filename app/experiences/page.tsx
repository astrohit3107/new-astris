import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SITE_URL } from '@/lib/site-config'
import { NAKSHATRAALAY, experiences, EXPERIENCE_KIND_LABEL, POLICIES } from '@/lib/nakshatraalay-data'

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

      <section className="border-b border-white/10 px-5 pb-16 pt-32 sm:px-6">
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

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {experiences.map((exp) => (
            <Link
              key={exp.slug}
              href={`${PATH}/${exp.slug}`}
              className="group flex flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/30"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                  {EXPERIENCE_KIND_LABEL[exp.kind]}
                </span>
                {exp.sample && (
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200/80">
                    Sample
                  </span>
                )}
              </div>
              <h2 className="font-display mt-3 text-xl font-semibold">{exp.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{exp.summary}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-white/40">
                  {exp.durationLabel} · {exp.fromPriceLabel ? `from ${exp.fromPriceLabel}` : 'on enquiry'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--av-gold)]">
                  Details <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-5xl text-xs leading-relaxed text-white/35">
          {POLICIES.weather}
        </p>
      </section>
    </main>
  )
}
