# Phase 6: Claude MCP Integration & AI Tools

**Duration**: Weeks 9-11 | **Effort**: 40 hours | **Priority**: High

---

## Overview

Integrate AgentStatic with Claude via **5 Claude-optimized MCP (Model Context Protocol) tools** that enable Claude to autonomously discover, understand, and compose pages from briefs. This phase transforms the component library into an AI-native platform (decision #4: Claude-optimized MCP).

**Key Focus** (reflecting 17 refined decisions):
- **5 Claude-specific MCP tools**: Optimized for AI comprehension and use
- **Discovery with suggestions** (decision #16): Tools return alternatives, not just matches
- **Composition validation**: Validate pages before suggesting to user
- **Rich context**: All component metadata available to Claude
- **Error guidance**: Clear feedback on composition failures
- **Explainable AI**: Claude shows reasoning and choices explicitly

---

## The 5 MCP Tools

### Tool 1: `discover_components` - Find Components by Description

**Purpose**: Claude searches registry for components matching requirements

**Input Schema**:
```typescript
{
  query: string;              // "hero with background image"
  category?: 'atom' | 'molecule' | 'organism';
  minAccessibility?: 'wcag-a' | 'wcag-aa';
  limit?: number;             // default 5, max 20
}
```

**Output**:
```typescript
{
  matches: [
    {
      id: "organisms/hero-section",
      name: "Hero Section",
      description: "Large banner with heading, subheading, optional image and CTA",
      category: "organism",
      relevance: 0.95,
      reason: "Exact match - supports background images",
      accessibility: "WCAG AA",
      responsive: true
    }
  ],
  suggestions: [
    { id: "molecules/cta-block", reason: "Could wrap hero or use standalone" }
  ],
  searchMetadata: {
    queriedKeywords: ["hero", "background", "banner"],
    category: "organism",
    matchedIn: "semantic search"
  }
}
```

**Implementation**: Uses Phase 5 discovery API with semantic search

---

### Tool 2: `get_component_details` - Understand Single Component

**Purpose**: Claude gets complete documentation for a component

**Input**:
```typescript
{
  componentId: "atoms/button",
  includeExamples?: boolean;
}
```

**Output**:
```typescript
{
  component: {
    id: "atoms/button",
    name: "Button",
    category: "atom",
    purpose: "Visual CTA, not form submission",

    accessibility: {
      wcag: "AA",
      keyboard: true,
      screenReader: true,
      features: ["Visible focus indicators", "Color + text indicators"],
      ariaSupport: ["aria-busy", "aria-disabled"]
    },

    responsive: {
      mobileFirst: true,
      breakpoints: "all",
      containerQueries: false,
      behavior: "Scales via design tokens"
    },

    darkMode: {
      supported: true,
      approach: "CSS variables",
      tested: true
    },

    properties: {
      text: {
        type: "string",
        required: true,
        description: "Display text",
        example: "Click me"
      },
      variant: {
        type: "string",
        enum: ["primary", "secondary", "ghost", "outline"],
        default: "primary",
        description: "Visual style"
      },
      size: {
        type: "string",
        enum: ["small", "medium", "large"],
        default: "medium"
      },
      disabled: { type: "boolean", default: false },
      loading: { type: "boolean", default: false }
    },

    variants: ["primary", "secondary", "ghost", "outline", "disabled", "loading"],

    examples: [
      {
        title: "Primary Button",
        description: "Standard CTA button",
        html: "<button class=\"button button--primary\">Get Started</button>",
        props: { text: "Get Started", variant: "primary" }
      }
    ],

    relatedComponents: ["atoms/link", "atoms/icon", "molecules/cta-block"],

    cssClasses: {
      ".button": "Base element",
      ".button--primary": "Primary variant",
      /* ... all classes documented ... */
    }
  }
}
```

**Implementation**: Loads from Phase 5 schema, fully documented

---

### Tool 3: `compose_page` - Build Page from Components

**Purpose**: Claude creates page by composing multiple components

**Input**:
```typescript
{
  title: string;
  metadata?: { description?: string; canonical?: string };
  sections: Array<{
    component: string;              // "organisms/hero-section"
    variant?: string;
    props: Record<string, any>;
  }>;
}
```

**Output**:
```typescript
{
  valid: true,
  page: {
    title: "Product Landing",
    composition: [ /* sections array */ ],
    summary: "2 organisms, 5 total components",
    estimatedSize: "42KB CSS",
    accessibility: "WCAG AA",
    responsive: "Mobile-first, all breakpoints",
    darkMode: "Fully supported"
  },
  validations: [
    { section: 0, valid: true, message: "All props valid" },
    { section: 1, valid: true, message: "All props valid" }
  ],
  warnings: [
    "Hero background image should be < 200KB for performance"
  ]
}
```

**Implementation**: Uses Phase 5 validation + component composition

---

### Tool 4: `validate_composition` - Check Page Before Build

**Purpose**: Validate composition and get actionable feedback

**Input**:
```typescript
{
  sections: Array<{
    component: string;
    props: Record<string, any>;
  }>;
}
```

**Output**:
```typescript
{
  valid: true,
  errors: [],
  warnings: [
    "Button alone isn't very effective. Consider wrapping in larger section."
  ],
  suggestions: [
    {
      suggestion: "Add hero section above button",
      reason: "Buttons are more impactful as CTAs within larger sections",
      example: { component: "organisms/hero-section", props: {...} }
    }
  ]
}
```

**Implementation**: Phase 5 validator + heuristics for composition quality

---

### Tool 5: `suggest_next_components` - What Comes Next

**Purpose**: Claude gets recommendations for next components in page flow

**Input**:
```typescript
{
  currentComponents: string[];  // ["organisms/hero-section"]
  pageContext?: string;         // "SaaS landing page"
}
```

**Output**:
```typescript
{
  suggestions: [
    {
      component: "organisms/feature-section",
      confidence: 0.95,
      reason: "Perfect follow-up to hero - showcase main features",
      typicalProps: { heading: "Why Choose Us", columns: 3 }
    },
    {
      component: "organisms/testimonials-carousel",
      confidence: 0.85,
      reason: "Build social proof after features"
    },
    {
      component: "organisms/cta-section",
      confidence: 0.90,
      reason: "Close with final call-to-action"
    }
  ],
  typicalFlow: "Hero → Features → Social Proof → CTA → Footer"
}
```

**Implementation**: Uses Phase 5 registry + typical page patterns

---

## Usage Workflow

### Example: Build a SaaS Landing Page

**User**: "Create a SaaS landing page"

**Claude**:
1. Calls `discover_components("hero section for landing page")`
   - Returns hero-section with 0.95 relevance
2. Calls `get_component_details("organisms/hero-section")`
   - Understands all properties and variants
3. Creates partial composition with hero (props: heading, subheading, cta, etc.)
4. Calls `suggest_next_components(["organisms/hero-section"])`
   - Gets: feature-section, testimonials, cta-section
5. For each suggestion, calls `get_component_details()`
6. Builds complete composition for landing page
7. Calls `compose_page({title, sections})`
   - Validates entire page
8. Returns complete, validated page composition

**User gets**: Ready-to-build page JSON composition, Claude explains choices

---

## MCP Server Implementation

### Setup (`ai/mcp/server.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const tools = [
  {
    name: 'discover_components',
    description: 'Find components by searching the registry',
    input_schema: { /* schema from above */ }
  },
  {
    name: 'get_component_details',
    description: 'Get complete documentation for a component'
    input_schema: { /* ... */ }
  },
  // ... other 3 tools
];

async function streamPageBuilding(userBrief: string) {
  const messages = [];

  // Initial user message
  messages.push({
    role: 'user',
    content: userBrief
  });

  // Agentic loop
  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-1',
      max_tokens: 4096,
      tools: tools,
      messages: messages
    });

    // Check if Claude is done
    if (response.stop_reason === 'end_turn') {
      // Return final composition
      break;
    }

    // Process tool calls
    let hasToolUse = false;
    for (const block of response.content) {
      if (block.type === 'tool_use') {
        hasToolUse = true;
        const toolName = block.name;
        const result = await callTool(toolName, block.input);

        // Add assistant message + tool result
        messages.push({
          role: 'assistant',
          content: response.content
        });
        messages.push({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify(result)
            }
          ]
        });
      }
    }

    if (!hasToolUse) break;
  }
}
```

---

## Success Metrics

- [ ] All 5 MCP tools implemented and integrated
- [ ] Discovery returns accurate results in <100ms
- [ ] Validation catches all invalid props
- [ ] Claude autonomously builds pages from brief
- [ ] Tools suggest relevant alternatives (decision #16)
- [ ] Error messages guide users to solutions
- [ ] Tools work with all 20-30 components
- [ ] MCP tools documented for developers

## Implementation Checklist

- [ ] MCP server set up and running
- [ ] All 5 tools fully implemented
- [ ] Discovery integrated with Phase 5 registry
- [ ] Validation integrated with Phase 5 system
- [ ] Suggestion system working
- [ ] Error handling comprehensive
- [ ] Tool documentation complete
- [ ] Examples showing Claude page building
- [ ] Integration tested with Claude API

## File Structure

```
ai/
├── mcp/
│   ├── server.ts                    # MCP server
│   ├── tools/
│   │   ├── discover-components.ts   # Tool 1
│   │   ├── get-component-details.ts # Tool 2
│   │   ├── compose-page.ts          # Tool 3
│   │   ├── validate-composition.ts  # Tool 4
│   │   └── suggest-next.ts          # Tool 5
│   └── handlers/
│       ├── discovery.ts
│       ├── composition.ts
│       └── validation.ts
└── docs/
    ├── mcp-tools.md
    └── claude-integration.md
```

---

## Phase Gate

Before Phase 7:

- [ ] All 5 tools fully implemented and tested
- [ ] Integration with Phase 5 registry complete
- [ ] Claude successfully builds pages autonomously
- [ ] All error cases handled appropriately
- [ ] Tool documentation clear for developers

---

*Phase 6 Plan v2.0 (Comprehensive) - October 24, 2025*
