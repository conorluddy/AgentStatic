// components/atoms/button/button.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * Button Component Stories
 *
 * Interactive button atom for actions and navigation with multiple variants,
 * sizes, states, and icon support. Supports both button and link rendering.
 */

// Configure Nunjucks
const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: false, // Allow HTML in iconStart/iconEnd
  trimBlocks: true,
  lstripBlocks: true,
});

// Load the component template
const templatePath = path.join(__dirname, 'button.njk');
const template = fs.readFileSync(templatePath, 'utf-8');

// Simple arrow icons for demos
const arrowRight = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0L6.59 1.41L12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z"/></svg>';
const arrowUpRight = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 2H6v2h5.59L2 13.59 3.41 15 13 5.41V11h2V3a1 1 0 0 0-1-1z"/></svg>';
const downloadIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12L3 7l1.41-1.41L7 9.17V0h2v9.17l2.59-2.58L13 8l-5 5zm-7 2v2h14v-2H1z"/></svg>';
const closeIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.59 1.41L8 8l6.59 6.59L13.17 16 6.58 9.41 0 16l1.41-1.41L8 8 1.41 1.41 0 0l6.59 6.59L13.17 0z"/></svg>';

// Component metadata
const meta: Meta = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button label text',
      defaultValue: 'Button',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    href: {
      control: 'text',
      description: 'If provided, renders as link',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      defaultValue: 'button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
      defaultValue: false,
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only variant',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full-width button',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Versatile button component with 4 variants (primary, secondary, ghost, danger), 3 sizes (sm, md, lg), icon support, loading states, and link rendering. Meets WCAG AA standards with 44x44px minimum touch targets.',
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
            id: 'button-name',
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
    {% from "atoms/button/button.njk" import button %}
    {{ button(props) }}
  `,
    { props: args }
  );
};

/**
 * Default primary button - high emphasis CTA
 */
export const Default: Story = {
  args: {
    text: 'Get Started',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Primary variant - high emphasis brand color
 */
export const Primary: Story = {
  args: {
    text: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Secondary variant - medium emphasis neutral color
 */
export const Secondary: Story = {
  args: {
    text: 'Secondary Action',
    variant: 'secondary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Ghost variant - low emphasis transparent background
 */
export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Danger variant - destructive actions
 */
export const Danger: Story = {
  args: {
    text: 'Delete Account',
    variant: 'danger',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Small size (32px height)
 */
export const Small: Story = {
  args: {
    text: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
  render: renderComponent,
};

/**
 * Medium size (44px height - default)
 */
export const Medium: Story = {
  args: {
    text: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Large size (56px height)
 */
export const Large: Story = {
  args: {
    text: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * Button with icon at start
 */
export const WithIconStart: Story = {
  args: {
    text: 'Download',
    variant: 'primary',
    size: 'md',
    iconStart: downloadIcon,
  },
  render: renderComponent,
};

/**
 * Button with icon at end (forward arrow for CTAs)
 */
export const WithIconEnd: Story = {
  args: {
    text: 'Continue',
    variant: 'primary',
    size: 'md',
    iconEnd: arrowRight,
  },
  render: renderComponent,
};

/**
 * Icon-only button (44x44px touch target)
 */
export const IconOnly: Story = {
  args: {
    text: 'Close',
    variant: 'ghost',
    size: 'md',
    iconOnly: true,
    iconStart: closeIcon,
    a11y: {
      ariaLabel: 'Close dialog',
    },
  },
  render: renderComponent,
};

/**
 * Link styled as button for navigation
 */
export const LinkButton: Story = {
  args: {
    text: 'Learn More',
    href: '/about',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * External link button with arrow icon
 */
export const ExternalLink: Story = {
  args: {
    text: 'View Demo',
    href: 'https://example.com',
    target: '_blank',
    variant: 'secondary',
    size: 'md',
    iconEnd: arrowUpRight,
  },
  render: renderComponent,
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  render: renderComponent,
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  args: {
    text: 'Submitting...',
    variant: 'primary',
    size: 'md',
    loading: true,
    disabled: true,
  },
  render: renderComponent,
};

/**
 * Full-width button
 */
export const FullWidth: Story = {
  args: {
    text: 'Sign Up Now',
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
  },
  render: renderComponent,
};

/**
 * Submit button for forms
 */
export const SubmitButton: Story = {
  args: {
    text: 'Submit Form',
    type: 'submit',
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Primary', variant: 'primary', size: 'md' })}
        ${renderComponent({ text: 'Secondary', variant: 'secondary', size: 'md' })}
        ${renderComponent({ text: 'Ghost', variant: 'ghost', size: 'md' })}
        ${renderComponent({ text: 'Danger', variant: 'danger', size: 'md' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'All four button variants: primary (high emphasis), secondary (medium emphasis), ghost (low emphasis), and danger (destructive actions).',
      },
    },
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        ${renderComponent({ text: 'Small', variant: 'primary', size: 'sm' })}
        ${renderComponent({ text: 'Medium', variant: 'primary', size: 'md' })}
        ${renderComponent({ text: 'Large', variant: 'primary', size: 'lg' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Three size variants: small (32px), medium (44px - minimum touch target), and large (56px).',
      },
    },
  },
};

/**
 * Button states comparison
 */
export const AllStates: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Default', variant: 'primary', size: 'md' })}
        ${renderComponent({ text: 'Disabled', variant: 'primary', size: 'md', disabled: true })}
        ${renderComponent({ text: 'Loading', variant: 'primary', size: 'md', loading: true, disabled: true })}
      </div>
      <p style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;">
        Hover, focus, and active states are interactive - try them out!
      </p>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Button states: default, disabled (50% opacity), and loading (spinner). Interactive states (hover, focus, active) work in the live preview.',
      },
    },
  },
};

/**
 * Icon variants comparison
 */
export const IconVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Download', variant: 'primary', size: 'md', iconStart: downloadIcon })}
        ${renderComponent({ text: 'Continue', variant: 'primary', size: 'md', iconEnd: arrowRight })}
        ${renderComponent({ text: 'Close', variant: 'ghost', size: 'md', iconOnly: true, iconStart: closeIcon, a11y: { ariaLabel: 'Close' } })}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon support: iconStart (icon before text), iconEnd (icon after text, commonly used for arrows), and iconOnly (44x44px touch target with visually hidden text).',
      },
    },
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  render: () => {
    return `
      <div style="padding: 2rem; background: #1f2937; border-radius: 8px;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          ${renderComponent({ text: 'Primary', variant: 'primary', size: 'md' })}
          ${renderComponent({ text: 'Secondary', variant: 'secondary', size: 'md' })}
          ${renderComponent({ text: 'Ghost', variant: 'ghost', size: 'md' })}
          ${renderComponent({ text: 'Danger', variant: 'danger', size: 'md' })}
        </div>
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'All button variants automatically adapt to dark mode with adjusted colors for proper contrast.',
      },
    },
  },
};

