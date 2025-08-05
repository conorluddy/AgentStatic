/**
 * Content testing utilities for AgentStatic
 *
 * Provides comprehensive testing helpers for content processing,
 * frontmatter validation, markdown rendering, and content discovery.
 */

import { expect } from 'vitest';
import { z } from 'zod';
import type {
  ContentFile,
  ProcessedContent,
  Frontmatter,
  ContentQuery,
  ContentCollection,
  ContentDiscoveryConfig,
} from '@/types/content';

/**
 * Test utilities for frontmatter validation
 */
export class FrontmatterValidator {
  /**
   * Validates frontmatter against base schema
   */
  static validateBaseFrontmatter(frontmatter: Partial<Frontmatter>): void {
    expect(frontmatter.title).toBeTruthy();
    expect(typeof frontmatter.title).toBe('string');
    if (frontmatter.title) {
      expect(frontmatter.title.length).toBeGreaterThan(0);
    }

    if (frontmatter.description) {
      expect(typeof frontmatter.description).toBe('string');
      expect(frontmatter.description.length).toBeGreaterThan(0);
    }

    if (frontmatter.publishedAt) {
      expect(frontmatter.publishedAt).toBeInstanceOf(Date);
    }

    if (frontmatter.updatedAt) {
      expect(frontmatter.updatedAt).toBeInstanceOf(Date);
    }

    if (frontmatter.tags) {
      expect(Array.isArray(frontmatter.tags)).toBe(true);
      frontmatter.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
    }
  }

  /**
   * Validates SEO-specific frontmatter
   */
  static validateSEOFrontmatter(frontmatter: Frontmatter): void {
    if (frontmatter.metaTitle) {
      expect(typeof frontmatter.metaTitle).toBe('string');
      expect(frontmatter.metaTitle.length).toBeLessThanOrEqual(60); // SEO best practice
    }

    if (frontmatter.metaDescription) {
      expect(typeof frontmatter.metaDescription).toBe('string');
      expect(frontmatter.metaDescription.length).toBeLessThanOrEqual(160); // SEO best practice
    }

    if (frontmatter.canonicalUrl) {
      expect(typeof frontmatter.canonicalUrl).toBe('string');
      expect(() => new URL(frontmatter.canonicalUrl!)).not.toThrow();
    }

    if (frontmatter.openGraph) {
      const og = frontmatter.openGraph;

      if (og.title) {
        expect(typeof og.title).toBe('string');
        expect(og.title.length).toBeGreaterThan(0);
      }

      if (og.description) {
        expect(typeof og.description).toBe('string');
        expect(og.description.length).toBeGreaterThan(0);
      }

      if (og.image) {
        expect(typeof og.image).toBe('string');
        expect(() => new URL(og.image!)).not.toThrow();
      }

      if (og.type) {
        expect(['website', 'article', 'profile']).toContain(og.type);
      }
    }
  }

  /**
   * Validates that frontmatter parses correctly with Zod schema
   */
  static validateWithSchema<T>(
    frontmatter: unknown,
    schema: z.ZodSchema<T>
  ): T {
    const result = schema.safeParse(frontmatter);
    expect(result.success).toBe(true);

    if (result.success) {
      return result.data;
    }

    throw new Error('Schema validation failed');
  }
}

/**
 * Test utilities for content file processing
 */
export class ContentFileProcessor {
  /**
   * Creates a mock content file for testing
   */
  static createMockContentFile(
    overrides: Partial<ContentFile> = {}
  ): ContentFile {
    return {
      filePath: '/content/test.md',
      relativePath: 'test.md',
      urlPath: '/test',
      frontmatter: {
        title: 'Test Content',
        description: 'Test description',
        draft: false,
        tags: ['test'],
        noindex: false,
        nofollow: false,
      },
      content: '# Test Content\n\nThis is test content.',
      excerpt: 'This is test content.',
      wordCount: 25,
      readingTime: 1,
      lastModified: new Date('2024-01-15T10:00:00Z'),
      fileSize: 256,
      ...overrides,
    };
  }

