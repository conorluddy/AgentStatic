# AgentStatic - AI-Native Static Site Generator

> A revolutionary content management system that combines TypeScript-first schema validation with AI-powered extensibility through the Model Context Protocol (MCP). Built for creative professionals who demand both technical excellence and visual showcase capabilities.

## 🚀 Revolutionary Templating System

AgentStatic introduces a **groundbreaking approach to templating** that eliminates traditional templating languages in favor of **TypeScript functions with Zod schema validation**. This enables LLMs to understand, compose, and generate templates intelligently while maintaining full type safety.

### Why We Replaced Traditional Templating

**Traditional Problems:**
```handlebars
{{!-- Handlebars/Mustache Limitations --}}
{{> hero title="Welcome" subtitle="Get started"}}
{{!-- ❌ No type safety, runtime-only validation --}}
{{!-- ❌ LLMs can't understand data requirements --}}
{{!-- ❌ Limited composition and reusability --}}
```

**AgentStatic Solution:**
```typescript
// ✅ Full TypeScript integration with schema validation
const heroProps = HeroSchema.parse({
  title: "Welcome",
  subtitle: "Get started", 
  variant: "gradient-bg"
}); // Compile-time + runtime validation!

// ✅ LLM can read schema and understand requirements
// ✅ Intelligent composition and error prevention
```

### Self-Contained Partial System

Each "partial" in AgentStatic is a **complete, self-contained unit** that includes:

```typescript
interface AgentPartial<TProps> {
  // 🧠 LLM-readable schema defining data contract
  schema: ZodSchema<TProps>;
  
  // 🎨 TypeScript template function with full type safety
  template: (props: TProps, helpers: TemplateHelpers) => string;
  
  // 💅 Scoped CSS automatically namespaced
  styles: string;
  
  // ⚡ Optional client-side behavior
  script?: string;
  
  // 🔗 Dependencies on other partials
  dependencies?: string[];
  
  // 📱 Responsive configuration
  responsive?: ResponsiveConfig;
  
  // 📋 Rich metadata for AI understanding
  metadata: {
    description: string;
    category: 'layout' | 'content' | 'media' | 'navigation';
    keywords: string[];
    usageExamples: Array<{
      description: string;
      props: TProps;
    }>;
  };
}
```

### Example: Hero Partial Implementation

