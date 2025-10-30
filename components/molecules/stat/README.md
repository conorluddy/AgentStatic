# Stat (Molecule)

Statistical data display with large numbers, labels, icons, and trend indicators. Perfect for showcasing metrics, KPIs, and social proof in marketing pages.

## Overview

The **Stat** molecule combines the **Icon** atom with custom typography to create prominent statistical displays. It's specifically designed for marketing and brochureware sites to showcase impressive numbers, growth metrics, and social proof.

**Key Features:**
- Large, bold number display with prefix/suffix support
- Optional icon for visual interest and context
- Trend indicators (up/down arrows with percentages)
- Comparison text for competitive positioning
- Multiple style variants (card, featured, inline)
- Responsive horizontal grouping for hero sections
- Count-up animation support (data attribute for JavaScript)

**Common Use Cases:**
- Hero section stats ("10K+ users | 99.9% uptime | 24/7 support")
- Feature area metrics highlighting product benefits
- Dashboard-style analytics displays with trend indicators
- Social proof numbers ("500K+ developers trust us")
- Performance comparisons ("2x faster than competitors")

**Real-World Examples:**
- **Stripe**: "Millions of companies | 135+ countries | 99.99% uptime"
- **Notion**: "20M+ users | 50 employees | 100+ countries"
- **Linear**: Growth metrics with smooth count-up animations

## Composition

This molecule is composed of the following atoms:
- **Icon**: Provides visual context above/beside the stat number

## Usage

### Basic Usage

```njk
{% from "molecules/stat/stat.njk" import stat %}

{# Simple stat with number and label #}
{{ stat({
  value: '10,000+',
  label: 'Happy Customers'
}) }}
```

### With Icon

```njk
{# Stat with icon for visual interest #}
{{ stat({
  value: '99.9',
  suffix: '%',
  label: 'Uptime Guarantee',
  icon: 'shield'
}) }}
```

### With Trend Indicator

```njk
{# Stat showing growth with trend indicator #}
{{ stat({
  value: '2.4M',
  prefix: '$',
  label: 'Annual Revenue',
  icon: 'trophy',
  trend: {
    direction: 'up',
    value: '15%',
    label: 'vs last year'
  }
}) }}
```

### Card Variant

```njk
{# Elevated card with shadow #}
{{ stat({
  value: '24/7',
  label: 'Customer Support',
  icon: 'phone',
  variant: 'card'
}) }}
```

### Featured Variant

```njk
{# Highlighted stat with accent background #}
{{ stat({
  value: '500K+',
  label: 'Active Users',
  icon: 'user',
  variant: 'featured',
  size: 'lg',
  trend: {
    direction: 'up',
    value: '23%',
    label: 'this quarter'
  }
}) }}
```

### Horizontal Group (Hero Pattern)

```njk
{# Multiple stats in a row - common hero section pattern #}
<div class="stat-group stat-group-3">
  {{ stat({ value: '10K+', label: 'Active Users', icon: 'user', color: 'primary' }) }}
  {{ stat({ value: '99.9%', label: 'Uptime', icon: 'shield', color: 'success' }) }}
  {{ stat({ value: '24/7', label: 'Support', icon: 'phone', color: 'secondary' }) }}
</div>
```

### Stat Group with Dividers (Stripe Style)

```njk
{# Compact horizontal stats with dividing lines #}
<div class="stat-group stat-group-4 stat-group-dividers">
  {{ stat({ value: 'Millions', label: 'Companies', size: 'sm' }) }}
  {{ stat({ value: '135+', label: 'Countries', size: 'sm' }) }}
  {{ stat({ value: '99.99%', label: 'Uptime', size: 'sm' }) }}
  {{ stat({ value: '24/7', label: 'Support', size: 'sm' }) }}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | The statistic value (e.g., "10,000+", "99.9%", "$2.4M") |
| `label` | `string` | **required** | Label describing what the statistic represents |
| `prefix` | `string` | - | Prefix symbol (e.g., "$", "+", "~") |
| `suffix` | `string` | - | Suffix text (e.g., "%", "+", "/mo", "x") |
| `icon` | `string` | - | Icon name to display above the value |
| `trend` | `object` | - | Trend indicator configuration (see below) |
| `comparison` | `string` | - | Comparison text (e.g., "2x faster than competitors") |
| `variant` | `string` | `'default'` | Style variant - `'default'`, `'inline'`, `'card'`, `'featured'` (can combine) |
| `size` | `string` | `'md'` | Size - `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `color` | `string` | `'default'` | Number color - `'default'`, `'primary'`, `'secondary'`, `'success'`, `'gradient'` |
| `countUp` | `boolean` | `false` | Enable count-up animation (adds `data-count-to` attribute) |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Trend Props

