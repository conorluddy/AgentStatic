/**
 * Unified-based markdown content processing pipeline
 * 
 * Provides comprehensive markdown processing with frontmatter,
 * GFM support, table of contents generation, and extensibility.
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';
import { createHash } from 'crypto';
import type { VFile } from 'vfile';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';

import type { 
  ContentFile, 
  ProcessedContent, 
  TableOfContentsItem,
  Frontmatter,
  FrontmatterSchema 
} from '@/types/content.js';
import type { MarkdownConfig } from './config.js';

/**
 * Content processing cache for performance
 */
interface CacheEntry {
  hash: string;
  content: ProcessedContent;
  timestamp: number;
}

export class ContentProcessor {
  private cache = new Map<string, CacheEntry>();
  private config: MarkdownConfig;
  private processor: ReturnType<typeof unified>;

  constructor(config: MarkdownConfig) {
    this.config = config;
    this.processor = this.createProcessor();
  }

  /**
   * Create the unified processor pipeline
   */
  private createProcessor() {
    let processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml', 'toml']);

    // Add GitHub Flavored Markdown support
    if (this.config.enableGFM) {
      processor = processor.use(remarkGfm);
    }

    // Add custom plugins
    for (const plugin of this.config.customPlugins) {
      processor = processor.use(plugin);
    }

    // Convert to HTML
    processor = processor
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeStringify);

    return processor;
  }

  /**
   * Process a markdown file into structured content
   */
  async processFile(filePath: string, content: string): Promise<ProcessedContent> {
    // Generate content hash for caching
    const contentHash = this.generateContentHash(content);
    const cacheKey = `${filePath}:${contentHash}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < 86400000) { // 24 hour cache
      return cached.content;
    }

    // Parse frontmatter
    const { data: frontmatter, content: markdownContent } = matter(content);

    // Validate frontmatter
    const frontmatterResult = FrontmatterSchema.safeParse(frontmatter);
    if (!frontmatterResult.success) {
      throw new Error(`Invalid frontmatter in ${filePath}: ${frontmatterResult.error.message}`);
    }

    // Process markdown content
    const vfile = await this.processor.process(markdownContent);
    const html = String(vfile);

    // Extract metadata
    const wordCount = this.calculateWordCount(markdownContent);
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
    const excerpt = this.generateExcerpt(markdownContent);

    // Generate table of contents if enabled
    let tableOfContents: TableOfContentsItem[] | undefined;
    if (this.config.enableTOC) {
      tableOfContents = await this.generateTableOfContents(markdownContent);
    }

    // Create processed content
    const processedContent: ProcessedContent = {
      filePath,
      relativePath: this.getRelativePath(filePath),
      urlPath: this.generateUrlPath(filePath),
      frontmatter: frontmatterResult.data,
      content: markdownContent,
      html,
      excerpt,
      wordCount,
      readingTime,
      lastModified: new Date(),
      fileSize: Buffer.byteLength(content, 'utf8'),
      tableOfContents
    };

    // Cache the result
    this.cache.set(cacheKey, {
      hash: contentHash,
      content: processedContent,
      timestamp: Date.now()
    });

    return processedContent;
  }

  /**
   * Process markdown content without file context
   */
  async processMarkdown(markdown: string): Promise<string> {
    const vfile = await this.processor.process(markdown);
    return String(vfile);
  }

  /**
   * Generate table of contents from markdown content
   */
  private async generateTableOfContents(content: string): Promise<TableOfContentsItem[]> {
    const tree = this.processor.parse(content) as MdastRoot;
    const headings: TableOfContentsItem[] = [];
    const stack: TableOfContentsItem[] = [];

    const visit = (node: any) => {
      if (node.type === 'heading' && node.depth <= this.config.tocMaxDepth) {
        const text = this.extractTextFromNode(node);
        const id = this.slugify(text);

        const tocItem: TableOfContentsItem = {
          id,
          title: text,
          level: node.depth,
          children: []
        };

        // Find the correct parent in the stack
        while (stack.length > 0 && stack[stack.length - 1].level >= node.depth) {
          stack.pop();
        }

        if (stack.length === 0) {
          headings.push(tocItem);
        } else {
          stack[stack.length - 1].children.push(tocItem);
        }

        stack.push(tocItem);
      }

      if (node.children) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
    return headings;
  }

  /**
   * Extract text content from markdown AST node
   */
  private extractTextFromNode(node: any): string {
    if (node.type === 'text') {
      return node.value;
    }
    if (node.children) {
      return node.children.map((child: any) => this.extractTextFromNode(child)).join('');
    }
    return '';
  }

  /**
   * Generate URL-safe slug from text
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Calculate word count for reading time estimation
   */
  private calculateWordCount(content: string): number {
    // Remove markdown syntax and count words
    const plainText = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
      .replace(/[#*_`~\[\]()]/g, '') // Remove markdown punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    return plainText ? plainText.split(/\s+/).length : 0;
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string, length: number = 160): string {
    // Remove markdown syntax
    const plainText = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
      .replace(/[#*_`~\[\]()]/g, '') // Remove markdown punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    if (plainText.length <= length) {
      return plainText;
    }

    // Find the last complete sentence within the length limit
    const truncated = plainText.substring(0, length);
    const lastSentence = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');

    const cutPoint = lastSentence > length - 50 ? lastSentence + 1 : lastSpace;
    
    return cutPoint > 0 
      ? truncated.substring(0, cutPoint).trim() + '...'
      : truncated.trim() + '...';
  }

  /**
   * Generate content hash for caching
   */
  private generateContentHash(content: string): string {
    return createHash('md5').update(content).digest('hex');
  }

  /**
   * Get relative path from file path
   */
  private getRelativePath(filePath: string): string {
    // This would be implemented based on the project's content directory
    // For now, return the file path as-is
    return filePath;
  }

  /**
   * Generate URL path from file path
   */
  private generateUrlPath(filePath: string): string {
    // Convert file path to URL path
    // e.g., content/blog/post.md -> /blog/post
    return filePath
      .replace(/^.*\/content\//, '/')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '/');
  }

  /**
   * Clear the processing cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }

  /**
   * Update processor configuration
   */
  updateConfig(config: MarkdownConfig): void {
    this.config = config;
    this.processor = this.createProcessor();
    this.clearCache(); // Clear cache when config changes
  }
}

/**
 * Content discovery utilities
 */
export class ContentDiscovery {
  private processor: ContentProcessor;

  constructor(processor: ContentProcessor) {
    this.processor = processor;
  }

  /**
   * Discover and process all markdown files in a directory
   */
  async discoverContent(contentDir: string): Promise<ContentFile[]> {
    // This would use fs to recursively find .md files
    // Implementation depends on the file system scanning approach
    throw new Error('Content discovery not yet implemented - requires file system integration');
  }

  /**
   * Process a batch of content files
   */
  async processBatch(files: Array<{ path: string; content: string }>): Promise<ProcessedContent[]> {
    const results = await Promise.allSettled(
      files.map(({ path, content }) => this.processor.processFile(path, content))
    );

    const processed: ProcessedContent[] = [];
    const errors: Array<{ path: string; error: string }> = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        processed.push(result.value);
      } else {
        errors.push({
          path: files[index].path,
          error: result.reason instanceof Error ? result.reason.message : 'Unknown error'
        });
      }
    });

    if (errors.length > 0) {
      console.warn('Content processing errors:', errors);
    }

    return processed;
  }
}

/**
 * Factory function to create a content processor with configuration
 */
export function createContentProcessor(config: MarkdownConfig): ContentProcessor {
  return new ContentProcessor(config);
}

export default ContentProcessor;