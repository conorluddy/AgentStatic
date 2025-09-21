/**
 * Content Resolution Utilities for AgentStatic
 *
 * Handles loading and resolving content files, configurations,
 * and assets with proper fallback mechanisms.
 */

import { join } from 'path';
import { readFile, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { resolveContentPaths, type ResolvedPaths } from './paths.js';
import type { AgentStaticConfig } from '../types/config.js';

/**
 * Content resolver configuration
 */
export interface ContentResolverOptions {
  rootDir: string;
  verbose?: boolean;
}

/**
 * Content resolver class
 */
export class ContentResolver {
  private paths: ResolvedPaths;
  private verbose: boolean;

  constructor(options: ContentResolverOptions) {
    this.paths = resolveContentPaths(options.rootDir);
    this.verbose = options.verbose || false;
  }

  /**
   * Load site configuration with fallback
   */
  async loadConfig(): Promise<AgentStaticConfig> {
    const configSources = [
      this.paths.configPath,
      join(this.paths.templateDir, 'site.config.json'),
    ];

    for (const configPath of configSources) {
      if (existsSync(configPath)) {
        try {
          const configContent = await readFile(configPath, 'utf8');
          const config = JSON.parse(configContent);

          if (this.verbose) {
            console.log(`✅ Loaded config from: ${configPath}`);
          }

          return config;
        } catch (error) {
          console.warn(`⚠️ Failed to load config from ${configPath}:`, error);
        }
      }
    }

    // Return default configuration
    const defaultConfig = {
      site: {
        title: 'AgentStatic Site',
        description: 'Built with AgentStatic',
        url: 'https://example.com',
        lang: 'en',
      },
      build: {
        outputDir: 'dist',
        generateSitemap: true,
        generateRobotsTxt: true,
      },
    };

    if (this.verbose) {
      console.log('⚠️ Using default configuration');
    }

    return defaultConfig;
  }

  /**
   * Get all content files with metadata
   */
  async getContentFiles(): Promise<string[]> {
    const contentSources = [
      this.paths.contentDir,
      join(this.paths.templateDir, 'content'),
    ];

    for (const contentDir of contentSources) {
      if (existsSync(contentDir)) {
        try {
          const files = await this.discoverContentFiles(contentDir);

          if (this.verbose) {
            console.log(
              `📄 Found ${files.length} content files in: ${contentDir}`
            );
          }

          return files;
        } catch (error) {
          console.warn(`⚠️ Failed to read content from ${contentDir}:`, error);
        }
      }
    }

    return [];
  }

  /**
   * Recursively discover content files
   */
  private async discoverContentFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await readdir(dir);

      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
          // Recursively search subdirectories
          const subFiles = await this.discoverContentFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      if (this.verbose) {
        console.warn(`⚠️ Error reading directory ${dir}:`, error);
      }
    }

    return files;
  }

  /**
   * Check if project has custom assets
   */
  hasCustomAssets(): boolean {
    return existsSync(this.paths.assetsDir);
  }

  /**
   * Get paths configuration
   */
  getPaths(): ResolvedPaths {
    return this.paths;
  }

  /**
   * Debug information
   */
  debugInfo(): void {
    console.log('🔍 ContentResolver Debug:');
    console.log(
      `   Content dir: ${this.paths.contentDir} (exists: ${existsSync(this.paths.contentDir)})`
    );
    console.log(
      `   Template dir: ${this.paths.templateDir} (exists: ${existsSync(this.paths.templateDir)})`
    );
    console.log(
      `   Assets dir: ${this.paths.assetsDir} (exists: ${existsSync(this.paths.assetsDir)})`
    );
    console.log(
      `   Config path: ${this.paths.configPath} (exists: ${existsSync(this.paths.configPath)})`
    );
  }

  /**
   * Load specific content file
   */
  async loadContentFile(filePath: string): Promise<{
    content: string;
    stats: {
      size: number;
      mtime: Date;
    };
  }> {
    const content = await readFile(filePath, 'utf8');
    const stats = await stat(filePath);

    return {
      content,
      stats: {
        size: stats.size,
        mtime: stats.mtime,
      },
    };
  }
}
