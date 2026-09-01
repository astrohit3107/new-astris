/**
 * ============================================================================
 *  CLUSTER 6 — ASTRONOMY STAYS  →  funnels into Nakshatraalay
 *  CLUSTER 4 — ASTRO TOURISM (standalone authority page)
 * ============================================================================
 *  The stays cluster is built BEFORE the property ecosystem scales, which is
 *  the point: the SEO infrastructure should exist and be indexed by the time
 *  there are properties to put into it. As properties come online they get
 *  their own pages under /nakshatraalay/[property] in the commercial layer,
 *  and these guides link to them.
 *
 *  NAKSHATRAALAY FACTS follow `lib/nakshatraalay-data.ts` exactly. The
 *  Gurgaon property status is `announced`, not `open`, with First Light on
 *  15 September 2026 and five rooms planned — so nothing here describes it
 *  as operating, and nothing implies a booking system that does not exist.
 * ========================================================================== */

import type { Guide } from '@/lib/seo/types'

const UPDATED = '2026-09-01'

const NAKSHATRAALAY = {
  label: 'Nakshatraalay',
  title: 'Nakshatraalay Gurgaon',
  detail:
    'An astronomy destination on the southern edge of Delhi NCR — telescope nights, guided observation and stays planned alongside. First Light is 15 September 2026.',
  href: '/nakshatraalay/gurgaon',
}

const FIRST_LIGHT = {
  label: 'First Light',
  title: 'First Light at Nakshatraalay',
  detail: 'The opening night, and the list for people who want to know when the doors open.',
  href: '/first-light',
}

const EXPERIENCES = {
  label: 'Experiences',
  title: 'Nakshatraalay experiences',
  detail:
    'The individual evenings, workshops and private nights, with what each one actually consists of and how it is priced.',
  href: '/experiences',
}

const NIGHTS = {
  label: 'Astroventure Nights',
  title: 'Astroventure Nights — dark-sky nights away from the city',
  detail:
    'Guided nights at destinations from the Himalayan valleys to weekend escapes within reach of Delhi and Jaipur.',
  href: '/astroventure-nights',
}

const TIJARA = {
  label: 'Weekend escape',
  title: 'Tijara — an overnight dark-sky escape from Delhi',
  detail:
    'An honest rural Bortle 4 sky in the Aravalli country of Alwar. Two days and a night, from ₹3,500, with departures from Delhi and Jaipur.',
  href: '/astroventure-nights/tijara',
}

const STAYS_CTA = {
  heading: 'A night where the sky is the reason you came',
  body: 'Nakshatraalay is being built as an astronomy destination on Delhi NCR’s doorstep — real telescopes, a dark horizon, and people who know what they are pointing at. First Light is 15 September 2026.',
  primary: { label: 'Nakshatraalay Gurgaon', href: '/nakshatraalay/gurgaon' },
  secondary: { label: 'Join the First Light list', href: '/first-light' },
}

