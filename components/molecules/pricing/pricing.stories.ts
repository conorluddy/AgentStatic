// components/molecules/pricing/pricing.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * Pricing Molecule Stories
 *
 * Critical decision-making component for brochureware conversion.
 * Implements marketing psychology patterns: anchoring, decoy effect, loss aversion.
 *
 * Shows pricing plan cards with name, price, features, CTA, optional badge,
 * and strikethrough pricing for promotions.
 */

const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

const meta: Meta = {
  title: 'Molecules/Pricing',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Plan name (e.g., "Pro", "Enterprise")',
    },
    price: {
      control: 'text',
      description: 'Price amount (e.g., "$99", "Contact Sales")',
    },
    period: {
      control: 'text',
      description: 'Billing period (e.g., "month", "year")',
    },
    highlighted: {
      control: 'boolean',
      description: 'Whether this is the recommended plan',
    },
    badge: {
      control: 'text',
      description: 'Badge text (e.g., "Most Popular")',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Pricing plan card for brochureware conversion. Displays plan name, price, features, and CTA with marketing psychology enhancements (anchoring, social proof, loss aversion).',
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
            id: 'landmark-one-main',
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const renderComponent = (args: any) => {
  return env.renderString(
    `
    {% from "molecules/pricing/pricing.njk" import pricing %}
    {{ pricing(props) }}
  `,
    { props: args }
  );
};

// Basic Plan (Free Tier)
export const FreePlan: Story = {
  args: {
    name: 'Free',
    price: '$0',
    period: 'month',
    description: 'Perfect for individuals and small projects',
    features: [
      { text: '5 projects' },
      { text: '1 GB storage' },
      { text: 'Community support' },
      { text: 'Basic analytics' },
    ],
    cta: {
      text: 'Get Started',
      href: '/signup?plan=free',
      variant: 'ghost',
    },
  },
  render: renderComponent,
};

// Pro Plan (Highlighted, Most Popular)
export const ProPlanHighlighted: Story = {
  args: {
    name: 'Pro',
    price: '$49',
    period: 'month',
    description: 'For growing teams and businesses',
    badge: 'Most Popular',
    badgeVariant: 'primary',
    highlighted: true,
    features: [
      { text: 'Unlimited projects' },
      { text: '100 GB storage' },
      { text: 'Priority support' },
      { text: 'Advanced analytics' },
      { text: 'Custom domain' },
      { text: 'Collaboration tools' },
    ],
    cta: {
      text: 'Start Free Trial',
      href: '/signup?plan=pro',
      variant: 'primary',
    },
    ctaNote: 'No credit card required',
  },
  render: renderComponent,
};

// Enterprise Plan
export const EnterprisePlan: Story = {
  args: {
    name: 'Enterprise',
    price: 'Contact Sales',
    description: 'Custom solutions for large organizations',
    features: [
      { text: 'Unlimited everything' },
      { text: 'Dedicated support' },
      { text: 'Custom integrations' },
      { text: 'SLA guarantee' },
      { text: 'Advanced security' },
      { text: 'Training & onboarding' },
    ],
    cta: {
      text: 'Contact Sales',
      href: '/contact-sales',
      variant: 'secondary',
    },
  },
  render: renderComponent,
};

// Promotional Plan (Strikethrough Pricing)
export const PromotionalPricing: Story = {
  args: {
    name: 'Business',
    price: '$79',
    originalPrice: '$99',
    period: 'month',
    savings: 'Save 20%',
    description: 'Limited time promotional pricing',
    badge: 'Best Value',
    badgeVariant: 'success',
    highlighted: true,
    features: [
      { text: 'Everything in Pro' },
      { text: 'Unlimited storage' },
      { text: '24/7 phone support' },
      { text: 'Advanced reports' },
      { text: 'API access' },
    ],
    cta: {
      text: 'Get Started',
      href: '/signup?plan=business',
      variant: 'primary',
    },
    ctaNote: '14-day free trial',
  },
  render: renderComponent,
};

// Annual Plan (Save More)
export const AnnualPlan: Story = {
  args: {
    name: 'Pro Annual',
    price: '$39',
    originalPrice: '$49',
    period: 'month',
    savings: 'Save $120/year',
    description: 'Billed annually at $468/year',
    badge: 'Save 20%',
    badgeVariant: 'success',
    features: [
      { text: 'All Pro features' },
      { text: 'Annual billing discount' },
      { text: 'Priority support' },
      { text: 'Free upgrades' },
    ],
    cta: {
      text: 'Start Annual Plan',
      href: '/signup?plan=pro&billing=annual',
      variant: 'primary',
    },
  },
  render: renderComponent,
};

// Three-Plan Grid (Goldilocks Pricing)
export const ThreePlanGrid: Story = {
  render: () => {
    const freePlan = {
      name: 'Free',
      price: '$0',
      period: 'month',
      description: 'For individuals',
      features: [
        { text: '5 projects' },
        { text: '1 GB storage' },
        { text: 'Community support' },
      ],
      cta: {
        text: 'Get Started',
        href: '/signup?plan=free',
        variant: 'ghost',
      },
    };

    const proPlan = {
      name: 'Pro',
      price: '$49',
      originalPrice: '$79',
      period: 'month',
      savings: 'Save 38%',
      description: 'For growing teams',
      badge: 'Most Popular',
      badgeVariant: 'primary',
      highlighted: true,
      features: [
        { text: 'Unlimited projects' },
        { text: '100 GB storage' },
        { text: 'Priority support' },
        { text: 'Advanced analytics' },
      ],
      cta: {
        text: 'Start Free Trial',
        href: '/signup?plan=pro',
        variant: 'primary',
      },
      ctaNote: 'No credit card required',
    };

    const enterprisePlan = {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        { text: 'Unlimited everything' },
        { text: 'Dedicated support' },
        { text: 'Custom integrations' },
        { text: 'SLA guarantee' },
      ],
      cta: {
        text: 'Contact Sales',
        href: '/contact-sales',
        variant: 'secondary',
      },
    };

    return env.renderString(
      `
      {% from "molecules/pricing/pricing.njk" import pricing %}
      <div class="pricing-grid">
        {{ pricing(free) }}
        {{ pricing(pro) }}
        {{ pricing(enterprise) }}
      </div>
    `,
      { free: freePlan, pro: proPlan, enterprise: enterprisePlan }
    );
  },
};

