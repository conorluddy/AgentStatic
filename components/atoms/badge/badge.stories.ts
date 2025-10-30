// components/atoms/badge/badge.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * Badge Component Stories
 *
 * Small inline labels for status, notifications, categories, and marketing callouts.
 * Perfect for highlighting urgency, social proof, and product features on brochureware sites.
 *
 * Features:
 * - 7 color variants (default, primary, secondary, success, warning, error, info)
 * - 3 sizes (sm, md, lg)
 * - 3 visual styles (filled, outline, subtle)
 * - 2 shape variants (rounded, pill)
 * - Icon support
 * - Dismissible variant with close button
 * - Notification badge (circular with count)
 * - Status dot indicator
 * - Full dark mode support
 * - WCAG AA accessible
 */

// Configure Nunjucks
const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

// Load the component template
const templatePath = path.join(__dirname, 'badge.njk');
const template = fs.readFileSync(templatePath, 'utf-8');

// Component metadata
const meta: Meta = {
  title: 'Atoms/Badge',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Badge text content',
      defaultValue: 'Badge',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    style: {
      control: 'select',
      options: ['filled', 'outline', 'subtle'],
      description: 'Visual style variant',
      defaultValue: 'filled',
    },
    shape: {
      control: 'select',
      options: ['', 'rounded', 'pill'],
      description: 'Shape variant',
    },
    icon: {
      control: 'text',
      description: 'Icon HTML/SVG',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
      defaultValue: false,
    },
    notification: {
      control: 'boolean',
      description: 'Render as notification badge',
      defaultValue: false,
    },
    dot: {
      control: 'boolean',
      description: 'Render as status dot',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Versatile inline label component with extensive variant support for brochureware marketing. Displays status indicators, promotional messages, social proof, trust signals, and notification counts.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
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
const renderComponent = (args: any) => {
  return env.renderString(
    `
    {% from "atoms/badge/badge.njk" import badge %}
    {{ badge(props) }}
  `,
    { props: args }
  );
};

/**
 * Default badge with neutral gray styling
 */
export const Default: Story = {
  args: {
    text: 'Badge',
    variant: 'default',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Primary variant using brand blue color
 */
export const Primary: Story = {
  args: {
    text: 'Primary',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Secondary variant using brand green color
 */
export const Secondary: Story = {
  args: {
    text: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Success variant for positive states
 */
export const Success: Story = {
  args: {
    text: 'Success',
    variant: 'success',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Warning variant for cautions
 */
export const Warning: Story = {
  args: {
    text: 'Warning',
    variant: 'warning',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Error variant for alerts and urgency
 */
export const Error: Story = {
  args: {
    text: 'Error',
    variant: 'error',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Info variant for informational messages
 */
export const Info: Story = {
  args: {
    text: 'Info',
    variant: 'info',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Small size variant (10px)
 */
export const Small: Story = {
  args: {
    text: 'Small',
    variant: 'primary',
    size: 'sm',
  },
  render: renderComponent,
};

/**
 * Medium size variant (11px - default)
 */
export const Medium: Story = {
  args: {
    text: 'Medium',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Large size variant (12px)
 */
export const Large: Story = {
  args: {
    text: 'Large',
    variant: 'primary',
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * Outline style with transparent background
 */
export const Outline: Story = {
  args: {
    text: 'Outline',
    variant: 'primary',
    size: 'md',
    style: 'outline',
  },
  render: renderComponent,
};

/**
 * Subtle style with light background
 */
export const Subtle: Story = {
  args: {
    text: 'Subtle',
    variant: 'primary',
    size: 'md',
    style: 'subtle',
  },
  render: renderComponent,
};

/**
 * Rounded shape with medium border radius
 */
export const Rounded: Story = {
  args: {
    text: 'Rounded',
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
  },
  render: renderComponent,
};

/**
 * Pill shape with full border radius
 */
export const Pill: Story = {
  args: {
    text: 'Pill',
    variant: 'primary',
    size: 'md',
    shape: 'pill',
  },
  render: renderComponent,
};

/**
 * Badge with icon (checkmark for verification)
 */
export const WithIcon: Story = {
  args: {
    text: 'Verified',
    variant: 'success',
    size: 'md',
    icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  render: renderComponent,
};

/**
 * Dismissible badge with close button
 */
export const Dismissible: Story = {
  args: {
    text: 'Dismissible',
    variant: 'secondary',
    size: 'md',
    dismissible: true,
  },
  render: renderComponent,
};

/**
 * Notification badge (circular with number)
 */
export const Notification: Story = {
  args: {
    text: '5',
    notification: true,
    size: 'md',
    a11y: {
      ariaLabel: '5 unread notifications',
    },
  },
  render: renderComponent,
};

/**
 * Status dot indicator (online/offline)
 */
export const StatusDot: Story = {
  args: {
    dot: true,
    variant: 'success',
    size: 'md',
    a11y: {
      ariaLabel: 'Online',
    },
  },
  render: renderComponent,
};

/**
 * All color variants comparison
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Default', variant: 'default', size: 'md' })}
        ${renderComponent({ text: 'Primary', variant: 'primary', size: 'md' })}
        ${renderComponent({ text: 'Secondary', variant: 'secondary', size: 'md' })}
        ${renderComponent({ text: 'Success', variant: 'success', size: 'md' })}
        ${renderComponent({ text: 'Warning', variant: 'warning', size: 'md' })}
        ${renderComponent({ text: 'Error', variant: 'error', size: 'md' })}
        ${renderComponent({ text: 'Info', variant: 'info', size: 'md' })}
      </div>
    `;
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        ${renderComponent({ text: 'Small', variant: 'primary', size: 'sm' })}
        ${renderComponent({ text: 'Medium', variant: 'primary', size: 'md' })}
        ${renderComponent({ text: 'Large', variant: 'primary', size: 'lg' })}
      </div>
    `;
  },
};

/**
 * All visual styles comparison
 */
export const AllStyles: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Filled', variant: 'primary', size: 'md', style: 'filled' })}
        ${renderComponent({ text: 'Outline', variant: 'primary', size: 'md', style: 'outline' })}
        ${renderComponent({ text: 'Subtle', variant: 'primary', size: 'md', style: 'subtle' })}
      </div>
    `;
  },
};

/**
 * Marketing badges for brochureware sites
 */
export const MarketingBadges: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
          <h4 style="font-size: 0.875rem; font-weight: 600; margin: 0; color: #374151;">Promotional</h4>
          ${renderComponent({ text: '50% OFF', variant: 'error', size: 'lg', shape: 'pill' })}
          ${renderComponent({ text: 'SALE', variant: 'error', size: 'md', shape: 'pill' })}
          ${renderComponent({ text: 'NEW', variant: 'info', size: 'md' })}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
          <h4 style="font-size: 0.875rem; font-weight: 600; margin: 0; color: #374151;">Social Proof</h4>
          ${renderComponent({ text: 'BESTSELLER', variant: 'primary', size: 'md', style: 'subtle' })}
          ${renderComponent({ text: 'POPULAR', variant: 'primary', size: 'md', style: 'subtle' })}
          ${renderComponent({ text: 'TRENDING', variant: 'secondary', size: 'md', style: 'subtle' })}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
          <h4 style="font-size: 0.875rem; font-weight: 600; margin: 0; color: #374151;">Urgency</h4>
          ${renderComponent({ text: 'LIMITED', variant: 'warning', size: 'md' })}
          ${renderComponent({ text: 'ONLY 3 LEFT', variant: 'warning', size: 'sm' })}
          ${renderComponent({ text: 'LAST CHANCE', variant: 'error', size: 'md' })}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
          <h4 style="font-size: 0.875rem; font-weight: 600; margin: 0; color: #374151;">Trust</h4>
          ${renderComponent({
            text: 'VERIFIED',
            variant: 'success',
            size: 'md',
            icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          })}
          ${renderComponent({ text: 'SECURE', variant: 'success', size: 'md', style: 'subtle' })}
          ${renderComponent({ text: 'GUARANTEED', variant: 'success', size: 'sm' })}
        </div>
      </div>
    `;
  },
};

/**
 * Status indicators with dots
 */
export const StatusIndicators: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          ${renderComponent({
            dot: true,
            variant: 'success',
            size: 'md',
            a11y: { ariaLabel: 'Online' }
          })}
          <span style="font-size: 0.875rem;">Online</span>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          ${renderComponent({
            dot: true,
            variant: 'warning',
            size: 'md',
            a11y: { ariaLabel: 'Away' }
          })}
          <span style="font-size: 0.875rem;">Away</span>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          ${renderComponent({
            dot: true,
            variant: 'error',
            size: 'md',
            a11y: { ariaLabel: 'Offline' }
          })}
          <span style="font-size: 0.875rem;">Offline</span>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          ${renderComponent({
            dot: true,
            variant: 'default',
            size: 'md',
            a11y: { ariaLabel: 'Unknown' }
          })}
          <span style="font-size: 0.875rem;">Unknown</span>
        </div>
      </div>
    `;
  },
};

/**
 * Notification badges with counts
 */
export const NotificationBadges: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({
          text: '1',
          notification: true,
          size: 'sm',
          a11y: { ariaLabel: '1 notification' }
        })}
        ${renderComponent({
          text: '5',
          notification: true,
          size: 'md',
          a11y: { ariaLabel: '5 notifications' }
        })}
        ${renderComponent({
          text: '12',
          notification: true,
          size: 'lg',
          a11y: { ariaLabel: '12 notifications' }
        })}
        ${renderComponent({
          text: '99+',
          notification: true,
          size: 'lg',
          a11y: { ariaLabel: '99 or more notifications' }
        })}
      </div>
    `;
  },
};

/**
 * Product card example with badges
 */
export const ProductCardExample: Story = {
  render: () => {
    return `
      <div style="max-width: 300px; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; background: white;">
        <div style="position: relative; margin-bottom: 1rem;">
          <div style="aspect-ratio: 16/9; background: #f3f4f6; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
            Product Image
          </div>
          <div style="position: absolute; top: 0.5rem; left: 0.5rem; display: flex; gap: 0.25rem; flex-direction: column; align-items: flex-start;">
            ${renderComponent({ text: '50% OFF', variant: 'error', size: 'sm', shape: 'pill' })}
            ${renderComponent({ text: 'NEW', variant: 'info', size: 'sm' })}
          </div>
          <div style="position: absolute; top: 0.5rem; right: 0.5rem;">
            ${renderComponent({ text: 'BESTSELLER', variant: 'primary', size: 'sm', style: 'subtle' })}
          </div>
        </div>
        <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Premium Product</h3>
        <div style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
          ${renderComponent({
            text: 'VERIFIED',
            variant: 'success',
            size: 'sm',
            icon: '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          })}
          ${renderComponent({ text: 'FREE SHIPPING', variant: 'secondary', size: 'sm', style: 'outline' })}
          ${renderComponent({ text: 'ONLY 3 LEFT', variant: 'warning', size: 'sm' })}
        </div>
        <div style="display: flex; align-items: baseline; gap: 0.5rem;">
          <span style="font-size: 1.25rem; font-weight: 700; color: #111827;">$49.99</span>
          <span style="font-size: 0.875rem; text-decoration: line-through; color: #9ca3af;">$99.99</span>
        </div>
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  render: () => {
    return `
      <div data-theme="dark" style="padding: 2rem; background-color: #1f2937; border-radius: 0.5rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${renderComponent({ text: 'Default', variant: 'default', size: 'md' })}
          ${renderComponent({ text: 'Primary', variant: 'primary', size: 'md' })}
          ${renderComponent({ text: 'Secondary', variant: 'secondary', size: 'md' })}
          ${renderComponent({ text: 'Success', variant: 'success', size: 'md' })}
          ${renderComponent({ text: 'Warning', variant: 'warning', size: 'md' })}
          ${renderComponent({ text: 'Error', variant: 'error', size: 'md' })}
          ${renderComponent({ text: 'Info', variant: 'info', size: 'md' })}
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${renderComponent({ text: 'Filled', variant: 'primary', size: 'md', style: 'filled' })}
          ${renderComponent({ text: 'Outline', variant: 'primary', size: 'md', style: 'outline' })}
          ${renderComponent({ text: 'Subtle', variant: 'primary', size: 'md', style: 'subtle' })}
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${renderComponent({ text: '50% OFF', variant: 'error', size: 'md', shape: 'pill' })}
          ${renderComponent({ text: 'POPULAR', variant: 'primary', size: 'md', style: 'subtle' })}
          ${renderComponent({
            text: 'VERIFIED',
            variant: 'success',
            size: 'md',
            icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          })}
        </div>
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
