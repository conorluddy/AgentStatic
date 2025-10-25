# Phase 1: MCP Tools Implementation

## Overview

This phase implements the Model Context Protocol (MCP) server that exposes AgentStatic's component registry and composition capabilities to AI agents via standardized tools. The MCP server provides 5 core tools that enable AI agents to discover, compose, validate, and optimize static page compositions.

## Goals

1. Set up MCP server infrastructure
2. Implement all 5 MCP tools with comprehensive documentation
3. Create tool orchestration and error handling
4. Build testing framework for MCP tools
5. Optimize for token efficiency and context management

## Technical Specification

### MCP Server Setup

```typescript
// src/mcp/server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';

export class AgentStaticMCPServer {
  private server: Server;
  private tools: Map<string, MCPTool>;

  constructor(
    private registry: ComponentRegistry,
    private composer: PageComposer,
    private validator: CompositionValidator
  ) {
    this.server = new Server(
      {
        name: 'agentstatic',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.tools = new Map();
    this.registerTools();
    this.setupHandlers();
  }

  /**
   * Register all MCP tools
   */
  private registerTools(): void {
    this.registerTool(new DiscoverComponentsTool(this.registry));
    this.registerTool(new GetComponentDetailsTool(this.registry));
    this.registerTool(new ComposePageTool(this.composer));
    this.registerTool(new ValidateCompositionTool(this.validator));
    this.registerTool(new SuggestNextComponentsTool(this.registry));
  }

  /**
   * Register single tool
   */
  private registerTool(tool: MCPTool): void {
    this.tools.set(tool.name, tool);
  }

  /**
   * Setup request handlers
   */
  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: Array.from(this.tools.values()).map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        }))
      })
    );

    // Execute tool
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const tool = this.tools.get(request.params.name);

        if (!tool) {
          throw new Error(`Unknown tool: ${request.params.name}`);
        }

        try {
          const result = await tool.execute(request.params.arguments);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2)
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  error: error.message,
                  tool: request.params.name,
                  arguments: request.params.arguments
                }, null, 2)
              }
            ],
            isError: true
          };
        }
      }
    );
  }

  /**
   * Start MCP server
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('AgentStatic MCP server running');
  }
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: object;
  execute(args: any): Promise<any>;
}
```

### Tool 1: Discover Components

