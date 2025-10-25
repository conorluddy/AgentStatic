# Build System Architecture

**Complete Technical Architecture for the AgentStatic Build Pipeline**

This document provides comprehensive specifications for the build system that transforms JSON compositions into optimized static HTML sites. It covers the entire pipeline from component resolution through final optimization.

---

## Build Pipeline Overview

### Data Flow Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  JSON Page      │────>│  AST            │────>│  Render         │
│  Composition    │     │  Generation     │     │  Context        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Static HTML    │<────│  Template       │<────│  Component      │
│  Output         │     │  Rendering      │     │  Resolution     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Transformation Pipeline Stages

#### Stage 1: JSON to AST Transformation
**Input**: Page JSON composition files
**Process**: Parse and validate JSON, construct AST tree
**Output**: Validated AST representation

```typescript
interface JSONToASTTransformer {
  transform(pageJson: PageComposition): ASTNode {
    // 1. Validate JSON schema
    this.validateSchema(pageJson);

    // 2. Parse sections into AST nodes
    const sections = pageJson.sections.map(section =>
      this.parseComponent(section)
    );

    // 3. Construct page-level AST
    return {
      type: 'page',
      metadata: pageJson.metadata,
      children: sections,
      layout: pageJson.layout || 'default'
    };
  }

  private parseComponent(component: ComponentDefinition): ComponentNode {
    return {
      type: 'component',
      componentId: component.component,
      variant: component.variant,
      props: this.validateProps(component.props),
      slots: this.parseSlots(component.slots),
      metadata: {
        sourceFile: component.__source,
        lineNumber: component.__line
      }
    };
  }
}
```

#### Stage 2: AST to Render Context
**Input**: Abstract Syntax Tree
**Process**: Resolve components, prepare render context
**Output**: Enriched context for template rendering

```typescript
interface ContextBuilder {
  build(ast: ASTNode, config: BuildConfig): RenderContext {
    return {
      // Page-level context
      page: {
        title: ast.metadata?.title || '',
        description: ast.metadata?.description || '',
        path: ast.metadata?.path || '/index',
        layout: ast.layout
      },

      // Site-level context
      site: {
        baseUrl: config.baseUrl,
        title: config.siteTitle,
        navigation: config.navigation,
        metadata: config.siteMetadata
      },

      // Component registry
      components: this.componentRegistry.getAll(),

      // Rendering helpers
      helpers: {
        renderComponent: this.renderComponent.bind(this),
        renderSlot: this.renderSlot.bind(this),
        resolvePath: this.resolvePath.bind(this)
      },

      // Filter functions
      filters: {
        date: this.dateFilter,
        truncate: this.truncateFilter,
        markdown: this.markdownFilter
      }
    };
  }
}
```

#### Stage 3: Template Resolution and Rendering
**Input**: Render context with AST
**Process**: Resolve templates, render with Nunjucks
**Output**: Complete HTML pages

```typescript
interface TemplateRenderer {
  async render(context: RenderContext, ast: ASTNode): Promise<string> {
    // 1. Resolve layout template
    const layout = await this.resolveLayout(context.page.layout);

    // 2. Render page content
    const content = await this.renderNode(ast, context);

    // 3. Inject into layout
    const layoutContext = {
      ...context,
      content,
      yield: content // Alternative syntax
    };

    // 4. Final render with layout
    return this.nunjucks.renderString(layout, layoutContext);
  }

  private async renderNode(
    node: ASTNode,
    context: RenderContext
  ): Promise<string> {
    switch (node.type) {
      case 'component':
        return this.renderComponent(node, context);
      case 'slot':
        return this.renderSlot(node.content, context);
      case 'text':
        return node.content;
      default:
        throw new BuildError(`Unknown node type: ${node.type}`);
    }
  }
}
```

---

## Component Resolution System

