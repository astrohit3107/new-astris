import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationHero from '@/components/astroventure/destination-hero'
import DestinationOverview from '@/components/astroventure/destination-overview'
import Experiences from '@/components/astroventure/experiences'
import Itinerary from '@/components/astroventure/itinerary'
import TelescopeGallery from '@/components/astroventure/telescope-gallery'
import PhotoGallery from '@/components/astroventure/photo-gallery'
import BookSlots from '@/components/astroventure/book-slots'
import RegistrationForm from '@/components/astroventure/registration-form'
import Faq from '@/components/astroventure/faq'
import FinalCta from '@/components/astroventure/final-cta'
import { destinations, getDestination, eventsForDestination } from '@/lib/astroventure-data'

const SITE_URL = 'https://astrisspace.com'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return destinations.map((d) => ({ slug: d.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }

  const title = `${d.name}, ${d.valley} — Stargazing Expedition`
  const description = `${d.tagline} ${d.overview.slice(0, 130)}…`
  return {
    title,
    description,
    alternates: { canonical: `/astroventure-nights/${d.slug}` },
    openGraph: {
      title: `${title} · Astroventure Nights`,
      description,
      url: `/astroventure-nights/${d.slug}`,
      images: [{ url: d.heroImage }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function DestinationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const destination = getDestination(slug)
  if (!destination) notFound()

  const destEvents = eventsForDestination(destination.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `Astroventure Nights — ${destination.name}`,
    description: destination.overview,
    image: destination.heroImage,
    touristType: 'Astronomy & adventure travellers',
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.valley,
      addressRegion: 'Himachal Pradesh',
      addressCountry: 'IN',
    },
    isAccessibleForFree: false,
    ...(destEvents[0]
      ? {
          subjectOf: {
            '@type': 'Event',
            name: destEvents[0].batchName,
            startDate: destEvents[0].date,
            offers: {
              '@type': 'Offer',
              url: `${SITE_URL}/astroventure-nights/${destination.slug}#book`,
            },
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationHero destination={destination} />
      <DestinationOverview destination={destination} />
      <Experiences />
      <Itinerary itinerary={destination.itinerary} destinationName={destination.name} />
      <TelescopeGallery />
      <PhotoGallery />
      <BookSlots slug={destination.slug} />
      <RegistrationForm defaultDestination={destination.slug} />
      <Faq />
      <FinalCta />
    </>
  )
}
