/**
 * Header Navigation Partial
 *
 * Responsive site header with navigation and mobile menu support.
 * Follows CODESTYLE.md principles: Human-Centric Design, Type Safety.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../../src/types/partial.js';

/**
 * Navigation item schema
 */
const NavigationItemSchema = z.object({
  title: z.string().min(1).describe('Display text for navigation item'),
  href: z.string().min(1).describe('URL or anchor for navigation'),
  active: z
    .boolean()
    .default(false)
    .describe('Whether this item is currently active'),
  external: z
    .boolean()
    .default(false)
    .describe('Whether link opens in new tab'),
});

/**
 * Header component props schema
 */
const HeaderPropsSchema = z.object({
  siteName: z.string().min(1).describe('Site name displayed in header'),
  siteUrl: z.string().url().default('/').describe('Home page URL'),
  navigation: z.array(NavigationItemSchema).describe('Navigation menu items'),
  showMobileMenu: z
    .boolean()
    .default(true)
    .describe('Enable mobile hamburger menu'),
  variant: z
    .enum(['default', 'transparent', 'sticky'])
    .default('default')
    .describe('Header style variant'),
});

type HeaderProps = z.infer<typeof HeaderPropsSchema>;

/**
 * Header partial implementation
 */
export const headerPartial: AgentPartial<HeaderProps> = {
  schema: HeaderPropsSchema,

  template: props => {
    const { siteName, siteUrl, navigation, showMobileMenu, variant } = props;

    // Generate navigation items
    const navItems = navigation
      .map(
        item => `
      <li class="nav-item">
        <a 
          href="${item.href}" 
          class="nav-link ${item.active ? 'nav-link--active' : ''}"
          ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
          ${item.active ? 'aria-current="page"' : ''}
        >
          ${item.title}
        </a>
      </li>
    `
      )
      .join('');

    return `
      <header class="header header--${variant}" role="banner">
        <div class="header__container">
          <!-- Site Brand -->
          <div class="header__brand">
            <a href="${siteUrl}" class="brand-link" aria-label="Go to homepage">
              <span class="brand-text">${siteName}</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav nav--desktop" role="navigation" aria-label="Main navigation">
            <ul class="nav__list">
              ${navItems}
            </ul>
          </nav>

          ${
            showMobileMenu
              ? `
            <!-- Mobile Menu Toggle -->
            <button 
              class="nav-toggle" 
              aria-label="Toggle navigation menu"
              aria-expanded="false"
              aria-controls="mobile-nav"
              data-nav-toggle
            >
              <span class="nav-toggle__bar"></span>
              <span class="nav-toggle__bar"></span>
              <span class="nav-toggle__bar"></span>
            </button>

            <!-- Mobile Navigation -->
            <nav 
              class="nav nav--mobile" 
              id="mobile-nav"
              role="navigation" 
              aria-label="Mobile navigation"
              aria-hidden="true"
            >
              <ul class="nav__list">
                ${navItems}
              </ul>
            </nav>
          `
              : ''
          }
        </div>
      </header>

      ${
        showMobileMenu
          ? `
        <script>
          // Mobile menu toggle functionality
          document.addEventListener('DOMContentLoaded', function() {
            const toggle = document.querySelector('[data-nav-toggle]');
            const mobileNav = document.getElementById('mobile-nav');
            
            if (toggle && mobileNav) {
              toggle.addEventListener('click', function() {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                const newState = !isExpanded;
                
                toggle.setAttribute('aria-expanded', newState.toString());
                mobileNav.setAttribute('aria-hidden', (!newState).toString());
                toggle.classList.toggle('nav-toggle--active', newState);
                mobileNav.classList.toggle('nav--mobile--open', newState);
              });
              
              // Close mobile menu when clicking nav links
              mobileNav.addEventListener('click', function(e) {
                if (e.target.matches('.nav-link')) {
                  toggle.setAttribute('aria-expanded', 'false');
                  mobileNav.setAttribute('aria-hidden', 'true');
                  toggle.classList.remove('nav-toggle--active');
                  mobileNav.classList.remove('nav--mobile--open');
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
    /* Header Base Styles */
    .header {
      position: relative;
      background-color: var(--color-background, #ffffff);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      z-index: 1000;
    }

    .header--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    .header--sticky {
      position: sticky;
      top: 0;
      backdrop-filter: blur(8px);
      background-color: var(--color-background-alpha, rgba(255, 255, 255, 0.95));
    }

    .header__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-sm, 1rem);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 64px;
    }

    /* Brand Styles */
    .header__brand {
      flex-shrink: 0;
    }

    .brand-link {
      text-decoration: none;
      color: var(--color-text, #1f2937);
      font-weight: 600;
      font-size: 1.25rem;
      transition: color 0.2s ease;
    }

    .brand-link:hover,
    .brand-link:focus {
      color: var(--color-primary, #3b82f6);
      outline: none;
    }

    .brand-text {
      display: inline-block;
    }

    /* Navigation Styles */
    .nav__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: var(--spacing-md, 1.5rem);
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      text-decoration: none;
      color: var(--color-text-light, #6b7280);
      font-weight: 500;
      padding: 0.5rem 0;
      transition: color 0.2s ease;
      position: relative;
    }

    .nav-link:hover,
    .nav-link:focus {
      color: var(--color-text, #1f2937);
      outline: none;
    }

    .nav-link--active {
      color: var(--color-primary, #3b82f6);
      font-weight: 600;
    }

    .nav-link--active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-primary, #3b82f6);
      border-radius: 1px;
    }

    /* Desktop Navigation */
    .nav--desktop {
      display: none;
    }

    @media (min-width: 768px) {
      .nav--desktop {
        display: block;
      }
    }

    /* Mobile Menu Toggle */
    .nav-toggle {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .nav-toggle:hover,
    .nav-toggle:focus {
      background-color: var(--color-surface, #f9fafb);
      outline: none;
    }

    .nav-toggle__bar {
      width: 24px;
      height: 3px;
      background-color: var(--color-text, #1f2937);
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
      transform-origin: center;
    }

    .nav-toggle--active .nav-toggle__bar:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .nav-toggle--active .nav-toggle__bar:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle--active .nav-toggle__bar:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (min-width: 768px) {
      .nav-toggle {
        display: none;
      }
    }

    /* Mobile Navigation */
    .nav--mobile {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-background, #ffffff);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      padding: var(--spacing-sm, 1rem);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
    }

    .nav--mobile--open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav--mobile .nav__list {
      flex-direction: column;
      gap: var(--spacing-xs, 0.5rem);
    }

    .nav--mobile .nav-link {
      display: block;
      padding: var(--spacing-sm, 1rem);
      border-radius: 6px;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .nav--mobile .nav-link:hover,
    .nav--mobile .nav-link:focus {
      background-color: var(--color-surface, #f9fafb);
    }

    .nav--mobile .nav-link--active {
      background-color: var(--color-primary-light, #dbeafe);
    }

    .nav--mobile .nav-link--active::after {
      display: none;
    }

    @media (min-width: 768px) {
      .nav--mobile {
        display: none;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .nav-link,
      .nav-toggle,
      .nav-toggle__bar,
      .nav--mobile {
        transition: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .header {
        border-bottom-width: 2px;
      }
      
      .nav-link--active::after {
        height: 3px;
      }
    }
  `,

  metadata: {
    description:
      'Responsive site header with navigation and mobile menu support',
    category: 'layout',
    keywords: [
      'header',
      'navigation',
      'mobile-menu',
      'responsive',
      'accessibility',
    ],
    usageExamples: [
      'Site header with main navigation',
      'Mobile-responsive navigation menu',
      'Sticky header for long pages',
      'Transparent header for hero sections',
    ],
  },
};
