// components/atoms/divider/divider.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Divider Component Stories
 *
 * A flexible visual separator for content sections. Supports horizontal/vertical
 * orientations, multiple line styles, text/icon decorations, and gradient effects.
 */

// Component metadata
const meta: Meta = {
  title: 'Atoms/Divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider line',
      defaultValue: 'horizontal',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'gradient', 'section', 'spacer'],
      description: 'Visual style variant',
      defaultValue: 'solid',
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Line thickness',
      defaultValue: 'thin',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'muted'],
      description: 'Color variant',
      defaultValue: 'default',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin spacing around divider',
      defaultValue: 'md',
    },
    withText: {
      control: 'text',
      description: 'Text to display in center',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      defaultValue: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible visual separator supporting horizontal and vertical orientations, multiple line styles (solid, dashed, dotted), gradient effects, decorative text/icon in center, and invisible spacers. Essential for creating visual hierarchy and breaking up content in marketing pages.',
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
const renderComponent = (props: any) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    thickness = 'thin',
    color = 'default',
    spacing = 'md',
    withText = '',
    withIcon = '',
    textAlign = 'center',
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  const hasContent = withText || withIcon;

  // Build class list
  const classList = [
    'divider',
    `divider-${orientation}`,
    !hasContent ? `divider-${variant}` : '',
    `divider-${thickness}`,
    `divider-${color}`,
    `divider-spacing-${spacing}`,
    hasContent ? 'divider-with-content' : '',
    hasContent ? `divider-align-${textAlign}` : '',
    className
  ].filter(Boolean);

  const classStr = classList.join(' ');

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (id) attrs += ` id="${id}"`;
  if (a11y.role) attrs += ` role="${a11y.role}"`;
  else attrs += ` role="separator"`;
  if (a11y.ariaLabel) attrs += ` aria-label="${a11y.ariaLabel}"`;
  attrs += ` aria-orientation="${orientation}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  // Simple divider (hr or div)
  if (orientation === 'horizontal' && !hasContent) {
    return `<hr ${attrs}>`;
  }

  // Divider with content
  let content = '';
  if (withText) {
    content = `<span class="divider-text">${withText}</span>`;
  }
  if (withIcon) {
    content = `<span class="divider-icon">${withIcon}</span>`;
  }

  return `<div ${attrs}>${content}</div>`;
};

/**
 * Default horizontal divider with solid line
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'thin',
    color: 'default',
    spacing: 'md',
  },
  render: renderComponent,
};

/**
 * Horizontal divider (explicit)
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'thin',
    color: 'default',
    spacing: 'md',
  },
  render: renderComponent,
};

/**
 * Vertical divider - useful for sidebar separators
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'solid',
    thickness: 'thin',
    color: 'default',
    spacing: 'md',
  },
  render: (args) => {
    return `
      <div style="display: flex; align-items: center; height: 100px;">
        <span>Left content</span>
        ${renderComponent(args)}
        <span>Right content</span>
      </div>
    `;
  },
};

/**
 * Solid line style (default)
 */
export const Solid: Story = {
  args: {
    variant: 'solid',
  },
  render: renderComponent,
};

/**
 * Dashed line style
 */
export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
  render: renderComponent,
};

/**
 * Dotted line style
 */
export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
  render: renderComponent,
};

/**
 * Gradient divider - fades to transparent on edges
 */
export const Gradient: Story = {
  args: {
    variant: 'gradient',
    thickness: 'thin',
  },
  render: renderComponent,
};

/**
 * Thin thickness (1px)
 */
export const Thin: Story = {
  args: {
    thickness: 'thin',
  },
  render: renderComponent,
};

/**
 * Medium thickness (2px)
 */
export const Medium: Story = {
  args: {
    thickness: 'medium',
  },
  render: renderComponent,
};

/**
 * Thick thickness (4px)
 */
export const Thick: Story = {
  args: {
    thickness: 'thick',
  },
  render: renderComponent,
};

/**
 * Default color (gray)
 */
export const ColorDefault: Story = {
  args: {
    color: 'default',
  },
  render: renderComponent,
};

/**
 * Primary color (blue)
 */
export const ColorPrimary: Story = {
  args: {
    color: 'primary',
    thickness: 'medium',
  },
  render: renderComponent,
};

/**
 * Muted color (light gray)
 */
export const ColorMuted: Story = {
  args: {
    color: 'muted',
  },
  render: renderComponent,
};

/**
 * OR divider - common pattern for separating login options
 */
export const WithTextOR: Story = {
  args: {
    withText: 'or',
    textAlign: 'center',
  },
  render: renderComponent,
};

/**
 * Text divider with left alignment
 */
export const WithTextLeft: Story = {
  args: {
    withText: 'More content',
    textAlign: 'left',
  },
  render: renderComponent,
};

/**
 * Text divider with right alignment
 */
export const WithTextRight: Story = {
  args: {
    withText: 'See more',
    textAlign: 'right',
  },
  render: renderComponent,
};

/**
 * Section divider - thick with large spacing for major breaks
 */
export const Section: Story = {
  args: {
    variant: 'section',
  },
  render: (args) => {
    return `
      <div>
        <p>First section content here</p>
        ${renderComponent(args)}
        <p>Second section content here</p>
      </div>
    `;
  },
};

/**
 * Spacer - invisible divider for layout spacing
 */
export const Spacer: Story = {
  args: {
    variant: 'spacer',
    spacing: 'lg',
  },
  render: (args) => {
    return `
      <div>
        <p style="background: #e5e7eb; padding: 1rem;">Content above spacer</p>
        ${renderComponent(args)}
        <p style="background: #e5e7eb; padding: 1rem;">Content below spacer</p>
      </div>
    `;
  },
};

/**
 * All line style variants together
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Solid</strong></p>
          ${renderComponent({ variant: 'solid' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Dashed</strong></p>
          ${renderComponent({ variant: 'dashed' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Dotted</strong></p>
          ${renderComponent({ variant: 'dotted' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Gradient</strong></p>
          ${renderComponent({ variant: 'gradient' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Section (thick with large spacing)</strong></p>
          ${renderComponent({ variant: 'section' })}
        </div>
      </div>
    `;
  },
};

