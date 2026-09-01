import type { Metadata } from 'next'
import {
  Building2,
  BookOpen,
  Telescope,
  Rocket,
  Orbit,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Reveal, Eyebrow, SectionHead, Rule, CtaPair } from '@/components/program/ui'
import {
  ASTROED,
  ASTROED_IDEA,
  ASTROED_OFFERINGS,
  ASTROED_CURRICULUM,
  ASTROED_EXPERIENCE,
  ASTROED_OUTCOMES,
  ASTROED_SEO,
} from '@/lib/astroed-data'
import { ENQUIRY, SITE_URL } from '@/lib/site-config'

const ICONS: Record<string, LucideIcon> = {
  Building2,
  BookOpen,
  Telescope,
  Rocket,
  Orbit,
  Sparkles,
  GraduationCap,
}

export const metadata: Metadata = {
  title: ASTROED_SEO.title,
  description: ASTROED_SEO.description,
  alternates: { canonical: ASTROED_SEO.path },
  openGraph: {
    type: 'website',
    title: ASTROED_SEO.title,
    description: ASTROED_SEO.description,
    url: ASTROED_SEO.path,
    images: [{ url: ASTROED.image }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ASTROED_SEO.title,
    description: ASTROED_SEO.description,
    images: [ASTROED.image],
  },
}

export default function AstroEdPage() {
  // The Service was previously emitted alone, with the provider as a loose
  // Organization node. It now sits in a @graph that references the
  // Organization declared once in app/layout.tsx by @id, so the whole site
  // resolves to a single entity — and carries a BreadcrumbList, which this
  // page was missing. Nothing visible on the page changes.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}${ASTROED_SEO.path}#service`,
        name: 'AstroEd — Space Lab & Astronomy Curriculum for Schools',
        serviceType: 'School astronomy programme',
        description: ASTROED_SEO.description,
        url: `${SITE_URL}${ASTROED_SEO.path}`,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'IN',
        audience: { '@type': 'EducationalAudience', educationalRole: 'school' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${ASTROED_SEO.path}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'AstroEd', item: `${SITE_URL}${ASTROED_SEO.path}` },
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
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>AstroEd</Eyebrow>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
                  Space Lab + Astronomy Curriculum for Schools
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
                  {ASTROED.heroLead}
                </p>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-foreground/55">
                  {ASTROED.heroSupport}
                </p>
              </Reveal>
              <Reveal delay={220} className="mt-9">
                <CtaPair
                  primary={{
                    label: 'Bring AstroEd to Your School',
                    href: ENQUIRY.astroed.whatsapp,
                    external: true,
                  }}
                  secondary={{ label: 'Explore the Curriculum', href: '#curriculum' }}
                />
              </Reveal>
            </div>

            <Reveal delay={160} className="lg:col-span-5">
              <figure className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={ASTROED.image}
                  alt={ASTROED.imageAlt}
                  fetchPriority="high"
                  className="h-full max-h-[560px] w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────── THE IDEA ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <Eyebrow>{ASTROED_IDEA.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.14] tracking-[-0.01em] text-foreground sm:text-4xl">
                  {ASTROED_IDEA.title}
                </h2>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-7">
                <div className="space-y-5 lg:pt-2">
                  {ASTROED_IDEA.body.map((p) => (
                    <p key={p} className="text-pretty text-base leading-relaxed text-foreground/65">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── WHAT SCHOOLS GET ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Reveal>
              <SectionHead
                eyebrow="What schools get"
                title="The programme, end to end"
                lede="Infrastructure, curriculum and delivery — designed to run through the academic year rather than as a one-off visit."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
              {ASTROED_OFFERINGS.map((o, i) => {
                const Icon = ICONS[o.icon] ?? Sparkles
                return (
                  <Reveal key={o.title} delay={(i % 3) * 90}>
                    <div className="group border-t border-border py-8">
                      <Icon
                        size={20}
                        className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 text-lg font-semibold text-foreground">{o.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
                        {o.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────────────────── CURRICULUM ───────────────────────── */}
        <section id="curriculum" className="scroll-mt-16 border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Reveal>
              <SectionHead
                eyebrow="Yearly curriculum"
                title="An academic progression, not a lecture series"
                lede="Six stages across the school year. Each one builds on what students can already find in the sky."
              />
            </Reveal>

            <ol className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {ASTROED_CURRICULUM.map((c, i) => (
                <Reveal key={c.stage} delay={(i % 3) * 90}>
                  <li className="h-full border-t border-border py-8 pr-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
                      {c.stage}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
                      {c.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <p className="mt-12 max-w-2xl text-sm leading-relaxed text-foreground/50">
                The detailed syllabus, session count and grade-wise mapping are prepared with your
                school during planning, around your academic calendar.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────── SPACE LAB ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <figure className="overflow-hidden rounded-2xl border border-border">
                  <img
                    src={ASTROED.image}
                    alt="Students working with astronomy equipment during an AstroEd session"
                    loading="lazy"
                    className="h-full max-h-[520px] w-full object-cover"
                  />
                </figure>
              </Reveal>
              <Reveal delay={120}>
                <Eyebrow>The Space Lab</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.14] tracking-[-0.01em] text-foreground sm:text-4xl">
                  Equipment that stays in the building
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/65">
                  The Space Lab is the physical home of the programme — a dedicated astronomy space
                  with professional telescopes for night-sky and safe solar observation, room for
                  hands-on work, and the equipment students need to run their own projects.
                </p>
                <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/65">
                  Because it lives in the school, observation is not limited to one scheduled
                  evening. It becomes part of how science is taught.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── STUDENT EXPERIENCE ───────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Reveal>
              <SectionHead
                eyebrow="Student experience"
                title="What it looks like from a student’s side"
              />
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-px md:grid-cols-2">
              {ASTROED_EXPERIENCE.map((e, i) => (
                <Reveal key={e.title} delay={(i % 2) * 100}>
                  <div className="border-t border-border py-8">
                    <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
                      {e.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── OUTCOMES ───────────────────────── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <SectionHead eyebrow="Outcomes" title="What the school ends up with" />
              </Reveal>
              <Reveal delay={120} className="lg:col-span-7">
                <ul className="lg:pt-2">
                  {ASTROED_OUTCOMES.map((o) => (
                    <li
                      key={o}
                      className="flex gap-4 border-t border-border py-5 text-base leading-relaxed text-foreground/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── CTA ───────────────────────── */}
        <section>
          <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.01em] text-foreground sm:text-4xl">
                Build a Space Lab at your school
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/60">
                Tell us about your school and we’ll put together a programme around your grades,
                facilities and academic calendar.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-9">
              <CtaPair
                align="center"
                primary={{
                  label: 'Talk to Astris Space',
                  href: ENQUIRY.astroed.whatsapp,
                  external: true,
                }}
                secondary={{ label: 'Email us', href: ENQUIRY.astroed.email }}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