export const staysGuides: Guide[] = [
  /* --------------------------------------------------------- STAYS: HUB */
  {
    slug: 'astronomy-stays',
    cluster: 'astronomy-stays',
    isHub: true,
    title: 'Astronomy Stays in India — What Makes a Stargazing Stay Worth It',
    description:
      'How an astronomy stay differs from a hotel with a nice view: what to check before booking, what the sky should be, and the questions that separate a real one from a marketing claim.',
    h1: 'Astronomy stays in India',
    eyebrow: 'Astronomy stays',
    lede:
      '"Stargazing resort" has become a phrase that means very little, because almost any property outside a city can use it. This is how to tell whether a stay is genuinely built around the sky, and what to ask before you book one.',
    keywords: [
      'astronomy stays India',
      'stargazing resorts India',
      'astronomy retreat India',
      'stargazing stay booking',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The category, and why it is unreliable',
        body: [
          'A stargazing stay should mean somewhere that has organised itself around the night sky — dark enough to be worth the journey, equipped with instruments that work, staffed by someone who can operate them, and scheduled so that the astronomy happens rather than being available on request.',
          'In practice the phrase is used for any property with an outdoor seating area. The gap between the two is where disappointment lives: guests arrive expecting a programme and find a telescope nobody can align, or arrive on a full-Moon week and are told the Milky Way is not visible tonight, having never been warned that it would not be.',
          'The good news is that the distinction is easy to check before booking, because the properties that have done the work will answer specific questions specifically.',
        ],
      },
      {
        kind: 'points',
        heading: 'What to ask before booking an astronomy stay',
        points: [
          {
            title: 'How dark is it, in a number?',
            detail:
              'A property that knows its Bortle class and states it — including when the honest answer is 4 rather than 2 — has thought about this. A property that answers "very dark" has not, or is hoping you will not check.',
          },
          {
            title: 'Who runs the session, and are they there on my dates?',
            detail:
              'Ask whether astronomy is run by trained resident staff or a visiting astronomer on selected dates. Both can be good; only one of them will be there on a Tuesday.',
          },
          {
            title: 'What equipment, specifically?',
            detail:
              'Aperture and type, not "telescopes available". A property that cannot describe its own instruments almost certainly does not use them regularly.',
          },
          {
            title: 'What is the Moon doing on my dates?',
            detail:
              'If they know, and volunteer it, that is the strongest single signal you will get. It is also the fact most likely to change your booking date.',
          },
          {
            title: 'What happens if it is cloudy?',
            detail:
              'A real answer describes an alternative session. A vague one means the astronomy is a facility rather than a programme.',
          },
          {
            title: 'How many guests per session?',
            detail:
              'Time at the eyepiece is what you are buying. Forty people and one telescope is a queue, whatever the sky is like.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'What each kind of astronomy stay is actually for',
        columns: ['Type', 'Best for', 'What to expect'],
        rows: [
          [
            'A property near a city with telescopes',
            'A first experience, families, a short trip',
            'A moderately dark sky, the Moon and planets, and an easy journey. Not a Milky Way trip',
          ],
          [
            'A dark-sky destination stay',
            'People who want to see the Milky Way with their own eyes',
            'A rural sky, a scheduled session and a real dependence on the lunar calendar',
          ],
          [
            'A dedicated astronomy property',
            'Repeat visits, deeper sessions, astrophotography',
            'Equipment and programming as the reason the place exists rather than an amenity attached to it',
          ],
          [
            'A high-altitude expedition base',
            'Serious observing and imaging',
            'Genuinely dark skies, difficult logistics, and a trip planned around the sky rather than the stay',
          ],
        ],
      },
      {
        kind: 'callout',
        title: 'Book the Moon, not the weekend',
        body:
          'This applies to astronomy stays more than to any other kind of travel. The same property, the same room and the same staff will deliver a completely different night depending on where you land in the lunar cycle. If the reason for the trip is the sky, choose the dates from the Moon phase first and fit everything else around them.',
      },
    ],
    faqs: [
      {
        question: 'What makes a stay an "astronomy stay" rather than a hotel with a view?',
        answer:
          'Scheduled sessions rather than on-request ones, instruments that trained resident staff can actually operate, honesty about the sky including its Bortle class, and planning around the lunar cycle. Any property can have a lawn; these four are what separate a programme from an amenity.',
      },
      {
        question: 'Are astronomy stays suitable for people who know nothing about astronomy?',
        answer:
          'Those are the guests they are designed for. Being shown the sky well by someone who knows it is the entire proposition — prior knowledge is not expected and is not an advantage.',
      },
      {
        question: 'Can I see the Milky Way from an astronomy stay near a city?',
        answer:
          'Only if the site is genuinely dark enough — around Bortle 4 or better — and only on a moonless, clear night. Properties within an hour of a large Indian city generally cannot deliver this, whatever the listing says.',
      },
      {
        question: 'Is a dedicated astronomy property worth it over a normal resort?',
        answer:
          'If the sky is the reason you are travelling, yes. The difference is not the room; it is whether the evening is designed around observation, and whether someone on site can run it well on the night you happen to be there.',
      },
    ],
    experiences: [NAKSHATRAALAY, NIGHTS, EXPERIENCES],
    related: [
      'astronomy-stays/near-delhi',
      'stargazing/weekend-trips',
      'stargazing/dark-sky-places-india',
      'astro-tourism-india',
    ],
    cta: STAYS_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------ STAYS: NEAR DELHI */
  {
    slug: 'astronomy-stays/near-delhi',
    cluster: 'astronomy-stays',
    title: 'Stargazing Stays and Astronomy Getaways Near Delhi',
    description:
      'Where to spend a night under a darker sky within reach of Delhi NCR: how far you need to go, what the sky is honestly like, and how to choose the weekend.',
    h1: 'Astronomy getaways near Delhi',
    eyebrow: 'Near Delhi',
    lede:
      'A stargazing weekend from Delhi is entirely achievable and routinely oversold. The realistic version — two to three hours out, an honest rural sky, and a date chosen around the Moon — is very good. The version in the listings, promising pristine skies an hour from Gurgaon, is not.',
    keywords: [
      'stargazing resort near Delhi',
      'astronomy retreat near Delhi',
      'weekend stargazing getaway Delhi',
      'dark sky stay near Delhi NCR',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What is genuinely available from the NCR',
        body: [
          'Delhi NCR is a Bortle 8–9 sky and its light dome extends well past the built-up area. A property forty minutes outside Gurgaon is still inside that dome, however rural it feels on arrival, and its sky will be closer to the city’s than to a dark one.',
          'The change happens further out, and direction matters as much as distance. Heading south-west into the Aravalli country beyond Alwar puts ridgelines between you and the brightest part of the NCR. Roughly two to three hours in that direction reaches an honest rural Bortle 4 — the point at which the Milky Way returns to the naked eye on a clear, moonless night and several hundred stars replace the city’s few dozen.',
          'Further west, Sambhar in Rajasthan offers something the Aravalli sites cannot: a flat salt basin with an almost unobstructed horizon in every direction, which adds a large amount of usable sky. Jaipur’s glow sits low on the eastern edge, and the western and overhead sky is a genuine rural Bortle 4.',
        ],
      },
      {
        kind: 'points',
        heading: 'The formats that work from Delhi',
        points: [
          {
            title: 'An organised overnight',
            detail:
              'A dark-sky night run as a programme — telescopes, a guided session, and someone who has planned the date around the Moon. The format most likely to produce the night people imagined.',
          },
          {
            title: 'A property with a real astronomy programme',
            detail:
              'An astronomy destination rather than a resort with a telescope, where the observation is the reason the place exists and sessions run to a schedule.',
          },
          {
            title: 'A self-organised drive',
            detail:
              'Entirely viable with binoculars, a planetarium app and a new-Moon weekend. The main risks are picking a site with an unhelpful horizon and underestimating how cold standing still gets.',
          },
          {
            title: 'A single evening close to the city',
            detail:
              'Worthwhile for the Moon and planets through a telescope, which the NCR sky does not damage. Not worthwhile if the Milky Way is what you came for.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Nakshatraalay Gurgaon',
        body:
          'Astris is building Nakshatraalay as an astronomy destination on the southern edge of the NCR — close enough for a Saturday, with real telescopes, a dark horizon and guided observation, and stays planned alongside. It is announced rather than open: First Light is 15 September 2026. It does not pretend to be a Himalayan sky, and it is not intended to replace a dark-sky trip — it is intended to make a serious astronomy evening something the NCR can reach without a weekend.',
      },
      {
        kind: 'steps',
        heading: 'Planning the weekend',
        steps: [
          {
            title: 'Find the new-Moon weekend',
            detail:
              'Before choosing anywhere. The difference between a new-Moon and a full-Moon night at the same site is larger than the difference between two sites.',
          },
          {
            title: 'Pick October–November or February–April',
            detail:
              'The monsoon removes July to September, and the NCR winter haze from mid-November into January can spoil a cloudless night for faint objects.',
          },
          {
            title: 'Go south-west, and go far enough',
            detail:
              'Two to three hours towards the Aravallis, or further to Sambhar. A shorter drive in most other directions keeps you under the dome.',
          },
          {
            title: 'Arrive before sunset',
            detail:
              'See the site in daylight, eat early, and let your eyes adapt as dusk falls rather than arriving late with headlights on.',
          },
          {
            title: 'Pack for standing still outdoors',
            detail:
              'Warmer clothing than the forecast suggests, something to lie on, a red torch and binoculars. In that order of importance.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a dark-sky resort near Delhi?',
        answer:
          'There is nothing pristine within a short drive of the NCR. What is realistically available is an honest rural Bortle 4 two to three hours south-west, in the Aravalli country around Alwar and Tijara, or further west at Sambhar. That is a large improvement on the city and should not be described as more than it is.',
      },
      {
        question: 'How far from Delhi do I need to stay to see the Milky Way?',
        answer:
          'Roughly two to three hours in the direction of the Aravallis, on a clear night around new Moon. At that distance and in that direction the Milky Way becomes visible to the naked eye once your eyes have adapted.',
      },
      {
        question: 'When is the best weekend for a stargazing trip from Delhi?',
        answer:
          'A new-Moon weekend in October or early November, or between February and April. Avoid the monsoon, and be cautious about mid-November to January when haze frequently makes an otherwise clear night unusable.',
      },
      {
        question: 'Can I do a stargazing night near Delhi without an overnight stay?',
        answer:
          'You can, though it makes for a very long day, since the sky is only properly dark for the hours you would otherwise be driving home. An overnight also gives you a second chance if the first night clouds over.',
      },
    ],
    experiences: [NAKSHATRAALAY, TIJARA, FIRST_LIGHT],
    related: [
      'astronomy-stays',
      'stargazing/near-delhi',
      'stargazing/weekend-trips',
      'stargazing/bortle-scale',
    ],
    cta: STAYS_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------- ASTRO TOURISM (standalone) */
  {
    slug: 'astro-tourism-india',
    cluster: 'astro-tourism',
    isHub: true,
    title: 'Astro Tourism in India — What It Is and Where It Is Going',
    description:
      'Astronomy tourism in India: what the country has that others do not, how the monsoon shapes the season, what a good astro-tourism experience contains, and where the risks are.',
    h1: 'Astro tourism in India',
    eyebrow: 'Astro tourism',
    lede:
      'India has an unusually strong hand in astronomy tourism — extreme altitude, a monsoon rain shadow that stays clear when the rest of the country does not, and favourable latitudes — and an unusually fast-closing window, because light pollution is expanding around every city in the country.',
    keywords: [
      'astro tourism India',
      'astronomy tourism India',
      'dark sky tourism India',
      'astronomy travel India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What astro tourism actually is',
        body: [
          'Astronomy tourism is travel where the sky is the reason for the journey rather than a feature of the destination. That distinction is the whole category: a hotel with a telescope is hospitality with an amenity, while a trip planned around a new Moon, a season and a specific sky is astro tourism.',
          'It behaves differently from the rest of travel as a result. Dates are dictated by the lunar cycle rather than by holidays. Weather risk cannot be designed away. The peak season in the best region runs during the monsoon, when Indian travel usually slows. And the product being sold is partly knowledge — a guest with no guide under a perfect sky sees far less than a guided guest under a mediocre one.',
        ],
      },
      {
        kind: 'points',
        heading: 'What India has',
        points: [
          {
            title: 'A rain-shadow window',
            detail:
              'The trans-Himalayan belt — Ladakh, and Spiti in Himachal — lies beyond the reach of the south-west monsoon. It stays clear from roughly June to September, at very high altitude, exactly when the galactic core is best placed and the rest of the country is under cloud. Very few countries have anything comparable.',
          },
          {
            title: 'Altitude on a road',
            detail:
              'Sites high enough to sit above a meaningful fraction of the atmosphere, dry enough for excellent transparency, and reachable overland. That combination is rare globally.',
          },
          {
            title: 'Favourable latitudes',
            detail:
              'The galactic core rises high from Indian latitudes, considerably better placed than from most of Europe or North America — and southern India reaches objects the northern hemisphere never sees.',
          },
          {
            title: 'Accessible rural skies',
            detail:
              'Honest Bortle 4 sites within a few hours of the northern cities, which makes a first dark-sky experience a weekend rather than an expedition. This is the volume end of the category.',
          },
          {
            title: 'A domestic audience discovering it',
            detail:
              'Most Indian city residents have never seen the Milky Way. The first time is genuinely affecting, and it does not require them to leave the country.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What a good astro-tourism experience contains',
        intro:
          'The category attracts operators quickly, and the difference between a good one and a poor one is visible before you book.',
        points: [
          {
            title: 'An honest sky rating',
            detail:
              'Stated, specific, and not inflated. An operator quoting Bortle 4 for a site two hours from a metro is telling the truth; one quoting Bortle 2 is not.',
          },
          {
            title: 'Dates set by the Moon',
            detail:
              'Departures scheduled around new Moon for dark-sky trips. An operator running fixed weekends regardless of lunar phase is selling travel, not astronomy.',
          },
          {
            title: 'Real equipment and real guides',
            detail:
              'Instruments described specifically, and someone present who can find objects, explain them, and answer a question they were not expecting.',
          },
          {
            title: 'A stated weather position',
            detail:
              'What happens if it is cloudy, said clearly before booking rather than discovered on the night.',
          },
          {
            title: 'Group sizes that permit eyepiece time',
            detail:
              'The most common quiet failure. A dark sky and a two-second turn at the telescope is not the experience anyone booked.',
          },
          {
            title: 'Respect for the site',
            detail:
              'Light discipline, waste discipline and a relationship with the local community. Dark-sky places degrade quickly when tourism arrives carelessly, and the asset is not renewable.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The risk to the category',
        body:
          'Astro tourism destroys its own asset faster than most kinds of travel. A dark site with a new access road, unshielded lighting at a growing cluster of properties and a stream of headlights arriving after dark is measurably less dark within a few seasons. Operators who insist on shielded lighting, red torches and restraint about volume are not being precious — they are protecting the only thing they are selling.',
      },
    ],
    faqs: [
      {
        question: 'What is astro tourism?',
        answer:
          'Travel where the night sky is the purpose of the trip rather than an amenity at the destination — planned around the lunar cycle, the season and the darkness of a specific site, and usually guided, because knowing what you are looking at is most of the experience.',
      },
      {
        question: 'Why is astro tourism growing in India?',
        answer:
          'Because the country combines genuinely world-class dark skies at altitude with a large urban population that has never seen the Milky Way, and because the trans-Himalayan rain shadow provides a clear-sky season when the rest of the country is under monsoon cloud.',
      },
      {
        question: 'When is the astro tourism season in India?',
        answer:
          'It differs by region. Ladakh and Spiti are at their best from roughly June to September; the Himalayan valleys in the post-monsoon and spring windows; Rajasthan and the north-west from October to March. In every case the dates are then chosen around new Moon.',
      },
      {
        question: 'Can a property or destination build an astro-tourism offering?',
        answer:
          'Yes, and the requirements are consistent: a usable observing site with controllable lighting, equipment specified for that site, trained resident staff, a session format, and honesty about the sky. That is precisely what AstroTrain is built to install at a property.',
      },
    ],
    experiences: [
      {
        label: 'AstroTrain',
        title: 'AstroTrain — build an astronomy experience at your property',
        detail:
          'Equipment specified and installed, your team trained to lead sessions, the format worked out and ongoing operational support.',
        href: '/astrotrain',
      },
      NIGHTS,
      NAKSHATRAALAY,
    ],
    related: [
      'stargazing/india',
      'stargazing/dark-sky-places-india',
      'resort-astronomy',
      'astronomy-stays',
    ],
    cta: {
      heading: 'Build astronomy into your property',
      body: 'AstroTrain turns a dark sky above a property into a running guest experience — equipment, trained staff, session design and ongoing support, so it holds up across seasons.',
      primary: { label: 'Explore AstroTrain', href: '/astrotrain' },
      secondary: { label: 'Astroventure Nights', href: '/astroventure-nights' },
    },
    updated: UPDATED,
  },
]
