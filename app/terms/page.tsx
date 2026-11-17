import type { Metadata } from 'next'
import Link from 'next/link'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import { POLICY } from '@/lib/policies'
import { CONTACT, LEGAL_ENTITY, REGISTERED_OFFICE_LINE, SITE_URL } from '@/lib/site-config'

/**
 * Terms & Conditions — the contract a guest enters into when they pay.
 *
 * ⚠  DRAFT FOR SIGN-OFF. Written to reflect how Astris Space actually trades
 * (the policies in lib/policies.ts, the inclusions on each listing, payment
 * through Cashfree) but not reviewed by a lawyer. In particular the
 * jurisdiction clause and the grievance-officer details should be confirmed.
 */

const TITLE = 'Terms & Conditions — Astris Space'
const DESCRIPTION =
  'The terms that apply when you book a stargazing night, workshop or stay with Astris Space (ASTRIS SPACEED LLP): payment, what is included, weather, cancellations, conduct and liability.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/terms` },
}

const a = 'underline decoration-white/30 underline-offset-2 hover:text-white'

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      standfirst="The agreement between you and us when you book. Plain English, as short as it can be while still saying everything that matters."
    >
      <Clause heading="1. Who we are">
        <p>
          Astris Space is a trading name of {LEGAL_ENTITY}, with its registered office at{' '}
          {REGISTERED_OFFICE_LINE}. “We”, “us” and “our” mean that company. You can reach us on{' '}
          {CONTACT.phone} or at {CONTACT.email}.
        </p>
      </Clause>

      <Clause heading="2. What these terms cover">
        <p>
          These terms apply to every booking made and paid for on this website — currently the Sambhar
          Lake Saturday nights, and Nakshatraalay’s experiences once it reopens at its new location.
          Expeditions and group programmes arranged directly with us are covered by the terms in their
          written confirmation where those differ from these.
        </p>
        <p>
          Our{' '}
          <Link className={a} href="/cancellation-policy">cancellation &amp; refund policy</Link>,{' '}
          <Link className={a} href="/rescheduling-policy">rescheduling policy</Link> and{' '}
          <Link className={a} href="/privacy-policy">privacy policy</Link> form part of these terms.
        </p>
      </Clause>

      <Clause heading="3. Making a booking">
        <p>
          Your booking is confirmed — and a contract between you and us is formed — when your payment
          has been received and verified. We confirm it by email or WhatsApp with a payment ID; keep it,
          as it identifies your booking.
        </p>
        <p>
          The person who books is responsible for the booking and for making sure everyone in their
          party knows and accepts these terms. Please give us accurate details: we use them to reach
          you about your night.
        </p>
      </Clause>

      <Clause heading="4. Prices and payment">
        <p>
          Prices are in Indian rupees and are shown on each listing, per person or per room as the
          listing says. The amount shown at checkout is the total you pay. Payment is taken in full when
          you book.
        </p>
        <p>
          Payments are processed by Cashfree Payments. Your card, UPI and bank details are entered on
          their checkout and never reach us.
        </p>
      </Clause>

      <Clause heading="5. What is included">
        <p>
          Exactly what the listing says is included, and nothing more. Anything not listed — including
          travel to and from the venue unless the listing says otherwise — is not included. For example,
          the Sambhar Lake nights include your stay, dinner, the stargazing session and breakfast, but
          you make your own way there and back.
        </p>
      </Clause>

      <Clause heading="6. The sky">
        <p>{POLICY.weather}</p>
        <p>
          What is visible on a given night depends on the date, the Moon and the weather. The sky
          calendars on this site are calculated astronomically and are a guide, not a promise.
        </p>
      </Clause>

      <Clause heading="7. Cancelling or changing your booking">
        <p>
          You can cancel or move your booking under our{' '}
          <Link className={a} href="/cancellation-policy">cancellation &amp; refund policy</Link> and{' '}
          <Link className={a} href="/rescheduling-policy">rescheduling policy</Link>. {POLICY.refundTiming}
        </p>
      </Clause>

      <Clause heading="8. If we have to change or cancel">
        <p>
          We may need to change a programme — the order of the evening, the observing site within the
          venue, or the instructor — for reasons of weather, safety or circumstances at the venue. We
          will keep any change as close to what you booked as we can.
        </p>
        <p>{POLICY.weatherOurCall}</p>
      </Clause>

      <Clause heading="9. At the venue">
        <ul className="space-y-1.5">
          <li>— Follow the instructions of our team, especially around telescopes and equipment.</li>
          <li>— Keep white torches and phone screens dimmed once observing starts — it protects everyone’s night vision.</li>
          <li>— Follow the accommodation’s own house rules, including the check-in and check-out times on your listing.</li>
          <li>— We may ask anyone whose behaviour puts people, equipment or the session at risk to leave, without a refund.</li>
        </ul>
        <p>
          You are responsible for damage you cause deliberately or carelessly to equipment or property.
        </p>
      </Clause>

      <Clause heading="10. Children, health and fitness">
        <p>{POLICY.minors}</p>
        <p>
          Some experiences include a walk or hike, and some trips go to high altitude. Please tell us
          about any medical condition, mobility need or allergy when you book, so we can plan for it.
        </p>
      </Clause>

      <Clause heading="11. Photographs">
        <p>
          Photographs you take are yours. We may photograph sessions; we will ask before using any
          image in which you can be identified, and saying no changes nothing about your booking.
        </p>
      </Clause>

      <Clause heading="12. Our responsibility to you">
        <p>
          We take reasonable care in everything we run. We are not responsible for loss or damage that
          was not reasonably foreseeable, or that was caused by something outside our reasonable
          control. Nothing in these terms limits our liability where the law does not allow it to be
          limited, including for death or personal injury caused by our negligence.
        </p>
      </Clause>

      <Clause heading="13. Events outside our control">
        <p>
          If something beyond our reasonable control — such as severe weather, natural events, public
          health measures or government orders — stops us running your booking, we will offer you a new
          date or a refund.
        </p>
      </Clause>

      <Clause heading="14. Complaints">
        <p>
          If something has gone wrong, tell us at {CONTACT.email} or on {CONTACT.phone}. We acknowledge
          every complaint within 48 hours and aim to resolve it within one month.
        </p>
      </Clause>

      <Clause heading="15. Law and courts">
        <p>
          These terms are governed by the laws of India. Any dispute is subject to the courts at New
          Delhi.
        </p>
      </Clause>

      <Clause heading="16. Changes to these terms">
        <p>
          We may update these terms. The version in force when you booked is the one that applies to
          your booking.
        </p>
      </Clause>
    </LegalPage>
  )
}
