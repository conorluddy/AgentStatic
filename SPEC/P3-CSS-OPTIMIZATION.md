# CSS Optimization Strategy

**Achieving the <50KB CSS Target Through Progressive Enhancement and Smart Bundling**

This document outlines the comprehensive strategy for optimizing CSS delivery in AgentStatic, ensuring the final bundle stays under 50KB while maintaining full design system capabilities.

---

## CSS Bundle Size Targets

### Progressive Size Goals
```
Phase 1: Foundation    <5KB   (tokens, reset, base)
Phase 2: Atoms         <15KB  (+ atomic components)
Phase 3: Molecules     <30KB  (+ molecular components)
Phase 4: Organisms     <45KB  (+ organism sections)
Final: Complete        <50KB  (with all optimizations)
```

### Size Budget Breakdown
```
┌──────────────────────────────────────────────────────┐
│ Total Budget: 50KB (gzipped)                        │
├──────────────────────────────────────────────────────┤
│ Design Tokens & Variables     2KB  ( 4%)            │
│ Reset & Base Styles           2KB  ( 4%)            │
│ Typography System             3KB  ( 6%)            │
│ Layout Utilities              2KB  ( 4%)            │
│ Atomic Components             8KB  (16%)            │
│ Molecular Components         12KB  (24%)            │
│ Organism Components          18KB  (36%)            │
│ Dark Mode Overrides           2KB  ( 4%)            │
│ Print Styles                  1KB  ( 2%)            │
└──────────────────────────────────────────────────────┘
```

---

## CSS Bundling Strategy

### Cascade Layer Architecture
```css
/* Layer order defines specificity cascade */
@layer reset, base, tokens, components, utilities, overrides;

/* 1. Reset Layer - Browser normalization */
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

/* 2. Base Layer - Element defaults */
@layer base {
  body {
    font-family: var(--font-sans);
    line-height: 1.5;
    color: var(--color-text);
  }
}

/* 3. Tokens Layer - Design system variables */
@layer tokens {
  :root {
    --color-primary: #0066cc;
    --spacing-base: 1rem;
    /* ... all design tokens ... */
  }
}

/* 4. Components Layer - All component styles */
@layer components {
  /* Component styles injected here */
}

/* 5. Utilities Layer - Helper classes */
@layer utilities {
  .visually-hidden { /* ... */ }
  .container { /* ... */ }
}

/* 6. Overrides Layer - User customization */
@layer overrides {
  /* User customizations go here */
}
```

