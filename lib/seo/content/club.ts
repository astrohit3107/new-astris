/**
 * ============================================================================
 *  CLUSTER 7 — ASTRONOMY CLUB FOR SCHOOLS  →  funnels into /astronomy-club
 * ============================================================================
 *  The searches this cluster answers: "astronomy club for schools", "how to
 *  start an astronomy club in school", "astronomy club activities", and the
 *  same intent with a city attached ("astronomy club for schools in
 *  Bangalore"). The people searching are principals, activity coordinators,
 *  science HODs and parents.
 *
 *  Programme facts come from lib/astronomy-club-data.ts (the same source the
 *  /astronomy-club page renders). City facts are limited to well-established
 *  public ones: the city's planetarium and science institutions, its school
 *  boards, its monsoon pattern, and how bright its sky is. Nothing here claims
 *  an Astris office, a partner school or a result in any city.
 *
 *  AVAILABILITY, STATED HONESTLY: Astris is based in Delhi NCR. City pages
 *  outside the NCR invite a request and say that scheduling for that city is
 *  confirmed in the reply. That is true, and it is what lets a lead land.
 *
 *  No prices: fees are in the proposal and given in a quote, not published.
 * ========================================================================== */

import type { ExperienceLink, Guide, SeoCta, SeoFaq, SeoSection } from '@/lib/seo/types'

const UPDATED = '2026-10-26'
const HUB = 'astronomy-club-for-schools'

const CLUB_EXPERIENCE: ExperienceLink = {
  label: 'Astronomy Club',
  title: 'Astris Astronomy Club — a weekly club at zero cost to the school',
  detail:
    '32 weekly sessions a year for Grades 4–12, linked to NCERT chapters, with real telescopes, safe solar observing, take-home builds and three family sky-watches. The school gives a room and a slot; parents enrol directly with Astris.',
  href: '/astronomy-club',
}

const ASTROED_EXPERIENCE: ExperienceLink = {
  label: 'AstroEd',
  title: 'AstroEd — a permanent Space Lab and curriculum',
  detail:
    'For schools ready to go further: a dedicated astronomy space on campus with a structured curriculum across Grades 4–12.',
  href: '/astroed',
}

function clubCta(place?: string): SeoCta {
  return {
    heading: place ? `Start an astronomy club at your ${place} school` : 'Start an astronomy club at your school',
    body: 'Book a free 20-minute assembly demo, or ask for a quote and the full proposal. We call back within 24 hours to fix a demo date.',
    primary: { label: 'Book a free demo', href: '/astronomy-club#book-demo' },
    secondary: {
      label: 'Request a quote',
      href: '/astronomy-club#request-quote',
    },
  }
}

/** The four facts every school asks first, phrased once and reused. */
const MODEL_POINTS = [
  {
    title: 'No cost to the school',
    detail:
      'The school gives a room and one weekly slot. Astris brings the educators, telescopes, kits, enrolment and reports. Families enrol and pay Astris directly, the way schools already host robotics or debating clubs.',
  },
  {
    title: 'Linked to the syllabus students already have',
    detail:
      'Every weekly theme is taught through the chapters each band is studying in class: EVS and early Science for Grades 4–6, Science and Geography for 7–9, board Physics and Maths for 10–12. It is never an extra subject.',
  },
  {
    title: 'Real observing, safely',
    detail:
      'Seven telescope sessions a year: four daytime solar observations through certified filters or projection, and three evening sky-watches with families, with staff present and written parent consent.',
  },
  {
    title: 'Measured, not just enjoyed',
    detail:
      'An April baseline and a February endline on NCERT-tagged questions, a logbook stamped by the educator, weekly parent notes, progress cards in October and February, and an annual report to the principal.',
  },
]

/* ------------------------------------------------------------------ cities */

interface City {
  slug: string
  name: string
  /** How the city is written in the H1 and title, e.g. "Bengaluru (Bangalore)". */
  display: string
  /** Extra spellings people search with. */
  alt: string[]
  region: string
  /** Inside Delhi NCR: Astris runs here today. */
  ncr: boolean
  boards: string
  lede: string
  sky: string[]
  seasons: { window: string; suits: string }[]
  local: { title: string; detail: string }[]
  faqs: SeoFaq[]
  related: string[]
}

const NCR_AVAILABILITY =
  'Astris is based in Delhi NCR and runs the club on school campuses across the region. Book a free assembly demo and we will come to your school.'

const availabilityFor = (c: City) =>
  c.ncr
    ? NCR_AVAILABILITY
    : `Astris is based in Delhi NCR. Schools in ${c.name} can request the club today: tell us your school, grades and preferred start, and we will confirm educator scheduling for ${c.name} when we reply, along with a quote and the full proposal.`

