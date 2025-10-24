# AgentStatic Code Style Guide

**Purpose**: Establish coding standards for AgentStatic that serve both human developers and AI agents.

**Core Principle**: Every line of code, comment, and structural decision must optimize for clarity within finite attention budgets—whether that attention belongs to a developer reviewing code or an AI agent reasoning about implementation.

---

## Table of Contents

1. [General Principles](#general-principles)
2. [File Organization](#file-organization)
3. [TypeScript/JavaScript Standards](#typescriptjavascript-standards)
4. [CSS Standards](#css-standards)
5. [HTML Standards](#html-standards)
6. [Documentation Standards](#documentation-standards)
7. [Architecture Patterns](#architecture-patterns)
8. [Testing Standards](#testing-standards)
9. [AI-Agent-Friendly Patterns](#ai-agent-friendly-patterns)
10. [AgentStatic-Specific Patterns](#agentstatic-specific-patterns)
11. [17 Decisions in Code](#17-decisions-in-code)
12. [Performance & Bundle Consciousness](#performance--bundle-consciousness)
13. [Build System Integration](#build-system-integration)

---

## General Principles

### 1. Jackson's Law: Minimal Code for Maximum Clarity

**Every line of code is technical debt.** Write the minimum necessary to solve the problem correctly.

✅ **Good**:
```typescript
// Extract path before validation for audit trail
const path = url.pathname;
```

❌ **Bad**:
```typescript
// Get the pathname from the URL object
const pathname = url.pathname;
// Now extract it
const path = pathname;
```

### 2. Progressive Disclosure

Code should be understandable layer by layer, not all at once.

✅ **Good**:
```typescript
class PageComposer {
  async composePage(intent: string): Promise<Page> {
    const components = await this.discoverComponents(intent);
    return this.assembleComponents(components);
  }

  private async discoverComponents(intent: string): Promise<Component[]> {
    // details here
  }

  private assembleComponents(components: Component[]): Page {
    // details here
  }
}
```

❌ **Bad**:
```typescript
async function composePage(intent) {
  // 200 lines of discovery logic mixed with assembly logic mixed with validation
}
```

### 3. Self-Documenting Code

Code should explain itself through clear names and structure. Comments explain **why**, not **what**.

✅ **Good**:
```typescript
// We validate component props before composition to give agents
// clear error messages for malformed specifications (per Phase 6 spec)
const validation = validator.validateComponentProps(componentId, props);
if (!validation.valid) {
  throw new CompositionError(validation.errors);
}
```

❌ **Bad**:
```typescript
// Check if props are valid
if (!props) throw new Error("Invalid");
```

### 4. Explicit Dependencies

Make all dependencies clear through parameters and imports. No hidden global state.

✅ **Good**:
```typescript
class ComponentRegistry {
  constructor(private index: ComponentIndex, private validator: SchemaValidator) {}

  findComponent(id: string): Component {
    // implementation
  }
}
```

❌ **Bad**:
```typescript
class ComponentRegistry {
  findComponent(id: string): Component {
    const index = globalComponentIndex; // Hidden dependency!
    // implementation
  }
}
```

---

## File Organization

### Directory Structure

Follow the three-tier architecture:

```
src/
├── tier-1-components/          # Component Library
│   ├── _system/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   └── base.css
│   ├── atoms/
│   │   ├── button/
│   │   │   ├── button.html
│   │   │   ├── button.css
│   │   │   ├── button.schema.json
│   │   │   └── README.md
│   │   └── [other atoms]
│   ├── molecules/
│   ├── organisms/
│   └── index.css
│
├── tier-2-core/                # SSG Core
│   ├── engine/
│   │   ├── template-engine.ts
│   │   ├── component-loader.ts
│   │   └── README.md
│   ├── router/
│   ├── builder/
│   ├── assets/
│   └── index.ts               # Main export
│
├── tier-3-ai/                  # AI Orchestration
│   ├── tools/
│   │   ├── discover-components.ts
│   │   ├── compose-page.ts
│   │   ├── generate-component.ts
│   │   └── validate-composition.ts
│   ├── registry/
│   ├── composer/
│   ├── generator/
│   └── index.ts
│
├── config/                     # Configuration
│   ├── vite.config.ts
│   ├── postcss.config.js
│   └── tsconfig.json
│
└── index.ts                    # Main entry point
```

### File Naming

- **Classes**: PascalCase (`ComponentLoader.ts`, `PageComposer.ts`)
- **Functions**: camelCase (`discoverComponents.ts`, `validateProps.ts`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT`, `MAX_RETRIES`)
- **CSS files**: kebab-case (`button.css`, `feature-grid.css`)
- **HTML templates**: kebab-case (`button.html`, `hero-section.html`)
- **Schema files**: kebab-case + `.schema.json` (`button.schema.json`)

### Module Structure

Each module should have:
- **Clear public API** via `index.ts` or `__init__.py`
- **README.md** explaining purpose and usage
- **Self-contained logic** (no reaching across tier boundaries without going through interfaces)

---

## TypeScript/JavaScript Standards

### 1. Type Safety

Use TypeScript throughout. Be explicit with types.

✅ **Good**:
```typescript
interface ComponentSpec {
  id: string;
  category: 'atom' | 'molecule' | 'organism';
  props: Record<string, PropertySchema>;
  variants: string[];
}

async function loadComponent(id: string): Promise<Component> {
  const spec = await registry.getComponent(id);
  if (!spec) throw new ComponentNotFoundError(id);
  return new Component(spec);
}
```

❌ **Bad**:
```typescript
async function loadComponent(id) {
  const spec = registry.getComponent(id);
  return new Component(spec);
}
```

### 2. Function Design

Follow these rules:

**Single Responsibility**: One function = one thing
```typescript
// ✅ Good: Single responsibility
async function validateComponentProps(componentId: string, props: unknown): ValidationResult {
  const schema = await registry.getComponentSchema(componentId);
  return validator.validate(props, schema);
}

// ❌ Bad: Multiple responsibilities
async function validateAndCompose(componentId: string, props: unknown, page: Page) {
  const schema = await registry.getComponentSchema(componentId);
  const validation = validator.validate(props, schema);
  if (!validation.valid) return null;
  const component = await registry.loadComponent(componentId);
  page.addComponent(component); // Too much!
  return component;
}
```

**Clear Input/Output Contracts**:
```typescript
/**
 * Discover components matching user intent via semantic search.
 *
 * @param query - Natural language search query (e.g., "hero section", "pricing table")
 * @param limit - Maximum results to return (default: 5, max: 20)
 * @returns Array of components sorted by relevance
 * @throws RegistryError if component registry is not loaded
 */
async function discoverComponents(
  query: string,
  limit: number = 5
): Promise<ComponentMetadata[]> {
  // implementation
}
```

### 3. Error Handling

Create specific error types. Include actionable context.

```typescript
class CompositionError extends Error {
  constructor(
    public readonly componentId: string,
    public readonly errors: string[],
    message?: string
  ) {
    super(
      message ||
      `Failed to compose ${componentId}: ${errors.join(', ')}. ` +
      `Use discover-components("${componentId}") to see valid props.`
    );
  }
}

// Usage
try {
  await composer.composePageSection(componentId, invalidProps);
} catch (error) {
  if (error instanceof CompositionError) {
    console.error(`Component ${error.componentId} failed: ${error.errors.join(', ')}`);
    // Agent can understand and potentially retry with corrected props
  }
}
```

### 4. Configuration & Constants

Define configuration at the top level of modules.

```typescript
// Good: Clear configuration
const CONFIG = {
  COMPONENT_REGISTRY_PATH: 'components/_registry/components.json',
  MAX_COMPONENT_DISCOVERY_RESULTS: 20,
  DEFAULT_DISCOVERY_LIMIT: 5,
  COMPOSITION_TIMEOUT_MS: 5000,
  BUILD_TIMEOUT_MS: 30000,
} as const;

// Later: Use CONFIG values
const results = await discovery.search(query, CONFIG.DEFAULT_DISCOVERY_LIMIT);
```

### 5. Async/Await

Always use async/await over promises for clarity.

```typescript
// ✅ Good: Clear execution flow
async function buildSite(): Promise<void> {
  const pages = await discoverPages();
  for (const page of pages) {
    await buildPage(page);
  }
  await optimizeAssets();
}

// ❌ Bad: Promise chains are harder to follow
function buildSite() {
  return discoverPages()
    .then(pages => Promise.all(pages.map(buildPage)))
    .then(() => optimizeAssets());
}
```

---

## CSS Standards

### 1. Architecture: Cascade Layers

Organize CSS into layers per Phase 1 spec.

```css
/* Define layers at top of main CSS file */
@layer reset, base, components, utilities, overrides;

/* Reset layer: minimal sensible defaults */
@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

/* Base layer: semantic element styling */
@layer base {
  h1 { font-size: var(--font-size-xl); font-weight: 700; }
  a { color: var(--color-primary); text-decoration: underline; }
}

/* Components layer: component-specific styles */
@layer components {
  .button { /* ... */ }
  .card { /* ... */ }
}

/* Utilities layer: quick layout helpers */
@layer utilities {
  .text-center { text-align: center; }
  .mb-4 { margin-bottom: var(--space-4); }
}

/* Overrides layer: user/site-specific overrides */
@layer overrides {
  /* Site customizations go here */
}
```

### 2. Design Tokens

All design decisions via CSS custom properties.

```css
:root {
  /* Color tokens */
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --color-surface: #ffffff;
  --color-text-primary: #1f2937;
  --color-text-muted: #6b7280;

  /* Spacing tokens (8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */

  /* Typography tokens */
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;

  /* Shadow tokens */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Timing tokens */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
}

/* Dark mode variants */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #1f2937;
    --color-text-primary: #f3f4f6;
    --color-text-muted: #9ca3af;
  }
}
```

### 3. Component CSS Structure

BEM naming convention. Each component gets one `.css` file.

```css
@layer components.button {
  /* 1. API (Custom properties defining this component's design) */
  .button {
    --button-bg: var(--color-primary);
    --button-color: white;
    --button-padding: var(--space-2) var(--space-4);
    --button-border-radius: 0.375rem;

    /* 2. Reset */
    margin: 0;

    /* 3. Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);

    /* 4. Visual */
    background: var(--button-bg);
    color: var(--button-color);
    padding: var(--button-padding);
    border: none;
    border-radius: var(--button-border-radius);
    font-size: var(--font-size-md);
    font-weight: 600;
    cursor: pointer;
    transition: opacity var(--transition-fast);

    /* 5. States */
    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* 6. Variants */
    &--secondary {
      --button-bg: var(--color-secondary);
    }

    &--ghost {
      --button-bg: transparent;
      --button-color: var(--color-primary);
      border: 1px solid currentColor;
    }

    &--lg {
      --button-padding: var(--space-3) var(--space-6);
      font-size: var(--font-size-lg);
    }
  }

  /* Child elements */
  .button__icon {
    width: 1.25em;
    height: 1.25em;
  }
}
```

### 4. Responsive Design

Mobile-first. Use container queries for responsive components, media queries for page-level changes.

```css
/* Mobile first: default styles are for small screens */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Tablet and up */
@media (min-width: 640px) {
  .card {
    flex-direction: row;
    gap: var(--space-4);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    gap: var(--space-6);
  }
}

/* Container query: responsive to available space, not viewport */
.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    padding: var(--space-4);
  }
}

@container (min-width: 500px) {
  .card {
    padding: var(--space-6);
  }
}
```

### 5. Dark Mode

Use CSS custom properties + media queries.

```css
/* Light mode (default) */
.component {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .component {
    background: var(--color-surface);  /* Updated in :root above */
    color: var(--color-text-primary); /* Updated in :root above */
  }
}
```

---

## HTML Standards

### 1. Semantic HTML

Use semantic elements. Structure reveals meaning.

```html
<!-- ✅ Good: Semantic structure -->
<article class="card">
  <header class="card__header">
    <h2 class="card__title">Feature Title</h2>
    <p class="card__subtitle">Feature description</p>
  </header>
  <main class="card__content">
    <p>Card content goes here</p>
  </main>
  <footer class="card__footer">
    <button class="button button--primary">Learn More</button>
  </footer>
</article>

<!-- ❌ Bad: Divs everywhere, no semantic meaning -->
<div class="card">
  <div class="card-header">
    <div class="card-title">Feature Title</div>
    <div class="card-subtitle">Feature description</div>
  </div>
  <div class="card-content">Content</div>
</div>
```

### 2. Accessibility First

```html
<!-- Images -->
<img src="/hero.jpg" alt="Team collaborating on project">  <!-- Descriptive alt text -->

<!-- Links -->
<a href="/about">Read our story</a>  <!-- Link text is descriptive, not "click here" -->

<!-- Forms (when needed) -->
<label for="email">Email address</label>
<input id="email" type="email" required aria-required="true">

<!-- Headings follow hierarchy -->
<h1>Main page title</h1>      <!-- One H1 per page -->
<h2>Section heading</h2>
<h3>Subsection</h3>

<!-- Color is never the only indicator -->
<button aria-invalid="true" class="has-error">
  <!-- Visual error indicator + ARIA attribute -->
  Error: Email is invalid
</button>
```

### 3. Progressive Enhancement

Markup works without CSS or JavaScript.

```html
<!-- Good: Core functionality works without CSS/JS -->
<button class="button button--primary">Subscribe</button>

<!-- Avoid: Relies on CSS/JS -->
<div onclick="handleClick()" class="fake-button">Subscribe</div>
```

---

## Documentation Standards

### 1. File Headers

Every significant file starts with a clear header.

```typescript
/**
 * Component Registry: Discovery and metadata management.
 *
 * This module provides the searchable index of all available components
 * (atoms, molecules, organisms) and enables semantic discovery by AI agents
 * and developers.
 *
 * @module tier-3-ai/registry
 * @see Phase 5: Component Registry for specification details
 */

import { ComponentIndex } from './component-index';
import { SchemaValidator } from './schema-validator';

export class ComponentRegistry {
  // ...
}
```

### 2. Code Comments: Why, Not What

```typescript
// ❌ Bad: Explains what the code does (obvious from reading it)
// Get the component ID from the request
const componentId = request.params.componentId;

// ✅ Good: Explains why we're doing this
// Extract component ID early to enable audit logging even if later validation fails
// (per Phase 6 spec: AI agents should see clear error messages)
const componentId = request.params.componentId;
```

### 3. README Files

Each module's `README.md`:

```markdown
# Module: Component Loader

## Purpose
Dynamically load component templates, styles, and metadata from the file system.

## Architecture
<architecture>
This module handles:
1. Template loading from .html files
2. CSS loading from .css files
3. Schema loading from .schema.json files
4. Caching to avoid repeated filesystem access
</architecture>

## Usage
<examples>
```typescript
const loader = new ComponentLoader('./components');
const button = await loader.loadComponent('atoms/button');
```
</examples>

## Integration
- **Inputs**: Component IDs from registry
- **Outputs**: Component objects with template, styles, schema
- **Error handling**: ComponentLoadError for missing/invalid components

## Performance Notes
- Caches loaded components in memory
- Consider clearing cache between builds in development
- Filesystem I/O is blocking; use async/await throughout
```

### 4. Storybook Stories as Documentation

Stories are executable examples.

```typescript
// components/atoms/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Atoms/Button',
  parameters: {
    docs: {
      description: {
        component: 'Interactive button for calls-to-action and user actions.'
      }
    }
  }
};

export default meta;

/**
 * Primary button for the most important action on a page.
 * Use for main calls-to-action and critical user interactions.
 */
export const Primary: StoryObj = {
  args: { text: 'Click Me', variant: 'primary' },
  render: (args) => `<button class="button button--${args.variant}">${args.text}</button>`
};

/**
 * Ghost button for secondary or nested actions.
 * Use when you want the button to be less prominent.
 */
export const Ghost: StoryObj = {
  args: { ...Primary.args, variant: 'ghost' }
};
```

---

## Architecture Patterns

### 1. Tier Separation

Keep tiers isolated. Communication through defined interfaces.

```typescript
// ❌ Bad: Tier 2 directly accessing Tier 1
import { getComponent } from '../tier-1-components/registry';

class Builder {
  buildPage() {
    const button = getComponent('atoms/button'); // Direct access!
  }
}

// ✅ Good: Communication via interface
interface ComponentProvider {
  getComponent(id: string): Promise<Component>;
}

class Builder {
  constructor(private componentProvider: ComponentProvider) {}

  buildPage() {
    const button = await this.componentProvider.getComponent('atoms/button');
  }
}
```

### 2. Configuration Over Hard-Coding

```typescript
// ❌ Bad: Hard-coded values
class Builder {
  async build() {
    const timeout = 30000; // Magic number!
    const maxComponents = 100; // Where does this come from?
    // ...
  }
}

// ✅ Good: Configuration via constructor/file
const BUILD_CONFIG = {
  BUILD_TIMEOUT_MS: 30000,
  MAX_COMPONENTS_PER_PAGE: 100,
  RETRY_ATTEMPTS: 3,
} as const;

class Builder {
  async build() {
    const timeout = BUILD_CONFIG.BUILD_TIMEOUT_MS;
    // Clear where this value comes from
  }
}
```

### 3. Validation at Boundaries

Validate inputs at tier boundaries.

```typescript
// Tier 3 (AI) to Tier 2 (Core) boundary
async function composePage(input: unknown): Promise<Page> {
  // Validate at the boundary!
  const validated = await validatePageComposition(input);
  if (!validated.valid) {
    throw new ValidationError(validated.errors);
  }

  // Now we can trust the input
  const page = await this.core.buildPage(validated.data);
  return page;
}
```

---

## Testing Standards

### 1. Test Structure

Unit tests follow the pattern: Arrange, Act, Assert.

```typescript
describe('ComponentRegistry', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    // Arrange: Set up test fixtures
    registry = new ComponentRegistry(testRegistryPath);
  });

  it('should find component by keyword', async () => {
    // Act: Execute the behavior
    const results = await registry.search('hero');

    // Assert: Verify the outcome
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('organisms/hero');
  });

  it('should return empty array for no matches', async () => {
    const results = await registry.search('nonexistent-component');
    expect(results).toHaveLength(0);
  });
});
```

### 2. Test Names Explain the Behavior

```typescript
// ✅ Good: Clear behavior description
it('should reject component props with missing required fields', () => {
  const result = validator.validate({ name: 'Button' }, buttonSchema);
  expect(result.valid).toBe(false);
  expect(result.errors).toContain('Missing required field: variant');
});

// ❌ Bad: Unclear what's being tested
it('should validate', () => {
  expect(validator.validate({}, schema)).toBe(false);
});
```

### 3. Test Coverage Targets

- Unit tests: 80%+ coverage
- Critical paths: 100%
- Error cases: Always tested
- Integration points: Always tested

---

## AI-Agent-Friendly Patterns

### 1. Clear Phase References

When code implements a phase requirement, reference it.

```typescript
/**
 * Discover components via semantic search.
 *
 * Implements Phase 5: Component Registry discovery API.
 * Agents use this to find components by keyword, category, or functionality.
 *
 * @see Phase 5: Component Registry specification
 */
async function discoverComponents(query: string): Promise<ComponentMetadata[]> {
  // implementation
}
```

### 2. Structured Error Messages

Errors should guide agents toward solutions.

```typescript
class ComponentNotFoundError extends Error {
  constructor(componentId: string, availableIds: string[]) {
    const similar = findSimilarIds(componentId, availableIds);
    super(
      `Component not found: ${componentId}. ` +
      `Did you mean: ${similar.join(', ')}? ` +
      `Use discover-components() to find available components.`
    );
  }
}
```

### 3. Schema-First Design

Define data shapes first, code follows.

```typescript
// Define the shape
interface ComponentSchema {
  id: string;
  name: string;
  category: 'atom' | 'molecule' | 'organism';
  props: Record<string, PropertySchema>;
  examples: Array<{ title: string; props: unknown }>;
}

// Then implement against that shape
class ComponentLoader {
  async loadComponent(spec: ComponentSchema): Promise<Component> {
    // Implementation uses the schema to guide behavior
  }
}

// Agents can understand the shape without reading implementation
```

### 4. Workflow Documentation

Document the typical AI agent workflow.

```typescript
/**
 * Page Composition Workflow:
 *
 * 1. Agent receives user intent: "Build a landing page"
 * 2. Agent calls discover-components() for each section
 *    - discover-components("hero") -> organisms/hero
 *    - discover-components("pricing") -> organisms/pricing-table
 * 3. Agent calls compose-page() with selected components
 * 4. compose-page() validates composition
 * 5. If valid: returns page composition
 *    If invalid: returns error with guidance for retry
 *
 * @see Phase 6: AI Integration for complete workflow
 */
```

---

## Enforcement

### Code Review Checklist

When reviewing code, check:

- [ ] **Single Responsibility**: Does each function/module do one thing?
- [ ] **Clear Names**: Would someone understand this code in 30 seconds?
- [ ] **Self-Documenting**: Does structure explain intent?
- [ ] **AI-Friendly**: Could an AI agent understand this code?
- [ ] **No Magic Numbers**: Are all constants defined?
- [ ] **Error Handling**: Are errors clear and actionable?
- [ ] **Tests**: Are critical paths tested?
- [ ] **Documentation**: Is "why" explained?

### File Checklist

When creating a new file, ensure:

- [ ] File header explaining purpose
- [ ] Clear module exports via `index.ts`
- [ ] Type definitions (TypeScript)
- [ ] Error classes if needed
- [ ] README if it's a significant module
- [ ] Tests for critical functionality
- [ ] Comments explaining "why" decisions

---

## Examples

### Complete Module Example

```typescript
/**
 * Component Index: Searchable registry of all available components.
 *
 * This module provides fast, semantic search over the component library,
 * enabling AI agents to discover components by keyword, category, or intent.
 *
 * @module tier-3-ai/registry/component-index
 * @see Phase 5: Component Registry specification
 */

import fs from 'fs/promises';

// ============================================================================
// TYPES
// ============================================================================

interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: 'atom' | 'molecule' | 'organism' | 'template';
  keywords: string[];
  examples: number;
}

interface ComponentRegistry {
  components: ComponentMetadata[];
  index: {
    byCategory: Record<string, string[]>;
    byKeyword: Record<string, string[]>;
  };
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  DEFAULT_SEARCH_LIMIT: 5,
  MAX_SEARCH_LIMIT: 20,
  REGISTRY_PATH: 'components/_registry/components.json',
} as const;

// ============================================================================
// COMPONENT INDEX
// ============================================================================

export class ComponentIndex {
  private registry: ComponentRegistry | null = null;

  /**
   * Load component registry from disk.
   *
   * Called once at startup. Caches registry in memory for fast searches.
   *
   * @throws RegistryLoadError if registry file not found or invalid JSON
   */
  async initialize(registryPath = CONFIG.REGISTRY_PATH): Promise<void> {
    try {
      const content = await fs.readFile(registryPath, 'utf-8');
      this.registry = JSON.parse(content);
    } catch (error) {
      throw new RegistryLoadError(registryPath, error);
    }
  }

  /**
   * Search components by semantic intent.
   *
   * Searches component names, descriptions, and keywords for matches
   * to user intent. Results sorted by relevance.
   *
   * Example:
   * ```typescript
   * // Agent searching for testimonial component
   * const results = await index.search('customer testimonials', 5);
   * // Returns: [organisms/testimonial-carousel]
   * ```
   *
   * @param query - Natural language search term
   * @param limit - Max results (default: 5, max: 20)
   * @returns Components matching query, sorted by relevance
   * @throws NotInitializedError if initialize() not called first
   */
  async search(query: string, limit = CONFIG.DEFAULT_SEARCH_LIMIT): Promise<ComponentMetadata[]> {
    this.ensureInitialized();

    const queryLower = query.toLowerCase();
    const limit_clamped = Math.min(limit, CONFIG.MAX_SEARCH_LIMIT);

    // Search against name, description, and keywords
    const scored = this.registry!.components.map(comp => ({
      component: comp,
      score: this.calculateSearchScore(comp, queryLower),
    }));

    // Filter and sort by relevance
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit_clamped)
      .map(item => item.component);
  }

  /**
   * Get component by exact ID.
   *
   * @param id - Component ID (e.g., "organisms/hero")
   * @returns Component metadata or null if not found
   */
  getComponent(id: string): ComponentMetadata | null {
    this.ensureInitialized();
    return this.registry!.components.find(c => c.id === id) || null;
  }

  // ========================================================================
  // PRIVATE HELPERS
  // ========================================================================

  private calculateSearchScore(component: ComponentMetadata, query: string): number {
    let score = 0;

    // Exact name match: highest priority
    if (component.name.toLowerCase() === query) score += 100;
    // Partial name match
    else if (component.name.toLowerCase().includes(query)) score += 50;

    // Keyword match
    if (component.keywords.some(k => k.includes(query))) score += 30;

    // Description match
    if (component.description.toLowerCase().includes(query)) score += 10;

    return score;
  }

  private ensureInitialized(): void {
    if (!this.registry) {
      throw new NotInitializedError(
        'ComponentIndex not initialized. Call initialize() first.'
      );
    }
  }
}

// ============================================================================
// ERRORS
// ============================================================================

class RegistryLoadError extends Error {
  constructor(path: string, cause: unknown) {
    super(`Failed to load component registry from ${path}: ${cause}`);
    this.name = 'RegistryLoadError';
  }
}

class NotInitializedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotInitializedError';
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export { ComponentMetadata, ComponentRegistry };
```

---

## AgentStatic-Specific Patterns

AgentStatic has unique requirements across its three tiers. Follow these patterns for core domain logic.

### 1. JSON Composition Pattern (PHASE-00, PHASE-06)

Page compositions are validated JSON structures. Validate at boundaries.

```typescript
/**
 * Page composition schema (from Phase 0).
 *
 * All pages are defined as JSON with structured sections,
 * each referencing a component with props. Validates before building.
 */
interface PageComposition {
  path: string;
  title: string;
  metadata?: {
    description?: string;
    canonical?: string;
  };
  sections: PageSection[];
}

interface PageSection {
  component: string;  // e.g., "organisms/hero-section"
  variant?: string;   // optional variant selection
  props: Record<string, unknown>;
}

/**
 * Validate page composition structure.
 *
 * Called at Tier 3 (AI) to Tier 2 (Core) boundary to catch
 * malformed compositions before building. Provides clear errors
 * for AI agents to understand and retry.
 *
 * @see Phase 0: Page Composition Format specification
 */
async function validatePageComposition(
  input: unknown
): Promise<{ valid: boolean; errors: string[]; data?: PageComposition }> {
  // Validate input matches PageComposition shape
  if (!isObject(input)) {
    return { valid: false, errors: ['Page composition must be an object'] };
  }

  const errors: string[] = [];

  if (!isString(input.path)) {
    errors.push('Missing required field: path (string)');
  }
  if (!isString(input.title)) {
    errors.push('Missing required field: title (string)');
  }
  if (!isArray(input.sections)) {
    errors.push('Missing required field: sections (array)');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Validate each section
  for (let i = 0; i < input.sections.length; i++) {
    const section = input.sections[i];
    if (!isString(section.component)) {
      errors.push(`Section ${i}: missing required field component (string)`);
    }
    if (!isObject(section.props)) {
      errors.push(`Section ${i}: missing required field props (object)`);
    }
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, data: input as PageComposition };
}
```

### 2. Component Registry & Schema Pattern (PHASE-05)

Components are self-describing via JSON Schema. Registry enables discovery.

```typescript
/**
 * Component metadata schema.
 *
 * Every component (atom, molecule, organism) is registered with
 * complete metadata for discovery, validation, and composition.
 *
 * @see Phase 5: Component Registry specification
 */
interface ComponentMetadata {
  id: string;  // e.g., "atoms/button", "organisms/hero-section"
  name: string;
  description: string;
  category: 'atom' | 'molecule' | 'organism';

  // JSON Schema for validating component props
  schema: {
    type: 'object';
    properties: Record<string, PropertySchema>;
    required?: string[];
  };

  // For AI discovery
  keywords: string[];
  examples: Array<{
    title: string;
    description?: string;
    props: Record<string, unknown>;
  }>;

  // Metadata for composition
  accessibility: {
    wcag: 'A' | 'AA' | 'AAA';
    keyboard: boolean;
    screenReader: boolean;
  };

  responsive: {
    mobileFirst: boolean;
    breakpoints: string;  // e.g., "all"
  };

  darkMode: {
    supported: boolean;
    approach: string;  // e.g., "CSS variables"
  };
}

/**
 * Load and validate component schema from registry.
 *
 * Used by AI tools to understand component requirements and
 * by validators to check composition props. Single source of truth
 * for component specifications.
 */
async function loadComponentSchema(componentId: string): Promise<ComponentMetadata> {
  const metadata = await registry.getComponent(componentId);

  if (!metadata) {
    throw new ComponentNotFoundError(
      `Component '${componentId}' not found in registry. ` +
      `Use discover-components() to find available components.`
    );
  }

  return metadata;
}

/**
 * Validate props against component schema.
 *
 * Called before composing a component into a page. Returns detailed
 * errors for AI agents to understand what went wrong and how to fix it.
 */
function validateComponentProps(
  componentId: string,
  props: unknown,
  schema: ComponentMetadata['schema']
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isObject(props)) {
    return { valid: false, errors: [`Props must be an object, got ${typeof props}`] };
  }

  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in props)) {
        errors.push(`Missing required property: ${field}`);
      }
    }
  }

  // Validate property types
  for (const [key, value] of Object.entries(props)) {
    const propSchema = schema.properties[key];

    if (!propSchema) {
      errors.push(`Unknown property: ${key}`);
      continue;
    }

    const expectedType = propSchema.type;
    const actualType = typeof value;

    if (actualType !== expectedType) {
      errors.push(
        `Property '${key}' should be ${expectedType}, got ${actualType}`
      );
    }
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, errors: [] };
}
```

### 3. MCP Tool Implementation Pattern (PHASE-06)

The 5 MCP tools follow a consistent input/output pattern.

```typescript
/**
 * MCP Tool: discover_components
 *
 * Implements Phase 6: AI Integration / Tool 1.
 * Called by Claude to find components matching user intent.
 *
 * @see Phase 6: Tool 1: discover_components specification
 */
