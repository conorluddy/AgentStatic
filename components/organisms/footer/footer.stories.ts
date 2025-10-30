import type { Meta, StoryObj } from '@storybook/html';
import nunjucks from 'nunjucks';

/**
 * Footer Organism Stories
 *
 * Site-wide footer with multi-column navigation, newsletter signup,
 * social links, legal compliance, and trust signals.
 *
 * Marketing-optimized for:
 * - Newsletter email capture (owned audience building)
 * - Trust signals (security badges, payment icons)
 * - Social proof (follower counts, certifications)
 * - Legal compliance (GDPR/CCPA)
 */

// Configure Nunjucks
const env = nunjucks.configure('components', { autoescape: true });

// Helper to render footer
const renderFooter = (props: any) => {
  return env.render('organisms/footer/footer.njk', { props });
};

// Social media icons (reusable)
const socialIcons = {
  twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>',
  github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  discord: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
};

// Trust badge icons
const badgeIcons = {
  secure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"/></svg>',
  shipping: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
  moneyback: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.5 7.5A.5.5 0 0 1 6 7h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-4zm4-4a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 0 1H10v.5a.5.5 0 0 1-1 0V5H8.5a.5.5 0 0 1 0-1H9v-.5a.5.5 0 0 1 .5-.5z"/></svg>',
};

const meta: Meta = {
  title: 'Organisms/Footer',
  parameters: {
    docs: {
      description: {
        component: 'Site-wide footer organism with multi-column navigation, newsletter signup, social links, legal compliance, and trust signals. Marketing-optimized for email list building and conversion.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'minimal', 'centered'],
      description: 'Visual style variant',
    },
    layout: {
      control: 'select',
      options: ['default', 'minimal', 'centered'],
      description: 'Layout pattern',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default Footer
 * Complete 4-column footer with all features enabled
 */
export const Default: Story = {
  render: () => renderFooter({
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=AgentStatic',
        alt: 'AgentStatic',
        href: '/',
      },
      tagline: 'Building better websites, faster.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
          { text: 'Templates', href: '/templates' },
          { text: 'Changelog', href: '/changelog' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Careers', href: '/careers' },
          { text: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Documentation', href: '/docs' },
          { text: 'API Reference', href: '/api' },
          { text: 'Support', href: '/support' },
          { text: 'Status', href: 'https://status.example.com', external: true },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', href: 'https://twitter.com/agentstatic', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com/company/agentstatic', icon: socialIcons.linkedin },
      { platform: 'GitHub', href: 'https://github.com/agentstatic', icon: socialIcons.github },
    ],
    legal: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' },
    ],
    copyright: '© 2024 AgentStatic. All rights reserved.',
  }),
};

/**
 * Dark Variant
 * Footer with dark background for high contrast
 */
export const DarkVariant: Story = {
  render: () => renderFooter({
    variant: 'dark',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/FFFFFF/3B82F6?text=AgentStatic',
        alt: 'AgentStatic',
      },
      tagline: 'Building better websites, faster.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'GitHub', href: 'https://github.com', icon: socialIcons.github },
    ],
    copyright: '© 2024 AgentStatic.',
  }),
};

/**
 * With Newsletter Signup
 * Footer with prominent newsletter email capture section
 * Critical for building owned audience (not reliant on social algorithms)
 */
export const WithNewsletterSignup: Story = {
  render: () => renderFooter({
    variant: 'dark',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/FFFFFF/3B82F6?text=ProductName',
        alt: 'ProductName',
      },
      tagline: 'Build better products, faster.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
          { text: 'Integrations', href: '/integrations' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Careers', href: '/careers' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Docs', href: '/docs' },
          { text: 'Support', href: '/support' },
          { text: 'Status', href: 'https://status.example.com', external: true },
        ],
      },
    ],
    newsletter: {
      enabled: true,
      title: 'Stay Updated',
      description: 'Get product updates and weekly insights.',
      inputId: 'footer-newsletter',
      buttonText: 'Subscribe',
      trustText: 'No spam. Unsubscribe anytime.',
    },
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
      { platform: 'GitHub', href: 'https://github.com', icon: socialIcons.github },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
    ],
    copyright: '© 2024 ProductName. All rights reserved.',
  }),
};

