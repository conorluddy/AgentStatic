# Input Atom Component

Versatile form input component supporting all standard HTML input types with comprehensive validation states, icon support, and WCAG AA accessibility compliance.

## Overview

The Input component is **CRITICAL** for brochureware marketing sites as it enables:
- **Hero email capture** (60%+ of SaaS landing pages have this above the fold)
- **Newsletter signups** (footer conversions)
- **Contact forms** (lead generation)
- **Gated content downloads**
- **Waitlist signups**

Email capture is the #1 conversion goal on marketing sites, making this component essential for any brochureware implementation.

## Features

- **11 Input Types**: text, email, password, number, tel, url, search, textarea, select, checkbox, radio
- **3 Sizes**: sm (32px), md (44px - default), lg (56px)
- **4 Validation States**: default, error, success, warning
- **Icon Support**: Start and end icon positioning
- **Full Width Option**: Recommended for mobile forms
- **WCAG AA Compliant**: 4.5:1 color contrast, proper ARIA attributes, keyboard navigation
- **Mobile Optimized**: 44x44px minimum touch targets
- **Dark Mode**: Automatic theme switching
- **Pure CSS**: No JavaScript required (except for form validation logic)

## Usage

### Basic Text Input

```njk
{% from "atoms/input/input.njk" import input %}

{{ input({
  type: 'text',
  placeholder: 'Enter your name',
  ariaLabel: 'Full name'
}) }}
```

### Email Input (Most Common)

```njk
{{ input({
  type: 'email',
  placeholder: 'your@email.com',
  ariaLabel: 'Email address',
  required: true
}) }}
```

### Email with Icon (Hero Email Capture)

```njk
{{ input({
  type: 'email',
  size: 'lg',
  placeholder: 'your@email.com',
  iconStart: '<svg>...</svg>',
  ariaLabel: 'Email address',
  fullWidth: true
}) }}
```

### Search Input

```njk
{{ input({
  type: 'search',
  placeholder: 'Search...',
  iconStart: '<svg>...</svg>',
  ariaLabel: 'Search'
}) }}
```

### Textarea

```njk
{{ input({
  type: 'textarea',
  placeholder: 'Your message',
  rows: 6,
  ariaLabel: 'Message',
  required: true
}) }}
```

### Select Dropdown

```njk
{{ input({
  type: 'select',
  options: [
    { value: '', label: 'Select country', disabled: true, selected: true },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ],
  ariaLabel: 'Country'
}) }}
```

### Checkbox (Terms Acceptance)

```njk
{{ input({
  type: 'checkbox',
  name: 'terms',
  label: 'I agree to the terms and conditions',
  required: true
}) }}
```

### Radio Button Group

```njk
{{ input({
  type: 'radio',
  name: 'plan',
  value: 'monthly',
  label: 'Monthly billing ($10/month)',
  checked: true
}) }}

{{ input({
  type: 'radio',
  name: 'plan',
  value: 'yearly',
  label: 'Yearly billing ($100/year)',
  checked: false
}) }}
```

### Error State with Message

```njk
{{ input({
  type: 'email',
  value: 'invalid-email',
  state: 'error',
  ariaDescribedBy: 'email-error',
  ariaLabel: 'Email address'
}) }}
<p id="email-error" style="color: var(--color-error); font-size: 0.875rem;">
  Please enter a valid email address
</p>
```

### Success State

```njk
{{ input({
  type: 'email',
  value: 'valid@email.com',
  state: 'success',
  ariaLabel: 'Email address'
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `'text'` | Input type: text, email, password, number, tel, url, search, textarea, select, checkbox, radio |
| `size` | string | `'md'` | Size variant: sm, md, lg |
| `name` | string | `''` | Form field name attribute |
| `id` | string | Auto-generated | Unique identifier |
| `value` | string | `''` | Input value |
| `placeholder` | string | `''` | Placeholder text |
| `disabled` | boolean | `false` | Disabled state |
| `readonly` | boolean | `false` | Readonly state |
| `required` | boolean | `false` | Required field |
| `state` | string | `'default'` | Validation state: default, error, success, warning |
| `iconStart` | string | `''` | SVG icon at start (left) |
| `iconEnd` | string | `''` | SVG icon at end (right) |
| `fullWidth` | boolean | `false` | Span full container width |
| `rows` | number | `4` | Textarea rows (textarea only) |
| `options` | array | `[]` | Select options (select only) |
| `checked` | boolean | `false` | Checked state (checkbox/radio only) |
| `label` | string | `''` | Label text (checkbox/radio only) |
| `ariaLabel` | string | `''` | Accessible label (required for inputs without visible labels) |
| `ariaDescribedBy` | string | `''` | ID of describing element (for error messages) |
| `className` | string | `''` | Additional CSS classes |
| `attributes` | object | `{}` | Additional HTML attributes |

## Marketing Best Practices

### Hero Email Capture Pattern

**Goal**: Maximize email signup conversions above the fold

```njk
<div class="hero-email-capture">
  <h1>Start Your Free Trial</h1>
  <p>Join 10,000+ companies already using our platform</p>

  {{ input({
    type: 'email',
    size: 'lg',
    placeholder: 'your@email.com',
    iconStart: emailIcon,
    ariaLabel: 'Email address',
    fullWidth: true
  }) }}

  <p class="trust-signal">No credit card required. Cancel anytime.</p>
