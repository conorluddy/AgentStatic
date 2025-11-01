/**
 * Hero Organism - Storybook Stories
 *
 * THE MOST IMPORTANT COMPONENT - First impression determines 70% of conversion.
 *
 * This file showcases all variants of the Hero component including:
 * - Layout variants (centered, split, split-reverse, full-width)
 * - Background variants (default, image, gradient, video)
 * - Feature variants (email capture, social proof, trust signals)
 * - Real-world examples (SaaS, Agency, E-commerce)
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

const renderComponent = (args: any) => {
  return renderNunjucksTemplate(
    `
    {% from "organisms/hero/hero.njk" import hero %}
    {{ hero(props) }}
  `,
    { props: args }
  );
};

const meta: Meta = {
  title: 'Organisms/Hero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Hero Organism

**THE MOST IMPORTANT COMPONENT FOR CONVERSION**

Full-width hero section for landing pages with multiple layout variants, email capture,
social proof, and trust signals. This is the first component users see - quality here
determines 70% of whether visitors stay or leave.

## Marketing Context

- **5-second rule**: Users decide to stay or leave within 5 seconds
- **Email capture = #1 goal**: Owned audience is 3x more valuable than social followers
- **Social proof above fold**: 42% trust increase (Nielsen Norman Group)
- **Benefit-focused headlines**: 90% better conversion than feature-focused

## Features

- Multiple layout variants (centered, split, split-reverse, full-width)
- Background options (default, image, video, gradient)
- Email capture forms with privacy text
- Social proof (Logo Grid integration)
- Trust signals (customer count, ratings, awards)
- Full responsive design (mobile-first)
- WCAG AA accessibility compliant
- Dark mode support
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['centered', 'split', 'split-reverse', 'full-width'],
      description: 'Layout style',
    },
    height: {
      control: 'select',
      options: ['full', 'tall', 'medium', 'compact', 'minimal'],
      description: 'Height variant',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default Hero - Centered Layout
 *
 * Basic centered hero with headline, subheading, and dual CTAs.
 * Best for: Product announcements, simple landing pages
 */
export const Default: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      headline: 'Build Better Websites Faster',
      subheading: 'The AI-first static site generator for modern teams',
      description: 'Ship production-ready landing pages in minutes with our component library.',
      cta: {
        primary: { text: 'Get Started Free', href: '/signup' },
        secondary: { text: 'View Components', href: '/components', variant: 'ghost' },
      },
    }),
};

/**
 * Split Layout - Text Left, Image Right
 *
 * Classic F-pattern layout with product screenshot on the right.
 * Best for: SaaS products, software demos, feature showcases
 */
export const SplitLayout: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'split',
      headline: 'Transform Your Workflow',
      subheading: 'See how our platform saves you 10 hours every week',
      description: 'Automate repetitive tasks and focus on what matters most.',
      cta: {
        primary: { text: 'Watch Demo', href: '/demo' },
        secondary: { text: 'Learn More', href: '/features', variant: 'ghost' },
      },
      media: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
        alt: 'Team collaborating on laptop',
      },
    }),
};

/**
 * Split Reverse - Image Left, Text Right
 *
 * Reverse F-pattern for visual variety on multi-section pages.
 * Best for: Portfolio sites, creative agencies, visual-first products
 */
export const SplitReverse: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'split-reverse',
      headline: 'Design That Converts',
      subheading: 'Award-winning agency specializing in brochureware sites',
      description: 'We craft digital experiences that drive results.',
      cta: {
        primary: { text: 'View Portfolio', href: '/portfolio' },
      },
      media: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
        alt: 'Design mockups on desk',
      },
    }),
};

/**
 * Email Capture Hero - Lead Generation Focus
 *
 * Optimized for email list building - removes friction with single input.
 * Best for: SaaS trials, waitlists, course signups, newsletter subscriptions
 *
 * Marketing Impact:
 * - Email subscribers are 3x more valuable than social followers
 * - Single-field forms convert 25% better than multi-field
 */
