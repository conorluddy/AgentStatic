/**
 * Page Discovery System for AgentStatic
 *
 * Discovers, validates, and processes individual pages from content files.
 * Follows CODESTYLE.md principles: Human-Centric Design, Simple & Clear.
 */

import { join, relative, basename } from 'path';
import { z } from 'zod';
import {
  processMarkdown,
  type ProcessedMarkdown,
} from '../helpers/markdown-processor.js';
import { ContentResolver } from '../utils/content-resolver.js';
import { getUrlPath } from '../utils/paths.js';
import { FrontmatterSchema } from '../types/content.js';

/**
 * Page-specific frontmatter schema extending base content schema
 */
export const PageFrontmatterSchema = FrontmatterSchema.extend({
  layout: z.string().default('main').describe('Page layout template'),
  navigationTitle: z.string().optional().describe('Title to use in navigation'),
  navigationOrder: z
    .number()
    .optional()
    .describe('Order in navigation (lower = first)'),
  showInNavigation: z
    .boolean()
    .default(true)
    .describe('Whether to show in main navigation'),
  isHomepage: z
    .boolean()
    .default(false)
    .describe('Whether this is the homepage'),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;

/**
 * Discovered page file with metadata
 */
export interface PageFile {
  // File system info
  filePath: string;
  relativePath: string;
  slug: string;
  urlPath: string;

  // Content
  frontmatter: PageFrontmatter;
  rawContent: string;
  processedContent?: ProcessedMarkdown;

  // Metadata
  lastModified: Date;
  fileSize: number;
  isHomepage: boolean;
}

/**
 * Page discovery configuration
 */
export interface PageDiscoveryConfig {
  contentDir: string;
  includePatterns?: string[];
  excludePatterns?: string[];
  validateFrontmatter?: boolean;
}

/**
 * Validation result for pages
 */
export interface PageValidationResult {
  success: boolean;
  page?: PageFile;
  errors: string[];
  warnings: string[];
}

/**
 * Page Discovery System
 *
 * Single responsibility: Find and validate pages from markdown files
 */
export class PageDiscoverySystem {
  private resolver: ContentResolver;
  private config: PageDiscoveryConfig;

  constructor(resolver: ContentResolver, config: PageDiscoveryConfig) {
    this.resolver = resolver;
    this.config = config;
  }

  /**
   * Discover all pages in the content directory
   *
   * Principle: Fail Fast - Surface errors immediately with actionable messages
   */
  async discoverPages(): Promise<PageFile[]> {
    try {
      const contentFiles = await this.resolver.getContentFiles();
      const pages: PageFile[] = [];
      const errors: string[] = [];

      for (const filePath of contentFiles) {
        // Only process files in pages directory
        if (!filePath.includes('/pages/') && !filePath.includes('\\pages\\')) {
          continue;
        }

        const validationResult = await this.validateAndProcessPage(filePath);

        if (validationResult.success && validationResult.page) {
          pages.push(validationResult.page);
        } else {
          errors.push(
            `Error processing ${filePath}: ${validationResult.errors.join(', ')}`
          );
        }
      }

      if (errors.length > 0) {
        console.warn('⚠️ Page discovery warnings:');
        errors.forEach(error => console.warn(`   ${error}`));
      }

      // Sort pages by navigation order and title
      pages.sort((a, b) => {
        // Homepage first
        if (a.isHomepage) return -1;
        if (b.isHomepage) return 1;

        // Then by navigation order
        const aOrder = a.frontmatter.navigationOrder ?? 999;
        const bOrder = b.frontmatter.navigationOrder ?? 999;
        if (aOrder !== bOrder) return aOrder - bOrder;

        // Finally by title
        return a.frontmatter.title.localeCompare(b.frontmatter.title);
      });

      return pages;
    } catch (error) {
      throw new Error(
        `Page discovery failed: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
          `Please check that the content directory exists and contains valid markdown files.`
      );
    }
  }

  /**
   * Validate and process a single page file
   *
   * Principle: Validate inputs at boundaries immediately
   */
  async validateAndProcessPage(
    filePath: string
  ): Promise<PageValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Load file content
      const { content, stats } = await this.resolver.loadContentFile(filePath);

      // Process markdown and extract frontmatter
      let processedContent: ProcessedMarkdown;
      try {
        processedContent = await processMarkdown(content);
      } catch (error) {
        errors.push(
          `Markdown processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        return { success: false, errors, warnings };
      }

      // Validate frontmatter
      const frontmatterValidation = this.validatePageFrontmatter(
        processedContent.frontmatter
      );
      if (!frontmatterValidation.success) {
        errors.push(...frontmatterValidation.errors);
        warnings.push(...frontmatterValidation.warnings);
      }

      if (errors.length > 0) {
        return { success: false, errors, warnings };
      }

      // Generate page metadata
      const paths = this.resolver.getPaths();
      const relativePath = relative(paths.contentDir, filePath);
      const slug = this.generateSlug(filePath, processedContent.frontmatter);
      const urlPath = getUrlPath(filePath, join(paths.contentDir, 'pages'));
      const isHomepage =
        slug === 'index' || Boolean(processedContent.frontmatter['isHomepage']);

      const page: PageFile = {
        filePath,
        relativePath,
        slug,
        urlPath,
        frontmatter: frontmatterValidation.data!,
        rawContent: content,
        processedContent,
        lastModified: stats.mtime,
        fileSize: stats.size,
        isHomepage,
      };

      return {
        success: true,
        page,
        errors: [],
        warnings,
      };
    } catch (error) {
      errors.push(
        `File processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return { success: false, errors, warnings };
    }
  }

  /**
   * Validate page frontmatter against schema
   *
   * Principle: Clear error messages with actionable guidance
   */
  validatePageFrontmatter(frontmatter: Record<string, unknown>): {
    success: boolean;
    data?: PageFrontmatter;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const validatedData = PageFrontmatterSchema.parse(frontmatter);

      // Additional validation rules
      if (!validatedData.title || validatedData.title.trim().length === 0) {
        errors.push('Page title is required and cannot be empty');
      }

      if (validatedData.title && validatedData.title.length > 100) {
        warnings.push(
          'Page title is very long (>100 characters), consider shortening for better SEO'
        );
      }

      if (validatedData.description && validatedData.description.length > 160) {
        warnings.push(
          'Page description is long (>160 characters), consider shortening for better SEO'
        );
      }

      return {
        success: errors.length === 0,
        data: validatedData,
        errors,
        warnings,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map(
          err => `Field "${err.path.join('.')}" ${err.message.toLowerCase()}`
        );
        errors.push(...formattedErrors);
      } else {
        errors.push(
          `Frontmatter validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }

      return { success: false, errors, warnings };
    }
  }

  /**
   * Generate URL slug from file path and frontmatter
   *
   * Principle: Simple > Clever - straightforward slug generation
   */
  private generateSlug(
    filePath: string,
    frontmatter: Record<string, unknown>
  ): string {
    // Use explicit slug from frontmatter if provided
    if (frontmatter['slug'] && typeof frontmatter['slug'] === 'string') {
      return frontmatter['slug'];
    }

    // Generate from filename
    const filename = basename(filePath, '.md');

    // Clean up slug
    return filename
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Get pages that should appear in navigation
   */
  getNavigationPages(pages: PageFile[]): PageFile[] {
    return pages.filter(
      page => page.frontmatter.showInNavigation && !page.isHomepage // Homepage typically doesn't appear in nav
    );
  }

  /**
   * Find homepage from discovered pages
   */
  getHomepage(pages: PageFile[]): PageFile | undefined {
    return pages.find(page => page.isHomepage);
  }
}
