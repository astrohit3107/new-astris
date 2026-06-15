import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Astris Space" className="w-6 h-6" />
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
                <a href="/astroventure-nights" className="text-xs font-semibold text-foreground hover:text-accent transition">
                  Astroventure Nights
                </a>
              </li>
              <li>
                <a href="#astrotrain" data-link="astrotrain" className="text-xs text-foreground/70 hover:text-accent transition">
                  AstroTrain
                </a>
              </li>
              <li>
                <a href="#astroed" data-link="astroed" className="text-xs text-foreground/70 hover:text-accent transition">
                  AstroEd
                </a>
              </li>
              <li>
                <a href="#telescopes" data-link="telescopes" className="text-xs text-foreground/70 hover:text-accent transition">
                  Nakshatra Scopes
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-foreground/70 hover:text-foreground transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Blog
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
            © 2024 Astris Space. All rights reserved. | Bringing the universe closer.
          </p>

          {/* Social links placeholder */}
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              Twitter
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
