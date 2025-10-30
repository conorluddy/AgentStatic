# Breadcrumb Component

Navigation trail showing current location in site hierarchy with proper ARIA markup and Schema.org structured data support.

## Overview

The Breadcrumb component displays the navigational path from the homepage to the current page, helping users understand their location within the site structure and providing easy navigation back to parent pages.

### Key Features

- **Multiple Separator Styles**: Chevron (default), slash, arrow, dot
- **Size Variants**: Small, medium (default), large
- **Mobile Responsive**: Automatic collapse on small screens (shows first item ... last two items)
- **Schema.org Support**: Optional JSON-LD structured data for SEO rich snippets
- **Text Truncation**: Optional truncation for very long breadcrumb labels
- **WCAG AA Compliant**: Full accessibility with proper ARIA markup
- **Dark Mode**: Automatic support via design tokens
- **Keyboard Navigation**: All links fully keyboard accessible

## Usage

### Basic Example

```njk
{% from "atoms/breadcrumb/breadcrumb.njk" import breadcrumb %}

{{ breadcrumb({
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Shoes' }
  ]
}) }}
```

### Different Separators

```njk
{# Chevron (default) #}
{{ breadcrumb({
  items: [...],
  separator: 'chevron'
}) }}

{# Slash #}
{{ breadcrumb({
  items: [...],
  separator: 'slash'
}) }}

{# Arrow #}
{{ breadcrumb({
  items: [...],
  separator: 'arrow'
}) }}

{# Dot #}
{{ breadcrumb({
  items: [...],
  separator: 'dot'
}) }}
```

### Size Variants

```njk
{# Small - compact layouts #}
{{ breadcrumb({
  items: [...],
  size: 'sm'
}) }}

{# Medium (default) #}
{{ breadcrumb({
  items: [...],
  size: 'md'
}) }}

{# Large - emphasized #}
{{ breadcrumb({
  items: [...],
  size: 'lg'
}) }}
```

### With Schema.org for SEO

```njk
{{ breadcrumb({
  items: [
    { label: 'Home', href: 'https://example.com/' },
    { label: 'Products', href: 'https://example.com/products' },
    { label: 'Athletic Shoes', href: 'https://example.com/products/athletic-shoes' },
    { label: 'Nike Air Max 90' }
  ],
  schema: true
}) }}
```

