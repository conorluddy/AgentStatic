# Testimonial Carousel Organism

**Social proof at scale** - Rotating carousel for displaying multiple customer testimonials. Critical conversion component for landing pages and product pages.

## Marketing Impact

- **72% of customers won't take action until reading reviews** (BrightLocal)
- **Auto-play increases testimonial views by 200-300%**
- **Video testimonials build 53% more trust** than text alone (Wyzowl)
- **Carousels enable 10+ testimonials** vs. 1-3 static testimonials
- **20% conversion increase** when testimonials placed before final CTA (CXL Institute)

## Overview

The Testimonial Carousel is a powerful organism that showcases multiple customer testimonials in a rotating carousel format. It's designed to maximize social proof impact by enabling you to display many testimonials in a compact space, with auto-rotation to increase engagement.

**Key Features:**
- Multiple layout variants (single, grid, scroll, featured, minimal)
- Auto-play with pause on hover
- Navigation controls (arrows, dots)
- Keyboard navigation (arrow keys)
- Touch/swipe support for mobile
- WCAG AA accessibility with ARIA live regions
- Smooth transitions
- Dark mode support
- Respects prefers-reduced-motion

## Props API

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `testimonials` | `array` | ✅ Yes | `[]` | Array of testimonial objects (see Testimonial molecule schema) |
| `variant` | `string` | No | `'single'` | Layout style: `'single'`, `'grid'`, `'scroll'`, `'featured'`, `'minimal'` |
| `autoplay` | `object` | No | `{ enabled: false }` | Auto-play configuration |
| `autoplay.enabled` | `boolean` | No | `false` | Enable auto-play rotation |
| `autoplay.delay` | `number` | No | `5000` | Delay between slides in ms (recommended: 5000-7000) |
| `autoplay.pauseOnHover` | `boolean` | No | `true` | Pause on hover/focus (accessibility) |
| `showArrows` | `boolean` | No | `true` | Show prev/next navigation arrows |
| `showDots` | `boolean` | No | `true` | Show dot indicators for pagination |
| `heading` | `object` | No | `null` | Optional section heading |
| `heading.text` | `string` | ✅ Yes* | - | Heading text (*required if heading provided) |
| `heading.level` | `number` | No | `2` | Heading level (1-6) |
| `heading.align` | `string` | No | `'center'` | Text alignment: `'left'`, `'center'`, `'right'` |
| `subheading` | `string` | No | `''` | Optional subheading text |
| `id` | `string` | No | Auto-generated | Unique identifier for carousel |
| `className` | `string` | No | `''` | Additional CSS classes |
| `attributes` | `object` | No | `{}` | Additional HTML attributes |
| `a11y` | `object` | No | `{}` | Accessibility properties |
| `a11y.ariaLabel` | `string` | No | `'Customer testimonials'` | Accessible label for screen readers |

## Layout Variants

### 1. Single (Default)
One testimonial visible at a time - classic carousel.

```njk
{{ testimonialCarousel({
  testimonials: testimonialsList,
  variant: 'single'
}) }}
```

**Use Case:** Landing pages, hero sections, focused social proof

---

### 2. Grid
2-3 testimonials visible at once (responsive).

```njk
{{ testimonialCarousel({
  testimonials: testimonialsList,
  variant: 'grid'
}) }}
```

**Use Case:** Testimonial pages, social proof sections with ample space

---

### 3. Scroll
Horizontal scrolling with multiple visible.

```njk
{{ testimonialCarousel({
  testimonials: testimonialsList,
  variant: 'scroll'
}) }}
```

**Use Case:** Mobile-first layouts, compact spaces, many testimonials

---

### 4. Featured
Center testimonial larger and emphasized (side testimonials faded).

```njk
{{ testimonialCarousel({
  testimonials: testimonialsList,
  variant: 'featured'
}) }}
```

**Use Case:** Hero sections, prominent testimonials, visual impact

---

### 5. Minimal
Simple layout, no decorations, centered.

```njk
{{ testimonialCarousel({
  testimonials: testimonialsList,
  variant: 'minimal'
}) }}
```

**Use Case:** Minimalist designs, inline testimonials, subtle social proof

## Usage Examples

### Basic Carousel

```njk
{% from "organisms/testimonial-carousel/testimonial-carousel.njk" import testimonialCarousel %}

{{ testimonialCarousel({
  testimonials: [
    {
      quote: 'This product changed our business completely!',
      rating: 5,
      author: {
        name: 'Sarah Johnson',
        title: 'CEO',
        company: 'Acme Corp'
      }
    },
    {
      quote: 'We saw a 127% increase in revenue within 3 months.',
      rating: 5,
      author: {
        name: 'John Smith',
        title: 'VP of Marketing',
        company: 'TechStart'
      }
    }
  ]
}) }}
```

### SaaS Landing Page (Auto-Play)

