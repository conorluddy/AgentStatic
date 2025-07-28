/**
 * Test fixtures for content processing
 *
 * Provides sample content files, frontmatter, and processed content
 * for testing content discovery, processing, and rendering workflows.
 */

import type {
  ContentFile,
  ProcessedContent,
  Frontmatter,
} from '@/types/content';

/**
 * Sample frontmatter configurations
 */
export const sampleFrontmatter = {
  minimal: {
    title: 'Sample Post',
    description: 'A minimal sample post for testing',
  } as Frontmatter,

  complete: {
    title: 'Complete Blog Post',
    description: 'A comprehensive blog post with all metadata',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T15:30:00Z'),
    draft: false,
    tags: ['technology', 'web-development', 'typescript'],
    author: 'John Doe',
    slug: 'complete-blog-post',
    metaTitle: 'Complete Blog Post - Custom Meta Title',
    metaDescription: 'Custom meta description for SEO optimization',
    canonicalUrl: 'https://example.com/blog/complete-blog-post',
    noindex: false,
    nofollow: false,
    openGraph: {
      title: 'Complete Blog Post - OG Title',
      description: 'Open Graph description for social sharing',
      image: 'https://example.com/og-image.jpg',
      type: 'article' as const,
    },
  } as Frontmatter,

  portfolio: {
    title: 'Photography Project',
    description: 'A stunning photography portfolio piece',
    publishedAt: new Date('2024-02-01T12:00:00Z'),
    tags: ['photography', 'portfolio', 'nature'],
    author: 'Jane Smith',
    openGraph: {
      title: 'Photography Project Portfolio',
      description: 'Beautiful nature photography collection',
      image: 'https://example.com/portfolio-image.jpg',
      type: 'article' as const,
    },
  } as Frontmatter,

  draft: {
    title: 'Draft Article',
    description: 'This is a draft article not ready for publication',
    draft: true,
    tags: ['draft', 'work-in-progress'],
    author: 'Author Name',
  } as Frontmatter,
};

/**
 * Sample markdown content
 */
export const sampleMarkdownContent = {
  simple: `# Hello World

This is a simple markdown content for testing basic processing.

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- \`inline code\`

\`\`\`typescript
const hello = "world";
console.log(hello);
\`\`\`

> This is a blockquote

1. Ordered list item
2. Another item
`,

  complex: `# Advanced Markdown Content

This content includes various markdown features for comprehensive testing.

## Table of Contents

This will be auto-generated in processed content.

## Code Examples

Here's some TypeScript code:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (data: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...data,
  };
};
\`\`\`

## Images and Media

![Sample Image](https://example.com/sample.jpg "Sample image caption")

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Markdown | ✅ | Full GFM support |
| TypeScript | ✅ | Strict mode |
| Images | ✅ | Optimized with Sharp |

## Complex Lists

- **Web Development**
  - Frontend
    - React
    - Vue
    - Angular
  - Backend
    - Node.js
    - Python
    - Go
- **Design**
  - UI/UX
  - Graphic Design
  - Photography

## Math and Special Characters

Some special characters: © ® ™ € £ ¥

## Links and References

Visit [AgentStatic](https://example.com) for more information.

Email me at [contact@example.com](mailto:contact@example.com).

## Footnotes

This has a footnote[^1].

[^1]: This is the footnote content.`,

  portfolio: `# Nature Photography Collection

A curated selection of landscape and wildlife photography from my recent expedition.

## Project Overview

This collection represents three months of travel through various national parks, capturing the raw beauty of untouched wilderness.

### Equipment Used

- **Camera**: Canon EOS R5
- **Lenses**: 
  - Canon RF 24-70mm f/2.8L
  - Canon RF 70-200mm f/2.8L
  - Canon RF 16-35mm f/2.8L

## Gallery

![Mountain Vista](https://example.com/mountain1.jpg "Sunrise over the Rocky Mountains")
*Captured at 5:30 AM during golden hour*

![Wildlife](https://example.com/wildlife1.jpg "Elk in morning mist")
*A bull elk emerges from the morning fog*

## Technical Details

All images shot in RAW format and processed using:
- Adobe Lightroom Classic
- Photoshop for compositing
- Color graded for web display

## Exhibition Information

These pieces will be displayed at the Downtown Gallery from March 1-31, 2024.
`,
};

/**
 * Sample ContentFile objects
 */
export const sampleContentFiles: ContentFile[] = [
  {
    filePath: '/content/blog/sample-post.md',
    relativePath: 'blog/sample-post.md',
    urlPath: '/blog/sample-post',
    frontmatter: sampleFrontmatter.minimal,
    content: sampleMarkdownContent.simple,
    excerpt: 'This is a simple markdown content for testing basic processing.',
    wordCount: 45,
    readingTime: 1,
    lastModified: new Date('2024-01-15T10:00:00Z'),
    fileSize: 456,
  },
  {
    filePath: '/content/blog/complete-post.md',
    relativePath: 'blog/complete-post.md',
    urlPath: '/blog/complete-blog-post',
    frontmatter: sampleFrontmatter.complete,
    content: sampleMarkdownContent.complex,
    excerpt:
      'This content includes various markdown features for comprehensive testing.',
    wordCount: 234,
    readingTime: 2,
    lastModified: new Date('2024-01-20T15:30:00Z'),
    fileSize: 1823,
  },
  {
    filePath: '/content/portfolio/nature-photography.md',
    relativePath: 'portfolio/nature-photography.md',
    urlPath: '/portfolio/nature-photography',
    frontmatter: sampleFrontmatter.portfolio,
    content: sampleMarkdownContent.portfolio,
    excerpt:
      'A curated selection of landscape and wildlife photography from my recent expedition.',
    wordCount: 156,
    readingTime: 1,
    lastModified: new Date('2024-02-01T12:00:00Z'),
    fileSize: 987,
  },
  {
    filePath: '/content/drafts/draft-article.md',
    relativePath: 'drafts/draft-article.md',
    urlPath: '/drafts/draft-article',
    frontmatter: sampleFrontmatter.draft,
    content: '# Draft Content\n\nThis is draft content.',
    excerpt: 'This is draft content.',
    wordCount: 8,
    readingTime: 1,
    lastModified: new Date('2024-02-10T09:00:00Z'),
    fileSize: 123,
  },
];

