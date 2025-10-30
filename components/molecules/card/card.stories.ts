// components/molecules/card/card.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

/**
 * Card Molecule Stories
 *
 * Versatile content container combining image, text, and actions.
 * Perfect for blog posts, features, team members, case studies, and product listings.
 *
 * Features:
 * - Multiple layout variants (default, horizontal, overlay, minimal, icon, stat)
 * - Fully clickable card option
 * - Badge overlay support
 * - Tag list display
 * - Metadata (author, date, category)
 * - Action buttons in footer
 * - Responsive design with mobile stacking
 * - Dark mode support
 * - Marketing-optimized hover effects
 */

// Helper icons for demos
const checkIcon = '<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path d="M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z"/></svg>';
const rocketIcon = '<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path d="M9.19 32.5c-1.41 3.12-1.02 6.18.89 8.09 1.91 1.91 4.97 2.3 8.09.89 1.58 3.95 4.4 7.52 8.33 8.33 0-4.17 1.67-8.33 5-11.67 3.33-3.33 7.5-5 11.67-5-.81-3.93-4.38-6.75-8.33-8.33 1.41-3.12 1.02-6.18-.89-8.09-1.91-1.91-4.97-2.3-8.09-.89-1.58-3.95-4.4-7.52-8.33-8.33 0 4.17-1.67 8.33-5 11.67-3.33 3.33-7.5 5-11.67 5 .81 3.93 4.38 6.75 8.33 8.33z"/></svg>';
const lightningIcon = '<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path d="M24 2L6 24h12l-6 22 24-28H24l6-16z"/></svg>';

const meta: Meta = {
  title: 'Molecules/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'horizontal', 'overlay', 'minimal', 'icon', 'stat'],
      description: 'Layout variant',
    },
    clickable: {
      control: 'boolean',
      description: 'Makes entire card clickable',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Versatile card molecule that combines heading, text, button, link, and badge atoms. Supports multiple layout variants, clickable cards, metadata display, and marketing features.',
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
            id: 'landmark-one-main',
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const renderComponent = (args: any) => {
  return renderNunjucksTemplate(
    `
    {% from "molecules/card/card.njk" import card %}
    {{ card(props) }}
  `,
    { props: args }
  );
};

/**
 * Default card with image, title, description, and button.
 * Standard vertical layout for blog posts and content.
 */
export const Default: Story = {
  args: {
    image: {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
      alt: 'Developer working on laptop',
    },
    title: 'Getting Started with Web Development',
    description:
      'Learn the fundamentals of modern web development including HTML, CSS, and JavaScript. Perfect for beginners.',
    metadata: {
      author: 'Jane Doe',
      date: 'Jan 15, 2024',
    },
    actions: {
      primary: {
        text: 'Read More',
        href: '#',
        variant: 'primary',
        size: 'sm',
      },
    },
  },
  render: renderComponent,
};

/**
 * Blog post card with all features: image, metadata, tags, and actions.
 */
export const BlogPost: Story = {
  args: {
    image: {
      src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop',
      alt: 'Blog post cover',
    },
    title: 'How to Build Better Websites in 2024',
    description:
      'Discover the latest best practices for building fast, accessible, and user-friendly websites. Includes practical examples and code snippets.',
    metadata: {
      author: 'John Smith',
      date: 'Mar 22, 2024',
      category: 'Tutorial',
    },
    tags: ['Web Dev', 'Performance', 'UX'],
    actions: {
      primary: {
        text: 'Read Article',
        href: '#',
        variant: 'primary',
        size: 'sm',
      },
      secondary: {
        text: 'Share',
        href: '#',
        variant: 'muted',
      },
    },
  },
  render: renderComponent,
};

/**
 * Fully clickable card with badge overlay.
 * Better UX than small "Read more" link - entire card is the action.
 */
export const Clickable: Story = {
  args: {
    clickable: true,
    href: '#',
    badge: {
      text: 'New',
      variant: 'primary',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      alt: 'Data visualization',
    },
    title: 'AI-Powered Page Builder',
    description:
      'Build beautiful pages with natural language. No coding required. Click anywhere on this card to learn more.',
    metadata: {
      date: 'Just released',
    },
  },
  render: renderComponent,
};

/**
 * Horizontal layout with image on the left.
 * Great for team members, case studies, or compact listings.
 * Stacks vertically on mobile.
 */
export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    image: {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      alt: 'Team member photo',
      aspectRatio: '4-3',
    },
    title: 'Sarah Johnson',
    description:
      'Senior Product Designer with 10+ years of experience creating user-centered digital experiences for Fortune 500 companies.',
    actions: {
      secondary: {
        text: 'View Profile',
        href: '#',
      },
    },
  },
  render: renderComponent,
};

/**
 * Overlay variant with text on background image.
 * Perfect for hero cards and visual impact.
 */
export const Overlay: Story = {
  args: {
    variant: 'overlay',
    image: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
      alt: 'Space background',
    },
    title: 'Launch Your Product to the World',
    description:
      'From idea to launch in weeks, not months. Join thousands of founders who shipped faster.',
    actions: {
      primary: {
        text: 'Get Started',
        href: '#',
        variant: 'primary',
      },
    },
  },
  render: renderComponent,
};

