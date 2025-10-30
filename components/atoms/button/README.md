# Button

Interactive button atom for triggering actions, form submissions, and navigation with multiple variants, sizes, and comprehensive state support.

## Overview

The Button component is a fundamental interactive atom that handles both action triggers (via `<button>`) and navigation (via `<a>` when href is provided). It offers four visual variants (primary, secondary, ghost, danger), three sizes (sm, md, lg), icon support (start, end, icon-only), loading states with animated spinners, and full accessibility compliance (WCAG AA).

### When to Use

- **Primary CTAs**: High-emphasis call-to-action buttons for conversions
- **Form Submissions**: Submit, reset, or custom form actions
- **Navigation**: Links styled as buttons for visual consistency
- **Destructive Actions**: Delete, remove, or cancel operations (danger variant)
- **Icon Actions**: Icon-only buttons for toolbars, modals, and compact layouts

## Usage

### Basic Usage

```njk
{% from "atoms/button/button.njk" import button %}

{# Primary CTA #}
{{ button({
  text: 'Get Started',
  variant: 'primary',
  size: 'md'
}) }}
```

### All Variants

```njk
{# Primary - High emphasis brand color #}
{{ button({ text: 'Primary Action', variant: 'primary' }) }}

{# Secondary - Medium emphasis neutral #}
{{ button({ text: 'Secondary Action', variant: 'secondary' }) }}

{# Ghost - Low emphasis transparent #}
{{ button({ text: 'Cancel', variant: 'ghost' }) }}

{# Danger - Destructive actions #}
{{ button({ text: 'Delete Account', variant: 'danger' }) }}
```

### With Icons

```njk
{# Icon before text #}
{{ button({
  text: 'Download',
  variant: 'primary',
  iconStart: '<svg>...</svg>'
}) }}

{# Icon after text (forward arrow for CTAs) #}
{{ button({
  text: 'Continue',
  variant: 'primary',
  iconEnd: '<svg>→</svg>'
}) }}

{# Icon-only (44x44px touch target) #}
{{ button({
  text: 'Close',
  iconOnly: true,
  iconStart: '<svg>×</svg>',
  a11y: { ariaLabel: 'Close dialog' }
}) }}
```

### Link Styled as Button

```njk
{# Internal navigation #}
{{ button({
  text: 'Learn More',
  href: '/about',
  variant: 'primary'
}) }}

{# External link with arrow icon #}
{{ button({
  text: 'View Demo',
  href: 'https://example.com',
  target: '_blank',
  iconEnd: '<svg>↗</svg>'
}) }}
```

### Loading State

```njk
{# Loading with spinner #}
{{ button({
  text: 'Submitting...',
  loading: true,
  disabled: true
}) }}
```

### Full Width

```njk
{# Full-width button for mobile-first layouts #}
{{ button({
  text: 'Sign Up Now',
  variant: 'primary',
  size: 'lg',
  fullWidth: true
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | Button label text (kept accessible even in icon-only) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant (32px / 44px / 56px height) |
| `href` | `string` | - | If provided, renders as `<a>` styled as button |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` | Link target (auto-adds rel for _blank) |
| `rel` | `string` | - | Link rel attribute (auto: 'noopener noreferrer' for _blank) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type (only for button elements) |
| `disabled` | `boolean` | `false` | Disabled state (50% opacity, no interaction) |
| `loading` | `boolean` | `false` | Loading state (shows spinner, disables button) |
| `iconStart` | `string` | - | SVG icon markup before text |
| `iconEnd` | `string` | - | SVG icon markup after text (commonly arrows) |
| `iconOnly` | `boolean` | `false` | Icon-only variant (hides text, keeps accessible) |
| `fullWidth` | `boolean` | `false` | Full-width button (100% of container) |
| `id` | `string` | - | Unique identifier for the button element |
| `className` | `string` | `''` | Additional CSS classes (e.g., `button-responsive`) |
| `attributes` | `object` | `{}` | Additional HTML attributes (data-*, etc.) |
| `a11y` | `object` | `{}` | Accessibility properties (see below) |

### Accessibility Props (`a11y`)

| Prop | Type | Description |
|------|------|-------------|
| `ariaLabel` | `string` | Accessible label (required for icon-only buttons) |
| `ariaDescribedBy` | `string` | ID of element describing the button |
| `ariaBusy` | `boolean` | Busy state (auto-set when loading=true) |

