import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/club-demo/route'

/**
 * The /astronomy-club demo form endpoint. fetch is mocked throughout, so no
 * email provider is ever contacted.
 */

const valid = {
  name: 'Test Principal',
  role: 'Principal',
  school: 'Test School',
  city: 'Gurugram',
  phone: '+91 99999 99999',
  email: 'principal@example.com',
  grades: ['4–6', '10–12'],
  week: 'second week of December',
  message: '',
  company: '',
  renderedAt: Date.now() - 60_000,
}

let ip = 0
function request(body: unknown) {
  ip += 1 // a fresh IP per request keeps the rate limiter out of the way
  return new Request('http://localhost/api/club-demo', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost', 'x-forwarded-for': `10.0.0.${ip}` },
    body: JSON.stringify(body),
  })
}

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
  delete process.env.WEB3FORMS_ACCESS_KEY
  delete process.env.RESEND_API_KEY
  delete process.env.CLUB_LEADS_EMAIL
})
afterEach(() => vi.unstubAllGlobals())

describe('POST /api/club-demo', () => {
  it('emails a valid lead to contact@astriseducation.in', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: 'true' }), { status: 200 }))
    const res = await POST(request(valid))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://formsubmit.co/ajax/contact%40astriseducation.in')
    const sent = JSON.parse(init.body)
    expect(sent['School']).toBe('Test School')
    expect(sent['Grades to start with']).toBe('4–6, 10–12')
  })

  it('sends through Resend to the club inbox when a key is set', async () => {
    process.env.RESEND_API_KEY = 'test-key'
    fetchMock.mockResolvedValue(new Response('{}', { status: 200 }))
    await POST(request(valid))
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    const sent = JSON.parse(init.body)
    expect(sent.to).toEqual(['contact@astriseducation.in'])
    expect(sent.reply_to).toBe('principal@example.com')
  })

  it('labels a quote request in the subject and rows', async () => {
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ success: 'true' }), { status: 200 }))
    const res = await POST(request({ ...valid, kind: 'quote', students: '35' }))
    expect(res.status).toBe(200)
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(sent._subject).toBe('Astronomy Club quote request — Test School, Gurugram')
    expect(sent['Request']).toBe('Quote')
    expect(sent['Approximate number of students']).toBe('35')
    expect(sent['Preferred demo week']).toBeUndefined()
  })

  it('rejects missing required fields', async () => {
    const res = await POST(request({ ...valid, school: '' }))
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('answers bots as if it worked, without sending anything', async () => {
    const honeypot = await POST(request({ ...valid, company: 'Acme' }))
    const tooFast = await POST(request({ ...valid, renderedAt: Date.now() }))
    expect(await honeypot.json()).toEqual({ ok: true })
    expect(await tooFast.json()).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports failure when no provider delivers, so the form can offer WhatsApp', async () => {
    fetchMock.mockResolvedValue(new Response('nope', { status: 500 }))
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await POST(request(valid))
    expect(res.status).toBe(502)
    expect((await res.json()).ok).toBe(false)
    spy.mockRestore()
  })

  it('rate-limits a single IP after five submissions', async () => {
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ success: 'true' }), { status: 200 }))
    const same = () =>
      new Request('http://localhost/api/club-demo', {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'http://localhost', 'x-forwarded-for': '10.9.9.9' },
        body: JSON.stringify(valid),
      })
    const codes = []
    for (let i = 0; i < 6; i++) codes.push((await POST(same())).status)
    expect(codes).toEqual([200, 200, 200, 200, 200, 429])
  })
})