### Layer Preservation During Bundling
```typescript
interface CSSBundler {
  private layers: Map<string, string[]> = new Map([
    ['reset', []],
    ['base', []],
    ['tokens', []],
    ['components', []],
    ['utilities', []],
    ['overrides', []]
  ]);

  addCSS(css: string, layer: string): void {
    const layerStyles = this.layers.get(layer) || [];
    layerStyles.push(css);
    this.layers.set(layer, layerStyles);
  }

  bundle(): string {
    const output: string[] = [];

    // Define layer order
    output.push('@layer reset, base, tokens, components, utilities, overrides;');

    // Bundle each layer in order
    for (const [layer, styles] of this.layers) {
      if (styles.length > 0) {
        output.push(`@layer ${layer} {`);
        output.push(...styles);
        output.push('}');
      }
    }

    return output.join('\n');
  }
}
```

### Import Order Maintenance
```typescript
interface ImportResolver {
  private importGraph: Map<string, Set<string>> = new Map();

  resolveImports(entryFile: string): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();

    this.resolveFile(entryFile, resolved, visited);

    return resolved;
  }

  private resolveFile(
    file: string,
    resolved: string[],
    visited: Set<string>
  ): void {
    if (visited.has(file)) return;
    visited.add(file);

    // Process dependencies first (depth-first)
    const dependencies = this.importGraph.get(file) || new Set();
    for (const dep of dependencies) {
      this.resolveFile(dep, resolved, visited);
    }

    // Then add this file
    resolved.push(file);
  }

  parseImports(cssContent: string, filePath: string): void {
    const imports = cssContent.matchAll(/@import\s+['"](.+?)['"]/g);

    const dependencies = new Set<string>();
    for (const match of imports) {
      const importPath = this.resolveImportPath(match[1], filePath);
      dependencies.add(importPath);
    }

    this.importGraph.set(filePath, dependencies);
  }
}
```

### Layer Concatenation Approach
```typescript
class LayerConcatenator {
  concatenateLayers(components: ComponentCSS[]): string {
    const layerContents: Record<string, string[]> = {
      reset: [],
      base: [],
      tokens: [],
      components: [],
      utilities: [],
      overrides: []
    };

    // Sort components by type for optimal cascade
    const sorted = this.sortByComponentType(components);

    for (const component of sorted) {
      const layer = this.determineLayer(component.type);
      layerContents[layer].push(component.css);
    }

    // Build final output
    return this.buildLayeredCSS(layerContents);
  }

  private sortByComponentType(components: ComponentCSS[]): ComponentCSS[] {
    const order = ['system', 'atoms', 'molecules', 'organisms'];

    return components.sort((a, b) => {
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
  }

  private determineLayer(componentType: string): string {
    switch (componentType) {
      case 'system':
        return 'tokens';
      case 'reset':
        return 'reset';
      case 'base':
        return 'base';
      default:
        return 'components';
    }
  }
}
```

---

## Tree-Shaking Implementation

### Usage Analysis
```typescript
interface CSSTreeShaker {
  private usedComponents: Set<string> = new Set();
  private componentStyles: Map<string, string> = new Map();

  // Analyze which components are actually used
  analyzeUsage(pages: Page[]): Set<ComponentId> {
    const used = new Set<ComponentId>();

    for (const page of pages) {
      this.traverseAST(page.ast, used);
    }

    // Include dependencies
    const withDependencies = this.resolveDependencies(used);

    return withDependencies;
  }

  private traverseAST(node: ASTNode, used: Set<ComponentId>): void {
    if (node.type === 'component') {
      used.add(node.componentId);

      // Traverse slots
      if (node.slots) {
        for (const slot of Object.values(node.slots)) {
          const nodes = Array.isArray(slot) ? slot : [slot];
          nodes.forEach(n => this.traverseAST(n, used));
        }
      }
    }

    // Traverse children
    if (node.children) {
      node.children.forEach(child => this.traverseAST(child, used));
    }
  }

  // Some components depend on others (e.g., card uses button)
  private resolveDependencies(
    components: Set<ComponentId>
  ): Set<ComponentId> {
    const dependencies = new Map<ComponentId, ComponentId[]>([
      ['molecules/card', ['atoms/button', 'atoms/heading']],
      ['organisms/hero', ['atoms/button', 'atoms/heading']],
      // ... more dependencies
    ]);

    const resolved = new Set(components);
    let added = true;

    while (added) {
      added = false;
      for (const component of resolved) {
        const deps = dependencies.get(component) || [];
        for (const dep of deps) {
          if (!resolved.has(dep)) {
            resolved.add(dep);
            added = true;
          }
        }
      }
    }

    return resolved;
  }
}
```

### CSS Extraction
```typescript
interface CSSExtractor {
  // Extract only the CSS for used components
  extractUsedCSS(
    allCSS: string,
    usedComponents: Set<ComponentId>
  ): string {
    const extracted: string[] = [];

    // Always include base styles
    extracted.push(this.extractBaseCSS());

    // Extract component-specific CSS
    for (const componentId of usedComponents) {
      const componentCSS = this.extractComponentCSS(componentId);
      if (componentCSS) {
        extracted.push(componentCSS);
      }
    }

    return extracted.join('\n');
  }

  private extractComponentCSS(componentId: ComponentId): string | null {
    const cssPath = this.getComponentCSSPath(componentId);

    if (!fs.existsSync(cssPath)) {
      return null;
    }

    let css = fs.readFileSync(cssPath, 'utf8');

    // Remove unused variants if possible
    css = this.removeUnusedVariants(css, componentId);

    // Remove unused states if possible
    css = this.removeUnusedStates(css, componentId);

    return css;
  }

  private removeUnusedVariants(
    css: string,
    componentId: ComponentId
  ): string {
    const usedVariants = this.analyzeVariantUsage(componentId);

    // Parse CSS and filter rules
    const ast = postcss.parse(css);

    ast.walkRules((rule) => {
      // Check if this is a variant we don't use
      const variantMatch = rule.selector.match(/--(\w+)/);
      if (variantMatch && !usedVariants.has(variantMatch[1])) {
        rule.remove();
      }
    });

    return ast.toString();
  }
}
```

### Common CSS Extraction
```typescript
interface CommonCSSExtractor {
  extractCommonCSS(): string {
    return `
      /* Always included base styles */
      @layer reset {
        ${this.getResetCSS()}
      }

      @layer base {
        ${this.getBaseCSS()}
      }

      @layer tokens {
        ${this.getTokensCSS()}
      }

      @layer utilities {
        ${this.getUtilitiesCSS()}
      }
    `;
  }

  private getTokensCSS(): string {
    // Design tokens are always included
    return fs.readFileSync('./components/_system/tokens.css', 'utf8');
  }

  private getUtilitiesCSS(): string {
    // Only include actually used utilities
    const usedUtilities = this.detectUsedUtilities();
    let utilities = fs.readFileSync('./components/_system/utilities.css', 'utf8');

    // Filter to only used utilities
    return this.filterUtilities(utilities, usedUtilities);
  }

  private detectUsedUtilities(): Set<string> {
    const used = new Set<string>();

    // Scan all templates for utility class usage
    const templates = glob.sync('**/*.njk');
    for (const template of templates) {
      const content = fs.readFileSync(template, 'utf8');
      const classes = content.matchAll(/class="([^"]+)"/g);

      for (const match of classes) {
        const classList = match[1].split(' ');
        classList.forEach(cls => {
          if (this.isUtilityClass(cls)) {
            used.add(cls);
          }
        });
      }
    }

    return used;
  }
}
```

---

## Critical CSS Extraction

### Above-the-Fold CSS Identification
```typescript
interface CriticalCSSExtractor {
  async extractCritical(
    htmlPath: string,
    cssPath: string
  ): Promise<string> {
    // Use a headless browser to determine critical CSS
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to common above-the-fold size
    await page.setViewport({
      width: 1440,
      height: 800
    });

    // Load the page
    await page.goto(`file://${htmlPath}`);

    // Inject CSS
    await page.addStyleTag({ path: cssPath });

    // Extract critical CSS
    const critical = await page.evaluate(() => {
      const critical = new Set<string>();

      // Get all elements above the fold
      const elements = document.querySelectorAll('*');
      const viewportHeight = window.innerHeight;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        // Is element visible above the fold?
        if (rect.top < viewportHeight) {
          // Get computed styles
          const styles = window.getComputedStyle(element);

          // Get matching CSS rules
          const rules = this.getMatchingCSSRules(element);
          rules.forEach(rule => critical.add(rule));
        }
      }

      return Array.from(critical).join('\n');
    });

    await browser.close();

    return critical;
  }
}
```

### Inline vs External Strategy
```typescript
interface CSSDeliveryStrategy {
  determinStrategy(css: {
    critical: string;
    nonCritical: string;
  }): {
    inline: string;
    external: string;
  } {
    const criticalSize = this.getGzippedSize(css.critical);
    const totalSize = this.getGzippedSize(css.critical + css.nonCritical);

    // Inline critical CSS if under 14KB (HTTP/2 initial window)
    if (criticalSize < 14 * 1024) {
      return {
        inline: css.critical,
        external: css.nonCritical
      };
    }

    // If critical is too large, inline only essential
    const essential = this.extractEssential(css.critical);
    return {
      inline: essential,
      external: css.critical + css.nonCritical
    };
  }

