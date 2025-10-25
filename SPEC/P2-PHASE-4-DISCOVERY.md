# Phase 4: Component Discovery & Query API
## Timeline: Week 6 (Dec 9-15, 2024)

### Overview
This phase implements powerful discovery and query capabilities for the component registry, enabling developers and AI agents to find, filter, and compose components efficiently through a rich query API.

### Prerequisites
- Registry generation system operational
- Validation framework in place
- Index structures created

---

## 1. Query Engine

### 1.1 Query Interface

```typescript
// src/registry/query/types.ts
export interface ComponentQuery {
  id?: string | string[];
  category?: ComponentCategory | ComponentCategory[];
  tags?: string[];
  tagsMatchAll?: boolean;
  search?: string;
  deprecated?: boolean;
  hasSlots?: boolean;
  hasDependencies?: boolean;
  sort?: QuerySort;
  limit?: number;
  offset?: number;
}

export interface QuerySort {
  field: 'id' | 'name' | 'category' | 'updated' | 'dependencies';
  direction: 'asc' | 'desc';
}

export interface QueryResult {
  components: ComponentConfig[];
  total: number;
  offset: number;
  limit: number;
  query: ComponentQuery;
}
```

### 1.2 Query Engine Implementation

```typescript
// src/registry/query/engine.ts
export class QueryEngine {
  private registry: Registry;
  private searchIndex: SearchIndex;

  constructor(registry: Registry) {
    this.registry = registry;
    this.searchIndex = new SearchIndex(registry);
  }

  public query(q: ComponentQuery): QueryResult {
    let components = Array.from(this.registry.components.values());

    // Filter by ID
    if (q.id) {
      const ids = Array.isArray(q.id) ? q.id : [q.id];
      components = components.filter(c => ids.includes(c.metadata.id));
    }

    // Filter by category
    if (q.category) {
      const categories = Array.isArray(q.category) ? q.category : [q.category];
      components = components.filter(c => categories.includes(c.metadata.category));
    }

    // Filter by tags
    if (q.tags && q.tags.length > 0) {
      components = components.filter(c => {
        if (q.tagsMatchAll) {
          return q.tags!.every(tag => c.metadata.tags.includes(tag));
        } else {
          return q.tags!.some(tag => c.metadata.tags.includes(tag));
        }
      });
    }

    // Filter by deprecated status
    if (q.deprecated !== undefined) {
      components = components.filter(c => c.metadata.deprecated === q.deprecated);
    }

    // Filter by slots
    if (q.hasSlots !== undefined) {
      components = components.filter(c =>
        q.hasSlots
          ? c.schema.slots && c.schema.slots.length > 0
          : !c.schema.slots || c.schema.slots.length === 0
      );
    }

    // Filter by dependencies
    if (q.hasDependencies !== undefined) {
      components = components.filter(c =>
        q.hasDependencies
          ? c.dependencies.length > 0
          : c.dependencies.length === 0
      );
    }

    // Search
    if (q.search) {
      components = this.searchIndex.search(q.search, components);
    }

    // Sort
    if (q.sort) {
      components = this.sort(components, q.sort);
    }

    // Pagination
    const total = components.length;
    const offset = q.offset || 0;
    const limit = q.limit || total;

    components = components.slice(offset, offset + limit);

    return {
      components,
      total,
      offset,
      limit,
      query: q
    };
  }

  private sort(components: ComponentConfig[], sort: QuerySort): ComponentConfig[] {
    const sorted = [...components];
    const direction = sort.direction === 'asc' ? 1 : -1;

    sorted.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sort.field) {
        case 'id':
          aValue = a.metadata.id;
          bValue = b.metadata.id;
          break;
        case 'name':
          aValue = a.metadata.name;
          bValue = b.metadata.name;
          break;
        case 'category':
          aValue = a.metadata.category;
          bValue = b.metadata.category;
          break;
        case 'updated':
          aValue = new Date(a.metadata.updated).getTime();
          bValue = new Date(b.metadata.updated).getTime();
          break;
        case 'dependencies':
          aValue = a.dependencies.length;
          bValue = b.dependencies.length;
          break;
      }

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });

    return sorted;
  }

  public findById(id: string): ComponentConfig | undefined {
    return this.registry.components.get(id);
  }

  public findByCategory(category: ComponentCategory): ComponentConfig[] {
    const ids = this.registry.index.byCategory.get(category) || [];
    return ids.map(id => this.registry.components.get(id)!).filter(Boolean);
  }

  public findByTag(tag: string): ComponentConfig[] {
    const ids = this.registry.index.byTag.get(tag) || [];
    return ids.map(id => this.registry.components.get(id)!).filter(Boolean);
  }

  public getDependencies(componentId: string, recursive: boolean = false): string[] {
    if (!recursive) {
      return this.registry.index.dependencies.get(componentId) || [];
    }

    const resolver = new DependencyResolver();
    Array.from(this.registry.components.values()).forEach(config => {
      resolver.addComponent(config);
    });

    return resolver.resolve(componentId);
  }

  public getDependents(componentId: string): string[] {
    const dependents: string[] = [];

    this.registry.index.dependencies.forEach((deps, id) => {
      if (deps.includes(componentId)) {
        dependents.push(id);
      }
    });

    return dependents;
  }
}
```

