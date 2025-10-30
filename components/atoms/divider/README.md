# Divider Atom Component

A flexible visual separator for content sections. Supports horizontal and vertical orientations, multiple line styles (solid, dashed, dotted), gradient effects, decorative text/icon in center, and invisible spacers.

## Features

- **Bidirectional**: Horizontal and vertical orientations
- **Multiple Styles**: Solid, dashed, dotted, gradient variants
- **Thickness Control**: Thin (1px), medium (2px), thick (4px)
- **Color Options**: Default gray, primary blue, muted light gray
- **Spacing Control**: None, small, medium, large margins
- **Text/Icon Support**: Decorative content in center ("or" pattern)
- **Text Alignment**: Left, center, right positioning
- **Special Variants**: Section dividers (thick with large spacing), spacers (invisible)
- **Dark Mode**: Automatic adaptation via semantic tokens
- **Accessibility**: WCAG AA compliant with semantic markup

## Installation

This component is part of AgentStatic's component library. No installation required.

## Usage

### Basic Import

```njk
{% from "atoms/divider/divider.njk" import divider %}
```

### Simple Horizontal Divider

```njk
{{ divider() }}
```

### Vertical Divider

```njk
<div style="display: flex;">
  <p>Left content</p>
  {{ divider({ orientation: 'vertical' }) }}
  <p>Right content</p>
</div>
```

### Line Style Variants

```njk
{# Solid (default) #}
{{ divider({ variant: 'solid' }) }}

{# Dashed #}
{{ divider({ variant: 'dashed' }) }}

{# Dotted #}
{{ divider({ variant: 'dotted' }) }}

{# Gradient (fades to transparent) #}
{{ divider({ variant: 'gradient' }) }}
```

### Thickness Options

```njk
{{ divider({ thickness: 'thin' }) }}    {# 1px #}
{{ divider({ thickness: 'medium' }) }}  {# 2px #}
{{ divider({ thickness: 'thick' }) }}   {# 4px #}
```

### Color Variants

```njk
{{ divider({ color: 'default' }) }}  {# Gray #}
{{ divider({ color: 'primary' }) }}  {# Blue #}
{{ divider({ color: 'muted' }) }}    {# Light gray #}
```

### Spacing Control

```njk
{{ divider({ spacing: 'none' }) }}  {# No margin #}
{{ divider({ spacing: 'sm' }) }}    {# 8px margin #}
{{ divider({ spacing: 'md' }) }}    {# 16px margin (default) #}
{{ divider({ spacing: 'lg' }) }}    {# 24px margin #}
```

### Divider with Text

```njk
{# OR divider (common for login options) #}
{{ divider({ withText: 'or' }) }}

{# Center aligned (default) #}
{{ divider({ withText: 'or', textAlign: 'center' }) }}

{# Left aligned #}
{{ divider({ withText: 'More content', textAlign: 'left' }) }}

{# Right aligned #}
{{ divider({ withText: 'See all', textAlign: 'right' }) }}
```

### Divider with Icon

```njk
{{ divider({
  withIcon: '<svg width="16" height="16"><circle cx="8" cy="8" r="4" fill="currentColor"/></svg>'
}) }}
```

### Section Divider (Major Breaks)

```njk
<section>
  <h2>First Section</h2>
  <p>Content here...</p>
</section>

{{ divider({ variant: 'section' }) }}

<section>
  <h2>Second Section</h2>
  <p>More content...</p>
</section>
```

### Spacer (Invisible)

```njk
<p>Content above</p>
{{ divider({ variant: 'spacer', spacing: 'lg' }) }}
<p>Content below with extra space</p>
```

## Props

| Prop | Type | Options | Default | Description |
|------|------|---------|---------|-------------|
| `orientation` | string | `horizontal`, `vertical` | `horizontal` | Orientation of the divider line |
| `variant` | string | `solid`, `dashed`, `dotted`, `gradient`, `section`, `spacer` | `solid` | Visual style variant |
| `thickness` | string | `thin`, `medium`, `thick` | `thin` | Line thickness (1px, 2px, 4px) |
| `color` | string | `default`, `primary`, `muted` | `default` | Color variant for the divider |
| `spacing` | string | `none`, `sm`, `md`, `lg` | `md` | Margin spacing around divider |
| `withText` | string | any | - | Text to display in center |
| `withIcon` | string | any HTML/SVG | - | Icon to display in center |
| `textAlign` | string | `left`, `center`, `right` | `center` | Text/icon alignment |
| `id` | string | any | - | Unique identifier |
| `className` | string | any | - | Additional CSS classes |
| `attributes` | object | any | `{}` | Additional HTML attributes |
| `a11y.role` | string | any | `separator` | ARIA role override |
| `a11y.ariaLabel` | string | any | - | Accessible label |

