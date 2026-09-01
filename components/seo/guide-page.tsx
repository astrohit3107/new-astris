import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Reveal, Eyebrow, Rule, CtaPair } from '@/components/program/ui'
import type { Guide, SeoSection } from '@/lib/seo/types'
import { breadcrumbsFor, relatedGuides, clusterById } from '@/lib/seo/registry'

/**
 * ============================================================================
 *  GUIDE PAGE RENDERER
 * ============================================================================
 *  One layout for every page in the SEO acquisition layer.
 *
 *  DESIGN — this deliberately reuses the existing Astris editorial primitives
 *  (`components/program/ui`), the site Header and the site Footer, so a guide
 *  reads as part of the same publication rather than a bolted-on blog. No
 *  existing component is modified to achieve that.
 *
 *  SEMANTICS — exactly one <h1>, section headings as <h2>, sub-items as <h3>,
 *  real lists and real tables. Wide tables scroll inside their own container
 *  so the page body never scrolls horizontally on a phone.
 * ========================================================================== */

/* ---------------------------------------------------------------- sections */

function ProseSection({ heading, body }: Extract<SeoSection, { kind: 'prose' }>) {
  return (
    <section className="mx-auto max-w-3xl">
      {heading && (
        <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
          {heading}
        </h2>
      )}
      <div className={heading ? 'mt-5 space-y-5' : 'space-y-5'}>
        {body.map((p, i) => (
          <p key={i} className="text-pretty text-[17px] leading-[1.75] text-foreground/75">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

function PointsSection({ heading, intro, points }: Extract<SeoSection, { kind: 'points' }>) {
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
        {heading}
      </h2>
      {intro && <p className="mt-4 text-pretty text-[17px] leading-[1.75] text-foreground/70">{intro}</p>}
      <ul className="mt-8 space-y-7">
        {points.map((p) => (
          <li key={p.title} className="border-l border-border pl-5">
            <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-pretty text-[16px] leading-[1.7] text-foreground/70">{p.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StepsSection({ heading, intro, steps }: Extract<SeoSection, { kind: 'steps' }>) {
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
        {heading}
      </h2>
      {intro && <p className="mt-4 text-pretty text-[17px] leading-[1.75] text-foreground/70">{intro}</p>}
      <ol className="mt-8 space-y-7">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-5">
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 font-mono text-xs tabular-nums text-accent"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-pretty text-[16px] leading-[1.7] text-foreground/70">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function TableSection({ heading, intro, columns, rows, note }: Extract<SeoSection, { kind: 'table' }>) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
          {heading}
        </h2>
        {intro && <p className="mt-4 text-pretty text-[17px] leading-[1.75] text-foreground/70">{intro}</p>}
      </div>
      {/* Wide data scrolls inside this container rather than widening the page. */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-foreground/[0.03]">
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/60"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-4 align-top leading-[1.6] ${
                      j === 0 ? 'font-medium text-foreground' : 'text-foreground/70'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-foreground/50">{note}</p>}
    </section>
  )
}

function CalloutSection({ title, body }: Extract<SeoSection, { kind: 'callout' }>) {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-7">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-3 text-pretty text-[16px] leading-[1.7] text-foreground/75">{body}</p>
      </div>
    </section>
  )
}

function SectionRenderer({ section }: { section: SeoSection }) {
  switch (section.kind) {
    case 'prose':
      return <ProseSection {...section} />
    case 'points':
      return <PointsSection {...section} />
    case 'steps':
      return <StepsSection {...section} />
    case 'table':
      return <TableSection {...section} />
    case 'callout':
      return <CalloutSection {...section} />
  }
}

/* ------------------------------------------------------------- breadcrumbs */

function Breadcrumbs({ guide }: { guide: Guide }) {
  const trail = breadcrumbsFor(guide)
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-foreground/50">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} aria-hidden="true" className="text-foreground/30" />}
              {isLast ? (
                <span aria-current="page" className="text-foreground/70">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* --------------------------------------------------------------------- FAQ */

function Faqs({ guide }: { guide: Guide }) {
  if (!guide.faqs?.length) return null
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
        Common questions
      </h2>
      {/* Rendered visibly, because the FAQPage schema on this page is only
          valid if the same questions and answers are on screen. */}
      <dl className="mt-8 divide-y divide-border border-y border-border">
        {guide.faqs.map((f) => (
          <div key={f.question} className="py-6">
            <dt className="text-base font-semibold text-foreground">{f.question}</dt>
            <dd className="mt-2.5 text-pretty text-[16px] leading-[1.7] text-foreground/70">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ------------------------------------------------------ related + funnel */

function RelatedResources({ guide }: { guide: Guide }) {
  const related = relatedGuides(guide)
  const experiences = guide.experiences ?? []
  if (!related.length && !experiences.length) return null

  return (
    <section className="mx-auto max-w-4xl">
      {experiences.length > 0 && (
        <div>
          <Eyebrow>Relevant Astris experiences</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {experiences.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {e.label}
                </span>
                <h3 className="mt-2 flex items-start gap-1.5 text-base font-semibold text-foreground">
                  {e.title}
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-foreground/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-foreground/65">{e.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className={experiences.length ? 'mt-14' : ''}>
          <Eyebrow>Related guides</Eyebrow>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 transition-colors"
                >
                  <span>
                    {/* Descriptive anchor text — the h1 of the target page,
                        never "read more". */}
                    <span className="text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
                      {r.h1}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                      {r.description}
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
        </div>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- the page */

export default function GuidePage({ guide }: { guide: Guide }) {
  const cluster = clusterById.get(guide.cluster)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
            <Breadcrumbs guide={guide} />
            <div className="mt-8 max-w-3xl">
              <Eyebrow>{guide.eyebrow}</Eyebrow>
              <h1 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl">
                {guide.h1}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-[1.7] text-foreground/70 sm:text-xl">
                {guide.lede}
              </p>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {guide.sections.map((section, i) => (
              <Reveal key={i} delay={i === 0 ? 0 : 60}>
                <SectionRenderer section={section} />
              </Reveal>
            ))}

            {guide.faqs?.length ? (
              <Reveal delay={60}>
                <Faqs guide={guide} />
              </Reveal>
            ) : null}
          </div>
        </div>

        {/* Commercial CTA — matched to this page's search intent, not generic */}
        <section className="border-y border-border bg-foreground/[0.02]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl">
                {guide.cta.heading}
              </h2>
              <p className="mt-4 text-pretty text-[17px] leading-[1.7] text-foreground/70">
                {guide.cta.body}
              </p>
              <div className="mt-8">
                <CtaPair primary={guide.cta.primary} secondary={guide.cta.secondary} />
              </div>
            </div>
          </div>
        </section>

        {/* Related resources + onward links */}
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RelatedResources guide={guide} />

          <Rule className="mt-16" />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/45">
            <span>
              {cluster ? (
                <>
                  Part of the{' '}
                  <Link href={cluster.hub} className="text-foreground/70 underline-offset-4 hover:underline">
                    {cluster.name.toLowerCase()}
                  </Link>{' '}
                  guides ·{' '}
                </>
              ) : null}
              <Link href="/guides" className="text-foreground/70 underline-offset-4 hover:underline">
                All Astris guides
              </Link>
            </span>
            <span>
              Last reviewed{' '}
              <time dateTime={guide.updated}>
                {new Date(guide.updated).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
