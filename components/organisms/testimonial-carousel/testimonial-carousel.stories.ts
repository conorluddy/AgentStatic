/**
 * Testimonial Carousel Organism - Storybook Stories
 *
 * Social proof at scale - rotating carousel for multiple customer testimonials.
 * Critical conversion component for landing pages and product pages.
 *
 * Marketing Impact:
 * - 72% of customers won't buy without reviews (BrightLocal)
 * - Auto-play increases testimonial views by 200-300%
 * - Video testimonials build 53% more trust than text (Wyzowl)
 * - Carousels enable showing 10+ testimonials vs. 1-3 static
 *
 * Stories Cover:
 * 1. Default single testimonial carousel
 * 2. Grid layout (2-3 visible)
 * 3. Horizontal scroll
 * 4. Featured (center larger)
 * 5. With auto-play
 * 6. Video testimonials
 * 7. SaaS landing page (real-world)
 * 8. Pricing page testimonials
 * 9. Minimal variant
 * 10. Mobile viewport
 * 11. Dark mode
 */

import type { Meta, StoryObj } from '@storybook/html';
import nunjucks from 'nunjucks';

// Configure Nunjucks
const env = nunjucks.configure('components', {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

// Template function
function renderTestimonialCarousel(args: any): string {
  const template = `
    {% from "organisms/testimonial-carousel/testimonial-carousel.njk" import testimonialCarousel %}
    {{ testimonialCarousel(props) }}
  `;
  return env.renderString(template, { props: args });
}

// Sample testimonial data
const sampleTestimonials = [
  {
    quote: 'We saw a <strong>127% increase in revenue</strong> within 3 months. The ROI was immediate and measurable.',
    rating: 5,
    verified: true,
    author: {
      name: 'Sarah Johnson',
      title: 'CEO',
      company: 'TechStart Inc',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    logo: {
      src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=TechStart',
      alt: 'TechStart Inc',
    },
  },
  {
    quote: 'Saved us <strong>10 hours per week</strong> on manual tasks. The best investment we made this year.',
    rating: 5,
    verified: true,
    author: {
      name: 'John Smith',
      title: 'VP of Marketing',
      company: 'Global Solutions',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    quote: 'Our customer satisfaction jumped from <strong>3.2 to 4.8 stars</strong> in just 6 weeks. Incredible results.',
    rating: 5,
    author: {
      name: 'Emily Chen',
      title: 'Director of Operations',
      company: 'Innovation Labs',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    quote: 'This product changed our business completely. We closed <strong>40% more deals</strong> in Q1.',
    rating: 5,
    verified: true,
    author: {
      name: 'Michael Williams',
      title: 'Head of Sales',
      company: 'Growth Co',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
  },
  {
    quote: 'Outstanding support and incredible features. Our team productivity increased by <strong>35%</strong>.',
    rating: 5,
    author: {
      name: 'Jessica Martinez',
      title: 'Sales Director',
      company: 'Sales Pro Inc',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
  },
];

const videoTestimonials = [
  {
    quote: 'Watch how we helped TechStart grow 3x in 6 months',
    videoThumbnail: 'https://via.placeholder.com/640x360/3b82f6/ffffff?text=Video+Testimonial',
    rating: 5,
    author: {
      name: 'Sarah Johnson',
      title: 'CEO',
      company: 'TechStart Inc',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
  },
  {
    quote: 'See our complete transformation from chaos to clarity',
    videoThumbnail: 'https://via.placeholder.com/640x360/22c55e/ffffff?text=Customer+Story',
    rating: 5,
    author: {
      name: 'John Smith',
      title: 'VP of Marketing',
      company: 'Global Solutions',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    quote: 'Hear directly from our team about the impact',
    videoThumbnail: 'https://via.placeholder.com/640x360/f59e0b/ffffff?text=Team+Interview',
    rating: 5,
    author: {
      name: 'Emily Chen',
      company: 'Innovation Labs',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
];

const meta: Meta = {
  title: 'Organisms/Testimonial Carousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Testimonial Carousel Organism

Social proof at scale - rotating carousel for displaying multiple customer testimonials.

## Marketing Impact

- **72% of customers won't buy without reviews** (BrightLocal)
- **Auto-play increases testimonial views by 200-300%**
- **Video testimonials build 53% more trust** than text alone (Wyzowl)
- **Carousels enable 10+ testimonials** vs. 1-3 static testimonials

## Key Features

- Multiple layout variants (single, grid, scroll, featured, minimal)
- Auto-play with pause on hover
- Navigation controls (arrows, dots)
- Keyboard navigation (arrow keys)
- Touch/swipe support
- Accessibility (ARIA live regions, screen reader support)
- Smooth transitions
- Dark mode support
- Respects prefers-reduced-motion

## When to Use

- **Landing pages**: After hero, before pricing
- **Product pages**: Between feature sections
- **Pricing pages**: Before final CTA (overcome objections)
- **Homepage**: Dedicated social proof section
- **Case study pages**: Related customer testimonials

## Real-World Examples

- Stripe, Shopify, Slack: Auto-rotating testimonials on homepage
- Notion, Figma: Grid layout on testimonial pages
- HubSpot, Salesforce: Featured testimonials in hero sections
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'grid', 'scroll', 'featured', 'minimal'],
      description: 'Layout style variant',
    },
    showArrows: {
      control: 'boolean',
      description: 'Show prev/next navigation arrows',
    },
    showDots: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Story 1: Default Single Testimonial Carousel
 * Classic carousel with one testimonial visible at a time
 */
export const Default: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'What Our Customers Say',
      align: 'center',
    },
    subheading: 'Real results from real customers',
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'single',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default carousel with one testimonial visible at a time. Ideal for landing pages and hero sections.',
      },
    },
  },
};

/**
 * Story 2: Grid Layout (2-3 visible)
 * Show multiple testimonials at once
 */
export const GridLayout: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Trusted by Thousands',
      align: 'center',
    },
    testimonials: sampleTestimonials,
    variant: 'grid',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid layout shows 2-3 testimonials at once (responsive). Perfect for testimonial pages with ample space.',
      },
    },
  },
};

