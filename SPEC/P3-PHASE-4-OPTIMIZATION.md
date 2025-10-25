# Phase 4: Build Optimization

**Status:** Specification
**Pillar:** 3 - Build Engine
**Dependencies:** Phases 1-3 (Registry, Renderer, Pipeline)
**Timeline:** Week 7 (6-8 days)
**Owner:** Build Team

## Overview

Phase 4 represents the final optimization layer of the build engine. With the core rendering pipeline complete (Phases 1-3), this phase focuses on maximizing build performance and minimizing output size. The goal is achieving production-grade performance: building 100 pages in under 10 seconds while producing a CSS bundle under 50KB.

### Phase Goals

1. **HTML Optimization**: Minify HTML output, remove redundant whitespace, optimize attributes
2. **CSS Optimization**: Tree-shake unused styles, extract critical CSS, minify bundles
3. **Parallel Processing**: Utilize all CPU cores for concurrent page builds
4. **Incremental Builds**: Rebuild only changed pages and affected dependencies
5. **Asset Optimization**: Optimize images, generate responsive variants
6. **Performance Monitoring**: Track and report build metrics against targets

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Build Speed | <10s for 100 pages | Developer experience - fast iteration |
| CSS Bundle Size | <50KB (gzipped) | Network performance - initial page load |
| HTML Minification | 20%+ size reduction | Bandwidth savings across all pages |
| Parallel Efficiency | 80%+ CPU utilization | Maximize hardware usage |
| Incremental Rebuild | <1s for single page | Near-instant feedback loop |
| Memory Usage | <500MB for 1000 pages | Support large sites on modest hardware |

### Timeline and Milestones

**Days 1-2: HTML Optimization**
- Implement HTML minifier integration
- Configure optimization rules
- Test output quality

**Days 3-4: CSS Optimization**
- Integrate tree-shaking
- Implement critical CSS extraction
- Bundle optimization pipeline

**Days 5-6: Parallel Build System**
- Worker pool implementation
- Page chunking strategy
- Thread-safe registry serialization

**Days 7-8: Incremental Builds & Testing**
- Dependency tracking
- Build cache implementation
- Performance testing suite
- Documentation

## HTML Optimization

HTML optimization focuses on reducing file size without affecting functionality or semantics. The minifier removes unnecessary whitespace, comments, and redundant attributes while preserving the DOM structure.

### HTML Minifier Integration

```typescript
import { minify } from 'html-minifier-terser';

interface HTMLOptimizeOptions {
  removeComments?: boolean;
  minifyJS?: boolean;
  minifyInlineCSS?: boolean;
  preserveLineBreaks?: boolean;
  customRules?: MinificationRule[];
}

class HTMLOptimizer {
  private defaultOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: false, // Handle separately
    conservativeCollapse: false,
    preserveLineBreaks: false,
    caseSensitive: true,
    keepClosingSlash: true
  };

  optimize(html: string, options: HTMLOptimizeOptions = {}): string {
    const mergedOptions = {
      ...this.defaultOptions,
      removeComments: options.removeComments ?? true,
      minifyJS: options.minifyJS ?? false,
      minifyCSS: options.minifyInlineCSS ?? true,
      preserveLineBreaks: options.preserveLineBreaks ?? false
    };

    try {
      const minified = minify(html, mergedOptions);
      return minified;
    } catch (error) {
      console.error('HTML minification failed:', error);
      // Return original HTML if minification fails
      return html;
    }
  }

  optimizeWithSourceMap(html: string, options: HTMLOptimizeOptions = {}): OptimizedHTML {
    const original = html;
    const optimized = this.optimize(html, options);

    return {
      html: optimized,
      originalSize: Buffer.byteLength(original, 'utf8'),
      optimizedSize: Buffer.byteLength(optimized, 'utf8'),
      compressionRatio: this.calculateCompressionRatio(original, optimized),
      savings: Buffer.byteLength(original, 'utf8') - Buffer.byteLength(optimized, 'utf8')
    };
  }

  private calculateCompressionRatio(original: string, optimized: string): number {
    const originalSize = Buffer.byteLength(original, 'utf8');
    const optimizedSize = Buffer.byteLength(optimized, 'utf8');

    if (originalSize === 0) return 1.0;

    return Number((optimizedSize / originalSize).toFixed(3));
  }
}

interface OptimizedHTML {
  html: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  savings: number;
}
```

### Selective Optimization Rules

Not all HTML should be aggressively minified. Preserve readability where it matters:

```typescript
interface MinificationRule {
  selector: string;
  preserve: 'whitespace' | 'comments' | 'formatting';
}

class SelectiveHTMLOptimizer extends HTMLOptimizer {
  private rules: MinificationRule[] = [
    { selector: 'pre', preserve: 'whitespace' },
    { selector: 'code', preserve: 'whitespace' },
    { selector: '[data-preserve-formatting]', preserve: 'formatting' }
  ];

  optimize(html: string, options: HTMLOptimizeOptions = {}): string {
    // Apply custom rules to preserve specific elements
    if (options.customRules) {
      this.rules = [...this.rules, ...options.customRules];
    }

    const protected = this.protectElements(html);
    const minified = super.optimize(protected.html, options);
    const restored = this.restoreElements(minified, protected.tokens);

    return restored;
  }

  private protectElements(html: string): { html: string; tokens: Map<string, string> } {
    const tokens = new Map<string, string>();
    let processed = html;

    // Protect <pre> and <code> blocks
    const preRegex = /<pre[^>]*>[\s\S]*?<\/pre>/gi;
    processed = processed.replace(preRegex, (match) => {
      const token = `__PRESERVE_PRE_${tokens.size}__`;
      tokens.set(token, match);
      return token;
    });

    return { html: processed, tokens };
  }

  private restoreElements(html: string, tokens: Map<string, string>): string {
    let restored = html;

    for (const [token, original] of tokens) {
      restored = restored.replace(token, original);
    }

    return restored;
  }
}
```

### Integration with Renderer

Update the page renderer to apply HTML optimization:

