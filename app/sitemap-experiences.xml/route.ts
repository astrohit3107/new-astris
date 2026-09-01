import { experienceEntries, urlsetXml, XML_RESPONSE_HEADERS } from '@/lib/seo/sitemap'

/** Destination and experience detail pages. Archived destinations excluded. */
export const dynamic = 'force-static'

export function GET() {
  return new Response(urlsetXml(experienceEntries()), { headers: XML_RESPONSE_HEADERS })
}
