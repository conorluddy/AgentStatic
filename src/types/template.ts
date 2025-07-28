/**
 * Template engine types for AgentStatic
 *
 * Defines interfaces for the template rendering system,
 * helper functions, and composition context.
 */

import type { CompositionContext } from './partial.js';
import type { ProcessedContent } from './content.js';

/**
 * Template rendering context with all available data
 */
export interface TemplateContext extends CompositionContext {
  content?: ProcessedContent;
  navigation?: NavigationData;
  site: SiteConfig;
  page: PageContext;
  helpers: TemplateHelpers;
}

/**
 * Site-wide configuration
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  language: string;
  timezone: string;
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  social?: Record<string, string>;
  analytics?: {
    googleAnalytics?: string;
    plausible?: string;
  };
  theme?: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
    spacing: Record<string, string>;
  };
}

/**
 * Page-specific context
 */
export interface PageContext {
  title: string;
  description?: string;
  path: string;
  url: string;
  canonical?: string;
  isHome: boolean;
  layout?: string;
  template?: string;
  breadcrumbs: BreadcrumbItem[];
  pagination?: PaginationContext;
}

/**
 * Navigation data structure
 */
export interface NavigationData {
  main: NavigationItem[];
  breadcrumbs: BreadcrumbItem[];
  currentPath: string;
}

/**
 * Navigation item
 */
export interface NavigationItem {
  title: string;
  url: string;
  isActive: boolean;
  isExternal: boolean;
  children?: NavigationItem[];
  metadata?: {
    icon?: string;
    description?: string;
    order?: number;
  };
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  title: string;
  url?: string;
  isActive: boolean;
}

/**
 * Pagination context
 */
export interface PaginationContext {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
  pages: Array<{
    number: number;
    url: string;
    isActive: boolean;
  }>;
}

/**
 * Template helper function signatures
 */
export interface TemplateHelpers {
  // Date utilities
  formatDate: (date: Date, format?: string) => string;
  timeAgo: (date: Date) => string;

  // Content utilities
  truncate: (text: string, length: number) => string;
  slugify: (text: string) => string;
  markdown: (content: string) => string;
  stripHtml: (html: string) => string;

  // Asset utilities
  optimizeImage: (src: string, options?: ImageOptimizeOptions) => string;
  generateSrcSet: (src: string) => string;
  assetUrl: (path: string) => string;

  // Collection utilities
  chunk: <T>(array: T[], size: number) => T[][];
  groupBy: <T>(
    array: T[],
    key: keyof T | ((item: T) => unknown)
  ) => Record<string, T[]>;
  sortBy: <T>(array: T[], key: keyof T | ((item: T) => unknown)) => T[];
  filter: <T>(array: T[], predicate: (item: T) => boolean) => T[];

  // URL utilities
  url: (path: string) => string;
  isActive: (path: string) => boolean;
  external: (url: string) => boolean;

  // Partial rendering
  renderPartial: <T>(name: string, props: T) => string;
  hasPartial: (name: string) => boolean;

  // Utility functions
  conditionalClass: (condition: boolean, className: string) => string;
  jsonEncode: (data: unknown) => string;
  randomId: () => string;
}

/**
 * Image optimization options
 */
export interface ImageOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  progressive?: boolean;
  background?: string;
}

/**
 * Template engine configuration
 */
export interface TemplateEngineConfig {
  partialsDir: string;
  layoutsDir: string;
  helpersDir: string;
  cacheEnabled: boolean;
  minifyHtml: boolean;
  prettifyHtml: boolean;
  globalData: Record<string, unknown>;
}

/**
 * Layout template definition
 */
export interface LayoutTemplate {
  name: string;
  template: (context: TemplateContext) => string;
  requiredPartials: string[];
  metadata: {
    description: string;
    category: 'page' | 'post' | 'archive' | 'special';
    responsive: boolean;
  };
}

// TemplateContext is exported as a named export above
