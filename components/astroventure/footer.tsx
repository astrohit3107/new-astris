import { Mail, Phone, MapPin } from 'lucide-react'
import { SITE, destinations, TAILORED_PACKAGE_NOTE } from '@/lib/astroventure-data'

const quickLinks = [
  { label: 'Destinations', href: '/astroventure-nights#destinations' },
  { label: 'The Experience', href: '/astroventure-nights#experience' },
  { label: 'Telescopes', href: '/astroventure-nights#telescopes' },
  { label: 'Gallery', href: '/astroventure-nights#gallery' },
  { label: 'Book Now', href: '/astroventure-nights#book' },
  { label: 'FAQ', href: '/astroventure-nights#faq' },
]

export default function AstroFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt={SITE.brand} className="h-9 w-9 rounded-md ring-1 ring-white/20" />
              <div className="leading-none">
                <p className="font-display text-lg font-semibold text-white">Astroventure Nights</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--av-gold)]">
                  by {SITE.brand}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/55">
              Luxury Himalayan dark-sky astronomy expeditions. Pristine skies, research-grade
              telescopes and expert astronomers — under the most beautiful nights in India.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-sm font-semibold text-white">Destinations</h4>
            <ul className="mt-4 space-y-2.5">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <a
                    href={`/astroventure-nights/${d.slug}`}
                    className="text-sm text-white/55 transition-colors hover:text-[var(--av-gold)]"
                  >
                    {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-[var(--av-gold)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/55">
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone size={14} className="text-[var(--av-gold)]" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail size={14} className="text-[var(--av-gold)]" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--av-gold)]" /> {SITE.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="av-divider my-10" />

        <p className="mb-8 text-center text-sm font-light leading-relaxed text-white/70">
          {TAILORED_PACKAGE_NOTE}
        </p>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/45">
            <a href="/astroventure-nights/terms" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="/astroventure-nights/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