/**
 * Sample ProcessedContent objects
 */
export const sampleProcessedContent = [
  {
    ...sampleContentFiles[0],
    html: `<h1>Hello World</h1>
<p>This is a simple markdown content for testing basic processing.</p>
<h2>Features</h2>
<ul>
<li><strong>Bold text</strong> and <em>italic text</em></li>
<li><a href="https://example.com">Links</a></li>
<li><code>inline code</code></li>
</ul>
<pre><code class="language-typescript">const hello = "world";
console.log(hello);
</code></pre>
<blockquote>This is a blockquote</blockquote>
<ol>
<li>Ordered list item</li>
<li>Another item</li>
</ol>`,
    tableOfContents: [
      {
        id: 'hello-world',
        title: 'Hello World',
        level: 1,
        children: [
          {
            id: 'features',
            title: 'Features',
            level: 2,
            children: [],
          },
        ],
      },
    ],
  },
  {
    ...sampleContentFiles[1],
    html: `<h1>Advanced Markdown Content</h1>
<p>This content includes various markdown features for comprehensive testing.</p>
<h2>Table of Contents</h2>
<p>This will be auto-generated in processed content.</p>
<h2>Code Examples</h2>
<p>Here's some TypeScript code:</p>
<pre><code class="language-typescript">interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (data: Omit&lt;User, 'id'&gt;): User =&gt; {
  return {
    id: Math.random(),
    ...data,
  };
};
</code></pre>
<h2>Images and Media</h2>
<p><img src="https://example.com/sample.jpg" alt="Sample Image" title="Sample image caption" /></p>
<h2>Tables</h2>
<table>
<thead>
<tr><th>Feature</th><th>Supported</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>Markdown</td><td>✅</td><td>Full GFM support</td></tr>
<tr><td>TypeScript</td><td>✅</td><td>Strict mode</td></tr>
<tr><td>Images</td><td>✅</td><td>Optimized with Sharp</td></tr>
</tbody>
</table>`,
    tableOfContents: [
      {
        id: 'advanced-markdown-content',
        title: 'Advanced Markdown Content',
        level: 1,
        children: [
          {
            id: 'table-of-contents',
            title: 'Table of Contents',
            level: 2,
            children: [],
          },
          {
            id: 'code-examples',
            title: 'Code Examples',
            level: 2,
            children: [],
          },
          {
            id: 'images-and-media',
            title: 'Images and Media',
            level: 2,
            children: [],
          },
          {
            id: 'tables',
            title: 'Tables',
            level: 2,
            children: [],
          },
        ],
      },
    ],
    relatedContent: [sampleContentFiles[2]], // Related portfolio content
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Complete Blog Post',
      description: 'A comprehensive blog post with all metadata',
      author: {
        '@type': 'Person',
        name: 'John Doe',
      },
      datePublished: '2024-01-15T10:00:00Z',
      dateModified: '2024-01-20T15:30:00Z',
    },
  },
] as ProcessedContent[];

/**
 * Sample content queries for testing filtering
 */
export const sampleContentQueries = {
  allPublished: {
    draft: false,
    sortBy: 'publishedAt' as const,
    sortOrder: 'desc' as const,
  },
  byTag: {
    tags: ['typescript'],
    draft: false,
    sortBy: 'publishedAt' as const,
    sortOrder: 'desc' as const,
  },
  byAuthor: {
    author: 'John Doe',
    draft: false,
    sortBy: 'updatedAt' as const,
    sortOrder: 'desc' as const,
  },
  recent: {
    publishedAfter: new Date('2024-01-01'),
    draft: false,
    limit: 5,
    sortBy: 'publishedAt' as const,
    sortOrder: 'desc' as const,
  },
  paginated: {
    draft: false,
    limit: 10,
    offset: 0,
    sortBy: 'publishedAt' as const,
    sortOrder: 'desc' as const,
  },
};

/**
 * Sample content collections configuration
 */
export const sampleContentCollections = {
  blog: {
    name: 'blog',
    pattern: 'blog/**/*.md',
    frontmatterSchema: sampleFrontmatter.complete,
    defaultSort: 'publishedAt' as const,
    generateIndex: true,
    generateTags: true,
    generatePagination: true,
    itemsPerPage: 10,
  },
  portfolio: {
    name: 'portfolio',
    pattern: 'portfolio/**/*.md',
    frontmatterSchema: sampleFrontmatter.portfolio,
    defaultSort: 'publishedAt' as const,
    generateIndex: true,
    generateTags: false,
    generatePagination: false,
  },
};
