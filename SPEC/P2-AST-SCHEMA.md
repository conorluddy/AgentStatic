# AST Schema Specification

**Complete Abstract Syntax Tree Type Definitions and Transformation Rules**

This document defines the complete AST (Abstract Syntax Tree) schema used by AgentStatic for representing component compositions, including all node types, transformation rules, and composition examples.

---

## Core AST Node Types

### Base Node Interface
```typescript
interface ASTNode {
  // Node type discriminator
  type: 'page' | 'component' | 'slot' | 'text' | 'fragment';

  // Optional unique identifier
  id?: string;

  // Source location for error reporting
  location?: SourceLocation;

  // Metadata for tooling
  metadata?: NodeMetadata;

  // Child nodes (for container types)
  children?: ASTNode[];
}

interface SourceLocation {
  file?: string;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
}

interface NodeMetadata {
  // Original JSON path (for debugging)
  sourcePath?: string;

  // Component registry reference
  componentRef?: string;

  // Validation state
  validated?: boolean;

  // Performance hints
  renderCost?: number;

  // User-defined metadata
  custom?: Record<string, any>;
}
```

### Page Node
```typescript
interface PageNode extends ASTNode {
  type: 'page';

  // Page metadata
  title: string;
  description?: string;
  path: string;
  layout?: string;

  // SEO metadata
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
  };

  // Page sections (children)
  children: ASTNode[];

  // Page-level configuration
  config?: {
    cssBundle?: string;
    jsBundle?: string;
    criticalCSS?: boolean;
  };
}
```

### Component Node
```typescript
interface ComponentNode extends ASTNode {
  type: 'component';

  // Component identifier (e.g., "atoms/button", "organisms/hero")
  componentId: string;

  // Optional variant
  variant?: string;

  // Component props
  props: Record<string, any>;

  // Named slots
  slots?: Record<string, SlotContent>;

  // Render hints
  renderHints?: {
    lazy?: boolean;
    priority?: 'high' | 'normal' | 'low';
    placeholder?: boolean;
  };
}

// Slot content can be single node or array
type SlotContent = ASTNode | ASTNode[];
```

### Slot Node
```typescript
interface SlotNode extends ASTNode {
  type: 'slot';

  // Slot name (matches component's slot definition)
  name: string;

  // Slot content
  content: ASTNode | ASTNode[];

  // Slot-specific configuration
  config?: {
    required?: boolean;
    maxItems?: number;
    minItems?: number;
    allowedTypes?: NodeType[];
  };
}

type NodeType = 'component' | 'text' | 'fragment';
```

### Text Node
```typescript
interface TextNode extends ASTNode {
  type: 'text';

  // Text content
  content: string;

  // Text processing options
  options?: {
    markdown?: boolean;
    escape?: boolean;
    trim?: boolean;
  };

  // Filters to apply
  filters?: TextFilter[];
}

interface TextFilter {
  name: 'truncate' | 'uppercase' | 'lowercase' | 'capitalize' | 'markdown';
  args?: any[];
}
```

### Fragment Node
```typescript
interface FragmentNode extends ASTNode {
  type: 'fragment';

  // Collection of nodes without wrapper
  children: ASTNode[];

  // Fragment metadata
  metadata?: {
    comment?: string;
    conditional?: string;
  };
}
```

---

## Transformation Rules

### JSON to AST Transformation

#### Page JSON Structure
```json
{
  "path": "/landing",
  "title": "Landing Page",
  "description": "Welcome to our product",
  "layout": "default",
  "sections": [
    {
      "component": "organisms/hero",
      "props": {
        "heading": "Build Better Websites",
        "subheading": "With our component library"
      },
      "slots": {
        "actions": [
          {
            "component": "atoms/button",
            "props": {
              "text": "Get Started",
              "variant": "primary"
            }
          }
        ]
      }
    }
  ]
}
```

