// components/atoms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * COMPONENT_NAME_PASCAL Component Stories
 *
 * [Brief description of the component]
 */

// Configure Nunjucks
const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

// Load the component template
const templatePath = path.join(__dirname, 'COMPONENT_NAME_KEBAB.njk');
const template = fs.readFileSync(templatePath, 'utf-8');

// Component metadata
const meta: Meta = {
  title: 'Atoms/COMPONENT_NAME_PASCAL',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Visual style variant',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '[Detailed component description for documentation]',
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
    {% from "atoms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}
    {{ COMPONENT_NAME_KEBAB(props) }}
  `,
    { props: args }
  );
};

/**
 * Default state of the component
 */
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Primary variant
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Secondary variant
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
  },
  render: renderComponent,
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * All variants together for comparison
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        ${renderComponent({ variant: 'default', size: 'md' })}
        ${renderComponent({ variant: 'primary', size: 'md' })}
        ${renderComponent({ variant: 'secondary', size: 'md' })}
      </div>
    `;
  },
};

/**
 * All sizes together for comparison
 */
export const AllSizes: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        ${renderComponent({ variant: 'default', size: 'sm' })}
        ${renderComponent({ variant: 'default', size: 'md' })}
        ${renderComponent({ variant: 'default', size: 'lg' })}
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: renderComponent,
};
