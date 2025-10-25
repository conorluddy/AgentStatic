# Phase 3: Template Rendering

**Status:** Not Started
**Duration:** 10-12 days
**Effort:** High
**Timeline:** Week 5-6

## Overview

This phase implements the template rendering system that transforms validated AST nodes into HTML using Nunjucks templates. The rendering system handles component resolution, recursive slot rendering, layout application, and asset collection.

### Goals

- Transform validated AST into HTML
- Support recursive component and slot rendering
- Apply layouts with metadata injection
- Collect component assets (CSS, JS)
- Provide detailed error context
- Achieve high performance through caching

### Dependencies

- Phase 1: AST Parser (complete)
- Phase 2: AST Validation (complete)
- Component Registry with template files
- Nunjucks template engine

### Success Metrics

- Render 100 pages in <5 seconds
- Template compilation cached effectively
- Error messages include component context
- Support 5+ levels of nested components
- Zero XSS vulnerabilities

## Architecture

### Rendering Pipeline

```
PageNode
  ↓
RenderContext Building
  ↓
Section Rendering (parallel)
  ↓
Component Resolution
  ↓
Slot Rendering (recursive)
  ↓
Template Execution
  ↓
Layout Application
  ↓
Asset Collection
  ↓
Final HTML
```

### Key Components

1. **TemplateEngine** - Nunjucks configuration and management
2. **ComponentResolver** - Template loading and caching
3. **RenderContextBuilder** - Context preparation
4. **SlotRenderer** - Recursive rendering logic
5. **PageRenderer** - Orchestrates rendering
6. **LayoutRenderer** - Layout application
7. **AssetCollector** - CSS/JS collection

## Implementation

### 1. Nunjucks Template Engine Setup

Configure Nunjucks with appropriate security and performance settings.

```typescript
// src/build/render/TemplateEngine.ts

import nunjucks from 'nunjucks';
import { marked } from 'marked';

export interface TemplateEngineOptions {
  templateDirs: string[];
  production: boolean;
  autoescape?: boolean;
}

export class TemplateEngine {
  private env: nunjucks.Environment;

  constructor(options: TemplateEngineOptions) {
    // Configure Nunjucks environment
    this.env = nunjucks.configure(options.templateDirs, {
      autoescape: options.autoescape ?? true,  // XSS protection
      trimBlocks: true,                         // Clean whitespace
      lstripBlocks: true,                       // Clean indentation
      noCache: !options.production,             // Cache in production
      throwOnUndefined: false,                  // Graceful undefined handling
      tags: {
        blockStart: '{%',
        blockEnd: '%}',
        variableStart: '{{',
        variableEnd: '}}',
        commentStart: '{#',
        commentEnd: '#}'
      }
    });

    // Register custom filters and globals
    this.registerFilters();
    this.registerGlobals();
  }

  /**
   * Register custom Nunjucks filters for template use
   */
  private registerFilters(): void {
    // Safe filter - mark content as safe HTML
    this.env.addFilter('safe', (str: string) =>
      new nunjucks.runtime.SafeString(str)
    );

    // JSON stringify filter
    this.env.addFilter('json', (obj: any, indent: number = 2) =>
      JSON.stringify(obj, null, indent)
    );

    // Markdown to HTML filter
    this.env.addFilter('markdown', (text: string) => {
      return new nunjucks.runtime.SafeString(marked(text));
    });

    // URL-safe slug filter
    this.env.addFilter('slug', (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
    );

    // Truncate text filter
    this.env.addFilter('truncate', (text: string, length: number = 100) => {
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    });

    // Date formatting filter
    this.env.addFilter('formatDate', (date: Date, format: string = 'short') => {
      const options: Intl.DateTimeFormatOptions =
        format === 'long'
          ? { year: 'numeric', month: 'long', day: 'numeric' }
          : { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    });
  }

  /**
   * Register global variables and functions
   */
  private registerGlobals(): void {
    // Current year for copyright notices
    this.env.addGlobal('currentYear', () => new Date().getFullYear());

    // Unique ID generator for accessibility
    this.env.addGlobal('uniqueId', () => {
      return `id-${Math.random().toString(36).substr(2, 9)}`;
    });
  }

  /**
   * Render a template with given context
   */
  async render(templatePath: string, context: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.env.render(templatePath, context, (err, result) => {
        if (err) {
          reject(new TemplateRenderError(
            `Failed to render template: ${templatePath}`,
            templatePath,
            err
          ));
        } else {
          resolve(result || '');
        }
      });
    });
  }

  /**
   * Get compiled template for reuse
   */
  getTemplate(templatePath: string): nunjucks.Template {
    return this.env.getTemplate(templatePath);
  }

  /**
   * Add custom filter at runtime
   */
  addFilter(name: string, fn: (...args: any[]) => any): void {
    this.env.addFilter(name, fn);
  }

  /**
   * Add custom global at runtime
   */
  addGlobal(name: string, value: any): void {
    this.env.addGlobal(name, value);
  }

  /**
   * Get the Nunjucks environment for advanced use
   */
  getEnvironment(): nunjucks.Environment {
    return this.env;
  }
}

export class TemplateRenderError extends Error {
  constructor(
    message: string,
    public templatePath: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'TemplateRenderError';
  }
}
```