  private extractEssential(css: string): string {
    // Extract only the most critical rules
    const essential = [
      this.extractResetStyles(css),
      this.extractTokens(css),
      this.extractAboveFoldComponents(css)
    ];

    return essential.join('\n');
  }
}
```

### Per-Page Critical CSS
```typescript
class PerPageCriticalCSS {
  async generateForPage(page: Page): Promise<PageCSS> {
    // Analyze page-specific component usage
    const components = this.analyzePageComponents(page);

    // Extract critical CSS for these components
    const criticalComponents = components.filter(c =>
      this.isAboveFold(c, page)
    );

    // Generate page-specific critical CSS
    const critical = await this.extractComponentCSS(criticalComponents);

    // Generate remaining CSS
    const remaining = await this.extractComponentCSS(
      components.filter(c => !criticalComponents.includes(c))
    );

    return {
      path: page.path,
      critical,
      remaining,
      hash: this.generateHash(critical)
    };
  }

  private isAboveFold(
    component: ComponentId,
    page: Page
  ): boolean {
    // Determine if component appears above fold on this page
    const aboveFoldComponents = [
      'organisms/hero',
      'molecules/navigation',
      'atoms/button',
      'atoms/heading'
    ];

    return aboveFoldComponents.includes(component);
  }

  injectIntoHTML(html: string, pageCSS: PageCSS): string {
    const $ = cheerio.load(html);

    // Inject critical CSS inline
    $('head').append(`
      <style id="critical-css">
        ${pageCSS.critical}
      </style>
    `);

    // Load remaining CSS asynchronously
    $('head').append(`
      <link
        rel="preload"
        as="style"
        href="/css/page-${pageCSS.hash}.css"
        onload="this.onload=null;this.rel='stylesheet'"
      >
      <noscript>
        <link rel="stylesheet" href="/css/page-${pageCSS.hash}.css">
      </noscript>
    `);

    return $.html();
  }
}
```

---

## Bundle Size Monitoring

### Build-Time Warnings
```typescript
interface BundleSizeMonitor {
  private thresholds = {
    good: 42 * 1024,      // 42KB - Green
    warning: 48 * 1024,   // 48KB - Yellow warning
    error: 50 * 1024      // 50KB - Red warning (not blocking)
  };

