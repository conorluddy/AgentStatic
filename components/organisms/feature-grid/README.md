# Feature Grid Organism

**Category**: Organism
**Complexity**: Complex
**Bundle Size**: ~4KB gzipped
**Dependencies**: Image+Text molecule, Feature List molecule, Heading/Text/Icon atoms

---

## Overview

The **Feature Grid** organism is the workhorse marketing component for showcasing product features and benefits on brochureware sites. It supports flexible grid and alternating layouts, multiple column configurations (2, 3, or 4 columns), and various content types including icon-based features, image-based features, and detailed features with nested feature lists.

This component is essential for **SaaS landing pages**, **product marketing pages**, **service offerings**, and **benefits communication**. It enables high-converting patterns like feature showcases, alternating image/text sections, and progressive disclosure of product capabilities.

---

## Marketing Context

### Psychology & Strategy

**Features vs Benefits**: The Feature Grid excels at communicating benefits (what users achieve) rather than technical features. Each feature item supports a clear value proposition with icon, title, and description.

**Progressive Disclosure**: Present the most important or differentiated features first. Users scan features top-to-bottom and left-to-right. Place your "hero" features in the top-left positions.

**Visual Hierarchy**: Icons provide instant visual anchors. Alternating layouts break monotony and increase engagement. Card variants create clear separation for services or offerings.

**Odd Numbers Work Better**: 3 or 5 features are more visually engaging than 4 or 6 (psychological asymmetry). Use 3-column grids when possible.

### Real-World Patterns

1. **SaaS Feature Grid**: 3-column icon-based grid showcasing core product capabilities (Stripe, Notion, Figma)
2. **Product Showcase**: Alternating image/text layout for feature deep-dives with screenshots (Linear, Vercel, Framer)
3. **Service Offerings**: 2-column card layout for agency/consultancy services (Metalab, ueno., IDEO)
4. **Benefits Showcase**: 4-column minimal grid for high-level value propositions (Basecamp, Hey, Superhuman)
5. **How It Works**: Alternating step-by-step process explanation (Loom, Calendly, Zapier)

### Conversion Optimization

