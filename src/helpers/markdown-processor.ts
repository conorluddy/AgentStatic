/**
 * Unified-based markdown processing for AgentStatic
 *
 * Provides comprehensive markdown processing with frontmatter parsing,
 * GitHub Flavored Markdown, and extensible plugin architecture.
 */

import { unified, type Plugin } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

/**
 * Markdown processing configuration
 */
export interface MarkdownConfig {
  // GitHub Flavored Markdown features
  gfm: boolean;
  // Frontmatter parsing
  frontmatter: boolean;
  // HTML sanitization (security)
  sanitize: boolean;
  // Code highlighting
  codeHighlight: boolean;
  // Custom heading IDs
  headingIds: boolean;
  // Table of contents generation
  toc: boolean;
}

/**
 * Default markdown configuration for AgentStatic
 */
export const DEFAULT_MARKDOWN_CONFIG: MarkdownConfig = {
  gfm: true,
  frontmatter: true,
  sanitize: true,
  codeHighlight: true,
  headingIds: true,
  toc: false,
};

/**
 * Processed markdown result with metadata
 */
export interface ProcessedMarkdown {
  html: string;
  frontmatter: Record<string, unknown>;
  excerpt: string;
  readingTime: number;
  headings: Array<{
    level: number;
    text: string;
    id: string;
  }>;
  wordCount: number;
}

/**
 * Create unified processor with AgentStatic configuration
 */
export function createMarkdownProcessor(config: Partial<MarkdownConfig> = {}) {
  const finalConfig = { ...DEFAULT_MARKDOWN_CONFIG, ...config };

  // Start with base processor
  const processor = unified().use(remarkParse);

  // Add frontmatter support
  if (finalConfig.frontmatter) {
    processor.use(remarkFrontmatter, ['yaml', 'toml']);
  }

  // Add GitHub Flavored Markdown
  if (finalConfig.gfm) {
    processor.use(remarkGfm);
  }

  // Convert to HTML
  return processor
    .use(remarkRehype, {
      allowDangerousHtml: !finalConfig.sanitize,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: !finalConfig.sanitize,
    });
}

/**
 * Default markdown processor instance
 */
export const defaultMarkdownProcessor = createMarkdownProcessor();

/**
 * Process markdown content with frontmatter extraction
 */
export async function processMarkdown(
  content: string,
  config: Partial<MarkdownConfig> = {}
): Promise<ProcessedMarkdown> {
  const processor = createMarkdownProcessor(config);

  // Parse frontmatter and content
  const {
    data: frontmatter,
    content: markdownContent,
    excerpt,
  } = matter(content, {
    excerpt: true,
    excerpt_separator: '<!-- more -->',
  });

  // Process markdown to HTML
  const vfile = await processor.process(markdownContent);
  const html = String(vfile);

  // Calculate reading time (average 200 words per minute)
  const words = markdownContent.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  // Extract headings for table of contents
  const headings = extractHeadings(markdownContent);

  return {
    html,
    frontmatter,
    excerpt: excerpt || '',
    readingTime,
    headings,
    wordCount: words,
  };
}

/**
 * Extract headings from markdown content for TOC generation
 */
function extractHeadings(content: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    if (match[1] && match[2]) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({ level, text, id });
    }
  }

  return headings;
}

/**
 * Generate table of contents from headings
 */
export function generateTableOfContents(
  headings: Array<{ level: number; text: string; id: string }>,
  maxLevel = 3
): string {
  const filteredHeadings = headings.filter(h => h.level <= maxLevel);

  if (filteredHeadings.length === 0) {
    return '';
  }

  const tocItems = filteredHeadings.map(heading => {
    const indent = '  '.repeat(heading.level - 1);
    return `${indent}- [${heading.text}](#${heading.id})`;
  });

  return tocItems.join('\n');
}

/**
 * Create markdown processor with custom plugins
 */
export function createCustomMarkdownProcessor(
  plugins: Plugin[] = [],
  config: Partial<MarkdownConfig> = {}
) {
  const processor = createMarkdownProcessor(config);

  // Add custom plugins
  for (const plugin of plugins) {
    processor.use(plugin);
  }

  return processor;
}

/**
 * Validate markdown frontmatter against a schema
 */
export function validateFrontmatter<T>(
  frontmatter: Record<string, unknown>,
  validator: (data: unknown) => T
): { success: true; data: T } | { success: false; error: Error } {
  try {
    const data = validator(frontmatter);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