  checkBundleSize(css: string): BundleReport {
    const raw = Buffer.byteLength(css, 'utf8');
    const gzipped = this.getGzippedSize(css);

    const status = this.getStatus(gzipped);
    const report: BundleReport = {
      raw,
      gzipped,
      status,
      message: this.getMessage(gzipped, status),
      breakdown: this.analyzeBreakdown(css)
    };

    this.logReport(report);

    return report;
  }

  private getStatus(size: number): 'good' | 'warning' | 'error' {
    if (size <= this.thresholds.good) return 'good';
    if (size <= this.thresholds.warning) return 'warning';
    return 'error';
  }

  private getMessage(size: number, status: string): string {
    const kb = (size / 1024).toFixed(1);

    switch (status) {
      case 'good':
        return `✅ CSS bundle size: ${kb}KB (under target)`;

      case 'warning':
        return `⚠️  CSS bundle size: ${kb}KB (approaching limit)`;

      case 'error':
        return `⚠️  CSS bundle size: ${kb}KB (exceeds 50KB target!)`;
    }
  }

  private analyzeBreakdown(css: string): ComponentBreakdown[] {
    const components: ComponentBreakdown[] = [];

    // Parse CSS to identify component contributions
    const sections = this.parseComponentSections(css);

    for (const [component, styles] of sections) {
      components.push({
        component,
        raw: Buffer.byteLength(styles, 'utf8'),
        gzipped: this.getGzippedSize(styles),
        percentage: (styles.length / css.length) * 100
      });
    }

    // Sort by size
    return components.sort((a, b) => b.gzipped - a.gzipped);
  }

  private logReport(report: BundleReport): void {
    console.log('\n' + '='.repeat(50));
    console.log('CSS BUNDLE SIZE REPORT');
    console.log('='.repeat(50));

    console.log(report.message);
    console.log(`Raw size: ${(report.raw / 1024).toFixed(1)}KB`);
    console.log(`Gzipped: ${(report.gzipped / 1024).toFixed(1)}KB`);

    if (report.breakdown.length > 0) {
      console.log('\nLargest components:');
      report.breakdown.slice(0, 5).forEach(item => {
        const kb = (item.gzipped / 1024).toFixed(1);
        const pct = item.percentage.toFixed(1);
        console.log(`  ${item.component}: ${kb}KB (${pct}%)`);
      });
    }

    if (report.status === 'error') {
      console.log('\n⚠️  Consider:');
      console.log('  - Removing unused components');
      console.log('  - Simplifying complex selectors');
      console.log('  - Reducing variant styles');
      console.log('  - Extracting page-specific CSS');
    }

    console.log('='.repeat(50) + '\n');
  }
}
```

### Per-Component CSS Budgets
```typescript
interface ComponentBudget {
  private budgets: Map<string, number> = new Map([
    // Atoms: 500 bytes each
    ['atoms/button', 500],
    ['atoms/input', 500],
    ['atoms/heading', 300],

    // Molecules: 1KB each
    ['molecules/card', 1024],
    ['molecules/navigation', 1024],

    // Organisms: 2KB each
    ['organisms/hero', 2048],
    ['organisms/footer', 2048],
    ['organisms/feature-grid', 2048]
  ]);