#### Transformation Process
```typescript
class JSONToASTTransformer {
  transform(pageJson: PageJSON): PageNode {
    // Validate JSON schema
    this.validatePageJSON(pageJson);

    // Create page node
    const pageNode: PageNode = {
      type: 'page',
      path: pageJson.path,
      title: pageJson.title,
      description: pageJson.description,
      layout: pageJson.layout || 'default',
      children: [],
      location: {
        file: pageJson.__source,
        line: 1
      }
    };

    // Transform sections into children
    for (const section of pageJson.sections) {
      const sectionNode = this.transformSection(section);
      pageNode.children.push(sectionNode);
    }

    // Add SEO metadata if present
    if (pageJson.seo) {
      pageNode.seo = pageJson.seo;
    }

    return pageNode;
  }

  private transformSection(section: any): ComponentNode {
    // Handle component definition
    if (section.component) {
      return this.transformComponent(section);
    }

    // Handle raw text
    if (typeof section === 'string') {
      return this.transformText(section);
    }

    // Handle fragment
    if (Array.isArray(section)) {
      return this.transformFragment(section);
    }

    throw new TransformError(`Invalid section type: ${typeof section}`);
  }

  private transformComponent(definition: any): ComponentNode {
    const node: ComponentNode = {
      type: 'component',
      componentId: definition.component,
      props: definition.props || {},
      location: this.getLocation(definition)
    };

    // Add variant if specified
    if (definition.variant) {
      node.variant = definition.variant;
    }

    // Transform slots
    if (definition.slots) {
      node.slots = {};

      for (const [slotName, slotContent] of Object.entries(definition.slots)) {
        node.slots[slotName] = this.transformSlotContent(slotContent);
      }
    }

    // Add render hints
    if (definition.lazy || definition.priority) {
      node.renderHints = {
        lazy: definition.lazy,
        priority: definition.priority
      };
    }

    return node;
  }

  private transformSlotContent(content: any): ASTNode | ASTNode[] {
    // Array of content
    if (Array.isArray(content)) {
      return content.map(item => this.transformSection(item));
    }

    // Single item
    return this.transformSection(content);
  }

  private transformText(text: string): TextNode {
    return {
      type: 'text',
      content: text,
      options: {
        escape: true,
        trim: true
      }
    };
  }

  private transformFragment(items: any[]): FragmentNode {
    return {
      type: 'fragment',
      children: items.map(item => this.transformSection(item))
    };
  }
}
```

### AST Validation Rules

#### Structural Validation
```typescript
class ASTValidator {
  validate(ast: ASTNode): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate node structure
    this.validateNode(ast, errors);

    // Validate relationships
    this.validateRelationships(ast, errors);

    // Validate constraints
    this.validateConstraints(ast, errors);

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private validateNode(node: ASTNode, errors: ValidationError[]): void {
    // Check required properties
    if (!node.type) {
      errors.push({
        message: 'Node missing required "type" property',
        location: node.location
      });
    }

    // Type-specific validation
    switch (node.type) {
      case 'component':
        this.validateComponentNode(node as ComponentNode, errors);
        break;

      case 'slot':
        this.validateSlotNode(node as SlotNode, errors);
        break;

      case 'text':
        this.validateTextNode(node as TextNode, errors);
        break;

      case 'page':
        this.validatePageNode(node as PageNode, errors);
        break;
    }

    // Recursively validate children
    if (node.children) {
      for (const child of node.children) {
        this.validateNode(child, errors);
      }
    }
  }

  private validateComponentNode(
    node: ComponentNode,
    errors: ValidationError[]
  ): void {
    // Component ID required
    if (!node.componentId) {
      errors.push({
        message: 'Component node missing "componentId"',
        location: node.location
      });
    }

    // Validate component ID format
    if (!this.isValidComponentId(node.componentId)) {
      errors.push({
        message: `Invalid component ID format: ${node.componentId}`,
        location: node.location
      });
    }

    // Validate props are object
    if (node.props && typeof node.props !== 'object') {
      errors.push({
        message: 'Component props must be an object',
        location: node.location
      });
    }

    // Validate slots
    if (node.slots) {
      for (const [slotName, content] of Object.entries(node.slots)) {
        this.validateSlotContent(content, slotName, errors);
      }
    }
  }

  private isValidComponentId(id: string): boolean {
    // Format: category/component-name
    return /^(atoms|molecules|organisms)\/[a-z][a-z0-9-]*$/.test(id);
  }

  private validateRelationships(node: ASTNode, errors: ValidationError[]): void {
    // Check nesting rules
    this.checkNestingRules(node, errors);

    // Check slot relationships
    this.checkSlotRelationships(node, errors);
  }

  private checkNestingRules(
    node: ASTNode,
    errors: ValidationError[],
    parent?: ASTNode
  ): void {
    if (node.type === 'component' && parent?.type === 'component') {
      const childCategory = this.getCategory(node.componentId);
      const parentCategory = this.getCategory(parent.componentId);

      // Atoms shouldn't contain molecules or organisms
      if (parentCategory === 'atoms' && childCategory !== 'atoms') {
        errors.push({
          message: `Atom component cannot contain ${childCategory}`,
          location: node.location
        });
      }
    }

    // Check children recursively
    if (node.children) {
      for (const child of node.children) {
        this.checkNestingRules(child, errors, node);
      }
    }
  }
}
```

