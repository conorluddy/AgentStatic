# Comparison Table Organism

> **Marketing-optimized table for comparing plans, products, or features with built-in pricing psychology principles.**

Perfect for pricing pages, product comparisons, and feature matrices. Responsive design with horizontal scroll on mobile and full table layout on desktop.

---

## Overview

The Comparison Table organism is a complex, conversion-focused component designed for brochureware marketing sites. It combines proper semantic table markup with modern responsive design and pricing psychology principles to drive conversions.

**Category:** Organism
**Composed of:** Button (atom), Badge (atom)
**Bundle Size:** ~4KB gzipped (estimated)

---

## Key Features

- ✅ **Sticky Header Row**: Plan columns remain visible while scrolling features
- ✅ **Sticky First Column**: Feature names stay visible when scrolling horizontally
- ✅ **Highlighted Columns**: Visually emphasize recommended/popular plans
- ✅ **Category Headers**: Group features into logical categories
- ✅ **Boolean Icons**: Check/cross icons for yes/no features
- ✅ **Multiple Variants**: Default, bordered, striped, minimal styles
- ✅ **Responsive Modes**: Horizontal scroll (mobile) or stacked cards
- ✅ **Dark Mode**: Full support via semantic tokens
- ✅ **WCAG AA**: Proper table semantics, keyboard navigation, contrast

---

## Marketing Psychology

This component implements proven pricing psychology principles:

### 1. **Anchoring Effect**
Show the most expensive plan first to anchor perception. This makes mid-tier pricing seem more reasonable.

```njk
{# Enterprise first anchors perception #}
columns: [
  { title: 'Enterprise', priceAmount: '$299', pricePeriod: '/mo' },
  { title: 'Pro', priceAmount: '$99', pricePeriod: '/mo', highlighted: true },
  { title: 'Basic', priceAmount: '$29', pricePeriod: '/mo' }
]
```

### 2. **Visual Prominence (Decoy Pricing)**
Highlighted columns drive 60%+ of conversions. The "Most Popular" badge leverages social proof (bandwagon effect).

```njk
{# Middle option highlighted drives conversions #}
{
  title: 'Pro',
  highlighted: true,
  badge: 'Most Popular',
  cta: { text: 'Start Trial', variant: 'primary' }
}
```

### 3. **Goldilocks Principle**
3 tiers is optimal (too few = no choice, too many = decision paralysis). Most users choose the middle option.

### 4. **Feature Ordering**
Show most valuable/differentiated features at the top. Users often scan rather than read completely.

```njk
rows: [
  { category: 'Core Features' },
  { feature: 'Most valuable feature', values: [...] },  {# Top #}
  { feature: 'Key differentiator', values: [...] },
  { category: 'Advanced Features' },
  { feature: 'Nice-to-have', values: [...] }  {# Bottom #}
]
```

### 5. **Loss Aversion (Feature Scarcity)**
Show what users DON'T get in lower tiers with X icons. Creates fear of missing out.

```njk
{ feature: 'API Access', values: [false, true, true] }  {# Basic doesn't get it #}
```

---

## Props API

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `array` | **required** | Array of plan/product column objects |
| `rows` | `array` | **required** | Array of feature row objects or category headers |
| `variant` | `string` | `'default'` | Visual style: `'default'`, `'bordered'`, `'striped'`, `'minimal'` |
| `responsive` | `string` | `'scroll'` | Mobile behavior: `'scroll'` (horizontal) or `'cards'` (stacked) |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `''` | Unique identifier |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Column Object Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Column title (e.g., "Basic", "Pro", "Enterprise") |
| `subtitle` | `string` | `''` | Optional subtitle below title |
| `price` | `string` | `''` | Simple price display (e.g., "Free", "Custom") |
| `priceAmount` | `string` | `''` | Price number for complex display (e.g., "$29") |
| `pricePeriod` | `string` | `''` | Period text (e.g., "/mo", "/year") |
| `description` | `string` | `''` | Short description below price |
| `highlighted` | `boolean` | `false` | Whether this column is highlighted/recommended |
| `badge` | `string` | `''` | Badge text (e.g., "Most Popular", "Best Value") |
| `cta` | `object` | `{}` | Call-to-action button configuration |

