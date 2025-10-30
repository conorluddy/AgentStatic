# Footer Organism

Site-wide footer organism with multi-column navigation, newsletter signup, social links, legal compliance, and trust signals.

## Overview

The Footer is a comprehensive site-wide footer component designed for brochureware marketing sites. It combines multiple navigation columns, newsletter email capture, social media links, legal compliance links, trust badges, and copyright information into a single, conversion-optimized organism.

**Category**: Organism
**Composed Of**: Link atom, Form Group molecule
**Version**: 1.0.0

## Marketing Context

### Why This Footer Matters

The footer is often overlooked, but it plays a critical role in conversion optimization and trust building:

#### 1. Newsletter Email Capture (Owned Audience)
- **Newsletter signup in footer = email list building**
- Email lists are "owned audience" (not reliant on social media algorithms)
- 60%+ of SaaS landing pages have email capture above-the-fold or in footer
- Footer newsletter captures high-intent visitors who scrolled entire page

**Real-World Impact**:
- Email marketing ROI: $42 for every $1 spent (DMA, 2019)
- Email subscribers 3x more likely to share content (OptinMonster)
- Owned audience survives algorithm changes and platform shutdowns

#### 2. Trust Signals & Social Proof
- **Trust badges increase conversion by 42% for unknown brands** (Nielsen Norman Group)
- Security badges (SSL, PCI), payment icons, money-back guarantee
- Customer count, follower counts, certifications, awards
- "Trusted by 10,000+ companies" social proof

**Trust Badge Examples**:
- Security: SSL certificate, secure payment, verified business
- Shipping: Free shipping, fast delivery, worldwide shipping
- Guarantees: Money-back guarantee, satisfaction guaranteed
- Payments: Visa, Mastercard, PayPal, Apple Pay

#### 3. Legal Compliance (GDPR/CCPA)
- **70% of B2B buyers check legal pages before contacting sales** (Demand Gen Report)
- Privacy policy, terms of service, cookie policy are required for compliance
- Clear legal links reduce bounce rate by 20% for privacy-conscious visitors (CXL Institute)
- GDPR/CCPA compliance builds trust with European/California customers

#### 4. Social Media & Community
- **80%+ of B2B buyers check social presence before purchase** (LinkedIn)
- Social links provide instant credibility and proof of active community
- Follower counts serve as social proof ("Join 50K+ followers")
- Platform diversity shows broad reach (Twitter, LinkedIn, GitHub, etc.)

#### 5. Navigation & Discoverability
- **Footer navigation improves site SEO** (internal linking structure)
- 40%+ of site visitors scroll to footer looking for specific links
- "About", "Careers", "Contact" links reduce support burden
- Product categories improve discoverability

### Real-World Footer Patterns

**Stripe** (SaaS Payments):
- 5-column footer: Products, Developers, Company, Support, Resources
- Newsletter signup with "Join our newsletter" CTA
- Trust badges: PCI compliant, SOC 2 certified
- Social links + Legal links (Privacy, Terms, Cookies)

**Notion** (SaaS Productivity):
- 4-column footer: Product, Download, Build, Resources
- Social links (Twitter, LinkedIn, Facebook, YouTube)
- Legal compliance (Privacy, Terms, California Privacy, Security)
- "We're hiring" call-out in footer

**Shopify** (E-commerce Platform):
- 6-column footer: Online store, POS, Marketing, Developers, Shopify, Support
- Newsletter signup: "Get Shopify news and updates"
- Trust badges: 24/7 support, free trial
- Social links + Language/region selector

**Linear** (Project Management):
- Minimal 3-column footer: Product, Company, Resources
- Clean design emphasizing simplicity
- Social links (Twitter, Discord, GitHub)
- Legal links + Status page

**Vercel** (Deployment Platform):
- 4-column footer: Product, Resources, Company, Legal
- Newsletter signup with "Subscribe to our newsletter"
- Social links (Twitter, GitHub, Discord)
- Dark theme by default (developer-focused)

## Props API

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Visual style: `'default'`, `'dark'`, `'minimal'`, `'centered'` |
| `layout` | `string` | `'default'` | Layout pattern: `'default'` (4-col), `'minimal'` (2-col), `'centered'` (1-col) |
| `withDivider` | `boolean` | `false` | Add divider line above bottom section |
| `id` | `string` | - | Unique identifier |
| `className` | `string` | - | Additional CSS classes |

### Brand Section

| Prop | Type | Description |
|------|------|-------------|
| `brand.logo.src` | `string` | Logo image path |
| `brand.logo.alt` | `string` | Logo alt text (required for a11y) |
| `brand.logo.href` | `string` | Logo link URL (default: `'/'`) |
| `brand.tagline` | `string` | Brand tagline/description |

### Navigation Columns

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `array` | Array of navigation column objects |
| `columns[].title` | `string` | Column heading |
| `columns[].links` | `array` | Array of link objects |
| `columns[].links[].text` | `string` | Link text |
| `columns[].links[].href` | `string` | Link URL |
| `columns[].links[].external` | `boolean` | Opens in new tab if true |

