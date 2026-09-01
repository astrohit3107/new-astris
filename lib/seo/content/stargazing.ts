/**
 * ============================================================================
 *  CLUSTER 3 — STARGAZING  →  funnels into Astroventure Nights and
 *                              Nakshatraalay Gurgaon
 * ============================================================================
 *  Consumer intent, and the highest-volume cluster in the plan. The CTA is
 *  deliberately NOT the same on every page: "stargazing near Delhi" belongs
 *  with the NCR-reachable experiences, "Milky Way in India" belongs with the
 *  high-altitude expeditions, and "weekend stargazing" belongs with the
 *  weekend escapes. Matching the destination to the intent is the difference
 *  between a funnel and a redirect.
 *
 *  SKY FACTS follow `lib/astroventure-data.ts` exactly: Sambhar Lake and
 *  Tijara are Bortle 4, Kasol is Bortle 3–4, Solang is Bortle 3. Chitkul is
 *  archived and is therefore never promoted here. Delhi NCR is Bortle 8–9.
 *  No page claims a darker sky than the destination data records.
 * ========================================================================== */

import type { Guide } from '@/lib/seo/types'

const UPDATED = '2026-09-01'

const TIJARA = {
  label: 'Weekend escape',
  title: 'Tijara — a dark-sky weekend within reach of Delhi',
  detail:
    'An honest rural Bortle 4 sky in the Aravalli country of Alwar, where the low ridgelines block part of the NCR light dome. Two days and a night, from ₹3,500, with departures from Delhi and Jaipur.',
  href: '/astroventure-nights/tijara',
}

const SAMBHAR = {
  label: 'Weekend escape',
  title: 'Sambhar Lake — astronomy on India’s largest salt lake',
  detail:
    'A flat, wide-open salt basin with an unobstructed horizon in almost every direction, west of Jaipur. A genuine rural Bortle 4 overhead, two days and a night, from ₹3,500.',
  href: '/astroventure-nights/sambhar-lake',
}

const NAKSHATRAALAY = {
  label: 'Nakshatraalay',
  title: 'Nakshatraalay Gurgaon — an astronomy destination near Delhi NCR',
  detail:
    'Close enough for a Saturday: real telescopes, a dark horizon and guided observation on the NCR’s southern edge, with stays planned alongside.',
  href: '/nakshatraalay/gurgaon',
}

const NIGHTS = {
  label: 'Astroventure Nights',
  title: 'All Astroventure Nights destinations',
  detail:
    'The full set of Astris dark-sky nights, from Himalayan valleys to weekend escapes within reach of the plains.',
  href: '/astroventure-nights',
}

const LADAKH = {
  label: 'Expedition',
  title: 'Astroventure Astrophotography — Ladakh',
  detail:
    'Six days under some of the darkest skies on Earth, in the trans-Himalayan rain shadow that stays clear while the rest of India is under monsoon cloud.',
  href: '/astroventure-astrophotography',
}

const NCR_CTA = {
  heading: 'See it from a sky that has stars in it',
  body: 'Astroventure Nights runs weekend dark-sky escapes within reach of Delhi and Jaipur — real telescopes, guided observation, and an honest account of what the sky will actually do on the night.',
  primary: { label: 'Weekend escapes near Delhi', href: '/astroventure-nights/tijara' },
  secondary: { label: 'All Astroventure Nights', href: '/astroventure-nights' },
}

const NIGHTS_CTA = {
  heading: 'Spend a night under a real sky',
  body: 'Astroventure Nights are guided dark-sky nights with professional telescopes and people who know what they are pointing at — from Himalayan valleys to weekend escapes from the plains.',
  primary: { label: 'Explore Astroventure Nights', href: '/astroventure-nights' },
  secondary: { label: 'Nakshatraalay Gurgaon', href: '/nakshatraalay/gurgaon' },
}

