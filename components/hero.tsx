'use client'

import { Sparkles, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Cosmic background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-bg-XqVMusmTrzk3gwpYLMFbVJW6dmL0yA.jpeg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      


      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in-up">
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/10 text-xs font-semibold text-white uppercase tracking-wide backdrop-blur-sm">
             India's Premier Astronomy Ecosystem
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white text-balance leading-tight tracking-tighter">
            Bring the Universe Closer
          </h1>
          
          <p className="text-base sm:text-lg text-white/85 max-w-3xl mx-auto text-balance leading-relaxed font-light">
            Experiential astronomy & space education transforming schools and resorts across India. Professional programs, premium telescopes, and immersive cosmic experiences.
          </p>
        </div>

        {/* Featured experience: Astroventure Nights */}
        <div className="pt-1">
          <a
            href="/astroventure-nights"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 bg-gradient-to-r from-white/20 to-white/5 text-white text-sm font-bold backdrop-blur-md shadow-lg transition-all duration-500 hover:scale-105 hover:border-white hover:shadow-2xl"
          >
            <Sparkles size={16} className="animate-pulse-glow" />
            <span>New · Astroventure Nights — Himalayan stargazing expeditions</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Trust indicators - compact horizontal layout */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-glow" />
            <span className="text-white/80">100+ Schools</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-glow" style={{ animationDelay: '0.3s' }} />
            <span className="text-white/80">50+ Resorts</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-glow" style={{ animationDelay: '0.6s' }} />
            <span className="text-white/80">5+ Years</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-3">
          <button 
            data-link-button="proposal"
            className="px-6 py-2.5 bg-white hover:bg-white/95 text-black font-bold text-sm rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            Request Proposal
          </button>
          <button 
            data-link-button="call"
            className="px-6 py-2.5 border-2 border-white/60 hover:border-white text-white font-bold text-sm rounded-lg transition-all duration-500 hover:bg-white/5 bg-transparent backdrop-blur-sm"
          >
            Book a Call
          </button>
          <button 
            data-link-button="whatsapp"
            className="px-6 py-2.5 bg-black/60 hover:bg-black/70 text-white font-bold text-sm rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/20"
          >
            WhatsApp Us
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
