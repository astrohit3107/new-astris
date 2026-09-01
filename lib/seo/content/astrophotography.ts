/**
 * ============================================================================
 *  CLUSTER 2 — ASTROPHOTOGRAPHY  →  funnels into the Delhi deep-sky workshop
 *                                    and the Ladakh expedition
 * ============================================================================
 *  A topical-authority cluster. The searches here ("how to start
 *  astrophotography", "narrowband astrophotography", "astrophotography from a
 *  light polluted city", "Milky Way photography India") are made by people
 *  who want to be taught, which is exactly what Astris sells — so the guides
 *  teach properly rather than teasing.
 *
 *  TECHNIQUE FACTS are ordinary optics and photography, stated plainly.
 *  ASTRIS FACTS are carried from `lib/workshop-delhi-data.ts` and
 *  `lib/astrophotography-data.ts`: a two-night narrowband and deep-sky
 *  workshop in Delhi across September and October 2026 with the fee on
 *  enquiry, and a six-day Ladakh field expedition. No invented prices, no
 *  invented dates, no invented student outcomes.
 * ========================================================================== */

import type { Guide } from '@/lib/seo/types'

const UPDATED = '2026-09-01'

const WORKSHOP_EXPERIENCE = {
  label: 'Flagship workshop',
  title: 'Delhi Deep-Sky Astrophotography Workshop',
  detail:
    'A two-night, hands-on narrowband and deep-sky imaging workshop run from a heavily light-polluted Delhi sky — planning, acquisition, calibration, stacking and processing, end to end.',
  href: '/delhi-deep-sky-astrophotography-workshop',
}

const LADAKH_EXPERIENCE = {
  label: 'Expedition',
  title: 'Astroventure Astrophotography — Ladakh',
  detail:
    'A six-day field masterclass under some of the darkest skies on Earth, for photographers who want extended time imaging rather than a single night.',
  href: '/astroventure-astrophotography',
}

const WORKSHOP_CTA = {
  heading: 'Learn this properly, on real equipment',
  body: 'The Delhi Deep-Sky Astrophotography Workshop runs the complete narrowband workflow across two nights, from one of the most light-polluted skies in the country — because if it works there, it works anywhere you take it.',
  primary: { label: 'See the Delhi workshop', href: '/delhi-deep-sky-astrophotography-workshop' },
  secondary: { label: 'The Ladakh expedition', href: '/astroventure-astrophotography' },
}

const FIELD_CTA = {
  heading: 'Take it into a dark sky',
  body: 'Technique carries you a long way, and then the sky becomes the limit. The Ladakh astrophotography expedition puts six days of field time under some of the darkest skies available anywhere.',
  primary: { label: 'The Ladakh expedition', href: '/astroventure-astrophotography' },
  secondary: { label: 'The Delhi workshop', href: '/delhi-deep-sky-astrophotography-workshop' },
}

