/**
 * Comparison Table Organism Stories
 *
 * Marketing-optimized table for comparing plans, products, or features.
 * Demonstrates pricing psychology principles, responsive behavior, and accessibility.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

const renderComponent = (args: any) => {
  return renderNunjucksTemplate(
    `
    {% from "organisms/comparison-table/comparison-table.njk" import comparisonTable %}
    {{ comparisonTable(props) }}
  `,
    { props: args }
  );
};

const meta: Meta = {
  title: 'Organisms/Comparison Table',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Comparison Table Organism

Marketing-optimized table for comparing plans, products, or features with built-in pricing psychology principles.

## Key Features

- Sticky header row with pricing and CTAs
- Sticky first column (feature names)
- Highlighted recommended/popular columns
- Category headers for feature grouping
- Check/cross icons for boolean features
- Multiple visual variants
- Responsive: horizontal scroll or stacked cards
- Full dark mode support
- WCAG AA accessible

## Marketing Psychology

- **Anchoring Effect**: Show expensive plan first to anchor perception
- **Visual Prominence**: Highlighted column drives 60%+ conversions
- **Goldilocks Pricing**: 3 tiers optimal for decision-making
- **Feature Ordering**: Most valuable features at top
- **Loss Aversion**: Show what users don't get in lower tiers

## Real-World Usage

Perfect for:
- SaaS pricing pages (Stripe, Notion, Shopify)
- Product comparison pages
- Competitor analysis
- Feature matrices
- Plan selection flows
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'striped', 'minimal'],
      description: 'Visual style variant',
    },
    responsive: {
      control: 'select',
      options: ['scroll', 'cards'],
      description: 'Mobile behavior: horizontal scroll or stacked cards',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Story 1: SaaS Pricing Table (3 Plans)
 * Classic Goldilocks pricing with highlighted middle option
 */
export const SaaSPricing: Story = {
  name: '1. SaaS Pricing (3 Plans)',
  args: {
    columns: [
      {
        title: 'Basic',
        priceAmount: '$9',
        pricePeriod: '/mo',
        description: 'For individuals',
        cta: {
          text: 'Start Free',
          href: '#signup',
        },
      },
      {
        title: 'Pro',
        priceAmount: '$29',
        pricePeriod: '/mo',
        description: 'For small teams',
        highlighted: true,
        badge: 'Most Popular',
        cta: {
          text: 'Start Trial',
          href: '#signup?plan=pro',
          variant: 'primary',
        },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations',
        cta: {
          text: 'Contact Sales',
          href: '#contact',
        },
      },
    ],
    rows: [
      { category: 'Core Features' },
      { feature: 'Users', values: ['1', '5', 'Unlimited'] },
      { feature: 'Storage', values: ['10 GB', '100 GB', 'Unlimited'] },
      { feature: 'Projects', values: ['3', '20', 'Unlimited'] },
      { feature: 'API Calls', values: ['1,000/mo', '10,000/mo', 'Unlimited'] },
      { category: 'Advanced Features' },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Custom Domain', values: [false, true, true] },
      { feature: 'Priority Support', values: [false, true, true] },
      { feature: 'Advanced Analytics', values: [false, false, true] },
      { feature: 'White Label', values: [false, false, true] },
      { category: 'Support' },
      { feature: 'Email Support', values: [true, true, true] },
      { feature: 'Live Chat', values: [false, true, true] },
      { feature: 'Phone Support', values: [false, false, true] },
      { feature: 'Dedicated Account Manager', values: [false, false, true] },
    ],
    variant: 'bordered',
    a11y: {
      caption: 'Pricing plan comparison: Basic, Pro, and Enterprise tiers',
    },
  },
  render: renderComponent,
};

/**
 * Story 2: 2-Column Product Comparison
 * Side-by-side comparison of two products
 */
