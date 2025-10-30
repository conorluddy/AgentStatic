# Link Component

A semantic anchor element for navigation, external links, and downloads with multiple style variants and comprehensive accessibility features.

## Overview

The Link component is a versatile, production-ready anchor element that handles internal navigation, external links with security attributes, download functionality, and call-to-action styling. It's designed for brochureware marketing sites with WCAG AA compliance built-in.

## Features

- **8 Visual Variants**: default, muted, primary, underline, no-underline, hover-underline, cta, inherit
- **External Links**: Automatic `target="_blank"` and `rel="noopener noreferrer"` with external icon
- **Download Support**: Download attribute with custom filename and download icon
- **CTA Styling**: Button-like appearance while remaining semantically a link
- **Full Accessibility**: WCAG AA compliant, keyboard navigation, screen reader friendly
- **Dark Mode**: Automatic support with system preference and manual toggle
- **Icons**: Auto-generated for external/download, custom icon support
- **Performance**: <300B gzipped

## Installation

The Link component is part of the AgentStatic component library. Import it in your Nunjucks templates:

```njk
{% from "atoms/link/link.njk" import link %}
```

## Basic Usage

### Internal Link

```njk
{{ link({
  text: 'About Us',
  href: '/about'
}) }}
```

### External Link

```njk
{{ link({
  text: 'Visit Example.com',
  href: 'https://example.com',
  external: true
}) }}
```

### Download Link

```njk
{{ link({
  text: 'Download PDF',
  href: '/files/brochure.pdf',
  download: true,
  downloadFilename: 'company-brochure.pdf'
}) }}
```

### CTA Link

```njk
{{ link({
  text: 'Get Started',
  href: '/signup',
  variant: 'cta'
}) }}
```

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Link text content displayed to users |
| `href` | `string` | Link destination URL (relative or absolute) |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Visual style: 'default', 'muted', 'primary', 'underline', 'no-underline', 'hover-underline', 'cta', 'inherit' |
| `external` | `boolean` | `false` | Opens in new tab with security attributes, shows external icon |
| `download` | `boolean` | `false` | Triggers file download, shows download icon |
| `downloadFilename` | `string` | - | Custom filename for download attribute |
| `iconStart` | `string` | - | SVG icon HTML to display before text |
| `iconEnd` | `string` | - | SVG icon HTML to display after text |
| `disabled` | `boolean` | `false` | Non-interactive state (prefer removing link instead) |
| `id` | `string` | - | Unique identifier for the link element |
| `className` | `string` | - | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties (see below) |

### Accessibility Props (`a11y` object)

| Prop | Type | Description |
|------|------|-------------|
| `ariaLabel` | `string` | Accessible label for screen readers (recommended for icon-only links) |
| `ariaDescribedBy` | `string` | ID of element that describes this link |
| `ariaLabelledBy` | `string` | ID of element that labels this link |
| `role` | `string` | ARIA role override (rarely needed) |

## Variants

### Default

Standard link with primary color, underline appears on hover.

```njk
{{ link({ text: 'Learn More', href: '/learn' }) }}
```

### Muted

Less prominent link with gray color, ideal for footer links or secondary navigation.

```njk
{{ link({ text: 'Privacy Policy', href: '/privacy', variant: 'muted' }) }}
```

### Primary

Emphasized link with primary brand color and medium font weight.

```njk
{{ link({ text: 'View Details', href: '/details', variant: 'primary' }) }}
```

### Underline

Always underlined, regardless of hover state.

```njk
{{ link({ text: 'Contact Us', href: '/contact', variant: 'underline' }) }}
```

### No Underline

Never underlined, clean appearance for navigation menus.

```njk
{{ link({ text: 'Home', href: '/', variant: 'no-underline' }) }}
```

### Hover Underline

Animated underline slides in on hover (modern effect).

```njk
{{ link({ text: 'Explore', href: '/explore', variant: 'hover-underline' }) }}
```

### CTA (Call-to-Action)

Button-styled link for primary actions. Semantically still a link.

