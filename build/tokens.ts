import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import chroma from 'chroma-js';
import { getFontStacks } from './fonts.js';

interface BrandConfig {
  name: string;
  tagline?: string;
  colors: {
    primary: string;
    neutral?: string;
  };
  typography?: {
    fonts?: { sans?: string; serif?: string; mono?: string };
    base?: number;
    scale?: number;
  };
  spacing?: { base?: number };
  layout?: { gutter?: number };
}

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function generatePalette(baseColor: string): Record<number, string> {
  const base = chroma(baseColor);
  const palette: Record<number, string> = {};

  // Generate shades from light to dark
  const lightEnd = base.brighten(2.5).desaturate(0.5);
  const darkEnd = base.darken(3).saturate(0.2);

  const scale = chroma.scale([lightEnd, base, darkEnd]).mode('lab').colors(11);

  SHADES.forEach((shade, i) => {
    palette[shade] = scale[i];
  });

  return palette;
}

function generateColors(config: BrandConfig): string {
  const primary = generatePalette(config.colors.primary);
  const neutral = generatePalette(config.colors.neutral || '#64748b');

  let css = ':root {\n';

  // Primary colors
  css += '  /* Primary */\n';
  for (const shade of SHADES) {
    css += `  --color-primary-${shade}: ${primary[shade]};\n`;
  }

  css += '\n  /* Neutral */\n';
  for (const shade of SHADES) {
    css += `  --color-neutral-${shade}: ${neutral[shade]};\n`;
  }

  // Semantic colors
  css += `
  /* Semantic */
  --color-bg: var(--color-neutral-50);
  --color-text: var(--color-neutral-900);
  --color-surface: white;
  --color-border: var(--color-neutral-200);
  --color-accent: var(--color-primary-500);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-neutral-950);
    --color-text: var(--color-neutral-50);
    --color-surface: var(--color-neutral-900);
    --color-border: var(--color-neutral-800);
  }
}
`;

  return css;
}

function generateSpacing(config: BrandConfig): string {
  const base = config.spacing?.base || 4;
  const steps = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

  let css = ':root {\n';
  for (const step of steps) {
    const value = (base * step) / 16; // Convert to rem
    css += `  --space-${step}: ${value}rem;\n`;
  }
  css += '}\n';

  return css;
}

function generateTypography(config: BrandConfig, rootDir: string): string {
  const fontStacks = getFontStacks(rootDir);
  const base = config.typography?.base || 16;
  const scale = config.typography?.scale || 1.25;

  // Generate scale: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
  const sizes: Record<string, number> = {
    'xs': base / (scale * scale),
    'sm': base / scale,
    'base': base,
    'lg': base * scale,
    'xl': base * scale * scale,
    '2xl': base * Math.pow(scale, 3),
    '3xl': base * Math.pow(scale, 4),
    '4xl': base * Math.pow(scale, 5),
    '5xl': base * Math.pow(scale, 6),
  };

  let css = ':root {\n';
  css += '  /* Fonts */\n';
  css += `  --font-sans: ${fontStacks.sans};\n`;
  css += `  --font-serif: ${fontStacks.serif};\n`;
  css += `  --font-mono: ${fontStacks.mono};\n`;
  css += '\n  /* Scale */\n';

  for (const [name, px] of Object.entries(sizes)) {
    const rem = (px / 16).toFixed(3).replace(/\.?0+$/, '');
    css += `  --text-${name}: ${rem}rem;\n`;
  }

  css += `
  /* Line Height */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
`;

  return css;
}

function generateLayout(config: BrandConfig): string {
  const gutter = config.layout?.gutter || 16;

  return `/*
 * Breakpoints (for media queries):
 * sm: 640px
 * md: 768px
 * lg: 1024px
 * xl: 1280px
 *
 * Usage: @media (min-width: 768px) { }
 */

:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;

  --gutter: ${gutter / 16}rem;
}
`;
}

export function buildTokens(rootDir: string): void {
  const brandPath = join(rootDir, 'brand.json');
  const tokensDir = join(rootDir, 'tokens');

  const config: BrandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'));

  mkdirSync(tokensDir, { recursive: true });

  writeFileSync(join(tokensDir, 'colors.css'), generateColors(config));
  writeFileSync(join(tokensDir, 'spacing.css'), generateSpacing(config));
  writeFileSync(join(tokensDir, 'typography.css'), generateTypography(config, rootDir));
  writeFileSync(join(tokensDir, 'layout.css'), generateLayout(config));

  console.log('  tokens: generated');
}
