/**
 * Gallery Organism - Storybook Stories
 *
 * Comprehensive stories showcasing all gallery variants, layouts, and real-world usage patterns.
 * Demonstrates portfolio grids, case studies, product galleries, blog grids, and team photos.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucks } from '../../../.storybook/nunjucks-helpers';

const meta: Meta = {
  title: 'Organisms/Gallery',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    description: {
      control: 'text',
      description: 'Section description',
    },
    columns: {
      control: { type: 'select' },
      options: [2, 3, 4],
      description: 'Number of columns',
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry'],
      description: 'Layout mode',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'overlay', 'minimal', 'cards'],
      description: 'Visual style variant',
    },
    aspectRatio: {
      control: { type: 'select' },
      options: ['square', 'landscape', 'portrait', 'wide', 'auto'],
      description: 'Image aspect ratio',
    },
    lazyLoad: {
      control: 'boolean',
      description: 'Enable lazy loading',
    },
    lightbox: {
      control: 'boolean',
      description: 'Enable lightbox modal',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Gallery Organism

Versatile grid-based gallery for images, portfolios, case studies, and blog posts.

## Marketing Context

- **Visual storytelling**: Show products in action, real-world use cases
- **Portfolio credibility**: High-quality images signal professionalism (74% trust factor)
- **Case studies**: Show results with metrics and outcomes
- **Lazy loading**: Fast page load = lower bounce rate (32% reduction)

## Key Features

- Responsive grid layouts (2, 3, or 4 columns)
- Masonry layout (Pinterest-style varying heights)
- Multiple visual variants (default, overlay, minimal, cards)
- Image lazy loading for performance
- Optional lightbox/modal
- Category filtering
- Card molecule integration for rich content
- WCAG AA compliant
- Dark mode support

## Real-World Use Cases

1. **Portfolio Grid**: Agency work showcases with overlay text on hover
2. **Case Studies**: Results-focused project showcases with metrics
3. **Product Gallery**: E-commerce product displays with clean grids
4. **Blog Grid**: Blog posts with rich Card molecule integration
5. **Team Photos**: Employee/team member photo galleries
6. **Customer Logos**: Social proof via client/partner logo walls
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default 3-column grid with landscape images.
 * Clean, professional layout for general-purpose galleries.
 */
