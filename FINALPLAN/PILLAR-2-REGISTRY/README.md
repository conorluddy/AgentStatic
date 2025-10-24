# PILLAR 2: Registry & Validation

**Making Components Machine-Readable and Validated**

This pillar transforms the visual component library into a machine-readable system that AI agents (particularly Claude) can discover, understand, and compose reliably.

---

## Overview

The Registry & Validation system provides:
- **JSON Schemas** for every component
- **Auto-generated registry** from component files
- **3-layer validation** (structural, semantic, accessibility)
- **Discovery API** for searching and filtering components
- **Rich metadata** for AI decision-making

---

## The Four Phases

### Phase 1: Component Schema Definition
**Duration**: 2 weeks | **Effort**: 10 hours

Define comprehensive JSON schemas for each component:
- Props with types and validation rules
- Accessibility metadata (WCAG level, ARIA support)
- Responsive behavior specifications
- Dark mode capabilities
- Usage examples and patterns

**Deliverable**: Complete JSON schema for every component

---

### Phase 2: Registry Generation
**Duration**: 1 week | **Effort**: 10 hours

Automate registry creation from component files:
- Scan component directories
- Extract metadata from schemas
- Generate unified registry file
- Index for fast searching
- Version tracking

**Deliverable**: Auto-generated `components.json` registry

---

### Phase 3: Validation System
**Duration**: 2 weeks | **Effort**: 15 hours

Implement comprehensive validation layers:
1. **Structural Validation** - JSON Schema compliance (Ajv)
2. **Semantic Validation** - Component relationships and slots
3. **Accessibility Validation** - WCAG rules and requirements

**Deliverable**: Complete validation pipeline

---

### Phase 4: Discovery API
**Duration**: 1 week | **Effort**: 10 hours

Build intelligent component discovery:
- Semantic search by description
- Filter by category, accessibility, responsiveness
- Return suggestions and alternatives
- Performance optimization (<100ms)

**Deliverable**: Fast, intelligent discovery API

---

## Schema Structure

### Component Schema Example
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "id": "atoms/button",
  "name": "Button",
  "description": "Interactive button for CTAs and actions",
  "category": "atom",
  "version": "1.0.0",

  "props": {
    "text": {
      "type": "string",
      "required": true,
      "description": "Button display text"
    },
    "variant": {
      "type": "string",
      "enum": ["primary", "secondary", "ghost", "outline"],
      "default": "primary",
      "description": "Visual style variant"
    },
    "size": {
      "type": "string",
      "enum": ["small", "medium", "large"],
      "default": "medium"
    },
    "disabled": {
      "type": "boolean",
      "default": false
    },
    "loading": {
      "type": "boolean",
      "default": false
    }
  },

  "accessibility": {
    "wcag": "AA",
    "keyboard": true,
    "screenReader": true,
    "focusIndicator": "visible",
    "colorContrast": "4.5:1",
    "ariaSupport": ["aria-label", "aria-disabled", "aria-busy"]
  },

  "responsive": {
    "mobileFirst": true,
    "breakpoints": ["375px", "768px", "1440px"],
    "containerQueries": false,
    "behavior": "Scales with font-size"
  },

  "darkMode": {
    "supported": true,
    "automatic": true,
    "approach": "CSS variables"
  },

  "performance": {
    "cssSize": "1.2KB",
    "renderComplexity": "low",
    "reflows": "none"
  },

  "examples": [
    {
      "name": "Primary CTA",
      "props": { "text": "Get Started", "variant": "primary" },
      "use-case": "Main call-to-action"
    },
    {
      "name": "Secondary Action",
      "props": { "text": "Learn More", "variant": "secondary" },
      "use-case": "Supporting action"
    }
  ],

  "relatedComponents": ["atoms/link", "molecules/cta-block"],
  "keywords": ["button", "cta", "action", "click", "interactive"]
}
```

---

## Registry Format

### Generated Registry Structure
```json
{
  "version": "1.0.0",
  "generated": "2025-10-24T12:00:00Z",
  "componentCount": 25,
  "categories": {
    "atoms": 8,
    "molecules": 7,
    "organisms": 10
  },
  "components": [
    {
      "id": "atoms/button",
      "name": "Button",
      "category": "atom",
      "description": "Interactive button for CTAs",
      "accessibility": { "wcag": "AA" },
      "keywords": ["button", "cta", "action"],
      "path": "components/atoms/button/button.schema.json"
    }
    // ... all components ...
  ],
  "index": {
    "byCategory": { /* grouped by category */ },
    "byAccessibility": { /* grouped by WCAG level */ },
    "byKeyword": { /* inverted index for search */ }
  }
}
```

---

## Validation Layers

### Layer 1: Structural Validation
```typescript
// Using Ajv for JSON Schema validation
const ajv = new Ajv();
const validate = ajv.compile(componentSchema);

