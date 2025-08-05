/**
 * Core AgentPartial interface and types
 *
 * Defines the revolutionary TypeScript-first templating system with
 * Zod schema validation for AI-readable, type-safe partials.
 */

import { z } from 'zod';

/**
 * Template helper functions available within partial templates
 */
export interface TemplateHelpers {
  // Date utilities (date-fns)
  formatDate: (date: Date, format?: string) => string;
  timeAgo: (date: Date) => string;

  // Content utilities
  truncate: (text: string, length: number) => string;
  slugify: (text: string) => string;
  markdown: (content: string) => string;

  // Asset utilities (Sharp integration)
  optimizeImage: (src: string, options?: ImageOptimizeOptions) => string;
  generateSrcSet: (src: string) => string;

  // Lodash-es utilities (tree-shakable)
  chunk: <T>(array: T[], size: number) => T[][];
  groupBy: <T>(
    array: T[],
    predicate: string | ((item: T) => unknown)
  ) => Record<string, T[]>;
  sortBy: <T>(array: T[], predicate: string | ((item: T) => unknown)) => T[];

  // URL and navigation
  url: (path: string) => string;
  isActive: (path: string) => boolean;

  // Partial composition
  renderPartial: <T>(name: string, props: T) => string;
  conditionalClass: (condition: boolean, className: string) => string;
}

/**
 * Image optimization options for Sharp integration
 */
export interface ImageOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Responsive configuration for partials
 */
export interface ResponsiveConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  behavior: 'hide' | 'stack' | 'resize' | 'scroll';
}

/**
 * Partial category for organization and AI understanding
 */
export type PartialCategory =
  | 'layout'
  | 'content'
  | 'media'
  | 'navigation'
  | 'interactive'
  | 'utility';

/**
 * Usage example for AI and developer understanding
 */
export interface PartialUsageExample<TProps> {
  description: string;
  props: TProps;
  notes?: string;
}

/**
 * Rich metadata for AI understanding and developer experience
 */
export interface PartialMetadata<TProps> {
  description: string;
  category: PartialCategory;
  keywords: string[];
  usageExamples: PartialUsageExample<TProps>[];
  version?: string;
  author?: string;
  dependencies?: string[];
  compatibility?: {
    browsers?: string[];
    devices?: string[];
  };
}

/**
 * Core AgentPartial interface
 *
 * Every partial in AgentStatic implements this interface, providing
 * a complete, self-contained template component with:
 * - Zod schema for type safety and AI understanding
 * - TypeScript template function
 * - Scoped CSS styles
 * - Optional client-side behavior
 * - Rich metadata for composition
 */
export interface AgentPartial<TProps> {
  /**
   * Zod schema defining the data contract for this partial.
   * Provides both compile-time and runtime validation while
   * enabling AI agents to understand data requirements.
   */
  schema: z.ZodSchema<TProps>;

  /**
   * TypeScript template function that renders the partial.
   * Receives validated props and template helpers.
   */
  template: (props: TProps, helpers: TemplateHelpers) => string;

  /**
   * Scoped CSS styles automatically namespaced to prevent conflicts.
   * Uses CSS custom properties for theming support.
   */
  styles: string;

  /**
   * Optional client-side JavaScript for progressive enhancement.
   * Should gracefully degrade when JavaScript is disabled.
   */
  script?: string;

  /**
   * Dependencies on other partials that this partial requires.
   * Used for automatic dependency resolution during composition.
   */
  dependencies?: string[];

  /**
   * Responsive behavior configuration for different screen sizes.
   */
  responsive?: ResponsiveConfig;

  /**
   * Rich metadata enabling AI understanding and developer tooling.
   */
  metadata: PartialMetadata<TProps>;
}

/**
 * Registry of all available partials in the system
 */
export interface PartialRegistry {
  [name: string]: AgentPartial<unknown>;
}

/**
 * Composition context passed to partials during rendering
 */
export interface CompositionContext {
  currentPath: string;
  siteName: string;
  baseUrl: string;
  isDevelopment: boolean;
  buildTime: Date;
  theme?: string;
  locale?: string;
}

/**
 * Result of parsing and validating a partial's props
 */
export type ParsedPartialProps<TProps> =
  | {
      success: true;
      data: TProps;
    }
  | {
      success: false;
      error: z.ZodError;
    };

/**
 * Partial rendering result with metadata
 */
export interface PartialRenderResult {
  html: string;
  css: string;
  js?: string;
  dependencies: string[];
  metadata: {
    renderTime: number;
    propsHash: string;
    cacheable: boolean;
  };
}

/**
 * Type helper to extract props type from a partial
 */
export type PartialProps<T> = T extends AgentPartial<infer P> ? P : never;

/**
 * Type helper for creating partial schemas with common patterns
 */
export const createPartialSchema = (
  schema: z.ZodRawShape
): z.ZodObject<z.ZodRawShape> => {
  return z.object(schema);
};

/**
 * Utility type for partial configuration
 */
export interface PartialConfig {
  name: string;
  enabled: boolean;
  cacheEnabled: boolean;
  priority: number;
}

// AgentPartial is exported as a named export above
