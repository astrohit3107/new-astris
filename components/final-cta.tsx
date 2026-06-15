'use client'

import { MessageCircle, Calendar, FileText } from 'lucide-react'

export default function FinalCTA() {
  const channels = [
    {
      icon: FileText,
      title: 'Request Proposal',
      desc: 'Customized solution for your institution',
      action: 'Get a Proposal',
      link: 'proposal-link'
    },
    {
      icon: Calendar,
      title: 'Book a Call',
      desc: 'Discuss your astronomy journey with experts',
      action: 'Schedule Now',
      link: 'call-link'
    },
    {
      icon: MessageCircle,
      title: 'Chat on WhatsApp',
      desc: 'Quick answers to your questions',
      action: 'Message Us',
      link: 'whatsapp-link'
    },
  ]

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/3 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-3 mb-10 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground text-balance leading-tight">
            Ready to Launch Your Astronomy Journey?
          </h2>
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
            Schools and resorts across India trust Astris Space. Connect with our team today.
          </p>
        </div>

        {/* CTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {channels.map((channel, idx) => {
            const Icon = channel.icon
            return (
              <button
                key={idx}
                data-link-button={channel.link}
                className="p-6 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-primary/20 hover:border-accent/50 transition-all duration-300 group text-left space-y-3 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all">
                  <Icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{channel.title}</h3>
                  <p className="text-xs text-foreground/60 mt-1">{channel.desc}</p>
                </div>
                <div className="pt-1 flex items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all">
                  {channel.action}
                  <span>→</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Trust message */}
        <div className="mt-8 text-center space-y-2 text-xs text-foreground/60 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p>Serving 100+ schools • 10+ resorts • 5+ years of excellence</p>
          <p>Response within 24 hours • Free consultation</p>
        </div>
      </div>
    </section>
  )
}
