/**
 * Partial testing utilities for AgentStatic
 *
 * Provides comprehensive testing helpers for partial validation,
 * rendering, composition, and schema testing workflows.
 */

import { z } from 'zod';
import { expect } from 'vitest';
import type {
  AgentPartial,
  TemplateHelpers,
  ParsedPartialProps,
  PartialRenderResult,
} from '@/types/partial';
import { mockTemplateHelpers } from '../fixtures/helpers';

/**
 * Test utilities for partial schema validation
 */
export class PartialSchemaValidator {
  /**
   * Validates that a partial's schema correctly validates valid props
   */
  static validateValidProps<T>(partial: AgentPartial<T>, validProps: T): void {
    const result = partial.schema.safeParse(validProps);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validProps);
    }
  }

  /**
   * Validates that a partial's schema correctly rejects invalid props
   */
  static validateInvalidProps<T>(
    partial: AgentPartial<T>,
    invalidProps: any
  ): void {
    const result = partial.schema.safeParse(invalidProps);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  }

  /**
   * Validates that schema descriptions are present for AI understanding
   */
  static validateSchemaDescriptions<T>(partial: AgentPartial<T>): void {
    const schema = partial.schema;

    // Check if schema has descriptions (for Zod objects)
    if (schema instanceof z.ZodObject) {
      const shape = schema.shape;
      const keys = Object.keys(shape);

      expect(keys.length).toBeGreaterThan(0);

      // At least some fields should have descriptions
      const descriptionsFound = keys.some(key => {
        const field = shape[key];
        return field.description && field.description.length > 0;
      });

      expect(descriptionsFound).toBe(true);
    }
  }

  /**
   * Validates that default values work correctly
   */
  static validateDefaults<T>(
    partial: AgentPartial<T>,
    minimalProps: Partial<T>
  ): void {
    const result = partial.schema.safeParse(minimalProps);
    expect(result.success).toBe(true);

    if (result.success) {
      // Should have filled in defaults
      expect(Object.keys(result.data as object).length).toBeGreaterThanOrEqual(
        Object.keys(minimalProps as object).length
      );
    }
  }
}

/**
 * Test utilities for partial template rendering
 */
export class PartialTemplateRenderer {
  private helpers: TemplateHelpers;

  constructor(helpers: TemplateHelpers = mockTemplateHelpers) {
    this.helpers = helpers;
  }

  /**
   * Renders a partial with given props and returns the HTML
   */
  render<T>(partial: AgentPartial<T>, props: T): string {
    // First validate props
    const validatedProps = partial.schema.parse(props);

    // Then render
    return partial.template(validatedProps, this.helpers);
  }