// With Multiple Badges
export const MultipleBadgeOptions: Story = {
  render: () => {
    const mostPopular = {
      name: 'Pro',
      price: '$49',
      period: 'month',
      badge: 'Most Popular',
      badgeVariant: 'primary',
      highlighted: true,
      features: [
        { text: 'Unlimited projects' },
        { text: 'Priority support' },
      ],
      cta: {
        text: 'Get Started',
        href: '/signup?plan=pro',
        variant: 'primary',
      },
    };

    const bestValue = {
      name: 'Business',
      price: '$79',
      period: 'month',
      badge: 'Best Value',
      badgeVariant: 'success',
      highlighted: true,
      features: [
        { text: 'All Pro features' },
        { text: '24/7 support' },
      ],
      cta: {
        text: 'Get Started',
        href: '/signup?plan=business',
        variant: 'primary',
      },
    };

    const limitedTime = {
      name: 'Starter',
      price: '$19',
      period: 'month',
      badge: 'Limited Time',
      badgeVariant: 'warning',
      features: [
        { text: '10 projects' },
        { text: 'Email support' },
      ],
      cta: {
        text: 'Get Started',
        href: '/signup?plan=starter',
        variant: 'primary',
      },
    };

    return env.renderString(
      `
      {% from "molecules/pricing/pricing.njk" import pricing %}
      <div class="pricing-grid">
        {{ pricing(mostPopular) }}
        {{ pricing(bestValue) }}
        {{ pricing(limitedTime) }}
      </div>
    `,
      { mostPopular, bestValue, limitedTime }
    );
  },
};

// Comparison: With vs. Without Badges
export const WithoutBadges: Story = {
  render: () => {
    const plan = {
      name: 'Pro',
      price: '$49',
      period: 'month',
      description: 'For growing teams',
      features: [
        { text: 'Unlimited projects' },
        { text: 'Priority support' },
        { text: 'Advanced analytics' },
      ],
      cta: {
        text: 'Get Started',
        href: '/signup?plan=pro',
        variant: 'primary',
      },
    };

    return renderComponent(plan);
  },
};

