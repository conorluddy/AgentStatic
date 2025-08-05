/**
 * PartialRegistry & Discovery System (Issue #7)
 *
 * Manages registration, discovery, and validation of AgentPartial components
 * with automatic filesystem discovery, dependency resolution, and hot reload support.
 */

import { EventEmitter } from 'events';
import { pathToFileURL } from 'url';
import { basename } from 'path';
import { z } from 'zod';
import type {
  AgentPartial,
  PartialRegistry,
  PartialCategory,
} from '../types/partial.js';

/**
 * File system dependencies - imported dynamically for better testing
 */
import type { FSWatcher } from 'chokidar';

/**
 * Events emitted by the PartialRegistry
 */
interface PartialRegistryEvents {
  register: [name: string, partial: AgentPartial<unknown>];
  unregister: [name: string];
  discover: [name: string, partial: AgentPartial<unknown>];
  reload: [name: string, partial: AgentPartial<unknown>];
  error: [error: Error];
}

/**
 * Cache for schema validations to improve performance
 */
interface ValidationCache {
  [partialName: string]: {
    schema: z.ZodSchema<unknown>;
    lastModified: number;
  };
}

/**
 * Core PartialRegistry system with TDD implementation
 */
export class PartialRegistrySystem extends EventEmitter<PartialRegistryEvents> {
  private registry: PartialRegistry = {};
  private validationCache: ValidationCache = {};
  private watcher?: FSWatcher;
  private isWatching = false;

  constructor() {
    super();
  }

  /**
   * Register a partial with validation
   */
  register(name: string, partial: AgentPartial<unknown>): void {
    if (this.has(name)) {
      throw new Error(`Partial "${name}" is already registered`);
    }

    this.validatePartialStructure(partial);

    this.registry[name] = partial;
    this.invalidateCache(name);

    this.emit('register', name, partial);
  }

  /**
   * Unregister a partial
   */
  unregister(name: string): boolean {
    if (!this.has(name)) {
      return false;
    }

    delete this.registry[name];
    this.invalidateCache(name);

    this.emit('unregister', name);
    return true;
  }

  /**
   * Check if a partial exists
   */
  has(name: string): boolean {
    return name in this.registry;
  }

  /**
   * Get a specific partial
   */
  get(name: string): AgentPartial<unknown> | undefined {
    return this.registry[name];
  }

  /**
   * Get all partial names
   */
  getPartialNames(): string[] {
    return Object.keys(this.registry);
  }

  /**
   * Get the complete registry
   */
  getAll(): PartialRegistry {
    return { ...this.registry };
  }

