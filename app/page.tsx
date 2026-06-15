import Header from '@/components/header'
import Hero from '@/components/hero'
import AstroTrain from '@/components/astrotrain'
import AstroEd from '@/components/astroed'
import NakshatraScopes from '@/components/nakshatra-scopes'
import WhyAstris from '@/components/why-astris'
import FinalCTA from '@/components/final-cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AstroTrain />
      <AstroEd />
      <NakshatraScopes />
      <WhyAstris />
      <FinalCTA />
      <Footer />
    </main>
  )
}
