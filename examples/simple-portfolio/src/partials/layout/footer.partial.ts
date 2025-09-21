/**
 * Footer Partial
 *
 * Site footer with social links, copyright, and additional navigation.
 * Follows CODESTYLE.md principles: Simple & Clear, Human-Centric Design.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../../src/types/partial';

/**
 * Social link schema
 */
const SocialLinkSchema = z.object({
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
    .describe('Social platform identifier'),
  url: z.string().url().describe('Profile or contact URL'),
  label: z.string().optional().describe('Custom accessibility label'),
});

/**
 * Footer link schema
 */
const FooterLinkSchema = z.object({
  title: z.string().min(1).describe('Link display text'),
  href: z.string().min(1).describe('Link URL'),
  external: z
    .boolean()
    .default(false)
    .describe('Whether link opens in new tab'),
});

/**
 * Footer section schema
 */
const FooterSectionSchema = z.object({
  title: z.string().min(1).describe('Section heading'),
  links: z.array(FooterLinkSchema).describe('Links in this section'),
});

/**
 * Footer component props schema
 */
const FooterPropsSchema = z.object({
  siteName: z.string().min(1).describe('Site name for copyright'),
  copyright: z.string().optional().describe('Custom copyright text'),
  socialLinks: z
    .array(SocialLinkSchema)
    .default([])
    .describe('Social media links'),
  sections: z
    .array(FooterSectionSchema)
    .default([])
    .describe('Footer navigation sections'),
  showBackToTop: z.boolean().default(true).describe('Show back to top button'),
  variant: z
    .enum(['default', 'minimal', 'detailed'])
    .default('default')
    .describe('Footer style variant'),
});

type FooterProps = z.infer<typeof FooterPropsSchema>;

/**
 * Footer partial implementation
 */
