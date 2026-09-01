/**
 * ============================================================================
 *  CLUSTER 1 — ASTRONOMY EDUCATION  →  funnels into /astroed
 * ============================================================================
 *  The highest-value cluster: schools are a B2B decision with a long
 *  consideration window, and the people searching ("astronomy lab for
 *  schools", "space lab for school", "STEM astronomy activities") are
 *  usually principals, heads of science and activity coordinators who need
 *  to understand what a programme actually involves before they enquire.
 *
 *  Every capability described here is carried over from `lib/astroed-data.ts`
 *  — Space Lab, year-long curriculum for Grades 4–12, telescope and safe
 *  solar observation, model rocketry and physics STEM, ISRO-aligned space
 *  science modules, VR solar-system experiences, trained astronomy educators.
 *  No school names, no student counts, no outcome statistics, no pricing.
 * ========================================================================== */

import { ENQUIRY } from '@/lib/site-config'
import type { Guide } from '@/lib/seo/types'

const UPDATED = '2026-09-01'

/** Every page in this cluster ends at AstroEd. */
const ASTROED_CTA = {
  heading: 'Bring astronomy into your school year',
  body: 'AstroEd builds a Space Lab inside the school and runs a structured astronomy curriculum across Grades 4–12, delivered by trained astronomy educators. Tell us about your school and we will come back with what a programme would look like for you.',
  primary: { label: 'Explore AstroEd', href: '/astroed' },
  secondary: { label: 'Enquire on WhatsApp', href: ENQUIRY.astroed.whatsapp, external: true },
}

const ASTROED_EXPERIENCE = {
  label: 'AstroEd',
  title: 'AstroEd — Space Lab & astronomy curriculum for schools',
  detail:
    'A permanent astronomy space inside the school plus a year-long curriculum for Grades 4–12: telescope and safe solar observation, model rocketry and physics activities, ISRO-aligned space science modules and student-run projects.',
  href: '/astroed',
}