### AST to Render Context Transformation

```typescript
class ASTToContextTransformer {
  transform(ast: PageNode, config: BuildConfig): RenderContext {
    return {
      page: this.extractPageContext(ast),
      components: this.gatherComponents(ast),
      slots: this.prepareSlots(ast),
      data: this.extractData(ast),
      config
    };
  }

  private extractPageContext(page: PageNode): PageContext {
    return {
      title: page.title,
      description: page.description,
      path: page.path,
      layout: page.layout || 'default',
      seo: page.seo || {},
      metadata: page.metadata || {}
    };
  }

  private gatherComponents(ast: ASTNode): ComponentMap {
    const components = new Map<string, ComponentInstance[]>();

    this.traverse(ast, (node) => {
      if (node.type === 'component') {
        const componentNode = node as ComponentNode;
        const instances = components.get(componentNode.componentId) || [];

        instances.push({
          id: node.id || this.generateId(),
          props: componentNode.props,
          slots: componentNode.slots || {},
          variant: componentNode.variant
        });

        components.set(componentNode.componentId, instances);
      }
    });

    return components;
  }

  private prepareSlots(ast: ASTNode): Map<string, PreparedSlot> {
    const slots = new Map<string, PreparedSlot>();

    this.traverse(ast, (node) => {
      if (node.type === 'component') {
        const componentNode = node as ComponentNode;

        if (componentNode.slots) {
          for (const [slotName, content] of Object.entries(componentNode.slots)) {
            const slotId = `${node.id || 'unknown'}.${slotName}`;

            slots.set(slotId, {
              name: slotName,
              content: this.prepareSlotContent(content),
              parentComponent: componentNode.componentId
            });
          }
        }
      }
    });

    return slots;
  }

  private prepareSlotContent(content: ASTNode | ASTNode[]): PreparedContent {
    if (Array.isArray(content)) {
      return {
        type: 'multiple',
        nodes: content.map(node => this.prepareNode(node))
      };
    }

    return {
      type: 'single',
      node: this.prepareNode(content)
    };
  }

  private prepareNode(node: ASTNode): PreparedNode {
    return {
      ...node,
      rendered: false,
      renderOrder: this.calculateRenderOrder(node)
    };
  }

  private traverse(
    node: ASTNode,
    callback: (node: ASTNode) => void
  ): void {
    callback(node);

    if (node.children) {
      for (const child of node.children) {
        this.traverse(child, callback);
      }
    }

    if (node.type === 'component') {
      const componentNode = node as ComponentNode;

      if (componentNode.slots) {
        for (const content of Object.values(componentNode.slots)) {
          const nodes = Array.isArray(content) ? content : [content];
          nodes.forEach(n => this.traverse(n, callback));
        }
      }
    }
  }
}
```

---

## Complex Composition Examples

### Example 1: Hero with Nested Card Grid
```json
{
  "component": "organisms/hero",
  "props": {
    "heading": "Our Products",
    "subheading": "Choose the perfect solution for your needs"
  },
  "slots": {
    "content": [
      {
        "component": "organisms/feature-grid",
        "props": {
          "columns": 3
        },
        "slots": {
          "features": [
            {
              "component": "molecules/card",
              "props": {
                "title": "Starter Plan",
                "description": "Perfect for small projects"
              },
              "slots": {
                "actions": {
                  "component": "atoms/button",
                  "props": {
                    "text": "Choose Plan",
                    "variant": "primary"
                  }
                }
              }
            },
            {
              "component": "molecules/card",
              "props": {
                "title": "Professional",
                "description": "For growing businesses"
              },
              "slots": {
                "actions": {
                  "component": "atoms/button",
                  "props": {
                    "text": "Choose Plan",
                    "variant": "secondary"
                  }
                }
              }
            }
          ]
        }
      }
    ]
  }
}
```

