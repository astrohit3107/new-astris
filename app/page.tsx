import Header from '@/components/header'
import AnnouncementBar from '@/components/announcement-bar'
import Hero from '@/components/hero'
import SpitiFeatured from '@/components/spiti-featured'
import AstroventureLineup from '@/components/astroventure-lineup'
import SpitiPromoPopup from '@/components/spiti-promo-popup'
import ProgramTeasers from '@/components/program-teasers'
import NakshatraScopes from '@/components/nakshatra-scopes'
import PartnersMarquee from '@/components/partners-marquee'
import WhyAstris from '@/components/why-astris'
import FinalCTA from '@/components/final-cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <Hero />
      <SpitiFeatured />
      <AstroventureLineup />
      <ProgramTeasers />
      <NakshatraScopes />
      <PartnersMarquee />
      <WhyAstris />
      <FinalCTA />
      <Footer />
      <SpitiPromoPopup />
    </main>
  )
}
