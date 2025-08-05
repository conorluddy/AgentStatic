/**
 * Test fixtures for AgentPartial components
 *
 * Provides sample partials for testing template rendering,
 * schema validation, and composition workflows.
 */

import { z } from 'zod';
import type { AgentPartial, TemplateHelpers } from '@/types/partial';

/**
 * Simple hero partial for basic testing
 */
export const heroPartialFixture: AgentPartial<any> = {
  schema: z.object({
    title: z.string().describe('Main headline text'),
    subtitle: z.string().optional().describe('Supporting subtitle'),
    ctaButton: z
      .object({
        text: z.string(),
        url: z.string().url(),
        variant: z.enum(['primary', 'secondary']),
      })
      .optional(),
  }),

  template: (props, helpers) => `
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">${props.title}</h1>
        ${props.subtitle ? `<p class="hero__subtitle">${props.subtitle}</p>` : ''}
        ${
          props.ctaButton
            ? `
          <a href="${props.ctaButton.url}" class="hero__cta hero__cta--${props.ctaButton.variant}">
            ${props.ctaButton.text}
          </a>
        `
            : ''
        }
      </div>
    </section>
  `,

  styles: `
    .hero {
      padding: 4rem 2rem;
      text-align: center;
    }
    .hero__title {
      font-size: clamp(2rem, 5vw, 4rem);
      margin-bottom: 1rem;
    }
    .hero__subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: #666;
    }
    .hero__cta {
      display: inline-block;
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 0.5rem;
    }
    .hero__cta--primary {
      background: #3b82f6;
      color: white;
    }
    .hero__cta--secondary {
      background: #e5e7eb;
      color: #374151;
    }
  `,

  metadata: {
    description: 'Hero section with optional subtitle and CTA button',
    category: 'layout',
    keywords: ['hero', 'banner', 'cta', 'landing'],
    usageExamples: [
      {
        description: 'Simple hero with title only',
        props: { title: 'Welcome to AgentStatic' },
      },
      {
        description: 'Hero with subtitle and CTA',
        props: {
          title: 'Build Amazing Sites',
          subtitle: 'With AI-powered templating',
          ctaButton: {
            text: 'Get Started',
            url: 'https://example.com/start',
            variant: 'primary',
          },
        },
      },
    ],
  },
};

/**
 * Card partial for testing composition and arrays
 */
export const cardPartialFixture: AgentPartial<any> = {
  schema: z.object({
    title: z.string().describe('Card title'),
    content: z.string().describe('Card content/description'),
    image: z.string().url().optional().describe('Optional card image'),
    link: z.string().url().optional().describe('Optional link URL'),
    variant: z
      .enum(['default', 'featured', 'minimal'])
      .default('default')
      .describe('Card style variant'),
  }),

  template: (props, helpers) => `
    <article class="card card--${props.variant}">
      ${
        props.image
          ? `<img src="${helpers.optimizeImage(props.image, { width: 400 })}" alt="${props.title}" class="card__image" />`
          : ''
      }
      <div class="card__content">
        <h3 class="card__title">${props.title}</h3>
        <p class="card__text">${helpers.truncate(props.content, 150)}</p>
        ${
          props.link
            ? `<a href="${props.link}" class="card__link">Read more</a>`
            : ''
        }
      </div>
    </article>
  `,

  styles: `
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
    .card--featured {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
    }
    .card--minimal {
      border: none;
      box-shadow: none;
    }
    .card__image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card__content {
      padding: 1.5rem;
    }
    .card__title {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .card__text {
      color: #6b7280;
      margin-bottom: 1rem;
    }
    .card__link {
      color: #3b82f6;
      text-decoration: none;
    }
  `,

  metadata: {
    description: 'Flexible card component for content display',
    category: 'content',
    keywords: ['card', 'content', 'article', 'preview'],
    usageExamples: [
      {
        description: 'Basic card with title and content',
        props: {
          title: 'Sample Article',
          content:
            'This is a sample article description that will be truncated.',
        },
      },
      {
        description: 'Featured card with image and link',
        props: {
          title: 'Featured Post',
          content: 'This is an important featured post with an image.',
          image: 'https://example.com/image.jpg',
          link: 'https://example.com/post',
          variant: 'featured',
        },
      },
    ],
  },
};

/**
 * Navigation partial for testing complex structures
 */
