# PILLAR 3: Build Engine

**Transforming Compositions into Optimized Static Sites**

This pillar contains the build system that processes component compositions, validates them, renders them to HTML/CSS, and outputs optimized static sites.

---

## Overview

The Build Engine is responsible for:
- **Processing** JSON page compositions
- **Validating** component usage via AST
- **Rendering** templates to static HTML
- **Bundling** and optimizing CSS
- **Generating** static site output

---

## The Four Phases

### Phase 1: Core Pipeline
**Duration**: 2 weeks | **Effort**: 15 hours

Set up the foundational build infrastructure:
- Bun runtime environment
- Vite build configuration
- Nunjucks template engine
- Static routing system
- Development server with HMR

**Deliverable**: Working build pipeline

---

### Phase 2: AST Processing
**Duration**: 1 week | **Effort**: 15 hours

Implement the Abstract Syntax Tree system:
- Define canonical AST schema
- Parse JSON compositions to AST
- Validate AST structure
- Transform AST for rendering
- Handle component slots and nesting

**Deliverable**: Complete AST processor

---

### Phase 3: Render System
**Duration**: 2 weeks | **Effort**: 20 hours

Build the template rendering engine:
- Nunjucks template processing
- Component composition
- Data binding
- HTML generation
- Static file output

**Deliverable**: Working render pipeline

---

### Phase 4: Output Optimization
**Duration**: 1 week | **Effort**: 10 hours

Optimize the build output:
- CSS bundling and minification
- Asset optimization
- Performance budgets
- Sitemap generation
- Build caching

**Deliverable**: Production-optimized output

---

## AST Schema

### Page Composition Format
```json
{
  "type": "page",
  "path": "/landing",
  "title": "Product Landing",
  "metadata": {
    "description": "Our amazing product",
    "canonical": "https://example.com/landing",
    "ogImage": "/images/og-landing.jpg"
  },
  "sections": [
    {
      "component": "organisms/hero-section",
      "variant": "split",
      "props": {
        "heading": "Build Faster, Ship Better",
        "subheading": "The static site generator for modern teams",
        "cta": {
          "text": "Get Started",
          "url": "/signup"
        }
      },
      "slots": {
        "image": {
          "component": "atoms/image",
          "props": {
            "src": "/images/hero.jpg",
            "alt": "Product screenshot"
          }
        }
      }
    }
  ]
}
```

### AST Node Structure
```typescript
interface ASTNode {
  type: 'page' | 'section' | 'component';
  component?: string;        // Component ID
  variant?: string;          // Component variant
  props?: Record<string, any>;
  slots?: Record<string, ASTNode | ASTNode[]>;
  children?: ASTNode[];      // For containers
  metadata?: Record<string, any>;
}
```

---

## Build Pipeline

### Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { nunjucks } from 'vite-plugin-nunjucks';
import { astProcessor } from './build/ast-processor';

