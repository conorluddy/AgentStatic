// components/atoms/icon/icon.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

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

// Icon path map (subset for demos - full set in icon.njk)
const iconPaths: Record<string, string> = {
  'check': 'M20 6L9 17l-5-5',
  'x': 'M18 6L6 18M6 6l12 12',
  'chevron-right': 'M9 18l6-6-6-6',
  'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'heart': 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  'shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'twitter': 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  'github': 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
};

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
const renderComponent = (props: any) => {
  const {
    name = 'check',
    size = 'md',
    color = '',
    circle = false,
    circleColor = '',
    decorative = false,
    ariaLabel = '',
    className = '',
    attributes = {},
  } = props;

  // Build class list
  const classList = ['icon'];
  if (size) classList.push(`icon-${size}`);
  if (color) classList.push(`icon-${color}`);
  if (circle) {
    classList.push('icon-circle');
    if (circleColor) classList.push(`icon-circle-${circleColor}`);
  }
  if (className) classList.push(className);

  const classStr = classList.join(' ');

  // Get icon path (fallback to check if not found)
  const path = iconPaths[name] || iconPaths['check'];

  // Determine stroke width
  const strokeWidth = (name === 'star' || name === 'heart') ? 1.5 : 2;

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (decorative) attrs += ` aria-hidden="true"`;
  if (ariaLabel && !decorative) attrs += ` aria-label="${ariaLabel}" role="img"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  return `<span ${attrs}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      <path d="${path}" />
    </svg>
  </span>`;
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