### Row Object Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `feature` | `string` | **required*** | Feature name/description (*or use `category`) |
| `category` | `string` | `''` | Category name (creates header row) |
| `values` | `array` | **required*** | Array of values for each column (*if `feature` used) |
| `tooltip` | `string` | `''` | Optional tooltip text for feature explanation |

### Value Types

Values in the `values` array can be:

- **`true`**: Renders as green checkmark icon + "Included" screen reader text
- **`false`**: Renders as gray X icon + "Not included" screen reader text
- **`string`**: Renders as plain text (e.g., "10 GB", "Unlimited", "Email support")
- **`number`**: Renders as plain text (e.g., 5, 100, 1000)

---

## Usage Examples

### Basic 3-Column Pricing Table

```njk
{% from "organisms/comparison-table/comparison-table.njk" import comparisonTable %}

{{ comparisonTable({
  columns: [
    {
      title: 'Basic',
      price: 'Free',
      description: 'For individuals',
      cta: { text: 'Start Free', href: '/signup' }
    },
    {
      title: 'Pro',
      priceAmount: '$29',
      pricePeriod: '/mo',
      description: 'For small teams',
      highlighted: true,
      badge: 'Most Popular',
      cta: { text: 'Start Trial', href: '/signup?plan=pro' }
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      cta: { text: 'Contact Sales', href: '/contact' }
    }
  ],
  rows: [
    { category: 'Core Features' },
    { feature: 'Users', values: ['1', '5', 'Unlimited'] },
    { feature: 'Storage', values: ['10 GB', '100 GB', 'Unlimited'] },
    { feature: 'Projects', values: ['3', '20', 'Unlimited'] },
    { category: 'Advanced Features' },
    { feature: 'API Access', values: [false, true, true] },
    { feature: 'Custom Domain', values: [false, true, true] },
    { feature: 'Priority Support', values: [false, true, true] },
    { feature: 'Advanced Analytics', values: [false, false, true] }
  ],
  variant: 'bordered',
  a11y: { caption: 'Pricing plan comparison' }
}) }}
```

### 2-Column Product Comparison

```njk
{{ comparisonTable({
  columns: [
    {
      title: 'Our Product',
      subtitle: 'The modern solution',
      highlighted: true,
      badge: 'Recommended',
      cta: { text: 'Try Free', href: '/signup' }
    },
    {
      title: 'Competitor X',
      subtitle: 'Legacy system',
      cta: { text: 'Compare', href: '/comparison' }
    }
  ],
  rows: [
    { feature: 'Setup Time', values: ['5 minutes', '2-3 days'] },
    { feature: 'User Interface', values: ['Modern & intuitive', 'Dated design'] },
    { feature: 'API Integration', values: [true, false] },
    { feature: 'Mobile App', values: [true, false] },
    { feature: 'Support Response', values: ['< 1 hour', '24-48 hours'] },
    { feature: 'Annual Cost', values: ['$1,200', '$3,600'] }
  ],
  variant: 'striped'
}) }}
```

### 4-Column Feature Matrix

