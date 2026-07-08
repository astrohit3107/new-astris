import { Check } from 'lucide-react'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import {
  ASTRO_INTRO_LEAD,
  ASTRO_INTRO_BODY,
  astroIntroSkills,
  ASTRO_IMAGES,
} from '@/lib/astrophotography-data'

export default function AstroIntro() {
  return (
    <section id="overview" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="A Field Workshop, Not a Tour"
          title={<>Every technique, taught beneath the stars</>}
          subtitle="A photography masterclass, a scientific expedition and an adventure — combined into one."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={ASTRO_IMAGES.introMilkyWay}
                alt="The Milky Way arching over the high Himalaya — the canvas for the expedition"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={80}>
            <p className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {ASTRO_INTRO_LEAD}
            </p>
            <p className="mt-6 text-pretty text-lg font-light leading-relaxed text-white/70">
              {ASTRO_INTRO_BODY}
            </p>

            <div className="mt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--av-gold)]">
                What you’ll learn along the way
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {astroIntroSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
