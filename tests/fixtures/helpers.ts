/**
 * Test fixtures for template helpers
 *
 * Provides mock template helpers and sample data for testing
 * partial rendering, asset optimization, and utility functions.
 */

import type { TemplateHelpers, ImageOptimizeOptions } from '@/types/partial';

/**
 * Mock template helpers for testing
 */
export const mockTemplateHelpers: TemplateHelpers = {
  // Date utilities
  formatDate: (date: Date, format = 'MMM dd, yyyy') => {
    // Simple mock implementation
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  },

  timeAgo: (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  },

  // Content utilities
  truncate: (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  slugify: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  markdown: (content: string) => {
    // Simple mock markdown processor
    return content
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<h|<\/p)(.+)$/gm, '<p>$1</p>');
  },

  // Asset utilities
  optimizeImage: (src: string, options: ImageOptimizeOptions = {}) => {
    const params = new URLSearchParams();
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('f', options.format);

    const queryString = params.toString();
    return queryString ? `${src}?${queryString}` : src;
  },

  generateSrcSet: (src: string) => {
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(
        width =>
          `${mockTemplateHelpers.optimizeImage(src, { width })} ${width}w`
      )
      .join(', ');
  },

  // Lodash-es utilities (simplified mocks)
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  groupBy: <T>(
    array: T[],
    predicate: string | ((item: T) => unknown)
  ): Record<string, T[]> => {
    const groups: Record<string, T[]> = {};

    array.forEach(item => {
      const key =
        typeof predicate === 'string'
          ? String((item as any)[predicate])
          : String(predicate(item));

      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return groups;
  },

  sortBy: <T>(array: T[], predicate: string | ((item: T) => unknown)): T[] => {
    return [...array].sort((a, b) => {
      const aVal =
        typeof predicate === 'string' ? (a as any)[predicate] : predicate(a);
      const bVal =
        typeof predicate === 'string' ? (b as any)[predicate] : predicate(b);

      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
  },

  // URL and navigation
  url: (path: string) => {
    // Mock base URL handling
    const baseUrl = 'https://example.com';
    return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  },

  isActive: (path: string) => {
    // Mock current path
    const currentPath = '/blog/sample-post';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  },

  // Partial composition
  renderPartial: <T>(name: string, props: T) => {
    // Mock partial rendering
    return `<!-- Rendered partial: ${name} with props: ${JSON.stringify(props)} -->`;
  },

  conditionalClass: (condition: boolean, className: string) => {
    return condition ? className : '';
  },
};

/**
 * Sample data for testing helper functions
 */
export const helperTestData = {
  dates: {
    recent: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    yesterday: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    lastWeek: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    specific: new Date('2024-01-15T10:30:00Z'),
  },

  texts: {
    short: 'This is a short text.',
    medium:
      'This is a medium length text that should be truncated when the limit is shorter than its length.',
    long: 'This is a very long text that contains multiple sentences and should definitely be truncated when testing the truncate helper function. It goes on and on with more content to ensure we have plenty of text to work with in our tests.',
    withSpecialChars: 'Text with Special Characters! @#$%^&*()_+ and émojis ✨',
    forSlugify: 'This Is A Title With Spaces And CAPS!',
  },

  images: {
    jpeg: 'https://example.com/image.jpg',
    png: 'https://example.com/image.png',
    withPath: 'https://example.com/gallery/photo-1.jpg',
    noExtension: 'https://example.com/image',
  },

  arrays: {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    strings: ['apple', 'banana', 'cherry', 'date', 'elderberry'],
    objects: [
      { id: 1, name: 'Alice', category: 'admin', score: 95 },
      { id: 2, name: 'Bob', category: 'user', score: 87 },
      { id: 3, name: 'Charlie', category: 'admin', score: 92 },
      { id: 4, name: 'Diana', category: 'user', score: 98 },
      { id: 5, name: 'Eve', category: 'moderator', score: 89 },
    ],
  },

  paths: {
    root: '/',
    blog: '/blog',
    blogPost: '/blog/sample-post',
    about: '/about',
    contact: '/contact',
    portfolio: '/portfolio',
    portfolioItem: '/portfolio/project-1',
  },

  markdown: {
    simple: '# Hello\n\nThis is **bold** and *italic* text.',
    withCode:
      '# Code Example\n\nHere is `inline code` and:\n\n```js\nconsole.log("hello");\n```',
    complex: `# Main Title

## Subtitle

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

Another paragraph with \`inline code\`.`,
  },
};

/**
 * Expected outputs for helper function tests
 */
export const helperExpectedOutputs = {
  formatDate: {
    'specific date with default format': 'Jan 15, 2024',
    'specific date with custom format': 'Jan 15, 2024', // Mock doesn't implement custom formats
  },

  timeAgo: {
    'recent (30 min ago)': '30 minutes ago',
    yesterday: '1 days ago',
    'last week': '7 days ago',
  },

  truncate: {
    'short text not truncated': 'This is a short text.',
    'medium text truncated':
      'This is a medium length text that should be truncated when the limit is...',
    'exact length': 'This is a short text.',
  },

  slugify: {
    'title with spaces and caps': 'this-is-a-title-with-spaces-and-caps',
    'text with special chars': 'text-with-special-characters-and-mojis',
  },

  optimizeImage: {
    'with width': 'https://example.com/image.jpg?w=400',
    'with width and height': 'https://example.com/image.jpg?w=400&h=300',
    'with all options': 'https://example.com/image.jpg?w=400&h=300&q=80&f=webp',
    'no options': 'https://example.com/image.jpg',
  },

  generateSrcSet:
    'https://example.com/image.jpg?w=400 400w, https://example.com/image.jpg?w=800 800w, https://example.com/image.jpg?w=1200 1200w, https://example.com/image.jpg?w=1600 1600w',

  chunk: {
    'array of 10 into chunks of 3': [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
    'strings into pairs': [
      ['apple', 'banana'],
      ['cherry', 'date'],
      ['elderberry'],
    ],
  },

  groupBy: {
    'objects by category': {
      admin: [
        { id: 1, name: 'Alice', category: 'admin', score: 95 },
        { id: 3, name: 'Charlie', category: 'admin', score: 92 },
      ],
      user: [
        { id: 2, name: 'Bob', category: 'user', score: 87 },
        { id: 4, name: 'Diana', category: 'user', score: 98 },
      ],
      moderator: [{ id: 5, name: 'Eve', category: 'moderator', score: 89 }],
    },
  },

  sortBy: {
    'objects by score': [
      { id: 2, name: 'Bob', category: 'user', score: 87 },
      { id: 5, name: 'Eve', category: 'moderator', score: 89 },
      { id: 3, name: 'Charlie', category: 'admin', score: 92 },
      { id: 1, name: 'Alice', category: 'admin', score: 95 },
      { id: 4, name: 'Diana', category: 'user', score: 98 },
    ],
  },

  url: {
    'absolute path': 'https://example.com/about',
    'relative path': 'https://example.com/contact',
    'root path': 'https://example.com/',
  },

  conditionalClass: {
    'true condition': 'active',
    'false condition': '',
  },
};
