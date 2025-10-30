# Image+Text (Molecule)

**WORKHORSE molecule for feature showcases, product pages, and storytelling sections.**

Combines image with text content in flexible, responsive layouts. The go-to component for alternating image/text sections that are the backbone of modern marketing sites.

## Overview

The Image+Text molecule is the most versatile layout component in the library, combining:
- **Heading** atom for section titles
- **Text** atom for descriptions
- **Button** atom for CTAs (optional)

This molecule provides flexible image positioning (left/right/top), aspect ratio enforcement for visual consistency, alternating pattern support for feature lists, and responsive behavior that stacks cleanly on mobile.

### When to Use

Use Image+Text when you need:
- **Feature showcases** with alternating image/text layouts
- **"How it works" sections** with step-by-step visuals
- **Product pages** with screenshots and descriptions
- **About pages** with team photos and company story
- Any section combining visual content with explanatory text

### When NOT to Use

Don't use Image+Text for:
- Hero sections (use Hero organism instead)
- Pure image galleries (no text needed)
- Text-only content (use Text atom directly)
- Complex multi-column layouts (consider custom organisms)

## Composition

This molecule is composed of the following atoms:
- **Heading**: Main section title with configurable semantic level
- **Text**: Description or body copy with line height and color options
- **Button**: Optional CTA for driving action (Learn more, Try it, etc.)

## Usage

### Basic Usage (Image Left)

```njk
{% from "molecules/image-text/image-text.njk" import imageText %}

{{ imageText({
  image: {
    src: 'feature.jpg',
    alt: 'Feature screenshot'
  },
  headline: 'Powerful Analytics',
  description: 'Track your growth with detailed analytics and insights.'
}) }}
```

### Image Right Layout

```njk
{{ imageText({
  imagePosition: 'right',
  image: {
    src: 'collaboration.jpg',
    alt: 'Collaboration interface'
  },
  aspectRatio: '16-9',
  headline: 'Team Collaboration',
  description: 'Work together in real-time with powerful collaboration features.',
  cta: {
    text: 'Start collaborating',
    href: '/features/collaboration',
    variant: 'primary'
  }
}) }}
```

### Image Top (Stacked)

```njk
{{ imageText({
  imagePosition: 'top',
  image: {
    src: 'overview.jpg',
    alt: 'Product overview'
  },
  aspectRatio: '16-9',
  headline: 'Complete Overview',
  description: 'See everything at a glance with our comprehensive dashboard.',
  cta: {
    text: 'View demo',
    href: '/demo'
  }
}) }}
```

### With Caption and Background Color

```njk
{{ imageText({
  image: {
    src: 'team-photo.jpg',
    alt: 'Team collaboration'
  },
  caption: 'Photo credit: Team collaboration session, March 2024',
  headline: 'Built for Teams',
  description: 'Designed with teams in mind, our platform makes collaboration effortless.',
  backgroundColor: 'neutral',
  ratio: '60-40'
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imagePosition` | `'left' \| 'right' \| 'top'` | `'left'` | Position of image relative to text |
| `image` | `object` | **REQUIRED** | Image properties (see Image Props below) |
| `aspectRatio` | `'auto' \| '16-9' \| '4-3' \| '1-1'` | `'auto'` | Enforce aspect ratio for consistency |
| `headline` | `string` | - | Main heading text |
| `headingLevel` | `number` | `2` | Semantic heading level (1-6) |
| `description` | `string` | - | Body text description |
| `cta` | `object` | - | Call-to-action button (see CTA Props) |
| `caption` | `string` | - | Image caption (e.g., photo credit) |
| `backgroundColor` | `'primary' \| 'secondary' \| 'accent' \| 'neutral'` | - | Background color block |
| `ratio` | `'50-50' \| '40-60' \| '60-40' \| '33-67' \| '67-33'` | `'50-50'` | Column width ratio (image:text) |
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Spacing gap between image and content |
| `verticalAlign` | `'top' \| 'center' \| 'bottom'` | `'center'` | Vertical alignment of content |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Image Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | YES | Image source URL |
| `alt` | `string` | YES | Alternative text for accessibility |
| `loading` | `'lazy' \| 'eager'` | No (default: `'lazy'`) | Image loading strategy |

### CTA Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Button text |
| `href` | `string` | Button URL |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | Button size |

## Layout Variants

### Image Left (Default)
Image on left, text on right. Most common layout for features.

```njk
{{ imageText({
  imagePosition: 'left',
  /* ... */
}) }}
```

### Image Right
Image on right, text on left. Use for visual variety.

