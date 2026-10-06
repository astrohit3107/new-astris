import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, CheckCircle2, Frame, Mail, MessageCircle, Moon, Paperclip, ScrollText, Palette, PenLine, Send } from 'lucide-react'

import { SITE_URL, LEGAL_ENTITY, CONTACT } from '@/lib/site-config'
import NakshatraalayNav from '@/components/nakshatraalay/nav'
import {
  WSW, PARTNER, PAINTING, ESSAY, REGISTER, REGISTRATION_EMAIL, ENTRY_FORMATS, ENTRY_SUBJECT_PREFIX,
  registrationsOpen,
} from '@/lib/world-space-week'

const TITLE = 'Cosmic Canvas — World Space Week 2026 Painting & Essay Competition'
const DESCRIPTION =
  'Cosmic Canvas: a painting competition for grades 3–8 and an essay competition for grades 9–12, from Astris Space and Space Store. ₹100 per child. Entries close 11 October 2026, 11:59 pm.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: WSW.path },
  keywords: [
    'World Space Week 2026', 'World Space Week India', 'space painting competition for kids',
    'space essay competition India', 'Cosmic Canvas competition',
  ],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: WSW.path, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** Re-checked hourly, so registration closes on the deadline without a redeploy. */
export const revalidate = 3600

const STEPS = [
  {
    title: 'Register by email',
    body: `Tap Reserve Your Spot to email ${REGISTRATION_EMAIL}. We reply with the UPI details for the ₹100 fee.`,
  },
  {
    title: 'Pay and screenshot',
    body: 'Pay ₹100 by UPI and take a screenshot of the payment confirmation. The fee is the same for every child.',
  },
  {
    title: 'Email your entry',
    body: `Scan the painting or essay and email it as a ${ENTRY_FORMATS} file, with the payment screenshot and your details. By ${WSW.deadlineFull}.`,
  },
  {
    title: 'Shortlist and results',
    body: 'Astris Space and Space Store shortlist the entries together. If yours is selected, we email you with the next steps — including where to courier the original.',
  },
]