</div>
```

**Conversion Tips**:
- Use **large size** (lg) for hero CTAs - 40%+ lift in some tests
- Add **email icon** for visual context
- **Full width** on mobile for easier thumb interaction
- Include **trust signals** ("No spam", "Cancel anytime")
- Show **customer count** nearby ("Join 10,000+ customers")

### Contact Form Pattern

**Goal**: Minimize form friction and abandonment

```njk
<form>
  <label for="name">Name *</label>
  {{ input({
    type: 'text',
    id: 'name',
    name: 'name',
    placeholder: 'John Doe',
    required: true,
    fullWidth: true
  }) }}

  <label for="email">Email *</label>
  {{ input({
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'john@example.com',
    iconStart: emailIcon,
    required: true,
    fullWidth: true
  }) }}

  <label for="message">Message *</label>
  {{ input({
    type: 'textarea',
    id: 'message',
    name: 'message',
    placeholder: 'How can we help?',
    rows: 6,
    required: true,
    fullWidth: true
  }) }}

  {{ input({
    type: 'checkbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    required: true
  }) }}
</form>
```

**Conversion Tips**:
- **Minimize fields** - each field reduces conversion by 10-15%
- Use **placeholder examples** for format guidance
- **Full width inputs** on mobile reduce form abandonment by 30%+
- Add **checkbox for terms** (legal compliance)
- Show **success states** immediately on valid input
- Display **inline errors** (not after submit)

### Newsletter Signup Pattern

**Goal**: Footer email capture with minimal friction

```njk
<div class="newsletter-signup">
  <h3>Stay Updated</h3>
  <p>Get our weekly newsletter</p>

  {{ input({
    type: 'email',
    placeholder: 'your@email.com',
    ariaLabel: 'Email for newsletter',
    fullWidth: true
  }) }}

  <p class="privacy">We respect your privacy. Unsubscribe anytime.</p>
</div>
```

**Conversion Tips**:
- **Clear value prop** ("Get weekly tips", not just "Subscribe")
- **Single field** only (no name required)
- **Privacy reassurance** reduces abandonment by 20%
- **Medium size** works best for footer forms

## Accessibility Guidelines

### Required for WCAG AA

1. **Always provide labels**:
   - Use `ariaLabel` for inputs without visible labels
   - Use `<label for="input-id">` for visible labels

2. **Error messages**:
   - Use `state="error"` for validation errors
   - Connect error text with `ariaDescribedBy`
   - Error text must be visible and descriptive

3. **Focus indicators**:
   - Automatic 3px outline on focus
   - 3:1 contrast ratio minimum (we provide 4.5:1)

4. **Touch targets**:
   - 44x44px minimum (default md size)
   - Larger on mobile (automatic)

5. **Keyboard navigation**:
   - Tab to navigate between inputs
   - Space to toggle checkbox/radio
   - Arrow keys for radio groups
   - Arrow keys for select dropdowns

### Testing Checklist

- [ ] All inputs have accessible labels (visible or `ariaLabel`)
- [ ] Error states communicate via `aria-invalid` and `ariaDescribedBy`
- [ ] Focus indicators are visible (3px outline)
- [ ] Color contrast meets 4.5:1 for text, 3:1 for UI
- [ ] Touch targets are at least 44x44px
- [ ] Keyboard navigation works (tab, space, arrows)
- [ ] Screen reader announces input type and validation state
- [ ] Disabled/readonly states are clearly communicated

## Size Guidelines

### Small (sm) - 32px height
**Use for**: Compact forms, inline inputs, filters, search bars

```njk
{{ input({ type: 'search', size: 'sm', placeholder: 'Filter...' }) }}
```

### Medium (md) - 44px height (DEFAULT)
**Use for**: Standard forms, contact forms, most use cases

```njk
{{ input({ type: 'email', size: 'md', placeholder: 'email@example.com' }) }}
```

### Large (lg) - 56px height
**Use for**: Hero CTAs, primary conversions, high-impact forms

```njk
{{ input({ type: 'email', size: 'lg', placeholder: 'Start your free trial' }) }}
```

**Marketing Impact**: Large inputs in hero sections can increase conversions by 40%+ (Unbounce data)

## Validation States

### Default
No validation state. Normal border color.

### Error
Red border. Use with `ariaDescribedBy` to connect to error message.

**When to use**: Invalid input format, required field empty, server validation error

```njk
{{ input({
  type: 'email',
  value: 'invalid',
  state: 'error',
  ariaDescribedBy: 'email-error'
}) }}
<p id="email-error">Please enter a valid email address</p>
```

### Success
Green border. Confirms valid input.

**When to use**: Valid input format, successful validation, accepted input

```njk
{{ input({
  type: 'email',
  value: 'valid@email.com',
  state: 'success'
}) }}
```

### Warning
Orange border. Cautions user without blocking submission.

**When to use**: Potentially incorrect input, unusual format, non-critical issues

```njk
{{ input({
  type: 'email',
  value: 'user@example',
  state: 'warning'
}) }}
```

## Icon Support

Icons provide visual context and increase usability.

### Email Icon

```njk
{% set emailIcon %}
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="m2 7 10 7 10-7"/>
</svg>
{% endset %}

