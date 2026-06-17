'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, ShieldCheck, Send, AlertCircle } from 'lucide-react'
import { destinations, upcomingEvents, IMAGES, type DestinationSlug } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number')
    .regex(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email address'),
  age: z.coerce.number().int('Enter a valid age').min(5, 'Minimum age is 5').max(120, 'Enter a valid age'),
  city: z.string().trim().min(2, 'Enter your city'),
  participants: z.coerce.number().int().min(1, 'At least 1').max(20, 'Max 20 — contact us for groups'),
  destination: z.string().min(1, 'Select a destination'),
  preferredDate: z.string().min(1, 'Select a preferred date'),
  notes: z.string().max(1000).optional().or(z.literal('')),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept to continue' }) }),
  company: z.string().max(0).optional().or(z.literal('')), // honeypot
})

type FormValues = z.infer<typeof schema>

const inputCls =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-[var(--av-gold)]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[var(--av-gold)]/20'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/55'
const errCls = 'mt-1 flex items-center gap-1 text-xs text-red-300'

interface Props {
  defaultDestination?: DestinationSlug
}

export default function RegistrationForm({ defaultDestination }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      participants: 1,
      destination: defaultDestination ?? '',
      preferredDate: '',
    },
  })

  // Booking enquiries are emailed via FormSubmit straight from the browser
  // (their server endpoint blocks datacenter IPs, so client-side is required).
  // Delivered to astriseducation@gmail.com with eeshumtravels@gmail.com CC'd.
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/astriseducation@gmail.com'
  const NOTIFY_CC = 'eeshumtravels@gmail.com'

  const onSubmit = async (data: FormValues) => {
    setStatus('submitting')
    setErrorMsg('')

    // Honeypot — bots fill the hidden "company" field; drop silently.
    if (data.company && data.company.length > 0) {
      setStatus('success')
      reset()
      return
    }

    const destLabel =
      destinations.find((d) => d.slug === data.destination)?.name ??
      (data.destination === 'any' ? 'Any / Not sure yet' : data.destination)

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Astroventure Nights enquiry — ${data.fullName}`,
          _template: 'table',
          _captcha: 'false',
          _cc: NOTIFY_CC,
          _replyto: data.email,
          _honey: data.company || '',
          'Full Name': data.fullName,
          Phone: data.phone,
          Email: data.email,
          Age: String(data.age),
          City: data.city,
          Participants: String(data.participants),
          'Preferred Destination': destLabel,
          'Preferred Date': data.preferredDate,
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
      id="register"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      {/* Starfield backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-screen">
        <img
          src={IMAGES.starfieldBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[var(--av-deep)] via-transparent to-[var(--av-deep)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[var(--av-nebula)] opacity-10 blur-[130px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reserve your spot"
          title="Begin Your Astroventure"
          subtitle="Tell us a little about you and we’ll confirm availability and the next steps within 24 hours."
        />

        <ScrollReveal className="mt-12">
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                  <Check size={32} />
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold text-white">
                  Reservation received!
                </h3>
                <p className="mt-2 max-w-md text-sm font-light text-white/65">
                  Thank you for reaching out. Our team will contact you within 24 hours to confirm
                  your Astroventure Nights experience. Keep an eye on your inbox and phone.
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
                {/* Honeypot — hidden from real users */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company (leave blank)</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="fullName">Full Name</label>
                    <input id="fullName" className={inputCls} placeholder="Your name" {...register('fullName')} />
                    {errors.fullName && <p className={errCls}><AlertCircle size={12} />{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">Phone Number</label>
                    <input id="phone" type="tel" inputMode="tel" className={inputCls} placeholder="+91 ..." {...register('phone')} />
                    {errors.phone && <p className={errCls}><AlertCircle size={12} />{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">Email Address</label>
                    <input id="email" type="email" inputMode="email" className={inputCls} placeholder="you@email.com" {...register('email')} />
                    {errors.email && <p className={errCls}><AlertCircle size={12} />{errors.email.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls} htmlFor="age">Age</label>
                      <input id="age" type="number" inputMode="numeric" min={5} className={inputCls} placeholder="28" {...register('age')} />
                      {errors.age && <p className={errCls}><AlertCircle size={12} />{errors.age.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="participants">Participants</label>
                      <input id="participants" type="number" inputMode="numeric" min={1} className={inputCls} placeholder="1" {...register('participants')} />
                      {errors.participants && <p className={errCls}><AlertCircle size={12} />{errors.participants.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="city">City</label>
                    <input id="city" className={inputCls} placeholder="Your city" {...register('city')} />
                    {errors.city && <p className={errCls}><AlertCircle size={12} />{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="destination">Preferred Destination</label>
                    <select id="destination" className={cn(inputCls, 'appearance-none')} {...register('destination')}>
                      <option value="" className="bg-[var(--av-deep)]">Select a destination</option>
                      {destinations.map((d) => (
                        <option key={d.slug} value={d.slug} className="bg-[var(--av-deep)]">
                          {d.name} — {d.valley}
                        </option>
                      ))}
                      <option value="any" className="bg-[var(--av-deep)]">Any / Not sure yet</option>
                    </select>
                    {errors.destination && <p className={errCls}><AlertCircle size={12} />{errors.destination.message}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="preferredDate">Preferred Date</label>
                  <select id="preferredDate" className={cn(inputCls, 'appearance-none')} {...register('preferredDate')}>
                    <option value="" className="bg-[var(--av-deep)]">Select a batch / date</option>
                    {upcomingEvents
                      .filter((e) => e.status !== 'soldout')
                      .map((e) => (
                        <option key={e.id} value={e.dateLabel} className="bg-[var(--av-deep)]">
                          {e.dateLabel} — {e.batchName}
                        </option>
                      ))}
                    <option value="flexible" className="bg-[var(--av-deep)]">I’m flexible</option>
                  </select>
                  {errors.preferredDate && <p className={errCls}><AlertCircle size={12} />{errors.preferredDate.message}</p>}
                </div>

                <div>
                  <label className={labelCls} htmlFor="notes">Special Notes</label>
                  <textarea id="notes" rows={3} className={cn(inputCls, 'resize-none')} placeholder="Dietary needs, accessibility, questions…" {...register('notes')} />
                </div>

                {/* Consent */}
                <label className="flex cursor-pointer items-start gap-3 text-sm text-white/70">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 accent-[var(--av-gold)]"
                    {...register('consent')}
                  />
                  <span>
                    I consent to Astris SpaceEd contacting me about my enquiry and agree to the{' '}
                    <a href="/astroventure-nights/privacy" className="text-[var(--av-gold)] underline-offset-2 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && <p className={errCls}><AlertCircle size={12} />{errors.consent.message as string}</p>}

                {status === 'error' && (
                  <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle size={16} /> {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Reserve Your Spot
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/40">
                  <ShieldCheck size={13} /> Your details are kept private and secure.
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