export const ProductComparison: Story = {
  name: '2. Product Comparison (2 Columns)',
  args: {
    columns: [
      {
        title: 'Our Product',
        subtitle: 'The modern solution',
        highlighted: true,
        badge: 'Recommended',
        cta: {
          text: 'Try Free for 14 Days',
          href: '#signup',
        },
      },
      {
        title: 'Competitor X',
        subtitle: 'Legacy system',
        cta: {
          text: 'Compare Details',
          href: '#comparison',
        },
      },
    ],
    rows: [
      { category: 'Setup & Onboarding' },
      { feature: 'Setup Time', values: ['5 minutes', '2-3 days'] },
      { feature: 'Training Required', values: ['None', 'Yes (paid)'] },
      { feature: 'Data Migration', values: ['Automated', 'Manual'] },
      { category: 'User Experience' },
      { feature: 'User Interface', values: ['Modern & intuitive', 'Dated design'] },
      { feature: 'Mobile App', values: [true, false] },
      { feature: 'Keyboard Shortcuts', values: [true, false] },
      { feature: 'Dark Mode', values: [true, false] },
      { category: 'Integration' },
      { feature: 'API Integration', values: [true, false] },
      { feature: 'Webhook Support', values: [true, false] },
      { feature: 'Zapier Integration', values: [true, true] },
      { category: 'Support' },
      { feature: 'Support Response Time', values: ['< 1 hour', '24-48 hours'] },
      { feature: 'Support Channels', values: ['Email, Chat, Phone', 'Email only'] },
      { category: 'Pricing' },
      { feature: 'Annual Cost (10 users)', values: ['$1,200', '$3,600'] },
      { feature: 'Free Trial', values: ['14 days', 'None'] },
    ],
    variant: 'striped',
    a11y: {
      caption: 'Product comparison: Our product vs Competitor X',
    },
  },
  render: renderComponent,
};

/**
 * Story 3: 4-Column Feature Matrix
 * Comprehensive feature comparison across multiple plans
 */
export const FeatureMatrix: Story = {
  name: '3. Feature Matrix (4 Columns)',
  args: {
    columns: [
      {
        title: 'Free',
        price: '$0',
        description: 'Forever free',
        cta: {
          text: 'Sign Up',
          href: '#signup',
        },
      },
      {
        title: 'Starter',
        priceAmount: '$19',
        pricePeriod: '/mo',
        description: 'For freelancers',
        cta: {
          text: 'Start Trial',
          href: '#trial',
        },
      },
      {
        title: 'Business',
        priceAmount: '$49',
        pricePeriod: '/mo',
        description: 'For growing teams',
        highlighted: true,
        badge: 'Best Value',
        cta: {
          text: 'Get Started',
          href: '#signup?plan=business',
        },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations',
        cta: {
          text: 'Contact Us',
          href: '#contact',
        },
      },
    ],
    rows: [
      { category: 'Team & Collaboration' },
      { feature: 'Team Members', values: ['1', '5', '25', 'Unlimited'] },
      { feature: 'Guest Access', values: [false, true, true, true] },
      { feature: 'Team Permissions', values: [false, false, true, true] },
      { category: 'Storage & Limits' },
      { feature: 'Storage', values: ['1 GB', '10 GB', '100 GB', 'Unlimited'] },
      { feature: 'File Upload Size', values: ['10 MB', '100 MB', '1 GB', 'Unlimited'] },
      { feature: 'Monthly Bandwidth', values: ['10 GB', '100 GB', '1 TB', 'Unlimited'] },
      { category: 'Features' },
      { feature: 'Basic Features', values: [true, true, true, true] },
      { feature: 'Advanced Features', values: [false, true, true, true] },
      { feature: 'Custom Integrations', values: [false, false, true, true] },
      { feature: 'API Access', values: [false, false, true, true] },
      { feature: 'White Label', values: [false, false, false, true] },
      { category: 'Security & Compliance' },
      { feature: 'SSL Certificate', values: [true, true, true, true] },
      { feature: 'Two-Factor Auth', values: [false, true, true, true] },
      { feature: 'SSO (SAML)', values: [false, false, false, true] },
      { feature: 'SOC 2 Compliance', values: [false, false, false, true] },
    ],
    variant: 'default',
  },
  render: renderComponent,
};

/**
 * Story 4: Anchored Pricing (Highest First)
 * Shows most expensive plan first to anchor perception
 */