  checkComponent(
    componentId: string,
    css: string
  ): ComponentBudgetResult {
    const budget = this.budgets.get(componentId);
    if (!budget) {
      return { status: 'no-budget' };
    }

    const size = this.getGzippedSize(css);
    const percentage = (size / budget) * 100;

    if (size <= budget) {
      return {
        status: 'ok',
        size,
        budget,
        percentage,
        message: `✅ ${componentId}: ${size}B of ${budget}B budget`
      };
    }

    return {
      status: 'exceeded',
      size,
      budget,
      percentage,
      message: `❌ ${componentId}: ${size}B exceeds ${budget}B budget!`,
      overage: size - budget
    };
  }

  reportAll(components: Map<string, string>): void {
    const results: ComponentBudgetResult[] = [];

    for (const [id, css] of components) {
      results.push(this.checkComponent(id, css));
    }

    // Log summary
    const exceeded = results.filter(r => r.status === 'exceeded');

    if (exceeded.length > 0) {
      console.log('\n⚠️  Component Budget Warnings:');
      exceeded.forEach(r => console.log(`  ${r.message}`));
    }
  }
}
```

### Reporting and Tracking
```typescript
class BundleSizeTracker {
  private history: BundleSizeEntry[] = [];
  private historyFile = '.agentstatic/bundle-size-history.json';

  track(report: BundleReport): void {
    const entry: BundleSizeEntry = {
      timestamp: Date.now(),
      commit: this.getCurrentCommit(),
      branch: this.getCurrentBranch(),
      raw: report.raw,
      gzipped: report.gzipped,
      status: report.status
    };

    // Load existing history
    if (fs.existsSync(this.historyFile)) {
      this.history = JSON.parse(
        fs.readFileSync(this.historyFile, 'utf8')
      );
    }

    // Add new entry
    this.history.push(entry);

    // Keep last 100 entries
    if (this.history.length > 100) {
      this.history = this.history.slice(-100);
    }

    // Save history
    fs.writeFileSync(
      this.historyFile,
      JSON.stringify(this.history, null, 2)
    );

    // Check for regression
    this.checkRegression(entry);
  }

  private checkRegression(current: BundleSizeEntry): void {
    // Get previous entry
    const previous = this.history[this.history.length - 2];

    if (!previous) return;

    const diff = current.gzipped - previous.gzipped;
    const percentage = (diff / previous.gzipped) * 100;

    if (diff > 1024) { // More than 1KB increase
      console.warn(`
        ⚠️  Bundle size increased by ${(diff / 1024).toFixed(1)}KB (${percentage.toFixed(1)}%)
        Previous: ${(previous.gzipped / 1024).toFixed(1)}KB
        Current: ${(current.gzipped / 1024).toFixed(1)}KB
      `);
    } else if (diff < -1024) { // More than 1KB decrease
      console.log(`
        ✅ Bundle size decreased by ${(Math.abs(diff) / 1024).toFixed(1)}KB (${Math.abs(percentage).toFixed(1)}%)
      `);
    }
  }