#### Resulting AST
```typescript
const heroAST: ComponentNode = {
  type: 'component',
  componentId: 'organisms/hero',
  props: {
    heading: 'Our Products',
    subheading: 'Choose the perfect solution for your needs'
  },
  slots: {
    content: [
      {
        type: 'component',
        componentId: 'organisms/feature-grid',
        props: { columns: 3 },
        slots: {
          features: [
            {
              type: 'component',
              componentId: 'molecules/card',
              props: {
                title: 'Starter Plan',
                description: 'Perfect for small projects'
              },
              slots: {
                actions: {
                  type: 'component',
                  componentId: 'atoms/button',
                  props: {
                    text: 'Choose Plan',
                    variant: 'primary'
                  }
                }
              }
            },
            // Second card...
          ]
        }
      }
    ]
  }
};
```

### Example 2: Mixed Content Types
```json
{
  "component": "molecules/content-section",
  "slots": {
    "content": [
      {
        "type": "text",
        "content": "Welcome to our platform where you can:",
        "options": { "markdown": false }
      },
      {
        "component": "molecules/feature-list",
        "props": {
          "items": [
            "Build faster",
            "Ship with confidence",
            "Scale effortlessly"
          ]
        }
      },
      {
        "type": "text",
        "content": "**Start your free trial today!**",
        "options": { "markdown": true }
      },
      {
        "component": "atoms/button",
        "props": {
          "text": "Start Free Trial",
          "variant": "primary",
          "size": "lg"
        }
      }
    ]
  }
}
```

### Example 3: Conditional Rendering
```json
{
  "component": "organisms/pricing-section",
  "props": {
    "title": "Choose Your Plan"
  },
  "slots": {
    "plans": {
      "type": "fragment",
      "metadata": {
        "comment": "Pricing cards rendered conditionally based on user segment"
      },
      "children": [
        {
          "component": "molecules/pricing-card",
          "props": {
            "name": "Starter",
            "price": "$9/mo",
            "features": ["10 Projects", "1GB Storage"]
          },
          "metadata": {
            "conditional": "userType !== 'enterprise'"
          }
        },
        {
          "component": "molecules/pricing-card",
          "props": {
            "name": "Enterprise",
            "price": "Custom",
            "features": ["Unlimited Projects", "Unlimited Storage", "Priority Support"]
          },
          "metadata": {
            "conditional": "userType === 'enterprise'"
          }
        }
      ]
    }
  }
}
```

---

## Relationship Rules

### Component Containment Rules
```typescript
const CONTAINMENT_RULES: ContainmentRule[] = [
  {
    // Atoms can only contain other atoms or text
    parent: /^atoms\//,
    allowedChildren: ['atoms/*', 'text']
  },
  {
    // Molecules can contain atoms and other molecules
    parent: /^molecules\//,
    allowedChildren: ['atoms/*', 'molecules/*', 'text']
  },
  {
    // Organisms can contain anything
    parent: /^organisms\//,
    allowedChildren: ['atoms/*', 'molecules/*', 'organisms/*', 'text']
  },
  {
    // Special case: navigation can't contain another navigation
    parent: 'molecules/navigation',
    forbiddenChildren: ['molecules/navigation']
  },
  {
    // Special case: footer can't contain hero
    parent: 'organisms/footer',
    forbiddenChildren: ['organisms/hero']
  }
];
```

### Nesting Depth Limits
```typescript
const NESTING_LIMITS = {
  // Maximum depth for component nesting
  maxComponentDepth: 10,

  // Maximum depth for slot nesting
  maxSlotDepth: 5,

  // Maximum number of components per page
  maxComponentsPerPage: 100,

  // Maximum slots per component
  maxSlotsPerComponent: 10,

  // Maximum items in array slots
  maxSlotArrayLength: 50
};
```