const CITIES: City[] = [
  {
    slug: 'delhi',
    name: 'Delhi',
    display: 'Delhi',
    alt: ['New Delhi', 'Delhi NCR'],
    region: 'Delhi NCR',
    ncr: true,
    boards: 'CBSE above all, with ICSE and a growing number of IB schools',
    lede:
      'Delhi is where the Astris Astronomy Club was designed, around a Delhi school year: CBSE chapters, half-yearly exams in September, Diwali and winter breaks, and a sky that is bright, hazy in winter and clouded in the monsoon. The club is built to work inside all of that.',
    sky: [
      'A Delhi campus sits under one of the brightest skies in India, roughly Bortle 8–9. That rules out faint galaxies from the school roof, but it leaves plenty: the Sun through proper filters, the Moon’s craters and mountains, Jupiter’s moons, Saturn’s rings, bright double stars and clusters. A club built for Delhi leans on exactly those.',
      'The weather matters more than the light. The monsoon closes the evening sky from July to September, and winter smog and fog can erase it for weeks in December and January. That is why the club’s observing is weighted to daytime solar sessions, which run inside school hours in almost any month, and why its evening sky-watches sit in the clearest windows.',
    ],
    seasons: [
      { window: 'October – November', suits: 'Post-monsoon clarity before the smog: the first evening sky-watch' },
      { window: 'December – January', suits: 'Winter Moon on clear nights; daytime solar sessions carry the observing' },
      { window: 'February – April', suits: 'Clear, comfortable evenings: planets, constellations and the showcase' },
      { window: 'July – September', suits: 'Monsoon: indoor builds, concept sessions and National Space Day on 23 August' },
    ],
    local: [
      {
        title: 'Nehru Planetarium, Teen Murti',
        detail:
          'Delhi’s planetarium is a natural extension of the club: a show there pairs well with the Year A sessions on the Moon and the Sun.',
      },
      {
        title: 'A short drive to darker sky',
        detail:
          'The NCR has darker Aravalli sky within reach on its southern edge, which is what makes the club’s family sky-watches and an optional dark-sky night practical. See the Gurgaon page for that side of the region.',
      },
    ],
    faqs: [
      {
        question: 'Does Astris run astronomy clubs in Delhi schools?',
        answer:
          'Yes. Astris is based in Delhi NCR and runs the club on the school’s own campus. A school can book a free 20-minute assembly demo to see it before deciding.',
      },
      {
        question: 'Can astronomy work in Delhi’s polluted sky?',
        answer:
          'Yes, if the programme is designed for it. The Sun (with certified filters), the Moon, the bright planets and bright double stars and clusters all show well from a Delhi campus. The club weights its observing towards daytime solar sessions and puts its evening sky-watches in the clearest months.',
      },
    ],
    related: ['astronomy-education/delhi', 'stargazing/delhi', 'stargazing/near-delhi'],
  },
  {
    slug: 'gurgaon',
    name: 'Gurgaon',
    display: 'Gurgaon (Gurugram)',
    alt: ['Gurugram'],
    region: 'Delhi NCR',
    ncr: true,
    boards: 'CBSE, ICSE, IB and Cambridge, side by side, often within a few kilometres',
    lede:
      'Gurgaon’s schools span CBSE, ICSE, IB and Cambridge, often within a few kilometres of each other. The club handles all of them: one weekly theme, taught through NCERT chapters or the IB PYP, MYP and DP frameworks, depending on the school.',
    sky: [
      'On campus, Gurgaon shares Delhi’s bright Bortle 8–9 sky and its monsoon and winter haze. The difference is what lies just beyond the city: the Aravalli country to the south is noticeably darker and close enough that an evening sky-watch away from the city lights is a short trip rather than an expedition.',
      'Astris runs Nakshatraalay, its own astronomy destination, in Gurgaon. That puts a ready-made observing site, with telescopes and educators, within reach of every Gurgaon school.',
    ],
    seasons: [
      { window: 'October – November', suits: 'First sky-watch, the Moon and the bright planets' },
      { window: 'December – January', suits: 'Clear winter nights between hazy spells; solar sessions by day' },
      { window: 'February – April', suits: 'Best evenings of the year, and the showcase' },
      { window: 'July – September', suits: 'Indoor builds and concept sessions through the monsoon' },
    ],
    local: [
      {
        title: 'Nakshatraalay Gurgaon',
        detail:
          'Astris’s own telescope destination in Gurgaon, used for school visits and evening observing.',
      },
      {
        title: 'IB-ready mapping',
        detail:
          'Explorers map to PYP units of inquiry, Navigators to all four MYP Sciences criteria, and Astronomers to DP Physics topics, with observations that can grow into an Internal Assessment or an Extended Essay.',
      },
    ],
    faqs: [
      {
        question: 'Does the astronomy club work for IB schools in Gurgaon?',
        answer:
          'Yes. There is an IB mapping for PYP, MYP and DP alongside the CBSE / NCERT mapping, so the same weekly theme is taught through the framework the school uses.',
      },
      {
        question: 'Is there somewhere near Gurgaon for a darker sky-watch?',
        answer:
          'Yes. The Aravalli country south of the city is noticeably darker than Gurgaon itself, and Astris runs Nakshatraalay in Gurgaon as an observing destination for schools.',
      },
    ],
    related: ['astronomy-education/gurgaon', 'stargazing/near-delhi', 'astronomy-stays/near-delhi'],
  },
  {
    slug: 'noida',
    name: 'Noida',
    display: 'Noida and Greater Noida',
    alt: ['Greater Noida', 'Ghaziabad'],
    region: 'Delhi NCR',
    ncr: true,
    boards: 'mostly CBSE, with ICSE and a few IB schools',
    lede:
      'Noida and Greater Noida have a large and growing number of schools, most of them CBSE. For those schools the club’s NCERT mapping is a direct fit: every weekly theme lands on a chapter the students are already studying.',
    sky: [
      'Noida sits inside the same NCR light dome as Delhi, so the campus sky is bright and the same rules apply: daytime solar observing through certified filters, the Moon, the planets, and bright doubles and clusters in the evening.',
      'Large campuses with open grounds and rooftops are an advantage here. A clear horizon to the west matters for evening planets, and many Noida schools have one.',
    ],
    seasons: [
      { window: 'October – November', suits: 'Post-monsoon evenings: the first family sky-watch' },
      { window: 'December – January', suits: 'Fog and haze come and go; solar sessions carry the observing' },
      { window: 'February – April', suits: 'Clear evenings and the end-of-year showcase' },
      { window: 'July – September', suits: 'Indoor builds and concept sessions' },
    ],
    local: [
      {
        title: 'Within reach of Delhi’s planetarium',
        detail:
          'The Nehru Planetarium in central Delhi is a practical class outing from Noida and pairs well with the club’s Moon and Sun sessions.',
      },
      {
        title: 'Ghaziabad too',
        detail: 'Schools in Ghaziabad and Indirapuram are covered on the same terms as Noida.',
      },
    ],
    faqs: [
      {
        question: 'Do you run the astronomy club in Noida and Greater Noida schools?',
        answer:
          'Yes. Noida, Greater Noida and Ghaziabad are part of Delhi NCR, where Astris runs the club on school campuses. Book a free assembly demo to start.',
      },
      {
        question: 'Our school follows CBSE. How does the club link to it?',
        answer:
          'Each of the ten club themes is mapped to NCERT chapters for each band. For example, the Moon and eclipses theme meets EVS and Science chapters for Grades 4–6, light and shadows for 7–9, and Physics XI Gravitation for 10–12.',
      },
    ],
    related: ['astronomy-education/delhi', 'stargazing/delhi'],
  },
  {
    slug: 'bangalore',
    name: 'Bengaluru',
    display: 'Bengaluru (Bangalore)',
    alt: ['Bangalore'],
    region: 'Karnataka',
    ncr: false,
    boards: 'CBSE, ICSE, IB and the Karnataka State Board',
    lede:
      'Bengaluru is India’s space city: ISRO is headquartered here, and so is the Indian Institute of Astrophysics. Students grow up near the people who build India’s satellites, which makes a weekly astronomy club an easy argument to win with parents.',
    sky: [
      'A central Bengaluru campus sees a bright city sky, but the Moon, the planets and bright stars show well, and the club’s daytime solar sessions work in any season with certified filters or projection.',
      'Bengaluru gets two rainy seasons, the south-west monsoon from June to September and the north-east monsoon around October and November, so the club’s evening sky-watches belong in the clear, dry months from December to April.',
    ],
    seasons: [
      { window: 'December – February', suits: 'Clearest, coolest evenings: the main sky-watches' },
      { window: 'March – April', suits: 'Still clear; planets and the showcase' },
      { window: 'June – November', suits: 'Two monsoons: indoor builds, solar sessions between clouds' },
    ],
    local: [
      {
        title: 'Jawaharlal Nehru Planetarium',
        detail:
          'Run by the Bangalore Association for Science Education, and a good pairing for the club’s Year A and Year C sessions.',
      },
      {
        title: 'A strong amateur community',
        detail:
          'The Bangalore Astronomical Society runs public sky-watches and telescope-making workshops, a natural next step for the club’s most committed members.',
      },
      {
        title: 'Next door to India’s space programme',
        detail:
          'With ISRO’s headquarters and the Indian Institute of Astrophysics in the city, the club’s scientist interactions and missions sessions have a local hook.',
      },
    ],
    faqs: [
      {
        question: 'Can a Bengaluru school start the Astris Astronomy Club?',
        answer:
          'Yes, you can request it now. Astris is based in Delhi NCR, so for Bengaluru we confirm educator scheduling when we reply, along with a quote and the full proposal.',
      },
      {
        question: 'When is the sky clearest in Bengaluru for school sky-watches?',
        answer:
          'From December to April. Bengaluru has two rainy seasons, June to September and around October to November, so evening observing is planned for the dry months and daytime solar sessions fill the rest of the year.',
      },
    ],
    related: [],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    display: 'Hyderabad',
    alt: ['Secunderabad', 'Cyberabad'],
    region: 'Telangana',
    ncr: false,
    boards: 'CBSE, ICSE, IB and the Telangana State Board',
    lede:
      'Hyderabad parents look for STEM programmes that show visible results. The club gives them that: a stamped logbook, a progress card twice a year, three family sky-watches and an end-of-year showcase.',
    sky: [
      'A Hyderabad campus sits under a bright, fast-growing city sky. The Moon, the bright planets and the brightest stars and clusters show well, and daytime solar sessions through certified filters work in most of the year.',
      'The south-west monsoon clouds the evenings from June to September. The dry winter months from November to February are the city’s best for evening observing.',
    ],
    seasons: [
      { window: 'November – February', suits: 'Clear, dry evenings: the main sky-watches' },
      { window: 'March – May', suits: 'Hot days; early-evening planets and the showcase' },
      { window: 'June – October', suits: 'Monsoon: indoor builds and concept sessions' },
    ],
    local: [
      {
        title: 'B.M. Birla Planetarium and Science Museum',
        detail: 'A classic Hyderabad school outing that pairs well with the club’s concept sessions.',
      },
      {
        title: 'Room to grow',
        detail:
          'Members who reach the higher levels can move on to research and olympiad tracks, including asteroid-search campaigns and preparation for the National Standard Examination in Astronomy.',
      },
    ],
    faqs: [
      {
        question: 'Can a Hyderabad school request the Astris Astronomy Club?',
        answer:
          'Yes. Astris is based in Delhi NCR; for Hyderabad we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'Does the club work for Telangana State Board schools?',
        answer:
          'The club’s ready-made mapping is for CBSE / NCERT and IB, and ICSE mapping is available on request. For state-board schools the themes are matched to the school’s own textbooks at onboarding.',
      },
    ],
    related: [],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    display: 'Mumbai',
    alt: ['Navi Mumbai', 'Thane'],
    region: 'Maharashtra',
    ncr: false,
    boards: 'CBSE, ICSE, IB, IGCSE and the Maharashtra State Board',
    lede:
      'Mumbai schools run on tight timetables and tighter campuses. The club needs one room and one weekly slot, and everything else, from telescopes to enrolment, is handled by Astris.',
    sky: [
      'A Mumbai campus has one of India’s brightest skies, often from a rooftop between towers. The Moon, the bright planets and the Sun through certified filters are the reliable targets, and they are enough for a full year of sessions.',
      'The monsoon is heavy from June to September and closes the evening sky almost completely, so the club’s builds and concept sessions take those months and the sky-watches move to the dry season from November to March.',
    ],
    seasons: [
      { window: 'November – March', suits: 'Dry season: the main evening sky-watches' },
      { window: 'April – May', suits: 'Hazy but workable: planets and the showcase' },
      { window: 'June – September', suits: 'Heavy monsoon: builds, film sessions and concept work' },
    ],
    local: [
      {
        title: 'Nehru Planetarium, Worli',
        detail: 'Mumbai’s planetarium, a good pairing for the club’s sessions on the Sun, the Moon and the planets.',
      },
      {
        title: 'Khagol Mandal',
        detail:
          'One of India’s best-known amateur astronomy groups, founded in Mumbai in 1985, and a next step for committed members.',
      },
    ],
    faqs: [
      {
        question: 'Can a Mumbai school start the Astris Astronomy Club?',
        answer:
          'Yes, you can request it. Astris is based in Delhi NCR; for Mumbai we confirm educator scheduling when we reply, with a quote and the full proposal.',
      },
      {
        question: 'Is a Mumbai rooftop enough for school astronomy?',
        answer:
          'For the targets the club relies on, yes: the Sun through certified filters by day, and the Moon and bright planets in the evening. A clear view to the west or south-west helps most.',
      },
    ],
    related: [],
  },
  {
    slug: 'pune',
    name: 'Pune',
    display: 'Pune',
    alt: ['Pimpri-Chinchwad'],
    region: 'Maharashtra',
    ncr: false,
    boards: 'CBSE, ICSE, IB and the Maharashtra State Board',
    lede:
      'Pune has one of India’s deepest astronomy traditions: IUCAA on the university campus, the GMRT radio telescope north of the city, and amateur societies older than Independence. A school club here plugs into all of it.',
    sky: [
      'Pune’s campus sky is bright but less overwhelming than Mumbai’s, and the hills around the city are within reach for a darker family sky-watch.',
      'The monsoon runs from June to September. From November to March the evenings are clear and cool, the best stretch of the year for observing.',
    ],
    seasons: [
      { window: 'November – March', suits: 'Clear, cool evenings: the main sky-watches' },
      { window: 'April – May', suits: 'Warm evenings; planets and the showcase' },
      { window: 'June – October', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'IUCAA',
        detail:
          'The Inter-University Centre for Astronomy and Astrophysics, on the Savitribai Phule Pune University campus, runs public outreach for students.',
      },
      {
        title: 'GMRT',
        detail:
          'The Giant Metrewave Radio Telescope near Narayangaon is one of the world’s largest radio telescope arrays, a memorable link for the club’s Year C sessions on light and the Universe.',
      },
      {
        title: 'A long amateur tradition',
        detail:
          'Jyotirvidya Parisanstha, founded in 1944, is among India’s oldest amateur astronomy associations.',
      },
    ],
    faqs: [
      {
        question: 'Can a Pune school request the Astris Astronomy Club?',
        answer:
          'Yes. Astris is based in Delhi NCR; for Pune we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'What makes Pune a good city for a school astronomy club?',
        answer:
          'Its institutions and community: IUCAA, the GMRT radio telescope and long-running amateur societies give members somewhere to go next, and the dry November-to-March season gives clear evenings for sky-watches.',
      },
    ],
    related: [],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    display: 'Chennai',
    alt: ['Madras'],
    region: 'Tamil Nadu',
    ncr: false,
    boards: 'CBSE, ICSE, IB and the Tamil Nadu State Board',
    lede:
      'Chennai is the nearest big city to Sriharikota, where India’s rockets lift off. For a school club, that is the best possible hook for the Year B sessions on rockets and India’s launch vehicles.',
    sky: [
      'Chennai’s weather runs on a different calendar from north India. The north-east monsoon brings most of the rain from October to December, so the club’s evening sky-watches belong in January to April.',
      'The campus sky is bright, but the Sun through certified filters, the Moon and the bright planets all show well, and coastal campuses often have an open horizon.',
    ],
    seasons: [
      { window: 'January – April', suits: 'Dry and clear: the main evening sky-watches' },
      { window: 'May – September', suits: 'Hot, partly cloudy: solar sessions and early-evening planets' },
      { window: 'October – December', suits: 'North-east monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'B.M. Birla Planetarium',
        detail: 'At the Periyar Science and Technology Centre in Kotturpuram, a natural school outing alongside the club.',
      },
      {
        title: 'Sriharikota',
        detail:
          'The Satish Dhawan Space Centre lies north of the city on the coast; its launches give the club’s rockets and spaceflight sessions a local story.',
      },
    ],
    faqs: [
      {
        question: 'Can a Chennai school start the Astris Astronomy Club?',
        answer:
          'Yes, you can request it. Astris is based in Delhi NCR; for Chennai we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'When should a Chennai school plan evening sky-watches?',
        answer:
          'January to April. The north-east monsoon brings most of Chennai’s rain from October to December, so those months are better used for builds and concept sessions.',
      },
    ],
    related: [],
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    display: 'Kolkata',
    alt: ['Calcutta', 'Salt Lake', 'New Town'],
    region: 'West Bengal',
    ncr: false,
    boards: 'ICSE and ISC in strength, CBSE, and the West Bengal Board',
    lede:
      'Kolkata has a strong ICSE tradition and a city that takes science seriously. The club’s ICSE mapping is available on request, and its themes run through the same weekly structure for every board.',
    sky: [
      'The campus sky is bright and humid. The Moon, the bright planets and daytime solar observing through certified filters are the reliable targets.',
      'The monsoon runs from June to September. The cool, dry months from November to February give Kolkata its clearest evenings.',
    ],
    seasons: [
      { window: 'November – February', suits: 'Clear, cool evenings: the main sky-watches' },
      { window: 'March – May', suits: 'Hot and hazy; solar sessions and early-evening planets' },
      { window: 'June – October', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'M.P. Birla Planetarium',
        detail: 'One of the largest planetariums in Asia, on Chowringhee Road, and a natural school outing.',
      },
      {
        title: 'Science City',
        detail: 'Kolkata’s Science City gives the club’s concept sessions a hands-on follow-up.',
      },
    ],
    faqs: [
      {
        question: 'Can a Kolkata school request the Astris Astronomy Club?',
        answer:
          'Yes. Astris is based in Delhi NCR; for Kolkata we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'Does the club work for ICSE schools?',
        answer:
          'Yes. ICSE mapping is available on request, so each weekly theme is matched to the chapters an ICSE school is teaching.',
      },
    ],
    related: [],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    display: 'Ahmedabad',
    alt: ['Gandhinagar'],
    region: 'Gujarat',
    ncr: false,
    boards: 'CBSE, IB and the Gujarat State Board',
    lede:
      'Ahmedabad is where India’s space programme began: Vikram Sarabhai founded the Physical Research Laboratory here, and ISRO’s Space Applications Centre is in the city. That history is a gift to a school astronomy club.',
    sky: [
      'Gujarat’s long dry season is an advantage. Outside the monsoon from late June to September, Ahmedabad has many clear evenings, and the Moon, the planets and bright stars show well even from a city campus.',
      'Daytime solar observing through certified filters works for most of the year, though the hottest months call for early-morning slots.',
    ],
    seasons: [
      { window: 'October – February', suits: 'Clear, comfortable evenings: the main sky-watches' },
      { window: 'March – June', suits: 'Clear but hot: early-evening planets, morning solar sessions' },
      { window: 'July – September', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'Physical Research Laboratory',
        detail: 'Founded by Vikram Sarabhai, the father of India’s space programme.',
      },
      {
        title: 'Gujarat Science City',
        detail: 'A large science centre that pairs well with the club’s concept sessions.',
      },
    ],
    faqs: [
      {
        question: 'Can an Ahmedabad school start the Astris Astronomy Club?',
        answer:
          'Yes, you can request it. Astris is based in Delhi NCR; for Ahmedabad we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'Is Ahmedabad a good city for school astronomy?',
        answer:
          'Yes. Its long dry season gives many clear evenings outside the July-to-September monsoon, and its space-science history, from PRL to ISRO’s Space Applications Centre, gives students a local connection.',
      },
    ],
    related: [],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    display: 'Jaipur',
    alt: [],
    region: 'Rajasthan',
    ncr: false,
    boards: 'CBSE and the Rajasthan Board',
    lede:
      'Jaipur has Jantar Mantar, the 18th-century observatory that is a UNESCO World Heritage Site. Few cities let a school club stand inside the history of astronomy on a class trip.',
    sky: [
      'Rajasthan’s dry climate gives Jaipur more clear evenings than most Indian cities. Outside the July-to-September monsoon, the Moon, the planets and the bright constellations are reliable from a city campus.',
      'The desert beyond the city is darker still, which makes an optional dark-sky night a realistic addition to the club year.',
    ],
    seasons: [
      { window: 'October – March', suits: 'Clear, cool evenings: the main sky-watches' },
      { window: 'April – June', suits: 'Clear but hot: early-evening planets, morning solar sessions' },
      { window: 'July – September', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'Jantar Mantar',
        detail:
          'A UNESCO World Heritage Site of naked-eye instruments, a perfect field trip for the club’s Year A sessions on the Sun, shadows and calendars.',
      },
      {
        title: 'B.M. Birla Planetarium, Jaipur',
        detail: 'A planetarium in the city for a second outing.',
      },
    ],
    faqs: [
      {
        question: 'Can a Jaipur school request the Astris Astronomy Club?',
        answer:
          'Yes. Astris is based in Delhi NCR; for Jaipur we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'How does Jantar Mantar fit an astronomy club?',
        answer:
          'Its instruments measure time and the Sun’s position by shadow, which is exactly what the club’s sundial build and its sessions on day, night, seasons and calendars teach.',
      },
    ],
    related: [],
  },
  {
    slug: 'lucknow',
    name: 'Lucknow',
    display: 'Lucknow',
    alt: [],
    region: 'Uttar Pradesh',
    ncr: false,
    boards: 'CBSE, ICSE and the UP Board',
    lede:
      'Lucknow schools span CBSE, ICSE and the UP Board, and the club works across all three: one weekly theme, matched to the chapters each school teaches.',
    sky: [
      'Lucknow shares north India’s calendar: a monsoon from July to September and winter fog that can close the sky in December and January. The clearest evenings come in October–November and February–April.',
      'From a city campus the Moon, the bright planets and the Sun through certified filters are the reliable targets, and they are enough for a full club year.',
    ],
    seasons: [
      { window: 'October – November', suits: 'Clear post-monsoon evenings: the first sky-watch' },
      { window: 'December – January', suits: 'Fog comes and goes; solar sessions by day' },
      { window: 'February – April', suits: 'Clear evenings, planets and the showcase' },
      { window: 'July – September', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'Indira Gandhi Planetarium',
        detail: 'Lucknow’s Saturn-shaped planetarium, a natural school outing alongside the club.',
      },
    ],
    faqs: [
      {
        question: 'Can a Lucknow school start the Astris Astronomy Club?',
        answer:
          'Yes, you can request it. Astris is based in Delhi NCR; for Lucknow we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'Does the club work for UP Board schools?',
        answer:
          'Yes. The ready-made mapping is CBSE / NCERT and IB, with ICSE on request; for state-board schools the themes are matched to the school’s own textbooks at onboarding.',
      },
    ],
    related: [],
  },
  {
    slug: 'chandigarh',
    name: 'Chandigarh',
    display: 'Chandigarh, Mohali and Panchkula',
    alt: ['Mohali', 'Panchkula', 'Tricity'],
    region: 'Punjab and Haryana',
    ncr: false,
    boards: 'CBSE, ICSE and the Punjab and Haryana boards',
    lede:
      'The Tricity has some of north India’s most sought-after schools, and the Shivalik foothills on its doorstep give it darker skies closer to home than most cities its size.',
    sky: [
      'From a Chandigarh campus the sky is city-bright, but the foothills to the north are a short drive, which makes a darker family sky-watch practical.',
      'The monsoon runs from July to September and winter fog can arrive in December and January. October–November and February–April are the best windows for evening observing.',
    ],
    seasons: [
      { window: 'October – November', suits: 'Clear post-monsoon evenings: the first sky-watch' },
      { window: 'December – January', suits: 'Cold, sometimes foggy; solar sessions by day' },
      { window: 'February – April', suits: 'Clear evenings and the showcase' },
      { window: 'July – September', suits: 'Monsoon: builds and concept sessions' },
    ],
    local: [
      {
        title: 'Kalpana Chawla Planetarium, Kurukshetra',
        detail: 'Named after the Haryana-born astronaut, and within a day trip of the Tricity.',
      },
      {
        title: 'Darker skies nearby',
        detail: 'The Shivalik foothills north of the city are a short drive from the city lights.',
      },
    ],
    faqs: [
      {
        question: 'Can a Chandigarh, Mohali or Panchkula school request the club?',
        answer:
          'Yes. Astris is based in Delhi NCR; for the Tricity we confirm educator scheduling in our reply, with a quote and the full proposal.',
      },
      {
        question: 'When are Chandigarh’s skies best for school sky-watches?',
        answer:
          'October–November and February–April. The monsoon from July to September and winter fog in December–January make those months better for builds and daytime solar sessions.',
      },
    ],
    related: [],
  },
]

