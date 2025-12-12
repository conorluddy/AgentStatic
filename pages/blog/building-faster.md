---
title: Getting Started with Your Template
description: How to customize this template for your own project
date: 2025-01-20
---

This template gives you a complete landing page with all the sections you need. Here's how to make it yours.

## Step 1: Update Your Brand

Open `brand.json` and set your company name, tagline, and primary color:

```json
{
  "name": "Your Company",
  "tagline": "Your tagline here",
  "colors": {
    "primary": "#3b82f6"
  }
}
```

Run `npm run build` and your entire color palette regenerates automatically.

## Step 2: Replace the Logo

The logo lives at `assets/logo.svg`. Replace it with your own SVG logo.

## Step 3: Edit the Pages

The main pages are in `pages/`:

- **index.html** — Your homepage with hero, features, pricing, FAQ, and CTA
- **about.html** — Your about page
- **docs.html** — Template guide (delete or repurpose this)
- **blog/*.md** — Blog posts in Markdown

## Step 4: Customize Elements

Each section uses a custom HTML element. Open the homepage and edit:

- `<site-hero>` — Headline, subhead, and call-to-action buttons
- `<site-features>` — Feature grid with icons
- `<site-pricing>` — Pricing tiers
- `<site-faq>` — Questions and answers
- `<site-cta>` — Final call-to-action

## Step 5: Build and Deploy

```bash
npm run build    # Build once
npm run dev      # Build + watch
npm run serve    # Preview locally
```

Deploy the `dist/` folder to any static host.

## Tips

- The `featured` attribute on `<site-pricing-tier>` highlights that tier
- Use `theme="dark"` on `<site-hero>` or `<site-cta>` for dark backgrounds
- Check `elements/*/README.md` for all available options
