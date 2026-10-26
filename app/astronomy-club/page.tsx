import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Starfield from '@/components/astronomy-club/starfield'
import ChapterNav from '@/components/astronomy-club/chapter-nav'
import Lenses from '@/components/astronomy-club/lenses'
import HourDial from '@/components/astronomy-club/hour-dial'
import Cycle from '@/components/astronomy-club/cycle'
import YearPlan from '@/components/astronomy-club/year-plan'
import Syllabus from '@/components/astronomy-club/syllabus'
import TakeHome from '@/components/astronomy-club/take-home'
import Sunrise from '@/components/astronomy-club/sunrise'
import DemoForm from '@/components/astronomy-club/demo-form'
import Share from '@/components/astronomy-club/share'
import { Reveal, CountUp, TrackedLink } from '@/components/astronomy-club/motion'
import { Crescent, StarGlyph } from '@/components/astronomy-club/art'
import { AnswerMark, ConstraintIcon } from '@/components/astronomy-club/constraints'
import {
  ANSWER,
  BANDS,
  CHANGES,
  CLOSE,
  CLUB_PATH,
  CLUB_KIT_PDF,
  CLUB_PDF,
  CLUB_PHONE_LABEL,
  CLUB_SEO,
  CLUB_WHATSAPP,
  CYCLE,
  FAQS,
  GAP,
  HERO,
  HOUR,
  KPIS,
  LEVELS,
  PATH,
  SAFETY,
  SPARK,
  START,
  SYLLABUS,
  TAKE_HOME,
  WHY,
  YEAR_PLAN,
} from '@/lib/astronomy-club-data'
import { SITE_URL, telHref } from '@/lib/site-config'
import './club.css'

/*
 * ============================================================================
 *  /astronomy-club — the Astris Astronomy Club, told as a night-to-day story
 * ============================================================================
 *  Nineteen scenes in six chapters. The page opens in deep space, brightens
 *  into daylight panels for the practical sections (fees, how to start), and
 *  returns to the night sky for the final call to action.
 *
 *  All copy lives in lib/astronomy-club-data.ts. The site Header and Footer
 *  are unchanged; inside the page the story uses its own type (Bricolage
 *  Grotesque + Instrument Sans, self-hosted by next/font) and brand tokens.
 *
 *  Motion: CSS sticky pinning + small scroll-progress hooks, no animation
 *  library. Under prefers-reduced-motion every scene is a static section in
 *  its final state. Phones get stacked scenes, never pinned ones.
 * ========================================================================== */

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-bricolage',
})
const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  title: { absolute: CLUB_SEO.title },
  description: CLUB_SEO.description,
  keywords: CLUB_SEO.keywords,
  alternates: { canonical: CLUB_PATH },
  openGraph: {
    type: 'website',
    title: CLUB_SEO.title,
    description: CLUB_SEO.description,
    url: CLUB_PATH,
  },
  twitter: {
    card: 'summary_large_image',
    title: CLUB_SEO.title,
    description: CLUB_SEO.description,
  },
}

