# Phase 1: Component Schema & Type System
## Timeline: Week 3 (Nov 18-24, 2024)

### Overview
This phase establishes the foundation for the component registry by defining comprehensive schemas, type systems, and validation rules. These schemas enable type-safe component registration, discovery, and composition.

### Prerequisites
- TypeScript 5.x configured
- JSON Schema validation library
- Basic project structure in place

---

## 1. Core Type Definitions

### 1.1 Base Component Schema

```typescript
// src/registry/types/base.ts
export interface ComponentMetadata {
  id: string;
  name: string;
  version: string;
  category: ComponentCategory;
  tags: string[];
  description: string;
  author?: string;
  created: string;
  updated: string;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export type ComponentCategory =
  | 'layout'
  | 'navigation'
  | 'content'
  | 'form'
  | 'media'
  | 'interactive'
  | 'utility';

export interface ComponentConfig {
  metadata: ComponentMetadata;
  schema: ComponentSchema;
  implementation: ComponentImplementation;
  dependencies: ComponentDependency[];
  examples: ComponentExample[];
  variants?: ComponentVariant[];
}

export interface ComponentSchema {
  props: PropDefinition[];
  slots?: SlotDefinition[];
  events?: EventDefinition[];
  cssVariables?: CSSVariableDefinition[];
  jsonSchema: JSONSchemaDefinition;
}
```

### 1.2 Property Definitions

```typescript
// src/registry/types/props.ts
export interface PropDefinition {
  name: string;
  type: PropType;
  required: boolean;
  default?: any;
  description: string;
  validation?: ValidationRule[];
  examples?: any[];
  deprecated?: boolean;
}

export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'function'
  | 'date'
  | 'enum'
  | 'union'
  | 'custom';

export interface PropTypeDefinition {
  type: PropType;
  itemType?: PropTypeDefinition; // For arrays
  properties?: Record<string, PropTypeDefinition>; // For objects
  values?: any[]; // For enums
  types?: PropTypeDefinition[]; // For unions
  validator?: string; // Custom validator function name
}

export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message: string;
}

export type ValidationType =
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'email'
  | 'url'
  | 'custom';

// Example implementation
export const BUTTON_PROPS: PropDefinition[] = [
  {
    name: 'variant',
    type: 'enum',
    required: false,
    default: 'primary',
    description: 'Visual style variant',
    validation: [{
      type: 'custom',
      value: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      message: 'Must be one of: primary, secondary, outline, ghost, danger'
    }],
    examples: ['primary', 'secondary', 'outline']
  },
  {
    name: 'size',
    type: 'enum',
    required: false,
    default: 'medium',
    description: 'Button size',
    validation: [{
      type: 'custom',
      value: ['small', 'medium', 'large'],
      message: 'Must be one of: small, medium, large'
    }],
    examples: ['small', 'medium', 'large']
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    default: false,
    description: 'Whether button is disabled',
    examples: [true, false]
  }
];
```

### 1.3 Slot Definitions

```typescript
// src/registry/types/slots.ts
export interface SlotDefinition {
  name: string;
  required: boolean;
  description: string;
  acceptedTypes?: string[]; // Component types that can fill this slot
  fallback?: string; // Default content if slot is empty
  multiple?: boolean; // Can accept multiple items
}

// Example
export const CARD_SLOTS: SlotDefinition[] = [
  {
    name: 'header',
    required: false,
    description: 'Card header content',
    acceptedTypes: ['text', 'heading', 'custom'],
    fallback: undefined,
    multiple: false
  },
  {
    name: 'body',
    required: true,
    description: 'Main card content',
    acceptedTypes: ['any'],
    multiple: true
  },
  {
    name: 'footer',
    required: false,
    description: 'Card footer content (actions, metadata)',
    acceptedTypes: ['button-group', 'text', 'custom'],
    multiple: false
  }
];
```

### 1.4 Event Definitions

```typescript
// src/registry/types/events.ts
export interface EventDefinition {
  name: string;
  description: string;
  payload?: EventPayloadDefinition;
  bubbles?: boolean;
  cancelable?: boolean;
}

export interface EventPayloadDefinition {
  type: 'object' | 'primitive';
  properties?: Record<string, PropTypeDefinition>;
  primitiveType?: 'string' | 'number' | 'boolean';
}

// Example
export const BUTTON_EVENTS: EventDefinition[] = [
  {
    name: 'click',
    description: 'Fired when button is clicked',
    payload: {
      type: 'object',
      properties: {
        originalEvent: {
          type: 'custom',
          validator: 'MouseEvent'
        },
        timestamp: {
          type: 'number'
        }
      }
    },
    bubbles: true,
    cancelable: true
  },
  {
    name: 'focus',
    description: 'Fired when button receives focus',
    bubbles: true,
    cancelable: false
  }
];
```

