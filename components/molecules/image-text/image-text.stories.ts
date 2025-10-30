// components/molecules/image-text/image-text.stories.ts

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

import fs from 'fs';

/**
 * Image+Text Component Stories
 *
 * WORKHORSE molecule for feature showcases and product pages.
 * Combines image with text content in flexible, responsive layouts.
 *
 * Marketing Use Cases:
 * - Feature showcases (alternating image/text)
 * - "How it works" sections with step-by-step visuals
 * - Product pages (screenshot + description)
 * - About pages (team photo + company story)
 */

// Component metadata
const meta: Meta = {
  title: 'Molecules/Image+Text',
  tags: ['autodocs'],
  argTypes: {
    imagePosition: {
      control: 'select',
      options: ['left', 'right', 'top'],
      description: 'Position of image relative to text',
      defaultValue: 'left',
    },
    aspectRatio: {
      control: 'select',
      options: ['auto', '16-9', '4-3', '1-1'],
      description: 'Image aspect ratio for consistency',
      defaultValue: 'auto',
    },
    headline: {
      control: 'text',
      description: 'Main heading text',
    },
    description: {
      control: 'text',
      description: 'Body text description',
    },
    caption: {
      control: 'text',
      description: 'Image caption (optional)',
    },
    backgroundColor: {
      control: 'select',
      options: ['', 'primary', 'secondary', 'accent', 'neutral'],
      description: 'Background color block',
    },
    ratio: {
      control: 'select',
      options: ['50-50', '40-60', '60-40', '33-67', '67-33'],
      description: 'Column width ratio',
      defaultValue: '50-50',
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Spacing gap',
      defaultValue: 'lg',
    },
    verticalAlign: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Vertical alignment',
      defaultValue: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'WORKHORSE molecule combining image with text content. Supports multiple layouts (image left/right/top), aspect ratio enforcement, alternating patterns for visual rhythm, background colors, and flexible sizing ratios. Perfect for feature showcases, product pages, and storytelling sections.',
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
            id: 'image-alt',
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
const renderComponent = (args: any) => {
  return renderNunjucksTemplate(
    `
    {% from "components/molecules/image-text/image-text.njk" import imageText %}
    {{ imageText(props) }}
  `,
    { props: args }
  );
};

/**
 * Default layout - image left, text right
 */
export const Default: Story = {
  args: {
    image: {
      src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Feature+Image',
      alt: 'Feature showcase image',
    },
    headline: 'Powerful Analytics',
    description: 'Track your growth with detailed analytics and insights that matter. Get real-time visibility into what\'s working and what needs improvement.',
    cta: {
      text: 'Learn more',
      href: '#analytics',
      variant: 'primary',
    },
  },
  render: renderComponent,
};

/**
 * Image right layout
 */
export const ImageRight: Story = {
  args: {
    imagePosition: 'right',
    image: {
      src: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Collaboration',
      alt: 'Collaboration tools interface',
    },
    aspectRatio: '16-9',
    headline: 'Collaborate Seamlessly',
    description: 'Work together in real-time with powerful collaboration features built for modern teams.',
    cta: {
      text: 'Start collaborating',
      href: '#collaboration',
      variant: 'primary',
    },
  },
  render: renderComponent,
};

/**
 * Image top (stacked) layout
 */
export const ImageTop: Story = {
  args: {
    imagePosition: 'top',
    image: {
      src: 'https://placehold.co/1200x600/10b981/ffffff?text=Overview',
      alt: 'Product overview',
    },
    aspectRatio: '16-9',
    headline: 'Complete Overview',
    description: 'See everything at a glance with our comprehensive dashboard designed for clarity and speed.',
    cta: {
      text: 'View demo',
      href: '#demo',
    },
  },
  render: renderComponent,
};

/**
 * All aspect ratio variants
 */
export const AspectRatios: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 1rem;">16:9 Aspect Ratio (Widescreen)</p>
          ${renderComponent({
            aspectRatio: '16-9',
            image: { src: 'https://placehold.co/800x450/3b82f6/ffffff?text=16:9', alt: '16:9 example' },
            headline: 'Widescreen Format',
            description: 'Perfect for desktop screenshots and landscape photos.',
          })}
        </div>

        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 1rem;">4:3 Aspect Ratio (Standard)</p>
          ${renderComponent({
            aspectRatio: '4-3',
            image: { src: 'https://placehold.co/800x600/8b5cf6/ffffff?text=4:3', alt: '4:3 example' },
            headline: 'Standard Format',
            description: 'Classic aspect ratio for general photography and portraits.',
          })}
        </div>

        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 1rem;">1:1 Aspect Ratio (Square)</p>
          ${renderComponent({
            aspectRatio: '1-1',
            image: { src: 'https://placehold.co/800x800/10b981/ffffff?text=1:1', alt: '1:1 example' },
            headline: 'Square Format',
            description: 'Ideal for product images and social media content.',
          })}
        </div>
      </div>
    `;
  },
};

/**
 * With image caption
 */
export const WithCaption: Story = {
  args: {
    image: {
      src: 'https://placehold.co/800x600/ec4899/ffffff?text=Team+Photo',
      alt: 'Team collaboration session',
    },
    caption: 'Photo credit: Team collaboration session, March 2024',
    headline: 'Built for Teams',
    description: 'Designed with teams in mind, our platform makes collaboration effortless and productive.',
    backgroundColor: 'neutral',
  },
  render: renderComponent,
};

/**
 * With background color blocks
 */
export const BackgroundColors: Story = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 1rem;">Primary Background</p>
          ${renderComponent({
            backgroundColor: 'primary',
            image: { src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Primary', alt: 'Primary bg' },
            headline: 'Primary Color Block',
            description: 'Draws attention to key features and important sections.',
          })}
        </div>

        <div>
          <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 1rem;">Neutral Background</p>
          ${renderComponent({
            backgroundColor: 'neutral',
            image: { src: 'https://placehold.co/800x600/6b7280/ffffff?text=Neutral', alt: 'Neutral bg' },
            headline: 'Neutral Color Block',
            description: 'Subtle background for professional, understated sections.',
          })}
        </div>
      </div>
    `;
  },
};