export const navigationPartialFixture: AgentPartial<any> = {
  schema: z.object({
    siteName: z.string().describe('Site name/brand'),
    links: z
      .array(
        z.object({
          text: z.string(),
          url: z.string().url(),
          active: z.boolean().optional(),
          children: z
            .array(
              z.object({
                text: z.string(),
                url: z.string().url(),
              })
            )
            .optional(),
        })
      )
      .describe('Navigation links'),
    logo: z.string().url().optional().describe('Logo image URL'),
  }),

  template: (props, helpers) => `
    <nav class="nav">
      <div class="nav__container">
        <div class="nav__brand">
          ${
            props.logo
              ? `<img src="${props.logo}" alt="${props.siteName}" class="nav__logo" />`
              : ''
          }
          <span class="nav__name">${props.siteName}</span>
        </div>
        <ul class="nav__links">
          ${props.links
            .map(
              (link: any) => `
            <li class="nav__item">
              <a href="${link.url}" class="nav__link ${helpers.conditionalClass(!!link.active, 'nav__link--active')}">
                ${link.text}
              </a>
              ${
                link.children
                  ? `
                <ul class="nav__dropdown">
                  ${link.children
                    .map(
                      (child: any) => `
                    <li><a href="${child.url}" class="nav__dropdown-link">${child.text}</a></li>
                  `
                    )
                    .join('')}
                </ul>
              `
                  : ''
              }
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    </nav>
  `,

  styles: `
    .nav {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 0;
    }
    .nav__container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .nav__brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav__logo {
      height: 32px;
    }
    .nav__name {
      font-size: 1.25rem;
      font-weight: bold;
    }
    .nav__links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }
    .nav__item {
      position: relative;
    }
    .nav__link {
      text-decoration: none;
      color: #374151;
      transition: color 0.2s;
    }
    .nav__link:hover,
    .nav__link--active {
      color: #3b82f6;
    }
    .nav__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 0.5rem 0;
      min-width: 200px;
      display: none;
    }
    .nav__item:hover .nav__dropdown {
      display: block;
    }
    .nav__dropdown-link {
      display: block;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #374151;
    }
    .nav__dropdown-link:hover {
      background: #f3f4f6;
    }
  `,

  metadata: {
    description: 'Navigation bar with dropdown support',
    category: 'navigation',
    keywords: ['navigation', 'menu', 'header', 'links'],
    usageExamples: [
      {
        description: 'Simple navigation',
        props: {
          siteName: 'My Site',
          links: [
            { text: 'Home', url: '/', active: true },
            { text: 'About', url: '/about' },
            { text: 'Contact', url: '/contact' },
          ],
        },
      },
      {
        description: 'Navigation with dropdown',
        props: {
          siteName: 'Portfolio',
          logo: 'https://example.com/logo.png',
          links: [
            { text: 'Home', url: '/' },
            {
              text: 'Work',
              url: '/work',
              children: [
                { text: 'Photography', url: '/work/photography' },
                { text: 'Web Design', url: '/work/web-design' },
              ],
            },
            { text: 'Contact', url: '/contact' },
          ],
        },
      },
    ],
  },
};

/**
 * Collection of all test partials
 */
export const testPartials = {
  hero: heroPartialFixture,
  card: cardPartialFixture,
  navigation: navigationPartialFixture,
};

/**
 * Sample props for testing each partial
 */
export const testPartialProps = {
  hero: {
    valid: {
      title: 'Test Hero Title',
      subtitle: 'Test subtitle',
      ctaButton: {
        text: 'Click Me',
        url: 'https://example.com',
        variant: 'primary' as const,
      },
    },
    minimal: {
      title: 'Minimal Hero',
    },
    invalid: {
      title: 123, // Invalid type
      ctaButton: {
        text: 'Invalid',
        url: 'not-a-url', // Invalid URL
        variant: 'invalid' as any, // Invalid variant
      },
    },
  },
  card: {
    valid: {
      title: 'Test Card',
      content: 'This is test content for the card component.',
      image: 'https://example.com/image.jpg',
      link: 'https://example.com/read-more',
      variant: 'featured' as const,
    },
    minimal: {
      title: 'Minimal Card',
      content: 'Basic card content.',
    },
    invalid: {
      title: '', // Empty title
      content: null, // Invalid type
      variant: 'invalid' as any,
    },
  },
  navigation: {
    valid: {
      siteName: 'Test Site',
      logo: 'https://example.com/logo.png',
      links: [
        { text: 'Home', url: 'https://example.com', active: true },
        {
          text: 'Services',
          url: 'https://example.com/services',
          children: [
            { text: 'Web Design', url: 'https://example.com/web-design' },
            { text: 'Photography', url: 'https://example.com/photography' },
          ],
        },
      ],
    },
    minimal: {
      siteName: 'Simple Site',
      links: [{ text: 'Home', url: 'https://example.com' }],
    },
    invalid: {
      siteName: 123, // Invalid type
      links: [{ text: 'Invalid', url: 'not-a-url' }], // Invalid URL
    },
  },
};
