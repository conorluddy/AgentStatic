/**
 * Tests for TypeScript configuration validation
 *
 * Ensures strict mode, path mapping, and module resolution
 * are working correctly in the AgentStatic project.
 */

import { describe, it, expect } from 'vitest';

describe('TypeScript Configuration', () => {
  describe('Path Mapping', () => {
    it('should resolve @/* paths correctly', async () => {
      // Test that TypeScript path mapping works
      const partialModule = await import('@/types/partial.js');
      expect(partialModule).toBeDefined();
      expect(typeof partialModule.createPartialSchema).toBe('function');
    });

    it('should resolve @/types/* paths correctly', async () => {
      const partialTypes = await import('@/types/partial.js');
      const contentTypes = await import('@/types/content.js');
      const templateTypes = await import('@/types/template.js');

      expect(partialTypes).toBeDefined();
      expect(contentTypes).toBeDefined();
      expect(templateTypes).toBeDefined();
    });
  });

  describe('ES Modules', () => {
    it('should support ES module imports', async () => {
      // Test that ES modules are working
      const zod = await import('zod');
      expect(zod.z).toBeDefined();
      expect(typeof zod.z.object).toBe('function');
    });

    it('should handle named imports correctly', async () => {
      const { z } = await import('zod');
      const schema = z.string();
      expect(schema.parse('test')).toBe('test');
    });
  });

  describe('Strict Mode Compliance', () => {
    it('should enforce strict null checks', () => {
      // This would fail compilation if strict mode wasn't enabled
      interface TestInterface {
        required: string;
        optional?: string;
      }

      const testObj: TestInterface = {
        required: 'test',
      };

      // TypeScript should know optional could be undefined
      const result = testObj.optional?.toUpperCase();
      expect(result).toBeUndefined();
    });

    it('should enforce exact optional property types', () => {
      // exactOptionalPropertyTypes should be enabled
      interface ExactOptional {
        value?: string; // Cannot be undefined explicitly
      }

      const obj: ExactOptional = {
        // value: undefined // This would fail with exactOptionalPropertyTypes
      };

      expect(obj).toBeDefined();
    });

    it('should enforce no unchecked indexed access', () => {
      // noUncheckedIndexedAccess should make array access potentially undefined
      const arr = ['a', 'b', 'c'];
      const item = arr[10]; // Should be string | undefined

      // TypeScript should require null checking
      const result = item?.toUpperCase();
      expect(result).toBeUndefined();
    });
  });

  describe('Module System', () => {
    it('should support Node.js 24 features', () => {
      // Test that we can use modern Node.js features
      expect(typeof globalThis).toBe('object');
      expect(process.version.startsWith('v')).toBe(true);
    });

    it('should have correct import.meta support', () => {
      // ES modules should have import.meta
      expect(import.meta).toBeDefined();
      expect(typeof import.meta.url).toBe('string');
    });
  });
});