```typescript
// src/mcp/tools/discover-components.ts
import { ComponentRegistry } from '../../registry';
import { SearchAlgorithm } from '../algorithms/search';

export class DiscoverComponentsTool implements MCPTool {
  name = 'discover_components';
  description = 'Search and discover available components in the registry';

  inputSchema = {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Natural language search query (e.g., "hero section", "pricing cards")'
      },
      category: {
        type: 'string',
        description: 'Filter by category (layout, content, navigation, etc.)',
        enum: ['layout', 'content', 'navigation', 'media', 'form', 'data']
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Filter by tags'
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results (default: 10)',
        default: 10
      }
    }
  };

  constructor(
    private registry: ComponentRegistry,
    private searchAlgo: SearchAlgorithm
  ) {}

  async execute(args: DiscoverComponentsArgs): Promise<DiscoverComponentsResult> {
    const {
      query,
      category,
      tags = [],
      limit = 10
    } = args;

    // Get all components from registry
    const allComponents = await this.registry.getAllComponents();

    // Apply filters
    let filtered = allComponents;

    if (category) {
      filtered = filtered.filter(c => c.category === category);
    }

    if (tags.length > 0) {
      filtered = filtered.filter(c =>
        tags.some(tag => c.tags?.includes(tag))
      );
    }

    // Apply semantic search if query provided
    let ranked = filtered;
    if (query) {
      ranked = await this.searchAlgo.search(query, filtered);
    }

    // Limit results
    const results = ranked.slice(0, limit);

    // Format for AI consumption
    return {
      total: filtered.length,
      returned: results.length,
      components: results.map(c => ({
        name: c.name,
        description: c.description,
        category: c.category,
        tags: c.tags || [],
        // Include usage example
        example: this.generateExample(c),
        // Compatibility info
        slots: Object.keys(c.slots || {}),
        requiredProps: this.getRequiredProps(c)
      })),
      // Suggest refinements if too many results
      suggestions: filtered.length > limit
        ? this.generateSearchSuggestions(filtered)
        : undefined
    };
  }

  /**
   * Generate usage example
   */
  private generateExample(component: ComponentDefinition): string {
    return JSON.stringify({
      component: component.name,
      props: this.getExampleProps(component),
      slots: this.getExampleSlots(component)
    }, null, 2);
  }

  /**
   * Get required props
   */
  private getRequiredProps(component: ComponentDefinition): string[] {
    if (!component.schema?.props) return [];

    return Object.entries(component.schema.props)
      .filter(([_, schema]) => schema.required)
      .map(([name]) => name);
  }

  /**
   * Get example props
   */
  private getExampleProps(component: ComponentDefinition): Record<string, any> {
    const props: Record<string, any> = {};

    for (const [name, schema] of Object.entries(component.schema?.props || {})) {
      if (schema.example !== undefined) {
        props[name] = schema.example;
      } else if (schema.default !== undefined) {
        props[name] = schema.default;
      }
    }

    return props;
  }

  /**
   * Get example slots
   */
  private getExampleSlots(component: ComponentDefinition): Record<string, any> {
    const slots: Record<string, any> = {};

    for (const [name, slotDef] of Object.entries(component.slots || {})) {
      if (slotDef.example) {
        slots[name] = slotDef.example;
      } else {
        slots[name] = '<!-- slot content -->';
      }
    }

    return slots;
  }

  /**
   * Generate search refinement suggestions
   */
  private generateSearchSuggestions(
    components: ComponentDefinition[]
  ): SearchSuggestion[] {
    const categories = new Set(components.map(c => c.category));
    const tags = new Set(
      components.flatMap(c => c.tags || [])
    );

    return [
      {
        type: 'category',
        message: 'Narrow by category',
        options: Array.from(categories)
      },
      {
        type: 'tags',
        message: 'Filter by common tags',
        options: Array.from(tags).slice(0, 5)
      }
    ];
  }
}

interface DiscoverComponentsArgs {
  query?: string;
  category?: string;
  tags?: string[];
  limit?: number;
}

interface DiscoverComponentsResult {
  total: number;
  returned: number;
  components: ComponentSummary[];
  suggestions?: SearchSuggestion[];
}

interface ComponentSummary {
  name: string;
  description: string;
  category: string;
  tags: string[];
  example: string;
  slots: string[];
  requiredProps: string[];
}

interface SearchSuggestion {
  type: string;
  message: string;
  options: string[];
}
```

### Tool 2: Get Component Details

