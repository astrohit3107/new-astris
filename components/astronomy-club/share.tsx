'use client'

import { useState } from 'react'
import { absoluteUrl } from '@/lib/site-config'
import { CLUB_PATH } from '@/lib/astronomy-club-data'
import { clubTrack } from './motion'

/** "Share this page with your principal": copy the link, or send it on WhatsApp. */
export default function Share() {
  const [copied, setCopied] = useState(false)
  const url = absoluteUrl(CLUB_PATH)
  const wa = `https://wa.me/?text=${encodeURIComponent(
    `Could our school start an astronomy club? Astris runs it at no cost to the school: ${url}`,
  )}`

  async function copy() {
    clubTrack('club_share_click', { method: 'copy' })
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Older browsers: fall back to a temporary selection.
      const t = document.createElement('textarea')
      t.value = url
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button type="button" onClick={copy} className="club-btn-ghost">
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => clubTrack('club_share_click', { method: 'whatsapp' })}
        className="club-btn-ghost"
      >
        Share on WhatsApp
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>
  )
}