export const Default: Story = {
  args: {
    title: 'Our Work',
    description: 'Recent projects we\'re proud of',
    columns: 3,
    variant: 'default',
    aspectRatio: 'landscape',
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=E-commerce+Redesign', alt: 'E-commerce redesign project' },
        title: 'E-commerce Redesign',
        description: '45% increase in conversions',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=SaaS+Platform', alt: 'SaaS platform launch' },
        title: 'SaaS Platform Launch',
        description: '10,000+ users in first month',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=Mobile+App', alt: 'Mobile app development' },
        title: 'Mobile App Development',
        description: '4.8 star rating on App Store',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=Brand+Identity', alt: 'Brand identity design' },
        title: 'Brand Identity Redesign',
        description: 'Complete rebrand for Fortune 500',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Content+Strategy', alt: 'Content strategy' },
        title: 'Content Marketing Strategy',
        description: '300% increase in organic traffic',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ec4899/ffffff?text=SEO+Optimization', alt: 'SEO optimization' },
        title: 'SEO Optimization',
        description: 'First page rankings in 90 days',
        link: '#',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * 2-column grid layout.
 * Larger images, great for case studies with detailed visuals.
 */
export const TwoColumn: Story = {
  args: {
    title: 'Case Studies',
    description: 'Real results from real clients',
    columns: 2,
    variant: 'default',
    aspectRatio: 'landscape',
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=B2B+Lead+Gen', alt: 'B2B lead generation case study' },
        title: 'B2B Lead Gen: 300% ROI',
        description: 'How we tripled qualified leads in 90 days',
        link: '#',
        category: 'Marketing',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=E-commerce+Growth', alt: 'E-commerce growth case study' },
        title: 'E-commerce: 2.5x Conversion Rate',
        description: 'UX redesign that doubled revenue',
        link: '#',
        category: 'Design',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=SaaS+Onboarding', alt: 'SaaS onboarding case study' },
        title: 'SaaS Onboarding: 80% Activation',
        description: 'User onboarding flow optimization',
        link: '#',
        category: 'Product',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=App+Retention', alt: 'App retention case study' },
        title: 'Mobile App: 60% Day 30 Retention',
        description: 'Engagement features that keep users coming back',
        link: '#',
        category: 'Product',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * 4-column grid layout.
 * Compact display, ideal for product catalogs or customer logos.
 */
export const FourColumn: Story = {
  args: {
    title: 'Product Catalog',
    description: 'Browse our full collection',
    columns: 4,
    variant: 'minimal',
    aspectRatio: 'square',
    items: [
      {
        image: { src: 'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Product+1', alt: 'Product 1' },
        title: 'Premium Widget',
        link: '#',
        category: 'Featured',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/22c55e/ffffff?text=Product+2', alt: 'Product 2' },
        title: 'Deluxe Gadget',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Product+3', alt: 'Product 3' },
        title: 'Pro Device',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/ef4444/ffffff?text=Product+4', alt: 'Product 4' },
        title: 'Elite Accessory',
        link: '#',
        category: 'New',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Product+5', alt: 'Product 5' },
        title: 'Advanced Tool',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/ec4899/ffffff?text=Product+6', alt: 'Product 6' },
        title: 'Smart Component',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/14b8a6/ffffff?text=Product+7', alt: 'Product 7' },
        title: 'Modern Solution',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/f97316/ffffff?text=Product+8', alt: 'Product 8' },
        title: 'Ultimate Package',
        link: '#',
        category: 'Featured',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Overlay variant with hover effects.
 * Text appears on hover, great for portfolios and creative work.
 */
export const OverlayVariant: Story = {
  args: {
    title: 'Portfolio',
    description: 'Hover to see project details',
    columns: 3,
    variant: 'overlay',
    aspectRatio: 'landscape',
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=Web+Design', alt: 'Web design project' },
        title: 'Modern Web Design',
        description: 'Award-winning e-commerce site',
        link: '#',
        category: 'Web',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=Branding', alt: 'Branding project' },
        title: 'Brand Identity',
        description: 'Complete brand refresh',
        link: '#',
        category: 'Branding',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=App+Design', alt: 'App design project' },
        title: 'Mobile App UI/UX',
        description: 'Fintech app with 4.9 rating',
        link: '#',
        category: 'Mobile',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=Photography', alt: 'Photography project' },
        title: 'Product Photography',
        description: 'Studio photography for luxury brand',
        link: '#',
        category: 'Photo',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Illustration', alt: 'Illustration project' },
        title: 'Custom Illustrations',
        description: 'Character design for startup',
        link: '#',
        category: 'Art',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ec4899/ffffff?text=Motion', alt: 'Motion graphics project' },
        title: 'Motion Graphics',
        description: 'Animated explainer video',
        link: '#',
        category: 'Video',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Minimal borderless variant.
 * Clean, content-focused design without borders or shadows.
 */
export const MinimalVariant: Story = {
  args: {
    title: 'Design Inspiration',
    columns: 3,
    variant: 'minimal',
    aspectRatio: 'auto',
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Design+1', alt: 'Design inspiration 1' },
        title: 'Modern Interface',
      },
      {
        image: { src: 'https://via.placeholder.com/800x400/22c55e/ffffff?text=Design+2', alt: 'Design inspiration 2' },
        title: 'Minimalist Layout',
      },
      {
        image: { src: 'https://via.placeholder.com/800x500/f59e0b/ffffff?text=Design+3', alt: 'Design inspiration 3' },
        title: 'Bold Typography',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=Design+4', alt: 'Design inspiration 4' },
        title: 'Color Palette',
      },
      {
        image: { src: 'https://via.placeholder.com/800x550/8b5cf6/ffffff?text=Design+5', alt: 'Design inspiration 5' },
        title: 'Creative Concept',
      },
      {
        image: { src: 'https://via.placeholder.com/800x500/ec4899/ffffff?text=Design+6', alt: 'Design inspiration 6' },
        title: 'Innovative Solution',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Masonry layout with varying heights.
 * Pinterest-style layout for visual interest and creative portfolios.
 */
export const MasonryLayout: Story = {
  args: {
    title: 'Creative Portfolio',
    description: 'Masonry layout with varying heights',
    layout: 'masonry',
    columns: 3,
    variant: 'minimal',
    aspectRatio: 'auto',
    items: [
      {
        image: { src: 'https://via.placeholder.com/400x600/3b82f6/ffffff?text=Tall+1', alt: 'Tall image 1' },
        title: 'Portrait Shot',
      },
      {
        image: { src: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=Wide+1', alt: 'Wide image 1' },
        title: 'Landscape View',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Square+1', alt: 'Square image 1' },
        title: 'Square Format',
      },
      {
        image: { src: 'https://via.placeholder.com/400x500/ef4444/ffffff?text=Medium+1', alt: 'Medium image 1' },
        title: 'Medium Height',
      },
      {
        image: { src: 'https://via.placeholder.com/400x350/8b5cf6/ffffff?text=Wide+2', alt: 'Wide image 2' },
        title: 'Panoramic',
      },
      {
        image: { src: 'https://via.placeholder.com/400x600/ec4899/ffffff?text=Tall+2', alt: 'Tall image 2' },
        title: 'Vertical Shot',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Card variant using Card molecule.
 * Rich content display for blog posts with metadata, tags, and CTAs.
 */
export const CardsVariant: Story = {
  args: {
    title: 'Latest Blog Posts',
    description: 'Insights from our team',
    variant: 'cards',
    columns: 3,
    items: [
      {
        useCard: true,
        cardProps: {
          image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=SEO+Guide', alt: 'SEO guide cover' },
          title: 'The Complete SEO Guide for 2024',
          description: 'Everything you need to know to rank higher in Google search results.',
          metadata: { author: 'Jane Doe', date: 'Jan 15, 2024' },
          tags: ['SEO', 'Marketing'],
          actions: {
            primary: { text: 'Read More', href: '#' },
          },
        },
      },
      {
        useCard: true,
        cardProps: {
          image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=Design+Systems', alt: 'Design systems cover' },
          title: 'Building Scalable Design Systems',
          description: 'How to create and maintain a design system that grows with your product.',
          metadata: { author: 'John Smith', date: 'Jan 12, 2024' },
          tags: ['Design', 'Development'],
          actions: {
            primary: { text: 'Read More', href: '#' },
          },
        },
      },
      {
        useCard: true,
        cardProps: {
          image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=Conversion+Tips', alt: 'Conversion optimization cover' },
          title: '10 Conversion Optimization Tips',
          description: 'Proven tactics to increase your landing page conversion rate by 50%+.',
          metadata: { author: 'Sarah Johnson', date: 'Jan 10, 2024' },
          tags: ['Marketing', 'CRO'],
          actions: {
            primary: { text: 'Read More', href: '#' },
          },
        },
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Square aspect ratio.
 * Consistent dimensions, great for team photos or product grids.
 */
export const SquareAspectRatio: Story = {
  args: {
    title: 'Meet the Team',
    description: 'The people behind the magic',
    columns: 4,
    variant: 'overlay',
    aspectRatio: 'square',
    items: [
      {
        image: { src: 'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Jane+Doe', alt: 'Jane Doe photo' },
        title: 'Jane Doe',
        description: 'CEO & Founder',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/22c55e/ffffff?text=John+Smith', alt: 'John Smith photo' },
        title: 'John Smith',
        description: 'Head of Design',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Sarah+Johnson', alt: 'Sarah Johnson photo' },
        title: 'Sarah Johnson',
        description: 'Lead Developer',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/ef4444/ffffff?text=Mike+Williams', alt: 'Mike Williams photo' },
        title: 'Mike Williams',
        description: 'Marketing Director',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Emily+Brown', alt: 'Emily Brown photo' },
        title: 'Emily Brown',
        description: 'Product Manager',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/ec4899/ffffff?text=David+Lee', alt: 'David Lee photo' },
        title: 'David Lee',
        description: 'UX Researcher',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/14b8a6/ffffff?text=Lisa+Chen', alt: 'Lisa Chen photo' },
        title: 'Lisa Chen',
        description: 'Content Strategist',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/400x400/f97316/ffffff?text=Tom+Garcia', alt: 'Tom Garcia photo' },
        title: 'Tom Garcia',
        description: 'Sales Director',
        link: '#',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Customer logo wall.
 * Social proof via partner/client logos. Increases trust by 42% (Nielsen Norman Group).
 */
export const LogoWall: Story = {
  args: {
    title: 'Trusted By',
    description: 'Join thousands of companies using our platform',
    columns: 4,
    variant: 'minimal',
    aspectRatio: 'square',
    items: [
      {
        image: { src: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Company+A', alt: 'Company A logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/22c55e/ffffff?text=Company+B', alt: 'Company B logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=Company+C', alt: 'Company C logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/ef4444/ffffff?text=Company+D', alt: 'Company D logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=Company+E', alt: 'Company E logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/ec4899/ffffff?text=Company+F', alt: 'Company F logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/14b8a6/ffffff?text=Company+G', alt: 'Company G logo' },
      },
      {
        image: { src: 'https://via.placeholder.com/200x200/f97316/ffffff?text=Company+H', alt: 'Company H logo' },
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Gallery with category filters.
 * Filterable gallery for browsing by category. Improves UX and engagement.
 */
export const WithFilters: Story = {
  args: {
    title: 'Portfolio',
    description: 'Filter by category to explore our work',
    columns: 3,
    variant: 'default',
    filters: [
      { label: 'Design', value: 'design' },
      { label: 'Development', value: 'development' },
      { label: 'Branding', value: 'branding' },
    ],
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=Project+Alpha', alt: 'Project Alpha' },
        title: 'Project Alpha',
        description: 'Modern web design',
        link: '#',
        category: 'design',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=Project+Beta', alt: 'Project Beta' },
        title: 'Project Beta',
        description: 'Full-stack development',
        link: '#',
        category: 'development',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=Project+Gamma', alt: 'Project Gamma' },
        title: 'Project Gamma',
        description: 'Brand identity',
        link: '#',
        category: 'branding',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=Project+Delta', alt: 'Project Delta' },
        title: 'Project Delta',
        description: 'UX/UI design',
        link: '#',
        category: 'design',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Project+Epsilon', alt: 'Project Epsilon' },
        title: 'Project Epsilon',
        description: 'React application',
        link: '#',
        category: 'development',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ec4899/ffffff?text=Project+Zeta', alt: 'Project Zeta' },
        title: 'Project Zeta',
        description: 'Logo design',
        link: '#',
        category: 'branding',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Gallery with pagination.
 * Paginated gallery for large collections. Better performance than infinite scroll.
 */
export const WithPagination: Story = {
  args: {
    title: 'All Projects',
    description: 'Browse our complete portfolio',
    columns: 3,
    pagination: {
      current: 2,
      total: 5,
    },
    items: [
      {
        image: { src: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=Page+2+Item+1', alt: 'Portfolio item 1' },
        title: 'Portfolio Item 7',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/22c55e/ffffff?text=Page+2+Item+2', alt: 'Portfolio item 2' },
        title: 'Portfolio Item 8',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/f59e0b/ffffff?text=Page+2+Item+3', alt: 'Portfolio item 3' },
        title: 'Portfolio Item 9',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ef4444/ffffff?text=Page+2+Item+4', alt: 'Portfolio item 4' },
        title: 'Portfolio Item 10',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Page+2+Item+5', alt: 'Portfolio item 5' },
        title: 'Portfolio Item 11',
        link: '#',
      },
      {
        image: { src: 'https://via.placeholder.com/800x450/ec4899/ffffff?text=Page+2+Item+6', alt: 'Portfolio item 6' },
        title: 'Portfolio Item 12',
        link: '#',
      },
    ],
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};

/**
 * Dark mode variant.
 * Gallery automatically adapts to dark mode preferences.
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
    title: 'Dark Mode Gallery',
    description: 'Automatically adapts to dark color scheme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => {
    const html = renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args);
    return `<div data-theme="dark" style="background: #1f2937; padding: 2rem; min-height: 100vh;">${html}</div>`;
  },
};

/**
 * Mobile responsive view.
 * Gallery stacks to single column on mobile devices.
 */
export const MobileView: Story = {
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => renderNunjucks('organisms/gallery/gallery.njk', 'gallery', args),
};