```typescript
class OptimizedPageRenderer extends PageRenderer {
  private htmlOptimizer: HTMLOptimizer;

  constructor(
    registry: ComponentRegistry,
    private optimizeHTML: boolean = true
  ) {
    super(registry);
    this.htmlOptimizer = new SelectiveHTMLOptimizer();
  }

  async render(page: PageNode): Promise<RenderedPage> {
    const rendered = await super.render(page);

    if (!this.optimizeHTML) {
      return rendered;
    }

    const optimized = this.htmlOptimizer.optimizeWithSourceMap(rendered.html);

    return {
      ...rendered,
      html: optimized.html,
      metadata: {
        ...rendered.metadata,
        optimization: {
          originalSize: optimized.originalSize,
          optimizedSize: optimized.optimizedSize,
          compressionRatio: optimized.compressionRatio,
          savings: optimized.savings
        }
      }
    };
  }
}
```

## CSS Optimization Integration

CSS optimization is the most impactful performance improvement. Reference **SPEC/P3-CSS-OPTIMIZATION.md** for the complete strategy. This section shows integration with the build pipeline.

### CSS Bundle Optimizer

```typescript
interface CSSBundle {
  main: string;              // Main CSS bundle
  critical: Map<string, string>;  // Per-page critical CSS
  size: number;              // Total size in bytes
  gzipSize: number;          // Gzipped size
  usedComponents: Set<ComponentId>;
}

class CSSBundleOptimizer {
  constructor(
    private registry: ComponentRegistry,
    private criticalExtractor: CriticalCSSExtractor
  ) {}

  async optimize(pages: RenderedPage[]): Promise<CSSBundle> {
    console.log('Starting CSS optimization...');

    // 1. Collect all used components across all pages
    const usedComponents = this.collectUsedComponents(pages);
    console.log(`Found ${usedComponents.size} used components`);

    // 2. Tree-shake unused CSS
    const treeShakenCSS = await this.treeShake(usedComponents);
    console.log(`Tree-shaken CSS: ${treeShakenCSS.length} characters`);

    // 3. Extract critical CSS per page
    const criticalCSS = await this.extractCritical(pages);
    console.log(`Extracted critical CSS for ${criticalCSS.size} pages`);

    // 4. Minify
    const minified = await this.minifyCSS(treeShakenCSS);
    console.log(`Minified CSS: ${minified.length} characters`);

    // 5. Calculate sizes
    const size = Buffer.byteLength(minified, 'utf8');
    const gzipSize = await this.calculateGzipSize(minified);

    return {
      main: minified,
      critical: criticalCSS,
      size,
      gzipSize,
      usedComponents
    };
  }

  private collectUsedComponents(pages: RenderedPage[]): Set<ComponentId> {
    const used = new Set<ComponentId>();

    for (const page of pages) {
      // Component usage was tracked during render
      const components = page.metadata.usedComponents as Set<ComponentId>;
      if (components) {
        components.forEach(id => used.add(id));
      }
    }

    return used;
  }

  private async treeShake(usedComponents: Set<ComponentId>): Promise<string> {
    const cssFiles: string[] = [];

    // Always include base system styles
    const systemStyles = [
      'components/_system/tokens.css',
      'components/_system/reset.css',
      'components/_system/base.css',
      'components/_system/utilities.css'
    ];

    for (const stylePath of systemStyles) {
      try {
        const css = await fs.readFile(stylePath, 'utf-8');
        cssFiles.push(css);
      } catch (error) {
        console.warn(`System style not found: ${stylePath}`);
      }
    }

    // Include only used component styles
    for (const componentId of usedComponents) {
      const definition = this.registry.get(componentId);

      if (definition.files.styles) {
        try {
          const css = await fs.readFile(definition.files.styles, 'utf-8');
          cssFiles.push(`\n/* Component: ${componentId} */\n${css}`);
        } catch (error) {
          console.warn(`Component style not found: ${definition.files.styles}`);
        }
      }
    }

    return cssFiles.join('\n');
  }

  private async extractCritical(pages: RenderedPage[]): Promise<Map<string, string>> {
    const critical = new Map<string, string>();

    // Process pages in parallel
    await Promise.all(
      pages.map(async (page) => {
        try {
          const criticalCSS = await this.criticalExtractor.extract({
            html: page.html,
            css: await this.getPageCSS(page),
            viewport: { width: 1300, height: 900 }
          });

          critical.set(page.path, criticalCSS);
        } catch (error) {
          console.error(`Failed to extract critical CSS for ${page.path}:`, error);
        }
      })
    );

    return critical;
  }

  private async getPageCSS(page: RenderedPage): Promise<string> {
    // Get CSS for components used on this page
    const components = page.metadata.usedComponents as Set<ComponentId>;
    return this.treeShake(components);
  }

  private async minifyCSS(css: string): Promise<string> {
    const CleanCSS = (await import('clean-css')).default;

    const minifier = new CleanCSS({
      level: 2,
      compatibility: 'ie9',
      format: false,
      inline: ['local'],
      rebase: false
    });

    const result = minifier.minify(css);

    if (result.errors.length > 0) {
      console.error('CSS minification errors:', result.errors);
      return css;
    }

    return result.styles;
  }

  private async calculateGzipSize(content: string): Promise<number> {
    const zlib = await import('zlib');
    const buffer = Buffer.from(content, 'utf8');

    return new Promise((resolve, reject) => {
      zlib.gzip(buffer, (err, compressed) => {
        if (err) reject(err);
        else resolve(compressed.length);
      });
    });
  }
}
```

### Critical CSS Extractor

```typescript
import { PurgeCSS } from 'purgecss';

interface CriticalCSSOptions {
  html: string;
  css: string;
  viewport?: { width: number; height: number };
}

class CriticalCSSExtractor {
  async extract(options: CriticalCSSOptions): Promise<string> {
    // Use PurgeCSS to remove unused CSS
    const purged = await new PurgeCSS().purge({
      content: [
        {
          raw: options.html,
          extension: 'html'
        }
      ],
      css: [
        {
          raw: options.css
        }
      ],
      safelist: this.getSafelist()
    });

    if (purged.length === 0) {
      return '';
    }

    return purged[0].css;
  }

  private getSafelist(): string[] {
    // Preserve classes that might be added dynamically
    return [
      'is-active',
      'is-visible',
      'is-hidden',
      'has-error',
      /^js-/,  // JavaScript hooks
      /^data-/ // Data attributes
    ];
  }
}
```

## Parallel Build Processing

