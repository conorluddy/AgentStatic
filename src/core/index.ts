/**
 * Core AgentStatic functionality
 *
 * Provides the fundamental building blocks for the partial-based
 * templating system with TypeScript and Zod integration.
 */

// Issue #7: Partial Registry & Discovery System (IMPLEMENTED)
export { PartialRegistrySystem } from './partial-registry.js';

// Page Discovery System (NEW)
export {
  PageDiscoverySystem,
  PageFrontmatterSchema,
  type PageFile,
  type PageFrontmatter,
  type PageDiscoveryConfig,
  type PageValidationResult,
} from './page-discovery.js';

// Navigation Generation System (NEW)
export {
  NavigationGenerator,
  NavigationItemSchema,
  NavigationConfigSchema,
  type NavigationItem,
  type NavigationConfig,
  type NavigationGenerationOptions,
  type NavigationValidationResult,
} from './navigation-generator.js';

// Will be implemented in subsequent issues
// export * from './schema-registry.js';     // Issue #11: Unified-Based Markdown Processing
// export * from './content-processor.js';   // Issue #11: Unified-Based Markdown Processing

// Placeholder export to make this a module
export const CORE_VERSION = '1.0.0';
