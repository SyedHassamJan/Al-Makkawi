# Al-Makkawi Hajj & Umrah Travel — landing page redesign

Next.js (App Router) + Tailwind CSS v4. Static, fast, SEO-ready. Deploys to Vercel with zero config.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy to Vercel
Push this folder to a GitHub repo → vercel.com/new → import → Deploy. No env vars needed.

## Edit content
All business details (phone, address, hours, socials, FAQs) live in `lib/site.ts`, and they feed the page, metadata and structured data.

## SEO included
- Title/description/keywords, Open Graph + Twitter cards, canonical URL, `en-GB` locale
- Generated social share image (`app/opengraph-image.tsx`)
- JSON-LD: `TravelAgency` (address, hours, phone) + `FAQPage` (eligible for FAQ rich results)
- `sitemap.xml` and `robots.txt` generated automatically
- Semantic HTML, one H1, labelled sections, accessible nav/forms, reduced-motion support
- Self-hosted fonts (no Google requests); all photos and videos are local files served through `next/image` / `public/videos`

## Media
- Photos: `public/images` (resized from the originals in `../sources`, max 2400px wide).
- Hero videos: `public/videos/mecca-hero-{1,2}.mp4` (1280px, H.264, no audio, faststart) and `-mobile.mp4` versions (720px) for phones.
  To re-encode: `ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart out.mp4`
- Every section now uses the owner's own photographs; no placeholders remain. A card with `photo: null` in `components/ToursSection.tsx` falls back to a tinted field with its Arabic name.
- Design system: `app/tokens.css` (colours, fonts, sizes; the Hallmark tokens) and `app/base.css`. The stamp at the top of `app/globals.css` records every design decision, waiver and reworded line.

## Before going live (confirm with the owner)
- Tour city lists are sample copy (marked on the page). Confirm or replace, then remove the "Sample copy" tag in `components/ToursSection.tsx`.
- Add ATOL number to the footer notice.
- The enquiry form opens the visitor's email app. To make it send directly, connect a Server Action + Resend/Formspree.
