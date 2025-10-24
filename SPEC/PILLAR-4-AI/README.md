# PILLAR 4: AI Integration

**Enabling Claude to Autonomously Build Complete Sites**

This pillar contains the Model Context Protocol (MCP) tools and integration layer that allows Claude to discover components, compose pages, and build complete marketing websites from natural language descriptions.

---

## Overview

The AI Integration layer provides:
- **5 Claude-optimized MCP tools** for component interaction
- **Natural language to composition** translation
- **Intelligent validation** with helpful error messages
- **Suggestions and alternatives** for better decision-making
- **Complete workflows** for autonomous site generation

---

## The Four Phases

### Phase 1: MCP Tool Implementation
**Duration**: 1 week | **Effort**: 15 hours

Build the 5 core MCP tools:
1. `discover_components` - Search and filter components
2. `get_component_details` - Get full component specification
3. `compose_page` - Build page from components
4. `validate_composition` - Check composition validity
5. `suggest_next_components` - Get intelligent recommendations

**Deliverable**: All 5 tools implemented and tested

---

### Phase 2: Composition Engine
**Duration**: 1 week | **Effort**: 10 hours

Build the page composition system:
- Natural language intent parsing
- Component selection logic
- Property mapping and defaults
- Composition assembly
- Preview generation

**Deliverable**: Working composition engine

---

### Phase 3: Validation & Feedback
**Duration**: 1 week | **Effort**: 10 hours

Implement comprehensive validation:
- Pre-composition validation
- Real-time error detection
- Helpful error messages
- Suggested fixes
- Alternative approaches

**Deliverable**: Intelligent validation system

---

### Phase 4: Documentation & Examples
**Duration**: 1 week | **Effort**: 5 hours

Create AI-focused documentation:
- Tool usage guides
- Example workflows
- Common patterns
- Troubleshooting guide
- Best practices

**Deliverable**: Complete AI documentation

---

## The 5 MCP Tools

### Tool 1: discover_components

**Purpose**: Find components matching a description or need

**Input Schema**:
```typescript
{
  query: string;              // "hero section with image"
  category?: 'atom' | 'molecule' | 'organism';
  filters?: {
    accessibility?: 'A' | 'AA' | 'AAA';
    responsive?: boolean;
    darkMode?: boolean;
  };
  limit?: number;             // Default 5, max 20
}
```

**Output Schema**:
```typescript
{
  matches: [
    {
      id: "organisms/hero-section",
      name: "Hero Section",
      description: "Large banner with heading, subheading, and CTA",
      category: "organism",
      relevance: 0.95,
      reason: "Exact match - supports images and CTAs"
    }
  ],
  suggestions: [
    {
      id: "organisms/feature-section",
      reason: "Alternative layout for highlighting features"
    },
    {
      id: "molecules/cta-block",
      reason: "Simpler option if hero is too complex"
    }
  ],
  searchMetadata: {
    totalResults: 3,
    searchTime: 45,
    queryTerms: ["hero", "section", "image"]
  }
}
```

---

### Tool 2: get_component_details

**Purpose**: Get complete specification for a component

**Input Schema**:
```typescript
{
  componentId: string;        // "organisms/hero-section"
  includeExamples?: boolean;  // Default true
}
```

**Output Schema**:
```typescript
{
  component: {
    id: "organisms/hero-section",
    name: "Hero Section",
    category: "organism",
    description: "Full-width hero banner for page headers",

    props: {
      heading: {
        type: "string",
        required: true,
        description: "Main headline text",
        example: "Build Better Products"
      },
      subheading: {
        type: "string",
        required: false,
        description: "Supporting text",
        example: "Ship faster with our tools"
      },
      variant: {
        type: "string",
        enum: ["default", "split", "centered", "video"],
        default: "default"
      },
      cta: {
        type: "object",
        properties: {
          text: { type: "string" },
          url: { type: "string" }
        }
      }
    },

    slots: {
      image: {
        accepts: ["atoms/image"],
        required: false,
        description: "Hero image or media"
      },
      actions: {
        accepts: ["atoms/button", "atoms/link"],
        multiple: true,
        max: 3
      }
    },

    accessibility: {
      wcag: "AA",
      landmarks: true,
      headingHierarchy: true
    },

    responsive: {
      breakpoints: ["375px", "768px", "1440px"],
      behavior: "Stacks vertically on mobile"
    },

    examples: [
      {
        name: "SaaS Hero",
        props: {
          heading: "Analytics That Matter",
          subheading: "Track what drives growth",
          variant: "split",
          cta: { text: "Start Free Trial", url: "/signup" }
        }
      }
    ]
  }
}
```