export const EmailCapture: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      eyebrow: 'Join the Beta',
      headline: 'Ship Landing Pages in Minutes',
      subheading: 'AI-powered components built for conversion',
      emailCapture: {
        enabled: true,
        placeholder: 'your@email.com',
        buttonText: 'Start Free Trial',
        privacyText: 'No credit card required. Cancel anytime.',
      },
      trustSignals: [
        { value: '10,000+', text: 'Developers using AgentStatic' },
        { value: '4.9/5', text: 'Average customer rating' },
      ],
    }),
};

/**
 * Social Proof Hero - Trust Signal Heavy
 *
 * Maximum social proof for unknown brands - logos + stats above fold.
 * Best for: New products, B2B SaaS, enterprise software
 *
 * Marketing Impact:
 * - Logo walls increase trust by 42% (Nielsen Norman)
 * - 23% increase in signups when logos present (Unbounce)
 */
export const SocialProof: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      headline: 'The Most Trusted Platform',
      subheading: 'Join the companies already transforming their business',
      cta: {
        primary: { text: 'Start Free Trial', href: '/signup' },
      },
      socialProof: {
        enabled: true,
        title: 'Trusted by industry leaders',
        logos: [
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Company+1',
            alt: 'Company 1',
          },
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Company+2',
            alt: 'Company 2',
          },
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Company+3',
            alt: 'Company 3',
          },
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Company+4',
            alt: 'Company 4',
          },
        ],
      },
      trustSignals: [
        { value: '10,000+', text: 'Companies' },
        { value: '4.9/5', text: 'G2 rating' },
        { value: 'SOC 2', text: 'Compliant' },
      ],
    }),
};

/**
 * Background Image Hero
 *
 * Full-width hero with background image and dark overlay for text readability.
 * Best for: Lifestyle brands, travel, hospitality, creative agencies
 */
export const BackgroundImage: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      background: {
        type: 'image',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
        overlay: 'dark',
        alt: 'Modern office space',
      },
      headline: 'Build the Future of Your Business',
      subheading: 'Join 10,000+ companies transforming their digital presence',
      cta: {
        primary: { text: 'Start Free Trial', href: '/signup' },
        secondary: { text: 'Learn More', href: '/about', variant: 'ghost' },
      },
      trustSignals: [
        { value: '10,000+', text: 'Happy customers' },
        { value: '4.9/5', text: 'Average rating' },
      ],
    }),
};

/**
 * Gradient Background Hero
 *
 * Bold gradient background for high visual impact.
 * Best for: Product launches, special promotions, modern SaaS products
 */
export const GradientBackground: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      background: { type: 'gradient' },
      eyebrow: 'Limited Time Offer',
      headline: 'Get 50% Off All Plans',
      subheading: 'Premium features at unbeatable prices',
      cta: {
        primary: { text: 'Claim Discount', href: '/pricing' },
      },
      trustSignals: [
        { value: '24 hours', text: 'Remaining' },
        { value: '500+', text: 'Already claimed' },
      ],
    }),
};

/**
 * Video Background Hero
 *
 * Autoplay looping video background for maximum engagement.
 * Best for: Conferences, events, entertainment, creative portfolios
 */
export const VideoBackground: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      background: {
        type: 'video',
        video: 'https://www.w3schools.com/html/mov_bbb.mp4',
        overlay: 'dark',
      },
      headline: 'Experience Innovation',
      subheading: 'See our technology in action',
      cta: {
        primary: { text: 'Register Now', href: '/register' },
      },
    }),
};

/**
 * Minimal Hero - Content Focus
 *
 * Clean, minimal hero for content-focused sites (blogs, documentation).
 * Best for: Blogs, documentation, personal sites, portfolios
 */
