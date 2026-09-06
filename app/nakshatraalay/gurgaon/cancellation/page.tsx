import type { Metadata } from 'next'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import { REFUND_BANDS, POLICY } from '@/lib/policies'
import { experiences, NAKSHATRAALAY } from '@/lib/nakshatraalay-data'
import { CONTACT } from '@/lib/site-config'

const TITLE = 'Cancellation & Refund Policy — Nakshatraalay Gurgaon'
const DESCRIPTION =
  'How cancellations and refunds work for stargazing experiences, astrophotography workshops and overnight stays at Nakshatraalay Gurgaon.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nakshatraalay/gurgaon/cancellation' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION },
}

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      title="Cancellation & refunds"
      standfirst="What happens to your money if your plans change, and what happens if ours do. These terms apply to every experience listed below."
    >
      <Clause heading="The short version">
        <p>
          Tell us as early as you can. How much comes back depends only on how much notice we
          have — the table below is applied exactly as written, to every booking, with no
          case-by-case negotiation.
        </p>
      </Clause>

      <Clause heading="How much you get back">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15 text-xs uppercase tracking-wider text-white/50">
                <th className="py-3 pr-4 font-semibold">If you cancel</th>
                <th className="py-3 pr-4 font-semibold">Refund</th>
                <th className="py-3 font-semibold">Move instead?</th>
              </tr>
            </thead>
            <tbody>
              {REFUND_BANDS.map((b) => (
                <tr key={b.window} className="border-b border-white/8 align-top">
                  <td className="py-3 pr-4 font-medium text-white/85">{b.window}</td>
                  <td className="py-3 pr-4 text-white/65">{b.refund}</td>
                  <td className="py-3 text-white/65">{b.reschedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/50">{POLICY.gatewayFee}</p>
      </Clause>

      <Clause heading="Clouds are not a cancellation">
        <p>{POLICY.weather}</p>
        <p>{POLICY.weatherOurCall}</p>
      </Clause>

      <Clause heading="How to cancel">
        <p>{POLICY.cancelHow}</p>
        <p>{POLICY.refundTiming}</p>
      </Clause>

      <Clause heading="Arriving late, and not arriving">
        <p>{POLICY.lateArrival}</p>
      </Clause>

      <Clause heading="Which bookings this covers">
        <p>Every experience bookable at {NAKSHATRAALAY.name}:</p>
        <ul className="mt-2 space-y-1.5">
          {experiences.map((e) => (
            <li key={e.slug} className="text-white/70">
              <span className="text-white/85">{e.title}</span>
              <span className="text-white/40"> — {e.durationLabel}</span>
            </li>
          ))}
        </ul>
      </Clause>

      <Clause heading="Talking to a person">
        <p>
          Anything unclear, or a situation the table above does not describe — call or message{' '}
          {CONTACT.phone}. We would rather sort it out than have you guess.
        </p>
      </Clause>
    </LegalPage>
  )
}