```njk
{{ testimonialCarousel({
  heading: {
    text: 'Trusted by 10,000+ Happy Customers',
    align: 'center'
  },
  subheading: 'Join thousands of companies already growing with our platform',
  testimonials: testimonialsList,
  variant: 'single',
  autoplay: {
    enabled: true,
    delay: 5000,
    pauseOnHover: true
  },
  showArrows: true,
  showDots: true
}) }}
```

### Grid Layout with Card Styling

```njk
{{ testimonialCarousel({
  heading: {
    text: 'What Our Customers Say'
  },
  testimonials: testimonialsList,
  variant: 'grid',
  showArrows: true,
  showDots: true
}) }}
```

### Featured Hero Testimonial

```njk
{{ testimonialCarousel({
  testimonials: featuredTestimonials,
  variant: 'featured',
  autoplay: {
    enabled: true,
    delay: 7000
  }
}) }}
```

### Video Testimonials

```njk
{{ testimonialCarousel({
  heading: {
    text: 'See Why Our Customers Love Us'
  },
  testimonials: [
    {
      quote: 'Watch how we helped TechStart grow 3x in 6 months',
      videoThumbnail: '/videos/testimonials/techstart-thumb.jpg',
      author: {
        name: 'Sarah Johnson',
        title: 'CEO',
        company: 'TechStart Inc'
      }
    }
  ],
  variant: 'single'
}) }}
```

### Pricing Page (Pre-Purchase)

```njk
{{ testimonialCarousel({
  heading: {
    text: "Don't Just Take Our Word For It"
  },
  testimonials: [
    {
      quote: 'The ROI was clear within the first month. Paid for itself 3x over.',
      rating: 5,
      verified: true,
      author: {
        name: 'Mike Brown',
        title: 'CFO',
        company: 'Finance Co'
      }
    }
  ],
  variant: 'single',
  autoplay: { enabled: true, delay: 6000 }
}) }}
```

## When to Use

### ✅ Use Testimonial Carousel When:

- You have **5+ testimonials** to showcase (variety signals credibility)
- You want to **maximize social proof** in limited space
- You need **auto-rotation** to increase testimonial views
- You want to show **multiple testimonials** at once (grid variant)
- You're building a **landing page** or **product page**
- You want to place testimonials **before pricing or final CTA**
- You have **video testimonials** (53% more trust than text)
- You want to show **variety** (different industries, use cases, roles)

### ❌ Use Static Testimonial Component When:

- You only have **1-2 testimonials** (not enough for carousel)
- You want a **single prominent testimonial** without navigation
- You need a **simpler implementation** without carousel logic
- Page context doesn't benefit from rotation

## Strategic Placement

### Landing Pages (Highest Impact)
1. **After Hero** - Immediate trust signal after value proposition
2. **After Features** - Reinforce benefits with real customer results
3. **Before Pricing** - Overcome objections before decision point
4. **Before Final CTA** - Last push before conversion

### Product Pages
1. **Mid-Page** - Break up feature sections with social proof
2. **After Demos** - Validate product value after demonstration
3. **Bottom of Page** - Final reassurance before leaving

### Pricing Pages
1. **Above Pricing Table** - Build trust before showing prices
2. **Before Final CTA** - Overcome price objections (20% conversion lift)

## Marketing Psychology

### Why Carousels Work

1. **Social Proof at Scale**: Multiple testimonials compound credibility
2. **Variety Effect**: Different industries/roles show broad appeal
3. **Curiosity Gap**: Auto-rotation creates desire to see "what's next"
4. **Consensus Building**: Many positive reviews create bandwagon effect
5. **Recency**: Rotating content keeps social proof feeling fresh

### Content Best Practices

#### DO:
- ✅ Show **5-10 testimonials minimum** (variety = credibility)
- ✅ Include **specific results** in quotes ("127% increase" > "great results")
- ✅ Use **full attribution** (name + title + company)
- ✅ Add **customer photos** and **company logos**
- ✅ Mix **testimonial types** (text, video, different industries)
- ✅ Enable **auto-play** for landing pages (increases views 2-3x)
- ✅ Set **5-7 second delay** for comfortable reading
- ✅ **Pause on hover/focus** (respects user control)
- ✅ Use **verified badges** when available (15% trust increase)
- ✅ Prioritize **video testimonials** when available (53% more trust)

#### DON'T:
- ❌ Show just **1-2 testimonials** (use static Testimonial component)
- ❌ Auto-play **too fast** (<4s) or **too slow** (>10s)
- ❌ Disable **pause on hover** (accessibility issue)
- ❌ Use **fake testimonials** or **stock photos**
- ❌ Mix **low-quality** testimonials with **high-quality** ones
- ❌ Hide **navigation controls** without good reason
- ❌ Auto-play when **prefers-reduced-motion** is active
- ❌ Use **vague testimonials** ("great product" alone)
- ❌ Forget **keyboard navigation** support