Parallel builds utilize all available CPU cores to render pages concurrently, dramatically reducing total build time.

### Worker Pool Implementation

```typescript
import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

interface WorkerResult {
  pages: RenderedPage[];
  workerId: number;
  duration: number;
}

class ParallelBuilder {
  private maxWorkers: number;
  private registry: ComponentRegistry;

  constructor(
    registry: ComponentRegistry,
    options: BuildOptions = {}
  ) {
    this.registry = registry;
    this.maxWorkers = options.maxWorkers || os.cpus().length;
  }

  async buildPages(pages: PageNode[]): Promise<RenderedPage[]> {
    console.log(`Building ${pages.length} pages using ${this.maxWorkers} workers`);

    if (pages.length === 0) {
      return [];
    }

    // For small builds, don't use workers (overhead not worth it)
    if (pages.length < 10) {
      const renderer = new OptimizedPageRenderer(this.registry);
      return Promise.all(pages.map(page => renderer.render(page)));
    }

    // Split pages into chunks
    const chunks = this.chunkPages(pages, this.maxWorkers);
    console.log(`Split into ${chunks.length} chunks`);

    // Process chunks in parallel
    const startTime = Date.now();
    const results = await Promise.all(
      chunks.map((chunk, index) => this.processChunk(chunk, index))
    );
    const duration = Date.now() - startTime;

    console.log(`Parallel build completed in ${duration}ms`);

    // Flatten results while preserving order
    return results
      .sort((a, b) => a.workerId - b.workerId)
      .flatMap(r => r.pages);
  }

  private chunkPages(pages: PageNode[], numChunks: number): PageNode[][] {
    const chunkSize = Math.ceil(pages.length / numChunks);
    const chunks: PageNode[][] = [];

    for (let i = 0; i < pages.length; i += chunkSize) {
      chunks.push(pages.slice(i, i + chunkSize));
    }

    return chunks;
  }

  private async processChunk(pages: PageNode[], workerId: number): Promise<WorkerResult> {
    return new Promise((resolve, reject) => {
      const workerPath = path.join(__dirname, 'build-worker.js');

      const worker = new Worker(workerPath, {
        workerData: {
          pages: pages.map(p => this.serializePage(p)),
          registry: this.registry.serialize(),
          workerId
        }
      });

      const startTime = Date.now();

      worker.on('message', (result) => {
        const duration = Date.now() - startTime;
        resolve({
          pages: result.pages,
          workerId,
          duration
        });
        worker.terminate();
      });

      worker.on('error', (error) => {
        console.error(`Worker ${workerId} error:`, error);
        reject(error);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker ${workerId} stopped with exit code ${code}`));
        }
      });
    });
  }

  private serializePage(page: PageNode): SerializedPageNode {
    return {
      id: page.id,
      path: page.path,
      template: page.template,
      data: page.data,
      metadata: page.metadata
    };
  }
}

interface SerializedPageNode {
  id: string;
  path: string;
  template: ComponentId;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
```

### Build Worker

```typescript
// build-worker.js
import { parentPort, workerData } from 'worker_threads';
import { ComponentRegistry } from './component-registry';
import { OptimizedPageRenderer } from './optimized-renderer';

async function renderPages() {
  try {
    const { pages, registry, workerId } = workerData;

    // Deserialize registry in worker context
    const componentRegistry = ComponentRegistry.deserialize(registry);

    // Initialize renderer
    const renderer = new OptimizedPageRenderer(componentRegistry);

    // Render all pages
    const rendered = await Promise.all(
      pages.map(async (page: SerializedPageNode) => {
        try {
          return await renderer.render(page);
        } catch (error) {
          console.error(`Worker ${workerId} failed to render ${page.path}:`, error);
          throw error;
        }
      })
    );

    // Send results back to main thread
    parentPort?.postMessage({ pages: rendered });
  } catch (error) {
    console.error('Worker error:', error);
    process.exit(1);
  }
}

renderPages().catch(err => {
  console.error('Fatal worker error:', err);
  process.exit(1);
});
```

### Registry Serialization

Enable thread-safe registry sharing:

```typescript
class ComponentRegistry {
  serialize(): SerializedRegistry {
    return {
      components: Array.from(this.components.entries()),
      rootDir: this.rootDir,
      version: '1.0'
    };
  }

  static deserialize(data: SerializedRegistry): ComponentRegistry {
    const registry = new ComponentRegistry(data.rootDir);
    registry.components = new Map(data.components);
    return registry;
  }
}

interface SerializedRegistry {
  components: Array<[ComponentId, ComponentDefinition]>;
  rootDir: string;
  version: string;
}
```

## Incremental Build System

Incremental builds track file changes and rebuild only affected pages, enabling near-instant iteration during development.

### Dependency Tracking

```typescript
import crypto from 'crypto';

class DependencyGraph {
  private edges: Map<string, Set<string>> = new Map();

  addDependency(page: string, dependency: string): void {
    if (!this.edges.has(page)) {
      this.edges.set(page, new Set());
    }
    this.edges.get(page)!.add(dependency);
  }

  getDependencies(page: string): Set<string> {
    return this.edges.get(page) || new Set();
  }

  getDependents(file: string): Set<string> {
    const dependents = new Set<string>();

    for (const [page, deps] of this.edges) {
      if (deps.has(file)) {
        dependents.add(page);
      }
    }

    return dependents;
  }

  clear(): void {
    this.edges.clear();
  }
}

class IncrementalBuilder {
  private depGraph: DependencyGraph;
  private buildCache: BuildCache;
  private registry: ComponentRegistry;

  constructor(
    registry: ComponentRegistry,
    private cacheDir: string
  ) {
    this.registry = registry;
    this.depGraph = new DependencyGraph();
    this.buildCache = new BuildCache(cacheDir);
  }

