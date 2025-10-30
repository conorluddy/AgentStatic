# Text

Flexible text component for paragraphs, spans, and inline elements with comprehensive styling options.

## Overview

The Text atom component provides a consistent, semantic way to render text content throughout AgentStatic. It supports multiple element types (p, span, div), six size variants, five font weights, six color variants, four alignment options, and five line height settings. Special features include lead paragraph styling, inline code formatting, and max-width constraints for optimal readability.

**Use this component for:**
- Body paragraphs in content sections
- Lead paragraphs for introduction text
- Captions and metadata display
- Inline text elements with custom styling
- Error messages, success messages, form helper text

**Do not use for:**
- Main headings (use Heading component)
- Interactive text (use Link or Button component)
- Form labels (use dedicated Label component)

## Usage

### Basic Paragraph

```njk
{% from "atoms/text/text.njk" import text %}

{{ text({
  content: 'This is a standard paragraph with default styling.'
}) }}
```

### Lead Paragraph

```njk
{{ text({
  content: 'This is a lead paragraph with larger size and increased spacing.',
  lead: true
}) }}
```

### Colored Text with Custom Weight

```njk
{{ text({
  content: 'Important message',
  color: 'primary',
  weight: 'semibold',
  size: 'lg'
}) }}
```

### Inline Span Element

```njk
<p>
  This is normal text with
  {{ text({
    content: 'inline emphasis',
    element: 'span',
    color: 'primary',
    weight: 'semibold'
  }) }}
  embedded within.
</p>
```

### With HTML Content

