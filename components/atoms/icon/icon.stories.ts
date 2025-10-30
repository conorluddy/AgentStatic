// components/atoms/icon/icon.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import fs from 'fs';
import path from 'path';
import nunjucks from 'nunjucks';

/**
 * Icon Component Stories
 *
 * SVG icon wrapper component for consistent icon usage across the design system.
 * Supports 50+ inline SVG icons with size variants, color customization, and
 * circle backgrounds for marketing/brochureware sites.
 *
 * Features:
 * - 50+ built-in icons (UI, navigation, social, trust, media)
 * - 6 size variants (xs, sm, md, lg, xl, 2xl)
 * - 8 color variants (primary, secondary, accent, success, warning, error, muted, white)
 * - Circle variant with 7 background colors
 * - Light circle tint variants for feature sections
 * - Accessibility support (decorative vs semantic)
 * - Dark mode compatible
 * - WCAG AA contrast compliant
 * - ~300B gzipped per icon (inline SVG)
 */

// Configure Nunjucks
const env = nunjucks.configure(path.join(__dirname, '../../..'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

// Load the component template
const templatePath = path.join(__dirname, 'icon.njk');
const template = fs.readFileSync(templatePath, 'utf-8');

// Component metadata
const meta: Meta = {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'check', 'x', 'plus', 'minus',
        'chevron-down', 'chevron-up', 'chevron-right', 'chevron-left',
        'arrow-right', 'arrow-left',
        'external-link', 'download', 'upload',
        'search', 'menu', 'user', 'settings',
        'mail', 'phone', 'home',
        'star', 'heart',
        'info', 'alert-circle', 'alert-triangle',
        'lock', 'unlock', 'shield', 'verified',
        'trophy', 'gift',
        'calendar', 'clock',
        'eye', 'eye-off',
        'play', 'pause',
        'twitter', 'linkedin', 'github', 'facebook', 'instagram', 'youtube',
        'globe', 'link',
        'file', 'image', 'video',
        'tag', 'bookmark', 'share'
      ],
      description: 'Icon name',
      defaultValue: 'check',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    color: {
      control: 'select',
      options: ['', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'muted', 'white'],
      description: 'Color variant (empty = currentColor)',
    },
    circle: {
      control: 'boolean',
      description: 'Wrap in circular background',
      defaultValue: false,
    },
    circleColor: {
      control: 'select',
      options: ['', 'primary', 'secondary', 'accent', 'success', 'primary-light', 'secondary-light', 'accent-light'],
      description: 'Circle background color',
    },
    decorative: {
      control: 'boolean',
      description: 'Mark as decorative (aria-hidden)',
      defaultValue: false,
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for semantic icons',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Inline SVG icon component with extensive variant support for brochureware sites. Includes UI actions, navigation, status indicators, social media icons, trust icons, and more. Optimized for accessibility with decorative and semantic modes.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
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
    {% from "atoms/icon/icon.njk" import icon %}
    {{ icon(props) }}
  `,
    { props: args }
  );
};

/**
 * Default icon (check mark)
 */
export const Default: Story = {
  args: {
    name: 'check',
    size: 'md',
  },
  render: renderComponent,
};

/**
 * All available sizes demonstrated
 */
export const AllSizes: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; padding: 2rem; background: var(--color-background);">
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: 'xs' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">xs (12px)</div>
        </div>
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: 'sm' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">sm (16px)</div>
        </div>
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: 'md' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">md (24px)</div>
        </div>
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: 'lg' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">lg (32px)</div>
        </div>
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: 'xl' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">xl (40px)</div>
        </div>
        <div style="text-align: center;">
          ${renderComponent({ name: 'check', size: '2xl' })}
          <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">2xl (48px)</div>
        </div>
      </div>
    `;
  },
};

/**
 * All color variants
 */
export const AllColors: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'muted'];
    return `
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; padding: 2rem; background: var(--color-background);">
        ${colors.map(color => `
          <div style="text-align: center;">
            ${renderComponent({ name: 'heart', size: 'lg', color })}
            <div style="font-size: 0.875rem; margin-top: 0.5rem; color: var(--color-text-muted);">${color}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * UI Action Icons (10 icons)
 */