```njk
{{ comparisonTable({
  columns: [
    { title: 'Free', price: '$0', cta: { text: 'Sign Up', href: '/signup' } },
    {
      title: 'Starter',
      priceAmount: '$19',
      pricePeriod: '/mo',
      cta: { text: 'Start Trial', href: '/trial' }
    },
    {
      title: 'Business',
      priceAmount: '$49',
      pricePeriod: '/mo',
      highlighted: true,
      badge: 'Best Value',
      cta: { text: 'Get Started', href: '/signup?plan=business' }
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      cta: { text: 'Contact Us', href: '/contact' }
    }
  ],
  rows: [
    { feature: 'Team Members', values: ['1', '5', '25', 'Unlimited'] },
    { feature: 'Storage', values: ['1 GB', '10 GB', '100 GB', 'Unlimited'] },
    { feature: 'File Upload Size', values: ['10 MB', '100 MB', '1 GB', 'Unlimited'] },
    { category: 'Features' },
    { feature: 'Basic Features', values: [true, true, true, true] },
    { feature: 'Advanced Features', values: [false, true, true, true] },
    { feature: 'Custom Integrations', values: [false, false, true, true] },
    { feature: 'White Label', values: [false, false, false, true] }
  ]
}) }}
```

### Competitor Comparison

```njk
{{ comparisonTable({
  columns: [
    {
      title: 'Us',
      highlighted: true,
      badge: 'Best Choice',
      cta: { text: 'Get Started', href: '/signup' }
    },
    { title: 'Competitor A', cta: { text: 'Compare', href: '#' } },
    { title: 'Competitor B', cta: { text: 'Compare', href: '#' } }
  ],
  rows: [
    { category: 'Pricing' },
    { feature: 'Starting Price', values: ['$19/mo', '$29/mo', '$49/mo'] },
    { feature: 'Free Trial', values: ['14 days', '7 days', 'None'] },
    { category: 'Features' },
    { feature: 'Core Features', values: [true, true, true] },
    { feature: 'Advanced Features', values: [true, true, false] },
    { feature: 'API Access', values: [true, false, true] },
    { feature: 'Mobile App', values: [true, false, false] },
    { category: 'Support' },
    { feature: 'Email Support', values: [true, true, true] },
    { feature: 'Live Chat', values: [true, false, false] },
    { feature: 'Phone Support', values: [true, false, true] }
  ],
  variant: 'striped',
  a11y: { caption: 'Product comparison: Our product vs competitors' }
}) }}
```

### Anchored Pricing (Highest First)

```njk
{{ comparisonTable({
  columns: [
    {
      title: 'Enterprise',
      priceAmount: '$299',
      pricePeriod: '/mo',
      description: 'Complete control',
      cta: { text: 'Contact Sales', href: '/contact' }
    },
    {
      title: 'Professional',
      priceAmount: '$99',
      pricePeriod: '/mo',
      description: 'For growing teams',
      highlighted: true,
      badge: 'Best Value',
      cta: { text: 'Start Trial', href: '/trial' }
    },
    {
      title: 'Starter',
      priceAmount: '$29',
      pricePeriod: '/mo',
      description: 'Get started',
      cta: { text: 'Sign Up', href: '/signup' }
    }
  ],
  rows: [
    { feature: 'Everything in lower tiers', values: [true, true, true] },
    { feature: 'Advanced analytics', values: [true, true, false] },
    { feature: 'Dedicated support', values: [true, false, false] }
  ]
}) }}
```

---

## Variants

### Default

Clean, minimal design with subtle borders and backgrounds.

```njk
{{ comparisonTable({ variant: 'default', ... }) }}
```

### Bordered

Full borders around table and cells for maximum definition.

```njk
{{ comparisonTable({ variant: 'bordered', ... }) }}
```

### Striped

Alternating row backgrounds for easier scanning.

```njk
{{ comparisonTable({ variant: 'striped', ... }) }}
```

### Minimal

Transparent backgrounds with minimal borders for modern aesthetic.

```njk
{{ comparisonTable({ variant: 'minimal', ... }) }}
```

---

## Responsive Behavior

### Scroll Mode (Default)

On mobile (<768px), the table scrolls horizontally. The first column (feature names) is sticky and remains visible.

```njk
{{ comparisonTable({ responsive: 'scroll', ... }) }}
```

**Features:**
- Horizontal scroll with touch gestures
- Sticky left column
- Scroll snap to columns
- Visual scroll indicators