```njk
{{ imageText({
  imagePosition: 'right',
  /* ... */
}) }}
```

### Image Top
Stacked vertical layout. Best for mobile-first designs or full-width sections.

```njk
{{ imageText({
  imagePosition: 'top',
  /* ... */
}) }}
```

## Aspect Ratio Enforcement

Enforce consistent aspect ratios across multiple Image+Text sections for visual harmony.

### 16:9 (Widescreen)
Perfect for desktop screenshots, dashboard interfaces.

```njk
{{ imageText({
  aspectRatio: '16-9',
  /* ... */
}) }}
```

### 4:3 (Standard)
Classic ratio for portraits, general photography.

```njk
{{ imageText({
  aspectRatio: '4-3',
  /* ... */
}) }}
```

### 1:1 (Square)
Ideal for product images, social media content, icons.

```njk
{{ imageText({
  aspectRatio: '1-1',
  /* ... */
}) }}
```

## Alternating Pattern (MARKETING WORKHORSE)

Create visual rhythm with sequential left/right switching. Wrap multiple `imageText` components in a container with `.image-text-alternate` class.

```njk
<div class="image-text-alternate">
  {{ imageText({
    imagePosition: 'left',
    image: { src: 'step-1.jpg', alt: 'Step 1' },
    headline: 'Step 1: Setup',
    description: 'Get started in minutes.'
  }) }}

  {{ imageText({
    imagePosition: 'left',  {# Will automatically switch to right #}
    image: { src: 'step-2.jpg', alt: 'Step 2' },
    headline: 'Step 2: Configure',
    description: 'Customize everything.'
  }) }}

  {{ imageText({
    imagePosition: 'left',  {# Will stay left #}
    image: { src: 'step-3.jpg', alt: 'Step 3' },
    headline: 'Step 3: Launch',
    description: 'Go live immediately.'
  }) }}
</div>
```

**Benefits:**
- Visual variety without manual configuration
- Better visual rhythm for long feature lists
- Automatic responsive behavior (stacks on mobile)

## Column Ratios

Control the width distribution between image and text.

### 50-50 (Default)
Equal emphasis on image and text.

### 60-40
Larger image area for visual-heavy content (screenshots, diagrams).

```njk
{{ imageText({
  ratio: '60-40',
  /* ... */
}) }}
```

### 40-60
Larger text area for content-heavy descriptions.

```njk
{{ imageText({
  ratio: '40-60',
  /* ... */
}) }}
```

### 33-67 / 67-33
Extreme ratios for special emphasis.

## Background Color Blocks

Add visual interest with background color blocks.

```njk
{{ imageText({
  backgroundColor: 'neutral',  {# or 'primary', 'secondary', 'accent' #}
  /* ... */
}) }}
```

**Marketing Tips:**
- Use `primary` for key features
- Use `neutral` for professional, understated sections
- Use `accent` for special offers or unique features
- Alternate background colors in sequences for visual rhythm

## Accessibility

- **WCAG Level**: AA compliant
- **Semantic HTML**: Uses `<figure>` and `<figcaption>` for images
- **Required Alt Text**: All images must have descriptive `alt` text
- **Heading Hierarchy**: Configurable `headingLevel` for proper document outline
- **Keyboard Navigation**: CTA buttons are fully keyboard accessible
- **High Contrast**: Supports high contrast mode with increased border visibility

### Best Practices

- Always provide descriptive `alt` text that explains image content
- Choose appropriate `headingLevel` to fit document structure
- Use captions for photo credits or additional context
- Test keyboard navigation through all interactive elements
- Verify color contrast in both light and dark modes

## Responsive Design

- **Mobile (<768px)**: Always stacks vertically, image on top
- **Tablet (768px+)**: Side-by-side layouts enabled for `left`/`right` positions
- **Desktop (1440px+)**: Larger gaps and spacing for breathing room

The component uses container queries for layout shifts, ensuring consistent behavior regardless of parent container size.

## Dark Mode

All components automatically adapt to dark mode:
- Background color blocks adjust to darker shades
- Text colors maintain proper contrast
- Images remain unchanged (ensure images work in both modes)

## Marketing Use Cases

### Feature Showcases

**Best Practices:**
- Use alternating pattern (`.image-text-alternate`) for visual rhythm
- Enforce consistent aspect ratio (16:9 recommended)
- Add CTAs to high-value features only (avoid CTA fatigue)
- Use 60-40 ratio for features with complex screenshots

