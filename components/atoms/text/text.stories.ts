// components/atoms/text/text.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Text Component Stories
 *
 * Flexible text component for paragraphs, spans, and inline elements.
 * Supports multiple sizes, weights, colors, alignments, and special formatting.
 */

// Component metadata
const meta: Meta = {
  title: 'Atoms/Text',
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Text content (supports HTML)',
      defaultValue: 'This is sample text.',
    },
    element: {
      control: 'select',
      options: ['p', 'span', 'div'],
      description: 'HTML element type',
      defaultValue: 'p',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
      description: 'Text size variant',
      defaultValue: 'base',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      defaultValue: 'normal',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'error', 'success'],
      description: 'Color variant',
      defaultValue: 'default',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      defaultValue: 'left',
    },
    lineHeight: {
      control: 'select',
      options: ['tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'Line height',
      defaultValue: 'normal',
    },
    lead: {
      control: 'boolean',
      description: 'Lead paragraph styling',
      defaultValue: false,
    },
    readable: {
      control: 'boolean',
      description: 'Apply max-width for readability',
      defaultValue: false,
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Flexible text component for body copy, paragraphs, and inline text elements with comprehensive styling options.',
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
    content = '',
    element = 'p',
    size = 'base',
    weight = 'normal',
    color = 'default',
    align = 'left',
    lineHeight = 'normal',
    lead = false,
    readable = false,
    truncate = false,
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = ['text'];
  if (size !== 'base') classList.push(`text-${size}`);
  if (weight !== 'normal') classList.push(`text-${weight}`);
  if (color !== 'default') classList.push(`text-${color}`);
  if (align !== 'left') classList.push(`text-${align}`);
  if (lineHeight !== 'normal') classList.push(`text-${lineHeight}`);
  if (lead) classList.push('text-lead');
  if (readable) classList.push('text-readable');
  if (truncate) classList.push('text-truncate');
  if (className) classList.push(className);

  const classStr = classList.join(' ');

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (id) attrs += ` id="${id}"`;
  if (a11y.role) attrs += ` role="${a11y.role}"`;
  if (a11y.ariaLabel) attrs += ` aria-label="${a11y.ariaLabel}"`;
  if (a11y.ariaDescribedBy) attrs += ` aria-describedby="${a11y.ariaDescribedBy}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  return `<${element} ${attrs}>${content}</${element}>`;
};

/**
 * Default paragraph with base styling
 */
export const Default: Story = {
  args: {
    content: 'This is a default paragraph with normal weight and base size. Perfect for body copy in articles, content sections, and general text display.',
  },
  render: renderComponent,
};

/**
 * All size variants from extra small to 2XL
 */
export const AllSizes: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${renderComponent({ content: 'Extra small text (xs)', size: 'xs' })}
        ${renderComponent({ content: 'Small text (sm)', size: 'sm' })}
        ${renderComponent({ content: 'Base text (base - default)', size: 'base' })}
        ${renderComponent({ content: 'Large text (lg)', size: 'lg' })}
        ${renderComponent({ content: 'Extra large text (xl)', size: 'xl' })}
        ${renderComponent({ content: 'Double extra large text (2xl)', size: '2xl' })}
      </div>
    `;
  },
};

/**
 * All font weight variants
 */
export const AllWeights: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${renderComponent({ content: 'Light weight text (300)', weight: 'light' })}
        ${renderComponent({ content: 'Normal weight text (400 - default)', weight: 'normal' })}
        ${renderComponent({ content: 'Medium weight text (500)', weight: 'medium' })}
        ${renderComponent({ content: 'Semibold weight text (600)', weight: 'semibold' })}
        ${renderComponent({ content: 'Bold weight text (700)', weight: 'bold' })}
      </div>
    `;
  },
};

/**
 * All color variants including semantic colors
 */
export const AllColors: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${renderComponent({ content: 'Default text color (body text)', color: 'default' })}
        ${renderComponent({ content: 'Muted text color (secondary text)', color: 'muted' })}
        ${renderComponent({ content: 'Primary brand color', color: 'primary' })}
        ${renderComponent({ content: 'Secondary brand color', color: 'secondary' })}
        ${renderComponent({ content: 'Error status color', color: 'error' })}
        ${renderComponent({ content: 'Success status color', color: 'success' })}
      </div>
    `;
  },
};

/**
 * Text alignment options
 */
export const AllAlignments: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        ${renderComponent({
          content: 'Left aligned text (default)',
          align: 'left'
        })}
        ${renderComponent({
          content: 'Center aligned text',
          align: 'center'
        })}
        ${renderComponent({
          content: 'Right aligned text',
          align: 'right'
        })}
        ${renderComponent({
          content: 'Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          align: 'justify'
        })}
      </div>
    `;
  },
};

/**
 * Line height variants for different reading contexts
 */
export const AllLineHeights: Story = {
  render: () => {
    const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
        <div>
          <strong>Tight (1.25)</strong>
          ${renderComponent({ content: sampleText, lineHeight: 'tight' })}
        </div>
        <div>
          <strong>Snug (1.375)</strong>
          ${renderComponent({ content: sampleText, lineHeight: 'snug' })}
        </div>
        <div>
          <strong>Normal (1.5 - default)</strong>
          ${renderComponent({ content: sampleText, lineHeight: 'normal' })}
        </div>
        <div>
          <strong>Relaxed (1.625)</strong>
          ${renderComponent({ content: sampleText, lineHeight: 'relaxed' })}
        </div>
        <div>
          <strong>Loose (2.0)</strong>
          ${renderComponent({ content: sampleText, lineHeight: 'loose' })}
        </div>
      </div>
    `;
  },
};

