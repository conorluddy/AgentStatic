# Heading Atom Component

Semantic heading component (h1-h6) with flexible visual styling, responsive sizing, and marketing enhancements optimized for brochureware websites.

## Overview

The Heading component provides all 6 HTML heading levels (h1-h6) with powerful features for marketing sites:

- **Semantic HTML**: Proper heading hierarchy for SEO and accessibility
- **Responsive Sizing**: Fluid typography using `clamp()` that scales from mobile to desktop
- **Size Overrides**: Decouple visual appearance from semantic meaning (e.g., h2 that looks like h1)
- **Alignment Options**: Left, center, right text alignment
- **Font Weight Control**: Normal, medium, semibold, bold
- **Color Variants**: Default, primary, secondary, muted
- **Marketing Enhancements**: Gradient text, eyebrow labels, inline highlights
- **Dark Mode**: Automatic adaptation with manual toggle support
- **Text Balancing**: CSS `text-wrap: balance` for better multi-line readability

## Usage

### Basic Usage

```njk
{% from "atoms/heading/heading.njk" import heading %}

{# Default h2 heading #}
{{ heading({ text: 'Welcome to Our Product' }) }}

{# H1 page title #}
{{ heading({ text: 'Build Better Websites', level: 1 }) }}

{# H3 section heading #}
{{ heading({ text: 'Key Features', level: 3 }) }}
```

### All Heading Levels

```njk
{{ heading({ text: 'Page Title', level: 1 }) }}
{{ heading({ text: 'Major Section', level: 2 }) }}
{{ heading({ text: 'Subsection', level: 3 }) }}
{{ heading({ text: 'Minor Heading', level: 4 }) }}
{{ heading({ text: 'Small Heading', level: 5 }) }}
{{ heading({ text: 'Smallest Heading', level: 6 }) }}
```

### Size Overrides (SEO + Design Flexibility)

Decouple semantic level from visual size:

```njk
{# Semantic h2, but looks like h1 (great for SEO) #}
{{ heading({
  text: 'Important Section Heading',
  level: 2,
  size: '4xl'
}) }}

{# Semantic h1, but smaller for visual hierarchy #}
{{ heading({
  text: 'Page Title',
  level: 1,
  size: 'xl'
}) }}
```

**Why this matters**: Proper heading hierarchy is critical for SEO and screen readers, but sometimes design requires visual flexibility. Size overrides let you maintain semantic structure while achieving the desired visual impact.

### Alignment

```njk
{# Left aligned (default) #}
{{ heading({ text: 'Left Heading', align: 'left' }) }}

{# Center aligned (common for hero sections) #}
{{ heading({ text: 'Hero Headline', level: 1, align: 'center' }) }}

{# Right aligned #}
{{ heading({ text: 'Right Heading', align: 'right' }) }}
```

### Font Weights

```njk
{{ heading({ text: 'Normal Weight', weight: 'normal' }) }}
{{ heading({ text: 'Medium Weight', weight: 'medium' }) }}
{{ heading({ text: 'Semibold Weight', weight: 'semibold' }) }}
{{ heading({ text: 'Bold Weight', weight: 'bold' }) }}
```

### Color Variants

```njk
{# Default text color #}
{{ heading({ text: 'Default Color' }) }}

{# Primary brand color #}
{{ heading({ text: 'Primary Heading', color: 'primary' }) }}

{# Secondary brand color #}
{{ heading({ text: 'Secondary Heading', color: 'secondary' }) }}

{# Muted/de-emphasized #}
{{ heading({ text: 'Muted Heading', color: 'muted' }) }}
```

## Marketing Enhancements

### Gradient Text (Hero Headlines)

Eye-catching gradient fill for hero sections:

```njk
{{ heading({
  text: 'Build. Ship. Scale.',
  level: 1,
  gradient: true,
  align: 'center'
}) }}
```

**Best for**: Hero headlines, key marketing messages, standout CTAs

**Note**: Gradient automatically disables in high contrast mode for accessibility.

### Eyebrow Text (Label Above Heading)

Common marketing pattern for context labels:

```njk
{{ heading({
  eyebrow: 'New Feature',
  text: 'Introducing AI Page Builder',
  level: 2
}) }}

{{ heading({
  eyebrow: 'Case Study',
  text: 'How Company X Increased Conversions by 40%',
  level: 2
}) }}
```