interface DiscoverComponentsInput {
  query: string;  // e.g., "hero section with background image"
  category?: 'atom' | 'molecule' | 'organism';
  minAccessibility?: 'wcag-a' | 'wcag-aa';
  limit?: number;  // default 5, max 20
}

interface DiscoverComponentsOutput {
  matches: Array<{
    id: string;
    name: string;
    relevance: number;  // 0-1 score
    reason: string;  // Why this matches
  }>;
  suggestions: Array<{
    id: string;
    reason: string;
  }>;
}

/**
 * Discovery tool for component selection.
 *
 * Returns not just matches but suggestions (per Decision #16).
 * Provides reasoning for AI to understand why components were selected.
 */
async function discoverComponents(input: DiscoverComponentsInput): Promise<DiscoverComponentsOutput> {
  // Validate input
  if (!input.query || input.query.trim().length === 0) {
    throw new ValidationError('query is required and cannot be empty');
  }

  if (input.limit && (input.limit < 1 || input.limit > 20)) {
    throw new ValidationError('limit must be between 1 and 20');
  }

  // Search registry
  const results = await registry.search(
    input.query,
    input.category,
    input.limit || 5
  );

  // Format results with reasoning
  const matches = results.map(component => ({
    id: component.id,
    name: component.name,
    relevance: calculateRelevance(input.query, component),
    reason: explainMatch(input.query, component),
  }));

  // Find related/alternative components (suggestions)
  const suggestions = results
    .slice(0, 2)  // Top 2 matches
    .flatMap(comp => registry.getRelated(comp.id))
    .slice(0, 3);

  return {
    matches: matches.slice(0, input.limit || 5),
    suggestions: suggestions.map(comp => ({
      id: comp.id,
      reason: `Related to selected components`,
    })),
  };
}

