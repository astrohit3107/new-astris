import AstroHero from '@/components/astroventure/hero'
import DestinationShowcase from '@/components/astroventure/destination-showcase'
import Experiences from '@/components/astroventure/experiences'
import TelescopeGallery from '@/components/astroventure/telescope-gallery'
import Itinerary from '@/components/astroventure/itinerary'
import PhotoGallery from '@/components/astroventure/photo-gallery'
import BookSlots from '@/components/astroventure/book-slots'
import EventCalendar from '@/components/astroventure/calendar'
import RegistrationForm from '@/components/astroventure/registration-form'
import Testimonials from '@/components/astroventure/testimonials'
import Faq from '@/components/astroventure/faq'
import FinalCta from '@/components/astroventure/final-cta'
import { SITE, destinations, upcomingEvents, faqs } from '@/lib/astroventure-data'

const SITE_URL = 'https://astrisspace.com'

function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: 'Astroventure Nights',
        description:
          'Luxury Himalayan dark-sky astronomy expeditions: telescope observation, astrophotography and Milky Way viewing under pristine skies.',
        provider: {
          '@type': 'Organization',
          name: SITE.brand,
          email: SITE.email,
          telephone: SITE.phone,
        },
        touristType: 'Astronomy & adventure travellers',
        itinerary: destinations.map((d) => ({
          '@type': 'Place',
          name: `${d.name}, ${d.valley}`,
        })),
      },
      ...upcomingEvents.map((e) => {
        const dest = destinations.find((d) => d.slug === e.destinationSlug)
        return {
          '@type': 'Event',
          name: e.batchName,
          startDate: e.date,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus:
            e.status === 'soldout'
              ? 'https://schema.org/EventScheduled'
              : 'https://schema.org/EventScheduled',
          location: {
            '@type': 'Place',
            name: `${dest?.name}, ${dest?.valley}`,
            address: { '@type': 'PostalAddress', addressCountry: 'IN' },
          },
          offers: {
            '@type': 'Offer',
            price: e.price,
            priceCurrency: 'INR',
            availability:
              e.status === 'soldout'
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
            url: `${SITE_URL}/astroventure-nights#book`,
          },
        }
      }),
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
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

export default function AstroventureNightsPage() {
  return (
    <>
      <StructuredData />
      <AstroHero />
      <DestinationShowcase />
      <Experiences />
      <TelescopeGallery />
      <Itinerary />
      <PhotoGallery />
      <BookSlots />
      <EventCalendar />
      <RegistrationForm />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
