import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

function readCssFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir, { withFileTypes: true });
  const cssContents: string[] = [];

  for (const file of files) {
    const fullPath = join(dir, file.name);

    if (file.isDirectory()) {
      // Look for styles.css in subdirectories (elements)
      const stylesPath = join(fullPath, 'styles.css');
      if (existsSync(stylesPath)) {
        cssContents.push(`/* ${file.name} */\n${readFileSync(stylesPath, 'utf-8')}`);
      }
    } else if (file.name.endsWith('.css')) {
      cssContents.push(`/* ${file.name} */\n${readFileSync(fullPath, 'utf-8')}`);
    }
  }

  return cssContents;
}

export function buildCss(rootDir: string): void {
  const distDir = join(rootDir, 'dist');
  mkdirSync(distDir, { recursive: true });

  const parts: string[] = [];

  // 1. Tokens (design system foundation)
  parts.push('/* ========== TOKENS ========== */');
  parts.push(...readCssFiles(join(rootDir, 'tokens')));

  // 2. Utilities (helper classes)
  parts.push('\n/* ========== UTILITIES ========== */');
  parts.push(...readCssFiles(join(rootDir, 'utilities')));

  // 3. Elements (component styles)
  parts.push('\n/* ========== ELEMENTS ========== */');
  parts.push(...readCssFiles(join(rootDir, 'elements')));

  const output = parts.join('\n\n');
  writeFileSync(join(distDir, 'styles.css'), output);

  console.log('  css: concatenated');
}
