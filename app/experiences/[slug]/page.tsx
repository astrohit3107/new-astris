import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Backpack, Users, Clock } from 'lucide-react'

import { SITE_URL } from '@/lib/site-config'
import {
  NAKSHATRAALAY,
  experiences,
  getExperience,
  EXPERIENCE_KIND_LABEL,
  POLICIES,
} from '@/lib/nakshatraalay-data'
import EnquiryWizard from '@/components/nakshatraalay/enquiry-wizard'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return experiences.map((e) => ({ slug: e.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const exp = getExperience(slug)
  if (!exp) return { title: 'Not found' }

  const title = `${exp.title} — ${NAKSHATRAALAY.name}`
  const description = exp.description ?? exp.summary
  return {
    title,
    description,
    alternates: { canonical: `/experiences/${exp.slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/experiences/${exp.slug}`,
      siteName: 'Astris Space',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ExperiencePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const exp = getExperience(slug)
  if (!exp) notFound()

  const url = `${SITE_URL}/experiences/${exp.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // A repeating experience with no fixed date is an offering, not an
        // Event — claiming Event without a startDate would be invalid markup.
        '@type': 'Product',
        name: exp.title,
        description: exp.description ?? exp.summary,
        url,
        brand: { '@type': 'Brand', name: 'Astris Space' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Experiences', item: `${SITE_URL}/experiences` },
          { '@type': 'ListItem', position: 2, name: exp.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-white/10 px-5 pb-14 pt-32 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          >
            <ArrowLeft size={15} /> All experiences
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
              {EXPERIENCE_KIND_LABEL[exp.kind]}
            </span>
            {exp.sample && (
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200/80">
                Sample programme
              </span>
            )}
          </div>

          <h1 className="font-display mt-3 text-balance text-4xl font-light leading-tight sm:text-5xl">
            {exp.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/70">
            {exp.description ?? exp.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-white/70">
              <Clock size={12} className="text-[var(--av-gold)]" /> {exp.durationLabel}
            </span>
            {exp.groupSizeLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-white/70">
                <Users size={12} className="text-[var(--av-gold)]" /> {exp.groupSizeLabel}
              </span>
            )}
            {exp.skillLevel && (
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-white/70">
                {exp.skillLevel}
              </span>
            )}
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-white/70">
              {exp.fromPriceLabel ? `From ${exp.fromPriceLabel}` : 'Pricing on enquiry'}
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="space-y-12">
            {exp.runOfNight && exp.runOfNight.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-light">How the night runs</h2>
                <ol className="mt-6 space-y-5 border-l border-white/12 pl-6">
                  {exp.runOfNight.map((item) => (
                    <li key={item.title} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.72rem] top-1.5 h-2 w-2 rounded-full bg-[var(--av-gold)]"
                      />
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--av-gold)]">
                        {item.time}
                      </p>
                      <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="grid gap-8 sm:grid-cols-2">
              {exp.includes && exp.includes.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-semibold">What&rsquo;s included</h2>
                  <ul className="mt-4 space-y-2.5">
                    {exp.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white/65">
                        <Check size={15} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.bring && exp.bring.length > 0 && (
                <div>
                  <h2 className="font-display flex items-center gap-2 text-lg font-semibold">
                    <Backpack size={16} className="text-[var(--av-gold)]" /> What to bring
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {exp.bring.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white/65">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {exp.equipmentProvided && exp.equipmentProvided.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-semibold">Equipment we provide</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {exp.equipmentProvided.join(' · ')}
                </p>
              </div>
            )}

            {exp.ageGuidance && (
              <p className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-sm text-white/60">
                {exp.ageGuidance}
              </p>
            )}

            <div className="space-y-3 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/40">
              <p><span className="font-semibold text-white/60">Weather — </span>{POLICIES.weather}</p>
              <p><span className="font-semibold text-white/60">Changes — </span>{POLICIES.cancellation}</p>
            </div>
          </div>

          {/* Enquiry */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <EnquiryWizard initialExperienceSlug={exp.slug} />
          </div>
        </div>
      </section>
    </main>
  )
}