### Component Resolver Implementation
```typescript
interface ComponentResolver {
  private componentPaths: Map<string, ComponentInfo>;
  private templateCache: Map<string, CompiledTemplate>;
  private schemaCache: Map<string, ComponentSchema>;

  // Initialize resolver with component discovery
  async initialize(componentsDir: string): Promise<void> {
    const components = await this.discoverComponents(componentsDir);

    for (const component of components) {
      this.componentPaths.set(component.id, {
        templatePath: component.templatePath,
        schemaPath: component.schemaPath,
        cssPath: component.cssPath,
        category: component.category
      });
    }
  }

  // Find and return template path
  findTemplate(componentId: string): TemplatePath {
    const info = this.componentPaths.get(componentId);

    if (!info) {
      throw new ComponentNotFoundError(
        `Component "${componentId}" not found`,
        this.getSuggestions(componentId)
      );
    }

    return info.templatePath;
  }

  // Resolve variant-specific template
  resolveVariant(
    componentId: string,
    variant?: string
  ): TemplatePath {
    const basePath = this.findTemplate(componentId);

    if (!variant || variant === 'default') {
      return basePath;
    }

    // Check for variant-specific template
    const variantPath = basePath.replace(
      '.njk',
      `.${variant}.njk`
    );

    if (fs.existsSync(variantPath)) {
      return variantPath;
    }

    // Fall back to base template with variant class
    return basePath;
  }

  // Compile and cache template
  async compileTemplate(path: string): Promise<CompiledTemplate> {
    // Check cache first
    if (this.templateCache.has(path)) {
      return this.templateCache.get(path)!;
    }

    // Read and compile template
    const source = await fs.readFile(path, 'utf8');
    const compiled = nunjucks.compile(source, this.nunjucksEnv);

    // Cache compiled template
    this.templateCache.set(path, compiled);

    return compiled;
  }

  // Get component schema for validation
  async getSchema(componentId: string): Promise<ComponentSchema> {
    if (this.schemaCache.has(componentId)) {
      return this.schemaCache.get(componentId)!;
    }

    const info = this.componentPaths.get(componentId);
    if (!info?.schemaPath) {
      return null; // No schema = no validation
    }

    const schema = await fs.readJson(info.schemaPath);
    this.schemaCache.set(componentId, schema);

    return schema;
  }

  // Get similar components for error suggestions
  private getSuggestions(componentId: string): string[] {
    const allIds = Array.from(this.componentPaths.keys());
    return this.findSimilar(componentId, allIds, 3);
  }
}
```

### Template Discovery Pattern
```typescript
interface ComponentDiscovery {
  async discoverComponents(baseDir: string): Promise<ComponentInfo[]> {
    const components: ComponentInfo[] = [];

    // Scan each category directory
    const categories = ['atoms', 'molecules', 'organisms'];

    for (const category of categories) {
      const categoryDir = path.join(baseDir, category);

      if (!fs.existsSync(categoryDir)) continue;

      const componentDirs = await fs.readdir(categoryDir, {
        withFileTypes: true
      });

      for (const dir of componentDirs) {
        if (!dir.isDirectory()) continue;

        const componentPath = path.join(categoryDir, dir.name);
        const componentId = `${category}/${dir.name}`;

        // Look for component files
        const templatePath = path.join(componentPath, `${dir.name}.njk`);
        const schemaPath = path.join(componentPath, `${dir.name}.schema.json`);
        const cssPath = path.join(componentPath, `${dir.name}.css`);

        if (fs.existsSync(templatePath)) {
          components.push({
            id: componentId,
            name: dir.name,
            category,
            templatePath,
            schemaPath: fs.existsSync(schemaPath) ? schemaPath : null,
            cssPath: fs.existsSync(cssPath) ? cssPath : null
          });
        }
      }
    }

    return components;
  }
}
```

---

## Slot Rendering Mechanism

