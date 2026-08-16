import { Mail, Phone, MessageCircle } from 'lucide-react'
import { WORKSHOP, WORKSHOP_CONTACT } from '@/lib/workshop-delhi-data'

export default function WorkshopFooter() {
  const waHref = `https://wa.me/${WORKSHOP_CONTACT.whatsapp}`
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Astris Space" className="h-8 w-8 rounded-md ring-1 ring-white/20" />
              <span className="font-display text-lg font-semibold text-white">Astris Space</span>
            </div>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/55">
              {WORKSHOP.name} — deep-sky imaging from an urban sky, using the narrowband techniques
              professionals rely on. Part of the Astris Space Astroventure ecosystem.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a href={`mailto:${WORKSHOP_CONTACT.email}`} className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
              <Mail size={15} className="text-[var(--av-gold)]" /> {WORKSHOP_CONTACT.email}
            </a>
            <a href={`tel:${WORKSHOP_CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
              <Phone size={15} className="text-[var(--av-gold)]" /> {WORKSHOP_CONTACT.phone}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/65 transition-colors hover:text-white">
              <MessageCircle size={15} className="text-[var(--av-gold)]" /> WhatsApp us
            </a>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</span>
            <a href="/astroventure-nights" className="text-white/65 transition-colors hover:text-white">Astroventure Nights</a>
            <a href="/astroventure-astrophotography" className="text-white/65 transition-colors hover:text-white">Ladakh Astrophotography</a>
            <a href="/astroventure-nights/sambhar-lake" className="text-white/65 transition-colors hover:text-white">Sambhar Lake Weekend</a>
            <a href="/astroventure-nights/tijara" className="text-white/65 transition-colors hover:text-white">Tijara Weekend</a>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Astris Space. Observation and imaging are subject to weather
          and sky conditions.
        </p>
      </div>
    </footer>
  )
}