---

## 2. JSON Schema Definitions

### 2.1 Schema Generator

```typescript
// src/registry/schema/generator.ts
import { JSONSchema7 } from 'json-schema';

export interface JSONSchemaDefinition extends JSONSchema7 {
  $id: string;
  $schema: string;
}

export function generateComponentSchema(config: ComponentConfig): JSONSchemaDefinition {
  const properties: Record<string, JSONSchema7> = {};
  const required: string[] = [];

  config.schema.props.forEach(prop => {
    properties[prop.name] = propToJSONSchema(prop);

    if (prop.required) {
      required.push(prop.name);
    }
  });

  return {
    $id: `https://agentstatic.dev/schemas/${config.metadata.id}.json`,
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: config.metadata.name,
    description: config.metadata.description,
    type: 'object',
    properties,
    required,
    additionalProperties: false
  };
}

function propToJSONSchema(prop: PropDefinition): JSONSchema7 {
  const schema: JSONSchema7 = {
    description: prop.description
  };

  switch (prop.type) {
    case 'string':
      schema.type = 'string';
      break;

    case 'number':
      schema.type = 'number';
      break;

    case 'boolean':
      schema.type = 'boolean';
      break;

    case 'array':
      schema.type = 'array';
      // Add items schema if itemType is defined
      break;

    case 'object':
      schema.type = 'object';
      break;

    case 'enum':
      schema.enum = prop.validation?.find(v => v.type === 'custom')?.value;
      break;
  }

  // Add validation constraints
  prop.validation?.forEach(rule => {
    switch (rule.type) {
      case 'min':
        schema.minimum = rule.value;
        break;
      case 'max':
        schema.maximum = rule.value;
        break;
      case 'minLength':
        schema.minLength = rule.value;
        break;
      case 'maxLength':
        schema.maxLength = rule.value;
        break;
      case 'pattern':
        schema.pattern = rule.value;
        break;
      case 'email':
        schema.format = 'email';
        break;
      case 'url':
        schema.format = 'uri';
        break;
    }
  });

  if (prop.default !== undefined) {
    schema.default = prop.default;
  }

  return schema;
}
```

### 2.2 Schema Examples

```json
// schemas/components/button.json
{
  "$id": "https://agentstatic.dev/schemas/button.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Button Component",
  "description": "Interactive button element with multiple variants",
  "type": "object",
  "properties": {
    "variant": {
      "description": "Visual style variant",
      "enum": ["primary", "secondary", "outline", "ghost", "danger"],
      "default": "primary"
    },
    "size": {
      "description": "Button size",
      "enum": ["small", "medium", "large"],
      "default": "medium"
    },
    "disabled": {
      "description": "Whether button is disabled",
      "type": "boolean",
      "default": false
    },
    "text": {
      "description": "Button text content",
      "type": "string",
      "minLength": 1
    },
    "icon": {
      "description": "Optional icon identifier",
      "type": "string"
    },
    "fullWidth": {
      "description": "Whether button spans full container width",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["text"],
  "additionalProperties": false
}
```

---

## 3. Implementation Schema

### 3.1 Implementation Types

```typescript
// src/registry/types/implementation.ts
export interface ComponentImplementation {
  template: TemplateDefinition;
  styles: StyleDefinition;
  scripts?: ScriptDefinition;
  assets?: AssetDefinition[];
}

export interface TemplateDefinition {
  engine: 'nunjucks' | 'handlebars' | 'ejs';
  path: string;
  source?: string;
  macroName?: string; // For Nunjucks macros
  partials?: string[]; // Template partials used
}

export interface StyleDefinition {
  type: 'scss' | 'css' | 'postcss';
  path: string;
  source?: string;
  variables?: CSSVariableDefinition[];
  dependencies?: string[]; // Other style files imported
}

export interface ScriptDefinition {
  type: 'typescript' | 'javascript';
  path: string;
  source?: string;
  className?: string; // Main class name
  exports?: string[]; // Exported functions/classes
  dependencies?: string[]; // npm packages or local modules
}

export interface AssetDefinition {
  type: 'image' | 'font' | 'icon' | 'video';
  path: string;
  url?: string;
  required: boolean;
}

export interface CSSVariableDefinition {
  name: string;
  description: string;
  default: string;
  type: 'color' | 'size' | 'font' | 'number' | 'string';
  category?: string;
}
```

### 3.2 Example Component Definition

```typescript
// src/registry/components/button.ts
import { ComponentConfig } from '../types/base';

export const ButtonComponent: ComponentConfig = {
  metadata: {
    id: 'button',
    name: 'Button',
    version: '1.0.0',
    category: 'interactive',
    tags: ['form', 'action', 'interactive'],
    description: 'Interactive button component with multiple variants and sizes',
    author: 'AgentStatic',
    created: '2024-11-01T00:00:00Z',
    updated: '2024-11-01T00:00:00Z'
  },

  schema: {
    props: BUTTON_PROPS,
    events: BUTTON_EVENTS,
    cssVariables: [
      {
        name: '--button-padding',
        description: 'Internal button padding',
        default: 'var(--space-sm) var(--space-md)',
        type: 'size',
        category: 'spacing'
      },
      {
        name: '--button-bg',
        description: 'Button background color',
        default: 'var(--color-primary)',
        type: 'color',
        category: 'colors'
      },
      {
        name: '--button-color',
        description: 'Button text color',
        default: 'var(--color-white)',
        type: 'color',
        category: 'colors'
      }
    ],
    jsonSchema: generateComponentSchema({} as any) // Generated at build time
  },

  implementation: {
    template: {
      engine: 'nunjucks',
      path: 'src/components/basic/button/button.njk',
      macroName: 'button'
    },
    styles: {
      type: 'scss',
      path: 'src/styles/components/_button.scss',
      variables: [],
      dependencies: ['src/styles/mixins/_buttons.scss']
    },
    scripts: {
      type: 'typescript',
      path: 'src/components/basic/button/button.ts',
      className: 'ButtonComponent',
      exports: ['ButtonComponent'],
      dependencies: []
    }
  },

  dependencies: [],

  examples: [
    {
      name: 'Primary Button',
      description: 'Standard primary button',
      code: {
        nunjucks: `{{ button({ variant: 'primary', text: 'Click Me' }) }}`,
        json: {
          variant: 'primary',
          text: 'Click Me'
        }
      },
      preview: true
    },
    {
      name: 'Button with Icon',
      description: 'Button with leading icon',
      code: {
        nunjucks: `{{ button({ variant: 'secondary', text: 'Download', icon: 'download' }) }}`,
        json: {
          variant: 'secondary',
          text: 'Download',
          icon: 'download'
        }
      },
      preview: true
    }
  ]
};
```

---

## 4. Dependency Management

### 4.1 Dependency Types

```typescript
// src/registry/types/dependencies.ts
export interface ComponentDependency {
  type: DependencyType;
  id: string;
  version?: string;
  required: boolean;
  fallback?: string; // Alternative component if unavailable
}

export type DependencyType =
  | 'component' // Another component
  | 'style' // CSS/SCSS file
  | 'script' // JS/TS module
  | 'asset' // Image, font, etc.
  | 'npm'; // External npm package

export interface DependencyGraph {
  nodes: Map<string, DependencyNode>;
  edges: Map<string, string[]>; // component ID -> dependency IDs
}

export interface DependencyNode {
  id: string;
  type: DependencyType;
  depth: number; // Distance from root
  circular: boolean;
}
```

### 4.2 Dependency Resolution

```typescript
// src/registry/dependencies/resolver.ts
export class DependencyResolver {
  private graph: DependencyGraph;

  constructor() {
    this.graph = {
      nodes: new Map(),
      edges: new Map()
    };
  }

  public addComponent(config: ComponentConfig): void {
    // Add component node
    this.graph.nodes.set(config.metadata.id, {
      id: config.metadata.id,
      type: 'component',
      depth: 0,
      circular: false
    });

    // Add dependency edges
    const depIds = config.dependencies.map(dep => dep.id);
    this.graph.edges.set(config.metadata.id, depIds);

    // Add dependency nodes
    config.dependencies.forEach(dep => {
      if (!this.graph.nodes.has(dep.id)) {
        this.graph.nodes.set(dep.id, {
          id: dep.id,
          type: dep.type,
          depth: 1,
          circular: false
        });
      }
    });
  }

  public resolve(componentId: string): string[] {
    const resolved: string[] = [];
    const seen = new Set<string>();

    const visit = (id: string, path: string[] = []) => {
      if (seen.has(id)) {
        // Circular dependency detected
        if (path.includes(id)) {
          throw new Error(
            `Circular dependency detected: ${[...path, id].join(' -> ')}`
          );
        }
        return;
      }

      seen.add(id);
      const deps = this.graph.edges.get(id) || [];

      deps.forEach(depId => {
        visit(depId, [...path, id]);
      });

      if (!resolved.includes(id)) {
        resolved.push(id);
      }
    };

    visit(componentId);
    return resolved;
  }

  public detectCircular(): string[][] {
    const cycles: string[][] = [];

    this.graph.nodes.forEach((_, id) => {
      const visited = new Set<string>();
      const recursionStack = new Set<string>();

      const dfs = (nodeId: string, path: string[]): void => {
        visited.add(nodeId);
        recursionStack.add(nodeId);

        const deps = this.graph.edges.get(nodeId) || [];

        deps.forEach(depId => {
          if (!visited.has(depId)) {
            dfs(depId, [...path, nodeId]);
          } else if (recursionStack.has(depId)) {
            cycles.push([...path, nodeId, depId]);
          }
        });

        recursionStack.delete(nodeId);
      };

      if (!visited.has(id)) {
        dfs(id, []);
      }
    });

    return cycles;
  }

  public getLoadOrder(componentIds: string[]): string[] {
    const allDeps = new Set<string>();

    componentIds.forEach(id => {
      this.resolve(id).forEach(dep => allDeps.add(dep));
    });

    // Topological sort
    const sorted: string[] = [];
    const visited = new Set<string>();
    const temp = new Set<string>();

    const visit = (id: string) => {
      if (temp.has(id)) {
        throw new Error(`Circular dependency involving ${id}`);
      }
      if (visited.has(id)) return;

      temp.add(id);

      const deps = this.graph.edges.get(id) || [];
      deps.forEach(depId => visit(depId));

      temp.delete(id);
      visited.add(id);
      sorted.push(id);
    };

    allDeps.forEach(id => visit(id));

    return sorted;
  }
}
```

---

## 5. Variant System

### 5.1 Variant Definitions

```typescript
// src/registry/types/variants.ts
export interface ComponentVariant {
  name: string;
  description: string;
  modifiedProps?: Partial<Record<string, any>>;
  additionalProps?: PropDefinition[];
  cssModifier?: string; // BEM modifier class
  example?: ComponentExample;
}

export interface ComponentExample {
  name: string;
  description: string;
  code: {
    nunjucks?: string;
    html?: string;
    json: any;
  };
  preview?: boolean;
  category?: 'basic' | 'advanced' | 'edge-case';
}

// Example variant definitions
export const BUTTON_VARIANTS: ComponentVariant[] = [
  {
    name: 'Icon Button',
    description: 'Button with only an icon, no text',
    modifiedProps: {
      text: undefined,
      icon: 'required'
    },
    additionalProps: [
      {
        name: 'ariaLabel',
        type: 'string',
        required: true,
        description: 'Accessible label for icon-only button',
        examples: ['Close', 'Menu', 'Search']
      }
    ],
    cssModifier: 'icon-only',
    example: {
      name: 'Icon Button Example',
      description: 'Close button with icon only',
      code: {
        nunjucks: `{{ button({ icon: 'close', ariaLabel: 'Close', variant: 'ghost' }) }}`,
        json: {
          icon: 'close',
          ariaLabel: 'Close',
          variant: 'ghost'
        }
      },
      preview: true
    }
  }
];
```

---

## 6. Validation System

### 6.1 Schema Validator

```typescript
// src/registry/validation/validator.ts
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export class ComponentValidator {
  private ajv: Ajv;
  private validators: Map<string, ValidateFunction> = new Map();

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false
    });

    addFormats(this.ajv);
  }

  public registerSchema(id: string, schema: JSONSchemaDefinition): void {
    this.ajv.addSchema(schema, id);
    const validator = this.ajv.getSchema(id);

    if (validator) {
      this.validators.set(id, validator);
    }
  }

  public validate(componentId: string, data: any): ValidationResult {
    const validator = this.validators.get(componentId);

    if (!validator) {
      return {
        valid: false,
        errors: [{
          message: `No validator found for component: ${componentId}`,
          path: '',
          type: 'schema-not-found'
        }]
      };
    }

    const valid = validator(data);

    if (valid) {
      return { valid: true, errors: [] };
    }

    return {
      valid: false,
      errors: (validator.errors || []).map(err => ({
        message: err.message || 'Validation error',
        path: err.instancePath,
        type: err.keyword || 'unknown',
        params: err.params
      }))
    };
  }

  public validateAll(components: Map<string, any>): Map<string, ValidationResult> {
    const results = new Map<string, ValidationResult>();

    components.forEach((data, id) => {
      results.set(id, this.validate(id, data));
    });

    return results;
  }
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  message: string;
  path: string;
  type: string;
  params?: any;
}
```

---

## 7. Testing

### 7.1 Schema Tests

```typescript
// src/tests/registry/schema.test.ts
import { describe, it, expect } from 'vitest';
import { generateComponentSchema, ComponentValidator } from '@/registry';

