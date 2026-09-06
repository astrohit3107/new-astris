import type { Metadata } from 'next'
import Link from 'next/link'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import { CONTACT } from '@/lib/site-config'
import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'

const TITLE = 'Privacy Policy — Nakshatraalay Gurgaon'
const DESCRIPTION =
  'What Nakshatraalay Gurgaon collects when you book a stargazing experience or astrophotography workshop, why, who else sees it, and how to have it deleted.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nakshatraalay/gurgaon/privacy' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      standfirst="A short, specific account of what we ask for when you book, where it actually goes, and how to get it removed."
    >
      <Clause heading="What we ask for">
        <p>To take a booking we collect only what we need to hold your place and reach you:</p>
        <ul className="mt-2 space-y-1.5">
          <li>Your name, email address and phone number.</li>
          <li>The experience, package, date and number of guests you chose.</li>
          <li>
            For the astrophotography workshops, the equipment you are bringing — so we know what to
            prepare and what to lend you.
          </li>
          <li>Anything you type into the notes box.</li>
        </ul>
        <p>
          We do not ask for your address, your date of birth, or an account password, because we do
          not need any of them.
        </p>
      </Clause>

      <Clause heading="Your card details never reach us">
        <p>
          Payment is handled entirely by Cashfree Payments, on Cashfree's own checkout. Card numbers, UPI
          IDs, CVVs and bank credentials are entered there and are never sent to this website, never
          stored by us, and never visible to us. What we receive back is a payment identifier, the
          amount, and whether it succeeded.
        </p>
        <p>
          Cashfree processes that payment under its own privacy policy, as the payment processor
          for this booking.
        </p>
      </Clause>

      <Clause heading="Where your booking is kept">
        <p>
          This website has no customer database. When you book, your details are written to a
          private Google Sheet that we use as our booking diary, and emailed to our own inbox.
          There is no account to log into, no profile being built, and nothing about you stored on
          this site between visits.
        </p>
        <p>
          That sheet is what tells the website how many places are left on a given night. Only the
          counts ever reach the public site — never your name, email or phone number.
        </p>
        <p>
          The practical consequence, stated plainly: your booking lives in our booking sheet, in an
          email inbox, and in Cashfree's transaction record, and nowhere else.
        </p>
      </Clause>

      <Clause heading="Who else is involved">
        <ul className="mt-2 space-y-1.5">
          <li>
            <span className="text-white/85">Cashfree Payments</span> — takes the payment and holds
            the transaction record.
          </li>
          <li>
            <span className="text-white/85">Our email provider</span> — carries the booking to our
            inbox and your confirmation to you.
          </li>
          <li>
            <span className="text-white/85">Vercel</span> — hosts this site and keeps short-lived
            server logs, which include IP addresses, for security and debugging.
          </li>
          <li>
            <span className="text-white/85">Google Sheets</span> — holds our booking diary, in a
            private sheet only we can open.
          </li>
          <li>
            <span className="text-white/85">Google Maps</span> — the map on our location page is
            served by Google and may set cookies in your browser when it loads. It appears only on
            pages showing our location.
          </li>
        </ul>
        <p>
          We do not sell your details, we do not share them for advertising, and we do not add you
          to a mailing list because you booked.
        </p>
      </Clause>

      <Clause heading="How long we keep it">
        <p>
          Booking emails are kept while they are useful for running the property and meeting tax and
          accounting obligations, and are deleted after that. Cashfree retains its own transaction
          records for the period Indian financial regulation requires, which is outside our control.
        </p>
      </Clause>

      <Clause heading="Having it deleted">
        <p>
          Email {CONTACT.email} and ask. We will delete the booking correspondence we hold, and
          confirm when it is done. We cannot delete Cashfree's transaction record — that is a
          financial record they are required to keep.
        </p>
        <p>
          You can also ask us what we hold about you, and we will send it back to you. There is no
          charge for either.
        </p>
      </Clause>

      <Clause heading="Children">
        <p>
          Children are welcome at {NAKSHATRAALAY.name}, but bookings are made by an adult. We do not
          knowingly collect details directly from anyone under 18.
        </p>
      </Clause>

      <Clause heading="Photographs">
        <p>
          On the astrophotography workshops we print a photograph you took as a souvenir. That print
          is yours. If we would like to use an image from a session on our own site or social media,
          we will ask you first — and no is a perfectly good answer that changes nothing about your
          booking.
        </p>
      </Clause>

      <Clause heading="Getting in touch">
        <p>
          Any privacy question: {CONTACT.email}, or {CONTACT.phone}. Our booking terms are on the{' '}
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/cancellation">
            cancellation
          </Link>{' '}
          and{' '}
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/rescheduling">
            rescheduling
          </Link>{' '}
          pages.
        </p>
      </Clause>
    </LegalPage>
  )
}
