# site-features

Feature grid section for showcasing product features.

## Usage

```html
<site-features>
  <site-features-header>
    <h2>Everything you need</h2>
    <p>Built for modern teams.</p>
  </site-features-header>

  <site-feature>
    <site-feature-icon>⚡</site-feature-icon>
    <h3>Lightning Fast</h3>
    <p>Optimized for speed.</p>
  </site-feature>

  <site-feature>
    <site-feature-icon>🔒</site-feature-icon>
    <h3>Secure</h3>
    <p>Enterprise-grade security.</p>
  </site-feature>

  <site-feature>
    <site-feature-icon>🌍</site-feature-icon>
    <h3>Global</h3>
    <p>Available worldwide.</p>
  </site-feature>
</site-features>
```

## Variants

| Attribute | Values | Description |
|-----------|--------|-------------|
| `variant` | `2-col`, `3-col`, `4-col` | Number of columns |

## Child Elements

- `site-features-header` — Section header with h2 and description
- `site-feature` — Individual feature card
- `site-feature-icon` — Icon container (emoji or SVG)
