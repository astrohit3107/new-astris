/**
 * ============================================================================
 *  ORGANISATIONS WE'VE WORKED WITH — continuous logo marquee
 * ============================================================================
 *  Add or remove an entry in `partnerLogos` and the strip updates everywhere.
 *  Drop new logo files into /public/partners and reference them here.
 *
 *  The track renders the list twice so the CSS animation (-50% shift) loops
 *  seamlessly. Duplicated copies are aria-hidden so screen readers announce
 *  each organisation exactly once.
 * ========================================================================== */

export interface PartnerLogo {
  name: string
  src: string
  /** Optional per-logo height tweak so visually heavier marks sit evenly. */
  className?: string
}

export const partnerLogos: PartnerLogo[] = [
  { name: 'Bennett University', src: '/partners/bennett-university.jpeg' },
  { name: 'Edterra Edventures', src: '/partners/edterra.png' },
  { name: 'Indiahikes', src: '/partners/indiahikes.jpg' },
  { name: 'The Hosteller', src: '/partners/the-hosteller.png' },
  { name: 'Madhya Pradesh Tourism (MPSTDC)', src: '/partners/mp-tourism.jpg' },
]

function LogoItem({ logo, ariaHidden }: { logo: PartnerLogo; ariaHidden?: boolean }) {
  return (
    <li className="flex shrink-0 items-center px-3 sm:px-4" aria-hidden={ariaHidden || undefined}>
      {/* Most of these marks ship on a solid white background (JPEG/PNG without
          alpha), so we seat every logo on a matching white tile. That reads as a
          deliberate lockup on the dark theme instead of stray white rectangles,
          and keeps all five visually consistent. */}
      <div className="flex h-24 w-40 items-center justify-center rounded-xl bg-white px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.04] sm:h-28 sm:w-48 sm:px-5">
        <img
          src={logo.src}
          alt={ariaHidden ? '' : `${logo.name} logo`}
          loading="lazy"
          decoding="async"
          className={logo.className ?? 'max-h-full max-w-full object-contain'}
        />
      </div>
    </li>
  )
}

export default function PartnersMarquee() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="scroll-mt-20 border-t border-foreground/10 bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
            Our reach
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
          </span>
          <h2
            id="partners-heading"
            className="mt-4 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            Organisations we&rsquo;ve conducted sessions for
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60">
            From universities and tourism boards to India&rsquo;s best-known travel and hostel
            networks — we bring telescopes, astronomers and the night sky to their people.
          </p>
        </div>
      </div>

      {/* Marquee — full-bleed, with soft edge fades */}
      <div
        className="logo-marquee relative mt-10 overflow-hidden sm:mt-12"
        style={{ ['--marquee-duration' as string]: '38s' }}
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

        <ul className="logo-marquee-track items-center">
          {partnerLogos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
          {/* Duplicate pass — hidden from assistive tech, drives the seamless loop */}
          {partnerLogos.map((logo) => (
            <LogoItem key={`dup-${logo.name}`} logo={logo} ariaHidden />
          ))}
        </ul>
      </div>
    </section>
  )
}