export const AnchoredPricing: Story = {
  name: '4. Anchored Pricing (Highest First)',
  args: {
    columns: [
      {
        title: 'Enterprise',
        priceAmount: '$299',
        pricePeriod: '/mo',
        description: 'Complete control',
        cta: {
          text: 'Contact Sales',
          href: '#contact',
        },
      },
      {
        title: 'Professional',
        priceAmount: '$99',
        pricePeriod: '/mo',
        description: 'For growing teams',
        highlighted: true,
        badge: 'Best Value',
        cta: {
          text: 'Start Trial',
          href: '#trial',
        },
      },
      {
        title: 'Starter',
        priceAmount: '$29',
        pricePeriod: '/mo',
        description: 'Get started',
        cta: {
          text: 'Sign Up',
          href: '#signup',
        },
      },
    ],
    rows: [
      { feature: 'Everything in lower tiers', values: [true, true, true] },
      { feature: 'Team members', values: ['Unlimited', '25', '5'] },
      { feature: 'Storage', values: ['Unlimited', '500 GB', '50 GB'] },
      { feature: 'Advanced analytics', values: [true, true, false] },
      { feature: 'Custom integrations', values: [true, true, false] },
      { feature: 'Dedicated support', values: [true, false, false] },
      { feature: 'SLA Guarantee', values: ['99.99%', '99.9%', '99%'] },
    ],
    variant: 'bordered',
  },
  render: renderComponent,
};

/**
 * Story 5: Competitor Comparison
 * Compare your product against competitors
 */
export const CompetitorComparison: Story = {
  name: '5. Competitor Comparison',
  args: {
    columns: [
      {
        title: 'Us',
        highlighted: true,
        badge: 'Best Choice',
        cta: {
          text: 'Get Started Free',
          href: '#signup',
        },
      },
      {
        title: 'Competitor A',
        cta: {
          text: 'Compare',
          href: '#compare-a',
        },
      },
      {
        title: 'Competitor B',
        cta: {
          text: 'Compare',
          href: '#compare-b',
        },
      },
    ],
    rows: [
      { category: 'Pricing' },
      { feature: 'Starting Price', values: ['$19/mo', '$29/mo', '$49/mo'] },
      { feature: 'Free Trial', values: ['14 days', '7 days', 'None'] },
      { feature: 'Money-Back Guarantee', values: ['30 days', '14 days', 'None'] },
      { category: 'Features' },
      { feature: 'Core Features', values: [true, true, true] },
      { feature: 'Advanced Features', values: [true, true, false] },
      { feature: 'API Access', values: [true, false, true] },
      { feature: 'Mobile App', values: [true, false, false] },
      { feature: 'Team Collaboration', values: [true, true, false] },
      { category: 'Support' },
      { feature: 'Email Support', values: [true, true, true] },
      { feature: 'Live Chat', values: [true, false, false] },
      { feature: 'Phone Support', values: [true, false, true] },
      { feature: 'Average Response Time', values: ['< 1 hour', '24 hours', '48 hours'] },
      { category: 'User Experience' },
      { feature: 'User Interface Rating', values: ['4.9/5', '3.2/5', '3.8/5'] },
      { feature: 'Setup Time', values: ['5 min', '30 min', '2 hours'] },
      { feature: 'Learning Curve', values: ['Easy', 'Moderate', 'Difficult'] },
    ],
    variant: 'striped',
    a11y: {
      caption: 'Competitor comparison: Our product vs Competitor A and B',
    },
  },
  render: renderComponent,
};

/**
 * Story 6: Bordered Variant
 * Full borders for maximum definition
 */
export const BorderedVariant: Story = {
  name: '6. Bordered Variant',
  args: {
    columns: [
      {
        title: 'Basic',
        price: 'Free',
        cta: { text: 'Get Started', href: '#' },
      },
      {
        title: 'Pro',
        priceAmount: '$29',
        pricePeriod: '/mo',
        highlighted: true,
        badge: 'Popular',
        cta: { text: 'Start Trial', href: '#' },
      },
      {
        title: 'Business',
        priceAmount: '$99',
        pricePeriod: '/mo',
        cta: { text: 'Contact Us', href: '#' },
      },
    ],
    rows: [
      { feature: 'Users', values: ['1', '10', 'Unlimited'] },
      { feature: 'Storage', values: ['5 GB', '100 GB', 'Unlimited'] },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Support', values: ['Email', 'Priority', '24/7 Phone'] },
    ],
    variant: 'bordered',
  },
  render: renderComponent,
};

