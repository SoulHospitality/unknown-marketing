# UNKNOWN Marketing Solution

Marketing agency website — Next.js (App Router), Supabase, Cloudinary, motion system.

**Tagline:** Ideas Beyond the Obvious.

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- Supabase (Postgres + Auth when configured)
- Cloudinary (media uploads)
- GSAP ScrollTrigger, Framer Motion, Lenis

## Quick start (no keys required)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs on **seed/mock data** until env keys are added.

Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)  
Default demo password: `unknown-admin` (override with `ADMIN_DEMO_PASSWORD`).

## Environment

Copy `.env.example` → `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

ADMIN_DEMO_PASSWORD=unknown-admin
```

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor
3. Paste URL + anon/service keys into `.env.local`
4. Create an Auth user for production admin (demo password still works for local gate)

### Cloudinary

1. Create a cloud at [cloudinary.com](https://cloudinary.com)
2. Add cloud name, API key, and secret
3. Use **Admin → Media** for signed uploads

## Brand assets

Transparent SVG logos live in `public/brand/`:

- `logo-mark.svg` — U mark + star
- `logo-wordmark.svg` — UNKNOWN wordmark
- `logo-full.svg` — wordmark + MARKETING SOLUTION

Colors: Charcoal `#212121`, Sand `#EBE4DE`, Blush `#F0DBD6`, Nude `#BF9990`, Mist `#B2B2B2` ([Coolors palette](https://coolors.co/212121-ebe4de-f0dbd6-bf9990-b2b2b2)).

Typography: **Space Grotesk** (primary — modern & sharp), **Cormorant Garamond** (secondary — clean & elegant), **Outfit** (UI).

Brand elements: Ideas · Strategy · Growth · Creativity · Possibilities.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/services`, `/services/[slug]` | Services hub + detail |
| `/work`, `/work/[slug]` | Work + case study |
| `/industries`, `/industries/[slug]` | Industries |
| `/thinking`, `/thinking/[slug]` | Insights |
| `/clients` | Clients |
| `/start-a-project` | Project brief form |
| `/careers` | Careers |
| `/privacy`, `/terms`, `/cookies` | Legal |
| `/admin/*` | CMS |

## Motion

- Intro (session once): logo assemble → tagline → site
- Scroll-pinned services morph (GSAP)
- Reveals, magnetic CTAs, industry hover visuals
- Respects `prefers-reduced-motion`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
