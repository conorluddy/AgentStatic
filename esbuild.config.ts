/**
 * ESBuild configuration for AgentStatic
 * 
 * Optimized for sub-100ms development builds with TypeScript,
 * path mapping, and ES modules support.
 */

import { build, BuildOptions, context } from 'esbuild';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Path aliases for AgentStatic architecture
const alias: Record<string, string> = {
  '@': resolve('./src'),
  '@/core': resolve('./src/core'),
  '@/partials': resolve('./src/partials'),
  '@/helpers': resolve('./src/helpers'),
  '@/types': resolve('./src/types'),
  '@/mcp': resolve('./src/mcp'),
  '@/cli': resolve('./src/cli'),
  '@/tests': resolve('./tests')
};

// Base ESBuild configuration
const baseConfig: BuildOptions = {
  // Entry points
  entryPoints: [
    'src/index.ts',
    'src/core/index.ts', 
    'src/partials/index.ts'
  ],
  
  // Output configuration
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  
  // TypeScript and module resolution
  alias,
  external: [
    // Keep Node.js built-ins external
    'fs', 'path', 'url', 'util', 'stream', 'events',
    // Keep heavy dependencies external in development
    'sharp', '@modelcontextprotocol/sdk'
  ],
  
  // Development optimizations
  sourcemap: 'inline',
  metafile: true,
  
  // Performance settings
  splitting: true,
  treeShaking: true,
  minify: false, // Faster development builds
  
  // TypeScript loader
  loader: {
    '.ts': 'ts'
  },
  
  // Path resolution
  resolveExtensions: ['.ts', '.js', '.json'],
  
  // Banner for ES modules
  banner: {
    js: '// AgentStatic - Built with ESBuild'
  }
};

// Development build configuration
export const devConfig: BuildOptions = {
  ...baseConfig,
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  // Watch mode for development
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error('❌ Build failed:', error);
      } else {
        console.log('✅ Build completed in', result?.metafile ? 
          `${Math.round((result.metafile.buildTime || 0))}ms` : 
          'unknown time'
        );
      }
    }
  }
};

// Production build configuration  
export const prodConfig: BuildOptions = {
  ...baseConfig,
  minify: true,
  sourcemap: 'external',
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  // Remove development-only code
  banner: {
    js: '// AgentStatic - Production Build'
  }
};

// Build function for development
export async function buildDev() {
  console.log('🚀 Starting AgentStatic development build...');
  
  try {
    const ctx = await context(devConfig);
    await ctx.watch();
    console.log('👀 Watching for changes...');
    
    // Keep the process alive
    process.on('SIGINT', async () => {
      console.log('\n🛑 Stopping build watch...');
      await ctx.dispose();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Development build failed:', error);
    process.exit(1);
  }
}

// Build function for production
export async function buildProd() {
  console.log('🏗️ Starting AgentStatic production build...');
  
  try {
    const startTime = Date.now();
    const result = await build(prodConfig);
    const buildTime = Date.now() - startTime;
    
    console.log(`✅ Production build completed in ${buildTime}ms`);
    
    if (result.metafile) {
      // Log bundle analysis
      const totalSize = Object.values(result.metafile.outputs)
        .reduce((sum, output) => sum + output.bytes, 0);
      console.log(`📦 Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
    }
    
  } catch (error) {
    console.error('❌ Production build failed:', error);
    process.exit(1);
  }
}

// Run based on command line arguments
if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = process.argv[2] || 'dev';
  
  if (mode === 'prod' || mode === 'production') {
    buildProd();
  } else {
    buildDev();
  }
}