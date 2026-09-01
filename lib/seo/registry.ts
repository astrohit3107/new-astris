/**
 * ============================================================================
 *  SEO LAYER REGISTRY — the single source of truth for the guide ecosystem
 * ============================================================================
 *  Everything that needs to know what pages exist reads from here: the
 *  catch-all route, the /guides index, the sitemaps, the breadcrumbs and the
 *  related-content engine. Adding a guide to a content file is the only edit
 *  required to publish it — it appears in the sitemap, gets breadcrumbs,
 *  gets schema, and becomes linkable from its cluster automatically.
 * ========================================================================== */

import type { Cluster, ClusterId, Guide } from '@/lib/seo/types'

import { educationGuides } from '@/lib/seo/content/education'
import { astrophotographyGuides } from '@/lib/seo/content/astrophotography'
import { stargazingGuides } from '@/lib/seo/content/stargazing'
import { resortGuides } from '@/lib/seo/content/resorts'
import { staysGuides } from '@/lib/seo/content/stays'

/* ---------------------------------------------------------------------------
 * Clusters
 * ------------------------------------------------------------------------- */
export const clusters: Cluster[] = [
  {
    id: 'astronomy-education',
    hub: '/astronomy-education',
    name: 'Astronomy education',
    blurb:
      'Space labs, telescope programmes and space-science curriculum for Indian schools — what a real programme contains and how to start one.',
    funnel: 'AstroEd',
  },
  {
    id: 'astrophotography',
    hub: '/astrophotography',
    name: 'Astrophotography',
    blurb:
      'From a first tripod frame to narrowband deep-sky imaging from a light-polluted city — the technique, honestly explained.',
    funnel: 'Delhi Deep-Sky Workshop & the Ladakh expedition',
  },
  {
    id: 'stargazing',
    hub: '/stargazing',
    name: 'Stargazing',
    blurb:
      'Where to go, when to go, and what you can actually see — including from inside an Indian city.',
    funnel: 'Astroventure Nights & Nakshatraalay',
  },
  {
    id: 'resort-astronomy',
    hub: '/resort-astronomy',
    name: 'Resort & hotel astronomy',
    blurb:
      'Turning a dark sky above a property into a guest experience your own team can run, night after night.',
    funnel: 'AstroTrain',
  },
  {
    id: 'astronomy-stays',
    hub: '/astronomy-stays',
    name: 'Astronomy stays',
    blurb:
      'What separates a stay built around the sky from a hotel with a lawn, and what to ask before booking one.',
    funnel: 'Nakshatraalay',
  },
  {
    id: 'astro-tourism',
    hub: '/astro-tourism-india',
    name: 'Astro tourism',
    blurb:
      'India’s unusual advantages in astronomy travel — and the reason the window is closing.',
    funnel: 'AstroTrain & Astroventure',
  },
]

export const clusterById = new Map<ClusterId, Cluster>(clusters.map((c) => [c.id, c]))

/* ---------------------------------------------------------------------------
 * Guides
 * ------------------------------------------------------------------------- */
export const guides: Guide[] = [
  ...educationGuides,
  ...astrophotographyGuides,
  ...stargazingGuides,
  ...resortGuides,
  ...staysGuides,
]

const guideBySlug = new Map<string, Guide>(guides.map((g) => [g.slug, g]))

/** Look up a guide by its slug (no leading slash). */
export function getGuide(slug: string): Guide | undefined {
  return guideBySlug.get(slug)
}

/** Every guide path, with a leading slash. Used by the sitemap and /guides. */
export const guidePaths: string[] = guides.map((g) => `/${g.slug}`)

/** The guides belonging to one cluster, hub first. */
export function guidesInCluster(id: ClusterId): Guide[] {
  const inCluster = guides.filter((g) => g.cluster === id)
  return [...inCluster].sort((a, b) => Number(Boolean(b.isHub)) - Number(Boolean(a.isHub)))
}

/** The hub guide of a cluster, if one is defined. */
export function hubOf(id: ClusterId): Guide | undefined {
  return guides.find((g) => g.cluster === id && g.isHub)
}

/**
 * Related guides for a page.
 *
 * Explicit `related` slugs win, because relevance beats proximity — several
 * pages deliberately point across clusters (light pollution → the Bortle
 * scale, Gurgaon schools → stargazing near Delhi). Anything unresolvable is
 * dropped rather than rendered as a broken link, and the cluster's own
 * siblings backfill so that no guide is ever left without onward links.
 */
export function relatedGuides(guide: Guide, limit = 4): Guide[] {
  const out: Guide[] = []
  const seen = new Set<string>([guide.slug])

  const push = (g?: Guide) => {
    if (!g || seen.has(g.slug) || out.length >= limit) return
    seen.add(g.slug)
    out.push(g)
  }

  for (const slug of guide.related ?? []) push(guideBySlug.get(slug))

  // Backfill: the cluster hub first, then siblings, so every page links up
  // and sideways even if its explicit list is short or partly unresolved.
  if (out.length < limit && !guide.isHub) push(hubOf(guide.cluster))
  if (out.length < limit) for (const g of guidesInCluster(guide.cluster)) push(g)

  return out
}

/**
 * Breadcrumb trail for a guide: Guides → cluster hub → the page.
 * The hub itself gets a two-level trail rather than pointing at itself.
 */
export function breadcrumbsFor(guide: Guide): { name: string; href: string }[] {
  const cluster = clusterById.get(guide.cluster)
  const trail = [{ name: 'Guides', href: '/guides' }]
  if (cluster && !guide.isHub) trail.push({ name: cluster.name, href: cluster.hub })
  trail.push({ name: guide.h1, href: `/${guide.slug}` })
  return trail
}

/* ---------------------------------------------------------------------------
 * Development-time integrity checks
 *
 * These run at module load in dev only. They are the cheapest possible guard
 * against the two failure modes this layer is prone to as it grows: a
 * duplicated slug silently shadowing a page, and a `related` list pointing at
 * a guide that was renamed or never written.
 * ------------------------------------------------------------------------- */
if (process.env.NODE_ENV === 'development') {
  const counts = new Map<string, number>()
  for (const g of guides) counts.set(g.slug, (counts.get(g.slug) ?? 0) + 1)
  for (const [slug, n] of counts) {
    if (n > 1) console.warn(`[seo] duplicate guide slug: ${slug} (${n} definitions)`)
  }
  for (const g of guides) {
    for (const slug of g.related ?? []) {
      if (!guideBySlug.has(slug)) {
        console.warn(`[seo] ${g.slug} → related slug not found: ${slug}`)
      }
    }
    if (!clusterById.has(g.cluster)) {
      console.warn(`[seo] ${g.slug} → unknown cluster: ${g.cluster}`)
    }
  }
}