{{ input({
  type: 'email',
  iconStart: emailIcon,
  placeholder: 'your@email.com'
}) }}
```

### Search Icon

```njk
{% set searchIcon %}
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.35-4.35"/>
</svg>
{% endset %}

{{ input({
  type: 'search',
  iconStart: searchIcon,
  placeholder: 'Search...'
}) }}
```

### Lock Icon (Password)

```njk
{% set lockIcon %}
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
</svg>
{% endset %}

{{ input({
  type: 'password',
  iconStart: lockIcon,
  placeholder: 'Enter password'
}) }}
```

**Icon Tips**:
- Use **16x16px icons** for md size inputs
- Use **currentColor** for icon stroke/fill (automatic theming)
- Place icons at **start** for context (email, search, lock)
- Place icons at **end** for actions (clear, toggle password visibility)

## Dark Mode

Dark mode is automatic. The component responds to:
1. System preference: `prefers-color-scheme: dark`
2. Manual toggle: `[data-theme="dark"]` on parent element

```njk
<div data-theme="dark">
  {{ input({ type: 'email', placeholder: 'your@email.com' }) }}
</div>
```

No configuration needed - colors adjust automatically via CSS custom properties.

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari 14+, Chrome Android 90+
- **Graceful Degradation**: Checkbox/radio fallback to native controls if CSS fails

## Performance

- **Bundle Size**: <600B gzipped
- **Rendering**: Pure CSS, no JavaScript
- **Animations**: Minimal transitions (150-250ms)
- **Reduced Motion**: Respects `prefers-reduced-motion` (disables transitions)

## Real-World Examples

### Stripe Homepage
Email input in hero with "Start now" button inline.

```njk
{{ input({
  type: 'email',
  size: 'lg',
  placeholder: 'Email address',
  fullWidth: true
}) }}
```

### Notion Signup
"Get Notion free" with email input and trust signal.

```njk
<p>Join millions already using Notion</p>
{{ input({
  type: 'email',
  size: 'lg',
  placeholder: 'Enter your email...'
}) }}
<p>Free for individuals. No credit card required.</p>
```

### Figma Waitlist
Single large email input for waitlist signups.

```njk
<h2>Join the Waitlist</h2>
{{ input({
  type: 'email',
  size: 'lg',
  placeholder: 'your@email.com',
  iconStart: emailIcon,
  fullWidth: true
}) }}
```

## Related Components

- **Form Group** (#107): Combines label + input + error message
- **Button** (#59): CTA buttons for form submission
- **Icon** (#63): Icon library for input icons

## Files

- `input.css` - Component styles (pure CSS, cascade layers)
- `input.njk` - Nunjucks template macro
- `input.schema.json` - JSON schema with metadata
- `input.stories.ts` - Storybook stories
- `README.md` - This file

## Contributing

When modifying this component:

1. **Maintain WCAG AA compliance** - test with axe, screen readers
2. **Test all input types** - text, email, textarea, select, checkbox, radio
3. **Verify mobile touch targets** - 44x44px minimum
4. **Check dark mode** - use `[data-theme="dark"]` for testing
5. **Update stories** - add new variants to Storybook
6. **Document changes** - update this README

## Questions?

- **Accessibility**: See "Accessibility Guidelines" section above
- **Marketing patterns**: See "Marketing Best Practices" section above
- **Icon usage**: See "Icon Support" section above
- **Validation**: See "Validation States" section above

---

**Component Status**: ✅ Complete (Phase 2)
**WCAG Level**: AA
**Bundle Size**: <600B gzipped
**Marketing Priority**: CRITICAL (Email capture is #1 conversion goal)