export const stargazingGuides: Guide[] = [
  /* ------------------------------------------------------------------ HUB */
  {
    slug: 'stargazing',
    cluster: 'stargazing',
    isHub: true,
    title: 'Stargazing in India — How to Actually See Something',
    description:
      'A practical stargazing guide for India: what you can see without equipment, how to plan around the Moon and the monsoon, and how to choose a night that is worth travelling for.',
    h1: 'Stargazing in India',
    eyebrow: 'Stargazing',
    lede:
      'Most disappointing stargazing nights were decided days earlier — the wrong week of the lunar cycle, the wrong month, or a location chosen for how far it was rather than how dark. Almost none of it is about equipment. This is how to get the decisions right.',
    keywords: [
      'stargazing India',
      'stargazing guide',
      'how to stargaze',
      'astronomy experience India',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'The four decisions that determine your night',
        intro:
          'In order of impact. Getting the first one wrong cannot be fixed by getting the others right.',
        steps: [
          {
            title: 'The Moon',
            detail:
              'A bright Moon is the single largest source of light pollution in the natural sky, and it travels with you. For faint objects and the Milky Way, aim for the week around new Moon. If the Moon itself is the target, the days around first or last quarter are far better than full — the shadows along the terminator are what make craters look three-dimensional.',
          },
          {
            title: 'The month',
            detail:
              'Across most of India the monsoon removes roughly July to September. Winter haze can make northern skies unusable from mid-November into January even when there is no cloud. October to early November and February to April are the reliable windows in the north.',
          },
          {
            title: 'The place',
            detail:
              'Darkness, not distance. Two hours in the right direction beats four in the wrong one, and a site with a clear horizon and no security light in your face beats a nominally darker one that has both.',
          },
          {
            title: 'The plan',
            detail:
              'Know three or four things you intend to find, and roughly where they will be. Turning up and looking upward hopefully is how people conclude that stargazing is overrated.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What you can see with no equipment at all',
        intro:
          'From a genuinely dark site, the naked eye is a serious instrument — and it is the one most people skip straight past.',
        points: [
          {
            title: 'The Milky Way',
            detail:
              'From a rural Bortle 4 sky on a clear, moonless night it is plainly visible as a band of structured light. This is the single biggest reason to leave the city, and no telescope shows it better than your own eyes.',
          },
          {
            title: 'Five planets',
            detail:
              'Venus, Jupiter, Mars, Saturn and sometimes Mercury are all naked-eye objects. Learning to tell a planet from a star by its steady, non-twinkling light takes about one evening.',
          },
          {
            title: 'Meteors',
            detail:
              'On any dark night you will see a few sporadic meteors an hour. During a major shower, considerably more — and this is a naked-eye activity where a telescope is actively unhelpful.',
          },
          {
            title: 'Satellites',
            detail:
              'Steady points crossing the sky in a few minutes, most visible in the hours after dusk and before dawn while they are still catching sunlight.',
          },
          {
            title: 'Structure in the sky',
            detail:
              'Constellations, the ecliptic the planets sit along, and the sky’s rotation over a few hours. Learning to read this is what turns random points into a place you can navigate.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Give your eyes twenty minutes, and protect them',
        body:
          'Dark adaptation is a chemical process that takes about twenty minutes to develop meaningfully and continues improving for well over half an hour. One glance at a phone screen or a white torch resets a large part of it instantly. This is why serious observers use red light and why the single most useful thing at a stargazing session is a group discipline about screens — it costs nothing and roughly doubles what everyone sees.',
      },
      {
        kind: 'points',
        heading: 'What a telescope adds, and what it does not',
        points: [
          {
            title: 'It adds detail on bright things',
            detail:
              'The Moon’s craters, Saturn’s rings, Jupiter’s bands and moons, the phases of Venus. All of these work even from a city, and all of them are genuinely startling the first time.',
          },
          {
            title: 'It adds reach on faint things — under a dark sky',
            detail:
              'Nebulae, clusters and the brighter galaxies become available. Under a city sky, a larger telescope mostly magnifies the glow.',
          },
          {
            title: 'It does not add a wide view',
            detail:
              'A telescope shows a very small patch of sky. The Milky Way, meteor showers and constellations are all naked-eye or binocular subjects — pointing a telescope at them makes the experience worse.',
          },
          {
            title: 'Binoculars are underrated',
            detail:
              'An ordinary pair transforms naked-eye stargazing: the Pleiades, the Andromeda galaxy, the Orion Nebula and lunar detail are all within reach, with no setup and no learning curve.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best time of year for stargazing in India?',
        answer:
          'In the north, October to early November and February to April. The monsoon removes most of July to September, and mid-November to January is often lost to haze. Southern India is generally best from December to March.',
      },
      {
        question: 'Do I need a telescope to start stargazing?',
        answer:
          'No, and starting with one is often counterproductive. A dark sky, dark-adapted eyes and knowing what you are looking at deliver more than equipment does. Binoculars are the natural next step; a telescope makes sense once you can already find things.',
      },
      {
        question: 'How far from a city do I need to go?',
        answer:
          'Far enough to escape the light dome rather than a fixed distance. From Delhi that means a few hours, into the Aravalli country beyond Alwar or west into Rajasthan, where rural sites reach an honest Bortle 4 and the Milky Way returns to the naked eye.',
      },
      {
        question: 'What if it is cloudy on the night?',
        answer:
          'It happens, and any honest operator will tell you so in advance rather than promising a sky. Choosing the right month reduces the risk considerably, and a good session has real content for a cloudy night rather than only a refund policy.',
      },
    ],
    experiences: [NIGHTS, NAKSHATRAALAY],
    related: [
      'stargazing/near-delhi',
      'stargazing/india',
      'stargazing/bortle-scale',
      'stargazing/best-time-india',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------- NEAR DELHI */
  {
    slug: 'stargazing/near-delhi',
    cluster: 'stargazing',
    title: 'Stargazing Near Delhi — Where to Actually Go, and How Dark It Really Is',
    description:
      'Honest options for stargazing near Delhi NCR: how far you have to drive to escape the light dome, what the sky is genuinely like when you get there, and when to go.',
    h1: 'Stargazing near Delhi',
    eyebrow: 'Near Delhi',
    lede:
      'Delhi has one of the brightest skies in the country, and the honest answer to "where can I stargaze near Delhi" is: not in Delhi, and not thirty minutes outside it either. Here is how far you actually have to go, and what changes when you get there.',
    keywords: [
      'stargazing near Delhi',
      'stargazing places near Delhi',
      'dark sky near Delhi',
      'astronomy near Delhi NCR',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'How far the light dome reaches',
        body: [
          'Delhi NCR is a Bortle 8–9 sky, and the glow it produces does not stop at the city boundary. It hangs over the surrounding districts as a dome that fades gradually rather than ending. Driving forty minutes to the edge of Gurgaon or Noida changes the view far less than people expect — you leave the streetlights and stay inside the dome.',
          'What actually works is distance plus direction. Heading south-west into the Aravalli country beyond Alwar puts low ridgelines between you and the brightest part of the NCR, which is why that direction outperforms an equivalent drive north or east into the plains. Roughly two to three hours in that direction gets you to a genuine rural sky.',
          'It is worth being precise about what "genuine rural sky" means here, because it is routinely overstated. These are honest Bortle 4 sites. That is not a Himalayan or desert-wilderness sky, and anyone advertising Bortle 2 within a short drive of Delhi is not measuring anything. What Bortle 4 does give you, on a clear moonless night, is the Milky Way back to the naked eye and several hundred stars where the city offered a few dozen. Against Delhi, that is transformative.',
        ],
      },
      {
        kind: 'table',
        heading: 'The realistic options, by distance',
        columns: ['Option', 'Roughly', 'The sky you get'],
        rows: [
          [
            'Inside the NCR',
            'Under an hour',
            'Bortle 8–9. The Moon, planets and the brightest stars only. Fine for a telescope session, not for a dark sky',
          ],
          [
            'Aravalli country around Tijara and Alwar',
            'Two to three hours south-west',
            'An honest rural Bortle 4, with the ridgelines shielding part of the NCR dome. The Milky Way returns on clear moonless nights',
          ],
          [
            'Sambhar Lake, west of Jaipur',
            'A longer drive, usually an overnight',
            'Rural Bortle 4 with a flat salt basin and an almost unobstructed horizon in every direction — Jaipur’s glow sits low on the eastern edge',
          ],
          [
            'The Himalayan foothills and valleys',
            'A full journey, not a weekend drive',
            'Bortle 3 and better. A different category of sky, and a different category of trip',
          ],
        ],
        note:
          'Bortle ratings describe a site on a good night. Weather, dust and the Moon all move the experience considerably, and no honest operator guarantees a rating on a given date.',
      },
      {
        kind: 'points',
        heading: 'Making the drive worth it',
        points: [
          {
            title: 'Go on a new-Moon weekend',
            detail:
              'This matters more than the destination. A Bortle 4 site under a full Moon shows you less than a Bortle 5 site with no Moon at all.',
          },
          {
            title: 'Aim for October–November or February–April',
            detail:
              'The monsoon writes off most of July to September, and the winter haze that settles over the NCR from mid-November frequently drifts far enough out to matter.',
          },
          {
            title: 'Arrive before dark',
            detail:
              'You want to see the site, choose where to stand, and let your eyes adapt while dusk fades rather than arriving at 10pm with headlights on.',
          },
          {
            title: 'Bring binoculars, not just a telescope',
            detail:
              'The Milky Way, the Pleiades and Andromeda are all better in binoculars, and they need no setup while you wait for the sky to darken fully.',
          },
          {
            title: 'Agree on light discipline',
            detail:
              'Red torches, phones face-down. One person checking a bright screen resets dark adaptation for everyone standing near them.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Be sceptical of "Bortle 2 near Delhi"',
        body:
          'It appears in a lot of marketing and it is not real. Bortle 2 is a genuinely pristine sky, and nothing within a few hours of a metropolitan area of this size qualifies. Even the darker protected sites deeper in Alwar district measure in the Bortle 3–4 range. A trip that promises Bortle 2 and delivers Bortle 4 has delivered a good night and lost your trust — which is why the Astris destination pages state Bortle 4 for both Tijara and Sambhar rather than rounding it in their own favour.',
      },
    ],
    faqs: [
      {
        question: 'Where is the nearest place for real stargazing near Delhi?',
        answer:
          'Realistically, the Aravalli country to the south-west, around Tijara and Alwar, roughly two to three hours from the NCR. The ridgelines block part of the city’s light dome and rural sites there reach an honest Bortle 4 — enough for the Milky Way to be visible to the naked eye on a clear moonless night.',
      },
      {
        question: 'Can you stargaze within the NCR itself?',
        answer:
          'You can observe within the NCR — the Moon, the planets, double stars and bright clusters all work through a telescope from Gurgaon or Delhi. What you cannot do is see a dark sky, because the light dome covers the entire region.',
      },
      {
        question: 'How long is the drive worth it for?',
        answer:
          'Two to three hours in the right direction produces a genuinely different sky. Under an hour, in any direction, mostly does not — which is why an overnight or a late return is the format that works.',
      },
      {
        question: 'When should I plan a stargazing trip from Delhi?',
        answer:
          'A new-Moon weekend in October or early November, or between February and April. Avoid the monsoon months entirely, and be cautious of mid-November to January, when haze can make a cloudless night unusable.',
      },
    ],
    experiences: [TIJARA, SAMBHAR, NAKSHATRAALAY],
    related: [
      'stargazing',
      'stargazing/delhi',
      'stargazing/weekend-trips',
      'astronomy-stays/near-delhi',
    ],
    cta: NCR_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------------ DELHI */
  {
    slug: 'stargazing/delhi',
    cluster: 'stargazing',
    title: 'Stargazing in Delhi — What You Can Actually See From the City',
    description:
      'What is genuinely visible from a Delhi rooftop or balcony: the Moon, the planets, bright double stars and clusters — plus when the city sky is at its clearest.',
    h1: 'Stargazing in Delhi',
    eyebrow: 'In the city',
    lede:
      'Delhi will not give you the Milky Way, and no amount of equipment will change that. It will give you the Moon in three dimensions, Saturn’s rings, Jupiter’s moons and a surprising amount besides — all from a balcony, on most clear nights of the year.',
    keywords: [
      'stargazing in Delhi',
      'astronomy in Delhi',
      'what can you see from Delhi sky',
      'telescope Delhi',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The honest starting point',
        body: [
          'Delhi is a Bortle 8–9 sky. On an average night the naked eye reaches a few dozen stars; the constellations are present as their brightest members only, and the fainter connecting stars that give them their shapes are gone. This is not a temporary condition or a matter of picking a better rooftop.',
          'What it does not touch is brightness. Light pollution competes with faint objects; it is irrelevant to bright ones. The Moon is roughly a hundred thousand times brighter than the sky glow arguing with it. Jupiter and Saturn are not remotely troubled by a city. Neither is the Sun, which is why a filtered solar setup is one of the most rewarding things a Delhi observer can own.',
          'So the useful framing is not "Delhi is bad for astronomy" but "Delhi is a bright-object sky". Plan around that and the city delivers a great deal.',
        ],
      },
      {
        kind: 'points',
        heading: 'What is genuinely available from a Delhi rooftop',
        points: [
          {
            title: 'The Moon, in real detail',
            detail:
              'The single best target the city has. Near first or last quarter the low sun angle throws long shadows across craters and mountain ranges and the surface stops looking flat. Even binoculars change how it reads.',
          },
          {
            title: 'Saturn and its rings',
            detail:
              'A small telescope resolves the ring system clearly. It is the object that most reliably converts a sceptic, and Delhi does nothing to diminish it.',
          },
          {
            title: 'Jupiter and its four bright moons',
            detail:
              'The equatorial bands are visible in a modest instrument, and the Galilean moons are visible in binoculars — noticeably rearranged from one night to the next, which is the most tangible demonstration of orbital motion available to anyone.',
          },
          {
            title: 'Venus and its phases',
            detail:
              'Bright enough to see in twilight, and it goes through crescent phases like the Moon — a fact most people are startled by and can verify themselves.',
          },
          {
            title: 'Bright double stars',
            detail:
              'Colour-contrasting pairs survive city glow entirely and are among the more beautiful things a small telescope shows.',
          },
          {
            title: 'The Sun, safely filtered',
            detail:
              'With proper full-aperture filtration, sunspots and the solar disc are available on most clear days. Never attempt this without correctly rated equipment — improvised filters cause permanent eye damage in seconds.',
          },
          {
            title: 'The brightest deep-sky objects',
            detail:
              'The Orion Nebula and the Pleiades are visible from the city, though considerably diminished. Everything fainter is effectively gone.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'When Delhi’s sky is worth going out for',
        columns: ['Period', 'What the sky is doing'],
        rows: [
          ['Late February – April', 'The best stretch: clearer air, steady conditions and comfortable evenings'],
          ['May – June', 'Very clear on good nights, though hot, with dust and haze on others'],
          ['July – September', 'Monsoon. Mostly cloud, with occasional excellent post-rain clarity'],
          ['October – early November', 'A reliably good window before winter haze arrives'],
          ['Mid-November – January', 'Frequently unusable for faint objects; the Moon and planets still work on clear nights'],
        ],
      },
      {
        kind: 'callout',
        title: 'Your building matters more than the city',
        body:
          'The largest single improvement available to a Delhi observer is usually free: stand where a wall or water tank blocks the neighbouring security light, keep the stairwell bulb off, and avoid looking across a hot roof surface that is still radiating the day’s heat — rising air degrades the view at high magnification more than most people realise. Position beats aperture here.',
      },
    ],
    faqs: [
      {
        question: 'Can you see stars in Delhi at all?',
        answer:
          'Yes, though far fewer than most people expect — a few dozen on a typical night, being the brightest members of the constellations. The Moon, the planets and bright double stars are entirely unaffected and are what Delhi observing is really built around.',
      },
      {
        question: 'Can you see the Milky Way from Delhi?',
        answer:
          'No. The Milky Way is a large, faint structure and a Bortle 8–9 sky erases it completely. Seeing it requires travelling to a genuinely darker site — from Delhi, roughly two to three hours south-west into the Aravalli country.',
      },
      {
        question: 'Is a telescope worth buying if I live in Delhi?',
        answer:
          'For the Moon, planets, double stars and solar observation, yes — those work from any balcony with sky access. If your interest is nebulae and galaxies, be clear with yourself that a telescope will not solve a city sky, and budget for travel instead.',
      },
      {
        question: 'Where are the nearest dark skies to Delhi?',
        answer:
          'The Aravalli country around Tijara and Alwar, and further west at Sambhar in Rajasthan — both honest rural Bortle 4 sites, a substantial improvement on the city without being wilderness skies.',
      },
    ],
    experiences: [NAKSHATRAALAY, TIJARA],
    related: [
      'stargazing',
      'stargazing/near-delhi',
      'astrophotography/from-delhi',
      'stargazing/bortle-scale',
    ],
    cta: NCR_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------------ INDIA */
  {
    slug: 'stargazing/india',
    cluster: 'stargazing',
    title: 'Stargazing in India — Regions, Seasons and What Each Sky Offers',
    description:
      'A region-by-region look at stargazing in India: the trans-Himalayan rain shadow, the north-western deserts, the foothills and the south, and when each is at its best.',
    h1: 'Stargazing in India',
    eyebrow: 'The country',
    lede:
      'India has some of the most capable dark skies on the planet and some of the brightest urban skies, often a day’s travel apart. Which one you get depends almost entirely on choosing the right region for the right month.',
    keywords: [
      'stargazing in India',
      'stargazing places in India',
      'astronomy tourism India',
      'best stargazing India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The monsoon decides the calendar',
        body: [
          'Any Indian stargazing plan starts with the south-west monsoon, which covers most of the country from roughly June or July into September. That period is largely written off for observing across the plains, the west and the south.',
          'The exception is what makes Indian astronomy distinctive. The trans-Himalayan regions — Ladakh, and Spiti in Himachal — lie in the rain shadow beyond the main range. The monsoon does not reach them. They remain clear, at very high altitude, with thin dry air and almost no artificial light, in exactly the months when the galactic core is best placed and the rest of the country is under cloud.',
          'Everywhere else, the pattern reverses: the post-monsoon and winter months are the good ones, with the northern plains adding a haze problem from mid-November that the drier west and the south largely avoid.',
        ],
      },
      {
        kind: 'table',
        heading: 'The regions, and when to go',
        columns: ['Region', 'Best months', 'What the sky is like'],
        rows: [
          [
            'Ladakh',
            'Roughly June to September',
            'Extreme altitude, very thin dry air and minimal light pollution. Among the best observing conditions anywhere on Earth, and clear through the monsoon',
          ],
          [
            'Spiti and the high Himachal valleys',
            'Roughly June to September',
            'Also in the rain shadow — high, dry and very dark, with the same monsoon-window advantage',
          ],
          [
            'The Himalayan valleys and foothills',
            'October–November and February–April',
            'Genuinely dark: Astris destinations in this belt sit at Bortle 3 to 3–4. Valley haze and cloud are the limiting factors rather than light',
          ],
          [
            'Rajasthan and the north-west',
            'October to March',
            'Dry air, wide unobstructed horizons and reachable from the NCR. Rural sites are an honest Bortle 4',
          ],
          [
            'The Deccan and the south',
            'December to March',
            'The galactic core sits higher from lower latitudes, and southern-sky objects unavailable from the north come into reach',
          ],
          [
            'The major cities',
            'Any clear night',
            'Bortle 8–9. The Moon, the planets and bright double stars — a real sky, just not a dark one',
          ],
        ],
      },
      {
        kind: 'points',
        heading: 'What India has that most places do not',
        points: [
          {
            title: 'A rain-shadow window',
            detail:
              'Very few countries have a region that stays reliably clear precisely when the rest of the country is under monsoon cloud, and at altitudes above most of the atmosphere.',
          },
          {
            title: 'Favourable latitude for the galactic core',
            detail:
              'The dense centre of the Milky Way rises high from Indian latitudes — considerably better placed than from most of Europe or North America.',
          },
          {
            title: 'Southern-sky access',
            detail:
              'From southern India, objects permanently below the horizon for northern-hemisphere observers become reachable.',
          },
          {
            title: 'And a fast-closing window',
            detail:
              'Light pollution is expanding rapidly around every Indian city. The dark-sky buffer within a few hours of the metros is measurably smaller than it was a decade ago, which is a reason to go rather than to wait.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Altitude is not the same as darkness',
        body:
          'The two usually travel together in India, but they are separate advantages. Darkness determines whether faint objects are visible at all. Altitude determines how much atmosphere you are looking through, which affects transparency and steadiness — how sharp a planet looks at high magnification. A high, dark site gives you both; a dark site at low altitude still gives you the Milky Way.',
      },
    ],
    faqs: [
      {
        question: 'Which is the best place for stargazing in India?',
        answer:
          'Ladakh and Spiti, on the combination of altitude, dry air, minimal light pollution and clear skies through the monsoon months. For accessibility rather than absolute quality, the Himalayan valleys in the post-monsoon window and rural Rajasthan in winter are the practical answers.',
      },
      {
        question: 'When is the best time for stargazing in India?',
        answer:
          'It depends on the region. The trans-Himalayan belt is at its best from June to September; almost everywhere else is best from October to April, with the northern plains suffering haze from mid-November to January.',
      },
      {
        question: 'How dark are dark-sky sites in India, really?',
        answer:
          'It ranges widely. The high Himalayan destinations reach Bortle 3 and better. Rural sites within reach of the northern cities are an honest Bortle 4. Anywhere claiming Bortle 2 within a short drive of a metro should be treated with scepticism.',
      },
    ],
    experiences: [NIGHTS, LADAKH],
    related: [
      'stargazing',
      'stargazing/dark-sky-places-india',
      'stargazing/best-time-india',
      'stargazing/milky-way-india',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },

  /* ---------------------------------------------------------- WEEKEND TRIPS */
  {
    slug: 'stargazing/weekend-trips',
    cluster: 'stargazing',
    title: 'Weekend Stargazing Trips — How to Plan One That Works',
    description:
      'Planning a weekend stargazing getaway from an Indian city: choosing the weekend around the Moon, how far to go, what to pack, and how to avoid the common disappointments.',
    h1: 'Weekend stargazing trips',
    eyebrow: 'Weekends',
    lede:
      'A weekend is enough — provided you pick the weekend for the right reason. The people who come back saying it was extraordinary and the people who come back saying it was fine usually went to the same place, on different weeks of the lunar cycle.',
    keywords: [
      'weekend stargazing trip',
      'astronomy weekend getaway',
      'stargazing weekend India',
      'astronomy trips India',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'How to plan it',
        steps: [
          {
            title: 'Pick the weekend before the destination',
            detail:
              'Find the new-Moon weekend in the month you want to travel, and build everything else around it. A mediocre site with no Moon beats an excellent site under a bright one, every time.',
          },
          {
            title: 'Choose a month with a sky in it',
            detail:
              'October to early November, or February to April, if you are travelling in the north. Avoid the monsoon, and be wary of the mid-November to January haze around the northern plains.',
          },
          {
            title: 'Go far enough, in the right direction',
            detail:
              'Two to three hours away from the city glow rather than towards another town. From the NCR, the south-west into the Aravallis outperforms an equal drive in most other directions.',
          },
          {
            title: 'Arrive in daylight',
            detail:
              'You want to see the site, pick where you will stand, eat before dark, and let your eyes adapt as dusk fades rather than arriving late with headlights on.',
          },
          {
            title: 'Decide what you want to see',
            detail:
              'Three or four objectives — the Milky Way, Saturn, a cluster, a meteor or two. A vague intention to "look at stars" is how a long night becomes a short one.',
          },
          {
            title: 'Plan the second night',
            detail:
              'If the trip allows two nights, the odds of at least one clear one improve dramatically. This is the single most effective insurance against weather there is.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What to take',
        points: [
          {
            title: 'More warm clothing than the forecast suggests',
            detail:
              'Standing still outdoors for hours is colder than any daytime temperature implies, and this is the most common reason groups go inside early — not cloud.',
          },
          {
            title: 'A red torch',
            detail:
              'Or red tape over a white one. It preserves the dark adaptation everything else depends on.',
          },
          {
            title: 'Binoculars',
            detail:
              'The highest-value optical item for a first dark-sky trip. No setup, and they transform the Milky Way, the Pleiades and Andromeda.',
          },
          {
            title: 'Something to lie on',
            detail:
              'A mat or reclining chair. Meteor watching and Milky Way viewing are neck-destroying activities done standing up.',
          },
          {
            title: 'A planetarium app, used beforehand',
            detail:
              'Check what will be up and when before you leave. On the night, keep the screen dim and face-down between uses.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The honest risk',
        body:
          'Weather does not negotiate, and any operator who guarantees a clear sky is guaranteeing something they do not control. What a good weekend trip can promise is the right week of the lunar cycle, a genuinely dark site, real equipment, someone who knows the sky, and a plan for a cloudy night that is better than sitting in a room. Judge an operator on whether they tell you that plainly in advance.',
      },
    ],
    faqs: [
      {
        question: 'How far should a weekend stargazing trip be from the city?',
        answer:
          'Two to three hours in a direction that takes you away from urban glow. From Delhi NCR that means the Aravalli country to the south-west; a shorter drive usually keeps you inside the city’s light dome.',
      },
      {
        question: 'Which weekend of the month is best?',
        answer:
          'The one closest to new Moon, if you want dark skies and the Milky Way. If you specifically want to look at the Moon through a telescope, the first-quarter weekend is far better than a full Moon.',
      },
      {
        question: 'Is one night enough?',
        answer:
          'One night works and two are considerably safer. A second night roughly halves the chance that cloud costs you the entire trip, which is why most weekend astronomy formats are built around an overnight rather than a single evening.',
      },
      {
        question: 'What if I know nothing about astronomy?',
        answer:
          'That is the normal starting point and it is the reason guided nights exist. Knowing the sky is the part that takes years; being shown it well takes one evening with someone who does.',
      },
    ],
    experiences: [TIJARA, SAMBHAR, NIGHTS],
    related: [
      'stargazing',
      'stargazing/near-delhi',
      'astronomy-stays',
      'astronomy-stays/near-delhi',
    ],
    cta: NCR_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------ DARK SKY PLACES */
  {
    slug: 'stargazing/dark-sky-places-india',
    cluster: 'stargazing',
    title: 'Dark Sky Places in India — Where the Sky Is Genuinely Dark',
    description:
      'An honest guide to India’s dark-sky regions: the trans-Himalayan high desert, the Himalayan valleys and the accessible rural sites near the northern cities — with realistic sky ratings.',
    h1: 'Dark sky places in India',
    eyebrow: 'Dark skies',
    lede:
      'Dark-sky lists tend to be optimistic, because the ratings are rarely measured and nobody is checking. This one is arranged by how dark places actually are, and is explicit about the difference between a genuinely pristine sky and a good rural one two hours from a city.',
    keywords: [
      'dark sky places India',
      'dark sky reserve India',
      'darkest skies in India',
      'Bortle 2 India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Three tiers, not one list',
        body: [
          'India’s dark skies fall into three broad categories, and conflating them is why so many trips disappoint. There is the trans-Himalayan high desert, which is world-class by any measure. There are the Himalayan valleys, which are genuinely dark but hemmed in by terrain and weather. And there are the accessible rural sites within a few hours of the northern cities, which are good rather than pristine — and which are what most people are actually asking about.',
          'The distinctions matter because they determine what you will see. In the first tier the Milky Way casts a faint shadow and the sky is crowded. In the second it is unmistakable and structured. In the third it is clearly visible on a clear moonless night and noticeably diminished towards the horizon where the city glow sits. All three are worth travelling for; only one of them is a wilderness sky.',
        ],
      },
      {
        kind: 'table',
        heading: 'The tiers',
        columns: ['Tier', 'Where', 'Realistic darkness', 'Access'],
        rows: [
          [
            'Trans-Himalayan high desert',
            'Ladakh, and the high Himachal valleys such as Spiti',
            'The darkest skies in the country, at altitudes above much of the atmosphere. India’s designated dark-sky reserve at Hanle in Ladakh, alongside the high-altitude observatory there, sits in this belt',
            'A serious journey and altitude acclimatisation. Clear through the monsoon',
          ],
          [
            'Himalayan valleys',
            'The mid-altitude Himalayan belt',
            'Genuinely dark — Astris destinations in this belt are recorded at Bortle 3 to Bortle 3–4',
            'Reachable overland; weather and valley haze are the limiting factors',
          ],
          [
            'Accessible rural north-west',
            'Aravalli country around Alwar and Tijara; Sambhar in Rajasthan',
            'An honest rural Bortle 4. The Milky Way returns to the naked eye on clear moonless nights; city glow remains visible low on one horizon',
            'A drive or an overnight from Delhi NCR or Jaipur',
          ],
        ],
        note:
          'Ratings describe a site under good conditions. Dust, humidity, seasonal haze and above all the Moon shift the real experience substantially on any given night.',
      },
      {
        kind: 'points',
        heading: 'What actually makes a site dark',
        intro:
          'Distance from a city is only one of the variables, and often not the decisive one.',
        points: [
          {
            title: 'Distance from large population centres',
            detail:
              'Light domes fade gradually with distance rather than stopping. The glow from a large city remains visible on the horizon far beyond the point at which its streetlights disappear.',
          },
          {
            title: 'Terrain between you and the glow',
            detail:
              'A ridgeline blocking a city’s dome is worth more than an extra hour of driving on flat ground. This is why the Aravalli sites outperform equivalent distances in the plains.',
          },
          {
            title: 'Altitude',
            detail:
              'Less atmosphere above you means less scattering and better transparency, which is why the high-desert sites are in a category of their own.',
          },
          {
            title: 'Dry air',
            detail:
              'Humidity scatters light and softens the view. Desert and high-altitude sites are dark partly because they are dry.',
          },
          {
            title: 'Horizon',
            detail:
              'An unobstructed horizon adds a large amount of usable sky. A flat salt basin or an open plateau gives you objects that a valley site never brings above the ridgeline at all.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'On inflated Bortle claims',
        body:
          'Bortle 1 and 2 describe genuinely pristine skies, and they are rare. In practice almost nothing within a few hours of a major Indian city qualifies, however it is advertised. The rural sites reachable from the NCR — including the ones Astris runs — are Bortle 4, which is a dramatic step down from a city’s Bortle 8–9 and is stated as Bortle 4 on those destination pages rather than rounded upward. Treat any nearby "Bortle 2" claim as a marketing number rather than a measurement.',
      },
    ],
    faqs: [
      {
        question: 'Where are the darkest skies in India?',
        answer:
          'The trans-Himalayan high desert — Ladakh and the high Himachal valleys such as Spiti. Very high altitude, extremely dry air and almost no artificial light combine to produce conditions that are world-class, and the region stays clear through the monsoon.',
      },
      {
        question: 'Does India have a dark sky reserve?',
        answer:
          'Yes — a dark-sky reserve has been established around Hanle in Ladakh, in the high-altitude region that also hosts India’s astronomical observatory there. It is remote, high and requires planning and acclimatisation to visit.',
      },
      {
        question: 'What is the darkest sky within reach of Delhi?',
        answer:
          'Realistically an honest rural Bortle 4, in the Aravalli country around Alwar and Tijara or west at Sambhar in Rajasthan. Genuinely pristine skies require travelling to the Himalaya.',
      },
      {
        question: 'How can I tell how dark a site really is?',
        answer:
          'The most practical test is the naked eye: can you see the Milky Way as a structured band, and how far down towards the horizon does it survive before city glow eats it? Light-pollution maps give a useful prediction, and a sky-quality meter reading gives a number — but the eye test is honest and free.',
      },
    ],
    experiences: [LADAKH, TIJARA, SAMBHAR],
    related: [
      'stargazing',
      'stargazing/bortle-scale',
      'stargazing/milky-way-india',
      'astrophotography/india',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },

  /* -------------------------------------------------------- MILKY WAY INDIA */
  {
    slug: 'stargazing/milky-way-india',
    cluster: 'stargazing',
    title: 'When and Where to See the Milky Way in India',
    description:
      'How to see the Milky Way with your own eyes in India: the months the galactic core is up, how the monsoon reshapes the season, and how dark a sky you actually need.',
    h1: 'Seeing the Milky Way in India',
    eyebrow: 'Milky Way',
    lede:
      'Seeing the Milky Way is not a photography problem — it is a planning problem, and the plan has three parts: a dark enough sky, no Moon, and a month when the bright part of the galaxy is above the horizon at a civilised hour.',
    keywords: [
      'Milky Way India',
      'see the Milky Way India',
      'Milky Way viewing India',
      'when is the Milky Way visible India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What you are actually trying to see',
        body: [
          'Some part of the galactic plane is above the horizon on essentially every night of the year. What people mean when they say they want to see the Milky Way is the galactic core — the dense, bright, visibly structured region towards the centre of the galaxy, in the direction of Sagittarius and Scorpius. That is the part that looks like the photographs, and it is up only for part of the year.',
          'From Indian latitudes the core is above the horizon during night hours from roughly February through October. In February and March it appears low in the hours before dawn. Through April to June it climbs and stays up for much of the night. By September and October it is visible in the early evening and sets as the night goes on.',
          'And then the monsoon complicates the middle of exactly that window across most of the country — which is why the practical Indian answer is two windows rather than one long season.',
        ],
      },
      {
        kind: 'table',
        heading: 'The practical viewing calendar',
        columns: ['Window', 'When to look', 'Notes'],
        rows: [
          ['February – March', 'Pre-dawn, low in the south-east', 'Cold and early, but the season’s first look at the core'],
          ['April – June', 'Late night through to dawn, high in the sky', 'The best geometry of the year; haze and heat in the plains, excellent at altitude'],
          ['July – September', 'Most of the night, well placed', 'Monsoon cloud across most of India — the trans-Himalayan rain shadow is the exception'],
          ['October – early November', 'Early evening, setting through the night', 'A shorter window each night, but clear and stable in the north'],
          ['Mid-November – January', 'The core is not usefully placed', 'Off-season for the core; the winter sky and Orion are excellent instead'],
        ],
        note:
          'The core sits higher from southern India than from the north. Confirm the specific night with a planetarium app for your location.',
      },
      {
        kind: 'points',
        heading: 'The three conditions, in order of importance',
        points: [
          {
            title: 'No Moon',
            detail:
              'The overriding factor. Aim for the nights around new Moon, or a window after the Moon has set. A bright Moon will erase the core from a genuinely dark sky, so no location compensates for a badly chosen date.',
          },
          {
            title: 'A genuinely dark site',
            detail:
              'An honest rural Bortle 4 is the practical threshold at which the core becomes clearly visible to the naked eye. Below that it is present but faint; from a city it is simply absent.',
          },
          {
            title: 'Adapted eyes and a clear horizon',
            detail:
              'Twenty minutes without looking at a screen, and a low southern horizon that is not blocked by a ridge or fogged by a distant town. Both are free, and both are routinely thrown away.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'What it actually looks like',
        body:
          'Manage the expectation set by photographs. A long-exposure image accumulates light for many seconds and shows saturated colour; the eye does not. What you see is a soft, silvery, obviously structured band with dark lanes running through it — not the orange-and-blue of a processed photograph. It is quieter than the pictures and considerably more affecting in person, and people who arrive expecting the photograph often miss the moment it becomes visible.',
      },
    ],
    faqs: [
      {
        question: 'When can you see the Milky Way in India?',
        answer:
          'The galactic core is above the horizon at night from roughly February to October. In practice the two best windows are April to June and October to early November, because the monsoon covers most of the country from July to September.',
      },
      {
        question: 'How dark does it need to be to see the Milky Way?',
        answer:
          'A rural Bortle 4 sky on a moonless night is enough for it to be clearly visible to the naked eye. From a Bortle 8–9 city sky it is not visible at all, regardless of how long you wait or what equipment you have.',
      },
      {
        question: 'Can you see the Milky Way during the monsoon?',
        answer:
          'Rarely across most of India, because of cloud. The exception is the trans-Himalayan rain shadow — Ladakh and Spiti — which stays clear through those months, and where the core is at its best placement of the year.',
      },
      {
        question: 'Do I need a telescope to see the Milky Way?',
        answer:
          'No — a telescope actively makes it worse by showing a tiny fraction of it. This is a naked-eye subject, and binoculars are the only optical aid worth using.',
      },
    ],
    experiences: [LADAKH, TIJARA, SAMBHAR],
    related: [
      'stargazing',
      'stargazing/dark-sky-places-india',
      'astrophotography/milky-way',
      'stargazing/best-time-india',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },

  /* ----------------------------------------------------------- BORTLE SCALE */
  {
    slug: 'stargazing/bortle-scale',
    cluster: 'stargazing',
    title: 'The Bortle Scale Explained — What Each Class Actually Looks Like',
    description:
      'What the Bortle scale measures, what you can see at each class, where Indian cities and rural sites sit on it, and why advertised ratings are so often inflated.',
    h1: 'The Bortle scale, explained',
    eyebrow: 'Reference',
    lede:
      'The Bortle scale is the standard shorthand for how dark a sky is — a nine-point scale where 1 is pristine and 9 is an inner-city sky. It is useful, it is subjective, and it is quoted far more often than it is measured.',
    keywords: [
      'Bortle scale',
      'Bortle scale explained',
      'Bortle class India',
      'light pollution scale',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What it measures',
        body: [
          'The Bortle scale describes the darkness of a night sky by what an experienced observer can actually see from it — how many stars are visible, whether the Milky Way shows structure, whether specific faint objects are detectable by eye, and how strongly artificial glow shows on the horizon.',
          'That makes it a description rather than an instrument reading. Two people can rate the same site a class apart, and the same site genuinely changes class with humidity, dust and season. A sky-quality meter gives a number in magnitudes per square arcsecond, which is more objective and less intuitive; in practice the two are used together.',
          'Its real value is that it predicts what you will see. That is the only question most people are actually asking.',
        ],
      },
      {
        kind: 'table',
        heading: 'The classes, and what they mean in practice',
        columns: ['Class', 'Description', 'What you can see'],
        rows: [
          ['1–2', 'Excellent to typical truly dark site', 'The Milky Way casts a faint shadow. The sky is crowded, and bright stars look genuinely unfamiliar against the density behind them'],
          ['3', 'Rural sky', 'The Milky Way is bright and structured. Some light pollution visible on the horizon. Excellent observing'],
          ['4', 'Rural or rural–suburban transition', 'The Milky Way is clearly visible overhead on a moonless night but weaker towards the horizon, with obvious light domes over distant towns'],
          ['5', 'Suburban', 'The Milky Way is faint or washed out near the horizon and only visible overhead on the best nights'],
          ['6–7', 'Bright suburban to suburban–urban', 'The Milky Way is not visible. The sky has an obvious grey or orange cast. Only brighter deep-sky objects survive, and only in a telescope'],
          ['8–9', 'City to inner city', 'A few dozen stars. Constellations reduced to their brightest members. The Moon, planets and bright doubles remain excellent'],
        ],
      },
      {
        kind: 'points',
        heading: 'Where India sits',
        points: [
          {
            title: 'Delhi, Mumbai, Bengaluru and the major metros',
            detail:
              'Bortle 8–9. The Milky Way is absent; the Moon and planets are unaffected.',
          },
          {
            title: 'Rural sites within a few hours of the northern cities',
            detail:
              'An honest Bortle 4 — the Aravalli country around Alwar and Tijara, and Sambhar in Rajasthan. The Milky Way returns to the naked eye on clear moonless nights.',
          },
          {
            title: 'The Himalayan valleys',
            detail:
              'Bortle 3 to 3–4 at the Astris destinations in that belt: a bright, structured Milky Way and serious observing conditions.',
          },
          {
            title: 'The trans-Himalayan high desert',
            detail:
              'The darkest skies in the country, in the Ladakh and Spiti high-altitude belt.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Why quoted ratings are usually too good',
        body:
          'A Bortle class is easy to claim and hard for a guest to check, so the number drifts optimistically in marketing — "Bortle 2" is used routinely for sites that measure 4. The practical defences are simple: be suspicious of any pristine rating close to a large city, ask whether it is a measured figure or an impression, and check whether the operator’s own materials quote the same number consistently. A site described honestly as Bortle 4 will usually deliver a better night than one advertised as Bortle 2 and experienced as Bortle 4.',
      },
    ],
    faqs: [
      {
        question: 'What Bortle class is Delhi?',
        answer:
          'Roughly Bortle 8–9, an inner-city sky. A few dozen stars are visible to the naked eye, the Milky Way is entirely absent, and the Moon and planets remain unaffected.',
      },
      {
        question: 'What Bortle class do you need to see the Milky Way?',
        answer:
          'Bortle 4 is the practical threshold for clearly seeing it with the naked eye on a moonless night. It becomes progressively more impressive through Bortle 3 and darker.',
      },
      {
        question: 'Is the Bortle scale accurate?',
        answer:
          'It is a subjective description rather than a measurement, so two observers can differ by a class and conditions move a site around. It is nonetheless the most useful shorthand available, because it maps directly onto what you will be able to see.',
      },
      {
        question: 'How do I check the Bortle class of a place before I go?',
        answer:
          'Light-pollution maps give a good prediction from satellite data. On site, the honest test is your own eyes once dark-adapted — whether the Milky Way is visible, and how far down towards the horizon it survives.',
      },
    ],
    experiences: [TIJARA, SAMBHAR, LADAKH],
    related: [
      'stargazing',
      'stargazing/dark-sky-places-india',
      'astrophotography/light-pollution',
      'stargazing/near-delhi',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------- BEST TIME INDIA */
  {
    slug: 'stargazing/best-time-india',
    cluster: 'stargazing',
    title: 'Best Time for Stargazing in India — Month by Month',
    description:
      'Which months actually work for stargazing in India, how the Moon changes the answer, and what the sky offers in each season across the north and the south.',
    h1: 'The best time for stargazing in India',
    eyebrow: 'Timing',
    lede:
      'There are two calendars to satisfy: the annual one, which decides whether there is a sky at all, and the lunar one, which decides what you can see in it. Most disappointing nights are the result of getting the second one wrong.',
    keywords: [
      'best time for stargazing India',
      'stargazing season India',
      'best months astronomy India',
      'moon phase stargazing',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The lunar calendar matters more than the annual one',
        body: [
          'The Moon is the brightest source of light pollution in the natural sky, and unlike a city you cannot drive away from it. Around full Moon, even a pristine site loses the Milky Way and every faint object with it. Around new Moon, a merely good site delivers a spectacular night.',
          'So the working rule is: choose the week first, the month second, and the place third. Roughly the five nights either side of new Moon is the dark-sky window. Outside it, you can still have an excellent night — but it will be a night about the Moon, the planets and bright doubles rather than about the galaxy.',
          'The corollary is worth stating, because it is often missed: a bright Moon is not a wasted night. Near first or last quarter the Moon itself is at its most spectacular through a telescope, with shadows along the terminator throwing craters into relief. Full Moon is the genuinely poor phase — flat, glaring, and destructive of everything else.',
        ],
      },
      {
        kind: 'table',
        heading: 'The year in the north',
        columns: ['Months', 'Conditions', 'What the sky offers'],
        rows: [
          ['February – April', 'The most reliable stretch: clearing air, stable skies, comfortable nights', 'Winter constellations giving way to spring; the galactic core returning before dawn'],
          ['May – June', 'Clear but hot, with dust and pre-monsoon haze on some nights', 'The core high and well placed late at night — excellent at altitude, harder in the plains'],
          ['July – September', 'Monsoon across the plains and hills', 'Largely lost, except in the trans-Himalayan rain shadow, where it is the best season of the year'],
          ['October – early November', 'A dependable post-monsoon window', 'The core in the early evening, then an excellent autumn sky. The best all-round travel window in the north'],
          ['Mid-November – January', 'Cold, and frequently hazy across the northern plains', 'Superb winter sky — Orion, the Pleiades, the winter clusters — when the haze allows'],
        ],
      },
      {
        kind: 'points',
        heading: 'Regional exceptions worth knowing',
        points: [
          {
            title: 'The trans-Himalayan belt runs opposite',
            detail:
              'Ladakh and Spiti are at their best from roughly June to September, in the rain shadow beyond the main range, precisely when the rest of the country is under monsoon cloud.',
          },
          {
            title: 'Southern India peaks later',
            detail:
              'December to March is generally the strongest window in the south, and the galactic core sits higher from those latitudes when it returns.',
          },
          {
            title: 'The north-west is a winter destination',
            detail:
              'Rajasthan and the dry north-west are best from October through March — dry air, wide horizons and no monsoon to work around.',
          },
          {
            title: 'Post-rain nights can be exceptional',
            detail:
              'A clear night immediately after heavy rain often has unusually good transparency, because the rain has washed particulates out of the air. Worth taking advantage of opportunistically.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'A simple planning rule',
        body:
          'Find the new-Moon dates for the next few months. Cross out the monsoon. Of what remains, pick the weekend furthest from a full Moon and closest to October–November or February–April if you are in the north. That single sequence will do more for the quality of your night than any equipment decision you will ever make.',
      },
    ],
    faqs: [
      {
        question: 'What is the best month for stargazing in India?',
        answer:
          'In the north, October and early November, or February to April. The trans-Himalayan regions such as Ladakh and Spiti are best from June to September, and southern India is generally best from December to March.',
      },
      {
        question: 'Does the Moon really make that much difference?',
        answer:
          'Yes — more than the location does. A full Moon washes the Milky Way and faint objects out of even a pristine sky. Plan dark-sky trips for the nights around new Moon.',
      },
      {
        question: 'Is a full Moon night worth going out for?',
        answer:
          'For the Moon itself, first or last quarter is much better than full — the shadows near the terminator show relief that a full Moon flattens completely. For anything faint, a full Moon night is the worst of the month.',
      },
      {
        question: 'Can you stargaze in India during the monsoon?',
        answer:
          'Across most of the country, seldom. The trans-Himalayan rain shadow is the exception, and it is the reason serious Indian astronomy travel concentrates on Ladakh and Spiti during precisely those months.',
      },
    ],
    experiences: [NIGHTS, LADAKH, NAKSHATRAALAY],
    related: [
      'stargazing',
      'stargazing/india',
      'stargazing/milky-way-india',
      'stargazing/weekend-trips',
    ],
    cta: NIGHTS_CTA,
    updated: UPDATED,
  },
]
