# CTA Block Molecule

**PRIMARY CONVERSION ELEMENT** - Call-to-action block combining heading, description, and buttons with marketing enhancements. This is where conversions happen.

## Overview

The CTA Block is a critical conversion element designed for brochureware marketing sites. It combines a compelling headline, descriptive text, and action buttons with optional trust signals and urgency elements to drive user conversions.

### Key Features

- **Three Layout Variants**: Centered (default), horizontal split, inline
- **Background Options**: Default, primary brand color, gradients, image backgrounds
- **Trust Signals**: Customer count, star ratings, social proof
- **Urgency Elements**: Countdown timers, scarcity indicators
- **Responsive Design**: Full mobile support with stacking layouts
- **Dark Mode**: Automatic theme switching
- **WCAG AA Compliant**: Meets accessibility standards

### Marketing Context

- **Purpose**: Final conversion push before footer on marketing pages
- **Impact**: Trust signals increase conversions by 15-25% (CXL research)
- **Placement**: Before footer, end of major sections, landing pages
- **Testing**: High-priority A/B testing candidate for headline, CTA copy, background

## Usage

### Basic Import

```njk
{% from "molecules/cta-block/cta-block.njk" import ctaBlock %}
```

### Simple CTA Block

```njk
{{ ctaBlock({
  headline: 'Ready to get started?',
  description: 'Join thousands of happy customers using our platform.',
  cta: {
    primary: {
      text: 'Start Free Trial',
      href: '/signup'
    }
  }
}) }}
```

### With Trust Signal

```njk
{{ ctaBlock({
  headline: 'Transform your workflow',
  description: 'Streamline your team\'s productivity with our all-in-one platform.',
  cta: {
    primary: { text: 'Get Started Free', href: '/signup' },
    secondary: { text: 'View Demo', href: '/demo' }
  },
  trustSignal: '⭐⭐⭐⭐⭐ Trusted by 10,000+ happy customers'
}) }}
```

### With Urgency Element

```njk
{{ ctaBlock({
  eyebrow: 'Limited Time Offer',
  headline: 'Get 50% off today',
  description: 'Save 50% on all annual plans for the next 24 hours only.',
  urgency: '⏰ Offer ends in 24 hours',
  cta: {
    primary: { text: 'Claim Discount', href: '/pricing' }
  },
  trustSignal: 'Join 10,000+ customers who saved an average of $500',
  background: { type: 'gradient' }
}) }}
```

### Horizontal Split Layout

```njk
{{ ctaBlock({
  layout: 'split',
  headline: 'See it in action',
  description: 'Watch how our platform transforms your workflow in minutes.',
  cta: {
    primary: { text: 'Watch Demo', href: '/demo' },
    secondary: { text: 'Start Free Trial', href: '/signup' }
  },
  visual: '/images/demo-screenshot.png'
}) }}
```

### Inline Layout (Less Prominent)