/**
 * Lead paragraph for opening text sections
 */
export const LeadParagraph: Story = {
  args: {
    content: 'This is a lead paragraph with larger size and increased line height. Perfect for introducing content sections or emphasizing opening text.',
    lead: true,
  },
  render: renderComponent,
};

/**
 * Readable text with max-width constraint
 */
export const ReadableWidth: Story = {
  args: {
    content: 'This paragraph has a max-width constraint of 65 characters for optimal readability. Research shows that line lengths between 60-75 characters are most comfortable for reading. This prevents eye strain on wide screens.',
    readable: true,
    lineHeight: 'relaxed',
  },
  render: renderComponent,
};

/**
 * Text with inline code elements
 */
export const WithInlineCode: Story = {
  args: {
    content: 'Use the <code>text</code> component for all body copy. You can also use <code>className</code> to add custom styling.',
  },
  render: renderComponent,
};

/**
 * Text with HTML formatting (strong, em)
 */
export const WithHTMLFormatting: Story = {
  args: {
    content: 'This text includes <strong>bold emphasis</strong> and <em>italic text</em> for inline formatting. You can combine multiple <strong><em>formatting styles</em></strong> as needed.',
  },
  render: renderComponent,
};

/**
 * Inline span element usage
 */
export const InlineSpan: Story = {
  render: () => {
    return `
      <p>
        This is normal paragraph text with
        ${renderComponent({
          content: 'an inline span element',
          element: 'span',
          color: 'primary',
          weight: 'semibold'
        })}
        embedded within it for emphasis.
      </p>
    `;
  },
};

/**
 * Marketing use case - hero subheading
 */
export const HeroSubheading: Story = {
  args: {
    content: 'Build better products faster with our comprehensive design system',
    size: 'lg',
    color: 'muted',
    align: 'center',
    lineHeight: 'relaxed',
  },
  render: renderComponent,
};

/**
 * Marketing use case - feature description
 */
export const FeatureDescription: Story = {
  args: {
    content: 'Our advanced analytics dashboard gives you real-time insights into user behavior, helping you make data-driven decisions that drive growth.',
    size: 'base',
    lineHeight: 'relaxed',
    readable: true,
  },
  render: renderComponent,
};

/**
 * Marketing use case - caption text
 */
export const Caption: Story = {
  args: {
    content: 'Last updated: January 2025',
    size: 'sm',
    color: 'muted',
    element: 'span',
  },
  render: renderComponent,
};

/**
 * Status message - error
 */
export const ErrorMessage: Story = {
  args: {
    content: 'Please enter a valid email address',
    size: 'sm',
    color: 'error',
  },
  render: renderComponent,
};

/**
 * Status message - success
 */
export const SuccessMessage: Story = {
  args: {
    content: 'Your changes have been saved successfully',
    size: 'sm',
    color: 'success',
  },
  render: renderComponent,
};

/**
 * Combined variations showcase
 */
export const CombinedVariations: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        ${renderComponent({
          content: 'Large primary text with semibold weight',
          size: 'lg',
          color: 'primary',
          weight: 'semibold'
        })}
        ${renderComponent({
          content: 'Small muted text with light weight',
          size: 'sm',
          color: 'muted',
          weight: 'light'
        })}
        ${renderComponent({
          content: 'Centered extra large bold text',
          size: 'xl',
          weight: 'bold',
          align: 'center'
        })}
        ${renderComponent({
          content: 'Justified paragraph with relaxed line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          align: 'justify',
          lineHeight: 'relaxed',
          readable: true
        })}
      </div>
    `;
  },
};

/**
 * Truncated text with ellipsis
 */
export const Truncated: Story = {
  render: () => {
    return `
      <div style="max-width: 300px; border: 1px dashed #ccc; padding: 1rem;">
        <p style="margin-bottom: 1rem;"><strong>Without truncate:</strong></p>
        ${renderComponent({
          content: 'This is a very long text that will wrap to multiple lines when the container is narrow',
          element: 'div'
        })}
        <p style="margin: 1rem 0;"><strong>With truncate:</strong></p>
        ${renderComponent({
          content: 'This is a very long text that will be truncated with an ellipsis when it exceeds the container width',
          truncate: true,
          element: 'div'
        })}
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
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${renderComponent({ content: 'Default text adapts to dark mode', color: 'default' })}
        ${renderComponent({ content: 'Muted text remains readable', color: 'muted' })}
        ${renderComponent({ content: 'Primary color maintains contrast', color: 'primary' })}
        ${renderComponent({ content: 'Inline <code>code</code> elements have dark styling' })}
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
