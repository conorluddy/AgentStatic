# COMPONENT_NAME_PASCAL (Organism)

[Brief description - explain what page section this represents and its purpose]

## Overview

[Detailed description including:
- What molecules and atoms it's composed of
- What page section it represents (hero, header, footer, features, etc.)
- When to use this organism
- Common use cases and scenarios]

## Composition

This organism is composed of:

### Molecules
- **Molecule 1**: Purpose within this organism
- **Molecule 2**: Purpose within this organism

### Atoms
- **Atom 1**: Purpose within this organism
- **Atom 2**: Purpose within this organism

## Usage

### Basic Usage

```njk
{% from "organisms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}

{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  layout: 'default',
  header: {
    heading: 'Section Title',
    subheading: 'Section description'
  }
}) }}
```

### Complete Example

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'primary',
  layout: 'centered',
  size: 'spacious',
  header: {
    heading: 'Main Title',
    subheading: 'Supporting text',
    description: '<p>Detailed description</p>'
  },
  content: {
    items: [
      '{{ card({ title: "Feature 1" }) }}',
      '{{ card({ title: "Feature 2" }) }}',
      '{{ card({ title: "Feature 3" }) }}'
    ]
  },
  footer: {
    actions: [
      '{{ button({ text: "Get Started", variant: "primary" }) }}',
      '{{ button({ text: "Learn More", variant: "secondary" }) }}'
    ]
  },
  a11y: {
    ariaLabel: 'Feature section'
  }
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'inverted'` | `'default'` | Visual style variant |
| `layout` | `'default' \| 'split' \| 'centered' \| 'full-width'` | `'default'` | Layout pattern |
| `size` | `'compact' \| 'default' \| 'spacious'` | `'default'` | Spacing size |
| `header` | `object` | - | Header section configuration |
| `content` | `object` | - | Main content configuration |
| `footer` | `object` | - | Footer section configuration |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{ role: 'region' }` | Accessibility properties |

### Header Props

| Prop | Type | Description |
|------|------|-------------|
| `heading` | `string` | Main heading text (rendered as h2) |
| `subheading` | `string` | Subheading text |
| `description` | `string` | HTML description content |

### Content Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Array of content items (for default layout) |
| `primary` | `string` | Primary content (for split layout) |
| `secondary` | `string` | Secondary content (for split layout) |

### Footer Props

| Prop | Type | Description |
|------|------|-------------|
| `actions` | `array` | Array of action button HTML strings |
| `content` | `string` | Additional footer HTML content |

## Variants

### Default
Standard appearance with neutral colors.

### Primary
Emphasized appearance using brand primary color.

### Inverted
Dark background with light text, suitable for contrast sections.

## Layouts

### Default
Standard single-column layout with optional grid for content items.

### Split
Two-column layout with primary and secondary content areas. Automatically stacks on mobile.

### Centered
All content centered, ideal for hero sections and CTAs.

### Full-Width
Edge-to-edge layout with no max-width constraint.

## Sizes

### Compact
Reduced padding and spacing, suitable for dense pages.

### Default
Balanced spacing for most use cases.

### Spacious
Extra padding and breathing room, ideal for prominent sections.

## Accessibility

- **WCAG Level**: AA compliant
- **Semantic HTML**: Uses `<section>` with proper ARIA role
- **Landmark**: Can function as ARIA landmark with proper labeling
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Screen Reader**: Proper heading hierarchy and region labeling
- **Focus Management**: Clear focus indicators throughout

### Best Practices

1. **Always provide `ariaLabel`** when the section doesn't have a visible heading
2. **Use semantic headings** in the header section (h2, h3, etc.)
3. **Maintain heading hierarchy** across the page
4. **Test with screen readers** to verify proper announcement
5. **Ensure sufficient color contrast** in all variants
6. **Test keyboard navigation** through all interactive elements

### ARIA Roles

This organism uses `role="region"` by default. Consider using:
- `role="main"` for primary content sections
- `role="complementary"` for supporting content
- `role="contentinfo"` for footer sections

## Responsive Design

### Mobile (default, < 768px)
- Single column layout
- Reduced padding
- Stacked split layouts
- Simplified grid

### Tablet (768px - 1439px)
- Two-column split layouts
- Moderate padding
- Multi-column grid support

### Desktop (1440px+)
- Full layout complexity
- Maximum spacing
- Optimal grid layouts
- Wide container support

