import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import AstroIcon from './icon'
import { astroCurriculum } from '@/lib/astrophotography-data'

export default function AstroCurriculum() {
  return (
    <section id="learn" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      {/* Cosmic glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-[var(--av-aurora)] opacity-10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What You Will Learn"
          title={<>From first exposure to finished portfolio</>}
          subtitle="A complete curriculum spanning the camera, the sky and the edit."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {astroCurriculum.map((c, i) => (
            <ScrollReveal key={c.value} delay={(i % 4) * 50} direction="up">
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06] sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <AstroIcon name={c.icon} size={18} className="text-[var(--av-gold)]" />
                </span>
                <span className="text-sm font-medium leading-snug text-white/85">{c.value}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
