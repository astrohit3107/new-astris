'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Check,
  ShieldCheck,
  Send,
  AlertCircle,
  CalendarDays,
  Clock,
  IndianRupee,
  Phone,
} from 'lucide-react'
import { SPITI, SPITI_CONTACT } from '@/lib/spiti-data'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { cn } from '@/lib/utils'

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number')
    .regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email address'),
  city: z.string().trim().min(2, 'Enter your city'),
  participants: z.coerce.number().int().min(1, 'At least 1').max(20, 'Max 20 — contact us for groups'),
  boarding: z.string().min(1, 'Select a boarding point'),
  notes: z.string().max(1000).optional().or(z.literal('')),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept to continue' }) }),
  company: z.string().max(0).optional().or(z.literal('')), // honeypot
})

type FormValues = z.infer<typeof schema>

const inputCls =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-[var(--av-gold)]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[var(--av-gold)]/20'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55'
const errCls = 'mt-1 flex items-center gap-1 text-xs text-red-300'

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/astriseducation@gmail.com'

export default function SpitiBooking() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { participants: 1, boarding: '' },
  })

  const onSubmit = async (data: FormValues) => {
    setStatus('submitting')
    setErrorMsg('')

    if (data.company && data.company.length > 0) {
      setStatus('success')
      reset()
      return
    }

    const tier = SPITI.pricing.find((p) => p.id === data.boarding)

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Astroventure Spiti '26 booking — ${data.fullName}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: data.email,
          _honey: data.company || '',
          Expedition: SPITI.name,
          Dates: SPITI.dateLabel,
          'Full Name': data.fullName,
          Phone: data.phone,
          Email: data.email,
          City: data.city,
          Participants: String(data.participants),
          'Boarding Point': tier ? `${tier.route} — ${tier.amountLabel}` : data.boarding,
          Notes: data.notes || '—',
        }),
      })
      const json = await res.json().catch(() => ({} as { success?: string | boolean }))
      const ok = res.ok && (json.success === 'true' || json.success === true)
      if (!ok) throw new Error('Submission failed. Please try again or contact us directly.')
      setStatus('success')
      reset()
    } catch (e) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[var(--av-nebula)] opacity-15 blur-[130px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-72 w-72 rounded-full bg-[var(--av-aurora)] opacity-10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Premium booking header */}
        <ScrollReveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--av-gold)]">
            Limited Seats · Registrations Open
          </span>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Join India’s Most Premium Astronomy Expedition
          </h2>

          {/* Key facts */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85">
              <CalendarDays size={14} className="text-[var(--av-gold)]" /> {SPITI.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85">
              <Clock size={14} className="text-[var(--av-gold)]" /> {SPITI.durationLabel}
            </span>
          </div>

          {/* Pricing tiers */}
          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            {SPITI.pricing.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-left"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{p.route}</p>
                <p className="font-display mt-1 flex items-center gap-1 text-2xl font-semibold text-white">
                  <IndianRupee size={18} className="text-[var(--av-gold)]" />
                  {p.amountLabel.replace('₹', '')}
                </p>
                <p className="mt-1 text-xs text-white/50">{p.note}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Phone size={14} className="text-[var(--av-gold)]" />
            Prefer to talk? Call or WhatsApp{' '}
            <a
              href={`tel:${SPITI_CONTACT.bookingPhone.replace(/\s/g, '')}`}
              className="font-semibold text-[var(--av-gold)] underline-offset-2 hover:underline"
            >
              {SPITI_CONTACT.bookingPhone}
            </a>
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal className="mx-auto mt-12 max-w-2xl">
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                  <Check size={32} />
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold text-white">
                  Booking request received!
                </h3>
                <p className="mt-2 max-w-md text-sm font-light text-white/65">
                  Thank you for reserving your seat on Astroventure Spiti ’26. Our team will reach out
                  within 24 hours to confirm availability and the next steps.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company (leave blank)</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="fullName">Full name</label>
                    <input id="fullName" className={inputCls} placeholder="Your name" {...register('fullName')} />
                    {errors.fullName && <p className={errCls}><AlertCircle size={12} />{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">Phone</label>
                    <input id="phone" className={inputCls} placeholder="+91 ..." {...register('phone')} />
                    {errors.phone && <p className={errCls}><AlertCircle size={12} />{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">Email</label>
                    <input id="email" type="email" className={inputCls} placeholder="you@email.com" {...register('email')} />
                    {errors.email && <p className={errCls}><AlertCircle size={12} />{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="city">City</label>
                    <input id="city" className={inputCls} placeholder="Your city" {...register('city')} />
                    {errors.city && <p className={errCls}><AlertCircle size={12} />{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="participants">Participants</label>
                    <input id="participants" type="number" min={1} max={20} className={inputCls} {...register('participants')} />
                    {errors.participants && <p className={errCls}><AlertCircle size={12} />{errors.participants.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="boarding">Boarding point</label>
                    <select id="boarding" className={cn(inputCls, 'appearance-none')} defaultValue="" {...register('boarding')}>
                      <option value="" disabled className="bg-[var(--av-deep)]">Select a boarding point</option>
                      {SPITI.pricing.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[var(--av-deep)]">
                          {p.route} — {p.amountLabel}
                        </option>
                      ))}
                    </select>
                    {errors.boarding && <p className={errCls}><AlertCircle size={12} />{errors.boarding.message}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="notes">Anything we should know? <span className="font-normal normal-case text-white/35">(optional)</span></label>
                  <textarea id="notes" rows={3} className={inputCls} placeholder="Dietary needs, experience level, questions…" {...register('notes')} />
                </div>

                <label className="flex items-start gap-3 text-xs leading-relaxed text-white/65">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 accent-[var(--av-gold)]" {...register('consent')} />
                  <span>
                    I agree to be contacted about Astroventure Spiti ’26 and accept that seats are confirmed on a first-come basis.
                  </span>
                </label>
                {errors.consent && <p className={errCls}><AlertCircle size={12} />{errors.consent.message}</p>}

                {status === 'error' && (
                  <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle size={16} /> {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : 'Book My Seat'}
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/45">
                  <ShieldCheck size={13} className="text-[var(--av-gold)]" />
                  Your details are only used to plan your expedition.
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
