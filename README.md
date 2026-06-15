# Astris SpaceEd — Astroventure Nights

A premium, immersive landing experience for **Astroventure Nights**, Astris SpaceEd's luxury
Himalayan dark-sky astronomy expeditions. Dark cinematic aesthetic, glassmorphism, smooth scroll
animations, and a conversion-focused booking flow.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

## ✨ Features

- Full-screen cinematic hero with a drifting Milky Way, telescope silhouette and starfield
- Three destination showcases → dedicated subpages (Solang Valley, Chitkul, Kasol)
- "What You Will Experience" cards, telescope/optics gallery, 3-day itinerary timeline
- Masonry photo gallery with a keyboard-accessible lightbox
- Bookable departures + an interactive event calendar (one shared data source)
- Registration form with validation, spam protection and email delivery
- Testimonials carousel and FAQ accordion
- SEO-optimised (per-page metadata, Open Graph, JSON-LD), responsive, accessible, lazy-loaded images

## 🚀 Getting started

```bash
pnpm install        # or: npm install
pnpm dev            # start the dev server
```

Open **http://localhost:3000/astroventure-nights**.

Destination subpages:
`/astroventure-nights/solang-valley` · `/astroventure-nights/chitkul` · `/astroventure-nights/kasol`

```bash
pnpm build && pnpm start   # production build
```

## ✏️ Editing content (no code changes needed)

All copy, destinations, pricing, dates, gallery, testimonials and FAQ live in a single file:

**[`lib/astroventure-data.ts`](lib/astroventure-data.ts)**

To use your own photos, drop files into [`public/`](public) and update the `IMAGES` map at the top
of that file.

## 📧 Registration form email

The form posts to [`app/api/register/route.ts`](app/api/register/route.ts), which emails enquiries
via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key |
| `NOTIFY_EMAIL_1` | Primary recipient (defaults to `astriseducation@gmail.com`) |
| `NOTIFY_EMAIL_2` | Second recipient (add when ready) |
| `NOTIFY_FROM` | A verified "From" address on your domain |

Without these, submissions are still accepted and logged to the server console, so the form works in
development. Swap Resend for any provider by editing the `sendEmail()` function.

## 🌐 Before going live

Set your production domain in `SITE_URL` inside
[`app/astroventure-nights/layout.tsx`](app/astroventure-nights/layout.tsx),
[`page.tsx`](app/astroventure-nights/page.tsx) and the `[slug]` page so canonical/OG URLs resolve
absolutely.

## 📦 Deploy

Deploys cleanly to **Vercel**. Import the repo, add the environment variables above, and ship.