---

## 2. Search Index

### 2.1 Full-Text Search

```typescript
// src/registry/query/search-index.ts
export class SearchIndex {
  private index: Map<string, SearchDocument> = new Map();
  private invertedIndex: Map<string, Set<string>> = new Map();

  constructor(registry: Registry) {
    this.buildIndex(registry);
  }

  private buildIndex(registry: Registry): void {
    registry.components.forEach((config, id) => {
      const doc = this.createDocument(config);
      this.index.set(id, doc);
      this.indexDocument(id, doc);
    });
  }

  private createDocument(config: ComponentConfig): SearchDocument {
    return {
      id: config.metadata.id,
      name: config.metadata.name,
      description: config.metadata.description,
      category: config.metadata.category,
      tags: config.metadata.tags,
      propNames: config.schema.props.map(p => p.name),
      searchableText: this.buildSearchableText(config)
    };
  }

  private buildSearchableText(config: ComponentConfig): string {
    const parts = [
      config.metadata.id,
      config.metadata.name,
      config.metadata.description,
      config.metadata.category,
      ...config.metadata.tags,
      ...config.schema.props.map(p => p.name),
      ...config.schema.props.map(p => p.description)
    ];

    return parts.join(' ').toLowerCase();
  }

  private indexDocument(id: string, doc: SearchDocument): void {
    const tokens = this.tokenize(doc.searchableText);

    tokens.forEach(token => {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, new Set());
      }
      this.invertedIndex.get(token)!.add(id);
    });
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2);
  }

  public search(query: string, components?: ComponentConfig[]): ComponentConfig[] {
    const tokens = this.tokenize(query);
    const scores = new Map<string, number>();

    // Find matching documents
    tokens.forEach(token => {
      const matches = this.invertedIndex.get(token);

      if (matches) {
        matches.forEach(id => {
          scores.set(id, (scores.get(id) || 0) + 1);
        });
      }
    });

    // Sort by relevance
    const sorted = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    // Return components
    const result: ComponentConfig[] = [];
    const componentMap = new Map(
      (components || []).map(c => [c.metadata.id, c])
    );

    sorted.forEach(id => {
      const component = componentMap.get(id);
      if (component) {
        result.push(component);
      }
    });

    return result;
  }
}

interface SearchDocument {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  propNames: string[];
  searchableText: string;
}
```

---

## 3. Composition Helpers

### 3.1 Component Composer

```typescript
// src/registry/query/composer.ts
export class ComponentComposer {
  private query: QueryEngine;
  private validator: ValidationEngine;

  constructor(query: QueryEngine, validator: ValidationEngine) {
    this.query = query;
    this.validator = validator;
  }

  public suggest(context: CompositionContext): ComponentSuggestion[] {
    const suggestions: ComponentSuggestion[] = [];

    // Find components matching context
    const results = this.query.query({
      category: context.category,
      tags: context.tags,
      hasSlots: context.needsSlots,
      search: context.description
    });

    results.components.forEach(component => {
      const score = this.calculateRelevance(component, context);

      suggestions.push({
        component,
        score,
        reason: this.explainSuggestion(component, context)
      });
    });

    // Sort by score
    suggestions.sort((a, b) => b.score - a.score);

    return suggestions.slice(0, context.limit || 10);
  }

  private calculateRelevance(
    component: ComponentConfig,
    context: CompositionContext
  ): number {
    let score = 0;

    // Category match
    if (context.category && component.metadata.category === context.category) {
      score += 10;
    }

    // Tag matches
    if (context.tags) {
      const matchingTags = context.tags.filter(tag =>
        component.metadata.tags.includes(tag)
      );
      score += matchingTags.length * 5;
    }

    // Slot requirements
    if (context.needsSlots) {
      score += (component.schema.slots?.length || 0) * 2;
    }

    // Dependency count (prefer fewer dependencies)
    score -= component.dependencies.length;

    // Deprecation penalty
    if (component.metadata.deprecated) {
      score -= 20;
    }

    // Recency bonus
    const daysSinceUpdate = this.daysSince(component.metadata.updated);
    score += Math.max(0, 10 - daysSinceUpdate / 30);

    return score;
  }

  private daysSince(dateString: string): number {
    const date = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  }

  private explainSuggestion(
    component: ComponentConfig,
    context: CompositionContext
  ): string {
    const reasons: string[] = [];

    if (context.category && component.metadata.category === context.category) {
      reasons.push(`matches category: ${context.category}`);
    }

    if (context.tags) {
      const matchingTags = context.tags.filter(tag =>
        component.metadata.tags.includes(tag)
      );
      if (matchingTags.length > 0) {
        reasons.push(`has tags: ${matchingTags.join(', ')}`);
      }
    }

    if (context.needsSlots && component.schema.slots) {
      reasons.push(`provides ${component.schema.slots.length} slot(s)`);
    }

    if (component.dependencies.length === 0) {
      reasons.push('no dependencies');
    }

    return reasons.join('; ');
  }

  public validateComposition(
    parentId: string,
    childIds: string[]
  ): CompositionValidation {
    const parent = this.query.findById(parentId);
    if (!parent) {
      return {
        valid: false,
        errors: [`Parent component not found: ${parentId}`]
      };
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if parent accepts children
    if (!parent.schema.slots || parent.schema.slots.length === 0) {
      errors.push(`Component ${parentId} does not accept children (no slots defined)`);
    }

    // Validate each child
    childIds.forEach(childId => {
      const child = this.query.findById(childId);

      if (!child) {
        errors.push(`Child component not found: ${childId}`);
        return;
      }

      // Check if child is deprecated
      if (child.metadata.deprecated) {
        warnings.push(
          `Component ${childId} is deprecated: ${child.metadata.deprecationMessage}`
        );
      }

      // Check dependency conflicts
      const parentDeps = this.query.getDependencies(parentId, true);
      const childDeps = this.query.getDependencies(childId, true);

      // Detect circular dependencies
      if (parentDeps.includes(childId) || childDeps.includes(parentId)) {
        errors.push(`Circular dependency detected between ${parentId} and ${childId}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}

