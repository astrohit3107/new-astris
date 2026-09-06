import { MapPin, Navigation, Star } from 'lucide-react'

import { MAPS, NAKSHATRAALAY } from '@/lib/nakshatraalay-data'

/**
 * Where we actually are.
 *
 * Everything here is addressed by the coordinates on our Google Business
 * listing, so the pin, the directions link and the structured data cannot
 * disagree with each other or with what a guest sees in the Maps app.
 *
 * The map is loaded lazily: it is a third-party frame that sets cookies, and
 * it should not cost anything on a page view that never scrolls this far.
 */
export default function FindUs() {
  return (
    <section id="find-us" className="scroll-mt-16 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
          Find us
        </p>
        <h2 className="font-display mt-4 text-balance text-3xl font-light leading-tight sm:text-4xl">
          We are on the map
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/60">
          Search <span className="text-white/85">{MAPS.placeName}</span> in Google Maps, or open the
          listing straight from here. Everything from Delhi NCR is a drive, not a flight.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03]">
            <iframe
              src={MAPS.embedUrl}
              title={`Map showing ${MAPS.placeName} in ${NAKSHATRAALAY.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[340px] w-full border-0 sm:h-[420px]"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--av-gold)] ring-1 ring-[var(--av-gold)]/25">
                <Star size={11} /> Listed on Google
              </span>

              <h3 className="mt-5 text-lg font-semibold text-white">{MAPS.placeName}</h3>
              <p className="mt-1 text-sm text-white/55">
                {NAKSHATRAALAY.city}, {NAKSHATRAALAY.region}
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="shrink-0 pt-0.5 text-white/40">
                    <MapPin size={15} />
                  </dt>
                  <dd className="text-white/65">
                    Exact coordinates{' '}
                    <span className="font-mono text-xs text-white/80">
                      {NAKSHATRAALAY.latitude}, {NAKSHATRAALAY.longitude}
                    </span>
                    <span className="mt-1 block text-xs text-white/40">
                      Drop these into any navigation app if you lose signal on the approach.
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={MAPS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-[#0b0b14] transition hover:brightness-110"
              >
                <Navigation size={15} /> Get directions
              </a>
              <a
                href={MAPS.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition hover:border-white/40 hover:bg-white/5"
              >
                <MapPin size={15} /> Open the Google listing
              </a>
              <p className="mt-1 text-center text-[11px] leading-relaxed text-white/35">
                Been to a session? A review on the listing genuinely helps people find us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
