# Feature List

List of features with icons and text. Used in pricing tables, product descriptions, and feature comparison sections.

## Overview

The Feature List molecule combines the Icon and Text atoms to create flexible feature lists commonly used in marketing pages. It supports multiple layout options, density variants, and mixed check/cross icons for comparison tables.

**Type**: Molecule
**Category**: Content Display
**Dependencies**: Icon (atom), Text (atom)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<FeatureItem>` | `[]` | **Required**. Array of feature items to display |
| `iconPosition` | `'left' \| 'top'` | `'left'` | Position of icons relative to text |
| `density` | `'compact' \| 'normal' \| 'spacious'` | `'normal'` | Spacing density between items |
| `columns` | `1 \| 2` | `1` | Number of columns (responsive on mobile) |
| `defaultIcon` | `string` | `'check'` | Default icon for items without explicit icon |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Unique identifier for the component |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y.ariaLabel` | `string` | - | Accessible label for the list |

### FeatureItem Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | **Required**. Feature description |
| `icon` | `string` | Uses `defaultIcon` | Icon name (check, x, verified, star, shield, etc.) |
| `included` | `boolean` | `true` | Whether feature is included (affects styling) |

## Usage

### Basic Import

```njk
{% from "molecules/feature-list/feature-list.njk" import featureList %}
```

### Default Feature List

Simple list with checkmarks:

```njk
{{ featureList({
  items: [
    { text: 'Unlimited users' },
    { text: '24/7 customer support' },
    { text: 'Advanced analytics' },
    { text: 'Custom branding' }
  ]
}) }}
```

### Pricing Table Features

Show included and excluded features:

```njk
{{ featureList({
  items: [
    { text: 'Unlimited projects', icon: 'check' },
    { text: 'Priority support', icon: 'check' },
    { text: 'Advanced reporting', icon: 'check' },
    { text: 'Custom domain', icon: 'x', included: false },
    { text: 'White-label branding', icon: 'x', included: false }
  ]
}) }}
```

### Two-Column Layout

Space-efficient layout for long lists:

```njk
{{ featureList({
  columns: 2,
  density: 'compact',
  items: [
    { text: 'SSL certificate' },
    { text: 'CDN included' },
    { text: '99.9% uptime' },
    { text: 'Daily backups' },
    { text: 'Email support' },
    { text: 'API access' }
  ]
}) }}
```

### Top-Aligned Icons

For longer feature descriptions:

```njk
{{ featureList({
  iconPosition: 'top',
  density: 'spacious',
  items: [
    { text: 'Enterprise-grade security with end-to-end encryption' },
    { text: '24/7 dedicated support with guaranteed response times' },
    { text: 'Unlimited storage and bandwidth for your content' }
  ]
}) }}
```

### Custom Icons

Different icons for each feature:

```njk
{{ featureList({
  defaultIcon: 'star',
  items: [
    { text: 'Award-winning customer service', icon: 'trophy' },
    { text: 'Trusted by 10,000+ businesses', icon: 'shield' },
    { text: '30-day money-back guarantee', icon: 'verified' },
    { text: 'Free lifetime updates', icon: 'gift' }
  ]
}) }}
```

## Layout Options

### Icon Position

**Left (default)**: Icon appears to the left of text, aligned with the first line.

```njk
{{ featureList({
  iconPosition: 'left',
  items: [...]
}) }}
```

**Top**: Icon appears above text, useful for longer descriptions.

```njk
{{ featureList({
  iconPosition: 'top',
  items: [...]
}) }}
```

### Density Variants

**Compact**: Reduced spacing for tight layouts (e.g., sidebars, cards).

```njk
{{ featureList({
  density: 'compact',
  items: [...]
}) }}
```

**Normal (default)**: Standard spacing for most use cases.

```njk
{{ featureList({
  density: 'normal',
  items: [...]
}) }}
```

**Spacious**: Increased spacing for hero sections and feature highlights.

```njk
{{ featureList({
  density: 'spacious',
  items: [...]
}) }}
```

### Column Layout

**Single Column (default)**: Vertical list.

```njk
{{ featureList({
  columns: 1,
  items: [...]
}) }}
```

**Two Columns**: Grid layout (automatically collapses to single column on mobile).

```njk
{{ featureList({
  columns: 2,
  items: [...]
}) }}
```

## Common Patterns

### Pricing Card Features

```njk
<div class="pricing-card">
  <h3>Starter Plan</h3>
  <div class="price">$29/month</div>

  {{ featureList({
    density: 'compact',
    items: [
      { text: 'Up to 10 projects', icon: 'check' },
      { text: '5GB storage', icon: 'check' },
      { text: 'Email support', icon: 'check' },
      { text: 'Team collaboration', icon: 'x', included: false },
      { text: 'Priority support', icon: 'x', included: false }
    ]
  }) }}

  <button>Get Started</button>
</div>
```