## Variants

### Primary
**High emphasis** - Brand color background (blue) for primary CTAs and conversions.

```njk
{{ button({ text: 'Get Started', variant: 'primary' }) }}
```

**Use for**: Main CTAs, form submissions, primary actions

### Secondary
**Medium emphasis** - Neutral background (gray) for secondary actions.

```njk
{{ button({ text: 'Learn More', variant: 'secondary' }) }}
```

**Use for**: Secondary actions, alternative options, supporting CTAs

### Ghost
**Low emphasis** - Transparent background with border for tertiary actions.

```njk
{{ button({ text: 'Cancel', variant: 'ghost' }) }}
```

**Use for**: Cancel actions, tertiary options, low-priority actions

### Danger
**Destructive actions** - Red color scheme for critical operations.

```njk
{{ button({ text: 'Delete Account', variant: 'danger' }) }}
```

**Use for**: Delete, remove, destructive actions requiring user attention

## Sizes

### Small (`sm`)
**32px height** - Compact size for dense layouts, toolbars, or secondary buttons.

```njk
{{ button({ text: 'Small', size: 'sm' }) }}
```

### Medium (`md`)
**44px height** - Default size with minimum touch target (WCAG AA compliant).

```njk
{{ button({ text: 'Medium', size: 'md' }) }}
```

### Large (`lg`)
**56px height** - Prominent size for hero sections and primary CTAs.

```njk
{{ button({ text: 'Large', size: 'lg' }) }}
```

## States

### Default
Standard interactive state with hover, focus, and active feedback.

### Hover
- Background darkens by 10%
- Subtle lift with `translateY(-1px)`
- Smooth transition (250ms)

### Focus
- Visible focus ring: 3px blue outline with 2px offset
- Meets WCAG AA keyboard navigation requirements

### Active
- Scale down to 98% with `translateY(0)`
- Provides tactile feedback on click

### Disabled
- 50% opacity
- `cursor: not-allowed`
- No pointer events
- Works with both `disabled` attribute and `aria-disabled`

### Loading
- Animated spinner (360° rotation)
- Content hidden but accessible
- `aria-busy="true"` for screen readers
- Disabled interaction

## Accessibility

- **WCAG Level**: AA compliant
- **Touch Targets**: 44x44px minimum on mobile (enforced via `pointer: coarse`)
- **Keyboard Navigation**: Full support with visible focus indicators
- **Screen Reader**: Proper ARIA labels, busy states, and semantic HTML
- **Focus Management**: 3px blue outline with 2px offset for visibility
- **Color Contrast**: 4.5:1 for text, 3:1 for UI components

### Best Practices

- **Icon-only buttons**: Always provide `text` and `a11y.ariaLabel` props
- **External links**: Use `target="_blank"` with arrow icon (↗) for clarity
- **Loading states**: Set both `loading` and `disabled` to prevent interaction
- **Destructive actions**: Use `danger` variant with confirmation patterns
- **Form submissions**: Set `type="submit"` for proper form behavior

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Shift + Tab` | Focus previous element |
| `Enter` | Activate button |
| `Space` | Activate button |

## Responsive Design

### Mobile-First Approach

Component is designed mobile-first with three breakpoints:

- **Mobile (375px)**: Default styles with 44px minimum touch targets
- **Tablet (768px+)**: Same sizing, optimized for touch and mouse
- **Desktop (1440px+)**: Same sizing, hover states enabled

### Responsive Utilities

**Full-width on mobile** (auto-collapses below 768px):
```njk
{{ button({
  text: 'Mobile CTA',
  className: 'button-responsive'
}) }}
```

**Always full-width**:
```njk
{{ button({
  text: 'Full Width CTA',
  fullWidth: true
}) }}
```

## Dark Mode

Component automatically adapts to both system preferences and manual dark mode toggle:

### Automatic Adaptation
- Uses semantic color tokens that switch in dark mode
- Primary: `primary-500` in dark mode (lighter than light mode)
- Secondary: `gray-600` in dark mode
- Ghost: Dark background hover for visibility

### Testing Dark Mode
View the "Dark Mode" story in Storybook to see all variants in dark mode.

## Examples

### Marketing Hero CTA

```njk
<div class="hero-actions">
  {{ button({
    text: 'Get Started Free',
    variant: 'primary',
    size: 'lg',
    iconEnd: '<svg>→</svg>'
  }) }}
  {{ button({
    text: 'Watch Demo',
    variant: 'ghost',
    size: 'lg'
  }) }}
