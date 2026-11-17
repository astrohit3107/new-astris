import { SAMBHAR_MENU } from '@/lib/sambhar-booking'

/** The property's menu for the night, as supplied. */
export default function SambharMenu() {
  return (
    <section id="menu" className="scroll-mt-20 px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-light text-white sm:text-4xl">What you eat</h2>
        <p className="mt-3 text-sm text-white/60">Included in every booking. Tell us about dietary needs when you book.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {SAMBHAR_MENU.map((m) => (
            <div key={m.meal} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--av-gold)]">{m.meal}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                {m.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
