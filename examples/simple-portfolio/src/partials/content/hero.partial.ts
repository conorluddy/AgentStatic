/**
 * Hero Section Partial
 *
 * Eye-catching page header with title, subtitle, call-to-action, and optional image.
 * Follows CODESTYLE.md principles: Progressive Disclosure, Human-Centric Design.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../../src/types/partial.js';

/**
 * Call-to-action button schema
 */
const CtaButtonSchema = z.object({
  text: z.string().min(1).describe('Button text'),
  href: z.string().min(1).describe('Button URL'),
  variant: z
    .enum(['primary', 'secondary', 'outline'])
    .default('primary')
    .describe('Button style variant'),
  external: z
    .boolean()
    .default(false)
    .describe('Whether link opens in new tab'),
});

/**
 * Social link schema for hero
 */
const HeroSocialLinkSchema = z.object({
  platform: z
    .enum([
      'github',
      'linkedin',
      'twitter',
      'instagram',
      'behance',
      'dribbble',
      'email',
    ])
    .describe('Social platform'),
  url: z.string().url().describe('Profile URL'),
  label: z.string().optional().describe('Custom accessibility label'),
});

/**
 * Hero component props schema
 */
const HeroPropsSchema = z.object({
  title: z.string().min(1).describe('Main hero title'),
  subtitle: z.string().optional().describe('Hero subtitle or tagline'),
  description: z.string().optional().describe('Longer description text'),
  image: z.string().optional().describe('Hero image URL'),
  imageAlt: z.string().optional().describe('Alt text for hero image'),
  ctaButton: CtaButtonSchema.optional().describe(
    'Primary call-to-action button'
  ),
  secondaryButton: CtaButtonSchema.optional().describe(
    'Secondary call-to-action button'
  ),
  socialLinks: z
    .array(HeroSocialLinkSchema)
    .default([])
    .describe('Social media links'),
  alignment: z
    .enum(['left', 'center', 'right'])
    .default('center')
    .describe('Content alignment'),
  variant: z
    .enum(['default', 'gradient', 'image-background', 'split'])
    .default('default')
    .describe('Hero style variant'),
  showScrollIndicator: z
    .boolean()
    .default(false)
    .describe('Show scroll down indicator'),
});

type HeroProps = z.infer<typeof HeroPropsSchema>;

/**
 * Hero partial implementation
 */