### Slot Cardinality Constraints
```typescript
interface SlotConstraints {
  [componentId: string]: {
    [slotName: string]: {
      required?: boolean;
      minItems?: number;
      maxItems?: number;
      allowedTypes?: NodeType[];
      allowedComponents?: string[];
    };
  };
}

const SLOT_CONSTRAINTS: SlotConstraints = {
  'organisms/hero': {
    heading: {
      required: true,
      allowedTypes: ['text']
    },
    actions: {
      maxItems: 2,
      allowedComponents: ['atoms/button']
    },
    content: {
      maxItems: 1,
      allowedTypes: ['component', 'text']
    }
  },

  'molecules/card': {
    title: {
      required: true,
      allowedTypes: ['text']
    },
    content: {
      required: true,
      allowedTypes: ['text', 'component']
    },
    actions: {
      maxItems: 2,
      allowedComponents: ['atoms/button', 'atoms/link']
    }
  },

  'organisms/feature-grid': {
    features: {
      required: true,
      minItems: 2,
      maxItems: 12,
      allowedComponents: ['molecules/card', 'molecules/feature-card']
    }
  }
};
```

---

## AST Traversal and Manipulation

### Traversal Utilities
```typescript
class ASTTraverser {
  // Depth-first traversal
  traverse(
    node: ASTNode,
    visitor: NodeVisitor,
    context?: TraversalContext
  ): void {
    const ctx = context || { depth: 0, path: [] };

    // Enter node
    if (visitor.enter) {
      visitor.enter(node, ctx);
    }

    // Visit children
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        this.traverse(node.children[i], visitor, {
          depth: ctx.depth + 1,
          path: [...ctx.path, `children[${i}]`]
        });
      }
    }

    // Visit component slots
    if (node.type === 'component') {
      const componentNode = node as ComponentNode;

      if (componentNode.slots) {
        for (const [slotName, content] of Object.entries(componentNode.slots)) {
          const nodes = Array.isArray(content) ? content : [content];

          nodes.forEach((slotNode, index) => {
            this.traverse(slotNode, visitor, {
              depth: ctx.depth + 1,
              path: [...ctx.path, `slots.${slotName}[${index}]`]
            });
          });
        }
      }
    }

    // Exit node
    if (visitor.exit) {
      visitor.exit(node, ctx);
    }
  }

  // Find nodes matching predicate
  find(
    node: ASTNode,
    predicate: (node: ASTNode) => boolean
  ): ASTNode[] {
    const matches: ASTNode[] = [];

    this.traverse(node, {
      enter: (n) => {
        if (predicate(n)) {
          matches.push(n);
        }
      }
    });

    return matches;
  }

  // Transform AST
  transform(
    node: ASTNode,
    transformer: NodeTransformer
  ): ASTNode {
    return this.transformNode(node, transformer);
  }

  private transformNode(
    node: ASTNode,
    transformer: NodeTransformer
  ): ASTNode {
    // Transform current node
    let transformed = transformer(node) || node;

    // Transform children
    if (transformed.children) {
      transformed = {
        ...transformed,
        children: transformed.children.map(child =>
          this.transformNode(child, transformer)
        )
      };
    }

    // Transform slots
    if (transformed.type === 'component') {
      const componentNode = transformed as ComponentNode;

      if (componentNode.slots) {
        const transformedSlots: Record<string, ASTNode | ASTNode[]> = {};

        for (const [slotName, content] of Object.entries(componentNode.slots)) {
          if (Array.isArray(content)) {
            transformedSlots[slotName] = content.map(n =>
              this.transformNode(n, transformer)
            );
          } else {
            transformedSlots[slotName] = this.transformNode(content, transformer);
          }
        }

        transformed = {
          ...componentNode,
          slots: transformedSlots
        };
      }
    }

    return transformed;
  }
}

interface NodeVisitor {
  enter?: (node: ASTNode, context: TraversalContext) => void;
  exit?: (node: ASTNode, context: TraversalContext) => void;
}

interface TraversalContext {
  depth: number;
  path: string[];
}

type NodeTransformer = (node: ASTNode) => ASTNode | null;
```

---

## Serialization and Deserialization