/**
 * MCP Tool: compose_page
 *
 * Implements Phase 6: AI Integration / Tool 3.
 * Called by Claude to assemble page from components.
 *
 * @see Phase 6: Tool 3: compose_page specification
 */
interface ComposePageInput {
  title: string;
  metadata?: { description?: string; canonical?: string };
  sections: Array<{
    component: string;
    variant?: string;
    props: Record<string, unknown>;
  }>;
}

interface ComposePageOutput {
  valid: boolean;
  page?: PageComposition;
  validations: Array<{ section: number; valid: boolean; message: string }>;
  warnings: string[];
}

/**
 * Composition tool for page building.
 *
 * Validates entire page composition before suggesting to user.
 * Returns detailed validation results for each section.
 */
async function composePage(input: ComposePageInput): Promise<ComposePageOutput> {
  // Validate input structure
  const structureValidation = validatePageComposition(input);
  if (!structureValidation.valid) {
    return {
      valid: false,
      validations: [],
      warnings: structureValidation.errors,
    };
  }

  const validations: typeof ComposePageOutput.prototype.validations = [];
  const warnings: string[] = [];

  // Validate each section's props
  for (let i = 0; i < input.sections.length; i++) {
    const section = input.sections[i];
    const metadata = await loadComponentSchema(section.component);
    const propsValidation = validateComponentProps(
      section.component,
      section.props,
      metadata.schema
    );

    validations.push({
      section: i,
      valid: propsValidation.valid,
      message: propsValidation.valid
        ? 'All props valid'
        : propsValidation.errors.join('; '),
    });

    if (!propsValidation.valid) {
      warnings.push(`Section ${i} (${section.component}): ${propsValidation.errors.join(', ')}`);
    }
  }

  const isValid = validations.every(v => v.valid);

  return {
    valid: isValid,
    page: isValid ? (input as PageComposition) : undefined,
    validations,
    warnings,
  };
}
```

### 4. Component Discovery & Semantic Search (PHASE-05)

Registry provides semantic search for AI agents.

```typescript
/**
 * Semantic component search.
 *
 * Searches component names, descriptions, and keywords using relevance scoring.
 * Returns ranked results ordered by relevance to query.
 *
 * @see Phase 5: Discovery API specification
 */
