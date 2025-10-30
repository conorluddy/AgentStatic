# Badge Component

Small inline label for status, notifications, categories, and marketing callouts. Perfect for highlighting urgency, social proof, and product features on brochureware sites.

## Overview

The Badge component is a versatile inline label that displays concise information in a visually distinct way. Designed specifically for brochureware marketing sites, it includes extensive variant support for promotional messaging, social proof, trust signals, and status indicators.

## Features

- **7 Color Variants**: default, primary, secondary, success, warning, error, info
- **3 Sizes**: sm (10px), md (11px), lg (12px)
- **3 Visual Styles**: filled (solid), outline (border), subtle (light background)
- **2 Shape Variants**: rounded (medium radius), pill (full radius)
- **Icon Support**: Display icons before text for enhanced meaning
- **Dismissible**: Optional close button for interactive badges
- **Notification Badge**: Circular badge with count (e.g., unread messages)
- **Status Dot**: Simple colored dot indicator (e.g., online/offline)
- **Dark Mode**: Full system and manual dark mode support
- **Accessible**: WCAG AA compliant with keyboard navigation
- **Performance**: Target <400B gzipped

## Usage

### Basic Import

```nunjucks
{% from "atoms/badge/badge.njk" import badge %}
```

### Simple Badge

```nunjucks
{{ badge({ text: 'New' }) }}
```

### Color Variants

```nunjucks
{{ badge({ text: 'Default', variant: 'default' }) }}
{{ badge({ text: 'Primary', variant: 'primary' }) }}
{{ badge({ text: 'Secondary', variant: 'secondary' }) }}
{{ badge({ text: 'Success', variant: 'success' }) }}
{{ badge({ text: 'Warning', variant: 'warning' }) }}
{{ badge({ text: 'Error', variant: 'error' }) }}
{{ badge({ text: 'Info', variant: 'info' }) }}
```

### Sizes

```nunjucks
{{ badge({ text: 'Small', size: 'sm' }) }}
{{ badge({ text: 'Medium', size: 'md' }) }}
{{ badge({ text: 'Large', size: 'lg' }) }}
```

### Visual Styles

```nunjucks
{# Filled (default) - solid background #}
{{ badge({ text: 'Filled', variant: 'primary', style: 'filled' }) }}

{# Outline - transparent with border #}
{{ badge({ text: 'Outline', variant: 'primary', style: 'outline' }) }}

{# Subtle - light background with colored text #}
{{ badge({ text: 'Subtle', variant: 'primary', style: 'subtle' }) }}
```

### Shape Variants

```nunjucks
{# Default - small border radius (4px) #}
{{ badge({ text: 'Default' }) }}

{# Rounded - medium border radius (8px) #}
{{ badge({ text: 'Rounded', shape: 'rounded' }) }}

{# Pill - full border radius (circular ends) #}
{{ badge({ text: 'Pill', shape: 'pill' }) }}
```

### With Icon

```nunjucks
{{ badge({
  text: 'Verified',
  variant: 'success',
  icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}) }}
```

### Dismissible Badge

```nunjucks
{{ badge({
  text: 'Category',
  variant: 'secondary',
  dismissible: true
}) }}
```

### Notification Badge

```nunjucks
{{ badge({
  text: '5',
  notification: true,
  a11y: { ariaLabel: '5 unread messages' }
}) }}
```

### Status Dot

```nunjucks
{{ badge({
  dot: true,
  variant: 'success',
  a11y: { ariaLabel: 'Online' }
}) }}
```

## Marketing Use Cases

### Promotional Badges (Urgency)

```nunjucks
{# Discount badge - red for urgency #}
{{ badge({ text: '50% OFF', variant: 'error', size: 'lg', shape: 'pill' }) }}

{# Sale badge #}
{{ badge({ text: 'SALE', variant: 'error', shape: 'pill' }) }}

{# New product #}
{{ badge({ text: 'NEW', variant: 'info' }) }}
```