```njk
<div class="image-text-alternate">
  {{ imageText({
    imagePosition: 'left',
    aspectRatio: '16-9',
    ratio: '60-40',
    headline: 'Analytics Dashboard',
    description: 'Track every metric that matters.',
    cta: { text: 'See analytics', href: '/analytics' }
  }) }}
  {# More features... #}
</div>
```

### "How It Works" Sections

**Best Practices:**
- Use image-top layout for sequential steps on mobile
- Number headlines: "Step 1: Setup", "Step 2: Configure"
- Use square aspect ratio (1:1) for consistency
- Keep descriptions concise (1-2 sentences max)

```njk
{{ imageText({
  imagePosition: 'top',
  aspectRatio: '1-1',
  headline: 'Step 1: Setup',
  description: 'Create your account in under 60 seconds.'
}) }}
```

### Product Pages

**Best Practices:**
- Use 16:9 aspect ratio for desktop screenshots
- Add image captions for context or credits
- Use primary background color to highlight key features
- Include strong CTAs ("Try it free", "See demo")

```njk
{{ imageText({
  aspectRatio: '16-9',
  caption: 'Dashboard view showing real-time metrics',
  backgroundColor: 'primary',
  cta: { text: 'Try it free', href: '/signup', variant: 'primary', size: 'lg' }
}) }}
```

### About Pages

**Best Practices:**
- Use 4:3 or 1:1 aspect ratio for team photos
- Add photo captions with names/roles
- Use neutral background for professional tone
- Keep CTA subtle (e.g., "Join our team" link)

```njk
{{ imageText({
  aspectRatio: '4-3',
  caption: 'Our team at the 2024 company retreat',
  backgroundColor: 'neutral',
  cta: { text: 'Join our team', href: '/careers', variant: 'secondary' }
}) }}
```

## Image Optimization Tips

1. **File Size**: Keep images under 200KB for lazy loading effectiveness
2. **Format**: Use WebP with JPEG fallback for best compression
3. **Dimensions**: 800x600px is optimal for most use cases
4. **Responsive**: Consider using `srcset` for high-DPI displays
5. **Loading**: Use `loading="eager"` only for above-fold images

## CSS Custom Properties

```css
.image-text {
  --it-gap: var(--spacing-lg);              /* Gap between image and text */
  --it-image-border-radius: var(--radius-lg); /* Image corner rounding */
}
```

## Related Components

### Composed Atoms
- **Heading**: Section titles with semantic levels
- **Text**: Description copy with line height and color options
- **Button**: CTAs for driving user action

### Similar Molecules
- **Card**: For contained content blocks with less emphasis on images
- **Media Object**: For smaller inline image+text combinations

### Parent Organisms
- **Feature Grid**: Multiple Image+Text instances in a grid layout
- **Product Showcase**: Specialized organism for product pages

## Performance Considerations

- **Bundle Size**: ~1.2KB gzipped (CSS only)
- **Lazy Loading**: Images load lazily by default
- **Container Queries**: Modern layout without JavaScript
- **Pure CSS**: No JavaScript footprint
- **Aspect Ratio**: Prevents layout shifts (CLS)

## Real-World Examples

### Stripe-Style Feature Section

```njk
<div class="image-text-alternate">
  {{ imageText({
    imagePosition: 'left',
    aspectRatio: '16-9',
    ratio: '60-40',
    headline: 'Payments infrastructure for the internet',
    description: 'Millions of companies use Stripe to accept payments, send payouts, and manage their businesses online.',
    cta: { text: 'Start now', href: '/signup', variant: 'primary' }
  }) }}
</div>
```

### Notion-Style About Section

```njk
{{ imageText({
  imagePosition: 'right',
  aspectRatio: '4-3',
  caption: 'The Notion team, 2024',
  headline: 'We\'re on a mission to make toolmaking ubiquitous',
  description: 'Founded in 2016, we believe in tools that empower everyone to build what they need.',
  backgroundColor: 'neutral'
}) }}
```

## Known Issues

- Container queries require modern browser support (2023+)
- Aspect ratio enforcement may crop images unexpectedly (use `object-fit` carefully)
- Alternating pattern uses `:nth-child` which doesn't work with mixed content

## Changelog

### Version 1.0.0
- Initial implementation combining Heading, Text, and Button atoms
- Support for left/right/top image positioning
- Aspect ratio enforcement (16:9, 4:3, 1:1, auto)
- Alternating pattern for feature lists
- Background color blocks for visual interest
- Column ratio variants (50-50, 40-60, 60-40, 33-67, 67-33)
- Dark mode support
- Mobile-first responsive design
- WCAG AA accessibility compliance