// With Mixed Feature Icons (Check/Cross)
export const MixedFeatureIcons: Story = {
  args: {
    name: 'Starter',
    price: '$19',
    period: 'month',
    description: 'Basic features for small teams',
    features: [
      { text: '10 projects', icon: 'check', included: true },
      { text: '10 GB storage', icon: 'check', included: true },
      { text: 'Email support', icon: 'check', included: true },
      { text: 'Priority support', icon: 'x', included: false },
      { text: 'Advanced analytics', icon: 'x', included: false },
      { text: 'Custom domain', icon: 'x', included: false },
    ],
    cta: {
      text: 'Get Started',
      href: '/signup?plan=starter',
      variant: 'primary',
    },
  },
  render: renderComponent,
};

// Dark Mode Preview
export const DarkMode: Story = {
  args: {
    name: 'Pro',
    price: '$49',
    originalPrice: '$79',
    period: 'month',
    savings: 'Save 38%',
    description: 'For growing teams',
    badge: 'Most Popular',
    badgeVariant: 'primary',
    highlighted: true,
    features: [
      { text: 'Unlimited projects' },
      { text: 'Priority support' },
      { text: 'Advanced analytics' },
      { text: 'Custom domain' },
    ],
    cta: {
      text: 'Start Free Trial',
      href: '/signup?plan=pro',
      variant: 'primary',
    },
    ctaNote: 'No credit card required',
  },
  render: renderComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// Mobile Responsive View
export const MobileView: Story = {
  render: () => {
    const plan = {
      name: 'Pro',
      price: '$49',
      period: 'month',
      badge: 'Most Popular',
      highlighted: true,
      features: [
        { text: 'Unlimited projects' },
        { text: 'Priority support' },
        { text: 'Advanced analytics' },
      ],
      cta: {
        text: 'Start Free Trial',
        href: '/signup?plan=pro',
        variant: 'primary',
      },
      ctaNote: 'No credit card required',
    };

    return renderComponent(plan);
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// All Pricing Cards (Marketing Psychology Demo)
export const AllPricingCards: Story = {
  render: () => {
    const plans = [
      {
        name: 'Free',
        price: '$0',
        period: 'month',
        description: 'Perfect for individuals',
        features: [
          { text: '5 projects' },
          { text: '1 GB storage' },
          { text: 'Community support' },
        ],
        cta: {
          text: 'Get Started',
          href: '/signup?plan=free',
          variant: 'ghost',
        },
      },
      {
        name: 'Starter',
        price: '$19',
        period: 'month',
        description: 'For small teams',
        features: [
          { text: '10 projects' },
          { text: '10 GB storage' },
          { text: 'Email support' },
        ],
        cta: {
          text: 'Start Free Trial',
          href: '/signup?plan=starter',
          variant: 'primary',
        },
      },
      {
        name: 'Pro',
        price: '$49',
        originalPrice: '$79',
        period: 'month',
        savings: 'Save 38%',
        description: 'For growing teams',
        badge: 'Most Popular',
        badgeVariant: 'primary',
        highlighted: true,
        features: [
          { text: 'Unlimited projects' },
          { text: '100 GB storage' },
          { text: 'Priority support' },
          { text: 'Advanced analytics' },
        ],
        cta: {
          text: 'Start Free Trial',
          href: '/signup?plan=pro',
          variant: 'primary',
        },
        ctaNote: 'No credit card required',
      },
      {
        name: 'Business',
        price: '$99',
        period: 'month',
        description: 'For established businesses',
        badge: 'Best Value',
        badgeVariant: 'success',
        features: [
          { text: 'Unlimited projects' },
          { text: 'Unlimited storage' },
          { text: '24/7 phone support' },
          { text: 'Advanced reports' },
          { text: 'API access' },
        ],
        cta: {
          text: 'Get Started',
          href: '/signup?plan=business',
          variant: 'primary',
        },
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations',
        features: [
          { text: 'Unlimited everything' },
          { text: 'Dedicated support' },
          { text: 'Custom integrations' },
          { text: 'SLA guarantee' },
          { text: 'Security & compliance' },
        ],
        cta: {
          text: 'Contact Sales',
          href: '/contact-sales',
          variant: 'secondary',
        },
      },
    ];

    return env.renderString(
      `
      {% from "molecules/pricing/pricing.njk" import pricing %}
      <div class="pricing-grid">
        {% for plan in plans %}
          {{ pricing(plan) }}
        {% endfor %}
      </div>
    `,
      { plans }
    );
  },
};
