import type { Metadata } from 'next'

import { whatsappHref } from '@/lib/site-config'
import { NAKSHATRAALAY, POLICIES } from '@/lib/nakshatraalay-data'
import LeadPage from '@/components/nakshatraalay/lead-page'

const PATH = '/schools'
const TITLE = 'School Astronomy Trips near Delhi — Nakshatraalay Gurgaon'
const DESCRIPTION =
  'Bring your classroom under the stars. Telescope sessions, night-sky education and hands-on space science for schools and colleges across Delhi NCR.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: ['school astronomy trip Delhi', 'educational trip near Delhi', 'telescope session for schools'],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const schoolHref = whatsappHref(
  `Hello Astris Space — I'd like to plan a school astronomy visit to ${NAKSHATRAALAY.name}.\n\nSchool:\nCity:\nGrades:\nApproximate number of students:\nPreferred dates:`,
)

export default function SchoolsPage() {
  return (
    <LeadPage
      eyebrow={NAKSHATRAALAY.name}
      heading="Bring your classroom under the stars"
      intro="Astronomy is the one science students can walk outside and check for themselves. A night with real telescopes does more for that than a term of diagrams."
      points={[
        { title: 'Telescope sessions', detail: 'Every student gets time at the eyepiece — the Moon, the planets that are up, and the brightest deep-sky objects.' },
        { title: 'Night-sky education', detail: 'Learning to read the sky: constellations, how objects move, and why any of it is where it is.' },
        { title: 'Hands-on space science', detail: 'Activities that connect what they see to what they are taught in class.' },
        { title: 'Built for a school group', detail: 'Timings, group size and content shaped around your class and your schedule.' },
      ]}
      ctaLabel="Plan a school visit"
      ctaHref={schoolHref}
      footnote={POLICIES.weather}
    />
  )
}
