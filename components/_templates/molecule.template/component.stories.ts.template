// components/molecules/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * COMPONENT_NAME_PASCAL Molecule Stories
 *
 * [Brief description - this molecule combines X atoms into Y functionality]
 */

const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

const meta: Meta = {
  title: 'Molecules/COMPONENT_NAME_PASCAL',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Visual style variant',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '[Detailed molecule description - explain composition]',
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
            enabled: false, // Molecules may not be landmarks
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
    {% from "molecules/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}
    {{ COMPONENT_NAME_KEBAB(props) }}
  `,
    { props: args }
  );
};

export const Default: Story = {
  args: {
    variant: 'default',
    layout: 'vertical',
    header: {
      title: 'Example Title',
    },
    body: {
      content: 'Example body content',
    },
  },
  render: renderComponent,
};

export const WithFooter: Story = {
  args: {
    variant: 'default',
    layout: 'vertical',
    header: {
      title: 'Example Title',
    },
    body: {
      content: 'Example body content',
    },
    footer: {
      actions: [],
    },
  },
  render: renderComponent,
};

export const Horizontal: Story = {
  args: {
    variant: 'default',
    layout: 'horizontal',
    header: {
      title: 'Example Title',
    },
    body: {
      content: 'Example body content',
    },
  },
  render: renderComponent,
};

export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        ${renderComponent({ variant: 'default' })}
        ${renderComponent({ variant: 'primary' })}
        ${renderComponent({ variant: 'secondary' })}
      </div>
    `;
  },
};