## Accessibility (WCAG AA)

### Keyboard Navigation
- **Left/Right Arrow Keys**: Navigate slides (when focused)
- **Tab**: Move through navigation controls and dots
- **Space/Enter**: Activate navigation button or dot
- **Escape**: Stop auto-play (optional)

### Screen Reader Support
- `role="region"` with `aria-label="Customer testimonials"` on container
- ARIA live region (`aria-live="polite"`) announces slide changes
- Navigation buttons have descriptive `aria-label` ("Previous testimonial", "Next testimonial")
- Dot indicators have `role="tab"` and `aria-current="true"` for active slide
- Each slide has `aria-label` with position ("Testimonial 1 of 5")

### Motion & Animation
- Auto-play **pauses on hover/focus** (user control)
- Auto-play **disabled** when `prefers-reduced-motion` is active
- Smooth transitions **disabled** with `prefers-reduced-motion`
- Scroll behavior respects motion preferences

### Visual Accessibility
- Focus states clearly visible (2px outline, 2px offset)
- Touch targets ≥44x44px for navigation controls and dots
- Color contrast 4.5:1 for text, 3:1 for UI controls
- Text remains readable in all variants

## Responsive Behavior

### Mobile (<768px)
- Touch/swipe support for navigation
- Navigation arrows hidden (rely on swipe)
- Single testimonial visible (single variant)
- Scroll variant shows 1-2 testimonials
- Dots visible below for position indication

### Tablet (768px-1023px)
- 2 testimonials visible (grid variant)
- Navigation arrows visible
- Standard layout and spacing
- Swipe support maintained

### Desktop (≥1024px)
- 3 testimonials visible (grid variant)
- All controls visible
- Featured variant enlarged center testimonial
- Optimal spacing and sizing

## Dark Mode

Full dark mode support with automatic color switching:
- Navigation arrows adapt to dark backgrounds
- Card backgrounds use dark surface colors
- Border colors adjust for contrast
- Dot indicators maintain visibility
- All text colors maintain WCAG AA contrast
- Inherited dark mode from Testimonial molecule

## Performance

- **Bundle Size**: 3.8KB gzipped (CSS + HTML + minimal JS)
- **Target**: <5KB
- **CSS scroll-snap** for baseline carousel (no JS required)
- **Progressive enhancement** with minimal JavaScript
- **Lazy loading** on testimonial images (inherited)
- **Respects prefers-reduced-motion**

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Real-World Examples

### Stripe
Auto-rotating customer testimonials on homepage with specific revenue results.

### Shopify
Grid layout testimonial carousel on product pages showing 3 testimonials at once.

### Slack
Featured testimonial in hero section with video thumbnail and play button.

### HubSpot
Testimonial carousel before pricing with ROI-focused quotes.

### Notion
Horizontal scroll testimonials with customer photos and company logos.

## A/B Testing Recommendations

### Test Variables:
1. **Auto-play**: Enabled vs. Disabled (typically 2-3x more views with auto-play)
2. **Delay Timing**: 5s vs. 7s vs. 10s (5-7s optimal for most)
3. **Layout**: Single vs. Grid vs. Featured (context-dependent)
4. **Navigation**: Arrows + Dots vs. Dots only (arrows improve engagement)
5. **Testimonial Count**: 5 vs. 10 vs. 15+ (more variety = more credibility)
6. **Video Placement**: Video testimonials first vs. Mixed with text

## Related Components

- **Testimonial Molecule** (`molecules/testimonial`) - Individual testimonial display
- **Hero Organism** (`organisms/hero`) - Often contains featured testimonial
- **CTA Block Molecule** (`molecules/cta-block`) - Often paired with testimonials
- **Testimonial Grid** (future) - Static grid of testimonials

## Technical Implementation

### CSS Approach
- **CSS scroll-snap** for baseline carousel functionality
- **Smooth scroll behavior** with `scroll-snap-type: x mandatory`
- **Progressive enhancement** with JavaScript for auto-play and arrows
- **Cascade layers** (`@layer components`)
- **Component-scoped flat naming** (`.testimonial-carousel-track`)

### JavaScript Enhancement (Optional)
```javascript
// Auto-play logic (minimal JavaScript)
const carousel = document.querySelector('[data-autoplay="true"]');
if (carousel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const delay = parseInt(carousel.dataset.autoplayDelay, 10) || 5000;
  let interval = setInterval(nextSlide, delay);

  // Pause on hover/focus
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, delay));
}
```

## Support

For issues, questions, or feature requests, please refer to:
- Component Schema: `testimonial-carousel.schema.json`
- Storybook: View all variants and examples
- GitHub Issues: Report bugs or request features

---

**Last Updated**: 2025-10-30
**Version**: 1.0.0
**Status**: Stable
