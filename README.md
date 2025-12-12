# AgentStatic

A static site generator for building HTML + CSS sites with AI assistance. No JavaScript in the output. Powered by design tokens and custom elements.

## Quick Start

```bash
# Clone and install
git clone <repo-url> my-site
cd my-site
npm install

# Initialize with your branding
/begin
```

The `/begin` command will:
- Wipe the example content
- Ask you about your brand (name, color, purpose, tone)
- Generate a customized site
- Build and preview it locally

Then run `npm run serve` to see your site.

## Commands

Use these slash commands in Claude Code to build your site:

| Command | What It Does |
|---------|-------------|
| `/begin` | Initialize the repo with your branding (run this first!) |
| `/recommend {page-type}` | Get component recommendations for your page type |
| `/new-page {name}` | Create a new page and assemble components |
| `/new-element {name}` | Create a custom styled component |
| `/new-partial {name}` | Create a reusable HTML fragment |
| `/rebrand` | Change your site's colors, name, and tone |
| `/audit` | Check for broken links, missing alt text, and more |
| `/deploy` | Build and deploy to production |

## Workflow

1. **Initialize** — Run `/begin` to set up your brand
2. **Customize** — Edit `pages/` and assemble components
3. **Preview** — Run `npm run serve` to see changes
4. **Extend** — Use `/new-page`, `/new-element`, `/new-partial` to build more
5. **Deploy** — Run `/deploy` when ready

## Project Structure

```
├── brand.json           # Your brand config (colors, fonts)
├── pages/               # Your HTML pages
├── elements/            # Custom styled components
├── partials/            # Reusable HTML fragments
├── utilities/           # CSS utility classes
├── tokens/              # Generated CSS variables
├── assets/              # Static files (logo, images)
├── build/               # Build scripts (don't edit)
└── dist/                # Generated output (deploy this)
```

## Key Concepts

### Design Tokens
One config file (`brand.json`) generates your entire color palette, typography, and spacing. Edit it and run `npm run build` to regenerate everything.

### Custom Elements
Pre-styled components like `<site-hero>`, `<site-features>`, `<site-pricing>`. Use them like regular HTML tags. All styles are CSS, no JavaScript.

### Partials
Reusable HTML snippets that expand at build time. Use `<include-head>`, `<include-nav>`, `<include-footer>` to avoid repetition.

## Build Commands

```bash
npm run build   # Build once
npm run dev     # Build + watch for changes
npm run serve   # Serve dist/ locally
```

## Deploy

Run `/deploy` or manually push the `dist/` folder to any static host:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## Learn More

- Read `CLAUDE.md` in the repo for detailed architecture
- Check `elements/*/README.md` for component documentation
- Explore `brand.json` schema in `CLAUDE.md`

## License

MIT
