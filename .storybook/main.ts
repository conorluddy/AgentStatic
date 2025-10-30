import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '!../components/_templates/**',
    '../components/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Pure CSS - no PostCSS or preprocessor plugins needed
    // Vite will handle CSS imports natively
    return config;
  },
  docs: {},
};

export default config;