const PAGE_URL = `${SITE_URL}${CLUB_PATH}`

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${PAGE_URL}#service`,
        name: 'Astris Astronomy Club for schools',
        serviceType: 'School astronomy club',
        description: CLUB_SEO.description,
        url: PAGE_URL,
        // The Organization is declared once, in app/layout.tsx.
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          ...CLUB_SEO.areaServed.map((name) => ({ '@type': 'City', name })),
        ],
        audience: { '@type': 'EducationalAudience', educationalRole: 'school' },
      },
      {
        '@type': 'Course',
        '@id': `${PAGE_URL}#course`,
        name: 'Astris Astronomy Club',
        description: CLUB_SEO.description,
        url: PAGE_URL,
        provider: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
        educationalLevel: 'Grades 4–12',
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'onsite',
          courseWorkload: 'PT37H',
          location: {
            '@type': 'Place',
            name: 'The school’s own campus',
            address: { '@type': 'PostalAddress', addressCountry: 'IN' },
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'AstroEd', item: `${SITE_URL}/astroed` },
          { '@type': 'ListItem', position: 3, name: 'Astronomy Club', item: PAGE_URL },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

/* ------------------------------------------------------------- page bits */

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

function DemoButton({ from, children = 'Book a free demo' }: { from: string; children?: string }) {
  return (
    <TrackedLink href="#book-demo" event="club_cta_demo_click" eventProps={{ from }} className="club-btn-primary justify-center">
      {children}
      <span aria-hidden="true">→</span>
    </TrackedLink>
  )
}

function PdfButton({ from, className = '' }: { from: string; className?: string }) {
  return (
    <TrackedLink
      href={CLUB_PDF}
      download
      event="club_pdf_download"
      eventProps={{ doc: 'proposal', from }}
      className={`club-btn-ghost justify-center ${className}`}
    >
      Download the proposal (PDF)
    </TrackedLink>
  )
}

function Chapter({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={`ch-${id}`} data-chapter={id} className="scroll-mt-14">
      {children}
    </div>
  )
}

/* Level badges as a rising constellation (Scene 8). */
const LEVEL_POINTS = [
  { x: 60, y: 150 },
  { x: 260, y: 110 },
  { x: 460, y: 70 },
  { x: 660, y: 30 },
]

export default function AstronomyClubPage() {
  return (
    <>
      <JsonLd />
      <Header />

      <div className={`club relative ${bricolage.variable} ${instrument.variable}`}>
        <Starfield />
        <ChapterNav />

        <main className="relative">
          {/* =========================================== CHAPTER 1 · THE QUESTION */}
          <Chapter id="question">
            {/* ---------------------------------------------- Scene 1 · hero */}
            <section data-sky aria-labelledby="club-title" className="relative z-10">
              <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center px-4 pb-24 text-center">
                <span className="club-star" aria-hidden="true" />
                <p className="mt-10 text-lg font-medium text-white/75 sm:text-2xl">
                  <span className="club-type">{HERO.kicker}</span>
                </p>
                <p className="club-question club-display mt-4 text-[clamp(3.25rem,11vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                  {HERO.question}
                </p>
                <a
                  href="#club-title"
                  className="absolute bottom-8 flex flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 hover:text-white"
                >
                  <span className="club-cue" aria-hidden="true" />
                  Scroll
                </a>
              </div>

              <div className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-28 pt-6 text-center sm:pb-36">
                <Reveal>
                  <img
                    src="/brand/astris-logo-white.png"
                    width={569}
                    height={379}
                    alt="Astris Space"
                    className="mx-auto h-20 w-auto sm:h-24"
                  />
                </Reveal>
                <Reveal delay={120}>
                  <h1
                    id="club-title"
                    className="club-display mt-6 scroll-mt-24 text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
                  >
                    {HERO.title}
                  </h1>
                </Reveal>
                <Reveal delay={220}>
                  <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/80 sm:text-xl">{HERO.subtitle}</p>
                </Reveal>
                <Reveal delay={320} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <DemoButton from="hero" />
                  <PdfButton from="hero" />
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 2 · spark */}
            <section data-sky aria-labelledby="spark-h" className="relative z-10 py-24 sm:py-32">
              <div className={`${wrap} grid grid-cols-1 items-center gap-12 lg:grid-cols-12`}>
                <Reveal className="lg:col-span-5">
                  <Crescent className="h-32 w-32 sm:h-40 sm:w-40" />
                  <h2 id="spark-h" className="club-kicker mt-8">
                    The spark
                  </h2>
                  <p className="club-display mt-3 text-5xl font-extrabold leading-none sm:text-7xl">
                    <CountUp value={23} pad={2} /> August 2023
                  </p>
                </Reveal>
                <div className="space-y-6 lg:col-span-7">
                  {SPARK.map((line, i) => (
                    <Reveal key={line} delay={i * 180} as="p" className={i === SPARK.length - 1 ? 'club-display text-3xl font-bold text-[#E8A33D] sm:text-4xl' : 'text-pretty text-xl text-white/80 sm:text-2xl'}>
                      {i === 1 ? (
                        <>
                          India now celebrates <strong className="text-white">National Space Day</strong> on 23 August.
                        </>
                      ) : i === 2 ? (
                        <>
                          <strong className="text-white">Aditya-L1</strong>, India’s solar observatory, watches the Sun from about{' '}
                          <strong className="text-white">1.5 million km</strong> away.
                        </>
                      ) : (
                        line
                      )}
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 3 · the gap */}
            <section data-sky aria-labelledby="gap-h" className="relative z-10 py-24 sm:py-32">
              {/* The sky dims. */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040C]/70 to-transparent" />
              <div className={`relative ${wrap}`}>
                <Reveal>
                  <p className="club-kicker">The gap</p>
                  <h2 id="gap-h" className="club-h2 mt-4 max-w-3xl">
                    {GAP.headline}
                  </h2>
                </Reveal>
                <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {GAP.constraints.map((c, i) => (
                    <Reveal as="li" key={c.title} from={i % 2 ? 'right' : 'left'} delay={i * 140}>
                      <div className="flex h-full gap-5 rounded-3xl border border-white/10 bg-[#0E1A3A]/70 p-6 backdrop-blur-sm sm:p-7">
                        <ConstraintIcon index={i} />
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            <span className="mr-2 text-white/40">{i + 1}</span>
                            {c.title}
                          </h3>
                          <p className="mt-2 text-pretty text-white/75">{c.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={200}>
                  <p className="club-display mx-auto mt-16 max-w-3xl text-balance text-center text-2xl font-semibold text-white sm:text-3xl">
                    “{GAP.closing}”
                  </p>
                </Reveal>
              </div>
            </section>
          </Chapter>

          {/* =========================================== CHAPTER 2 · THE ANSWER */}
          <Chapter id="answer">
            {/* ---------------------------------------------- Scene 4 · answer */}
            <section data-sky aria-labelledby="answer-h" className="relative z-10 py-24 sm:py-32">
              <div className={`${wrap} text-center`}>
                <Reveal from="none">
                  <AnswerMark />
                </Reveal>
                <Reveal delay={200}>
                  <p className="club-kicker mt-8">The answer</p>
                  <h2 id="answer-h" className="club-h2 mx-auto mt-4 max-w-4xl">
                    {ANSWER.headline}
                  </h2>
                </Reveal>
                <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
                  {ANSWER.counters.map((c, i) => (
                    <Reveal as="li" key={c.label} delay={i * 120}>
                      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-7">
                        <CountUp
                          value={c.value}
                          prefix={c.prefix}
                          className="club-display block text-5xl font-extrabold text-[#E8A33D] sm:text-6xl"
                        />
                        <span className="mt-2 block text-sm text-white/75">{c.label}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={200}>
                  <p className="mx-auto mt-12 max-w-3xl text-pretty text-lg text-white/80 sm:text-xl">{ANSWER.line}</p>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 5 · lenses */}
            <Lenses />
          </Chapter>

          {/* =========================================== CHAPTER 3 · HOW IT WORKS */}
          <Chapter id="how">
            {/* ---------------------------------------------- Scene 6 · one hour */}
            <section data-sky aria-labelledby="hour-h" className="relative z-10 py-24 sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">How a session runs</p>
                  <h2 id="hour-h" className="club-h2 mt-4">
                    {HOUR.headline}
                  </h2>
                </Reveal>
                <div className="mt-14">
                  <HourDial />
                </div>
                <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {HOUR.footnotes.map((n) => (
                    <li key={n} className="rounded-2xl border border-white/10 px-5 py-4 text-sm text-white/75">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 7 · the cycle */}
            <section data-sky aria-label="The three-year cycle" className="relative z-10 pb-24 pt-8 sm:pb-32">
              <Cycle />
              <div className={`${wrap} mt-16 pin:mt-0`}>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {CYCLE.points.map((pt, i) => (
                    <Reveal as="li" key={pt.title} delay={i * 120}>
                      <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="text-lg font-semibold text-white">{pt.title}</h3>
                        <p className="mt-2 text-pretty text-white/75">{pt.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Reveal className="mt-16 text-center">
                  <p className="club-display text-[clamp(4rem,14vw,10rem)] font-extrabold leading-none text-[#E8A33D]">
                    {CYCLE.bigNumber}
                  </p>
                  <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-white/80">{CYCLE.bigLine}</p>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 8 · levels */}
            <section data-sky aria-labelledby="levels-h" className="relative z-10 py-24 sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">Personal levels</p>
                  <h2 id="levels-h" className="club-h2 mt-4">
                    {LEVELS.headline}
                  </h2>
                  <p className="mt-5 max-w-3xl text-pretty text-lg text-white/75">{LEVELS.copy}</p>
                </Reveal>

                <Reveal from="none" className="mt-12 hidden md:block">
                  <svg viewBox="0 0 720 180" aria-hidden="true" className="h-auto w-full">
                    {LEVEL_POINTS.slice(1).map((p, i) => (
                      <line
                        key={i}
                        className="club-const-line"
                        style={{ transitionDelay: `${i * 450}ms` }}
                        x1={LEVEL_POINTS[i].x}
                        y1={LEVEL_POINTS[i].y}
                        x2={p.x}
                        y2={p.y}
                        stroke="#5CC6D6"
                        strokeOpacity="0.6"
                        strokeWidth="1.5"
                      />
                    ))}
                    {LEVEL_POINTS.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="16" fill="#E8A33D" opacity="0.18" />
                        <circle cx={p.x} cy={p.y} r="6" fill="#FCE7B8" />
                      </g>
                    ))}
                  </svg>
                </Reveal>

                <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {LEVELS.levels.map((l, i) => (
                    <Reveal as="li" key={l.name} delay={i * 220}>
                      <div className="h-full rounded-3xl border border-white/10 bg-[#0E1A3A]/70 p-6">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E8A33D]">
                          <StarGlyph className="h-4 w-4" />
                          Level {i + 1}
                        </p>
                        <h3 className="mt-3 text-xl font-bold text-white">{l.name}</h3>
                        <p className="mt-2 text-pretty text-sm text-white/75">{l.skill}</p>
                        <p className="mt-4 border-t border-white/10 pt-3 text-sm font-medium text-[#BFE7EE]">{l.reward}</p>
                      </div>
                    </Reveal>
                  ))}
                </ol>

                <Reveal className="mt-12">
                  <h3 className="text-lg font-semibold text-white">Roles for returning members</h3>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {LEVELS.roles.map((r) => (
                      <li key={r.title} className="rounded-2xl border border-white/10 px-5 py-4">
                        <p className="font-semibold text-white">{r.title}</p>
                        {r.body && <p className="mt-1 text-sm text-white/70">{r.body}</p>}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          </Chapter>

          {/* =========================================== CHAPTER 4 · THE YEAR */}
          <Chapter id="year">
            {/* ---------------------------------------------- Scene 9 · the year */}
            <section data-sky aria-labelledby="year-h" className="relative z-10 py-16 sm:py-24">
              <div className={wrap}>
                <div className="club-light rounded-[2rem] bg-[#EAF5F8] p-5 text-[#0E1A3A] sm:p-10">
                  <Reveal className="text-center">
                    <p className="club-kicker">The club year</p>
                    <h2 id="year-h" className="club-h2 mt-4 text-[#0E1A3A]">
                      {YEAR_PLAN.headline}
                    </h2>
                  </Reveal>
                  <div className="mt-12">
                    <YearPlan />
                  </div>
                </div>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 10 · syllabus */}
            <section data-sky aria-labelledby="syllabus-h" className="relative z-10 py-16 sm:py-24">
              <div className={wrap}>
                <div className="club-light rounded-[2rem] bg-[#CFE9EF] p-5 text-[#0E1A3A] sm:p-10">
                  <Reveal>
                    <p className="club-kicker">It meets their own textbook</p>
                    <h2 id="syllabus-h" className="club-h2 mt-4 max-w-4xl text-[#0E1A3A]">
                      {SYLLABUS.headline}
                    </h2>
                  </Reveal>
                  <div className="mt-10">
                    <Syllabus />
                  </div>
                  <Reveal>
                    <p className="club-display mx-auto mt-12 max-w-3xl text-balance text-center text-2xl font-semibold italic text-[#0E1A3A] sm:text-3xl">
                      {SYLLABUS.promise}
                    </p>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 11 · take home */}
            <section data-sky aria-labelledby="takehome-h" className="relative z-10 py-24 sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">Textbook, logbook and builds</p>
                  <h2 id="takehome-h" className="club-h2 mt-4">
                    {TAKE_HOME.headline}
                  </h2>
                </Reveal>
                <div className="mt-14">
                  <TakeHome />
                </div>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 12 · safety */}
            <Sunrise>
              <div className="rounded-3xl bg-[#0E1A3A]/70 p-6 backdrop-blur-sm sm:p-8">
                <p className="club-kicker">Under the real sky</p>
                <h2 id="safety-h" className="club-h2 mt-4">
                  {SAFETY.headline}
                </h2>
                <h3 className="mt-8 text-lg font-semibold text-white">The 7 observation sessions</h3>
                <ul className="mt-3 space-y-2">
                  {SAFETY.sessions.map((s) => (
                    <li key={s} className="flex gap-3 text-white/85">
                      <span aria-hidden="true" className="text-[#E8A33D]">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-lg font-semibold text-white">Safety</h3>
                <ul className="mt-3 space-y-3">
                  {SAFETY.rules.map((r) => (
                    <li key={r} className="flex gap-3 text-pretty text-white/85">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5CC6D6]" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-semibold text-[#FCE7B8]">{SAFETY.telescopes}</p>
              </div>
            </Sunrise>
          </Chapter>

          {/* =========================================== CHAPTER 5 · RESULTS (day) */}
          <Chapter id="results">
            {/* ---------------------------------------------- Scene 13 · KPIs */}
            <section aria-labelledby="kpi-h" className="club-light relative z-10 bg-[#EAF5F8] py-24 text-[#0E1A3A] sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">Results</p>
                  <h2 id="kpi-h" className="club-h2 mt-4">
                    {KPIS.headline}
                  </h2>
                  <p className="mt-5 inline-flex rounded-full bg-[#0E1A3A] px-4 py-2 text-sm font-semibold text-white">
                    {KPIS.label}
                  </p>
                </Reveal>
                <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {KPIS.pillars.map((p, i) => (
                    <Reveal as="li" key={p.name} delay={i * 140}>
                      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#D5DCE6] transition-transform hover:-translate-y-1">
                        <div
                          aria-hidden="true"
                          className="club-pillar absolute bottom-0 left-0 top-0 w-1.5"
                          style={{ background: [BANDS[0].color, BANDS[1].color, BANDS[2].color, '#0E1A3A'][i] }}
                        />
                        <h3 className="club-display text-2xl font-bold">{p.name}</h3>
                        <ul className="mt-4 space-y-3">
                          {p.targets.map((t) => (
                            <li key={t} className="border-t border-[#D5DCE6] pt-3 text-sm leading-relaxed text-[#3B4663]">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                <Reveal className="mt-16">
                  <h3 className="club-display text-2xl font-bold">Checkpoints</h3>
                  <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
                    {KPIS.checkpoints.map((c) => (
                      <li key={c.when} className="relative rounded-2xl bg-white p-4 ring-1 ring-[#D5DCE6]">
                        <span aria-hidden="true" className="mb-3 block h-2 w-2 rounded-full bg-[#0B7285]" />
                        <p className="font-bold">{c.when}</p>
                        <p className="mt-1 text-sm text-[#3B4663]">{c.what}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-8 max-w-3xl text-pretty text-lg text-[#3B4663]">{KPIS.line}</p>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 14 · what changes */}
            <section aria-labelledby="changes-h" className="club-light relative z-10 bg-white py-24 text-[#0E1A3A] sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">Outcomes</p>
                  <h2 id="changes-h" className="club-h2 mt-4">
                    What changes
                  </h2>
                </Reveal>
                <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                  {CHANGES.map((c, i) => (
                    <Reveal as="li" key={c.who} delay={i * 260}>
                      <div className="h-full border-t-4 pt-6" style={{ borderColor: [BANDS[0].color, BANDS[1].color, '#0E1A3A'][i] }}>
                        <h3 className="club-display text-2xl font-bold">{c.who}</h3>
                        <p className="mt-3 text-pretty leading-relaxed text-[#3B4663]">{c.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </section>
          </Chapter>

          {/* =========================================== CHAPTER 6 · START */}
          <Chapter id="start">
            {/* ---------------------------------------------- Scene 15 · how to start */}
            <section aria-labelledby="start-h" className="club-light relative z-10 bg-[#EAF5F8] py-24 text-[#0E1A3A] sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">How to start</p>
                  <h2 id="start-h" className="club-h2 mt-4">
                    {START.headline}
                  </h2>
                </Reveal>

                <Reveal className="mt-14">
                  <div className="relative">
                    <div aria-hidden="true" className="absolute left-0 right-0 top-[0.6rem] hidden h-1 rounded-full bg-[#CFE9EF] md:block">
                      <div className="club-track-fill h-full rounded-full bg-[#0B7285]" />
                    </div>
                    <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
                      {START.track.map((t) => (
                        <li key={t.week} className="flex gap-4 md:block">
                          <span aria-hidden="true" className="mt-0.5 block h-5 w-5 shrink-0 rounded-full border-4 border-[#EAF5F8] bg-[#0B7285] md:mt-0" />
                          <div className="md:mt-4">
                            <p className="font-bold">{t.week}</p>
                            <p className="mt-1 text-pretty text-sm text-[#3B4663]">{t.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>

                <Reveal className="mt-16">
                  <div className="club-dark-card flex flex-col gap-6 rounded-3xl bg-[#0E1A3A] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="club-display text-2xl font-bold sm:text-3xl">{START.quoteTitle}</h3>
                      <p className="mt-2 text-pretty text-white/80">{START.quoteBody}</p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                      <TrackedLink
                        href="#request-quote"
                        event="club_cta_quote_click"
                        eventProps={{ from: 'start' }}
                        className="club-btn-primary justify-center"
                      >
                        Request a quote
                        <span aria-hidden="true">→</span>
                      </TrackedLink>
                      <PdfButton from="start" />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 16 · why Astris */}
            <section aria-labelledby="why-h" className="club-light relative z-10 bg-white py-24 text-[#0E1A3A] sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">Who runs it</p>
                  <h2 id="why-h" className="club-h2 mt-4">
                    {WHY.headline}
                  </h2>
                </Reveal>
                <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {WHY.stats.map((s, i) => (
                    <Reveal as="li" key={s.value} delay={i * 100}>
                      <div className="h-full rounded-3xl bg-[#EAF5F8] p-6">
                        {i === 0 && (
                          <img
                            src="/partners/isro-logo.webp"
                            alt="ISRO — Indian Space Research Organisation"
                            width={500}
                            height={473}
                            loading="lazy"
                            className="mb-4 h-14 w-auto object-contain"
                          />
                        )}
                        <p className="club-display text-2xl font-extrabold leading-tight sm:text-4xl">{s.value}</p>
                        <p className="mt-2 text-sm text-[#3B4663]">{s.label}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {WHY.founders.map((f, i) => (
                    <Reveal key={f.name} delay={i * 150}>
                      <article className="h-full rounded-3xl p-6 ring-1 ring-[#D5DCE6] sm:p-8">
                        <div>
                          <h3 className="text-xl font-bold">{f.name}</h3>
                          <p className="text-sm font-semibold text-[#0B7285]">{f.role}</p>
                          <p className="mt-3 text-pretty leading-relaxed text-[#3B4663]">{f.bio}</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
                <Reveal className="mt-8">
                  <div className="flex flex-col gap-3 rounded-3xl bg-[#0E1A3A] p-6 text-white sm:flex-row sm:items-center sm:gap-6 sm:p-8">
                    <p className="club-display shrink-0 rounded-full border border-[#5CC6D6]/60 px-5 py-2 text-lg font-bold text-[#5CC6D6]">
                      {WHY.badge}
                    </p>
                    <p className="text-pretty text-white/80">{WHY.badgeBody}</p>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 17 · the path */}
            <section aria-labelledby="path-h" className="club-light relative z-10 bg-[#EAF5F8] py-24 text-[#0E1A3A] sm:py-32">
              <div className={wrap}>
                <Reveal>
                  <p className="club-kicker">What comes next</p>
                  <h2 id="path-h" className="club-h2 mt-4">
                    {PATH.headline}
                  </h2>
                </Reveal>
                <ol className="mt-14 grid grid-cols-1 items-end gap-5 md:grid-cols-3">
                  {PATH.steps.map((s, i) => (
                    <Reveal as="li" key={s.title} delay={i * 200} className={['md:mb-0', 'md:mb-12', 'md:mb-24'][i]}>
                      <div className={`rounded-3xl p-6 sm:p-8 ${i === 2 ? 'bg-[#0E1A3A] text-white' : 'bg-white ring-1 ring-[#D5DCE6]'}`}>
                        <p className={`text-xs font-bold uppercase tracking-[0.18em] ${i === 2 ? 'text-[#5CC6D6]' : 'text-[#0B7285]'}`}>
                          {i + 1} · {s.tag}
                        </p>
                        <h3 className="club-display mt-2 text-2xl font-bold">{s.title}</h3>
                        <p className={`mt-2 text-pretty ${i === 2 ? 'text-white/80' : 'text-[#3B4663]'}`}>{s.body}</p>
                        {s.href && (
                          <a href={s.href} className="mt-4 inline-flex font-semibold text-[#E8A33D] underline-offset-4 hover:underline">
                            Explore AstroEd Space Lab →
                          </a>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </ol>
                <Reveal>
                  <p className="mt-10 rounded-3xl border-2 border-dashed border-[#B9761C]/60 bg-white p-6 text-pretty text-lg text-[#0E1A3A] sm:p-8">
                    <strong className="text-[#8A5A12]">Offer: </strong>
                    {PATH.offer}
                  </p>
                </Reveal>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 18 · FAQ */}
            <section aria-labelledby="faq-h" className="club-light relative z-10 bg-white py-24 text-[#0E1A3A] sm:py-32">
              <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <Reveal>
                  <p className="club-kicker">FAQ</p>
                  <h2 id="faq-h" className="club-h2 mt-4">
                    Questions schools ask
                  </h2>
                </Reveal>
                <div className="mt-10 divide-y divide-[#D5DCE6] border-y border-[#D5DCE6]">
                  {FAQS.map((f) => (
                    <details key={f.q} className="club-faq group">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-semibold">
                        <h3 className="text-lg font-semibold">{f.q}</h3>
                        <span aria-hidden="true" className="club-faq-icon text-2xl font-light text-[#0B7285] transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="pb-6 pr-10 text-pretty leading-relaxed text-[#3B4663]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------------------------------------- Scene 19 · the close */}
            <section data-sky aria-labelledby="close-h" className="relative z-10 py-24 sm:py-32">
              <div className={wrap}>
                <Reveal from="none" className="mx-auto max-w-md">
                  <svg viewBox="0 0 320 120" aria-hidden="true" className="h-auto w-full">
                    {[
                      [40, 90, 100, 50],
                      [100, 50, 170, 70],
                      [170, 70, 230, 30],
                      [230, 30, 290, 60],
                      [170, 70, 200, 105],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        className="club-const-line"
                        style={{ transitionDelay: `${300 + i * 300}ms` }}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#5CC6D6"
                        strokeOpacity="0.7"
                        strokeWidth="1.4"
                      />
                    ))}
                    {[
                      [100, 50],
                      [170, 70],
                      [230, 30],
                      [290, 60],
                      [200, 105],
                    ].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="3" fill="#FFFFFF" />
                    ))}
                    {/* The single star from the opening scene. */}
                    <circle cx="40" cy="90" r="10" fill="#FFFFFF" opacity="0.18" />
                    <circle cx="40" cy="90" r="4.5" fill="#FFFFFF" />
                  </svg>
                </Reveal>
                <Reveal>
                  <h2 id="close-h" className="club-h2 mx-auto mt-10 max-w-4xl text-center">
                    {CLOSE.headline}
                  </h2>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div id="book-demo" className="relative scroll-mt-20 rounded-[2rem] border border-white/10 bg-[#0E1A3A]/80 p-6 backdrop-blur-md sm:p-8 lg:col-span-8">
                    <span id="request-quote" className="absolute -top-20" aria-hidden="true" />
                    <DemoForm />
                  </div>

                  <aside className="space-y-4 lg:col-span-4" aria-label="Other ways to reach us">
                    <PdfButton from="close" className="w-full" />
                    <TrackedLink
                      href={CLUB_KIT_PDF}
                      download
                      event="club_pdf_download"
                      eventProps={{ doc: 'kit_guide', from: 'close' }}
                      className="club-btn-ghost w-full justify-center"
                    >
                      Download the kit guide (PDF)
                    </TrackedLink>
                    <TrackedLink
                      href={CLUB_WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      event="club_whatsapp_click"
                      eventProps={{ from: 'close' }}
                      className="club-btn-ghost w-full justify-center"
                    >
                      WhatsApp us
                    </TrackedLink>
                    <a href={telHref} className="club-btn-ghost w-full justify-center">
                      Call {CLUB_PHONE_LABEL}
                    </a>
                    <div className="rounded-3xl border border-white/10 p-6 text-center">
                      <p className="text-pretty text-white/85">{CLOSE.parents}</p>
                      <div className="mt-5">
                        <Share />
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </Chapter>
        </main>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}