/**
 * Minimal Footer
 * Simplified 2-column layout with essentials only
 */
export const MinimalFooter: Story = {
  render: () => renderFooter({
    layout: 'minimal',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Minimal',
        alt: 'Company',
      },
      tagline: 'Simple, powerful tools.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'GitHub', href: 'https://github.com', icon: socialIcons.github },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
    ],
    copyright: '© 2024 Company.',
  }),
};

/**
 * Centered Layout
 * Center-aligned single-column footer
 */
export const CenteredLayout: Story = {
  render: () => renderFooter({
    layout: 'centered',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Centered',
        alt: 'Centered',
      },
      tagline: 'Join our growing community.',
    },
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
      { platform: 'Instagram', href: 'https://instagram.com', icon: socialIcons.instagram },
      { platform: 'Facebook', href: 'https://facebook.com', icon: socialIcons.facebook },
    ],
    columns: [
      {
        title: 'Community',
        links: [
          { text: 'Forum', href: '/forum' },
          { text: 'Events', href: '/events' },
          { text: 'Blog', href: '/blog' },
        ],
      },
    ],
    copyright: '© 2024 Community.',
  }),
};

/**
 * With Trust Badges
 * Footer with security and payment trust badges
 * Trust badges increase conversion by 42% for unknown brands (Nielsen Norman)
 */
export const WithTrustBadges: Story = {
  render: () => renderFooter({
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Shop',
        alt: 'Shop',
      },
    },
    columns: [
      {
        title: 'Shop',
        links: [
          { text: 'New Arrivals', href: '/shop/new' },
          { text: 'Best Sellers', href: '/shop/bestsellers' },
          { text: 'Sale', href: '/shop/sale' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { text: 'Contact', href: '/contact' },
          { text: 'Shipping', href: '/shipping' },
          { text: 'Returns', href: '/returns' },
        ],
      },
    ],
    badges: [
      { text: 'Secure Payment', icon: badgeIcons.secure },
      { text: 'Free Shipping', icon: badgeIcons.shipping },
      { text: 'Money Back', icon: badgeIcons.moneyback },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
    ],
    copyright: '© 2024 Shop. All rights reserved.',
  }),
};

/**
 * SaaS Footer
 * Real-world SaaS pattern with comprehensive navigation
 */
export const SaaSFooter: Story = {
  render: () => renderFooter({
    variant: 'dark',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/FFFFFF/3B82F6?text=SaaS',
        alt: 'SaaS Product',
      },
      tagline: 'The complete platform for modern teams.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
          { text: 'Integrations', href: '/integrations' },
          { text: 'Changelog', href: '/changelog' },
          { text: 'Roadmap', href: '/roadmap' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Blog', href: '/blog' },
          { text: 'Careers', href: '/careers' },
          { text: 'Press', href: '/press' },
          { text: 'Partners', href: '/partners' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Documentation', href: '/docs' },
          { text: 'API Reference', href: '/api' },
          { text: 'Guides', href: '/guides' },
          { text: 'Support', href: '/support' },
          { text: 'Status', href: 'https://status.example.com', external: true },
        ],
      },
    ],
    newsletter: {
      enabled: true,
      title: 'Stay Updated',
      description: 'Product updates, tips, and company news.',
      inputId: 'saas-newsletter',
      trustText: 'Join 10,000+ subscribers. No spam.',
    },
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
      { platform: 'GitHub', href: 'https://github.com', icon: socialIcons.github },
    ],
    legal: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' },
      { text: 'GDPR', href: '/gdpr' },
    ],
    copyright: '© 2024 SaaS Product. All rights reserved.',
  }),
};

/**
 * Agency Footer
 * Creative agency/studio footer pattern
 */
