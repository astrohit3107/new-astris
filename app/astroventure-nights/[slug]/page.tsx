import { SITE_URL as CANONICAL_SITE_URL } from '@/lib/site-config'
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
import EventCalendar from '@/components/astroventure/calendar'
import CollegeCta from '@/components/astroventure/college-cta'
import RegistrationForm from '@/components/astroventure/registration-form'
import Faq from '@/components/astroventure/faq'
import RelatedDestinations from '@/components/astroventure/related-destinations'
import FinalCta from '@/components/astroventure/final-cta'
import SaturdaySky from '@/components/astroventure/saturday-sky'
import PropertyGallery, { SAMBHAR_PROPERTY_PHOTOS } from '@/components/astroventure/property-gallery'
import ReservationForm from '@/components/nakshatraalay/reservation-form'
import { paymentsUnderMaintenance } from '@/lib/cashfree'
import {
  destinations,
  getDestination,
  eventsForDestination,
  faqs as defaultFaqs,
} from '@/lib/astroventure-data'

// Canonical production domain — see lib/site-config.ts
const SITE_URL = CANONICAL_SITE_URL

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return destinations.map((d) => ({ slug: d.slug }))
}

export const dynamicParams = false

/**
 * Rebuilt every six hours, so the weekend sky calendar always starts from the
 * coming Saturday rather than whichever Saturday the site was last deployed.
 */
export const revalidate = 21600

/** Cut text at a word boundary so it fits `max` characters, ending in an ellipsis. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]\s*$/, '')}…`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }

  // The layout template appends " · Astroventure Nights", so these stay short
  // enough for the whole title to show in results.
  const title = d.pricing ? `${d.name} Stargazing Weekend` : `${d.name} Stargazing Expedition`
  const priceLine = d.pricing
    ? ` From ${d.pricing.map((p) => `${p.fromCity} ${p.amountLabel}`).join(' · ')}.`
    : ''
  const description = `${d.tagline} ${clip(d.overview, 155 - d.tagline.length - priceLine.length)}${priceLine}`

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
      {destination.weekendStay ? (
        <>
          {/* Saturday stays: what is up each Saturday, where you sleep, and
              online booking — in place of departures and the enquiry form. */}
          <SaturdaySky locationSlug={destination.slug} />
          <PropertyGallery photos={SAMBHAR_PROPERTY_PHOTOS} />
          <section id="book" className="scroll-mt-20 px-5 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-balance text-3xl font-light text-white sm:text-4xl">Book your Saturday</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Dinner, four to five hours of stargazing, the night and breakfast. Return travel is not
                included. Check-out is by 11 am on Sunday.
              </p>
              <div className="mt-8">
                <ReservationForm experienceSlug="sambhar-lake" maintenance={paymentsUnderMaintenance()} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <Pricing destination={destination} />
      )}
      <TelescopeGallery />
      <PhotoGallery />
      {/* Weekend escapes (with published pricing) get a compact calendar/date
          selector; expeditions keep the batch list. */}
      {destination.weekendStay ? null : destination.pricing ? (
        <EventCalendar slug={destination.slug} />
      ) : (
        <BookSlots slug={destination.slug} />
      )}
      {destination.collegeGroups && <CollegeCta destination={destination} />}
      {!destination.weekendStay && (
        <RegistrationForm
          defaultDestination={destination.slug}
          experienceName={destination.pricing ? `Astroventure ${destination.name}` : undefined}
          departureCities={destination.pricing?.map((p) => p.fromCity)}
        />
      )}
      <Faq items={destination.faqs} />
      <RelatedDestinations currentSlug={destination.slug} />
      <FinalCta />
    </>
  )
}