  /**
   * Validates content file structure
   */
  static validateContentFile(contentFile: ContentFile): void {
    // File paths
    expect(contentFile.filePath).toBeTruthy();
    expect(contentFile.relativePath).toBeTruthy();
    expect(contentFile.urlPath).toBeTruthy();
    expect(contentFile.urlPath.startsWith('/')).toBe(true);

    // Content
    expect(contentFile.content).toBeTruthy();
    expect(typeof contentFile.content).toBe('string');

    // Frontmatter
    expect(contentFile.frontmatter).toBeTruthy();
    FrontmatterValidator.validateBaseFrontmatter(contentFile.frontmatter);

    // Metadata
    expect(contentFile.wordCount).toBeGreaterThan(0);
    expect(contentFile.readingTime).toBeGreaterThan(0);
    expect(contentFile.lastModified).toBeInstanceOf(Date);
    expect(contentFile.fileSize).toBeGreaterThan(0);

    // Optional excerpt
    if (contentFile.excerpt) {
      expect(typeof contentFile.excerpt).toBe('string');
      expect(contentFile.excerpt.length).toBeGreaterThan(0);
    }
  }

  /**
   * Validates processed content
   */
  static validateProcessedContent(processedContent: ProcessedContent): void {
    // Should have all ContentFile properties
    this.validateContentFile(processedContent);

    // HTML should be generated
    expect(processedContent.html).toBeTruthy();
    expect(typeof processedContent.html).toBe('string');
    expect(processedContent.html.includes('<')).toBe(true); // Should contain HTML tags

    // Table of contents (if present)
    if (processedContent.tableOfContents) {
      expect(Array.isArray(processedContent.tableOfContents)).toBe(true);
      processedContent.tableOfContents.forEach(tocItem => {
        expect(tocItem.id).toBeTruthy();
        expect(tocItem.title).toBeTruthy();
        expect(typeof tocItem.level).toBe('number');
        expect(tocItem.level).toBeGreaterThan(0);
        expect(Array.isArray(tocItem.children)).toBe(true);
      });
    }

    // Related content (if present)
    if (processedContent.relatedContent) {
      expect(Array.isArray(processedContent.relatedContent)).toBe(true);
      processedContent.relatedContent.forEach(related => {
        this.validateContentFile(related);
      });
    }

    // Schema.org data (if present)
    if (processedContent.schema) {
      expect(typeof processedContent.schema).toBe('object');
      expect(processedContent.schema['@context']).toBe('https://schema.org');
      expect(processedContent.schema['@type']).toBeTruthy();
    }
  }
}

/**
 * Test utilities for content queries and filtering
 */
export class ContentQueryTester {
  /**
   * Tests content filtering by tags
   */
  static testTagFiltering(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    if (!query.tags || query.tags.length === 0) {
      return content;
    }

    const filtered = content.filter(item => {
      return query.tags!.some(queryTag =>
        item.frontmatter.tags?.includes(queryTag)
      );
    });

    // Validate filtering worked
    filtered.forEach(item => {
      const hasMatchingTag = query.tags!.some(queryTag =>
        item.frontmatter.tags?.includes(queryTag)
      );
      expect(hasMatchingTag).toBe(true);
    });

    return filtered;
  }

  /**
   * Tests content filtering by author
   */
  static testAuthorFiltering(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    if (!query.author) {
      return content;
    }

    const filtered = content.filter(
      item => item.frontmatter.author === query.author
    );

    // Validate filtering worked
    filtered.forEach(item => {
      expect(item.frontmatter.author).toBe(query.author);
    });

    return filtered;
  }

  /**
   * Tests content filtering by draft status
   */
  static testDraftFiltering(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    if (query.draft === undefined) {
      return content;
    }

    const filtered = content.filter(
      item => item.frontmatter.draft === query.draft
    );

    // Validate filtering worked
    filtered.forEach(item => {
      expect(item.frontmatter.draft).toBe(query.draft);
    });

    return filtered;
  }