/**
 * Story 3: Horizontal Scroll
 * Mobile-optimized horizontal scrolling
 */
export const HorizontalScroll: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Customer Success Stories',
    },
    testimonials: sampleTestimonials,
    variant: 'scroll',
    showArrows: false,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal scrolling with multiple visible testimonials. Mobile-first design with touch/swipe support.',
      },
    },
  },
};

/**
 * Story 4: Featured Layout
 * Center testimonial larger and emphasized
 */
export const FeaturedLayout: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'featured',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Featured layout with center testimonial larger and side testimonials faded. Great for hero sections with visual impact.',
      },
    },
  },
};

/**
 * Story 5: With Auto-Play
 * Auto-rotating testimonials with pause on hover
 */
export const WithAutoPlay: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'See What Our Customers Are Saying',
      align: 'center',
    },
    testimonials: sampleTestimonials,
    variant: 'single',
    autoplay: {
      enabled: true,
      delay: 5000,
      pauseOnHover: true,
    },
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Auto-play enabled with 5 second delay. Pauses on hover/focus for accessibility. Increases testimonial views by 200-300%.',
      },
    },
  },
};

/**
 * Story 6: Video Testimonials
 * Video testimonials with thumbnails (53% more trust)
 */
export const VideoTestimonials: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'See Why Our Customers Love Us',
      align: 'center',
    },
    subheading: 'Video testimonials from real customers',
    testimonials: videoTestimonials,
    variant: 'single',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Video testimonials with thumbnails and play buttons. Video testimonials build 53% more trust than text alone (Wyzowl).',
      },
    },
  },
};

/**
 * Story 7: SaaS Landing Page (Real-World)
 * Complete landing page testimonial section
 */
export const SaaSLandingPage: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Trusted by 10,000+ Happy Customers',
      align: 'center',
    },
    subheading: 'Join thousands of companies already growing with our platform',
    testimonials: sampleTestimonials,
    variant: 'single',
    autoplay: {
      enabled: true,
      delay: 6000,
      pauseOnHover: true,
    },
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world SaaS landing page testimonial section. Auto-play enabled, specific results highlighted, social proof at scale.',
      },
    },
  },
};

/**
 * Story 8: Pricing Page Testimonials
 * Pre-purchase testimonials to overcome objections
 */