</div>
```

### Form Submission

```njk
<form>
  <!-- form fields -->
  <div class="form-actions">
    {{ button({
      text: 'Submit',
      type: 'submit',
      variant: 'primary'
    }) }}
    {{ button({
      text: 'Cancel',
      type: 'button',
      variant: 'ghost'
    }) }}
  </div>
</form>
```

### Destructive Action with Confirmation

```njk
{# Trigger button #}
{{ button({
  text: 'Delete Account',
  variant: 'danger',
  id: 'delete-trigger'
}) }}

{# Confirmation modal button #}
{{ button({
  text: 'Confirm Delete',
  variant: 'danger',
  loading: accountDeleting,
  disabled: accountDeleting
}) }}
```

### Icon-Only Toolbar

```njk
<div class="toolbar">
  {{ button({
    text: 'Close',
    iconOnly: true,
    variant: 'ghost',
    iconStart: '<svg>×</svg>',
    a11y: { ariaLabel: 'Close panel' }
  }) }}
  {{ button({
    text: 'Settings',
    iconOnly: true,
    variant: 'ghost',
    iconStart: '<svg>⚙</svg>',
    a11y: { ariaLabel: 'Open settings' }
  }) }}
</div>
```

### External Link with Icon

```njk
{{ button({
  text: 'View Live Demo',
  href: 'https://example.com/demo',
  target: '_blank',
  variant: 'secondary',
  iconEnd: '<svg>↗</svg>'
}) }}
```

## CSS Custom Properties

The component uses CSS custom properties for easy theming:

```css
.button {
  /* Sizing */
  --button-height: 2.75rem;        /* 44px default */
  --button-padding-x: 1.5rem;      /* Horizontal padding */
  --button-padding-y: 0.75rem;     /* Vertical padding */
  --button-gap: 0.5rem;            /* Gap between icon and text */

  /* Typography */
  --button-font-size: var(--font-size-base);

  /* Colors */
  --button-bg: var(--color-gray-100);
  --button-bg-hover: var(--color-gray-200);
  --button-color: var(--color-text);
  --button-border-color: var(--color-border);

  /* Borders */
  --button-border-width: var(--border-width-thin);
  --button-border-radius: var(--border-radius-md);
}
```

### Override Example

```css
/* Custom button sizing */
.button-xl {
  --button-height: 4rem;
  --button-padding-x: 2.5rem;
  --button-font-size: var(--font-size-xl);
}
```

## Design Tokens Used

- **Spacing**: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- **Colors**: `--color-primary-*`, `--color-gray-*`, `--color-error`, `--color-border-focus`
- **Typography**: `--font-sans`, `--font-size-*`, `--font-weight-medium`, `--line-height-tight`
- **Borders**: `--border-width-thin`, `--border-radius-md`, `--border-radius-full`
- **Transitions**: `--transition-fast`, `--transition-colors`

## Performance

- **Bundle Size**: <500B gzipped (CSS only)
- **No JavaScript**: Pure CSS for all interactions
- **Minimal DOM**: Single element with 2-4 children
- **Efficient Cascade**: Uses `@layer components` for optimal specificity
- **CSS Custom Properties**: Fast theme switching without recalculation

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Required Features
- CSS Custom Properties
- CSS Flexbox
- CSS Cascade Layers (`@layer`)
- CSS `:focus-visible` pseudo-class
- CSS `@media` queries (prefers-color-scheme, prefers-reduced-motion)

## Related Components

- **Link**: Plain text links for inline navigation
- **Icon**: Standalone icon component for use in buttons
- **Form**: Complete form components using button for submissions

## Known Issues

None currently identified. Please report issues via GitHub Issues.

## Changelog

### Version 1.0.0 (Phase 2)
- Initial implementation with 4 variants (primary, secondary, ghost, danger)
- 3 sizes (sm, md, lg) with WCAG AA touch targets
- Icon support (start, end, icon-only)
- Loading states with animated spinner
- Link variant (renders as anchor)
- Full-width and responsive utilities
- WCAG AA accessibility compliance
- Dark mode support
- Comprehensive Storybook documentation