### Social Links

| Prop | Type | Description |
|------|------|-------------|
| `social` | `array` | Array of social link objects |
| `social[].platform` | `string` | Platform name (for aria-label) |
| `social[].href` | `string` | Social profile URL |
| `social[].icon` | `string` | SVG icon HTML |

### Newsletter Section

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `newsletter.enabled` | `boolean` | `false` | Show newsletter section |
| `newsletter.title` | `string` | `'Stay Updated'` | Section heading |
| `newsletter.description` | `string` | - | Value proposition text |
| `newsletter.inputId` | `string` | - | Unique ID for email input (required) |
| `newsletter.buttonText` | `string` | `'Subscribe'` | Submit button text |
| `newsletter.trustText` | `string` | - | Trust message (e.g., "No spam") |

### Legal & Trust

| Prop | Type | Description |
|------|------|-------------|
| `legal` | `array` | Array of legal link objects |
| `legal[].text` | `string` | Link text |
| `legal[].href` | `string` | Link URL |
| `copyright` | `string` | Copyright text (supports HTML) |
| `badges` | `array` | Trust badges array |
| `badges[].text` | `string` | Badge text |
| `badges[].icon` | `string` | SVG icon HTML |

## Variants

### Visual Variants

#### Default
Light background (gray-50) with dark text. Standard for most sites.

```njk
{{ footer({ variant: 'default' }) }}
```

#### Dark
Dark background (gray-900) with light text. High contrast, modern look.

```njk
{{ footer({ variant: 'dark' }) }}
```

#### Minimal
Simplified layout with reduced spacing. For minimalist designs.

```njk
{{ footer({ variant: 'minimal' }) }}
```

#### Centered
Center-aligned layout. For single-column footers or community-focused sites.

```njk
{{ footer({ variant: 'centered' }) }}
```

### Layout Patterns

#### Default (4-column desktop)
Brand section + 3 navigation columns, responsive to 2-col tablet, 1-col mobile.

```njk
{{ footer({ layout: 'default' }) }}
```

#### Minimal (2-column desktop)
Brand section + 1 navigation column, responsive to 1-col mobile.

```njk
{{ footer({ layout: 'minimal' }) }}
```

#### Centered (1-column)
All content center-aligned in single column.

```njk
{{ footer({ layout: 'centered' }) }}
```

## Usage Examples

### Basic Footer

```njk
{% from "organisms/footer/footer.njk" import footer %}

{{ footer({
  brand: {
    logo: { src: '/logo.svg', alt: 'Company' },
    tagline: 'Building better products.'
  },
  columns: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' }
      ]
    }
  ],
  social: [
    { platform: 'Twitter', href: 'https://twitter.com/company', icon: '<svg>...</svg>' }
  ],
  legal: [
    { text: 'Privacy', href: '/privacy' },
    { text: 'Terms', href: '/terms' }
  ],
  copyright: '© 2024 Company. All rights reserved.'
}) }}
```

### SaaS Footer with Newsletter

```njk
{{ footer({
  variant: 'dark',
  brand: {
    logo: { src: '/logo.svg', alt: 'ProductName' },
    tagline: 'Build better products, faster.'
  },
  columns: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Integrations', href: '/integrations' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'API Reference', href: '/api' },
        { text: 'Support', href: '/support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Blog', href: '/blog' },
        { text: 'Careers', href: '/careers' }
      ]
    }
  ],
  newsletter: {
    enabled: true,
    title: 'Stay Updated',
    description: 'Get product updates and weekly insights.',
    inputId: 'footer-email',
    trustText: 'No spam. Unsubscribe anytime.'
  },
  social: [
    { platform: 'Twitter', href: 'https://twitter.com/product', icon: '<svg>...</svg>' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/product', icon: '<svg>...</svg>' },
    { platform: 'GitHub', href: 'https://github.com/product', icon: '<svg>...</svg>' }
  ],
  legal: [
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Cookie Policy', href: '/cookies' }
  ],
  copyright: '© 2024 ProductName. All rights reserved.'
}) }}
```

### E-commerce Footer with Trust Badges

```njk
{{ footer({
  brand: {
    logo: { src: '/logo.svg', alt: 'Store' }
  },
  columns: [
    {
      title: 'Shop',
      links: [
        { text: 'New Arrivals', href: '/shop/new' },
        { text: 'Best Sellers', href: '/shop/bestsellers' },
        { text: 'Sale', href: '/shop/sale' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Contact', href: '/contact' },
        { text: 'Shipping', href: '/shipping' },
        { text: 'Returns', href: '/returns' }
      ]
    }
  ],
  newsletter: {
    enabled: true,
    title: 'Get 10% Off',
    description: 'Subscribe for exclusive deals.',
    inputId: 'store-email',
    trustText: 'First order discount.'
  },
  badges: [
    { text: 'Secure Payment', icon: '<svg>...</svg>' },
    { text: 'Free Shipping', icon: '<svg>...</svg>' },
    { text: 'Money Back', icon: '<svg>...</svg>' }
  ],
  copyright: '© 2024 Store. All rights reserved.'
}) }}
```

