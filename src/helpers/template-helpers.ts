/**
 * Template helper utilities
 *
 * Provides date-fns, lodash-es, and custom utilities for use
 * within AgentStatic partial templates with proper TypeScript types.
 */

import { format, formatDistanceToNow } from 'date-fns';
import { chunk, groupBy, sortBy } from 'lodash-es';
import type { TemplateHelpers } from '@/types/partial.js';

/**
 * Create template helpers instance with context
 */
export function createTemplateHelpers(context: {
  baseUrl: string;
  currentPath: string;
}): TemplateHelpers {
  return {
    // Date utilities powered by date-fns
    formatDate: (date: Date, dateFormat = 'PPP') => {
      return format(date, dateFormat);
    },

    timeAgo: (date: Date) => {
      return formatDistanceToNow(date, { addSuffix: true });
    },

    // Content utilities
    truncate: (text: string, length: number) => {
      if (text.length <= length) return text;
      return text.slice(0, length).trim() + '...';
    },

    slugify: (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },

    markdown: (content: string) => {
      // Basic markdown-to-HTML conversion
      // Full unified pipeline will be implemented in Issue #11
      return content
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/gim, '<br>');
    },

    // Asset utilities (Sharp integration will be implemented in Issue #13)
    optimizeImage: (src: string, _options = {}) => {
      // Placeholder implementation - full Sharp integration in Issue #13
      return src;
    },

    generateSrcSet: (src: string) => {
      // Placeholder implementation - full Sharp integration in Issue #13
      return src;
    },

    // Lodash-es utilities (tree-shakable)
    chunk,
    groupBy: groupBy as TemplateHelpers['groupBy'],
    sortBy: sortBy as TemplateHelpers['sortBy'],

    // URL and navigation
    url: (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${context.baseUrl}${cleanPath}`;
    },

    isActive: (path: string) => {
      return context.currentPath === path;
    },

    // Partial composition (will be fully implemented in Issue #7)
    renderPartial: <T>(name: string, _props: T) => {
      // Placeholder implementation - full partial engine in Issue #7
      return `<!-- Partial: ${name} -->`;
    },

    conditionalClass: (condition: boolean, className: string) => {
      return condition ? className : '';
    },
  };
}

/**
 * Default template helpers for use in templates
 * Uses sensible defaults for base URL and current path
 */
export const defaultTemplateHelpers = createTemplateHelpers({
  baseUrl: '',
  currentPath: '/',
});
