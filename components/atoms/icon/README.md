# Icon Atom Component

SVG icon wrapper component for consistent icon usage across the AgentStatic design system. Supports 50+ inline SVG icons with extensive customization options for brochureware marketing sites.

## Features

- **50+ Built-in Icons**: UI actions, navigation, status, media, social, trust, and general-purpose icons
- **6 Size Variants**: xs (12px), sm (16px), md (24px), lg (32px), xl (40px), 2xl (48px)
- **8 Color Variants**: Primary, secondary, accent, success, warning, error, muted, white
- **Circle Backgrounds**: 7 circle color options plus 3 light tint variants for feature sections
- **Accessibility**: Decorative and semantic modes with proper ARIA attributes
- **Dark Mode**: Full support with automatic color adaptation
- **Performance**: ~300B gzipped per icon (inline SVG, no external requests)
- **WCAG AA Compliant**: 3:1 contrast ratio for UI components

## File Structure

```
components/atoms/icon/
├── icon.css              # Component styles with size/color/circle variants
├── icon.njk              # Nunjucks macro with 50+ inline SVG paths
├── icon.schema.json      # JSON Schema with metadata and icon list
├── icon.stories.ts       # Storybook stories (16 stories showcasing all features)
└── README.md            # This file
```

## Usage

### Basic Icon

```njk
{% from "atoms/icon/icon.njk" import icon %}

{{ icon({ name: 'check' }) }}
```

### With Size and Color

```njk
{{ icon({
  name: 'shield',
  size: 'lg',
  color: 'primary'
}) }}
```

### Icon in Circle (Marketing Pattern)

```njk
{{ icon({
  name: 'verified',
  size: 'xl',
  circle: true,
  circleColor: 'primary-light'
}) }}
```

### Decorative Icon (with visible text)

```njk
<p>
  {{ icon({ name: 'check', color: 'success', decorative: true }) }}
  Success! Your payment was processed.
</p>
```

### Semantic Icon (standalone)

```njk
<a href="https://example.com" target="_blank">
  {{ icon({ name: 'external-link', ariaLabel: 'Opens in new window' }) }}
</a>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `'check'` | **Required**. Icon identifier (see Available Icons below) |
| `size` | `string` | `'md'` | Size variant: `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| `color` | `string` | - | Color variant: `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `muted`, `white` |
| `circle` | `boolean` | `false` | Wrap icon in circular background |
| `circleColor` | `string` | - | Circle background color: `primary`, `secondary`, `accent`, `success`, `primary-light`, `secondary-light`, `accent-light` |
| `decorative` | `boolean` | `false` | Mark as decorative (adds `aria-hidden="true"`) |
| `ariaLabel` | `string` | - | Accessible label for semantic icons |
| `className` | `string` | - | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |

## Available Icons (50+ icons)

### UI Actions (10 icons)
`check`, `x`, `plus`, `minus`, `search`, `menu`, `settings`, `download`, `upload`, `share`

### Navigation (9 icons)
`chevron-down`, `chevron-up`, `chevron-right`, `chevron-left`, `arrow-right`, `arrow-left`, `external-link`, `link`, `home`

### Status & Alerts (8 icons)
`info`, `alert-circle`, `alert-triangle`, `verified`, `lock`, `unlock`, `eye`, `eye-off`

### Trust & Security (5 icons)
`shield`, `verified`, `lock`, `trophy`, `gift`

### Social Media (7 icons)
`twitter`, `linkedin`, `github`, `facebook`, `instagram`, `youtube`, `globe`

### Media (7 icons)
`image`, `video`, `play`, `pause`, `file`, `calendar`, `clock`

### General Purpose (7 icons)
`user`, `mail`, `phone`, `star`, `heart`, `tag`, `bookmark`

## Size Reference

| Size | CSS Value | Pixel Equivalent | Use Case |
|------|-----------|------------------|----------|
| `xs` | `0.75rem` | 12px | Inline icons, small buttons |
| `sm` | `1rem` | 16px | Body text icons, compact UI |
| `md` | `1.5rem` | 24px | **Default**. Standard UI icons |
| `lg` | `2rem` | 32px | Section icons, prominent UI |
| `xl` | `2.5rem` | 40px | Feature sections, hero areas |
| `2xl` | `3rem` | 48px | Large marketing icons |

## Color Variants

| Variant | Token | Use Case |
|---------|-------|----------|
| *inherit* | `currentColor` | **Default**. Inherits text color |
| `primary` | `--color-primary` | Brand actions, CTAs |
| `secondary` | `--color-secondary` | Secondary actions |
| `accent` | `--color-accent` | Highlights, emphasis |
| `success` | `--color-success` | Positive actions, confirmations |
| `warning` | `--color-warning` | Warnings, caution |
| `error` | `--color-error` | Errors, destructive actions |
| `muted` | `--color-text-muted` | Subtle, less important icons |
| `white` | `white` | Dark backgrounds |

## Circle Variant

The circle variant wraps icons in a circular background, perfect for feature sections on marketing sites.

### Solid Circle Backgrounds

```njk
{{ icon({ name: 'shield', circle: true, circleColor: 'primary' }) }}
{{ icon({ name: 'verified', circle: true, circleColor: 'success' }) }}
```

### Light Tint Circles (Recommended for Features)

Light tints use 10% opacity of the brand color for subtle, modern aesthetics:

```njk
{{ icon({ name: 'trophy', circle: true, circleColor: 'primary-light' }) }}
{{ icon({ name: 'gift', circle: true, circleColor: 'accent-light' }) }}
```

**Dark Mode**: Light tints automatically adjust to 20% opacity for better visibility.

## Accessibility

### Decorative vs. Semantic Icons

#### Decorative Icons (with visible text)

Icons that accompany visible text should be hidden from screen readers:

```njk
<p>
  {{ icon({ name: 'check', decorative: true }) }}
  Your order has been confirmed