### Slot Renderer Implementation
```typescript
interface SlotRenderer {
  // Main slot rendering function
  async render(
    slot: ASTNode | ASTNode[],
    context: RenderContext
  ): Promise<string> {
    // Handle array of nodes
    if (Array.isArray(slot)) {
      const rendered = await Promise.all(
        slot.map(node => this.renderNode(node, context))
      );
      return rendered.join('');
    }

    // Handle single node
    return this.renderNode(slot, context);
  }

  // Render individual node
  private async renderNode(
    node: ASTNode,
    context: RenderContext
  ): Promise<string> {
    switch (node.type) {
      case 'component':
        return this.renderComponent(node, context);

      case 'text':
        return this.renderText(node, context);

      case 'slot':
        // Nested slot rendering
        return this.render(node.content, context);

      default:
        throw new SlotRenderError(
          `Invalid slot content type: ${node.type}`
        );
    }
  }

  // Render component in slot
  private async renderComponent(
    node: ComponentNode,
    context: RenderContext
  ): Promise<string> {
    // Resolve component template
    const template = await context.resolveComponent(node.componentId);

    // Create component context
    const componentContext = {
      ...context,
      props: node.props,
      slots: node.slots || {},
      variant: node.variant
    };

    // Render component
    return template.render(componentContext);
  }

  // Render text content
  private renderText(
    node: TextNode,
    context: RenderContext
  ): string {
    // Apply any text filters
    let content = node.content;

    if (node.filters) {
      for (const filter of node.filters) {
        content = context.filters[filter](content);
      }
    }

    return content;
  }
}
```

### Template Context Structure
```typescript
interface RenderContext {
  // Component registry for resolution
  componentRegistry: ComponentRegistry;

  // Component resolution function
  resolveComponent: (id: string) => Promise<ComponentDefinition>;

  // Slot rendering function
  renderSlot: (slot: ASTNode | ASTNode[]) => Promise<string>;

  // Page metadata
  page: PageMetadata;

  // Site configuration
  site: SiteConfig;

  // Template filters
  filters: Record<string, FilterFunction>;

  // Template helpers
  helpers: Record<string, HelperFunction>;

  // Current component context (when rendering components)
  component?: {
    id: string;
    props: Record<string, any>;
    slots: Record<string, ASTNode | ASTNode[]>;
    variant?: string;
  };
}

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  layout: string;
  publishDate?: string;
  author?: string;
  tags?: string[];
}

interface SiteConfig {
  baseUrl: string;
  title: string;
  description: string;
  navigation: NavigationItem[];
  footer: FooterConfig;
  metadata: Record<string, any>;
}

type FilterFunction = (value: any, ...args: any[]) => any;
type HelperFunction = (...args: any[]) => any;
```

### Slot Validation
```typescript
interface SlotValidator {
  validate(
    slots: Record<string, ASTNode | ASTNode[]>,
    schema: ComponentSchema
  ): ValidationResult {
    const errors: ValidationError[] = [];

    // Check required slots
    if (schema.slots) {
      for (const [slotName, slotSchema] of Object.entries(schema.slots)) {
        if (slotSchema.required && !slots[slotName]) {
          errors.push({
            type: 'missing_required_slot',
            slot: slotName,
            message: `Required slot "${slotName}" is missing`
          });
        }

        if (slots[slotName]) {
          // Validate slot content type
          const slotErrors = this.validateSlotContent(
            slots[slotName],
            slotSchema
          );
          errors.push(...slotErrors);
        }
      }
    }

    // Check for unknown slots
    for (const slotName of Object.keys(slots)) {
      if (!schema.slots?.[slotName]) {
        errors.push({
          type: 'unknown_slot',
          slot: slotName,
          message: `Unknown slot "${slotName}" for component`
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private validateSlotContent(
    content: ASTNode | ASTNode[],
    schema: SlotSchema
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check content type restrictions
    if (schema.contentType) {
      const nodes = Array.isArray(content) ? content : [content];

      for (const node of nodes) {
        if (!this.isValidContentType(node, schema.contentType)) {
          errors.push({
            type: 'invalid_slot_content',
            message: `Slot expects ${schema.contentType} but got ${node.type}`
          });
        }
      }
    }

    // Check cardinality
    if (schema.maxItems && Array.isArray(content)) {
      if (content.length > schema.maxItems) {
        errors.push({
          type: 'slot_cardinality',
          message: `Slot accepts maximum ${schema.maxItems} items`
        });
      }
    }

    return errors;
  }
}
```

---

## Error Handling

