'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function NakshatraScopes() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="telescopes" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-foreground rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-foreground rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground text-balance leading-tight mb-4">
            Nakshatra Scopes
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            Premium telescope solutions crafted for discovery and learning
          </p>
        </div>

        {/* Main showcase - Portrait oriented layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image section */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Border effect */}
              <div className="absolute -inset-1 bg-foreground rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Main image container */}
              <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden border border-foreground/20 bg-secondary">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-06-07%20at%2002.05.08-Ux2PkgtPcAVtoyCuDeyrI2oheSMzkj.jpeg" 
                  alt="Nakshatra Scope telescope experience" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating accent element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-foreground/5 rounded-full blur-2xl animate-float" />
            </div>
          </div>

          {/* Content section */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 border border-foreground/20">
              <span className="text-sm font-bold text-foreground">PREMIUM OPTICS</span>
            </div>

            {/* Main heading for content */}
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                Experience <span className="text-foreground/70">Crystal Clear</span> Skies
              </h3>
              <p className="text-foreground/70 leading-relaxed font-light">
                Nakshatra Scopes combines cutting-edge optical engineering with intuitive design, making astronomy accessible to everyone—from curious beginners to seasoned enthusiasts.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Exceptional Optics', desc: 'Premium glass engineering' },
                { label: 'Easy Assembly', desc: 'Tool-free setup' },
                { label: 'Durable Build', desc: 'Built to last' },
                { label: 'Expert Support', desc: '24/7 guidance' },
              ].map((feature, idx) => (
                <div 
                  key={feature.label}
                  className={`p-4 rounded-xl bg-secondary border border-foreground/20 hover:border-foreground/40 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-foreground/10 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <p className="font-bold text-sm text-foreground">{feature.label}</p>
                  <p className="text-xs text-foreground/70 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className={`pt-4 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.7s' }}>
              <button
                onClick={() => window.open('https://nakshatrascopes.in', '_blank')}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-foreground hover:bg-foreground/90 text-background font-bold rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/20 hover:-translate-y-1 active:translate-y-0"
              >
                <span>Explore Nakshatra Scopes</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
