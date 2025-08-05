/**
 * Test fixtures for configuration objects
 *
 * Provides sample configurations for content discovery,
 * site settings, build options, and deployment targets.
 */

import type {
  ContentDiscoveryConfig,
  ContentCollection,
} from '@/types/content';
import type { CompositionContext } from '@/types/partial';
import { z } from 'zod';

/**
 * Sample content discovery configurations
 */
export const sampleContentDiscoveryConfigs: Record<
  string,
  ContentDiscoveryConfig
> = {
  minimal: {
    contentDir: 'content',
    includePatterns: ['**/*.md'],
    excludePatterns: ['**/drafts/**', '**/.git/**'],
    defaultFrontmatter: {
      draft: false,
      tags: [],
    },
    processingOptions: {
      generateExcerpt: true,
      excerptLength: 160,
      generateTOC: false,
      tocMaxDepth: 3,
      calculateReadingTime: true,
      wordsPerMinute: 200,
    },
  },

  comprehensive: {
    contentDir: 'content',
    includePatterns: ['**/*.md', '**/*.mdx'],
    excludePatterns: [
      '**/drafts/**',
      '**/.git/**',
      '**/node_modules/**',
      '**/.DS_Store',
      '**/Thumbs.db',
    ],
    defaultFrontmatter: {
      draft: false,
      tags: [],
      author: 'Site Author',
      noindex: false,
      nofollow: false,
    },
    processingOptions: {
      generateExcerpt: true,
      excerptLength: 200,
      generateTOC: true,
      tocMaxDepth: 4,
      calculateReadingTime: true,
      wordsPerMinute: 225,
    },
  },

  portfolio: {
    contentDir: 'portfolio',
    includePatterns: ['**/*.md'],
    excludePatterns: ['**/private/**', '**/.git/**'],
    defaultFrontmatter: {
      draft: false,
      tags: ['portfolio'],
      openGraph: {
        type: 'article' as const,
      },
    },
    processingOptions: {
      generateExcerpt: true,
      excerptLength: 120,
      generateTOC: false,
      tocMaxDepth: 2,
      calculateReadingTime: false,
      wordsPerMinute: 200,
    },
  },
};

/**
 * Sample content collections
 */
export const sampleContentCollections: Record<string, ContentCollection> = {
  blog: {
    name: 'blog',
    pattern: 'blog/**/*.md',
    frontmatterSchema: z.any(), // Would use actual schema in real implementation
    defaultSort: 'publishedAt',
    generateIndex: true,
    generateTags: true,
    generatePagination: true,
    itemsPerPage: 10,
  },

  portfolio: {
    name: 'portfolio',
    pattern: 'portfolio/**/*.md',
    frontmatterSchema: z.any(), // Would use actual schema in real implementation
    defaultSort: 'publishedAt',
    generateIndex: true,
    generateTags: false,
    generatePagination: false,
  },

  docs: {
    name: 'documentation',
    pattern: 'docs/**/*.md',
    frontmatterSchema: z.any(), // Would use actual schema in real implementation
    defaultSort: 'title',
    generateIndex: true,
    generateTags: true,
    generatePagination: false,
  },
};

/**
 * Sample composition contexts for different environments
 */
export const sampleCompositionContexts: Record<string, CompositionContext> = {
  development: {
    currentPath: '/blog/sample-post',
    siteName: 'AgentStatic Test Site',
    baseUrl: 'http://localhost:3000',
    isDevelopment: true,
    buildTime: new Date('2024-01-15T10:00:00Z'),
    theme: 'default',
    locale: 'en-US',
  },

  production: {
    currentPath: '/portfolio/nature-photography',
    siteName: 'Professional Portfolio',
    baseUrl: 'https://example.com',
    isDevelopment: false,
    buildTime: new Date('2024-01-15T14:30:00Z'),
    theme: 'minimal',
    locale: 'en-US',
  },

  staging: {
    currentPath: '/',
    siteName: 'Staging Site',
    baseUrl: 'https://staging.example.com',
    isDevelopment: false,
    buildTime: new Date('2024-01-15T12:15:00Z'),
    theme: 'dark',
    locale: 'en-US',
  },

  multilingual: {
    currentPath: '/es/acerca-de',
    siteName: 'Sitio Multilingüe',
    baseUrl: 'https://example.com',
    isDevelopment: false,
    buildTime: new Date('2024-01-15T16:45:00Z'),
    theme: 'default',
    locale: 'es-ES',
  },
};

/**
 * Sample build configurations
 */
export const sampleBuildConfigs = {
  development: {
    minify: false,
    sourceMaps: true,
    optimizeImages: false,
    generateSitemap: false,
    generateRSS: false,
    outputDir: 'dist',
    publicPath: '/',
    target: 'es2022',
    format: 'esm',
  },

  production: {
    minify: true,
    sourceMaps: false,
    optimizeImages: true,
    generateSitemap: true,
    generateRSS: true,
    outputDir: 'dist',
    publicPath: '/',
    target: 'es2020',
    format: 'esm',
    imageOptimization: {
      quality: 85,
      progressive: true,
      formats: ['webp', 'avif', 'jpeg'],
      sizes: [400, 800, 1200, 1600],
    },
  },

  preview: {
    minify: true,
    sourceMaps: true,
    optimizeImages: true,
    generateSitemap: false,
    generateRSS: false,
    outputDir: 'preview',
    publicPath: '/preview/',
    target: 'es2022',
    format: 'esm',
  },
};

/**
 * Sample deployment configurations
 */
export const sampleDeploymentConfigs = {
  s3: {
    provider: 's3',
    bucket: 'my-static-site',
    region: 'us-east-1',
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    cloudfront: {
      distributionId: 'E123EXAMPLE456',
      invalidationPaths: ['/*'],
    },
  },

  netlify: {
    provider: 'netlify',
    siteId: 'abc123-def456-ghi789',
    deployDir: 'dist',
    functions: 'functions',
    redirects: [{ from: '/old-path/*', to: '/new-path/:splat', status: 301 }],
  },

  vercel: {
    provider: 'vercel',
    projectId: 'prj_abc123def456',
    outputDirectory: 'dist',
    buildCommand: 'npm run build',
    installCommand: 'npm install',
  },

  githubPages: {
    provider: 'github-pages',
    repository: 'username/portfolio',
    branch: 'gh-pages',
    cname: 'example.com',
    jekyll: false,
  },
};

/**
 * Sample theme configurations
 */
export const sampleThemeConfigs = {
  default: {
    name: 'default',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      muted: '#64748b',
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
      '2xl': '4rem',
    },
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },

  minimal: {
    name: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#000000',
      muted: '#666666',
    },
    typography: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },

  dark: {
    name: 'dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      accent: '#fbbf24',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#94a3b8',
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
      '2xl': '4rem',
    },
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },
};
