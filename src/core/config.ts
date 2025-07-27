/**
 * Centralized configuration for AgentStatic
 * 
 * Provides typed configuration objects for all core dependencies
 * and systems. Enables MCP extensibility and single source of truth.
 */

import { z } from 'zod';

/**
 * Markdown processing configuration
 */
export const MarkdownConfigSchema = z.object({
  enableGFM: z.boolean().default(true).describe("Enable GitHub Flavored Markdown"),
  enableFrontmatter: z.boolean().default(true).describe("Enable YAML frontmatter processing"),
  enableTOC: z.boolean().default(true).describe("Generate table of contents"),
  tocMaxDepth: z.number().min(1).max(6).default(3).describe("Maximum heading depth for TOC"),
  enableCodeHighlight: z.boolean().default(true).describe("Enable syntax highlighting"),
  customPlugins: z.array(z.any()).default([]).describe("Custom unified plugins")
});

export type MarkdownConfig = z.infer<typeof MarkdownConfigSchema>;

/**
 * Image optimization configuration
 */
export const ImageConfigSchema = z.object({
  formats: z.array(z.enum(['webp', 'avif', 'jpeg', 'png'])).default(['webp', 'jpeg']).describe("Output formats in priority order"),
  quality: z.object({
    webp: z.number().min(1).max(100).default(85),
    avif: z.number().min(1).max(100).default(80), 
    jpeg: z.number().min(1).max(100).default(90),
    png: z.number().min(1).max(9).default(6) // PNG compression level
  }).describe("Quality settings for each format"),
  breakpoints: z.array(z.number()).default([400, 800, 1200, 1920]).describe("Responsive breakpoints"),
  enableLazyLoading: z.boolean().default(true).describe("Generate lazy loading markup"),
  enableRetina: z.boolean().default(true).describe("Generate 2x images for retina displays")
});

export type ImageConfig = z.infer<typeof ImageConfigSchema>;

/**
 * Caching configuration for performance optimization
 */
export const CacheConfigSchema = z.object({
  enableContentCache: z.boolean().default(true).describe("Cache processed markdown content"),
  enableImageCache: z.boolean().default(true).describe("Cache optimized images"),
  enableSchemaCache: z.boolean().default(true).describe("Cache validated schemas"),
  maxAge: z.number().min(0).default(86400).describe("Cache TTL in seconds (24 hours default)"),
  cacheDir: z.string().default('.agentstatic/cache').describe("Cache directory path")
});

export type CacheConfig = z.infer<typeof CacheConfigSchema>;

/**
 * Performance optimization settings
 */
export const PerformanceConfigSchema = z.object({
  buildTimeout: z.number().min(1000).default(10000).describe("Build timeout in milliseconds"),
  maxConcurrentImages: z.number().min(1).default(4).describe("Maximum concurrent image processing"),
  enableMinification: z.boolean().default(true).describe("Minify HTML/CSS output"),
  enableGzip: z.boolean().default(true).describe("Generate gzipped assets"),
  targetBuildTime: z.number().min(10).default(100).describe("Target build time in milliseconds")
});

export type PerformanceConfig = z.infer<typeof PerformanceConfigSchema>;

/**
 * Complete AgentStatic configuration schema
 */
export const AgentStaticConfigSchema = z.object({
  markdown: MarkdownConfigSchema.default({}),
  images: ImageConfigSchema.default({}), 
  cache: CacheConfigSchema.default({}),
  performance: PerformanceConfigSchema.default({}),
  
  // Site-specific settings
  site: z.object({
    baseUrl: z.string().url().optional().describe("Site base URL for absolute links"),
    contentDir: z.string().default('./content').describe("Content directory path"),
    outputDir: z.string().default('./dist').describe("Build output directory"),
    assetsDir: z.string().default('./assets').describe("Static assets directory")
  }).default({}),
  
  // Development settings
  dev: z.object({
    port: z.number().min(1000).max(65535).default(3000).describe("Development server port"),
    enableHotReload: z.boolean().default(true).describe("Enable hot module reloading"),
    enableTypeChecking: z.boolean().default(true).describe("Enable TypeScript checking in dev"),
    verbose: z.boolean().default(false).describe("Enable verbose logging")
  }).default({})
});

export type AgentStaticConfig = z.infer<typeof AgentStaticConfigSchema>;

/**
 * Default configuration with sensible defaults for all systems
 */
export const defaultConfig: AgentStaticConfig = {
  markdown: {
    enableGFM: true,
    enableFrontmatter: true,
    enableTOC: true,
    tocMaxDepth: 3,
    enableCodeHighlight: true,
    customPlugins: []
  },
  images: {
    formats: ['webp', 'jpeg'],
    quality: {
      webp: 85,
      avif: 80,
      jpeg: 90,
      png: 6
    },
    breakpoints: [400, 800, 1200, 1920],
    enableLazyLoading: true,
    enableRetina: true
  },
  cache: {
    enableContentCache: true,
    enableImageCache: true, 
    enableSchemaCache: true,
    maxAge: 86400,
    cacheDir: '.agentstatic/cache'
  },
  performance: {
    buildTimeout: 10000,
    maxConcurrentImages: 4,
    enableMinification: true,
    enableGzip: true,
    targetBuildTime: 100
  },
  site: {
    contentDir: './content',
    outputDir: './dist',
    assetsDir: './assets'
  },
  dev: {
    port: 3000,
    enableHotReload: true,
    enableTypeChecking: true,
    verbose: false
  }
};

/**
 * Validates and normalizes configuration with defaults
 */
export function createConfig(userConfig: Partial<AgentStaticConfig> = {}): AgentStaticConfig {
  const result = AgentStaticConfigSchema.safeParse({
    ...defaultConfig,
    ...userConfig,
    // Deep merge nested objects
    markdown: { ...defaultConfig.markdown, ...userConfig.markdown },
    images: { ...defaultConfig.images, ...userConfig.images },
    cache: { ...defaultConfig.cache, ...userConfig.cache },
    performance: { ...defaultConfig.performance, ...userConfig.performance },
    site: { ...defaultConfig.site, ...userConfig.site },
    dev: { ...defaultConfig.dev, ...userConfig.dev }
  });

  if (!result.success) {
    throw new Error(`Invalid AgentStatic configuration: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Type-safe configuration access
 */
export class ConfigManager {
  private config: AgentStaticConfig;

  constructor(userConfig: Partial<AgentStaticConfig> = {}) {
    this.config = createConfig(userConfig);
  }

  get markdown(): MarkdownConfig {
    return this.config.markdown;
  }

  get images(): ImageConfig {
    return this.config.images;
  }

  get cache(): CacheConfig {
    return this.config.cache;
  }

  get performance(): PerformanceConfig {
    return this.config.performance;
  }

  get site() {
    return this.config.site;
  }

  get dev() {
    return this.config.dev;
  }

  /**
   * Update configuration at runtime with validation
   */
  update(updates: Partial<AgentStaticConfig>): void {
    this.config = createConfig({ ...this.config, ...updates });
  }

  /**
   * Get complete configuration object
   */
  getConfig(): AgentStaticConfig {
    return { ...this.config };
  }
}

export default ConfigManager;