### 2. Component Resolution System

Efficiently resolve and cache component templates.

```typescript
// src/build/render/ComponentResolver.ts

import { ComponentRegistry } from '../../registry/ComponentRegistry';
import { ComponentId, ComponentDefinition } from '../../types/component';
import { TemplateEngine } from './TemplateEngine';
import nunjucks from 'nunjucks';

export interface ResolvedComponent {
  id: ComponentId;
  variant?: string;
  template: nunjucks.Template;
  definition: ComponentDefinition;
}

export class ComponentResolver {
  private templateCache: Map<string, nunjucks.Template>;
  private componentDefs: Map<ComponentId, ComponentDefinition>;

  constructor(
    private registry: ComponentRegistry,
    private templateEngine: TemplateEngine
  ) {
    this.templateCache = new Map();
    this.componentDefs = new Map();
  }

  /**
   * Resolve a component and its template
   *
   * @param componentId - Component identifier (e.g., "atoms/button")
   * @param variant - Optional variant name
   * @returns Resolved component with compiled template
   */
  async resolve(
    componentId: ComponentId,
    variant?: string
  ): Promise<ResolvedComponent> {
    const cacheKey = this.buildCacheKey(componentId, variant);

    // Check template cache
    if (this.templateCache.has(cacheKey)) {
      return {
        id: componentId,
        variant,
        template: this.templateCache.get(cacheKey)!,
        definition: this.componentDefs.get(componentId)!
      };
    }

    // Get component definition from registry
    const definition = this.registry.get(componentId);
    if (!definition) {
      throw new ComponentNotFoundError(componentId);
    }

    // Validate variant if specified
    if (variant && !definition.variants.includes(variant)) {
      throw new InvalidVariantError(componentId, variant, definition.variants);
    }

    // Load and compile template
    const templatePath = definition.files.template;
    const template = this.loadTemplate(templatePath);

    // Cache compiled template and definition
    this.templateCache.set(cacheKey, template);
    this.componentDefs.set(componentId, definition);

    return {
      id: componentId,
      variant,
      template,
      definition
    };
  }

  /**
   * Load and compile a template
   */
  private loadTemplate(path: string): nunjucks.Template {
    try {
      return this.templateEngine.getTemplate(path);
    } catch (error) {
      throw new TemplateLoadError(
        `Failed to load template: ${path}`,
        path,
        error as Error
      );
    }
  }

  /**
   * Build cache key for component + variant combination
   */
  private buildCacheKey(componentId: ComponentId, variant?: string): string {
    return variant ? `${componentId}:${variant}` : componentId;
  }

  /**
   * Clear all cached templates (useful in development)
   */
  clearCache(): void {
    this.templateCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.templateCache.size,
      keys: Array.from(this.templateCache.keys())
    };
  }
}

export class ComponentNotFoundError extends Error {
  constructor(public componentId: ComponentId) {
    super(`Component not found: ${componentId}`);
    this.name = 'ComponentNotFoundError';
  }
}

export class InvalidVariantError extends Error {
  constructor(
    public componentId: ComponentId,
    public variant: string,
    public availableVariants: string[]
  ) {
    super(
      `Invalid variant "${variant}" for component "${componentId}". ` +
      `Available variants: ${availableVariants.join(', ')}`
    );
    this.name = 'InvalidVariantError';
  }
}

export class TemplateLoadError extends Error {
  constructor(
    message: string,
    public templatePath: string,
    public cause: Error
  ) {
    super(message);
    this.name = 'TemplateLoadError';
  }
}
```

### 3. Render Context Building

Create context objects for template rendering.

