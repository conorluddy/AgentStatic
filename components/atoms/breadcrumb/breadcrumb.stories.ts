// components/atoms/breadcrumb/breadcrumb.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Breadcrumb Component Stories
 *
 * Navigation trail showing current location in site hierarchy.
 * Displays path from home to current page with proper ARIA markup and Schema.org support.
 *
 * ## Features
 * - Multiple separator styles (chevron, slash, arrow, dot)
 * - Size variants (sm, md, lg)
 * - Mobile responsive collapse
 * - Schema.org structured data for SEO
 * - Text truncation option
 * - WCAG AA accessible
 * - Dark mode support
 * - Keyboard navigation
 */

// Chevron separator icon
const chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
  <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06z"/>
</svg>`;


// Component metadata
const meta: Meta = {
  title: 'Atoms/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb trail items',
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Shoes' },
      ],
    },
    separator: {
      control: 'select',
      options: ['chevron', 'slash', 'arrow', 'dot'],
      description: 'Separator style between items',
      defaultValue: 'chevron',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    truncate: {
      control: 'boolean',
      description: 'Enable text truncation for long items',
      defaultValue: false,
    },
    schema: {
      control: 'boolean',
      description: 'Include Schema.org structured data for SEO',
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
          'Accessible breadcrumb navigation showing page hierarchy. Supports multiple separator styles, mobile collapse, and SEO-optimized Schema.org markup for rich search results.',
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
            id: 'aria-allowed-attr',
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
    items = [],
    separator = 'chevron',
    size = 'md',
    truncate = false,
    schema = false,
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = ['breadcrumb'];
  // Always add size class to ensure all size variants work correctly
  if (size) classList.push(`breadcrumb-${size}`);
  if (truncate) classList.push('breadcrumb-truncate');
  if (className) classList.push(className);

  const classStr = classList.join(' ');
  const ariaLabel = (a11y && a11y.ariaLabel) || 'Breadcrumb';

  // Build attributes
  let attrs = `class="${classStr}" aria-label="${ariaLabel}"`;
  if (id) attrs += ` id="${id}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  // Schema.org structured data
  let schemaData = '';
  if (schema) {
    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        ...(item.href && { "item": item.href })
      }))
    };
    schemaData = `<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>`;
  }

  // Build breadcrumb items
  const breadcrumbItems = items.map((item: any, index: number) => {
    const isLast = index === items.length - 1;
    const separatorHtml = index > 0 ? `<span class="breadcrumb-separator breadcrumb-separator-${separator}" aria-hidden="true">${separator === 'chevron' ? chevronIcon : ''}</span>` : '';

    let itemContent;
    if (item.href && !isLast) {
      itemContent = `<a href="${item.href}" class="breadcrumb-link link link-inherit">${item.label}</a>`;
    } else {
      itemContent = `<span class="breadcrumb-current" aria-current="page">${item.label}</span>`;
    }

    return `<li class="breadcrumb-item">${separatorHtml}${itemContent}</li>`;
  }).join('');

  return `${schemaData}<nav ${attrs}><ol class="breadcrumb-list">${breadcrumbItems}</ol></nav>`;
};

/**
 * Default breadcrumb with chevron separator (most common pattern)
 */
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Shoes' },
    ],
    separator: 'chevron',
  },
  render: renderComponent,
};

/**
 * Slash separator (classic style)
 */
export const SlashSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: '2024', href: '/blog/2024' },
      { label: 'Article Title' },
    ],
    separator: 'slash',
  },
  render: renderComponent,
};

/**
 * Arrow separator (directional flow)
 */
export const ArrowSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Getting Started' },
    ],
    separator: 'arrow',
  },
  render: renderComponent,
};

/**
 * Dot separator (minimal style)
 */
export const DotSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Support', href: '/support' },
      { label: 'FAQ' },
    ],
    separator: 'dot',
  },
  render: renderComponent,
};

/**
 * Small size variant for compact layouts
 */
