/**
 * Header/Navigation Organism - JavaScript Enhancement
 *
 * Provides interactive functionality for:
 * - Mobile menu toggle
 * - Scroll detection for transparent headers
 * - Dropdown navigation (mobile)
 * - Body scroll lock when mobile menu open
 *
 * Progressive enhancement: Component works without JS, enhanced with it.
 */

(function() {
  'use strict';

  /**
   * Initialize all header components on page
   */
  function initHeaders() {
    initMobileMenus();
    initScrollDetection();
  }

  /**
   * Initialize mobile menu toggle functionality
   */
  function initMobileMenus() {
    const toggleButtons = document.querySelectorAll('.header-mobile-toggle');

    toggleButtons.forEach(button => {
      const menuId = button.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);
      const backdrop = document.querySelector('.header-mobile-backdrop');

      if (!menu) return;

      // Toggle button click handler
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        toggleMobileMenu(button, menu, backdrop, !isOpen);
      });

      // Close on backdrop click
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          toggleMobileMenu(button, menu, backdrop, false);
        });
      }

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
          toggleMobileMenu(button, menu, backdrop, false);
          button.focus(); // Return focus to toggle button
        }
      });

      // Close mobile menu when navigation link clicked
      const mobileLinks = menu.querySelectorAll('.header-mobile-nav-link[href]:not([aria-haspopup])');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          toggleMobileMenu(button, menu, backdrop, false);
        });
      });

      // Initialize mobile dropdown toggles
      initMobileDropdowns(menu);
    });
  }

  /**
   * Toggle mobile menu open/closed state
   */
  function toggleMobileMenu(button, menu, backdrop, open) {
    // Update button state
    button.setAttribute('aria-expanded', open);

    // Update menu visibility
    menu.setAttribute('aria-hidden', !open);

    // Update backdrop visibility
    if (backdrop) {
      backdrop.setAttribute('aria-hidden', !open);
    }

    // Lock/unlock body scroll
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Initialize mobile dropdown navigation toggles
   */
  function initMobileDropdowns(menu) {
    const dropdownToggles = menu.querySelectorAll('.header-mobile-nav-link[aria-haspopup="true"]');

    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
      });
    });
  }

  /**
   * Initialize scroll detection for transparent headers
   */
  function initScrollDetection() {
    const headers = document.querySelectorAll('[data-scroll-detection="true"]');
    const SCROLL_THRESHOLD = 50; // px scrolled before adding .header-scrolled

    headers.forEach(header => {
      let lastScroll = 0;
      let ticking = false;

      const updateHeaderState = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > SCROLL_THRESHOLD) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
      };

      // Use requestAnimationFrame for smooth scroll handling
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeaderState);
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Check initial state
      updateHeaderState();
    });
  }

  /**
   * Initialize desktop dropdown navigation (optional enhancement)
   * Adds keyboard navigation support for dropdown menus
   */
  function initDesktopDropdowns() {
    const dropdownToggles = document.querySelectorAll('.header-nav-link[aria-haspopup="true"]');

    dropdownToggles.forEach(toggle => {
      const dropdown = toggle.nextElementSibling;
      if (!dropdown || !dropdown.classList.contains('header-dropdown')) return;

      // Open dropdown on click
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
        closeAllDropdowns();

        // Toggle current dropdown
        toggle.setAttribute('aria-expanded', !isExpanded);
      });

      // Close dropdown on Escape
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });

      // Keep dropdown open when clicking inside
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-nav-item')) {
        closeAllDropdowns();
      }
    });
  }

  /**
   * Close all desktop dropdowns
   */
  function closeAllDropdowns() {
    const dropdownToggles = document.querySelectorAll('.header-nav-link[aria-expanded="true"]');
    dropdownToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaders);
  } else {
    initHeaders();
  }

  // Optional: Initialize desktop dropdown keyboard navigation
  // Uncomment if needed for enhanced keyboard support
  // if (document.readyState === 'loading') {
  //   document.addEventListener('DOMContentLoaded', initDesktopDropdowns);
  // } else {
  //   initDesktopDropdowns();
  // }
})();