### Product Page Features

```njk
<section class="product-features">
  <h2>Everything you need to succeed</h2>

  {{ featureList({
    columns: 2,
    items: [
      { text: 'Lightning-fast performance' },
      { text: 'Mobile-optimized design' },
      { text: 'SEO-friendly structure' },
      { text: 'Built-in analytics' },
      { text: 'Automatic backups' },
      { text: 'SSL security included' }
    ]
  }) }}
</section>
```

### Comparison Table Column

```njk
<div class="comparison-column">
  <h4>Pro Plan</h4>

  {{ featureList({
    items: [
      { text: 'Core features', icon: 'check' },
      { text: 'Email support', icon: 'check' },
      { text: 'Priority support', icon: 'check' },
      { text: 'Advanced analytics', icon: 'check' },
      { text: 'Enterprise SSO', icon: 'x', included: false }
    ]
  }) }}
</div>
```

## Styling

The component uses CSS custom properties from the design system:

- `--space-xs`, `--space-sm`, `--space-md`, `--space-lg` - Spacing scale
- `--color-success` - Check icon color (green)
- `--color-error` - Cross icon color (red)
- `--color-text-muted` - Excluded feature text color

### Custom Styling

Add additional classes for custom styling:

```njk
{{ featureList({
  className: 'my-custom-features',
  items: [...]
}) }}
```

```css
.my-custom-features {
  max-width: 600px;
  margin: 0 auto;
}

.my-custom-features .feature-list-text {
  font-size: var(--font-size-lg);
}
```

## Accessibility

- **Semantic HTML**: Uses `<ul>` and `<li>` for proper list structure
- **Decorative Icons**: Icons are marked `aria-hidden="true"` since text conveys meaning
- **Color Independence**: Excluded items use both color AND muted text styling
- **High Contrast**: Strikethrough added to excluded items in high contrast mode
- **Screen Readers**: Optional `aria-label` for distinguishing multiple lists

### Accessibility Example

```njk
{{ featureList({
  items: [...],
  a11y: {
    ariaLabel: 'Premium plan features'
  }
}) }}
```

## Dark Mode

The component automatically adapts to dark mode:

- Text colors adjust via CSS custom properties
- Icon colors maintain proper contrast
- Muted text remains readable in both themes

No additional configuration required for dark mode support.

## Performance

- **Target**: <800B gzipped
- **Minimal CSS**: Only layout and spacing rules
- **Composable**: Reuses Icon and Text atoms
- **No JavaScript**: Pure CSS component

## Real-World Examples

### SaaS Pricing Page

```njk
<div class="pricing-grid">
  <div class="pricing-tier">
    <h3>Basic</h3>
    <p class="price">$9/mo</p>
    {{ featureList({
      density: 'compact',
      items: [
        { text: '5 projects' },
        { text: '1GB storage' },
        { text: 'Email support' }
      ]
    }) }}
  </div>

  <div class="pricing-tier">
    <h3>Pro</h3>
    <p class="price">$29/mo</p>
    {{ featureList({
      density: 'compact',
      items: [
        { text: 'Unlimited projects' },
        { text: '50GB storage' },
        { text: 'Priority support' },
        { text: 'Advanced analytics' }
      ]
    }) }}
  </div>
</div>
```

### Product Landing Page

```njk
<section class="features-section">
  <div class="container">
    <h2>Powerful Features</h2>
    <p class="lead">Everything you need to build amazing products</p>

    {{ featureList({
      columns: 2,
      density: 'spacious',
      defaultIcon: 'verified',
      items: [
        { text: 'Enterprise-grade security' },
        { text: '99.99% uptime guarantee' },
        { text: 'Global CDN delivery' },
        { text: 'Real-time collaboration' },
        { text: 'Advanced permissions' },
        { text: 'Audit logs' }
      ]
    }) }}
  </div>
</section>
```

## Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

Uses modern CSS features:
- CSS Grid (for two-column layout)
- Flexbox (for icon + text layout)
- CSS Custom Properties
- Logical properties (`inline`, `block`)

## Related Components

- **Icon (atom)**: Displays feature icons
- **Text (atom)**: Renders feature descriptions
- **Pricing Card (organism)**: Often contains feature lists
- **Comparison Table (organism)**: Uses feature lists in columns

## Migration Notes

This component replaces manual feature list markup:

**Before**:
```html
<ul class="features">
  <li><span class="icon">✓</span> Unlimited users</li>
  <li><span class="icon">✓</span> 24/7 support</li>
</ul>
```

**After**:
```njk
{{ featureList({
  items: [
    { text: 'Unlimited users' },
    { text: '24/7 support' }
  ]
}) }}
```

Benefits:
- Consistent styling across the site
- Built-in dark mode support
- Accessible by default
- Easier to maintain
- Configurable layouts and densities