### Component Not Found
```typescript
class ComponentNotFoundError extends BuildError {
  constructor(
    public componentId: string,
    public suggestions: string[] = []
  ) {
    super(`Component "${componentId}" not found`);
    this.code = 'ERROR_COMPONENT_NOT_FOUND';
  }

  getHelpMessage(): string {
    let message = `Component "${this.componentId}" does not exist.\n`;

    if (this.suggestions.length > 0) {
      message += '\nDid you mean one of these?\n';
      this.suggestions.forEach(s => {
        message += `  - ${s}\n`;
      });
    }

    message += '\nAvailable components:\n';
    message += '  Atoms: button, input, heading, text, ...\n';
    message += '  Molecules: card, navigation, cta-block, ...\n';
    message += '  Organisms: hero, feature-grid, footer, ...\n';

    return message;
  }
}
```

### Invalid Props
```typescript
class InvalidPropsError extends BuildError {
  constructor(
    public componentId: string,
    public propErrors: PropValidationError[]
  ) {
    super(`Invalid props for component "${componentId}"`);
    this.code = 'ERROR_INVALID_PROPS';
  }

  getHelpMessage(): string {
    let message = `Component "${this.componentId}" received invalid props:\n\n`;

    for (const error of this.propErrors) {
      message += `  ❌ ${error.prop}: ${error.message}\n`;

      if (error.expected) {
        message += `     Expected: ${error.expected}\n`;
      }

      if (error.received) {
        message += `     Received: ${error.received}\n`;
      }
    }

    return message;
  }
}
```

### Slot Validation Failure
```typescript
class SlotValidationError extends BuildError {
  constructor(
    public componentId: string,
    public slotErrors: ValidationError[]
  ) {
    super(`Slot validation failed for "${componentId}"`);
    this.code = 'ERROR_SLOT_VALIDATION';
  }

  getHelpMessage(): string {
    let message = `Component "${this.componentId}" has slot errors:\n\n`;

    for (const error of this.slotErrors) {
      switch (error.type) {
        case 'missing_required_slot':
          message += `  ❌ Missing required slot: "${error.slot}"\n`;
          break;

        case 'unknown_slot':
          message += `  ❌ Unknown slot: "${error.slot}"\n`;
          message += `     This component doesn't accept this slot\n`;
          break;

        case 'invalid_slot_content':
          message += `  ❌ Invalid content in slot "${error.slot}"\n`;
          message += `     ${error.message}\n`;
          break;
      }
    }

    return message;
  }
}
```

### Circular Dependency Detection
```typescript
class CircularDependencyDetector {
  private renderStack: Set<string> = new Set();

  enterComponent(componentId: string): void {
    if (this.renderStack.has(componentId)) {
      const cycle = Array.from(this.renderStack);
      cycle.push(componentId); // Complete the cycle

      throw new CircularDependencyError(cycle);
    }

    this.renderStack.add(componentId);
  }

  exitComponent(componentId: string): void {
    this.renderStack.delete(componentId);
  }

  clear(): void {
    this.renderStack.clear();
  }
}

class CircularDependencyError extends BuildError {
  constructor(public cycle: string[]) {
    super('Circular dependency detected in component composition');
    this.code = 'ERROR_CIRCULAR_DEPENDENCY';
  }