- **Above-the-Fold Features**: Show 3 key features immediately visible on page load (80% of users never scroll)
- **Social Proof Integration**: Combine with Logo Grid (#108) and Testimonials (#71) for trust signals
- **Alternating Pattern**: Image left/right/left reduces bounce rate by breaking visual monotony (CXL Institute)
- **Icon Consistency**: Maintain consistent icon style (outline vs solid, monochrome vs colored) for professional appearance
- **Feature Prioritization**: Lead with your most differentiated/compelling features (analytics-driven optimization)

---

## Props API

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `''` | Section heading (optional) |
| `description` | `string` | `''` | Section description (optional) |
| `headerAlign` | `'center' \| 'left'` | `'center'` | Header alignment |
| `features` | `array` | `[]` | **Required**. Array of feature objects |
| `layout` | `'grid' \| 'alternating'` | `'grid'` | Layout type |
| `columns` | `2 \| 3 \| 4` | `3` | Number of columns (grid layout only) |
| `variant` | `'default' \| 'bordered' \| 'cards' \| 'minimal'` | `'default'` | Visual style variant |
| `contentAlign` | `'center' \| 'left'` | `'center'` | Content alignment (grid layout only) |
| `backgroundColor` | `'primary' \| 'secondary' \| 'accent'` | `''` | Background color variant (optional) |
| `id` | `string` | `undefined` | Unique identifier |
| `className` | `string` | `''` | Additional CSS classes |
| `attributes` | `object` | `{}` | Additional HTML attributes |
| `a11y` | `object` | `{}` | Accessibility properties |

### Feature Object Props

Each feature object in the `features` array supports:

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Feature title |
| `description` | `string` | Feature description |
| `icon` | `string` | Icon name (for icon-based features) |
| `image` | `object` | Image properties (for image-based features) |
| `image.src` | `string` | Image URL |
| `image.alt` | `string` | Image alt text |
| `featureList` | `object` | Feature list properties (for detailed features) |
| `featureList.items` | `array` | Array of feature list items |
| `imagePosition` | `'left' \| 'right'` | Image position (for alternating layout) |

---

## Usage Examples

### Basic Icon-Based Grid (3-Column)

```njk
{% from "organisms/feature-grid/feature-grid.njk" import featureGrid %}

{{ featureGrid({
  heading: 'Everything You Need to Succeed',
  description: 'Powerful features to help you build, launch, and grow',
  features: [
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Track your growth with detailed insights and real-time reports.'
    },
    {
      icon: 'shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption keeps your data safe and secure.'
    },
    {
      icon: 'zap',
      title: 'Lightning Fast',
      description: 'Optimized performance for the best user experience.'
    }
  ]
}) }}
```

### Alternating Image/Text Layout

```njk
{{ featureGrid({
  heading: 'See What You Can Do',
  layout: 'alternating',
  features: [
    {
      title: 'Beautiful Dashboards',
      description: 'Visualize your data with customizable charts and graphs.',
      image: {
        src: '/images/dashboard.jpg',
        alt: 'Dashboard interface'
      },
      imagePosition: 'left'
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates.',
      image: {
        src: '/images/collaboration.jpg',
        alt: 'Team collaboration'
      },
      imagePosition: 'right'
    }
  ]
}) }}
```

### 2-Column Card Variant (Services)

```njk
{{ featureGrid({
  heading: 'Our Services',
  columns: 2,
  variant: 'cards',
  features: [
    {
      icon: 'code',
      title: 'Web Development',
      description: 'Custom websites built with modern technologies.'
    },
    {
      icon: 'mobile',
      title: 'Mobile Apps',
      description: 'Native iOS and Android applications.'
    },
    {
      icon: 'megaphone',
      title: 'Digital Marketing',
      description: 'SEO, content, and social media strategies.'
    },
    {
      icon: 'chart',
      title: 'Analytics',
      description: 'Data-driven insights for optimization.'
    }
  ]
}) }}
```

### 4-Column Minimal Grid (Benefits)

```njk
{{ featureGrid({
  heading: 'Why Choose Us',
  columns: 4,
  variant: 'minimal',
  features: [
    { icon: 'check', title: 'Easy Setup', description: 'Get started in minutes' },
    { icon: 'zap', title: 'Fast', description: 'Lightning-speed delivery' },
    { icon: 'shield', title: 'Secure', description: 'Bank-level security' },
    { icon: 'support', title: '24/7 Support', description: 'Always here to help' }
  ]
}) }}
```

### Detailed Features with Feature Lists

```njk
{{ featureGrid({
  heading: 'Platform Capabilities',
  columns: 2,
  variant: 'bordered',
  features: [
    {
      icon: 'users',
      title: 'Team Management',
      description: 'Comprehensive tools for managing your team',
      featureList: {
        items: [
          { text: 'Unlimited team members' },
          { text: 'Role-based permissions' },
          { text: 'Activity tracking' }
        ]
      }
    },
    {
      icon: 'integrations',
      title: 'Integrations',
      description: 'Connect with your favorite tools',
      featureList: {
        items: [
          { text: '100+ integrations' },
          { text: 'API access' },
          { text: 'Webhooks support' }
        ]
      }
    }
  ]
}) }}
```

### How It Works (Step-by-Step)

```njk
{{ featureGrid({
  heading: 'How It Works',
  description: 'Get started in three simple steps',
  layout: 'alternating',
  features: [
    {
      title: '1. Connect Your Tools',
      description: 'Integrate with your existing workflow in minutes.',
      image: { src: '/step1.jpg', alt: 'Connect tools' },
      imagePosition: 'left'
    },
    {
      title: '2. Automate Your Work',
      description: 'Set up automation rules and save hours every week.',
      image: { src: '/step2.jpg', alt: 'Automate workflow' },
      imagePosition: 'right'
    },
    {
      title: '3. Track Your Results',
      description: 'Monitor your progress with detailed analytics.',
      image: { src: '/step3.jpg', alt: 'Track results' },
      imagePosition: 'left'
    }
  ]
}) }}
```

---

## Variants

### Layout Variants

#### Grid Layout (Default)
Responsive CSS Grid with auto-fit columns. Supports 2, 3, or 4 columns with automatic stacking on mobile.

**Use When**:
- Showcasing 3-12 features
- Equal-weight features (no hierarchy)
- Icon-based or image-based features
- Services or benefits lists

#### Alternating Layout
Uses Image+Text molecule for left/right alternating pattern. Each feature spans full width.

**Use When**:
- 2-5 detailed features
- Features need screenshots/visuals
- Step-by-step process explanation
- Feature deep-dives

### Visual Style Variants

#### Default
Clean, minimal styling with spacing and typography only. No borders or backgrounds on items.

**Use When**: Modern, airy design. Features don't need visual separation.

#### Bordered
Subtle borders around each feature item for clear separation.

**Use When**: Multiple features need clear visual boundaries. Professional/corporate aesthetic.

#### Cards
Elevated cards with borders, shadows, and hover effects. Most visually prominent.

**Use When**: Service offerings, product tiers, or portfolio items. Features are distinct entities.

#### Minimal
Ultra-compact styling with reduced spacing and no icon backgrounds.

**Use When**: High-level benefits in tight space. 4+ columns. Above-the-fold constraints.

### Column Variants

- **2 Columns**: Detailed features, service offerings, comparisons
- **3 Columns**: Default for most use cases, balanced layout
- **4 Columns**: High-level benefits, minimal features, compact grids

**Responsive Behavior**:
- Mobile (< 640px): Always 1 column
- Tablet (640-1023px): 2 columns for 3-4 column grids
- Desktop (1024px+): Full column count

---

## Accessibility

### WCAG AA Compliance

- ✅ **Semantic HTML**: `<section>` for main container, proper heading hierarchy (`<h2>` section heading, `<h3>` feature titles)
- ✅ **Color Contrast**: 4.5:1 for text, 3:1 for UI components
- ✅ **Keyboard Navigation**: All interactive features keyboard accessible
- ✅ **Focus States**: Visible focus indicators (outline)
- ✅ **Screen Reader Support**: Proper landmark roles (`role="region"`), decorative icons use `aria-hidden="true"`
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` (disables hover transforms)

### Best Practices

- **Alt Text**: Always provide descriptive alt text for feature images
- **Icon Semantics**: Icons are decorative only (text provides meaning)
- **Heading Levels**: Section heading is `h2`, feature titles are `h3` (maintain hierarchy)
- **ARIA Labels**: Use `ariaLabel` prop for custom section identification

---

## Responsive Behavior

### Breakpoints

- **Mobile (< 640px)**: 1 column, reduced padding, tighter spacing
- **Tablet (640-1023px)**: 2 columns for 3-4 column grids, maintain spacing
- **Desktop (1024px+)**: Full column count, maximum spacing

### Mobile Optimizations

- Reduced vertical spacing (3xl → 2xl between header and features)
- Reduced horizontal padding (lg → md)
- Automatic stacking of alternating layouts
- Smaller gap between grid items (2xl → xl)

### Tablet Optimizations

- 4-column grids force to 2 columns (prevent cramping)
- Maintain full spacing for comfortable reading

---

## Dark Mode

Full dark mode support via semantic color tokens:

- **Icon Backgrounds**: Primary-50 → Primary-900, Primary-600 → Primary-300
- **Card Backgrounds**: Surface → Gray-800
- **Card Borders**: Border → Gray-700
- **Automatic**: Respects `@media (prefers-color-scheme: dark)`

No JavaScript required. All theming via CSS custom properties.

---

## Performance

### Bundle Size
- **CSS**: ~3.5KB gzipped
- **HTML**: Variable (depends on feature count)
- **Total**: ~4KB gzipped (within complex organism budget)

### Optimizations
- **Lazy Loading**: Images use `loading="lazy"` by default
- **Container Queries**: Efficient responsive behavior
- **CSS Grid**: Native browser layout (no JavaScript)
- **Minimal JavaScript**: Zero JavaScript for core functionality

---

## Browser Support

- Chrome 88+ (container queries)
- Firefox 110+ (container queries)
- Safari 16+ (container queries)
- Edge 105+ (container queries)

**Graceful Degradation**: Falls back to standard media queries on older browsers.

---

## Marketing Best Practices

### Feature Prioritization

1. **Analytics-Driven**: Use heatmaps and analytics to identify your most compelling features
2. **Differentiation First**: Lead with features that differentiate you from competitors
3. **Benefit-Focused**: "Save 10 hours/week" not "Automated scheduling"
4. **Progressive Disclosure**: Most important features first (top-left for grids)

### Visual Consistency

- **Icon Style**: Maintain consistent style (outline vs solid, colors)
- **Image Aspect Ratios**: Use consistent ratios for image-based features (16:9 recommended)
- **Card Heights**: Grid items automatically equalize heights
- **Color Palette**: Use brand colors for icon backgrounds

### A/B Testing Opportunities

- **Layout**: Grid vs Alternating (alternating often increases engagement 20-30%)
- **Column Count**: 3 vs 4 columns (3 typically converts better)
- **Visual Style**: Default vs Cards (cards increase feature engagement 15-25%)
- **Feature Order**: Test different feature priorities (can impact conversion 10-20%)

### Common Patterns by Industry

**SaaS**: 3-column icon grid + alternating image sections
**E-commerce**: 4-column minimal benefits + image-based product features
**Agency**: 2-column card services + alternating case studies
**B2B**: 3-column detailed features with feature lists

---

## Component Composition

Feature Grid integrates these molecules/atoms:

- **Image+Text Molecule** (#69): Used in alternating layout for image-based features
- **Feature List Molecule** (#70): Used in detailed features for capability lists
- **Heading Atom** (#60): Section heading and feature titles
- **Text Atom** (#61): Section description and feature descriptions
- **Icon Atom** (#63): Feature icons

---

## Related Components

- **Hero Organism** (#74): Use Feature Grid below hero for immediate value communication
- **Logo Grid Molecule** (#108): Combine with Feature Grid for trust + features pattern
- **Testimonial Carousel** (#80): Follow Feature Grid with social proof
- **CTA Block Molecule** (#68): End feature sections with conversion CTA

---

## Implementation Notes

### CSS Architecture

- **Cascade Layer**: `@layer components`
- **Naming Convention**: Component-scoped flat naming (`.feature-grid`, `.feature-grid-item`)
- **Design Tokens**: All spacing, colors, typography use CSS custom properties
- **Modern CSS**: CSS Grid with `auto-fit`, container queries, logical properties

### Component Design

- **Composable**: Integrates Image+Text and Feature List molecules seamlessly
- **Flexible**: Supports icon, image, and detailed content types
- **Extensible**: Easy to add new variants via CSS classes
- **Maintainable**: Clear structure, comprehensive comments

---

## Changelog

### v1.0.0 (2025-10-30)
- Initial release
- Grid and alternating layouts
- 2/3/4 column support
- Default, bordered, cards, minimal variants
- Icon, image, and detailed feature types
- Full dark mode support
- WCAG AA accessibility
- 14 Storybook stories

---

## Credits

**Design Patterns**: Inspired by Stripe, Notion, Linear, Figma, Vercel
**Marketing Psychology**: CXL Institute, Nielsen Norman Group, Unbounce
**Implementation**: AgentStatic Design System Foundation (Phase 1)
