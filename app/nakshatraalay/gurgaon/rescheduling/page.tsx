import type { Metadata } from 'next'
import Link from 'next/link'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import { POLICY, REFUND_BANDS } from '@/lib/policies'
import { CONTACT } from '@/lib/site-config'

const TITLE = 'Rescheduling Policy — Nakshatraalay Gurgaon'
const DESCRIPTION =
  'How to move your stargazing experience, astrophotography workshop or overnight stay at Nakshatraalay Gurgaon to another date.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nakshatraalay/gurgaon/rescheduling' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION },
}

export default function ReschedulingPage() {
  return (
    <LegalPage
      title="Moving your date"
      standfirst="Astronomy is weather-dependent and plans change. Moving a booking is usually easier — and cheaper — than cancelling it."
    >
      <Clause heading="Move it rather than cancel it">
        <p>
          With a week's notice you can move to any available date within 90 days at no charge. That
          is true even in the window where a cancellation would only return half your money, so if
          you are unsure whether you can make it, ask about a move first.
        </p>
      </Clause>

      <Clause heading="What it costs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15 text-xs uppercase tracking-wider text-white/50">
                <th className="py-3 pr-4 font-semibold">Notice given</th>
                <th className="py-3 font-semibold">Moving your date</th>
              </tr>
            </thead>
            <tbody>
              {REFUND_BANDS.map((b) => (
                <tr key={b.window} className="border-b border-white/8 align-top">
                  <td className="py-3 pr-4 font-medium text-white/85">{b.window}</td>
                  <td className="py-3 text-white/65">{b.reschedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/50">{POLICY.rescheduleLimit}</p>
      </Clause>

      <Clause heading="How to ask">
        <p>{POLICY.reschedulingHow}</p>
        <p>
          Your payment ID is in the confirmation email we sent when you booked, and on the
          screen you saw after paying. Quoting it is the fastest way for us to find your booking.
        </p>
      </Clause>

      <Clause heading="If a new date costs more">
        <p>
          Rates differ between packages and, on some experiences, between weekdays and weekends. If
          the date you move to is priced higher, we will ask you for the difference before
          confirming. If it is priced lower, we refund the difference to your original payment
          method.
        </p>
      </Clause>

      <Clause heading="If we move the date">
        <p>{POLICY.weatherOurCall}</p>
        <p>{POLICY.weather}</p>
      </Clause>

      <Clause heading="If you would rather cancel">
        <p>
          The refund bands are set out in full on the{' '}
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/cancellation">
            cancellation and refunds page
          </Link>
          . Any question at all — {CONTACT.phone}.
        </p>
      </Clause>
    </LegalPage>
  )
}