### AST to JSON
```typescript
class ASTSerializer {
  serialize(ast: ASTNode): string {
    return JSON.stringify(this.toJSON(ast), null, 2);
  }

  private toJSON(node: ASTNode): any {
    const json: any = {
      type: node.type
    };

    // Add type-specific properties
    switch (node.type) {
      case 'component':
        const component = node as ComponentNode;
        json.component = component.componentId;
        json.props = component.props;

        if (component.variant) {
          json.variant = component.variant;
        }

        if (component.slots) {
          json.slots = {};
          for (const [name, content] of Object.entries(component.slots)) {
            json.slots[name] = Array.isArray(content)
              ? content.map(n => this.toJSON(n))
              : this.toJSON(content);
          }
        }
        break;

      case 'text':
        const text = node as TextNode;
        json.content = text.content;

        if (text.options) {
          json.options = text.options;
        }
        break;

      case 'page':
        const page = node as PageNode;
        json.title = page.title;
        json.path = page.path;
        json.sections = page.children?.map(c => this.toJSON(c)) || [];
        break;
    }

    return json;
  }
}
```

### JSON to AST
```typescript
class ASTDeserializer {
  deserialize(json: string): ASTNode {
    const parsed = JSON.parse(json);
    return this.fromJSON(parsed);
  }

  private fromJSON(json: any): ASTNode {
    // Already covered in JSONToASTTransformer
    return new JSONToASTTransformer().transform(json);
  }
}
```

---

## Validation and Error Reporting

### Validation Error Types
```typescript
enum ValidationErrorType {
  // Structural errors
  INVALID_NODE_TYPE = 'INVALID_NODE_TYPE',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_CHILD_TYPE = 'INVALID_CHILD_TYPE',

  // Semantic errors
  COMPONENT_NOT_FOUND = 'COMPONENT_NOT_FOUND',
  INVALID_PROP_TYPE = 'INVALID_PROP_TYPE',
  INVALID_SLOT_CONTENT = 'INVALID_SLOT_CONTENT',

  // Constraint violations
  MAX_DEPTH_EXCEEDED = 'MAX_DEPTH_EXCEEDED',
  MAX_COMPONENTS_EXCEEDED = 'MAX_COMPONENTS_EXCEEDED',
  CIRCULAR_REFERENCE = 'CIRCULAR_REFERENCE',

  // Relationship errors
  INVALID_NESTING = 'INVALID_NESTING',
  INCOMPATIBLE_COMPONENTS = 'INCOMPATIBLE_COMPONENTS'
}

interface ValidationError {
  type: ValidationErrorType;
  message: string;
  path: string[];
  location?: SourceLocation;
  suggestion?: string;
}
```

### Error Reporter
```typescript
class ValidationErrorReporter {
  report(errors: ValidationError[]): string {
    if (errors.length === 0) {
      return 'No validation errors';
    }

    const grouped = this.groupByType(errors);
    const report: string[] = [];

    report.push(`Found ${errors.length} validation errors:\n`);

    for (const [type, typeErrors] of grouped) {
      report.push(`\n${type} (${typeErrors.length} errors):`);

      for (const error of typeErrors) {
        report.push(this.formatError(error));
      }
    }

    return report.join('\n');
  }

  private formatError(error: ValidationError): string {
    const parts: string[] = [];

    // Location
    if (error.location) {
      parts.push(`  [${error.location.file}:${error.location.line}:${error.location.column}]`);
    }

    // Path
    if (error.path.length > 0) {
      parts.push(`  Path: ${error.path.join(' > ')}`);
    }

    // Message
    parts.push(`  Error: ${error.message}`);

    // Suggestion
    if (error.suggestion) {
      parts.push(`  Suggestion: ${error.suggestion}`);
    }

    return parts.join('\n');
  }

  private groupByType(
    errors: ValidationError[]
  ): Map<ValidationErrorType, ValidationError[]> {
    const grouped = new Map<ValidationErrorType, ValidationError[]>();

    for (const error of errors) {
      const group = grouped.get(error.type) || [];
      group.push(error);
      grouped.set(error.type, group);
    }

    return grouped;
  }
}
```

---

*This specification defines the complete AST schema for AgentStatic. All AST operations must conform to these type definitions and validation rules.*