The `trend` object configures trend indicators:

| Prop | Type | Description |
|------|------|-------------|
| `direction` | `'up' \| 'down' \| 'neutral'` | Trend direction (affects icon and color) |
| `value` | `string` | Percentage or amount of change (e.g., "15%", "2.3K") |
| `label` | `string` | Context text (e.g., "vs last year", "this quarter") |

## Variants

### Default
Basic centered stat with no background or border. Clean and minimal.

**Use when**: You want a simple stat in a section with its own background.

### Inline
Horizontal layout with icon, number, and label side-by-side.

**Use when**: Space is limited or you want a more compact appearance.

### Card
Elevated card with padding, border, and subtle shadow. Hover effect included.

**Use when**: Stats need visual separation or should be clickable/interactive.

### Featured
Accent background with gradient and emphasized border. Makes the stat stand out.

**Use when**: Highlighting the most important metric or creating visual hierarchy.

**Combining variants**: Use space-separated values like `variant: "card featured"` to apply multiple styles.

## Size Variants

- **sm**: Compact stats for dense layouts or secondary metrics
- **md** (default): Standard size for most use cases
- **lg**: Larger stats for emphasis in feature sections
- **xl**: Hero-sized stats for maximum visual impact

## Color Variants

Applied to the number value only:

- **default**: Uses standard text color
- **primary**: Brand primary color (blue)
- **secondary**: Brand secondary color (green)
- **success**: Success color (green) - good for positive metrics
- **gradient**: Gradient from primary to secondary - eye-catching

## Horizontal Groups

Use the `.stat-group` wrapper class to create responsive horizontal layouts:

```css
.stat-group           /* Auto-fit columns, responsive */
.stat-group-3         /* Force 3 columns on desktop */
.stat-group-4         /* Force 4 columns on desktop */
.stat-group-dividers  /* Add vertical dividers between stats */
```

**Responsive behavior:**
- Mobile (< 768px): Single column stack
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3-4 columns (auto-fit or explicit)

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: Not required (display-only component)
- **Screen Reader**: Numbers and labels are readable in order
- **Color Contrast**: All text meets WCAG AA contrast ratios (4.5:1 for text)
- **Icons**: Marked as decorative (`aria-hidden="true"`)
- **Tabular Numbers**: Uses `font-variant-numeric: tabular-nums` for alignment

### Best Practices

- Always provide both `value` and `label` for context
- Use clear, descriptive labels that explain what the number represents
- Ensure trend colors (green/red) are not the only indicator (icon + text too)
- Test with screen readers to verify proper announcement order
- Consider providing a longer description via `a11y.ariaLabel` for complex stats

## Responsive Design

- **Mobile (< 768px)**:
  - Stat groups stack vertically
  - Font sizes scale down slightly
  - Full width for better readability

- **Tablet (768px+)**:
  - Stat groups display 2 columns
  - Standard font sizes
  - Balanced spacing

- **Desktop (1024px+)**:
  - Stat groups display 3-4 columns
  - Optimal font sizes and spacing
  - Horizontal dividers work best

## Dark Mode

All variants adapt to dark mode automatically using CSS custom properties:

- Card backgrounds become dark gray
- Border colors adjust for proper contrast
- Featured gradient adapts to darker tones
- Number colors maintain proper contrast ratios

Enable dark mode with `data-theme="dark"` on a parent element.

## Count-Up Animation

Set `countUp: true` to add a `data-count-to` attribute for JavaScript animation libraries:

```njk
{{ stat({
  value: '10000',
  label: 'Users',
  countUp: true
}) }}
```

This renders: `<span class="stat-value" data-count-to="10000">10000</span>`

Popular libraries that support this pattern:
- CountUp.js
- Odometer
- Waypoints + custom animation

**Note**: Animation logic is not included in this component. Implement using a separate JavaScript library triggered on scroll or page load.

## Examples

### Example 1: Hero Section Stats

