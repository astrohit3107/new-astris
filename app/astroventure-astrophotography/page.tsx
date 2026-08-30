import { SITE_URL as CANONICAL_SITE_URL } from '@/lib/site-config'
import AstroHero from '@/components/astrophotography/hero'
import AstroIntro from '@/components/astrophotography/intro'
import AstroTrainer from '@/components/astrophotography/trainer'
import AstroWhy from '@/components/astrophotography/why'
import AstroCurriculum from '@/components/astrophotography/curriculum'
import AstroRoute from '@/components/astrophotography/route'
import AstroItinerary from '@/components/astrophotography/itinerary'
import AstroAudience from '@/components/astrophotography/audience'
import AstroEquipment from '@/components/astrophotography/equipment'
import AstroProvide from '@/components/astrophotography/provide'
import AstroPricing from '@/components/astrophotography/pricing'
import AstroInclusions from '@/components/astrophotography/inclusions'
import AstroKit from '@/components/astrophotography/kit'
import AstroPortfolio from '@/components/astrophotography/portfolio'
import AstroStudentGallery from '@/components/astrophotography/student-gallery'
import AstroFaq from '@/components/astrophotography/faq'
import AstroLimitedSeats from '@/components/astrophotography/limited-seats'
import AstroFinalCta from '@/components/astrophotography/final-cta'
import AstroBooking from '@/components/astrophotography/booking'
import {
  ASTRO,
  ASTRO_CONTACT,
  ASTRO_TRAINER,
  astroPricing,
  astroItinerary,
  astroFaqs,
} from '@/lib/astrophotography-data'

// Canonical production domain — see lib/site-config.ts
const SITE_URL = CANONICAL_SITE_URL

function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: ASTRO.name,
        description:
          'A 6-day, 5-night immersive astrophotography expedition through Ladakh (Leh, Pangong, Hanle, Tso Moriri): Milky Way photography, deep-space imaging, star trails, timelapse and a professional editing workflow under India’s darkest skies.',
        provider: {
          '@type': 'Organization',
          name: ASTRO_CONTACT.brand,
          email: ASTRO_CONTACT.email,
          telephone: ASTRO_CONTACT.phone,
        },
        touristType: 'Astrophotographers, landscape photographers & astronomy enthusiasts',
        itinerary: astroItinerary.map((d) => ({
          '@type': 'Place',
          name: `Day ${d.day}: ${d.route} — ${d.title}`,
        })),
      },
      {
        '@type': 'EducationEvent',
        name: ASTRO.name,
        description:
          'A field-based astrophotography masterclass: camera fundamentals, Milky Way and deep-sky imaging, star trails, timelapse and professional post-processing, with hands-on mentoring every night.',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Ladakh (Leh · Pangong · Hanle · Tso Moriri)',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Ladakh',
            addressCountry: 'IN',
          },
        },
        performer: { '@type': 'Person', name: ASTRO_TRAINER.name },
        organizer: { '@type': 'Organization', name: ASTRO_CONTACT.brand },
        offers: astroPricing.map((p) => ({
          '@type': 'Offer',
          name: p.route,
          price: p.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${ASTRO.bookingPath}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: astroFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function AstrophotographyPage() {
  return (
    <>
      <StructuredData />
      <AstroHero />
      <AstroIntro />
      <AstroTrainer />
      <AstroWhy />
      <AstroCurriculum />
      <AstroRoute />
      <AstroItinerary />
      <AstroAudience />
      <AstroEquipment />
      <AstroProvide />
      <AstroPricing />
      <AstroInclusions />
      <AstroKit />
      <AstroPortfolio />
      <AstroStudentGallery />
      <AstroFaq />
      <AstroLimitedSeats />
      <AstroFinalCta />
      <AstroBooking />
    </>
  )
}