export const footerPartial: AgentPartial<FooterProps> = {
  schema: FooterPropsSchema,

  template: props => {
    const {
      siteName,
      copyright,
      socialLinks,
      sections,
      showBackToTop,
      variant,
    } = props;
    const currentYear = new Date().getFullYear();
    const copyrightText =
      copyright || `© ${currentYear} ${siteName}. All rights reserved.`;

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
        <li class="social-item">
          <a 
            href="${link.url}" 
            class="social-link social-link--${link.platform}"
            aria-label="${label}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="social-icon" aria-hidden="true">${platform.icon}</span>
            <span class="social-label">${platform.label}</span>
          </a>
        </li>
      `;
      })
      .join('');

    // Generate footer sections
    const sectionsHtml = sections
      .map(
        section => `
      <div class="footer-section">
        <h3 class="footer-section__title">${section.title}</h3>
        <ul class="footer-links">
          ${section.links
            .map(
              link => `
            <li class="footer-link-item">
              <a 
                href="${link.href}" 
                class="footer-link"
                ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
              >
                ${link.title}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `
      )
      .join('');

    return `
      <footer class="footer footer--${variant}" role="contentinfo">
        <div class="footer__container">
          
          ${
            variant === 'detailed' &&
            (socialLinks.length > 0 || sections.length > 0)
              ? `
            <!-- Main Footer Content -->
            <div class="footer__main">
              
              ${
                socialLinks.length > 0
                  ? `
                <!-- Social Links -->
                <div class="footer-section footer-section--social">
                  <h3 class="footer-section__title">Connect</h3>
                  <ul class="social-links">
                    ${socialLinksHtml}
                  </ul>
                </div>
              `
                  : ''
              }
              
              ${
                sections.length > 0
                  ? `
                <!-- Navigation Sections -->
                ${sectionsHtml}
              `
                  : ''
              }
              
            </div>
            
            <!-- Footer Divider -->
            <hr class="footer__divider" role="separator">
          `
              : ''
          }
          
          <!-- Footer Bottom -->
          <div class="footer__bottom">
            
            <!-- Copyright -->
            <div class="footer__copyright">
              <p class="copyright-text">${copyrightText}</p>
            </div>
            
            ${
              variant !== 'detailed' && socialLinks.length > 0
                ? `
              <!-- Compact Social Links -->
              <div class="footer__social">
                <ul class="social-links social-links--compact">
                  ${socialLinksHtml}
                </ul>
              </div>
            `
                : ''
            }
            
            ${
              showBackToTop
                ? `
              <!-- Back to Top -->
              <div class="footer__actions">
                <button 
                  class="back-to-top" 
                  aria-label="Back to top of page"
                  data-back-to-top
                >
                  <span class="back-to-top__icon" aria-hidden="true">↑</span>
                  <span class="back-to-top__text">Top</span>
                </button>
              </div>
            `
                : ''
            }
            
          </div>
        </div>
      </footer>

      ${
        showBackToTop
          ? `
        <script>
          // Back to top functionality
          document.addEventListener('DOMContentLoaded', function() {
            const backToTopButton = document.querySelector('[data-back-to-top]');
            
            if (backToTopButton) {
              backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });
              
              // Show/hide based on scroll position
              function toggleBackToTop() {
                const scrolled = window.pageYOffset > 300;
                backToTopButton.style.opacity = scrolled ? '1' : '0';
                backToTopButton.style.pointerEvents = scrolled ? 'auto' : 'none';
              }
              
              window.addEventListener('scroll', toggleBackToTop);
              toggleBackToTop(); // Initial state
            }
          });
        </script>
      `
          : ''
      }
    `;
  },

  styles: `
    /* Footer Base Styles */
    .footer {
      background-color: var(--color-surface, #f9fafb);
      border-top: 1px solid var(--color-border, #e5e7eb);
      margin-top: auto;
    }

    .footer__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-xl, 3rem) var(--spacing-sm, 1rem) var(--spacing-lg, 2rem);
    }

    /* Main Footer Content */
    .footer__main {
      display: grid;
      gap: var(--spacing-lg, 2rem);
      margin-bottom: var(--spacing-lg, 2rem);
    }

    @media (min-width: 768px) {
      .footer__main {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }

    .footer__divider {
      border: none;
      border-top: 1px solid var(--color-border, #e5e7eb);
      margin: var(--spacing-lg, 2rem) 0;
    }

    /* Footer Sections */
    .footer-section {
      margin-bottom: var(--spacing-md, 1.5rem);
    }

    .footer-section__title {
      color: var(--color-text, #1f2937);
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: var(--spacing-sm, 1rem);
      margin-top: 0;
    }

    .footer-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .footer-link-item {
      margin-bottom: var(--spacing-xs, 0.5rem);
    }

    .footer-link {
      color: var(--color-text-light, #6b7280);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;
    }

    .footer-link:hover,
    .footer-link:focus {
      color: var(--color-primary, #3b82f6);
      outline: none;
    }

    /* Social Links */
    .social-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: var(--spacing-sm, 1rem);
      flex-wrap: wrap;
    }

    .social-links--compact {
      gap: var(--spacing-xs, 0.5rem);
    }

    .social-item {
      display: flex;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      color: var(--color-text-light, #6b7280);
      text-decoration: none;
      padding: var(--spacing-xs, 0.5rem);
      border-radius: 6px;
      transition: background-color 0.2s ease, color 0.2s ease;
      font-size: 0.875rem;
    }

    .social-link:hover,
    .social-link:focus {
      background-color: var(--color-background, #ffffff);
      color: var(--color-primary, #3b82f6);
      outline: none;
    }

    .social-icon {
      font-size: 1.125rem;
      line-height: 1;
    }

    .social-links--compact .social-label {
      display: none;
    }

    @media (min-width: 640px) {
      .social-links--compact .social-label {
        display: inline;
      }
    }

    /* Footer Bottom */
    .footer__bottom {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 1rem);
      align-items: center;
      text-align: center;
    }

    @media (min-width: 768px) {
      .footer__bottom {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }

    .footer__copyright {
      flex: 1;
    }

    .copyright-text {
      color: var(--color-text-light, #6b7280);
      font-size: 0.875rem;
      margin: 0;
    }

    .footer__social {
      order: -1;
    }

    @media (min-width: 768px) {
      .footer__social {
        order: 0;
      }
    }

    .footer__actions {
      display: flex;
      align-items: center;
    }

    /* Back to Top Button */
    .back-to-top {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      background: var(--color-primary, #3b82f6);
      color: white;
      border: none;
      padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    }

    .back-to-top:hover,
    .back-to-top:focus {
      background-color: var(--color-primary-dark, #2563eb);
      outline: none;
    }

    .back-to-top__icon {
      font-size: 1rem;
      line-height: 1;
    }

    /* Footer Variants */
    .footer--minimal {
      background-color: transparent;
      border-top: none;
    }

    .footer--minimal .footer__container {
      padding-top: var(--spacing-lg, 2rem);
      padding-bottom: var(--spacing-lg, 2rem);
    }

    .footer--detailed .footer__container {
      padding-top: var(--spacing-xl, 3rem);
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .footer-link,
      .social-link,
      .back-to-top {
        transition: none;
      }
      
      .back-to-top {
        scroll-behavior: auto;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .footer {
        border-top-width: 2px;
      }
      
      .footer__divider {
        border-top-width: 2px;
      }
    }

    /* Print styles */
    @media print {
      .footer {
        background-color: transparent;
        border-top: 1px solid #000;
      }
      
      .back-to-top,
      .social-links {
        display: none;
      }
    }
  `,

  metadata: {
    description:
      'Site footer with social links, navigation, and copyright information',
    category: 'layout',
    keywords: [
      'footer',
      'social-links',
      'navigation',
      'copyright',
      'back-to-top',
    ],
    usageExamples: [
      'Basic site footer with copyright',
      'Footer with social media links',
      'Detailed footer with navigation sections',
      'Minimal footer for clean designs',
    ],
  },
};
