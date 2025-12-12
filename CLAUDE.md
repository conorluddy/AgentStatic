# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A static site generator that outputs pure HTML + CSS. No JavaScript in the output. Custom HTML elements are styled via CSS without registration. Build tooling is TypeScript, but the artifact is framework-free.

## Project Structure

```
├── brand.json           # EDIT THIS: Site config, colors, typography
├── fonts/               # Google Fonts reference (curated catalog)
├── tokens/              # GENERATED: CSS custom properties
├── utilities/           # Hand-authored utility classes
├── elements/            # Component library
│   └── site-*/          # Each element has README, HTML, CSS
├── partials/            # Reusable HTML fragments with slots
├── pages/               # Site pages (edit these)
├── assets/              # Static files
├── build/               # Build scripts
└── dist/                # Output (don't edit)
```

## Workflow: Creating a New Landing Page

1. **Update brand.json** with client's primary color
2. **Run build** to generate tokens
3. **Create pages/index.html** by assembling elements
4. **Run build** to produce dist/

## Key Files to Read

Before generating content, read these:

1. `brand.json` — Understand current theme
2. `elements/*/README.md` — Know available components
3. `partials/*.html` — Know available includes

## Element Naming Convention

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `include-*` | Build-time partials (expanded) | `include-head`, `include-nav` |
| `site-*` | Page sections (styled) | `site-hero`, `site-features` |
| `ui-*` | Small UI bits (if needed) | `ui-button`, `ui-badge` |

Child elements are namespaced:

```html
<site-hero>
  <site-hero-actions>...</site-hero-actions>
</site-hero>
```

## Page Authoring

### Basic Structure

```html
<!DOCTYPE html>
<html lang="en">

<include-head 
  title="Page Title" 
  description="Meta description" 
/>

<body>
  <include-nav logo="/assets/logo.svg" />

  <site-hero>
    <h1>Headline</h1>
    <p>Subhead</p>
  </site-hero>

  <!-- more sections -->

  <include-footer siteName="Acme" />
</body>
</html>
```

### Using Elements

Elements are just HTML tags. Style variants via attributes:

```html
<site-hero variant="centered" theme="dark">
  <h1>Centered Dark Hero</h1>
</site-hero>
```

### Using Partials with Slots

Partials can accept children via slots:

```html
<include-footer siteName="Acme">
  <nav slot="links">
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</include-footer>
```

**How includes work:**
- `<include-{name}>` loads `partials/{name}.html`
- `{{attributeName}}` in partials are replaced with attribute values (HTML-escaped)
- Missing attributes become empty strings
- `<slot>` receives default children; `<slot name="x">` receives `slot="x"` children
- Slots can have fallback content between opening/closing tags
- Max include depth: 10 (prevents infinite recursion)

## Token System

### brand.json Schema

Minimal required config:
```json
{
  "name": "Site Name",
  "colors": { "primary": "#3b82f6" }
}
```

All other values have defaults. Optional fields: `tagline`, `colors.neutral` (#64748b), `typography.fonts`, `typography.base` (16), `typography.scale` (1.25), `typography.fluid` (false), `spacing.base` (4), `layout.containers`, `layout.gutter` (16).

### Colors

Set primary color in brand.json. Build generates:

- `--color-primary-50` through `--color-primary-950`
- `--color-neutral-50` through `--color-neutral-950`
- Semantic: `--color-bg`, `--color-text`, `--color-surface`, `--color-border`, `--color-accent`

### Spacing

Based on 4px unit:

- `--space-1` (4px) through `--space-32` (128px)

### Typography

Based on modular scale:

- `--text-xs` through `--text-5xl`
- `--font-sans`, `--font-serif`, `--font-mono`
- `--leading-tight`, `--leading-normal`, `--leading-relaxed`

### Google Fonts

Fonts from `fonts/google-fonts.json` are auto-loaded. Configure in brand.json:

```json
{
  "typography": {
    "fonts": {
      "sans": "Inter",
      "serif": "Playfair Display",
      "mono": "JetBrains Mono"
    }
  }
}
```

**Simple format**: Just the font family name (uses default weights 400, 700).

**Advanced format**: Specify weights and italic:
```json
{
  "typography": {
    "fonts": {
      "serif": {
        "family": "Playfair Display",
        "weights": [400, 500, 600, 700],
        "italic": true
      }
    }
  }
}
```

Build auto-generates:
- Google Fonts `<link>` tags (preconnect + stylesheet) in HTML head
- CSS tokens with proper font stacks: `--font-sans: "Inter", system-ui, sans-serif`

Available fonts are in `fonts/google-fonts.json` with tags for browsing:
- **style**: modern, classic, playful, technical, elegant, minimal, bold
- **useCase**: headlines, body, ui, code, display
- **character**: professional, friendly, corporate, creative, luxury

### Layout

- `--container-sm` through `--container-xl`
- `--gutter`

## Commands

```bash
npm run build        # Build once (npx tsx build/index.ts)
npm run dev          # Build + watch
npm run serve        # Serve dist/ locally (npx serve dist)
```

## Build Architecture

The build system is in `build/`:

```
build/index.ts   → Orchestrator: clean, generate, copy assets, watch mode
build/tokens.ts  → Reads brand.json, generates tokens/*.css (uses chroma-js)
build/css.ts     → Concatenates CSS: tokens → utilities → elements → dist/styles.css
build/html.ts    → Expands <include-*> elements, injects font links → dist/*.html
build/fonts.ts   → Resolves fonts from google-fonts.json, generates <link> tags
build/types.ts   → Shared TypeScript interfaces
```

**Data flow:**
1. `brand.json` + `fonts/google-fonts.json` → `fonts.ts` → font stacks + Google Fonts links
2. `brand.json` → `tokens.ts` → generates `tokens/*.css` (colors, spacing, typography, layout)
3. `tokens/*.css` + `utilities/*.css` + `elements/*/styles.css` → `css.ts` → `dist/styles.css`
4. `pages/*.html` + `partials/*.html` + font links → `html.ts` → `dist/*.html`
5. `assets/` → copied directly to `dist/assets/`

**Dependencies:** chroma-js (color manipulation), chokidar (file watching)

## Do's and Don'ts

### Do

- Use existing elements from `elements/`
- Use CSS custom properties for all values
- Keep pages semantic and accessible
- Test with CSS disabled (content should still be readable)

### Don't

- Add JavaScript to pages (unless progressive enhancement)
- Create inline styles
- Invent new elements without adding to library
- Modify files in `tokens/` (they're generated)

## Common Tasks

### Change Brand Color

1. Edit `brand.json`: `"primary": "#new-color"`
2. Run `npm run build`
3. All color tokens regenerate

### Add New Page

1. Create `pages/new-page.html`
2. Use `<include-head>`, assemble sections, use `<include-footer>`
3. Run `npm run build`
4. Find output at `dist/new-page.html`

### Create New Element

1. Create `elements/site-newname/`
2. Add `README.md` (document usage, variants)
3. Add `element.html` (example markup)
4. Add `styles.css` (element styles)
5. Styles auto-included on next build

## Debugging

### Partial Not Expanding

- Check filename matches: `<include-foo>` needs `partials/foo.html`
- Check for typos in attribute names

### Styles Not Applying

- Verify element name matches CSS selector
- Check CSS is in `elements/*/styles.css` or `utilities/`
- Run build to regenerate `dist/styles.css`

### Colors Wrong

- Check `brand.json` syntax (valid JSON)
- Run build to regenerate `tokens/colors.css`