```njk
<section style="padding: 4rem 0; text-align: center;">
  <h2>Trusted by Thousands</h2>
  <div class="stat-group stat-group-3" style="margin-top: 3rem;">
    {{ stat({
      value: '50K+',
      label: 'Developers',
      icon: 'user',
      size: 'lg',
      color: 'primary'
    }) }}
    {{ stat({
      value: '99.9',
      suffix: '%',
      label: 'Uptime SLA',
      icon: 'shield',
      size: 'lg',
      color: 'success'
    }) }}
    {{ stat({
      value: '24/7',
      label: 'Support',
      icon: 'phone',
      size: 'lg',
      color: 'secondary'
    }) }}
  </div>
</section>
```

### Example 2: Dashboard Stats with Trends

```njk
<div class="stat-group stat-group-3">
  {{ stat({
    value: '245K',
    label: 'Total Users',
    icon: 'user',
    variant: 'card',
    trend: { direction: 'up', value: '12%', label: 'vs last month' }
  }) }}
  {{ stat({
    value: '98.7',
    suffix: '%',
    label: 'Customer Satisfaction',
    icon: 'heart',
    variant: 'card',
    trend: { direction: 'up', value: '2.3%', label: 'vs last month' }
  }) }}
  {{ stat({
    value: '1.2M',
    prefix: '$',
    label: 'Monthly Revenue',
    icon: 'trophy',
    variant: 'card',
    trend: { direction: 'up', value: '18%', label: 'vs last month' }
  }) }}
</div>
```

### Example 3: Competitive Comparison

```njk
<div class="stat-group stat-group-2">
  {{ stat({
    value: '2x',
    label: 'Faster Performance',
    icon: 'star',
    variant: 'featured',
    size: 'lg',
    comparison: '2x faster than competitors',
    color: 'gradient'
  }) }}
  {{ stat({
    value: '50',
    suffix: '%',
    label: 'Lower Cost',
    icon: 'gift',
    variant: 'featured',
    size: 'lg',
    comparison: '50% more affordable',
    color: 'gradient'
  }) }}
</div>
```

## CSS Custom Properties

Customize the stat component using CSS variables:

```css
.stat {
  --stat-gap: var(--spacing-sm);           /* Gap between elements */
  --stat-value-size: var(--font-size-3xl); /* Number font size */
  --stat-label-size: var(--font-size-base);/* Label font size */
  --stat-icon-size: 2.5rem;                /* Icon dimensions */
}
```

**Size variant overrides:**

```css
.stat-sm {
  --stat-value-size: var(--font-size-xl);
  --stat-label-size: var(--font-size-sm);
  --stat-icon-size: 1.5rem;
}

.stat-lg {
  --stat-value-size: var(--font-size-4xl);
  --stat-label-size: var(--font-size-lg);
  --stat-icon-size: 3rem;
}

.stat-xl {
  --stat-value-size: var(--font-size-5xl);
  --stat-label-size: var(--font-size-xl);
  --stat-icon-size: 4rem;
}
```

## Related Components

### Composed Atoms
- **Icon**: Provides visual context and brand personality to stats

### Similar Molecules
- **Card**: Similar elevated container style, but for general content
- **Metric Badge**: Smaller inline stats without icons (if implemented)

## Performance Considerations

- **Bundle Size**: <1KB gzipped (CSS only, no JavaScript)
- **Render Time**: Fast - pure CSS with no complex calculations
- **Reflow**: Minimal - uses flexbox and grid for efficient layouts
- **Count-Up Animation**: Optional - implement separately with lightweight library

**Optimization Tips:**
- Use `stat-group` for efficient grid layouts
- Avoid excessive nesting of stat components
- Count-up animations should be throttled on scroll

## Marketing Best Practices

1. **Use Round Numbers**: "10K+" is more impactful than "9,847"
2. **Show Growth**: Trend indicators increase engagement
3. **Provide Context**: Comparison text builds credibility
4. **Group Related Stats**: 3-4 stats work best in hero sections
5. **Visual Interest**: Icons make stats more scannable
6. **Hierarchy**: Use size variants to emphasize key metrics

## Known Issues

- Count-up animation requires external JavaScript library (not included)
- Very long labels may wrap awkwardly on small screens (consider abbreviating)
- Gradient color variant may not print well (use solid colors for print styles)

## Changelog

### Version 1.0.0 (Wave 1)
- Initial implementation of Stat molecule
- Composition of Icon atom with custom typography
- Support for all variants (default, inline, card, featured)
- Size variants (sm, md, lg, xl)
- Color variants (default, primary, secondary, success, gradient)
- Trend indicators with up/down/neutral directions
- Horizontal stat groups with responsive behavior
- Dark mode support
- WCAG AA accessibility compliance