export const Minimal: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'centered',
      height: 'minimal',
      headline: 'Expert Insights on Web Development',
      subheading: 'Weekly articles, tutorials, and deep dives',
      cta: {
        primary: { text: 'Read Latest Post', href: '/blog' },
      },
    }),
};

/**
 * Real-World: SaaS Landing Page
 *
 * Complete SaaS hero with all conversion elements.
 * Features: Eyebrow, email capture, social proof, trust signals
 */
export const SaaSLandingPage: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      eyebrow: 'Now in Beta',
      headline: 'Build Landing Pages That Convert',
      subheading: 'AI-powered component library with built-in best practices',
      description: 'Stop guessing. Start shipping pages optimized for conversion.',
      emailCapture: {
        enabled: true,
        placeholder: 'your@company.com',
        buttonText: 'Start Free Trial',
        privacyText: 'No credit card required. 14-day free trial.',
      },
      socialProof: {
        enabled: true,
        title: 'Trusted by 10,000+ developers',
        logos: [
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Startup+1',
            alt: 'Startup 1',
          },
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Startup+2',
            alt: 'Startup 2',
          },
          {
            src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Startup+3',
            alt: 'Startup 3',
          },
        ],
      },
    }),
};

/**
 * Real-World: Agency Portfolio
 *
 * Visual-first hero for creative agencies.
 * Features: Split reverse layout, video showcase, minimal text
 */
export const AgencyPortfolio: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'split-reverse',
      height: 'full',
      headline: 'We Build Digital Experiences',
      subheading: 'Award-winning agency specializing in brochureware sites',
      cta: {
        primary: { text: 'View Our Work', href: '/portfolio' },
        secondary: { text: 'Contact Us', href: '/contact', variant: 'ghost' },
      },
      media: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        alt: 'Dashboard analytics screenshot',
      },
    }),
};

/**
 * Real-World: E-commerce Promotion
 *
 * Urgency-focused hero for limited-time offers.
 * Features: Gradient background, eyebrow badge, urgency signals
 */
export const EcommercePromotion: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      background: { type: 'gradient' },
      eyebrow: 'Flash Sale - 24 Hours Only',
      headline: 'Save 50% on Premium Products',
      subheading: 'Limited stock available. Shop now before it\'s gone.',
      cta: {
        primary: { text: 'Shop Now', href: '/products' },
      },
      trustSignals: [
        { value: '50,000+', text: 'Products sold' },
        { value: '4.8/5', text: 'Customer rating' },
        { value: 'Free', text: 'Worldwide shipping' },
      ],
    }),
};

/**
 * Dark Mode Preview
 *
 * Preview how hero appears in dark mode.
 * Best viewed with Storybook dark mode addon.
 */
export const DarkMode: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'split',
      headline: 'Dark Mode Optimized',
      subheading: 'Beautiful in both light and dark themes',
      cta: {
        primary: { text: 'Try It Now', href: '#' },
      },
      media: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        alt: 'Code editor in dark mode',
      },
    }),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Mobile View
 *
 * Preview how hero stacks on mobile devices.
 * Content stacks vertically, media appears above text.
 */
export const Mobile: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'split',
      headline: 'Mobile-First Design',
      subheading: 'Optimized for 60%+ mobile traffic',
      cta: {
        primary: { text: 'Get Started', href: '/signup' },
      },
      media: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
        alt: 'Mobile device mockup',
      },
    }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Full-Width Layout
 *
 * Edge-to-edge layout for maximum visual impact.
 * Best for: Hero sections on full-bleed designs
 */
export const FullWidth: Story = {
  render: () =>
    renderNunjucks('organisms/hero/hero.njk', 'hero', {
      layout: 'full-width',
      background: {
        type: 'image',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
        overlay: 'dark',
        alt: 'Cityscape at night',
      },
      headline: 'Expand Your Horizons',
      subheading: 'Full-width layout for maximum impact',
      cta: {
        primary: { text: 'Explore Now', href: '#' },
      },
    }),
};
