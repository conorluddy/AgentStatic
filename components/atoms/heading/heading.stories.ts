// components/atoms/heading/heading.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

/**
 * Heading Component Stories
 *
 * Semantic heading component (h1-h6) with flexible visual styling.
 * Supports all 6 heading levels, responsive sizing, alignment, color variants,
 * font weights, and marketing enhancements (gradient text, eyebrow labels, highlights).
 */

// Component metadata
const meta: Meta = {
  title: 'Atoms/Heading',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Heading text content',
      defaultValue: 'Heading Text',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Semantic heading level (h1-h6)',
      defaultValue: 2,
    },
    size: {
      control: 'select',
      options: ['', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Visual size override (optional)',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      defaultValue: 'left',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      defaultValue: 'bold',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted'],
      description: 'Color variant',
      defaultValue: 'default',
    },
    gradient: {
      control: 'boolean',
      description: 'Apply gradient text fill',
      defaultValue: false,
    },
    eyebrow: {
      control: 'text',
      description: 'Small label above heading',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Semantic heading component supporting all 6 HTML heading levels (h1-h6) with flexible visual styling. Features responsive sizing with clamp(), size overrides to decouple semantic meaning from visual size, alignment options, color variants, font weight control, and marketing enhancements including eyebrow text, gradient fills, and text balancing.',
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
    text = '',
    level = 2,
    size = '',
    align = 'left',
    weight = 'bold',
    color = 'default',
    gradient = false,
    eyebrow = '',
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = ['heading', `heading-h${level}`];
  if (size) classList.push(`heading-size-${size}`);
  // Always add alignment class since text-align: left is the default
  // This ensures all alignment variants work correctly
  if (align) classList.push(`heading-${align}`);
  if (weight !== 'bold') classList.push(`heading-weight-${weight}`);
  if (color !== 'default') classList.push(`heading-${color}`);
  if (gradient) classList.push('heading-gradient');
  if (className) classList.push(className);

  const classStr = classList.join(' ');
  const tag = `h${level}`;

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (id) attrs += ` id="${id}"`;
  if (a11y.role) attrs += ` role="${a11y.role}"`;
  if (a11y.ariaLabel) attrs += ` aria-label="${a11y.ariaLabel}"`;
  if (a11y.ariaDescribedBy) attrs += ` aria-describedby="${a11y.ariaDescribedBy}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  // Build content
  let content = `<${tag} ${attrs}>${text}</${tag}>`;

  // Wrap with eyebrow if needed
  if (eyebrow) {
    content = `<div class="heading-container">
      <span class="heading-eyebrow">${eyebrow}</span>
      ${content}
    </div>`;
  }

  return content;
};

/**
 * Default H2 heading
 */
export const Default: Story = {
  args: {
    text: 'This is a default heading',
    level: 2,
  },
  render: renderComponent,
};

/**
 * All 6 semantic heading levels (h1-h6)
 * Shows default responsive sizing for each level
 */
export const AllLevels: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${renderComponent({ text: 'H1 Heading - Page Title', level: 1 })}
        ${renderComponent({ text: 'H2 Heading - Major Section', level: 2 })}
        ${renderComponent({ text: 'H3 Heading - Subsection', level: 3 })}
        ${renderComponent({ text: 'H4 Heading - Minor Heading', level: 4 })}
        ${renderComponent({ text: 'H5 Heading - Small Heading', level: 5 })}
        ${renderComponent({ text: 'H6 Heading - Smallest Heading', level: 6 })}
      </div>
    `;
  },
};

/**
 * Size overrides - decouple visual size from semantic level
 * Example: h2 tag with h1 visual size for SEO flexibility
 */