### Cards Mode

On mobile, columns stack as individual cards. Each card shows all features for one plan.

```njk
{{ comparisonTable({ responsive: 'cards', ... }) }}
```

**Features:**
- Full-width cards
- All features visible without scrolling
- Each card is a complete comparison unit
- Good for detailed feature lists

---

## Accessibility

### WCAG AA Compliance

- ✅ **Color Contrast**: 4.5:1 for text, 3:1 for UI components
- ✅ **Semantic HTML**: Proper `<table>`, `<thead>`, `<tbody>` structure
- ✅ **Table Headers**: `scope="col"` for columns, `scope="row"` for features
- ✅ **Keyboard Navigation**: Tab through CTA buttons, arrow keys to scroll
- ✅ **Screen Readers**: Icons have text alternatives ("Included" / "Not included")
- ✅ **Focus States**: Clear, visible focus indicators
- ✅ **ARIA**: `role="region"` with `aria-label` for context

### Keyboard Navigation

- **Tab**: Move between CTA buttons in plan columns
- **Shift+Tab**: Move backward through buttons
- **Arrow Keys**: Scroll table horizontally when focused (in scroll mode)
- **Enter/Space**: Activate focused CTA button

### Screen Reader Support

```html
<!-- Category rows announce properly -->
<td colspan="4">Core Features</td>

<!-- Feature rows have proper scope -->
<th scope="row">Users</th>

<!-- Icons have text alternatives -->
<svg aria-hidden="true">...</svg>
<span class="sr-only">Included</span>
```

---

## Dark Mode

Full dark mode support via semantic tokens. All colors automatically adjust.

```css
/* Light mode (default) */
--ct-border-color: var(--color-border);
--ct-header-bg: var(--color-gray-50);
--ct-highlight-bg: var(--color-primary-50);

/* Dark mode */
--ct-border-color: var(--color-gray-700);
--ct-header-bg: var(--color-gray-800);
--ct-highlight-bg: rgba(37, 99, 235, 0.15);
```

Dark mode is activated via:
- System preference: `@media (prefers-color-scheme: dark)`
- Manual toggle: `[data-theme="dark"]` attribute

---

## Real-World Examples

### Stripe Pricing

3 tiers with middle option highlighted. Features grouped by category. Simple, scannable design.

**Key Patterns:**
- Goldilocks pricing (3 tiers)
- "Popular" badge on middle tier
- Feature categories
- Clear CTA buttons

### Notion Pricing

4 tiers with "Plus" tier highlighted as "Best for teams". Extensive feature list with categories.

**Key Patterns:**
- 4 tiers for enterprise segment
- Category headers for long feature lists
- Tooltip icons for feature explanations
- Monthly/annual toggle (not in table, but common pattern)

### Shopify Pricing

3 tiers with anchored pricing ($29, $79, $299). Shows savings percentage on annual plans.

**Key Patterns:**
- Wide price range (anchoring)
- Discount badges
- Feature limits clearly stated
- "Contact Us" for enterprise

---

## Best Practices

### Content

- **Limit columns**: 2-4 optimal (mobile constraints)
- **Feature order**: Most valuable features at top
- **Clear labels**: Avoid jargon, use benefit-focused language
- **Consistent values**: Same units/format across columns
- **Category headers**: Group related features (max 3-5 categories)

### Design

- **Highlight one**: Only 1 highlighted column (decision clarity)
- **Badge placement**: Center badge above highlighted column
- **CTA consistency**: All columns should have CTAs
- **Icon usage**: Use check/cross for yes/no only, text for complex values

### Psychology

- **Goldilocks**: 3 tiers optimal for most SaaS products
- **Anchoring**: Show expensive option first or left
- **Social proof**: "Most Popular" badge on middle tier
- **Loss aversion**: Show what users don't get in lower tiers
- **Scarcity**: "Limited time" or "Only X spots" (use sparingly)

