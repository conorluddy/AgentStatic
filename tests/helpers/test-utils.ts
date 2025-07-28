/**
 * General test utilities for AgentStatic
 *
 * Provides common testing utilities, mocks, and helpers
 * that are used across different test categories.
 */

import { vi } from 'vitest';
import { expect } from 'vitest';

/**
 * Common test data generators
 */
export class TestDataGenerator {
  /**
   * Generates a random string of specified length
   */
  static randomString(length: number = 10): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random email address
   */
  static randomEmail(): string {
    return `${this.randomString(8)}@${this.randomString(6)}.com`;
  }

  /**
   * Generates a random URL
   */
  static randomUrl(): string {
    return `https://${this.randomString(8)}.com/${this.randomString(6)}`;
  }

  /**
   * Generates a random date within the last year
   */
  static randomDate(): Date {
    const now = new Date();
    const yearAgo = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );
    const randomTime =
      yearAgo.getTime() + Math.random() * (now.getTime() - yearAgo.getTime());
    return new Date(randomTime);
  }

  /**
   * Generates a random array of strings
   */
  static randomStringArray(
    length: number = 3,
    itemLength: number = 6
  ): string[] {
    return Array.from({ length }, () => this.randomString(itemLength));
  }

  /**
   * Generates sample markdown content
   */
  static sampleMarkdown(
    includeImages: boolean = false,
    includeCode: boolean = false
  ): string {
    let content = `# ${this.randomString(15)}\n\n`;
    content += `This is a sample paragraph with **bold text** and *italic text*.\n\n`;
    content += `## ${this.randomString(10)}\n\n`;
    content += `Another paragraph with some [link text](${this.randomUrl()}).\n\n`;

    if (includeCode) {
      content += '```typescript\n';
      content += 'const example = "Hello, World!";\n';
      content += 'console.log(example);\n';
      content += '```\n\n';
    }

    if (includeImages) {
      content += `![Sample Image](${this.randomUrl()}/image.jpg "Image caption")\n\n`;
    }

    content += `- List item 1\n`;
    content += `- List item 2\n`;
    content += `- List item 3\n\n`;

    content += `> This is a blockquote with some important information.\n\n`;

    return content;
  }
}

/**
 * Performance testing utilities
 */
export class PerformanceTestUtils {
  /**
   * Measures execution time of a function
   */
  static async measureExecutionTime<T>(
    fn: () => Promise<T> | T
  ): Promise<{ result: T; time: number }> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    return {
      result,
      time: end - start,
    };
  }

  /**
   * Runs performance benchmark with multiple iterations
   */
  static async benchmark<T>(
    fn: () => Promise<T> | T,
    iterations: number = 100
  ): Promise<{
    results: T[];
    avgTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
  }> {
    const results: T[] = [];
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const { result, time } = await this.measureExecutionTime(fn);
      results.push(result);
      times.push(time);
    }

    const totalTime = times.reduce((sum, time) => sum + time, 0);
    const avgTime = totalTime / iterations;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    return {
      results,
      avgTime,
      minTime,
      maxTime,
      totalTime,
    };
  }

  /**
   * Validates that a function meets performance requirements
   */
  static async validatePerformance<T>(
    fn: () => Promise<T> | T,
    maxTime: number,
    iterations: number = 10
  ): Promise<void> {
    const benchmark = await this.benchmark(fn, iterations);

    expect(benchmark.avgTime).toBeLessThan(maxTime);
    expect(benchmark.maxTime).toBeLessThan(maxTime * 2); // Allow some variation
  }
}

/**
 * Mock utilities for testing
 */
export class MockUtils {
  /**
   * Creates a console mock that captures log output
   */
  static createConsoleMock() {
    return {
      log: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
    };
  }

  /**
   * Creates a file system mock
   */
  static createFileSystemMock() {
    const files = new Map<string, string>();

    return {
      files,
      readFile: vi.fn().mockImplementation((path: string) => {
        if (files.has(path)) {
          return Promise.resolve(files.get(path));
        }
        return Promise.reject(new Error(`File not found: ${path}`));
      }),
      writeFile: vi.fn().mockImplementation((path: string, content: string) => {
        files.set(path, content);
        return Promise.resolve();
      }),
      exists: vi.fn().mockImplementation((path: string) => {
        return Promise.resolve(files.has(path));
      }),
      unlink: vi.fn().mockImplementation((path: string) => {
        files.delete(path);
        return Promise.resolve();
      }),
      readdir: vi.fn().mockImplementation((dirPath: string) => {
        const paths = Array.from(files.keys())
          .filter(path => path.startsWith(dirPath))
          .map(path => path.substring(dirPath.length).split('/')[0])
          .filter(name => name && name.length > 0);

        return Promise.resolve([...new Set(paths)]);
      }),
    };
  }

  /**
   * Creates a fetch mock for API testing
   */
  static createFetchMock() {
    return vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      // Default mock response
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve({ url, options }),
        text: () => Promise.resolve(JSON.stringify({ url, options })),
        headers: new Headers(),
      });
    });
  }

  /**
   * Creates a timer mock for testing time-dependent code
   */
  static createTimerMock() {
    let currentTime = Date.now();

    return {
      now: vi.fn().mockImplementation(() => currentTime),
      advance: (ms: number) => {
        currentTime += ms;
      },
      reset: () => {
        currentTime = Date.now();
      },
    };
  }
}

/**
 * Assertion utilities for common test patterns
 */
