import { rmSync, cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'chokidar';

import { buildTokens } from './tokens.js';
import { buildCss } from './css.js';
import { buildHtml } from './html.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

function clean(): void {
  const distDir = join(ROOT_DIR, 'dist');
  if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true });
  }
  mkdirSync(distDir, { recursive: true });
  console.log('  clean: done');
}

function copyAssets(): void {
  const assetsDir = join(ROOT_DIR, 'assets');
  const distAssets = join(ROOT_DIR, 'dist', 'assets');

  if (existsSync(assetsDir)) {
    cpSync(assetsDir, distAssets, { recursive: true });
    console.log('  assets: copied');
  }
}

function build(): void {
  console.log('Building...');
  const start = Date.now();

  clean();
  buildTokens(ROOT_DIR);
  buildCss(ROOT_DIR);
  buildHtml(ROOT_DIR);
  copyAssets();

  console.log(`Done in ${Date.now() - start}ms\n`);
}

function watchMode(): void {
  console.log('Watching for changes...\n');

  const watcher = watch([
    join(ROOT_DIR, 'brand.json'),
    join(ROOT_DIR, 'fonts'),
    join(ROOT_DIR, 'pages'),
    join(ROOT_DIR, 'partials'),
    join(ROOT_DIR, 'elements'),
    join(ROOT_DIR, 'utilities'),
    join(ROOT_DIR, 'assets'),
  ], {
    ignoreInitial: true,
    ignored: /node_modules|dist/,
  });

  watcher.on('all', (event, path) => {
    console.log(`[${event}] ${path}`);
    build();
  });
}

// Run
build();

if (process.argv.includes('--watch')) {
  watchMode();
}
