/**
 * ============================================================================
 *  ASTRIS SEO ACQUISITION LAYER — CONTENT MODEL
 * ============================================================================
 *
 *  WHAT THIS IS
 *  ------------
 *  A parallel organic-acquisition layer that sits alongside — never inside —
 *  the existing Astris commercial site. Every page here is a real, useful
 *  answer to a real search, and every page ends by handing the reader to the
 *  Astris offering that actually serves that intent.
 *
 *  WHAT IT IS NOT
 *  --------------
 *  It is not a redesign, and it does not touch the primary navigation. These
 *  pages are discovered through Google, breadcrumbs, contextual internal
 *  links and a single quiet "Guides" entry in the footer. The commercial
 *  pages (/astroed, /astrotrain, /astroventure-nights/*, /nakshatraalay/*,
 *  the workshops) remain the conversion layer and are linked TO, never
 *  duplicated.
 *
 *  NOTHING HERE IS FABRICATED
 *  --------------------------
 *  The same rule the rest of this repo follows applies with full force. No
 *  invented statistics, no invented partnerships, no invented prices, no
 *  invented dates, no invented credentials, no fake reviews. Where a fact is
 *  a physical or astronomical one it is stated plainly; where it is an Astris
 *  fact it is carried over from the existing data files. Sky-darkness claims
 *  follow the honest ratings already recorded in `lib/astroventure-data.ts`
 *  (Sambhar and Tijara are Bortle 4, not Bortle 2).
 * ========================================================================== */

/** The six topical clusters. Each has one hub and a set of supporting pages. */
export type ClusterId =
  | 'astronomy-education'
  | 'astrophotography'
  | 'stargazing'
  | 'resort-astronomy'
  | 'astronomy-stays'
  | 'astro-tourism'

export interface Cluster {
  id: ClusterId
  /** Hub route, without a trailing slash. */
  hub: string
  /** Human name, used in breadcrumbs and related-content headings. */
  name: string
  /** One line describing the cluster, used on /guides. */
  blurb: string
  /**
   * The Astris offering this cluster ultimately funnels into. Used to keep
   * the commercial destination of every page in the cluster deliberate.
   */
  funnel: string
}

/* ---------------------------------------------------------------------------
 * Page body sections
 *
 * A small, closed set of shapes rather than free HTML: it keeps every guide
 * semantically structured (real <h2>s, real lists, real tables), keeps the
 * rendering consistent with the Astris design language, and makes the whole
 * layer safe to extend without touching components.
 * ------------------------------------------------------------------------- */
export type SeoSection =
  /** Running prose under an optional heading. Each string is one paragraph. */
  | { kind: 'prose'; heading?: string; body: string[] }
  /** A titled list of substantive points — not a feature grid of adjectives. */
  | { kind: 'points'; heading: string; intro?: string; points: SeoPoint[] }
  /** An ordered process. Rendered with visible step numbers. */
  | { kind: 'steps'; heading: string; intro?: string; steps: SeoPoint[] }
  /** Comparison data. Scrolls horizontally on narrow screens. */
  | {
      kind: 'table'
      heading: string
      intro?: string
      columns: string[]
      rows: string[][]
      note?: string
    }
  /** A short aside — an honesty note, a caveat, a rule of thumb. */
  | { kind: 'callout'; title: string; body: string }

export interface SeoPoint {
  title: string
  detail: string
}

export interface SeoFaq {
  question: string
  answer: string
}

/** A link out of the SEO layer and into the commercial layer. */
export interface ExperienceLink {
  title: string
  detail: string
  href: string
  /** Short label, e.g. 'AstroEd' or 'Weekend escape'. */
  label: string
}

export interface SeoCta {
  heading: string
  body: string
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
}

export interface Guide {
  /** Full path WITHOUT a leading slash, e.g. 'astrophotography/deep-sky'. */
  slug: string
  cluster: ClusterId
  /** True for the one hub page of a cluster. */
  isHub?: boolean

  /** <title>. Unique, natural, brand-suffixed by the renderer. */
  title: string
  /** <meta name="description">. Unique, written for click-through. */
  description: string
  /** The single <h1>. */
  h1: string
  /** Small uppercase label above the h1. */
  eyebrow: string
  /** Opening paragraph, rendered large under the h1. */
  lede: string
  /** Advisory only — never rendered as visible keyword stuffing. */
  keywords?: string[]

  sections: SeoSection[]
  faqs?: SeoFaq[]
  /** Commercial links, rendered as "Relevant Astris experiences". */
  experiences?: ExperienceLink[]
  /**
   * Explicit related-guide slugs. When omitted the registry falls back to
   * cluster siblings, so no page is ever orphaned.
   */
  related?: string[]
  cta: SeoCta

  /** ISO date of the last substantive content review. Feeds sitemap + Article. */
  updated: string
}