```typescript
// src/build/render/RenderContext.ts

import { ComponentRegistry } from '../../registry/ComponentRegistry';
import { ComponentResolver, ResolvedComponent } from './ComponentResolver';
import { PageNode, ASTNode } from '../../types/ast';
import { SiteConfig } from '../../types/config';

export interface PageMetadata {
  title: string;
  path: string;
  description?: string;
  keywords?: string[];
  lang?: string;
  layout?: string;
  bodyClass?: string;
  styles?: string[];
  scripts?: string[];
  [key: string]: any;
}

export interface RenderContext {
  // Component resolution
  componentRegistry: ComponentRegistry;
  resolveComponent: (id: string, variant?: string) => Promise<ResolvedComponent>;

  // Slot rendering function (injected per render)
  renderSlot: (slot: ASTNode | ASTNode[]) => Promise<string>;

  // Page and site data
  page: PageMetadata;
  site: SiteConfig;

  // Helper functions
  helpers: Record<string, Function>;

  // Custom filters
  filters: Record<string, Function>;
}

export interface RenderOptions {
  defaultLayout?: string;
  production?: boolean;
  minify?: boolean;
  collectAssets?: boolean;
}

export class RenderContextBuilder {
  constructor(
    private registry: ComponentRegistry,
    private resolver: ComponentResolver,
    private siteConfig: SiteConfig
  ) {}

  /**
   * Build a render context for a page
   */
  build(page: PageNode, options: RenderOptions): RenderContext {
    return {
      componentRegistry: this.registry,
      resolveComponent: this.resolver.resolve.bind(this.resolver),

      // renderSlot will be injected by SlotRenderer
      renderSlot: async () => {
        throw new Error('renderSlot not initialized');
      },

      page: this.buildPageMetadata(page),
      site: this.siteConfig,
      helpers: this.buildHelpers(options),
      filters: this.buildFilters()
    };
  }

  /**
   * Extract page metadata from PageNode
   */
  private buildPageMetadata(page: PageNode): PageMetadata {
    return {
      title: page.title,
      path: page.path,
      description: page.metadata.description,
      keywords: page.metadata.keywords,
      lang: page.metadata.lang || 'en',
      layout: page.metadata.layout,
      bodyClass: page.metadata.bodyClass,
      styles: page.metadata.styles || [],
      scripts: page.metadata.scripts || [],
      ...page.metadata
    };
  }

  /**
   * Build helper functions available in templates
   */
  private buildHelpers(options: RenderOptions): Record<string, Function> {
    return {
      // Asset path helper
      asset: (path: string) => {
        const base = this.siteConfig.assetPath || '/assets';
        return `${base}/${path}`.replace(/\/+/g, '/');
      },

      // URL builder helper
      url: (path: string) => {
        const base = this.siteConfig.baseUrl || '';
        return `${base}${path}`.replace(/([^:]\/)\/+/g, '$1');
      },

      // Format date helper
      formatDate: (date: Date | string, format: string = 'short') => {
        const d = typeof date === 'string' ? new Date(date) : date;
        const options: Intl.DateTimeFormatOptions =
          format === 'long'
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };
        return d.toLocaleDateString('en-US', options);
      },

      // Environment check
      isProd: () => options.production ?? false,
      isDev: () => !(options.production ?? false),

      // Current year for copyright
      currentYear: () => new Date().getFullYear()
    };
  }

  /**
   * Build custom filters for template use
   */
  private buildFilters(): Record<string, Function> {
    return {
      // JSON stringify
      json: (obj: any, indent: number = 2) =>
        JSON.stringify(obj, null, indent),

      // URL-safe slug
      slug: (text: string) =>
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-'),

      // Truncate text
      truncate: (text: string, length: number = 100) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
      }
    };
  }
}
```

### 4. Slot Rendering Mechanism

Recursive rendering of slots and components.

