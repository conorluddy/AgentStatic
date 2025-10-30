// components/molecules/feature-list/feature-list.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import './feature-list.css';

interface FeatureListProps {
  items: Array<{
    text: string;
    icon?: string;
    included?: boolean;
  }>;
  iconPosition?: 'left' | 'top';
  density?: 'compact' | 'normal' | 'spacious';
  columns?: 1 | 2;
  defaultIcon?: string;
  className?: string;
  id?: string;
  a11y?: {
    ariaLabel?: string;
  };
}

const meta: Meta<FeatureListProps> = {
  title: 'Molecules/Feature List',
  tags: ['autodocs'],
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['left', 'top'],
      description: 'Position of icons relative to text',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    density: {
      control: 'select',
      options: ['compact', 'normal', 'spacious'],
      description: 'Spacing density between items',
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
    columns: {
      control: 'select',
      options: [1, 2],
      description: 'Number of columns (responsive)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    defaultIcon: {
      control: 'text',
      description: 'Default icon for items without explicit icon',
      table: {
        defaultValue: { summary: 'check' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'List of features with icons and text. Used in pricing tables, product descriptions, and feature comparison sections. Supports multiple layout options, density variants, and mixed check/cross icons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FeatureListProps>;

const renderFeatureList = (props: FeatureListProps) => {
  const {
    items = [],
    iconPosition = 'left',
    density = 'normal',
    columns = 1,
    defaultIcon = 'check',
    className = '',
    id = '',
    a11y = {},
  } = props;

  const classList = ['feature-list'];
  if (iconPosition === 'top') classList.push('feature-list-top');
  if (density === 'compact') classList.push('feature-list-compact');
  else if (density === 'spacious') classList.push('feature-list-spacious');
  if (columns === 2) classList.push('feature-list-two-column');
  if (className) classList.push(className);

  const listItems = items.map(item => {
    const icon = item.icon || defaultIcon;
    const included = item.included !== undefined ? item.included : true;
    const itemClasses = ['feature-list-item'];
    if (included) itemClasses.push('feature-list-item-included');
    else itemClasses.push('feature-list-item-not-included');

    const iconColor = included && (icon === 'check' || icon === 'verified') ? 'success' : (!included && icon === 'x' ? 'error' : '');

    return `<li class="${itemClasses.join(' ')}">
      <span class="feature-list-icon">
        <span class="icon icon-sm ${iconColor ? `icon-${iconColor}` : ''}" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="${icon === 'check' ? 'M20 6L9 17l-5-5' : (icon === 'x' ? 'M18 6L6 18M6 6l12 12' : 'M20 6L9 17l-5-5')}" />
          </svg>
        </span>
      </span>
      <span class="feature-list-text">
        <span class="text">${item.text}</span>
      </span>
    </li>`;
  }).join('');

  return `<ul class="${classList.join(' ')}" ${id ? `id="${id}"` : ''} ${a11y.ariaLabel ? `aria-label="${a11y.ariaLabel}"` : ''}>
    ${listItems}
  </ul>`;
};

// Default: Basic feature list with checkmarks
export const Default: Story = {
  args: {
    items: [
      { text: 'Unlimited users' },
      { text: '24/7 customer support' },
      { text: 'Advanced analytics' },
      { text: 'Custom branding' },
    ],
  },
  render: renderFeatureList,
};

// Pricing table features with included/excluded items
export const PricingFeatures: Story = {
  args: {
    items: [
      { text: 'Unlimited projects', icon: 'check' },
      { text: 'Priority support', icon: 'check' },
      { text: 'Advanced reporting', icon: 'check' },
      { text: 'Custom domain', icon: 'x', included: false },
      { text: 'White-label branding', icon: 'x', included: false },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Feature list showing included and excluded features, commonly used in pricing comparisons. Excluded items are styled with muted text and red X icons.',
      },
    },
  },
};

// Two-column layout for long lists
export const TwoColumn: Story = {
  args: {
    columns: 2,
    density: 'compact',
    items: [
      { text: 'SSL certificate' },
      { text: 'CDN included' },
      { text: '99.9% uptime' },
      { text: 'Daily backups' },
      { text: 'Email support' },
      { text: 'API access' },
      { text: 'Webhook integrations' },
      { text: 'Real-time analytics' },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Space-efficient two-column layout for long feature lists. Automatically collapses to single column on mobile devices.',
      },
    },
  },
};

// Compact density
export const Compact: Story = {
  args: {
    density: 'compact',
    items: [
      { text: 'Fast setup in minutes' },
      { text: 'No credit card required' },
      { text: 'Cancel anytime' },
      { text: 'Money-back guarantee' },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Compact density with reduced spacing, useful for sidebars or cards with limited space.',
      },
    },
  },
};

// Spacious density
export const Spacious: Story = {
  args: {
    density: 'spacious',
    items: [
      { text: 'Enterprise-grade security' },
      { text: 'Dedicated account manager' },
      { text: 'Custom SLA agreements' },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Spacious density with increased spacing, useful for hero sections or feature highlights.',
      },
    },
  },
};

// Top-aligned icons for longer descriptions
export const TopAlignedIcons: Story = {
  args: {
    iconPosition: 'top',
    density: 'spacious',
    items: [
      {
        text: 'Enterprise-grade security with end-to-end encryption and SOC 2 compliance',
      },
      {
        text: '24/7 dedicated support team with guaranteed 1-hour response time',
      },
      {
        text: 'Unlimited storage and bandwidth for all your content and assets',
      },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Icons positioned above text, ideal for longer feature descriptions or marketing copy.',
      },
    },
  },
};