**Common eyebrow use cases**:
- "New Feature" / "Product Update"
- "Case Study" / "Customer Story"
- Category labels ("Blog Post", "Guide", "Tutorial")
- Status indicators ("Beta", "Coming Soon")

### Inline Highlights

Emphasize key words with background color:

```njk
{% call heading({ level: 1, align: 'center' }) %}
  Build <span class="heading-highlight">faster</span> with AI
{% endcall %}

{% call heading({ level: 2 }) %}
  Ship websites in <span class="heading-highlight">hours</span>, not days
{% endcall %}
```

**Best for**: Drawing attention to key benefits, metrics, or action words in headlines.

## Real-World Marketing Patterns

### Hero Section Headline

```njk
<section class="hero">
  {{ heading({
    eyebrow: 'AI-Powered Static Sites',
    text: 'Build Beautiful Websites Faster',
    level: 1,
    gradient: true,
    align: 'center',
    size: '4xl'
  }) }}
  <p class="hero-subheading">
    Ship your site in hours, not days
  </p>
</section>
```

### Feature Section Pattern

```njk
<section class="features">
  {{ heading({
    eyebrow: 'Features',
    text: 'Everything you need to succeed',
    level: 2,
    align: 'center',
    size: '3xl'
  }) }}
  <p class="section-description">
    Powerful tools designed for modern marketing websites
  </p>
  <!-- Feature cards below -->
</section>
```

### SEO-Optimized Pattern