### Social Proof Badges

```nunjucks
{# Bestseller - subtle style to avoid overwhelming design #}
{{ badge({ text: 'BESTSELLER', variant: 'primary', style: 'subtle' }) }}

{# Popular choice #}
{{ badge({ text: 'POPULAR', variant: 'primary', style: 'subtle' }) }}

{# Trending product #}
{{ badge({ text: 'TRENDING', variant: 'secondary', style: 'subtle' }) }}
```

### Scarcity Badges (Urgency)

```nunjucks
{# Limited availability - warning color #}
{{ badge({ text: 'LIMITED', variant: 'warning' }) }}

{# Stock scarcity #}
{{ badge({ text: 'ONLY 3 LEFT', variant: 'warning', size: 'sm' }) }}

{# Time-limited #}
{{ badge({ text: 'LAST CHANCE', variant: 'error' }) }}
```

### Trust Badges

```nunjucks
{# Verified with checkmark icon #}
{{ badge({
  text: 'VERIFIED',
  variant: 'success',
  icon: '<svg>...</svg>'
}) }}

{# Security badge #}
{{ badge({ text: 'SECURE', variant: 'success', style: 'subtle' }) }}

{# Guarantee badge #}
{{ badge({ text: 'GUARANTEED', variant: 'success' }) }}
```

### Product Card Example

```nunjucks
<div class="product-card">
  <div class="product-image-wrapper">
    <img src="product.jpg" alt="Product">

    {# Top-left corner: Promotional badges #}
    <div class="badge-stack-topleft">
      {{ badge({ text: '50% OFF', variant: 'error', size: 'sm', shape: 'pill' }) }}
      {{ badge({ text: 'NEW', variant: 'info', size: 'sm' }) }}
    </div>

    {# Top-right corner: Social proof #}
    <div class="badge-topright">
      {{ badge({ text: 'BESTSELLER', variant: 'primary', size: 'sm', style: 'subtle' }) }}
    </div>
  </div>

  <h3>Premium Product</h3>

  {# Below title: Trust and feature badges #}
  <div class="badge-group">
    {{ badge({
      text: 'VERIFIED',
      variant: 'success',
      size: 'sm',
      icon: '<svg>...</svg>'
    }) }}
    {{ badge({ text: 'FREE SHIPPING', variant: 'secondary', size: 'sm', style: 'outline' }) }}
    {{ badge({ text: 'ONLY 3 LEFT', variant: 'warning', size: 'sm' }) }}
  </div>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | `''` | Badge text content (required for standard badges) |
| `variant` | string | `'default'` | Color variant: `default`, `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `style` | string | `'filled'` | Visual style: `filled`, `outline`, `subtle` |
| `shape` | string | - | Shape variant: `rounded`, `pill` |
| `icon` | string | - | Icon HTML/SVG to display before text |
| `dismissible` | boolean | `false` | Show close button |
| `notification` | boolean | `false` | Render as notification badge (circular with count) |
| `dot` | boolean | `false` | Render as status dot indicator |
| `id` | string | - | Unique identifier |
| `className` | string | - | Additional CSS classes |
| `attributes` | object | `{}` | Additional HTML attributes |
| `a11y` | object | `{}` | Accessibility properties |

### Accessibility Props (`a11y` object)

| Prop | Type | Description |
|------|------|-------------|
| `ariaLabel` | string | Accessible label (required for notification badges and dots) |
| `ariaDescribedBy` | string | ID of describing element |
| `ariaLive` | string | ARIA live region behavior: `polite`, `assertive`, `off` |
| `role` | string | ARIA role override (rarely needed) |

## Variants Reference

### Color Variants

- **default**: Neutral gray (for general purpose)
- **primary**: Brand blue (for primary actions/features)
- **secondary**: Brand green (for secondary actions/features)
- **success**: Green (for positive states, verification)
- **warning**: Amber (for cautions, scarcity)
- **error**: Red (for alerts, urgency, sales)
- **info**: Blue (for informational messages)