export const educationGuides: Guide[] = [
  /* ------------------------------------------------------------------ HUB */
  {
    slug: 'astronomy-education',
    cluster: 'astronomy-education',
    isHub: true,
    title: 'Astronomy Education for Schools in India — A Practical Guide',
    description:
      'What a real school astronomy programme involves: space labs, telescope sessions, safe solar observation, rocketry and ISRO-aligned space science. Written for Indian schools deciding how to start.',
    h1: 'Astronomy education for schools in India',
    eyebrow: 'Astronomy education',
    lede:
      'Astronomy is the one science a student can walk outside and verify. This is a practical guide to turning that into a programme a school can actually run — what the infrastructure looks like, what students do, which grades it suits, and how to start without pretending the sky over an Indian city is something it is not.',
    keywords: [
      'astronomy education for schools',
      'astronomy programs for schools India',
      'space science program for schools',
      'astronomy curriculum for schools',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Why most school astronomy stops at one evening',
        body: [
          'The usual version is familiar. A telescope arrives for an evening, a long queue forms, each student gets a few seconds at the eyepiece, someone says "that is Saturn", and the equipment leaves. Students remember the novelty. Almost none of them remember the science, because there was none to remember — they were shown an object, not taught how to find one.',
          'The problem is structural rather than one of enthusiasm. A single visit has no way to build on itself. There is no equipment on campus the following week, no teacher who has been trained to run a second session, and nothing in the academic calendar that the evening connects to. Interest peaks on the night and has nowhere to go.',
          'A programme that works inverts all three of those. The equipment stays on campus, a member of the science faculty is brought along far enough to run sessions, and the observing is tied to what students are already being taught in physics and geography. That is what the rest of this guide describes.',
        ],
      },
      {
        kind: 'points',
        heading: 'What a serious school astronomy programme contains',
        intro:
          'Not every school needs all of this on day one, but a programme missing more than one or two of these tends to collapse back into the single-evening pattern.',
        points: [
          {
            title: 'Somewhere for it to live',
            detail:
              'A dedicated room or space — a space lab — where the telescopes, the models and the student work stay set up and visible between sessions. Equipment stored in a cupboard on the third floor gets used once a term at best.',
          },
          {
            title: 'A curriculum that runs across the year',
            detail:
              'A sequence with an order to it: orientation and scale first, then naked-eye and telescope observation, then the solar system, then deep-sky objects, then space science, then student projects. Each stage should assume the one before it.',
          },
          {
            title: 'Observation students perform themselves',
            detail:
              'The difference between a demonstration and an education is who points the telescope. Students should learn to locate a target, align the instrument and find it — including the failures, which teach more than the successes.',
          },
          {
            title: 'A daytime component',
            detail:
              'Indian school timetables are daytime timetables. Safe solar observation, with proper filtration, is what makes astronomy possible inside school hours rather than only at special evening events.',
          },
          {
            title: 'Things students build',
            detail:
              'Model rocketry and physics-led activities give the abstract parts a measurable outcome. A student who has built something and watched it behave badly has learned more mechanics than one who has been shown a correct diagram.',
          },
          {
            title: 'Faculty who are brought along',
            detail:
              'If the programme depends entirely on a visiting expert, it ends when the visits end. Science faculty working alongside trained astronomy educators is what makes it the school’s programme rather than a vendor’s.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'What suits which grades',
        intro:
          'A rough map. The same night sky supports very different levels of work, which is why one programme can run across a whole school rather than being aimed at a single year group.',
        columns: ['Grades', 'What works', 'What students should be able to do by the end'],
        rows: [
          [
            'Grades 4–6',
            'Scale and motion, day and night, seasons, the Moon and its phases, first looks through a telescope',
            'Recognise a handful of constellations and explain why the Moon changes shape',
          ],
          [
            'Grades 7–8',
            'Reading the sky by eye, using a star chart, the solar system, safe solar observation, model rocketry',
            'Find a named object in the sky without help and describe how the solar system is arranged',
          ],
          [
            'Grades 9–10',
            'Telescope optics, orbital mechanics tied to the physics syllabus, deep-sky objects, basic astrophotography',
            'Set up and align a telescope, and connect what they observe to the physics they are taught',
          ],
          [
            'Grades 11–12',
            'Space science and mission design, ISRO-aligned modules, independent observation projects',
            'Run a small observation or space-science project of their own and present the result',
          ],
        ],
        note:
          'Indicative rather than prescriptive — the actual sequence is set with the school’s science faculty around the existing syllabus.',
      },
      {
        kind: 'callout',
        title: 'An honest word about Indian city skies',
        body:
          'A school in Delhi, Gurgaon, Mumbai or Bengaluru sits under a Bortle 8–9 sky. The Milky Way is not coming back over a school field, and any programme that promises galaxies from a city rooftop is selling something. What genuinely works from a campus is the Sun with proper filtration, the Moon in real detail, the bright planets, double stars and the brightest clusters — which is more than enough to build a curriculum on. Faint deep-sky work belongs on a dark-sky trip, and should be planned as one.',
      },
      {
        kind: 'steps',
        heading: 'How a school actually starts',
        intro:
          'The order matters. Schools that buy equipment first usually end up with an expensive telescope nobody is confident enough to use.',
        steps: [
          {
            title: 'Decide what the programme is for',
            detail:
              'A club for interested students, a whole-school science enrichment, or a curriculum-linked programme feeding board-level physics are three different builds. Choose before specifying anything.',
          },
            {
            title: 'Find the space before the equipment',
            detail:
              'Identify the room the programme will live in and the observing spot on campus — a roof, a field, a courtyard with a usable horizon. Sky access constrains everything that follows.',
          },
          {
            title: 'Specify equipment against that space',
            detail:
              'Aperture, mount type and portability follow from where you can actually observe and who will carry it there. A large instrument that needs three staff to move is used less than a smaller one that does not.',
          },
          {
            title: 'Train the people first',
            detail:
              'Faculty training before the first student session. The programme should be able to run on an ordinary Tuesday, not only when a specialist is on site.',
          },
          {
            title: 'Put it in the calendar',
            detail:
              'Fixed sessions in the academic timetable, planned around the lunar cycle so the Moon is an asset rather than an obstacle. Anything not in the calendar is optional, and optional things get cancelled.',
          },
          {
            title: 'Give students something to finish',
            detail:
              'End the year on student-run projects and a public showing of them. It gives the programme visible output, which is what keeps it funded.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a school need a dark sky to run an astronomy programme?',
        answer:
          'No. Safe solar observation, the Moon, the bright planets, double stars and the brightest clusters are all available from a city campus, and they carry most of a school curriculum. A dark sky matters for faint deep-sky observation and astrophotography, which is best handled as a planned trip rather than a reason not to start.',
      },
      {
        question: 'Which grades is school astronomy suitable for?',
        answer:
          'Grades 4 to 12, with the content changing rather than the subject. Younger students work on scale, motion and first observation; senior students move into telescope optics, space science and independent projects.',
      },
      {
        question: 'Does astronomy fit CBSE, ICSE and state board syllabi?',
        answer:
          'It attaches to them rather than competing with them. Gravitation, optics, light, the solar system and the seasons are already on the syllabus — astronomy gives students a way to observe those things directly instead of only reading about them.',
      },
      {
        question: 'How much time does a programme take in the school week?',
        answer:
          'That is a scheduling decision, not a fixed quantity. Most schools run it as a regular period or club slot with occasional evening observation sessions timed around the Moon. The sequence is designed with the school so it fits the existing timetable.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education/schools',
      'astronomy-education/space-lab',
      'astronomy-education/telescope-programs',
      'astronomy-education/stem-space-programs',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------------- SCHOOLS */
  {
    slug: 'astronomy-education/schools',
    cluster: 'astronomy-education',
    title: 'Astronomy Programs for Schools — What to Look For Before You Commit',
    description:
      'A buyer’s guide for schools considering an astronomy programme: what to ask a provider, what infrastructure you need, how to budget the decision and the warning signs of a one-evening package.',
    h1: 'Astronomy programs for schools',
    eyebrow: 'For schools',
    lede:
      'Written for principals, heads of science and activity coordinators who have been asked to evaluate an astronomy programme and want to know what separates a real one from an expensive evening.',
    keywords: [
      'astronomy programs for schools',
      'astronomy workshop for schools',
      'school astronomy program India',
      'astronomy program for CBSE schools',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The decision you are actually making',
        body: [
          'Astronomy proposals arrive looking similar. Most describe equipment and enthusiasm; few describe what happens in week six. The useful question when comparing them is not what the school receives on day one, but what the school is able to do on its own after a year.',
          'That single question separates the two categories almost perfectly. An event is delivered to your students. A programme is transferred to your school — the equipment, the sequence, and enough trained capability in your own faculty that sessions continue without the provider in the room.',
        ],
      },
      {
        kind: 'points',
        heading: 'Questions worth asking any provider',
        intro:
          'These are the ones that tend to be answered vaguely when the underlying offer is an event dressed as a programme.',
        points: [
          {
            title: 'What stays on campus afterwards?',
            detail:
              'Ask specifically about equipment, teaching material and the physical space. If nothing remains, the school is buying a performance, and interest will decay to zero within a month.',
          },
          {
            title: 'Who runs the fourth session?',
            detail:
              'The first three are always run well. Ask who is standing in the room in week eight, and what training your own faculty receives to be that person.',
          },
          {
            title: 'How does this connect to what we already teach?',
            detail:
              'A good answer names the actual topics — gravitation, optics, the solar system, seasons — and explains where observation attaches to them. A weak answer talks about inspiration.',
          },
          {
            title: 'What happens when it is cloudy?',
            detail:
              'This will happen repeatedly, particularly through the monsoon. A programme should have real indoor sessions planned for it, not a rescheduling policy.',
          },
          {
            title: 'What can we honestly see from our campus?',
            detail:
              'Any provider who promises galaxies and nebulae from an urban school roof is either inexperienced or not being straight with you. Expect the Sun, the Moon, the planets and bright clusters, and be suspicious of more.',
          },
          {
            title: 'What do students produce?',
            detail:
              'Programmes that end in student projects, observation logs or images give the school something to show parents and boards. Programmes that end when the term ends leave nothing behind.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What the school needs to bring',
        intro:
          'The infrastructure question is smaller than most schools expect, but the parts that matter are not negotiable.',
        points: [
          {
            title: 'An observing spot with sky',
            detail:
              'A roof, a field or a courtyard with a reasonable horizon and, ideally, some shielding from the school’s own security lighting. Nearby floodlights do more damage than the city glow.',
          },
          {
            title: 'A room the programme lives in',
            detail:
              'It does not need to be large. It needs to be permanent, so equipment stays assembled and student work stays on the walls.',
          },
          {
            title: 'A faculty owner',
            detail:
              'One named member of the science department who is trained and accountable for the programme. Programmes without an owner quietly stop.',
          },
          {
            title: 'A place in the calendar',
            detail:
              'Scheduled slots, and permission for a small number of evening sessions across the year, planned around the lunar cycle.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Plan the year around the Moon, not around convenience',
        body:
          'A full Moon washes out almost everything faint but is spectacular in itself near first or last quarter, when shadows along the terminator make craters look three-dimensional. Schools that schedule observation sessions blind end up running half of them under conditions that show students very little. Setting the evening dates against the lunar calendar at the start of the year costs nothing and roughly doubles how much students actually see.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between an astronomy workshop and an astronomy programme?',
        answer:
          'A workshop is a fixed-length event, usually a day or an evening, aimed at exposure. A programme runs across the academic year, leaves equipment and trained faculty in the school, and builds from first observation to student-run projects. Workshops are a good way to test appetite; they are not a substitute for a programme.',
      },
      {
        question: 'Do we need to buy telescopes before starting?',
        answer:
          'No, and buying first is the common mistake. Equipment should be specified against your actual observing space and the people who will operate it. Schools that purchase first frequently end up with an instrument nobody is confident enough to set up.',
      },
      {
        question: 'Can an astronomy programme run in a school with no science lab space to spare?',
        answer:
          'Usually yes, at a smaller scale. The programme needs a permanent home rather than a large one — a shared room with dedicated storage and wall space works, provided the equipment does not have to be reassembled from scratch every session.',
      },
      {
        question: 'How do we justify it to a board that wants academic outcomes?',
        answer:
          'Tie it to the syllabus explicitly and end the year with student projects. Observation logs, student-captured images of the Moon and planets, and presented projects are concrete outputs a board can see, and they attach directly to physics and geography topics already being assessed.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education',
      'astronomy-education/space-lab',
      'astronomy-education/workshops',
      'astronomy-education/telescope-programs',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------- SPACE LAB */
  /* Deliberately ONE page for both "space lab for schools" and "astronomy lab
   * for schools". They are the same search intent with two vocabularies, and
   * splitting them would have produced two thin pages competing with each
   * other for the same queries. */
  {
    slug: 'astronomy-education/space-lab',
    cluster: 'astronomy-education',
    title: 'Space Lab for Schools — What Goes Into an Astronomy Lab, and What It Needs',
    description:
      'What a school space lab or astronomy lab actually contains, the room and sky access it needs, how it is used week to week, and the mistakes that leave one sitting unused.',
    h1: 'Setting up a space lab in a school',
    eyebrow: 'Infrastructure',
    lede:
      'A space lab — an astronomy lab, in the other common phrasing — is the room that stops a school astronomy programme from evaporating. This is what goes in one, what the building actually has to provide, and why the room matters more than the telescope.',
    keywords: [
      'space lab for schools',
      'astronomy lab for schools',
      'school space lab setup',
      'astronomy lab equipment for schools',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Why the room is the point',
        body: [
          'Schools tend to think of an astronomy programme as equipment, and equipment as a telescope. The result is predictable: a good instrument arrives, is used twice, is packed into a case, and is stored somewhere secure enough that retrieving it becomes a small administrative act. Six months later nobody is quite sure who has the key.',
          'A dedicated space changes the economics of using it. When the telescopes are already assembled, the models are already on the shelf, and last term’s student work is already on the wall, a session costs a teacher five minutes of setup instead of an hour. That difference is what determines whether the programme is running in month nine.',
          'It also changes what the programme signals. A room that visibly belongs to astronomy tells students, parents and visiting boards that the school made a commitment rather than booked an event.',
        ],
      },
      {
        kind: 'points',
        heading: 'What a working space lab contains',
        intro:
          'Not a shopping list to be bought at once — most schools build this up across two or three years. The order below is roughly the order things earn their place.',
        points: [
          {
            title: 'Telescopes that stay assembled',
            detail:
              'At least one instrument that lives ready to use, plus the eyepieces, finder and star charts alongside it rather than in a separate store. A reflector on a stable mount and a small refractor cover very different jobs.',
          },
          {
            title: 'Safe solar equipment',
            detail:
              'Proper full-aperture solar filtration or a dedicated solar instrument. This is the single item that makes astronomy possible inside school hours, and it is also the one item where improvisation is genuinely dangerous.',
          },
          {
            title: 'A working horizon',
            detail:
              'The observing spot matters as much as the room: a roof, terrace or field the equipment can reach in a few minutes, with as much open sky as the site allows and as little of the school’s own security lighting as possible.',
          },
          {
            title: 'Models and hands-on kit',
            detail:
              'Model rocketry materials, orrery or scale-model work, and physics apparatus that lets students build and test rather than only observe.',
          },
          {
            title: 'Immersive material',
            detail:
              'VR journeys through the solar system, used for the things a telescope cannot show — the scales, the distances and the vantage points no instrument on Earth provides.',
          },
          {
            title: 'Student work on display',
            detail:
              'Observation logs, sketches, images, project posters. This is not decoration: it is how a new cohort learns what the room is for.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'What the building has to provide',
        intro:
          'The physical requirements are modest, which surprises most schools. These are the ones that genuinely constrain the design.',
        columns: ['Requirement', 'Why it matters', 'What is usually enough'],
        rows: [
          [
            'A permanent room',
            'Equipment that has to be reassembled each session gets used a fraction as often',
            'A shared classroom is workable if storage and wall space are dedicated',
          ],
          [
            'Route to open sky',
            'Carrying a mounted telescope down three flights discourages spontaneous sessions',
            'Same floor as a terrace, or ground floor with a field nearby',
          ],
          [
            'Controllable lighting',
            'Dark adaptation takes around twenty minutes and one white light destroys it instantly',
            'Ability to switch off nearby security lights during a session',
          ],
          [
            'Secure but accessible storage',
            'Security that only the admin office can unlock becomes the reason sessions do not happen',
            'A lockable cupboard in the room, with the science department holding keys',
          ],
          [
            'Power at the observing spot',
            'Mounts, dew control and imaging all draw power on longer sessions',
            'One reliable socket or a portable power bank rated for the mount',
          ],
        ],
      },
      {
        kind: 'callout',
        title: 'The failure mode to design against',
        body:
          'The most common way a school space lab dies is not budget and not weather. It is that the one enthusiastic teacher who ran it changes schools, and nobody else was ever trained to open the room. Building the programme around at least two trained faculty members, with the sequence written down rather than carried in someone’s head, is worth more than any single piece of equipment in the room.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a space lab and an astronomy lab?',
        answer:
          'In practice, nothing — schools use both terms for the same facility. "Space lab" tends to be used where rocketry and space-science modules are prominent, and "astronomy lab" where observation is the centre of gravity. A well-built room does both.',
      },
      {
        question: 'How much space does a school space lab need?',
        answer:
          'Less than most schools assume. A standard classroom is comfortable. What matters far more than floor area is that the space is permanent, has dedicated storage, and has a short route to a spot with open sky.',
      },
      {
        question: 'Can a space lab be useful in a city with heavy light pollution?',
        answer:
          'Yes, provided the programme is honest about what it targets. Safe solar observation, the Moon in detail, the bright planets, double stars and the brightest clusters all work from an urban campus. Faint deep-sky observation does not, and should be planned as a dark-sky trip instead.',
      },
      {
        question: 'Who maintains the equipment?',
        answer:
          'Trained school faculty handle routine care — collimation checks, cleaning discipline, dew management and storage. Anything beyond that is part of the ongoing support the programme provides, which is worth confirming explicitly before you commit.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education',
      'astronomy-education/schools',
      'astronomy-education/telescope-programs',
      'astronomy-education/stem-space-programs',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------- WORKSHOPS */
  {
    slug: 'astronomy-education/workshops',
    cluster: 'astronomy-education',
    title: 'Astronomy Workshops for Schools — Formats That Actually Work',
    description:
      'Day workshops, evening observation sessions, solar sessions and multi-day intensives: which astronomy workshop format suits which school, and how to run one that leads somewhere.',
    h1: 'Astronomy workshops for schools',
    eyebrow: 'Formats',
    lede:
      'A workshop is the usual way a school starts. Done carelessly it is a pleasant evening that changes nothing; done well it is a deliberate first step with a defined next one. These are the formats worth considering and what each is genuinely good for.',
    keywords: [
      'astronomy workshop for schools',
      'astronomy workshop for students',
      'space science workshop schools India',
      'solar observation session school',
    ],
    sections: [
      {
        kind: 'points',
        heading: 'The formats, and what each is for',
        points: [
          {
            title: 'Daytime solar session',
            detail:
              'Safe, filtered observation of the Sun inside school hours — sunspots, the solar disc, and the surprise most students get when they realise the Sun has visible structure. The only format that needs no change to the timetable, and the easiest first step for a large school.',
          },
          {
            title: 'Evening observation session',
            detail:
              'Two to three hours after dusk on campus, planned around the lunar cycle. Best run in small rotating groups rather than one long queue, so students get time at the eyepiece instead of a glimpse.',
          },
          {
            title: 'Full-day hands-on workshop',
            detail:
              'Model rocketry, physics activities, scale-model work and immersive material during the day, ideally ending with an evening session. Works well as an annual science-week centrepiece.',
          },
          {
            title: 'Multi-day intensive',
            detail:
              'A short sequence across three or four days, which is enough to teach students to locate objects themselves rather than be shown them. This is the shortest format that produces a genuine skill.',
          },
          {
            title: 'Dark-sky trip',
            detail:
              'An off-campus night where the faint sky is actually available. Expensive in logistics and worth it once students already know what they are looking at — not as a first exposure.',
          },
        ],
      },
      {
        kind: 'steps',
        heading: 'Running one that leads somewhere',
        steps: [
          {
            title: 'Set the date against the Moon',
            detail:
              'Pick the window before you pick the day. Near first or last quarter the Moon is spectacular through a telescope; near full it is flat and it drowns everything else.',
          },
          {
            title: 'Split the group',
            detail:
              'Rotating stations — telescope, naked-eye sky reading, a hands-on activity — keep everyone occupied. One queue for one instrument is how a workshop becomes a memory of waiting.',
          },
          {
            title: 'Teach finding, not just looking',
            detail:
              'Let students align the instrument and locate the target at least once. It is slower, and it is the entire difference between a demonstration and a lesson.',
          },
          {
            title: 'Have a real cloud plan',
            detail:
              'Not a reschedule — an actual indoor session of equal quality, prepared in advance. Over an Indian academic year you will need it more than once.',
          },
          {
            title: 'End with a next step',
            detail:
              'An observation log to continue, a project to enter, or a decision to be made about a longer programme. A workshop with no follow-on reliably produces nothing three weeks later.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'A workshop is a test, not a programme',
        body:
          'Used deliberately, a workshop answers a real question for a school: is there enough appetite here — among students and among the science faculty — to justify building something permanent? That is a good reason to run one. It is a poor substitute for the thing it is testing, and schools that run the same workshop every year usually end up with the same result every year.',
      },
    ],
    faqs: [
      {
        question: 'How many students can one astronomy workshop handle?',
        answer:
          'It depends on the number of instruments and stations, not on the size of the hall. As a working rule, plan for enough parallel activity that no student waits more than a few minutes for a turn — beyond that, split the cohort across sessions rather than stretching one.',
      },
      {
        question: 'Is a daytime astronomy workshop worth running?',
        answer:
          'Yes, and it is underrated. Safe solar observation shows real, changing structure on the Sun, needs no timetable change and no parental consent for an evening event, which makes it the most repeatable format an Indian school has.',
      },
      {
        question: 'What happens if it is cloudy on the night?',
        answer:
          'A well-planned workshop has an indoor session of equal value ready — telescope handling and optics, sky-motion work, rocketry or immersive material. Ask about this explicitly before booking; the answer tells you a lot about how many of these a provider has actually run.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education',
      'astronomy-education/schools',
      'astronomy-education/telescope-programs',
      'stargazing/near-delhi',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------- TELESCOPE PROGRAMS */
  {
    slug: 'astronomy-education/telescope-programs',
    cluster: 'astronomy-education',
    title: 'Telescope Programs for Schools — Choosing and Actually Using One',
    description:
      'How to choose a school telescope, what students can realistically see from an Indian campus, and how to build a telescope programme that keeps the instrument in use rather than in a cupboard.',
    h1: 'Telescope programs for schools',
    eyebrow: 'Equipment',
    lede:
      'Most school telescopes are used fewer than ten times in their life. The reasons are consistent and avoidable — and they have far more to do with who was trained and where the instrument is stored than with which model was bought.',
    keywords: [
      'telescope program for schools',
      'school telescope India',
      'best telescope for schools',
      'telescope session for students',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Buy for the operator, not for the specification',
        body: [
          'Telescope specifications are seductive and mostly beside the point in a school. Aperture determines how much light you gather; it does not determine how many sessions happen. The instrument that gets used is the one a trained teacher can carry to the terrace and have working in ten minutes, on an ordinary evening, without help.',
          'This is why the sequence matters. Decide where you can observe, decide who will operate it, and only then decide what to buy. Schools that reverse that order almost always end up with a capable instrument and no capable session.',
        ],
      },
      {
        kind: 'table',
        heading: 'What each type is good and bad at, in a school',
        columns: ['Type', 'Strong at', 'The catch in a school'],
        rows: [
          [
            'Dobsonian reflector',
            'The most aperture per rupee — the best views of the Moon, planets and bright clusters a school budget can buy',
            'Bulky. Needs a short, flat route to the observing spot and occasional collimation, which faculty must be trained to do',
          ],
          [
            'Small refractor',
            'Robust, near-zero maintenance, excellent on the Moon and planets, quick to set up',
            'Limited aperture, so fainter objects stay out of reach',
          ],
          [
            'Computerised GoTo mount',
            'Finds objects quickly, which matters when a session has forty students and ninety minutes',
            'Needs power and correct alignment, and it removes the finding skill unless you deliberately teach that separately',
          ],
          [
            'Dedicated solar setup',
            'Works inside school hours, every clear day, with visible changing detail',
            'Single-purpose — and safety is absolute, so it must never be improvised with unrated filters',
          ],
        ],
        note:
          'Most schools end up with a combination rather than one instrument, added over time as the programme proves itself.',
      },
      {
        kind: 'points',
        heading: 'What students can genuinely see from an Indian school campus',
        intro:
          'Setting this expectation honestly at the start is what stops the first session being a disappointment.',
        points: [
          {
            title: 'The Sun, safely filtered',
            detail:
              'Sunspots and the solar disc, changing week to week. The one target available during the school day.',
          },
          {
            title: 'The Moon, in real detail',
            detail:
              'Craters, mountain ranges and the shadow line. Near first or last quarter it is genuinely three-dimensional, and it is the object that converts sceptical students fastest.',
          },
          {
            title: 'The bright planets',
            detail:
              'Saturn’s rings, Jupiter’s bands and its four Galilean moons, and the phases of Venus — all visible from a city, because they are bright enough for light pollution not to matter much.',
          },
          {
            title: 'Double stars and bright clusters',
            detail:
              'Colour-contrasting doubles and the brightest open clusters survive an urban sky and make good teaching targets for stellar properties.',
          },
          {
            title: 'What will not work from a city',
            detail:
              'Galaxies, faint nebulae and the Milky Way. Under a Bortle 8–9 urban sky these are effectively unavailable, and promising them is the fastest way to lose a class’s trust.',
          },
        ],
      },
      {
        kind: 'steps',
        heading: 'Building the programme around the instrument',
        steps: [
          {
            title: 'Train two people, not one',
            detail:
              'Setup, alignment, finding, safe solar practice and pack-down — for at least two faculty members, so a transfer or a sick day does not end the programme.',
          },
          {
            title: 'Write down the session',
            detail:
              'A short, repeatable run sheet: what to point at this month, in what order, and what to say about each. It turns a specialist skill into a departmental one.',
          },
          {
            title: 'Teach students to find things',
            detail:
              'Star charts and a finder first, GoTo second. A student who can locate Jupiter unaided has learned the sky; one who pressed a button has learned an interface.',
          },
          {
            title: 'Keep an observation log',
            detail:
              'Date, target, conditions, what was seen, a sketch. It creates continuity between sessions and gives senior students the raw material for a project.',
          },
          {
            title: 'Schedule maintenance',
            detail:
              'Collimation checks, cleaning discipline and dew management on a fixed rhythm. Optics degrade quietly, and a poorly maintained telescope teaches students that telescopes are disappointing.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best telescope for a school in India?',
        answer:
          'The one your trained faculty will actually carry out and set up. For most schools that means a stable Dobsonian reflector for depth, or a small robust refractor for speed and low maintenance — plus properly rated solar filtration, which is what makes daytime sessions possible.',
      },
      {
        question: 'Can students see galaxies from a school in a city?',
        answer:
          'Realistically, no. Under a Bortle 8–9 urban sky, galaxies and faint nebulae are washed out regardless of aperture. The Sun, Moon, planets, double stars and bright clusters are all genuinely available, and a dark-sky trip is the right way to add the rest.',
      },
      {
        question: 'Is a computerised GoTo telescope better for schools?',
        answer:
          'It is faster, which matters with large groups and short sessions, and that is a real advantage. The trade-off is that it can replace the skill of finding objects rather than teaching it, so most good programmes use both and teach star-hopping explicitly.',
      },
      {
        question: 'How dangerous is solar observation?',
        answer:
          'Unfiltered or improperly filtered solar observation can cause permanent eye damage in seconds, which is why it is only ever done with full-aperture filtration rated for the purpose, or a dedicated solar instrument, under trained supervision. With correct equipment and procedure it is entirely safe and is one of the most rewarding things a school can run.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education',
      'astronomy-education/space-lab',
      'astronomy-education/schools',
      'stargazing/delhi',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* ----------------------------------------------- STEM / SPACE PROGRAMS */
  {
    slug: 'astronomy-education/stem-space-programs',
    cluster: 'astronomy-education',
    title: 'STEM & Space Science Programs for Schools in India',
    description:
      'How space science earns its place in a school STEM programme — rocketry, orbital mechanics, ISRO-aligned modules and student projects, tied to what is already on the syllabus.',
    h1: 'STEM and space science programs for schools',
    eyebrow: 'STEM',
    lede:
      'Space science is unusually good STEM material: it is genuinely interdisciplinary, it produces things students can build and measure, and in India it connects to a live national space programme students can actually follow. This is how to use that without it becoming a themed craft activity.',
    keywords: [
      'STEM astronomy activities',
      'space science program for schools',
      'ISRO curriculum school program',
      'space education programs India',
      'model rocketry for schools',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Why space science works as STEM',
        body: [
          'Most STEM enrichment has a credibility problem: the activity is engaging but the science underneath it is thin, and senior students notice. Space science does not have that problem, because the underlying questions are hard and the answers are checkable. A rocket either reaches the height the mathematics predicted or it does not, and the discrepancy is the lesson.',
          'It is also unusually integrative. A single rocketry project touches Newtonian mechanics, energy, aerodynamics, materials, measurement, data handling and iteration. An observation project touches optics, geometry, timekeeping and careful record-keeping. Neither needs to be dressed up as interdisciplinary; it simply is.',
          'And in India there is a live context. Students following a real space agency’s missions are watching orbital mechanics, mission design and engineering trade-offs play out in public, which is a considerably better hook than a hypothetical.',
        ],
      },
      {
        kind: 'points',
        heading: 'What a space-science strand contains',
        points: [
          {
            title: 'Model rocketry',
            detail:
              'Design, build, launch, measure, revise. The measuring and revising are the point — a launch without recorded data is a spectacle, not an experiment.',
          },
          {
            title: 'Orbital mechanics, made physical',
            detail:
              'Why orbits are falls that keep missing, why launch windows exist, and why a satellite’s altitude decides almost everything about what it can do. This attaches directly to the gravitation students are already taught.',
          },
          {
            title: 'Mission and instrument thinking',
            detail:
              'Given a question about a planet, what would you send, what would it carry, and what would you have to give up to afford the mass? This is where students meet engineering trade-offs for the first time.',
          },
          {
            title: 'ISRO-aligned space science modules',
            detail:
              'Space-science content delivered as structured modules across the year, aligned to the ISRO curriculum, so the strand has a defined shape rather than being a set of one-off activities.',
          },
          {
            title: 'Observation as data collection',
            detail:
              'Tracking the Moon’s phase, timing Jupiter’s moons, logging sunspot counts. Real, repeatable measurement that produces a dataset a student can then analyse.',
          },
          {
            title: 'Immersive material for the impossible bits',
            detail:
              'VR journeys through the solar system for the scales, distances and viewpoints no classroom and no telescope can supply.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The difference between an activity and a project',
        body:
          'An activity ends when the bell goes. A project has a question, a method, a dataset and a defended conclusion — and it takes weeks. Schools that only run activities get engagement without evidence of learning, which is exactly the complaint boards eventually raise. The fix is to end each year on student-run projects, presented publicly, with the data attached.',
      },
      {
        kind: 'points',
        heading: 'Where it attaches to the existing syllabus',
        intro:
          'Space science should not need a slot carved out of the curriculum by force. Almost all of it lands on topics already being taught.',
        points: [
          {
            title: 'Physics — gravitation and motion',
            detail:
              'Orbits, escape velocity, projectile motion and Newton’s laws all have observable or buildable counterparts in a space-science strand.',
          },
          {
            title: 'Physics — optics and light',
            detail:
              'Telescope design, focal length, magnification, resolution and the nature of light are best taught with an instrument in the room.',
          },
          {
            title: 'Geography — the Earth in space',
            detail:
              'Seasons, time zones, the sky’s rotation and satellite remote sensing are astronomy topics filed under a different subject heading.',
          },
          {
            title: 'Mathematics — measurement and error',
            detail:
              'Angular measurement, scale, ratios and, most usefully, uncertainty. Astronomy is one of the few school contexts where error bars feel necessary rather than pedantic.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is model rocketry safe to run in a school?',
        answer:
          'Yes, with the standard conditions: an appropriate open launch area, an established safety distance, adult supervision, and motors and materials suited to school use. The safety procedure is part of the learning rather than an obstacle to it.',
      },
      {
        question: 'Does a space-science programme replace physics teaching?',
        answer:
          'No — it attaches to it. Gravitation, optics and motion are already on the syllabus; the programme gives students a way to observe, build and measure those topics rather than only reading about them.',
      },
      {
        question: 'What can students actually produce from a space-science strand?',
        answer:
          'Rocketry flight data and iterations, observation logs, sunspot and lunar-phase datasets, student-captured images of the Moon and planets, and project presentations. These are the outputs that make the programme legible to parents and to a board.',
      },
    ],
    experiences: [ASTROED_EXPERIENCE],
    related: [
      'astronomy-education',
      'astronomy-education/space-lab',
      'astronomy-education/schools',
      'astronomy-education/workshops',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* ----------------------------------------------------------- DELHI (LOC) */
  {
    slug: 'astronomy-education/delhi',
    cluster: 'astronomy-education',
    title: 'Astronomy Programs for Schools in Delhi — What Works Under a City Sky',
    description:
      'Running a school astronomy programme in Delhi: what is genuinely observable from a campus under a Bortle 8–9 sky, which months are usable, and how Delhi schools structure the year.',
    h1: 'Astronomy programs for schools in Delhi',
    eyebrow: 'Delhi',
    lede:
      'Delhi is a difficult sky and an easy city to run astronomy in. The difficulty is real — it is one of the brightest urban skies in the country — but almost everything a school programme needs is bright enough not to care, and the calendar constraints are predictable enough to plan around.',
    keywords: [
      'astronomy program for schools in Delhi',
      'astronomy workshop Delhi schools',
      'space lab school Delhi',
      'telescope program Delhi school',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The sky a Delhi campus actually has',
        body: [
          'Delhi sits at roughly Bortle 8–9 — an inner-city sky where the naked eye picks out a few dozen stars on a good night and the Milky Way is entirely absent. There is no equipment solution to this and no school that should be promised otherwise.',
          'What that sky does not affect much is brightness-dominated targets. The Sun, the Moon, Saturn, Jupiter, Venus, Mars, the brighter double stars and the brightest open clusters all punch through Delhi’s light dome, because they are orders of magnitude brighter than the glow competing with them. That is a full curriculum’s worth of observation available from a school terrace in Vasant Kunj or Rohini.',
          'The practical consequence is that a Delhi school should build its programme around the Sun, the Moon and the planets, treat bright clusters as a bonus, and plan the faint sky as an off-campus trip rather than an on-campus promise.',
        ],
      },
      {
        kind: 'table',
        heading: 'The Delhi observing year',
        intro:
          'Delhi’s constraint is not really light pollution — it is transparency, and it varies enormously across the year in a way that is entirely predictable.',
        columns: ['Period', 'Conditions', 'What to schedule'],
        rows: [
          [
            'Late February – April',
            'The best stretch of the year: clearer air after winter, comfortable evening temperatures, stable skies',
            'The main evening observation sessions and any student imaging work',
          ],
          [
            'May – June',
            'Very clear but punishingly hot, with dust and haze on some evenings',
            'Solar sessions in the morning; evening work only where the schedule allows a late start',
          ],
          [
            'July – September',
            'Monsoon. Extended cloud, high humidity, frequent washouts',
            'Indoor work: optics, rocketry, space-science modules, immersive material',
          ],
          [
            'October – early November',
            'A genuinely good window before winter haze sets in',
            'Evening sessions, the flagship annual event, parent-facing showings',
          ],
          [
            'Mid-November – January',
            'Severe haze and smog for long stretches; often unusable even when officially cloudless',
            'Daytime solar work on clear days, and the theory-heavy parts of the curriculum',
          ],
        ],
        note:
          'Weather is weather — this is a planning guide, not a forecast. The point is to place the sessions that need a sky in the windows most likely to provide one.',
      },
      {
        kind: 'points',
        heading: 'What Delhi schools should do differently',
        points: [
          {
            title: 'Lead with solar',
            detail:
              'A safely filtered solar programme is the single highest-yield decision a Delhi school can make. It runs inside the timetable, works on most clear days, needs no evening permissions, and Delhi’s haze affects it far less than it affects faint night targets.',
          },
          {
            title: 'Fight your own lighting first',
            detail:
              'On a campus this matters more than the city glow. A single unshielded security light on the terrace will do more damage to a session than the whole of Connaught Place. Being able to switch off nearby lights for ninety minutes is worth more than a larger telescope.',
          },
          {
            title: 'Put the flagship event in October',
            detail:
              'The pre-winter window is the most reliable evening stretch in the Delhi calendar. Schools that schedule their showcase night in December frequently spend it indoors.',
          },
          {
            title: 'Plan one dark-sky night a year',
            detail:
              'A single night away from the NCR light dome shows students the sky the city has been hiding. Done after they can already navigate the bright sky, it lands as a revelation rather than a novelty.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Why light pollution is a teaching asset in Delhi',
        body:
          'A Delhi student who has seen five stars from a school terrace and then hundreds from two hours away has learned something no diagram delivers — that the sky did not change, the ground did. Light pollution, taught directly, turns the city’s worst observing feature into one of the most concrete environmental lessons available to an Indian school.',
      },
    ],
    faqs: [
      {
        question: 'Can a school in Delhi run a real astronomy programme?',
        answer:
          'Yes. The Sun, Moon and bright planets are unaffected by Delhi’s light pollution and carry most of a school curriculum. What Delhi cannot provide from a campus is faint deep-sky observation, which is best handled as a planned dark-sky trip.',
      },
      {
        question: 'When is the best time of year for school observation sessions in Delhi?',
        answer:
          'Late February to April, and October to early November. The monsoon months are largely unusable for evening work, and mid-November to January is frequently lost to haze even on cloudless nights.',
      },
      {
        question: 'Where can Delhi schools go for a dark-sky night?',
        answer:
          'The nearest genuinely darker skies are a few hours out of the NCR — the Aravalli country around Alwar and Tijara, or further west into Rajasthan. These are honest rural Bortle 4 skies rather than remote wilderness, which is still a dramatic change from Delhi’s Bortle 8–9.',
      },
    ],
    experiences: [
      ASTROED_EXPERIENCE,
      {
        label: 'Weekend escape',
        title: 'Tijara — a dark-sky night within reach of Delhi',
        detail:
          'An honest rural Bortle 4 sky in the Aravalli country of Alwar, roughly two to three hours from the NCR. The nearest practical option for a school or college group that wants students to see the sky the city removes.',
        href: '/astroventure-nights/tijara',
      },
    ],
    related: [
      'astronomy-education',
      'astronomy-education/gurgaon',
      'stargazing/delhi',
      'astrophotography/light-pollution',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------- GURGAON (LOC) */
  {
    slug: 'astronomy-education/gurgaon',
    cluster: 'astronomy-education',
    title: 'Astronomy Programs for Schools in Gurgaon — On Campus and Beyond It',
    description:
      'Astronomy for Gurgaon schools: what works on a campus in the NCR light dome, and how proximity to darker Aravalli skies makes an off-campus night genuinely practical here.',
    h1: 'Astronomy programs for schools in Gurgaon',
    eyebrow: 'Gurgaon',
    lede:
      'Gurgaon shares Delhi’s sky and Delhi’s calendar, but it has one advantage that changes what a school programme can include: the edge of the city runs out into Aravalli country, and darker sky is closer here than it is from almost anywhere else in the NCR.',
    keywords: [
      'astronomy program for schools in Gurgaon',
      'school astronomy Gurgaon',
      'astronomy workshop Gurgaon school',
      'stargazing school trip Gurgaon',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The same city sky, a shorter drive out of it',
        body: [
          'On campus, Gurgaon is Delhi: a Bortle 8–9 sky, the same monsoon and winter-haze constraints, and the same short list of targets that survive it — the Sun with proper filtration, the Moon, the bright planets, double stars and the brightest clusters. Everything in the Delhi guide applies unchanged.',
          'What differs is the second half of the programme. Gurgaon sits on the southern edge of the NCR light dome, with the Aravallis and the Sohna road heading away from the brightest part of it. For a school here, an evening that ends somewhere measurably darker is a logistics problem rather than an expedition — which makes the off-campus night a realistic annual fixture rather than an aspiration.',
        ],
      },
      {
        kind: 'points',
        heading: 'How a Gurgaon school can structure the year',
        points: [
          {
            title: 'On-campus daytime: solar',
            detail:
              'Safely filtered solar observation, run inside the timetable. Repeatable, unaffected by evening permissions, and the most reliable observing a Gurgaon campus offers.',
          },
          {
            title: 'On-campus evenings: Moon and planets',
            detail:
              'Scheduled around the lunar cycle, targeting the objects bright enough to ignore the city. Best placed in the late-February-to-April and October windows.',
          },
          {
            title: 'Indoor strand: build and model',
            detail:
              'Rocketry, physics activities, space-science modules and immersive material — the part of the programme that keeps running through the monsoon.',
          },
          {
            title: 'One night out of the dome',
            detail:
              'An off-campus dark-sky night, once students can already navigate the bright sky. This is the session they remember, and Gurgaon’s geography is what makes it affordable.',
          },
          {
            title: 'Ending in projects',
            detail:
              'Observation logs, rocketry data and student-captured images, presented publicly at the end of the year. The output that makes the programme defensible to a board.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Be accurate about how dark "darker" is',
        body:
          'Nothing within a short drive of Gurgaon is a pristine sky, and it is worth telling students and parents so. The Aravalli country around Alwar and Tijara is an honest rural Bortle 4 — not a desert, not a Himalayan sky — but against Gurgaon’s Bortle 8–9 that is a dramatic step, and on a clear moonless winter night the Milky Way comes back. Promising more than that is how a good trip becomes a disappointing one.',
      },
    ],
    faqs: [
      {
        question: 'Is the sky in Gurgaon better than in Delhi for school astronomy?',
        answer:
          'On campus, not meaningfully — Gurgaon sits inside the same NCR light dome at roughly Bortle 8–9. The practical difference is proximity: darker Aravalli skies are a shorter journey from Gurgaon, which makes an annual off-campus night far easier to organise.',
      },
      {
        question: 'How far do Gurgaon schools have to travel for a genuinely darker sky?',
        answer:
          'A few hours, heading towards the Aravalli country around Alwar and Tijara. That gets you to an honest rural Bortle 4 sky — a large improvement on the city, though not a remote-wilderness sky.',
      },
      {
        question: 'Can a Gurgaon school run astronomy without an off-campus trip?',
        answer:
          'Yes. Solar observation, the Moon, the planets, double stars and bright clusters are all available on campus and support a full year of curriculum. The dark-sky night adds the faint sky, but it is an enhancement rather than a prerequisite.',
      },
    ],
    experiences: [
      ASTROED_EXPERIENCE,
      {
        label: 'Nakshatraalay',
        title: 'Nakshatraalay Gurgaon — telescope nights near Delhi NCR',
        detail:
          'An astronomy destination on the NCR’s doorstep, built around real telescopes and guided observation — close enough for a school evening that does not need an overnight.',
        href: '/nakshatraalay/gurgaon',
      },
      {
        label: 'School visits',
        title: 'School astronomy visits at Nakshatraalay',
        detail:
          'Telescope sessions, night-sky education and hands-on space science shaped around a class group, its timings and its size.',
        href: '/schools',
      },
    ],
    related: [
      'astronomy-education',
      'astronomy-education/delhi',
      'stargazing/near-delhi',
      'astronomy-stays/near-delhi',
    ],
    cta: ASTROED_CTA,
    updated: UPDATED,
  },
]
