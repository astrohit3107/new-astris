import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import SpitiIcon from './icon'
import { spitiHighlights } from '@/lib/spiti-data'

export default function SpitiHighlights() {
  return (
    <section id="highlights" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      {/* subtle divider into the section */}
      <div className="av-divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expedition Highlights"
          title={<>Everything is taken care of</>}
          subtitle="Sixteen reasons Spiti ’26 is India’s most complete astronomy expedition."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {spitiHighlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={(i % 4) * 60} direction="up">
              <div className="group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06] sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <SpitiIcon name={h.icon} size={18} className="text-[var(--av-gold)]" />
                </span>
                <span className="pt-1.5 text-sm font-medium leading-snug text-white/85">
                  {h.title}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