## Common Use Cases

### Login Form ("or" Divider)

```njk
<form>
  <button type="submit">Continue with Email</button>

  {{ divider({ withText: 'or', spacing: 'lg' }) }}

  <button type="button">Continue with Google</button>
  <button type="button">Continue with Facebook</button>
</form>
```

### Content Sections

```njk
<article>
  <section>
    <h2>Introduction</h2>
    <p>Content...</p>
  </section>

  {{ divider({ variant: 'section' }) }}

  <section>
    <h2>Main Content</h2>
    <p>Content...</p>
  </section>

  {{ divider({ variant: 'section' }) }}

  <section>
    <h2>Conclusion</h2>
    <p>Content...</p>
  </section>
</article>
```

### Sidebar Navigation

```njk
<nav>
  <a href="/home">Home</a>
  {{ divider({ orientation: 'vertical', spacing: 'sm' }) }}
  <a href="/about">About</a>
  {{ divider({ orientation: 'vertical', spacing: 'sm' }) }}
  <a href="/contact">Contact</a>
</nav>
```

### Footer Sections

```njk
<footer>
  <div class="footer-columns">
    {# Column content #}
  </div>

  {{ divider({ variant: 'muted' }) }}

  <div class="footer-legal">
    <p>&copy; 2025 Company. All rights reserved.</p>
  </div>
</footer>
```

### Subtle Blog Post Breaks

```njk
<article>
  <p>First paragraph...</p>

  {{ divider({ variant: 'gradient', spacing: 'lg' }) }}

  <p>Second paragraph...</p>
</article>
```

## Accessibility

### Semantic HTML

- Simple horizontal dividers use semantic `<hr>` element
- Vertical dividers and text/icon variants use `<div role="separator">`
- Includes `aria-orientation` attribute for assistive technologies

### WCAG AA Compliance

- Default divider meets 3:1 contrast ratio for UI components
- High contrast mode automatically strengthens border visibility
- Screen reader friendly with proper ARIA attributes

### Keyboard Navigation

- Not keyboard navigable (dividers are visual separators, not interactive)
- Screen readers announce as "separator" with orientation

## Styling

### CSS Architecture

- Component-scoped naming (`.divider`, `.divider-horizontal`, etc.)
- CSS cascade layers (`@layer components`)
- Pure CSS with design tokens (no preprocessors)
- Logical properties for international layouts

### Design Tokens

```css
--divider-color: var(--color-border);
--divider-thickness: var(--border-width-thin);
--divider-spacing: var(--spacing-md);
--divider-style: solid;
```

### Dark Mode

Automatic adaptation using semantic color tokens. No additional configuration needed.

```njk
{# Automatically adapts to dark mode #}
{{ divider() }}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS cascade layers support required
- Flexbox support required for text/icon variants
- Gradient support required for gradient variant

## Performance

- **Bundle Size**: ~180B gzipped
- **Render Time**: Minimal (pure CSS)
- **No JavaScript**: Zero JS overhead

## Examples

See the Storybook stories for interactive examples:

- `Default` - Basic horizontal divider
- `Vertical` - Vertical orientation
- `Dashed`, `Dotted` - Line style variants
- `Gradient` - Fade effect
- `WithTextOR` - OR divider pattern
- `Section` - Major section breaks
- `Spacer` - Invisible spacing
- `LoginFormExample` - Real-world login form
- `ContentSectionExample` - Article sections
- `DarkMode` - Dark mode demonstration

## Related Components

- None (divider is an independent atom)

## Version

- **Component Version**: 1.0.0
- **Phase**: Phase 2 (Basic Components)
- **Status**: Production Ready

## Changelog

### 1.0.0 (2025-10-30)

- Initial release
- Horizontal and vertical orientations
- Solid, dashed, dotted, gradient variants
- Thickness control (thin, medium, thick)
- Color options (default, primary, muted)
- Spacing control (none, sm, md, lg)
- Text/icon in center support
- Text alignment (left, center, right)
- Section divider variant
- Spacer variant (invisible)
- Dark mode support
- WCAG AA accessibility
- Semantic HTML (`<hr>` and `<div role="separator">`)
