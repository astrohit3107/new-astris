import { guideEntries, urlsetXml, XML_RESPONSE_HEADERS } from '@/lib/seo/sitemap'

/** The SEO acquisition layer. Kept separate so its indexing is measurable. */
export const dynamic = 'force-static'

export function GET() {
  return new Response(urlsetXml(guideEntries()), { headers: XML_RESPONSE_HEADERS })
}
