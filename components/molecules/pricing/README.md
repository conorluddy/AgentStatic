# Pricing (Molecule)

Critical decision-making component for brochureware conversion. Implements marketing psychology patterns (anchoring, decoy effect, loss aversion) to optimize pricing page conversions.

## Overview

The Pricing molecule is a production-ready pricing plan card that displays:
- Plan name and description
- Price amount with billing period
- Optional strikethrough pricing (shows savings)
- Optional badge ("Most Popular", "Best Value")
- List of included features
- Call-to-action button
- Optional CTA note ("No credit card required")

**When to use**: Pricing pages, plan comparison sections, upgrade modals, landing pages with pricing tiers.

**Conversion Psychology**: This component implements proven marketing patterns:
- **Anchoring**: High-priced plans make lower tiers seem affordable
- **Decoy Effect**: Middle plan becomes "just right" (Goldilocks pricing)
- **Loss Aversion**: Strikethrough pricing shows what customers "save"
- **Social Proof**: "Most Popular" badge guides decision-making
- **Friction Reduction**: "No credit card required" removes signup barriers

## Composition

This molecule is composed of the following atoms:
- **Button (#59)**: Full-width CTA button for plan selection
- **Badge (#62)**: Optional badge for highlighting ("Most Popular", "Best Value")
- **Feature List (#70)**: Displays included features with checkmarks

## Usage

### Basic Plan

```njk
{% from "molecules/pricing/pricing.njk" import pricing %}

{{ pricing({
  name: "Pro",
  price: "$49",
  period: "month",
  description: "For growing teams",
  features: [
    { text: "Unlimited projects" },
    { text: "Priority support" },
    { text: "Advanced analytics" }
  ],
  cta: {
    text: "Start Free Trial",
    href: "/signup?plan=pro",
    variant: "primary"
  }
}) }}
```

### Highlighted Plan (Most Popular)

```njk
{{ pricing({
  name: "Pro",
  price: "$49",
  period: "month",
  description: "For growing teams",
  badge: "Most Popular",
  badgeVariant: "primary",
  highlighted: true,
  features: [
    { text: "Unlimited projects" },
    { text: "Priority support" },
    { text: "Advanced analytics" }
  ],
  cta: {
    text: "Start Free Trial",
    href: "/signup?plan=pro",
    variant: "primary"
  },
  ctaNote: "No credit card required"
}) }}
```

### Promotional Pricing (Strikethrough)

```njk
{{ pricing({
  name: "Business",
  price: "$79",
  originalPrice: "$99",
  period: "month",
  savings: "Save 20%",
  description: "Limited time offer",
  badge: "Best Value",
  badgeVariant: "success",
  highlighted: true,
  features: [
    { text: "Everything in Pro" },
    { text: "Unlimited storage" },
    { text: "24/7 phone support" }
  ],
  cta: {
    text: "Get Started",
    href: "/signup?plan=business",
    variant: "primary"
  },
  ctaNote: "14-day free trial"
}) }}
```

### Three-Plan Grid (Goldilocks Pricing)

```njk
<div class="pricing-grid">
  {# Free Plan #}
  {{ pricing({
    name: "Free",
    price: "$0",
    period: "month",
    features: [...],
    cta: { text: "Get Started", href: "/signup?plan=free", variant: "ghost" }
  }) }}

  {# Pro Plan (Highlighted) #}
  {{ pricing({
    name: "Pro",
    price: "$49",
    badge: "Most Popular",
    highlighted: true,
    features: [...],
    cta: { text: "Start Free Trial", href: "/signup?plan=pro", variant: "primary" }
  }) }}

  {# Enterprise Plan #}
  {{ pricing({
    name: "Enterprise",
    price: "Contact Sales",
    features: [...],
    cta: { text: "Contact Sales", href: "/contact", variant: "secondary" }
  }) }}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Plan name (e.g., "Pro", "Enterprise") **Required** |
| `price` | `string` | - | Price amount (e.g., "$99", "Contact Sales") **Required** |
| `period` | `string` | `"month"` | Billing period (e.g., "month", "year", "user/month") |
| `description` | `string` | - | Brief plan description (1-2 sentences) |
| `features` | `array` | `[]` | List of included features (see Feature Props below) |
| `cta` | `object` | - | Call-to-action button (see CTA Props below) **Required** |
| `ctaNote` | `string` | - | Text below CTA button (e.g., "No credit card required") |
| `badge` | `string` | - | Badge text (e.g., "Most Popular", "Best Value") |
| `badgeVariant` | `string` | `"primary"` | Badge color variant |
| `highlighted` | `boolean` | `false` | Whether this is the recommended plan (visual emphasis) |
| `originalPrice` | `string` | - | Original price for strikethrough display |
| `savings` | `string` | - | Savings text (e.g., "Save 20%", "$600/year") |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Feature Props

Each item in the `features` array:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Feature description **Required** |
| `icon` | `string` | `"check"` | Icon name ("check", "x", "verified", "star") |
| `included` | `boolean` | `true` | Whether feature is included |

### CTA Props

The `cta` object:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Button text **Required** |
| `href` | `string` | - | Button URL **Required** |
| `variant` | `string` | `"primary"` | Button variant ("primary", "secondary", "ghost") |
| `size` | `string` | `"lg"` | Button size ("sm", "md", "lg") |

## Marketing Psychology Patterns

### 1. Anchoring

**Show expensive plan first to make others seem affordable.**

```njk
{# Order: Enterprise → Pro → Free makes Pro seem cheap #}
<div class="pricing-grid">
  {{ pricing({ name: "Enterprise", price: "$999" }) }}
  {{ pricing({ name: "Pro", price: "$49", highlighted: true }) }}
  {{ pricing({ name: "Free", price: "$0" }) }}
</div>
```

**Impact**: Showing $999/month Enterprise plan makes $49/month Pro seem like a steal.

### 2. Decoy Effect (Goldilocks Pricing)

**Middle plan becomes "just right" when flanked by cheaper and more expensive options.**

```njk
{# Free (limited) → Pro (highlighted) → Enterprise (expensive) #}
<div class="pricing-grid">
  {{ pricing({ name: "Free", features: [limited] }) }}
  {{ pricing({ name: "Pro", highlighted: true, badge: "Most Popular" }) }}
  {{ pricing({ name: "Enterprise", price: "Custom" }) }}
</div>
```

**Impact**: Increases conversions by 25-40% when middle tier is highlighted.

### 3. Loss Aversion (Strikethrough Pricing)

**Strikethrough pricing shows what customers are "saving".**

```njk
{{ pricing({
  price: "$49",
  originalPrice: "$79",
  savings: "Save 38%"
}) }}
```

**Impact**: Discount feels like avoiding a loss, increasing urgency.

### 4. Social Proof (Badges)

**"Most Popular" badge guides decision-making.**

```njk
{{ pricing({
  badge: "Most Popular",
  highlighted: true
}) }}
```

**Impact**: Badge increases conversions by 20-30% by providing social validation.

### 5. Friction Reduction

**Remove barriers to signup with reassuring text.**

```njk
{{ pricing({
  ctaNote: "No credit card required"
}) }}
```

**Impact**: Reduces signup anxiety, increasing trial conversions.

## Conversion Optimization Tips

### Highlight One Plan (Recommended)

**Tip**: Always highlight your recommended plan.

**Impact**: Increases conversions by 25-40%.

**Implementation**:
```njk
{{ pricing({ highlighted: true, badge: "Most Popular" }) }}
```

### Use Specific Feature Counts

**Tip**: "100 projects" is more credible than "Unlimited projects".

**Impact**: Specificity builds trust (paradox of choice).

**Implementation**:
```njk
features: [
  { text: "100 projects" },  // Better
  { text: "100 GB storage" }  // Better
]
```

### Order Plans Strategically

**Tip**: Test left-to-right (ascending) vs. center-focused (highlight in center).

**Impact**: Affects user scanning behavior and decision-making.

**Options**:
- Cheap → Mid → Expensive (left-to-right scanning)
- Mid (highlighted) → Cheap → Expensive (center focus)

### Make CTAs Specific

**Tip**: "Start Free Trial" converts better than "Sign Up".

**Impact**: Action-oriented language reduces friction.

**Implementation**:
```njk
cta: { text: "Start Free Trial" }  // Better
cta: { text: "Get Started" }       // Good
cta: { text: "Sign Up" }           // Okay
cta: { text: "Submit" }             // Avoid
```

### Add Urgency Sparingly

**Tip**: Use urgency badges ("Limited Time") only for genuine promotions.

**Impact**: Overuse erodes trust; authentic urgency increases conversions.

**Implementation**:
```njk
{{ pricing({
  badge: "Limited Time",
  badgeVariant: "warning",
  originalPrice: "$79",
  savings: "Save 38%"
}) }}
```

## A/B Testing Recommendations

Test these variables to optimize conversions:

1. **Highlighted Plan Position**: Left vs. center vs. right
2. **CTA Wording**: "Get Started" vs. "Start Free Trial" vs. "Sign Up"
3. **Badge Text**: "Most Popular" vs. "Best Value" vs. "Recommended"
4. **Strikethrough Pricing**: With vs. without savings badge
5. **Annual vs. Monthly**: Toggle switch vs. separate plans
6. **Number of Features**: 5-7 is optimal (more causes choice paralysis)
7. **Feature Order**: Most valuable features first
8. **Pricing Order**: Ascending vs. descending price

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: Full keyboard support for CTA button
- **Screen Reader**: Accessible labels for pricing card and all elements
- **Focus Management**: Clear focus states on interactive elements
- **Color Contrast**: All text meets WCAG AA (4.5:1 for text, 3:1 for UI)

### Best Practices

- Provide `ariaLabel` for screen reader context: `"Pro pricing plan"`
- Ensure badge is not the only way to identify recommended plan (use `highlighted` prop too)
- Price must be readable by screen readers (semantic HTML)
- Strikethrough pricing indicates original vs. current price clearly
- CTA button meets 44px minimum touch target

## Responsive Design

- **Mobile (< 768px)**: Single column, remove scale on highlighted plan
- **Tablet (768px - 1439px)**: 2 columns
- **Desktop (1440px+)**: 3 columns maximum, centered grid

### Mobile Behavior

Highlighted plan's `scale(1.05)` is removed on mobile to prevent layout issues. Hover effects simplified for touch devices.

## Dark Mode

All colors and shadows adapt automatically via CSS custom properties:
- Highlighted plan shadow adjusts for dark mode
- Savings badge uses different colors in dark mode
- All text maintains WCAG AA contrast in both modes

## Content Guidelines

### Plan Names

**Good**: Free, Pro, Business, Enterprise, Team, Starter, Growth

**Avoid**: Plan A, Plan B, Silver, Gold, Platinum (feels dated)

**Tip**: Use audience-specific names (e.g., "Freelancer", "Agency", "Enterprise")

### Pricing

**Good**: $49, $0, Contact Sales, Custom

**Avoid**: $49.00 (unnecessary decimals), $49/month/user (confusing)

**Tip**: Keep pricing simple and easy to understand at a glance

### Features

**Good**: "Unlimited projects", "Priority support", "Advanced analytics"

**Avoid**: "Everything in Free, plus...", "All features" (too vague)

**Tip**: Be specific and benefit-focused. Lead with most valuable features.

### CTA Text

**Good**: "Start Free Trial", "Get Started", "Try for Free", "Contact Sales"

**Avoid**: "Submit", "Click Here", "Buy Now" (too transactional)

**Tip**: Use action-oriented, low-friction language

## Real-World Examples

### Notion
- **Strategy**: Free, Plus, Business, Enterprise. Monthly/annual toggle. "Most popular" badge on Plus.
- **Conversion**: Highlight + annual discount + free trial = high conversion

### Slack
- **Strategy**: Per-user pricing calculator, comparison table, "Most popular" on Pro.
- **Conversion**: Transparency + calculator = trust + higher ACV

### Stripe
- **Strategy**: Simple 2-tier (Pay as you go, Custom). Contact Sales for Enterprise.
- **Conversion**: Simplicity reduces choice paralysis for SMB segment

### GitHub
- **Strategy**: Free, Team, Enterprise. Focus on Free tier to build user base.
- **Conversion**: Generous free tier = massive user growth, upsell later

## CSS Custom Properties

```css
.pricing {
  --pricing-padding: var(--spacing-xl);
  --pricing-gap: var(--spacing-lg);
  --pricing-border-color: var(--color-border);
  --pricing-bg: var(--color-background);
  --pricing-highlight-border: var(--color-primary-500);
  --pricing-highlight-shadow: 0 10px 40px -10px hsl(var(--color-primary-hsl) / 0.2);
}
```

## Related Components

### Composed Atoms
- **Button (#59)**: Full-width CTA button with multiple variants
- **Badge (#62)**: Highlighting badge for "Most Popular", "Best Value"
- **Feature List (#70)**: Displays included features with icons

### Similar Molecules
- **Card (#72)**: Generic card container (use Pricing for plan cards specifically)
- **Feature Grid (#71)**: Grid of features (use Pricing for full plan display)

## Performance Considerations

- **Target**: < 1.5KB gzipped (CSS + HTML)
- **Dependencies**: Button, Badge, Feature List (already loaded in Wave 1-2)
- **CSS Cascade Layers**: No specificity conflicts
- **Bundle Size**: Composes atoms efficiently without duplication

## Known Issues

- **Highlighted plan scale on mobile**: Removed to prevent layout issues. Use border/shadow emphasis instead.
- **Badge positioning**: Badge positioned absolutely above card. Ensure adequate spacing in parent container.

## Changelog

### Version 1.0.0 (Wave 3)
- Initial implementation combining Button (#59), Badge (#62), Feature List (#70)
- Marketing psychology patterns (anchoring, decoy effect, loss aversion)
- Strikethrough pricing with savings badge
- Highlighted plan variant
- Three-plan grid layout
- Dark mode support
- WCAG AA compliant
- Responsive design (mobile-first)