/**
 * Minimal variant with no border or shadow.
 * Clean, understated design for content-focused layouts.
 */
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    image: {
      src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop',
      alt: 'Minimal design',
    },
    title: 'Clean Design Principles',
    description:
      'Sometimes less is more. Discover how minimalist design can improve user experience.',
  },
  render: renderComponent,
};

/**
 * Icon card for feature showcases.
 * Centered layout with icon, title, and description.
 */
export const IconCard: Story = {
  args: {
    variant: 'icon',
    icon: lightningIcon,
    title: 'Lightning Fast',
    description:
      'Built for speed with modern web technologies. Pages load in under 1 second.',
  },
  render: renderComponent,
};

/**
 * Stat card for displaying metrics and achievements.
 * Great for social proof and key numbers.
 */
export const StatCard: Story = {
  args: {
    variant: 'stat',
    stat: {
      value: '10,000+',
      label: 'Happy Customers',
    },
  },
  render: renderComponent,
};

/**
 * Product card with sale badge.
 * Common e-commerce pattern with pricing and CTA.
 */
export const ProductCard: Story = {
  args: {
    badge: {
      text: '20% OFF',
      variant: 'error',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      alt: 'Product photo',
      aspectRatio: 'square',
    },
    title: 'Premium Wireless Headphones',
    description:
      'Studio-quality sound with active noise cancellation. 30-hour battery life.',
    metadata: {
      category: 'Electronics',
    },
    tags: ['Free Shipping', 'In Stock'],
    actions: {
      primary: {
        text: 'Add to Cart',
        href: '#',
        variant: 'primary',
      },
      secondary: {
        text: 'Learn More',
        href: '#',
      },
    },
  },
  render: renderComponent,
};

/**
 * Case study card with featured badge.
 * Highlights success stories and customer testimonials.
 */
export const CaseStudy: Story = {
  args: {
    clickable: true,
    href: '#',
    badge: {
      text: 'Featured',
      variant: 'success',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop',
      alt: 'Team collaboration',
    },
    title: 'How Acme Corp Increased Sales by 300%',
    description:
      'Discover how our platform helped Acme Corp triple their revenue in just 6 months.',
    metadata: {
      category: 'Case Study',
      date: 'Feb 2024',
    },
    tags: ['SaaS', 'B2B', 'Growth'],
  },
  render: renderComponent,
};

/**
 * Multiple aspect ratios demonstration.
 * Shows how images maintain consistent grid heights.
 */
export const AspectRatios: Story = {
  render: () => {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1200px;">
        ${renderComponent({
          image: {
            src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
            alt: 'Code',
            aspectRatio: '16-9',
          },
          title: '16:9 Aspect Ratio',
          description: 'Default widescreen format.',
        })}
        ${renderComponent({
          image: {
            src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
            alt: 'Design',
            aspectRatio: '4-3',
          },
          title: '4:3 Aspect Ratio',
          description: 'Traditional photo format.',
        })}
        ${renderComponent({
          image: {
            src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=800&fit=crop',
            alt: 'Abstract',
            aspectRatio: 'square',
          },
          title: 'Square Aspect Ratio',
          description: 'Perfect for product cards.',
        })}
      </div>
    `;
  },
};

/**
 * Grid layout demonstration.
 * Shows how icon cards work in a responsive grid.
 */
export const GridLayout: Story = {
  render: () => {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1200px;">
        ${renderComponent({
          variant: 'icon',
          icon: checkIcon,
          title: 'Easy to Use',
          description: 'Intuitive interface designed for everyone.',
        })}
        ${renderComponent({
          variant: 'icon',
          icon: rocketIcon,
          title: 'Fast Performance',
          description: 'Lightning-fast load times under 1 second.',
        })}
        ${renderComponent({
          variant: 'icon',
          icon: lightningIcon,
          title: 'Modern Stack',
          description: 'Built with the latest web technologies.',
        })}
      </div>
    `;
  },
};

/**
 * All layout variants side-by-side.
 */
export const AllVariants: Story = {
  render: () => {
    return `
      <div style="display: grid; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem;">Default</h3>
          ${renderComponent({
            image: {
              src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
              alt: 'Default',
            },
            title: 'Default Card',
            description: 'Vertical layout with image on top.',
          })}
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Horizontal</h3>
          ${renderComponent({
            variant: 'horizontal',
            image: {
              src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
              alt: 'Horizontal',
              aspectRatio: '4-3',
            },
            title: 'Horizontal Card',
            description: 'Side-by-side layout.',
          })}
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Icon</h3>
          ${renderComponent({
            variant: 'icon',
            icon: checkIcon,
            title: 'Icon Card',
            description: 'Centered with icon.',
          })}
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Stat</h3>
          ${renderComponent({
            variant: 'stat',
            stat: { value: '100%', label: 'Satisfaction' },
          })}
        </div>
      </div>
    `;
  },
};
