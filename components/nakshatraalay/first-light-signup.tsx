'use client'

import { useState } from 'react'
import { Check, AlertCircle, MessageCircle } from 'lucide-react'

import { firstLightHref } from '@/lib/nakshatraalay-data'

/**
 * First Light waitlist.
 *
 * WHERE THE SIGNUP GOES
 * ---------------------
 * This site has no database, so the list is built by email: the form posts
 * client-side to FormSubmit, the same delivery path the Astroventure booking
 * form already uses successfully (FormSubmit blocks datacenter IPs, so the
 * browser is the reliable caller). WhatsApp is offered alongside for anyone
 * who would rather just message.
 *
 * Consent is a separate, unticked checkbox rather than something inferred
 * from pressing the button, and what was agreed to is written into the email.
 */

const INTERESTS = [
  'Stargazing',
  'Astrophotography',
  'Weekend stay',
  'Family experience',
  'Couple experience',
  'Astronomy workshops',
] as const

export default function FirstLightSignup() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [interests, setInterests] = useState<string[]>([])

  function toggle(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    )
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    const form = new FormData(event.currentTarget)
    // Honeypot — bots fill it, people don't.
    if (String(form.get('company') ?? '')) {
      setStatus('done')
      return
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/astriseducation@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nakshatraalay First Light — ${form.get('name') || 'new signup'}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: String(form.get('email') ?? ''),
          Name: String(form.get('name') ?? ''),
          Email: String(form.get('email') ?? ''),
          Phone: String(form.get('phone') ?? '') || '—',
          City: String(form.get('city') ?? '') || '—',
          Interests: interests.length ? interests.join(', ') : '—',
          'Marketing consent': form.get('marketingOptIn') === 'on' ? 'Yes' : 'No',
          Source: 'Nakshatraalay First Light waitlist',
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean }
      const ok = res.ok && (json.success === true || json.success === 'true')
      if (!ok) throw new Error('We couldn’t add you just now. Please try again, or message us.')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
          <Check size={26} />
        </span>
        <h3 className="font-display mt-5 text-2xl font-semibold text-white">You&rsquo;re on the list</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">
          We&rsquo;ll write to you when First Light has a date — and again when the first nights
          open. Nothing else.
        </p>
      </div>
    )
  }

  const field =
    'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/40 focus:bg-white/[0.07]'
  const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="fl-company">Company</label>
        <input id="fl-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="fl-name">Name</label>
          <input id="fl-name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="fl-email">Email</label>
          <input id="fl-email" name="email" type="email" required className={field} placeholder="you@email.com" />
        </div>
        <div>
          <label className={label} htmlFor="fl-phone">
            Phone <span className="normal-case text-white/30">(optional)</span>
          </label>
          <input id="fl-phone" name="phone" type="tel" className={field} placeholder="+91 …" />
        </div>
        <div>
          <label className={label} htmlFor="fl-city">
            City <span className="normal-case text-white/30">(optional)</span>
          </label>
          <input id="fl-city" name="city" className={field} placeholder="Gurgaon" />
        </div>
      </div>

      <fieldset>
        <legend className={label}>What should we tell you about?</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => {
            const active = interests.includes(interest)
            return (
              <button
                type="button"
                key={interest}
                onClick={() => toggle(interest)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? 'border-white bg-white text-black'
                    : 'border-white/20 text-white/70 hover:border-white/45 hover:text-white'
                }`}
              >
                {interest}
              </button>
            )
          })}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-white/65">
        <input
          type="checkbox"
          name="marketingOptIn"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 accent-[var(--av-gold)]"
        />
        <span>
          Email me about First Light, new experiences and notable nights in the sky. We don&rsquo;t
          share your details, and you can unsubscribe any time.
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <AlertCircle size={15} /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Adding you…' : 'Join the First Light list'}
      </button>

      <p className="text-center text-xs text-white/40">
        Or{' '}
        <a
          href={firstLightHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[var(--av-gold)] underline-offset-2 hover:underline"
        >
          <MessageCircle size={12} /> message us on WhatsApp
        </a>
      </p>
    </form>
  )
}