```typescript
// src/build/render/SlotRenderer.ts

import { ComponentResolver } from './ComponentResolver';
import { TemplateEngine } from './TemplateEngine';
import { RenderContext } from './RenderContext';
import { ASTNode, ComponentNode, TextNode, SlotDefinition } from '../../types/ast';
import { escapeHtml } from '../../utils/html';

export class SlotRenderer {
  constructor(
    private resolver: ComponentResolver,
    private templateEngine: TemplateEngine
  ) {}

  /**
   * Render slot content (single node or array of nodes)
   *
   * @param slot - Slot content to render
   * @param context - Render context
   * @returns Rendered HTML string
   */
  async render(
    slot: ASTNode | ASTNode[],
    context: RenderContext
  ): Promise<string> {
    const nodes = Array.isArray(slot) ? slot : [slot];

    // Render all nodes in parallel
    const rendered = await Promise.all(
      nodes.map(node => this.renderNode(node, context))
    );

    return rendered.join('\n');
  }

  /**
   * Render a single AST node
   */
  private async renderNode(
    node: ASTNode,
    context: RenderContext
  ): Promise<string> {
    switch (node.type) {
      case 'text':
        return this.renderText(node as TextNode);

      case 'component':
        return this.renderComponent(node as ComponentNode, context);

      default:
        throw new RenderError(
          `Unknown node type: ${(node as any).type}`
        );
    }
  }

  /**
   * Render text node with HTML escaping
   */
  private renderText(node: TextNode): string {
    // Escape HTML unless explicitly marked safe
    return escapeHtml(node.content);
  }

  /**
   * Render component node with template
   */
  private async renderComponent(
    node: ComponentNode,
    context: RenderContext
  ): Promise<string> {
    try {
      // Resolve component template
      const resolved = await context.resolveComponent(
        node.componentId,
        node.variant
      );

      // Render all slots recursively
      const renderedSlots: Record<string, string> = {};
      if (node.slots) {
        for (const [slotName, slotContent] of Object.entries(node.slots)) {
          renderedSlots[slotName] = await this.render(slotContent, context);
        }
      }

      // Build template context
      const templateContext = this.buildTemplateContext(
        node,
        resolved,
        renderedSlots,
        context
      );

      // Render template with context
      const html = await resolved.template.render(templateContext);

      return html;

    } catch (error) {
      throw new ComponentRenderError(
        `Failed to render component: ${node.componentId}`,
        {
          componentId: node.componentId,
          location: node.location,
          variant: node.variant,
          props: node.props
        },
        error as Error
      );
    }
  }

  /**
   * Build template rendering context
   */
  private buildTemplateContext(
    node: ComponentNode,
    resolved: any,
    renderedSlots: Record<string, string>,
    context: RenderContext
  ): any {
    return {
      // Component props
      ...node.props,

      // Active variant
      variant: node.variant || resolved.definition.defaultVariant,

      // Pre-rendered slots
      slots: renderedSlots,

      // renderSlot function for inline slot rendering in templates
      renderSlot: async (slotContent: ASTNode | ASTNode[]) =>
        this.render(slotContent, context),

      // Page metadata
      page: context.page,

      // Site configuration
      site: context.site,

      // Helper functions
      ...context.helpers
    };
  }

  /**
   * Render slot with fallback support
   *
   * @param slotDef - Slot definition with fallback
   * @param slotContent - Provided slot content (optional)
   * @param context - Render context
   * @returns Rendered HTML or fallback
   */
  async renderSlotWithFallback(
    slotDef: SlotDefinition,
    slotContent: ASTNode | ASTNode[] | undefined,
    context: RenderContext
  ): Promise<string> {
    // Use provided content if available
    if (slotContent) {
      return this.render(slotContent, context);
    }

    // Use default content from slot definition
    if (slotDef.default) {
      return this.render(slotDef.default, context);
    }

    // Required slot missing - throw error
    if (slotDef.required) {
      throw new MissingSlotError(slotDef.name);
    }

    // Optional slot with no default - return empty string
    return '';
  }
}

export class RenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RenderError';
  }
}

export class ComponentRenderError extends RenderError {
  constructor(
    message: string,
    public componentContext: {
      componentId: string;
      location?: any;
      variant?: string;
      props?: Record<string, any>;
    },
    public cause?: Error
  ) {
    super(message);
    this.name = 'ComponentRenderError';
  }

  /**
   * Format error with component context
   */
  format(): string {
    const location = this.componentContext.location
      ? `${this.componentContext.location.file}:${this.componentContext.location.line}:${this.componentContext.location.column}`
      : 'unknown';

    let formatted = `
Component Render Error
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Component: ${this.componentContext.componentId}
Location:  ${location}
${this.componentContext.variant ? `Variant:   ${this.componentContext.variant}` : ''}

${this.message}
`.trim();

    if (this.cause) {
      formatted += `\n\nCaused by:\n${this.cause.message}`;
      if (this.cause.stack) {
        formatted += `\n\n${this.cause.stack}`;
      }
    }

    return formatted;
  }
}

export class MissingSlotError extends RenderError {
  constructor(public slotName: string) {
    super(`Required slot "${slotName}" is missing`);
    this.name = 'MissingSlotError';
  }
}
```

### 5. Page Rendering Pipeline

Orchestrate the complete page rendering process.

```typescript
// src/build/render/PageRenderer.ts

import { RenderContextBuilder, RenderContext, RenderOptions } from './RenderContext';
import { SlotRenderer } from './SlotRenderer';
import { LayoutRenderer } from './LayoutRenderer';
import { PageNode } from '../../types/ast';

export interface RenderedPage {
  path: string;
  html: string;
  metadata: Record<string, any>;
  assets?: {
    styles: string[];
    scripts: string[];
  };
}

export class PageRenderer {
  constructor(
    private contextBuilder: RenderContextBuilder,
    private slotRenderer: SlotRenderer,
    private layoutRenderer: LayoutRenderer
  ) {}

  /**
   * Render a complete page from AST
   *
   * @param page - Validated PageNode
   * @param options - Rendering options
   * @returns Rendered page with HTML and metadata
   */
  async render(
    page: PageNode,
    options: RenderOptions = {}
  ): Promise<RenderedPage> {
    // Build render context
    const context = this.contextBuilder.build(page, options);

    // Inject renderSlot function into context
    context.renderSlot = (slot) => this.slotRenderer.render(slot, context);

    // Render all page sections in parallel
    const sections = await Promise.all(
      page.sections.map(section => this.slotRenderer.render(section, context))
    );

    // Combine sections
    const content = sections.join('\n');

    // Apply layout
    const html = await this.layoutRenderer.applyLayout(
      content,
      page,
      context,
      options
    );

    return {
      path: page.path,
      html,
      metadata: page.metadata,
      assets: options.collectAssets ? this.collectAssets(page) : undefined
    };
  }

  /**
   * Render multiple pages in parallel
   */
  async renderMany(
    pages: PageNode[],
    options: RenderOptions = {}
  ): Promise<RenderedPage[]> {
    return Promise.all(
      pages.map(page => this.render(page, options))
    );
  }

  /**
   * Collect assets referenced in page
   */
  private collectAssets(page: PageNode): { styles: string[]; scripts: string[] } {
    return {
      styles: page.metadata.styles || [],
      scripts: page.metadata.scripts || []
    };
  }
}
```