---

### Tool 3: compose_page

**Purpose**: Build a complete page from components

**Input Schema**:
```typescript
{
  path: string;               // "/landing"
  title: string;              // "Product Landing Page"
  description?: string;       // SEO description
  sections: [
    {
      component: string;      // "organisms/hero-section"
      variant?: string;       // "split"
      props: object;          // Component-specific props
      slots?: object;         // Nested components
    }
  ]
}
```

**Output Schema**:
```typescript
{
  success: true,
  composition: {
    path: "/landing",
    title: "Product Landing Page",
    sections: [ /* validated sections */ ],
    metadata: {
      componentCount: 5,
      estimatedSize: "38KB",
      accessibility: "WCAG AA",
      responsive: true,
      darkMode: true
    }
  },
  validation: {
    valid: true,
    warnings: [
      "Hero image should be optimized (current: 500KB, recommended: <200KB)"
    ]
  },
  preview: {
    url: "/preview/landing-12345",
    expiresIn: 3600
  }
}
```

---

### Tool 4: validate_composition

**Purpose**: Validate a composition before building

**Input Schema**:
```typescript
{
  composition: object;        // Full or partial composition
  strict?: boolean;          // Fail on warnings (default false)
}
```

**Output Schema**:
```typescript
{
  valid: boolean,
  errors: [
    {
      path: "sections[0].props.heading",
      message: "Required property 'heading' is missing",
      suggestion: "Add a heading prop with your main title"
    }
  ],
  warnings: [
    {
      path: "sections[1]",
      message: "Feature section typically follows hero section",
      suggestion: "Consider reordering for better flow"
    }
  ],
  suggestions: [
    {
      type: "enhancement",
      message: "Add testimonials section for social proof",
      example: {
        component: "organisms/testimonial-carousel",
        props: { /* ... */ }
      }
    }
  ]
}
```

---

### Tool 5: suggest_next_components

**Purpose**: Get intelligent recommendations for what to add next

**Input Schema**:
```typescript
{
  currentSections: string[];  // ["hero-section", "feature-section"]
  pageType?: string;          // "landing", "portfolio", "about"
  goals?: string[];           // ["conversion", "trust", "information"]
}
```

**Output Schema**:
```typescript
{
  suggestions: [
    {
      component: "organisms/testimonial-carousel",
      confidence: 0.92,
      reason: "Social proof typically follows features",
      placement: "after-features",
      example: {
        props: {
          heading: "What Our Customers Say",
          testimonials: [ /* sample data */ ]
        }
      }
    },
    {
      component: "organisms/cta-section",
      confidence: 0.88,
      reason: "Closing CTA drives conversion",
      placement: "end",
      example: { /* ... */ }
    }
  ],
  patterns: {
    typical: "hero → features → testimonials → cta → footer",
    current: "hero → features → ?",
    missing: ["testimonials", "cta", "footer"]
  }
}
```

---

## Workflow Examples

### Example: Building a SaaS Landing Page

**User**: "Create a landing page for a project management SaaS"

**Claude's Process**:

```typescript
// 1. Discover hero options
const heroes = await discover_components({
  query: "hero section for SaaS landing",
  category: "organism"
});

// 2. Get hero details
const heroSpec = await get_component_details({
  componentId: "organisms/hero-section"
});

// 3. Start composition
let composition = {
  path: "/",
  title: "ProjectFlow - Modern Project Management",
  sections: [{
    component: "organisms/hero-section",
    variant: "split",
    props: {
      heading: "Manage Projects With Confidence",
      subheading: "The intuitive platform teams love to use",
      cta: { text: "Start Free Trial", url: "/signup" }
    }
  }]
};

// 4. Get suggestions for next sections
const suggestions = await suggest_next_components({
  currentSections: ["organisms/hero-section"],
  pageType: "landing",
  goals: ["conversion", "trust"]
});

// 5. Add suggested sections
composition.sections.push({
  component: "organisms/feature-section",
  props: {
    heading: "Everything You Need",
    features: [
      { icon: "chart", title: "Analytics", description: "..." },
      { icon: "users", title: "Collaboration", description: "..." },
      { icon: "shield", title: "Security", description: "..." }
    ]
  }
});

// 6. Validate before finalizing
const validation = await validate_composition({
  composition
});

// 7. Create page if valid
if (validation.valid) {
  const result = await compose_page(composition);
  return result.preview.url;
}
```