  async build(pages: PageNode[]): Promise<BuildResult> {
    console.log('Starting incremental build...');

    // 1. Detect changed files
    const changedFiles = await this.detectChanges();
    console.log(`Detected ${changedFiles.size} changed files`);

    if (changedFiles.size === 0) {
      console.log('No changes detected - skipping build');
      return {
        built: 0,
        cached: pages.length,
        duration: 0,
        changedFiles: []
      };
    }

    // 2. Find affected pages
    const affectedPages = this.findAffectedPages(pages, changedFiles);
    console.log(`${affectedPages.length} pages affected by changes`);

    if (affectedPages.length === 0) {
      console.log('No pages affected - skipping build');
      return {
        built: 0,
        cached: pages.length,
        duration: 0,
        changedFiles: Array.from(changedFiles)
      };
    }

    // 3. Build only affected pages
    const startTime = Date.now();
    const rebuilt = await this.buildPages(affectedPages);
    const duration = Date.now() - startTime;

    // 4. Update cache
    await this.updateCache(rebuilt, changedFiles);

    return {
      built: affectedPages.length,
      cached: pages.length - affectedPages.length,
      duration,
      changedFiles: Array.from(changedFiles)
    };
  }

  private async detectChanges(): Promise<Set<string>> {
    const changed = new Set<string>();

    // Check component files
    const componentFiles = await this.globComponentFiles();
    for (const file of componentFiles) {
      const cached = this.buildCache.getFileHash(file);
      const current = await this.hashFile(file);

      if (cached !== current) {
        changed.add(file);
        this.buildCache.setFileHash(file, current);
      }
    }

    // Check page files
    const pageFiles = await this.globPageFiles();
    for (const file of pageFiles) {
      const cached = this.buildCache.getFileHash(file);
      const current = await this.hashFile(file);

      if (cached !== current) {
        changed.add(file);
        this.buildCache.setFileHash(file, current);
      }
    }

    return changed;
  }

  private async hashFile(filepath: string): Promise<string> {
    try {
      const content = await fs.readFile(filepath, 'utf8');
      return crypto
        .createHash('sha256')
        .update(content)
        .digest('hex');
    } catch (error) {
      return '';
    }
  }

  private async globComponentFiles(): Promise<string[]> {
    const glob = (await import('glob')).glob;
    return glob('components/**/*.{html,css,json}', { absolute: true });
  }

  private async globPageFiles(): Promise<string[]> {
    const glob = (await import('glob')).glob;
    return glob('pages/**/*.json', { absolute: true });
  }

  private findAffectedPages(pages: PageNode[], changedFiles: Set<string>): PageNode[] {
    const affected: PageNode[] = [];

    for (const page of pages) {
      // Check if page file changed
      const pagePath = `pages/${page.path}.json`;
      if (changedFiles.has(pagePath)) {
        affected.push(page);
        continue;
      }

      // Check if any component used by page changed
      const usedComponents = this.extractComponents(page);
      for (const componentId of usedComponents) {
        const def = this.registry.get(componentId);
        const componentFiles = [
          def.files.template,
          def.files.styles,
          def.files.schema
        ].filter(Boolean);

        if (componentFiles.some(f => changedFiles.has(f))) {
          affected.push(page);
          break;
        }
      }
    }

    return affected;
  }

  private extractComponents(page: PageNode): Set<ComponentId> {
    const components = new Set<ComponentId>();

    const traverse = (node: any) => {
      if (typeof node !== 'object' || !node) return;

      if (node.component) {
        components.add(node.component);
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }

      Object.values(node).forEach(value => {
        if (typeof value === 'object') {
          traverse(value);
        }
      });
    };

    traverse(page);
    return components;
  }

  private async buildPages(pages: PageNode[]): Promise<RenderedPage[]> {
    const builder = new ParallelBuilder(this.registry);
    return builder.buildPages(pages);
  }

  private async updateCache(pages: RenderedPage[], changedFiles: Set<string>): Promise<void> {
    // Cache is already updated in detectChanges
    await this.buildCache.save();
  }
}

interface BuildResult {
  built: number;
  cached: number;
  duration: number;
  changedFiles: string[];
}
```

### Build Cache

```typescript
import fs from 'fs-extra';
import path from 'path';

class BuildCache {
  private hashes: Map<string, string>;
  private cachePath: string;

  constructor(private cacheDir: string) {
    this.cachePath = path.join(cacheDir, 'build-cache.json');
    this.hashes = new Map();
    this.load();
  }

  private async load(): Promise<void> {
    try {
      if (await fs.pathExists(this.cachePath)) {
        const data = await fs.readJSON(this.cachePath);

        if (data.version === '1.0') {
          this.hashes = new Map(Object.entries(data.hashes));
          console.log(`Loaded build cache: ${this.hashes.size} files`);
        }
      }
    } catch (error) {
      console.warn('Failed to load build cache:', error);
      this.hashes = new Map();
    }
  }

  async save(): Promise<void> {
    try {
      await fs.ensureDir(this.cacheDir);

      await fs.writeJSON(this.cachePath, {
        version: '1.0',
        timestamp: new Date().toISOString(),
        hashes: Object.fromEntries(this.hashes)
      }, { spaces: 2 });

      console.log(`Saved build cache: ${this.hashes.size} files`);
    } catch (error) {
      console.error('Failed to save build cache:', error);
    }
  }

  getFileHash(file: string): string | undefined {
    return this.hashes.get(file);
  }

  setFileHash(file: string, hash: string): void {
    this.hashes.set(file, hash);
  }

  clear(): void {
    this.hashes.clear();
  }

  async clearAndDelete(): Promise<void> {
    this.clear();

    try {
      if (await fs.pathExists(this.cachePath)) {
        await fs.remove(this.cachePath);
        console.log('Build cache deleted');
      }
    } catch (error) {
      console.error('Failed to delete build cache:', error);
    }
  }
}
```

## Asset Optimization

Asset optimization reduces bandwidth and improves loading performance by compressing images and generating responsive variants.

### Image Optimizer

```typescript
import sharp from 'sharp';
import path from 'path';

interface ImageOptimizeOptions {
  quality?: number;
  formats?: ('webp' | 'avif' | 'jpeg' | 'png')[];
  sizes?: number[];
}

class ImageOptimizer {
  private defaultOptions: ImageOptimizeOptions = {
    quality: 80,
    formats: ['webp', 'jpeg'],
    sizes: [320, 640, 768, 1024, 1280, 1920]
  };