This generates JSON-LD structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    },
    ...
  ]
}
```

### With Text Truncation

```njk
{{ breadcrumb({
  items: [
    { label: 'Home', href: '/' },
    { label: 'Very Long Category Name That Should Be Truncated', href: '/category' },
    { label: 'Current Page' }
  ],
  truncate: true
}) }}
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Array of breadcrumb trail items (see Item Structure below) |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separator` | `string` | `'chevron'` | Separator style: `'chevron'`, `'slash'`, `'arrow'`, `'dot'` |
| `size` | `string` | `'md'` | Size variant: `'sm'`, `'md'`, `'lg'` |
| `truncate` | `boolean` | `false` | Enable text truncation for long item labels |
| `schema` | `boolean` | `false` | Include Schema.org structured data (JSON-LD) |
| `id` | `string` | — | Unique identifier for the component |
| `className` | `string` | — | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | See below | Accessibility properties |

### Item Structure

Each item in the `items` array:

```typescript
{
  label: string;      // Required: Display text
  href?: string;      // Optional: URL (omit for current page)
}
```

**Important**: The last item typically represents the current page and should **not** have an `href` property. This ensures it renders as plain text with `aria-current="page"` instead of a link.

### Accessibility Props

```typescript
a11y: {
  ariaLabel?: string;  // Default: 'Breadcrumb'
}
```

## Real-World Examples

### E-commerce Product Page

```njk
{{ breadcrumb({
  items: [
    { label: 'Home', href: '/' },
    { label: 'Men', href: '/men' },
    { label: 'Shoes', href: '/men/shoes' },
    { label: 'Athletic', href: '/men/shoes/athletic' },
    { label: 'Nike Air Max 90' }
  ],
  schema: true
}) }}
```

### Documentation Site

```njk
{{ breadcrumb({
  items: [
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Atoms', href: '/docs/components/atoms' },
    { label: 'Breadcrumb' }
  ],
  separator: 'slash',
  size: 'sm'
}) }}
```

### Blog Article

```njk
{{ breadcrumb({
  items: [
    { label: 'Blog', href: '/blog' },
    { label: '2024', href: '/blog/2024' },
    { label: 'Web Development', href: '/blog/2024/web-development' },
    { label: 'Getting Started with CSS Cascade Layers' }
  ],
  schema: true
}) }}
```

## Accessibility

### WCAG AA Compliance

- **Semantic HTML**: Uses `<nav>`, `<ol>`, `<li>` elements
- **ARIA Landmarks**: `aria-label` on navigation element
- **Current Page**: `aria-current="page"` on current page item
- **Keyboard Navigation**: All links fully keyboard accessible
- **Focus Indicators**: Visible focus states on all interactive elements
- **Color Contrast**: Meets WCAG AA requirements (4.5:1 for text)
- **Screen Readers**: Proper role and label announcements

### Best Practices

1. **Always include a breadcrumb on content pages** (not on homepage)
2. **Last item should be current page** (no `href` property)
3. **Keep labels concise** (use truncation for long labels if needed)
4. **Use Schema.org markup** for SEO benefits on public pages
5. **Choose separator style** that matches your site's design language

## Mobile Responsive Behavior

On screens smaller than 768px (48em), the breadcrumb automatically collapses:

**Desktop (all items shown):**
```
Home > Products > Category > Subcategory > Current Page
```

**Mobile (collapsed):**
```
Home > ... > Subcategory > Current Page
```

The mobile view shows:
- First item (usually "Home")
- Ellipsis (...)
- Last two items (parent page and current page)

This ensures breadcrumbs remain usable on small screens without overwhelming the layout.

## SEO Benefits

### Schema.org Structured Data

When `schema: true` is enabled, the component generates JSON-LD structured data that helps search engines:

1. **Understand site structure** and page hierarchy
2. **Display breadcrumbs in search results** (rich snippets)
3. **Improve SEO rankings** with clear site architecture
4. **Enhance click-through rates** from search results

### When to Use Schema.org

- ✅ **Public-facing pages** (products, blog posts, documentation)
- ✅ **Multi-level site hierarchies** (categories, subcategories)
- ✅ **E-commerce product pages** (department > category > product)
- ❌ **Admin/dashboard pages** (not indexed by search engines)
- ❌ **User account pages** (private, not for SEO)

## Styling

### CSS Custom Properties

The component uses these CSS custom properties for easy theming:

```css
.breadcrumb {
  --breadcrumb-font-size: var(--font-size-sm);
  --breadcrumb-gap: var(--spacing-xs);
  --breadcrumb-color: var(--color-text-muted);
  --breadcrumb-hover-color: var(--color-primary-600);
  --breadcrumb-current-color: var(--color-text);
  --breadcrumb-separator-color: var(--color-gray-400);
}
```

### Dark Mode

Dark mode is automatically supported via semantic design tokens:

```css
/* Light mode (default) */
--breadcrumb-color: var(--color-text-muted);           /* #6b7280 */
--breadcrumb-current-color: var(--color-text);         /* #111827 */

/* Dark mode (automatic) */
--breadcrumb-color: var(--color-gray-400);             /* #9ca3af */
--breadcrumb-current-color: var(--color-gray-100);     /* #f3f4f6 */
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 12+)
- Chrome Android (latest)

## Performance

- **Bundle Size**: <300B gzipped
- **Render Cost**: Low (simple list structure)
- **No JavaScript**: Pure HTML/CSS component

## Dependencies

- **Link Component** (`atoms/link`): Used for breadcrumb item links

## Related Components

- **Link** (`atoms/link`): Base link component
- **Navigation** (`organisms/navigation`): Primary site navigation
- **Pagination** (`molecules/pagination`): Page-level navigation

## Further Reading

- [WAI-ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Google Rich Results - Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Nielsen Norman Group - Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/)

## Changelog

### v1.0.0 (Initial Release)
- Basic breadcrumb navigation with link integration
- Multiple separator styles (chevron, slash, arrow, dot)
- Size variants (sm, md, lg)
- Mobile responsive collapse
- Schema.org structured data support
- Text truncation option
- Full WCAG AA accessibility
- Dark mode support
