import type { Metadata } from 'next'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import { CONJUNCTION_DEG, CLOSE_CONJUNCTION_DEG } from '@/lib/astronomy/events'
import { DEFAULT_MIN_ALTITUDE } from '@/lib/astronomy/observer'

const TITLE = 'How Astris Calculates the Sky — Methodology & Sources'
const DESCRIPTION =
  'The ephemeris, thresholds and assumptions behind the Astris Stargazing Calendar, including what it deliberately does not claim to know.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/stargazing-calendar/methodology' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION },
}

export default function MethodologyPage() {
  return (
    <LegalPage
      title="How we calculate the sky"
      standfirst="Every number in the calendar comes from an ephemeris and your coordinates. This page says which, with what assumptions, and where the limits are."
    >
      <Clause heading="The ephemeris">
        <p>
          Positions come from <span className="text-white/85">astronomy-engine</span>, which derives
          from the VSOP87 planetary theory and the NOVAS reference implementation used by the US
          Naval Observatory. Planetary positions are accurate to roughly one arcminute over the
          years this calendar covers — far finer than anything that affects whether you can see
          something.
        </p>
        <p>
          We validate it rather than trust it. The 7 September 2025 total lunar eclipse resolves to
          its published greatest-eclipse time, and the Sun&rsquo;s altitude at the June solstice
          matches the geometric identity 90° − |latitude − 23.44°| to within a hundredth of a
          degree. These checks run as automated tests.
        </p>
      </Clause>

      <Clause heading="Everything is topocentric">
        <p>
          Calculations use your latitude, longitude and elevation — not a national average. India
          spans about 27° of latitude and 29° of longitude, which is enough that the Sun sets nearly
          an hour and a half earlier in Port Blair than in Jaisalmer despite the shared clock, and
          enough that an object comfortably placed in Chennai can be below the horizon in Leh.
        </p>
        <p>
          Rise and set times include atmospheric refraction at the standard value, which is why the
          Sun appears to rise slightly before it geometrically does.
        </p>
      </Clause>

      <Clause heading="Occurring is not the same as visible">
        <p>
          This is the distinction the calendar exists to make. A lunar eclipse with the Moon below
          your horizon is, for you, nothing at all — so it is labelled &ldquo;the eclipse happens,
          but not in this sky&rdquo; rather than being listed as an event you can watch.
        </p>
        <p>
          Solar eclipses use local circumstances computed for your exact coordinates, never a
          blanket &ldquo;visible in India&rdquo;. If only a partial phase reaches you, the page says
          so and gives the fraction of the Sun covered.
        </p>
      </Clause>

      <Clause heading="Thresholds we chose">
        <ul className="mt-2 space-y-2">
          <li>
            <span className="text-white/85">Minimum altitude {DEFAULT_MIN_ALTITUDE}°.</span> Below
            about 10° you are looking through more than five atmospheres of haze and whatever sits
            on your horizon. You can change it to 5°, 15°, 20° or 30°.
          </li>
          <li>
            <span className="text-white/85">Conjunction ≤ {CONJUNCTION_DEG}°</span>, and
            &ldquo;close&rdquo; at ≤ {CLOSE_CONJUNCTION_DEG}°. There is no official definition; these
            are ours, applied uniformly.
          </li>
          <li>
            <span className="text-white/85">Astronomical darkness</span> is the Sun below −18°.
            Civil is −6° and nautical −12°; all three are shown.
          </li>
          <li>
            <span className="text-white/85">Event importance</span> follows a rule, not taste: total
            and annular eclipses, showers with ZHR ≥ 100, conjunctions under 1°, and oppositions of
            Mars, Jupiter and Saturn are &ldquo;major&rdquo;.
          </li>
        </ul>
      </Clause>

      <Clause heading="Meteor rates are not ZHR">
        <p>
          Zenithal Hourly Rate is a normalised figure: what one observer would count under a
          perfect sky with the radiant overhead. Nobody ever observes under those conditions.
        </p>
        <p>
          We correct it for the two effects we can actually compute — the radiant&rsquo;s altitude
          from your location, and moonlight while the Moon is up — and we say so. Cloud, haze,
          local light pollution and your own experience all subtract further, so the number shown
          is an optimistic ceiling rather than a promise.
        </p>
      </Clause>

      <Clause heading="What the sky score is, and is not">
        <p>
          A 0–100 figure built from moon interference (45), length of astronomical darkness (25),
          planets above your minimum altitude (15), and notable events (15). Every component is
          shown with its reasoning on each day&rsquo;s detail panel.
        </p>
        <p>
          It contains <span className="text-white/85">no weather</span>. Cloud is the thing most
          likely to ruin a night, and we have no forecast for it — folding an unmeasured factor
          into a measured score would make the whole number dishonest. The score describes the sky,
          not the weather and not the site.
        </p>
      </Clause>

      <Clause heading="What we do not know">
        <p>
          <span className="text-white/85">Light pollution.</span> We hold no measured sky-brightness
          data for these locations, so no Bortle class is shown for any of them. A plausible-looking
          number per city would be invention, and it would be the number people trusted most.
        </p>
        <p>
          <span className="text-white/85">Weather.</span> Not integrated. When it is, it will be
          reported separately from the astronomical score rather than blended into it.
        </p>
        <p>
          <span className="text-white/85">Occultations.</span> Lunar occultations of stars are not
          yet calculated. They need arcsecond-accurate predictions and lunar limb profiles to be
          worth publishing, and a rough answer would be worse than none.
        </p>
      </Clause>

      <Clause heading="Times and dates">
        <p>
          All times are Indian Standard Time (UTC+5:30). India observes no daylight saving, but the
          engine works in UTC internally and converts on display, so it stays correct regardless.
        </p>
        <p>
          A night is labelled by the date it begins. &ldquo;Friday night&rdquo; includes the small
          hours of Saturday, which is when most of the observing actually happens.
        </p>
      </Clause>
    </LegalPage>
  )
}
