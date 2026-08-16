'use client'

import { useState } from 'react'
import { Menu, X, Sparkles, ChevronDown, ArrowUpRight, Camera, Moon, Telescope, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { experiencesInOrder } from '@/lib/astroventure-experiences'

// Icon lookup for the registry-driven Astroventure menu.
const NAV_ICONS = { Sparkles, Camera, Moon, Telescope, MapPin } as const

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Single source of truth: every active Astroventure experience.
  const experiences = experiencesInOrder

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Astris Space" className="w-8 h-8 border border-foreground/40 rounded" />
            <span className="text-xl font-bold text-foreground">Astris Space</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Astroventure dropdown — driven by the active-experience registry */}
            <div className="group relative">
              <a
                href="/astroventure-nights"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                <Sparkles size={12} className="text-[var(--av-gold)]" />
                Astroventure
                <ChevronDown size={12} className="text-foreground/50 transition-transform duration-300 group-hover:rotate-180" />
              </a>
              {/* Hover menu */}
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-foreground/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {experiences.map((exp) => {
                    const Icon = NAV_ICONS[exp.icon] ?? Sparkles
                    return (
                      <a
                        key={exp.id}
                        href={exp.href}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--av-gold)]/15 ring-1 ring-[var(--av-gold)]/25">
                          <Icon size={13} className="text-[var(--av-gold)]" />
                        </span>
                        <span className="flex flex-col">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                            {exp.name}
                            {exp.badge && (
                              <span className="rounded-full bg-[var(--av-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--av-gold)]">
                                {exp.badge}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 text-[11px] text-foreground/55">{exp.blurb}</span>
                        </span>
                      </a>
                    )
                  })}
                  <a
                    href="/astroventure-nights"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground/5 ring-1 ring-foreground/10">
                      <ArrowUpRight size={13} className="text-foreground/70" />
                    </span>
                    <span className="text-xs font-medium text-foreground/80">All Astroventure Nights</span>
                  </a>
                </div>
              </div>
            </div>
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
              {/* Astroventure group */}
              <div className="rounded-lg bg-foreground/[0.03] px-2 py-2">
                <span className="flex items-center gap-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                  <Sparkles size={12} className="text-[var(--av-gold)]" /> Astroventure
                </span>
                {experiences.map((exp, i) => (
                  <a
                    key={exp.id}
                    href={exp.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between gap-2 rounded-md px-1 py-2 text-xs font-bold text-foreground ${i === 0 ? 'mt-1.5' : ''}`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {exp.name}
                      {exp.badge && (
                        <span className="rounded-full bg-[var(--av-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--av-gold)]">
                          {exp.badge}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight size={13} className="text-foreground/50" />
                  </a>
                ))}
                <a href="/astroventure-nights" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between gap-2 rounded-md px-1 py-2 text-xs font-medium text-foreground/80">
                  All Astroventure Nights
                  <ArrowUpRight size={13} className="text-foreground/40" />
                </a>
              </div>
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