describe('Component Schema Generation', () => {
  it('generates valid JSON schema from component config', () => {
    const schema = generateComponentSchema(ButtonComponent);

    expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(schema.type).toBe('object');
    expect(schema.properties).toBeDefined();
    expect(schema.required).toContain('text');
  });

  it('includes validation rules in schema', () => {
    const schema = generateComponentSchema(ButtonComponent);

    expect(schema.properties?.variant).toHaveProperty('enum');
    expect(schema.properties?.variant.enum).toContain('primary');
  });
});

describe('Component Validation', () => {
  const validator = new ComponentValidator();

  beforeEach(() => {
    const schema = generateComponentSchema(ButtonComponent);
    validator.registerSchema('button', schema);
  });

  it('validates correct component data', () => {
    const result = validator.validate('button', {
      variant: 'primary',
      size: 'medium',
      text: 'Click Me'
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects invalid variant', () => {
    const result = validator.validate('button', {
      variant: 'invalid',
      text: 'Click Me'
    });

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].type).toBe('enum');
  });

  it('requires text property', () => {
    const result = validator.validate('button', {
      variant: 'primary'
    });

    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.path.includes('text'))).toBe(true);
  });
});
```

---

## 8. Documentation

### 8.1 Type System Documentation

```markdown
# Component Schema System

