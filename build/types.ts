// ========================================
// GOOGLE FONTS REFERENCE TYPES
// ========================================

export type FontCategory = 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';

export interface GoogleFontEntry {
  family: string;
  category: FontCategory;
  variable: boolean;
  weights: number[];
  styles: ('normal' | 'italic')[];
  tags: {
    style: string[];
    useCase: string[];
    character: string[];
  };
}

export interface GoogleFontsReference {
  fonts: Record<string, GoogleFontEntry>;
  tagDefinitions: {
    style: string[];
    useCase: string[];
    character: string[];
  };
}

// ========================================
// BRAND CONFIGURATION TYPES
// ========================================

export interface FontConfig {
  family: string;
  weights?: number[];
  italic?: boolean;
  fallback?: string;
}

export interface BrandConfig {
  name: string;
  tagline?: string;
  colors: {
    primary: string;
    neutral?: string;
  };
  typography?: {
    fonts?: {
      sans?: string | FontConfig;
      serif?: string | FontConfig;
      mono?: string | FontConfig;
    };
    base?: number;
    scale?: number;
  };
  spacing?: { base?: number };
  layout?: { gutter?: number };
}

// ========================================
// RESOLVED FONT TYPES (INTERNAL)
// ========================================

export interface ResolvedFont {
  family: string;
  weights: number[];
  italic: boolean;
  fallback: string;
  entry: GoogleFontEntry | null;
}

export interface FontStacks {
  sans: string;
  serif: string;
  mono: string;
}