  /**
   * Tests content filtering by date range
   */
  static testDateFiltering(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    let filtered = content;

    if (query.publishedAfter) {
      filtered = filtered.filter(
        item =>
          item.frontmatter.publishedAt &&
          item.frontmatter.publishedAt >= query.publishedAfter!
      );
    }

    if (query.publishedBefore) {
      filtered = filtered.filter(
        item =>
          item.frontmatter.publishedAt &&
          item.frontmatter.publishedAt <= query.publishedBefore!
      );
    }

    return filtered;
  }

  /**
   * Tests content sorting
   */
  static testSorting(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    if (!query.sortBy) {
      return content;
    }

    const sorted = [...content].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (query.sortBy) {
        case 'publishedAt':
          aVal = a.frontmatter.publishedAt?.getTime() || 0;
          bVal = b.frontmatter.publishedAt?.getTime() || 0;
          break;
        case 'updatedAt':
          aVal = a.frontmatter.updatedAt?.getTime() || 0;
          bVal = b.frontmatter.updatedAt?.getTime() || 0;
          break;
        case 'title':
          aVal = a.frontmatter.title.toLowerCase();
          bVal = b.frontmatter.title.toLowerCase();
          break;
        case 'readingTime':
          aVal = a.readingTime;
          bVal = b.readingTime;
          break;
        default:
          return 0;
      }

      if (query.sortOrder === 'desc') {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      } else {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      }
    });

    return sorted;
  }

  /**
   * Tests pagination
   */
  static testPagination(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    const offset = query.offset || 0;
    const limit = query.limit;

    if (limit === undefined) {
      return content.slice(offset);
    }

    const paginated = content.slice(offset, offset + limit);

    // Validate pagination
    expect(paginated.length).toBeLessThanOrEqual(limit);
    if (content.length > offset) {
      expect(paginated.length).toBeGreaterThan(0);
    }

    return paginated;
  }

  /**
   * Runs complete query test
   */
  static runCompleteQuery(
    content: ContentFile[],
    query: ContentQuery
  ): ContentFile[] {
    let result = content;

    // Apply filters
    result = this.testTagFiltering(result, query);
    result = this.testAuthorFiltering(result, query);
    result = this.testDraftFiltering(result, query);
    result = this.testDateFiltering(result, query);

    // Apply sorting
    result = this.testSorting(result, query);

    // Apply pagination
    result = this.testPagination(result, query);

    return result;
  }
}

/**
 * Test utilities for content collections
 */
export class ContentCollectionTester {
  /**
   * Validates content collection configuration
   */
  static validateCollection(collection: ContentCollection): void {
    expect(collection.name).toBeTruthy();
    expect(typeof collection.name).toBe('string');
    expect(collection.pattern).toBeTruthy();
    expect(typeof collection.pattern).toBe('string');

    expect(['publishedAt', 'updatedAt', 'title', 'readingTime']).toContain(
      collection.defaultSort
    );

    expect(typeof collection.generateIndex).toBe('boolean');
    expect(typeof collection.generateTags).toBe('boolean');
    expect(typeof collection.generatePagination).toBe('boolean');

    if (collection.generatePagination && collection.itemsPerPage) {
      expect(collection.itemsPerPage).toBeGreaterThan(0);
    }
  }

  /**
   * Tests collection pattern matching
   */
  static testPatternMatching(pattern: string, filePaths: string[]): string[] {
    // Simple glob pattern matching for testing
    const regexPattern = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '.');

    const regex = new RegExp(`^${regexPattern}$`);

    return filePaths.filter(path => regex.test(path));
  }
}

/**
 * Test utilities for content discovery
 */