export interface CompositionContext {
  category?: ComponentCategory;
  tags?: string[];
  description?: string;
  needsSlots?: boolean;
  limit?: number;
}

export interface ComponentSuggestion {
  component: ComponentConfig;
  score: number;
  reason: string;
}

export interface CompositionValidation {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}
```

---

## 4. Registry API

### 4.1 Public API

```typescript
// src/registry/api.ts
export class ComponentRegistryAPI {
  private registry: Registry;
  private query: QueryEngine;
  private composer: ComponentComposer;
  private validator: ValidationEngine;

  constructor(registry: Registry) {
    this.registry = registry;
    this.query = new QueryEngine(registry);
    this.validator = new ValidationEngine();
    this.composer = new ComponentComposer(this.query, this.validator);

    this.registerSchemas();
  }

  private registerSchemas(): void {
    this.registry.components.forEach((config, id) => {
      this.validator.registerSchema(id, config.schema.jsonSchema);
    });
  }

  // Discovery methods
  public find(query: ComponentQuery): QueryResult {
    return this.query.query(query);
  }

  public get(id: string): ComponentConfig | undefined {
    return this.query.findById(id);
  }

  public getByCategory(category: ComponentCategory): ComponentConfig[] {
    return this.query.findByCategory(category);
  }

  public getByTag(tag: string): ComponentConfig[] {
    return this.query.findByTag(tag);
  }

  public search(searchQuery: string): ComponentConfig[] {
    return this.query.query({ search: searchQuery }).components;
  }

  // Dependency methods
  public getDependencies(id: string, recursive?: boolean): string[] {
    return this.query.getDependencies(id, recursive);
  }

  public getDependents(id: string): string[] {
    return this.query.getDependents(id);
  }

  // Composition methods
  public suggest(context: CompositionContext): ComponentSuggestion[] {
    return this.composer.suggest(context);
  }

  public validateComposition(parent: string, children: string[]): CompositionValidation {
    return this.composer.validateComposition(parent, children);
  }

  // Validation methods
  public validate(componentId: string, props: any): ValidationResult {
    return this.validator.validate(componentId, props);
  }

  // Stats methods
  public getStats(): RegistryStats {
    return this.registry.stats;
  }

  public getCategories(): ComponentCategory[] {
    return Array.from(this.registry.index.byCategory.keys());
  }

  public getTags(): string[] {
    return Array.from(this.registry.index.byTag.keys());
  }

  // Listing methods
  public list(): ComponentConfig[] {
    return Array.from(this.registry.components.values());
  }

