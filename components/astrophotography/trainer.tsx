import { Instagram, Globe, Images as ImagesIcon, Award, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { ASTRO_TRAINER } from '@/lib/astrophotography-data'

export default function AstroTrainer() {
  const t = ASTRO_TRAINER
  return (
    <section id="trainer" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      {/* Cosmic glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[45vh] w-[70vw] rounded-full bg-[var(--av-nebula)] opacity-12 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/12">
                <img
                  src={t.portrait}
                  alt={`Portrait of ${t.name} (placeholder)`}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl font-semibold text-white">{t.name}</p>
                  <p className="mt-1 text-sm text-white/70">{t.title}</p>
                </div>
              </div>
              {/* Experience badge */}
              <div className="glass absolute -right-3 -top-3 rounded-2xl border border-[var(--av-gold)]/30 px-4 py-3 text-center sm:-right-5 sm:-top-5">
                <p className="font-display text-2xl font-semibold text-[var(--av-gold)]">
                  {t.yearsExperience}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                  Years
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal direction="right" delay={80}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
              <span className="h-px w-6 bg-[var(--av-gold)]/60" />
              Meet Your Trainer
            </span>
            <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              {t.name}
            </h2>

            {/* Specialties */}
            <div className="mt-6 flex flex-wrap gap-2">
              {t.specialties.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80"
                >
                  <Sparkles size={12} className="text-[var(--av-gold)]" />
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-6 text-pretty text-base font-light leading-relaxed text-white/70">
              {t.bio}
            </p>

            {/* Achievements */}
            <ul className="mt-6 space-y-2.5">
              {t.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-white/70">
                  <Award size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={t.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-[var(--av-gold)]/40 hover:text-white"
              >
                <Instagram size={15} className="text-[var(--av-gold)]" /> Instagram
              </a>
              <a
                href={t.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-[var(--av-gold)]/40 hover:text-white"
              >
                <Globe size={15} className="text-[var(--av-gold)]" /> Website
              </a>
              <a
                href={t.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-[var(--av-gold)]/40 hover:text-white"
              >
                <ImagesIcon size={15} className="text-[var(--av-gold)]" /> Portfolio
              </a>
            </div>

            <p className="mt-6 text-xs italic text-white/40">{t.bioNote}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
