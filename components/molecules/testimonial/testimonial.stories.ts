// components/molecules/testimonial/testimonial.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';


/**
 * Testimonial Molecule Component Stories
 *
 * TOP 3 TRUST SIGNAL - Customer testimonial component for social proof and credibility.
 *
 * Critical Marketing Component:
 * - 72% of customers won't take action until they read reviews (BrightLocal)
 * - Video testimonials build 53% more trust than text (Wyzowl)
 * - Testimonials with photos increase trust by 67%
 * - 5-star testimonials are 3x more effective than unrated ones
 *
 * Features:
 * - Star ratings (1-5 stars)
 * - Customer avatar images
 * - Company logos
 * - Verification badges
 * - Video thumbnail support
 * - Expandable quotes
 * - Multiple variants (default, card, minimal, featured, inline)
 * - Dark mode support
 *
 * Marketing Best Practices:
 * - Use SPECIFIC results: "127% increase" not "big increase"
 * - Include full attribution: name + title + company
 * - Add photos and logos for authenticity
 * - Show verification badges to increase trust by 15%
 * - Place near CTAs and on high-intent pages
 */

// Configure Nunjucks
const componentsPath = path.resolve(__dirname, '../../');
// Placeholder images for demos
const placeholderAvatar = 'data:image/svg+xml,%3Csvg width="48" height="48" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="24" cy="24" r="24" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3ESJ%3C/text%3E%3C/svg%3E';
const placeholderLogo = 'data:image/svg+xml,%3Csvg width="100" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100" height="40" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3ELogo%3C/text%3E%3C/svg%3E';
const placeholderVideo = 'data:image/svg+xml,%3Csvg width="600" height="338" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="600" height="338" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dominant-baseline="middle"%3EVideo Testimonial%3C/text%3E%3C/svg%3E';