```typescript
// src/mcp/tools/get-component-details.ts
export class GetComponentDetailsTool implements MCPTool {
  name = 'get_component_details';
  description = 'Get comprehensive details about a specific component';

  inputSchema = {
    type: 'object',
    properties: {
      component: {
        type: 'string',
        description: 'Component name'
      },
      includeExamples: {
        type: 'boolean',
        description: 'Include usage examples (default: true)',
        default: true
      }
    },
    required: ['component']
  };

  constructor(private registry: ComponentRegistry) {}

  async execute(args: GetComponentDetailsArgs): Promise<ComponentDetails> {
    const { component, includeExamples = true } = args;

    const def = await this.registry.getComponent(component);
    if (!def) {
      throw new Error(`Component not found: ${component}`);
    }

    return {
      name: def.name,
      description: def.description,
      category: def.category,
      tags: def.tags || [],

      // Props schema
      props: this.formatPropsSchema(def.schema?.props || {}),

      // Slots definition
      slots: this.formatSlotsSchema(def.slots || {}),

      // Asset dependencies
      assets: {
        styles: def.styles || [],
        scripts: def.scripts || []
      },

      // Usage examples
      examples: includeExamples
        ? this.generateExamples(def)
        : undefined,

      // Compatibility
      compatibility: {
        acceptsChildren: def.acceptsChildren !== false,
        acceptedSlotTypes: this.getAcceptedSlotTypes(def),
        requiredContext: def.requiredContext || []
      },

      // AI-specific guidance
      aiGuidance: {
        commonUseCases: def.aiGuidance?.useCases || [],
        bestPractices: def.aiGuidance?.bestPractices || [],
        antiPatterns: def.aiGuidance?.antiPatterns || []
      }
    };
  }

  /**
   * Format props schema for AI consumption
   */
  private formatPropsSchema(
    props: Record<string, PropSchema>
  ): PropSchemaFormatted[] {
    return Object.entries(props).map(([name, schema]) => ({
      name,
      type: schema.type,
      required: schema.required || false,
      default: schema.default,
      description: schema.description || '',
      example: schema.example,
      validation: {
        enum: schema.enum,
        min: schema.min,
        max: schema.max,
        pattern: schema.pattern
      }
    }));
  }

  /**
   * Format slots schema
   */
  private formatSlotsSchema(
    slots: Record<string, SlotDefinition>
  ): SlotSchemaFormatted[] {
    return Object.entries(slots).map(([name, def]) => ({
      name,
      description: def.description || '',
      required: def.required || false,
      acceptedComponents: def.acceptedComponents || [],
      default: def.default,
      example: def.example
    }));
  }

  /**
   * Generate comprehensive examples
   */
  private generateExamples(def: ComponentDefinition): ComponentExample[] {
    const examples: ComponentExample[] = [];

    // Minimal example
    examples.push({
      title: 'Minimal Usage',
      description: 'Basic usage with required props only',
      code: this.generateMinimalExample(def)
    });

    // Full example
    examples.push({
      title: 'Full Configuration',
      description: 'Complete example with all common props',
      code: this.generateFullExample(def)
    });

    // With slots example
    if (Object.keys(def.slots || {}).length > 0) {
      examples.push({
        title: 'With Slots',
        description: 'Using slots for custom content',
        code: this.generateSlotsExample(def)
      });
    }

    return examples;
  }

  private generateMinimalExample(def: ComponentDefinition): string {
    const requiredProps = this.getRequiredProps(def);
    return JSON.stringify({
      component: def.name,
      props: requiredProps
    }, null, 2);
  }

  private generateFullExample(def: ComponentDefinition): string {
    return JSON.stringify({
      component: def.name,
      props: this.getAllExampleProps(def),
      slots: this.getAllExampleSlots(def)
    }, null, 2);
  }
}

interface GetComponentDetailsArgs {
  component: string;
  includeExamples?: boolean;
}

interface ComponentDetails {
  name: string;
  description: string;
  category: string;
  tags: string[];
  props: PropSchemaFormatted[];
  slots: SlotSchemaFormatted[];
  assets: {
    styles: string[];
    scripts: string[];
  };
  examples?: ComponentExample[];
  compatibility: {
    acceptsChildren: boolean;
    acceptedSlotTypes: string[];
    requiredContext: string[];
  };
  aiGuidance: {
    commonUseCases: string[];
    bestPractices: string[];
    antiPatterns: string[];
  };
}
```

### Tool 3: Compose Page

```typescript
// src/mcp/tools/compose-page.ts
export class ComposePageTool implements MCPTool {
  name = 'compose_page';
  description = 'Compose a complete page from natural language description';

  inputSchema = {
    type: 'object',
    properties: {
      intent: {
        type: 'string',
        description: 'Natural language description of desired page (e.g., "Create a landing page with hero, features, and pricing")'
      },
      constraints: {
        type: 'object',
        properties: {
          maxComponents: {
            type: 'number',
            description: 'Maximum number of components'
          },
          preferredCategories: {
            type: 'array',
            items: { type: 'string' }
          },
          excludeComponents: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      existingComposition: {
        type: 'object',
        description: 'Existing page composition to extend/modify'
      }
    },
    required: ['intent']
  };

  constructor(
    private composer: PageComposer,
    private intentParser: IntentParser
  ) {}

  async execute(args: ComposePageArgs): Promise<ComposePageResult> {
    const {
      intent,
      constraints = {},
      existingComposition
    } = args;

    // Parse intent to structured requirements
    const requirements = await this.intentParser.parse(intent);

    // Generate composition
    const composition = await this.composer.compose(
      requirements,
      {
        ...constraints,
        baseComposition: existingComposition
      }
    );

    // Validate composition
    const validation = await this.composer.validate(composition);

    return {
      composition,
      validation: {
        valid: validation.valid,
        errors: validation.errors,
        warnings: validation.warnings
      },
      metadata: {
        componentsUsed: this.countComponents(composition),
        estimatedComplexity: this.estimateComplexity(composition),
        suggestedImprovements: validation.suggestions || []
      }
    };
  }

  private countComponents(composition: any): number {
    // Recursively count components
    let count = 1;

    if (composition.slots) {
      for (const slot of Object.values(composition.slots)) {
        if (Array.isArray(slot)) {
          count += slot.reduce(
            (sum, item) => sum + this.countComponents(item),
            0
          );
        } else {
          count += this.countComponents(slot);
        }
      }
    }

    if (composition.children) {
      count += composition.children.reduce(
        (sum: number, child: any) => sum + this.countComponents(child),
        0
      );
    }

    return count;
  }

  private estimateComplexity(composition: any): string {
    const componentCount = this.countComponents(composition);

    if (componentCount < 5) return 'simple';
    if (componentCount < 15) return 'moderate';
    return 'complex';
  }
}

interface ComposePageArgs {
  intent: string;
  constraints?: {
    maxComponents?: number;
    preferredCategories?: string[];
    excludeComponents?: string[];
  };
  existingComposition?: any;
}

interface ComposePageResult {
  composition: any;
  validation: {
    valid: boolean;
    errors: string[];
    warnings: string[];
  };
  metadata: {
    componentsUsed: number;
    estimatedComplexity: string;
    suggestedImprovements: string[];
  };
}
```

