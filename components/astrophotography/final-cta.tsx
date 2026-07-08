import { ArrowRight, Download } from 'lucide-react'
import { ASTRO, ASTRO_IMAGES } from '@/lib/astrophotography-data'
import Starfield from '@/components/astroventure/starfield'

export default function AstroFinalCta() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[var(--av-deep)]">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0">
        <img
          src={ASTRO_IMAGES.ctaBackdrop}
          alt=""
          aria-hidden="true"
          className="animate-drift h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--av-deep)]/85 via-black/70 to-[var(--av-deep)]" />
      <Starfield count={56} />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="font-display text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
          Capture the Universe
          <span className="block italic text-[var(--av-gold)]">Like Never Before</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-light leading-relaxed text-white/75 sm:text-lg">
          Experience the Himalayas through the lens of a professional astrophotographer. Learn to
          create breathtaking images of the Milky Way, galaxies, nebulae and pristine night
          landscapes while travelling through some of the darkest skies in the world.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={ASTRO.bookingPath}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)] sm:w-auto"
          >
            Reserve Your Seat
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={ASTRO.brochurePath}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            <Download size={16} />
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  )
}
