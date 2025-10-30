/**
 * Dark Mode Toggle Script
 *
 * Minimal vanilla JavaScript for dark mode toggle functionality.
 * Pure CSS handles the actual theming - this script only manages:
 * 1. localStorage persistence
 * 2. data-theme attribute toggling
 * 3. Prevention of FOUC (Flash of Unstyled Content)
 *
 * Architecture:
 * - CSS does the heavy lifting (see components/_system/dark-mode.css)
 * - JavaScript only toggles the data attribute and manages storage
 * - No dependencies, no frameworks, pure vanilla JS
 *
 * Usage:
 * 1. Include this script inline in <head> to prevent FOUC
 * 2. Add toggle button with data-theme-toggle attribute
 * 3. Script will automatically bind to all [data-theme-toggle] buttons
 */

/* ==========================================================================
   FOUC Prevention - Run Immediately
   Must execute before page renders to prevent flash of incorrect theme
   ========================================================================== */

(function initializeTheme() {
  // Retrieve stored theme preference (if any)
  const storedTheme = localStorage.getItem('theme');

  // Detect system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine which theme to apply
  // Priority: stored preference > system preference > light (default)
  let theme = 'light';

  if (storedTheme) {
    // User has explicitly set a preference
    theme = storedTheme;
  } else if (systemPrefersDark) {
    // No stored preference, but system prefers dark
    theme = 'dark';
  }

  // Apply theme immediately (before page renders)
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

/* ==========================================================================
   Theme Toggle Functionality
   Bind toggle behavior to buttons after DOM loads
   ========================================================================== */

(function setupThemeToggle() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    // DOM is already ready
    initToggle();
  }

  function initToggle() {
    // Find all toggle buttons
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    if (toggleButtons.length === 0) {
      // No toggle buttons on this page, skip initialization
      return;
    }

    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    // Set initial ARIA state on all toggle buttons
    toggleButtons.forEach(button => {
      button.setAttribute('aria-pressed', currentTheme === 'dark');

      // Add click handler
      button.addEventListener('click', handleToggleClick);
    });

    // Also listen for system preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', handleSystemPreferenceChange);
  }

  /**
   * Handle toggle button click
   * @param {Event} event - Click event
   */
  function handleToggleClick(event) {
    const button = event.currentTarget;

    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    // Calculate next theme
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Apply new theme
    setTheme(nextTheme);

    // Update ARIA state on all toggle buttons
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', nextTheme === 'dark');
    });
  }

  /**
   * Handle system preference change
   * Only applies if user hasn't explicitly set a preference
   * @param {MediaQueryListEvent} event - Media query change event
   */
  function handleSystemPreferenceChange(event) {
    const storedTheme = localStorage.getItem('theme');

    // Only respond to system changes if user hasn't set explicit preference
    if (!storedTheme) {
      const newTheme = event.matches ? 'dark' : 'light';
      setTheme(newTheme, false); // Don't store, let system preference continue to apply

      // Update ARIA state on all toggle buttons
      const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
      toggleButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', newTheme === 'dark');
      });
    }
  }

  /**
   * Set theme and optionally persist to localStorage
   * @param {string} theme - 'light' or 'dark'
   * @param {boolean} persist - Whether to save to localStorage (default: true)
   */
  function setTheme(theme, persist = true) {
    // Validate theme value
    if (theme !== 'light' && theme !== 'dark') {
      console.warn(`Invalid theme value: ${theme}. Expected 'light' or 'dark'.`);
      return;
    }

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);

    // Persist to localStorage (if requested)
    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        // localStorage might be blocked (privacy settings, incognito mode)
        // Fail silently - theme will still work via attribute
        console.warn('Could not save theme preference to localStorage:', error);
      }
    }

    // Dispatch custom event for any components that need to react
    document.documentElement.dispatchEvent(
      new CustomEvent('themechange', {
        detail: { theme }
      })
    );
  }

  /**
   * Get current theme
   * @returns {string} - 'light' or 'dark'
   */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  // Expose utility functions to global scope (optional)
  // Allows programmatic theme control: window.AgentStatic.setTheme('dark')
  window.AgentStatic = window.AgentStatic || {};
  window.AgentStatic.theme = {
    set: setTheme,
    get: getTheme,
    toggle: () => {
      const current = getTheme();
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      return next;
    }
  };
})();

/* ==========================================================================
   Export for Module Systems (Optional)
   If using ES modules, these functions can be imported
   ========================================================================== */

// CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setTheme: window.AgentStatic?.theme?.set,
    getTheme: window.AgentStatic?.theme?.get,
    toggleTheme: window.AgentStatic?.theme?.toggle
  };
}

// ES Modules
if (typeof exports !== 'undefined') {
  exports.setTheme = window.AgentStatic?.theme?.set;
  exports.getTheme = window.AgentStatic?.theme?.get;
  exports.toggleTheme = window.AgentStatic?.theme?.toggle;
}