### Container Queries
When supported, organisms adapt based on their container width, not just viewport.

## Dark Mode

Organisms automatically adapt to system color scheme and manual dark mode toggle:
- All color tokens are semantic
- Inverted variant adjusts intelligently
- Nested components inherit dark mode
- No additional configuration needed

## Examples

### Example 1: Hero Section

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'primary',
  layout: 'centered',
  size: 'spacious',
  header: {
    heading: 'Build Better Products',
    subheading: 'With our powerful platform',
    description: '<p>Everything you need to succeed</p>'
  },
  footer: {
    actions: [
      '{{ button({ text: "Get Started Free", variant: "primary", size: "lg" }) }}',
      '{{ button({ text: "Watch Demo", variant: "secondary", size: "lg" }) }}'
    ]
  },
  a11y: {
    ariaLabel: 'Hero section'
  }
}) }}
```

### Example 2: Feature Grid

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  layout: 'default',
  size: 'default',
  header: {
    heading: 'Features',
    subheading: 'Everything you need to succeed'
  },
  content: {
    items: [
      '{{ featureCard({ icon: "speed", title: "Fast" }) }}',
      '{{ featureCard({ icon: "secure", title: "Secure" }) }}',
      '{{ featureCard({ icon: "scale", title: "Scalable" }) }}'
    ]
  },
  a11y: {
    ariaLabel: 'Product features'
  }
}) }}
```

### Example 3: Split Content

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  layout: 'split',
  size: 'default',
  content: {
    primary: '{{ imageComponent({ src: "/image.jpg", alt: "Product" }) }}',
    secondary: `
      <h3>Why Choose Us</h3>
      <p>Detailed explanation of benefits</p>
      {{ button({ text: "Learn More" }) }}
    `
  }
}) }}
```

### Example 4: CTA Section

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'inverted',
  layout: 'centered',
  size: 'compact',
  header: {
    heading: 'Ready to get started?',
    subheading: 'Join thousands of happy customers'
  },
  footer: {
    actions: [
      '{{ button({ text: "Start Free Trial", variant: "primary" }) }}'
    ]
  },
  a11y: {
    ariaLabel: 'Call to action'
  }
}) }}
```

## CSS Custom Properties

The organism exposes these custom properties for further customization:

```css
.COMPONENT_NAME_KEBAB {
  --organism-gap: var(--spacing-lg);
  --organism-padding-block: var(--spacing-2xl);
  --organism-padding-inline: var(--spacing-lg);
}
```

Override example:
```css
.COMPONENT_NAME_KEBAB.custom-spacing {
  --organism-gap: var(--spacing-xl);
  --organism-padding-block: var(--spacing-3xl);
}
```

## Grid System

Organisms use a 12-column grid system:

```css
.COMPONENT_NAME_KEBAB {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-lg);
}
```

Content areas span columns based on layout:
- Default: Full width (1 / -1)
- Split: Primary (1 / 8), Secondary (8 / -1)
- Custom: Override with `className`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid required
- CSS Custom Properties required
- Container Queries optional (progressive enhancement)
- Graceful degradation for older browsers

## Performance Considerations

- Pure CSS, minimal JavaScript
- Efficient grid layout
- CSS cascade layers prevent specificity conflicts
- Container queries for efficient responsive design
- Lazy loading recommended for images within content

## Print Styles

Organisms include print-friendly styles:
- Reduced padding
- Hidden interactive elements (action buttons)
- Black and white color scheme
- Optimized for paper

## Related Components

### Composed Molecules
- [Molecule 1]: Relationship and usage
- [Molecule 2]: Relationship and usage

### Composed Atoms
- [Atom 1]: Relationship and usage
- [Atom 2]: Relationship and usage

### Similar Organisms
- [Similar Organism]: How it differs

## Design Tokens Used

### Spacing
- `--spacing-md` to `--spacing-3xl`
- `--organism-gap`
- `--organism-padding-block`
- `--organism-padding-inline`

### Colors
- `--color-text`
- `--color-background`
- `--color-primary`
- `--color-border`

### Typography
- `--font-family-base`
- Heading tokens from atoms

### Effects
- `--shadow-md`, `--shadow-lg`
- `--transition-base`

## Known Issues

[List any known limitations or browser-specific issues]

## Changelog

### Version 1.0.0
- Initial implementation
- Includes all layout patterns
- Full responsive support
- WCAG AA compliant
