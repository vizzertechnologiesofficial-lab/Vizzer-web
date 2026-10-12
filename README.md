# vizzertechnologies.com

The company website for Vizzer Technologies. A single page React site (Vite + Tailwind CSS + Framer Motion) that introduces the company and its four products: Gater, Restro, Siyyana and Pitch It.

No backend. Everything is static and can be hosted anywhere.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/ locally
```

Node 18 or newer.

## Edit the content

Almost every word on the site lives in two files:

| What | Where |
| --- | --- |
| Email, phone, social links | `src/data/site.js` |
| Product names, copy, features, colors, store links | `src/data/products.js` |
| "What we do" list | `src/sections/Capabilities.jsx` (the `items` array) |
| Hero headline and intro | `src/sections/HeroProducts.jsx` (the `Hero` component) |
| Tagline section | `src/sections/Tagline.jsx` (the `LINES` array) |

**Store links.** When Restro, Siyyana and Pitch It are live under the Vizzer Play Store and App Store accounts, paste their URLs into `stores.play` and `stores.apple` in `src/data/products.js`. "Google Play" and "App Store" buttons appear automatically.

**Social links.** Paste full profile URLs into `site.social` in `src/data/site.js`. Icons show up in the footer only for the ones you fill in.

**Logo.** The mark is drawn in `src/components/Logo.jsx`, `public/favicon.svg` and `public/apple-touch-icon.png`. Swap all three if you have an official logo. `public/og-image.png` is the picture shown when the link is shared on WhatsApp, LinkedIn or Instagram.

## The phone demos

Each product has a small animated app screen in `src/components/demos/`. They are built in code (not videos), so they stay sharp and light. Each file has a `STEPS` array with the duration of each screen in milliseconds; change those to speed up or slow down a demo.

## Theme and design rules

Follows the conventions in the Gater `AGENTS.md`:

- Colors are CSS variables in `src/index.css` (`--background`, `--foreground`, `--card`, `--muted`, `--border`, `--primary`) mapped to Tailwind names in `tailwind.config.js`. Use `bg-background`, `text-foreground`, `bg-card`, `border-border` and so on, not hardcoded colors.
- Dark mode is the `.dark` class on `<html>`. The site follows the visitor's system setting and remembers a manual switch.
- Icons come from `react-icons` (Phosphor set, `react-icons/pi`).
- One easing curve everywhere: `cubic-bezier(0.32, 0.72, 0, 1)` (`ease-fluid` in Tailwind, `EASE` in `src/lib/motion.js`).
- Motion respects "reduce motion" in the visitor's OS settings.

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo under the company account.
2. In Vercel: **Add New Project**, import the repo. Framework preset **Vite**, build command `npm run build`, output directory `dist`.
3. In the project **Settings → Domains**, add `vizzertechnologies.com` and `www.vizzertechnologies.com`.
4. Vercel shows the DNS records to add. In GoDaddy **DNS → Manage**, add exactly what Vercel shows (usually an `A` record for `@` and a `CNAME` for `www`).
5. Do not touch the `MX` and `TXT` records that Google Workspace added. Company email keeps working.

`vercel.json` already sends every route to `index.html`, so `/privacy` and the 404 page work on refresh. For Netlify, `public/_redirects` does the same job.

## Structure

```
src/
  components/   Nav, Footer, Logo, Phone frame, product icons
    demos/      Animated app screens for each product
  sections/     Hero + products, Tagline, Capabilities, Contact
  pages/        Home, Privacy, NotFound
  data/         site.js, products.js   ← edit content here
  lib/          motion constants, theme provider, smooth scroll
public/         favicon, touch icon, share image, robots.txt, sitemap.xml
```
