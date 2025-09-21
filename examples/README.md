# 📚 AgentStatic Examples

Welcome to the AgentStatic examples directory! This collection showcases real-world usage patterns, best practices, and
reusable components that demonstrate the power of the AgentStatic framework.

## 🎯 What You'll Find Here

### 🏗️ [Simple Portfolio](./simple-portfolio/)

A complete two-page static site demonstrating:

- **Homepage** with hero section and featured content
- **Projects page** with grid layout and interactive elements
- **TypeScript partials** with Zod validation
- **Navigation system** with active states
- **Responsive design** patterns

**Perfect for**: Personal portfolios, business websites, landing pages

### 🧩 [Component Showcase](./components-showcase/)

Advanced component library featuring:

- **Media components** (galleries, video embeds)
- **Interactive elements** (tabs, accordions, forms)
- **Layout utilities** (grids, containers, headers)
- **Content blocks** (cards, testimonials, CTAs)

**Perfect for**: Component libraries, design systems, complex sites

## 🚀 Quick Start

1. **Choose an example** that matches your use case
2. **Copy the directory** to your project
3. **Install dependencies** with `npm install`
4. **Run the dev server** with `npm run dev`
5. **Customize** content and components to your needs

## 🔧 Running Examples

Each example is self-contained and can be run independently:

```bash
# Navigate to an example
cd examples/simple-portfolio

# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📖 Learning Path

### Beginners

1. Start with **Simple Portfolio** to understand basic concepts
2. Study the **TypeScript partials** to learn component patterns
3. Examine **content structure** and frontmatter usage

### Intermediate

1. Explore **Component Showcase** for advanced patterns
2. Learn **Zod validation** techniques
3. Understand **hot reload** and development workflow

### Advanced

1. Study **dependency resolution** between components
2. Implement **custom partial categories**
3. Integrate with **MCP plugins** (coming soon)

## 🎨 Design Principles

All examples follow AgentStatic's core principles:

### TypeScript-First

- **Zero `any` types** throughout all components
- **Strict mode compliance** with proper error handling
- **Type-safe props** with runtime validation

### Human-Centric Code

- **Clear naming** that eliminates need for comments
- **Progressive disclosure** of complexity
- **Single responsibility** for each component

### Performance Optimized

- **Static generation** for lightning-fast loading
- **Tree-shakeable** component imports
- **Minimal runtime** with vanilla CSS/JS output

## 🛠️ Customization Guide

### Adding Your Own Components

1. **Create partial file**: `my-component.partial.ts`

```typescript
import { z } from 'zod';
import type { AgentPartial } from '@/types/partial';

export const myComponentPartial: AgentPartial<{
  title: string;
  description?: string;
}> = {
  schema: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  }),
  template: props => `
    <div class="my-component">
      <h3>${props.title}</h3>
      ${props.description ? `<p>${props.description}</p>` : ''}
    </div>
  `,
  styles: `
    .my-component {
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
  `,
  metadata: {
    description: 'Custom component description',
    category: 'content',
    keywords: ['custom', 'component'],
    usageExamples: ['Basic usage'],
  },
};
```

2. **Register component**: Add to your partial registry
3. **Use in content**: Reference in markdown frontmatter
4. **Style**: Add CSS variables for theming

### Content Structure

```yaml
---
title: 'Page Title'
description: 'SEO description'
layout: main
sections:
  - partial: 'hero'
    title: 'Welcome'
    subtitle: 'Subtitle here'
  - partial: 'my-component'
    title: 'Custom Section'
    description: 'Component description'
---
# Markdown Content

Additional markdown content goes here.
```

## 🤝 Contributing Examples

Have a great example to share? We'd love to include it!

### Submission Guidelines

1. **Follow naming conventions**: `kebab-case` for directories
2. **Include README**: Document what the example demonstrates
3. **Add TypeScript types**: Maintain zero `any` types policy
4. **Test thoroughly**: Ensure example builds and runs correctly
5. **Document patterns**: Explain any unique techniques used

### Example Quality Standards

- **Real-world relevance**: Solves actual use cases
- **Educational value**: Teaches AgentStatic concepts
- **Production-ready**: Follows best practices
- **Well-documented**: Clear instructions and explanations

## 📚 Additional Resources

- [AgentStatic Documentation](../README.md)
- [Component Development Guide](../TEMPLATE_ARCHITECTURE.md)
- [Code Style Guide](../CODESTYLE.md)
- [TypeScript Configuration](../tsconfig.json)

## 🎯 Example Categories

| Category          | Description                         | Examples         |
| ----------------- | ----------------------------------- | ---------------- |
| **Portfolios**    | Personal and professional showcases | Simple Portfolio |
| **Business**      | Company websites and landing pages  | Coming Soon      |
| **Blogs**         | Content-focused sites with articles | Coming Soon      |
| **Documentation** | Technical documentation sites       | Coming Soon      |
| **E-commerce**    | Product showcases and stores        | Coming Soon      |

---

## 🔥 Featured Components

### Most Popular

- **Hero Section**: Eye-catching page headers with CTAs
- **Project Cards**: Portfolio project showcases
- **Navigation**: Responsive navigation with active states
- **Contact Forms**: Type-safe form components

### Most Versatile

- **Content Blocks**: Flexible content sections
- **Image Galleries**: Media-rich showcases
- **Testimonials**: Social proof components
- **Call-to-Actions**: Conversion-focused elements

---

**Ready to build something amazing?** Pick an example and start customizing! 🚀

_For questions or support, check the [main documentation](../README.md) or open an issue on GitHub._