// Custom icons for product benefits
export const CustomIcons: Story = {
  args: {
    defaultIcon: 'star',
    items: [
      { text: 'Award-winning customer service', icon: 'trophy' },
      { text: 'Trusted by 10,000+ businesses', icon: 'shield' },
      { text: '30-day money-back guarantee', icon: 'verified' },
      { text: 'Free lifetime updates', icon: 'gift' },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Custom icons for each feature item to match the message and create visual interest.',
      },
    },
  },
};

// Comparison list showing feature availability
export const ComparisonList: Story = {
  args: {
    items: [
      { text: 'Core features', icon: 'check' },
      { text: 'Email support', icon: 'check' },
      { text: 'Basic reporting', icon: 'check' },
      { text: 'Priority support', icon: 'x', included: false },
      { text: 'Advanced analytics', icon: 'x', included: false },
      { text: 'Custom integrations', icon: 'x', included: false },
    ],
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Comparison list showing which features are included vs. excluded, perfect for plan comparison tables.',
      },
    },
  },
};

// Dark mode example
export const DarkMode: Story = {
  args: {
    items: [
      { text: 'All core features', icon: 'check' },
      { text: 'Advanced reporting', icon: 'check' },
      { text: 'Priority support', icon: 'check' },
      { text: 'Enterprise SSO', icon: 'x', included: false },
    ],
  },
  render: renderFeatureList,
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Feature list in dark mode with proper contrast for text and icons.',
      },
    },
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

// Accessibility example with aria-label
export const WithAriaLabel: Story = {
  args: {
    items: [
      { text: 'Unlimited storage' },
      { text: 'Team collaboration' },
      { text: 'Version history' },
    ],
    a11y: {
      ariaLabel: 'Premium plan features',
    },
  },
  render: renderFeatureList,
  parameters: {
    docs: {
      description: {
        story:
          'Feature list with accessible label for screen readers, helpful when multiple lists exist on the same page.',
      },
    },
  },
};

// Marketing example: Product page features
export const ProductPageExample: Story = {
  args: {
    columns: 2,
    density: 'normal',
    items: [
      { text: 'Lightning-fast performance' },
      { text: 'Mobile-optimized design' },
      { text: 'SEO-friendly structure' },
      { text: 'Built-in analytics' },
      { text: 'Automatic backups' },
      { text: 'SSL security included' },
      { text: '99.99% uptime SLA' },
      { text: 'Global CDN delivery' },
    ],
  },
  render: (args) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: var(--color-surface); border-radius: var(--radius-lg);">
        ${renderFeatureList(args)}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example: Product page feature list in a styled container.',
      },
    },
  },
};

// Marketing example: Pricing card features
export const PricingCardExample: Story = {
  args: {
    density: 'compact',
    items: [
      { text: 'Up to 10 projects', icon: 'check' },
      { text: '5GB storage', icon: 'check' },
      { text: 'Email support', icon: 'check' },
      { text: 'Basic analytics', icon: 'check' },
      { text: 'Team collaboration', icon: 'x', included: false },
      { text: 'Priority support', icon: 'x', included: false },
    ],
  },
  render: (args) => {
    return `
      <div style="max-width: 350px; padding: 1.5rem; background: var(--color-background); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
        <h3 style="margin: 0 0 1rem 0; font-size: var(--font-size-xl); font-weight: 600;">Starter Plan</h3>
        <div style="margin-bottom: 1.5rem;">
          <span style="font-size: var(--font-size-3xl); font-weight: 700;">$29</span>
          <span style="color: var(--color-text-muted);">/month</span>
        </div>
        ${renderFeatureList(args)}
        <button style="width: 100%; margin-top: 1.5rem; padding: 0.75rem; background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;">
          Get Started
        </button>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example: Feature list inside a pricing card with heading, price, and CTA button.',
      },
    },
  },
};
