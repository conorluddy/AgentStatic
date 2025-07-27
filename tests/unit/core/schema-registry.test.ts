/**
 * Tests for schema registry and validation utilities
 * 
 * Validates centralized schema management, partial registration,
 * and validation workflows.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { 
  SchemaRegistry,
  SchemaUtils,
  globalRegistry,
  registerSchema,
  registerPartial,
  validateData,
  validatePartialProps
} from '@/core/schema-registry.js';
import type { AgentPartial } from '@/types/partial.js';

describe('SchemaRegistry', () => {
  let registry: SchemaRegistry;

  beforeEach(() => {
    registry = new SchemaRegistry();
  });

  describe('Schema Registration', () => {
    it('should register and retrieve schemas', () => {
      const testSchema = z.object({
        name: z.string(),
        age: z.number()
      });

      registry.registerSchema('test', testSchema);

      const retrieved = registry.getSchema('test');
      expect(retrieved).toBe(testSchema);
    });

    it('should prevent duplicate schema registration', () => {
      const schema1 = z.string();
      const schema2 = z.number();

      registry.registerSchema('duplicate', schema1);

      expect(() => {
        registry.registerSchema('duplicate', schema2);
      }).toThrow("Schema 'duplicate' is already registered");
    });

    it('should return undefined for non-existent schemas', () => {
      const schema = registry.getSchema('nonexistent');
      expect(schema).toBeUndefined();
    });

    it('should list all registered schema names', () => {
      registry.registerSchema('schema1', z.string());
      registry.registerSchema('schema2', z.number());
      registry.registerSchema('schema3', z.boolean());

      const names = registry.getSchemaNames();
      expect(names).toEqual(expect.arrayContaining(['schema1', 'schema2', 'schema3']));
      expect(names).toHaveLength(3);
    });
  });

  describe('Partial Registration', () => {
    it('should register and retrieve partials', () => {
      const testPartial: AgentPartial<{ title: string }> = {
        schema: z.object({ title: z.string() }),
        template: (props) => `<h1>${props.title}</h1>`,
        styles: 'h1 { color: blue; }',
        metadata: {
          description: 'Test partial',
          category: 'content',
          keywords: ['test'],
          usageExamples: []
        }
      };

      registry.registerPartial('test-partial', testPartial);

      const retrieved = registry.getPartial('test-partial');
      expect(retrieved).toBe(testPartial);

      // Should also register the schema
      const schema = registry.getSchema('test-partial.props');
      expect(schema).toBe(testPartial.schema);
    });

    it('should prevent duplicate partial registration', () => {
      const partial1: AgentPartial<{ name: string }> = {
        schema: z.object({ name: z.string() }),
        template: () => '',
        styles: '',
        metadata: { description: '', category: 'utility', keywords: [], usageExamples: [] }
      };

      const partial2: AgentPartial<{ title: string }> = {
        schema: z.object({ title: z.string() }),
        template: () => '',
        styles: '',
        metadata: { description: '', category: 'utility', keywords: [], usageExamples: [] }
      };

      registry.registerPartial('duplicate', partial1);

      expect(() => {
        registry.registerPartial('duplicate', partial2);
      }).toThrow("Partial 'duplicate' is already registered");
    });

    it('should list all registered partial names', () => {
      const createPartial = (name: string): AgentPartial<{}> => ({
        schema: z.object({}),
        template: () => '',
        styles: '',
        metadata: { description: name, category: 'utility', keywords: [], usageExamples: [] }
      });

      registry.registerPartial('partial1', createPartial('p1'));
      registry.registerPartial('partial2', createPartial('p2'));

      const names = registry.getPartialNames();
      expect(names).toEqual(expect.arrayContaining(['partial1', 'partial2']));
      expect(names).toHaveLength(2);
    });
  });

  describe('Validation', () => {
    beforeEach(() => {
      const userSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        age: z.number().min(0).max(120)
      });

      registry.registerSchema('user', userSchema);
    });

    it('should validate data against registered schema', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      };

      const result = registry.validate('user', validData);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.age).toBe(30);
      }
    });

    it('should return validation errors for invalid data', () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        age: -5
      };

      const result = registry.validate('user', invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.errors.errors).toHaveLength(3);
        expect(result.errors.errors.some(e => e.path.includes('name'))).toBe(true);
        expect(result.errors.errors.some(e => e.path.includes('email'))).toBe(true);
        expect(result.errors.errors.some(e => e.path.includes('age'))).toBe(true);
      }
    });

    it('should throw error for non-existent schema', () => {
      expect(() => {
        registry.validate('nonexistent', {});
      }).toThrow("Schema 'nonexistent' not found in registry");
    });
  });

  describe('Partial Validation', () => {
    beforeEach(() => {
      const buttonPartial: AgentPartial<{ text: string; variant: 'primary' | 'secondary' }> = {
        schema: z.object({
          text: z.string().min(1),
          variant: z.enum(['primary', 'secondary']).default('primary')
        }),
        template: (props) => `<button class="${props.variant}">${props.text}</button>`,
        styles: '.primary { background: blue; }',
        metadata: {
          description: 'Button component',
          category: 'interactive',
          keywords: ['button', 'click'],
          usageExamples: []
        }
      };

      registry.registerPartial('button', buttonPartial);
    });

    it('should validate partial props', () => {
      const validProps = {
        text: 'Click me',
        variant: 'primary' as const
      };

      const result = registry.validatePartialProps('button', validProps);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.text).toBe('Click me');
        expect(result.data.variant).toBe('primary');
      }
    });

    it('should return validation errors for invalid partial props', () => {
      const invalidProps = {
        text: '',
        variant: 'invalid'
      };

      const result = registry.validatePartialProps('button', invalidProps);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.errors.errors.length).toBeGreaterThan(0);
      }
    });

    it('should throw error for non-existent partial', () => {
      expect(() => {
        registry.validatePartialProps('nonexistent', {});
      }).toThrow("Partial 'nonexistent' not found in registry");
    });
  });

  describe('MCP Export', () => {
    it('should export schemas for MCP integration', () => {
      const heroPartial: AgentPartial<{ title: string; subtitle?: string }> = {
        schema: z.object({
          title: z.string().describe('Main heading'),
          subtitle: z.string().optional().describe('Supporting text')
        }),
        template: () => '',
        styles: '',
        dependencies: ['button'],
        metadata: {
          description: 'Hero section component',
          category: 'layout',
          keywords: ['hero', 'banner'],
          usageExamples: [{
            description: 'Basic hero',
            props: { title: 'Welcome' }
          }]
        }
      };

      registry.registerPartial('hero', heroPartial);

      const exported = registry.exportSchemasForMCP();

      expect(exported.hero).toBeDefined();
      expect(exported.hero.schema).toBeDefined();
      expect(exported.hero.metadata).toEqual(heroPartial.metadata);
      expect(exported.hero.dependencies).toEqual(['button']);
      expect(exported.hero.category).toBe('layout');
    });
  });

  describe('Cache Management', () => {
    it('should clear all schemas and partials', () => {
      registry.registerSchema('test', z.string());
      registry.registerPartial('test-partial', {
        schema: z.object({}),
        template: () => '',
        styles: '',
        metadata: { description: '', category: 'utility', keywords: [], usageExamples: [] }
      });

      expect(registry.getSchemaNames()).toHaveLength(2); // schema + partial.props
      expect(registry.getPartialNames()).toHaveLength(1);

      registry.clear();

      expect(registry.getSchemaNames()).toHaveLength(0);
      expect(registry.getPartialNames()).toHaveLength(0);
    });
  });
});

describe('SchemaUtils', () => {
  describe('Schema Creation', () => {
    it('should create partial schema with description', () => {
      const schema = SchemaUtils.createPartialSchema({
        title: z.string(),
        count: z.number()
      }, {
        description: 'Test schema',
        metadata: { version: '1.0' }
      });

      expect(schema).toBeDefined();
      
      const result = schema.safeParse({ title: 'Test', count: 42 });
      expect(result.success).toBe(true);
    });

    it('should extend existing schemas', () => {
      const baseSchema = z.object({
        name: z.string()
      });

      const extendedSchema = SchemaUtils.extendSchema(baseSchema, {
        age: z.number(),
        email: z.string().email()
      });

      const result = extendedSchema.safeParse({
        name: 'John',
        age: 30,
        email: 'john@example.com'
      });

      expect(result.success).toBe(true);
    });

    it('should make schema fields optional', () => {
      const requiredSchema = z.object({
        name: z.string(),
        age: z.number()
      });

      const optionalSchema = SchemaUtils.makeOptional(requiredSchema);

      const result1 = optionalSchema.safeParse({});
      expect(result1.success).toBe(true);

      const result2 = optionalSchema.safeParse({ name: 'John' });
      expect(result2.success).toBe(true);
    });

    it('should create union schemas', () => {
      const stringSchema = z.string();
      const numberSchema = z.number();

      const unionSchema = SchemaUtils.createUnion([stringSchema, numberSchema]);

      const result1 = unionSchema.safeParse('hello');
      expect(result1.success).toBe(true);

      const result2 = unionSchema.safeParse(42);
      expect(result2.success).toBe(true);

      const result3 = unionSchema.safeParse(true);
      expect(result3.success).toBe(false);
    });

    it('should create array schemas with constraints', () => {
      const itemSchema = z.string();
      const arraySchema = SchemaUtils.createArraySchema(itemSchema, {
        minItems: 2,
        maxItems: 5
      });

      const result1 = arraySchema.safeParse(['a', 'b', 'c']);
      expect(result1.success).toBe(true);

      const result2 = arraySchema.safeParse(['a']);
      expect(result2.success).toBe(false); // Too few items

      const result3 = arraySchema.safeParse(['a', 'b', 'c', 'd', 'e', 'f']);
      expect(result3.success).toBe(false); // Too many items
    });
  });

  describe('Safe Transform', () => {
    it('should transform valid data', () => {
      const schema = z.object({ name: z.string() });
      const transformer = (data: { name: string }) => data.name.toUpperCase();

      const result = SchemaUtils.safeTransform(schema, { name: 'john' }, transformer);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('JOHN');
      }
    });

    it('should handle validation errors', () => {
      const schema = z.object({ name: z.string() });
      const transformer = (data: { name: string }) => data.name.toUpperCase();

      const result = SchemaUtils.safeTransform(schema, { name: 123 }, transformer);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeDefined();
      }
    });

    it('should handle transformation errors', () => {
      const schema = z.object({ name: z.string() });
      const transformer = () => {
        throw new Error('Transform failed');
      };

      const result = SchemaUtils.safeTransform(schema, { name: 'john' }, transformer);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.errors[0].message).toContain('Transform failed');
      }
    });
  });
});

describe('Global Registry Functions', () => {
  beforeEach(() => {
    globalRegistry.clear();
  });

  it('should work with global registry functions', () => {
    const testSchema = z.object({ value: z.string() });
    
    registerSchema('global-test', testSchema);
    
    const result = validateData('global-test', { value: 'test' });
    expect(result.success).toBe(true);
  });

  it('should work with global partial registration', () => {
    const testPartial: AgentPartial<{ text: string }> = {
      schema: z.object({ text: z.string() }),
      template: () => '',
      styles: '',
      metadata: { description: '', category: 'utility', keywords: [], usageExamples: [] }
    };

    registerPartial('global-partial', testPartial);

    const result = validatePartialProps('global-partial', { text: 'hello' });
    expect(result.success).toBe(true);
  });
});