import type { Preview } from '@storybook/html-vite';
import '../components/index.css';

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
