---
title: Customizing Your Brand Colors
description: How the design token system generates your color palette
date: 2025-01-25
---

This template uses a design token system that generates a complete color palette from a single primary color.

## How It Works

In `brand.json`, you set one primary color:

```json
{
  "colors": {
    "primary": "#3b82f6"
  }
}
```

The build system generates:

- **11 shades** of your primary color (50, 100, 200... 900, 950)
- **11 shades** of neutral gray
- **Semantic colors** for backgrounds, text, borders, and accents
- **Dark mode variants** that automatically activate based on system preference

## Using Colors in CSS

All colors are available as CSS custom properties:

```css
/* Primary palette */
.accent { color: var(--color-primary-500); }
.accent-light { background: var(--color-primary-100); }
.accent-dark { color: var(--color-primary-700); }

/* Semantic colors */
.card { background: var(--color-surface); }
.text { color: var(--color-text); }
.border { border-color: var(--color-border); }
```

## Choosing a Primary Color

Pick a color that:

- Has enough contrast against white for text
- Works well in both light and dark modes
- Represents your brand

Good starting points:

- Blue: `#3b82f6`
- Green: `#22c55e`
- Purple: `#8b5cf6`
- Orange: `#f97316`

## Dark Mode

Dark mode activates automatically via `prefers-color-scheme`. The semantic colors flip:

- `--color-bg` becomes dark
- `--color-text` becomes light
- `--color-surface` adjusts for dark backgrounds

No extra CSS needed—just use the semantic color variables.
