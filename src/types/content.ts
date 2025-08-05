/**
 * Content processing types for AgentStatic
 *
 * Defines schemas and interfaces for Markdown content processing,
 * frontmatter validation, and content discovery.
 */

import { z } from 'zod';

/**
 * Base frontmatter schema shared across all content types
 */
export const BaseFrontmatterSchema = z.object({
  title: z.string().describe('Content title'),
  description: z.string().optional().describe('Meta description for SEO'),
  publishedAt: z.coerce.date().optional().describe('Publication date'),
  updatedAt: z.coerce.date().optional().describe('Last modification date'),
  draft: z.boolean().default(false).describe('Draft status'),
  tags: z.array(z.string()).default([]).describe('Content tags'),
  author: z.string().optional().describe('Content author'),
  slug: z.string().optional().describe('URL slug override'),
});

export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;

/**
 * SEO-specific frontmatter
 */
export const SEOFrontmatterSchema = z.object({
  metaTitle: z.string().optional().describe('Custom meta title'),
  metaDescription: z.string().optional().describe('Custom meta description'),
  canonicalUrl: z.string().url().optional().describe('Canonical URL'),
  noindex: z.boolean().default(false).describe('Exclude from search engines'),
  nofollow: z.boolean().default(false).describe('No follow links'),
  openGraph: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional(),
      type: z.enum(['website', 'article', 'profile']).default('article'),
    })
    .optional()
    .describe('Open Graph metadata'),
});

export type SEOFrontmatter = z.infer<typeof SEOFrontmatterSchema>;

/**
 * Complete frontmatter schema combining base and SEO
 */
export const FrontmatterSchema =
  BaseFrontmatterSchema.merge(SEOFrontmatterSchema);
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

/**
 * Content file representation
 */
export interface ContentFile {
  filePath: string;
  relativePath: string;
  urlPath: string;
  frontmatter: Frontmatter;
  content: string;
  excerpt?: string;
  wordCount: number;
  readingTime: number;
  lastModified: Date;
  fileSize: number;
}

/**
 * Processed content with rendered HTML
 */
export interface ProcessedContent extends ContentFile {
  html: string;
  tableOfContents?: TableOfContentsItem[];
  relatedContent?: ContentFile[];
  schema?: Record<string, unknown>; // Schema.org data
}

/**
 * Table of contents item
 */
export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children: TableOfContentsItem[];
}

/**
 * Content discovery configuration
 */
export interface ContentDiscoveryConfig {
  contentDir: string;
  includePatterns: string[];
  excludePatterns: string[];
  defaultFrontmatter: Partial<Frontmatter>;
  processingOptions: {
    generateExcerpt: boolean;
    excerptLength: number;
    generateTOC: boolean;
    tocMaxDepth: number;
    calculateReadingTime: boolean;
    wordsPerMinute: number;
  };
}

/**
 * Content query interface for filtering and sorting
 */
export interface ContentQuery {
  tags?: string[];
  author?: string;
  draft?: boolean;
  publishedAfter?: Date;
  publishedBefore?: Date;
  sortBy?: 'publishedAt' | 'updatedAt' | 'title' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Content collection (e.g., blog posts, portfolio items)
 */
export interface ContentCollection {
  name: string;
  pattern: string;
  frontmatterSchema: z.ZodSchema<unknown>;
  defaultSort: ContentQuery['sortBy'];
  generateIndex: boolean;
  generateTags: boolean;
  generatePagination: boolean;
  itemsPerPage?: number;
}

// ContentFile is exported as a named export above
