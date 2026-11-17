/**
 * The homepage hero slides — one per thing Astris Space actually offers.
 *
 * Ordered by what we most want a first-time visitor to see: the launch, then
 * the experiences you can book now, then the programmes for institutions, then
 * the telescopes. Add or reorder here; the slider reads this and nothing else.
 *
 * Every image is self-hosted and pre-sized under /public/hero.
 */

export interface HeroSlide {
  id: string
  /** Small label above the headline. */
  eyebrow: string
  headline: string
  /** Second line, set in the muted tone. */
  headlineAccent?: string
  body: string
  image: string
  imageAlt: string
  /** Focal point for the crop, since these are full-bleed. */
  objectPosition?: string
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
  /** Short facts shown as chips. */
  facts: string[]
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'astroventure',
    eyebrow: 'Astroventure Nights',
    headline: 'Weekends where',
    headlineAccent: 'the sky comes back.',
    body: 'Every Saturday at Sambhar Lake — arrive for dinner, four to five hours at the telescope under a dark rural sky, a night’s stay and a dawn walk.',
    image: '/hero/astroventure.jpg',
    imageAlt: 'Sunset over the salt flats of Sambhar Lake, Rajasthan',
    primary: { label: 'Book a Saturday', href: '/astroventure-nights/sambhar-lake' },
    secondary: { label: 'All Astroventure trips', href: '/astroventure-nights' },
    facts: ['Every Saturday', '4–5 hrs stargazing', 'Dinner · stay · breakfast'],
  },
  {
    id: 'nakshatraalay',
    eyebrow: 'Coming soon · New location',
    headline: 'Nakshatraalay',
    headlineAccent: 'is on the move.',
    body: 'Our home under the stars is moving to a new location. Telescope nights, astrophotography and a room to stay in afterwards — reopening as soon as the new site is ready.',
    image: '/hero/nakshatraalay.jpg',
    imageAlt: 'The Milky Way over a figure walking beneath a dark sky',
    objectPosition: 'center 38%',
    primary: { label: 'Get notified', href: '/first-light' },
    secondary: { label: 'Explore Nakshatraalay', href: '/nakshatraalay/gurgaon' },
    facts: ['New location', 'Coming soon'],
  },
  {
    id: 'deep-sky',
    eyebrow: 'Flagship workshop',
    headline: 'Photograph deep sky',
    headlineAccent: 'from a city sky.',
    body: 'Narrowband imaging is how modern astrophotographers pull nebulae out of light pollution. Two days and two nights, acquisition through to a finished image.',
    image: '/hero/deep-sky.jpg',
    imageAlt: 'The Orion Nebula imaged in narrowband',
    objectPosition: 'center',
    primary: { label: 'View the workshop', href: '/delhi-deep-sky-astrophotography-workshop' },
    secondary: { label: 'All experiences', href: '/experiences' },
    facts: ['Narrowband', 'Hα · OIII · SII', 'Delhi'],
  },
  {
    id: 'ladakh',
    eyebrow: 'Photography expedition',
    headline: 'Six days under',
    headlineAccent: 'the darkest skies.',
    body: 'A field masterclass across Ladakh — Milky Way landscapes, deep-sky imaging, star trails and a complete processing workflow, taught where the sky is at its best.',
    image: '/hero/ladakh.jpg',
    imageAlt: 'A photographer silhouetted beneath the Milky Way in the high Himalaya',
    objectPosition: 'center 40%',
    primary: { label: 'Explore the expedition', href: '/astroventure-astrophotography' },
    facts: ['6D · 5N', 'Ladakh', 'Small group'],
  },
  {
    id: 'astroed',
    eyebrow: 'AstroEd — for schools',
    headline: 'A Space Lab,',
    headlineAccent: 'and a year of sky.',
    body: 'Astronomy that does not end when the workshop does: a Space Lab in the school, a structured yearly curriculum, and telescopes students actually use.',
    image: '/hero/astroed.jpg',
    imageAlt: 'A school group photographed with the Astris Space team after an astronomy session',
    objectPosition: 'center 42%',
    primary: { label: 'Explore AstroEd', href: '/astroed' },
    facts: ['Space Lab', 'Yearly curriculum', 'Schools'],
  },
  {
    id: 'astrotrain',
    eyebrow: 'AstroTrain — for properties',
    headline: 'Turn your nights',
    headlineAccent: 'into the reason they come.',
    body: 'Equipment, trained staff and the operational know-how to run astronomy as a real guest experience — not a telescope left on a lawn.',
    image: '/hero/astrotrain.jpg',
    imageAlt: 'A guest looking through a Dobsonian telescope at a property in the evening',
    primary: { label: 'Explore AstroTrain', href: '/astrotrain' },
    facts: ['Equipment', 'Staff training', 'Ongoing support'],
  },
  {
    id: 'telescopes',
    eyebrow: 'Nakshatra Scopes',
    headline: 'The instrument',
    headlineAccent: 'matters.',
    body: 'Telescopes chosen and supported by people who observe with them — for first light at home, for a school lab, or for imaging.',
    image: '/hero/telescopes.jpg',
    imageAlt: 'A Celestron AstroMaster 70AZ refractor against the Milky Way',
    primary: { label: 'Browse telescopes', href: 'https://nakshatrascopes.in', external: true },
    facts: ['Beginner to imaging', 'Guidance included', 'Delivered across India'],
  },
]
