#!/usr/bin/env node

/**
 * AgentStatic CLI Launcher
 *
 * Uses tsx to run TypeScript files directly without compilation
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'src', 'cli', 'index.ts');

// Run the TypeScript CLI with tsx
const child = spawn('npx', ['tsx', cliPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', code => {
  process.exit(code || 0);
});
