import { describe, expect, it } from 'vitest'

import { toValues, newRegistrationId, REGISTRATION_COLUMNS } from '@/lib/registrations'
import { upiHref } from '@/lib/payment-details'

describe('registrations', () => {
  it('writes one value per sheet column, unpaid, with the phone kept as text', () => {
    const values = toValues({
      registrationId: 'NK-ABC',
      submittedAt: '26/10/2026, 7:00:00 pm',
      experience: 'Stargazing',
      experienceSlug: 'stargazing',
      packageLabel: 'Standard',
      date: '2026-11-20',
      guests: 2,
      amountDue: '₹4,000',
      name: 'Asha',
      email: 'asha@example.com',
      phone: '+91 98765 43210',
      notes: '',
      source: 'website',
    })
    expect(values).toHaveLength(REGISTRATION_COLUMNS.length)
    expect(values[2]).toBe('PAYMENT PENDING')
    expect(values[11]).toBe("'+91 98765 43210")
  })

  it('makes short upper-case ids', () => {
    expect(newRegistrationId()).toMatch(/^NK-[0-9A-Z]{6,8}$/)
  })

  it('pre-fills amount and reference in the UPI link', () => {
    const href = upiHref(4000, 'NK-ABC')
    expect(href.startsWith('upi://pay?')).toBe(true)
    expect(href).toContain('am=4000.00')
    expect(href).toContain('tn=NK-ABC')
  })
})