### Size Scale

- **sm**: 10px font size, compact padding (4px vertical, 4px horizontal)
- **md**: 11px font size, standard padding (4px vertical, 8px horizontal) - default
- **lg**: 12px font size, generous padding (8px vertical, 16px horizontal)

### Visual Styles

- **filled**: Solid background color (default)
- **outline**: Transparent background with colored border
- **subtle**: Light background with colored text (good for social proof)

### Shape Variants

- **Default**: Small border radius (4px)
- **rounded**: Medium border radius (8px)
- **pill**: Full border radius (circular ends)

## Accessibility

### WCAG AA Compliance

- All color variants meet WCAG AA contrast requirements (4.5:1 for text)
- Dismissible badges use semantic `<button>` element
- Keyboard navigable with visible focus states
- Close buttons have descriptive `aria-label`

### Screen Reader Support

- Notification badges **require** `ariaLabel` for context (e.g., "5 unread messages")
- Status dots **require** `ariaLabel` to convey meaning (e.g., "Online")
- Icon badges should include `ariaLabel` if icon adds meaning not in text
- Use `ariaLive` for dynamic notification updates

### Best Practices

```nunjucks
{# Good - notification with context #}
{{ badge({
  text: '5',
  notification: true,
  a11y: { ariaLabel: '5 unread messages' }
}) }}

{# Good - status dot with meaning #}
{{ badge({
  dot: true,
  variant: 'success',
  a11y: { ariaLabel: 'Online' }
}) }}

{# Good - icon adds meaning #}
{{ badge({
  text: 'Verified',
  variant: 'success',
  icon: '<svg>...</svg>',
  a11y: { ariaLabel: 'Verified seller' }
}) }}
```

## Dark Mode

The Badge component fully supports both system preference and manual dark mode:

```css
/* System preference */
@media (prefers-color-scheme: dark) { ... }

/* Manual override */
[data-theme="dark"] { ... }
```

All color variants are optimized for dark mode with appropriate contrast adjustments.

## Performance

**Target**: <400B gzipped

The Badge component uses:
- CSS custom properties for efficient variant switching
- Minimal DOM structure (single element + optional children)
- No JavaScript required (except for dismissible functionality)
- Shared design tokens from the system

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (latest)

Uses modern CSS features:
- CSS Custom Properties
- Flexbox
- Cascade Layers (`@layer`)
- Logical properties (`padding-inline`, `padding-block`)

## Marketing Psychology

### Conversion Optimization

1. **Use Error Variant for Sales**: Red creates urgency and draws attention
2. **Subtle Style for Social Proof**: Avoid overwhelming the design
3. **Pill Shape for Promotions**: More prominent, better for discounts
4. **Stack Badges Strategically**: Max 2-3 per product to avoid clutter
5. **Icons for Trust**: Checkmarks reinforce verification

### Common Patterns

- **Discount**: `variant: 'error', size: 'lg', shape: 'pill'`
- **Scarcity**: `variant: 'warning', size: 'md'`
- **Social Proof**: `variant: 'primary', style: 'subtle'`
- **Trust**: `variant: 'success', icon: checkmark`
- **New**: `variant: 'info', size: 'md'`

## Related Components

- **Button**: For actionable elements
- **Tag**: For categorization and filtering
- **Chip**: For removable selections

## File Structure

```
badge/
├── badge.css              # Component styles
├── badge.njk              # Nunjucks template
├── badge.schema.json      # JSON schema with metadata
├── badge.stories.ts       # Storybook stories
└── README.md             # This file
```

## Contributing

When modifying this component:

1. Maintain WCAG AA contrast ratios
2. Test all variants in dark mode
3. Verify keyboard navigation for dismissible badges
4. Update stories for new variants
5. Keep bundle size under 400B gzipped
6. Document marketing use cases

## Version

**Current**: 1.0.0 (Phase 2 - Basic Components)

Part of the AgentStatic design system.