export const AgencyFooter: Story = {
  render: () => renderFooter({
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Studio',
        alt: 'Studio',
      },
      tagline: 'Creative digital experiences.',
    },
    columns: [
      {
        title: 'Services',
        links: [
          { text: 'Brand Design', href: '/services/brand' },
          { text: 'Web Design', href: '/services/web' },
          { text: 'Development', href: '/services/dev' },
          { text: 'Strategy', href: '/services/strategy' },
        ],
      },
      {
        title: 'Work',
        links: [
          { text: 'Portfolio', href: '/work' },
          { text: 'Case Studies', href: '/case-studies' },
          { text: 'Clients', href: '/clients' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { text: 'hello@studio.com', href: 'mailto:hello@studio.com' },
          { text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
          { text: 'San Francisco, CA', href: '/contact' },
        ],
      },
    ],
    social: [
      { platform: 'Instagram', href: 'https://instagram.com', icon: socialIcons.instagram },
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
    ],
    copyright: '© 2024 Studio. All rights reserved.',
  }),
};

/**
 * E-commerce Footer
 * E-commerce pattern with product categories and trust badges
 */
export const EcommerceFooter: Story = {
  render: () => renderFooter({
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Store',
        alt: 'Store',
      },
    },
    columns: [
      {
        title: 'Shop',
        links: [
          { text: 'New Arrivals', href: '/shop/new' },
          { text: 'Best Sellers', href: '/shop/bestsellers' },
          { text: 'Sale', href: '/shop/sale' },
          { text: 'Gift Cards', href: '/gift-cards' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { text: 'Contact Us', href: '/contact' },
          { text: 'Shipping Info', href: '/shipping' },
          { text: 'Returns', href: '/returns' },
          { text: 'FAQ', href: '/faq' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About Us', href: '/about' },
          { text: 'Sustainability', href: '/sustainability' },
          { text: 'Press', href: '/press' },
        ],
      },
    ],
    newsletter: {
      enabled: true,
      title: 'Get 10% Off',
      description: 'Subscribe for exclusive deals.',
      inputId: 'ecommerce-newsletter',
      trustText: 'First order discount. Unsubscribe anytime.',
    },
    badges: [
      { text: 'Secure Payment', icon: badgeIcons.secure },
      { text: 'Free Shipping', icon: badgeIcons.shipping },
      { text: 'Money Back', icon: badgeIcons.moneyback },
    ],
    social: [
      { platform: 'Instagram', href: 'https://instagram.com', icon: socialIcons.instagram },
      { platform: 'Facebook', href: 'https://facebook.com', icon: socialIcons.facebook },
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
    ],
    copyright: '© 2024 Store. All rights reserved.',
  }),
};

/**
 * Newsletter-Focused Footer
 * Emphasizes email list building with centered layout
 */
export const NewsletterFocused: Story = {
  render: () => renderFooter({
    layout: 'centered',
    variant: 'dark',
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/FFFFFF/3B82F6?text=Newsletter',
        alt: 'Newsletter',
      },
      tagline: 'Weekly insights on growth.',
    },
    newsletter: {
      enabled: true,
      title: 'Join 10,000+ Subscribers',
      description: 'Get weekly insights on product growth, marketing, and design.',
      inputId: 'newsletter-focused',
      trustText: 'No spam. Ever. Unsubscribe with one click.',
    },
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
    ],
    copyright: '© 2024 Newsletter.',
  }),
};

/**
 * Mobile View
 * Demonstrates mobile responsive behavior (1-column stack)
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => renderFooter({
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Mobile',
        alt: 'Mobile',
      },
      tagline: 'Mobile-optimized footer.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About', href: '/about' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: socialIcons.twitter },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: socialIcons.linkedin },
    ],
    legal: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
    ],
    copyright: '© 2024 Mobile.',
  }),
};

/**
 * With Divider
 * Footer with divider line above bottom section
 */
export const WithDivider: Story = {
  render: () => renderFooter({
    withDivider: true,
    brand: {
      logo: {
        src: 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=Divider',
        alt: 'Company',
      },
      tagline: 'Footer with divider styling.',
    },
    columns: [
      {
        title: 'Product',
        links: [
          { text: 'Features', href: '/features' },
          { text: 'Pricing', href: '/pricing' },
        ],
      },
    ],
    copyright: '© 2024 Company.',
  }),
};