### 6. Layout System

Apply HTML layouts with metadata injection.

```typescript
// src/build/render/LayoutRenderer.ts

import { TemplateEngine } from './TemplateEngine';
import { RenderContext, RenderOptions } from './RenderContext';
import { PageNode } from '../../types/ast';

export class LayoutRenderer {
  constructor(
    private templateEngine: TemplateEngine,
    private layoutsDir: string
  ) {}

  /**
   * Apply layout template to rendered content
   *
   * @param content - Rendered page content
   * @param page - Page node with metadata
   * @param context - Render context
   * @param options - Render options
   * @returns Complete HTML document
   */
  async applyLayout(
    content: string,
    page: PageNode,
    context: RenderContext,
    options: RenderOptions
  ): Promise<string> {
    // Determine layout
    const layoutName = page.metadata.layout || options.defaultLayout || 'default';
    const layoutPath = `${this.layoutsDir}/${layoutName}.njk`;

    // Build layout context
    const layoutContext = this.buildLayoutContext(content, page, context);

    try {
      // Render layout template
      return await this.templateEngine.render(layoutPath, layoutContext);
    } catch (error) {
      throw new LayoutRenderError(
        `Failed to render layout: ${layoutName}`,
        layoutName,
        error as Error
      );
    }
  }

  /**
   * Build context object for layout template
   */
  private buildLayoutContext(
    content: string,
    page: PageNode,
    context: RenderContext
  ): any {
    return {
      // Rendered page content
      content,

      // Page metadata
      page: context.page,

      // Site configuration
      site: context.site,

      // Helper functions
      ...context.helpers
    };
  }
}

export class LayoutRenderError extends Error {
  constructor(
    message: string,
    public layoutName: string,
    public cause: Error
  ) {
    super(message);
    this.name = 'LayoutRenderError';
  }
}
```

### 7. Default Layout Template

Provide a standard HTML5 layout.

```njk
{# templates/layouts/default.njk #}
<!DOCTYPE html>
<html lang="{{ page.lang or 'en' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {# Page title #}
  <title>{{ page.title }}{% if site.name %} | {{ site.name }}{% endif %}</title>

  {# SEO meta tags #}
  {% if page.description %}
  <meta name="description" content="{{ page.description }}">
  {% endif %}

  {% if page.keywords %}
  <meta name="keywords" content="{{ page.keywords | join(', ') }}">
  {% endif %}

  {# Open Graph meta tags #}
  <meta property="og:title" content="{{ page.title }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ url(page.path) }}">

  {% if page.description %}
  <meta property="og:description" content="{{ page.description }}">
  {% endif %}

  {% if page.image %}
  <meta property="og:image" content="{{ asset(page.image) }}">
  {% endif %}

  {# Twitter Card meta tags #}
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{{ page.title }}">

  {% if page.description %}
  <meta name="twitter:description" content="{{ page.description }}">
  {% endif %}

  {# Favicon #}
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

  {# Stylesheets #}
  <link rel="stylesheet" href="{{ asset('styles/main.css') }}">

  {% if page.styles %}
  {% for style in page.styles %}
  <link rel="stylesheet" href="{{ asset(style) }}">
  {% endfor %}
  {% endif %}

  {# Additional head content #}
  {% block head %}{% endblock %}
</head>

<body{% if page.bodyClass %} class="{{ page.bodyClass }}"{% endif %}>
  {# Skip to main content link for accessibility #}
  <a href="#main-content" class="skip-link">Skip to main content</a>

  {# Main content #}
  <main id="main-content">
    {{ content | safe }}
  </main>

  {# Scripts #}
  {% if page.scripts %}
  {% for script in page.scripts %}
  <script src="{{ asset(script) }}" defer></script>
  {% endfor %}
  {% endif %}

  {# Additional body content #}
  {% block scripts %}{% endblock %}
</body>
</html>
```

### 8. Asset Collection System

Collect CSS and JS from rendered components.