</p>
```

Output: `<span class="icon" aria-hidden="true">...</span>`

#### Semantic Icons (standalone meaning)

Icons that convey meaning without text need accessible labels:

```njk
<button>
  {{ icon({ name: 'x', ariaLabel: 'Close dialog' }) }}
</button>
```

Output: `<span class="icon" aria-label="Close dialog" role="img">...</span>`

### Interactive Icons

When icons are clickable, wrap them in appropriate interactive elements:

```njk
{# Button #}
<button aria-label="Delete item">
  {{ icon({ name: 'x', decorative: true }) }}
</button>

{# Link #}
<a href="/download" aria-label="Download PDF">
  {{ icon({ name: 'download', decorative: true }) }}
</a>
```

### Color Contrast

All semantic color tokens meet WCAG AA requirements (3:1 contrast ratio for UI components). Test custom colors with contrast checkers.

## Examples

### Feature Section with Icon Circles

```njk
<div class="feature-grid">
  <div class="feature">
    {{ icon({ name: 'shield', size: 'xl', circle: true, circleColor: 'primary-light' }) }}
    <h3>Secure & Reliable</h3>
    <p>Enterprise-grade security with 99.9% uptime</p>
  </div>

  <div class="feature">
    {{ icon({ name: 'verified', size: 'xl', circle: true, circleColor: 'success-light' }) }}
    <h3>Verified Quality</h3>
    <p>Trusted by 10,000+ customers worldwide</p>
  </div>

  <div class="feature">
    {{ icon({ name: 'trophy', size: 'xl', circle: true, circleColor: 'accent-light' }) }}
    <h3>Award Winning</h3>
    <p>Recognized for excellence in customer service</p>
  </div>
</div>
```

### Social Media Links

```njk
<div class="social-links">
  <a href="https://twitter.com/example" aria-label="Follow us on Twitter">
    {{ icon({ name: 'twitter', size: 'lg', color: 'primary', decorative: true }) }}
  </a>
  <a href="https://linkedin.com/company/example" aria-label="Connect on LinkedIn">
    {{ icon({ name: 'linkedin', size: 'lg', color: 'primary', decorative: true }) }}
  </a>
  <a href="https://github.com/example" aria-label="View our GitHub">
    {{ icon({ name: 'github', size: 'lg', color: 'primary', decorative: true }) }}
  </a>
</div>
```

### Trust Signals

```njk
<ul class="trust-list">
  <li>
    {{ icon({ name: 'lock', color: 'success', size: 'sm', decorative: true }) }}
    Secure 256-bit SSL encryption
  </li>
  <li>
    {{ icon({ name: 'shield', color: 'success', size: 'sm', decorative: true }) }}
    GDPR & HIPAA compliant
  </li>
  <li>
    {{ icon({ name: 'verified', color: 'success', size: 'sm', decorative: true }) }}
    Verified by security experts
  </li>
</ul>
```

### Status Indicators

```njk
<div class="status-message status-success">
  {{ icon({ name: 'check', color: 'success', decorative: true }) }}
  <span>Payment successful</span>
</div>

<div class="status-message status-warning">
  {{ icon({ name: 'alert-triangle', color: 'warning', decorative: true }) }}
  <span>Action required</span>
</div>

<div class="status-message status-error">
  {{ icon({ name: 'alert-circle', color: 'error', decorative: true }) }}
  <span>Payment failed</span>
</div>
```

### Navigation with Icons

```njk
<nav>
  <a href="/">
    {{ icon({ name: 'home', size: 'sm', decorative: true }) }}
    Home
  </a>
  <a href="/features">
    Features
    {{ icon({ name: 'chevron-right', size: 'sm', decorative: true }) }}
  </a>
  <a href="https://docs.example.com" target="_blank">
    Documentation
    {{ icon({ name: 'external-link', size: 'xs', decorative: true }) }}
  </a>
</nav>
```

## CSS Architecture

### Component-Scoped Naming

The Icon component uses simple, flat class names (NOT BEM):

```css
.icon                  /* Base icon */
.icon-xs               /* Size variant */
.icon-primary          /* Color variant */
.icon-circle           /* Circle background */
.icon-circle-primary   /* Circle color variant */
```

### Cascade Layers

All styles are in the `@layer components` layer, allowing easy user overrides in the `@layer overrides` layer.

### Custom Properties

```css
.icon {
  --icon-size: 1.5rem;           /* Icon dimensions */
  --icon-color: currentColor;    /* Icon color */
  --icon-circle-padding: 0.75rem; /* Circle padding */
  --icon-circle-bg: ...;         /* Circle background */
}
```

## Dark Mode

Icons automatically adapt to dark mode using semantic color tokens. Circle backgrounds adjust opacity for better visibility.

```css
@media (prefers-color-scheme: dark) {
  .icon-circle {
    --icon-circle-bg: var(--color-background-tertiary);
  }

  .icon-circle-primary-light {
    --icon-circle-bg: color-mix(in srgb, var(--color-primary) 20%, transparent);
  }
}
```

## Performance

- **Inline SVG**: No external requests, instant rendering
- **Size**: ~300B gzipped per icon
- **Caching**: Component styles cached, SVGs inlined in HTML
- **Optimization**: Simple paths, minimal markup

## Browser Support

- Modern browsers with CSS custom properties
- Safari 15.4+ (for `color-mix()`)
- Firefox 88+
- Chrome 88+
- Edge 88+

## Best Practices

1. **Use decorative mode** when icons accompany visible text
2. **Always provide ariaLabel** for standalone semantic icons
3. **Prefer currentColor** for inline icons to inherit text color
4. **Use circle variant** for feature sections and marketing pages
5. **Keep icon size proportional** to surrounding text
6. **Don't use icons alone** without text labels for critical actions
7. **Test color contrast** when using custom colors
8. **Use semantic colors** (success, warning, error) for status indicators

## Related Components

- **Button**: Can contain icons for visual enhancement
- **Link**: Can include icons for external links or downloads
- **Badge**: Can include icons for enhanced visual meaning
- **Feature List**: Uses icons in circles for feature highlights

## Resources

- **Storybook**: View all 50+ icons and variants in Storybook
- **Schema**: See `icon.schema.json` for complete metadata
- **Component Guide**: `/components/COMPONENT-GUIDE.md`
- **Design Tokens**: `/components/_system/tokens.css`

## Changelog

### Version 1.0.0 (Phase 2)
- Initial release with 50+ icons
- 6 size variants (xs through 2xl)
- 8 color variants
- Circle background variant with 7 color options
- Light tint variants for feature sections
- Full accessibility support (decorative/semantic modes)
- Dark mode compatible
- WCAG AA compliant