  async optimize(
    imagePath: string,
    outputDir: string,
    options: ImageOptimizeOptions = {}
  ): Promise<OptimizedImageSet> {
    const opts = { ...this.defaultOptions, ...options };
    const ext = path.extname(imagePath).toLowerCase();
    const basename = path.basename(imagePath, ext);

    // Get original metadata
    const metadata = await sharp(imagePath).metadata();
    const originalSize = (await fs.stat(imagePath)).size;

    const variants: ImageVariant[] = [];

    // Generate responsive variants for each format
    for (const format of opts.formats) {
      for (const width of opts.sizes) {
        // Skip if larger than original
        if (metadata.width && width > metadata.width) {
          continue;
        }

        const filename = `${basename}@${width}w.${format}`;
        const outputPath = path.join(outputDir, filename);

        await sharp(imagePath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, {
            quality: opts.quality
          })
          .toFile(outputPath);

        const size = (await fs.stat(outputPath)).size;

        variants.push({
          path: outputPath,
          width,
          format,
          size
        });
      }
    }

    // Calculate total savings
    const totalSize = variants.reduce((sum, v) => sum + v.size, 0);
    const savings = originalSize - totalSize;

    return {
      original: imagePath,
      originalSize,
      variants,
      totalSize,
      savings
    };
  }

  async optimizeDirectory(
    inputDir: string,
    outputDir: string,
    options: ImageOptimizeOptions = {}
  ): Promise<void> {
    const imageFiles = await this.findImages(inputDir);

    console.log(`Optimizing ${imageFiles.length} images...`);

    await Promise.all(
      imageFiles.map(async (file) => {
        try {
          const result = await this.optimize(file, outputDir, options);
          console.log(`Optimized ${path.basename(file)}: ${result.variants.length} variants`);
        } catch (error) {
          console.error(`Failed to optimize ${file}:`, error);
        }
      })
    );
  }

  private async findImages(dir: string): Promise<string[]> {
    const glob = (await import('glob')).glob;
    return glob(`${dir}/**/*.{jpg,jpeg,png,webp}`, { absolute: true });
  }
}

interface ImageVariant {
  path: string;
  width: number;
  format: string;
  size: number;
}

interface OptimizedImageSet {
  original: string;
  originalSize: number;
  variants: ImageVariant[];
  totalSize: number;
  savings: number;
}
```

### Responsive Image HTML Generation

```typescript
class ResponsiveImageHelper {
  generatePictureElement(imageSet: OptimizedImageSet): string {
    const variants = imageSet.variants;

    // Group by format
    const byFormat = new Map<string, ImageVariant[]>();
    for (const variant of variants) {
      if (!byFormat.has(variant.format)) {
        byFormat.set(variant.format, []);
      }
      byFormat.get(variant.format)!.push(variant);
    }

    const sources: string[] = [];

    // Prefer modern formats first
    const formatOrder = ['avif', 'webp', 'jpeg', 'png'];

    for (const format of formatOrder) {
      const formatVariants = byFormat.get(format);
      if (!formatVariants) continue;

      const srcset = formatVariants
        .sort((a, b) => a.width - b.width)
        .map(v => `${v.path} ${v.width}w`)
        .join(', ');

      sources.push(
        `<source srcset="${srcset}" type="image/${format}">`
      );
    }

    // Fallback img
    const fallback = variants.find(v => v.format === 'jpeg') || variants[0];

    return `
<picture>
  ${sources.join('\n  ')}
  <img src="${fallback.path}" loading="lazy" decoding="async">
</picture>`.trim();
  }
}
```

## Performance Monitoring

Track build performance and ensure targets are met.

### Build Performance Reporter

```typescript
interface BuildMetrics {
  startTime: number;
  endTime: number;
  pagesBuilt: number;
  totalPages: number;
  cssBundleSize: number;
  cssGzipSize: number;
  htmlTotalSize: number;
  htmlCompressedSize: number;
  parallelEfficiency: number;
}

interface BuildReport {
  duration: string;
  pagesBuilt: number;
  averagePerPage: string;
  cssBundleSize: string;
  cssGzipSize: string;
  htmlTotalSize: string;
  compressionRatio: number;
  parallelEfficiency: string;
  targetsMet: TargetStatus;
  recommendations: string[];
}

interface TargetStatus {
  buildSpeed: boolean;
  cssSize: boolean;
  htmlCompression: boolean;
  overall: boolean;
}

class PerformanceReporter {
  private metrics: BuildMetrics = {
    startTime: 0,
    endTime: 0,
    pagesBuilt: 0,
    totalPages: 0,
    cssBundleSize: 0,
    cssGzipSize: 0,
    htmlTotalSize: 0,
    htmlCompressedSize: 0,
    parallelEfficiency: 0
  };

  start(totalPages: number): void {
    this.metrics.startTime = Date.now();
    this.metrics.totalPages = totalPages;
  }

  recordPage(page: RenderedPage): void {
    this.metrics.pagesBuilt++;

    const htmlSize = Buffer.byteLength(page.html, 'utf8');
    this.metrics.htmlTotalSize += htmlSize;

    if (page.metadata.optimization) {
      this.metrics.htmlCompressedSize += page.metadata.optimization.optimizedSize;
    } else {
      this.metrics.htmlCompressedSize += htmlSize;
    }
  }

  recordCSSBundle(bundle: CSSBundle): void {
    this.metrics.cssBundleSize = bundle.size;
    this.metrics.cssGzipSize = bundle.gzipSize;
  }

  recordParallelEfficiency(efficiency: number): void {
    this.metrics.parallelEfficiency = efficiency;
  }

  end(): BuildReport {
    this.metrics.endTime = Date.now();
    const duration = this.metrics.endTime - this.metrics.startTime;

    const report: BuildReport = {
      duration: `${(duration / 1000).toFixed(2)}s`,
      pagesBuilt: this.metrics.pagesBuilt,
      averagePerPage: `${(duration / this.metrics.pagesBuilt).toFixed(0)}ms`,
      cssBundleSize: this.formatSize(this.metrics.cssBundleSize),
      cssGzipSize: this.formatSize(this.metrics.cssGzipSize),
      htmlTotalSize: this.formatSize(this.metrics.htmlTotalSize),
      compressionRatio: this.metrics.htmlCompressedSize / this.metrics.htmlTotalSize,
      parallelEfficiency: `${(this.metrics.parallelEfficiency * 100).toFixed(1)}%`,
      targetsMet: this.checkTargets(duration),
      recommendations: this.generateRecommendations(duration)
    };

    return report;
  }

