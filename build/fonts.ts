import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type {
  BrandConfig,
  FontConfig,
  GoogleFontsReference,
  GoogleFontEntry,
  ResolvedFont,
  FontStacks,
} from './types.js';

// ========================================
// DEFAULT FALLBACKS
// ========================================

const DEFAULT_FALLBACKS: Record<'sans' | 'serif' | 'mono', string> = {
  sans: 'system-ui, sans-serif',
  serif: 'Georgia, serif',
  mono: 'monospace',
};

const DEFAULT_WEIGHTS: Record<'sans' | 'serif' | 'mono', number[]> = {
  sans: [400, 700],
  serif: [400, 700],
  mono: [400],
};

// ========================================
// PUBLIC API
// ========================================

export function buildFontLinks(rootDir: string): string {
  const brandPath = join(rootDir, 'brand.json');
  const fontsRefPath = join(rootDir, 'fonts', 'google-fonts.json');

  if (!existsSync(fontsRefPath)) return '';

  const brand: BrandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'));
  const reference: GoogleFontsReference = JSON.parse(readFileSync(fontsRefPath, 'utf-8'));

  const fonts = brand.typography?.fonts;
  if (!fonts) return '';

  const resolved = resolveAllFonts(fonts, reference);
  if (resolved.length === 0) return '';

  const url = generateGoogleFontsUrl(resolved);
  if (!url) return '';

  return [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `<link href="${url}" rel="stylesheet">`,
  ].join('\n  ');
}

export function getFontStacks(rootDir: string): FontStacks {
  const brandPath = join(rootDir, 'brand.json');
  const fontsRefPath = join(rootDir, 'fonts', 'google-fonts.json');

  const brand: BrandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'));
  const fonts = brand.typography?.fonts || {};

  if (!existsSync(fontsRefPath)) {
    return {
      sans: extractFontStack(fonts.sans, 'sans', null),
      serif: extractFontStack(fonts.serif, 'serif', null),
      mono: extractFontStack(fonts.mono, 'mono', null),
    };
  }

  const reference: GoogleFontsReference = JSON.parse(readFileSync(fontsRefPath, 'utf-8'));

  return {
    sans: extractFontStack(fonts.sans, 'sans', reference),
    serif: extractFontStack(fonts.serif, 'serif', reference),
    mono: extractFontStack(fonts.mono, 'mono', reference),
  };
}

// ========================================
// FONT RESOLUTION
// ========================================

function resolveAllFonts(
  fonts: NonNullable<BrandConfig['typography']>['fonts'],
  reference: GoogleFontsReference
): ResolvedFont[] {
  if (!fonts) return [];

  const resolved: ResolvedFont[] = [];

  const sans = resolveFont(fonts.sans, 'sans', reference);
  const serif = resolveFont(fonts.serif, 'serif', reference);
  const mono = resolveFont(fonts.mono, 'mono', reference);

  if (sans?.entry) resolved.push(sans);
  if (serif?.entry) resolved.push(serif);
  if (mono?.entry) resolved.push(mono);

  return resolved;
}

function resolveFont(
  config: string | FontConfig | undefined,
  usage: 'sans' | 'serif' | 'mono',
  reference: GoogleFontsReference
): ResolvedFont | null {
  if (!config) return null;

  const isString = typeof config === 'string';
  const family = isString ? config : config.family;
  const entry = reference.fonts[family] || null;
  const weights = isString ? DEFAULT_WEIGHTS[usage] : (config.weights || DEFAULT_WEIGHTS[usage]);
  const italic = isString ? false : (config.italic || false);
  const fallback = isString ? DEFAULT_FALLBACKS[usage] : (config.fallback || DEFAULT_FALLBACKS[usage]);

  return { family, weights, italic, fallback, entry };
}

// ========================================
// GOOGLE FONTS URL GENERATION
// ========================================

function generateGoogleFontsUrl(fonts: ResolvedFont[]): string | null {
  const validFonts = fonts.filter((f) => f.entry !== null);
  if (validFonts.length === 0) return null;

  const families = validFonts.map(formatFontFamily);
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

function formatFontFamily(font: ResolvedFont): string {
  const { family, weights, italic, entry } = font;
  if (!entry) return '';

  const encodedFamily = encodeURIComponent(family);

  if (entry.variable) {
    return formatVariableFont(encodedFamily, weights, italic, entry);
  }
  return formatStaticFont(encodedFamily, weights, italic, entry);
}

function formatVariableFont(
  encodedFamily: string,
  weights: number[],
  italic: boolean,
  entry: GoogleFontEntry
): string {
  const availableWeights = weights.filter((w) => entry.weights.includes(w));
  if (availableWeights.length === 0) return `family=${encodedFamily}`;

  const min = Math.min(...availableWeights);
  const max = Math.max(...availableWeights);
  const weightSpec = min === max ? String(min) : `${min}..${max}`;

  const hasItalic = italic && entry.styles.includes('italic');
  if (hasItalic) {
    return `family=${encodedFamily}:ital,wght@0,${weightSpec};1,${weightSpec}`;
  }
  return `family=${encodedFamily}:wght@${weightSpec}`;
}

function formatStaticFont(
  encodedFamily: string,
  weights: number[],
  italic: boolean,
  entry: GoogleFontEntry
): string {
  const availableWeights = weights.filter((w) => entry.weights.includes(w));
  if (availableWeights.length === 0) return `family=${encodedFamily}`;

  const hasItalic = italic && entry.styles.includes('italic');
  const specs: string[] = [];

  for (const weight of availableWeights) {
    specs.push(`0,${weight}`);
    if (hasItalic) {
      specs.push(`1,${weight}`);
    }
  }

  return `family=${encodedFamily}:ital,wght@${specs.join(';')}`;
}

// ========================================
// FONT STACK HELPERS
// ========================================

function extractFontStack(
  config: string | FontConfig | undefined,
  usage: 'sans' | 'serif' | 'mono',
  reference: GoogleFontsReference | null
): string {
  if (!config) return DEFAULT_FALLBACKS[usage];

  const isString = typeof config === 'string';
  const family = isString ? config : config.family;
  const fallback = isString ? DEFAULT_FALLBACKS[usage] : (config.fallback || DEFAULT_FALLBACKS[usage]);

  const isInReference = reference?.fonts[family] != null;

  if (isInReference) {
    return `"${family}", ${fallback}`;
  }

  // Not in reference - assume it's already a font stack or custom font
  return isString ? config : `"${family}", ${fallback}`;
}
