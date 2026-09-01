/**
 * ============================================================================
 *  STRUCTURED DATA FOR THE SEO LAYER
 * ============================================================================
 *  One @graph per guide, built from the guide's own content so the markup can
 *  never describe something the page does not show.
 *
 *  WHAT IS EMITTED, AND WHY ONLY THIS
 *  ----------------------------------
 *  • Article        — these are genuine editorial guides.
 *  • BreadcrumbList — the layer is hierarchical, so the trail is real.
 *  • FAQPage        — ONLY when the guide has FAQs, which are rendered
 *                     visibly on the page. Invisible FAQ markup is a
 *                     violation, not an optimisation.
 *
 *  Deliberately NOT emitted: Event (no invented dates), Product/Offer (no
 *  invented prices), Review or AggregateRating (there are no reviews), and
 *  author Person markup (no fabricated author profiles). The publisher is the
 *  Organization already defined in the root layout, referenced by @id so the
 *  whole site resolves to one entity rather than several.
 * ========================================================================== */

import { SITE_URL, absoluteUrl, SITE } from '@/lib/site-config'
import { breadcrumbsFor } from '@/lib/seo/registry'
import type { Guide } from '@/lib/seo/types'

/** @id of the Organization declared once in app/layout.tsx. */
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

export function guideJsonLd(guide: Guide) {
  const url = absoluteUrl(`/${guide.slug}`)

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      isPartOf: { '@id': WEBSITE_ID },
      headline: guide.h1,
      name: guide.title,
      description: guide.description,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en-IN',
      // Content-review date. Not a fabricated original publication date.
      dateModified: guide.updated,
      publisher: { '@id': ORG_ID },
      // The organisation is the author. No invented bylines.
      author: { '@id': ORG_ID },
      image: absoluteUrl(SITE.ogImage),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: breadcrumbsFor(guide).map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.href),
      })),
    },
  ]

  if (guide.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: guide.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** The /guides index: a CollectionPage listing every guide. */
export function guidesIndexJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${absoluteUrl('/guides')}#page`,
        url: absoluteUrl('/guides'),
        name: 'Astris Guides',
        description:
          'Astris Space guides to astronomy education, astrophotography, stargazing and astronomy travel in India.',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl('/guides')}#list`,
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${absoluteUrl('/guides')}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: absoluteUrl('/guides') },
        ],
      },
    ],
  }
}
