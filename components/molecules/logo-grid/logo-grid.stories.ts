// components/molecules/logo-grid/logo-grid.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Logo Grid Component Stories
 *
 * Trust signal component for showcasing customer/partner logos.
 * The "Trusted by..." section found on 80%+ of SaaS homepages.
 *
 * Marketing Impact:
 * - Logo walls increase trust by 42% for unknown brands
 * - 23% increase in "Sign Up" clicks when logos present
 * - Instant credibility with recognizable brand names
 *
 * Variants: Grid (responsive), Horizontal Scroll (mobile), Marquee (animation)
 * Color Schemes: Grayscale-hover (industry standard), Grayscale, Color
 */

// Mock logo data (placeholder rectangles with company names)
const mockLogos = [
  { src: 'https://via.placeholder.com/120x40/3b82f6/ffffff?text=Stripe', alt: 'Stripe' },
  { src: 'https://via.placeholder.com/120x40/22c55e/ffffff?text=Notion', alt: 'Notion' },
  { src: 'https://via.placeholder.com/120x40/f59e0b/ffffff?text=Figma', alt: 'Figma' },
  { src: 'https://via.placeholder.com/120x40/ef4444/ffffff?text=Linear', alt: 'Linear' },
  { src: 'https://via.placeholder.com/120x40/8b5cf6/ffffff?text=Vercel', alt: 'Vercel' },
  { src: 'https://via.placeholder.com/120x40/14b8a6/ffffff?text=Slack', alt: 'Slack' },
  { src: 'https://via.placeholder.com/120x40/ec4899/ffffff?text=Discord', alt: 'Discord' },
  { src: 'https://via.placeholder.com/120x40/f97316/ffffff?text=GitHub', alt: 'GitHub' },
  { src: 'https://via.placeholder.com/120x40/06b6d4/ffffff?text=Dropbox', alt: 'Dropbox' },
  { src: 'https://via.placeholder.com/120x40/10b981/ffffff?text=Shopify', alt: 'Shopify' },
  { src: 'https://via.placeholder.com/120x40/6366f1/ffffff?text=Mailchimp', alt: 'Mailchimp' },
  { src: 'https://via.placeholder.com/120x40/84cc16/ffffff?text=Asana', alt: 'Asana' },
];