  /**
   * Renders a partial safely, returning result or error
   */
  safRender<T>(
    partial: AgentPartial<T>,
    props: any
  ): { success: true; html: string } | { success: false; error: Error } {
    try {
      const html = this.render(partial, props);
      return { success: true, html };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  /**
   * Validates that rendered HTML contains expected content
   */
  validateContent<T>(
    partial: AgentPartial<T>,
    props: T,
    expectedContent: string[]
  ): void {
    const html = this.render(partial, props);

    expectedContent.forEach(content => {
      expect(html).toContain(content);
    });
  }

  /**
   * Validates that rendered HTML has proper structure
   */
  validateStructure<T>(
    partial: AgentPartial<T>,
    props: T,
    expectations: {
      hasRootElement?: boolean;
      rootTag?: string;
      hasClasses?: string[];
      hasAttributes?: Record<string, string>;
    }
  ): void {
    const html = this.render(partial, props);

    if (expectations.hasRootElement) {
      expect(html.trim().startsWith('<')).toBe(true);
      expect(html.trim().endsWith('>')).toBe(true);
    }

    if (expectations.rootTag) {
      expect(html.trim().startsWith(`<${expectations.rootTag}`)).toBe(true);
      expect(html.includes(`</${expectations.rootTag}>`)).toBe(true);
    }

    if (expectations.hasClasses) {
      expectations.hasClasses.forEach(className => {
        expect(html).toContain(`class="${className}"`);
      });
    }

    if (expectations.hasAttributes) {
      Object.entries(expectations.hasAttributes).forEach(([attr, value]) => {
        expect(html).toContain(`${attr}="${value}"`);
      });
    }
  }

  /**
   * Validates conditional rendering logic
   */
  validateConditionals<T>(
    partial: AgentPartial<T>,
    propsWithContent: T,
    propsWithoutContent: T,
    conditionalSelectors: string[]
  ): void {
    const htmlWith = this.render(partial, propsWithContent);
    const htmlWithout = this.render(partial, propsWithoutContent);

    conditionalSelectors.forEach(selector => {
      expect(htmlWith).toContain(selector);
      expect(htmlWithout).not.toContain(selector);
    });
  }
}

/**
 * Test utilities for partial CSS validation
 */
export class PartialStyleValidator {
  /**
   * Validates that CSS is properly scoped
   */
  static validateScoping(
    partial: AgentPartial<any>,
    expectedScope: string
  ): void {
    const styles = partial.styles;
    expect(styles).toBeTruthy();
    expect(styles.length).toBeGreaterThan(0);

    // Should contain scoped selectors
    const lines = styles.split('\n').filter(line => line.trim().length > 0);
    const hasStyledElements = lines.some(
      line => line.includes(expectedScope) || line.includes('.')
    );

    expect(hasStyledElements).toBe(true);
  }

  /**
   * Validates that CSS doesn't contain global selectors that could conflict
   */
  static validateNoGlobalConflicts(partial: AgentPartial<any>): void {
    const styles = partial.styles;
    const dangerousSelectors = [
      'body',
      'html',
      '*',
      'div',
      'span',
      'p',
      'h1',
      'h2',
      'h3',
    ];

    dangerousSelectors.forEach(selector => {
      // Should not have bare element selectors (they should be scoped)
      const bareSelector = new RegExp(`^\\s*${selector}\\s*{`, 'm');
      expect(styles).not.toMatch(bareSelector);
    });
  }

  /**
   * Validates responsive CSS patterns
   */
  static validateResponsivePatterns(partial: AgentPartial<any>): void {
    if (partial.responsive) {
      const styles = partial.styles;
      const hasMediaQueries = styles.includes('@media');
      const hasFlexbox =
        styles.includes('display: flex') || styles.includes('flex:');
      const hasGrid =
        styles.includes('display: grid') || styles.includes('grid-');

      // Should have some responsive patterns if responsive config exists
      expect(hasMediaQueries || hasFlexbox || hasGrid).toBe(true);
    }
  }
}

/**
 * Test utilities for partial metadata validation
 */
export class PartialMetadataValidator {
  /**
   * Validates that metadata is complete and AI-friendly
   */
  static validateCompleteness<T>(partial: AgentPartial<T>): void {
    const metadata = partial.metadata;

    // Required fields
    expect(metadata.description).toBeTruthy();
    expect(metadata.description.length).toBeGreaterThan(10);
    expect(metadata.category).toBeTruthy();
    expect(metadata.keywords).toBeTruthy();
    expect(metadata.keywords.length).toBeGreaterThan(0);
    expect(metadata.usageExamples).toBeTruthy();
    expect(metadata.usageExamples.length).toBeGreaterThan(0);

    // Keywords should be relevant strings
    metadata.keywords.forEach(keyword => {
      expect(typeof keyword).toBe('string');
      expect(keyword.length).toBeGreaterThan(0);
    });
  }

  /**
   * Validates that usage examples are valid
   */
  static validateUsageExamples<T>(partial: AgentPartial<T>): void {
    const examples = partial.metadata.usageExamples;

    examples.forEach(example => {
      expect(example.description).toBeTruthy();
      expect(example.description.length).toBeGreaterThan(5);
      expect(example.props).toBeTruthy();

      // Props should be valid according to schema
      const result = partial.schema.safeParse(example.props);
      expect(result.success).toBe(true);
    });
  }

  /**
   * Validates category consistency
   */
  static validateCategory<T>(partial: AgentPartial<T>): void {
    const validCategories = [
      'layout',
      'content',
      'media',
      'navigation',
      'interactive',
      'utility',
    ];
    expect(validCategories).toContain(partial.metadata.category);
  }
}

/**
 * Test utilities for partial composition
 */
export class PartialCompositionTester {
  private renderer: PartialTemplateRenderer;

  constructor(helpers: TemplateHelpers = mockTemplateHelpers) {
    this.renderer = new PartialTemplateRenderer(helpers);
  }

  /**
   * Tests that partial dependencies are resolved correctly
   */
  validateDependencies<T>(
    partial: AgentPartial<T>,
    availablePartials: string[]
  ): void {
    if (partial.dependencies) {
      partial.dependencies.forEach(dep => {
        expect(availablePartials).toContain(dep);
      });
    }
  }

  /**
   * Tests partial composition with multiple partials
   */
  testComposition<T1, T2>(
    parentPartial: AgentPartial<T1>,
    childPartial: AgentPartial<T2>,
    parentProps: T1,
    childProps: T2
  ): void {
    // Both partials should render individually
    const parentHtml = this.renderer.render(parentPartial, parentProps);
    const childHtml = this.renderer.render(childPartial, childProps);

    expect(parentHtml).toBeTruthy();
    expect(childHtml).toBeTruthy();

    // If parent uses renderPartial helper, it should work
    const helpersWithChild = {
      ...mockTemplateHelpers,
      renderPartial: <T>(name: string, props: T) => {
        if (name === childPartial.metadata.description) {
          return this.renderer.render(childPartial, props as any);
        }
        return mockTemplateHelpers.renderPartial(name, props);
      },
    };

    const rendererWithChild = new PartialTemplateRenderer(helpersWithChild);
    const composedHtml = rendererWithChild.render(parentPartial, parentProps);

    expect(composedHtml).toBeTruthy();
  }
}

/**
 * Comprehensive test suite runner for partials
 */
export class PartialTestSuite {
  /**
   * Runs complete validation suite for a partial
   */
  static runComplete<T>(
    partial: AgentPartial<T>,
    validProps: T,
    invalidProps: any,
    minimalProps: Partial<T>,
    expectedContent: string[] = [],
    expectedScope: string = ''
  ): void {
    // Schema validation
    PartialSchemaValidator.validateValidProps(partial, validProps);
    PartialSchemaValidator.validateInvalidProps(partial, invalidProps);
    PartialSchemaValidator.validateSchemaDescriptions(partial);
    PartialSchemaValidator.validateDefaults(partial, minimalProps);

    // Template rendering
    const renderer = new PartialTemplateRenderer();
    renderer.validateContent(partial, validProps, expectedContent);

    // Style validation
    if (expectedScope) {
      PartialStyleValidator.validateScoping(partial, expectedScope);
    }
    PartialStyleValidator.validateNoGlobalConflicts(partial);
    PartialStyleValidator.validateResponsivePatterns(partial);

    // Metadata validation
    PartialMetadataValidator.validateCompleteness(partial);
    PartialMetadataValidator.validateUsageExamples(partial);
    PartialMetadataValidator.validateCategory(partial);
  }

  /**
   * Creates a quick test function for a partial
   */
  static createQuickTest<T>(
    name: string,
    partial: AgentPartial<T>,
    testProps: {
      valid: T;
      invalid: any;
      minimal: Partial<T>;
    }
  ) {
    return () => {
      PartialTestSuite.runComplete(
        partial,
        testProps.valid,
        testProps.invalid,
        testProps.minimal,
        [(testProps.valid as any).title || 'test'], // Basic content expectation
        name.toLowerCase()
      );
    };
  }
}

/**
 * Performance testing utilities for partials
 */
export class PartialPerformanceTester {
  /**
   * Measures rendering performance
   */
  static measureRenderTime<T>(
    partial: AgentPartial<T>,
    props: T,
    iterations: number = 100
  ): number {
    const renderer = new PartialTemplateRenderer();

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      renderer.render(partial, props);
    }
    const end = performance.now();

    return (end - start) / iterations; // Average time per render
  }

  /**
   * Validates that rendering meets performance targets
   */
  static validatePerformance<T>(
    partial: AgentPartial<T>,
    props: T,
    maxRenderTime: number = 5, // 5ms per render
    iterations: number = 100
  ): void {
    const avgTime = this.measureRenderTime(partial, props, iterations);
    expect(avgTime).toBeLessThan(maxRenderTime);
  }
}
