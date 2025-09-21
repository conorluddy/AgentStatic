/**
 * Path resolution utilities for AgentStatic
 *
 * Handles different project modes (development, template, production)
 * and provides consistent path resolution across the system.
 */

import { join, resolve, dirname } from 'path';
import { existsSync } from 'fs';

/**
 * Project mode detection
 */
export type ProjectMode = 'development' | 'production' | 'template';

/**
 * Resolved path configuration
 */
export interface ResolvedPaths {
  rootDir: string;
  contentDir: string;
  assetsDir: string;
  outputDir: string;
  templateDir: string;
  configPath: string;
}

/**
 * Detect project mode based on environment and file structure
 */
export function detectProjectMode(): ProjectMode {
  // Check if we're in AgentStatic development
  if (process.env['NODE_ENV'] === 'development') {
    return 'development';
  }

  // Check if we're in a template repository
  if (existsSync('.agentstatic-initialized')) {
    return 'template';
  }

  return 'production';
}

/**
 * Resolve project root directory
 */
export function resolveProjectRoot(startDir?: string): string {
  const searchDir = startDir || process.cwd();

  // Look for package.json or .git to identify project root
  let currentDir = resolve(searchDir);

  while (currentDir !== dirname(currentDir)) {
    if (
      existsSync(join(currentDir, 'package.json')) ||
      existsSync(join(currentDir, '.git'))
    ) {
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  // Fallback to current directory
  return resolve(searchDir);
}

/**
 * Resolve all content-related paths for a project
 */
export function resolveContentPaths(rootDir: string): ResolvedPaths {
  const mode = detectProjectMode();

  // Base paths
  const contentDir = join(rootDir, 'content');
  const assetsDir = join(rootDir, 'assets');
  const outputDir = join(rootDir, mode === 'template' ? 'pages-dist' : 'dist');
  const configPath = join(rootDir, 'site.config.json');

  // Template directory (for fallback content)
  let templateDir = '';

  if (mode === 'development') {
    // In AgentStatic development, template is in the same repo
    templateDir = join(rootDir, 'template');
  } else {
    // In template repositories, try to find AgentStatic template
    const nodeModulesTemplate = join(
      rootDir,
      'node_modules/agentstatic/template'
    );
    if (existsSync(nodeModulesTemplate)) {
      templateDir = nodeModulesTemplate;
    }
  }

  return {
    rootDir,
    contentDir,
    assetsDir,
    outputDir,
    templateDir,
    configPath,
  };
}

/**
 * Debug path resolution for troubleshooting
 */
export function debugPaths(rootDir: string): void {
  const paths = resolveContentPaths(rootDir);
  const mode = detectProjectMode();

  console.log('🔍 Path Resolution Debug:');
  console.log(`   Mode: ${mode}`);
  console.log(`   Root: ${paths.rootDir}`);
  console.log(
    `   Content: ${paths.contentDir} (exists: ${existsSync(paths.contentDir)})`
  );
  console.log(
    `   Assets: ${paths.assetsDir} (exists: ${existsSync(paths.assetsDir)})`
  );
  console.log(`   Output: ${paths.outputDir}`);
  console.log(
    `   Template: ${paths.templateDir} (exists: ${existsSync(paths.templateDir)})`
  );
  console.log(
    `   Config: ${paths.configPath} (exists: ${existsSync(paths.configPath)})`
  );
}

/**
 * Validate that required paths exist
 */
export function validateProjectStructure(rootDir: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const paths = resolveContentPaths(rootDir);
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for package.json
  if (!existsSync(join(rootDir, 'package.json'))) {
    errors.push('package.json not found in project root');
  }

  // Check for content directory
  if (!existsSync(paths.contentDir)) {
    warnings.push(`Content directory not found: ${paths.contentDir}`);
  }

  // Check for config file
  if (!existsSync(paths.configPath)) {
    warnings.push(`Configuration file not found: ${paths.configPath}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Get URL path from file path
 */
export function getUrlPath(filePath: string, contentDir: string): string {
  const relativePath = filePath.replace(contentDir, '').replace(/^\//, '');

  // Remove .md extension and convert to URL path
  const urlPath = relativePath
    .replace(/\.md$/, '')
    .replace(/\/index$/, '/')
    .replace(/\\/g, '/'); // Normalize Windows paths

  return urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
}

/**
 * Ensure directory exists, create if needed
 */
export async function ensureDir(dirPath: string): Promise<void> {
  const { mkdir } = await import('fs/promises');

  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}
