import { SITE_URL as CANONICAL_SITE_URL } from '@/lib/site-config'
import {
  WorkshopHero,
  WorkshopPromise,
  WorkshopOutcomes,
  WorkshopNarrowband,
  WorkshopWorkflow,
  WorkshopCurriculum,
  WorkshopTrainer,
  WorkshopAudience,
  WorkshopIncluded,
} from '@/components/workshop-delhi/sections'
import WorkshopBooking from '@/components/workshop-delhi/booking'
import Faq from '@/components/astroventure/faq'
import {
  WORKSHOP,
  WORKSHOP_CONTACT,
  WORKSHOP_TRAINER,
  workshopFaqs,
  workshopWeekends,
} from '@/lib/workshop-delhi-data'

// Canonical production domain — see lib/site-config.ts
const SITE_URL = CANONICAL_SITE_URL

function StructuredData() {
  const weekends = workshopWeekends()
  const url = `${SITE_URL}${WORKSHOP.path}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: WORKSHOP.name,
        description:
          'A hands-on weekend workshop on deep-sky astrophotography from heavily light-polluted Delhi using narrowband imaging (Hα, OIII, SII): equipment, acquisition, a live imaging session, calibration, stacking and processing to a finished image.',
        url,
        provider: {
          '@type': 'Organization',
          name: WORKSHOP_CONTACT.brand,
          email: WORKSHOP_CONTACT.email,
          telephone: WORKSHOP_CONTACT.phone,
        },
        hasCourseInstance: weekends.map((w) => ({
          '@type': 'CourseInstance',
          name: `${WORKSHOP.name} — ${w.label}`,
          startDate: w.date,
          courseMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: 'Delhi, India',
            address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressRegion: 'Delhi', addressCountry: 'IN' },
          },
          instructor: { '@type': 'Person', name: WORKSHOP_TRAINER.name },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: workshopFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: WORKSHOP.name, item: url },
        ],
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

export default function DelhiWorkshopPage() {
  return (
    <>
      <StructuredData />
      <WorkshopHero />
      <WorkshopPromise />
      <WorkshopOutcomes />
      <WorkshopNarrowband />
      <WorkshopWorkflow />
      <WorkshopCurriculum />
      <WorkshopTrainer />
      <WorkshopAudience />
      <WorkshopIncluded />
      <WorkshopBooking />
      <Faq
        items={workshopFaqs}
        eyebrow="Good to know"
        title="Workshop FAQ"
      />
    </>
  )
}