---

## Implementation Architecture

### MCP Server Setup

```typescript
// mcp-server.ts
import { MCPServer } from '@anthropic/mcp';
import { discoveryTool } from './tools/discover';
import { detailsTool } from './tools/details';
import { composeTool } from './tools/compose';
import { validateTool } from './tools/validate';
import { suggestTool } from './tools/suggest';

const server = new MCPServer({
  name: 'agentstatic',
  version: '1.0.0',
  description: 'AgentStatic MCP Tools'
});

// Register tools
server.addTool(discoveryTool);
server.addTool(detailsTool);
server.addTool(composeTool);
server.addTool(validateTool);
server.addTool(suggestTool);

// Start server
server.listen(3000);
```

### Tool Implementation Pattern

```typescript
// tools/discover.ts
export const discoveryTool = {
  name: 'discover_components',
  description: 'Search for components matching a description',

  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      category: { type: 'string', enum: ['atom', 'molecule', 'organism'] },
      limit: { type: 'number', default: 5, maximum: 20 }
    },
    required: ['query']
  },

  async execute(input: DiscoveryInput): Promise<DiscoveryOutput> {
    // Load registry
    const registry = await loadRegistry();

    // Search components
    const results = await searchComponents(registry, input.query);

    // Filter by category if specified
    if (input.category) {
      results = results.filter(c => c.category === input.category);
    }

    // Rank by relevance
    const ranked = rankResults(results, input.query);

    // Get suggestions
    const suggestions = await getSuggestions(ranked[0], registry);

    return {
      matches: ranked.slice(0, input.limit),
      suggestions: suggestions.slice(0, 3),
      searchMetadata: {
        totalResults: results.length,
        searchTime: Date.now() - startTime,
        queryTerms: tokenize(input.query)
      }
    };
  }
};
```

---

## Success Criteria

### Phase 1 Complete When
- [ ] All 5 MCP tools implemented
- [ ] Tools respond in <200ms
- [ ] Error handling comprehensive
- [ ] Integration tests passing

### Phase 2 Complete When
- [ ] Natural language parsing working
- [ ] Component selection accurate
- [ ] Property mapping functional
- [ ] Compositions generating

### Phase 3 Complete When
- [ ] Validation catches all errors
- [ ] Error messages helpful
- [ ] Suggestions relevant
- [ ] Fix proposals accurate

### Phase 4 Complete When
- [ ] Documentation complete
- [ ] Examples comprehensive
- [ ] Workflows documented
- [ ] Best practices defined

---

## Integration Points

### With Pillar 2 (Registry)
- Tools query the component registry
- Discovery uses search index
- Validation uses component schemas

### With Pillar 3 (Build)
- Compositions feed into build system
- Validation uses same rules as build
- Preview generation uses render engine

---

## Testing Strategy

### Tool Testing
```typescript
describe('discover_components tool', () => {
  it('finds relevant components', async () => {
    const result = await discover_components({
      query: 'hero with video background'
    });

    expect(result.matches[0].id).toBe('organisms/hero-section');
    expect(result.matches[0].relevance).toBeGreaterThan(0.8);
  });

  it('provides helpful suggestions', async () => {
    const result = await discover_components({
      query: 'testimonial'
    });

    expect(result.suggestions).toContainEqual(
      expect.objectContaining({
        id: 'molecules/testimonial-card',
        reason: expect.stringContaining('simpler')
      })
    );
  });
});
```

### End-to-End Testing
```typescript
describe('Full page composition flow', () => {
  it('builds complete landing page', async () => {
    // 1. Discover components
    // 2. Get details
    // 3. Compose page
    // 4. Validate
    // 5. Verify output
  });
});
```

---

*This pillar transforms AgentStatic from a tool into an intelligent partner.*