/**
 * All thickness options together
 */
export const AllThickness: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Thin (1px)</strong></p>
          ${renderComponent({ thickness: 'thin' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Medium (2px)</strong></p>
          ${renderComponent({ thickness: 'medium' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Thick (4px)</strong></p>
          ${renderComponent({ thickness: 'thick' })}
        </div>
      </div>
    `;
  },
};

/**
 * All color options together
 */
export const AllColors: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Default (gray)</strong></p>
          ${renderComponent({ color: 'default', thickness: 'medium' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Primary (blue)</strong></p>
          ${renderComponent({ color: 'primary', thickness: 'medium' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>Muted (light gray)</strong></p>
          ${renderComponent({ color: 'muted', thickness: 'medium' })}
        </div>
      </div>
    `;
  },
};

/**
 * Spacing variants comparison
 */
export const AllSpacing: Story = {
  render: () => {
    return `
      <div>
        <p style="background: #e5e7eb; padding: 1rem; margin: 0;">Content above</p>
        <p style="margin: 1rem 0;"><strong>None</strong></p>
        ${renderComponent({ spacing: 'none' })}
        <p style="background: #e5e7eb; padding: 1rem; margin: 0;">Content below</p>

        <p style="background: #e5e7eb; padding: 1rem; margin: 2rem 0 0 0;">Content above</p>
        <p style="margin: 1rem 0;"><strong>Small</strong></p>
        ${renderComponent({ spacing: 'sm' })}
        <p style="background: #e5e7eb; padding: 1rem; margin: 0;">Content below</p>

        <p style="background: #e5e7eb; padding: 1rem; margin: 2rem 0 0 0;">Content above</p>
        <p style="margin: 1rem 0;"><strong>Medium</strong></p>
        ${renderComponent({ spacing: 'md' })}
        <p style="background: #e5e7eb; padding: 1rem; margin: 0;">Content below</p>

        <p style="background: #e5e7eb; padding: 1rem; margin: 2rem 0 0 0;">Content above</p>
        <p style="margin: 1rem 0;"><strong>Large</strong></p>
        ${renderComponent({ spacing: 'lg' })}
        <p style="background: #e5e7eb; padding: 1rem; margin: 0;">Content below</p>
      </div>
    `;
  },
};

/**
 * Text divider variations - common "or" pattern
 */
export const TextDividers: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>OR (center aligned)</strong></p>
          ${renderComponent({ withText: 'or', textAlign: 'center' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>AND (center aligned)</strong></p>
          ${renderComponent({ withText: 'and', textAlign: 'center' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>More content (left aligned)</strong></p>
          ${renderComponent({ withText: 'More content', textAlign: 'left' })}
        </div>
        <div>
          <p style="margin-bottom: 0.5rem;"><strong>See all (right aligned)</strong></p>
          ${renderComponent({ withText: 'See all', textAlign: 'right' })}
        </div>
      </div>
    `;
  },
};

/**
 * Real-world usage: Login form with OR divider
 */
export const LoginFormExample: Story = {
  render: () => {
    return `
      <div style="max-width: 400px; margin: 0 auto; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin-top: 0;">Sign In</h3>
        <button style="width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Continue with Email
        </button>
        ${renderComponent({ withText: 'or', textAlign: 'center', spacing: 'lg' })}
        <button style="width: 100%; padding: 0.75rem; background: #1f2937; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 0.5rem;">
          Continue with Google
        </button>
        <button style="width: 100%; padding: 0.75rem; background: #1877f2; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Continue with Facebook
        </button>
      </div>
    `;
  },
};

/**
 * Real-world usage: Content sections
 */
export const ContentSectionExample: Story = {
  render: () => {
    return `
      <article style="max-width: 800px; margin: 0 auto;">
        <section>
          <h2>First Section</h2>
          <p>This is the first section of content. It contains important information about the topic at hand. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>

        ${renderComponent({ variant: 'section' })}

        <section>
          <h2>Second Section</h2>
          <p>This is the second major section, clearly separated by a thick divider with generous spacing. This helps readers understand the content structure.</p>
        </section>

        ${renderComponent({ variant: 'section' })}

        <section>
          <h2>Third Section</h2>
          <p>And here's the third section, continuing the pattern of clear visual separation between major content areas.</p>
        </section>
      </article>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    variant: 'solid',
    thickness: 'thin',
    color: 'default',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => {
    return `
      <div data-theme="dark">
        <p style="color: white; margin-bottom: 1rem;">Content above divider</p>
        ${renderComponent(args)}
        <p style="color: white; margin-top: 1rem;">Content below divider</p>
      </div>
    `;
  },
};

/**
 * Dark mode with all variants
 */
export const DarkModeVariants: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => {
    return `
      <div data-theme="dark" style="color: white;">
        <h3>Divider Variants in Dark Mode</h3>

        <p style="margin-top: 1rem;"><strong>Solid</strong></p>
        ${renderComponent({ variant: 'solid' })}

        <p style="margin-top: 1rem;"><strong>Dashed</strong></p>
        ${renderComponent({ variant: 'dashed' })}

        <p style="margin-top: 1rem;"><strong>Gradient</strong></p>
        ${renderComponent({ variant: 'gradient' })}

        <p style="margin-top: 1rem;"><strong>With Text</strong></p>
        ${renderComponent({ withText: 'or' })}

        <p style="margin-top: 1rem;"><strong>Primary Color</strong></p>
        ${renderComponent({ color: 'primary', thickness: 'medium' })}
      </div>
    `;
  },
};
