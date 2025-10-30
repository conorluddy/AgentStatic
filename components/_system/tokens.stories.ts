import type { Meta, StoryObj } from '@storybook/html';

/**
 * Design Tokens Story
 *
 * Visualizes all design system tokens including:
 * - Typography (font sizes, weights, line heights)
 * - Colors (brand, semantic, neutrals)
 * - Spacing scale
 * - Border radius
 * - Shadows
 * - Transitions
 *
 * These tokens are the foundation of the AgentStatic component library.
 */

const meta: Meta = {
  title: 'Foundation/Design Tokens',
  parameters: {
    docs: {
      description: {
        component: 'Core design system tokens using CSS custom properties. These values provide consistency across all components and support automatic dark mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Typography Scale Story
export const Typography: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Typography Scale</h2>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Font Sizes</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-xs</code>
            <span style="font-size: var(--font-size-xs);">The quick brown fox jumps (0.563rem / ~9px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-sm</code>
            <span style="font-size: var(--font-size-sm);">The quick brown fox jumps (0.75rem / ~12px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-base</code>
            <span style="font-size: var(--font-size-base);">The quick brown fox jumps (1rem / 16px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-lg</code>
            <span style="font-size: var(--font-size-lg);">The quick brown fox jumps (1.333rem / ~21px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-xl</code>
            <span style="font-size: var(--font-size-xl);">The quick brown fox (1.777rem / ~28px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-2xl</code>
            <span style="font-size: var(--font-size-2xl);">The quick brown (2.369rem / ~38px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-3xl</code>
            <span style="font-size: var(--font-size-3xl);">Quick Brown (3.157rem / ~51px)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 120px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-size-4xl</code>
            <span style="font-size: var(--font-size-4xl);">Display (4.209rem / ~67px)</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Font Weights</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 160px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-weight-light</code>
            <span style="font-weight: var(--font-weight-light); font-size: var(--font-size-lg);">Light weight text (300)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 160px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-weight-normal</code>
            <span style="font-weight: var(--font-weight-normal); font-size: var(--font-size-lg);">Normal weight text (400)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 160px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-weight-medium</code>
            <span style="font-weight: var(--font-weight-medium); font-size: var(--font-size-lg);">Medium weight text (500)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 160px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-weight-semibold</code>
            <span style="font-weight: var(--font-weight-semibold); font-size: var(--font-size-lg);">Semibold weight text (600)</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 2rem;">
            <code style="width: 160px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--font-weight-bold</code>
            <span style="font-weight: var(--font-weight-bold); font-size: var(--font-size-lg);">Bold weight text (700)</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Color Palette Story
export const Colors: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Color Palette</h2>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Primary Colors</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
          ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="height: 80px; background: var(--color-primary-${shade}); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"></div>
              <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">primary-${shade}</code>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Secondary Colors</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
          ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="height: 80px; background: var(--color-secondary-${shade}); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"></div>
              <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">secondary-${shade}</code>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Gray Scale</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
          ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="height: 80px; background: var(--color-gray-${shade}); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"></div>
              <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">gray-${shade}</code>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); color: var(--color-text);">Semantic Colors</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="height: 80px; background: var(--color-success); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: var(--font-weight-semibold);">Success</div>
            <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">--color-success</code>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="height: 80px; background: var(--color-warning); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: var(--font-weight-semibold);">Warning</div>
            <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">--color-warning</code>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="height: 80px; background: var(--color-error); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: var(--font-weight-semibold);">Error</div>
            <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">--color-error</code>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="height: 80px; background: var(--color-info); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: var(--font-weight-semibold);">Info</div>
            <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted);">--color-info</code>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Spacing Scale Story
export const Spacing: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Spacing Scale</h2>
      <p style="margin-bottom: 2rem; font-size: var(--font-size-base); color: var(--color-text-muted);">8px base grid for consistent vertical and horizontal rhythm</p>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${[
          { name: 'xs', value: '0.25rem', px: '4px' },
          { name: 'sm', value: '0.5rem', px: '8px' },
          { name: 'md', value: '1rem', px: '16px' },
          { name: 'lg', value: '1.5rem', px: '24px' },
          { name: 'xl', value: '2rem', px: '32px' },
          { name: '2xl', value: '3rem', px: '48px' },
          { name: '3xl', value: '4rem', px: '64px' },
          { name: '4xl', value: '6rem', px: '96px' },
        ].map(({ name, value, px }) => `
          <div style="display: flex; align-items: center; gap: 2rem;">
            <code style="width: 140px; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">--spacing-${name}</code>
            <div style="height: 32px; width: var(--spacing-${name}); background: var(--color-primary-500); border-radius: var(--border-radius-sm);"></div>
            <span style="font-size: var(--font-size-sm); color: var(--color-text-muted);">${value} (${px})</span>
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

// Border Radius Story
export const BorderRadius: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Border Radius</h2>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 2rem;">
        ${[
          { name: 'sm', value: '0.25rem', px: '4px' },
          { name: 'md', value: '0.5rem', px: '8px' },
          { name: 'lg', value: '0.75rem', px: '12px' },
          { name: 'xl', value: '1rem', px: '16px' },
          { name: '2xl', value: '1.5rem', px: '24px' },
          { name: 'full', value: '9999px', px: 'full' },
        ].map(({ name, value, px }) => `
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
            <div style="width: 100px; height: 100px; background: var(--color-primary-500); border-radius: var(--border-radius-${name});"></div>
            <div style="text-align: center;">
              <code style="font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-muted); display: block;">radius-${name}</code>
              <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">${value} (${px})</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

// Shadows Story
export const Shadows: Story = {
  render: () => `
    <div style="padding: 2rem; background: var(--color-surface-alt);">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Shadow System</h2>
      <p style="margin-bottom: 2rem; font-size: var(--font-size-base); color: var(--color-text-muted);">Elevation and depth for layered UI</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 3rem;">
        ${['sm', 'md', 'lg', 'xl', '2xl'].map(size => `
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
            <div style="width: 150px; height: 150px; background: var(--color-surface); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-${size}); display: flex; align-items: center; justify-content: center;">
              <code style="font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted);">shadow-${size}</code>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

// Complete Token Reference
export const AllTokens: Story = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 2rem; font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">Complete Token Reference</h2>
      <p style="margin-bottom: 2rem; font-size: var(--font-size-base); color: var(--color-text-muted);">
        All design tokens are defined in <code style="font-family: var(--font-mono); background: var(--color-surface-alt); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-sm);">components/_system/tokens.css</code>
      </p>

      <div style="display: grid; gap: 2rem;">
        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Typography</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Font sizes (xs-5xl), weights (light-bold), line heights (tight-loose), and system font stacks</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Colors</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Primary (blue), secondary (green), gray scale (50-900), semantic (success, warning, error, info), and surface colors</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Spacing</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">8px base grid with scale from xs (4px) to 5xl (128px)</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Borders</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Widths (thin-thick), radius (sm-full), and semantic border colors</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Shadows</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Elevation scale from sm to 2xl, plus inner and focus ring shadows</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Transitions</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Timing scale (fast-slowest) with ease-in-out curves, respects prefers-reduced-motion</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Z-Index</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Layering hierarchy from base (0) to top (50)</p>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg);">
          <h3 style="margin-bottom: 1rem; font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); color: var(--color-text);">Breakpoints & Containers</h3>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Responsive breakpoints (sm-2xl) and content container widths (xs-5xl)</p>
        </div>
      </div>

      <div style="margin-top: 3rem; padding: 1.5rem; background: var(--color-info-bg); border-left: 4px solid var(--color-info); border-radius: var(--border-radius-md);">
        <h4 style="margin-bottom: 0.5rem; font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); color: var(--color-text);">Dark Mode Support</h4>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">All color tokens automatically adapt for dark mode via <code style="font-family: var(--font-mono);">[data-theme="dark"]</code> attribute. Toggle the theme in the Storybook toolbar to see the changes.</p>
      </div>
    </div>
  `,
};
