import type { Metadata } from 'next'
import {
  Telescope,
  Users,
  BookOpen,
  Compass,
  Sparkles,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Reveal, Eyebrow, SectionHead, CtaPair } from '@/components/program/ui'
import {
  ASTROTRAIN,
  ASTROTRAIN_OPPORTUNITY,
  ASTROTRAIN_CAPABILITIES,
  ASTROTRAIN_PROCESS,
  ASTROTRAIN_EXPERIENCE,
  ASTROTRAIN_CONDITIONS_NOTE,
  ASTROTRAIN_SEO,
} from '@/lib/astrotrain-data'
import { ENQUIRY, SITE_URL } from '@/lib/site-config'

const ICONS: Record<string, LucideIcon> = {
  Telescope,
  Users,
  BookOpen,
  Compass,
  Sparkles,
  LifeBuoy,
}

export const metadata: Metadata = {
  title: ASTROTRAIN_SEO.title,
  description: ASTROTRAIN_SEO.description,
  alternates: { canonical: ASTROTRAIN_SEO.path },
  openGraph: {
    type: 'website',
    title: ASTROTRAIN_SEO.title,
    description: ASTROTRAIN_SEO.description,
    url: ASTROTRAIN_SEO.path,
    images: [{ url: ASTROTRAIN.image }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ASTROTRAIN_SEO.title,
    description: ASTROTRAIN_SEO.description,
    images: [ASTROTRAIN.image],
  },
}

export default function AstroTrainPage() {
  // Same change as /astroed: the Service now references the site
  // Organization by @id instead of restating it, and the page gains the
  // BreadcrumbList it was missing. No visible change to the page.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}${ASTROTRAIN_SEO.path}#service`,
        name: 'AstroTrain — Astronomy Experiences for Properties',
        serviceType: 'Astronomy experience enablement for hospitality',
        description: ASTROTRAIN_SEO.description,
        url: `${SITE_URL}${ASTROTRAIN_SEO.path}`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'IN',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${ASTROTRAIN_SEO.path}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'AstroTrain', item: `${SITE_URL}${ASTROTRAIN_SEO.path}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="bg-background">
        {/* ───────────────────────── HERO — photography-led ───────────────────────── */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={ASTROTRAIN.image}
              alt={ASTROTRAIN.imageAlt}
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            {/* Legibility scrim — kept dark in both themes because the hero art
                is a night photograph. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/70 to-black/55" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8 lg:pb-32 lg:pt-52">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--av-gold)]">
                <span className="h-px w-6 bg-[var(--av-gold)]/60" />
                AstroTrain
              </span>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
                {ASTROTRAIN.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                {ASTROTRAIN.heroLead}
              </p>
            </Reveal>
            <Reveal delay={230} className="mt-9">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={ENQUIRY.astrotrain.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Start a Conversation
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────── THE OPPORTUNITY ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <Eyebrow>{ASTROTRAIN_OPPORTUNITY.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.14] tracking-[-0.01em] text-foreground sm:text-4xl">
                  {ASTROTRAIN_OPPORTUNITY.title}
                </h2>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-7">
                <div className="space-y-5 lg:pt-2">
                  {ASTROTRAIN_OPPORTUNITY.body.map((p) => (
                    <p key={p} className="text-pretty text-base leading-relaxed text-foreground/65">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── WHAT ASTROTRAIN DOES ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Reveal>
              <SectionHead
                eyebrow="What AstroTrain does"
                title="Equipment, people and the knowledge to run it"
                lede="The parts that make an astronomy experience work night after night — not just on the launch evening."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
              {ASTROTRAIN_CAPABILITIES.map((c, i) => {
                const Icon = ICONS[c.icon] ?? Sparkles
                return (
                  <Reveal key={c.title} delay={(i % 3) * 90}>
                    <div className="group border-t border-border py-8">
                      <Icon
                        size={20}
                        className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 text-lg font-semibold text-foreground">{c.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
                        {c.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
        <section id="how-it-works" className="scroll-mt-16 border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Reveal>
              <SectionHead eyebrow="How it works" title="From first site visit to a running programme" />
            </Reveal>

            <ol className="mt-14">
              {ASTROTRAIN_PROCESS.map((s, i) => (
                <Reveal key={s.step} delay={i * 80}>
                  <li className="grid grid-cols-1 gap-3 border-t border-border py-8 sm:grid-cols-12 sm:gap-8">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent sm:col-span-2 sm:pt-1.5">
                      {s.step}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground sm:col-span-4">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/60 sm:col-span-6 sm:pt-1">
                      {s.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────────────────── THE EXPERIENCE ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <figure className="overflow-hidden rounded-2xl border border-border">
                  <img
                    src={ASTROTRAIN.image}
                    alt="A guided stargazing session with guests at a telescope"
                    loading="lazy"
                    className="h-full max-h-[560px] w-full object-cover"
                  />
                </figure>
              </Reveal>

              <div>
                <Reveal>
                  <SectionHead eyebrow="The experience" title="What your guests actually get" />
                </Reveal>
                <div className="mt-8">
                  {ASTROTRAIN_EXPERIENCE.map((e, i) => (
                    <Reveal key={e.title} delay={(i + 1) * 90}>
                      <div className="border-t border-border py-6">
                        <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                          {e.description}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={360}>
                  <p className="mt-6 border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-foreground/50">
                    {ASTROTRAIN_CONDITIONS_NOTE}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── CTA ───────────────────────── */}
        <section>
          <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.01em] text-foreground sm:text-4xl">
                Build your astronomy experience
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/60">
                Tell us about your property and the skies above it. We’ll come back with what the
                experience could look like.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-9">
              <CtaPair
                align="center"
                primary={{
                  label: 'Talk to Astris Space',
                  href: ENQUIRY.astrotrain.whatsapp,
                  external: true,
                }}
                secondary={{ label: 'Email us', href: ENQUIRY.astrotrain.email }}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
