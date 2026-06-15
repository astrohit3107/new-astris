'use client'

import { Telescope, BookOpen, Rocket, Zap } from 'lucide-react'

export default function AstroEd() {
  const activities = [
    { icon: Telescope, title: 'Telescope Observing', desc: 'Live celestial & solar observations' },
    { icon: Rocket, title: 'Rocket Launches', desc: 'Model rocketry & physics STEM' },
    { icon: BookOpen, title: 'ISRO Curriculum', desc: 'Space science aligned modules' },
    { icon: Zap, title: 'VR Experiences', desc: 'Immersive solar system journeys' },
  ]

  const stats = [
    { value: '50,000+', label: 'Students Annually' },
    { value: '1,000+', label: 'Programs/Year' },
    { value: '95%', label: 'Positive Feedback' },
  ]

  return (
    <section id="astroed" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/3 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-2 mb-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground text-balance leading-tight">
            AstroEd
          </h2>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl">
            Transforming science education through immersive astronomy experiences for schools nationwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Programs Grid */}
          <div className="space-y-4 animate-slide-in-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activities.map((activity, idx) => {
                const Icon = activity.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-all">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-foreground leading-tight">{activity.title}</h3>
                        <p className="text-xs text-foreground/60 leading-snug mt-0.5">{activity.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 space-y-2">
              <p className="text-sm text-foreground/70 leading-relaxed">
                Comprehensive school programs blending practical astronomy, space science, and STEM. Delivered by trained educators using professional equipment across Grades 4–12.
              </p>
            </div>

            {/* CTA */}
            <button
              data-link-button="astroed-proposal"
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Bring AstroEd to Your School
            </button>
          </div>

          {/* Right: Image & Stats */}
          <div className="space-y-4 animate-slide-in-right">
            <div className="relative h-80 rounded-2xl overflow-hidden border border-primary/30 group shadow-2xl">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AstroEd-hPKXNzmFOa7esBydivz0xcqjzJrgEX.jpeg" 
                alt="Students learning astronomy" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Overlay */}
              <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="text-sm font-bold text-white">Hands-On Science Learning</div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-2">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all text-center cursor-pointer hover:border-primary/50"
                >
                  <div className="text-xl md:text-2xl font-black text-accent leading-tight">{stat.value}</div>
                  <p className="text-xs text-foreground/60 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-primary/30 hover:border-accent/50 transition-all cursor-pointer">
              <p className="text-xs font-semibold text-foreground mb-1">Trusted by 100+ Schools</p>
              <p className="text-xs text-foreground/60">CBSE, ICSE, and state boards across India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