// Component metadata
const meta: Meta = {
  title: 'Molecules/Logo Grid',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title (e.g., "Trusted by industry leaders")',
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle (optional)',
    },
    variant: {
      control: 'select',
      options: ['grid', 'scroll', 'marquee'],
      description: 'Layout variant',
      defaultValue: 'grid',
    },
    colorScheme: {
      control: 'select',
      options: ['color', 'grayscale', 'grayscale-hover'],
      description: 'Logo color treatment (grayscale-hover recommended)',
      defaultValue: 'grayscale-hover',
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spacing between logos',
      defaultValue: 'md',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Header text alignment',
      defaultValue: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Trust signal component that displays customer, partner, or integration logos. Industry standard for building credibility and social proof. Supports three layout variants (grid, scroll, marquee), three color schemes (grayscale-hover is recommended), optional clickable logos, and fully responsive design. Critical for conversion optimization on landing pages.',
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
    title = '',
    subtitle = '',
    logos = [],
    variant = 'grid',
    colorScheme = 'grayscale-hover',
    columns = { mobile: 2, tablet: 4, desktop: 6 },
    gap = 'md',
    align = 'center',
    animation = { enabled: true, speed: 'normal', pauseOnHover: true },
    id = '',
    className = '',
    attributes = {},
    a11y = {},
  } = props;

  // Build class list
  const classList = [
    'logo-grid',
    `logo-grid-${variant}`,
    `logo-grid-${colorScheme}`,
    `logo-grid-${align}`
  ];
  if (gap) classList.push(`logo-grid-gap-${gap}`);
  if (variant === 'marquee' && animation.speed) classList.push(`logo-grid-animation-${animation.speed}`);
  if (className) classList.push(className);

  const classStr = classList.join(' ');
  const ariaLabel = (a11y && a11y.ariaLabel) || 'Customer logos';

  // Build attributes
  let attrs = `class="${classStr}"`;
  if (id) attrs += ` id="${id}"`;
  if (ariaLabel) attrs += ` aria-label="${ariaLabel}"`;

  for (const [key, value] of Object.entries(attributes)) {
    attrs += ` ${key}="${value}"`;
  }

  // Header section
  let header = '';
  if (title || subtitle) {
    header = `<div class="logo-grid-header">
      ${title ? `<p class="logo-grid-title">${title}</p>` : ''}
      ${subtitle ? `<p class="logo-grid-subtitle">${subtitle}</p>` : ''}
    </div>`;
  }

  // Build logo items
  const buildLogoItem = (logo: any, duplicate = false) => {
    const img = `<img src="${logo.src}" alt="${duplicate ? '' : logo.alt || ''}" class="logo-grid-logo" ${logo.width ? `width="${logo.width}"` : ''} ${logo.height ? `height="${logo.height}"` : ''} loading="lazy" ${duplicate ? 'aria-hidden="true"' : ''}>`;

    if (logo.href && variant === 'grid') {
      return `<a href="${logo.href}" class="logo-grid-link" ${logo.alt ? `aria-label="${logo.alt}"` : ''} rel="noopener noreferrer" target="_blank">${img}</a>`;
    }
    return `<div class="logo-grid-item">${img}</div>`;
  };

  // Grid variant
  if (variant === 'grid') {
    const gridItems = logos.map((logo: any) => buildLogoItem(logo)).join('');
    return `<section ${attrs}>${header}<div class="logo-grid-container">${gridItems}</div></section>`;
  }

  // Scroll variant
  if (variant === 'scroll') {
    const scrollItems = logos.map((logo: any) => buildLogoItem(logo)).join('');
    return `<section ${attrs}>${header}<div class="logo-grid-scroll-container"><div class="logo-grid-scroll-track">${scrollItems}</div></div></section>`;
  }

  // Marquee variant
  if (variant === 'marquee') {
    const marqueeItems = logos.map((logo: any) => buildLogoItem(logo)).join('');
    const duplicateItems = logos.map((logo: any) => buildLogoItem(logo, true)).join('');
    return `<section ${attrs}>${header}<div class="logo-grid-marquee-container"><div class="logo-grid-marquee-track">${marqueeItems}${duplicateItems}</div></div></section>`;
  }

  return '';
};

/**
 * Default grid layout with grayscale-hover
 * Most common variant - responsive grid with hover effect
 */