export const SmallSize: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Account', href: '/account' },
      { label: 'Settings' },
    ],
    size: 'sm',
  },
  render: renderComponent,
};

/**
 * Large size variant for emphasis
 */
export const LargeSize: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Premium Collection' },
    ],
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * Long breadcrumb trail (demonstrates mobile collapse)
 */
export const LongBreadcrumb: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Electronics', href: '/electronics' },
      { label: 'Computers', href: '/electronics/computers' },
      { label: 'Laptops', href: '/electronics/computers/laptops' },
      { label: 'Gaming Laptops', href: '/electronics/computers/laptops/gaming' },
      { label: 'MacBook Pro 16"' },
    ],
  },
  render: (args: any) => {
    return `
      <div style="max-width: 600px; padding: 1rem; border: 1px dashed #d1d5db; border-radius: 8px;">
        <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
          Resize your browser to see mobile collapse behavior (first item ... last two items)
        </p>
        ${renderComponent(args)}
      </div>
    `;
  },
};

/**
 * With text truncation enabled for very long item labels
 */
export const WithTruncation: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Very Long Category Name That Should Be Truncated', href: '/category' },
      { label: 'Another Extremely Long Subcategory Name', href: '/category/subcategory' },
      { label: 'Current Page with Long Title' },
    ],
    truncate: true,
  },
  render: renderComponent,
};

/**
 * With Schema.org structured data for SEO rich snippets
 */
export const WithSchemaOrg: Story = {
  args: {
    items: [
      { label: 'Home', href: 'https://example.com/' },
      { label: 'Products', href: 'https://example.com/products' },
      { label: 'Athletic Shoes', href: 'https://example.com/products/athletic-shoes' },
      { label: 'Nike Air Max 90' },
    ],
    schema: true,
  },
  render: (args: any) => {
    return `
      <div>
        ${renderComponent(args)}
        <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
          ✓ Includes Schema.org BreadcrumbList JSON-LD (view page source to see structured data)
        </p>
      </div>
    `;
  },
};

/**
 * All separator styles displayed together for comparison
 */