class ComponentDiscovery {
  /**
   * Search components by semantic intent.
   *
   * Example queries:
   * - "hero section with background"
   * - "pricing table"
   * - "testimonial carousel"
   * - "team members"
   *
   * @returns Components ranked by relevance (highest first)
   */
  async search(
    query: string,
    category?: 'atom' | 'molecule' | 'organism',
    limit: number = 5
  ): Promise<ComponentMetadata[]> {
    const queryTerms = query.toLowerCase().split(/\s+/);

    // Score all components
    const scored = this.registry.components
      .filter(comp => !category || comp.category === category)
      .map(comp => ({
        component: comp,
        score: this.calculateScore(comp, queryTerms),
      }));

    // Return top results sorted by score
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(limit, 20))
      .map(item => item.component);
  }

  private calculateScore(component: ComponentMetadata, queryTerms: string[]): number {
    let score = 0;

    for (const term of queryTerms) {
      // Exact name match: highest priority
      if (component.name.toLowerCase() === term) score += 100;
      // Partial name match
      else if (component.name.toLowerCase().includes(term)) score += 50;

      // Keyword match
      if (component.keywords.some(k => k.includes(term))) score += 30;

      // Description match
      if (component.description.toLowerCase().includes(term)) score += 10;
    }

    return score;
  }
}
```

---

## 17 Decisions in Code

The 17 refined decisions from the planning documents should be reflected in code choices. Reference them explicitly.

### Decision #1: Brochureware-First
```typescript
/**
 * AgentStatic is designed for brochureware marketing sites:
 * - Landing pages
 * - Portfolios and case studies
 * - Content showcases
 * - Static blog sites
 *
 * NOT for: web apps, dashboards, real-time features, complex interactions.
 * See Decision #1 in PLANNING/README.md
 */