export const PricingPageTestimonials: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: "Don't Just Take Our Word For It",
      align: 'center',
    },
    testimonials: [
      {
        quote: 'The ROI was clear within the first month. <strong>Paid for itself 3x over</strong>.',
        rating: 5,
        verified: true,
        author: {
          name: 'Mike Brown',
          title: 'CFO',
          company: 'Finance Co',
          avatar: 'https://i.pravatar.cc/150?img=14',
        },
      },
      {
        quote: 'Worth every penny. Our team productivity increased by <strong>35%</strong> immediately.',
        rating: 5,
        author: {
          name: 'Lisa Wang',
          title: 'Operations Manager',
          company: 'Logistics Inc',
          avatar: 'https://i.pravatar.cc/150?img=10',
        },
      },
      {
        quote: 'Best value for money. <strong>Saved us $50,000</strong> in the first year alone.',
        rating: 5,
        verified: true,
        author: {
          name: 'Carlos Rivera',
          title: 'Director of IT',
          company: 'Enterprise Corp',
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
      },
    ],
    variant: 'single',
    autoplay: {
      enabled: true,
      delay: 7000,
    },
    showArrows: true,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Testimonials before final CTA on pricing page. Focus on ROI and value to overcome price objections. 20% conversion increase (CXL Institute).',
      },
    },
  },
};

/**
 * Story 9: Minimal Variant
 * Simple, clean design without decorations
 */
export const MinimalVariant: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    testimonials: [
      {
        quote: 'This product changed everything for our team. Highly recommend.',
        author: {
          name: 'Sarah J.',
          company: 'Acme Corp',
        },
      },
      {
        quote: 'Incredible results in the first month. Worth every penny.',
        author: {
          name: 'John S.',
          company: 'TechStart',
        },
      },
      {
        quote: 'Outstanding service and support. Could not be happier.',
        author: {
          name: 'Emily C.',
          company: 'Innovation Labs',
        },
      },
    ],
    variant: 'minimal',
    showArrows: false,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant for minimalist designs. Simple layout, no decorations, centered text. No navigation arrows.',
      },
    },
  },
};

/**
 * Story 10: Mobile Viewport
 * Mobile-optimized view with touch/swipe support
 */
export const MobileViewport: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Customer Reviews',
      align: 'center',
    },
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'single',
    showArrows: false,
    showDots: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile viewport with touch/swipe support. Navigation arrows hidden, dots visible. Optimized for mobile conversion.',
      },
    },
  },
};

/**
 * Story 11: Dark Mode
 * Dark mode with semantic color tokens
 */
export const DarkMode: Story = {
  render: (args) => {
    const html = renderTestimonialCarousel(args);
    return `
      <div data-theme="dark" style="background-color: #111827; min-height: 100vh; padding: 4rem 0;">
        ${html}
      </div>
    `;
  },
  args: {
    heading: {
      text: 'Trusted by Industry Leaders',
      align: 'center',
    },
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'single',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Dark mode support with semantic color tokens. All colors adapt automatically for optimal contrast.',
      },
    },
  },
};

/**
 * Story 12: Grid Layout Dark Mode
 * Grid variant in dark mode
 */
export const GridDarkMode: Story = {
  render: (args) => {
    const html = renderTestimonialCarousel(args);
    return `
      <div data-theme="dark" style="background-color: #111827; min-height: 100vh; padding: 4rem 0;">
        ${html}
      </div>
    `;
  },
  args: {
    heading: {
      text: 'What Our Customers Say',
      align: 'center',
    },
    testimonials: sampleTestimonials,
    variant: 'grid',
    showArrows: true,
    showDots: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Grid layout in dark mode. Card backgrounds adapt to dark surface colors with proper contrast.',
      },
    },
  },
};

/**
 * Story 13: Arrows Only (No Dots)
 * Navigation with arrows only
 */
export const ArrowsOnly: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Customer Success Stories',
    },
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'single',
    showArrows: true,
    showDots: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with arrows only, no dot indicators. Cleaner design for minimal distraction.',
      },
    },
  },
};

/**
 * Story 14: Dots Only (No Arrows)
 * Navigation with dots only
 */
export const DotsOnly: Story = {
  render: (args) => renderTestimonialCarousel(args),
  args: {
    heading: {
      text: 'Customer Reviews',
    },
    testimonials: sampleTestimonials.slice(0, 3),
    variant: 'single',
    showArrows: false,
    showDots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with dots only, no arrow buttons. Mobile-friendly design, ideal for touch devices.',
      },
    },
  },
};