export class ContentDiscoveryTester {
  /**
   * Validates content discovery configuration
   */
  static validateDiscoveryConfig(config: ContentDiscoveryConfig): void {
    expect(config.contentDir).toBeTruthy();
    expect(typeof config.contentDir).toBe('string');

    expect(Array.isArray(config.includePatterns)).toBe(true);
    expect(config.includePatterns.length).toBeGreaterThan(0);

    expect(Array.isArray(config.excludePatterns)).toBe(true);

    expect(typeof config.defaultFrontmatter).toBe('object');

    const options = config.processingOptions;
    expect(typeof options.generateExcerpt).toBe('boolean');
    expect(typeof options.excerptLength).toBe('number');
    expect(options.excerptLength).toBeGreaterThan(0);

    expect(typeof options.generateTOC).toBe('boolean');
    expect(typeof options.tocMaxDepth).toBe('number');
    expect(options.tocMaxDepth).toBeGreaterThan(0);

    expect(typeof options.calculateReadingTime).toBe('boolean');
    expect(typeof options.wordsPerMinute).toBe('number');
    expect(options.wordsPerMinute).toBeGreaterThan(0);
  }

  /**
   * Tests reading time calculation
   */
  static testReadingTimeCalculation(
    content: string,
    wordsPerMinute: number = 200
  ): number {
    const wordCount = content
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    expect(readingTime).toBeGreaterThan(0);

    return readingTime;
  }

  /**
   * Tests excerpt generation
   */
  static testExcerptGeneration(
    content: string,
    maxLength: number = 160
  ): string {
    const plainText = content
      .replace(/^#+ .+$/gm, '') // Remove headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.+?)\*/g, '$1') // Remove italic
      .replace(/`(.+?)`/g, '$1') // Remove code
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove link markdown
      .trim();

    const sentences = plainText
      .split(/[.!?]+/)
      .filter(s => s.trim().length > 0);

    if (sentences.length === 0) return '';

    let excerpt = sentences[0]?.trim() || '';
    let i = 1;

    while (
      i < sentences.length &&
      sentences[i] &&
      excerpt.length + (sentences[i]?.length || 0) < maxLength
    ) {
      excerpt += '. ' + sentences[i]?.trim();
      i++;
    }

    if (excerpt.length > maxLength) {
      excerpt = excerpt.substring(0, maxLength - 3) + '...';
    }

    expect(excerpt.length).toBeLessThanOrEqual(maxLength);

    return excerpt;
  }
}

/**
 * Comprehensive content test suite
 */
export class ContentTestSuite {
  /**
   * Runs complete validation for content files
   */
  static validateContentFiles(contentFiles: ContentFile[]): void {
    expect(Array.isArray(contentFiles)).toBe(true);
    expect(contentFiles.length).toBeGreaterThan(0);

    contentFiles.forEach(ContentFileProcessor.validateContentFile);
  }

  /**
   * Runs complete validation for processed content
   */
  static validateProcessedContent(processedContent: ProcessedContent[]): void {
    expect(Array.isArray(processedContent)).toBe(true);
    expect(processedContent.length).toBeGreaterThan(0);

    processedContent.forEach(ContentFileProcessor.validateProcessedContent);
  }

  /**
   * Tests complete content processing workflow
   */
  static testCompleteWorkflow(
    rawContent: string,
    frontmatterData: Partial<Frontmatter>,
    config: ContentDiscoveryConfig
  ): void {
    // Validate configuration
    ContentDiscoveryTester.validateDiscoveryConfig(config);

    // Test reading time calculation
    if (
      config.processingOptions?.calculateReadingTime &&
      config.processingOptions?.wordsPerMinute
    ) {
      const readingTime = ContentDiscoveryTester.testReadingTimeCalculation(
        rawContent,
        config.processingOptions.wordsPerMinute
      );
      expect(readingTime).toBeGreaterThan(0);
    }

    // Test excerpt generation
    if (
      config.processingOptions?.generateExcerpt &&
      config.processingOptions?.excerptLength
    ) {
      const excerpt = ContentDiscoveryTester.testExcerptGeneration(
        rawContent,
        config.processingOptions.excerptLength
      );
      expect(excerpt.length).toBeGreaterThan(0);
    }

    // Validate frontmatter
    FrontmatterValidator.validateBaseFrontmatter(frontmatterData);
  }
}