```njk
{{ ctaBlock({
  layout: 'inline',
  headline: 'Stay updated',
  description: 'Get our weekly newsletter with tips and insights.',
  cta: {
    primary: { text: 'Subscribe', href: '/newsletter' }
  }
}) }}
```

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `headline` | `string` | Main heading text - the primary conversion message |
| `description` | `string` | Body text explaining the CTA (max 300 chars) |
| `cta` | `object` | CTA buttons configuration (see below) |
| `cta.primary` | `object` | Primary button (required) |
| `cta.primary.text` | `string` | Button text - use action verbs (Start, Get, Claim) |
| `cta.primary.href` | `string` | Button destination URL |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'centered' \| 'split' \| 'inline'` | `'centered'` | Layout style |
| `background` | `object` | `{ type: 'default' }` | Background configuration |
| `background.type` | `'default' \| 'primary' \| 'gradient' \| 'gradient-subtle' \| 'image'` | `'default'` | Background type |
| `background.image` | `string` | - | Image URL (required for `type: 'image'`) |
| `background.overlay` | `'dark' \| 'light'` | `'dark'` | Overlay for image backgrounds |
| `eyebrow` | `string` | - | Small label above heading (max 50 chars) |
| `headingLevel` | `1-6` | `2` | Semantic heading level |
| `subheadline` | `string` | - | Supporting text below headline (max 150 chars) |
| `cta.secondary` | `object` | - | Secondary button (optional) |
| `cta.secondary.text` | `string` | - | Secondary button text |
| `cta.secondary.href` | `string` | - | Secondary button URL |
| `cta.secondary.variant` | `string` | `'ghost'` | Button variant |
| `trustSignal` | `string \| object` | - | Trust signal text or HTML |
| `urgency` | `string \| object` | - | Urgency element text or HTML |
| `visual` | `string \| object` | - | Image URL or HTML for split layout |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | - | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

## Layout Variants

### Centered (Default)

**Use Case**: Primary conversion blocks, most prominent placement

- Content centered with generous padding
- Full-width buttons on mobile
- Maximum visual impact

```njk
{{ ctaBlock({
  layout: 'centered',
  headline: 'Join thousands of users',
  description: 'Get started today with our free trial.',
  cta: { primary: { text: 'Start Free Trial', href: '/signup' } }
}) }}
```

### Horizontal Split

**Use Case**: Mid-page CTAs with product screenshots, demo videos

- Image/illustration on one side
- Content on the other side
- Stacks vertically on mobile (<768px)

```njk
{{ ctaBlock({
  layout: 'split',
  headline: 'See it in action',
  description: 'Watch how we transform workflows.',
  cta: { primary: { text: 'Watch Demo', href: '/demo' } },
  visual: '/images/demo.png'
}) }}
```

### Inline

**Use Case**: Secondary CTAs, newsletter signups, less critical conversions

- Compact horizontal layout
- Content and button side-by-side
- Stacks vertically on mobile

```njk
{{ ctaBlock({
  layout: 'inline',
  headline: 'Stay updated',
  description: 'Get weekly tips and insights.',
  cta: { primary: { text: 'Subscribe', href: '/newsletter' } }
}) }}
```

## Background Variants

### Default
Light gray background (`--color-surface-alt`)

### Primary
Bold brand color background (`--color-primary-600`)
- White text for contrast
- High visibility

### Gradient
Eye-catching gradient (primary → secondary colors)
- Maximum visual impact
- Use sparingly for key CTAs

### Gradient Subtle
Softer gradient (light primary → light secondary)
- Less aggressive than full gradient
- Good for most CTAs

### Image
Background image with overlay
- Specify `background.image` URL
- Choose `overlay: 'dark'` or `'light'`
- Ensures text readability

## Conversion Best Practices

### CTA Copy Guidelines

**DO**:
- Use first-person: "Start My Trial" > "Start Trial"
- Use action verbs: Start, Get, Claim, Join, Access
- Be specific: "Download Free Guide" > "Download"
- Show value: "Start Free Trial" > "Sign Up"

**DON'T**:
- Generic text: "Click Here", "Submit"
- Passive voice: "Be Started"
- Hide value: "Continue"
- Jargon: "Initiate Onboarding Flow"

### Headline Testing

Test these headline types:

1. **Benefit-focused**: "Build websites 10x faster"
2. **Feature-focused**: "AI-powered site builder"
3. **Outcome-focused**: "Ship your site in hours, not days"

### Trust Signals

Effective trust signals:
- Customer count: "Join 10,000+ happy customers"
- Star rating: "⭐⭐⭐⭐⭐ 4.9/5 from 2,000+ reviews"
- Brand names: "Trusted by Microsoft, Google, Amazon"
- Guarantees: "No credit card required • Cancel anytime"

### Urgency Elements

Create FOMO (fear of missing out):
- Countdown: "Offer ends in 24 hours"
- Scarcity: "Only 3 spots left"
- Discount: "Limited time: 50% off"
- Deadline: "Join before midnight to save 20%"

## A/B Testing Recommendations

**Test Priority**: HIGH - CTA blocks are conversion bottlenecks

### What to Test

1. **Urgency** (Test first):
   - With countdown timer vs. Without
   - With scarcity indicator vs. Without

2. **Social Proof**:
   - With customer count vs. Without
   - With star rating vs. Without

3. **Layout**:
   - Centered vs. Horizontal split (with image)
   - With illustration vs. Plain background

4. **Background**:
   - Gradient vs. Solid vs. Image
   - Bold gradient vs. Subtle gradient

5. **CTA Copy**:
   - First-person vs. Third-person
   - Action verb variations (Start vs. Get vs. Claim)

## Accessibility

### WCAG AA Compliance

- Semantic `<section>` element
- Configurable heading levels (h1-h6)
- Color contrast: 4.5:1 for text, 3:1 for UI
- Touch targets: 44x44px minimum (buttons)
- Focus states: 3px outline, 2px offset
- Screen reader support: Proper semantic markup

### Keyboard Navigation

- All buttons keyboard accessible
- Visible focus indicators
- Logical tab order

## Responsive Behavior

### Mobile (<768px)
- Buttons become full-width
- Split layout stacks vertically
- Visual appears first (above content)
- Inline layout stacks vertically
- Reduced padding

### Tablet (768px+)
- Increased padding
- Larger text
- Side-by-side layouts maintain

### Desktop (1024px+)
- Maximum padding
- Larger border radius
- Full horizontal layouts

## Dark Mode

Automatic dark mode support:
- System preference detection
- Manual override via `[data-theme="dark"]`
- All colors maintain WCAG AA contrast
- Urgency element background adjusted
- Gradient backgrounds adapted

## Performance

- **Bundle Size**: 1.4KB gzipped (target: <1.5KB)
- **Pure CSS**: No JavaScript required
- **Lazy Loading**: Images in split layout
- **Fast Rendering**: Minimal DOM nesting

## Real-World Examples

### ConvertKit-Style Email CTA

```njk
{{ ctaBlock({
  headline: 'Grow your audience',
  subheadline: 'Join 50,000+ creators building their email list',
  description: 'The email marketing platform designed for creators.',
  cta: {
    primary: { text: 'Start Free Trial', href: '/signup' },
    secondary: { text: 'See How It Works', href: '/demo' }
  },
  trustSignal: 'Trusted by Pat Flynn, James Clear, and Tim Ferriss',
  background: { type: 'gradient-subtle' }
}) }}
```

### Stripe-Style Developer CTA

```njk
{{ ctaBlock({
  headline: 'Start your integration',
  description: 'Get up and running with just a few lines of code.',
  cta: {
    primary: { text: 'View Documentation', href: '/docs' },
    secondary: { text: 'Explore API', href: '/api' }
  },
  trustSignal: 'Millions of companies of all sizes use Stripe'
}) }}
```

### Limited-Time Offer CTA

```njk
{{ ctaBlock({
  eyebrow: 'Limited Offer',
  headline: 'Save 50% today only',
  description: 'Our biggest discount of the year. Annual plans 50% off.',
  urgency: '🔥 Offer ends at midnight',
  cta: {
    primary: { text: 'Claim Discount', href: '/pricing' }
  },
  trustSignal: 'Join 10,000+ customers who saved an average of $500',
  background: { type: 'gradient' }
}) }}
```

## Dependencies

### Atoms
- **Button** (`atoms/button`): Primary and secondary CTAs
- **Heading** (`atoms/heading`): Main headline with configurable level

### Design Tokens
- `spacing-*`: Padding and gaps
- `color-*`: Background and text colors
- `font-size-*`: Typography scale
- `border-radius-*`: Corner rounding

## Related Components

- `atoms/button` - CTA buttons
- `atoms/heading` - Headline
- `organisms/hero-section` - Similar conversion focus
- `molecules/card` - Alternative content block

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern CSS features used:
- CSS Custom Properties
- CSS Grid (split layout)
- Flexbox
- `clamp()` for fluid typography

## Bundle Size

**Target**: <1.5KB gzipped

Current: 1.4KB gzipped (CSS + HTML)

Optimizations:
- Pure CSS (no preprocessors)
- Cascade layers for specificity
- Efficient selectors
- Minimal DOM nesting

## Version History

- **1.0.0** (Current): Initial release with all features

## Support

For issues or questions about this component:
- Check GitHub Issues: #68
- Review ISSUE-ENRICHMENT-GUIDE.md for marketing context
- See component schema: `cta-block.schema.json`