const SUPPORTED_USE_CASES = [
  'landing-pages',
  'portfolios',
  'content-sites',
  'static-blogs',
];

const UNSUPPORTED_USE_CASES = [
  'web-apps',
  'dashboards',
  'real-time-features',
  'complex-interactions',
  'form-processing',
  'user-authentication',
];
```

### Decision #2: 20-30 Components
```typescript
/**
 * Component count targets (Decision #2).
 *
 * Focused, curated set rather than exhaustive component library.
 * See PLANNING/README.md and PHASE-02/03 for exact components.
 */
const COMPONENT_TARGETS = {
  atoms: 6,           // button, heading, text, icon, badge, divider
  molecules: '5-7',   // card, CTA, image+text, feature list, testimonial, link, breadcrumb
  organisms: '8-10',  // hero, header, features, comparison, gallery, timeline, carousel, team, social-proof, CTA
  total: '20-30',
};
```

### Decision #4: Claude-Optimized MCP
```typescript
/**
 * The 5 MCP tools are Claude-optimized (Decision #4), not generic.
 *
 * Each tool is designed specifically for AI agent workflows:
 * 1. discover_components - Find by description
 * 2. get_component_details - Understand options
 * 3. compose_page - Build pages
 * 4. validate_composition - Check validity
 * 5. suggest_next_components - Get recommendations
 *
 * See Phase 6: AI Integration specification
 */