/**
 * Responsive behavior demonstration
 */
export const Responsive: Story = {
  render: () => {
    return `
      <div style="max-width: 375px; padding: 1rem; border: 1px dashed #e5e7eb; border-radius: 8px;">
        <p style="margin: 0 0 1rem; color: #6b7280; font-size: 0.875rem;">Mobile viewport (375px)</p>
        ${renderComponent({ text: 'Full Width on Mobile', variant: 'primary', size: 'md', className: 'button-responsive' })}
      </div>
      <div style="margin-top: 2rem;">
        ${renderComponent({ text: 'Always Full Width', variant: 'primary', size: 'lg', fullWidth: true })}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive behavior: button-responsive class makes buttons full-width below 768px. The fullWidth prop makes buttons always full-width.',
      },
    },
  },
};

/**
 * Marketing CTA examples
 */
export const MarketingCTAs: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          ${renderComponent({ text: 'Get Started Free', variant: 'primary', size: 'lg', iconEnd: arrowRight })}
          ${renderComponent({ text: 'Learn More', variant: 'ghost', size: 'lg' })}
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          ${renderComponent({ text: 'Start Your Free Trial', variant: 'primary', size: 'lg', fullWidth: true })}
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          ${renderComponent({ text: 'View Live Demo', href: 'https://example.com', target: '_blank', variant: 'secondary', size: 'md', iconEnd: arrowUpRight })}
          ${renderComponent({ text: 'Download Now', variant: 'secondary', size: 'md', iconStart: downloadIcon })}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Common marketing CTA patterns: primary action with arrow, ghost alternative, full-width mobile CTA, external link with up-right arrow, and download button.',
      },
    },
  },
};