  getHelpMessage(): string {
    const chain = this.cycle.join(' → ');
    return `Circular dependency detected:\n  ${chain}\n\n` +
           `Components cannot include themselves directly or indirectly.`;
  }
}
```

### Recovery Strategies

#### Component Not Found Recovery
```typescript
interface ComponentFallback {
  handleMissingComponent(
    componentId: string,
    context: RenderContext
  ): string {
    // Development mode: Render error component
    if (context.site.environment === 'development') {
      return `
        <div class="error-component">
          <h3>Component Not Found</h3>
          <p>Component ID: ${componentId}</p>
          <p>Check the console for suggestions.</p>
        </div>
      `;
    }

    // Production mode: Skip component with comment
    return `<!-- Component not found: ${componentId} -->`;
  }
}
```

#### Invalid Props Recovery
```typescript
interface PropsFallback {
  handleInvalidProps(
    componentId: string,
    props: any,
    schema: ComponentSchema
  ): any {
    const sanitized = { ...props };

    // Use defaults for missing required props
    for (const [key, propSchema] of Object.entries(schema.props)) {
      if (propSchema.required && !sanitized[key]) {
        if (propSchema.default !== undefined) {
          sanitized[key] = propSchema.default;
          console.warn(
            `Using default value for missing prop "${key}" in ${componentId}`
          );
        }
      }
    }

    // Remove unknown props
    for (const key of Object.keys(sanitized)) {
      if (!schema.props[key]) {
        delete sanitized[key];
        console.warn(
          `Removing unknown prop "${key}" from ${componentId}`
        );
      }
    }

    return sanitized;
  }
}
```

#### Slot Validation Recovery
```typescript
interface SlotFallback {
  handleInvalidSlot(
    slotName: string,
    content: any,
    schema: SlotSchema
  ): ASTNode | null {
    // Skip invalid slot content with warning
    console.warn(
      `Skipping invalid content in slot "${slotName}": ${content}`
    );

    // Return empty text node as fallback
    if (schema.required) {
      return {
        type: 'text',
        content: `<!-- Required slot "${slotName}" had invalid content -->`
      };
    }

    return null;
  }
}
```

---

## Caching Strategy

### Template Compilation Cache
```typescript
interface TemplateCache {
  private cache: Map<string, CachedTemplate>;
  private maxSize: number = 100;
  private maxAge: number = 3600000; // 1 hour

  set(path: string, template: CompiledTemplate): void {
    // Implement LRU eviction if needed
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(path, {
      template,
      timestamp: Date.now(),
      hits: 0
    });
  }

  get(path: string): CompiledTemplate | null {
    const cached = this.cache.get(path);

    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.cache.delete(path);
      return null;
    }

    // Update hit count
    cached.hits++;

    return cached.template;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): CacheStats {
    const entries = Array.from(this.cache.entries());

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      topTemplates: entries
        .sort((a, b) => b[1].hits - a[1].hits)
        .slice(0, 10)
        .map(([path, data]) => ({
          path,
          hits: data.hits
        }))
    };
  }
}
```

### Component Resolution Cache
```typescript
interface ComponentCache {
  private pathCache: Map<string, ComponentPaths>;
  private schemaCache: Map<string, ComponentSchema>;

  async warmup(componentsDir: string): Promise<void> {
    // Pre-discover all components
    const components = await this.discoverComponents(componentsDir);

    // Pre-load schemas
    for (const component of components) {
      if (component.schemaPath) {
        const schema = await fs.readJson(component.schemaPath);
        this.schemaCache.set(component.id, schema);
      }

      this.pathCache.set(component.id, {
        template: component.templatePath,
        css: component.cssPath,
        schema: component.schemaPath
      });
    }
  }

  invalidate(componentId?: string): void {
    if (componentId) {
      this.pathCache.delete(componentId);
      this.schemaCache.delete(componentId);
    } else {
      this.pathCache.clear();
      this.schemaCache.clear();
    }
  }
}
```

### Rendered Output Cache
```typescript
interface OutputCache {
  private cache: Map<string, RenderedPage>;
  private enabled: boolean;

  constructor(config: BuildConfig) {
    this.enabled = config.enableOutputCache ?? false;
  }

  getCacheKey(
    ast: ASTNode,
    context: RenderContext
  ): string {
    // Generate deterministic cache key
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(ast));
    hash.update(JSON.stringify(context.page));
    return hash.digest('hex');
  }

  get(key: string): string | null {
    if (!this.enabled) return null;

    const cached = this.cache.get(key);

    if (cached && this.isValid(cached)) {
      return cached.html;
    }

    return null;
  }

  set(key: string, html: string): void {
    if (!this.enabled) return;

    this.cache.set(key, {
      html,
      timestamp: Date.now(),
      dependencies: this.trackDependencies()
    });
  }

  private isValid(cached: RenderedPage): boolean {
    // Check if any dependencies have changed
    for (const dep of cached.dependencies) {
      if (this.hasChanged(dep)) {
        return false;
      }
    }

    return true;
  }
}
```

### Cache Invalidation Rules
```typescript
interface CacheInvalidation {
  // Invalidate on file changes
  watchFiles(paths: string[]): void {
    for (const path of paths) {
      fs.watch(path, (event) => {
        if (event === 'change') {
          this.invalidateRelated(path);
        }
      });
    }
  }

