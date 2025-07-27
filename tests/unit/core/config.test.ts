/**
 * Tests for AgentStatic configuration system
 * 
 * Validates centralized configuration with Zod schemas,
 * default values, and type safety.
 */

import { describe, it, expect } from 'vitest';
import { 
  AgentStaticConfigSchema,
  defaultConfig,
  createConfig,
  ConfigManager,
  MarkdownConfigSchema,
  ImageConfigSchema,
  CacheConfigSchema,
  PerformanceConfigSchema
} from '@/core/config.js';

describe('AgentStatic Configuration', () => {
  describe('Schema Validation', () => {
    it('should validate complete default configuration', () => {
      const result = AgentStaticConfigSchema.safeParse(defaultConfig);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.markdown.enableGFM).toBe(true);
        expect(result.data.images.formats).toEqual(['webp', 'jpeg']);
        expect(result.data.cache.enableContentCache).toBe(true);
        expect(result.data.performance.targetBuildTime).toBe(100);
      }
    });

    it('should validate markdown configuration schema', () => {
      const validMarkdown = {
        enableGFM: true,
        enableFrontmatter: true,
        enableTOC: false,
        tocMaxDepth: 2,
        enableCodeHighlight: true,
        customPlugins: []
      };

      const result = MarkdownConfigSchema.safeParse(validMarkdown);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.enableTOC).toBe(false);
        expect(result.data.tocMaxDepth).toBe(2);
      }
    });

    it('should validate image configuration schema', () => {
      const validImage = {
        formats: ['webp', 'avif', 'jpeg'],
        quality: {
          webp: 90,
          avif: 85,
          jpeg: 95,
          png: 9
        },
        breakpoints: [320, 768, 1024, 1440],
        enableLazyLoading: true,
        enableRetina: true
      };

      const result = ImageConfigSchema.safeParse(validImage);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.formats).toContain('avif');
        expect(result.data.quality.webp).toBe(90);
        expect(result.data.breakpoints).toHaveLength(4);
      }
    });

    it('should reject invalid configuration values', () => {
      const invalidConfig = {
        markdown: {
          tocMaxDepth: 10 // Should be max 6
        },
        images: {
          quality: {
            webp: 150 // Should be max 100
          }
        },
        performance: {
          targetBuildTime: 5 // Should be min 10
        }
      };

      const result = AgentStaticConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);

      if (!result.success) {
        const errors = result.error.errors;
        expect(errors.some(e => e.path.includes('tocMaxDepth'))).toBe(true);
        expect(errors.some(e => e.path.includes('webp'))).toBe(true);
        expect(errors.some(e => e.path.includes('targetBuildTime'))).toBe(true);
      }
    });
  });

  describe('Configuration Creation', () => {
    it('should create configuration with defaults', () => {
      const config = createConfig();
      
      expect(config.markdown.enableGFM).toBe(true);
      expect(config.images.formats).toEqual(['webp', 'jpeg']);
      expect(config.cache.maxAge).toBe(86400);
      expect(config.dev.port).toBe(3000);
    });

    it('should merge user configuration with defaults', () => {
      const userConfig = {
        markdown: {
          enableGFM: false,
          tocMaxDepth: 4
        },
        images: {
          quality: {
            webp: 95
          }
        },
        dev: {
          port: 4000
        }
      };

      const config = createConfig(userConfig);

      // User overrides should be applied
      expect(config.markdown.enableGFM).toBe(false);
      expect(config.markdown.tocMaxDepth).toBe(4);
      expect(config.images.quality.webp).toBe(95);
      expect(config.dev.port).toBe(4000);

      // Defaults should remain for non-overridden values
      expect(config.markdown.enableFrontmatter).toBe(true);
      expect(config.images.quality.jpeg).toBe(90);
      expect(config.cache.enableContentCache).toBe(true);
    });

    it('should throw error for invalid configuration', () => {
      const invalidConfig = {
        performance: {
          targetBuildTime: -10 // Invalid negative value
        }
      };

      expect(() => createConfig(invalidConfig)).toThrow('Invalid AgentStatic configuration');
    });
  });

  describe('ConfigManager Class', () => {
    it('should initialize with default configuration', () => {
      const manager = new ConfigManager();

      expect(manager.markdown.enableGFM).toBe(true);
      expect(manager.images.formats).toEqual(['webp', 'jpeg']);
      expect(manager.cache.enableContentCache).toBe(true);
    });

    it('should initialize with user configuration', () => {
      const userConfig = {
        markdown: { enableGFM: false },
        dev: { port: 5000 }
      };

      const manager = new ConfigManager(userConfig);

      expect(manager.markdown.enableGFM).toBe(false);
      expect(manager.dev.port).toBe(5000);
      expect(manager.cache.enableContentCache).toBe(true); // Default preserved
    });

    it('should provide typed access to configuration sections', () => {
      const manager = new ConfigManager();

      // TypeScript should provide proper typing
      const markdownConfig = manager.markdown;
      expect(typeof markdownConfig.enableGFM).toBe('boolean');
      expect(typeof markdownConfig.tocMaxDepth).toBe('number');

      const imageConfig = manager.images;
      expect(Array.isArray(imageConfig.formats)).toBe(true);
      expect(typeof imageConfig.quality.webp).toBe('number');

      const cacheConfig = manager.cache;
      expect(typeof cacheConfig.maxAge).toBe('number');
      expect(typeof cacheConfig.cacheDir).toBe('string');
    });

    it('should update configuration at runtime', () => {
      const manager = new ConfigManager();
      
      expect(manager.dev.port).toBe(3000);

      manager.update({
        dev: { port: 8080 },
        cache: { maxAge: 3600 }
      });

      expect(manager.dev.port).toBe(8080);
      expect(manager.cache.maxAge).toBe(3600);
      expect(manager.markdown.enableGFM).toBe(true); // Other values preserved
    });

    it('should validate updates and throw on invalid values', () => {
      const manager = new ConfigManager();

      expect(() => {
        manager.update({
          performance: {
            targetBuildTime: -1 // Invalid value
          }
        });
      }).toThrow('Invalid AgentStatic configuration');
    });

    it('should return complete configuration object', () => {
      const manager = new ConfigManager({
        dev: { port: 7000 }
      });

      const config = manager.getConfig();

      expect(config.dev.port).toBe(7000);
      expect(config.markdown.enableGFM).toBe(true);
      expect(typeof config).toBe('object');
      
      // Should be a copy, not reference
      config.dev.port = 9000;
      expect(manager.dev.port).toBe(7000);
    });
  });

  describe('Configuration Defaults', () => {
    it('should have sensible markdown defaults', () => {
      const config = createConfig();

      expect(config.markdown.enableGFM).toBe(true);
      expect(config.markdown.enableFrontmatter).toBe(true);
      expect(config.markdown.enableTOC).toBe(true);
      expect(config.markdown.tocMaxDepth).toBe(3);
      expect(config.markdown.enableCodeHighlight).toBe(true);
      expect(Array.isArray(config.markdown.customPlugins)).toBe(true);
    });

    it('should have portfolio-optimized image defaults', () => {
      const config = createConfig();

      expect(config.images.formats).toEqual(['webp', 'jpeg']);
      expect(config.images.quality.webp).toBe(85);
      expect(config.images.quality.jpeg).toBe(90);
      expect(config.images.breakpoints).toEqual([400, 800, 1200, 1920]);
      expect(config.images.enableLazyLoading).toBe(true);
      expect(config.images.enableRetina).toBe(true);
    });

    it('should have performance-focused cache defaults', () => {
      const config = createConfig();

      expect(config.cache.enableContentCache).toBe(true);
      expect(config.cache.enableImageCache).toBe(true);
      expect(config.cache.enableSchemaCache).toBe(true);
      expect(config.cache.maxAge).toBe(86400); // 24 hours
      expect(config.cache.cacheDir).toBe('.agentstatic/cache');
    });

    it('should have sub-100ms performance defaults', () => {
      const config = createConfig();

      expect(config.performance.targetBuildTime).toBe(100);
      expect(config.performance.buildTimeout).toBe(10000);
      expect(config.performance.maxConcurrentImages).toBe(4);
      expect(config.performance.enableMinification).toBe(true);
      expect(config.performance.enableGzip).toBe(true);
    });
  });
});