export const astrophotographyGuides: Guide[] = [
  /* ------------------------------------------------------------------ HUB */
  {
    slug: 'astrophotography',
    cluster: 'astrophotography',
    isHub: true,
    title: 'Astrophotography in India — A Complete Practical Guide',
    description:
      'How astrophotography actually works: the four kinds of imaging, what each needs, what an Indian sky and an Indian calendar allow, and where to begin without wasting money.',
    h1: 'Astrophotography in India',
    eyebrow: 'Astrophotography',
    lede:
      'Astrophotography is not one hobby. It is four or five different disciplines that share a subject, and most people who give up early do so because they attempted the hardest one first with equipment meant for another. This is the map — what each kind requires, what India’s skies and seasons allow, and the order that works.',
    keywords: [
      'astrophotography India',
      'learn astrophotography',
      'astrophotography guide',
      'astrophotography course India',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'The four kinds, and what each actually demands',
        intro:
          'The single most useful thing a beginner can know is which of these they are attempting, because the requirements barely overlap.',
        columns: ['Discipline', 'What it needs', 'Dark sky required?', 'Difficulty'],
        rows: [
          [
            'Nightscapes and Milky Way',
            'A camera with manual control, a fast wide lens, a solid tripod',
            'Yes — this is the one light pollution destroys outright',
            'Low to moderate',
          ],
          [
            'Star trails',
            'The same kit plus an intervalometer and patience',
            'Helpful, not essential — it works from a semi-urban sky',
            'Low',
          ],
          [
            'Lunar and planetary',
            'A telescope and a camera capable of video capture',
            'No — these targets are bright enough to ignore city glow',
            'Moderate',
          ],
          [
            'Deep-sky imaging',
            'A tracking mount, a suitable scope or lens, and calibration discipline',
            'Preferred, but narrowband makes urban deep-sky genuinely possible',
            'High',
          ],
        ],
        note:
          'The mount, not the telescope, is what limits deep-sky work. Almost every beginner discovers this after buying the telescope.',
      },
      {
        kind: 'prose',
        heading: 'The one idea that explains most of it',
        body: [
          'Astrophotography is the practice of collecting a very small number of photons and then doing statistics on them. Everything follows from that. You collect for longer, so the signal accumulates. You collect many frames rather than one, so the random noise averages down while the real signal does not. You subtract the camera’s own contributions with calibration frames, so what remains is closer to what the sky actually sent.',
          'That is why total integration time — the sum of every usable frame — matters more than any single heroic exposure, and why a modest instrument used for six hours beats an expensive one used for twenty minutes. It is also why the discipline rewards patience in a way that visual observing does not.',
          'Light pollution fits into the same frame. City glow is signal too: unwanted, roughly uniform, and noisy. It does not merely make the image brighter; it adds its own noise on top of the target, which is why you cannot simply subtract a bright sky and recover a faint galaxy. Narrowband imaging works because it refuses most of that light at the filter rather than trying to remove it afterwards.',
        ],
      },
      {
        kind: 'steps',
        heading: 'The order that actually works',
        intro:
          'Skipping a step here is the most common and most expensive mistake in the hobby.',
        steps: [
          {
            title: 'Learn the sky first, with no camera',
            detail:
              'Know where things are, when they rise, and what the Moon is doing. Photographers who cannot find their target by eye lose entire nights to pointing at the wrong patch of sky.',
          },
          {
            title: 'Shoot nightscapes on a tripod',
            detail:
              'Wide, untracked, fixed exposures. This teaches exposure, focus, noise and post-processing on a forgiving subject, and it needs nothing you do not already own.',
          },
          {
            title: 'Add stacking',
            detail:
              'The same target, many frames, combined. This is the conceptual jump from photography to astrophotography, and it costs nothing but time.',
          },
          {
            title: 'Add tracking',
            detail:
              'A star tracker or equatorial mount, which buys longer exposures without trailing. This is the point at which faint objects become reachable at all.',
          },
          {
            title: 'Add calibration',
            detail:
              'Darks, flats and bias frames. Unglamorous, and the difference between an image that survives aggressive processing and one that falls apart.',
          },
          {
            title: 'Then, and only then, go narrowband',
            detail:
              'Filters that isolate specific emission lines. This is what makes deep-sky imaging possible from a city, and it assumes every step above it is already solid.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Where the money should go',
        body:
          'In rough order of impact per rupee: a stable mount, then dark skies (which cost travel rather than equipment), then total integration time (which is free), then optics, then the camera. Beginners consistently invert this — buying an ambitious telescope on an unstable mount and then wondering why the stars are eggs. If a budget forces one choice, choose the mount.',
      },
    ],
    faqs: [
      {
        question: 'Can you do astrophotography with a normal DSLR or mirrorless camera?',
        answer:
          'Yes, and it is the right way to start. Nightscapes, star trails and even a surprising amount of deep-sky work are achievable with an ordinary camera, a fast lens and a tripod. Dedicated astronomy cameras are an optimisation, not an entry requirement.',
      },
      {
        question: 'Do you need a telescope to start astrophotography?',
        answer:
          'No. A telescope is essential for planetary and most deep-sky work, and entirely unnecessary for nightscapes and star trails — where a wide lens usually outperforms one. Many photographers spend a year producing good work before buying any telescope at all.',
      },
      {
        question: 'Is astrophotography possible from an Indian city?',
        answer:
          'Partly, and more than most people assume. The Moon and planets are unaffected by light pollution. Deep-sky imaging from a city is possible through narrowband filtering, which is precisely what the Delhi workshop teaches. Milky Way nightscapes are the one thing a city genuinely cannot give you.',
      },
      {
        question: 'How long does a single deep-sky image take?',
        answer:
          'Hours of total integration, usually across more than one night, plus processing. A few hours of data on one target produces a far better result than a few minutes each on ten targets, which is the discipline most beginners find hardest to accept.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography/beginners-guide',
      'astrophotography/deep-sky',
      'astrophotography/light-pollution',
      'astrophotography/milky-way',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* -------------------------------------------------------- BEGINNERS GUIDE */
  {
    slug: 'astrophotography/beginners-guide',
    cluster: 'astrophotography',
    title: 'How to Start Astrophotography — A Beginner’s Guide for India',
    description:
      'Start astrophotography with the camera you already own: settings that work, how to focus on a star, the 500 rule and its limits, and your first stacked image.',
    h1: 'How to start astrophotography',
    eyebrow: 'Beginner',
    lede:
      'You can take a photograph of the Milky Way tonight with a camera, a wide lens and a tripod, and you should — before spending anything. This guide takes you from a blank frame to a stacked image, and is honest about the point where equipment starts to matter.',
    keywords: [
      'how to start astrophotography',
      'astrophotography for beginners',
      'beginner astrophotography settings',
      'first astrophotography image',
    ],
    sections: [
      {
        kind: 'points',
        heading: 'What you need on night one',
        points: [
          {
            title: 'A camera with full manual control',
            detail:
              'Any DSLR or mirrorless body from the last decade or so. What matters is manual exposure, manual focus and the ability to shoot RAW — not the sensor’s reputation.',
          },
          {
            title: 'The widest, fastest lens you own',
            detail:
              'Wide because a shorter focal length tolerates longer exposures before stars trail; fast because aperture is how much light you gather. A 14–24mm at f/2.8, or a 24mm at f/1.8, is ideal — a kit zoom at f/3.5 still works.',
          },
          {
            title: 'A tripod that does not creep',
            detail:
              'Rigidity matters more than height. A tripod that settles slowly under load will soften every frame you take.',
          },
          {
            title: 'A red torch',
            detail:
              'Dark adaptation takes about twenty minutes to build and one white light to destroy. Red light preserves it and you will use this constantly.',
          },
          {
            title: 'A moonless night and somewhere darker',
            detail:
              'The Moon is brighter than any streetlamp you can escape. Check its phase before choosing your date — this single decision affects the result more than any setting.',
          },
        ],
      },
      {
        kind: 'steps',
        heading: 'Your first frame, step by step',
        steps: [
          {
            title: 'Set the camera to full manual and RAW',
            detail:
              'Manual exposure, manual focus, RAW files, and turn off long-exposure noise reduction for now — it doubles your shooting time and stacking will handle noise better.',
          },
          {
            title: 'Focus on an actual star',
            detail:
              'Do not trust the infinity mark. Use live view, magnify to maximum on the brightest star available, and adjust until it collapses to the smallest possible point. Then tape the focus ring. Focus drift ruins more nights than any other error.',
          },
          {
            title: 'Choose an exposure that does not trail',
            detail:
              'The old rule of thumb is 500 divided by your focal length in seconds — about 20 seconds at 24mm. On modern high-resolution sensors this is optimistic; treat it as an upper bound, start shorter, and zoom in to check that stars are points rather than dashes.',
          },
          {
            title: 'Open the aperture and raise ISO',
            detail:
              'Wide open, or one stop down if the lens is soft at the edges. ISO 1600–3200 is a sensible starting range. Judge the exposure by the histogram, not the rear screen — the screen lies badly in the dark.',
          },
          {
            title: 'Shoot many frames, not one',
            detail:
              'Twenty to fifty identical frames of the same composition. This is the raw material for stacking, and it is the step that separates a noisy snapshot from a clean image.',
          },
          {
            title: 'Take dark frames before you pack up',
            detail:
              'Same settings, same temperature, lens cap on, ten to twenty frames. They record the sensor’s own noise pattern so stacking software can remove it.',
          },
          {
            title: 'Stack, then stretch',
            detail:
              'Combine the frames in free stacking software, then gently brighten the faint end of the histogram. The detail was always in the data; stretching is what makes it visible.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The mistake almost everyone makes twice',
        body:
          'Nudging the focus ring while adjusting something else, and not noticing until the frames are on a screen at home. Focus once, verify at full magnification, tape it down, and re-check after any lens change or significant temperature drop. It is unglamorous advice and it will save you more nights than any equipment purchase.',
      },
      {
        kind: 'points',
        heading: 'When equipment starts to matter',
        intro:
          'Not immediately. These are the points at which the kit, rather than the technique, becomes the limit.',
        points: [
          {
            title: 'When 20 seconds is not enough',
            detail:
              'The moment you want a fainter target than a wide untracked frame can reach, you need tracking. A star tracker is the single highest-value purchase in the hobby.',
          },
          {
            title: 'When you want to go closer',
            detail:
              'Longer focal lengths magnify tracking errors as well as the subject. This is where the mount, rather than the lens, becomes the binding constraint.',
          },
          {
            title: 'When the city is the problem',
            detail:
              'If your frames are dominated by an orange gradient rather than noise, the answer is not a better camera. It is either darker skies or narrowband filtering.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What camera settings should I use for astrophotography?',
        answer:
          'A practical starting point for untracked wide-field work: manual mode, RAW, aperture wide open, ISO 1600–3200, and an exposure short enough that stars stay as points — around 15–20 seconds at 24mm, less at longer focal lengths. Then adjust based on the histogram rather than the rear screen.',
      },
      {
        question: 'What is the 500 rule and is it reliable?',
        answer:
          'It estimates the longest untracked exposure before stars visibly trail: 500 divided by focal length, in seconds. It predates high-resolution sensors and is optimistic on modern cameras, so treat it as an upper bound and verify by zooming into a test frame.',
      },
      {
        question: 'Do I need expensive software to stack images?',
        answer:
          'No. Capable free stacking software exists and is what most people learn on. Paid tools are faster and more powerful, but they will not rescue data that was poorly focused or badly exposed.',
      },
      {
        question: 'Why do my star photos look grey and washed out?',
        answer:
          'Almost always light pollution rather than a settings error. A bright sky raises the whole frame and buries faint detail. The fixes, in order of effectiveness, are a darker location, a moonless night, more total integration time, and — for deep-sky targets — narrowband filtering.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/milky-way',
      'astrophotography/star-trails',
      'astrophotography/light-pollution',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------------- DEEP SKY */
  {
    slug: 'astrophotography/deep-sky',
    cluster: 'astrophotography',
    title: 'Deep-Sky Astrophotography — How Nebulae and Galaxies Are Actually Imaged',
    description:
      'The real deep-sky workflow: tracking, guiding, sub-exposures, calibration frames, stacking and stretching — and why total integration time matters more than equipment.',
    h1: 'Deep-sky astrophotography',
    eyebrow: 'Deep sky',
    lede:
      'Deep-sky imaging is the discipline behind almost every astronomical photograph you have admired. It is also the one where the gap between what people imagine happens and what actually happens is widest — there is no single exposure, and there is a great deal of arithmetic.',
    keywords: [
      'deep sky astrophotography',
      'deep sky imaging India',
      'DSO astrophotography',
      'how to photograph nebulae',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What a finished image really is',
        body: [
          'A deep-sky photograph is not a photograph in the ordinary sense. It is the statistical combination of tens or hundreds of individual frames, each too faint and too noisy to be worth looking at on its own, corrected by three other sets of frames that describe the camera’s own imperfections, and then stretched to make faint structure visible.',
          'This is why the honest unit of ambition is total integration time rather than exposure. Ten hours on one target, gathered across several nights, is an entirely different image from one hour — not ten times brighter, but dramatically cleaner, because random noise falls relative to signal as frames accumulate.',
          'It is also why deep-sky imaging rewards a specific temperament. The result is not visible at the telescope. You will spend a night collecting data that looks like nothing, and discover what you actually captured the following afternoon.',
        ],
      },
      {
        kind: 'points',
        heading: 'The four kinds of frame',
        intro:
          'Every deep-sky project produces four sets of data. Three of them are not the subject at all.',
        points: [
          {
            title: 'Lights',
            detail:
              'The actual exposures of the target. Individually faint, gradient-ridden and unimpressive. These are what everyone thinks the whole process consists of.',
          },
          {
            title: 'Darks',
            detail:
              'Same exposure, same temperature, no light reaching the sensor. They record thermal noise and hot pixels so those can be removed rather than stacked in.',
          },
          {
            title: 'Flats',
            detail:
              'An evenly illuminated frame through the same optical train, at the same focus and rotation. They map vignetting and every dust mote, which is what lets you flatten the field without flattening the nebula.',
          },
          {
            title: 'Bias',
            detail:
              'The shortest possible exposure with no light. They capture the sensor’s read-out offset — the floor beneath everything else.',
          },
        ],
      },
      {
        kind: 'steps',
        heading: 'The workflow, end to end',
        steps: [
          {
            title: 'Choose a target that is actually up',
            detail:
              'High in the sky for several hours, well away from the Moon, and appropriately sized for your focal length. A target that only clears the horizon at 4am is a target you will not image.',
          },
          {
            title: 'Polar align the mount',
            detail:
              'The single most important mechanical step. Poor alignment produces field rotation, which no amount of guiding or processing will fix.',
          },
          {
            title: 'Focus precisely, and re-focus',
            detail:
              'Use a Bahtinov mask or an autofocus routine. Temperature drift moves focus through the night, so check it periodically rather than trusting the start of the session.',
          },
          {
            title: 'Choose a sub-exposure length',
            detail:
              'Long enough that sky background swamps the camera’s read noise, short enough that tracking errors, satellites and aircraft only ruin individual frames rather than the night. Under a bright sky this pushes you shorter; under a dark sky, longer.',
          },
          {
            title: 'Guide, if you are going long',
            detail:
              'A second small camera watching one star and correcting the mount in real time. Beyond a few minutes of exposure at any real focal length, this becomes necessary rather than optional.',
          },
          {
            title: 'Collect calibration frames',
            detail:
              'Flats at the end of the session before anything is disturbed; darks at matching temperature; bias any time. Skipping these is the most common reason an image resists processing.',
          },
          {
            title: 'Stack, then stretch, then be restrained',
            detail:
              'Calibrate, align and integrate the frames, then stretch the faint end carefully. Most beginner images fail in this last step by being pushed until noise and colour artefacts dominate the structure they were meant to reveal.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The mount is the whole game',
        body:
          'Nothing else in deep-sky imaging fails as visibly as an inadequate mount. Optics that are merely adequate produce fine images on a good mount; excellent optics produce elongated stars on a poor one. If a budget forces a compromise, compromise on aperture, on the camera, on almost anything else — but buy the mount that can carry your setup comfortably rather than exactly.',
      },
    ],
    faqs: [
      {
        question: 'How many hours of data does a deep-sky image need?',
        answer:
          'There is no fixed number — more data always helps, with diminishing returns. Bright targets can produce a satisfying result in an hour or two; faint galaxies and dim nebulae routinely take ten hours or more, often collected across several nights.',
      },
      {
        question: 'Can deep-sky astrophotography be done from a city?',
        answer:
          'Yes, through narrowband filtering, which admits only the specific wavelengths emission nebulae radiate and rejects most artificial light. It is slower than dark-sky imaging and it does not help with galaxies, which emit across a broad spectrum — but for nebulae it genuinely works, and it is what the Delhi workshop is built around.',
      },
      {
        question: 'Do I need an equatorial mount, or will a star tracker do?',
        answer:
          'A star tracker is enough for wide-field work at short focal lengths and is an excellent way to begin. Longer focal lengths magnify every tracking error, so once you move to a telescope, a properly sized equatorial mount with guiding becomes necessary.',
      },
      {
        question: 'Why do my stacked images have a strong colour gradient?',
        answer:
          'That is light pollution, or the Moon, imposing a smooth brightness ramp across the frame. Gradient-removal tools handle mild cases. Strong gradients are better solved at acquisition — a darker site, a target further from the Moon and the horizon glow, or narrowband filtering.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/narrowband',
      'astrophotography/light-pollution',
      'astrophotography/from-delhi',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* -------------------------------------------------------------- NARROWBAND */
  {
    slug: 'astrophotography/narrowband',
    cluster: 'astrophotography',
    title: 'Narrowband Astrophotography — Why It Works From a City',
    description:
      'What Hα, OIII and SII filters do, why narrowband defeats light pollution, how the Hubble and HOO palettes are built, and what narrowband cannot help with.',
    h1: 'Narrowband astrophotography',
    eyebrow: 'Technique',
    lede:
      'Narrowband imaging is the reason a photographer in Delhi can produce a serious image of a nebula from a sky where the naked eye sees a few dozen stars. It is not a processing trick. It is a decision made at the front of the telescope about which photons are allowed in at all.',
    keywords: [
      'narrowband astrophotography',
      'Ha OIII SII imaging',
      'narrowband filters light pollution',
      'Hubble palette',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The idea',
        body: [
          'Emission nebulae do not glow across the whole spectrum. Their gas radiates at a small number of specific wavelengths — hydrogen-alpha in the deep red, doubly ionised oxygen in the blue-green, singly ionised sulphur further into the red. The light is concentrated into narrow lines rather than spread out.',
          'Artificial light is not like that. Streetlights, and the scattered glow they produce across a city sky, spread energy across broad ranges of the spectrum. So does moonlight, which is simply reflected sunlight.',
          'A narrowband filter exploits the difference. It passes a very narrow slice of the spectrum centred on one emission line and rejects everything else. The nebula’s light passes through almost untouched. The overwhelming majority of the city’s light does not arrive at the sensor at all — so it is never recorded, and never has to be removed.',
          'That is the whole mechanism, and it is why narrowband is qualitatively different from a light-pollution "reduction" filter. You are not subtracting a bright background afterwards; you are declining to collect it.',
        ],
      },
      {
        kind: 'table',
        heading: 'The three standard lines',
        columns: ['Filter', 'What it captures', 'Typically shows'],
        rows: [
          [
            'Hα (hydrogen-alpha)',
            'Ionised hydrogen, the most abundant emission in most nebulae',
            'The strongest signal by far — structure, filaments and shells, even under a bright sky and a bright Moon',
          ],
          [
            'OIII (doubly ionised oxygen)',
            'Hotter, more energetic regions',
            'Planetary nebulae, supernova remnants and the inner regions of emission nebulae',
          ],
          [
            'SII (singly ionised sulphur)',
            'A weaker line close to Hα in wavelength',
            'Little on its own; used mainly to separate structure in false-colour palettes',
          ],
        ],
        note:
          'Hα is where a narrowband beginner should start. It is the strongest signal, the most forgiving of moonlight, and the fastest route to a result that justifies the investment.',
      },
      {
        kind: 'points',
        heading: 'How the colours are made',
        intro:
          'Narrowband images are false colour by necessity — the data is three sets of intensity measurements at specific wavelengths, not a colour photograph. How you map them to red, green and blue is a choice.',
        points: [
          {
            title: 'The Hubble palette (SHO)',
            detail:
              'Sulphur to red, hydrogen to green, oxygen to blue. The familiar gold-and-teal look of many famous images. Because hydrogen dominates, the green channel is usually rebalanced heavily in processing.',
          },
          {
            title: 'HOO',
            detail:
              'Hydrogen to red, oxygen to both green and blue. Only two filters needed, and the result reads as closer to natural colour. This is where most people should start.',
          },
          {
            title: 'Hα as luminance',
            detail:
              'Using the strong hydrogen signal for detail and structure, with broadband colour data layered underneath. A practical hybrid for photographers who already have a colour camera.',
          },
          {
            title: 'Dual-band filters',
            detail:
              'A single filter passing both Hα and OIII, designed for one-shot colour cameras. Less flexible than separate mono filters and dramatically simpler — this is how most urban imagers now begin.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'What narrowband cannot do',
        body:
          'It does not help with galaxies. A galaxy is billions of stars radiating across the whole spectrum, so a filter that rejects most of the spectrum rejects most of the galaxy along with the city glow. It also does not help with star colour, and it costs you speed — you are deliberately discarding light, so narrowband exposures are long. Anyone selling narrowband as a general cure for light pollution is overstating it: it is a precise solution to a specific class of target.',
      },
    ],
    faqs: [
      {
        question: 'Does narrowband imaging work under a full Moon?',
        answer:
          'Hα largely does, which is one of its most useful properties — it turns otherwise wasted moonlit nights into productive ones. OIII suffers considerably more, and is best kept for darker nights.',
      },
      {
        question: 'Do I need a monochrome camera for narrowband?',
        answer:
          'It is the more efficient path, because a mono sensor uses every pixel for every filter. But dual-band filters made for one-shot colour cameras work well and remove a large amount of complexity, which is why most people starting narrowband from a city now begin there.',
      },
      {
        question: 'How long do narrowband exposures need to be?',
        answer:
          'Long — you are deliberately rejecting most of the incoming light. Individual sub-exposures of several minutes and total integration measured in many hours are normal, which makes narrowband a project discipline rather than a single-night one.',
      },
      {
        question: 'Can narrowband make a city sky as good as a dark sky?',
        answer:
          'For emission nebulae it closes an astonishing amount of the gap. For galaxies, broadband targets and anything involving natural star colour, it does not — a dark sky remains irreplaceable for those.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/deep-sky',
      'astrophotography/from-delhi',
      'astrophotography/light-pollution',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* -------------------------------------------------------- LIGHT POLLUTION */
  {
    slug: 'astrophotography/light-pollution',
    cluster: 'astrophotography',
    title: 'Astrophotography From a Light-Polluted City — What Works and What Does Not',
    description:
      'How light pollution actually damages an astrophoto, which targets survive it, which filters help and which do not, and the techniques that genuinely recover an image from a city sky.',
    h1: 'Astrophotography from a light-polluted city',
    eyebrow: 'Light pollution',
    lede:
      'Most Indian astrophotographers live under a sky they are told is unusable. Some of that is true and some of it is defeatism. This separates the two — what a bright sky genuinely takes away, and what remains fully available to you tonight.',
    keywords: [
      'astrophotography from light polluted city',
      'light pollution astrophotography',
      'urban astrophotography India',
      'light pollution filter',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'What light pollution actually does to a frame',
        body: [
          'The intuitive model — city glow makes the image brighter, so subtract the brightness — is wrong in a way that matters. A bright sky is not a constant you can remove cleanly. It is light, and light arrives with its own random fluctuation, so a bright background adds noise on top of the target as well as brightness beneath it.',
          'That noise is the real damage. You can subtract the average level of the glow; you cannot subtract its noise. The faint structure of a galaxy sits underneath that noise, which is why an urban frame that has been "background-extracted" still looks mottled and thin where a dark-sky frame looks smooth.',
          'This explains why the fixes that work, work. More total integration time reduces noise relative to signal. Narrowband filtering prevents most of the offending light from being collected at all. Neither is a processing step, and no processing step substitutes for them.',
        ],
      },
      {
        kind: 'table',
        heading: 'What survives a city sky',
        columns: ['Target', 'From a Bortle 8–9 city', 'Why'],
        rows: [
          [
            'The Moon',
            'Completely unaffected',
            'It is overwhelmingly the brightest object in the night sky — city glow is irrelevant beside it',
          ],
          [
            'Planets',
            'Completely unaffected',
            'Bright, small and imaged at high magnification with short exposures, so sky background barely contributes',
          ],
          [
            'The Sun (filtered)',
            'Completely unaffected',
            'A daytime target; light pollution is not a factor at all',
          ],
          [
            'Emission nebulae',
            'Genuinely achievable with narrowband',
            'Their light is concentrated in narrow emission lines that a filter can isolate from broadband city glow',
          ],
          [
            'Star clusters',
            'The brighter ones work; faint members are lost',
            'Broadband targets, so the sky background competes directly',
          ],
          [
            'Galaxies',
            'Very difficult, and the honest answer is mostly no',
            'Broad-spectrum and faint — filtering cannot separate them from the glow',
          ],
          [
            'Milky Way nightscapes',
            'Not possible',
            'The entire subject is a large, faint, broad-spectrum structure — precisely what a bright sky erases',
          ],
        ],
      },
      {
        kind: 'points',
        heading: 'Filters: what each one honestly does',
        points: [
          {
            title: 'Broadband "light pollution reduction" filters',
            detail:
              'Designed for the discrete emission lines of older sodium and mercury street lighting. As cities convert to broad-spectrum white LEDs, these help considerably less than they once did. Modest gains, not transformation.',
          },
          {
            title: 'Dual-band Hα/OIII filters',
            detail:
              'A genuine step change for emission nebulae on a one-shot colour camera. The most effective single purchase for urban deep-sky work.',
          },
          {
            title: 'Individual narrowband filters',
            detail:
              'The most capable option, on a mono camera. More equipment, more sessions per image, and the best urban results available.',
          },
          {
            title: 'Filters for galaxies',
            detail:
              'There is no filter that meaningfully rescues galaxy imaging from a bright sky. Anything sold on that promise is overpromising, and travel is the only real answer.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'What to do before spending anything',
        points: [
          {
            title: 'Block local lights first',
            detail:
              'A neighbour’s security light or an unshielded street lamp in your field of view does more harm than the entire city dome. Position, screening and a simple dew shield are free and often decisive.',
          },
          {
            title: 'Shoot away from the brightest horizon',
            detail:
              'The glow is not uniform. Targets high overhead pass through far less atmosphere and far less of the city’s light than targets low over the market.',
          },
          {
            title: 'Add integration time',
            detail:
              'The cheapest improvement available. Doubling total exposure across multiple nights buys a real, visible reduction in noise at no equipment cost.',
          },
          {
            title: 'Use shorter sub-exposures',
            detail:
              'Under a bright sky the background saturates quickly, so many shorter frames usually beat fewer long ones. This is the opposite of dark-sky practice and catches people out.',
          },
          {
            title: 'Pick targets the sky permits',
            detail:
              'A superb image of the Moon beats a disappointing attempt at a galaxy. Matching ambition to conditions is a skill, not a compromise.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'The Bortle scale, briefly',
        body:
          'Sky darkness is usually described on the Bortle scale, running from 1 (a genuinely pristine sky) to 9 (an inner-city sky). Delhi, Mumbai, Bengaluru and most large Indian cities sit at 8–9. The rural areas within a few hours of the NCR — the Aravalli country around Alwar and Tijara, or Sambhar in Rajasthan — are an honest Bortle 4: not wilderness, but the point at which the Milky Way returns to the naked eye on a clear moonless night.',
      },
    ],
    faqs: [
      {
        question: 'Can I photograph the Milky Way from inside a city?',
        answer:
          'No. The Milky Way is a large, faint, broad-spectrum structure, which is exactly what a bright sky erases. There is no filter or processing technique that recovers it from a Bortle 8–9 sky — this one genuinely requires travel.',
      },
      {
        question: 'Do light pollution filters actually work?',
        answer:
          'It depends entirely on the type. Broadband reduction filters give modest gains and are losing effectiveness as cities move to white LED lighting. Narrowband and dual-band filters are transformative for emission nebulae, and no filter meaningfully helps with galaxies.',
      },
      {
        question: 'Is it worth doing astrophotography at all from a city?',
        answer:
          'Yes. The Moon, the planets and the Sun are entirely unaffected, and emission nebulae are reachable through narrowband. What a city removes is Milky Way nightscapes and most galaxy work — a real loss, but a long way from nothing.',
      },
      {
        question: 'How far from Delhi do I need to travel for a usable sky?',
        answer:
          'A few hours gets you to an honest rural Bortle 4 in the Aravalli country around Alwar and Tijara, or further out to Sambhar in Rajasthan. That is a dramatic improvement on Delhi’s Bortle 8–9, though it is not a remote-wilderness sky and should not be described as one.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/narrowband',
      'astrophotography/from-delhi',
      'stargazing/bortle-scale',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------------- MILKY WAY */
  {
    slug: 'astrophotography/milky-way',
    cluster: 'astrophotography',
    title: 'How to Photograph the Milky Way in India — Season, Settings and Planning',
    description:
      'When the galactic core is visible from India, how to plan a Milky Way shoot around the Moon and the monsoon, and the settings and technique that produce a clean result.',
    h1: 'How to photograph the Milky Way in India',
    eyebrow: 'Milky Way',
    lede:
      'Photographing the Milky Way is the most achievable ambitious thing in astrophotography — an ordinary camera and a tripod are genuinely enough. What it demands instead is planning: the right months, the right hours, no Moon, and a sky far enough from a city to have a Milky Way in it at all.',
    keywords: [
      'Milky Way photography India',
      'how to photograph the Milky Way',
      'Milky Way season India',
      'galactic core India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The bright part is only up for part of the year',
        body: [
          'What people mean by "the Milky Way" in a photograph is usually the galactic core — the dense, structured region towards the centre of our galaxy, in Sagittarius and Scorpius. The rest of the galactic plane is visible year-round, but it is the core that carries the drama.',
          'From Indian latitudes the core is above the horizon at night for roughly February through October. Early in that window it appears low in the pre-dawn hours; by the middle of the season it is high in the sky for much of the night; by the end it appears in the early evening and sets soon after. That progression is what determines whether a shoot means staying up or getting up.',
          'One complication is specific to India, and it is a large one: the south-west monsoon covers much of the country from roughly June or July into September — precisely the part of the season when the core is best placed. This is why Indian Milky Way photography concentrates into two practical windows rather than one long season.',
        ],
      },
      {
        kind: 'table',
        heading: 'The practical Indian Milky Way calendar',
        columns: ['Window', 'Where the core is', 'The catch'],
        rows: [
          [
            'February – March',
            'Rising in the pre-dawn hours, low in the south-east',
            'Cold, and it means a very early start; northern haze can still be an issue',
          ],
          [
            'April – June',
            'The best combination of the year: high, and up for much of the night',
            'Heat, dust and pre-monsoon haze in the plains — the high-altitude regions are far better',
          ],
          [
            'July – September',
            'Ideally placed for most of the night',
            'Monsoon cloud across most of the country. The trans-Himalayan rain shadow is the notable exception',
          ],
          [
            'October – early November',
            'Visible in the early evening, setting through the night',
            'A shorter window each night, but stable and clear — one of the best times to shoot in the north',
          ],
          [
            'Mid-November – January',
            'The core is not usefully placed at night',
            'Off-season for the core; excellent for winter constellations, Orion and star trails',
          ],
        ],
        note:
          'Latitude changes the details — the core sits higher from southern India than from the north. Plan the specific night with a planetarium app rather than from a table.',
      },
      {
        kind: 'steps',
        heading: 'Planning a shoot that works',
        steps: [
          {
            title: 'Start with the Moon, not the location',
            detail:
              'You want the nights around new Moon, or a window when the Moon has set or not yet risen. A bright Moon washes out the core completely, and no location compensates for that.',
          },
          {
            title: 'Get far enough from the city',
            detail:
              'The core needs a genuinely dark sky. From an honest rural Bortle 4 it is visible to the naked eye on a clear moonless night; from a city it does not exist. This is the non-negotiable requirement.',
          },
          {
            title: 'Know where it will rise, and when',
            detail:
              'Use a planetarium app to check the core’s position and altitude for your date, location and hour. Turning up hopefully is how people spend a cold night photographing an empty patch of sky.',
          },
          {
            title: 'Find a foreground in daylight',
            detail:
              'Scout the composition before dark. A Milky Way frame with nothing in front of it is a texture; with a ridge, a structure or a tree it becomes a photograph.',
          },
          {
            title: 'Shoot a sequence, not a frame',
            detail:
              'Multiple identical exposures to stack for the sky, and a separate longer exposure or blue-hour frame for the foreground. This is how clean results are actually produced.',
          },
        ],
      },
      {
        kind: 'points',
        heading: 'Settings that work as a starting point',
        points: [
          {
            title: 'Aperture wide open',
            detail:
              'f/2.8 or faster if the lens allows. Stopping down one third to one half stop can clean up star shapes at the frame edges on lenses with heavy coma.',
          },
          {
            title: 'Exposure short enough for round stars',
            detail:
              'Roughly 15–20 seconds at 24mm untracked, less at longer focal lengths. Check at full magnification rather than trusting a rule.',
          },
          {
            title: 'ISO 1600–6400',
            detail:
              'Higher than feels comfortable. Underexposing and lifting later is worse than a bright, noisy frame that stacks well.',
          },
          {
            title: 'Manual white balance',
            detail:
              'Somewhere around 3800–4500K as a start. Auto white balance shifts between frames, which makes stacking harder than it needs to be.',
          },
          {
            title: 'A tracker, if you have one',
            detail:
              'Even a small star tracker transforms this. Two-minute tracked sky exposures blended with an untracked foreground frame is the standard route to a genuinely clean nightscape.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'When is the best time to photograph the Milky Way in India?',
        answer:
          'April to June and October to early November are the two most practical windows. The galactic core is above the horizon at night from roughly February to October, but the monsoon removes much of the middle of that season across most of the country.',
      },
      {
        question: 'Do I need a star tracker to photograph the Milky Way?',
        answer:
          'No. Untracked frames on a tripod, stacked, produce very good results. A tracker allows longer exposures at lower ISO and makes a visible difference to noise, but it is an upgrade rather than a requirement.',
      },
      {
        question: 'How dark does the sky need to be for Milky Way photography?',
        answer:
          'Dark enough that you can see the Milky Way with your own eyes once adapted — in practice a rural Bortle 4 or better, on a moonless night. Below that the core is present in the data but buried under sky glow.',
      },
      {
        question: 'Can I photograph the Milky Way during the monsoon?',
        answer:
          'Across most of India, rarely. The exception is the trans-Himalayan rain shadow — Ladakh and Spiti — which stays largely clear through the monsoon months while the core is at its best, which is exactly why expeditions there run in that window.',
      },
    ],
    experiences: [LADAKH_EXPERIENCE, WORKSHOP_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/beginners-guide',
      'stargazing/milky-way-india',
      'stargazing/dark-sky-places-india',
    ],
    cta: FIELD_CTA,
    updated: UPDATED,
  },

  /* -------------------------------------------------------------- STAR TRAILS */
  {
    slug: 'astrophotography/star-trails',
    cluster: 'astrophotography',
    title: 'Star Trail Photography — The Easiest Astrophoto Worth Taking',
    description:
      'How to shoot star trails: why many short frames beat one long exposure, how to compose around Polaris, and how to stack a trail sequence cleanly.',
    h1: 'Star trail photography',
    eyebrow: 'Star trails',
    lede:
      'Star trails are the one serious astrophoto that works from a semi-urban sky, needs no tracking mount, and rewards you for doing nothing for an hour. They are also the fastest way to teach yourself that the sky is a moving object.',
    keywords: [
      'star trail photography',
      'how to shoot star trails',
      'star trails India',
      'star trail stacking',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'Why you should not use one long exposure',
        body: [
          'The obvious approach — open the shutter for an hour — is the wrong one, and understanding why is most of the technique. A single hour-long frame accumulates an hour of sensor heat, an hour of sky glow, and an hour of risk: one passing car, one aircraft, one bump, and the entire frame is gone.',
          'The standard method instead is a long sequence of ordinary exposures, typically 20 to 30 seconds each, taken back to back for as long as you want the trails to be. They are then combined so that the brightest value at each pixel wins, which draws each star’s path as a continuous arc.',
          'The advantages compound. Noise stays at single-frame levels. A ruined frame costs you thirty seconds rather than the night. And you can decide afterwards how long the trails should be, simply by choosing how many frames to include.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Shooting a sequence',
        steps: [
          {
            title: 'Compose with a foreground that means something',
            detail:
              'Trails alone are a pattern. A ridgeline, a building, a tree or a tent gives the rotation something to rotate over, and it is what makes the image read.',
          },
          {
            title: 'Decide which way to point',
            detail:
              'Facing north puts Polaris near the centre and produces concentric circles. Facing east or west gives long diagonal streaks. Facing south gives broad shallow arcs. All three are valid and they look completely different.',
          },
          {
            title: 'Set exposure and lock everything',
            detail:
              'Manual mode, manual focus on a star, fixed white balance, and — importantly — no automatic anything. A single auto-exposure change mid-sequence shows up as a visible brightness step in the final image.',
          },
          {
            title: 'Use an intervalometer with almost no gap',
            detail:
              'Continuous shooting with the shortest possible interval between frames. Gaps between exposures appear as dashes in the trails rather than continuous lines.',
          },
          {
            title: 'Turn off long-exposure noise reduction',
            detail:
              'It doubles the time per frame by taking a matching dark frame after each one, which creates exactly the gaps you are trying to avoid.',
          },
          {
            title: 'Shoot for at least thirty minutes',
            detail:
              'Fifteen minutes gives short dashes. An hour gives obvious arcs. Two or more hours gives the sweeping circles people picture — and battery capacity, not patience, is usually the limit.',
          },
          {
            title: 'Stack on lighten mode',
            detail:
              'Dedicated star-trail software, or a lighten blend across the layers in any editor. The brightest pixel wins, so each star draws its own path.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Why this works from a bright sky',
        body:
          'Trail images are built from the brightest values rather than accumulated ones, so sky glow does not build up across the sequence the way it does in one long exposure. A moderately light-polluted sky still costs you the faintest stars, but the bright ones trail perfectly well — which makes star trails the one genuinely satisfying deep-night image that does not require leaving the city behind.',
      },
      {
        kind: 'points',
        heading: 'Practical things that ruin sequences',
        points: [
          {
            title: 'Battery death at minute forty',
            detail:
              'Long sequences drain batteries quickly, faster in cold. Use a dummy battery and power bank, or accept a shorter trail than you planned.',
          },
          {
            title: 'Dew on the front element',
            detail:
              'Trails fade progressively into a soft glow as the lens fogs. A simple dew heater strip or even a lens hood makes the difference on humid nights.',
          },
          {
            title: 'Someone walking through with a torch',
            detail:
              'One white light across the foreground appears in every subsequent frame as a bright streak. Brief anyone with you before you start.',
          },
          {
            title: 'Aircraft and satellites',
            detail:
              'Unavoidable, and they appear as straight lines cutting across the arcs. Removing the worst few frames, or a little cloning, is normal practice.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How long should a star trail sequence be?',
        answer:
          'At least thirty minutes for visible arcs, an hour for a clearly circular pattern around Polaris, and two hours or more for dramatic sweeping circles. Because you stack afterwards, you can always shoot longer and use fewer frames.',
      },
      {
        question: 'Can star trails be shot from a city?',
        answer:
          'Yes, better than almost any other night-sky subject. Stacking on brightest-pixel means sky glow does not accumulate across the sequence. You lose the faintest stars, so the trails are sparser than from a dark site, but the technique works.',
      },
      {
        question: 'Why do my star trails look like dashed lines?',
        answer:
          'Gaps between frames. Either the interval between exposures is too long, or in-camera long-exposure noise reduction is inserting a dark frame after every shot. Turn it off and set the interval as short as the camera allows.',
      },
    ],
    experiences: [LADAKH_EXPERIENCE, WORKSHOP_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/beginners-guide',
      'astrophotography/milky-way',
      'astrophotography/light-pollution',
    ],
    cta: FIELD_CTA,
    updated: UPDATED,
  },

  /* --------------------------------------------------------------- FROM DELHI */
  {
    slug: 'astrophotography/from-delhi',
    cluster: 'astrophotography',
    title: 'Astrophotography From Delhi — What Is Genuinely Possible',
    description:
      'Imaging from one of India’s brightest skies: which targets work from a Delhi rooftop, how narrowband changes the maths, the best months, and where to go when the city is not enough.',
    h1: 'Astrophotography from Delhi',
    eyebrow: 'Delhi',
    lede:
      'Delhi is close to the worst sky in the country to photograph from, and a surprisingly good place to learn in. The constraint forces you to understand what you are doing — which is why a photographer trained here is usually formidable anywhere else.',
    keywords: [
      'astrophotography Delhi',
      'astrophotography workshop Delhi',
      'deep sky astrophotography Delhi',
      'astrophotography from home India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The sky you are working with',
        body: [
          'Delhi sits at roughly Bortle 8–9. On a typical night the naked eye reaches a few dozen stars, the Milky Way is entirely absent, and the sky background in a photograph saturates within seconds rather than minutes. Winter compounds it: from about mid-November into January, haze and particulate load frequently make the sky unusable even when it is technically cloudless.',
          'None of that affects the Moon, the planets or the Sun. All of it affects everything else. And the useful realisation is that this is not a binary — narrowband imaging changes which side of the line emission nebulae fall on, and it does so decisively.',
        ],
      },
      {
        kind: 'table',
        heading: 'What to attempt from a Delhi rooftop',
        columns: ['Target', 'Verdict', 'Approach'],
        rows: [
          [
            'The Moon',
            'Excellent, any night',
            'High-frame-rate video capture and stacking the sharpest frames. The city is irrelevant here',
          ],
          [
            'Jupiter, Saturn, Mars, Venus',
            'Excellent when they are well placed',
            'Video capture at high magnification; wait for the planet to be high, where the air is steadier',
          ],
          [
            'The Sun',
            'Excellent, with proper full-aperture filtration',
            'A daytime project — sunspots and the solar disc, entirely unaffected by light pollution',
          ],
          [
            'Emission nebulae',
            'Genuinely achievable',
            'Narrowband or dual-band filtering, short sub-exposures, many hours of integration across several nights',
          ],
          [
            'Bright star clusters',
            'Partly — the brighter members only',
            'Broadband, so the sky competes directly. Worth doing, with tempered expectations',
          ],
          [
            'Galaxies',
            'Realistically no',
            'Broad-spectrum and faint. This is what the trip out of the city is for',
          ],
          [
            'Milky Way nightscapes',
            'No',
            'Requires a genuinely dark sky. There is no technique that recovers this from Delhi',
          ],
        ],
      },
      {
        kind: 'points',
        heading: 'How Delhi imagers actually work',
        points: [
          {
            title: 'Narrowband as the default',
            detail:
              'A dual-band Hα/OIII filter on a colour camera, or separate narrowband filters on mono. This is the decision that makes deep-sky work possible here at all, rather than an accessory.',
          },
          {
            title: 'Short subs, many nights',
            detail:
              'A bright sky saturates the background quickly, so short exposures repeated over several nights beat long ones. Urban imaging is a project discipline measured in weeks.',
          },
          {
            title: 'Shoot high, away from the horizon',
            detail:
              'Targets overhead pass through the least atmosphere and the least accumulated city glow. Anything within thirty degrees of a Delhi horizon is fighting a losing battle.',
          },
          {
            title: 'Fight the light on your own roof first',
            detail:
              'Neighbouring security lights, stairwell bulbs and reflective walls do more damage than the city dome. Screening them is free and is the highest-return thing most urban imagers never do.',
          },
          {
            title: 'Use the Moon rather than losing to it',
            detail:
              'Hα data holds up under moonlight remarkably well. Bright nights become hydrogen-collection nights instead of wasted ones, which roughly doubles a Delhi imager’s usable calendar.',
          },
        ],
      },
      {
        kind: 'table',
        heading: 'The Delhi imaging year',
        columns: ['Period', 'Conditions', 'Best used for'],
        rows: [
          ['Late Feb – April', 'The clearest, most stable stretch of the year', 'Deep-sky projects and planetary work'],
          ['May – June', 'Very clear but hot, with dust and haze on some nights', 'Late-night deep-sky; solar in the mornings'],
          ['July – September', 'Monsoon — mostly lost to cloud', 'Processing backlog, equipment work, planning'],
          ['Oct – early Nov', 'A reliable pre-winter window', 'The main deep-sky season and any imaging trip'],
          ['Mid-Nov – Jan', 'Severe haze; often unusable even when cloudless', 'Lunar and planetary work on the clear nights'],
        ],
      },
      {
        kind: 'callout',
        title: 'Where Delhi imagers go when the city runs out',
        body:
          'The nearest genuinely darker skies are a few hours away in the Aravalli country around Alwar and Tijara, or further west at Sambhar in Rajasthan — an honest rural Bortle 4 in both cases, where the Milky Way returns to the naked eye on a clear moonless night. It is not a Himalayan sky and should not be sold as one, but for a photographer who has only ever imaged from a rooftop it is a different planet.',
      },
    ],
    faqs: [
      {
        question: 'Can you really do deep-sky astrophotography from Delhi?',
        answer:
          'For emission nebulae, yes — narrowband filtering isolates their light from the city’s and makes serious images achievable from a rooftop. Galaxies and Milky Way nightscapes are not realistically possible from a Bortle 8–9 sky and require travel.',
      },
      {
        question: 'What is the best month for astrophotography in Delhi?',
        answer:
          'Late February to April, and October to early November. The monsoon removes July to September, and the mid-November to January haze frequently makes otherwise clear nights unusable for faint targets.',
      },
      {
        question: 'Is there an astrophotography workshop in Delhi?',
        answer:
          'Yes — Astris runs the Delhi Deep-Sky Astrophotography Workshop, a two-night hands-on programme covering the full narrowband and deep-sky workflow from a heavily light-polluted urban sky, scheduled across September and October 2026. The fee is shared on enquiry.',
      },
      {
        question: 'What equipment do I need to start imaging from Delhi?',
        answer:
          'For the Moon and planets, a telescope and a camera capable of video capture. For deep-sky work, a tracking mount comes first, then a dual-band narrowband filter, then optics. The mount and the filter matter more here than the telescope does.',
      },
    ],
    experiences: [WORKSHOP_EXPERIENCE, LADAKH_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/narrowband',
      'astrophotography/light-pollution',
      'astrophotography/deep-sky',
    ],
    cta: WORKSHOP_CTA,
    updated: UPDATED,
  },

  /* ------------------------------------------------------------------- INDIA */
  {
    slug: 'astrophotography/india',
    cluster: 'astrophotography',
    title: 'Astrophotography in India — Where, When and How the Country Actually Shoots',
    description:
      'The Indian astrophotographer’s planning guide: how the monsoon shapes the year, which regions stay clear when, and how latitude changes what you can reach.',
    h1: 'Astrophotography in India — where and when',
    eyebrow: 'India',
    lede:
      'Indian astrophotography is governed by two things that most international guides do not account for: a monsoon that removes the best months of the galactic-core season, and a range of latitudes and altitudes wide enough that "when to shoot" has different answers in different states.',
    keywords: [
      'astrophotography India',
      'best places for astrophotography India',
      'astrophotography season India',
      'dark sky astrophotography India',
    ],
    sections: [
      {
        kind: 'prose',
        heading: 'The monsoon is the defining constraint',
        body: [
          'Across most of the country, the south-west monsoon covers roughly June or July through September. That is not a minor inconvenience — it coincides almost exactly with the period when the galactic core sits highest and longest in the night sky. The single most consequential fact in Indian astrophotography is that the best sky of the year happens under the worst weather of the year.',
          'There is one significant exception, and it shapes where serious Indian astrophotography happens. The trans-Himalayan regions — Ladakh, and Spiti in Himachal — sit in the rain shadow beyond the main Himalayan range. The monsoon largely does not reach them. They stay clear, at high altitude, with very little atmosphere and almost no light pollution, precisely while the plains are under cloud.',
          'That is why expeditions run there in exactly the window when nowhere else in the country is usable, and why the Indian astrophotography calendar looks so different from the Northern Hemisphere norm.',
        ],
      },
      {
        kind: 'table',
        heading: 'Where the country is clear, and when',
        columns: ['Region', 'Best window', 'Character'],
        rows: [
          [
            'Ladakh',
            'Roughly June to September',
            'Very high altitude, thin dry air, extremely dark skies, clear through the monsoon. The most capable sky in the country',
          ],
          [
            'Spiti (Himachal)',
            'Roughly June to September',
            'Also in the rain shadow: high, dry and dark, with the same monsoon-window advantage',
          ],
          [
            'Rajasthan and the north-west',
            'October to March',
            'Dry, wide horizons and accessible from the NCR. Rural sites are an honest Bortle 4 rather than wilderness dark',
          ],
          [
            'The Himalayan foothills',
            'October to November, and February to April',
            'Good transparency between the monsoon and the winter, with altitude helping and valley haze hurting',
          ],
          [
            'The Deccan and the south',
            'December to March',
            'The core sits higher from lower latitudes, and the post-monsoon months are stable',
          ],
          [
            'The major cities',
            'Year-round for Moon, planets and narrowband',
            'Bortle 8–9. Nightscapes are out; nebulae are reachable with filtering',
          ],
        ],
        note:
          'Regional weather varies far more than a table can express — the north-east monsoon, local topography and altitude all shift these windows. Treat this as a planning starting point.',
      },
      {
        kind: 'points',
        heading: 'What Indian latitudes give you',
        points: [
          {
            title: 'A well-placed galactic core',
            detail:
              'India sits at latitudes where the core rises high — considerably better than most of Europe or North America. When the weather cooperates, the geometry is genuinely favourable.',
          },
          {
            title: 'Access to southern-sky objects',
            detail:
              'From southern India, targets that never clear the horizon from northern latitudes become reachable. Latitude is a real astrophotographic asset and it is rarely exploited.',
          },
          {
            title: 'Extreme altitude within reach',
            detail:
              'Very few countries offer sites this high, this dry and this dark on a road. It is the single biggest structural advantage Indian astrophotography has.',
          },
          {
            title: 'And a hard constraint',
            detail:
              'Light pollution is growing quickly around every Indian city, and the buffer of genuinely dark sky within a few hours of the major metros is shrinking year on year.',
          },
        ],
      },
      {
        kind: 'callout',
        title: 'Plan around the Moon before anything else',
        body:
          'Whatever the region, the lunar cycle overrides it. A pristine Ladakh sky under a bright Moon delivers less faint-object data than a mediocre site on a moonless night. Fix the new-Moon window first, then choose the location, then hope for the weather — in that order. It is the discipline that separates photographers who come back with data from those who come back with anecdotes.',
      },
    ],
    faqs: [
      {
        question: 'Where is the best place for astrophotography in India?',
        answer:
          'Ladakh and Spiti, on the strength of altitude, dry air, minimal light pollution and — crucially — clear skies through the monsoon months when the galactic core is best placed. Rajasthan and the north-west are the most practical option in the October-to-March window.',
      },
      {
        question: 'Why do astrophotography expeditions in India run during the monsoon?',
        answer:
          'Because the trans-Himalayan regions sit in the rain shadow and stay clear while the rest of the country is under cloud — and that period coincides with the best placement of the galactic core. It is the one window where sky and weather align.',
      },
      {
        question: 'Is there anywhere dark near the major Indian cities?',
        answer:
          'Within a few hours, mostly honest rural Bortle 4 sites rather than pristine skies — the Aravalli country beyond the NCR, or Sambhar in Rajasthan. That is a large improvement over a Bortle 8–9 city and enough for naked-eye Milky Way on a clear moonless night, but it is not a Himalayan sky.',
      },
    ],
    experiences: [LADAKH_EXPERIENCE, WORKSHOP_EXPERIENCE],
    related: [
      'astrophotography',
      'astrophotography/milky-way',
      'stargazing/dark-sky-places-india',
      'stargazing/best-time-india',
    ],
    cta: FIELD_CTA,
    updated: UPDATED,
  },
]