  // Invalidate related caches
  invalidateRelated(path: string): void {
    // Template change - clear template cache
    if (path.endsWith('.njk')) {
      this.templateCache.delete(path);

      // Also clear component resolution
      const componentId = this.getComponentIdFromPath(path);
      if (componentId) {
        this.componentCache.invalidate(componentId);
      }
    }

    // Schema change - clear schema cache
    if (path.endsWith('.schema.json')) {
      const componentId = this.getComponentIdFromPath(path);
      if (componentId) {
        this.schemaCache.delete(componentId);
      }
    }

    // Page composition change - clear output cache
    if (path.includes('/pages/') && path.endsWith('.json')) {
      this.outputCache.clear();
    }
  }
}
```

---

## Build Configuration

### Configuration Schema
```typescript
interface BuildConfig {
  // Input/Output paths
  componentsDir: string;
  pagesDir: string;
  outputDir: string;
  layoutsDir: string;
  assetsDir?: string;

  // Site configuration
  baseUrl: string;
  siteTitle: string;
  siteDescription?: string;
  defaultLayout: string;

  // Build options
  environment: 'development' | 'production';
  enableOutputCache?: boolean;
  enableSourceMaps?: boolean;
  minifyHTML?: boolean;

  // Component options
  componentCategories?: string[];
  strictValidation?: boolean;

  // CSS options
  bundleCSS?: boolean;
  optimizeCSS?: boolean;
  criticalCSS?: boolean;

  // Development server
  devServer?: {
    port?: number;
    host?: string;
    watch?: boolean;
    liveReload?: boolean;
  };
}
```

### Default Configuration
```javascript
// agentstatic.config.js
export default {
  // Required paths
  componentsDir: './components',
  pagesDir: './pages',
  outputDir: './dist',
  layoutsDir: './site/layouts',

  // Site metadata
  baseUrl: 'https://example.com',
  siteTitle: 'My AgentStatic Site',
  defaultLayout: 'default',

  // Build options
  environment: process.env.NODE_ENV || 'development',
  enableOutputCache: false,
  minifyHTML: true,

  // Component settings
  componentCategories: ['atoms', 'molecules', 'organisms'],
  strictValidation: true,

  // CSS settings
  bundleCSS: true,
  optimizeCSS: true,

  // Dev server
  devServer: {
    port: 3000,
    watch: true,
    liveReload: true
  }
};
```

---

## Performance Optimizations

### Build-Time Optimizations
1. **Parallel Processing**: Process multiple pages concurrently
2. **Template Pre-compilation**: Compile all templates on startup
3. **Schema Pre-validation**: Validate all schemas once
4. **Dependency Graph**: Build once, use for optimization
5. **Incremental Builds**: Only rebuild changed pages

### Runtime Optimizations
1. **Static Output**: Pure HTML, no client-side rendering
2. **Inlined Critical CSS**: Above-the-fold styles inlined
3. **Optimized Assets**: Images, fonts pre-optimized
4. **Efficient HTML**: Minified, no unnecessary whitespace
5. **Smart Caching Headers**: Proper cache-control headers

---

## Integration Points

### With Component Library (Pillar 1)
- Reads component templates from filesystem
- Processes component CSS for bundling
- Validates against component schemas

### With Registry (Pillar 2)
- Uses registry for component discovery
- Validates props against registry schemas
- Updates registry with build metadata

### With AI Tools (Pillar 4)
- Provides build status to MCP tools
- Validates AI-generated compositions
- Returns helpful error messages for AI context

---

## Testing Requirements

### Unit Tests
- AST transformation logic
- Component resolution
- Slot rendering
- Cache operations
- Error handling

### Integration Tests
- Full build pipeline
- Template rendering
- CSS bundling
- Asset processing
- Output validation

### Performance Tests
- Build time benchmarks
- Memory usage monitoring
- Cache effectiveness
- Parallel processing gains

---

*This architecture specification defines the complete build system for AgentStatic. All build implementations must follow these patterns and interfaces.*