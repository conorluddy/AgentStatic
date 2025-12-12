# Landing Page Template

A minimal static site template that outputs pure HTML + CSS. No JavaScript in the output. Perfect for landing pages, marketing sites, and portfolios.

## Features

- **Zero JavaScript** — Pure HTML + CSS output, instant page loads
- **Design Tokens** — One config file generates your entire color palette
- **Custom Elements** — Pre-styled components for hero, features, pricing, FAQ, and more
- **Markdown Blog** — Write posts in Markdown with frontmatter
- **Dark Mode** — Automatic dark mode via CSS custom properties
- **Deploy Anywhere** — Static files work on any host

## Quick Start

```bash
# Clone the template
git clone https://github.com/your-username/landing-template my-site
cd my-site

# Install dependencies
npm install

# Start developing
npm run dev
```

Then open http://localhost:3000 to see your site.

## Customize

### 1. Update Your Brand

Edit `brand.json`:

```json
{
  "name": "Your Company",
  "tagline": "Your tagline here",
  "colors": {
    "primary": "#3b82f6"
  }
}
```

### 2. Replace the Logo

Replace `assets/logo.svg` with your own logo.

### 3. Edit the Pages

- `pages/index.html` — Your homepage
- `pages/about.html` — About page
- `pages/blog/*.md` — Blog posts in Markdown

### 4. Build and Deploy

```bash
npm run build    # Build once
npm run serve    # Preview locally
```

Deploy the `dist/` folder to Netlify, Vercel, GitHub Pages, or any static host.

## Project Structure

```
├── brand.json        # Your brand config
├── pages/            # HTML and Markdown pages
├── partials/         # Reusable HTML fragments
├── elements/         # Custom element styles
├── utilities/        # Utility CSS classes
├── assets/           # Static files (logo, images)
├── build/            # Build scripts
└── dist/             # Built output (deploy this)
```

## Available Elements

| Element | Description |
|---------|-------------|
| `<site-hero>` | Full-width hero section |
| `<site-features>` | Feature grid (2/3/4 columns) |
| `<site-pricing>` | Pricing tier comparison |
| `<site-faq>` | FAQ accordion |
| `<site-cta>` | Call-to-action section |
| `<site-nav>` | Navigation header |
| `<site-footer>` | Page footer |

See `elements/*/README.md` for detailed documentation.

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build once |
| `npm run dev` | Build + watch for changes |
| `npm run serve` | Serve dist/ locally |

## Sample Site

This template includes a fictional example site ("Nimbus" cloud storage) to demonstrate all available elements and patterns. Replace the content with your own.

## License

MIT
