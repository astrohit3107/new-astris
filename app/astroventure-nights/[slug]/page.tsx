import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationHero from '@/components/astroventure/destination-hero'
import DestinationOverview from '@/components/astroventure/destination-overview'
import Experiences from '@/components/astroventure/experiences'
import Itinerary from '@/components/astroventure/itinerary'
import Pricing from '@/components/astroventure/pricing'
import TelescopeGallery from '@/components/astroventure/telescope-gallery'
import PhotoGallery from '@/components/astroventure/photo-gallery'
import BookSlots from '@/components/astroventure/book-slots'
import CollegeCta from '@/components/astroventure/college-cta'
import RegistrationForm from '@/components/astroventure/registration-form'
import Faq from '@/components/astroventure/faq'
import RelatedDestinations from '@/components/astroventure/related-destinations'
import FinalCta from '@/components/astroventure/final-cta'
import {
  destinations,
  getDestination,
  eventsForDestination,
  faqs as defaultFaqs,
} from '@/lib/astroventure-data'

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

  const title = d.pricing
    ? `${d.name} Stargazing Weekend — ${d.categoryLabel ?? 'Astroventure'}`
    : `${d.name}, ${d.valley} — Stargazing Expedition`
  const priceLine = d.pricing
    ? ` Weekend astronomy from ${d.pricing
        .map((p) => `${p.fromCity} ${p.amountLabel}`)
        .join(' · ')}.`
    : ''
  const description = `${d.tagline} ${d.overview.slice(0, 120)}…${priceLine}`

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
  const faqItems = destination.faqs ?? defaultFaqs
  const url = `${SITE_URL}/astroventure-nights/${destination.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        name: `Astroventure Nights — ${destination.name}`,
        description: destination.overview,
        image: destination.heroImage,
        url,
        touristType: 'Astronomy & adventure travellers',
        address: {
          '@type': 'PostalAddress',
          addressLocality: destination.valley,
          addressRegion: destination.region ?? 'Himachal Pradesh',
          addressCountry: 'IN',
        },
        isAccessibleForFree: false,
        ...(destination.pricing
          ? {
              makesOffer: destination.pricing.map((p) => ({
                '@type': 'Offer',
                name: p.route,
                price: p.amount,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url: `${url}#pricing`,
              })),
            }
          : {}),
        ...(destEvents[0]
          ? {
              subjectOf: {
                '@type': 'Event',
                name: destEvents[0].batchName,
                startDate: destEvents[0].date,
                offers: { '@type': 'Offer', url: `${url}#book` },
              },
            }
          : {}),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astroventure Nights', item: `${SITE_URL}/astroventure-nights` },
          { '@type': 'ListItem', position: 2, name: destination.name, item: url },
        ],
      },
    ],
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
      <Pricing destination={destination} />
      <TelescopeGallery />
      <PhotoGallery />
      <BookSlots slug={destination.slug} />
      {destination.collegeGroups && <CollegeCta destination={destination} />}
      <RegistrationForm defaultDestination={destination.slug} />
      <Faq items={destination.faqs} />
      <RelatedDestinations currentSlug={destination.slug} />
      <FinalCta />
    </>
  )
}