  /**
   * Validate partial props against schema with caching
   */
  validatePartialProps(name: string, props: unknown): unknown {
    const partial = this.get(name);
    if (!partial) {
      throw new Error(`Partial "${name}" not found`);
    }

    // Check cache first
    const cached = this.validationCache[name];
    const now = Date.now();

    if (
      cached &&
      cached.schema === partial.schema &&
      now - cached.lastModified < 5000
    ) {
      // Use cached validation (cache valid for 5 seconds)
      try {
        return cached.schema.parse(props);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(
            `Validation failed for partial "${name}": ${error.issues
              .map(issue => `${issue.path.join('.')}: ${issue.message}`)
              .join(', ')}`
          );
        }
        throw error;
      }
    } else {
      // Update cache and validate
      this.validationCache[name] = {
        schema: partial.schema,
        lastModified: now,
      };

      try {
        return partial.schema.parse(props);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(
            `Validation failed for partial "${name}": ${error.issues
              .map(issue => `${issue.path.join('.')}: ${issue.message}`)
              .join(', ')}`
          );
        }
        throw error;
      }
    }
  }

  /**
   * Discover partials from filesystem
   */
  async discoverPartials(partialsDir: string): Promise<void> {
    try {
      const glob = await this.importGlob();
      const partialFiles = await glob('**/*.partial.ts', {
        cwd: partialsDir,
        absolute: true,
      });

      const discoveries = await Promise.allSettled(
        partialFiles.map(async (filePath: string) => {
          try {
            const partialName = this.extractPartialName(filePath);
            const partial = await this.importPartial(filePath);

            if (this.isValidPartial(partial)) {
              this.registry[partialName] = partial;
              this.emit('discover', partialName, partial);
              return { name: partialName, partial };
            } else {
              console.warn(`Invalid partial structure in ${filePath}`);
              return null;
            }
          } catch (error) {
            console.error(`Error loading partial from ${filePath}:`, error);
            return null;
          }
        })
      );

      const successful = discoveries.filter(
        (
          result: PromiseSettledResult<unknown>
        ): result is PromiseFulfilledResult<unknown> =>
          result.status === 'fulfilled' && result.value !== null
      );

      console.log(
        `Discovered ${successful.length} partials from ${partialsDir}`
      );
    } catch (error) {
      throw new Error(
        `Failed to discover partials: ${(error as Error).message}`
      );
    }
  }

  /**
   * Extract partial name from file path
   */
  extractPartialName(filePath: string): string {
    const fileName = basename(filePath);
    return fileName.replace('.partial.ts', '');
  }

  /**
   * Resolve dependencies for a partial (returns dependency order)
   */
  resolveDependencies(partialName: string): string[] {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const resolved: string[] = [];

    const visit = (name: string, path: string[] = []) => {
      if (visiting.has(name)) {
        throw new Error(
          `Circular dependency detected: ${[...path, name].join(' -> ')}`
        );
      }

      if (visited.has(name)) {
        return;
      }

      const partial = this.get(name);
      if (!partial) {
        throw new Error(
          `Missing dependency: "${name}" required by "${path[path.length - 1] || 'unknown'}"`
        );
      }

      visiting.add(name);

      if (partial.dependencies) {
        for (const dep of partial.dependencies) {
          visit(dep, [...path, name]);
        }
      }

      visiting.delete(name);
      visited.add(name);
      resolved.push(name);
    };

    visit(partialName);
    return resolved;
  }

  /**
   * Enable hot reload for development
   */
  enableHotReload(partialsDir: string): void {
    if (this.isWatching) {
      this.disableHotReload();
    }

    this.initializeWatcher(partialsDir);
    this.isWatching = true;
  }

  /**
   * Disable hot reload
   */
  disableHotReload(): void {
    if (this.watcher) {
      this.watcher.close();
      (this.watcher as FSWatcher | undefined) = undefined; // TypeScript workaround for exactOptionalPropertyTypes
    }
    this.isWatching = false;
  }

  /**
   * Private: Initialize file watcher
   */
  private async initializeWatcher(partialsDir: string): Promise<void> {
    const chokidar = await this.importChokidar();

    this.watcher = chokidar.watch(`${partialsDir}/**/*.partial.ts`, {
      ignoreInitial: true,
      persistent: true,
    });

    this.watcher.on('change', async (filePath: string) => {
      await this.handleFileChange(filePath);
    });

    this.watcher.on('add', async (filePath: string) => {
      await this.handleFileAdd(filePath);
    });

    this.watcher.on('unlink', (filePath: string) => {
      this.handleFileDelete(filePath);
    });

    this.watcher.on('error', (error: unknown) => {
      this.emit('error', error as Error);
    });
  }

  /**
   * Private: Handle file change event
   */
  private async handleFileChange(filePath: string): Promise<void> {
    try {
      const partialName = this.extractPartialName(filePath);
      const partial = await this.importPartial(filePath);

      if (this.isValidPartial(partial)) {
        this.registry[partialName] = partial;
        this.invalidateCache(partialName);
        this.emit('reload', partialName, partial);
      }
    } catch (error) {
      console.error(`Error reloading partial ${filePath}:`, error);
      this.emit('error', error as Error);
    }
  }

  /**
   * Private: Handle file add event
   */
  private async handleFileAdd(filePath: string): Promise<void> {
    try {
      const partialName = this.extractPartialName(filePath);
      const partial = await this.importPartial(filePath);

      if (this.isValidPartial(partial)) {
        this.registry[partialName] = partial;
        this.emit('discover', partialName, partial);
      }
    } catch (error) {
      console.error(`Error adding partial ${filePath}:`, error);
      this.emit('error', error as Error);
    }
  }

  /**
   * Private: Handle file delete event
   */
  private handleFileDelete(filePath: string): void {
    const partialName = this.extractPartialName(filePath);
    if (this.has(partialName)) {
      this.unregister(partialName);
    }
  }

  /**
   * Private: Import a partial from file path
   */
  private async importPartial(
    filePath: string
  ): Promise<AgentPartial<unknown>> {
    // Convert to file URL for dynamic import
    const fileUrl = pathToFileURL(filePath).href;
    const module = await import(fileUrl);

    // Support both default export and named export
    return module.default || module[this.extractPartialName(filePath)];
  }

  /**
   * Private: Dynamic import of fast-glob
   */
  private async importGlob() {
    const { default: glob } = await import('fast-glob');
    return glob;
  }

  /**
   * Private: Dynamic import of chokidar
   */
  private async importChokidar() {
    const { default: chokidar } = await import('chokidar');
    return chokidar;
  }

  /**
   * Private: Validate partial structure
   */
  private validatePartialStructure(partial: unknown): void {
    if (!partial || typeof partial !== 'object') {
      throw new Error('Invalid partial structure: must be an object');
    }

    const partialObj = partial as Record<string, unknown>;

    if (!partialObj['schema']) {
      throw new Error('Invalid partial structure: missing schema');
    }

    if (!(partialObj['schema'] instanceof z.ZodSchema)) {
      throw new Error('Schema must be a Zod schema');
    }

    if (typeof partialObj['template'] !== 'function') {
      throw new Error('Template must be a function');
    }

    if (typeof partialObj['styles'] !== 'string') {
      throw new Error('Styles must be a string');
    }

    if (!partialObj['metadata']) {
      throw new Error('Invalid partial structure: missing metadata');
    }

    this.validateMetadata(partialObj['metadata']);
  }

  /**
   * Private: Validate metadata completeness
   */
  private validateMetadata(metadata: unknown): void {
    if (!metadata || typeof metadata !== 'object') {
      throw new Error('Metadata must be an object');
    }

    const metadataObj = metadata as Record<string, unknown>;
    const required = ['description', 'category', 'keywords', 'usageExamples'];
    const missing = required.filter(field => !metadataObj[field]);

    if (missing.length > 0) {
      throw new Error(`Incomplete metadata: missing ${missing.join(', ')}`);
    }

    const validCategories: PartialCategory[] = [
      'layout',
      'content',
      'media',
      'navigation',
      'interactive',
      'utility',
    ];

    if (!validCategories.includes(metadataObj['category'] as PartialCategory)) {
      throw new Error(`Invalid category: ${metadataObj['category']}`);
    }

    if (
      !Array.isArray(metadataObj['keywords']) ||
      metadataObj['keywords'].length === 0
    ) {
      throw new Error('Keywords must be a non-empty array');
    }

    if (
      !Array.isArray(metadataObj['usageExamples']) ||
      metadataObj['usageExamples'].length === 0
    ) {
      throw new Error('Usage examples must be a non-empty array');
    }
  }

  /**
   * Private: Check if object is a valid partial
   */
  private isValidPartial(obj: unknown): obj is AgentPartial<unknown> {
    try {
      this.validatePartialStructure(obj);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Private: Invalidate validation cache for a partial
   */
  private invalidateCache(partialName: string): void {
    delete this.validationCache[partialName];
  }
}

/**
 * Default export of the registry class
 */
export default PartialRegistrySystem;
