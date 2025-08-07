/**
 * Content Resolution System for AgentStatic
 *
 * Implements a proper fallback chain for finding content, configuration,
 * and assets in the correct priority order.
 */

import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import {
  resolveProjectRoot,
  resolveContentPaths,
  getAgentStaticLibDir,
} from './paths.js';

export interface ContentResolverOptions {
  rootDir?: string;
  verbose?: boolean;
}

export class ContentResolver {
  private rootDir: string;
  private paths: ReturnType<typeof resolveContentPaths>;
  private verbose: boolean;

  constructor(options: ContentResolverOptions = {}) {
    this.rootDir = options.rootDir || resolveProjectRoot();
    this.paths = resolveContentPaths(this.rootDir);
    this.verbose = options.verbose || false;
  }

  /**
   * Find content file with proper fallback chain:
   * 1. Project content directory
   * 2. Template content directory (from AgentStatic)
   * 3. Throw error if not found
   */
  async findContent(relativePath: string): Promise<string> {
    const searchPaths = [
      join(this.paths.contentDir, relativePath), // 1. Project content
      join(this.paths.templateDir, 'content', relativePath), // 2. Template content
    ];

    for (const fullPath of searchPaths) {
      if (existsSync(fullPath)) {
        if (this.verbose) {
          console.log(`📄 Found content: ${fullPath}`);
        }
        return fullPath;
      }
    }

    throw new Error(
      `Content not found: ${relativePath}. Searched in:\n${searchPaths.map(p => `  - ${p}`).join('\n')}`
    );
  }

  /**
   * Find asset file with proper fallback chain:
   * 1. Project assets directory
   * 2. Template assets directory
   * 3. Return null if not found (assets are optional)
   */
  async findAsset(relativePath: string): Promise<string | null> {
    const searchPaths = [
      join(this.paths.assetsDir, relativePath), // 1. Project assets
      join(this.paths.templateDir, 'assets', relativePath), // 2. Template assets
    ];

    for (const fullPath of searchPaths) {
      if (existsSync(fullPath)) {
        if (this.verbose) {
          console.log(`🖼️ Found asset: ${fullPath}`);
        }
        return fullPath;
      }
    }

    return null;
  }

  /**
   * Load configuration with proper override chain:
   * 1. Local project config (site.config.json)
   * 2. Alternative local config (agentstatic.config.json)
   * 3. Template config
   * 4. Default config
   */
  async loadConfig(): Promise<any> {
    const configSearchPaths = [
      join(this.rootDir, 'site.config.json'), // 1. Local project config
      join(this.rootDir, 'agentstatic.config.json'), // 2. Alternative name
      join(this.paths.templateDir, 'site.config.json'), // 3. Template config
    ];

    for (const configPath of configSearchPaths) {
      if (existsSync(configPath)) {
        try {
          const configContent = await readFile(configPath, 'utf8');
          const config = JSON.parse(configContent);

          if (this.verbose) {
            console.log(`✅ Loaded config from: ${configPath}`);
          }

          return config;
        } catch (error) {
          console.warn(`⚠️ Failed to parse config at ${configPath}:`, error);
          continue;
        }
      }
    }

    if (this.verbose) {
      console.log('📋 Using default configuration');
    }

    return this.getDefaultConfig();
  }

  /**
   * Get all content files in a directory with proper fallback
   */
  async getContentFiles(relativePath: string = ''): Promise<string[]> {
    const files: string[] = [];
    const searchPaths = [
      join(this.paths.contentDir, relativePath),
      join(this.paths.templateDir, 'content', relativePath),
    ];

    const { readdir } = await import('fs/promises');

    for (const searchPath of searchPaths) {
      if (existsSync(searchPath)) {
        try {
          const dirFiles = await readdir(searchPath, { withFileTypes: true });

          for (const file of dirFiles) {
            const fullPath = join(searchPath, file.name);

            if (file.isFile() && file.name.endsWith('.md')) {
              files.push(fullPath);
            } else if (file.isDirectory()) {
              // Recursively get files from subdirectories
              const subFiles = await this.getContentFiles(
                join(relativePath, file.name)
              );
              files.push(...subFiles);
            }
          }

          if (this.verbose && dirFiles.length > 0) {
            console.log(`📁 Found ${dirFiles.length} items in: ${searchPath}`);
          }
        } catch (error) {
          // Directory not readable, continue to next search path
          continue;
        }
      }
    }

    return [...new Set(files)]; // Remove duplicates
  }

  /**
   * Check if project has custom content (not just template content)
   */
  hasCustomContent(): boolean {
    return existsSync(this.paths.contentDir);
  }

  /**
   * Check if project has custom assets
   */
  hasCustomAssets(): boolean {
    return existsSync(this.paths.assetsDir);
  }

  /**
   * Get debug information about content resolution
   */
  debugInfo(): void {
    console.log('🔍 ContentResolver Debug Info:');
    console.log(`   Root Dir: ${this.rootDir}`);
    console.log(
      `   Content Dir: ${this.paths.contentDir} (exists: ${existsSync(this.paths.contentDir)})`
    );
    console.log(
      `   Assets Dir: ${this.paths.assetsDir} (exists: ${existsSync(this.paths.assetsDir)})`
    );
    console.log(
      `   Template Dir: ${this.paths.templateDir} (exists: ${existsSync(this.paths.templateDir)})`
    );
    console.log(`   Has Custom Content: ${this.hasCustomContent()}`);
    console.log(`   Has Custom Assets: ${this.hasCustomAssets()}`);
    console.log('');
  }

  /**
   * Default configuration when no config files are found
   */
  private getDefaultConfig(): any {
    return {
      site: {
        title: 'AgentStatic Site',
        description: 'A beautiful static site built with AgentStatic',
        url: 'https://example.com',
        lang: 'en',
      },
      build: {
        outputDir: 'dist',
        optimizeImages: true,
        generateSitemap: true,
        generateRobotsTxt: true,
      },
      content: {
        contentDir: 'content',
        assetsDir: 'assets',
        defaultLayout: 'main',
      },
    };
  }
}