  private checkTargets(duration: number): TargetStatus {
    // Target: <10s for 100 pages = <100ms per page
    const targetTimePerPage = 100; // ms
    const actualTimePerPage = duration / this.metrics.totalPages;
    const buildSpeed = actualTimePerPage <= targetTimePerPage;

    // Target: <50KB CSS (gzipped)
    const cssTarget = 50 * 1024; // 50KB
    const cssSize = this.metrics.cssGzipSize <= cssTarget;

    // Target: 20%+ HTML compression
    const compressionTarget = 0.8; // 80% of original = 20% reduction
    const htmlCompression = (this.metrics.htmlCompressedSize / this.metrics.htmlTotalSize) <= compressionTarget;

    return {
      buildSpeed,
      cssSize,
      htmlCompression,
      overall: buildSpeed && cssSize && htmlCompression
    };
  }

  private generateRecommendations(duration: number): string[] {
    const recommendations: string[] = [];
    const targets = this.checkTargets(duration);

    if (!targets.buildSpeed) {
      const actual = (duration / this.metrics.totalPages).toFixed(0);
      recommendations.push(
        `Build speed is slower than target (${actual}ms/page vs 100ms/page target). ` +
        `Consider: reducing component complexity, optimizing worker pool size, or using incremental builds.`
      );
    }

    if (!targets.cssSize) {
      const actualKB = (this.metrics.cssGzipSize / 1024).toFixed(1);
      recommendations.push(
        `CSS bundle exceeds target (${actualKB}KB vs 50KB target). ` +
        `Consider: more aggressive tree-shaking, removing unused utilities, or splitting into page-specific bundles.`
      );
    }

    if (!targets.htmlCompression) {
      const actualRatio = ((1 - this.metrics.htmlCompressedSize / this.metrics.htmlTotalSize) * 100).toFixed(1);
      recommendations.push(
        `HTML compression below target (${actualRatio}% vs 20% target). ` +
        `Consider: more aggressive minification, removing development comments, or reducing inline styles.`
      );
    }

    if (this.metrics.parallelEfficiency < 0.7) {
      recommendations.push(
        `Parallel efficiency is low (${(this.metrics.parallelEfficiency * 100).toFixed(1)}%). ` +
        `Consider: adjusting worker pool size, reducing worker overhead, or checking for bottlenecks.`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push('All performance targets met! No optimizations needed.');
    }

    return recommendations;
  }

  private formatSize(bytes: number): string {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }

  printReport(report: BuildReport): void {
    console.log('\n=== Build Performance Report ===\n');
    console.log(`Total Duration:     ${report.duration}`);
    console.log(`Pages Built:        ${report.pagesBuilt}`);
    console.log(`Average Per Page:   ${report.averagePerPage}`);
    console.log(`\nCSS Bundle:`);
    console.log(`  Original:         ${report.cssBundleSize}`);
    console.log(`  Gzipped:          ${report.cssGzipSize} ${report.targetsMet.cssSize ? '✓' : '✗'}`);
    console.log(`\nHTML:`);
    console.log(`  Total Size:       ${report.htmlTotalSize}`);
    console.log(`  Compression:      ${(report.compressionRatio * 100).toFixed(1)}% ${report.targetsMet.htmlCompression ? '✓' : '✗'}`);
    console.log(`\nParallel Efficiency: ${report.parallelEfficiency}`);
    console.log(`\nTargets: ${report.targetsMet.overall ? '✓ ALL MET' : '✗ SOME MISSED'}`);
    console.log(`  Build Speed:      ${report.targetsMet.buildSpeed ? '✓' : '✗'}`);
    console.log(`  CSS Size:         ${report.targetsMet.cssSize ? '✓' : '✗'}`);
    console.log(`  HTML Compression: ${report.targetsMet.htmlCompression ? '✓' : '✗'}`);

    if (report.recommendations.length > 0) {
      console.log(`\nRecommendations:`);
      report.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`);
      });
    }

    console.log('\n================================\n');
  }
}
```

### Integration with Build Pipeline

```typescript
class OptimizedBuildPipeline {
  private reporter: PerformanceReporter;
  private parallelBuilder: ParallelBuilder;
  private cssOptimizer: CSSBundleOptimizer;
  private imageOptimizer: ImageOptimizer;

  constructor(private registry: ComponentRegistry) {
    this.reporter = new PerformanceReporter();
    this.parallelBuilder = new ParallelBuilder(registry);
    this.cssOptimizer = new CSSBundleOptimizer(
      registry,
      new CriticalCSSExtractor()
    );
    this.imageOptimizer = new ImageOptimizer();
  }

  async build(pages: PageNode[], outputDir: string): Promise<void> {
    this.reporter.start(pages.length);

    // 1. Build pages in parallel
    console.log('Building pages...');
    const renderedPages = await this.parallelBuilder.buildPages(pages);
    renderedPages.forEach(page => this.reporter.recordPage(page));

    // 2. Optimize CSS
    console.log('Optimizing CSS...');
    const cssBundle = await this.cssOptimizer.optimize(renderedPages);
    this.reporter.recordCSSBundle(cssBundle);

    // 3. Write CSS files
    await this.writeCSSBundle(cssBundle, outputDir);

    // 4. Write HTML files (with critical CSS inlined)
    await this.writeHTMLFiles(renderedPages, cssBundle, outputDir);

    // 5. Optimize images
    console.log('Optimizing images...');
    await this.imageOptimizer.optimizeDirectory(
      'assets/images',
      path.join(outputDir, 'assets/images')
    );

    // 6. Generate report
    const report = this.reporter.end();
    this.reporter.printReport(report);

    // 7. Write build metadata
    await this.writeBuildInfo(report, outputDir);
  }

  private async writeCSSBundle(bundle: CSSBundle, outputDir: string): Promise<void> {
    const stylesDir = path.join(outputDir, 'styles');
    await fs.ensureDir(stylesDir);

    // Write main bundle
    await fs.writeFile(
      path.join(stylesDir, 'main.css'),
      bundle.main,
      'utf8'
    );

    // Write critical CSS per page
    const criticalDir = path.join(stylesDir, 'critical');
    await fs.ensureDir(criticalDir);

    for (const [pagePath, criticalCSS] of bundle.critical) {
      const filename = pagePath.replace(/\//g, '-') + '.css';
      await fs.writeFile(
        path.join(criticalDir, filename),
        criticalCSS,
        'utf8'
      );
    }
  }

  private async writeHTMLFiles(
    pages: RenderedPage[],
    cssBundle: CSSBundle,
    outputDir: string
  ): Promise<void> {
    for (const page of pages) {
      const criticalCSS = cssBundle.critical.get(page.path) || '';

      // Inject critical CSS into <head>
      const htmlWithCritical = page.html.replace(
        '</head>',
        `<style>${criticalCSS}</style>\n</head>`
      );

      const filepath = path.join(outputDir, `${page.path}.html`);
      await fs.ensureDir(path.dirname(filepath));
      await fs.writeFile(filepath, htmlWithCritical, 'utf8');
    }
  }

  private async writeBuildInfo(report: BuildReport, outputDir: string): Promise<void> {
    const buildInfo = {
      timestamp: new Date().toISOString(),
      performance: report,
      version: '1.0'
    };

    await fs.writeJSON(
      path.join(outputDir, '.buildinfo.json'),
      buildInfo,
      { spaces: 2 }
    );
  }
}
```

## Testing Strategy

### Performance Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Build Performance', () => {
  let builder: OptimizedBuildPipeline;
  let registry: ComponentRegistry;

  beforeEach(async () => {
    registry = new ComponentRegistry('components');
    await registry.scan();
    builder = new OptimizedBuildPipeline(registry);
  });

  it('should build 100 pages in under 10 seconds', async () => {
    const pages = generateTestPages(100);

    const start = Date.now();
    await builder.build(pages, 'dist/test');
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(10000);
  }, 15000);

  it('should produce CSS bundle under 50KB (gzipped)', async () => {
    const pages = generateTestPages(20);
    const cssOptimizer = new CSSBundleOptimizer(
      registry,
      new CriticalCSSExtractor()
    );

    const renderedPages = await Promise.all(
      pages.map(p => new OptimizedPageRenderer(registry).render(p))
    );

    const bundle = await cssOptimizer.optimize(renderedPages);

    expect(bundle.gzipSize).toBeLessThan(50 * 1024);
  });

  it('should achieve 20%+ HTML compression', async () => {
    const page = generateTestPages(1)[0];
    const renderer = new OptimizedPageRenderer(registry);

    const rendered = await renderer.render(page);
    const compression = rendered.metadata.optimization;

    expect(compression.compressionRatio).toBeLessThan(0.8);
  });

  it('should utilize 80%+ of CPU cores in parallel builds', async () => {
    const pages = generateTestPages(100);
    const cpuCount = os.cpus().length;

    const parallelBuilder = new ParallelBuilder(registry);

    // Monitor CPU usage during build
    const startCPU = process.cpuUsage();
    await parallelBuilder.buildPages(pages);
    const endCPU = process.cpuUsage(startCPU);

    const totalCPU = endCPU.user + endCPU.system;
    const efficiency = totalCPU / (cpuCount * 1000000); // Rough efficiency

    expect(efficiency).toBeGreaterThan(0.8);
  });
});

describe('Incremental Builds', () => {
  let incrementalBuilder: IncrementalBuilder;
  let registry: ComponentRegistry;
  let cacheDir: string;

  beforeEach(async () => {
    registry = new ComponentRegistry('components');
    await registry.scan();
    cacheDir = 'test-cache';
    incrementalBuilder = new IncrementalBuilder(registry, cacheDir);
  });

  afterEach(async () => {
    await fs.remove(cacheDir);
  });

  it('should rebuild only changed pages', async () => {
    const pages = generateTestPages(10);

    // First build
    await incrementalBuilder.build(pages);

    // Modify one page
    await fs.writeFile('pages/test-0.json', JSON.stringify({ modified: true }));

    // Second build
    const result = await incrementalBuilder.build(pages);

    expect(result.built).toBe(1);
    expect(result.cached).toBe(9);
  });

  it('should complete incremental rebuild in under 1 second', async () => {
    const pages = generateTestPages(10);

    // First build
    await incrementalBuilder.build(pages);

    // Modify one page
    await fs.writeFile('pages/test-0.json', JSON.stringify({ modified: true }));

    // Second build with timing
    const start = Date.now();
    await incrementalBuilder.build(pages);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
  });
});

describe('HTML Optimization', () => {
  let optimizer: HTMLOptimizer;

  beforeEach(() => {
    optimizer = new SelectiveHTMLOptimizer();
  });

  it('should remove whitespace and comments', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <!-- This is a comment -->
        <head>
          <title>Test</title>
        </head>
        <body>
          <div>   Content   </div>
        </body>
      </html>
    `;

    const optimized = optimizer.optimize(html);

    expect(optimized).not.toContain('<!--');
    expect(optimized.length).toBeLessThan(html.length);
  });

  it('should preserve whitespace in <pre> and <code>', () => {
    const html = `
      <pre>
        const code = {
          key: 'value'
        };
      </pre>
    `;

    const optimized = optimizer.optimize(html);

    expect(optimized).toContain('const code');
    expect(optimized).toMatch(/\s+key:\s+'value'/);
  });
});

// Test helper
function generateTestPages(count: number): PageNode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `test-${i}`,
    path: `test-${i}`,
    template: 'Page',
    data: {
      title: `Test Page ${i}`,
      content: `Content for page ${i}`
    },
    metadata: {}
  }));
}
```

## Acceptance Criteria

### Phase 4 Complete When:

- [ ] **HTML Minification**
  - [ ] Reduces HTML size by 20%+ on average
  - [ ] Preserves whitespace in `<pre>` and `<code>`
  - [ ] Removes comments and redundant attributes
  - [ ] Maintains valid HTML5 structure

- [ ] **CSS Optimization**
  - [ ] CSS bundle ≤50KB (gzipped)
  - [ ] Tree-shaking removes unused component styles
  - [ ] Critical CSS extracted per page
  - [ ] Main bundle minified and optimized

- [ ] **Parallel Builds**
  - [ ] Uses all available CPU cores
  - [ ] Achieves 80%+ parallel efficiency
  - [ ] Build time <10s for 100 pages
  - [ ] Worker pool properly manages resources

- [ ] **Incremental Builds**
  - [ ] Detects changed files accurately
  - [ ] Rebuilds only affected pages
  - [ ] Single page rebuild <1s
  - [ ] Build cache persists correctly

- [ ] **Asset Optimization**
  - [ ] Images optimized and compressed
  - [ ] Responsive variants generated
  - [ ] WebP/AVIF formats supported
  - [ ] Lazy loading attributes added

- [ ] **Performance Monitoring**
  - [ ] Reports accurate build metrics
  - [ ] Tracks against defined targets
  - [ ] Provides actionable recommendations
  - [ ] Build metadata written to output

- [ ] **Testing**
  - [ ] Performance tests pass
  - [ ] Incremental build tests pass
  - [ ] Optimization tests pass
  - [ ] All acceptance criteria verified

## Build Output Structure

The optimized build produces this output structure:

```
dist/
├── index.html                 # Optimized HTML pages
├── about.html
├── contact.html
├── blog/
│   ├── post-1.html
│   └── post-2.html
├── styles/
│   ├── main.css              # Minified CSS bundle (<50KB gzipped)
│   └── critical/             # Per-page critical CSS
│       ├── index.css
│       ├── about.css
│       ├── contact.css
│       └── blog-post-1.css
├── assets/
│   ├── images/
│   │   ├── hero.jpg          # Original
│   │   ├── hero@320w.webp    # Responsive variants
│   │   ├── hero@640w.webp
│   │   ├── hero@1280w.webp
│   │   ├── hero@320w.jpg
│   │   ├── hero@640w.jpg
│   │   └── hero@1280w.jpg
│   └── fonts/
│       ├── inter.woff2
│       └── inter-italic.woff2
├── .buildinfo.json           # Build metadata and performance report
└── .buildcache/              # Incremental build cache (not deployed)
    └── build-cache.json
```

### Build Metadata Format

`.buildinfo.json` contains:

```json
{
  "version": "1.0",
  "timestamp": "2025-10-25T14:32:15.000Z",
  "performance": {
    "duration": "4.52s",
    "pagesBuilt": 47,
    "averagePerPage": "96ms",
    "cssBundleSize": "38.2KB",
    "cssGzipSize": "12.4KB",
    "htmlTotalSize": "423.1KB",
    "compressionRatio": 0.78,
    "parallelEfficiency": "85.3%",
    "targetsMet": {
      "buildSpeed": true,
      "cssSize": true,
      "htmlCompression": true,
      "overall": true
    },
    "recommendations": [
      "All performance targets met! No optimizations needed."
    ]
  }
}
```

## Integration Example

Complete example of optimized build pipeline usage:

```typescript
import { OptimizedBuildPipeline } from './build/optimized-pipeline';
import { ComponentRegistry } from './build/component-registry';
import { PageLoader } from './build/page-loader';

async function main() {
  // 1. Initialize registry
  console.log('Scanning components...');
  const registry = new ComponentRegistry('components');
  await registry.scan();
  console.log(`Found ${registry.size()} components`);

  // 2. Load pages
  console.log('Loading pages...');
  const loader = new PageLoader('pages');
  const pages = await loader.loadAll();
  console.log(`Loaded ${pages.length} pages`);

  // 3. Run optimized build
  console.log('Starting optimized build...');
  const pipeline = new OptimizedBuildPipeline(registry);
  await pipeline.build(pages, 'dist');

  console.log('Build complete!');
}

main().catch(console.error);
```

## Next Steps

With Phase 4 complete, the entire Build Engine (Pillar 3) is finished. You can now:

### Immediate Next Steps

1. **Integration Testing**
   - Run full end-to-end build tests
   - Verify all performance targets are met
   - Test with real-world content

2. **Documentation**
   - Update build pipeline documentation
   - Document performance optimization techniques
   - Create troubleshooting guide

3. **Benchmarking**
   - Establish performance baselines
   - Create performance regression tests
   - Set up continuous monitoring

### Proceed to Pillar 4: AI Integration

Once Build Engine is validated:

1. **MCP Tool Implementation** (SPEC/P4-ALGORITHMS.md - see algorithms, phase docs coming soon)
   - Set up Claude Desktop integration
   - Implement 5 core MCP tools
   - Enable AI-assisted site generation

2. **Composition Engine** (phase docs coming soon)
   - AI page creation from natural language
   - Component selection and composition
   - Content generation

3. **Validation & Feedback** (phase docs coming soon)
   - Error detection and suggestions
   - Composition validation
   - Interactive refinement

### Alternative: Begin Implementation

If specifications are complete, begin implementing Pillar 3:

```bash
# Create implementation structure
mkdir -p src/build/{registry,renderer,pipeline,optimization}

# Start with Phase 1 (Registry)
# Follow SPEC/P2-PHASE-1-SCHEMAS.md
```

## References

### Internal Specifications

- **SPEC/P2-PHASE-1-SCHEMAS.md** - Component registry implementation
- **SPEC/P3-PHASE-3-RENDER.md** - Template rendering system
- **SPEC/P3-PHASE-1-PIPELINE.md** - Build pipeline orchestration
- **SPEC/P3-CSS-OPTIMIZATION.md** - Detailed CSS optimization strategies
- **SPEC/REFERENCE/SUCCESS-METRICS.md** - Performance targets and KPIs
- **SPEC/REFERENCE/COMPONENT-SPEC.md** - Component definition format

### External Dependencies

- **html-minifier-terser** - HTML minification
- **clean-css** - CSS minification
- **purgecss** - Unused CSS removal
- **sharp** - Image optimization
- **worker_threads** - Node.js parallel processing
- **glob** - File pattern matching

### Performance Targets Summary

| Metric | Target | Phase |
|--------|--------|-------|
| Build Speed | <10s for 100 pages | Phase 4 |
| CSS Bundle | <50KB gzipped | Phase 4 |
| HTML Compression | 20%+ reduction | Phase 4 |
| Parallel Efficiency | 80%+ CPU usage | Phase 4 |
| Incremental Rebuild | <1s single page | Phase 4 |
| Memory Usage | <500MB for 1000 pages | All phases |

---

**Document Status:** Complete
**Last Updated:** 2025-10-25
**Next Review:** After Phase 4 implementation