export class AssertionUtils {
  /**
   * Asserts that a value is a valid URL
   */
  static isValidUrl(value: string): void {
    expect(() => new URL(value)).not.toThrow();
  }

  /**
   * Asserts that a value is a valid email
   */
  static isValidEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(value)).toBe(true);
  }

  /**
   * Asserts that a value is a valid date
   */
  static isValidDate(value: any): void {
    expect(value).toBeInstanceOf(Date);
    expect(!isNaN(value.getTime())).toBe(true);
  }

  /**
   * Asserts that HTML is well-formed
   */
  static isWellFormedHtml(html: string): void {
    expect(html).toBeTruthy();
    expect(typeof html).toBe('string');

    // Basic HTML structure checks
    const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (html.match(/<\/[^>]*>/g) || []).length;
    const selfClosingTags = (html.match(/<[^>]*\/>/g) || []).length;

    // Allow for self-closing tags and some flexibility
    expect(
      Math.abs(openTags - closeTags - selfClosingTags)
    ).toBeLessThanOrEqual(2);
  }

  /**
   * Asserts that CSS is valid
   */
  static isValidCss(css: string): void {
    expect(css).toBeTruthy();
    expect(typeof css).toBe('string');

    // Basic CSS structure checks
    const openBraces = (css.match(/{/g) || []).length;
    const closeBraces = (css.match(/}/g) || []).length;

    expect(openBraces).toBe(closeBraces);

    // Should not contain obvious syntax errors
    expect(css).not.toMatch(/;;/); // Double semicolons
    expect(css).not.toMatch(/{{/); // Double open braces
    expect(css).not.toMatch(/}}/); // Double close braces
  }

  /**
   * Asserts that a value matches one of several patterns
   */
  static matchesOneOf<T>(value: T, patterns: T[]): void {
    expect(patterns).toContain(value);
  }

  /**
   * Asserts that an array has unique items
   */
  static hasUniqueItems<T>(array: T[]): void {
    const unique = [...new Set(array)];
    expect(unique.length).toBe(array.length);
  }

  /**
   * Asserts that an object has required properties
   */
  static hasRequiredProperties(obj: any, requiredProps: string[]): void {
    requiredProps.forEach(prop => {
      expect(obj).toHaveProperty(prop);
      expect(obj[prop]).toBeDefined();
    });
  }
}

/**
 * Test environment utilities
 */
export class TestEnvironmentUtils {
  /**
   * Creates a clean test environment
   */
  static createCleanEnvironment() {
    // Clear any global state
    vi.clearAllMocks();

    // Reset any timers
    vi.useRealTimers();

    // Clear any mock implementations
    vi.restoreAllMocks();
  }

  /**
   * Sets up a test environment with common mocks
   */
  static setupTestEnvironment() {
    const consoleMock = MockUtils.createConsoleMock();
    const fsMock = MockUtils.createFileSystemMock();
    const fetchMock = MockUtils.createFetchMock();
    const timerMock = MockUtils.createTimerMock();

    // Replace global console
    global.console = consoleMock as any;

    // Replace global fetch
    global.fetch = fetchMock as any;

    return {
      console: consoleMock,
      fs: fsMock,
      fetch: fetchMock,
      timer: timerMock,
    };
  }

  /**
   * Tears down test environment
   */
  static teardownTestEnvironment() {
    this.createCleanEnvironment();

    // Restore original globals
    vi.resetAllMocks();
  }
}

/**
 * Async testing utilities
 */
export class AsyncTestUtils {
  /**
   * Waits for a condition to be true
   */
  static async waitFor(
    condition: () => boolean | Promise<boolean>,
    timeout: number = 5000,
    interval: number = 100
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }

      await this.sleep(interval);
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Sleeps for specified milliseconds
   */
  static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Tests that a promise rejects with specific error
   */
  static async expectToReject<T>(
    promise: Promise<T>,
    expectedError?: string | RegExp
  ): Promise<void> {
    try {
      await promise;
      throw new Error('Expected promise to reject, but it resolved');
    } catch (error) {
      if (expectedError) {
        if (typeof expectedError === 'string') {
          expect((error as Error).message).toContain(expectedError);
        } else {
          expect((error as Error).message).toMatch(expectedError);
        }
      }
    }
  }

  /**
   * Tests that a promise resolves within specified time
   */
  static async expectToResolveWithin<T>(
    promise: Promise<T>,
    timeout: number = 1000
  ): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(new Error(`Promise did not resolve within ${timeout}ms`)),
          timeout
        )
      ),
    ]);
  }
}

/**
 * Error testing utilities
 */
export class ErrorTestUtils {
  /**
   * Creates a custom error for testing
   */
  static createTestError(message: string, code?: string): Error {
    const error = new Error(message);
    if (code) {
      (error as any).code = code;
    }
    return error;
  }

  /**
   * Tests error handling with specific error patterns
   */
  static testErrorHandling<T>(
    fn: () => T,
    expectedErrorMessage?: string | RegExp
  ): void {
    expect(() => fn()).toThrow();

    if (expectedErrorMessage) {
      expect(() => fn()).toThrow(expectedErrorMessage);
    }
  }

  /**
   * Tests async error handling
   */
  static async testAsyncErrorHandling<T>(
    fn: () => Promise<T>,
    expectedErrorMessage?: string | RegExp
  ): Promise<void> {
    await expect(fn()).rejects.toThrow();

    if (expectedErrorMessage) {
      await expect(fn()).rejects.toThrow(expectedErrorMessage);
    }
  }
}