/**
 * Alternating pattern - WORKHORSE for feature lists
 * Wrap multiple components in .image-text-alternate container
 */
export const AlternatingPattern: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "components/molecules/image-text/image-text.njk" import imageText %}
      <div class="image-text-alternate" style="display: flex; flex-direction: column; gap: 4rem;">
        {{ imageText({
          imagePosition: 'left',
          image: { src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Step+1', alt: 'Step 1' },
          aspectRatio: '16-9',
          headline: 'Step 1: Setup',
          description: 'Get started in minutes with our simple, intuitive setup process.'
        }) }}

        {{ imageText({
          imagePosition: 'left',
          image: { src: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Step+2', alt: 'Step 2' },
          aspectRatio: '16-9',
          headline: 'Step 2: Configure',
          description: 'Customize everything to match your workflow and brand.'
        }) }}

        {{ imageText({
          imagePosition: 'left',
          image: { src: 'https://placehold.co/800x600/10b981/ffffff?text=Step+3', alt: 'Step 3' },
          aspectRatio: '16-9',
          headline: 'Step 3: Launch',
          description: 'Go live and start seeing results immediately.'
        }) }}
      </div>
    `,
      {}
    );
  },
};

/**
 * Product feature showcase
 * Real-world example with CTAs and professional styling
 */
export const ProductFeature: Story = {
  args: {
    imagePosition: 'right',
    image: {
      src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Analytics+Dashboard',
      alt: 'Analytics dashboard showing growth metrics',
    },
    aspectRatio: '16-9',
    headline: 'Data-Driven Insights',
    description: 'Make informed decisions with comprehensive analytics. Track user behavior, conversion rates, and growth metrics all in one beautiful dashboard.',
    cta: {
      text: 'Explore analytics',
      href: '#analytics',
      variant: 'primary',
      size: 'lg',
    },
    ratio: '60-40',
  },
  render: renderComponent,
};

/**
 * Complete marketing page section
 * Full example showing real-world usage
 */
export const MarketingSection: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "components/molecules/image-text/image-text.njk" import imageText %}
      <div style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <div style="text-align: center; margin-bottom: 4rem;">
          <span style="display: inline-block; padding: 0.5rem 1rem; background: #dbeafe; color: #1e40af; border-radius: 2rem; font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem;">
            FEATURES
          </span>
          <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2;">
            Everything you need to succeed
          </h2>
          <p style="font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto;">
            Powerful tools and features designed for modern teams
          </p>
        </div>

        <div class="image-text-alternate" style="display: flex; flex-direction: column; gap: 4rem;">
          {{ imageText({
            imagePosition: 'left',
            image: { src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Analytics', alt: 'Analytics' },
            aspectRatio: '16-9',
            headline: 'Powerful Analytics',
            description: 'Track your growth with detailed analytics and insights.',
            cta: { text: 'Explore analytics', href: '#analytics', variant: 'primary' }
          }) }}

          {{ imageText({
            imagePosition: 'left',
            image: { src: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Collaboration', alt: 'Collaboration' },
            aspectRatio: '16-9',
            headline: 'Team Collaboration',
            description: 'Work together seamlessly with real-time collaboration tools.',
            cta: { text: 'Start collaborating', href: '#collab', variant: 'primary' }
          }) }}

          {{ imageText({
            imagePosition: 'left',
            image: { src: 'https://placehold.co/800x600/10b981/ffffff?text=Automation', alt: 'Automation' },
            aspectRatio: '16-9',
            headline: 'Smart Automation',
            description: 'Save time with intelligent automation.',
            cta: { text: 'See automation', href: '#automation', variant: 'primary' }
          }) }}
        </div>
      </div>
    `,
      {}
    );
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  render: () => {
    return renderNunjucksTemplate(
      `
      {% from "components/molecules/image-text/image-text.njk" import imageText %}
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        {{ imageText({
          image: { src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Dark+Mode', alt: 'Dark mode example' },
          headline: 'Works in Dark Mode',
          description: 'All components automatically adapt to dark mode.',
          cta: { text: 'Learn more', href: '#dark-mode' }
        }) }}

        {{ imageText({
          backgroundColor: 'primary',
          image: { src: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Background', alt: 'Background example' },
          headline: 'Background Colors Adapt',
          description: 'Background color blocks automatically adjust for dark mode.'
        }) }}
      </div>
    `,
      {}
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
