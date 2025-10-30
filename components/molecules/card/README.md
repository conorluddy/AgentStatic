# Card Molecule Component

Versatile content container combining image, text, actions, and metadata. The **most versatile molecule** in the component library, perfect for blog posts, features, team members, case studies, product listings, and marketing content.

## Overview

The Card molecule combines multiple atoms (Button, Heading, Link, Text, Badge) into a flexible content container with extensive layout options and marketing-focused features.

### Key Features

- **6 Layout Variants**: Default (vertical), horizontal, overlay, minimal, icon, stat
- **Fully Clickable**: Entire card can be clickable for better UX
- **Badge Overlay**: Support for corner badges ("New", "Featured", "Sale")
- **Tag Lists**: Category tags displayed as small badges
- **Metadata Display**: Author, date, category information
- **Action Buttons**: Primary and secondary CTAs in footer
- **Aspect Ratio Control**: Consistent grid heights (16:9, 4:3, square, 21:9)
- **Hover Effects**: Marketing-optimized lift effect signals interactivity
- **Responsive**: Horizontal variant stacks on mobile, adaptive padding
- **Dark Mode**: Full support with automatic color switching
- **WCAG AA**: Accessible with semantic HTML and proper ARIA

## Composition

This molecule is composed of the following atoms:
- **Button**: Primary and secondary action buttons in footer
- **Heading**: Card title (h3 by default)
- **Link**: Secondary action links
- **Text**: Description and body content
- **Badge**: Tags and overlay badges for callouts

## Usage

### Basic Import

```nunjucks
{% from "molecules/card/card.njk" import card %}
```

### Blog Post Card

```nunjucks
{{ card({
  image: {
    src: '/blog-cover.jpg',
    alt: 'Blog post cover image'
  },
  title: 'How to Build Better Websites',
  description: 'Learn the best practices for modern web development.',
  metadata: {
    author: 'Jane Doe',
    date: 'Jan 15, 2024',
    category: 'Tutorial'
  },
  tags: ['Web Dev', 'Performance'],
  actions: {
    primary: {
      text: 'Read More',
      href: '/blog/post-1',
      variant: 'primary',
      size: 'sm'
    },
    secondary: {
      text: 'Share',
      href: '#share'
    }
  }
}) }}
```

### Clickable Card with Badge

```nunjucks
{{ card({
  clickable: true,
  href: '/feature',
  badge: {
    text: 'New',
    variant: 'primary'
  },
  image: {
    src: '/feature-cover.jpg',
    alt: 'Feature screenshot'
  },
  title: 'AI-Powered Page Builder',
  description: 'Build pages with natural language. Click anywhere on this card.'
}) }}
```

### Feature Icon Card

```nunjucks
{{ card({
  variant: 'icon',
  icon: '<svg>...</svg>',
  title: 'Lightning Fast',
  description: 'Built for speed with modern web technologies.'
}) }}
```

### Stat Card