function validateStructure(component: unknown): ValidationResult {
  const valid = validate(component);
  return {
    valid,
    errors: validate.errors || []
  };
}
```

### Layer 2: Semantic Validation
```typescript
// Component relationship rules
const semanticRules = {
  'hero-section': {
    allowedChildren: ['heading', 'text', 'button', 'image'],
    requiredChildren: ['heading'],
    maxChildren: 5
  }
};

function validateSemantics(composition: Composition): ValidationResult {
  // Check parent-child relationships
  // Validate slot usage
  // Ensure logical component flow
}
```

### Layer 3: Accessibility Validation
```typescript
// WCAG compliance checks
function validateAccessibility(component: Component): ValidationResult {
  const checks = [
    checkColorContrast(component),
    checkAriaLabels(component),
    checkKeyboardNav(component),
    checkFocusIndicators(component)
  ];

  return combineResults(checks);
}
```

---

## Discovery API

### Search Capabilities
```typescript
interface DiscoveryQuery {
  query?: string;           // Semantic search
  category?: ComponentCategory;
  accessibility?: 'A' | 'AA' | 'AAA';
  responsive?: boolean;
  darkMode?: boolean;
  limit?: number;
}

interface DiscoveryResult {
  matches: Component[];
  suggestions: Component[];  // Related/alternative components
  searchMeta: {
    totalResults: number;
    searchTime: number;
    queryTerms: string[];
  };
}
```

### Implementation
```typescript
class ComponentDiscovery {
  private registry: Registry;
  private searchIndex: SearchIndex;

  async search(query: DiscoveryQuery): Promise<DiscoveryResult> {
    // Semantic search using keywords
    // Filter by criteria
    // Rank by relevance
    // Include suggestions
    // Return in <100ms
  }
}
```

---

## Integration Points

### With Pillar 1 (Components)
- Schemas generated from component files
- Validation rules match component implementation
- Registry updates when components change

### With Pillar 3 (Build)
- Registry used during build validation
- Schemas enforce composition rules
- Build fails on validation errors

### With Pillar 4 (AI)
- MCP tools query the registry
- Discovery API powers component search
- Validation provides error feedback

---

## Success Criteria

### Phase 1 Complete When
- [ ] All component schemas defined
- [ ] Props fully documented
- [ ] Accessibility metadata complete
- [ ] Examples provided

### Phase 2 Complete When
- [ ] Registry auto-generation working
- [ ] All components indexed
- [ ] Search index built
- [ ] Version tracking functional

### Phase 3 Complete When
- [ ] Structural validation operational
- [ ] Semantic rules enforced
- [ ] Accessibility checks automated
- [ ] Error messages helpful

### Phase 4 Complete When
- [ ] Discovery API <100ms
- [ ] Semantic search accurate
- [ ] Suggestions relevant
- [ ] Filtering efficient

---

## File Structure
```
PILLAR-2-REGISTRY/
├── schemas/
│   ├── atoms/
│   │   └── button.schema.json
│   ├── molecules/
│   │   └── card.schema.json
│   └── organisms/
│       └── hero-section.schema.json
├── validation/
│   ├── structural.ts
│   ├── semantic.ts
│   └── accessibility.ts
├── discovery/
│   ├── search.ts
│   ├── index.ts
│   └── suggest.ts
├── generated/
│   └── components.json    # Auto-generated
└── scripts/
    └── generate-registry.ts
```

---

*This pillar bridges the gap between visual components and AI understanding.*