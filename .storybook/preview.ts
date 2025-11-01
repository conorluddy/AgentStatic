import type { Preview } from '@storybook/html-vite';
import '../components/index.css';
import nunjucks from 'nunjucks';

// Global type for precompiled templates
declare global {
  interface Window {
    nunjucksPrecompiled?: Record<string, any>;
  }
}

// ============================================================================
// CRITICAL: Load precompiled templates BEFORE configuring nunjucks
// ============================================================================
// Import precompiled templates synchronously to populate window.nunjucksPrecompiled
// This must happen before nunjucks.configure() is called
import './precompiled-templates.js';

console.debug('[Storybook] Precompiled Nunjucks templates imported');

// ============================================================================
// Configure Nunjucks for browser use with precompiled templates
// ============================================================================
// The FileSystemLoader is disabled in browser context. Instead, nunjucks will
// use the precompiled templates from window.nunjucksPrecompiled that were
// registered by the precompiled-templates.js module above.
const env = nunjucks.configure({
  autoescape: true,
  noCache: true, // Prevent browser caching issues
  // Don't specify a loader - nunjucks will look for templates in the global store
});

// ============================================================================
// Add custom filters required by templates
// ============================================================================
// The 'merge' filter merges two objects together (similar to Object.assign)
env.addFilter('merge', function(obj1: any, obj2: any) {
  return Object.assign({}, obj1, obj2);
});

// Verify templates loaded
if (typeof window !== 'undefined' && window.nunjucksPrecompiled) {
  const templateCount = Object.keys(window.nunjucksPrecompiled).length;
  console.debug(`[Storybook] ${templateCount} precompiled templates available`);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', theme);
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '1rem';

      // Apply theme to document root as well
      document.documentElement.setAttribute('data-theme', theme);

      const storyResult = story();
      if (typeof storyResult === 'string') {
        wrapper.innerHTML = storyResult;
      } else {
        wrapper.appendChild(storyResult);
      }

      return wrapper;
    },
  ],
};

export default preview;
