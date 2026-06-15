'use client'

import {
  Telescope,
  Camera,
  Compass,
  Sparkles,
  Star,
  Orbit,
  BookOpen,
  Moon,
  type LucideIcon,
} from 'lucide-react'
import { experiences } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'

const ICONS: Record<string, LucideIcon> = {
  Telescope,
  Camera,
  Compass,
  Sparkles,
  Star,
  Orbit,
  BookOpen,
  Moon,
}

export default function Experiences() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What you will experience"
          title="A Night Written in Starlight"
          subtitle="From your first look through a telescope to capturing the Milky Way on camera, every moment is guided by astronomers who live for the dark."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => {
            const Icon = ICONS[exp.icon] ?? Sparkles
            const featured = i === 0
            return (
              <ScrollReveal
                key={exp.title}
                delay={(i % 4) * 90}
                direction="scale"
                className={featured ? 'sm:col-span-2 sm:row-span-2' : ''}
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06] ${
                    featured ? 'sm:p-8' : ''
                  }`}
                >
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--av-gold)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

                  <div
                    className={`flex items-center justify-center rounded-xl bg-white/5 text-[var(--av-gold)] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-[var(--av-gold)] group-hover:text-black ${
                      featured ? 'h-14 w-14' : 'h-12 w-12'
                    }`}
                  >
                    <Icon size={featured ? 26 : 22} />
                  </div>

                  <h3
                    className={`mt-5 font-semibold text-white ${
                      featured ? 'font-display text-2xl' : 'text-lg'
                    }`}
                  >
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
                    {exp.description}
                  </p>

                  {exp.items && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {exp.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