export const SizeOverrides: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">size="5xl"</p>
          ${renderComponent({ text: 'Oversized Heading', level: 2, size: '5xl' })}
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">size="4xl"</p>
          ${renderComponent({ text: 'Very Large Heading', level: 2, size: '4xl' })}
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">size="3xl"</p>
          ${renderComponent({ text: 'Large Heading', level: 2, size: '3xl' })}
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">size="xl"</p>
          ${renderComponent({ text: 'Extra Large Heading', level: 2, size: 'xl' })}
        </div>
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">size="lg"</p>
          ${renderComponent({ text: 'Large Base Heading', level: 2, size: 'lg' })}
        </div>
      </div>
    `;
  },
};

/**
 * Text alignment options
 */
export const Alignment: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${renderComponent({ text: 'Left Aligned Heading', level: 2, align: 'left' })}
        ${renderComponent({ text: 'Center Aligned Heading', level: 2, align: 'center' })}
        ${renderComponent({ text: 'Right Aligned Heading', level: 2, align: 'right' })}
      </div>
    `;
  },
};

/**
 * Font weight variants
 */
export const Weights: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${renderComponent({ text: 'Normal Weight Heading', level: 2, weight: 'normal' })}
        ${renderComponent({ text: 'Medium Weight Heading', level: 2, weight: 'medium' })}
        ${renderComponent({ text: 'Semibold Weight Heading', level: 2, weight: 'semibold' })}
        ${renderComponent({ text: 'Bold Weight Heading', level: 2, weight: 'bold' })}
      </div>
    `;
  },
};

/**
 * Color variants
 */
export const Colors: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${renderComponent({ text: 'Default Color Heading', level: 2, color: 'default' })}
        ${renderComponent({ text: 'Primary Color Heading', level: 2, color: 'primary' })}
        ${renderComponent({ text: 'Secondary Color Heading', level: 2, color: 'secondary' })}
        ${renderComponent({ text: 'Muted Color Heading', level: 2, color: 'muted' })}
      </div>
    `;
  },
};

/**
 * Gradient text fill - hero headline impact
 * Best for hero sections and key marketing messages
 */
export const GradientText: Story = {
  args: {
    text: 'Build. Ship. Scale.',
    level: 1,
    gradient: true,
    align: 'center',
  },
  render: renderComponent,
};

/**
 * Eyebrow text - marketing pattern
 * Small label above main heading
 */
export const WithEyebrow: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${renderComponent({
          eyebrow: 'New Feature',
          text: 'Introducing AI Page Builder',
          level: 2,
        })}
        ${renderComponent({
          eyebrow: 'Case Study',
          text: 'How Company X Increased Conversions by 40%',
          level: 2,
        })}
        ${renderComponent({
          eyebrow: 'Product Update',
          text: 'Version 2.0 Now Available',
          level: 2,
        })}
      </div>
    `;
  },
};

/**
 * Inline highlight span
 * Emphasize key words with background color
 */
export const WithHighlight: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <h1 class="heading heading-align-center">
          Build <span class="heading-highlight">faster</span> with AI
        </h1>

        <h2 class="heading">
          Ship websites in <span class="heading-highlight">hours</span>, not days
        </h2>

        <h2 class="heading heading-color-primary">
          The <span class="heading-highlight">easiest</span> way to build landing pages
        </h2>
      </div>
    `;
  },
};

/**
 * Hero headline composition
 * Complete hero section pattern with eyebrow, gradient, and center alignment
 */
export const HeroHeadline: Story = {
  render: () => {
    return `
      <div style="padding: 3rem; background: linear-gradient(to bottom, #f9fafb, #ffffff); border-radius: 0.5rem;">
        ${renderComponent({
          eyebrow: 'AI-Powered Static Sites',
          text: 'Build Beautiful Websites Faster',
          level: 1,
          gradient: true,
          align: 'center',
          size: '4xl',
        })}
      </div>
    `;
  },
};

/**
 * Marketing section pattern
 * Common pattern: eyebrow + headline + centered alignment
 */
