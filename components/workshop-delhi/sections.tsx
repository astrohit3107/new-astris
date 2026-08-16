import {
  ArrowRight,
  ChevronDown,
  Check,
  Lightbulb,
  Filter as FilterIcon,
  Sparkles,
  Instagram,
  Globe,
} from 'lucide-react'
import Starfield from '@/components/astroventure/starfield'
import WorkshopIcon from './icon'
import {
  WORKSHOP,
  WORKSHOP_IMAGES,
  WORKSHOP_TRAINER,
  workshopHeroFacts,
  WORKSHOP_PROMISE_LEAD,
  WORKSHOP_PROMISE_BODY,
  workshopOutcomes,
  narrowbandFilters,
  WORKSHOP_NARROWBAND_NOTE,
  workshopWorkflow,
  workshopCurriculum,
  workshopAudience,
  workshopIncluded,
  workshopBring,
  WORKSHOP_EQUIPMENT_NOTE,
} from '@/lib/workshop-delhi-data'

/* ============================ HERO ============================ */
export function WorkshopHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--av-deep)] pt-20">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source srcSet={WORKSHOP_IMAGES.heroMobile} media="(max-width: 1024px)" />
          <img
            src={WORKSHOP_IMAGES.hero}
            alt="A deep-sky astrophotographer's night sky"
            fetchPriority="high"
            className="animate-drift h-full w-full object-cover object-center"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[var(--av-deep)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--av-deep)_92%)]" />
      <Starfield count={70} />

      <div className="relative z-20 mx-auto max-w-4xl px-5 py-16 text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)] animate-pulse-glow" />
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/85">
            {WORKSHOP.positioning}
          </span>
        </div>

        <h1
          className="animate-fade-in-up font-display mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          {WORKSHOP.headingLead}
          <span className="block italic text-[var(--av-gold)]">{WORKSHOP.headingAccent}</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/85 sm:text-xl"
          style={{ animationDelay: '0.18s' }}
        >
          {WORKSHOP.subheading}
        </p>
        <p
          className="animate-fade-in-up mx-auto mt-3 max-w-2xl text-pretty text-sm font-light leading-relaxed text-white/60 sm:text-base"
          style={{ animationDelay: '0.24s' }}
        >
          {WORKSHOP.intro}
        </p>

        <div
          className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '0.32s' }}
        >
          <a
            href="#book"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] sm:w-auto"
          >
            Request a Seat
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#curriculum"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 sm:w-auto"
          >
            See the curriculum
          </a>
        </div>

        {/* Fact chips */}
        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: '0.4s' }}
        >
          {workshopHeroFacts.map((f) => (
            <span
              key={f.value}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/80 backdrop-blur-sm"
            >
              <WorkshopIcon name={f.icon} size={13} className="text-[var(--av-gold)]" />
              {f.value}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#overview"
        aria-label="Scroll to overview"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/50 transition-colors hover:text-white"
      >
        <ChevronDown size={26} className="animate-bounce" />
      </a>
    </section>
  )
}

/* ========================== PROMISE ========================== */
export function WorkshopPromise() {
  return (
    <section id="overview" className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> The core promise
          </span>
          <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {WORKSHOP_PROMISE_LEAD}
          </h2>
          <p className="mt-5 text-pretty text-base font-light leading-relaxed text-white/65">
            {WORKSHOP_PROMISE_BODY}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="glass rounded-3xl p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/70 ring-1 ring-white/10">
              <Lightbulb size={20} />
            </span>
            <h3 className="mt-4 font-semibold text-white">The urban problem</h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
              City light pollution is broadband — it floods the whole spectrum and buries faint
              deep-sky objects under an orange glow. Ordinary imaging from Delhi barely records them.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/[0.06] p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--av-gold)]/15 text-[var(--av-gold)] ring-1 ring-[var(--av-gold)]/20">
              <FilterIcon size={20} />
            </span>
            <h3 className="mt-4 font-semibold text-white">The narrowband answer</h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
              Narrowband filters accept only the few wavelengths nebulae emit at and reject the rest
              of the city’s glow — so the deep sky reappears, even from Delhi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================== OUTCOMES ========================== */
export function WorkshopOutcomes() {
  return (
    <section
      id="outcomes"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> What you will learn
          </span>
          <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            By the end of the weekend, you will understand
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workshopOutcomes.map((o, i) => (
            <li
              key={o}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25"
            >
              <span className="font-display text-lg font-semibold text-[var(--av-gold)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-relaxed text-white/75">{o}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ========================= NARROWBAND ========================= */
export function WorkshopNarrowband() {
  return (
    <section id="narrowband" className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src={WORKSHOP_IMAGES.introMilkyWay}
              alt="A wide-field deep-sky image of emission nebulae"
              loading="lazy"
              className="h-full max-h-[26rem] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)]/70 to-transparent" />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
              <span className="h-px w-6 bg-[var(--av-gold)]/60" /> Why narrowband works
            </span>
            <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Three wavelengths that beat the city
            </h2>
            <p className="mt-4 text-pretty text-sm font-light leading-relaxed text-white/65">
              {WORKSHOP_NARROWBAND_NOTE}
            </p>

            <div className="mt-7 space-y-3">
              {narrowbandFilters.map((f) => (
                <div
                  key={f.symbol}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--av-gold)]/12 text-sm font-semibold text-[var(--av-gold)] ring-1 ring-[var(--av-gold)]/20">
                    {f.symbol}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {f.name}{' '}
                      <span className="font-normal text-white/45">· {f.captures}</span>
                    </h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-white/60">{f.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================== WORKFLOW ========================== */
export function WorkshopWorkflow() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> The complete workflow
          </span>
          <h2 className="font-display mt-4 text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
            From raw sky to a finished deep-sky image
          </h2>
        </div>

        <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {workshopWorkflow.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm ${
                  i === workshopWorkflow.length - 1
                    ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/10 text-[var(--av-gold)]'
                    : 'border-white/15 bg-white/[0.04] text-white/80'
                }`}
              >
                {step}
              </span>
              {i < workshopWorkflow.length - 1 && (
                <ArrowRight size={15} className="shrink-0 text-white/30" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ========================= CURRICULUM ========================= */
export function WorkshopCurriculum() {
  return (
    <section id="curriculum" className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> The workshop
          </span>
          <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Two days, eight sessions, one finished image
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-white/60">
            {WORKSHOP.format}.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {workshopCurriculum.map((day) => (
            <div key={day.day}>
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-[var(--av-gold)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  {day.day}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{day.title}</h3>
              </div>

              <div className="relative space-y-3 border-l border-white/12 pl-6">
                {day.sessions.map((s) => (
                  <div
                    key={s.tag}
                    className={`relative rounded-2xl border p-5 transition-colors duration-300 ${
                      s.live
                        ? 'border-[var(--av-gold)]/40 bg-[var(--av-gold)]/[0.06]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`absolute -left-[1.85rem] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--av-deep)] ${
                        s.live ? 'bg-[var(--av-gold)]' : 'bg-white/40'
                      }`}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${
                          s.live ? 'text-[var(--av-gold)]' : 'text-white/45'
                        }`}
                      >
                        {s.tag}
                      </span>
                      {s.live && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--av-gold)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--av-gold)]">
                          <Sparkles size={10} /> Live
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1.5 font-semibold text-white">{s.title}</h4>
                    {s.body && (
                      <p className="mt-2 text-sm font-light leading-relaxed text-white/65">{s.body}</p>
                    )}
                    {s.points && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========================== TRAINER ========================== */
export function WorkshopTrainer() {
  const t = WORKSHOP_TRAINER
  return (
    <section
      id="trainer"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_1fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/10">
            <img
              src={t.portrait}
              alt={`${t.name}, ${t.title}`}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="font-display text-xl font-semibold text-white">{t.name}</p>
              <p className="text-xs text-[var(--av-gold)]">{t.title}</p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
              <span className="h-px w-6 bg-[var(--av-gold)]/60" /> Your trainer
            </span>
            <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {t.name}
            </h2>
            <p className="mt-4 text-pretty text-base font-light leading-relaxed text-white/65">
              {t.bio}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/50">
              The same professional astrophotographer who leads our Astroventure Astrophotography
              expedition in Ladakh — here focused on pulling the deep sky out of an urban night.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
              {t.instagram && t.instagram !== '#' && (
                <a href={t.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/60 hover:text-white">
                  <Instagram size={15} /> Instagram
                </a>
              )}
              {t.website && t.website !== '#' && (
                <a href={t.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/60 hover:text-white">
                  <Globe size={15} /> Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================== AUDIENCE ========================== */
export function WorkshopAudience() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> Who it's for
          </span>
          <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Built for imagers, students and the seriously curious
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {workshopAudience.map((a) => (
            <div
              key={a.value}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/25"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[var(--av-gold)] ring-1 ring-white/10">
                <WorkshopIcon name={a.icon} size={18} />
              </span>
              <span className="text-sm font-medium text-white/85">{a.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========================== INCLUDED ========================== */
export function WorkshopIncluded() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold text-white">What’s included</h3>
            <ul className="mt-5 space-y-3.5">
              {workshopIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                  <span className="text-sm leading-relaxed text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold text-white">What to bring</h3>
            <ul className="mt-5 space-y-3.5">
              {workshopBring.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/60">
                    •
                  </span>
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 flex items-start justify-center gap-2.5 rounded-2xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.06] px-5 py-4 text-center text-sm font-light leading-relaxed text-white/80">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
          {WORKSHOP_EQUIPMENT_NOTE}
        </p>
      </div>
    </section>
  )
}