export const heroPartial: AgentPartial<HeroProps> = {
  schema: HeroPropsSchema,

  template: props => {
    const {
      title,
      subtitle,
      description,
      image,
      imageAlt,
      ctaButton,
      secondaryButton,
      socialLinks,
      alignment,
      variant,
      showScrollIndicator,
    } = props;

    // Social platform icons and labels
    const socialPlatforms = {
      github: { icon: '🔗', label: 'GitHub' },
      linkedin: { icon: '💼', label: 'LinkedIn' },
      twitter: { icon: '🐦', label: 'Twitter' },
      instagram: { icon: '📷', label: 'Instagram' },
      behance: { icon: '🎨', label: 'Behance' },
      dribbble: { icon: '🏀', label: 'Dribbble' },
      email: { icon: '✉️', label: 'Email' },
    };

    // Generate social links
    const socialLinksHtml = socialLinks
      .map(link => {
        const platform = socialPlatforms[link.platform];
        const label = link.label || `${platform.label} profile`;

        return `
        <li class="hero-social__item">
          <a 
            href="${link.url}" 
            class="hero-social__link hero-social__link--${link.platform}"
            aria-label="${label}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="hero-social__icon" aria-hidden="true">${platform.icon}</span>
            <span class="hero-social__label">${platform.label}</span>
          </a>
        </li>
      `;
      })
      .join('');

    // Generate CTA buttons
    const ctaButtonHtml = ctaButton
      ? `
      <a 
        href="${ctaButton.href}" 
        class="hero-cta hero-cta--${ctaButton.variant}"
        ${ctaButton.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
      >
        ${ctaButton.text}
      </a>
    `
      : '';

    const secondaryButtonHtml = secondaryButton
      ? `
      <a 
        href="${secondaryButton.href}" 
        class="hero-cta hero-cta--${secondaryButton.variant}"
        ${secondaryButton.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
      >
        ${secondaryButton.text}
      </a>
    `
      : '';

    // Content section
    const contentHtml = `
      <div class="hero__content">
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
        ${description ? `<p class="hero__description">${description}</p>` : ''}
        
        ${
          ctaButton || secondaryButton
            ? `
          <div class="hero__actions">
            ${ctaButtonHtml}
            ${secondaryButtonHtml}
          </div>
        `
            : ''
        }
        
        ${
          socialLinks.length > 0
            ? `
          <div class="hero__social">
            <ul class="hero-social">
              ${socialLinksHtml}
            </ul>
          </div>
        `
            : ''
        }
      </div>
    `;

    // Image section
    const imageHtml = image
      ? `
      <div class="hero__image">
        <img 
          src="${image}" 
          alt="${imageAlt || ''}" 
          class="hero-image"
          loading="eager"
        />
      </div>
    `
      : '';

    return `
      <section class="hero hero--${variant} hero--align-${alignment}" role="banner">
        <div class="hero__container">
          
          ${
            variant === 'split'
              ? `
            <!-- Split Layout -->
            ${contentHtml}
            ${imageHtml}
          `
              : variant === 'image-background'
                ? `
            <!-- Image Background Layout -->
            ${
              image
                ? `
              <div class="hero__background" style="background-image: url('${image}');" role="img" aria-label="${imageAlt || 'Hero background'}"></div>
            `
                : ''
            }
            ${contentHtml}
          `
                : `
            <!-- Default/Gradient Layout -->
            ${contentHtml}
            ${imageHtml}
          `
          }
          
          ${
            showScrollIndicator
              ? `
            <!-- Scroll Indicator -->
            <div class="hero__scroll-indicator">
              <button 
                class="scroll-indicator" 
                aria-label="Scroll down to content"
                data-scroll-to-content
              >
                <span class="scroll-indicator__text">Scroll</span>
                <span class="scroll-indicator__arrow" aria-hidden="true">↓</span>
              </button>
            </div>
          `
              : ''
          }
          
        </div>
      </section>

      ${
        showScrollIndicator
          ? `
        <script>
          // Scroll indicator functionality
          document.addEventListener('DOMContentLoaded', function() {
            const scrollButton = document.querySelector('[data-scroll-to-content]');
            
            if (scrollButton) {
              scrollButton.addEventListener('click', function() {
                const heroSection = document.querySelector('.hero');
                const nextSection = heroSection ? heroSection.nextElementSibling : null;
                
                if (nextSection) {
                  nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                } else {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }
              });
            }
          });
        </script>
      `
          : ''
      }
    `;
  },

  styles: `
    /* Hero Base Styles */
    .hero {
      position: relative;
      min-height: 60vh;
      display: flex;
      align-items: center;
      background-color: var(--color-background, #ffffff);
      overflow: hidden;
    }

    .hero__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-xl, 3rem) var(--spacing-sm, 1rem);
      width: 100%;
      position: relative;
      z-index: 2;
    }

    /* Hero Variants */
    .hero--gradient {
      background: linear-gradient(135deg, var(--color-primary, #3b82f6) 0%, var(--color-primary-dark, #2563eb) 100%);
      color: white;
    }

    .hero--image-background {
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero--image-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }

    .hero__background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 0;
    }

    /* Split Layout */
    .hero--split .hero__container {
      display: grid;
      gap: var(--spacing-xl, 3rem);
      align-items: center;
      min-height: 70vh;
    }

    @media (min-width: 768px) {
      .hero--split .hero__container {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Content Alignment */
    .hero--align-center {
      text-align: center;
    }

    .hero--align-left {
      text-align: left;
    }

    .hero--align-right {
      text-align: right;
    }

    /* Hero Content */
    .hero__content {
      max-width: 600px;
      margin: 0 auto;
    }

    .hero--align-left .hero__content {
      margin-left: 0;
    }

    .hero--align-right .hero__content {
      margin-right: 0;
    }

    .hero--split .hero__content {
      max-width: none;
      margin: 0;
    }

    /* Typography */
    .hero__title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 var(--spacing-sm, 1rem) 0;
      color: inherit;
    }

    .hero__subtitle {
      font-size: clamp(1.125rem, 3vw, 1.5rem);
      font-weight: 600;
      line-height: 1.3;
      margin: 0 0 var(--spacing-md, 1.5rem) 0;
      color: var(--color-primary, #3b82f6);
    }

    .hero--gradient .hero__subtitle,
    .hero--image-background .hero__subtitle {
      color: rgba(255, 255, 255, 0.9);
    }

    .hero__description {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0 0 var(--spacing-lg, 2rem) 0;
      color: var(--color-text-light, #6b7280);
    }

    .hero--gradient .hero__description,
    .hero--image-background .hero__description {
      color: rgba(255, 255, 255, 0.8);
    }

    /* Call-to-Action Buttons */
    .hero__actions {
      display: flex;
      gap: var(--spacing-sm, 1rem);
      margin-bottom: var(--spacing-lg, 2rem);
      flex-wrap: wrap;
    }

    .hero--align-center .hero__actions {
      justify-content: center;
    }

    .hero--align-right .hero__actions {
      justify-content: flex-end;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-sm, 1rem) var(--spacing-md, 1.5rem);
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .hero-cta--primary {
      background-color: var(--color-primary, #3b82f6);
      color: white;
    }

    .hero-cta--primary:hover,
    .hero-cta--primary:focus {
      background-color: var(--color-primary-dark, #2563eb);
      transform: translateY(-1px);
      outline: none;
    }

    .hero-cta--secondary {
      background-color: var(--color-text, #1f2937);
      color: white;
    }

    .hero-cta--secondary:hover,
    .hero-cta--secondary:focus {
      background-color: var(--color-text-light, #6b7280);
      transform: translateY(-1px);
      outline: none;
    }

    .hero-cta--outline {
      background-color: transparent;
      color: var(--color-primary, #3b82f6);
      border-color: var(--color-primary, #3b82f6);
    }

    .hero-cta--outline:hover,
    .hero-cta--outline:focus {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      transform: translateY(-1px);
      outline: none;
    }

    /* White variants for dark backgrounds */
    .hero--gradient .hero-cta--outline,
    .hero--image-background .hero-cta--outline {
      color: white;
      border-color: white;
    }

    .hero--gradient .hero-cta--outline:hover,
    .hero--gradient .hero-cta--outline:focus,
    .hero--image-background .hero-cta--outline:hover,
    .hero--image-background .hero-cta--outline:focus {
      background-color: white;
      color: var(--color-primary, #3b82f6);
    }

    /* Hero Image */
    .hero__image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-image {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .hero--split .hero-image {
      max-height: 500px;
      object-fit: cover;
    }

    /* Social Links */
    .hero__social {
      margin-top: var(--spacing-lg, 2rem);
    }

    .hero-social {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: var(--spacing-sm, 1rem);
      flex-wrap: wrap;
    }

    .hero--align-center .hero-social {
      justify-content: center;
    }

    .hero--align-right .hero-social {
      justify-content: flex-end;
    }

    .hero-social__item {
      display: flex;
    }

    .hero-social__link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      color: var(--color-text-light, #6b7280);
      text-decoration: none;
      padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
      border-radius: 6px;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .hero-social__link:hover,
    .hero-social__link:focus {
      background-color: var(--color-surface, #f9fafb);
      color: var(--color-primary, #3b82f6);
      transform: translateY(-1px);
      outline: none;
    }

    .hero--gradient .hero-social__link,
    .hero--image-background .hero-social__link {
      color: rgba(255, 255, 255, 0.8);
    }

    .hero--gradient .hero-social__link:hover,
    .hero--gradient .hero-social__link:focus,
    .hero--image-background .hero-social__link:hover,
    .hero--image-background .hero-social__link:focus {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .hero-social__icon {
      font-size: 1.125rem;
      line-height: 1;
    }

    /* Scroll Indicator */
    .hero__scroll-indicator {
      position: absolute;
      bottom: var(--spacing-lg, 2rem);
      left: 50%;
      transform: translateX(-50%);
    }

    .scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      background: none;
      border: none;
      color: var(--color-text-light, #6b7280);
      cursor: pointer;
      padding: var(--spacing-sm, 1rem);
      border-radius: 6px;
      transition: all 0.2s ease;
      animation: bounce 2s infinite;
    }

    .scroll-indicator:hover,
    .scroll-indicator:focus {
      color: var(--color-primary, #3b82f6);
      transform: translateY(-2px);
      outline: none;
    }

    .hero--gradient .scroll-indicator,
    .hero--image-background .scroll-indicator {
      color: rgba(255, 255, 255, 0.8);
    }

    .hero--gradient .scroll-indicator:hover,
    .hero--gradient .scroll-indicator:focus,
    .hero--image-background .scroll-indicator:hover,
    .hero--image-background .scroll-indicator:focus {
      color: white;
    }

    .scroll-indicator__text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .scroll-indicator__arrow {
      font-size: 1.25rem;
      line-height: 1;
    }

    /* Bounce Animation */
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-6px);
      }
      60% {
        transform: translateY(-3px);
      }
    }

    /* Responsive Design */
    @media (max-width: 767px) {
      .hero {
        min-height: 50vh;
      }
      
      .hero__container {
        padding: var(--spacing-lg, 2rem) var(--spacing-sm, 1rem);
      }
      
      .hero__actions {
        flex-direction: column;
        align-items: stretch;
      }
      
      .hero--align-center .hero__actions {
        align-items: center;
      }
      
      .hero-cta {
        text-align: center;
      }
      
      .hero-social {
        justify-content: center;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .hero-cta,
      .hero-social__link,
      .scroll-indicator {
        transition: none;
        transform: none;
      }
      
      .scroll-indicator {
        animation: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .hero-cta--outline {
        border-width: 3px;
      }
      
      .hero__background::before {
        background: rgba(0, 0, 0, 0.6);
      }
    }

    /* Print styles */
    @media print {
      .hero {
        min-height: auto;
        background: white !important;
        color: black !important;
      }
      
      .hero__background,
      .hero__scroll-indicator,
      .hero__social {
        display: none;
      }
    }
  `,

  metadata: {
    description:
      'Eye-catching hero section with title, CTA buttons, and optional image',
    category: 'content',
    keywords: ['hero', 'header', 'cta', 'landing', 'banner', 'introduction'],
    usageExamples: [
      'Homepage hero with call-to-action',
      'Landing page header with image',
      'About page introduction',
      'Portfolio hero with social links',
    ],
  },
};