export const UIActions: Story = {
  render: () => {
    const icons = ['check', 'x', 'plus', 'minus', 'search', 'menu', 'settings', 'download', 'upload', 'share'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Navigation Icons (9 icons)
 */
export const Navigation: Story = {
  render: () => {
    const icons = ['chevron-down', 'chevron-up', 'chevron-right', 'chevron-left', 'arrow-right', 'arrow-left', 'external-link', 'link', 'home'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Status Icons (8 icons)
 */
export const StatusIcons: Story = {
  render: () => {
    const icons = ['info', 'alert-circle', 'alert-triangle', 'verified', 'lock', 'unlock', 'eye', 'eye-off'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Social Media Icons (7 icons)
 */
export const SocialMedia: Story = {
  render: () => {
    const icons = ['twitter', 'linkedin', 'github', 'facebook', 'instagram', 'youtube', 'globe'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg', color: 'primary' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Trust & Security Icons (5 icons)
 */
export const TrustIcons: Story = {
  render: () => {
    const icons = ['shield', 'verified', 'lock', 'trophy', 'gift'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg', color: 'success' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Media Icons (7 icons)
 */
export const MediaIcons: Story = {
  render: () => {
    const icons = ['image', 'video', 'play', 'pause', 'file', 'calendar', 'clock'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * General Purpose Icons (7 icons)
 */
export const GeneralIcons: Story = {
  render: () => {
    const icons = ['user', 'mail', 'phone', 'star', 'heart', 'tag', 'bookmark'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; padding: 2rem; background: var(--color-background);">
        ${icons.map(name => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg' })}
            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Icon in Circle (Marketing Pattern)
 */
export const CircleVariant: Story = {
  render: () => {
    const icons = ['shield', 'verified', 'trophy', 'heart', 'star', 'gift'];
    const circleColors = ['primary', 'secondary', 'accent', 'success', 'primary-light', 'secondary-light'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 2rem; padding: 2rem; background: var(--color-background);">
        ${icons.map((name, index) => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'lg', circle: true, circleColor: circleColors[index] })}
            <div style="font-size: 0.75rem; margin-top: 0.75rem; color: var(--color-text-muted);">${circleColors[index]}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Circle Sizes (all sizes with circle)
 */
export const CircleSizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    return `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; padding: 2rem; background: var(--color-background);">
        ${sizes.map(size => `
          <div style="text-align: center;">
            ${renderComponent({ name: 'shield', size, circle: true, circleColor: 'primary-light' })}
            <div style="font-size: 0.75rem; margin-top: 0.75rem; color: var(--color-text-muted);">${size}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Light Circle Tints (for feature sections)
 */
export const LightCircles: Story = {
  render: () => {
    const icons = ['shield', 'verified', 'trophy', 'heart', 'lock', 'star'];
    const lightColors = ['primary-light', 'secondary-light', 'accent-light', 'primary-light', 'secondary-light', 'accent-light'];
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 2rem; padding: 2rem; background: var(--color-background);">
        ${icons.map((name, index) => `
          <div style="text-align: center;">
            ${renderComponent({ name, size: 'xl', circle: true, circleColor: lightColors[index] })}
            <div style="font-size: 0.75rem; margin-top: 0.75rem; color: var(--color-text-muted);">${name}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/**
 * Decorative vs Semantic Icons
 */
export const AccessibilityExamples: Story = {
  render: () => {
    return `
      <div style="padding: 2rem; background: var(--color-background); display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="font-size: 1rem; margin-bottom: 1rem; color: var(--color-text);">Decorative Icon (with visible text)</h3>
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;">
            ${renderComponent({ name: 'check', color: 'success', decorative: true })}
            <span>Success! Your payment was processed.</span>
          </div>
          <code style="display: block; margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-muted);">decorative: true (aria-hidden)</code>
        </div>

        <div>
          <h3 style="font-size: 1rem; margin-bottom: 1rem; color: var(--color-text);">Semantic Icon (standalone, needs label)</h3>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <a href="#" style="color: var(--color-primary);">
              ${renderComponent({ name: 'external-link', size: 'sm', ariaLabel: 'Opens in new window' })}
            </a>
            <a href="#" style="color: var(--color-primary);">
              ${renderComponent({ name: 'download', size: 'sm', ariaLabel: 'Download file' })}
            </a>
            <a href="#" style="color: var(--color-primary);">
              ${renderComponent({ name: 'share', size: 'sm', ariaLabel: 'Share this page' })}
            </a>
          </div>
          <code style="display: block; margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-muted);">ariaLabel: 'Description' (role="img")</code>
        </div>
      </div>
    `;
  },
};

/**
 * Inline with Text
 */
export const InlineWithText: Story = {
  render: () => {
    return `
      <div style="padding: 2rem; background: var(--color-background); font-size: 1rem; line-height: 1.6; color: var(--color-text);">
        <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          ${renderComponent({ name: 'check', color: 'success', size: 'sm', decorative: true })}
          Free shipping on orders over $50
        </p>
        <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          ${renderComponent({ name: 'lock', color: 'success', size: 'sm', decorative: true })}
          Secure checkout with SSL encryption
        </p>
        <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          ${renderComponent({ name: 'trophy', color: 'warning', size: 'sm', decorative: true })}
          Award-winning customer service
        </p>
        <p style="display: flex; align-items: center; gap: 0.5rem;">
          ${renderComponent({ name: 'star', color: 'warning', size: 'sm', decorative: true })}
          Rated 4.9/5 by 10,000+ customers
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
      <div style="padding: 2rem; background: #1a1a1a; color: #e5e5e5;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          ${['check', 'shield', 'star', 'heart', 'verified', 'trophy'].map(name => `
            <div style="text-align: center;">
              ${renderComponent({ name, size: 'lg' })}
              <div style="font-size: 0.75rem; margin-top: 0.5rem; color: #a0a0a0;">${name}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 2rem;">
          ${['shield', 'verified', 'trophy'].map(name => `
            <div style="text-align: center;">
              ${renderComponent({ name, size: 'xl', circle: true, circleColor: 'primary-light' })}
              <div style="font-size: 0.75rem; margin-top: 0.75rem; color: #a0a0a0;">circle</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