const CITY_SLUGS = CITIES.map((c) => `${HUB}/${c.slug}`)

function cityGuide(c: City): Guide {
  const others = CITY_SLUGS.filter((s) => s !== `${HUB}/${c.slug}`)
  const sections: SeoSection[] = [
    { kind: 'prose', heading: `Bringing the club to a ${c.name} school`, body: [availabilityFor(c)] },
    { kind: 'points', heading: 'How it works', points: MODEL_POINTS },
    { kind: 'prose', heading: `${c.name}’s sky, honestly`, body: c.sky },
    {
      kind: 'table',
      heading: `Planning the club year in ${c.name}`,
      intro: 'The club runs from April to February. In each city its evening sky-watches go into the clearest months, and daytime solar sessions and indoor builds carry the rest.',
      columns: ['Months', 'What the club uses them for'],
      rows: c.seasons.map((s) => [s.window, s.suits]),
    },
    { kind: 'points', heading: `Astronomy around ${c.name}`, points: c.local },
    {
      kind: 'callout',
      title: `For ${c.boards} schools`,
      body: 'The club’s ready-made mapping covers CBSE / NCERT and IB (PYP, MYP and DP); ICSE mapping is available on request, and state-board schools are matched to their own textbooks at onboarding. The club adds no subject, no syllabus and no exam.',
    },
  ]
  return {
    slug: `${HUB}/${c.slug}`,
    cluster: 'astronomy-club',
    // Long display names (e.g. the Chandigarh tricity) would be cut off in
    // results, so the <title> falls back to the short city name.
    title: `Astronomy Club for Schools in ${c.display.length > 30 ? c.name : c.display}`,
    description: `Weekly NCERT-linked astronomy club for ${c.name} schools, Grades 4–12: real telescopes, solar observing and family sky-watches. No cost to the school.`,
    h1: `Astronomy club for schools in ${c.display}`,
    eyebrow: c.ncr ? `${c.name} · Delhi NCR` : `${c.name} · ${c.region}`,
    lede: c.lede,
    keywords: [
      `astronomy club for schools in ${c.name}`,
      `astronomy club ${c.name}`,
      `school astronomy program ${c.name}`,
      `astronomy classes for kids ${c.name}`,
      `space club for school ${c.name}`,
      ...c.alt.map((a) => `astronomy club for schools in ${a}`),
    ],
    sections,
    faqs: c.faqs,
    experiences: [CLUB_EXPERIENCE, ASTROED_EXPERIENCE],
    related: [HUB, `${HUB}/how-to-start`, ...c.related, ...others.slice(0, 2)],
    cta: clubCta(c.name),
    updated: UPDATED,
  }
}

