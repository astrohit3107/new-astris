import Header from '@/components/header'
import AnnouncementBar from '@/components/announcement-bar'
import Hero from '@/components/hero'
import SpitiFeatured from '@/components/spiti-featured'
import SpitiPromoPopup from '@/components/spiti-promo-popup'
import AstroTrain from '@/components/astrotrain'
import AstroEd from '@/components/astroed'
import NakshatraScopes from '@/components/nakshatra-scopes'
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
      <AstroTrain />
      <AstroEd />
      <NakshatraScopes />
      <WhyAstris />
      <FinalCTA />
      <Footer />
      <SpitiPromoPopup />
    </main>
  )
}
