import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="dark bg-[var(--av-deep)] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Astris Space" className="w-6 h-6 invert dark:invert-0" />
              <span className="text-lg font-bold text-foreground">Astris Space</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed">
              India's leading experiential astronomy & space education ecosystem.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Products</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="/astroventure-astrophotography" className="text-xs font-semibold text-foreground hover:text-accent transition">
                  Astrophotography Expedition
                </a>
              </li>
              <li>
                <a href="/astroventure-nights" className="text-xs font-semibold text-foreground hover:text-accent transition">
                  Astroventure Nights
                </a>
              </li>
              <li>
                <a href="/astrotrain" className="text-xs text-foreground/70 hover:text-accent transition">
                  AstroTrain
                </a>
              </li>
              <li>
                <a href="/astroed" className="text-xs text-foreground/70 hover:text-accent transition">
                  AstroEd
                </a>
              </li>
              <li>
                <a href="/#telescopes" className="text-xs text-foreground/70 hover:text-accent transition">
                  Nakshatra Scopes
                </a>
              </li>
            </ul>
          </div>

          {/* Company
              Four links, as before. Three of the previous four pointed at
              href="#" — dead links that went nowhere for visitors and were
              read as broken by crawlers. They are replaced by real
              destinations, and "#about" is now "/#about" so it works from
              every route rather than only from the homepage.

              This is also the ONE discreet entry point into the guides layer.
              The primary navigation is deliberately left untouched: guides are
              meant to be found through search, breadcrumbs and contextual
              links, not by cluttering the header. */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-sm text-foreground/70 hover:text-foreground transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/guides" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Guides
                </a>
              </li>
              <li>
                <a href="/stargazing" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Stargazing guides
                </a>
              </li>
              <li>
                <a href="/astronomy-education" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Astronomy for schools
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-foreground/70">
                <Phone size={16} />
                <span>+91 7581821834</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground/70">
                <Mail size={16} />
                <span>astriseducation@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-foreground/70">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Astris Space. All rights reserved. | Bringing the universe
            closer.
          </p>

          {/* The social row previously rendered three links pointing at href="#".
              They went nowhere and read as broken links. Rather than invent
              profile URLs, the row is removed until the real handles are
              supplied — then restore it here with actual hrefs and
              rel="noopener noreferrer". */}
          <p className="text-sm text-foreground/50">
            <a href="/astroventure-nights/privacy" className="hover:text-foreground transition">
              Privacy
            </a>
            <span aria-hidden="true" className="px-2 text-foreground/25">
              ·
            </span>
            <a href="/astroventure-nights/terms" className="hover:text-foreground transition">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