```njk
{# Page title (only one h1 per page) #}
{{ heading({
  text: 'Welcome to Our Product',
  level: 1
}) }}

{# Important section that needs visual prominence #}
{{ heading({
  text: 'Key Features',
  level: 2,
  size: '3xl',
  align: 'center'
}) }}

{# Subsection with proper hierarchy #}
{{ heading({
  text: 'Feature Category',
  level: 3
}) }}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Heading text content (required unless using `caller`) |
| `level` | `1\|2\|3\|4\|5\|6` | `2` | Semantic heading level (controls HTML tag) |
| `size` | `'xs'\|'sm'\|'base'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|'5xl'` | - | Visual size override (optional) |
| `align` | `'left'\|'center'\|'right'` | `'left'` | Text alignment |
| `weight` | `'normal'\|'medium'\|'semibold'\|'bold'` | `'bold'` | Font weight |
| `color` | `'default'\|'primary'\|'secondary'\|'muted'` | `'default'` | Color variant |
| `gradient` | `boolean` | `false` | Apply gradient text fill |
| `eyebrow` | `string` | - | Small label above heading |
| `id` | `string` | - | Unique element ID |
| `className` | `string` | - | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

## Responsive Sizing

All heading levels use `clamp()` for fluid responsive sizing:

| Level | Mobile | Desktop | clamp() Formula |
|-------|--------|---------|-----------------|
| H1 | 32px | 51px | `clamp(2rem, 4vw + 1rem, 3.157rem)` |
| H2 | 24px | 38px | `clamp(1.5rem, 3vw + 0.75rem, 2.369rem)` |
| H3 | 20px | 28px | `clamp(1.25rem, 2vw + 0.5rem, 1.777rem)` |
| H4 | 18px | 21px | `clamp(1.125rem, 1.5vw + 0.375rem, 1.333rem)` |
| H5 | 16px | 18px | `clamp(1rem, 1vw + 0.25rem, 1.125rem)` |
| H6 | 14px | 16px | `clamp(0.875rem, 0.75vw + 0.25rem, 1rem)` |

**How it works**: The heading automatically scales smoothly between mobile and desktop sizes based on viewport width. No media queries needed!

## Accessibility

### WCAG AA Compliance

- **Semantic HTML**: Uses proper `<h1>`-`<h6>` tags for document structure
- **Color Contrast**: All color variants meet WCAG AA requirements (4.5:1 for text)
- **High Contrast Mode**: Gradient text automatically disabled in high contrast mode
- **Screen Readers**: Semantic heading levels provide proper document outline
- **Text Balancing**: CSS `text-wrap: balance` improves readability without breaking accessibility

### Heading Hierarchy Best Practices

1. **Only one h1 per page** (typically the page title)
2. **Don't skip levels**: h1 → h2 → h3 (not h1 → h3)
3. **Use size overrides for visual flexibility** while maintaining semantic hierarchy
4. **Provide context**: Headings should make sense out of context (screen readers often navigate by headings)

### ARIA Support

```njk
{# Custom aria-label for screen readers #}
{{ heading({
  text: 'New!',
  level: 2,
  a11y: {
    ariaLabel: 'New features available'
  }
}) }}

{# Described by another element #}
{{ heading({
  text: 'Product Details',
  level: 2,
  a11y: {
    ariaDescribedBy: 'product-intro'
  }
}) }}
```

## Dark Mode

All headings automatically adapt to dark mode using semantic color tokens:

- **Default**: Adapts text color automatically
- **Primary/Secondary**: Lighter shades in dark mode
- **Gradient**: Adjusts gradient colors for dark backgrounds
- **Highlights**: Inverts background/text colors

**Manual dark mode**: Supports both system preference (`prefers-color-scheme`) and manual toggle (`[data-theme="dark"]`).

## Performance

- **Bundle Size**: ~250B gzipped
- **Critical CSS**: Heading styles are critical path (should be inlined)
- **No JavaScript**: Pure CSS solution
- **Optimized Rendering**: Uses system fonts for instant rendering
- **Text Balancing**: Native CSS feature (no JavaScript overhead)

## SEO & Marketing Best Practices

### Headline Copywriting

**Length Guidelines**:
- **H1 (Hero)**: 5-10 words optimal
- **H2 (Section)**: 5-15 words optimal
- **H3+ (Subsection)**: Keep concise

**Copywriting Patterns**:

```njk
{# Benefit-focused #}
{{ heading({ text: 'Build websites 10x faster', level: 1 }) }}

{# Feature-focused #}
{{ heading({ text: 'AI-powered static site generator', level: 1 }) }}

{# Outcome-focused #}
{{ heading({ text: 'Ship your site in hours, not days', level: 1 }) }}

{# First-person (higher conversion) #}
{{ heading({ text: 'Start my free trial', level: 2 }) }}
```

### A/B Testing Recommendations

Test these headline variants for conversion optimization:

1. **Headline Type**: Benefit vs. Feature vs. Outcome
2. **Length**: Short (5-7 words) vs. Medium (10-15 words)
3. **Visual Treatment**: Plain vs. Gradient vs. Highlighted words
4. **With/Without Eyebrow**: Context label vs. No label
5. **Alignment**: Left vs. Center (especially for hero sections)

### Common Marketing Patterns

**Hero Section**:
```njk
{{ heading({
  eyebrow: 'Category/Context',
  text: 'Benefit-focused headline',
  level: 1,
  gradient: true,
  align: 'center',
  size: '4xl'
}) }}
```

**Feature Section**:
```njk
{{ heading({
  eyebrow: 'Features',
  text: 'Section headline',
  level: 2,
  align: 'center',
  size: '3xl'
}) }}
```

**Testimonial/Case Study**:
```njk
{{ heading({
  eyebrow: 'Case Study',
  text: 'How [Company] achieved [result]',
  level: 2
}) }}
```

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **text-wrap: balance**: Modern browsers only (graceful degradation)
- **Gradient Text**: Full support with fallback to solid color
- **clamp()**: Full modern browser support (IE11 fallback to fixed sizes via PostCSS if needed)

## Examples

See `/components/atoms/heading/heading.stories.ts` for 15+ interactive examples including:

- All 6 heading levels
- Size overrides for SEO flexibility
- Alignment variants
- Font weight options
- Color variants
- Gradient hero headlines
- Eyebrow text patterns
- Inline highlights
- Complete marketing section examples
- Dark mode examples
- Responsive sizing demonstrations

## Related Components

- **Text** (Phase 2): Body text and paragraphs
- **Link** (Phase 2): Inline links within headings
- **Hero Section** (Phase 3): Complete hero organism using headings

## Component Metadata

- **Category**: Atom
- **Bundle Size**: ~250B gzipped
- **WCAG Level**: AA
- **Dark Mode**: Yes
- **Responsive**: Fluid (uses clamp())
- **Performance**: Critical CSS

---

**File Locations**:
- CSS: `/components/atoms/heading/heading.css`
- Template: `/components/atoms/heading/heading.njk`
- Schema: `/components/atoms/heading/heading.schema.json`
- Stories: `/components/atoms/heading/heading.stories.ts`
- Documentation: `/components/atoms/heading/README.md`
