# COMPONENT_NAME_PASCAL (Molecule)

[Brief description - explain what atoms this combines and what functionality it provides]

## Overview

[Detailed description including:
- What atoms it's composed of
- What functionality it provides
- When to use it vs. individual atoms
- Common use cases]

## Composition

This molecule is composed of the following atoms:
- **Atom 1**: Purpose within this molecule
- **Atom 2**: Purpose within this molecule

## Usage

### Basic Usage

```njk
{% from "molecules/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}

{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  layout: 'vertical',
  header: {
    title: 'Example'
  },
  body: {
    content: 'Content here'
  }
}) }}
```

### With All Sections

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'primary',
  header: {
    title: 'Title',
    subtitle: 'Subtitle'
  },
  body: {
    content: 'Main content'
  },
  footer: {
    actions: [...]
  }
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Visual style variant |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `header` | `object` | - | Header section configuration |
| `body` | `object` | - | Body section configuration |
| `footer` | `object` | - | Footer section configuration |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Header Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Header title text |
| `subtitle` | `string` | Optional subtitle |

### Body Props

| Prop | Type | Description |
|------|------|-------------|
| `content` | `string` | Main content |

### Footer Props

| Prop | Type | Description |
|------|------|-------------|
| `actions` | `array` | Array of action configurations |

## Variants

[Describe each variant and when to use it]

## Layouts

### Vertical (default)
Stacks sections vertically. Best for narrow viewports and detailed content.

### Horizontal
Arranges sections side-by-side. Automatically stacks on mobile.

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: [Describe interactions]
- **Screen Reader**: Announces as region with proper landmarks
- **Focus Management**: Focus moves logically through sections
- **Color Contrast**: All variants meet WCAG AA

### Best Practices

- Provide meaningful header titles for screen reader context
- Ensure interactive elements in footer are keyboard accessible
- Test with screen readers to verify proper announcement

## Responsive Design

- **Mobile**: Vertical layout, full width
- **Tablet**: Can use horizontal layout, constrained width
- **Desktop**: Optimal spacing and sizing

Horizontal layouts automatically stack on mobile regardless of prop setting.

## Dark Mode

All composed atoms adapt to dark mode automatically. No additional configuration needed.

## Examples

### Example 1: Information Card

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'default',
  header: {
    title: 'Quick Facts',
    icon: 'info'
  },
  body: {
    content: 'Interesting information here'
  }
}) }}
```

### Example 2: Action Panel

```njk
{{ COMPONENT_NAME_KEBAB({
  variant: 'primary',
  header: {
    title: 'Get Started'
  },
  body: {
    content: 'Begin your journey'
  },
  footer: {
    actions: [
      { text: 'Start', variant: 'primary' },
      { text: 'Learn More', variant: 'secondary' }
    ]
  }
}) }}
```

## CSS Custom Properties

```css
.COMPONENT_NAME_KEBAB {
  --molecule-gap: var(--spacing-md);
  --molecule-padding: var(--spacing-lg);
}
```

## Related Components

### Composed Atoms
- [Atom 1]: Description of relationship
- [Atom 2]: Description of relationship

### Similar Molecules
- [Related Molecule]: How it differs

## Performance Considerations

- Molecules compose atoms efficiently without duplication
- CSS cascade layers prevent specificity conflicts
- Minimal JavaScript footprint (if any)

## Known Issues

[List any limitations specific to this molecule composition]

## Changelog

### Version 1.0.0
- Initial implementation combining [list atoms]
