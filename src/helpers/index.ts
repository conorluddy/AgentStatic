/**
 * Template helper utilities
 *
 * Provides date-fns, lodash-es, Sharp, Unified, and custom utilities
 * for use within AgentStatic partial templates.
 */

// Core template helpers with date-fns and lodash-es
export * from './template-helpers.js';

// Image optimization with Sharp
export * from './asset-helpers.js';

// Markdown processing with Unified
export * from './markdown-processor.js';

// Version tracking
export const HELPERS_VERSION = '1.0.0';
