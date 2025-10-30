// components/molecules/stat/stat.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';


/**
 * Stat Molecule Stories
 *
 * Statistical data display with large numbers, labels, icons, and trend indicators.
 * Used in hero sections, feature areas, and dashboards for metrics and social proof.
 */

const meta: Meta = {
  title: 'Molecules/Stat',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The statistic value to display',
    },
    label: {
      control: 'text',
      description: 'Label describing what the statistic represents',
    },
    variant: {
      control: 'select',
      options: ['default', 'inline', 'card', 'featured'],
      description: 'Style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the stat',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'gradient'],
      description: 'Color variant for the number',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Displays statistical data with prominent numbers, optional icons, and trend indicators. Perfect for showcasing metrics, KPIs, and social proof in marketing pages.',
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

const renderComponent = (props: any) => {
  const {
    value = '',
    label = '',
    prefix = '',
    suffix = '',
    icon = '',
    trend = null,
    comparison = '',
    variant = 'default',
    size = 'md',
    color = 'default',
    countUp = false,
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = ['stat'];
  if (variant) {
    variant.split(' ').forEach((v: string) => classList.push(`stat-${v}`));
  }
  if (size && size !== 'md') classList.push(`stat-${size}`);
  if (color && color !== 'default') classList.push(`stat-${color}`);
  if (className) classList.push(className);

  const classStr = classList.join(' ');

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (id) attrs += ` id="${id}"`;
  if (a11y.role) attrs += ` role="${a11y.role}"`;
  if (a11y.ariaLabel) attrs += ` aria-label="${a11y.ariaLabel}"`;
  if (a11y.ariaDescribedBy) attrs += ` aria-describedby="${a11y.ariaDescribedBy}"`;

  for (const [key, val] of Object.entries(attributes)) {
    attrs += ` ${key}="${val}"`;
  }

  // Icon
  let iconHtml = '';
  if (icon) {
    const iconSize = (size === 'xl' || size === 'lg') ? 'lg' : 'lg';
    iconHtml = `<div class="stat-icon">
      <span class="icon icon-${iconSize}" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </span>
    </div>`;
  }

  // Trend
  let trendHtml = '';
  if (trend) {
    const trendDirection = trend.direction?.toLowerCase() || 'neutral';
    const trendIcon = trendDirection === 'up' ? 'M12 19V5M5 12l7-7 7 7' : (trendDirection === 'down' ? 'M12 5v14M5 12l7 7 7-7' : 'M5 12h14');
    trendHtml = `<div class="stat-trend stat-trend-${trendDirection}">
      <span class="stat-trend-icon">
        <span class="icon icon-sm" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="${trendIcon}" />
          </svg>
        </span>
      </span>
      ${trend.value ? `<span class="stat-trend-value">${trend.value}</span>` : ''}
      ${trend.label ? `<span class="stat-trend-label">${trend.label}</span>` : ''}
    </div>`;
  }

  return `<div ${attrs}>
    ${iconHtml}
    <div class="stat-value-wrapper">
      ${prefix ? `<span class="stat-prefix">${prefix}</span>` : ''}
      <span class="stat-value" ${countUp ? `data-count-to="${value}"` : ''}>${value}</span>
      ${suffix ? `<span class="stat-suffix">${suffix}</span>` : ''}
    </div>
    ${label ? `<div class="stat-label">${label}</div>` : ''}
    ${trendHtml}
    ${comparison ? `<div class="stat-comparison">${comparison}</div>` : ''}
  </div>`;
};

/**
 * Basic stat with just a number and label
 */
export const Default: Story = {
  args: {
    value: '10,000+',
    label: 'Happy Customers',
  },
  render: renderComponent,
};

/**
 * Stat with icon for visual interest
 */
export const WithIcon: Story = {
  args: {
    value: '99.9',
    suffix: '%',
    label: 'Uptime Guarantee',
    icon: 'shield',
  },
  render: renderComponent,
};

/**
 * Stat showing positive growth trend
 */
export const TrendUp: Story = {
  args: {
    value: '2.4M',
    prefix: '$',
    label: 'Annual Revenue',
    icon: 'trophy',
    trend: {
      direction: 'up',
      value: '15%',
      label: 'vs last year',
    },
  },
  render: renderComponent,
};

/**
 * Stat showing negative trend
 */
export const TrendDown: Story = {
  args: {
    value: '48',
    suffix: 'ms',
    label: 'Response Time',
    icon: 'clock',
    trend: {
      direction: 'down',
      value: '12%',
      label: 'vs last month',
    },
    color: 'success',
  },
  render: renderComponent,
};

/**
 * Stat with comparison text for competitive positioning
 */
export const WithComparison: Story = {
  args: {
    value: '2x',
    label: 'Performance Boost',
    icon: 'star',
    comparison: '2x faster than competitors',
    color: 'primary',
  },
  render: renderComponent,
};

/**
 * Elevated card variant with shadow
 */
export const CardVariant: Story = {
  args: {
    value: '24/7',
    label: 'Customer Support',
    icon: 'phone',
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * Featured stat with accent background
 */
export const FeaturedVariant: Story = {
  args: {
    value: '500K+',
    label: 'Active Users',
    icon: 'user',
    variant: 'featured',
    size: 'lg',
    trend: {
      direction: 'up',
      value: '23%',
      label: 'this quarter',
    },
  },
  render: renderComponent,
};

/**
 * Combined card and featured styles
 */
export const CardFeatured: Story = {
  args: {
    value: '99.99',
    suffix: '%',
    label: 'Reliability Score',
    icon: 'verified',
    variant: 'card featured',
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    value: '156',
    label: 'Countries',
    icon: 'globe',
    size: 'sm',
  },
  render: renderComponent,
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    value: '1M+',
    label: 'Downloads',
    icon: 'download',
    size: 'lg',
    color: 'primary',
  },
  render: renderComponent,
};

/**
 * Extra large hero size
 */
export const ExtraLargeSize: Story = {
  args: {
    value: '10',
    suffix: 'B+',
    prefix: '$',
    label: 'Market Valuation',
    size: 'xl',
    color: 'gradient',
  },
  render: renderComponent,
};

/**
 * Inline horizontal layout
 */
export const InlineVariant: Story = {
  args: {
    value: '4.9',
    suffix: '/5',
    label: 'Customer Rating',
    icon: 'star',
    variant: 'inline',
  },
  render: renderComponent,
};

/**
 * Horizontal group of 3 stats (common hero pattern)
 */
export const HeroStatGroup: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div class="stat-group stat-group-3">
        {{ stat({ value: '10K+', label: 'Active Users', icon: 'user', color: 'primary' }) }}
        {{ stat({ value: '99.9%', label: 'Uptime', icon: 'shield', color: 'success' }) }}
        {{ stat({ value: '24/7', label: 'Support', icon: 'phone', color: 'secondary' }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * Stat group with dividers (Stripe-style)
 */
export const StatGroupDividers: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div class="stat-group stat-group-4 stat-group-dividers">
        {{ stat({ value: 'Millions', label: 'Companies', size: 'sm' }) }}
        {{ stat({ value: '135+', label: 'Countries', size: 'sm' }) }}
        {{ stat({ value: '99.99%', label: 'Uptime', size: 'sm' }) }}
        {{ stat({ value: '24/7', label: 'Support', size: 'sm' }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * Marketing dashboard stats with trends
 */
export const DashboardStats: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div class="stat-group stat-group-3">
        {{ stat({
          value: '245K',
          label: 'Total Users',
          icon: 'user',
          variant: 'card',
          trend: { direction: 'up', value: '12%', label: 'vs last month' }
        }) }}
        {{ stat({
          value: '98.7',
          suffix: '%',
          label: 'Customer Satisfaction',
          icon: 'heart',
          variant: 'card',
          trend: { direction: 'up', value: '2.3%', label: 'vs last month' }
        }) }}
        {{ stat({
          value: '1.2M',
          prefix: '$',
          label: 'Monthly Revenue',
          icon: 'trophy',
          variant: 'card',
          trend: { direction: 'up', value: '18%', label: 'vs last month' }
        }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * All color variants showcase
 */
export const ColorVariants: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div class="stat-group">
        {{ stat({ value: '10K+', label: 'Default Color', variant: 'card' }) }}
        {{ stat({ value: '10K+', label: 'Primary Color', variant: 'card', color: 'primary' }) }}
        {{ stat({ value: '10K+', label: 'Secondary Color', variant: 'card', color: 'secondary' }) }}
        {{ stat({ value: '10K+', label: 'Success Color', variant: 'card', color: 'success' }) }}
        {{ stat({ value: '10K+', label: 'Gradient Color', variant: 'card', color: 'gradient' }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * All size variants showcase
 */
export const SizeVariants: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div class="stat-group">
        {{ stat({ value: '10K+', label: 'Small', icon: 'star', variant: 'card', size: 'sm' }) }}
        {{ stat({ value: '10K+', label: 'Medium (Default)', icon: 'star', variant: 'card', size: 'md' }) }}
        {{ stat({ value: '10K+', label: 'Large', icon: 'star', variant: 'card', size: 'lg' }) }}
        {{ stat({ value: '10K+', label: 'Extra Large', icon: 'star', variant: 'card', size: 'xl' }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * Real-world marketing example (SaaS landing page)
 */
export const SaaSLandingPage: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "molecules/stat/stat.njk" import stat %}
      <div style="padding: 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="stat-group stat-group-3">
          {{ stat({
            value: '500K+',
            label: 'Developers Trust Us',
            icon: 'user',
            size: 'lg',
            variant: 'card',
            trend: { direction: 'up', value: '23%', label: 'this quarter' }
          }) }}
          {{ stat({
            value: '99.99',
            suffix: '%',
            label: 'Uptime SLA',
            icon: 'shield',
            size: 'lg',
            variant: 'card',
            comparison: 'Best in class reliability'
          }) }}
          {{ stat({
            value: '<50',
            suffix: 'ms',
            label: 'Response Time',
            icon: 'clock',
            size: 'lg',
            variant: 'card',
            trend: { direction: 'down', value: '15%', label: 'faster than before' }
          }) }}
        </div>
      </div>
    `,
      {}
    );
  },
};

/**
 * Dark mode preview
 */
export const DarkMode: Story = {
  args: {
    value: '1.2M',
    prefix: '$',
    label: 'Annual Revenue',
    icon: 'trophy',
    variant: 'card',
    size: 'lg',
    trend: {
      direction: 'up',
      value: '18%',
      label: 'vs last year',
    },
  },
  render: renderComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (story) => `<div data-theme="dark">${story()}</div>`,
  ],
};
