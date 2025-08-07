#!/usr/bin/env node

/**
 * AgentStatic Unified Build Script
 *
 * This script works correctly in both AgentStatic development and template repositories.
 * It uses the new path resolution system to find content and configuration properly.
 */

import { BuildSystem } from '../dist/index.js';

const mode = process.env.NODE_ENV || 'production';
const outputDir = process.env.OUTPUT_DIR;
const verbose =
  process.env.VERBOSE === 'true' || process.argv.includes('--verbose');

async function build() {
  try {
    const builder = new BuildSystem({
      mode: mode,
      outputDir,
      verbose,
    });

    await builder.build();

    console.log('🎉 Build completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build if this script is executed directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  build();
}
