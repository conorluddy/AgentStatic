// components/atoms/link/link.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Link Component Stories
 *
 * Semantic anchor element for navigation, external links, and downloads.
 * Supports multiple style variants, icons, and full accessibility features.
 *
 * ## Features
 * - 8 visual variants (default, muted, primary, underline, no-underline, hover-underline, cta, inherit)
 * - External link handling with security attributes
 * - Download link support
 * - Automatic external/download icons
 * - Custom icon support
 * - WCAG AA accessible
 * - Dark mode support
 * - Keyboard navigation
 */

// Component metadata
const meta: Meta = {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Link text content',
      defaultValue: 'Click me',
    },
    href: {
      control: 'text',
      description: 'Link destination URL',
      defaultValue: '#',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'muted',
        'primary',
        'underline',
        'no-underline',
        'hover-underline',
        'cta',
        'inherit',
      ],
      description: 'Visual style variant',
      defaultValue: 'default',
    },
    external: {
      control: 'boolean',
      description: 'Opens in new tab with security attributes',
      defaultValue: false,
    },
    download: {
      control: 'boolean',
      description: 'Triggers file download',
      defaultValue: false,
    },
    downloadFilename: {
      control: 'text',
      description: 'Custom filename for download',
    },
    disabled: {
      control: 'boolean',
      description: 'Non-interactive state',
      defaultValue: false,
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
        component:
          'A versatile link component supporting internal navigation, external links, downloads, and multiple visual variants. Fully accessible with WCAG AA compliance.',
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
            id: 'link-name',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Icon SVGs
const externalIcon = `<svg class="link-icon link-icon-external" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
  <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72z"/>
  <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z"/>
</svg>`;

const downloadIcon = `<svg class="link-icon link-icon-download" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
  <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75z"/>
  <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5z"/>
</svg>`;

// Render function
const renderComponent = (props: any) => {
  const {
    text = '',
    href = '#',
    variant = 'default',
    external = false,
    download = false,
    downloadFilename = '',
    iconStart = '',
    iconEnd = '',
    disabled = false,
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = ['link', `link-${variant}`];
  if (external) classList.push('link-external');
  if (className) classList.push(className);

  const classStr = classList.join(' ');

  // Determine target and rel
  const target = external ? '_blank' : '';
  const rel = external ? 'noopener noreferrer' : '';

  // Build attributes
  let attrs = `class="${classStr}" href="${href}"`;
  if (id) attrs += ` id="${id}"`;
  if (target) attrs += ` target="${target}"`;
  if (rel) attrs += ` rel="${rel}"`;
  if (download) {
    attrs += downloadFilename ? ` download="${downloadFilename}"` : ` download`;
  }
  if (disabled) attrs += ` aria-disabled="true" tabindex="-1"`;
  if (a11y.role) attrs += ` role="${a11y.role}"`;
  if (a11y.ariaLabel) attrs += ` aria-label="${a11y.ariaLabel}"`;
  if (a11y.ariaDescribedBy) attrs += ` aria-describedby="${a11y.ariaDescribedBy}"`;
  if (a11y.ariaLabelledBy) attrs += ` aria-labelledby="${a11y.ariaLabelledBy}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  // Build content
  let content = '';
  if (iconStart) {
    content += `<span class="link-icon">${iconStart}</span>`;
  }
  if (text) {
    content += `<span class="link-text">${text}</span>`;
  }
  if (iconEnd) {
    content += `<span class="link-icon">${iconEnd}</span>`;
  } else if (external) {
    content += externalIcon;
  } else if (download) {
    content += downloadIcon;
  }

  return `<a ${attrs}>${content}</a>`;
};

/**
 * Default link with standard styling and hover underline
 */
export const Default: Story = {
  args: {
    text: 'About Us',
    href: '/about',
    variant: 'default',
  },
  render: renderComponent,
};

/**
 * Muted variant for less prominent links
 */
export const Muted: Story = {
  args: {
    text: 'Privacy Policy',
    href: '/privacy',
    variant: 'muted',
  },
  render: renderComponent,
};

/**
 * Primary variant with emphasized styling
 */
export const Primary: Story = {
  args: {
    text: 'Learn More',
    href: '/learn',
    variant: 'primary',
  },
  render: renderComponent,
};

/**
 * Always underlined link
 */
export const Underline: Story = {
  args: {
    text: 'Contact Support',
    href: '/support',
    variant: 'underline',
  },
  render: renderComponent,
};

/**
 * No underline on hover
 */
export const NoUnderline: Story = {
  args: {
    text: 'Browse Products',
    href: '/products',
    variant: 'no-underline',
  },
  render: renderComponent,
};

/**
 * Animated underline appears on hover (modern effect)
 */
export const HoverUnderline: Story = {
  args: {
    text: 'Explore Features',
    href: '/features',
    variant: 'hover-underline',
  },
  render: renderComponent,
};

/**
 * CTA variant styled like a button for primary actions
 */
export const CTA: Story = {
  args: {
    text: 'Get Started',
    href: '/signup',
    variant: 'cta',
  },
  render: renderComponent,
};

/**
 * Inherit variant that takes color from parent
 */
export const Inherit: Story = {
  args: {
    text: 'Inherited Color Link',
    href: '#',
    variant: 'inherit',
  },
  render: (args: any) => {
    return `
      <div style="color: #059669; font-size: 1.5rem;">
        ${renderComponent(args)}
      </div>
    `;
  },
};

/**
 * External link with security attributes and icon
 */
export const External: Story = {
  args: {
    text: 'Visit GitHub',
    href: 'https://github.com',
    external: true,
  },
  render: renderComponent,
};

/**
 * Download link with download icon
 */
export const Download: Story = {
  args: {
    text: 'Download PDF',
    href: '/files/brochure.pdf',
    download: true,
    downloadFilename: 'company-brochure.pdf',
  },
  render: renderComponent,
};

/**
 * Disabled link (non-interactive)
 */
export const Disabled: Story = {
  args: {
    text: 'Coming Soon',
    href: '#',
    disabled: true,
  },
  render: renderComponent,
};

/**
 * All variants displayed together for comparison
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Default</p>
            ${renderComponent({ text: 'Default Link', href: '#', variant: 'default' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Muted</p>
            ${renderComponent({ text: 'Muted Link', href: '#', variant: 'muted' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Primary</p>
            ${renderComponent({ text: 'Primary Link', href: '#', variant: 'primary' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Underline</p>
            ${renderComponent({ text: 'Underlined', href: '#', variant: 'underline' })}
          </div>
        </div>
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">No Underline</p>
            ${renderComponent({ text: 'No Underline', href: '#', variant: 'no-underline' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Hover Underline</p>
            ${renderComponent({ text: 'Hover Me', href: '#', variant: 'hover-underline' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">CTA</p>
            ${renderComponent({ text: 'Call to Action', href: '#', variant: 'cta' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Inherit</p>
            <div style="color: #059669;">
              ${renderComponent({ text: 'Inherited', href: '#', variant: 'inherit' })}
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Link types comparison (internal, external, download)
 */
export const LinkTypes: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <strong style="display: block; margin-bottom: 0.5rem;">Internal Link:</strong>
          ${renderComponent({ text: 'About Page', href: '/about' })}
        </div>
        <div>
          <strong style="display: block; margin-bottom: 0.5rem;">External Link (opens in new tab):</strong>
          ${renderComponent({ text: 'Visit Example.com', href: 'https://example.com', external: true })}
        </div>
        <div>
          <strong style="display: block; margin-bottom: 0.5rem;">Download Link:</strong>
          ${renderComponent({ text: 'Download Brochure', href: '/files/brochure.pdf', download: true, downloadFilename: 'brochure.pdf' })}
        </div>
      </div>
    `;
  },
};

/**
 * Link states demonstration (hover, focus, visited, active)
 */
export const States: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <strong style="display: block; margin-bottom: 0.5rem;">Normal State:</strong>
          ${renderComponent({ text: 'Hover over me', href: '#normal' })}
        </div>
        <div>
          <strong style="display: block; margin-bottom: 0.5rem;">Disabled State:</strong>
          ${renderComponent({ text: 'Disabled link', href: '#disabled', disabled: true })}
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;">
            Note: Try tabbing to the link to see the focus state. Click to see the active state.
            Visited state appears after clicking the link.
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * CTA links comparison (multiple CTA examples)
 */
export const CTAVariations: Story = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        ${renderComponent({ text: 'Get Started', href: '/signup', variant: 'cta' })}
        ${renderComponent({ text: 'Learn More', href: '/learn', variant: 'cta' })}
        ${renderComponent({ text: 'Contact Sales', href: '/contact', variant: 'cta' })}
        ${renderComponent({ text: 'Download Now', href: '/download', variant: 'cta', download: true })}
      </div>
    `;
  },
};

/**
 * Links in different text contexts
 */
export const InTextContext: Story = {
  render: () => {
    return `
      <div style="max-width: 600px;">
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1rem;">
          This is a paragraph with a ${renderComponent({ text: 'default link', href: '#default' })}
          embedded in the text. You can also use a ${renderComponent({ text: 'primary link', href: '#primary', variant: 'primary' })}
          for more emphasis.
        </p>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1rem;">
          For external resources, we can use ${renderComponent({ text: 'external links', href: 'https://example.com', external: true })}
          that open in a new tab. Or if you need to ${renderComponent({ text: 'download a file', href: '/file.pdf', download: true })},
          we have that covered too.
        </p>
        <p style="font-size: 1rem; line-height: 1.6;">
          The ${renderComponent({ text: 'muted variant', href: '#muted', variant: 'muted' })} works well for
          less important links like privacy policies or terms of service.
        </p>
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    text: 'Link in Dark Mode',
    href: '#',
    variant: 'default',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args: any) => {
    return `
      <div data-theme="dark" style="padding: 2rem; background-color: #1f2937; border-radius: 8px;">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <p style="margin: 0 0 0.5rem 0; color: #d1d5db;">Default:</p>
            ${renderComponent({ ...args, variant: 'default', text: 'Default Link' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; color: #d1d5db;">Muted:</p>
            ${renderComponent({ ...args, variant: 'muted', text: 'Muted Link' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; color: #d1d5db;">Primary:</p>
            ${renderComponent({ ...args, variant: 'primary', text: 'Primary Link' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; color: #d1d5db;">CTA:</p>
            ${renderComponent({ ...args, variant: 'cta', text: 'Get Started' })}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; color: #d1d5db;">External:</p>
            ${renderComponent({ ...args, text: 'External Link', external: true })}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Accessibility features showcase
 */
export const Accessibility: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Keyboard Navigation</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            Try pressing Tab to navigate through these links. Focus indicators are clearly visible.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${renderComponent({ text: 'First Link', href: '#first' })}
            ${renderComponent({ text: 'Second Link', href: '#second' })}
            ${renderComponent({ text: 'Third Link', href: '#third' })}
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Screen Reader Support</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            External links include proper rel attributes. Links can have custom aria-labels.
          </p>
          ${renderComponent({
            text: 'GitHub Repository',
            href: 'https://github.com',
            external: true,
            a11y: { ariaLabel: 'Visit our GitHub repository (opens in new tab)' }
          })}
        </div>
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Contrast Compliance</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            All link colors meet WCAG AA contrast requirements (4.5:1 ratio).
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${renderComponent({ text: 'Default Link', href: '#', variant: 'default' })}
            ${renderComponent({ text: 'Muted Link', href: '#', variant: 'muted' })}
            ${renderComponent({ text: 'Primary Link', href: '#', variant: 'primary' })}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Real-world usage patterns
 */
export const RealWorldExamples: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin: 0 0 1rem 0;">Navigation Menu</h3>
          <nav style="display: flex; gap: 1.5rem; padding: 1rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({ text: 'Home', href: '/', variant: 'no-underline' })}
            ${renderComponent({ text: 'About', href: '/about', variant: 'no-underline' })}
            ${renderComponent({ text: 'Services', href: '/services', variant: 'no-underline' })}
            ${renderComponent({ text: 'Contact', href: '/contact', variant: 'no-underline' })}
          </nav>
        </div>
        <div>
          <h3 style="margin: 0 0 1rem 0;">Footer Links</h3>
          <footer style="display: flex; gap: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px; flex-wrap: wrap;">
            <div>
              <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Company</p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${renderComponent({ text: 'About Us', href: '/about', variant: 'muted' })}
                ${renderComponent({ text: 'Careers', href: '/careers', variant: 'muted' })}
                ${renderComponent({ text: 'Press', href: '/press', variant: 'muted' })}
              </div>
            </div>
            <div>
              <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Legal</p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${renderComponent({ text: 'Privacy', href: '/privacy', variant: 'muted' })}
                ${renderComponent({ text: 'Terms', href: '/terms', variant: 'muted' })}
                ${renderComponent({ text: 'Cookies', href: '/cookies', variant: 'muted' })}
              </div>
            </div>
          </footer>
        </div>
        <div>
          <h3 style="margin: 0 0 1rem 0;">Call to Action Section</h3>
          <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; color: white;">
            <h2 style="margin: 0 0 1rem 0;">Ready to get started?</h2>
            <p style="margin: 0 0 1.5rem 0;">Join thousands of satisfied customers today.</p>
            ${renderComponent({ text: 'Start Free Trial', href: '/signup', variant: 'cta' })}
          </div>
        </div>
      </div>
    `;
  },
};
