# Phase 5: Component Registry & Discovery System

**Duration**: Weeks 8-9 | **Effort**: 25 hours | **Priority**: High

---

## Overview

Build the **rich metadata and discovery system** that transforms the component library into an AI-consumable API. This phase creates the foundation for Phase 6 (Claude MCP integration) by documenting every component with structured, searchable metadata (decision #10: all metadata in registry).

Every component gets detailed documentation including:
- **Props/properties**: What inputs the component accepts
- **Variants**: Different visual presentations
- **Accessibility guarantees**: WCAG AA compliance, ARIA support, keyboard navigation
- **Responsive behavior**: Mobile, tablet, desktop breakpoints
- **Usage examples**: Canonical examples for each variant
- **Related components**: Which components compose well together

**Key Focus** (reflecting 17 refined decisions):
- **Rich metadata** (decision #10): All accessibility, responsive, usage details documented
- **Structured format**: JSON schemas for validation
- **Discovery-ready**: Searchable by keyword, category, purpose
- **AI-optimized**: Documentation formatted for Claude to understand
- **Validation**: Ensure all components meet standards before registry generation
- **Component count**: Document all 20-30 components (12-15 atoms/molecules + 8-10 organisms)

---

## Key Decisions (Reflecting All 17 Refinements)

| Decision | Choice | Phase 5 Impact |
|----------|--------|----------------|
| **Scope** | Brochureware-only (decision #1) | Document display/read-only components only |
| **Component Count** | 20-30 (decision #2) | Create metadata for all 20-30 components |
| **Theme** | Predefined + customizable (decision #3) | Document token usage in each component |
| **Claude-specific** | MCP optimization (decision #4) | Format metadata for Claude comprehension |
| **Metadata** | Rich (decision #10) | All accessibility, responsive, performance details |
| **JSON Compositions** | Validated (decision #11) | Validate against component schemas |
| **Accessibility** | Automated + audit (decision #12) | Document WCAG AA compliance per component |
| **Storybook** | 80/20 (decision #15) | Metadata includes canonical examples |
| **Bundle Monitoring** | Warnings only (decision #13) | Track per-component CSS size |
| **Static Routing** | File-based (decision #8) | Registry available at build time |
| **CSS Bundling** | Single file (Phase 0) | Track bundle impact per component |

---

## Module 5.1: Component Schema System

### Schema Definition

**Goal**: Create structured metadata for every component

Each component gets a `.schema.json` file describing its properties, variants, accessibility, and usage.

**Schema Format** (JSON Schema-based):

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "id": "atoms/button",
  "title": "Button",
  "description": "Interactive clickable element for calls-to-action. Brochureware-only, not form submission.",
  "category": "atom",
  "version": "1.0.0",
  "status": "stable",

  "purpose": "Visual treatment for CTAs and navigation, not form submission",

  "accessibility": {
    "wcag": "AA",
    "features": [
      "Visible focus indicators (3px outline)",
      "Sufficient color contrast (4.5:1 WCAG AA)",
      "Semantic button element",
      "ARIA labels for loading state",
      "Keyboard accessible (Enter/Space)"
    ],
    "keyboard": {
      "navigable": true,
      "keyBindings": ["Enter", "Space"]
    },
    "screenReaderOptimized": true,
    "ariaSupport": ["aria-busy", "aria-disabled"]
  },

  "responsive": {
    "mobileFirst": true,
    "breakpoints": {
      "mobile": "320px - 480px",
      "tablet": "481px - 768px",
      "desktop": "769px+"
    },
    "containerQueries": false,
    "notes": "Scales naturally via design tokens"
  },

  "darkMode": {
    "supported": true,
    "approach": "CSS variables",
    "tested": true,
    "notes": "All colors automatically adjust via tokens"
  },

  "properties": {
    "text": {
      "type": "string",
      "title": "Button Text",
      "description": "The visible text displayed in the button",
      "minLength": 1,
      "maxLength": 50,
      "example": "Click me",
      "required": true
    },
    "variant": {
      "type": "string",
      "title": "Visual Variant",
      "description": "Visual style of the button",
      "enum": ["primary", "secondary", "ghost", "outline"],
      "default": "primary",
      "example": "primary"
    },
    "size": {
      "type": "string",
      "title": "Size",
      "description": "Button size modifier",
      "enum": ["small", "medium", "large"],
      "default": "medium"
    },
    "disabled": {
      "type": "boolean",
      "title": "Disabled State",
      "description": "Disables the button",
      "default": false
    },
    "loading": {
      "type": "boolean",
      "title": "Loading State",
      "description": "Shows loading spinner",
      "default": false
    },
    "icon": {
      "type": "string",
      "title": "Icon",
      "description": "Optional icon CSS class",
      "example": "icon-arrow"
    },
    "fullWidth": {
      "type": "boolean",
      "title": "Full Width",
      "description": "Makes button full width",
      "default": false
    }
  },

  "variants": [
    {
      "name": "primary",
      "title": "Primary Button",
      "description": "Main action button, high contrast",
      "example": "<button class=\"button button--primary\">Click me</button>"
    },
    {
      "name": "secondary",
      "title": "Secondary Button",
      "description": "Alternative action",
      "example": "<button class=\"button button--secondary\">Learn More</button>"
    },
    {
      "name": "ghost",
      "title": "Ghost Button",
      "description": "Minimal, no background",
      "example": "<button class=\"button button--ghost\">Skip</button>"
    },
    {
      "name": "outline",
      "title": "Outline Button",
      "description": "Border only",
      "example": "<button class=\"button button--outline\">Maybe</button>"
    },
    {
      "name": "disabled",
      "title": "Disabled State",
      "description": "Disabled button",
      "example": "<button class=\"button\" disabled>Disabled</button>"
    },
    {
      "name": "loading",
      "title": "Loading State",
      "description": "Shows loading indicator",
      "example": "<button class=\"button loading\" aria-busy=\"true\">Loading...</button>"
    }
  ],

  "examples": [
    {
      "title": "Simple CTA",
      "description": "Basic primary button for call-to-action",
      "html": "<button class=\"button button--primary\">Get Started</button>",
      "props": {
        "text": "Get Started",
        "variant": "primary"
      }
    },
    {
      "title": "Secondary Action",
      "description": "Alternative action button",
      "html": "<button class=\"button button--secondary\">Learn More</button>",
      "props": {
        "text": "Learn More",
        "variant": "secondary"
      }
    },
    {
      "title": "Large Button with Icon",
      "description": "Large button with trailing icon",
      "html": "<button class=\"button button--primary button--large\">Get Started <svg class=\"icon\">...</svg></button>",
      "props": {
        "text": "Get Started",
        "variant": "primary",
        "size": "large",
        "icon": "icon-arrow"
      }
    },
    {
      "title": "Loading State",
      "description": "Button showing loading state",
      "html": "<button class=\"button button--primary loading\" aria-busy=\"true\">Loading...</button>",
      "props": {
        "text": "Loading...",
        "variant": "primary",
        "loading": true
      }
    }
  ],

  "relatedComponents": [
    "atoms/link",
    "atoms/icon",
    "molecules/cta-block"
  ],

  "cssClasses": {
    ".button": "Base element",
    ".button--primary": "Primary variant",
    ".button--secondary": "Secondary variant",
    ".button--ghost": "Ghost variant",
    ".button--outline": "Outline variant",
    ".button--small": "Small size",
    ".button--medium": "Medium size (default)",
    ".button--large": "Large size",
    ".button--full-width": "Full width",
    ".button:hover": "Hover state",
    ".button:focus-visible": "Focus state",
    ".button:active": "Active state",
    ".button:disabled": "Disabled state",
    ".button.loading": "Loading state"
  },

  "performance": {
    "estimatedCssSize": "1.2KB",
    "estimatedGzipped": "0.4KB",
    "cssBundle": "atoms/button.css",
    "javaScriptRequired": false,
    "dependencies": []
  },

  "keywords": [
    "button",
    "cta",
    "action",
    "clickable",
    "interactive",
    "primary",
    "secondary",
    "call-to-action"
  ]
}
```

**File Structure**:

```
components/
├── atoms/
│   ├── button/
│   │   ├── button.css              # Styles
│   │   ├── button.html             # Template
│   │   ├── button.schema.json       # Metadata
│   │   └── button.stories.js        # Storybook
│   ├── heading/
│   ├── text/
│   └── ...
├── molecules/
│   ├── card/
│   │   ├── card.css
│   │   ├── card.html
│   │   ├── card.schema.json
│   │   └── card.stories.js
│   └── ...
├── organisms/
│   ├── hero-section/
│   │   ├── hero-section.css
│   │   ├── hero-section.html
│   │   ├── hero-section.schema.json
│   │   └── hero-section.stories.js
│   └── ...
└── _registry/
    └── components.json             # Auto-generated
```

**Acceptance Criteria**:
- [ ] Schema template created and documented
- [ ] All 20-30 components have `.schema.json` files
- [ ] Schemas are valid JSON Schema Draft 7
- [ ] All properties documented with examples
- [ ] Accessibility features listed per component
- [ ] Responsive behavior documented
- [ ] Dark mode support noted
- [ ] Related components identified
- [ ] CSS classes documented
- [ ] Performance estimates included

**Estimate**: 6 hours

---

## Module 5.2: Component Registry Generation

### Auto-Generated Registry

**Goal**: Create a single searchable index of all components

A build script aggregates all component schemas into one comprehensive JSON file.

**Registry Output** (`components/_registry/components.json`):

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-10-24T14:30:00Z",
  "generator": "agentstatic@1.0.0",

  "stats": {
    "total": 20,
    "atoms": 8,
    "molecules": 7,
    "organisms": 5,
    "cssTotal": "42KB",
    "cssGzipped": "12KB"
  },

  "components": [
    {
      "id": "atoms/button",
      "category": "atom",
      "name": "Button",
      "title": "Button",
      "description": "Interactive clickable element for calls-to-action",
      "purpose": "Visual treatment for CTAs, not form submission",
      "version": "1.0.0",
      "status": "stable",

      "accessibility": {
        "wcag": "AA",
        "keyboard": true,
        "screenReader": true,
        "ariaSupport": ["aria-busy", "aria-disabled"]
      },

      "responsive": {
        "mobileFirst": true,
        "containerQueries": false
      },

      "darkMode": {
        "supported": true,
        "approach": "CSS variables"
      },

      "properties": { /* ... */ },
      "variants": ["primary", "secondary", "ghost", "outline", "disabled", "loading"],
      "examplesCount": 4,
      "relatedComponents": ["atoms/link", "atoms/icon", "molecules/cta-block"],

      "cssClasses": { /* ... */ },

      "performance": {
        "cssSize": "1.2KB",
        "cssGzipped": "0.4KB",
        "bundle": "atoms/button.css",
        "jsRequired": false
      },

      "keywords": ["button", "cta", "action", "clickable", "interactive"],
      "path": "components/atoms/button",
      "schemaPath": "components/atoms/button/button.schema.json"
    },
    /* ... all other 19 components */
  ],

  "index": {
    "byId": { /* Quick lookup by ID */ },

    "byCategory": {
      "atom": ["atoms/button", "atoms/heading", /* ... */],
      "molecule": ["molecules/card", /* ... */],
      "organism": ["organisms/hero-section", /* ... */]
    },

    "byKeyword": {
      "button": ["atoms/button"],
      "cta": ["atoms/button", "molecules/cta-block", "organisms/hero-section"],
      "card": ["molecules/card", "organisms/feature-section"],
      "hero": ["organisms/hero-section"],
      "navigation": ["organisms/header"],
      /* ... all keywords */
    },

    "byAccessibility": {
      "wcag-aa": ["atoms/button", "atoms/heading", /* ... */],
      "keyboard-navigable": ["atoms/button", /* ... */],
      "screen-reader-optimized": ["all components"]
    },

    "byResponsive": {
      "mobile-first": ["all components"],
      "container-queries": ["molecules/card", /* ... */]
    }
  },

  "metadata": {
    "lastUpdated": "2025-10-24T14:30:00Z",
    "buildTime": 0.8,
    "schemaVersion": "1.0.0"
  }
}
```

**Build Script** (`scripts/generate-registry.ts`):

```typescript
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface ComponentSchema {
  id: string;
  title: string;
  description: string;
  category: string;
  accessibility: Record<string, any>;
  responsive: Record<string, any>;
  darkMode: Record<string, any>;
  properties: Record<string, any>;
  variants: Array<{ name: string }>;
  examples: Array<any>;
  relatedComponents: string[];
  cssClasses: Record<string, string>;
  performance: Record<string, any>;
  keywords: string[];
}

async function generateComponentRegistry() {
  const componentsDir = path.resolve('./components');
  const categories = ['atoms', 'molecules', 'organisms'];
  const allComponents: any[] = [];
  const index = {
    byId: {},
    byCategory: {},
    byKeyword: {},
    byAccessibility: {},
    byResponsive: {}
  };

  // Scan all component directories
  for (const category of categories) {
    const categoryPath = path.join(componentsDir, category);
    if (!readdirSync(categoryPath)) continue;

    const components = readdirSync(categoryPath);
    for (const componentName of components) {
      const schemaPath = path.join(
        categoryPath,
        componentName,
        `${componentName}.schema.json`
      );

      try {
        const schema: ComponentSchema = JSON.parse(
          readFileSync(schemaPath, 'utf-8')
        );

        const componentEntry = {
          id: `${category}/${componentName}`,
          category: schema.category,
          name: schema.title,
          description: schema.description,
          purpose: schema.purpose,
          version: schema.version,
          status: schema.status,

          accessibility: schema.accessibility,
          responsive: schema.responsive,
          darkMode: schema.darkMode,

          properties: schema.properties,
          variants: schema.variants.map((v: any) => v.name),
          examplesCount: schema.examples.length,
          relatedComponents: schema.relatedComponents,

          cssClasses: schema.cssClasses,

          performance: schema.performance,
          keywords: schema.keywords,
          path: path.join(componentsDir, category, componentName),
          schemaPath
        };

        allComponents.push(componentEntry);

        // Build indexes
        index.byId[componentEntry.id] = componentEntry;

        // By category
        if (!index.byCategory[category]) {
          index.byCategory[category] = [];
        }
        index.byCategory[category].push(componentEntry.id);

        // By keyword
        schema.keywords.forEach((keyword: string) => {
          if (!index.byKeyword[keyword]) {
            index.byKeyword[keyword] = [];
          }
          index.byKeyword[keyword].push(componentEntry.id);
        });

        // By accessibility
        if (schema.accessibility.wcag === 'AA') {
          if (!index.byAccessibility['wcag-aa']) {
            index.byAccessibility['wcag-aa'] = [];
          }
          index.byAccessibility['wcag-aa'].push(componentEntry.id);
        }

        if (schema.accessibility.keyboard?.navigable) {
          if (!index.byAccessibility['keyboard-navigable']) {
            index.byAccessibility['keyboard-navigable'] = [];
          }
          index.byAccessibility['keyboard-navigable'].push(componentEntry.id);
        }

        // By responsive
        if (schema.responsive.mobileFirst) {
          if (!index.byResponsive['mobile-first']) {
            index.byResponsive['mobile-first'] = [];
          }
          index.byResponsive['mobile-first'].push(componentEntry.id);
        }
      } catch (error) {
        console.warn(`Failed to load schema for ${componentName}:`, error);
      }
    }
  }

  const cssTotal = allComponents.reduce(
    (sum: number, comp: any) => sum + parseInt(comp.performance.cssSize),
    0
  );

  const registry = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'agentstatic@1.0.0',

    stats: {
      total: allComponents.length,
      atoms: allComponents.filter((c: any) => c.category === 'atom').length,
      molecules: allComponents.filter((c: any) => c.category === 'molecule').length,
      organisms: allComponents.filter((c: any) => c.category === 'organism').length,
      cssTotal: `${cssTotal}KB`,
      cssGzipped: `~${Math.round(cssTotal * 0.3)}KB`
    },

    components: allComponents.sort((a: any, b: any) => a.id.localeCompare(b.id)),
    index,

    metadata: {
      lastUpdated: new Date().toISOString(),
      buildTime: 0.8,
      schemaVersion: '1.0.0'
    }
  };

  const registryPath = path.join(componentsDir, '_registry', 'components.json');
  writeFileSync(registryPath, JSON.stringify(registry, null, 2));

  console.log(`✓ Generated registry with ${allComponents.length} components`);
  console.log(`✓ Total CSS: ${cssTotal}KB (estimated gzipped: ~${Math.round(cssTotal * 0.3)}KB)`);
}

generateComponentRegistry().catch(console.error);
```

**Acceptance Criteria**:
- [ ] Registry auto-generates from all `.schema.json` files
- [ ] All 20-30 components indexed
- [ ] Build script runs in <2 seconds
- [ ] Generated registry is valid JSON
- [ ] All indexes (category, keyword, accessibility) working
- [ ] CSS bundle size calculated and reported
- [ ] Registry committed to repo for deployments

**Estimate**: 4 hours

---

## Module 5.3: Discovery API

### Component Search & Discovery

**Goal**: Provide simple, fast search interface for components

**API** (`core/registry/component-discovery.ts`):

```typescript
import { readFileSync } from 'fs';

interface ComponentRegistry {
  version: string;
  components: Component[];
  index: RegistryIndex;
}

class ComponentDiscovery {
  private registry: ComponentRegistry;

  constructor(registryPath: string) {
    this.registry = JSON.parse(readFileSync(registryPath, 'utf-8'));
  }

  // Get component by exact ID
  getComponent(id: string): Component | null {
    return this.registry.index.byId[id] || null;
  }

  // Search by keywords (exact match first, then partial)
  searchByKeyword(keywords: string[]): Component[] {
    const results = new Set<string>();

    keywords.forEach(keyword => {
      const lower = keyword.toLowerCase();
      const matching = this.registry.index.byKeyword[lower] || [];
      matching.forEach(id => results.add(id));
    });

    return Array.from(results)
      .map(id => this.getComponent(id))
      .filter(Boolean) as Component[];
  }

  // Get all components by category
  getByCategory(category: 'atom' | 'molecule' | 'organism'): Component[] {
    const ids = this.registry.index.byCategory[category] || [];
    return ids
      .map(id => this.getComponent(id))
      .filter(Boolean) as Component[];
  }

  // Semantic search (for Claude: "Find me a button-like component")
  semanticSearch(query: string): Component[] {
    const queryLower = query.toLowerCase();

    return this.registry.components
      .filter(comp => {
        // Match name, description, keywords
        return (
          comp.name.toLowerCase().includes(queryLower) ||
          comp.description.toLowerCase().includes(queryLower) ||
          comp.purpose?.toLowerCase().includes(queryLower) ||
          comp.keywords.some(k => k.includes(queryLower))
        );
      })
      .sort((a, b) => {
        // Prefer exact name matches
        if (a.name.toLowerCase() === queryLower) return -1;
        if (b.name.toLowerCase() === queryLower) return 1;
        return 0;
      });
  }

  // Find components with specific accessibility features
  getAccessible(feature: 'keyboard-navigable' | 'screen-reader-optimized' | 'wcag-aa'): Component[] {
    const ids = this.registry.index.byAccessibility[feature] || [];
    return ids
      .map(id => this.getComponent(id))
      .filter(Boolean) as Component[];
  }

  // Find components that work together well
  findRelated(componentId: string): Component[] {
    const component = this.getComponent(componentId);
    if (!component) return [];

    const related = new Set<string>();

    // Add explicitly related components
    component.relatedComponents.forEach(id => {
      related.add(id);
    });

    // Add components that reference this one
    this.registry.components.forEach(comp => {
      if (comp.relatedComponents.includes(componentId)) {
        related.add(comp.id);
      }
    });

    return Array.from(related)
      .map(id => this.getComponent(id))
      .filter(Boolean) as Component[];
  }

  // Get suggestions for what to use next
  getSuggestions(componentId: string): { related: Component[]; options: Component[] } {
    const component = this.getComponent(componentId);
    if (!component) return { related: [], options: [] };

    const related = this.findRelated(componentId);
    const nextCategory = this.getNextCategory(component.category);
    const options = this.getByCategory(nextCategory);

    return { related, options };
  }

  // Utility: Get next category in hierarchy
  private getNextCategory(category: string): 'atom' | 'molecule' | 'organism' {
    const hierarchy = { atom: 'molecule', molecule: 'organism', organism: 'organism' };
    return hierarchy[category as keyof typeof hierarchy] as any;
  }
}
```

**Usage Examples**:

```typescript
const discovery = new ComponentDiscovery('./components/_registry/components.json');

// Find a button
const button = discovery.getComponent('atoms/button');

// Search for CTA components
const ctas = discovery.searchByKeyword(['cta', 'call-to-action']);

// Find all atoms
const atoms = discovery.getByCategory('atom');

// Semantic search (for Claude: "I need something to show testimonials")
const testimonials = discovery.semanticSearch('testimonial quote');

// Find accessible components
const keyboardAccessible = discovery.getAccessible('keyboard-navigable');

// What goes well with a card?
const withCard = discovery.findRelated('molecules/card');

// What should come after a button?
const suggestions = discovery.getSuggestions('atoms/button');
```

**Acceptance Criteria**:
- [ ] All search methods return correct results
- [ ] Searches complete in <100ms
- [ ] Semantic search returns relevant components
- [ ] Related components accurately identified
- [ ] Error handling for missing components
- [ ] Discovery API documented with examples

**Estimate**: 4 hours

---

## Module 5.4: Validation System

### Schema Validation & Composition Checking

**Goal**: Ensure all components meet standards and page compositions are valid

**Validator** (`core/registry/component-validator.ts`):

```typescript
class ComponentValidator {
  private discovery: ComponentDiscovery;

  validateComponentSchema(componentId: string): ValidationResult {
    const component = this.discovery.getComponent(componentId);
    if (!component) {
      return { valid: false, errors: [`Component not found: ${componentId}`] };
    }

    const errors: string[] = [];

    // Check required metadata
    if (!component.name) errors.push('Component must have a name');
    if (!component.description) errors.push('Component must have a description');
    if (!component.purpose) errors.push('Component must have a purpose statement');
    if (!component.accessibility) errors.push('Component must document accessibility');
    if (!component.responsive) errors.push('Component must document responsive behavior');
    if (component.keywords.length === 0) {
      errors.push('Component must have keywords for discovery');
    }
    if (component.variants.length === 0) {
      errors.push('Component must have at least one variant');
    }
    if (component.examplesCount === 0) {
      errors.push('Component must have usage examples');
    }

    // Check WCAG compliance
    if (component.accessibility.wcag !== 'AA') {
      errors.push('Component must be WCAG AA compliant');
    }

    return { valid: errors.length === 0, errors };
  }

  validatePageComposition(composition: PageComposition): ValidationResult {
    const errors: string[] = [];

    for (const section of composition.sections || []) {
      if (!section.component) {
        errors.push('Section missing required "component" field');
        continue;
      }

      const component = this.discovery.getComponent(section.component);
      if (!component) {
        errors.push(`Component not found: ${section.component}`);
        continue;
      }

      // Check variant
      if (section.variant && !component.variants.includes(section.variant)) {
        errors.push(
          `${section.component}: variant "${section.variant}" not found. Available: ${component.variants.join(', ')}`
        );
      }

      // Check required props
      const requiredProps = Object.entries(component.properties)
        .filter(([_, prop]: [string, any]) => prop.required)
        .map(([name]) => name);

      for (const prop of requiredProps) {
        if (!(prop in (section.props || {}))) {
          errors.push(`${section.component}: missing required prop "${prop}"`);
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
```

**Usage in Build Pipeline**:

```typescript
// During build, validate all page compositions
const validator = new ComponentValidator(discovery);

for (const page of pages) {
  const composition = loadPageComposition(page);
  const result = validator.validatePageComposition(composition);

  if (!result.valid) {
    console.error(`Validation failed for ${page}:`);
    result.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }
}
```

**Acceptance Criteria**:
- [ ] Component schema validation working
- [ ] Page composition validation working
- [ ] Clear, actionable error messages
- [ ] Validators run in <50ms
- [ ] Integrated into build pipeline
- [ ] Invalid compositions fail the build

**Estimate**: 3 hours

---

## Module 5.5: Documentation & AI Guide

### Registry Documentation

**Files to Create**:
- `docs/component-registry.md` - Overview and architecture
- `docs/component-schema.md` - Schema format specification
- `docs/component-discovery.md` - Discovery API reference
- `docs/ai-component-guide.md` - Guide for Claude integration (Phase 6)

**Key Sections**:
- How the registry is generated
- Schema format and required fields
- Discovery API usage examples
- How to add components to registry
- Validation rules and error messages
- Example: Finding right component for a use case
- Example: Building a page composition
- Example: Using discovery for Claude (Phase 6)

**Acceptance Criteria**:
- [ ] Clear explanation of registry purpose
- [ ] All schema fields documented
- [ ] Discovery API fully documented
- [ ] Examples for common queries
- [ ] AI agent guide included
- [ ] Validation rules documented

**Estimate**: 3 hours

---

## Integration with AI (Phase 6)

The registry enables Phase 6 (Claude MCP integration) by providing:

1. **Component Discovery**: Claude can search for components matching a description
2. **Property Validation**: Claude gets validation feedback before building pages
3. **Related Components**: Claude gets suggestions for what components work well together
4. **Accessibility Guarantees**: Claude knows each component meets WCAG AA
5. **Responsive Guarantees**: Claude knows responsive behavior without testing

---

## Success Metrics

- [ ] Registry auto-generates with all 20-30 components
- [ ] Build time < 2 seconds for registry generation
- [ ] All searches complete in < 100ms
- [ ] All 20-30 components have complete schemas
- [ ] Schema validation catches all missing metadata
- [ ] Composition validation prevents invalid pages
- [ ] Discovery API enables Claude to find right components
- [ ] Documentation clear for developers and AI agents

## Implementation Checklist

- [ ] Schema template created and documented
- [ ] All components have `.schema.json` files
- [ ] Build script for registry generation working
- [ ] Registry auto-generates during build
- [ ] Discovery API functional and tested
- [ ] Validation system integrated into build
- [ ] Page compositions validated before build
- [ ] Documentation complete
- [ ] Registry committed to repo

---

## File Structure After Phase 5

```
components/
├── atoms/
│   ├── button/
│   │   ├── button.css
│   │   ├── button.html
│   │   ├── button.schema.json        ← NEW
│   │   └── button.stories.js
│   └── ... (all other atoms with schemas)
├── molecules/
│   └── ... (all molecules with schemas)
├── organisms/
│   └── ... (all organisms with schemas)
└── _registry/
    └── components.json                ← AUTO-GENERATED

core/registry/
├── component-discovery.ts             ← NEW
├── component-validator.ts             ← NEW
└── schema-validator.ts                ← NEW

docs/
├── component-registry.md              ← NEW
├── component-schema.md                ← NEW
├── component-discovery.md             ← NEW
└── ai-component-guide.md              ← NEW (for Phase 6)

scripts/
└── generate-registry.ts               ← NEW
```

---

## Phase Gate

**Completion criteria before proceeding to Phase 6**:

- [ ] All 20-30 components have complete `.schema.json` files
- [ ] Registry auto-generates and is valid JSON
- [ ] All component schemas pass validation
- [ ] Discovery API enables all search methods
- [ ] Validation system integrated into build
- [ ] Documentation complete
- [ ] Registry ready for Claude integration (Phase 6)

---

## Notes for Future Phases

- **Phase 6**: Claude MCP tools use discovery API to find components
- **Phase 7**: Storybook documentation references registry metadata
- **Future**: Plugin system for custom components (Phase 8+)

---

*Phase 5 Plan v2.0 (Comprehensive) - October 24, 2025*