### Tool 4: Validate Composition

```typescript
// src/mcp/tools/validate-composition.ts
export class ValidateCompositionTool implements MCPTool {
  name = 'validate_composition';
  description = 'Validate a page composition and suggest fixes';

  inputSchema = {
    type: 'object',
    properties: {
      composition: {
        type: 'object',
        description: 'Page composition to validate'
      },
      strict: {
        type: 'boolean',
        description: 'Use strict validation (default: false)',
        default: false
      }
    },
    required: ['composition']
  };

  constructor(private validator: CompositionValidator) {}

  async execute(args: ValidateCompositionArgs): Promise<ValidationResult> {
    const { composition, strict = false } = args;

    const result = await this.validator.validate(composition, {
      strict
    });

    return {
      valid: result.valid,
      errors: result.errors.map(e => ({
        type: e.type,
        message: e.message,
        path: e.path,
        suggestion: this.generateSuggestion(e)
      })),
      warnings: result.warnings.map(w => ({
        type: w.type,
        message: w.message,
        path: w.path
      })),
      score: this.calculateQualityScore(result),
      improvements: this.suggestImprovements(result)
    };
  }

  /**
   * Generate fix suggestion for error
   */
  private generateSuggestion(error: ValidationError): string {
    switch (error.type) {
      case 'missing_required_prop':
        return `Add required prop: ${error.details.prop}`;

      case 'invalid_prop_type':
        return `Change ${error.details.prop} to type ${error.details.expectedType}`;

      case 'unknown_component':
        return `Use discover_components tool to find valid components`;

      case 'invalid_slot_content':
        return `Check component details for accepted slot types`;

      default:
        return 'Review component documentation';
    }
  }

  /**
   * Calculate quality score (0-100)
   */
  private calculateQualityScore(result: ValidationResult): number {
    const errorWeight = 20;
    const warningWeight = 5;

    const deductions =
      (result.errors.length * errorWeight) +
      (result.warnings.length * warningWeight);

    return Math.max(0, 100 - deductions);
  }

  /**
   * Suggest improvements
   */
  private suggestImprovements(result: ValidationResult): string[] {
    const improvements: string[] = [];

    // Based on common patterns in errors/warnings
    if (result.errors.some(e => e.type === 'missing_required_prop')) {
      improvements.push(
        'Use get_component_details to see all required props'
      );
    }

    if (result.warnings.some(w => w.type === 'unused_prop')) {
      improvements.push(
        'Remove unused props to reduce confusion'
      );
    }

    return improvements;
  }
}
```

### Tool 5: Suggest Next Components