export default function WorldSpaceWeekPage() {
  const open = registrationsOpen()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // A real event with real dates, so Event is the honest type here.
        '@type': 'Event',
        '@id': `${SITE_URL}${WSW.path}#event`,
        name: 'Cosmic Canvas — World Space Week 2026 Competition',
        description: DESCRIPTION,
        startDate: `${WSW.weekStart}T00:00:00+05:30`,
        endDate: `${WSW.weekEnd}T23:59:59+05:30`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: { '@type': 'VirtualLocation', url: `${SITE_URL}${WSW.path}` },
        organizer: [
          { '@id': `${SITE_URL}/#organization` },
          { '@type': 'Organization', name: PARTNER.name },
        ],
        offers: {
          '@type': 'Offer',
          price: String(WSW.fee),
          priceCurrency: 'INR',
          availability: open ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          validThrough: `${WSW.deadline}T23:59:59+05:30`,
          url: `${SITE_URL}${WSW.path}`,
        },
        audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${WSW.path}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: WSW.name, item: `${SITE_URL}${WSW.path}` },
        ],
      },
    ],
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <NakshatraalayNav backHref="/" backLabel="Astris Space" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---- hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-32 sm:px-6 sm:pb-20">
        {/* A painted nebula, in CSS — the theme is painting the universe, so
            the hero is paint, not a photograph. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/25 blur-[110px]" />
          <div className="absolute right-[-6rem] top-[-4rem] h-[26rem] w-[26rem] rounded-full bg-sky-400/20 blur-[110px]" />
          <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[30rem] rounded-full bg-amber-400/15 blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060a]/30 to-[#05060a]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Partner lock-up. Both logos on every collab piece — that is in
              the organisers' own brief. */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <img src="/logo.svg" alt="Astris Space" className="h-8 w-8" />
              <span className="text-sm font-semibold tracking-wide text-white/90">Astris Space</span>
            </span>
            <span className="text-white/35" aria-hidden="true">×</span>
            {PARTNER.logo ? (
              <img src={PARTNER.logo} alt={PARTNER.name} className="h-10 w-auto" />
            ) : (
              <span
                className="rounded-md border border-dashed border-white/30 px-3 py-1.5 text-sm font-semibold tracking-wide text-white/80"
                title="Space Store logo goes here"
              >
                {PARTNER.name}
              </span>
            )}
          </div>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/55">
            {WSW.name} · 4–11 October
          </p>
          <h1 className="font-display mt-4 text-balance text-5xl font-light leading-[1.05] sm:text-7xl">
            {WSW.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
            A painting competition for grades 3–8, and an essay competition for grades 9–12. The top
            three entries — across both categories — win a night under the stars at Nakshatraalay.
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div><dt className="text-[10px] uppercase tracking-wider text-white/40">Entry</dt><dd className="font-semibold">{WSW.feeLabel}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider text-white/40">Painting</dt><dd className="font-semibold">{PAINTING.grades}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider text-white/40">Essay</dt><dd className="font-semibold">{ESSAY.grades}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider text-white/40">Entries by</dt><dd className="font-semibold">{WSW.deadlineLabel}, 11:59 pm</dd></div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            {open ? (
              <>
                <a
                  href={REGISTER.painting}
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
                >
                  Reserve Your Spot
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#competitions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  See both competitions
                </a>
                {/* A mailto: button does nothing on a computer with no mail app
                    set up, so the address is always shown as well. */}
                <p className="flex w-full items-center gap-2 text-sm text-white/55">
                  <Mail size={14} className="shrink-0" />
                  Or email us at{' '}
                  <span className="select-all font-semibold text-white/85">{REGISTRATION_EMAIL}</span>
                  with your child’s name, grade, school and city.
                </p>
              </>
            ) : (
              <p className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/70">
                Entries closed on {WSW.deadlineLabel}. Shortlisted families and winners hear from us by email.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ---- competitions ----------------------------------------------- */}
      <section id="competitions" className="scroll-mt-16 px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-white/12 bg-white/[0.03] p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-400/15 text-fuchsia-200 ring-1 ring-fuchsia-300/25">
                <Palette size={18} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{PAINTING.grades}</span>
            </div>
            <h2 className="font-display mt-5 text-3xl font-light">{PAINTING.title}</h2>
            {PAINTING.theme && (
              <p className="mt-1 text-sm font-semibold text-[var(--av-gold)]">Theme: {PAINTING.theme}</p>
            )}
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">{PAINTING.brief}</p>
            {open && (
              <a
                href={REGISTER.painting}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Reserve Your Spot <ArrowRight size={15} />
              </a>
            )}
          </article>

          <article className="flex flex-col rounded-3xl border border-white/12 bg-white/[0.03] p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/25">
                <PenLine size={18} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{ESSAY.grades}</span>
            </div>
            <h2 className="font-display mt-5 text-3xl font-light">{ESSAY.title}</h2>
            <p className="mt-1 text-sm font-semibold text-[var(--av-gold)]">Theme: {ESSAY.theme}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
              {ESSAY.brief}
            </p>
            <a href="#essay-brief" className="mt-4 text-sm font-semibold text-sky-200 hover:underline">
              Read the full essay brief →
            </a>
            {open && (
              <a
                href={REGISTER.essay}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Reserve Your Spot <ArrowRight size={15} />
              </a>
            )}
          </article>
        </div>
      </section>

      {/* ---- essay brief ------------------------------------------------ */}
      <section id="essay-brief" className="scroll-mt-16 border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-200/70">
            {ESSAY.title} · {ESSAY.grades}
          </p>
          <h2 className="font-display mt-3 text-3xl font-light sm:text-4xl">The essay brief: {ESSAY.theme}</h2>
          <p className="mt-5 text-pretty leading-relaxed text-white/70">{ESSAY.brief}</p>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-white/50">Questions to get you started</h3>
          <p className="mt-2 text-sm text-white/50">Choose one of these, or set your own question.</p>
          <ul className="mt-4 space-y-2.5">
            {ESSAY.questions.map((q) => (
              <li key={q} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-white/80">
                {q}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">The rules</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                {ESSAY.rules.map((r) => <li key={r} className="flex gap-2"><span className="text-sky-200/70">—</span>{r}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">What the judges look for</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                {ESSAY.judging.map((r) => <li key={r} className="flex gap-2"><span className="text-sky-200/70">—</span>{r}</li>)}
              </ul>
            </div>
          </div>

          {open && (
            <a
              href={REGISTER.essay}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Reserve Your Spot <ArrowRight size={15} />
            </a>
          )}
        </div>
      </section>

      {/* ---- how it works (a real sequence, so numbered) ----------------- */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-light sm:text-4xl">How to enter</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-display text-3xl font-light text-[var(--av-gold)]">{i + 1}</span>
                <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>

          {/* The one thing families most need to get right, in one place. */}
          <div id="send-your-entry" className="mt-10 scroll-mt-16 rounded-3xl border border-[var(--av-gold)]/35 bg-[var(--av-gold)]/[0.06] p-7 sm:p-9">
            <h3 className="font-display text-2xl font-light sm:text-3xl">Sending your entry</h3>
            <p className="mt-2 text-sm text-white/65">
              Email it to <span className="select-all font-semibold text-white">{REGISTRATION_EMAIL}</span> by{' '}
              <span className="font-semibold text-white">{WSW.deadlineFull}</span>. Your email must have:
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  <Paperclip size={13} /> Attached
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-white/80">
                  <li className="flex gap-2.5"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />The painting or essay, scanned, as a {ENTRY_FORMATS} file</li>
                  <li className="flex gap-2.5"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />A screenshot of your ₹100 payment confirmation</li>
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  <Mail size={13} /> Written in the email
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-white/80">
                  <li className="flex gap-2.5"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />Child’s name, grade and school</li>
                  <li className="flex gap-2.5"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />City, and a phone number we can reach you on if you are shortlisted</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/60">
              <span className="font-semibold text-white/85">Keep the original.</span> If your entry is
              shortlisted, we will email you with where to courier it.
            </p>

            {open && (
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={REGISTER.paintingEntry} className="inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
                  <Send size={15} /> Send a painting entry
                </a>
                <a href={REGISTER.essayEntry} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10">
                  <Send size={15} /> Send an essay entry
                </a>
              </div>
            )}
            <p className="mt-3 text-[11px] text-white/40">
              These open an email with the subject “{ENTRY_SUBJECT_PREFIX}” and a checklist already written — remember to attach the files before sending.
            </p>
          </div>
        </div>
      </section>

      {/* ---- what you can win ------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-light sm:text-4xl">What you can win</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/[0.06] p-6">
              <Moon size={20} className="text-[var(--av-gold)]" />
              <h3 className="mt-4 font-semibold">Top 3 entries</h3>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--av-gold)]/80">Painting and essay combined</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                A free ticket to a night sky-gazing workshop at{' '}
                <Link href="/nakshatraalay/gurgaon" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                  Nakshatraalay
                </Link>
                , our astro-camp in the Aravalis. Parents and guardians are welcome to join, with their
                own tickets.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <Frame size={20} className="text-white/70" />
              <h3 className="mt-4 font-semibold">Top 20–25 paintings</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Framed and put up on the wall, with an invitation for the artist to come and see it. If
                yours is shortlisted, we email you with where to courier the original.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <ScrollText size={20} className="text-white/70" />
              <h3 className="mt-4 font-semibold">Every entry</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                A certificate of participation, emailed to every child who enters — painting and essay
                alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- questions -------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Questions</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {[
              ['Who can enter?', `The painting competition is for ${PAINTING.grades.toLowerCase()}. The essay competition is for ${ESSAY.grades.toLowerCase()}. Everything is done online.`],
              ['How much does it cost?', `${WSW.feeLabel}, the same for every grade and both competitions. We reply to your registration email with the UPI details.`],
              ['How do we submit?', `Scan the painting or essay and email it to ${REGISTRATION_EMAIL} as a ${ENTRY_FORMATS} file, with a screenshot of your payment confirmation and your child’s name, grade, school, city and a contact number. The deadline is ${WSW.deadlineFull}.`],
              ['What happens to the original?', 'Keep it safe. If your child’s entry is shortlisted, we will email you with where to courier it.'],
              ['Can essays win the top prize?', 'Yes. The top three are chosen from both categories combined, so a painting and an essay compete on equal terms for the three free tickets.'],
              ['How do we register?', `Tap Reserve Your Spot to open a ready-made email, or write to ${REGISTRATION_EMAIL} with your child’s name, grade, school and city.`],
              ['Who is running this?', `Astris Space, together with ${PARTNER.name}, for World Space Week 2026.`],
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  {q}
                  <span className="text-white/40 transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{a}</p>
              </details>
            ))}
          </div>

          <a
            href={REGISTER.question}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--av-gold)] hover:underline"
          >
            <MessageCircle size={15} /> Questions? Ask us on WhatsApp
          </a>
        </div>
      </section>

      {/* ---- closing CTA ------------------------------------------------ */}
      {open && (
        <section className="border-t border-white/10 px-5 py-20 text-center sm:px-6">
          <Award size={28} className="mx-auto text-[var(--av-gold)]" />
          <h2 className="font-display mt-5 text-3xl font-light sm:text-4xl">The cosmos is your canvas</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
            Entries close {WSW.deadlineFull}.
          </p>
          <a
            href={REGISTER.painting}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-8 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Reserve Your Spot
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </section>
      )}

      <footer className="border-t border-white/10 px-5 py-8 text-center text-[11px] text-white/35 sm:px-6">
        Organised by Astris Space ({LEGAL_ENTITY}) in collaboration with {PARTNER.name}. Questions: {CONTACT.phone}.
      </footer>
    </main>
  )
}