```typescript
// src/build/render/AssetCollector.ts

import { ComponentRegistry } from '../../registry/ComponentRegistry';
import { ComponentNode, ASTNode } from '../../types/ast';

export interface CollectedAssets {
  styles: string[];
  scripts: string[];
}

export class AssetCollector {
  private cssFiles = new Set<string>();
  private jsFiles = new Set<string>();

  constructor(private registry: ComponentRegistry) {}

  /**
   * Collect assets from AST nodes
   */
  async collect(nodes: ASTNode[]): Promise<CollectedAssets> {
    // Reset collections
    this.cssFiles.clear();
    this.jsFiles.clear();

    // Visit all nodes
    for (const node of nodes) {
      await this.visit(node);
    }

    return {
      styles: Array.from(this.cssFiles),
      scripts: Array.from(this.jsFiles)
    };
  }

  /**
   * Visit a single node
   */
  private async visit(node: ASTNode): Promise<void> {
    if (node.type === 'component') {
      await this.visitComponent(node as ComponentNode);
    }
  }

  /**
   * Visit component node and collect its assets
   */
  private async visitComponent(node: ComponentNode): Promise<void> {
    // Get component definition
    const definition = this.registry.get(node.componentId);

    if (!definition) {
      // Skip if component not found (will be caught by validator)
      return;
    }

    // Collect CSS file
    if (definition.files.styles) {
      this.cssFiles.add(definition.files.styles);
    }

    // Collect JS file
    if (definition.files.script) {
      this.jsFiles.add(definition.files.script);
    }

    // Recursively collect from slots
    if (node.slots) {
      for (const slotContent of Object.values(node.slots)) {
        for (const slotNode of slotContent) {
          await this.visit(slotNode);
        }
      }
    }
  }

  /**
   * Get unique CSS files
   */
  getStyles(): string[] {
    return Array.from(this.cssFiles);
  }

  /**
   * Get unique JS files
   */
  getScripts(): string[] {
    return Array.from(this.jsFiles);
  }
}
```

### 9. HTML Utilities

Helper functions for HTML processing.

```typescript
// src/utils/html.ts

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return text.replace(/[&<>"']/g, char => htmlEscapes[char]);
}

/**
 * Unescape HTML entities
 */
export function unescapeHtml(text: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  return text.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity]);
}

/**
 * Minify HTML by removing unnecessary whitespace
 */
export function minifyHtml(html: string): string {
  return html
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Trim
    .trim();
}

/**
 * Pretty print HTML with indentation
 */
export function prettyPrintHtml(html: string, indent: string = '  '): string {
  let formatted = '';
  let indentLevel = 0;

  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.match(/^<\/\w/)) {
      // Closing tag - decrease indent
      indentLevel--;
      formatted += `${indent.repeat(indentLevel)}${token}\n`;
    } else if (token.match(/^<\w[^>]*[^/]>$/)) {
      // Opening tag - add and increase indent
      formatted += `${indent.repeat(indentLevel)}${token}\n`;
      indentLevel++;
    } else if (token.match(/^<\w[^>]*\/>$/)) {
      // Self-closing tag - no indent change
      formatted += `${indent.repeat(indentLevel)}${token}\n`;
    } else {
      // Text content
      const trimmed = token.trim();
      if (trimmed) {
        formatted += `${indent.repeat(indentLevel)}${trimmed}\n`;
      }
    }
  }

  return formatted;
}
```

### 10. Error Handling

Comprehensive error handling with context.

```typescript
// src/build/render/errors.ts

import { SourceLocation } from '../../types/ast';

export class RenderPhaseError extends Error {
  constructor(
    message: string,
    public phase: 'template' | 'component' | 'slot' | 'layout',
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'RenderPhaseError';
  }
}

export class TemplateNotFoundError extends RenderPhaseError {
  constructor(public templatePath: string) {
    super(
      `Template not found: ${templatePath}`,
      'template',
      { templatePath }
    );
    this.name = 'TemplateNotFoundError';
  }
}

export class TemplateSyntaxError extends RenderPhaseError {
  constructor(
    message: string,
    public templatePath: string,
    public line?: number,
    public column?: number
  ) {
    super(
      `Template syntax error in ${templatePath}: ${message}`,
      'template',
      { templatePath, line, column }
    );
    this.name = 'TemplateSyntaxError';
  }
}

export class SlotRenderError extends RenderPhaseError {
  constructor(
    message: string,
    public slotName: string,
    public componentId: string,
    public location?: SourceLocation
  ) {
    super(
      `Error rendering slot "${slotName}" in component "${componentId}": ${message}`,
      'slot',
      { slotName, componentId, location }
    );
    this.name = 'SlotRenderError';
  }
}

/**
 * Format render error with context for display
 */
export function formatRenderError(error: Error): string {
  if (error instanceof RenderPhaseError) {
    let formatted = `
Render Error (${error.phase})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${error.message}
`.trim();

    if (error.context) {
      formatted += '\n\nContext:\n';
      for (const [key, value] of Object.entries(error.context)) {
        formatted += `  ${key}: ${JSON.stringify(value)}\n`;
      }
    }

    return formatted;
  }

  return error.message;
}
```

### 11. Testing Strategy

Comprehensive test coverage for rendering system.

