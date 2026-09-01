import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import GuidePage from '@/components/seo/guide-page'
import { getGuide, guides } from '@/lib/seo/registry'
import { guideJsonLd } from '@/lib/seo/schema'
import { SITE } from '@/lib/site-config'

/**
 * ============================================================================
 *  THE SEO ACQUISITION LAYER — one route for every guide
 * ============================================================================
 *  A root catch-all. Next.js resolves static segments before dynamic ones, so
 *  every existing commercial route (/astroed, /astrotrain, /experiences/[slug],
 *  /astroventure-nights/[slug], /nakshatraalay/gurgaon, the workshops …) still
 *  wins and is completely unaffected. This route only ever sees paths nothing
 *  else claimed.
 *
 *  `generateStaticParams` prerenders every guide at build time, and
 *  `dynamicParams = false` means an unknown path returns a real 404 rather
 *  than being rendered on demand — so this cannot become a soft-404 surface.
 * ========================================================================== */

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ guide: g.slug.split('/') }))
}

type Params = { guide: string[] }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { guide: segments } = await params
  const guide = getGuide(segments.join('/'))
  if (!guide) return {}

  const path = `/${guide.slug}`

  return {
    title: guide.title,
    description: guide.description,
    // Self-referencing canonical, resolved against the canonical production
    // origin by metadataBase in the root layout.
    alternates: { canonical: path },
    keywords: guide.keywords ? [...guide.keywords] : undefined,
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      modifiedTime: guide.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function GuideRoute({ params }: { params: Promise<Params> }) {
  const { guide: segments } = await params
  const guide = getGuide(segments.join('/'))
  if (!guide) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)) }}
      />
      <GuidePage guide={guide} />
    </>
  )
}