const MCP_TOOLS: Array<{
  name: string;
  purpose: string;
  claudeOptimized: boolean;
}> = [
  {
    name: 'discover_components',
    purpose: 'Find components matching user intent via semantic search',
    claudeOptimized: true,
  },
  // ... etc
];
```

### Decision #7: Dark Mode (System + Manual Toggle)
```typescript
/**
 * Dark mode implementation (Decision #7).
 *
 * Supports both:
 * 1. System preference (prefers-color-scheme media query)
 * 2. Manual toggle (localStorage)
 *
 * CSS variables update automatically for both cases.
 */
const initializeDarkMode = () => {
  // Check localStorage first (manual toggle takes precedence)
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.documentElement.classList.toggle('dark', isDark);
};
```

### Decision #11: JSON Compositions
```typescript
/**
 * Pages are defined as JSON compositions (Decision #11).
 *
 * Structured, validated format enables:
 * - AI agents to compose pages programmatically
 * - Validation before building
 * - Clear error messages
 *
 * See Phase 0: Page Composition Format specification
 */
interface PageComposition {
  path: string;
  title: string;
  sections: PageSection[];
  // ... (as shown in Pattern #1 above)
}
```

### Decision #15: Storybook 80/20
```typescript
/**
 * Storybook uses 80/20 approach (Decision #15).
 *
 * Focus on: Visual clarity + code snippets
 * NOT: Exhaustive auto-generated documentation
 *
 * Each story shows:
 * - Visual preview
 * - Interactive controls
 * - HTML code snippet
 * - Accessibility audit results
 *
 * See Phase 7: Storybook 80/20 Approach
 */
