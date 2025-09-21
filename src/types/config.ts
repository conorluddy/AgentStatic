/**
 * Configuration type definitions for AgentStatic
 *
 * Provides type safety for site configuration and build settings
 */

export interface SiteConfig {
  title?: string;
  description?: string;
  url?: string;
  lang?: string;
  author?: string;
}

export interface BuildConfig {
  minifyHTML?: boolean;
  minifyCSS?: boolean;
  minifyJS?: boolean;
  sourceMaps?: boolean;
  optimizeImages?: boolean;
  useDemoContent?: boolean;
  generateRobotsTxt?: boolean;
  generateSitemap?: boolean;
}

export interface AgentStaticConfig {
  site?: SiteConfig;
  build?: BuildConfig;
  _buildMode?: 'development' | 'production' | 'template';
  [key: string]: unknown;
}

export interface DevServerOptions {
  port: number;
  verbose: boolean;
  host?: string;
  rootDir?: string;
  open?: boolean;
}

export interface HeroData {
  title?: string;
  subtitle?: string;
  ctaButton?: {
    text?: string;
    url?: string;
  };
  secondaryButton?: {
    text?: string;
    url?: string;
  };
}

export interface ContentFile {
  readonly path: string;
  readonly name: string;
  readonly content: string;
  readonly frontmatter?: Record<string, unknown>;
}
