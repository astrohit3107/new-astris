'use client'

import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Astris Space" className="w-8 h-8 border border-foreground/40 rounded" />
            <span className="text-xl font-bold text-foreground">Astris Space</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/astroventure-nights" className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-foreground/80 transition-colors duration-300">
              <Sparkles size={12} className="text-foreground" />
              Astroventure Nights
            </a>
            <a href="#astrotrain" data-link="astrotrain" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">
              AstroTrain
            </a>
            <a href="#astroed" data-link="astroed" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">
              AstroEd
            </a>
            <a href="#telescopes" data-link="telescopes" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">
              Telescopes
            </a>
            <a href="#about" data-link="about" className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" data-link-button="call" className="text-xs bg-transparent border-foreground/20 text-foreground hover:bg-foreground/10">
              Book a Call
            </Button>
            <Button size="sm" data-link-button="whatsapp" className="bg-foreground hover:bg-foreground/90 text-background text-xs">
              WhatsApp
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-foreground/10 text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-foreground/10 animate-fade-in">
            <nav className="flex flex-col space-y-2 pt-3">
              <a href="/astroventure-nights" className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-foreground/80 transition-colors px-2 py-2 duration-300">
                <Sparkles size={13} />
                Astroventure Nights
              </a>
              <a href="#astrotrain" data-link="astrotrain" className="text-xs text-foreground/60 hover:text-foreground transition-colors px-2 py-2 duration-300">
                AstroTrain
              </a>
              <a href="#astroed" data-link="astroed" className="text-xs text-foreground/60 hover:text-foreground transition-colors px-2 py-2 duration-300">
                AstroEd
              </a>
              <a href="#telescopes" data-link="telescopes" className="text-xs text-foreground/60 hover:text-foreground transition-colors px-2 py-2 duration-300">
                Telescopes
              </a>
              <a href="#about" data-link="about" className="text-xs text-foreground/60 hover:text-foreground transition-colors px-2 py-2 duration-300">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-2 px-2">
                <Button variant="outline" size="sm" data-link-button="call" className="w-full text-xs bg-transparent border-foreground/20 text-foreground hover:bg-foreground/10">
                  Book a Call
                </Button>
                <Button size="sm" data-link-button="whatsapp" className="w-full bg-foreground hover:bg-foreground/90 text-background text-xs">
                  WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
