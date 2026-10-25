'use client'

import { useRef, useState, type FormEvent } from 'react'
import { CLOSE, FORM_GRADES, FORM_ROLES } from '@/lib/astronomy-club-data'
import { CONTACT } from '@/lib/site-config'
import { clubTrack } from './motion'

/**
 * The demo request. Posts to /api/club-demo; whatever happens there, the
 * WhatsApp button below sends the same details as a pre-filled message, so a
 * principal is never stuck on a failed submit.
 */

type Fields = {
  name: string
  role: string
  school: string
  city: string
  phone: string
  email: string
  grades: string[]
  week: string
  message: string
}

const EMPTY: Fields = {
  name: '',
  role: '',
  school: '',
  city: '',
  phone: '',
  email: '',
  grades: [],
  week: '',
  message: '',
}

function whatsappText(f: Fields) {
  const lines = [
    "Hi Astris, I'd like to book a free assembly demo of the Astronomy Club for our school.",
    f.name && `Name: ${f.name}${f.role ? ` (${f.role})` : ''}`,
    f.school && `School: ${f.school}${f.city ? `, ${f.city}` : ''}`,
    f.grades.length && `Grades: ${f.grades.join(', ')}`,
    f.week && `Preferred demo week: ${f.week}`,
    f.email && `Email: ${f.email}`,
    f.message && `Message: ${f.message}`,
  ]
  return lines.filter(Boolean).join('\n')
}

const input =
  'mt-1.5 block w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-3 text-base text-white placeholder:text-white/35 focus:border-[#5CC6D6] focus:outline-none focus:ring-2 focus:ring-[#5CC6D6]/40'
const label = 'block text-sm font-medium text-white/85'

export default function DemoForm() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const renderedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((s) => ({ ...s, [k]: v }))
  const toggleGrade = (g: string) =>
    set('grades', f.grades.includes(g) ? f.grades.filter((x) => x !== g) : [...f.grades, g])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!e.currentTarget.reportValidity()) return
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/club-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          company: honeypot.current?.value ?? '',
          renderedAt: renderedAt.current,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.')
      clubTrack('club_form_submit', { role: f.role || 'unknown' })
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const wa = `https://wa.me/${CONTACT.phoneDigits}?text=${encodeURIComponent(whatsappText(f))}`

  if (status === 'done') {
    return (
      <div role="status" className="rounded-3xl border border-[#5CC6D6]/40 bg-[#0B7285]/20 p-8 text-center">
        <p className="club-display text-2xl font-bold text-white">{CLOSE.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate={false} className="space-y-5" aria-describedby="form-note">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cd-name" className={label}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input id="cd-name" required autoComplete="name" className={input} value={f.name} onChange={(e) => set('name', e.target.value)} maxLength={120} />
        </div>
        <div>
          <label htmlFor="cd-role" className={label}>
            Role <span aria-hidden="true">*</span>
          </label>
          <select
            id="cd-role"
            required
            className={`${input} appearance-none`}
            value={f.role}
            onChange={(e) => set('role', e.target.value)}
          >
            <option value="" disabled className="text-[#0E1A3A]">
              Choose one
            </option>
            {FORM_ROLES.map((r) => (
              <option key={r} value={r} className="text-[#0E1A3A]">
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cd-school" className={label}>
            School name <span aria-hidden="true">*</span>
          </label>
          <input id="cd-school" required autoComplete="organization" className={input} value={f.school} onChange={(e) => set('school', e.target.value)} maxLength={160} />
        </div>
        <div>
          <label htmlFor="cd-city" className={label}>
            City <span aria-hidden="true">*</span>
          </label>
          <input id="cd-city" required autoComplete="address-level2" className={input} value={f.city} onChange={(e) => set('city', e.target.value)} maxLength={80} />
        </div>
        <div>
          <label htmlFor="cd-phone" className={label}>
            Phone / WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input
            id="cd-phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9+\-\s()]{7,20}"
            className={input}
            value={f.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cd-email" className={label}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input id="cd-email" required type="email" autoComplete="email" className={input} value={f.email} onChange={(e) => set('email', e.target.value)} maxLength={160} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Grades you’d like to start with</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {FORM_GRADES.map((g) => {
            const on = f.grades.includes(g)
            return (
              <label
                key={g}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#5CC6D6] ${
                  on ? 'border-[#E8A33D] bg-[#E8A33D] text-[#0E1A3A]' : 'border-white/20 text-white/80 hover:border-white/40'
                }`}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleGrade(g)} />
                Grades {g}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cd-week" className={label}>
            Preferred demo week <span className="text-white/50">(optional)</span>
          </label>
          <input id="cd-week" placeholder="e.g. second week of December" className={input} maxLength={80} value={f.week} onChange={(e) => set('week', e.target.value)} />
        </div>
        <div className="sm:row-span-2">
          <label htmlFor="cd-message" className={label}>
            Message <span className="text-white/50">(optional)</span>
          </label>
          <textarea id="cd-message" rows={4} className={input} value={f.message} onChange={(e) => set('message', e.target.value)} maxLength={1000} />
        </div>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cd-company">Company</label>
        <input id="cd-company" ref={honeypot} tabIndex={-1} autoComplete="off" name="company" />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-[#E57373]/15 px-4 py-3 text-sm text-[#FFD2D2]">
          {error} You can also send these details on WhatsApp below.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="club-btn-primary justify-center disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Book my free demo'}
        </button>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => clubTrack('club_whatsapp_click', { from: 'form' })}
          className="club-btn-ghost justify-center"
        >
          Send these details on WhatsApp
        </a>
      </div>
      <p id="form-note" className="text-xs text-white/55">
        Fields marked * are required. We use your details only to arrange the demo.
      </p>
    </form>
  )
}
