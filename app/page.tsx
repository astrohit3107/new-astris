import Header from '@/components/header'
import AnnouncementBar from '@/components/announcement-bar'
import Hero from '@/components/hero'
import AstroventureLineup from '@/components/astroventure-lineup'
import NakshatraalayFeatured from '@/components/nakshatraalay-featured'
import NakshatraalayPopup from '@/components/nakshatraalay-popup'
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
      <AstroventureLineup />
      <NakshatraalayFeatured />
      <ProgramTeasers />
      <NakshatraScopes />
      <PartnersMarquee />
      <WhyAstris />
      <FinalCTA />
      <Footer />
      <NakshatraalayPopup />
    </main>
  )
}
