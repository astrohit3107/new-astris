import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Eyebrow, Reveal } from '@/components/program/ui'
import { clusters, guidesInCluster } from '@/lib/seo/registry'
import { guidesIndexJsonLd } from '@/lib/seo/schema'
import { SITE, absoluteUrl } from '@/lib/site-config'

/**
 * /guides — the index of the SEO acquisition layer.
 *
 * This is a static route, so it takes precedence over the catch-all that
 * serves the guides themselves. It exists for three reasons: it gives every
 * guide a crawlable path from a single page, it gives breadcrumbs a real
 * root, and it is the one discreet entry point into this layer from the site
 * chrome (a single footer link) — the primary navigation is untouched.
 */

const PATH = '/guides'
const TITLE = 'Astris Guides — Astronomy, Astrophotography and Stargazing in India'
const DESCRIPTION =
  'Practical guides from Astris Space: astronomy programmes for schools, astrophotography from Indian skies, stargazing and dark-sky travel, and astronomy experiences for properties.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
}

export default function GuidesIndex() {
  const sections = clusters.map((c) => ({ cluster: c, guides: guidesInCluster(c.id) }))
  const jsonLd = guidesIndexJsonLd(
    sections.flatMap((s) => s.guides.map((g) => ({ name: g.h1, url: absoluteUrl(`/${g.slug}`) }))),
  )

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main>
        <header className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>Guides</Eyebrow>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
                Astris guides
              </h1>
              <p className="mt-6 text-pretty text-lg leading-[1.7] text-foreground/70 sm:text-xl">
                Everything we have learned running astronomy in Indian schools, under Indian city
                skies and out where the sky comes back — written to be genuinely useful, and honest
                about what a given sky will and will not show you.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {sections.map(({ cluster, guides: clusterGuides }, i) => (
              <Reveal key={cluster.id} delay={i === 0 ? 0 : 60}>
                <section>
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-semibold tracking-[-0.01em] text-foreground sm:text-3xl">
                      <Link href={cluster.hub} className="transition-colors hover:text-accent">
                        {cluster.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-pretty text-[16px] leading-[1.7] text-foreground/65">
                      {cluster.blurb}
                    </p>
                  </div>

                  <ul className="mt-8 divide-y divide-border border-y border-border">
                    {clusterGuides.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/${g.slug}`}
                          className="group flex items-start justify-between gap-4 py-4"
                        >
                          <span>
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
                                {g.h1}
                              </span>
                              {g.isHub && (
                                <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                                  Hub
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                              {g.description}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={15}
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-foreground/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
