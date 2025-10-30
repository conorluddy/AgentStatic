// components/molecules/cta-block/cta-block.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';


/**
 * CTA Block Component Stories
 *
 * PRIMARY CONVERSION ELEMENT - Call-to-action block combining heading, description,
 * and buttons with marketing enhancements. This is where conversions happen.
 *
 * Features:
 * - Three layout variants: centered (default), horizontal split, inline
 * - Background variants: solid, gradient, image with overlay
 * - Trust signal support (customer count, ratings)
 * - Urgency elements (countdown timers, scarcity)
 * - Responsive stacking on mobile
 * - Dark mode support
 *
 * Marketing Context:
 * - CTA blocks are the final conversion push before footer
 * - Trust signals increase conversions by 15-25%
 * - Urgency elements create FOMO (fear of missing out)
 * - Test headline, CTA copy, and background variants extensively
 */

// Configure Nunjucks
const componentsPath = path.resolve(__dirname, '../../');
// Simple placeholder image for demos
const placeholderImage = 'data:image/svg+xml,%3Csvg width="600" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="600" height="400" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EDemo Screenshot%3C/text%3E%3C/svg%3E';

// Component metadata
const meta: Meta = {
  title: 'Molecules/CTA Block',
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['centered', 'split', 'inline'],
      description: 'Layout style for the CTA block',
      defaultValue: 'centered',
    },
    backgroundType: {
      control: 'select',
      options: ['default', 'primary', 'gradient', 'gradient-subtle', 'image'],
      description: 'Background styling',
      defaultValue: 'default',
    },
    eyebrow: {
      control: 'text',
      description: 'Small label text above heading',
    },
    headline: {
      control: 'text',
      description: 'Main heading text (REQUIRED)',
    },
    subheadline: {
      control: 'text',
      description: 'Supporting text below headline',
    },
    description: {
      control: 'text',
      description: 'Body text explaining the CTA (REQUIRED)',
    },
    primaryText: {
      control: 'text',
      description: 'Primary CTA button text',
    },
    secondaryText: {
      control: 'text',
      description: 'Secondary CTA button text',
    },
    trustSignal: {
      control: 'text',
      description: 'Trust signal text below CTAs',
    },
    urgency: {
      control: 'text',
      description: 'Urgency element text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'PRIMARY CONVERSION ELEMENT - Call-to-action block for driving user actions. Combines heading, description, and buttons with marketing enhancements like trust signals and urgency elements. Critical for conversions.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'landmark-unique',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Render function
const renderComponent = (props: any) => {
  const {
    layout = 'centered',
    backgroundType = 'default',
    eyebrow = '',
    headline = 'Ready to get started?',
    subheadline = '',
    description = 'Join thousands of happy customers using our platform.',
    primaryText = 'Start Free Trial',
    primaryHref = '/signup',
    secondaryText = '',
    secondaryHref = '/demo',
    trustSignal = '',
    urgency = '',
    visual = '',
  } = props;

  // Build background config
  const background: any = { type: backgroundType };
  if (backgroundType === 'image') {
    background.image = placeholderImage;
    background.overlay = 'dark';
  }

  // Build CTA config
  const cta: any = {
    primary: {
      text: primaryText,
      href: primaryHref,
    },
  };

  if (secondaryText) {
    cta.secondary = {
      text: secondaryText,
      href: secondaryHref,
      variant: 'ghost',
    };
  }

  // Build component props
  const componentProps: any = {
    layout,
    background,
    headline,
    description,
    cta,
  };

  if (eyebrow) componentProps.eyebrow = eyebrow;
  if (subheadline) componentProps.subheadline = subheadline;
  if (trustSignal) componentProps.trustSignal = trustSignal;
  if (urgency) componentProps.urgency = urgency;
  if (visual) componentProps.visual = visual;

  // Render template
  return renderNunjucksTemplate('molecules/cta-block/cta-block.njk', {
    ctaBlock: (config: any) => renderNunjucksTemplate('molecules/cta-block/cta-block.njk', config),
    ...componentProps,
  });
};

/**
 * Default: Basic centered CTA block
 */
export const Default: Story = {
  render: renderComponent,
  args: {
    headline: 'Ready to get started?',
    description: 'Join thousands of happy customers using our platform to grow their business.',
    primaryText: 'Start Free Trial',
  },
};

/**
 * With Trust Signal: Social proof below CTA increases conversions by 15-25%
 */
export const WithTrustSignal: Story = {
  render: renderComponent,
  args: {
    headline: 'Transform your workflow',
    description: 'Streamline your team\'s productivity with our all-in-one platform.',
    primaryText: 'Get Started Free',
    secondaryText: 'View Demo',
    trustSignal: '⭐⭐⭐⭐⭐ Trusted by 10,000+ happy customers',
  },
};

/**
 * With Urgency: Creates FOMO (fear of missing out) to drive immediate action
 */
export const WithUrgency: Story = {
  render: renderComponent,
  args: {
    eyebrow: 'Limited Time Offer',
    headline: 'Get 50% off today',
    description: 'Our biggest discount of the year. Save 50% on all annual plans for the next 24 hours.',
    urgency: '⏰ Offer ends in 24 hours',
    primaryText: 'Claim Discount',
    trustSignal: 'Join 10,000+ customers who saved an average of $500',
    backgroundType: 'gradient',
  },
};

/**
 * Horizontal Split: Image/illustration on one side, content on other
 */
export const HorizontalSplit: Story = {
  render: renderComponent,
  args: {
    layout: 'split',
    headline: 'See it in action',
    description: 'Watch how our platform transforms your workflow in just minutes. No credit card required.',
    primaryText: 'Watch Demo',
    secondaryText: 'Start Free Trial',
    visual: placeholderImage,
  },
};

/**
 * Inline Layout: Compact horizontal layout for less prominent CTAs
 */
export const InlineLayout: Story = {
  render: renderComponent,
  args: {
    layout: 'inline',
    headline: 'Stay updated',
    description: 'Get our weekly newsletter with tips, insights, and updates delivered to your inbox.',
    primaryText: 'Subscribe',
  },
};

/**
 * Primary Background: Bold brand color background for high visibility
 */
export const PrimaryBackground: Story = {
  render: renderComponent,
  args: {
    headline: 'Start building today',
    description: 'Everything you need to create amazing experiences for your customers.',
    primaryText: 'Create Account',
    secondaryText: 'Contact Sales',
    backgroundType: 'primary',
  },
};

/**
 * Gradient Background: Eye-catching gradient for maximum impact
 */
export const GradientBackground: Story = {
  render: renderComponent,
  args: {
    eyebrow: 'New Feature',
    headline: 'Introducing AI Page Builder',
    subheadline: 'Build pages 10x faster with AI',
    description: 'Let our AI assistant create beautiful, conversion-optimized pages from natural language descriptions.',
    primaryText: 'Try AI Builder',
    trustSignal: 'Used by 1,000+ early adopters',
    backgroundType: 'gradient',
  },
};

/**
 * Subtle Gradient: Softer gradient for less aggressive styling
 */
export const SubtleGradient: Story = {
  render: renderComponent,
  args: {
    headline: 'Ready to grow your business?',
    description: 'Join the thousands of companies using our platform to scale efficiently.',
    primaryText: 'Get Started',
    secondaryText: 'Learn More',
    trustSignal: 'Rated 4.9/5 by 10,000+ users',
    backgroundType: 'gradient-subtle',
  },
};

/**
 * Image Background: Hero image with dark overlay for text readability
 */
export const ImageBackground: Story = {
  render: renderComponent,
  args: {
    headline: 'Build your dream team',
    description: 'Connect with talented professionals and grow your business faster than ever.',
    primaryText: 'Start Hiring',
    secondaryText: 'Browse Talent',
    backgroundType: 'image',
  },
};

/**
 * Maximum Impact: All features enabled - eyebrow, subheadline, urgency, trust signal, gradient
 */
export const MaximumImpact: Story = {
  render: renderComponent,
  args: {
    eyebrow: 'Limited Offer',
    headline: 'Join the revolution',
    subheadline: 'Transform how you work with AI-powered tools',
    description: 'Be part of the fastest-growing platform for modern teams. Get started today with our exclusive launch discount.',
    urgency: '🔥 50% off ends tonight at midnight',
    primaryText: 'Start Free Trial',
    secondaryText: 'Learn More',
    trustSignal: '⭐⭐⭐⭐⭐ 4.9/5 from 10,000+ reviews • No credit card required',
    backgroundType: 'gradient',
  },
};

/**
 * Mobile Preview: Shows how CTA blocks stack on mobile devices
 */
export const MobilePreview: Story = {
  render: renderComponent,
  args: {
    headline: 'Download our mobile app',
    description: 'Take your productivity on the go with our award-winning mobile app.',
    primaryText: 'Download for iOS',
    secondaryText: 'Download for Android',
    trustSignal: '4.8★ rating • 1M+ downloads',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Dark Mode: Shows CTA block in dark theme
 */
export const DarkMode: Story = {
  render: (props: any) => {
    const html = renderComponent(props);
    return `<div data-theme="dark" style="background-color: #111827; padding: 2rem;">${html}</div>`;
  },
  args: {
    headline: 'Experience in dark mode',
    description: 'See how our CTA blocks look beautiful in both light and dark themes.',
    primaryText: 'Get Started',
    trustSignal: 'Trusted by developers worldwide',
  },
};

/**
 * A/B Test Variant A: Benefit-focused headline
 */
export const ABTestVariantA: Story = {
  render: renderComponent,
  args: {
    headline: 'Build websites 10x faster',
    description: 'Stop wasting time on repetitive tasks. Let AI handle the heavy lifting while you focus on what matters.',
    primaryText: 'Start Free Trial',
    trustSignal: 'Join 10,000+ developers',
  },
  parameters: {
    docs: {
      description: {
        story: 'A/B Test Variant A: Benefit-focused headline emphasizing speed improvement',
      },
    },
  },
};

/**
 * A/B Test Variant B: Feature-focused headline
 */
export const ABTestVariantB: Story = {
  render: renderComponent,
  args: {
    headline: 'AI-powered site builder',
    description: 'Create beautiful, conversion-optimized websites with the power of artificial intelligence.',
    primaryText: 'Try AI Builder',
    trustSignal: 'Join 10,000+ developers',
  },
  parameters: {
    docs: {
      description: {
        story: 'A/B Test Variant B: Feature-focused headline emphasizing AI technology',
      },
    },
  },
};

/**
 * Real-World Example: ConvertKit-style CTA with email focus
 */
export const RealWorldConvertKit: Story = {
  render: renderComponent,
  args: {
    headline: 'Grow your audience',
    subheadline: 'Join 50,000+ creators building their email list',
    description: 'The email marketing platform designed for creators. Start building your audience today.',
    primaryText: 'Start Free Trial',
    secondaryText: 'See How It Works',
    trustSignal: 'Trusted by Pat Flynn, James Clear, and Tim Ferriss',
    backgroundType: 'gradient-subtle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world example inspired by ConvertKit\'s CTA blocks with trust signals from famous creators',
      },
    },
  },
};

/**
 * Real-World Example: Stripe-style CTA with developer focus
 */
export const RealWorldStripe: Story = {
  render: renderComponent,
  args: {
    headline: 'Start your integration',
    description: 'Get up and running with just a few lines of code. Our API is designed for developers.',
    primaryText: 'View Documentation',
    secondaryText: 'Explore API',
    trustSignal: 'Millions of companies of all sizes use Stripe',
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world example inspired by Stripe\'s developer-focused CTAs',
      },
    },
  },
};
