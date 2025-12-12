# AgentStatic

A static site generator for building HTML + CSS sites with AI assistance. No JavaScript in the output. Powered by design tokens and custom elements.

## Get Started

**Click the green "Use this template" button** at the top of the repo to create your own copy, or follow the Quick Start below.

## Quick Start

```bash
# Clone and install
git clone <repo-url> my-site
cd my-site
npm install
```

```bash
# Initialize with ClaudeCode
> claude

/begin
```


The `/begin` command will guide you through:
1. **Brand identity** — Name, tagline, primary color, site purpose
2. **Content direction** — Target audience, key features, call-to-action, brand tone
3. **Image management** — Add logo, hero image, and feature images (optional)
4. **Advanced settings** — Typography style, additional pages (optional)
5. **Site generation** — Creates `brand.json`, homepage, and runs build

Your site will be fully branded and ready to preview with `npm run serve`.

**New to Claude Code?** Make sure you have Claude Code installed. Run `/begin` as a slash command in Claude Code.

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

## Images

During `/begin`, you can add images to personalize your site:

- **Logo** — Square image for your navbar (any size, will be scaled)
- **Hero Image** — Wide banner image for the homepage header
- **Feature Images** — Supporting images for feature cards

Just drop them in the `assets/` folder when prompted, and `/begin` will:
1. Detect them automatically
2. Analyze dimensions and purpose (logo vs hero vs feature)
3. Integrate them into your homepage

If you skip this, placeholder text will be used. You can always add images later by editing `pages/index.html` or running `/rebrand`.

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

## Requirements

- **Node.js** 16+ (npm or yarn)
- **Claude Code** — AI-powered slash commands that build your site
- Modern web browser for previewing

## Examples

### Minimal Config
```json
{
  "name": "My Site",
  "tagline": "A great site",
  "colors": { "primary": "#3b82f6" }
}
```

### Full Config
See `CLAUDE.md` for complete `brand.json` schema including typography, spacing, and layout customization.

### Custom Component
```html
<site-hero variant="centered">
  <h1>Welcome</h1>
  <p>This is my site</p>
</site-hero>
```

All components are documented in `elements/*/README.md`.

## How It Works

1. **Design Tokens** — Your `brand.json` generates CSS variables for colors, typography, and spacing
2. **Build Time** — The build process compiles CSS, processes HTML includes, and optimizes for deployment
3. **Zero JavaScript** — All output is pure HTML + CSS, no JavaScript bloat
4. **AI Assistance** — Claude Code slash commands help you create, customize, and deploy

## Learn More

- **Architecture & Details** — Read `CLAUDE.md` for build system, element naming, and advanced configuration
- **Components** — Check `elements/*/README.md` for component documentation and variants
- **Customization** — Edit `brand.json` to control colors, fonts, spacing, and layout
- **Troubleshooting** — See `CLAUDE.md` for common issues and debugging tips

## FAQ

**Q: Can I use this without Claude Code?**
A: Yes! The repo is just a build system. You can manually edit files and run `npm run build`. Claude Code just makes it easier.

**Q: Is there JavaScript in the output?**
A: No. The output is pure HTML + CSS. The build tools use TypeScript, but nothing ships to browsers.

**Q: Can I host this anywhere?**
A: Yes. Push the `dist/` folder to any static host: Netlify, Vercel, GitHub Pages, S3, or any web server.

**Q: Can I modify components?**
A: Yes. Edit CSS in `elements/*/styles.css` or create new components with `/new-element`.

## License

MIT