```typescript
// src/mcp/tools/suggest-next-components.ts
export class SuggestNextComponentsTool implements MCPTool {
  name = 'suggest_next_components';
  description = 'Get intelligent suggestions for next component to add';

  inputSchema = {
    type: 'object',
    properties: {
      currentComposition: {
        type: 'object',
        description: 'Current page composition'
      },
      intent: {
        type: 'string',
        description: 'What you want to add (optional)'
      },
      position: {
        type: 'string',
        description: 'Where to add component (e.g., "after hero", "in footer slot")'
      }
    }
  };

  constructor(
    private registry: ComponentRegistry,
    private suggestionAlgo: SuggestionAlgorithm
  ) {}

  async execute(args: SuggestNextArgs): Promise<SuggestNextResult> {
    const { currentComposition, intent, position } = args;

    // Analyze current composition
    const analysis = this.analyzeComposition(currentComposition);

    // Generate suggestions
    const suggestions = await this.suggestionAlgo.suggest({
      composition: currentComposition,
      intent,
      position,
      analysis
    });

    return {
      suggestions: suggestions.map(s => ({
        component: s.name,
        reason: s.reason,
        confidence: s.confidence,
        example: this.generateInsertionExample(
          currentComposition,
          s,
          position
        ),
        alternatives: s.alternatives || []
      })),
      context: {
        currentSections: analysis.sections,
        missingSections: analysis.missingSections,
        pageType: analysis.pageType
      }
    };
  }

  /**
   * Analyze composition structure
   */
  private analyzeComposition(composition: any): CompositionAnalysis {
    const sections: string[] = [];
    const components = new Set<string>();

    this.walkComposition(composition, (comp) => {
      components.add(comp.component);

      // Identify sections
      if (comp.category === 'layout') {
        sections.push(comp.component);
      }
    });

    return {
      sections,
      components: Array.from(components),
      pageType: this.detectPageType(sections),
      missingSections: this.detectMissingSections(sections)
    };
  }

  /**
   * Detect page type from structure
   */
  private detectPageType(sections: string[]): string {
    if (sections.includes('Hero') && sections.includes('Pricing')) {
      return 'landing';
    }
    if (sections.includes('BlogPost')) {
      return 'blog';
    }
    return 'general';
  }

  /**
   * Generate insertion example
   */
  private generateInsertionExample(
    current: any,
    suggestion: ComponentSuggestion,
    position?: string
  ): string {
    // Show how to insert suggested component
    return JSON.stringify({
      ...current,
      // Insert suggestion at appropriate position
    }, null, 2);
  }
}

interface SuggestNextArgs {
  currentComposition: any;
  intent?: string;
  position?: string;
}

interface SuggestNextResult {
  suggestions: ComponentSuggestion[];
  context: {
    currentSections: string[];
    missingSections: string[];
    pageType: string;
  };
}
```

## Implementation Steps

1. **MCP Server Setup** (Day 1)
   - Initialize MCP SDK
   - Set up server infrastructure
   - Implement request handlers

2. **Implement Tool 1-2** (Days 2-3)
   - Discover components tool
   - Get component details tool
   - Test search and retrieval

3. **Implement Tool 3** (Days 4-5)
   - Compose page tool
   - Intent parsing
   - Composition generation

4. **Implement Tool 4-5** (Days 6-7)
   - Validation tool
   - Suggestion tool
   - Test integration

5. **Integration & Testing** (Days 8-9)
   - End-to-end workflows
   - Error handling
   - Performance optimization

## Testing Strategy

```typescript
describe('MCP Tools', () => {
  describe('discover_components', () => {
    it('finds components by query', async () => {
      const result = await tool.execute({
        query: 'hero section'
      });

      expect(result.components.length).toBeGreaterThan(0);
      expect(result.components[0].name).toContain('Hero');
    });
  });

  describe('compose_page', () => {
    it('creates landing page from intent', async () => {
      const result = await tool.execute({
        intent: 'Create a landing page with hero and pricing'
      });

      expect(result.validation.valid).toBe(true);
      expect(result.metadata.componentsUsed).toBeGreaterThan(1);
    });
  });
});
```

## Common Issues and Solutions

### Issue: Tool Response Too Large
**Problem**: Tool returns too much data, exceeding context limits
**Solution**: Implement pagination and progressive disclosure

### Issue: Intent Parsing Ambiguous
**Problem**: Natural language intent unclear
**Solution**: Ask clarifying questions via validation errors

### Issue: Composition Invalid
**Problem**: Generated composition fails validation
**Solution**: Implement auto-fixing and provide clear suggestions

## Acceptance Criteria

- [ ] MCP server starts and responds to requests
- [ ] All 5 tools implemented and tested
- [ ] Tools provide helpful error messages
- [ ] Examples are clear and accurate
- [ ] Token usage optimized
- [ ] Integration tests pass
- [ ] Documentation complete