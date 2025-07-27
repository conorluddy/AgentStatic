/**
 * Template helper utilities with date-fns and lodash-es integration
 * 
 * Provides a comprehensive set of template utilities for use within
 * AgentStatic partial templates, following the TemplateHelpers interface.
 */

import { 
  format, 
  formatDistanceToNow, 
  isValid, 
  parseISO 
} from 'date-fns';
import { 
  chunk, 
  groupBy, 
  sortBy,
  filter
} from 'lodash-es';

import type { TemplateHelpers, ImageOptimizeOptions } from '@/types/partial.js';

/**
 * Date formatting utilities using date-fns
 */
export const dateHelpers = {
  /**
   * Format a date using date-fns format string
   */
  formatDate: (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) {
        return 'Invalid Date';
      }
      return format(dateObj, formatStr);
    } catch (error) {
      return 'Invalid Date';
    }
  },

  /**
   * Generate human-readable relative time (e.g., "2 hours ago")
   */
  timeAgo: (date: Date | string): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) {
        return 'Invalid Date';
      }
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
      return 'Invalid Date';
    }
  }
};

/**
 * Text manipulation utilities
 */
export const textHelpers = {
  /**
   * Truncate text to specified length with ellipsis
   */
  truncate: (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length).trim() + '...';
  },

  /**
   * Generate URL-safe slug from text
   */
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')       // Remove non-word chars except hyphens
      .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
  },

  /**
   * Strip HTML tags from text
   */
  stripHtml: (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  },

  /**
   * Basic markdown to HTML conversion (simplified)
   */
  markdown: (content: string): string => {
    return content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  }
};

/**
 * Collection manipulation utilities using lodash-es
 */
export const collectionHelpers = {
  /**
   * Split array into chunks of specified size
   */
  chunk: <T>(array: T[], size: number): T[][] => {
    return chunk(array, size);
  },

  /**
   * Group array items by a key or function
   */
  groupBy: <T>(
    array: T[], 
    predicate: keyof T | ((item: T) => unknown)
  ): Record<string, T[]> => {
    return groupBy(array, predicate);
  },

  /**
   * Sort array by a key or function
   */
  sortBy: <T>(
    array: T[], 
    predicate: keyof T | ((item: T) => unknown)
  ): T[] => {
    return sortBy(array, predicate);
  },

  /**
   * Filter array by predicate function
   */
  filter: <T>(array: T[], predicate: (item: T) => boolean): T[] => {
    return filter(array, predicate);
  }
};

/**
 * Asset URL utilities (placeholders for Sharp integration)
 */
export const assetHelpers = {
  /**
   * Generate optimized image URL (placeholder for Sharp integration)
   */
  optimizeImage: (src: string, options?: ImageOptimizeOptions): string => {
    // This will be implemented with Sharp integration
    // For now, return the original src
    if (options) {
      // Add query parameters to indicate optimization intent
      const params = new URLSearchParams();
      if (options.width) params.set('w', options.width.toString());
      if (options.height) params.set('h', options.height.toString());
      if (options.quality) params.set('q', options.quality.toString());
      if (options.format) params.set('f', options.format);
      
      const queryString = params.toString();
      return queryString ? `${src}?${queryString}` : src;
    }
    return src;
  },

  /**
   * Generate responsive srcset (placeholder for Sharp integration)
   */
  generateSrcSet: (src: string): string => {
    // This will be implemented with Sharp integration
    // For now, return a basic srcset
    return `${src} 1x, ${src} 2x`;
  },

  /**
   * Generate asset URL with proper base path
   */
  assetUrl: (path: string): string => {
    // Add leading slash if not present
    return path.startsWith('/') ? path : `/${path}`;
  }
};

/**
 * URL and navigation utilities
 */
export const urlHelpers = {
  /**
   * Generate absolute URL from path
   */
  url: (path: string): string => {
    // This would use site configuration for base URL
    // For now, ensure proper leading slash
    return path.startsWith('/') ? path : `/${path}`;
  },

  /**
   * Check if a path is the current active path
   */
  isActive: (path: string): boolean => {
    // This would check against current page context
    // For now, return false (will be implemented with context)
    return false;
  },

  /**
   * Check if URL is external
   */
  external: (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
};

/**
 * Utility functions
 */
export const utilityHelpers = {
  /**
   * Conditionally apply CSS class
   */
  conditionalClass: (condition: boolean, className: string): string => {
    return condition ? className : '';
  },

  /**
   * JSON encode data for safe embedding in HTML
   */
  jsonEncode: (data: unknown): string => {
    return JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  },

  /**
   * Generate random ID for HTML elements
   */
  randomId: (): string => {
    return `id-${Math.random().toString(36).substring(2, 11)}`;
  }
};

/**
 * Complete TemplateHelpers implementation
 */
export const createTemplateHelpers = (context?: {
  currentPath?: string;
  baseUrl?: string;
}): TemplateHelpers => {
  return {
    // Date utilities
    formatDate: dateHelpers.formatDate,
    timeAgo: dateHelpers.timeAgo,

    // Content utilities
    truncate: textHelpers.truncate,
    slugify: textHelpers.slugify,
    markdown: textHelpers.markdown,
    stripHtml: textHelpers.stripHtml,

    // Asset utilities
    optimizeImage: assetHelpers.optimizeImage,
    generateSrcSet: assetHelpers.generateSrcSet,
    assetUrl: assetHelpers.assetUrl,

    // Collection utilities
    chunk: collectionHelpers.chunk,
    groupBy: collectionHelpers.groupBy,
    sortBy: collectionHelpers.sortBy,
    filter: collectionHelpers.filter,

    // URL utilities
    url: (path: string) => {
      if (context?.baseUrl) {
        return `${context.baseUrl.replace(/\/$/, '')}${urlHelpers.url(path)}`;
      }
      return urlHelpers.url(path);
    },
    isActive: (path: string) => {
      return context?.currentPath === path;
    },
    external: urlHelpers.external,

    // Partial rendering (placeholder)
    renderPartial: <T>(name: string, props: T): string => {
      // This will be implemented with the partial engine
      return `<!-- Partial: ${name} -->`;
    },
    hasPartial: (name: string): boolean => {
      // This will be implemented with the partial registry
      return false;
    },

    // Utility functions
    conditionalClass: utilityHelpers.conditionalClass,
    jsonEncode: utilityHelpers.jsonEncode,
    randomId: utilityHelpers.randomId
  };
};

/**
 * Default template helpers instance
 */
export const templateHelpers = createTemplateHelpers();

export default createTemplateHelpers;