```njk
{{ text({
  content: 'Use the <code>text</code> component for all <strong>body copy</strong>.'
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Text content (supports HTML for inline formatting) |
| `element` | `'p' \| 'span' \| 'div'` | `'p'` | HTML element type to render |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl'` | `'base'` | Text size variant (xs: 9px, sm: 12px, base: 16px, lg: 21px, xl: 28px, 2xl: 38px) |
| `weight` | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | Font weight (light: 300, normal: 400, medium: 500, semibold: 600, bold: 700) |
| `color` | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'error' \| 'success'` | `'default'` | Semantic color variant |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `lineHeight` | `'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose'` | `'normal'` | Line height (tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2.0) |
| `lead` | `boolean` | `false` | Apply lead paragraph styling (larger size, increased line height, extra bottom margin) |
| `readable` | `boolean` | `false` | Apply max-width constraint (65 characters) for optimal reading length |
| `truncate` | `boolean` | `false` | Truncate text with ellipsis when it exceeds container width |
| `id` | `string` | - | Unique identifier for the element |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties (see below) |

### Accessibility Props (`a11y`)

| Prop | Type | Description |
|------|------|-------------|
| `ariaLabel` | `string` | Accessible label for the element |
| `ariaDescribedBy` | `string` | ID of element that describes this element |
| `role` | `string` | ARIA role override (use sparingly, semantic HTML preferred) |

## Size Variants

| Size | Pixel Value | Use Case |
|------|-------------|----------|
| `xs` | ~9px | Fine print, legal text |
| `sm` | ~12px | Captions, metadata, helper text |
| `base` | 16px | Body text (default) |
| `lg` | ~21px | Lead paragraphs, subheadings |
| `xl` | ~28px | Large text, emphasis |
| `2xl` | ~38px | Extra large text |

## Color Variants

| Color | Usage |
|-------|-------|
| `default` | Standard body text color |
| `muted` | De-emphasized, secondary text |
| `primary` | Brand primary color |
| `secondary` | Brand secondary color |
| `error` | Error messages, destructive actions |
| `success` | Success messages, confirmations |

## Weight Variants

| Weight | Value | Usage |
|--------|-------|-------|
| `light` | 300 | De-emphasized text |
| `normal` | 400 | Body text (default) |
| `medium` | 500 | Slightly emphasized |
| `semibold` | 600 | Subheadings, important text |
| `bold` | 700 | Strong emphasis |

## Alignment Options

- **left** (default): Standard left alignment
- **center**: Center alignment for headings or emphasis
- **right**: Right alignment for special layouts
- **justify**: Full justification for formal content

## Line Height Options

| Line Height | Value | Usage |
|-------------|-------|-------|
| `tight` | 1.25 | Compact text, headings |
| `snug` | 1.375 | Subheadings |
| `normal` | 1.5 | Body text (default) |
| `relaxed` | 1.625 | Comfortable reading |
| `loose` | 2.0 | Maximum readability, accessibility |

## Special Features

### Lead Paragraphs

Lead paragraphs are larger, more spacious opening paragraphs:

```njk
{{ text({
  content: 'This is a lead paragraph that introduces the section.',
  lead: true
}) }}
```

**Responsive behavior:**
- Mobile: 21px (lg)
- Tablet: 28px (xl)
- Desktop: 38px (2xl)

### Readable Width

Constrain line length to 65 characters for optimal readability:

```njk
{{ text({
  content: 'Long paragraph text...',
  readable: true,
  lineHeight: 'relaxed'
}) }}
```

### Inline Code

The component automatically styles `<code>` elements:

```njk
{{ text({
  content: 'Use the <code>text</code> component for body copy.'
}) }}
```

**Dark mode:** Code blocks have dark backgrounds in dark mode.

### Text Truncation

Truncate long text with ellipsis:

```njk
{{ text({
  content: 'This is a very long text that will be truncated...',
  truncate: true
}) }}
```

**Note:** Truncation requires the element to have a fixed width or max-width constraint.

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: Not applicable (static text content)
- **Screen Reader**: Uses semantic HTML elements (p, span, div)
- **Color Contrast**: All color variants meet WCAG AA standards (4.5:1 minimum)
- **High Contrast Mode**: Increased border width on code elements

### Best Practices

- Use semantic `element` prop (`p` for paragraphs, `span` for inline)
- Provide meaningful content, not placeholder text
- Use `lead` for opening paragraphs to establish visual hierarchy
- Apply `readable` for long-form content to prevent eye strain
- Choose appropriate `lineHeight` based on content density
- Test color contrast in both light and dark modes

## Responsive Design

The Text component follows a mobile-first approach:

- **Mobile** (375px): Base sizing, optimal for small screens
- **Tablet** (768px): Lead paragraphs scale to xl size
- **Desktop** (1440px): Lead paragraphs scale to 2xl size

All text uses relative units (rem/em) for responsive scaling with user font size preferences.

## Dark Mode

The component automatically adapts to dark mode using semantic color tokens:

- Text colors invert appropriately
- Code blocks receive dark backgrounds
- All color variants maintain WCAG AA contrast

**Manual override:** Dark mode respects both system preference (`prefers-color-scheme: dark`) and manual toggle (`[data-theme="dark"]`).

## Examples

### Hero Section Subheading

```njk
{{ text({
  content: 'Build better products faster with our comprehensive design system',
  size: 'lg',
  color: 'muted',
  align: 'center',
  lineHeight: 'relaxed'
}) }}
```

### Feature Description

```njk
{{ text({
  content: 'Our advanced analytics dashboard gives you real-time insights into user behavior.',
  lineHeight: 'relaxed',
  readable: true
}) }}
```

### Caption Text

```njk
{{ text({
  content: 'Last updated: January 2025',
  size: 'sm',
  color: 'muted',
  element: 'span'
}) }}
```

### Error Message

```njk
{{ text({
  content: 'Please enter a valid email address',
  size: 'sm',
  color: 'error'
}) }}
```

### Success Message

```njk
{{ text({
  content: 'Your changes have been saved successfully',
  size: 'sm',
  color: 'success'
}) }}
```

### Combined Variations

```njk
{{ text({
  content: 'Large primary text with semibold weight',
  size: 'lg',
  color: 'primary',
  weight: 'semibold'
}) }}
```

## CSS Custom Properties

The component uses CSS variables for flexible theming:

```css
.text {
  --text-size: var(--font-size-base);
  --text-weight: var(--font-weight-normal);
  --text-line-height: var(--line-height-normal);
  --text-color: var(--color-text);
}
```

These can be overridden via variant classes or custom CSS.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Custom Properties support
- Requires CSS Cascade Layers support
- Gracefully degrades in older browsers

## Related Components

- **Heading**: For main headings (h1-h6)
- **Link**: For interactive text links
- **Badge**: For labeled tags and status indicators
- **Button**: For interactive button text

## Design Tokens Used

- **Typography**: `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--font-sans`, `--font-mono`
- **Colors**: `--color-text`, `--color-text-muted`, `--color-primary-*`, `--color-secondary-*`, `--color-error`, `--color-success`, `--color-gray-*`
- **Spacing**: `--spacing-lg` (lead paragraph margin)
- **Borders**: `--border-width-*`, `--border-radius-sm` (code elements)

## Performance

- **Pure CSS**: No JavaScript required
- **Bundle Size**: <300B gzipped
- **Cascade Layer**: `@layer components` for efficient specificity management
- **CSS Variables**: Efficient theming without duplication

## Known Issues

None currently identified.

## Changelog

### Version 1.0.0 (Phase 2)
- Initial implementation
- Six size variants (xs, sm, base, lg, xl, 2xl)
- Five weight variants (light, normal, medium, semibold, bold)
- Six color variants (default, muted, primary, secondary, error, success)
- Four alignment options (left, center, right, justify)
- Five line height options (tight, snug, normal, relaxed, loose)
- Lead paragraph variant
- Readable width constraint
- Inline code styling
- Dark mode support
- Responsive scaling
- WCAG AA compliance
