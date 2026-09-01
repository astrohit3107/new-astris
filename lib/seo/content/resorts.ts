/**
 * ============================================================================
 *  CLUSTER 5 — RESORT & HOTEL ASTRONOMY  →  funnels into /astrotrain
 * ============================================================================
 *  B2B intent, low volume and high value. The reader is a general manager,
 *  an owner or an F&B/experience head evaluating whether an astronomy
 *  programme is a real differentiator or an expensive telescope on a lawn.
 *  So these pages are written commercially — what it costs the property in
 *  effort, what it changes about the evening, what actually breaks.
 *
 *  Every AstroTrain capability described here is carried from
 *  `lib/astrotrain-data.ts`: equipment specified and installed, staff
 *  training, sky knowledge, session operations, guest experience design and
 *  ongoing support. The commercial claims that file deliberately dropped
 *  (starting price, ROI timeline, resort counts, satisfaction percentages)
 *  are NOT reintroduced here. No numbers are invented.
 * ========================================================================== */

import { ENQUIRY } from '@/lib/site-config'
import type { Guide } from '@/lib/seo/types'

const UPDATED = '2026-09-01'

const ASTROTRAIN_EXPERIENCE = {
  label: 'AstroTrain',
  title: 'AstroTrain — an astronomy experience built into your property',
  detail:
    'Professional telescopes specified for your site and installed, your team trained to lead sessions in-house, the session format worked out, and ongoing operational support so the programme survives its first season.',
  href: '/astrotrain',
}

const ASTROTRAIN_CTA = {
  heading: 'Turn the sky above your property into something guests book for',
  body: 'AstroTrain equips the property, trains your team and sets up the sessions, so stargazing becomes a repeatable part of your evening run by your own staff rather than a visiting act.',
  primary: { label: 'Explore AstroTrain', href: '/astrotrain' },
  secondary: { label: 'Discuss your property', href: ENQUIRY.astrotrain.whatsapp, external: true },
}