  public listIds(): string[] {
    return Array.from(this.registry.components.keys());
  }
}
```

---

## 5. CLI Commands

### 5.1 Query CLI

```typescript
// src/cli/query-cli.ts
program
  .command('query')
  .description('Query the component registry')
  .option('-c, --category <category>', 'Filter by category')
  .option('-t, --tags <tags>', 'Filter by tags (comma-separated)')
  .option('-s, --search <query>', 'Search components')
  .option('--deprecated', 'Include deprecated components')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    const registry = await loadRegistry();
    const api = new ComponentRegistryAPI(registry);

    const results = api.find({
      category: options.category,
      tags: options.tags?.split(','),
      search: options.search,
      deprecated: options.deprecated
    });

    if (options.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(`Found ${results.total} components:\n`);

      results.components.forEach(c => {
        console.log(`  ${c.metadata.id} - ${c.metadata.name}`);
        console.log(`    Category: ${c.metadata.category}`);
        console.log(`    Tags: ${c.metadata.tags.join(', ')}`);
        console.log('');
      });
    }
  });

program
  .command('suggest')
  .description('Get component suggestions')
  .option('-c, --category <category>', 'Target category')
  .option('-t, --tags <tags>', 'Required tags')
  .option('-d, --description <text>', 'Description of what you need')
  .option('-l, --limit <n>', 'Number of suggestions', '10')
  .action(async (options) => {
    const registry = await loadRegistry();
    const api = new ComponentRegistryAPI(registry);

    const suggestions = api.suggest({
      category: options.category,
      tags: options.tags?.split(','),
      description: options.description,
      limit: parseInt(options.limit)
    });

    console.log(`Top ${suggestions.length} suggestions:\n`);

    suggestions.forEach((s, i) => {
      console.log(`${i + 1}. ${s.component.metadata.name} (score: ${s.score.toFixed(1)})`);
      console.log(`   ${s.reason}`);
      console.log('');
    });
  });

program
  .command('deps <componentId>')
  .description('Show component dependencies')
  .option('-r, --recursive', 'Show all dependencies recursively')
  .action(async (componentId, options) => {
    const registry = await loadRegistry();
    const api = new ComponentRegistryAPI(registry);

    const deps = api.getDependencies(componentId, options.recursive);

    if (deps.length === 0) {
      console.log(`${componentId} has no dependencies`);
    } else {
      console.log(`Dependencies for ${componentId}:`);
      deps.forEach(dep => console.log(`  - ${dep}`));
    }
  });
```

---

## 6. Testing

### 6.1 Query Tests

```typescript
// src/tests/registry/query.test.ts
import { describe, it, expect } from 'vitest';
import { QueryEngine } from '@/registry/query/engine';
import { mockRegistry } from '../fixtures/registry';

describe('Query Engine', () => {
  const engine = new QueryEngine(mockRegistry);

  describe('filtering', () => {
    it('filters by category', () => {
      const result = engine.query({ category: 'interactive' });

      expect(result.components.length).toBeGreaterThan(0);
      result.components.forEach(c => {
        expect(c.metadata.category).toBe('interactive');
      });
    });

    it('filters by tags', () => {
      const result = engine.query({ tags: ['form', 'input'] });

      expect(result.components.length).toBeGreaterThan(0);
      result.components.forEach(c => {
        expect(
          c.metadata.tags.includes('form') || c.metadata.tags.includes('input')
        ).toBe(true);
      });
    });

    it('requires all tags when tagsMatchAll is true', () => {
      const result = engine.query({
        tags: ['form', 'input'],
        tagsMatchAll: true
      });

      result.components.forEach(c => {
        expect(c.metadata.tags).toContain('form');
        expect(c.metadata.tags).toContain('input');
      });
    });
  });

  describe('sorting', () => {
    it('sorts by name ascending', () => {
      const result = engine.query({
        sort: { field: 'name', direction: 'asc' }
      });

      const names = result.components.map(c => c.metadata.name);
      const sorted = [...names].sort();

      expect(names).toEqual(sorted);
    });

    it('sorts by dependencies descending', () => {
      const result = engine.query({
        sort: { field: 'dependencies', direction: 'desc' }
      });

      for (let i = 0; i < result.components.length - 1; i++) {
        expect(result.components[i].dependencies.length).toBeGreaterThanOrEqual(
          result.components[i + 1].dependencies.length
        );
      }
    });
  });

  describe('pagination', () => {
    it('paginates results', () => {
      const page1 = engine.query({ limit: 5, offset: 0 });
      const page2 = engine.query({ limit: 5, offset: 5 });

      expect(page1.components.length).toBeLessThanOrEqual(5);
      expect(page2.offset).toBe(5);
      expect(page1.components[0].metadata.id).not.toBe(
        page2.components[0]?.metadata.id
      );
    });
  });
});
```

---

## Deliverables Checklist

### Phase 4 Completed Items

- [x] Query engine
- [x] Search index
- [x] Component composer
- [x] Public API
- [x] CLI commands
- [x] Dependency resolution
- [x] Composition validation
- [x] Tests

### Success Metrics

- [ ] Query API covers all use cases
- [ ] Search returns relevant results
- [ ] Composition suggestions are helpful
- [ ] CLI provides good UX
- [ ] Test coverage > 85%
- [ ] API documentation complete