const STORYBOOK_PHILOSOPHY = {
  included: [
    'visual-preview',
    'interactive-controls',
    'html-code-snippet',
    'accessibility-audit',
    'responsive-preview',
  ],
  excluded: [
    'exhaustive-prop-docs',  // Use schema.json instead
    'api-reference',         // Use schema.json instead
    'auto-generated-content',
  ],
};
```

---

## Performance & Bundle Consciousness

AgentStatic has strict bundle size targets. Code decisions must consider performance.

### CSS Bundle Targets (Per Phase)

```typescript
/**
 * CSS bundle size targets (Decision #14: 12-14 week timeline).
 *
 * Aggressive performance goals drive architectural choices:
 * - No CSS frameworks (write minimal CSS)
 * - No JavaScript required for layout
 * - Design tokens enable consistency without duplication
 * - CSS layers prevent specificity wars
 *
 * @see Phase 4 for CSS optimization techniques
 */
const BUNDLE_TARGETS = {
  phase1: '< 5KB',      // Tokens + reset + base
  phase2: '< 20KB',     // + atoms & molecules
  phase3: '< 40KB',     // + organisms
  phase4Final: '< 42KB', // gzipped, ~120KB uncompressed
};

/**
 * Monitor bundle size at build time.
 *
 * Warn if approaching limits, but don't block build.
 * Decision #13: Bundle Warnings (Not Blocking).
 */
const BUNDLE_WARNING_THRESHOLD = 0.9; // 90% of target

async function checkBundleSize(cssPath: string): Promise<void> {
  const sizeBytes = fs.statSync(cssPath).size;
  const sizeKB = sizeBytes / 1024;

  console.log(`📦 CSS Bundle: ${sizeKB.toFixed(2)}KB`);

  if (sizeKB > BUNDLE_TARGETS.phase4Final * BUNDLE_WARNING_THRESHOLD) {
    console.warn(`⚠️  Bundle approaching limit. Consider optimization.`);
    // Don't throw - Decision #13 says warnings don't block builds
  }
}
```

### CSS Writing Principles

```typescript
/**
 * CSS writing for optimal bundle size:
 *
 * 1. Use design tokens everywhere (no hardcoded values)
 * 2. Use cascade layers for organization (not deep nesting)
 * 3. Use CSS variables for theming (not separate stylesheets)
 * 4. Avoid CSS frameworks entirely
 * 5. Use modern CSS features (grid, flexbox, container queries)
 * 6. Respect prefers-reduced-motion for animations
 *
 * Example: Don't do this
 * ❌ .button { background: #3b82f6; padding: 8px 16px; border-radius: 4px; }
 * ❌ .button-lg { padding: 12px 24px; }
 * ❌ @media (prefers-color-scheme: dark) { .button { background: #1e3a8a; } }
 *
 * Do this instead
 * ✅ .button { background: var(--color-primary); padding: var(--button-padding); }
 * ✅ .button--lg { --button-padding: var(--space-3) var(--space-6); }
 * ✅ Variables automatically update in dark mode
 */

// Measure component CSS size
async function measureComponentCSSSize(componentPath: string): Promise<number> {
  const cssFile = path.join(componentPath, `${path.basename(componentPath)}.css`);
  return (await fs.promises.stat(cssFile)).size;
}