  generateReport(): string {
    const report: string[] = [];

    report.push('# CSS Bundle Size Report\n');
    report.push(`Generated: ${new Date().toISOString()}\n`);

    // Current status
    const latest = this.history[this.history.length - 1];
    report.push('## Current Status\n');
    report.push(`- Size: ${(latest.gzipped / 1024).toFixed(1)}KB (gzipped)`);
    report.push(`- Status: ${latest.status}`);
    report.push(`- Target: <50KB\n`);

    // Trend chart (ASCII)
    report.push('## Size Trend (Last 10 builds)\n');
    report.push('```');
    report.push(this.generateASCIIChart(this.history.slice(-10)));
    report.push('```\n');

    // Recommendations
    if (latest.status === 'error') {
      report.push('## Recommendations\n');
      report.push('- Review recently added components');
      report.push('- Run CSS optimization tools');
      report.push('- Consider splitting page-specific styles');
      report.push('- Audit for duplicate styles');
    }

    return report.join('\n');
  }
}
```

---

## Performance Targets

### Phase-by-Phase Targets
```typescript
const PHASE_TARGETS = {
  phase1: {
    name: 'Foundation',
    maxSize: 5 * 1024,  // 5KB
    includes: [
      'tokens.css',
      'reset.css',
      'base.css',
      'typography.css'
    ]
  },

  phase2: {
    name: 'Basic Components',
    maxSize: 15 * 1024,  // 15KB
    includes: [
      ...PHASE_TARGETS.phase1.includes,
      'atoms/*.css',
      'utilities.css'
    ]
  },

  phase3: {
    name: 'Complex Components',
    maxSize: 35 * 1024,  // 35KB
    includes: [
      ...PHASE_TARGETS.phase2.includes,
      'molecules/*.css'
    ]
  },

  phase4: {
    name: 'Complete System',
    maxSize: 50 * 1024,  // 50KB
    includes: [
      ...PHASE_TARGETS.phase3.includes,
      'organisms/*.css',
      'dark-mode.css',
      'print.css'
    ]
  }
};
```

### Optimization Techniques
```typescript
class CSSOptimizer {
  optimize(css: string): string {
    let optimized = css;

    // 1. Merge duplicate rules
    optimized = this.mergeDuplicates(optimized);

    // 2. Combine similar selectors
    optimized = this.combineSelectors(optimized);

    // 3. Minify values
    optimized = this.minifyValues(optimized);

    // 4. Remove unused custom properties
    optimized = this.removeUnusedVariables(optimized);

    // 5. Optimize calc() expressions
    optimized = this.optimizeCalc(optimized);

    // 6. Shorten color values
    optimized = this.optimizeColors(optimized);

    // 7. Remove unnecessary prefixes
    optimized = this.removeUnnecessaryPrefixes(optimized);

    return optimized;
  }

  private mergeDuplicates(css: string): string {
    const ast = postcss.parse(css);
    const rules = new Map<string, postcss.Rule>();

    ast.walkRules((rule) => {
      const selector = rule.selector;

      if (rules.has(selector)) {
        // Merge declarations
        const existing = rules.get(selector)!;
        rule.walkDecls((decl) => {
          existing.append(decl.clone());
        });
        rule.remove();
      } else {
        rules.set(selector, rule);
      }
    });

    return ast.toString();
  }

  private combineSelectors(css: string): string {
    // Combine rules with identical declarations
    const ast = postcss.parse(css);
    const declarationMap = new Map<string, string[]>();

    ast.walkRules((rule) => {
      const declarations = rule.toString().replace(rule.selector, '');
      const selectors = declarationMap.get(declarations) || [];
      selectors.push(rule.selector);
      declarationMap.set(declarations, selectors);
    });

    // Rebuild with combined selectors
    const combined = [];
    for (const [declarations, selectors] of declarationMap) {
      if (selectors.length > 1) {
        combined.push(`${selectors.join(', ')} ${declarations}`);
      } else {
        combined.push(`${selectors[0]} ${declarations}`);
      }
    }

    return combined.join('\n');
  }
}
```

---

## Testing and Validation

### Size Testing
```typescript
describe('CSS Bundle Size', () => {
  it('should stay under 50KB target', async () => {
    const css = await buildCSS();
    const gzipped = getGzippedSize(css);

    expect(gzipped).toBeLessThan(50 * 1024);
  });

  it('should meet phase targets', async () => {
    for (const [phase, config] of Object.entries(PHASE_TARGETS)) {
      const css = await buildCSSForPhase(phase);
      const gzipped = getGzippedSize(css);

      expect(gzipped).toBeLessThan(config.maxSize);
    }
  });

  it('should not regress on size', async () => {
    const current = await buildCSS();
    const baseline = await getBaselineSize();

    const currentSize = getGzippedSize(current);

    // Allow 5% increase maximum
    expect(currentSize).toBeLessThan(baseline * 1.05);
  });
});
```

---

*This optimization strategy ensures AgentStatic delivers a complete design system in under 50KB of CSS through smart bundling, tree-shaking, and continuous monitoring.*