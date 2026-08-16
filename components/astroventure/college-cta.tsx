'use client'

import { GraduationCap, ArrowRight, MessageCircle } from 'lucide-react'
import { SITE, type Destination } from '@/lib/astroventure-data'
import ScrollReveal from './scroll-reveal'

/**
 * "Coming with your college?" group-booking CTA. Routes into the site's
 * existing lead channels — WhatsApp and the registration form — rather than any
 * new CRM. Rendered only when a destination opts in via `collegeGroups`.
 */
export default function CollegeCta({ destination: d }: { destination: Destination }) {
  const waText = encodeURIComponent(
    `Hi Astris Space — we'd like to plan a college astronomy trip to ${d.name}. Please share group departure details.`,
  )
  const waHref = `https://wa.me/${SITE.whatsapp}?text=${waText}`

  return (
    <section
      id="college"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.05] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--av-gold)] opacity-10 blur-3xl" />

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--av-gold)]">
              <GraduationCap size={14} /> For colleges & societies
            </span>

            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Coming with your college?
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base font-light leading-relaxed text-white/70">
              Astronomy clubs, physics and science societies, photography clubs and student
              communities can book a dedicated group departure — priced and paced for students, with
              the telescopes and mentoring built around your group.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:brightness-110"
              >
                <MessageCircle size={16} />
                Plan a College Astronomy Trip
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#register"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                Send an enquiry instead
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