export const MarketingSection: Story = {
  render: () => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
        ${renderComponent({
          eyebrow: 'Features',
          text: 'Everything you need to succeed',
          level: 2,
          align: 'center',
          size: '3xl',
        })}
        <p style="text-align: center; margin-top: 1rem; color: #6b7280;">
          Powerful tools and components designed for modern marketing websites
        </p>
      </div>
    `;
  },
};

/**
 * SEO-friendly pattern
 * Semantic h2 with visual h1 size for proper document structure
 */
export const SEOFlexibility: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="font-size: 0.75rem; color: #6b7280;">
          Semantic h1 with default size (proper page title):
        </p>
        ${renderComponent({ text: 'Welcome to Our Product', level: 1 })}

        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 2rem;">
          Semantic h2 with h1 visual size (section heading that looks prominent):
        </p>
        ${renderComponent({ text: 'Key Features Section', level: 2, size: '3xl' })}

        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem;">
          This allows proper heading hierarchy for SEO while maintaining visual flexibility.
        </p>
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
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${renderComponent({ text: 'Default Color in Dark Mode', level: 2 })}
        ${renderComponent({ text: 'Primary Color in Dark Mode', level: 2, color: 'primary' })}
        ${renderComponent({ text: 'Secondary Color in Dark Mode', level: 2, color: 'secondary' })}
        ${renderComponent({ text: 'Muted Color in Dark Mode', level: 2, color: 'muted' })}
        ${renderComponent({
          text: 'Gradient Text in Dark Mode',
          level: 2,
          gradient: true,
        })}
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Responsive behavior preview
 * Shows how headings scale across viewport sizes
 */
export const ResponsiveSizing: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">
            H1 uses clamp(2rem, 4vw + 1rem, 3.157rem) - scales from 32px to 51px
          </p>
          ${renderComponent({ text: 'H1 Scales with Viewport', level: 1 })}
        </div>

        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">
            H2 uses clamp(1.5rem, 3vw + 0.75rem, 2.369rem) - scales from 24px to 38px
          </p>
          ${renderComponent({ text: 'H2 Scales with Viewport', level: 2 })}
        </div>

        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.5rem;">
            H3 uses clamp(1.25rem, 2vw + 0.5rem, 1.777rem) - scales from 20px to 28px
          </p>
          ${renderComponent({ text: 'H3 Scales with Viewport', level: 3 })}
        </div>

        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem;">
          Resize your browser window to see fluid typography in action.
        </p>
      </div>
    `;
  },
};

/**
 * All variants showcase
 * Comprehensive example showing all features together
 */
export const AllVariants: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "components/atoms/heading/heading.njk" import heading %}
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280;">
            SEMANTIC LEVELS
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            {{ heading({ text: 'H1 Heading', level: 1 }) }}
            {{ heading({ text: 'H2 Heading', level: 2 }) }}
            {{ heading({ text: 'H3 Heading', level: 3 }) }}
            {{ heading({ text: 'H4 Heading', level: 4 }) }}
            {{ heading({ text: 'H5 Heading', level: 5 }) }}
            {{ heading({ text: 'H6 Heading', level: 6 }) }}
          </div>
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280;">
            ALIGNMENT
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            {{ heading({ text: 'Left Aligned', level: 2, align: 'left' }) }}
            {{ heading({ text: 'Center Aligned', level: 2, align: 'center' }) }}
            {{ heading({ text: 'Right Aligned', level: 2, align: 'right' }) }}
          </div>
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280;">
            COLORS
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            {{ heading({ text: 'Primary Color', level: 2, color: 'primary' }) }}
            {{ heading({ text: 'Secondary Color', level: 2, color: 'secondary' }) }}
            {{ heading({ text: 'Muted Color', level: 2, color: 'muted' }) }}
          </div>
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280;">
            MARKETING ENHANCEMENTS
          </h3>
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            {{ heading({
              text: 'Gradient Hero Headline',
              level: 1,
              gradient: true,
              align: 'center'
            }) }}

            {{ heading({
              eyebrow: 'New Feature',
              text: 'With Eyebrow Label',
              level: 2
            }) }}

            {% call heading({ level: 2 }) %}
              With <span class="heading-highlight">highlighted</span> words
            {% endcall %}
          </div>
        </section>
      </div>
    `,
      {}
    );
  },
};
