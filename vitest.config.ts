/**
 * Vitest configuration for AgentStatic
 * 
 * Configured for TDD workflow with TypeScript path mapping,
 * coverage requirements, and fast test execution.
 */

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    
    // Global test setup
    globals: true,
    
    // Coverage configuration (>90% required)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      
      // Strict coverage thresholds
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      },
      
      // Include all source files
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/index.ts', // Export-only files
        'tests/**/*'
      ]
    },
    
    // Test file patterns
    include: [
      'tests/**/*.{test,spec}.ts',
      'src/**/*.{test,spec}.ts'
    ],
    
    // Exclude patterns  
    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**'
    ],
    
    // Performance settings
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Watch mode settings (disabled by default for CI)
    watch: false,
    watchExclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**'
    ],
    
    // Reporter configuration
    reporter: ['verbose'],
    
    // Setup files
    setupFiles: ['./tests/helpers/setup.ts']
  },
  
  // Path resolution matching TypeScript configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/core': resolve(__dirname, './src/core'),
      '@/partials': resolve(__dirname, './src/partials'),
      '@/helpers': resolve(__dirname, './src/helpers'),
      '@/types': resolve(__dirname, './src/types'),
      '@/mcp': resolve(__dirname, './src/mcp'),
      '@/cli': resolve(__dirname, './src/cli'),
      '@/tests': resolve(__dirname, './tests')
    }
  },
  
  // ESM support
  esbuild: {
    target: 'node20'
  }
});