# site-hero

Full-width hero section for page openers.

## Usage

```html
<site-hero>
  <h1>Headline</h1>
  <p>Supporting text</p>
  <site-hero-actions>
    <a href="#" class="button">Primary</a>
    <a href="#" class="button-ghost">Secondary</a>
  </site-hero-actions>
</site-hero>
```

## Variants

| Attribute | Values | Description |
|-----------|--------|-------------|
| `variant` | `centered`, `split` | Layout style |
| `theme` | `dark`, `light` | Color scheme |

## Child Elements

- `site-hero-actions` — Button container
- `site-hero-media` — Image/video container

## Structure

- `h1` — Primary headline (required)
- `p` — Supporting text (optional)
- `site-hero-actions` — CTAs (optional)
- `site-hero-media` — Visual (optional, for split variant)