/**
 * Story 7: Striped Variant
 * Alternating row backgrounds
 */
export const StripedVariant: Story = {
  name: '7. Striped Variant',
  args: {
    columns: [
      {
        title: 'Starter',
        priceAmount: '$9',
        pricePeriod: '/mo',
        cta: { text: 'Sign Up', href: '#' },
      },
      {
        title: 'Professional',
        priceAmount: '$29',
        pricePeriod: '/mo',
        highlighted: true,
        badge: 'Best Value',
        cta: { text: 'Start Trial', href: '#' },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        cta: { text: 'Contact Sales', href: '#' },
      },
    ],
    rows: [
      { category: 'Core Features' },
      { feature: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
      { feature: 'Team Members', values: ['1', '10', 'Unlimited'] },
      { feature: 'Storage', values: ['10 GB', '100 GB', '1 TB'] },
      { category: 'Advanced' },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Custom Domain', values: [false, true, true] },
      { feature: 'White Label', values: [false, false, true] },
    ],
    variant: 'striped',
  },
  render: renderComponent,
};

/**
 * Story 8: Minimal Variant
 * Clean, borderless design
 */
export const MinimalVariant: Story = {
  name: '8. Minimal Variant',
  args: {
    columns: [
      {
        title: 'Free',
        price: '$0',
        cta: { text: 'Start Free', href: '#' },
      },
      {
        title: 'Pro',
        priceAmount: '$19',
        pricePeriod: '/mo',
        highlighted: true,
        cta: { text: 'Upgrade', href: '#' },
      },
      {
        title: 'Team',
        priceAmount: '$49',
        pricePeriod: '/mo',
        cta: { text: 'Contact Us', href: '#' },
      },
    ],
    rows: [
      { feature: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
      { feature: 'Team Members', values: ['1', '5', 'Unlimited'] },
      { feature: 'Support', values: ['Community', 'Email', 'Priority'] },
      { feature: 'API Access', values: [false, true, true] },
    ],
    variant: 'minimal',
  },
  render: renderComponent,
};

/**
 * Story 9: Mobile Cards Layout
 * Stacked cards on mobile
 */
export const MobileCards: Story = {
  name: '9. Mobile Cards Layout',
  args: {
    columns: [
      {
        title: 'Basic',
        price: 'Free',
        cta: { text: 'Start Free', href: '#' },
      },
      {
        title: 'Pro',
        priceAmount: '$29',
        pricePeriod: '/mo',
        highlighted: true,
        badge: 'Popular',
        cta: { text: 'Try Now', href: '#' },
      },
      {
        title: 'Business',
        priceAmount: '$99',
        pricePeriod: '/mo',
        cta: { text: 'Contact Us', href: '#' },
      },
    ],
    rows: [
      { feature: 'Users', values: ['1', '5', 'Unlimited'] },
      { feature: 'Storage', values: ['10 GB', '100 GB', 'Unlimited'] },
      { feature: 'Support', values: ['Email', 'Priority', '24/7 Phone'] },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Custom Domain', values: [false, true, true] },
    ],
    responsive: 'cards',
    variant: 'bordered',
  },
  render: renderComponent,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Story 10: Dark Mode
 * Table in dark mode
 */
export const DarkMode: Story = {
  name: '10. Dark Mode',
  args: {
    columns: [
      {
        title: 'Starter',
        priceAmount: '$19',
        pricePeriod: '/mo',
        description: 'For individuals',
        cta: { text: 'Get Started', href: '#' },
      },
      {
        title: 'Professional',
        priceAmount: '$49',
        pricePeriod: '/mo',
        description: 'For teams',
        highlighted: true,
        badge: 'Most Popular',
        cta: { text: 'Start Trial', href: '#' },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        description: 'For organizations',
        cta: { text: 'Contact Sales', href: '#' },
      },
    ],
    rows: [
      { category: 'Core Features' },
      { feature: 'Users', values: ['5', '25', 'Unlimited'] },
      { feature: 'Storage', values: ['50 GB', '500 GB', 'Unlimited'] },
      { feature: 'Projects', values: ['10', '100', 'Unlimited'] },
      { category: 'Advanced' },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Custom Domain', values: [true, true, true] },
      { feature: 'Priority Support', values: [false, true, true] },
      { feature: 'Advanced Analytics', values: [false, false, true] },
    ],
    variant: 'bordered',
  },
  render: renderComponent,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', 'dark');
      wrapper.innerHTML = story();
      return wrapper;
    },
  ],
};

/**
 * Story 11: Long Feature List
 * Table with many features grouped by categories
 */
export const LongFeatureList: Story = {
  name: '11. Long Feature List',
  args: {
    columns: [
      {
        title: 'Basic',
        priceAmount: '$9',
        pricePeriod: '/mo',
        cta: { text: 'Start Free', href: '#' },
      },
      {
        title: 'Pro',
        priceAmount: '$29',
        pricePeriod: '/mo',
        highlighted: true,
        badge: 'Best Value',
        cta: { text: 'Start Trial', href: '#' },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        cta: { text: 'Contact Us', href: '#' },
      },
    ],
    rows: [
      { category: 'Team & Collaboration' },
      { feature: 'Team Members', values: ['1', '10', 'Unlimited'] },
      { feature: 'Guest Access', values: [false, true, true] },
      { feature: 'Team Permissions', values: [false, true, true] },
      { feature: 'Shared Workspaces', values: [false, true, true] },
      { category: 'Storage & Files' },
      { feature: 'Storage Space', values: ['10 GB', '100 GB', 'Unlimited'] },
      { feature: 'File Upload Size', values: ['10 MB', '100 MB', '1 GB'] },
      { feature: 'Version History', values: ['7 days', '30 days', 'Unlimited'] },
      { feature: 'File Recovery', values: [false, true, true] },
      { category: 'Integrations' },
      { feature: 'Basic Integrations', values: [true, true, true] },
      { feature: 'Advanced Integrations', values: [false, true, true] },
      { feature: 'API Access', values: [false, true, true] },
      { feature: 'Webhooks', values: [false, false, true] },
      { category: 'Security' },
      { feature: 'SSL Certificate', values: [true, true, true] },
      { feature: 'Two-Factor Auth', values: [false, true, true] },
      { feature: 'SSO (SAML)', values: [false, false, true] },
      { feature: 'Advanced Permissions', values: [false, false, true] },
      { category: 'Support' },
      { feature: 'Email Support', values: [true, true, true] },
      { feature: 'Priority Support', values: [false, true, true] },
      { feature: 'Phone Support', values: [false, false, true] },
      { feature: 'Dedicated Account Manager', values: [false, false, true] },
    ],
    variant: 'striped',
  },
  render: renderComponent,
};

/**
 * Story 12: Tooltips Example
 * Features with tooltip explanations
 */
export const WithTooltips: Story = {
  name: '12. With Tooltips',
  args: {
    columns: [
      {
        title: 'Starter',
        priceAmount: '$19',
        pricePeriod: '/mo',
        cta: { text: 'Get Started', href: '#' },
      },
      {
        title: 'Business',
        priceAmount: '$49',
        pricePeriod: '/mo',
        highlighted: true,
        badge: 'Recommended',
        cta: { text: 'Start Trial', href: '#' },
      },
      {
        title: 'Enterprise',
        price: 'Custom',
        cta: { text: 'Contact Us', href: '#' },
      },
    ],
    rows: [
      {
        feature: 'API Rate Limits',
        values: ['1,000/hr', '10,000/hr', 'Unlimited'],
        tooltip: 'Number of API calls allowed per hour',
      },
      {
        feature: 'Webhook Endpoints',
        values: ['5', '50', 'Unlimited'],
        tooltip: 'Number of webhook URLs you can configure',
      },
      {
        feature: 'SSO Integration',
        values: [false, false, true],
        tooltip: 'Single Sign-On with SAML 2.0 support',
      },
      {
        feature: 'Data Retention',
        values: ['30 days', '1 year', 'Unlimited'],
        tooltip: 'How long we keep your historical data',
      },
      {
        feature: 'SLA Uptime',
        values: ['99%', '99.9%', '99.99%'],
        tooltip: 'Guaranteed service availability percentage',
      },
    ],
    variant: 'bordered',
  },
  render: renderComponent,
};
