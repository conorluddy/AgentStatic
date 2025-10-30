// components/organisms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * COMPONENT_NAME_PASCAL Organism Stories
 *
 * [Brief description - this organism represents a complete page section]
 */

const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

const meta: Meta = {
  title: 'Organisms/COMPONENT_NAME_PASCAL',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'inverted'],
      description: 'Visual style variant',
    },
    layout: {
      control: 'select',
      options: ['default', 'split', 'centered', 'full-width'],
      description: 'Layout pattern',
    },
    size: {
      control: 'select',
      options: ['compact', 'default', 'spacious'],
      description: 'Spacing size',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '[Detailed organism description - explain page section purpose]',
      },
    },
    layout: 'fullscreen', // Organisms typically need full width
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
          {
            id: 'region',
            enabled: true,
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
    {% from "organisms/COMPONENT_NAME_KEBAB/COMPONENT_NAME_KEBAB.njk" import COMPONENT_NAME_KEBAB %}
    {{ COMPONENT_NAME_KEBAB(props) }}
  `,
    { props: args }
  );
};

/**
 * Default organism configuration
 */
export const Default: Story = {
  args: {
    variant: 'default',
    layout: 'default',
    size: 'default',
    header: {
      heading: 'Section Heading',
      subheading: 'Section subheading text',
      description: 'Additional description text here',
    },
    content: {
      items: [
        '<div>Content item 1</div>',
        '<div>Content item 2</div>',
        '<div>Content item 3</div>',
      ],
    },
  },
  render: renderComponent,
};

/**
 * Centered layout
 */
export const Centered: Story = {
  args: {
    variant: 'default',
    layout: 'centered',
    size: 'default',
    header: {
      heading: 'Centered Section',
      subheading: 'Everything centered',
    },
    content: {
      items: ['<div>Centered content</div>'],
    },
  },
  render: renderComponent,
};

/**
 * Split layout with two columns
 */
export const Split: Story = {
  args: {
    variant: 'default',
    layout: 'split',
    size: 'default',
    content: {
      primary: '<div>Primary content area</div>',
      secondary: '<div>Secondary content area</div>',
    },
  },
  render: renderComponent,
};

/**
 * Primary variant with inverted colors
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    layout: 'centered',
    size: 'default',
    header: {
      heading: 'Primary Section',
      subheading: 'With brand colors',
    },
    footer: {
      actions: [
        '<button>Primary Action</button>',
        '<button>Secondary Action</button>',
      ],
    },
  },
  render: renderComponent,
};

/**
 * Inverted color scheme
 */
export const Inverted: Story = {
  args: {
    variant: 'inverted',
    layout: 'centered',
    size: 'default',
    header: {
      heading: 'Inverted Section',
      subheading: 'Dark background, light text',
    },
  },
  render: renderComponent,
};

/**
 * Compact spacing
 */
export const Compact: Story = {
  args: {
    variant: 'default',
    layout: 'default',
    size: 'compact',
    header: {
      heading: 'Compact Section',
    },
    content: {
      items: ['<div>Content with reduced spacing</div>'],
    },
  },
  render: renderComponent,
};

/**
 * Spacious layout with extra padding
 */
export const Spacious: Story = {
  args: {
    variant: 'default',
    layout: 'centered',
    size: 'spacious',
    header: {
      heading: 'Spacious Section',
      subheading: 'Extra breathing room',
    },
  },
  render: renderComponent,
};

/**
 * Full-width layout
 */
export const FullWidth: Story = {
  args: {
    variant: 'default',
    layout: 'full-width',
    size: 'default',
    header: {
      heading: 'Full Width Section',
    },
    content: {
      items: ['<div>Edge-to-edge content</div>'],
    },
  },
  render: renderComponent,
};

/**
 * Complete example with all sections
 */
export const Complete: Story = {
  args: {
    variant: 'default',
    layout: 'centered',
    size: 'default',
    header: {
      heading: 'Complete Example',
      subheading: 'With all sections',
      description: '<p>This demonstrates all available sections</p>',
    },
    content: {
      items: [
        '<div>Content item 1</div>',
        '<div>Content item 2</div>',
        '<div>Content item 3</div>',
      ],
    },
    footer: {
      actions: [
        '<button>Primary</button>',
        '<button>Secondary</button>',
      ],
      content: '<small>Additional footer content</small>',
    },
  },
  render: renderComponent,
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    variant: 'default',
    layout: 'centered',
    size: 'default',
    header: {
      heading: 'Dark Mode',
      subheading: 'Adapts to system preference',
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: renderComponent,
};

/**
 * Mobile view
 */
export const Mobile: Story = {
  args: {
    variant: 'default',
    layout: 'split',
    size: 'default',
    content: {
      primary: '<div>Primary stacks on mobile</div>',
      secondary: '<div>Secondary below primary</div>',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: renderComponent,
};