## Overview
The schema system provides type-safe component definitions with comprehensive
validation, dependency management, and variant support.

## Core Concepts

### Component Configuration
Every component is defined by a `ComponentConfig` object containing:
- **Metadata**: ID, name, version, category, tags
- **Schema**: Props, slots, events, CSS variables
- **Implementation**: Template, styles, scripts, assets
- **Dependencies**: Required components and resources
- **Examples**: Usage examples with code snippets

### Property Definitions
Props are strongly typed with validation rules:

```typescript
{
  name: 'variant',
  type: 'enum',
  required: false,
  default: 'primary',
  validation: [{
    type: 'custom',
    value: ['primary', 'secondary'],
    message: 'Invalid variant'
  }]
}
```

### JSON Schema Generation
Schemas are automatically generated from TypeScript definitions and can be
used for:
- Runtime validation
- Editor autocomplete
- Documentation generation
- AI tool integration

## Dependency Management

### Dependency Types
- `component`: Other UI components
- `style`: CSS/SCSS files
- `script`: JavaScript/TypeScript modules
- `asset`: Images, fonts, icons
- `npm`: External packages

### Resolution Algorithm
Dependencies are resolved in topological order with circular dependency
detection.

## Validation

### Runtime Validation
```typescript
const validator = new ComponentValidator();
validator.registerSchema('button', buttonSchema);

const result = validator.validate('button', {
  variant: 'primary',
  text: 'Click Me'
});
```

### Build-time Validation
All component configurations are validated during the build process to
catch errors early.
```

---

## Deliverables Checklist

### Phase 1 Completed Items

- [x] Base type definitions
- [x] Property schema system
- [x] Slot definitions
- [x] Event definitions
- [x] JSON Schema generator
- [x] Implementation schema
- [x] Dependency resolver
- [x] Variant system
- [x] Validation framework
- [x] Schema tests
- [x] Documentation

### Success Metrics

- [ ] All component types defined
- [ ] JSON schemas validate correctly
- [ ] Dependency resolution handles circular deps
- [ ] Validation catches all error cases
- [ ] TypeScript types are sound
- [ ] Test coverage > 90%