// Component metadata
const meta: Meta = {
  title: 'Molecules/Testimonial',
  tags: ['autodocs'],
  argTypes: {
    quote: {
      control: 'text',
      description: 'The testimonial text/quote (REQUIRED)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'author.name': {
      control: 'text',
      description: 'Customer name (REQUIRED)',
      table: {
        category: 'Author',
        type: { summary: 'string' },
      },
    },
    'author.title': {
      control: 'text',
      description: 'Job title (recommended)',
      table: {
        category: 'Author',
        type: { summary: 'string' },
      },
    },
    'author.company': {
      control: 'text',
      description: 'Company name (recommended)',
      table: {
        category: 'Author',
        type: { summary: 'string' },
      },
    },
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Star rating (1-5, 0 for none)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    verified: {
      control: 'boolean',
      description: 'Show verification badge (increases trust by 15%)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'minimal', 'featured', 'inline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'TOP 3 TRUST SIGNAL - Customer testimonial with quote, attribution, optional star ratings, and company logos. Critical social proof component that builds credibility and drives conversions. Use specific results, full attribution, and verification badges for maximum impact.',
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
            enabled: false, // Molecules may not be landmarks
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
    {% from "molecules/testimonial/testimonial.njk" import testimonial %}
    {{ testimonial(props) }}
  `,
    { props: args }
  );
};

/**
 * Basic testimonial with quote and attribution
 */
export const Default: Story = {
  args: {
    quote: 'This product changed our business completely. We saw results in the first week.',
    author: {
      name: 'Sarah Johnson',
      title: 'CEO',
      company: 'Acme Corp',
    },
  },
  render: renderComponent,
};

/**
 * Testimonial with 5-star rating for maximum impact
 */
export const WithRating: Story = {
  args: {
    quote: 'We saw a 127% increase in revenue within 3 months. The ROI was incredible.',
    rating: 5,
    author: {
      name: 'John Smith',
      title: 'VP of Marketing',
      company: 'TechStart Inc',
    },
  },
  render: renderComponent,
};

/**
 * Card variant - boxed with shadow, most common variant
 */
export const CardVariant: Story = {
  args: {
    quote: 'Saved us 10 hours per week on manual tasks. The best investment we made this year.',
    rating: 5,
    verified: true,
    author: {
      name: 'Emily Chen',
      title: 'Director of Operations',
      company: 'Global Solutions',
    },
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * Full attribution with customer photo and company logo
 */
export const WithPhotoAndLogo: Story = {
  args: {
    quote: 'Our customer satisfaction score jumped from 3.2 to 4.8 stars in just 6 weeks.',
    rating: 5,
    verified: true,
    author: {
      name: 'Mike Williams',
      title: 'Head of Customer Success',
      company: 'Innovation Labs',
      avatar: placeholderAvatar,
    },
    logo: {
      src: placeholderLogo,
      alt: 'Innovation Labs',
    },
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * Featured variant - prominent display with gradient background for hero sections
 */
export const FeaturedVariant: Story = {
  args: {
    quote: 'This is the tool we didn\'t know we needed. Game-changing for our team.',
    rating: 5,
    verified: true,
    verifiedText: 'Verified Purchase',
    author: {
      name: 'Jessica Martinez',
      title: 'Sales Director',
      company: 'Growth Co',
      avatar: placeholderAvatar,
    },
    variant: 'featured',
  },
  render: renderComponent,
};

/**
 * Video testimonial with thumbnail and play button (53% more trust than text)
 */
export const VideoTestimonial: Story = {
  args: {
    quote: 'See how our team uses this product every day to close 40% more deals.',
    videoThumbnail: placeholderVideo,
    rating: 5,
    author: {
      name: 'David Park',
      title: 'VP of Sales',
      company: 'SalesTech Inc',
      avatar: placeholderAvatar,
    },
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * Minimal variant - compact and lightweight for inline use
 */
export const MinimalVariant: Story = {
  args: {
    quote: 'Game-changing product. Highly recommend to any growing team.',
    author: {
      name: 'Alex Thompson',
      company: 'Startup XYZ',
    },
    variant: 'minimal',
  },
  render: renderComponent,
};

/**
 * Inline variant - horizontal layout for wide layouts
 */
export const InlineVariant: Story = {
  args: {
    quote: 'The best tool for modern marketing teams. We increased conversions by 85%.',
    rating: 5,
    author: {
      name: 'Rachel Green',
      title: 'Marketing Director',
      company: 'Digital First',
      avatar: placeholderAvatar,
    },
    variant: 'inline',
  },
  render: renderComponent,
};

/**
 * Expandable long testimonial with "Read more" button
 */
export const ExpandableQuote: Story = {
  args: {
    quote: 'I\'ve tried dozens of tools in this category, but this one stands out. The interface is intuitive, the support team is responsive, and the features are exactly what we needed. We migrated our entire team of 50 people in just two days, and everyone adapted quickly. Three months later, we\'re seeing measurable improvements across the board.',
    expandable: true,
    rating: 5,
    author: {
      name: 'Tom Anderson',
      title: 'CTO',
      company: 'Tech Innovations',
    },
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * Testimonial with specific highlighted results (use HTML markup)
 */
export const HighlightedResults: Story = {
  args: {
    quote: 'Our conversion rate increased by <strong>127%</strong> in just <strong>3 months</strong>. We went from 2.1% to 4.8% conversion.',
    rating: 5,
    verified: true,
    author: {
      name: 'Lisa Wang',
      title: 'Growth Marketing Manager',
      company: 'E-commerce Plus',
      avatar: placeholderAvatar,
    },
    logo: {
      src: placeholderLogo,
      alt: 'E-commerce Plus',
    },
    variant: 'card',
  },
  render: renderComponent,
};

/**
 * All variants displayed together for comparison
 */
export const AllVariants: Story = {
  render: () => {
    const baseProps = {
      quote: 'This product transformed our workflow. We saw immediate results.',
      rating: 5,
      author: {
        name: 'Alex Johnson',
        title: 'Product Manager',
        company: 'Tech Co',
      },
    };

    return `
      <div style="display: grid; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Default</h3>
          ${renderComponent({ ...baseProps, variant: 'default' })}
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Card</h3>
          ${renderComponent({ ...baseProps, variant: 'card' })}
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Minimal</h3>
          ${renderComponent({ ...baseProps, variant: 'minimal' })}
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Featured</h3>
          ${renderComponent({ ...baseProps, variant: 'featured' })}
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Inline</h3>
          ${renderComponent({ ...baseProps, variant: 'inline' })}
        </div>
      </div>
    `;
  },
};

/**
 * Testimonial grid layout - common pattern for social proof sections
 */
export const TestimonialGrid: Story = {
  render: () => {
    const testimonials = [
      {
        quote: 'Increased our revenue by 127% in 3 months.',
        rating: 5,
        author: { name: 'Sarah J.', title: 'CEO', company: 'Acme Corp' },
        variant: 'card',
      },
      {
        quote: 'Saved us 10 hours per week on manual tasks.',
        rating: 5,
        verified: true,
        author: { name: 'John S.', title: 'VP Marketing', company: 'TechStart' },
        variant: 'card',
      },
      {
        quote: 'Best investment we made this year. Highly recommend.',
        rating: 5,
        author: { name: 'Emily C.', title: 'Director', company: 'Global Solutions' },
        variant: 'card',
      },
    ];

    return `
      <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        ${testimonials.map(props => renderComponent(props)).join('')}
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    quote: 'This product changed everything for our team. We saw a 200% increase in productivity.',
    rating: 5,
    verified: true,
    author: {
      name: 'Morgan Lee',
      title: 'Engineering Lead',
      company: 'DevTools Inc',
      avatar: placeholderAvatar,
    },
    logo: {
      src: placeholderLogo,
      alt: 'DevTools Inc',
    },
    variant: 'card',
  },
  render: renderComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => {
      return `<div data-theme="dark">${Story()}</div>`;
    },
  ],
};