export default defineConfig({
  plugins: [
    nunjucks({
      templatesDir: 'components',
      nunjucksEnvironment: {
        filters: { /* custom filters */ }
      }
    }),
    astProcessor()
  ],

  build: {
    outDir: 'dist',
    cssMinify: 'lightningcss',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js'
      }
    }
  },

  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-nesting'),
        require('autoprefixer')
      ]
    }
  }
});
```

### Build Process
```typescript
class BuildEngine {
  async build(config: BuildConfig): Promise<BuildResult> {
    // 1. Discover page compositions
    const pages = await this.discoverPages('site/pages');

    // 2. Process each page
    for (const pagePath of pages) {
      const composition = await this.loadComposition(pagePath);

      // 3. Parse to AST
      const ast = await this.parseToAST(composition);

      // 4. Validate AST
      const validation = await this.validateAST(ast);
      if (!validation.valid) {
        throw new BuildError(validation.errors);
      }

      // 5. Render to HTML
      const html = await this.renderAST(ast);

      // 6. Write output
      await this.writeOutput(html, ast.path);
    }

    // 7. Bundle CSS
    await this.bundleCSS();

    // 8. Generate sitemap
    await this.generateSitemap();

    return { success: true, pages: pages.length };
  }
}
```

---

## Template Rendering

### Nunjucks Integration
```nunjucks
{# components/organisms/hero-section/hero-section.njk #}
<section class="hero hero--{{ variant | default('default') }}">
  <div class="hero__container">
    <div class="hero__content">
      <h1 class="hero__heading">{{ heading }}</h1>
      {% if subheading %}
        <p class="hero__subheading">{{ subheading }}</p>
      {% endif %}

      {% if cta %}
        {% include "atoms/button/button.njk" with cta %}
      {% endif %}
    </div>

    {% if slots.image %}
      <div class="hero__media">
        {{ renderSlot(slots.image) | safe }}
      </div>
    {% endif %}
  </div>
</section>
```

### Render Function
```typescript
async function renderAST(
  ast: ASTNode,
  context: RenderContext = {}
): Promise<string> {
  if (ast.type === 'page') {
    return renderPage(ast, context);
  }

  if (ast.type === 'component') {
    const templatePath = `${ast.component}/${basename(ast.component)}.njk`;
    const template = await loadTemplate(templatePath);

    const html = nunjucks.render(template, {
      ...ast.props,
      variant: ast.variant,
      slots: await renderSlots(ast.slots, context)
    });

    return html;
  }

  // Handle other node types...
}
```

---

## Static Routing

### File-Based Routing
```
site/pages/
├── index.json           → /index.html
├── about.json           → /about/index.html
├── products.json        → /products/index.html
├── products/
│   ├── widget.json      → /products/widget/index.html
│   └── gadget.json      → /products/gadget/index.html
└── contact.json         → /contact/index.html
```

### Route Generation
```typescript
function generateRoutes(pagesDir: string): Route[] {
  const pages = glob.sync('**/*.json', { cwd: pagesDir });

  return pages.map(page => {
    const name = page.replace('.json', '');
    const path = name === 'index' ? '/' : `/${name}`;
    const outputPath = name === 'index'
      ? '/index.html'
      : `/${name}/index.html`;

    return {
      source: page,
      path,
      outputPath
    };
  });
}
```

---

## CSS Bundling

### Bundle Strategy
```typescript
class CSSBundler {
  async bundle(components: Component[]): Promise<string> {
    const css = [];

    // 1. System styles (tokens, base)
    css.push(await this.loadCSS('_system/tokens.css'));
    css.push(await this.loadCSS('_system/base.css'));

    // 2. Component styles (deduplicated)
    const used = new Set<string>();
    for (const component of components) {
      if (!used.has(component.id)) {
        css.push(await this.loadComponentCSS(component));
        used.add(component.id);
      }
    }

    // 3. Utilities
    css.push(await this.loadCSS('_system/utilities.css'));

    // 4. Process with Lightning CSS
    const bundled = await this.process(css.join('\n'));

    // 5. Check size
    const sizeKB = Buffer.byteLength(bundled) / 1024;
    if (sizeKB > 42) {
      console.warn(`⚠️ CSS bundle is ${sizeKB.toFixed(1)}KB (target: <42KB)`);
    }

    return bundled;
  }
}
```

---

## Performance Optimization

### Build Performance Targets
- Page build time: <100ms per page
- Total build time: <10 seconds for 100 pages
- CSS bundle: <50KB gzipped
- Asset optimization: automatic for images >4KB

### Optimization Techniques
```typescript
const optimizations = {
  css: {
    minify: true,
    sourceMap: false,
    targets: ['defaults', 'not IE 11']
  },

  html: {
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true
    }
  },

  images: {
    formats: ['avif', 'webp', 'original'],
    sizes: [640, 768, 1024, 1440, 1920]
  },

  caching: {
    css: '1 year',
    js: '1 year',
    images: '1 year',
    html: 'no-cache'
  }
};
```

---

## CLI Interface

### Commands
```bash
# Development
agentstatic dev                    # Start dev server
agentstatic dev --port 3000       # Custom port

# Build
agentstatic build                  # Production build
agentstatic build --analyze       # With bundle analysis

# Validation
agentstatic validate pages/*.json  # Validate compositions

# Preview
agentstatic preview               # Preview production build
```

### Implementation
```typescript
#!/usr/bin/env bun

import { Command } from 'commander';
import { BuildEngine } from './build-engine';

const program = new Command();

program
  .name('agentstatic')
  .description('AgentStatic CLI')
  .version('1.0.0');

program
  .command('build')
  .description('Build static site')
  .option('--analyze', 'Analyze bundle size')
  .action(async (options) => {
    const engine = new BuildEngine();
    await engine.build({
      analyze: options.analyze
    });
  });

// ... other commands ...

program.parse();
```

---

## Success Criteria

### Phase 1 Complete When
- [ ] Bun + Vite configured
- [ ] Nunjucks integrated
- [ ] Dev server working
- [ ] Static routing functional

### Phase 2 Complete When
- [ ] AST schema defined
- [ ] Parser working
- [ ] Validation integrated
- [ ] Transforms functional

### Phase 3 Complete When
- [ ] Templates rendering
- [ ] Composition working
- [ ] HTML generating
- [ ] Output correct

### Phase 4 Complete When
- [ ] CSS bundled <50KB
- [ ] Build time <10s
- [ ] Assets optimized
- [ ] Production ready

---

*This pillar transforms ideas into reality - compositions into sites.*