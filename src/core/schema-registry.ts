/**
 * Centralized schema registry for AgentStatic
 * 
 * Provides validation utilities, schema composition helpers,
 * and centralized management for all Zod schemas in the system.
 */

import { z } from 'zod';
import type { AgentPartial, PartialProps } from '@/types/partial.js';

/**
 * Schema validation result type
 */
export type ValidationResult<T> = 
  | { success: true; data: T; errors?: never }
  | { success: false; data?: never; errors: z.ZodError };

/**
 * Registry for storing and managing schemas
 */
export class SchemaRegistry {
  private schemas = new Map<string, z.ZodSchema<unknown>>();
  private partials = new Map<string, AgentPartial<unknown>>();

  /**
   * Register a Zod schema with a unique name
   */
  registerSchema<T>(name: string, schema: z.ZodSchema<T>): void {
    if (this.schemas.has(name)) {
      throw new Error(`Schema '${name}' is already registered`);
    }
    this.schemas.set(name, schema);
  }

  /**
   * Register an AgentPartial with its schema
   */
  registerPartial<T>(name: string, partial: AgentPartial<T>): void {
    if (this.partials.has(name)) {
      throw new Error(`Partial '${name}' is already registered`);
    }
    
    this.partials.set(name, partial);
    this.registerSchema(`${name}.props`, partial.schema);
  }

  /**
   * Get a registered schema by name
   */
  getSchema<T = unknown>(name: string): z.ZodSchema<T> | undefined {
    return this.schemas.get(name) as z.ZodSchema<T> | undefined;
  }

  /**
   * Get a registered partial by name
   */
  getPartial<T = unknown>(name: string): AgentPartial<T> | undefined {
    return this.partials.get(name) as AgentPartial<T> | undefined;
  }

  /**
   * Validate data against a registered schema
   */
  validate<T>(schemaName: string, data: unknown): ValidationResult<T> {
    const schema = this.getSchema<T>(schemaName);
    if (!schema) {
      throw new Error(`Schema '${schemaName}' not found in registry`);
    }

    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, errors: result.error };
    }
  }

  /**
   * Validate partial props
   */
  validatePartialProps<T>(partialName: string, props: unknown): ValidationResult<T> {
    const partial = this.getPartial<T>(partialName);
    if (!partial) {
      throw new Error(`Partial '${partialName}' not found in registry`);
    }

    const result = partial.schema.safeParse(props);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, errors: result.error };
    }
  }

  /**
   * Get all registered schema names
   */
  getSchemaNames(): string[] {
    return Array.from(this.schemas.keys());
  }

  /**
   * Get all registered partial names
   */
  getPartialNames(): string[] {
    return Array.from(this.partials.keys());
  }

  /**
   * Export schemas for MCP integration (AI agents)
   */
  exportSchemasForMCP(): Record<string, unknown> {
    const exported: Record<string, unknown> = {};
    
    for (const [name, partial] of this.partials) {
      exported[name] = {
        schema: partial.schema._def,
        metadata: partial.metadata,
        dependencies: partial.dependencies,
        category: partial.metadata.category
      };
    }

    return exported;
  }

  /**
   * Clear all registered schemas (useful for testing)
   */
  clear(): void {
    this.schemas.clear();
    this.partials.clear();
  }
}

/**
 * Schema composition utilities
 */
export const SchemaUtils = {
  /**
   * Create a partial schema with common patterns
   */
  createPartialSchema<T extends Record<string, unknown>>(
    fields: z.ZodRawShape,
    options: {
      description?: string;
      metadata?: Record<string, unknown>;
    } = {}
  ): z.ZodObject<z.ZodRawShape> {
    const schema = z.object(fields);
    
    if (options.description) {
      schema.describe(options.description);
    }

    return schema;
  },

  /**
   * Extend an existing schema with additional fields
   */
  extendSchema<T extends z.ZodRawShape, U extends z.ZodRawShape>(
    baseSchema: z.ZodObject<T>,
    extensions: U
  ): z.ZodObject<T & U> {
    return baseSchema.extend(extensions);
  },

  /**
   * Make all fields in a schema optional
   */
  makeOptional<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>
  ): z.ZodObject<{ [K in keyof T]: z.ZodOptional<T[K]> }> {
    return schema.partial();
  },

  /**
   * Create a union of schemas
   */
  createUnion<T extends readonly [z.ZodTypeAny, ...z.ZodTypeAny[]]>(
    schemas: T
  ): z.ZodUnion<T> {
    return z.union(schemas);
  },

  /**
   * Create an array schema with validation
   */
  createArraySchema<T>(
    itemSchema: z.ZodSchema<T>,
    options: {
      minItems?: number;
      maxItems?: number;
      unique?: boolean;
    } = {}
  ): z.ZodArray<z.ZodSchema<T>> {
    let schema = z.array(itemSchema);

    if (options.minItems !== undefined) {
      schema = schema.min(options.minItems);
    }
    if (options.maxItems !== undefined) {
      schema = schema.max(options.maxItems);
    }

    return schema;
  },

  /**
   * Validate and transform data with error handling
   */
  safeTransform<T, U>(
    schema: z.ZodSchema<T>,
    data: unknown,
    transformer: (data: T) => U
  ): ValidationResult<U> {
    const parseResult = schema.safeParse(data);
    
    if (!parseResult.success) {
      return { success: false, errors: parseResult.error };
    }

    try {
      const transformed = transformer(parseResult.data);
      return { success: true, data: transformed };
    } catch (error) {
      const zodError = new z.ZodError([
        {
          code: 'custom',
          message: `Transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          path: []
        }
      ]);
      return { success: false, errors: zodError };
    }
  }
};

/**
 * Global schema registry instance
 */
export const globalRegistry = new SchemaRegistry();

/**
 * Helper functions for common schema operations
 */
export function registerSchema<T>(name: string, schema: z.ZodSchema<T>): void {
  globalRegistry.registerSchema(name, schema);
}

export function registerPartial<T>(name: string, partial: AgentPartial<T>): void {
  globalRegistry.registerPartial(name, partial);
}

export function validateData<T>(schemaName: string, data: unknown): ValidationResult<T> {
  return globalRegistry.validate<T>(schemaName, data);
}

export function validatePartialProps<T>(partialName: string, props: unknown): ValidationResult<T> {
  return globalRegistry.validatePartialProps<T>(partialName, props);
}

/**
 * Type helper to extract schema type
 */
export type InferSchema<T> = T extends z.ZodSchema<infer U> ? U : never;

/**
 * Type helper to create a validated partial props type
 */
export type ValidatedProps<T extends string> = T extends keyof typeof globalRegistry
  ? PartialProps<(typeof globalRegistry)[T]>
  : never;

export default SchemaRegistry;