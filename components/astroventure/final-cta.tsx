'use client'

import { ArrowRight } from 'lucide-react'
import { IMAGES } from '@/lib/astroventure-data'
import Starfield from './starfield'
import ScrollReveal from './scroll-reveal'

export default function FinalCta() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--av-deep)]">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source srcSet={IMAGES.footerNebulaMobile} media="(max-width: 1024px)" />
          <img
            src={IMAGES.footerNebula}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="animate-kenburns h-full w-full object-cover object-center opacity-70"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--av-deep)] via-black/60 to-[var(--av-deep)]" />
      <Starfield count={60} shootingStars />

      <ScrollReveal className="relative z-10 mx-auto max-w-3xl px-5 text-center" direction="scale">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--av-gold)]">
          Astroventure Nights
        </p>
        <h2 className="font-display mt-5 text-balance text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          The Universe <span className="text-gradient-gold italic">Is Waiting.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base font-light leading-relaxed text-white/75 sm:text-lg">
          Reserve your Astroventure Nights experience and witness the night sky like never before.
        </p>
        <a
          href="#register"
          className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_14px_50px_-12px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_18px_56px_-12px_var(--av-gold)]"
        >
          Reserve Your Spot
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </ScrollReveal>
    </section>
  )
}