```typescript
// tests/build/render/SlotRenderer.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { SlotRenderer } from '../../../src/build/render/SlotRenderer';
import { ComponentResolver } from '../../../src/build/render/ComponentResolver';
import { TemplateEngine } from '../../../src/build/render/TemplateEngine';
import { ComponentNode, TextNode } from '../../../src/types/ast';

describe('SlotRenderer', () => {
  let renderer: SlotRenderer;
  let resolver: ComponentResolver;
  let engine: TemplateEngine;

  beforeEach(() => {
    engine = new TemplateEngine({
      templateDirs: ['tests/fixtures/templates'],
      production: false
    });

    resolver = new ComponentResolver(mockRegistry, engine);
    renderer = new SlotRenderer(resolver, engine);
  });

  describe('renderText', () => {
    it('should render plain text', async () => {
      const node: TextNode = {
        type: 'text',
        content: 'Hello, world!'
      };

      const html = await renderer.render(node, mockContext);

      expect(html).toBe('Hello, world!');
    });

    it('should escape HTML in text', async () => {
      const node: TextNode = {
        type: 'text',
        content: '<script>alert("xss")</script>'
      };

      const html = await renderer.render(node, mockContext);

      expect(html).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });
  });

  describe('renderComponent', () => {
    it('should render simple component', async () => {
      const node: ComponentNode = {
        type: 'component',
        componentId: 'atoms/button',
        props: { text: 'Click me', variant: 'primary' },
        slots: {}
      };

      const html = await renderer.render(node, mockContext);

      expect(html).toContain('Click me');
      expect(html).toContain('button');
      expect(html).toContain('primary');
    });

    it('should render component with slots', async () => {
      const node: ComponentNode = {
        type: 'component',
        componentId: 'molecules/card',
        props: {},
        slots: {
          content: [
            {
              type: 'component',
              componentId: 'atoms/heading',
              props: { text: 'Card Title', level: 2 },
              slots: {}
            }
          ]
        }
      };

      const html = await renderer.render(node, mockContext);

      expect(html).toContain('<h2');
      expect(html).toContain('Card Title');
    });

    it('should handle nested components', async () => {
      const node: ComponentNode = {
        type: 'component',
        componentId: 'organisms/hero',
        props: {},
        slots: {
          content: [
            {
              type: 'component',
              componentId: 'molecules/card',
              props: {},
              slots: {
                content: [
                  {
                    type: 'component',
                    componentId: 'atoms/button',
                    props: { text: 'Learn More' },
                    slots: {}
                  }
                ]
              }
            }
          ]
        }
      };

      const html = await renderer.render(node, mockContext);

      expect(html).toContain('hero');
      expect(html).toContain('card');
      expect(html).toContain('Learn More');
    });
  });

  describe('error handling', () => {
    it('should throw ComponentRenderError for invalid component', async () => {
      const node: ComponentNode = {
        type: 'component',
        componentId: 'nonexistent/component',
        props: {},
        slots: {}
      };

      await expect(
        renderer.render(node, mockContext)
      ).rejects.toThrow('Component not found');
    });

    it('should include component context in error', async () => {
      const node: ComponentNode = {
        type: 'component',
        componentId: 'atoms/button',
        props: { invalidProp: 'value' },
        slots: {},
        location: {
          file: 'test.page',
          line: 10,
          column: 5
        }
      };

      try {
        await renderer.render(node, mockContext);
      } catch (error) {
        expect(error).toHaveProperty('componentContext');
        expect(error.componentContext).toMatchObject({
          componentId: 'atoms/button',
          location: { file: 'test.page', line: 10, column: 5 }
        });
      }
    });
  });
});
```

```typescript
// tests/build/render/PageRenderer.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { PageRenderer } from '../../../src/build/render/PageRenderer';
import { PageNode } from '../../../src/types/ast';

describe('PageRenderer', () => {
  let renderer: PageRenderer;

  beforeEach(() => {
    renderer = createPageRenderer();
  });

  it('should render complete page', async () => {
    const page: PageNode = {
      type: 'page',
      title: 'Test Page',
      path: '/test',
      sections: [
        [
          {
            type: 'component',
            componentId: 'organisms/hero',
            props: { title: 'Welcome' },
            slots: {}
          }
        ]
      ],
      metadata: {
        description: 'A test page',
        layout: 'default'
      }
    };

    const result = await renderer.render(page);

    expect(result.path).toBe('/test');
    expect(result.html).toContain('<!DOCTYPE html>');
    expect(result.html).toContain('Test Page');
    expect(result.html).toContain('Welcome');
  });

  it('should apply correct layout', async () => {
    const page: PageNode = {
      type: 'page',
      title: 'Test',
      path: '/test',
      sections: [],
      metadata: {
        layout: 'minimal'
      }
    };

    const result = await renderer.render(page);

    expect(result.html).toContain('minimal-layout');
  });

  it('should render multiple pages in parallel', async () => {
    const pages: PageNode[] = Array.from({ length: 10 }, (_, i) => ({
      type: 'page',
      title: `Page ${i}`,
      path: `/page-${i}`,
      sections: [],
      metadata: {}
    }));

    const start = Date.now();
    const results = await renderer.renderMany(pages);
    const duration = Date.now() - start;

    expect(results).toHaveLength(10);
    expect(duration).toBeLessThan(1000); // Should be fast with parallelization
  });
});
```

