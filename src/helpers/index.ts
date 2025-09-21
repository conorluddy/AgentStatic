/**
 * Template helper utilities
 *
 * Provides date-fns, lodash-es, Sharp, Unified, and custom utilities
 * for use within AgentStatic partial templates.
 */

// Core template helpers with date-fns and lodash-es
export * from './template-helpers';

// Image optimization with Sharp
export * from './asset-helpers';

// Markdown processing with Unified
export * from './markdown-processor';

// Version tracking
export const HELPERS_VERSION = '1.0.0';
