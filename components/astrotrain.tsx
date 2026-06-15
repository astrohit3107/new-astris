'use client'

import { Sparkles, Users, TrendingUp, Shield } from 'lucide-react'

export default function AstroTrain() {
  const features = [
    { icon: Sparkles, title: 'Complete Installation', desc: 'Telescope setup & calibration' },
    { icon: Users, title: 'Staff Training', desc: 'Certified astronomy programs' },
    { icon: TrendingUp, title: 'Revenue Ready', desc: 'Monetizable guest experiences' },
    { icon: Shield, title: 'Full Support', desc: 'Maintenance & operations' },
  ]

  return (
    <section id="astrotrain" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/3 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-2 mb-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground text-balance leading-tight">
            AstroTrain
          </h2>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl">
            Premium astronomy programs for luxury resorts—complete installation, training, and guest experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image & Metrics */}
          <div className="space-y-4 animate-slide-in-left">
            <div className="relative h-80 rounded-2xl overflow-hidden border border-primary/30 group shadow-2xl">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AstroTrain.JPG-pxICHyxhRl4Bi2eAyS7PR0RkT3X27U.jpeg" 
                alt="Resort astronomy experience" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="space-y-2">
                  <div className="text-sm font-bold text-white">Premium Resort Astronomy</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2.5 py-1 rounded-lg bg-accent/20 border border-accent/50 text-gray-700 text-xs font-semibold">
                      10+ Resorts
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-primary/20 border border-primary/50 text-gray-600 text-xs font-semibold">
                      98% Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all hover:border-primary/50 cursor-pointer">
                <div className="text-2xl md:text-3xl font-black text-accent">₹80K</div>
                <p className="text-xs text-foreground/60 mt-0.5">Starting at</p>
              </div>
              <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all hover:border-accent/50 cursor-pointer">
                <div className="text-2xl md:text-3xl font-black text-accent">6-12M</div>
                <p className="text-xs text-foreground/60 mt-0.5">ROI Timeline</p>
              </div>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className="space-y-4 animate-slide-in-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-primary/20 hover:border-accent/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-accent/10"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-all">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-foreground leading-tight">{feature.title}</h3>
                        <p className="text-xs text-foreground/60 leading-snug mt-0.5">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Description */}
            <div className="pt-2 space-y-2 text-sm text-foreground/70 leading-relaxed">
              <p>
                Complete astronomy enablement solution for resorts and hotels. From telescope installation to staff training and curated guest sessions.
              </p>
            </div>

            {/* CTA */}
            <button
              data-link-button="astrotrain-proposal"
              className="w-full mt-3 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
            >
              Request AstroTrain Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