```typescript
const HeroPartial: AgentPartial<HeroProps> = {
  schema: z.object({
    title: z.string().describe("Main headline text"),
    subtitle: z.string().optional().describe("Supporting subtitle"), 
    backgroundImage: z.string().url().optional(),
    ctaButton: z.object({
      text: z.string(),
      url: z.string().url(),
      variant: z.enum(['primary', 'secondary', 'outline'])
    }).optional(),
    alignment: z.enum(['left', 'center', 'right']).default('center')
  }),
  
  template: (props, helpers) => `
    <section class="hero ${props.alignment}">
      <div class="hero__content">
        <h1 class="hero__title">${props.title}</h1>
        ${props.subtitle ? `<p class="hero__subtitle">${props.subtitle}</p>` : ''}
        ${props.ctaButton ? `
          <a href="${props.ctaButton.url}" class="hero__cta hero__cta--${props.ctaButton.variant}">
            ${props.ctaButton.text}
          </a>
        ` : ''}
      </div>
    </section>
  `,
  
  styles: `
    .hero { /* Automatically scoped to hero-partial__hero */ }
    .hero__title { font-size: clamp(2rem, 5vw, 4rem); }
    .hero__cta--primary { background: #3b82f6; color: white; }
  `,
  
  metadata: {
    description: "Flexible hero section with background, alignment, and CTA options",
    category: 'layout',
    keywords: ['hero', 'banner', 'cta', 'background'],
    usageExamples: [
      {
        description: "Simple centered hero",
        props: { title: "Welcome", alignment: 'center' }
      },
      {
        description: "Hero with CTA button",
        props: {
          title: "Get Started Today",
          ctaButton: { text: "Start Free Trial", url: "/signup", variant: 'primary' }
        }
      }
    ]
  }
};
```

### AI-Powered Composition

The real magic happens when **LLMs can understand and compose** these partials:

```bash
# Natural language composition
agentstatic compose "Create a landing page with hero, features section, and testimonials"

# AI can:
# 1. Read all available partial schemas
# 2. Understand data requirements  
# 3. Generate valid prop combinations
# 4. Compose layouts with proper dependencies
# 5. Validate the entire composition
```

**LLM Composition Flow:**
```typescript
// 1. LLM queries available partials
const partials = registry.getPartialSchemas();

// 2. LLM understands requirements from schemas
partials.hero.schema // → knows it needs title, subtitle, etc.

// 3. LLM generates valid composition
const layout = await mcp.composeLayout({
  type: 'landing',
  sections: ['hero', 'features', 'testimonials'],
  style: 'modern'
});

// 4. Validation ensures everything works
layout.validate(); // ✅ Type-safe composition
```

## 🏗️ Technical Architecture

### Core Technology Stack

```
Runtime:           Node.js 24.x (latest features)
Language:          TypeScript 5.x (strict mode, zero `any` types)
Validation:        Zod (runtime + compile-time type safety)
Content:           Unified ecosystem (remark/rehype)
Images:            Sharp (high-performance optimization)  
Templates:         TypeScript functions (no traditional templating)
Styles:            Scoped CSS modules (framework-free)
AI Integration:    Model Context Protocol (MCP)
Testing:           Vitest (TDD throughout)
Build:             ESBuild (sub-100ms builds)
Quality:           Husky pre-commit hooks
```

### Project Structure

```
src/
├── core/
│   ├── partial-engine.ts      # Core partial rendering system
│   ├── schema-registry.ts     # Zod schema management
│   ├── content-processor.ts   # Unified markdown pipeline
│   ├── build-system.ts        # Production optimization
│   └── performance-monitor.ts # Core Web Vitals tracking
├── partials/
│   ├── layout/                # Hero, navigation, footer
│   │   ├── hero.partial.ts
│   │   └── navigation.partial.ts
│   ├── content/               # Articles, galleries, embeds
│   ├── interactive/           # Forms, search, modals
│   └── media/                 # Images, videos, carousels
├── helpers/
│   ├── template-helpers.ts    # date-fns, lodash-es utilities
│   ├── asset-helpers.ts       # Sharp image optimization
│   └── seo-helpers.ts         # Meta tags, Schema.org
├── cli/
│   ├── commands/              # Interactive CLI commands
│   └── generators/            # Code scaffolding
├── mcp/
│   ├── partial-server.ts      # MCP integration
│   └── layout-composer.ts     # AI-powered composition
└── types/
    ├── partial.ts             # Core type definitions
    └── content.ts             # Content schemas
```

## 📝 Template Helper System

AgentStatic provides a comprehensive helper system using industry-standard libraries:

```typescript
interface TemplateHelpers {
  // 📅 Date utilities powered by date-fns
  formatDate: (date: Date, format?: string) => string;
  timeAgo: (date: Date) => string;
  
  // 📝 Content utilities  
  truncate: (text: string, length: number) => string;
  slugify: (text: string) => string;
  markdown: (content: string) => string;
  
  // 🖼️ Asset utilities with Sharp integration
  optimizeImage: (src: string, options?: ImageOptions) => string;
  generateSrcSet: (src: string) => string;
  
  // 🔧 Lodash-es utilities (tree-shakable)
  chunk: typeof chunk;
  groupBy: typeof groupBy;
  sortBy: typeof sortBy;
  
  // 🌐 URL and navigation
  url: (path: string) => string;
  isActive: (path: string) => boolean;
  
  // 🎯 Partial composition
  renderPartial: <T>(name: string, props: T) => string;
  conditionalClass: (condition: boolean, className: string) => string;
}
```

### Usage in Templates

```typescript
template: (props, helpers) => `
  <article class="post">
    <time>${helpers.formatDate(props.publishedAt, 'MMM dd, yyyy')}</time>
    <h1>${props.title}</h1>
    <p>${helpers.truncate(props.excerpt, 150)}</p>
    
    ${helpers.chunk(props.images, 3).map(imageRow => `
      <div class="image-row">
        ${imageRow.map(img => `
          <img src="${helpers.optimizeImage(img.src, { width: 400 })}"
               srcset="${helpers.generateSrcSet(img.src)}"
               alt="${img.alt}" />
        `).join('')}
      </div>
    `).join('')}
    
    ${helpers.renderPartial('social-share', { 
      url: helpers.url(props.slug),
      title: props.title 
    })}
  </article>
`
```

## 🤖 AI-Native Features

### Model Context Protocol Integration

AgentStatic is built **MCP-first** for deep AI integration:

```typescript
interface MCPPartialServer {
  // Export schemas for LLM consumption
  exportSchemas(): Promise<PartialSchemaMap>;
  
  // Generate partials from natural language
  generatePartial(description: string): Promise<AgentPartial<any>>;
  
  // Intelligent layout composition
  composeLayout(requirements: LayoutRequirements): Promise<ComposedLayout>;
  
  // Content enhancement and optimization
  optimizeContent(content: string): Promise<EnhancedContent>;
}
```

### Natural Language Commands

```bash
# Create new partials
agentstatic create "testimonial carousel with star ratings and photos"

# Compose layouts  
agentstatic compose "photography portfolio homepage with hero and gallery grid"

# Optimize content
agentstatic enhance "improve SEO and accessibility for all pages"

# Generate variations
agentstatic variant hero --style="minimal" --alignment="left"
```

## 📸 Portfolio-First Design

### Photography Showcase

```typescript
const GalleryPartial: AgentPartial<GalleryProps> = {
  schema: z.object({
    title: z.string(),
    photos: z.array(z.object({
      src: z.string().url(),
      alt: z.string(),
      caption: z.string().optional(),
      exif: z.object({
        camera: z.string(),
        lens: z.string(), 
        settings: z.string()
      }).optional()
    })),
    layout: z.enum(['masonry', 'grid', 'carousel']).default('masonry'),
    lightbox: z.boolean().default(true)
  }),
  
  template: (props, helpers) => `
    <section class="gallery gallery--${props.layout}">
      <h2>${props.title}</h2>
      <div class="gallery__grid">
        ${props.photos.map(photo => `
          <figure class="gallery__item">
            <img src="${helpers.optimizeImage(photo.src, { width: 800 })}"
                 srcset="${helpers.generateSrcSet(photo.src)}"
                 alt="${photo.alt}"
                 ${props.lightbox ? 'data-lightbox="gallery"' : ''} />
            ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ''}
            ${photo.exif ? `
              <div class="gallery__exif">
                ${photo.exif.camera} • ${photo.exif.lens} • ${photo.exif.settings}
              </div>
            ` : ''}
          </figure>
        `).join('')}
      </div>
    </section>
  `
};
```

### Advanced Media Features

- **Responsive Images**: Automatic WebP/AVIF generation with Sharp
- **EXIF Data**: Preserve and display photography metadata  
- **Lazy Loading**: Performance-optimized image loading
- **Lightbox**: Keyboard navigation and touch gestures
- **Print Optimization**: High-resolution output for portfolios

## 🧪 Test-Driven Development

AgentStatic is built using **comprehensive TDD** from day one:

### Quality Gates (Husky Pre-commit Hooks)

```bash
# Every commit validates:
✅ TypeScript type checking (zero `any` types)
✅ ESLint with strict rules (zero warnings)  
✅ Prettier formatting consistency
✅ Unit test suite (>90% coverage)
✅ Build validation (production-ready)
```

### TDD Workflow Example

```typescript
// 1. Write failing test first
test('should render hero with CTA button', () => {
  const engine = new PartialEngine();
  engine.register('hero', HeroPartial);
  
  const result = engine.render('hero', {
    title: 'Welcome',
    ctaButton: { text: 'Get Started', url: '/signup', variant: 'primary' }
  });
  
  expect(result).toContain('Welcome');
  expect(result).toContain('Get Started');
  expect(result).toContain('href="/signup"');
});

// 2. Implement minimal code to pass
// 3. Refactor and enhance
// 4. Repeat for all features
```

## ⚡ Performance & Build System

### Lightning-Fast Development

- **Sub-100ms builds** with ESBuild
- **Hot reload <200ms** with file watching  
- **Instant type checking** with TypeScript strict mode
- **Live validation** with Zod schemas

### Production Optimizations

- **Image compression >60%** with Sharp (WebP, AVIF)
- **CSS minification** with critical path extraction
- **JavaScript tree-shaking** with dead code elimination
- **Bundle analysis** with size recommendations
- **Core Web Vitals >90** for all generated sites

### Multi-Platform Deployment

```bash
# Deploy anywhere in seconds
agentstatic deploy s3 --bucket my-portfolio
agentstatic deploy netlify --site-id abc123  
agentstatic deploy vercel --project my-site
agentstatic deploy github-pages --repo username/portfolio
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 24.x** (latest features and performance)
- **npm/yarn** package manager
- **Git** for version control

### Quick Start

```bash
# Initialize new project
npx create-agentstatic my-portfolio --template photography

# Start development (with hot reload)
cd my-portfolio
npm run dev

# Create your first partial
npm run create partial --name "testimonial" --category "content"

# Build for production 
npm run build

# Deploy to your platform
npm run deploy s3
```

### Project Templates

```bash
# Photography portfolio
npx create-agentstatic portfolio --template photography

# Developer blog  
npx create-agentstatic blog --template developer

# Agency showcase
npx create-agentstatic agency --template business

# Documentation site
npx create-agentstatic docs --template documentation
```

## 📊 Why AgentStatic?

### Unique Advantages

1. **🧠 AI-Native from Day One**
   - LLMs understand partial schemas
   - Natural language composition
   - Intelligent content optimization

2. **🎯 TypeScript-First Architecture**  
   - Zero `any` types throughout
   - Runtime + compile-time validation
   - Intelligent IDE autocomplete

3. **⚡ Unmatched Performance**
   - Framework-free (vanilla CSS/JS)
   - Sub-100ms development builds
   - >90 Lighthouse scores

4. **🎨 Creative Professional Focus**
   - Built for portfolios and showcases
   - Advanced media handling
   - Print-ready outputs

5. **🔮 Future-Proof Design**
   - MCP integration for AI extensibility
   - No framework lock-in
   - Continuous innovation ready

## 📚 Documentation & Community

- **[Getting Started Guide](./docs/getting-started.md)** - Your first AgentStatic site
- **[Partial Development](./docs/partials.md)** - Creating custom components
- **[AI Integration](./docs/ai-integration.md)** - MCP and LLM features  
- **[Performance Guide](./docs/performance.md)** - Optimization strategies
- **[API Reference](./docs/api.md)** - Complete technical reference

### Community

- **[GitHub Discussions](https://github.com/conorluddy/AgentStatic/discussions)** - Get help and share ideas
- **[Discord Server](https://discord.gg/agentstatic)** - Real-time community chat
- **[Examples Repository](https://github.com/agentstatic/examples)** - Sample sites and tutorials

---

## 🎖️ Built for Excellence

AgentStatic represents the **next evolution** of static site generators, combining the best of modern TypeScript development with AI-native design patterns. Created for developers and creative professionals who refuse to compromise on quality, performance, or innovation.

**Ready to build the future of web development?** 🚀

MIT License - Built with ❤️ for the creative community