### Performance

- **Limit rows**: 8-12 features ideal (use categories for more)
- **Lazy load**: For very long tables, consider progressive loading
- **Mobile testing**: Test horizontal scroll on real devices
- **Bundle size**: ~4KB gzipped (acceptable for complex organism)

---

## Testing

### Visual Regression

```bash
# Test all variants
npm run test:visual -- comparison-table
```

### Accessibility

```bash
# Run Pa11y audit
npm run test:a11y -- comparison-table
```

### Manual Testing Checklist

- [ ] All variants render correctly (default, bordered, striped, minimal)
- [ ] Responsive modes work (scroll, cards)
- [ ] Highlighted column stands out visually
- [ ] Badge appears centered above highlighted column
- [ ] Check/cross icons render correctly
- [ ] CTA buttons are clickable and styled properly
- [ ] Horizontal scroll works on mobile (touch gestures)
- [ ] Sticky header remains visible when scrolling
- [ ] Sticky first column remains visible when scrolling horizontally
- [ ] Dark mode colors are correct
- [ ] Keyboard navigation works (Tab through CTAs, arrow keys to scroll)
- [ ] Screen readers announce table structure properly
- [ ] Focus states are visible
- [ ] Category rows span all columns

---

## Customization

### Custom Colors

Override CSS custom properties:

```css
.comparison-table {
  --ct-highlight-bg: var(--color-secondary-50);
  --ct-highlight-border: var(--color-secondary-600);
}
```

### Custom Badge Styling

```css
.comparison-table-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
}
```

### Custom Hover Effects

```css
@media (min-width: 1024px) {
  .comparison-table-plan:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    transition: all var(--transition-base);
  }
}
```

---

## Related Components

- **Pricing Molecule** (#73): Simpler single-plan pricing card
- **Feature List Molecule** (#70): Used internally for feature rows
- **Button Atom** (#59): Used for CTAs in plan columns
- **Badge Atom** (#62): Used for "Most Popular" badges

---

## Browser Support

- ✅ Chrome 90+ (full support)
- ✅ Firefox 88+ (full support)
- ✅ Safari 14+ (full support)
- ✅ Edge 90+ (full support)
- ⚠️ IE 11 (not supported - requires polyfills for sticky positioning)

---

## Performance

- **CSS Bundle**: ~4KB gzipped
- **HTML Output**: Varies by feature count (typical: 3-5KB)
- **Critical CSS**: Table layout, sticky positioning
- **Lazy Loading**: Not required (tables are typically above-fold)

---

## Troubleshooting

### Sticky positioning not working

**Problem**: Header or first column not staying visible.
**Solution**: Ensure parent containers don't have `overflow: hidden`. Use `overflow: visible` or `overflow: auto` on parent.

### Horizontal scroll not smooth on iOS

**Problem**: Janky scrolling on iPhone/iPad.
**Solution**: Add `-webkit-overflow-scrolling: touch;` (already included in component CSS).

### Highlighted column not standing out

**Problem**: Visual prominence insufficient.
**Solution**: Increase border width, add shadow, or use stronger background color:

```css
.comparison-table-plan-highlighted {
  border: 3px solid var(--ct-highlight-border);
  box-shadow: 0 12px 32px -12px rgba(37, 99, 235, 0.4);
}
```

### Too many columns on mobile

**Problem**: 4+ columns are hard to compare on mobile.
**Solution**: Use `responsive: 'cards'` mode to stack columns as cards.

---

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub.

### Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm run test

# Build for production
npm run build
```

---

## License

MIT License - see LICENSE file for details.

---

## Changelog

### v1.0.0 (2025-10-30)
- Initial release
- 4 visual variants (default, bordered, striped, minimal)
- 2 responsive modes (scroll, cards)
- Full dark mode support
- WCAG AA accessible
- Marketing psychology principles implemented
