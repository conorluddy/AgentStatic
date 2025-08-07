/**
 * Path Resolution Utilities for AgentStatic
 *
 * Provides robust path resolution that works correctly in both:
 * - Main AgentStatic development
 * - Template repositories created from AgentStatic
 */

import { dirname, join, resolve } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

/**
 * Resolves the project root directory by walking up the directory tree
 * to find package.json. This works correctly whether in AgentStatic itself
 * or a template repository.
 */
export function resolveProjectRoot(startPath?: string): string {
  let dir = startPath || process.cwd();

  // Check if current directory has package.json
  if (existsSync(join(dir, 'package.json'))) {
    return dir;
  }

  // Walk up directory tree to find package.json
  while (dir !== '/' && dir !== dirname(dir)) {
    const parentDir = dirname(dir);
    if (existsSync(join(parentDir, 'package.json'))) {
      return parentDir;
    }
    dir = parentDir;
  }

  // Fallback to current working directory
  return process.cwd();
}

/**
 * Gets the AgentStatic library directory (where the actual AgentStatic code lives)
 * This is different from project root when using AgentStatic as a dependency
 */
export function getAgentStaticLibDir(): string {
  // When running from AgentStatic development
  const devPath = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  if (existsSync(join(devPath, 'src/core/index.ts'))) {
    return devPath;
  }

  // When installed as npm package (future implementation)
  // This would resolve to node_modules/@agentstatic/core or similar
  const npmPath = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  return npmPath;
}

/**
 * Resolves paths for content, assets, and configuration with proper fallback chain
 */
export function resolveContentPaths(rootDir: string): {
  contentDir: string;
  assetsDir: string;
  templateDir: string;
  outputDir: string;
} {
  const agentStaticLibDir = getAgentStaticLibDir();

  return {
    contentDir: join(rootDir, 'content'),
    assetsDir: join(rootDir, 'assets'),
    templateDir: join(agentStaticLibDir, 'template'),
    outputDir: join(rootDir, 'dist'),
  };
}

/**
 * Mode detection based on project characteristics
 */
export function detectProjectMode(): 'development' | 'production' | 'template' {
  if (process.env['AGENTSTATIC_MODE']) {
    return process.env['AGENTSTATIC_MODE'] as
      | 'development'
      | 'production'
      | 'template';
  }

  if (process.env['NODE_ENV'] === 'development') {
    return 'development';
  }

  const rootDir = resolveProjectRoot();

  // Template mode: Git repo exists but no node_modules or it's a fresh template
  if (
    existsSync(join(rootDir, '.git')) &&
    !existsSync(join(rootDir, 'node_modules'))
  ) {
    return 'template';
  }

  // Development mode: AgentStatic source code present
  if (existsSync(join(rootDir, 'src/core/index.ts'))) {
    return 'development';
  }

  return 'production';
}

/**
 * Debug utility to print path resolution information
 */
export function debugPaths(rootDir?: string): void {
  const projectRoot = rootDir || resolveProjectRoot();
  const libDir = getAgentStaticLibDir();
  const paths = resolveContentPaths(projectRoot);
  const mode = detectProjectMode();

  console.log('🔍 AgentStatic Path Resolution Debug:');
  console.log(`   Project Root: ${projectRoot}`);
  console.log(`   Library Dir: ${libDir}`);
  console.log(`   Content Dir: ${paths.contentDir}`);
  console.log(`   Assets Dir: ${paths.assetsDir}`);
  console.log(`   Template Dir: ${paths.templateDir}`);
  console.log(`   Output Dir: ${paths.outputDir}`);
  console.log(`   Mode: ${mode}`);
  console.log('');
}
