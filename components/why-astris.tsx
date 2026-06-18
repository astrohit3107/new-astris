import { Card } from '@/components/ui/card'
import { Lightbulb, Users, Zap, Award } from 'lucide-react'

export default function WhyAstris() {
  const reasons = [
    {
      icon: Lightbulb,
      title: 'Multi-Vertical Expertise',
      description: 'Education, tourism, infrastructure, and hardware expertise in one partner',
    },
    {
      icon: Users,
      title: 'Execution Partner',
      description: '15+ years transforming ideas into scalable astronomical experiences',
    },
    {
      icon: Zap,
      title: 'Long-Term Commitment',
      description: 'Ecosystem builders supporting your institution for years to come',
    },
    {
      icon: Award,
      title: 'Large-Scale Impact',
      description: '500+ schools, 50+ resorts, 50,000+ students annually',
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground text-balance leading-tight">
            Why Astris Space?
          </h2>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl font-light">
            Your partner in building an experiential ecosystem that inspires wonder and discovery through astronomy.
          </p>
        </div>

        {/* Observatory image */}
        <div className="relative h-72 rounded-2xl overflow-hidden border border-foreground/20 group shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Why%20Astris-NBH8iMndxxKMFV1SRjvl5lEYhWuZE1.jpeg" 
            alt="Astris Space students with space exhibition" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="p-4 rounded-xl bg-secondary hover:bg-secondary/70 border border-foreground/20 hover:border-foreground/40 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-foreground/10">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/20 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/30 transition-all">
                    <Icon size={20} className="text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-foreground leading-tight">{reason.title}</h3>
                    <p className="text-xs text-foreground/70 leading-snug mt-0.5">{reason.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Impact metrics */}
        <div className="bg-secondary border border-foreground/20 rounded-2xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">Our Impact by the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1 text-center">
              <p className="text-2xl md:text-3xl font-black text-foreground">5+</p>
              <p className="text-xs md:text-sm text-foreground/70 leading-tight">Years</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-2xl md:text-3xl font-black text-foreground">100+</p>
              <p className="text-xs md:text-sm text-foreground/70 leading-tight">Schools</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-2xl md:text-3xl font-black text-foreground">50,000+</p>
              <p className="text-xs md:text-sm text-foreground/70 leading-tight">Students</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-2xl md:text-3xl font-black text-foreground">50+</p>
              <p className="text-xs md:text-sm text-foreground/70 leading-tight">Resorts</p>
            </div>
          </div>
        </div>

        {/* ISRO Space Tutor affiliation */}
        <div
          className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/20 bg-secondary p-6 md:p-8 text-center animate-fade-in-up"
          style={{ animationDelay: '0.35s' }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Recognised Affiliation
          </p>
          <img
            src="/partners/isro-logo.webp"
            alt="ISRO — Indian Space Research Organisation"
            className="h-20 w-auto object-contain"
          />
          <p className="text-base md:text-lg font-bold text-foreground">Official ISRO Space Tutor</p>
          <p className="max-w-xl text-sm font-light text-foreground/70">
            Astris Space is an affiliated ISRO Space Tutor — bringing authentic,
            space-agency-backed astronomy education to schools, resorts and explorers across India.
          </p>
        </div>

        {/* Key values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary border-foreground/20 p-8 hover:border-foreground/40 transition-all duration-500 hover:shadow-lg hover:shadow-foreground/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-bold text-foreground mb-3">Mission-Driven</h4>
            <p className="text-foreground/70 font-light">
              Every program is designed with one goal: inspire curiosity and foster lifelong learners passionate about astronomy and space science.
            </p>
          </Card>
          <Card className="bg-secondary border-foreground/20 p-8 hover:border-foreground/40 transition-all duration-500 hover:shadow-lg hover:shadow-foreground/10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h4 className="text-lg font-bold text-foreground mb-3">Premium Quality</h4>
            <p className="text-foreground/70 font-light">
              From expert instructors to world-class equipment, we maintain the highest standards in every aspect of our work.
            </p>
          </Card>
          <Card className="bg-secondary border-foreground/20 p-8 hover:border-foreground/40 transition-all duration-500 hover:shadow-lg hover:shadow-foreground/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h4 className="text-lg font-bold text-foreground mb-3">Innovation First</h4>
            <p className="text-foreground/70 font-light">
              We blend cutting-edge technology, VR experiences, and hands-on learning to make astronomy accessible and unforgettable.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
