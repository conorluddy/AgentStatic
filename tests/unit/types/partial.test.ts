/**
 * Tests for AgentPartial interface and core types
 *
 * Validates TypeScript strict mode compliance, Zod integration,
 * and core partial system functionality.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import type {
  AgentPartial,
  TemplateHelpers,
  PartialMetadata,
  ParsedPartialProps,
} from '@/types/partial.js';

describe('AgentPartial Interface', () => {
  describe('Type Safety', () => {
    it('should enforce strict TypeScript typing', () => {
      // This test validates that TypeScript strict mode is working
      // by ensuring we can create type-safe partial definitions

      interface TestProps {
        title: string;
        count: number;
        optional?: boolean;
      }

      const testSchema = z.object({
        title: z.string(),
        count: z.number(),
        optional: z.boolean().optional(),
      });

      const testPartial: AgentPartial<TestProps> = {
        schema: testSchema,
        template: (props, helpers) => {
          // TypeScript should enforce correct prop types
          const title: string = props.title; // ✅ Should work
          const count: number = props.count; // ✅ Should work
          const optional: boolean | undefined = props.optional; // ✅ Should work

          // TypeScript should provide helper autocomplete
          const formatted = helpers.formatDate(new Date());

          return `<div>${title}: ${count}</div>`;
        },
        styles: '.test { color: blue; }',
        metadata: {
          description: 'Test partial',
          category: 'utility',
          keywords: ['test'],
          usageExamples: [
            {
              description: 'Basic usage',
              props: { title: 'Test', count: 42 },
            },
          ],
        },
      };

      // Verify the partial is properly typed
      expect(testPartial).toBeDefined();
      expect(typeof testPartial.template).toBe('function');
      expect(typeof testPartial.styles).toBe('string');
    });

    it('should prevent any types in strict mode', () => {
      // This test would fail compilation if we used `any` types
      interface StrictProps {
        value: string; // Must be explicitly typed
      }

      const strictSchema = z.object({
        value: z.string(),
      });

      const strictPartial: AgentPartial<StrictProps> = {
        schema: strictSchema,
        template: props => {
          // TypeScript should enforce no implicit any
          return props.value.toUpperCase(); // ✅ String methods available
        },
        styles: '',
        metadata: {
          description: 'Strict partial',
          category: 'utility',
          keywords: [],
          usageExamples: [],
        },
      };

      expect(strictPartial.schema).toBe(strictSchema);
    });
  });

  describe('Zod Schema Integration', () => {
    it('should validate props with Zod schemas', () => {
      const schema = z.object({
        title: z.string().min(1),
        count: z.number().positive(),
        tags: z.array(z.string()).default([]),
      });

      type Props = z.infer<typeof schema>;

      // Valid props should pass
      const validProps: Props = {
        title: 'Valid Title',
        count: 42,
        tags: ['test', 'zod'],
      };

      const validResult = schema.safeParse(validProps);
      expect(validResult.success).toBe(true);

      if (validResult.success) {
        expect(validResult.data.title).toBe('Valid Title');
        expect(validResult.data.count).toBe(42);
        expect(validResult.data.tags).toEqual(['test', 'zod']);
      }

      // Invalid props should fail
      const invalidProps = {
        title: '', // Empty string should fail min(1)
        count: -5, // Negative should fail positive()
        tags: ['valid'],
      };

      const invalidResult = schema.safeParse(invalidProps);
      expect(invalidResult.success).toBe(false);
    });

    it('should handle optional properties correctly', () => {
      const schema = z.object({
        required: z.string(),
        optional: z.string().optional(),
        withDefault: z.boolean().default(true),
      });

      type Props = z.infer<typeof schema>;

      // Test with minimal props
      const minimalProps = { required: 'test' };
      const result = schema.safeParse(minimalProps);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.required).toBe('test');
        expect(result.data.optional).toBeUndefined();
        expect(result.data.withDefault).toBe(true); // Default applied
      }
    });
  });

  describe('Template Function', () => {
    it('should receive validated props and helpers', () => {
      interface TestProps {
        message: string;
      }

      const schema = z.object({
        message: z.string(),
      });

      // Mock template helpers
      const mockHelpers: TemplateHelpers = {
        formatDate: () => 'formatted-date',
        timeAgo: () => '2 hours ago',
        truncate: (text, length) => text.slice(0, length),
        slugify: text => text.toLowerCase().replace(/\s+/g, '-'),
        markdown: content => `<p>${content}</p>`,
        optimizeImage: src => src,
        generateSrcSet: () => 'srcset',
        chunk: (array, size) => [],
        groupBy: () => ({}),
        sortBy: array => array,
        url: path => path,
        isActive: () => false,
        renderPartial: () => '',
        conditionalClass: (condition, className) => (condition ? className : ''),
      };

      const testPartial: AgentPartial<TestProps> = {
        schema,
        template: (props, helpers) => {
          // Should receive validated props
          expect(typeof props.message).toBe('string');

          // Should receive helpers
          expect(typeof helpers.formatDate).toBe('function');
          expect(helpers.truncate('hello world', 5)).toBe('hello');

          return `<div>${props.message}</div>`;
        },
        styles: '',
        metadata: {
          description: 'Test partial',
          category: 'utility',
          keywords: [],
          usageExamples: [],
        },
      };

      const result = testPartial.template({ message: 'Hello' }, mockHelpers);
      expect(result).toBe('<div>Hello</div>');
    });
  });

  describe('Metadata Validation', () => {
    it('should require complete metadata', () => {
      interface SimpleProps {
        text: string;
      }

      const metadata: PartialMetadata<SimpleProps> = {
        description: 'A simple test partial',
        category: 'content',
        keywords: ['simple', 'test'],
        usageExamples: [
          {
            description: 'Basic text display',
            props: { text: 'Hello World' },
            notes: 'Simple example',
          },
        ],
        version: '1.0.0',
        author: 'Test Author',
      };

      expect(metadata.description).toBe('A simple test partial');
      expect(metadata.category).toBe('content');
      expect(metadata.keywords).toContain('simple');
      expect(metadata.usageExamples).toHaveLength(1);
      expect(metadata.usageExamples[0].props.text).toBe('Hello World');
    });

    it('should support all partial categories', () => {
      const categories = [
        'layout',
        'content',
        'media',
        'navigation',
        'interactive',
        'utility',
      ] as const;

      categories.forEach(category => {
        const metadata: PartialMetadata<{}> = {
          description: `Test ${category} partial`,
          category,
          keywords: [category],
          usageExamples: [],
        };

        expect(metadata.category).toBe(category);
      });
    });
  });

  describe('createPartialSchema Helper', () => {
    it('should create a Zod object schema from shape', async () => {
      // Import the helper function
      const { createPartialSchema } = await import('@/types/partial.js');

      const schema = createPartialSchema({
        title: z.string(),
        count: z.number(),
        active: z.boolean(),
      });

      // Validate that it creates a proper Zod schema
      const validData = { title: 'Test', count: 42, active: true };
      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should handle optional fields in schema', async () => {
      const { createPartialSchema } = await import('@/types/partial.js');

      const schema = createPartialSchema({
        required: z.string(),
        optional: z.string().optional(),
      });

      const result = schema.safeParse({ required: 'test' });
      expect(result.success).toBe(true);
    });

    it('should validate against invalid data', async () => {
      const { createPartialSchema } = await import('@/types/partial.js');

      const schema = createPartialSchema({
        number: z.number(),
      });

      const result = schema.safeParse({ number: 'not a number' });
      expect(result.success).toBe(false);
    });
  });
});
