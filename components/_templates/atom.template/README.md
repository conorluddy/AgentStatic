# COMPONENT_NAME_PASCAL

[Brief one-line description of what this component does]

## Overview

[Detailed description of the component, its purpose, and when to use it]

## Usage

### Basic Usage

```njk
{% from "atoms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}

{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  size: 'md'
}) }}
```

### With Custom Content

```njk
{% call COMPONENT_NAME_KEBAB({ variant: 'primary' }) %}
  <p>Custom content goes here</p>
{% endcall %}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `id` | `string` | - | Unique identifier for the component instance |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties (see below) |

### Accessibility Props (`a11y`)

| Prop | Type | Description |
|------|------|-------------|
| `ariaLabel` | `string` | Accessible label for screen readers |
| `ariaDescribedBy` | `string` | ID of element that describes this component |
| `role` | `string` | ARIA role override |

## Variants

### Default
Standard appearance suitable for most use cases.

### Primary
Emphasized appearance for primary actions.

### Secondary
De-emphasized appearance for secondary actions.

## Sizes

### Small (`sm`)
Compact size for dense layouts or smaller screens.

### Medium (`md`)
Default size, balanced for most use cases.

### Large (`lg`)
Prominent size for emphasis or larger screens.

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: [Describe keyboard interactions]
- **Screen Reader**: [Describe screen reader announcements]
- **Focus Management**: Visible focus indicator with 3px outline
- **Color Contrast**: Meets WCAG AA standards (4.5:1 for text)

### Best Practices

- Always provide meaningful `ariaLabel` when the component doesn't have visible text
- Use semantic HTML where possible
- Ensure sufficient color contrast in all variants
- Test with keyboard navigation
- Verify screen reader announcements

## Responsive Design

Component follows mobile-first design approach with three breakpoints:

- **Mobile** (375px): [Describe mobile behavior]
- **Tablet** (768px): [Describe tablet behavior]
- **Desktop** (1440px): [Describe desktop behavior]

## Dark Mode

Component automatically adapts to system color scheme preferences and manual dark mode toggle. All color tokens are semantic and adjust automatically.

## Examples

### Example 1: [Use Case Name]

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'primary',
  size: 'lg'
}) }}
```

### Example 2: [Use Case Name]

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'secondary',
  className: 'custom-class',
  a11y: {
    ariaLabel: 'Descriptive label'
  }
}) }}
```

## CSS Custom Properties

The component uses the following CSS custom properties that can be overridden:

```css
.COMPONENT_NAME_KEBAB {
  --component-padding: var(--spacing-md);
  --component-bg: var(--color-background);
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Custom Properties support
- Requires CSS Grid/Flexbox support
- Gracefully degrades where modern features unavailable

## Related Components

- [Related Component 1]: Brief description
- [Related Component 2]: Brief description

## Design Tokens Used

- `--spacing-*`: Spacing scale
- `--color-*`: Color tokens
- `--font-*`: Typography tokens
- `--radius-*`: Border radius tokens
- `--transition-*`: Animation tokens

## Performance Considerations

- Pure CSS, no JavaScript required
- Minimal DOM footprint
- CSS in `@layer components` for efficient cascade
- Uses CSS custom properties for theming efficiency

## Known Issues

[List any known limitations or issues]

## Changelog

### Version 1.0.0
- Initial implementation