export const AllSeparators: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Shoes' },
    ];

    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Chevron (default)</p>
          ${renderComponent({ items, separator: 'chevron' })}
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Slash</p>
          ${renderComponent({ items, separator: 'slash' })}
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Arrow</p>
          ${renderComponent({ items, separator: 'arrow' })}
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Dot</p>
          ${renderComponent({ items, separator: 'dot' })}
        </div>
      </div>
    `;
  },
};

/**
 * All size variants displayed together
 */
export const AllSizes: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current Page' },
    ];

    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Small</p>
          ${renderComponent({ items, size: 'sm' })}
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Medium (default)</p>
          ${renderComponent({ items, size: 'md' })}
        </div>
        <div>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Large</p>
          ${renderComponent({ items, size: 'lg' })}
        </div>
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current Page' },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args: any) => {
    return `
      <div data-theme="dark" style="padding: 2rem; background-color: #1f2937; border-radius: 8px;">
        ${renderComponent(args)}
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
            Try pressing Tab to navigate through breadcrumb links. Focus indicators are clearly visible.
          </p>
          ${renderComponent({
            items: [
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Category', href: '/products/category' },
              { label: 'Current Page' },
            ],
          })}
        </div>
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Screen Reader Support</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            Uses semantic HTML (nav, ol, li), aria-label for navigation landmark, and aria-current for current page.
          </p>
          ${renderComponent({
            items: [
              { label: 'Home', href: '/' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Getting Started' },
            ],
            a11y: { ariaLabel: 'Documentation breadcrumb navigation' },
          })}
        </div>
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Contrast Compliance</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            All text colors meet WCAG AA contrast requirements (4.5:1 ratio for text).
          </p>
          ${renderComponent({
            items: [
              { label: 'Home', href: '/' },
              { label: 'Support', href: '/support' },
              { label: 'Contact Us' },
            ],
          })}
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
          <h3 style="margin: 0 0 1rem 0;">E-commerce Product Page</h3>
          <div style="padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Home', href: '/' },
                { label: 'Men', href: '/men' },
                { label: 'Shoes', href: '/men/shoes' },
                { label: 'Athletic', href: '/men/shoes/athletic' },
                { label: 'Nike Air Max 90' },
              ],
              schema: true,
            })}
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
              <h1 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">Nike Air Max 90</h1>
              <p style="margin: 0; color: #6b7280;">$129.99</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0;">Documentation Site</h3>
          <div style="padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Docs', href: '/docs' },
                { label: 'Components', href: '/docs/components' },
                { label: 'Atoms', href: '/docs/components/atoms' },
                { label: 'Breadcrumb' },
              ],
              separator: 'slash',
              size: 'sm',
            })}
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
              <h1 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">Breadcrumb Component</h1>
              <p style="margin: 0; color: #6b7280;">Navigation trail component for site hierarchy</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0;">Blog Article</h3>
          <div style="padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Blog', href: '/blog' },
                { label: '2024', href: '/blog/2024' },
                { label: 'Web Development', href: '/blog/2024/web-development' },
                { label: 'Getting Started with CSS Cascade Layers' },
              ],
              separator: 'chevron',
              schema: true,
            })}
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
              <h1 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">Getting Started with CSS Cascade Layers</h1>
              <p style="margin: 0; color: #6b7280;">Published on March 15, 2024</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0;">Multi-level Category Navigation</h3>
          <div style="padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Home', href: '/' },
                { label: 'Electronics', href: '/electronics' },
                { label: 'Audio', href: '/electronics/audio' },
                { label: 'Headphones', href: '/electronics/audio/headphones' },
                { label: 'Wireless', href: '/electronics/audio/headphones/wireless' },
                { label: 'Sony WH-1000XM5' },
              ],
              truncate: true,
            })}
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
              <h1 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">Sony WH-1000XM5</h1>
              <p style="margin: 0; color: #6b7280;">Premium wireless noise-cancelling headphones</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Mobile responsive behavior demonstration
 */
export const MobileResponsive: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Desktop View (full breadcrumb)</h3>
          <div style="min-width: 600px; padding: 1rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Category', href: '/products/category' },
                { label: 'Subcategory', href: '/products/category/subcategory' },
                { label: 'Current Page' },
              ],
            })}
          </div>
        </div>
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Mobile View (collapsed)</h3>
          <div style="max-width: 375px; padding: 1rem; background: #f9fafb; border-radius: 8px;">
            ${renderComponent({
              items: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Category', href: '/products/category' },
                { label: 'Subcategory', href: '/products/category/subcategory' },
                { label: 'Current Page' },
              ],
            })}
            <p style="margin-top: 1rem; font-size: 0.75rem; color: #6b7280;">
              Mobile shows: First item ... last two items
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * SEO optimization with Schema.org markup
 */
export const SEOOptimized: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
        <div>
          <h3 style="margin: 0 0 0.5rem 0;">Schema.org BreadcrumbList</h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">
            Enable the <code>schema</code> prop to include JSON-LD structured data for search engine rich snippets.
            This helps search engines understand your site structure and display breadcrumbs in search results.
          </p>
          ${renderComponent({
            items: [
              { label: 'Home', href: 'https://example.com/' },
              { label: 'Blog', href: 'https://example.com/blog' },
              { label: '2024', href: 'https://example.com/blog/2024' },
              { label: 'Article Title' },
            ],
            schema: true,
          })}
        </div>
        <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; font-size: 0.875rem; font-weight: 600;">Benefits:</p>
          <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; font-size: 0.875rem; color: #6b7280;">
            <li>Enhanced search result display</li>
            <li>Better SEO ranking signals</li>
            <li>Improved user experience in SERPs</li>
            <li>Google rich snippets support</li>
          </ul>
        </div>
      </div>
    `;
  },
};