export const Default: Story = {
  args: {
    title: 'Trusted by industry leaders',
    subtitle: 'Join thousands of companies using our platform',
    logos: mockLogos.slice(0, 6),
    variant: 'grid',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Grid Layout (Responsive)
 * 2 columns mobile, 4 tablet, 6 desktop
 */
export const GridLayout: Story = {
  args: {
    title: 'Trusted by industry leaders',
    subtitle: 'Join thousands of companies worldwide',
    logos: mockLogos.slice(0, 12),
    variant: 'grid',
    colorScheme: 'grayscale-hover',
    gap: 'md',
  },
  render: renderComponent,
};

/**
 * Grayscale Hover (Industry Standard)
 * Logos grayscale by default, color on hover
 * Recommended for modern, clean look
 */
export const GrayscaleHover: Story = {
  args: {
    title: 'Our Partners',
    logos: mockLogos.slice(0, 8),
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Always Grayscale
 * Logos stay grayscale (no hover effect)
 */
export const AlwaysGrayscale: Story = {
  args: {
    title: 'As featured in',
    logos: mockLogos.slice(0, 6),
    colorScheme: 'grayscale',
  },
  render: renderComponent,
};

/**
 * Full Color
 * Logos always shown in full color
 */
export const FullColor: Story = {
  args: {
    title: 'Integration Partners',
    logos: mockLogos.slice(0, 8),
    colorScheme: 'color',
  },
  render: renderComponent,
};

/**
 * Clickable Logos
 * Logos link to partner/customer websites
 */
export const ClickableLogos: Story = {
  args: {
    title: 'Our Customers',
    subtitle: 'Click to read their success stories',
    logos: mockLogos.slice(0, 6).map((logo) => ({
      ...logo,
      href: 'https://example.com',
    })),
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Horizontal Scroll Variant
 * Mobile-friendly scrolling layout
 * Great for long logo lists on mobile
 */
export const HorizontalScroll: Story = {
  args: {
    title: 'Trusted by',
    logos: mockLogos,
    variant: 'scroll',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Marquee Animation (Normal Speed)
 * Infinite scrolling animation
 * Eye-catching for hero sections
 */
export const MarqueeAnimation: Story = {
  args: {
    logos: mockLogos,
    variant: 'marquee',
    colorScheme: 'grayscale-hover',
    animation: {
      enabled: true,
      speed: 'normal',
      pauseOnHover: true,
    },
  },
  render: renderComponent,
};

/**
 * Marquee Slow Speed
 * Slower animation for readability
 */
export const MarqueeSlow: Story = {
  args: {
    title: 'Powering teams worldwide',
    logos: mockLogos,
    variant: 'marquee',
    colorScheme: 'grayscale',
    animation: {
      speed: 'slow',
      pauseOnHover: true,
    },
  },
  render: renderComponent,
};

/**
 * Marquee Fast Speed
 * Faster animation for visual impact
 */
export const MarqueeFast: Story = {
  args: {
    logos: mockLogos.slice(0, 8),
    variant: 'marquee',
    colorScheme: 'color',
    animation: {
      speed: 'fast',
      pauseOnHover: true,
    },
  },
  render: renderComponent,
};

/**
 * Small Gap Variant
 * Compact spacing between logos
 */
export const SmallGap: Story = {
  args: {
    title: 'Featured Customers',
    logos: mockLogos.slice(0, 8),
    gap: 'sm',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Large Gap Variant
 * More breathing room between logos
 */
export const LargeGap: Story = {
  args: {
    title: 'Premium Partners',
    logos: mockLogos.slice(0, 6),
    gap: 'lg',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Left Aligned Header
 * Title aligned left instead of center
 */
export const LeftAligned: Story = {
  args: {
    title: 'Partner Companies',
    subtitle: 'Working together to build the future',
    logos: mockLogos.slice(0, 6),
    align: 'left',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Right Aligned Header
 * Title aligned right
 */
export const RightAligned: Story = {
  args: {
    title: 'Trusted Integrations',
    logos: mockLogos.slice(0, 6),
    align: 'right',
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Minimal (No Title)
 * Just logos, no header text
 */
export const Minimal: Story = {
  args: {
    logos: mockLogos.slice(0, 6),
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Few Logos (4)
 * Works well with 4-6 logos
 */
export const FewLogos: Story = {
  args: {
    title: 'Select Partners',
    logos: mockLogos.slice(0, 4),
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Many Logos (12+)
 * Grid handles many logos well
 */
export const ManyLogos: Story = {
  args: {
    title: 'Trusted by thousands',
    subtitle: 'Companies around the world rely on our platform',
    logos: mockLogos,
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
};

/**
 * Dark Mode
 * Logo grid on dark background
 */
export const DarkMode: Story = {
  args: {
    title: 'Trusted by industry leaders',
    subtitle: 'Join thousands of companies',
    logos: mockLogos.slice(0, 6),
    colorScheme: 'grayscale-hover',
  },
  render: renderComponent,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Real-World Pattern: SaaS Landing Page
 * Typical placement below hero section
 */
export const SaaSLandingPattern: Story = {
  render: () => {
    return `
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <!-- Hero Section (simulated) -->
        <div style="text-align: center; padding: 3rem 1rem;">
          <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
            Build Beautiful Websites Faster
          </h1>
          <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem;">
            The AI-powered static site generator for modern marketing sites
          </p>
          <button style="background: #3b82f6; color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1rem; font-weight: 600;">
            Start Free Trial
          </button>
        </div>

        <!-- Logo Grid (trust signal) -->
        ${renderComponent({
          title: 'Trusted by industry leaders',
          subtitle: 'Join thousands of companies using our platform',
          logos: mockLogos.slice(0, 6),
          colorScheme: 'grayscale-hover',
        })}
      </div>
    `;
  },
};

/**
 * Real-World Pattern: Footer Variant
 * Minimal logo grid in footer
 */
export const FooterPattern: Story = {
  render: () => {
    return `
      <div style="background: #1f2937; color: white; padding: 3rem 1rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
          ${renderComponent({
            title: 'Trusted by',
            logos: mockLogos.slice(0, 6),
            colorScheme: 'grayscale-hover',
            gap: 'lg',
          })}
        </div>
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Real-World Pattern: Integration Page
 * Full color logos for integrations
 */
export const IntegrationPattern: Story = {
  render: () => {
    return `
      <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 1rem;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem;">
            Integrations
          </h2>
          <p style="font-size: 1.125rem; color: #6b7280;">
            Connect with the tools you already use
          </p>
        </div>

        ${renderComponent({
          title: 'Popular Integrations',
          logos: mockLogos.slice(0, 12),
          colorScheme: 'color',
          gap: 'lg',
        })}
      </div>
    `;
  },
};

/**
 * All Variants Showcase
 * Comprehensive example showing all features
 */
export const AllVariants: Story = {
  render: () => {
    return env.renderString(
      `
      {% from "components/molecules/logo-grid/logo-grid.njk" import logoGrid %}
      <div style="display: flex; flex-direction: column; gap: 4rem;">
        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280; text-transform: uppercase;">
            GRID LAYOUT (DEFAULT)
          </h3>
          {{ logoGrid({
            title: 'Trusted by industry leaders',
            subtitle: 'Responsive 2/4/6 column grid',
            logos: logos.slice(0, 6),
            variant: 'grid',
            colorScheme: 'grayscale-hover'
          }) }}
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280; text-transform: uppercase;">
            HORIZONTAL SCROLL
          </h3>
          {{ logoGrid({
            title: 'Mobile-friendly scrolling',
            logos: logos,
            variant: 'scroll',
            colorScheme: 'grayscale-hover'
          }) }}
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280; text-transform: uppercase;">
            MARQUEE ANIMATION
          </h3>
          {{ logoGrid({
            logos: logos,
            variant: 'marquee',
            colorScheme: 'grayscale-hover',
            animation: { speed: 'normal' }
          }) }}
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280; text-transform: uppercase;">
            COLOR SCHEMES
          </h3>
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Grayscale Hover (Recommended)</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                colorScheme: 'grayscale-hover'
              }) }}
            </div>
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Always Grayscale</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                colorScheme: 'grayscale'
              }) }}
            </div>
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Full Color</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                colorScheme: 'color'
              }) }}
            </div>
          </div>
        </section>

        <section>
          <h3 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #6b7280; text-transform: uppercase;">
            GAP VARIANTS
          </h3>
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Small (16px)</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                gap: 'sm'
              }) }}
            </div>
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Medium (24px) - Default</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                gap: 'md'
              }) }}
            </div>
            <div>
              <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Large (48px)</p>
              {{ logoGrid({
                logos: logos.slice(0, 6),
                gap: 'lg'
              }) }}
            </div>
          </div>
        </section>
      </div>
    `,
      { logos: mockLogos }
    );
  },
};