### 12. Performance Considerations

**Optimization Strategies:**

1. **Template Compilation Caching**
   - Nunjucks compiles templates once
   - Cache compiled templates per component+variant
   - Clear cache only in development mode

2. **Parallel Rendering**
   - Render page sections in parallel
   - Render multiple pages in parallel
   - Independent components can render concurrently

3. **Lazy Component Resolution**
   - Load component definitions on-demand
   - Cache resolved components
   - Preload commonly used components

4. **Memory Management**
   - Stream rendering for very large pages (future)
   - Clear caches periodically in long-running builds
   - Use WeakMap for temporary caches

5. **Asset Collection**
   - Collect assets once per component type
   - Deduplicate CSS/JS files
   - Parallel asset processing

**Performance Targets:**

- Render 100 pages: <5 seconds
- Template compilation: <100ms per template
- Component resolution: <10ms per component
- Memory usage: <500MB for 1000 pages

## Acceptance Criteria

### Functional Requirements

- [ ] Nunjucks engine configured with security settings
- [ ] Component templates load and compile correctly
- [ ] Variant resolution works for all variants
- [ ] Slots render recursively up to 10 levels deep
- [ ] Text nodes are HTML-escaped by default
- [ ] Layouts apply with correct metadata
- [ ] Asset collection identifies all CSS/JS files
- [ ] Custom filters and helpers work in templates

### Error Handling

- [ ] Component not found errors include component ID
- [ ] Template syntax errors show file and line number
- [ ] Slot errors include component and slot context
- [ ] Error messages are actionable and clear

### Performance

- [ ] Render 100 pages in under 5 seconds
- [ ] Template compilation cached effectively
- [ ] Component resolution cached effectively
- [ ] Parallel rendering reduces total time by 50%+

### Testing

- [ ] All unit tests pass
- [ ] Integration tests cover end-to-end rendering
- [ ] Error cases are tested
- [ ] Performance benchmarks meet targets

## Next Phase

After completing Phase 3, proceed to **Phase 4: Optimization**.

Phase 4 will cover:
- HTML minification
- CSS optimization and bundling
- JavaScript bundling
- Parallel build strategies
- Incremental rendering
- Build caching

## References

### Internal Documentation

- `SPEC/P3-ARCHITECTURE.md` - RenderContext specification
- `SPEC/P3-PHASE-1-PIPELINE.md` - AST structure
- `SPEC/P3-PHASE-2-AST-PROCESSING.md` - Validation requirements
- `SPEC/COMPONENT-SPECS.md` - Component template examples
- `SPEC/REFERENCE/ERROR-HANDLING.md` - Error type definitions
- `SPEC/REFERENCE/PROJECT-STRUCTURE.md` - File organization

### External Resources

- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [Nunjucks API Reference](https://mozilla.github.io/nunjucks/api.html)
- [Template Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Appendix: Template Examples

### Component Template with Slots

```njk
{# components/molecules/card.njk #}
<div class="card{% if variant %} card--{{ variant }}{% endif %}">
  {% if slots.header %}
  <div class="card__header">
    {{ slots.header | safe }}
  </div>
  {% endif %}

  <div class="card__body">
    {{ slots.content | safe }}
  </div>

  {% if slots.footer %}
  <div class="card__footer">
    {{ slots.footer | safe }}
  </div>
  {% endif %}
</div>
```

### Component Template with Props

```njk
{# components/atoms/button.njk #}
<button
  class="btn{% if variant %} btn--{{ variant }}{% endif %}"
  type="{{ type or 'button' }}"
  {% if disabled %}disabled{% endif %}
  {% if ariaLabel %}aria-label="{{ ariaLabel }}"{% endif %}
>
  {% if icon %}
  <span class="btn__icon">{{ icon }}</span>
  {% endif %}

  <span class="btn__text">{{ text }}</span>
</button>
```

### Layout with Conditional Sections

```njk
{# layouts/blog.njk #}
<!DOCTYPE html>
<html lang="{{ page.lang or 'en' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }} | {{ site.name }}</title>

  {% if page.description %}
  <meta name="description" content="{{ page.description }}">
  {% endif %}

  <link rel="stylesheet" href="{{ asset('styles/blog.css') }}">
</head>
<body>
  <article class="blog-post">
    <header class="blog-post__header">
      <h1>{{ page.title }}</h1>

      {% if page.author or page.date %}
      <div class="blog-post__meta">
        {% if page.author %}
        <span class="blog-post__author">By {{ page.author }}</span>
        {% endif %}

        {% if page.date %}
        <time class="blog-post__date" datetime="{{ page.date }}">
          {{ formatDate(page.date, 'long') }}
        </time>
        {% endif %}
      </div>
      {% endif %}
    </header>

    <div class="blog-post__content">
      {{ content | safe }}
    </div>
  </article>
</body>
</html>
```