/* -------------------------------------------------------------- the guides */

const cityList = CITIES.map((c) => c.display).join(', ')

export const clubGuides: Guide[] = [
  {
    slug: HUB,
    cluster: 'astronomy-club',
    isHub: true,
    title: 'Astronomy Club for Schools in India: How It Works',
    description:
      'A school astronomy club done properly: weekly NCERT-linked sessions for Grades 4–12, real telescopes, safe solar observing and family sky-watches.',
    h1: 'Astronomy club for schools',
    eyebrow: 'Astronomy club',
    lede:
      'Every child has asked what is up there. An astronomy club is how a school keeps that question alive every week, not just on the night a telescope visits. This guide explains what a good school astronomy club contains, how it fits a timetable that has no room, and how a school can start one without a budget line.',
    keywords: [
      'astronomy club for schools',
      'school astronomy club India',
      'astronomy club in school',
      'space club for schools',
      'astronomy program for schools India',
      'after school astronomy club',
      'STEM club astronomy',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Why most school astronomy fades after one evening',
        body: [
          'The usual pattern is a single telescope night: a queue, a few seconds at the eyepiece, and nothing the following week. Students remember the novelty and very little of the science, because nothing builds on it.',
          'A club fixes that by meeting every week through the school year, by tying each session to a chapter students are already studying, and by giving members something to do between sessions: a logbook, a build to take home, a sky to check tonight.',
        ],
      },
      { kind: 'points', heading: 'What a well-run astronomy club contains', points: MODEL_POINTS },
      {
        kind: 'table',
        heading: 'One sky, three lenses',
        intro: 'The whole club explores the same theme each week, but each grade band learns it through its own chapters. Week 7, the Moon and its phases:',
        columns: ['Band', 'What they do', 'Classroom link (NCERT)'],
        rows: [
          ['Explorers, Grades 4–6', 'Act out the phases with a lamp and a ball, then start a month-long Moon diary', 'EVS / Science: the Moon and the sky; light and shadows'],
          ['Navigators, Grades 7–9', 'Model the Sun–Earth–Moon geometry and predict when the next eclipse is possible', 'Science: light and shadows; motions of the Earth and Moon'],
          ['Astronomers, Grades 10–12', 'Use Kepler’s third law to find the Moon’s distance from its orbital period', 'Physics Class 11: Gravitation'],
        ],
      },
      {
        kind: 'table',
        heading: 'Club, workshop or Space Lab?',
        columns: ['', 'One-off workshop', 'Weekly astronomy club', 'Space Lab'],
        rows: [
          ['Cost to the school', 'Usually a fee', 'None: families enrol directly', 'A capital project'],
          ['How often', 'Once', '32 sessions a year', 'Built into the timetable'],
          ['Links to the syllabus', 'Rarely', 'Every week, by grade band', 'Yes, school-wide'],
          ['What students keep', 'A memory', 'Logbook, builds, level badge, certificate', 'Ongoing access'],
          ['Best for', 'A taster', 'Starting now, proving interest', 'Schools ready to invest'],
        ],
      },
      {
        kind: 'callout',
        title: 'Cities',
        body: `There are city guides for ${cityList}. Astris is based in Delhi NCR; schools elsewhere can request the club, and we confirm scheduling for their city when we reply.`,
      },
    ],
    faqs: [
      {
        question: 'What does an astronomy club cost a school?',
        answer:
          'Run the Astris way, nothing. The school provides a room and a weekly slot; families enrol and pay Astris directly. A school can ask for a quote and the full proposal.',
      },
      {
        question: 'Will an astronomy club clash with academics?',
        answer:
          'It should not. The Astris club takes one weekly slot that the school chooses, sets no exams and no homework beyond a short observation logbook, and teaches each theme through chapters students are already studying.',
      },
      {
        question: 'Which grades can join?',
        answer:
          'Grades 4 to 12, in three bands: Explorers (4–6), Navigators (7–9) and Astronomers (10–12). Each band has its own educator, worksheet and activity in every session.',
      },
      {
        question: 'Is solar observing safe for students?',
        answer:
          'Yes, when it is done properly: only through certified solar filters or by projection, always supervised by an educator. The Sun is never viewed directly.',
      },
    ],
    experiences: [CLUB_EXPERIENCE, ASTROED_EXPERIENCE],
    related: [`${HUB}/how-to-start`, `${HUB}/activities`, `${HUB}/delhi`, `${HUB}/bangalore`],
    cta: clubCta(),
    updated: UPDATED,
  },
  {
    slug: `${HUB}/how-to-start`,
    cluster: 'astronomy-club',
    title: 'How to Start an Astronomy Club in School: Checklist',
    description:
      'A four-week path from yes to a first school astronomy club session: the room, the slot, the parent note, enrolment and safety. For principals and coordinators.',
    h1: 'How to start an astronomy club in your school',
    eyebrow: 'Astronomy club · How to start',
    lede:
      'Starting an astronomy club is less about telescopes than about four decisions: when it meets, where, who coordinates it, and how families join. Get those right and the rest is a calendar.',
    keywords: [
      'how to start an astronomy club in school',
      'start astronomy club school India',
      'school astronomy club ideas',
      'astronomy club for students',
      'NEP experiential learning club',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'From yes to first session in four weeks',
        steps: [
          { title: 'Week 1: the school says yes', detail: 'Fix the weekly slot, the room and one coordinator teacher as the point of contact.' },
          { title: 'Week 2: an assembly demo', detail: 'A 20-minute assembly with a live telescope view or a safe solar projection. The parent note goes home the same day.' },
          { title: 'Week 3: enrolment opens', detail: 'Families enrol online and pay the provider directly, so the school handles no money.' },
          { title: 'Week 4: the club is confirmed', detail: 'The club starts once it reaches its minimum batch; the first session includes a short baseline so progress can be measured.' },
        ],
      },
      {
        kind: 'points',
        heading: 'The checklist',
        points: [
          { title: 'A slot that never moves', detail: 'Clubs die when they are the first thing cancelled for an exam or an event. Choose a slot the school can protect.' },
          { title: 'A room with a door to the sky', detail: 'Any classroom works for sessions; a rooftop, terrace or open ground with a view to the west is what observing needs.' },
          { title: 'A coordinator, not a teacher of the club', detail: 'The provider’s educators run the sessions; the school’s coordinator is the point of contact for timings, permissions and parents.' },
          { title: 'Safety written down', detail: 'Solar viewing only through certified filters or projection; written consent and staff present at evening events; no chemicals in builds.' },
          { title: 'Something parents can see', detail: 'Weekly notes, a logbook that comes home, progress cards twice a year and family sky-watches. Parents back what they can see.' },
        ],
      },
      {
        kind: 'callout',
        title: 'Where NEP 2020 comes in',
        body: 'NEP 2020 asks schools to move towards experiential, inquiry-led learning. A weekly club that applies the syllabus students already have, with observation and measurement at its centre, is one of the most direct ways to show that, without adding a subject or an exam.',
      },
    ],
    faqs: [
      {
        question: 'Do we need to buy telescopes to start an astronomy club?',
        answer:
          'Not with the Astris club. Astris brings the telescopes, solar filters, kits and educators; the school provides the room and the slot.',
      },
      {
        question: 'What if not enough students enrol?',
        answer:
          'The Astris club only starts once it reaches 25 students. If it does not, every family is refunded in full.',
      },
    ],
    experiences: [CLUB_EXPERIENCE],
    related: [HUB, `${HUB}/activities`, 'astronomy-education/schools'],
    cta: clubCta(),
    updated: UPDATED,
  },
  {
    slug: `${HUB}/activities`,
    cluster: 'astronomy-club',
    title: 'Astronomy Club Activities for Students, by Grade',
    description:
      'Astronomy club activities that work in Indian schools, by grade: Moon diaries, sunspot logs, planispheres, water rockets and CD spectroscopes.',
    h1: 'Astronomy club activities for school students',
    eyebrow: 'Astronomy club · Activities',
    lede:
      'The best astronomy club activities do two things at once: they are fun to make, and they measure something real. These are the builds and sessions the Astris club uses across its three-year cycle.',
    keywords: [
      'astronomy club activities',
      'astronomy activities for students',
      'astronomy club ideas for school',
      'space activities for kids India',
      'astronomy projects for school students',
    ],
    sections: [
      {
        kind: 'table',
        heading: '18 builds across a three-year cycle',
        intro: 'Each build uses household materials; most go home.',
        columns: ['Year', 'Build', 'What it shows'],
        rows: [
          ['A', 'Planisphere star finder', 'A rotating star map that shows which stars are up at any date and time'],
          ['A', 'Moon-phase and eclipse model', 'A working Sun–Earth–Moon model that recreates every phase and both kinds of eclipse'],
          ['A', 'DIY refracting telescope', 'A real two-lens telescope that shows craters on the Moon'],
          ['A', 'Pinhole solar projector', 'A box that projects a safe image of the Sun, sunspots included'],
          ['A', 'Sundial', 'A pocket sundial that tells time from the Sun’s shadow'],
          ['A', 'Moon crater experiment', 'A tray of “Moon dust” that shows how craters and rays form'],
          ['B', 'Scale Solar System walk', 'A paper strip that turns the Solar System’s distances into a walk'],
          ['B', 'Gravity-well orbit model', 'A stretched sheet that shows how gravity bends paths into orbits'],
          ['B', 'Pins-and-string orbit tracer', 'Two pins and a loop of string that draw a true planetary orbit'],
          ['B', 'Mars lander drop challenge', 'Design a lander that keeps its “astronaut” safe from a two-storey drop'],
          ['B', 'Water rocket', 'A soda-bottle rocket that flies 30 metres or more on water and air'],
          ['B', 'Paper Mangalyaan model', 'A fold-up model of India’s Mars Orbiter, with every part labelled'],
          ['C', 'Constellation viewer', 'A tube that projects constellations onto a wall or ceiling'],
          ['C', 'CD spectroscope', 'An old CD and a cereal box that split light into a rainbow spectrum'],
          ['C', 'Parallax rangefinder', 'A card sight that measures distance the way astronomers measure stars'],
          ['C', 'Star life-cycle wheel', 'A two-layer wheel that follows a star from birth to its end'],
          ['C', 'Expanding-universe balloon', 'A balloon covered in “galaxies” that shows the Universe stretching'],
          ['C', 'Exoplanet transit detector', 'A lamp, a ball and a phone light-meter that find a “planet” the way NASA does'],
        ],
      },
      {
        kind: 'points',
        heading: 'Activities that need no telescope',
        points: [
          { title: 'A month-long Moon diary', detail: 'Sketch the Moon at the same time each night and predict the next shape. The best first habit an observer can build.' },
          { title: 'A year-long sunspot log', detail: 'Through a certified filter or a projector, count and sketch sunspots each month and watch the Sun rotate.' },
          { title: 'Science or fiction?', detail: 'Watch a space film, then argue which scenes physics allows. A favourite with older members.' },
          { title: 'Scale walks', detail: 'Pace out the Solar System on the school ground; the distances surprise everyone.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What are good astronomy activities for primary students?',
        answer:
          'Hands-on, observable ones: acting out Moon phases with a lamp and a ball, a Moon diary, a planisphere, a sundial and a crater tray. Grades 4–6 learn best by noticing and describing.',
      },
      {
        question: 'What astronomy projects suit senior students?',
        answer:
          'Measurement projects: finding the Moon’s distance with Kepler’s third law, measuring the Sun’s rotation from sunspots, or splitting starlight with a spectroscope. These can grow into IB Internal Assessments, Extended Essays or olympiad preparation.',
      },
    ],
    experiences: [CLUB_EXPERIENCE],
    related: [HUB, `${HUB}/how-to-start`, 'astronomy-education/telescope-programs'],
    cta: clubCta(),
    updated: UPDATED,
  },
  ...CITIES.map(cityGuide),
]