// Track per-component sizes
const componentSizes = new Map<string, number>();

async function auditComponentSizes(): Promise<void> {
  const atoms = await glob('src/tier-1-components/atoms/*/');
  const molecules = await glob('src/tier-1-components/molecules/*/');
  const organisms = await glob('src/tier-1-components/organisms/*/');

  for (const component of [...atoms, ...molecules, ...organisms]) {
    const size = await measureComponentCSSSize(component);
    componentSizes.set(component, size);

    if (size > 5000) {  // 5KB per component is large
      console.warn(`⚠️  ${component} CSS is ${(size / 1024).toFixed(2)}KB`);
    }
  }
}
```

---

## Build System Integration

AgentStatic has a unique build system (Phase 0). Code must integrate with it.

### Static Routing & Page Generation

```typescript
/**
 * Static routing (Decision #8): All pages pre-built at compile time.
 *
 * No dynamic routes. Every page composition in site/pages/*.json
 * generates a corresponding HTML file in dist/*.html
 *
 * @see Phase 0: Static Routing System specification
 */

interface BuildConfig {
  // Input: where to find page compositions
  pagesDir: 'site/pages';

  // Input: where to find component files
  componentsDir: 'src/tier-1-components';

  // Output: where to write built HTML
  outDir: 'dist';

  // Whether to minify output
  minify: boolean;

  // Build timeout
  timeoutMs: 30000;
}

/**
 * Build pipeline (Phase 0):
 *
 * 1. Discover all page compositions in site/pages/
 * 2. For each page.json:
 *    a. Validate composition against schemas
 *    b. Load component templates
 *    c. Inject component content into layout
 *    d. Generate final HTML
 *    e. Write to dist/{path}/index.html
 * 3. Copy assets to dist/assets/
 * 4. Generate component registry (Phase 5)
 * 5. Check bundle size (Phase 4)
 * 6. Generate sitemap
 */
async function buildSite(config: BuildConfig): Promise<BuildResult> {
  const pages = await discoverPages(config.pagesDir);
  const results: BuildResult[] = [];

  for (const pageFile of pages) {
    try {
      // 1. Load and validate composition
      const compositionText = await fs.promises.readFile(pageFile, 'utf-8');
      const composition = JSON.parse(compositionText);

      const validation = await validatePageComposition(composition);
      if (!validation.valid) {
        throw new ValidationError(
          `Page ${pageFile} failed validation: ${validation.errors.join(', ')}`
        );
      }

      // 2. Build page
      const html = await buildPageFromComposition(composition, config);

      // 3. Write output
      const outputPath = getOutputPath(pageFile, config);
      await ensureDir(path.dirname(outputPath));
      await fs.promises.writeFile(outputPath, html);

      results.push({ path: pageFile, success: true });
    } catch (error) {
      results.push({
        path: pageFile,
        success: false,
        error: String(error),
      });
    }
  }

  return { results, totalBuilt: results.filter(r => r.success).length };
}
```

### Component Registry Generation

```typescript
/**
 * Component registry auto-generation (Phase 5).
 *
 * At build time, scan all components and generate searchable registry.
 * Used by AI tools (Phase 6) and developers.
 *
 * Output: components/_registry/components.json
 */
async function generateComponentRegistry(componentsDir: string): Promise<void> {
  const atoms = await glob(`${componentsDir}/atoms/*/`);
  const molecules = await glob(`${componentsDir}/molecules/*/`);
  const organisms = await glob(`${componentsDir}/organisms/*/`);

  const registry: ComponentMetadata[] = [];

  for (const componentPath of [...atoms, ...molecules, ...organisms]) {
    // Load schema
    const schemaPath = path.join(componentPath, `${path.basename(componentPath)}.schema.json`);
    const schema = JSON.parse(await fs.promises.readFile(schemaPath, 'utf-8'));

    registry.push({
      id: getComponentId(componentPath),
      name: schema.title,
      description: schema.description,
      category: detectCategory(componentPath),
      schema: schema,
      keywords: schema.keywords || [],
      examples: schema.examples || [],
      accessibility: schema.accessibility || {},
      responsive: schema.responsive || {},
      darkMode: schema.darkMode || {},
    });
  }

  // Write registry
  const registryPath = path.join(componentsDir, '_registry', 'components.json');
  await ensureDir(path.dirname(registryPath));
  await fs.promises.writeFile(
    registryPath,
    JSON.stringify({ components: registry, generated: new Date().toISOString() }, null, 2)
  );
}
```

### Build-Time Accessibility Audit

```typescript
/**
 * Automated accessibility audit (Decision #12: Automated a11y Testing).
 *
 * Run Pa11y and axe on built pages. Report issues but don't block build.
 * See Phase 4: Automated Accessibility Testing
 */
async function auditAccessibility(htmlPath: string): Promise<AccessibilityResult> {
  const results = {
    path: htmlPath,
    pa11y: null as any,
    axe: null as any,
    errors: [] as string[],
  };

  try {
    // Run Pa11y
    results.pa11y = await pa11y(htmlPath, {
      level: 'WCAG2AA',
      wait: 1000,
    });

    // Run axe
    const axeResults = await axe.run('file://' + htmlPath);
    results.axe = axeResults.violations;

    // Report but don't fail
    if (results.pa11y.issues.length > 0) {
      console.warn(`⚠️  Accessibility issues in ${htmlPath}:`);
      for (const issue of results.pa11y.issues) {
        console.warn(`  - ${issue.message}`);
      }
    }
  } catch (error) {
    results.errors.push(String(error));
  }

  return results;
}
```

---

## Summary

**This code style guide ensures AgentStatic code is:**

1. **Clear**: Easy to understand at a glance
2. **Minimal**: No unnecessary code or comments
3. **Self-Documenting**: Structure reveals intent
4. **AI-Friendly**: Agents can reason about code easily
5. **Consistent**: Same patterns throughout
6. **Testable**: Critical paths verified
7. **Maintainable**: Easy to modify and extend

Follow these standards throughout the AgentStatic codebase.

---

*AgentStatic Code Style Guide v1.0 - October 24, 2025*

*Based on Anthropic's context engineering principles + established software engineering practices.*