```njk
{{ link({ text: 'Get Started', href: '/signup', variant: 'cta' }) }}
```

### Inherit

Inherits text color from parent element.

```njk
<div style="color: #059669;">
  {{ link({ text: 'Inherited Color', href: '#', variant: 'inherit' }) }}
</div>
```

## Real-World Examples

### Navigation Menu

```njk
<nav>
  {{ link({ text: 'Home', href: '/', variant: 'no-underline' }) }}
  {{ link({ text: 'About', href: '/about', variant: 'no-underline' }) }}
  {{ link({ text: 'Services', href: '/services', variant: 'no-underline' }) }}
  {{ link({ text: 'Contact', href: '/contact', variant: 'no-underline' }) }}
</nav>
```

### Footer Links

```njk
<footer>
  <div>
    <h4>Company</h4>
    {{ link({ text: 'About Us', href: '/about', variant: 'muted' }) }}
    {{ link({ text: 'Careers', href: '/careers', variant: 'muted' }) }}
    {{ link({ text: 'Press', href: '/press', variant: 'muted' }) }}
  </div>
  <div>
    <h4>Legal</h4>
    {{ link({ text: 'Privacy', href: '/privacy', variant: 'muted' }) }}
    {{ link({ text: 'Terms', href: '/terms', variant: 'muted' }) }}
  </div>
</footer>
```

### In-Text Links

```njk
<p>
  Visit our {{ link({ text: 'documentation', href: '/docs' }) }}
  to learn more, or check out our
  {{ link({ text: 'GitHub repository', href: 'https://github.com/example', external: true }) }}
  for source code.
</p>
```

### Call-to-Action Section

```njk
<section class="hero">
  <h1>Ready to get started?</h1>
  <p>Join thousands of satisfied customers today.</p>
  {{ link({ text: 'Start Free Trial', href: '/signup', variant: 'cta' }) }}
</section>
```

## Accessibility

The Link component is designed with accessibility as a core requirement:

### WCAG AA Compliance

- **Color Contrast**: All link colors meet 4.5:1 contrast ratio requirement
- **Focus Indicators**: Clear, visible focus states with 2px outline and offset
- **Keyboard Navigation**: Full keyboard support with Tab and Enter
- **Screen Reader**: Semantic HTML with proper ARIA attributes

### External Link Security

External links automatically include:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Prevents security vulnerabilities
- External icon - Visual indicator for users

### Best Practices

1. **Descriptive Text**: Use clear, descriptive link text that makes sense out of context
   ```njk
   {# Good #}
   {{ link({ text: 'Read our privacy policy', href: '/privacy' }) }}

   {# Avoid #}
   {{ link({ text: 'Click here', href: '/privacy' }) }}
   ```

2. **Icon-Only Links**: Always provide `aria-label` for accessibility
   ```njk
   {{ link({
     iconStart: '<svg>...</svg>',
     href: '/search',
     a11y: { ariaLabel: 'Search the website' }
   }) }}
   ```

3. **External Links**: Mark external links appropriately
   ```njk
   {{ link({
     text: 'External Resource',
     href: 'https://example.com',
     external: true
   }) }}
   ```

4. **Disabled State**: Prefer removing the link entirely over disabling it
   ```njk
   {# Better: conditionally render #}
   {% if featureAvailable %}
     {{ link({ text: 'Access Feature', href: '/feature' }) }}
   {% else %}
     <span>Coming Soon</span>
   {% endif %}
   ```

### Keyboard Navigation

- **Tab**: Navigate to link
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate link
- **Space**: No effect (standard link behavior)

### Screen Reader Announcements

- Default links: "Link, [text]"
- External links: "Link, [text], opens in new tab"
- Download links: "Link, [text], downloads file"
- Disabled links: "[text], unavailable"

## Dark Mode

The Link component automatically adapts to dark mode:

- System preference detection via `prefers-color-scheme: dark`
- Manual toggle via `data-theme="dark"` attribute
- All variants adjust colors for optimal contrast in dark mode
- CTA variant maintains button-like appearance with adjusted colors

