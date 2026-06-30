import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { SPITI, SPITI_CONTACT, SPITI_IMAGES, SPITI_PHOTO_CREDITS } from '@/lib/spiti-data'

export default function SpitiFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--av-deep)]">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <img src={SPITI_IMAGES.footerNebula} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-[var(--av-deep)]/85 to-[var(--av-deep)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Astris Space" className="h-9 w-9 rounded-md ring-1 ring-white/20" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">Astroventure</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--av-gold)]">Spiti ’26</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/55">
              {SPITI.tagline} An eight-day high-altitude astronomy expedition by {SPITI_CONTACT.brand},
              India’s leading experiential astronomy ecosystem.
            </p>
            <a
              href={SPITI.bookingPath}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--av-gold)]"
            >
              Book Now <ArrowUpRight size={15} />
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Expedition</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li><a href="#overview" className="transition-colors hover:text-white">Overview</a></li>
              <li><a href="#itinerary" className="transition-colors hover:text-white">Itinerary</a></li>
              <li><a href="#nights" className="transition-colors hover:text-white">Astronomy Nights</a></li>
              <li><a href="#gallery" className="transition-colors hover:text-white">Gallery</a></li>
              <li><a href="#faq" className="transition-colors hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <a href={`tel:${SPITI_CONTACT.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Phone size={14} className="text-[var(--av-gold)]" /> {SPITI_CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SPITI_CONTACT.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Mail size={14} className="text-[var(--av-gold)]" /> {SPITI_CONTACT.email}
                </a>
              </li>
              <li><a href="/" className="transition-colors hover:text-white">Astris Space →</a></li>
              <li><a href="/astroventure-nights" className="transition-colors hover:text-white">Astroventure Nights →</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {SPITI_CONTACT.brand}. All rights reserved.</p>
          <p>{SPITI.name} · {SPITI.dateLabel}</p>
        </div>

        {/* Photography credits — required attribution for CC BY / CC BY-SA imagery */}
        <details className="mt-6 text-[11px] text-white/35">
          <summary className="cursor-pointer list-none text-white/40 transition-colors hover:text-white/60">
            Photography credits
          </summary>
          <p className="mt-3 leading-relaxed">
            Expedition photography sourced from Wikimedia Commons under CC0,
            Public Domain, CC BY and CC BY-SA licenses —{' '}
            {SPITI_PHOTO_CREDITS.map((c, i) => (
              <span key={c.source}>
                <a
                  href={c.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 transition-colors hover:text-white/70 hover:underline"
                >
                  {c.subject}
                </a>{' '}
                by {c.author} ({c.license})
                {i < SPITI_PHOTO_CREDITS.length - 1 ? '; ' : '.'}
              </span>
            ))}
          </p>
        </details>
      </div>
    </footer>
  )
}