export const resortGuides: Guide[] = [
  /* ------------------------------------------------------------------ HUB */
  {
    slug: 'resort-astronomy',
    cluster: 'resort-astronomy',
    isHub: true,
    title: 'Astronomy Experiences for Resorts and Hotels — A Practical Guide',
    description:
      'What it takes to run a real stargazing programme at a resort or hotel: the equipment, the staffing, the session format, the failure modes, and what it changes about the guest evening.',
    h1: 'Astronomy experiences for resorts and hotels',
    eyebrow: 'For properties',
    lede:
      'Properties outside the cities sit under a sky their guests cannot see at home, and almost all of them leave it entirely unused. This is a practical guide to turning that into a running guest experience — written for the people who would have to operate it.',
    keywords: [
      'astronomy experience for resorts',
      'stargazing experience hotel',
      'resort astronomy program',
      'astro tourism resort India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The asset nobody on the property team thinks of as one',
        body: [
          'A resort two or three hours outside a major Indian city typically sits under a sky its guests have never seen. They arrive from a Bortle 8–9 city where a few dozen stars are visible, and step out after dinner under several hundred. Most of them will not look up, because nobody told them to and there is nothing scheduled that would make them.',
          'The commercial shape of this is unusual. It is an asset the property already owns, it cannot be replicated by a competitor with a larger budget, and it occupies the part of the day — after dinner — that most properties have nothing programmed for. Guests are on site, unoccupied, and the evening currently ends at the restaurant.',
          'The catch is that the sky alone is not an experience. A telescope left on a lawn is equipment; a guest looking through it unaided sees a bright blur and concludes astronomy is overrated. What converts the asset is somebody who knows what to point at tonight, why it is interesting, and how to run ninety minutes for a mixed group of adults and children.',
        ],
      },
      {
        kind: 'points',
        heading: 'What a working programme requires',
        points: [
          {
            title: 'Equipment specified for the site',
            detail:
              'Aperture, mount and portability chosen against your actual observing spot, your wind and dew conditions, and the group sizes you run — then installed and calibrated so it works on the first night rather than after a season of adjustment.',
          },
          {
            title: 'An observing spot that is genuinely usable',
            detail:
              'Away from the property’s own lighting, with a decent horizon, reachable in a few minutes and safe to walk to in the dark. This is more often the constraint than the equipment is.',
          },
          {
            title: 'Trained staff, plural',
            detail:
              'Your own team leading the session, and more than one of them. A programme that depends on a single enthusiastic employee ends when that employee resigns.',
          },
          {
            title: 'A session format',
            detail:
              'A defined ninety minutes with a shape to it — orientation, naked-eye sky, then the eyepiece — rather than an open-ended queue. Format is what makes it repeatable by staff who are not astronomers.',
          },
          {
            title: 'Scheduling intelligence',
            detail:
              'Knowing what is worth showing this month, planning around the lunar cycle, and having a genuinely good session for a cloudy night. This is the operational knowledge that keeps quality steady.',
          },
          {
            title: 'Ongoing support',
            detail:
              'Optics need care, mounts drift, staff turn over and the sky changes with the season. A programme with no support behind it degrades quietly over about a year.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'Three ways properties do this, and how they hold up',
        columns: ['Approach', 'What it costs', 'What usually happens'],
        rows: [
          [
            'Buy a telescope',
            'Least',
            'It is used enthusiastically for a few weeks, nobody is confident enough to set it up well, and it ends up in storage. The most common outcome by a distance',
          ],
          [
            'Book a visiting astronomer per event',
            'Per session, ongoing',
            'Quality is good but availability is not. The experience exists only on scheduled dates, cannot be sold as a standing part of the stay, and never becomes yours',
          ],
          [
            'Build the capability in-house',
            'Most upfront, least per session',
            'The property can run sessions on its own schedule, and the experience compounds as staff get better at it. This is the only version that becomes an asset on the balance sheet',
          ],
        ],
      },
      {
        kind: 'callout',
        title: 'Be honest with guests about the weather',
        body:
          'Observation depends on cloud, haze and the lunar cycle, and no amount of equipment changes that. Properties that promise a guaranteed sky generate complaints; properties that say plainly what the night may or may not offer, and have a genuinely good indoor session ready, do not. Setting the expectation at booking rather than at the eyepiece is the single most important operational decision in the whole programme.',
      },
    ],
    faqs: [
      {
        question: 'Does a resort need a dark sky to offer stargazing?',
        answer:
          'It needs a sky meaningfully darker than its guests’ home cities, which most properties outside the metros have. The Moon, planets and bright objects work almost anywhere; a genuinely dark site adds the Milky Way and faint objects, which is a substantial upgrade but not a prerequisite.',
      },
      {
        question: 'Can hotel staff really learn to run astronomy sessions?',
        answer:
          'Yes — this is the normal model rather than an unusual one. Staff are trained to operate the equipment, locate objects and lead a session for a mixed audience. What they need is structured training and a defined session format, not an astronomy background.',
      },
      {
        question: 'How often can a property run a stargazing session?',
        answer:
          'As often as the sky and the schedule allow, which is the point of building the capability in-house. Sessions are planned around the lunar cycle and the season so that quality stays consistent rather than depending on whichever night a guest happens to ask.',
      },
      {
        question: 'What happens on cloudy nights?',
        answer:
          'A well-designed programme has real content for them — the sky as navigation, how telescopes work, what is coming in the season ahead. That is part of what training covers, and it is what separates a programme from a piece of equipment.',
      },
    ],
    experiences: [ASTROTRAIN_EXPERIENCE],
    related: [
      'resort-astronomy/stargazing-experience',
      'resort-astronomy/telescope-installation',
      'resort-astronomy/staff-training',
      'astro-tourism-india',
    ],
    cta: ASTROTRAIN_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------- STARGAZING EXPERIENCE */
  {
    slug: 'resort-astronomy/stargazing-experience',
    cluster: 'resort-astronomy',
    title: 'Designing a Stargazing Experience for Guests — What Actually Works',
    description:
      'How to structure a guest stargazing session: the ninety-minute shape, group sizes, what to show when, and the mistakes that turn a good sky into a queue.',
    h1: 'Designing a guest stargazing experience',
    eyebrow: 'Guest experience',
    lede:
      'The difference between a memorable stargazing session and a polite one is almost never the telescope. It is the structure of the ninety minutes — what happens before anyone reaches the eyepiece, and whether the guest was given a reason to care about what they are about to look at.',
    keywords: [
      'stargazing experience for resorts',
      'guest stargazing session',
      'astronomy experience hotel guests',
      'night activity for resort guests',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'The shape of a session that works',
        intro:
          'Roughly ninety minutes, and the order matters more than the content.',
        steps: [
          {
            title: 'Gather away from the lights, and wait',
            detail:
              'Bring the group to the observing spot and give them ten minutes before anything happens. Eyes begin adapting, conversation settles, and the sky visibly fills in while they stand there — which is itself the first demonstration.',
          },
          {
            title: 'Start with the naked eye',
            detail:
              'Orientation, a few constellations, the ecliptic the planets sit along, a satellite crossing. Guests need a map before they are handed a magnifying glass, and this is the part most sessions skip.',
          },
          {
            title: 'Explain the target before the queue forms',
            detail:
              'Say what they are about to see and why it matters — that Saturn’s rings are wide enough to span most of the distance to the Moon, that Jupiter’s moons have visibly moved since yesterday. Thirty seconds of context changes what people see.',
          },
          {
            title: 'Then the eyepiece, in small groups',
            detail:
              'This is where sessions fail. Forty guests and one instrument is a queue with a two-second payoff. Either run smaller groups or run parallel stations, and keep the people who are waiting occupied.',
          },
          {
            title: 'Move through two or three objects, not ten',
            detail:
              'The Moon or a planet, then something faint and different in character. Depth beats a tour. Guests remember one object explained well.',
          },
          {
            title: 'End deliberately',
            detail:
              'A closing image and something to take away — what will be visible from their own city, what to look for next month. Sessions that simply dissolve feel unfinished even when they went well.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'The operational details that decide quality',
        points: [
          {
            title: 'Group size',
            detail:
              'The single biggest lever. Time at the eyepiece per guest is what they will describe afterwards, and it falls linearly with headcount. Cap the session and run two rather than doubling one.',
          },
          {
            title: 'Light discipline',
            detail:
              'Red torches for staff, and a clear request at the start about phone screens. One guest with a bright screen degrades the experience for everyone standing nearby.',
          },
          {
            title: 'Property lighting',
            detail:
              'The pathway lights and the security floodlight near the lawn will do more damage than any distant town. Being able to switch them off for the session window is worth more than a larger telescope.',
          },
          {
            title: 'Comfort',
            detail:
              'Standing still outdoors after dark is colder than guests expect in almost every season. Seating, blankets and something warm to drink extend the average session by a considerable margin.',
          },
          {
            title: 'Children',
            detail:
              'Usually the most engaged people present and the least able to wait in a queue. A parallel naked-eye or activity station solves most of the behavioural problems a session runs into.',
          },
          {
            title: 'Timing against the Moon',
            detail:
              'Schedule the flagship nights around first quarter, when the Moon is spectacular, or new Moon, when the faint sky is available. Full Moon nights are the weakest of the month and are worth positioning differently.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The moment that sells the experience',
        body:
          'For most guests it is Saturn. Almost everyone has seen photographs and almost nobody expects the rings to be visible with their own eye through a tube on a lawn — and the reaction is consistent enough that it is worth building the session around whenever Saturn is up. When it is not, the Moon near first quarter does the same job. Both are bright enough to work from almost any property, which is why a good session is far less dependent on a pristine sky than people assume.',
      },
    ],
    faqs: [
      {
        question: 'How many guests can one stargazing session handle?',
        answer:
          'It depends on how many instruments and stations you run, not on the size of the lawn. As a working rule, plan so that no guest waits more than a few minutes for the eyepiece — beyond that, split into two sessions rather than stretching one.',
      },
      {
        question: 'How long should a guest stargazing session be?',
        answer:
          'Around ninety minutes works well: ten for arrival and dark adaptation, twenty to thirty on the naked-eye sky, and the remainder at the eyepiece across two or three objects.',
      },
      {
        question: 'What can guests see if the property is not in a dark-sky area?',
        answer:
          'The Moon in real detail, Saturn, Jupiter and its moons, Venus, bright double stars and the brightest clusters — all of which are bright enough to be largely unaffected by moderate light pollution. What a darker sky adds is the Milky Way and faint objects.',
      },
      {
        question: 'Should sessions be charged for or included in the stay?',
        answer:
          'Both models work and it is a commercial decision rather than an astronomical one. What matters more is that the session is scheduled and staffed rather than offered on request — a programme that only happens when someone asks tends not to happen.',
      },
    ],
    experiences: [ASTROTRAIN_EXPERIENCE],
    related: [
      'resort-astronomy',
      'resort-astronomy/staff-training',
      'resort-astronomy/telescope-installation',
      'stargazing',
    ],
    cta: ASTROTRAIN_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------- TELESCOPE INSTALLATION */
  {
    slug: 'resort-astronomy/telescope-installation',
    cluster: 'resort-astronomy',
    title: 'Telescope Installation for Hotels and Resorts — What to Specify',
    description:
      'Choosing and installing a telescope at a property: how to pick the observing spot, what to specify for guest use, and what maintenance the site will actually need.',
    h1: 'Telescope installation for properties',
    eyebrow: 'Equipment',
    lede:
      'Most property telescopes fail for reasons that have nothing to do with the telescope. They are specified for a catalogue rather than a site, placed where the lighting ruins them, or chosen with an assumption about who will operate them that turns out to be wrong.',
    keywords: [
      'telescope installation for hotels',
      'telescope for resort',
      'observatory for resort',
      'telescope setup property India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Specify the site before the instrument',
        body: [
          'The observing spot constrains everything downstream. How far it is from the equipment store determines whether staff will actually carry a mounted instrument there before a session. How exposed it is to wind determines whether high magnification is usable. How much of the property’s own lighting spills onto it determines what guests can see at all.',
          'Choosing that spot well is usually worth more than any upgrade in aperture. A modest telescope on a sheltered, dark, level pad five minutes from the store will be used a hundred times more than an excellent one on a windy lawn under a security light with a ten-minute walk.',
        ],
      },
      {
        kind: 'points',
        heading: 'What to look for in an observing spot',
        points: [
          {
            title: 'A dark patch you can control',
            detail:
              'Where the property’s own lighting can be switched off for the session window. Guest-facing lights are usually the binding constraint, and they are also the cheapest thing to fix.',
          },
          {
            title: 'A decent horizon',
            detail:
              'Open to the south if possible, since that is where the galactic core and much of the interesting sky passes. Trees and buildings on one side are fine; on all four sides they are not.',
          },
          {
            title: 'Shelter from wind',
            detail:
              'Wind shake at high magnification makes planetary viewing unusable. Partial shelter that does not block the sky is ideal — a hedge line or a low wall rather than a building.',
          },
          {
            title: 'A level, stable surface',
            detail:
              'A prepared pad rather than soft lawn. Mounts settle unevenly in grass, which shows up as drift halfway through a session.',
          },
          {
            title: 'A safe route in the dark',
            detail:
              'Guests will walk it with dark-adapted eyes, and the ground will be uneven. Low-level red-tinted path lighting solves this without ruining the sky.',
          },
          {
            title: 'Power',
            detail:
              'For mounts, dew control and any imaging. One reliable outlet is enough, and it is far easier to plan for now than to add later.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'What to specify, and why',
        columns: ['Consideration', 'What matters for guest use'],
        rows: [
          [
            'Aperture',
            'More light means more objects, but a large instrument that intimidates staff gets used less. The right answer is the largest that your trained team is genuinely comfortable operating',
          ],
          [
            'Mount stability',
            'The most under-specified component. A shaky mount makes good optics look poor, and guests read the wobble as a broken telescope',
          ],
          [
            'Speed of setup',
            'If setup takes forty minutes, sessions get cancelled on borderline evenings. Ten minutes changes the operational reality entirely',
          ],
          [
            'Eyepiece height',
            'It has to work for children and for adults without a stepladder, across the range of angles you will point at. Frequently discovered on the first busy night',
          ],
          [
            'Ruggedness',
            'This equipment is handled nightly by rotating staff in the dark. Robustness is worth more than an optical refinement guests cannot perceive',
          ],
          [
            'Dew and dust management',
            'Dew shields, heater bands and disciplined storage. In humid or dusty regions this is what determines whether optics stay usable across seasons',
          ],
        ],
      },
      {
        kind: 'callout',
        title: 'Permanent pier or portable mount?',
        body:
          'A permanent pier removes setup time and improves stability, which makes casual sessions far more likely to happen — but it fixes the location, exposes the equipment to weather, and needs a housing. A portable setup is flexible, safer between sessions and slower to deploy. Most properties are better served by a portable instrument with a prepared level pad and a short carry, which captures most of the benefit of both.',
      },
    ],
    faqs: [
      {
        question: 'What telescope should a resort buy for guest stargazing?',
        answer:
          'The one your trained staff can set up quickly and operate confidently at your specific observing spot. Mount stability, setup time and eyepiece height matter more for guest use than raw aperture, and the specification should follow a site survey rather than precede it.',
      },
      {
        question: 'Does a property need a permanent observatory?',
        answer:
          'Rarely. A prepared level pad in a controllable dark spot, with a short carry from secure storage, delivers most of the benefit at a fraction of the cost and commitment. A permanent installation makes sense once sessions are running frequently enough to justify it.',
      },
      {
        question: 'How much maintenance does a property telescope need?',
        answer:
          'Routine care rather than heavy work: cleaning discipline, dew management, collimation checks for reflectors, and correct storage. It is manageable by trained staff, and it is also the thing that quietly stops happening without ongoing support.',
      },
      {
        question: 'Will light from the property ruin the view?',
        answer:
          'Nearby unshielded lighting does far more damage than a distant town, and it is the most common reason a good site underperforms. Being able to switch off or shield the lights around the observing spot is usually the highest-value single change a property can make.',
      },
    ],
    experiences: [ASTROTRAIN_EXPERIENCE],
    related: [
      'resort-astronomy',
      'resort-astronomy/staff-training',
      'resort-astronomy/stargazing-experience',
      'astronomy-education/telescope-programs',
    ],
    cta: ASTROTRAIN_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------ STAFF TRAINING */
  {
    slug: 'resort-astronomy/staff-training',
    cluster: 'resort-astronomy',
    title: 'Training Hotel Staff to Run Astronomy Sessions',
    description:
      'What property staff actually need to learn to lead a stargazing session: equipment handling, finding objects, reading the season, and running ninety minutes for a mixed group.',
    h1: 'Training staff to run astronomy sessions',
    eyebrow: 'Capability',
    lede:
      'The question properties ask is whether their team can genuinely learn this. The answer is yes, and the reason is that leading a good session is mostly a hospitality skill with a specific body of knowledge attached — not an astronomy career.',
    keywords: [
      'astronomy staff training',
      'train hotel staff stargazing',
      'resort astronomy training',
      'stargazing guide training India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What the job actually is',
        body: [
          'A guest session does not require someone who can calculate an orbit. It requires someone who can set up an instrument reliably in the dark, find four or five objects without fumbling, explain each of them in a couple of sentences that make a non-specialist care, and manage a group of twenty people who cannot see their own feet.',
          'Three of those four are things hospitality staff are already better at than most astronomers. The specific astronomy — what is up tonight, how to find it, what is worth saying about it — is a body of knowledge that can be taught and, importantly, written down as a monthly reference so it does not have to be memorised.',
        ],
      },
      {
        kind: 'points',
        heading: 'What training has to cover',
        points: [
          {
            title: 'Equipment handling',
            detail:
              'Setup, alignment, balance, changing eyepieces in the dark, and pack-down. Repeated until it is muscle memory, because it will always be done under time pressure with guests waiting.',
          },
          {
            title: 'Finding objects',
            detail:
              'Star-hopping with a finder, and using a GoTo mount correctly where one is fitted. Staff who can only rely on the computer are stranded the night alignment fails.',
          },
          {
            title: 'What is up this month',
            detail:
              'A seasonal reference the property keeps: which planets are visible, what the Moon is doing, which clusters and nebulae are well placed. This is what makes the session current rather than generic.',
          },
          {
            title: 'Two sentences per object',
            detail:
              'Not a lecture — a specific, concrete fact that changes how the guest sees what is in the eyepiece. This is the part that most distinguishes a good session, and it is entirely learnable.',
          },
          {
            title: 'Group management in the dark',
            detail:
              'Sequencing the queue, keeping waiting guests engaged, handling children, and enforcing light discipline politely. Familiar hospitality skills in unfamiliar conditions.',
          },
          {
            title: 'The cloudy-night session',
            detail:
              'A prepared indoor alternative that is genuinely interesting. Staff who have run it once stop dreading cloud, which noticeably changes how willingly sessions get scheduled.',
          },
          {
            title: 'Safety',
            detail:
              'Absolute rules around solar observation if a solar setup is present, plus the ordinary business of moving guests safely over uneven ground at night.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Train more than one person, and write it down',
        body:
          'Hospitality has turnover, and a programme that lives in one employee’s head leaves with them. Training at least two staff members, and maintaining a written run sheet plus a monthly sky reference, is what converts astronomy from a person into a property capability. It is also what makes onboarding the next person a week rather than a season.',
      },
      {
        kind: 'points',
        heading: 'Signs the training took',
        points: [
          {
            title: 'Sessions happen on ordinary nights',
            detail:
              'Not just when a group books. Willingness to run a session on a quiet Tuesday is the clearest indicator that staff are genuinely comfortable.',
          },
          {
            title: 'Staff adjust the plan to the sky',
            detail:
              'Substituting a target because the Moon is bright or a planet has set, rather than running the same script regardless. This is real understanding rather than recall.',
          },
          {
            title: 'Cloudy nights still run',
            detail:
              'The indoor session being used rather than the evening being cancelled.',
          },
          {
            title: 'Guests ask follow-up questions',
            detail:
              'And staff answer them, or say honestly that they do not know and find out. Both are good signs; only bluffing is a bad one.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do staff need a science background to lead stargazing sessions?',
        answer:
          'No. The session is a guided experience with a defined structure, and the astronomy involved is a learnable body of knowledge supported by a written monthly reference. Hospitality instincts matter more than a physics background.',
      },
      {
        question: 'How many staff should be trained?',
        answer:
          'At least two, and ideally more. Hospitality turnover is the most common reason a property astronomy programme quietly stops, and a single trained person is a single point of failure.',
      },
      {
        question: 'What if trained staff leave?',
        answer:
          'This is why the programme should be documented rather than held in memory — a written run sheet, a seasonal sky reference and a standard session format make onboarding a replacement fast. Ongoing support covers retraining as the team changes.',
      },
      {
        question: 'How long before staff can run a session unsupervised?',
        answer:
          'That depends on the equipment, the format and how frequently they practise, which is why it is set during planning with the property rather than promised as a fixed number. What matters is that they have run real sessions with guests before being left to do it alone.',
      },
    ],
    experiences: [ASTROTRAIN_EXPERIENCE],
    related: [
      'resort-astronomy',
      'resort-astronomy/stargazing-experience',
      'resort-astronomy/telescope-installation',
      'astro-tourism-india',
    ],
    cta: ASTROTRAIN_CTA,
    updated: UPDATED,
  },
]