```html
<!-- Automatic system preference -->
{{ link({ text: 'Auto Dark Mode', href: '#' }) }}

<!-- Manual dark mode toggle -->
<div data-theme="dark">
  {{ link({ text: 'Dark Mode Link', href: '#' }) }}
</div>
```

## Performance

- **Bundle Size**: <300B gzipped (CSS only)
- **No JavaScript**: Pure CSS implementation (except for optional tracking)
- **Render Complexity**: Low - simple anchor element
- **Repaints**: Minimal - uses CSS transitions

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Mobile Chrome 90+

## Customization

### CSS Custom Properties

The Link component uses CSS custom properties for easy theming:

```css
.link {
  --link-color: var(--color-primary-600);
  --link-color-hover: var(--color-primary-700);
  --link-color-visited: var(--color-primary-800);
  --link-decoration: none;
  --link-decoration-hover: underline;
  --link-decoration-thickness: 1px;
  --link-underline-offset: 0.2em;
}
```

### Custom Styling

Override with additional classes:

```njk
{{ link({
  text: 'Custom Link',
  href: '#',
  className: 'custom-link'
}) }}
```

```css
.custom-link {
  font-weight: 700;
  text-transform: uppercase;
}
```

## Advanced Usage

### With Custom Icons

```njk
{{ link({
  text: 'Documentation',
  href: '/docs',
  iconStart: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>'
}) }}
```

### With Tracking Attributes

```njk
{{ link({
  text: 'Track Click',
  href: '/tracked',
  attributes: {
    'data-tracking': 'cta-click',
    'data-category': 'conversion'
  }
}) }}
```

### With Complex Accessibility

```njk
{{ link({
  text: 'Complex Link',
  href: '/complex',
  a11y: {
    ariaLabel: 'Navigate to complex page with detailed information',
    ariaDescribedBy: 'link-description-1'
  }
}) }}
<p id="link-description-1">This link provides access to advanced features.</p>
```

## Common Patterns

### Navigation List

```njk
<ul>
  <li>{{ link({ text: 'Home', href: '/', variant: 'no-underline' }) }}</li>
  <li>{{ link({ text: 'About', href: '/about', variant: 'no-underline' }) }}</li>
  <li>{{ link({ text: 'Contact', href: '/contact', variant: 'no-underline' }) }}</li>
</ul>
```

### Breadcrumbs

```njk
<nav aria-label="Breadcrumb">
  {{ link({ text: 'Home', href: '/', variant: 'muted' }) }}
  <span>/</span>
  {{ link({ text: 'Products', href: '/products', variant: 'muted' }) }}
  <span>/</span>
  <span aria-current="page">Product Name</span>
</nav>
```

### Social Links

```njk
<div class="social-links">
  {{ link({
    iconStart: '<svg><!-- Twitter icon --></svg>',
    href: 'https://twitter.com/example',
    external: true,
    variant: 'no-underline',
    a11y: { ariaLabel: 'Follow us on Twitter' }
  }) }}
  {{ link({
    iconStart: '<svg><!-- GitHub icon --></svg>',
    href: 'https://github.com/example',
    external: true,
    variant: 'no-underline',
    a11y: { ariaLabel: 'View our GitHub repository' }
  }) }}
</div>
```

## Troubleshooting

### Link Not Appearing

- Verify `text` prop is provided
- Check `href` is valid
- Ensure CSS is loaded

### External Icon Not Showing

- Confirm `external: true` is set
- Check for CSS conflicts
- Verify SVG is rendering

### Styles Not Applied

- Check cascade layer order
- Verify token imports
- Inspect specificity conflicts

### Dark Mode Not Working

- Test `prefers-color-scheme` in browser
- Verify `data-theme` attribute placement
- Check CSS custom property overrides

## Related Components

- **Button**: For actions that don't navigate (form submissions, JavaScript interactions)
- **Icon**: For standalone icons used with links
- **Navigation**: For complex navigation patterns

## Schema

See `link.schema.json` for the complete JSON schema definition used by AI discovery tools.

## License

Part of AgentStatic - MIT License