### Minimal Agency Footer

```njk
{{ footer({
  layout: 'minimal',
  brand: {
    logo: { src: '/logo.svg', alt: 'Studio' },
    tagline: 'Creative digital experiences.'
  },
  columns: [
    {
      title: 'Contact',
      links: [
        { text: 'hello@studio.com', href: 'mailto:hello@studio.com' },
        { text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { text: 'San Francisco, CA', href: '/contact' }
      ]
    }
  ],
  social: [
    { platform: 'Instagram', href: 'https://instagram.com/studio', icon: '<svg>...</svg>' },
    { platform: 'Twitter', href: 'https://twitter.com/studio', icon: '<svg>...</svg>' }
  ],
  copyright: '© 2024 Studio.'
}) }}
```

## Accessibility

### WCAG AA Compliance

- **Semantic HTML**: Uses `<footer role="contentinfo">` landmark
- **Navigation sections**: Each column uses `<nav>` with `aria-labelledby`
- **Keyboard navigation**: All links and form inputs are keyboard accessible
- **Focus states**: Visible focus outlines on all interactive elements
- **Color contrast**: 4.5:1 minimum for all text (AA compliant)
- **Screen readers**: Proper ARIA labels and landmark roles

### Keyboard Navigation

- **Tab**: Navigate through all links and form inputs
- **Enter/Space**: Activate links and buttons
- **Shift+Tab**: Navigate backwards

### Screen Reader Support

- Footer identified as `contentinfo` landmark
- Navigation sections properly labeled
- Social links include platform names in `aria-label`
- Newsletter form includes accessible labels
- External links announced as "opens in new window"

## Responsive Behavior

### Mobile (< 768px)
- 1-column stacked layout
- Full-width sections
- Social links wrap horizontally
- Legal links wrap vertically, then horizontally
- Reduced padding (xl/md instead of 3xl/lg)

### Tablet (768px - 1023px)
- 2-column grid
- Brand section spans full width
- Newsletter section spans full width
- Bottom section switches to row layout

### Desktop (1024px+)
- 4-column grid (brand + 3 nav columns)
- All sections in their respective columns
- Optimal spacing and readability
- Bottom section fully horizontal

### Large Desktop (1440px+)
- Increased padding (4xl/2xl)
- Increased gaps between columns
- Maximum readability and whitespace

## Performance

### Bundle Size
- **CSS**: ~3KB gzipped
- **Template**: Minimal overhead (pure HTML)
- **No JavaScript**: Static rendering only

### Optimization
- Lazy loading for logo images
- SVG icons (scalable, cacheable)
- No external dependencies
- Pure CSS hover/focus states

## Marketing Best Practices

### Newsletter Signup Optimization

**Headline Options**:
- "Stay Updated" (default, neutral)
- "Join 10,000+ Subscribers" (social proof)
- "Get 10% Off" (incentive-based for e-commerce)
- "Weekly Insights" (value proposition)

**Trust Text Examples**:
- "No spam. Unsubscribe anytime."
- "Join 10,000+ happy subscribers."
- "One email per week. No spam."
- "Exclusive content. Unsubscribe with one click."

### Trust Badge Placement

**E-commerce**:
- Secure Payment, Free Shipping, Money Back Guarantee
- Payment icons (Visa, Mastercard, PayPal, Apple Pay)
- Security badges (SSL, PCI compliant, verified)

**SaaS**:
- SOC 2 certified, GDPR compliant, ISO 27001
- Uptime guarantee (99.9% uptime)
- Enterprise-grade security

**Agency/Services**:
- Certified partner (Google, HubSpot, Shopify)
- Awards and recognitions
- Client testimonials count

### Social Proof Patterns

**Follower Counts**:
- "Follow us on Twitter (50K+ followers)"
- "Join 10,000+ on LinkedIn"
- "Watch our YouTube (100K+ subscribers)"

**Community Size**:
- "Join 10,000+ developers"
- "Trusted by 50,000+ companies"
- "500+ 5-star reviews"

## Related Components

- **Link Atom**: Used for all footer links
- **Form Group Molecule**: Used for newsletter email input
- **Button Atom**: Used for newsletter submit (future enhancement)
- **Icon Atom**: Can be used for social media icons

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All modern browsers with CSS Grid and Custom Properties support.

## Version History

### 1.0.0 (Current)
- Initial release
- 4 visual variants (default, dark, minimal, centered)
- 3 layout patterns (default, minimal, centered)
- Newsletter signup integration
- Trust badges support
- Fully responsive (mobile, tablet, desktop)
- WCAG AA compliant
- Dark mode support

## Contributing

When enhancing this component, ensure:
- WCAG AA compliance maintained
- Responsive behavior tested across all breakpoints
- Bundle size remains < 4KB gzipped
- Marketing best practices preserved
- Real-world patterns validated against Stripe, Notion, Shopify

## License

MIT License - Part of AgentStatic Design System