```nunjucks
{{ card({
  variant: 'stat',
  stat: {
    value: '10,000+',
    label: 'Happy Customers'
  }
}) }}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Layout variant: `'default'`, `'horizontal'`, `'overlay'`, `'minimal'`, `'icon'`, `'stat'` |
| `clickable` | `boolean` | `false` | Makes entire card clickable (better UX than small link) |
| `href` | `string` | `''` | Link destination when `clickable=true` |
| `image` | `object` | `{}` | Image configuration (see Image Props below) |
| `badge` | `object` | `null` | Badge overlay (see Badge Props below) |
| `icon` | `string` | `''` | SVG icon HTML for icon variant (48x48px) |
| `stat` | `object` | `{}` | Stat configuration (see Stat Props below) |
| `title` | `string` | `''` | Card title (renders as h3) |
| `description` | `string` | `''` | Card description text |
| `metadata` | `object` | `{}` | Metadata (author, date, category) |
| `tags` | `array` | `[]` | Array of tag strings |
| `actions` | `object` | `{}` | Action buttons (primary, secondary) |
| `id` | `string` | `''` | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Image Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `''` | Image URL (required if image used) |
| `alt` | `string` | `''` | Image alt text for accessibility |
| `aspectRatio` | `string` | `'16-9'` | Aspect ratio: `'16-9'`, `'4-3'`, `'square'`, `'21-9'` |

### Badge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | Badge text |
| `variant` | `string` | `'default'` | Badge variant: `'default'`, `'primary'`, `'secondary'`, `'success'`, `'warning'`, `'error'` |

### Stat Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Large stat value (e.g., '10,000+', '99%') |
| `label` | `string` | `''` | Stat label (e.g., 'Happy Customers') |

## Layout Variants

### Default (Vertical)
- Image on top
- Content below
- Standard blog post layout
- **Use for**: Blog posts, articles, content cards

### Horizontal
- Image on left (40% width)
- Content on right (60% width)
- Stacks vertically on mobile
- **Use for**: Team members, case studies, compact listings

### Overlay
- Image as background
- Content overlays image with gradient
- Text in white with dark gradient background
- **Use for**: Hero cards, visual impact, featured content

### Minimal
- No border or shadow
- Transparent background
- Clean, understated design
- **Use for**: Content-focused layouts, portfolios

### Icon
- Centered icon (48x48px)
- Title and description centered
- No image section
- **Use for**: Feature showcases, service offerings

### Stat
- Large centered number
- Label below
- No image or description
- **Use for**: Metrics, social proof, achievements

## Common Patterns

### Blog Grid

```nunjucks
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
  {% for post in posts %}
    {{ card({
      image: { src: post.coverImage, alt: post.title },
      title: post.title,
      description: post.excerpt,
      metadata: { author: post.author, date: post.date },
      tags: post.tags,
      actions: {
        primary: { text: 'Read More', href: post.url, size: 'sm' }
      }
    }) }}
  {% endfor %}
</div>
```

### Feature Showcase

```nunjucks
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
  {{ card({
    variant: 'icon',
    icon: '<svg>...</svg>',
    title: 'Fast Performance',
    description: 'Lightning-fast load times under 1 second.'
  }) }}
  {{ card({
    variant: 'icon',
    icon: '<svg>...</svg>',
    title: 'Easy to Use',
    description: 'Intuitive interface designed for everyone.'
  }) }}
</div>
```

## Accessibility

- **WCAG Level**: AA compliant
- **Keyboard Navigation**: Fully keyboard accessible with visible focus states
- **Screen Reader**: Uses semantic `<article>` element, `<a>` when clickable
- **Focus Management**: Clear focus indicators (3px outline, 2px offset)
- **Color Contrast**: WCAG AA compliant (4.5:1 for text) in both light and dark modes

### Best Practices

- Always provide image alt text
- Ensure clickable cards have descriptive link text or aria-labels
- Test with keyboard navigation (Tab, Enter keys)
- Verify with screen readers (VoiceOver, NVDA)

## Responsive Design

- **Mobile (<768px)**: Horizontal cards stack vertically, reduced padding
- **Tablet (768px+)**: Full layout support, larger title text
- **Desktop (1440px+)**: Increased content padding for better readability

Horizontal layouts automatically stack on mobile regardless of prop setting.

## Dark Mode

All variants adapt to dark mode automatically using CSS custom properties. No additional configuration needed.

## Marketing Enhancements

### Hover Lift Effect
- Lifts 4px on hover with shadow increase
- Signals interactivity
- Respects `prefers-reduced-motion`

### Clickable Cards
- Better UX than small buttons
- Larger click target improves conversion
- Proper keyboard navigation

### Badge Overlays
- Corner badges for "New", "Featured", "Sale"
- Creates urgency and highlights content

## Performance Considerations

- **Bundle Size**: Target <1KB gzipped
- **CSS Only**: No JavaScript required
- **GPU Accelerated**: Animations use CSS transforms
- **Lazy Loading**: Images use `loading="lazy"` by default

## Related Components

### Composed Atoms
- **Button**: Primary actions in footer
- **Heading**: Card titles
- **Link**: Secondary actions
- **Text**: Description content
- **Badge**: Tags and overlays

## Examples

See `/components/molecules/card/card.stories.ts` for comprehensive examples including:
- Blog post cards
- Clickable cards with badges
- Horizontal layouts
- Overlay variants
- Icon cards
- Stat cards
- Product cards
- Grid layouts
- Dark mode

## Changelog

### Version 1.0.0
- Initial implementation combining Button, Heading, Link, Text, and Badge atoms
- 6 layout variants (default, horizontal, overlay, minimal, icon, stat)
- Full marketing feature set (badges, tags, clickable cards)
- WCAG AA accessibility
- Dark mode support
