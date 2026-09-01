import type { Metadata } from 'next'

import { NAKSHATRAALAY, groupHref, POLICIES } from '@/lib/nakshatraalay-data'
import LeadPage from '@/components/nakshatraalay/lead-page'

const PATH = '/groups'
const TITLE = 'Group & Corporate Astronomy Experiences near Delhi'
const DESCRIPTION =
  'Dedicated astronomy nights for company teams, photography communities and private groups at Nakshatraalay Gurgaon, an easy drive from Delhi NCR.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: ['corporate offsite near Delhi', 'group stargazing Delhi NCR', 'team astronomy experience'],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function GroupsPage() {
  return (
    <LeadPage
      eyebrow={NAKSHATRAALAY.name}
      heading="Bring your team under the stars"
      intro="A night of real astronomy is a better offsite than another conference room — and people remember the first time they see Saturn properly. We build the evening around your group."
      points={[
        { title: 'Company teams', detail: 'An evening that works as an offsite: guided observation, plenty of telescope time, and space to actually talk to each other.' },
        { title: 'Photography groups', detail: 'A dark-sky night built for cameras, with guidance for people who already shoot and want to shoot the sky.' },
        { title: 'Private groups', detail: 'Friends, families, societies — the night paced for the people in it rather than a fixed script.' },
        { title: 'Built around your date', detail: 'Tell us when you want to come and we will tell you honestly what the Moon is doing that night.' },
      ]}
      ctaLabel="Plan a group experience"
      ctaHref={groupHref}
      footnote={POLICIES.weather}
    />
  )
}
