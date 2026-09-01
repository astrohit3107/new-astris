import { MessageCircle, Check } from 'lucide-react'

/**
 * Shared layout for the two enquiry-led pages (groups, schools). Both convert
 * the same way — a WhatsApp message with the brief already written in — so the
 * markup lives here once.
 */
export default function LeadPage({
  eyebrow,
  heading,
  intro,
  points,
  ctaLabel,
  ctaHref,
  footnote,
}: {
  eyebrow: string
  heading: string
  intro: string
  points: { title: string; detail: string }[]
  ctaLabel: string
  ctaHref: string
  footnote?: string
}) {
  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <section className="border-b border-white/10 px-5 pb-14 pt-32 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">{eyebrow}</p>
          <h1 className="font-display mt-5 text-balance text-4xl font-light leading-tight sm:text-6xl">
            {heading}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/65">{intro}</p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            <MessageCircle size={16} /> {ctaLabel}
          </a>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <h2 className="font-display flex items-center gap-2 text-lg font-semibold">
                <Check size={16} className="text-[var(--av-gold)]" /> {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.detail}</p>
            </div>
          ))}
        </div>
        {footnote && (
          <p className="mx-auto mt-10 max-w-4xl text-xs leading-relaxed text-white/35">{footnote}</p>
        )}
      </section>
    </main>
  )
}
