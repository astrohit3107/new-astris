import SpitiHero from '@/components/spiti/hero'
import SpitiOverview from '@/components/spiti/overview'
import SpitiHighlights from '@/components/spiti/highlights'
import SpitiItinerary from '@/components/spiti/itinerary'
import SpitiAstronomyNights from '@/components/spiti/astronomy-nights'
import SpitiExclusiveExperiences from '@/components/spiti/exclusive-experiences'
import SpitiExpeditionKit from '@/components/spiti/expedition-kit'
import SpitiInclusions from '@/components/spiti/inclusions'
import SpitiGallery from '@/components/spiti/gallery'
import SpitiFaq from '@/components/spiti/faq'
import SpitiBooking from '@/components/spiti/booking'
import {
  SPITI,
  SPITI_CONTACT,
  spitiFaqs,
  spitiItinerary,
} from '@/lib/spiti-data'

const SITE_URL = 'https://astrisspace.com'

function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: SPITI.name,
        description:
          'An 8-day, 7-night premium high-altitude astronomy expedition through the Spiti Himalayas: dark-sky observation, large telescopes, astrophotography and Milky Way photography.',
        provider: {
          '@type': 'Organization',
          name: SPITI_CONTACT.brand,
          email: SPITI_CONTACT.email,
          telephone: SPITI_CONTACT.phone,
        },
        touristType: 'Astronomy & adventure travellers',
        itinerary: spitiItinerary.map((d) => ({
          '@type': 'Place',
          name: `Day ${d.day}: ${d.route}`,
        })),
      },
      {
        '@type': 'Event',
        name: SPITI.name,
        startDate: SPITI.startDateISO,
        endDate: SPITI.endDateISO,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Spiti Valley, Himachal Pradesh',
          address: { '@type': 'PostalAddress', addressRegion: 'Himachal Pradesh', addressCountry: 'IN' },
        },
        offers: SPITI.pricing.map((p) => ({
          '@type': 'Offer',
          name: p.route,
          price: p.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${SPITI.bookingPath}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: spitiFaqs.map((f) => ({
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

export default function AstroventureSpitiPage() {
  return (
    <>
      <StructuredData />
      <SpitiHero />
      <SpitiOverview />
      <SpitiHighlights />
      <SpitiItinerary />
      <SpitiAstronomyNights />
      <SpitiExclusiveExperiences />
      <SpitiExpeditionKit />
      <SpitiInclusions />
      <SpitiGallery />
      <SpitiFaq />
      <SpitiBooking />
    </>
  )
}
