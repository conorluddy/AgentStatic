# Phase 4: AI Agent Documentation Implementation

## Overview

This phase creates comprehensive documentation specifically designed for AI agents to understand and use AgentStatic effectively. The documentation includes workflow examples, common patterns, troubleshooting guides, and best practices optimized for AI consumption.

## Goals

1. Create structured documentation for AI agents
2. Provide complete workflow examples
3. Document common patterns and anti-patterns
4. Build troubleshooting guides with solutions
5. Establish best practices for AI-driven composition

## Technical Specification

### Documentation Structure

```markdown
# AgentStatic AI Agent Documentation

## Quick Start

### Your Role
You are an AI agent helping users build static websites using AgentStatic. Your job is to:
1. Understand user requirements
2. Discover and select appropriate components
3. Compose complete, valid page structures
4. Validate and refine compositions
5. Provide helpful guidance

### Available Tools
You have access to 5 MCP tools:
- **discover_components**: Search for components
- **get_component_details**: Get full component documentation
- **compose_page**: Generate page from intent
- **validate_composition**: Check composition validity
- **suggest_next_components**: Get intelligent suggestions

### Basic Workflow
1. Parse user intent
2. Search for components (discover_components)
3. Get component details (get_component_details)
4. Compose page structure (compose_page)
5. Validate composition (validate_composition)
6. Refine based on validation feedback
```

### Workflow Examples

```typescript
// src/ai/docs/workflow-examples.ts
export const workflowExamples = {
  landingPage: {
    title: 'Creating a Landing Page',
    description: 'Complete workflow for building a landing page',

    userIntent: 'Create a landing page with hero, features, pricing, and CTA',

    steps: [
      {
        step: 1,
        action: 'Parse Intent',
        description: 'Understanding what the user wants',
        output: {
          pageType: 'landing',
          sections: ['hero', 'features', 'pricing', 'cta'],
          requirements: 'Professional landing page layout'
        }
      },
      {
        step: 2,
        action: 'Discover Components',
        tool: 'discover_components',
        calls: [
          {
            query: 'hero section',
            result: ['Hero', 'HeroWithImage', 'HeroMinimal']
          },
          {
            query: 'features grid',
            result: ['FeatureGrid', 'FeatureList', 'FeatureCards']
          },
          {
            query: 'pricing table',
            result: ['PricingTable', 'PricingCards']
          }
        ]
      },
      {
        step: 3,
        action: 'Get Component Details',
        tool: 'get_component_details',
        calls: [
          {
            component: 'Hero',
            reason: 'Understand required props and slots'
          }
        ]
      },
      {
        step: 4,
        action: 'Compose Page',
        tool: 'compose_page',
        input: {
          intent: 'Create a landing page with hero, features, pricing, and CTA'
        },
        output: {
          component: 'Page',
          children: [
            {
              component: 'Hero',
              props: {
                title: 'Welcome to Our Platform',
                subtitle: 'Build amazing things faster'
              }
            },
            {
              component: 'FeatureGrid',
              props: {
                columns: 3
              },
              slots: {
                features: [
                  // Feature items
                ]
              }
            },
            // ... other sections
          ]
        }
      },
      {
        step: 5,
        action: 'Validate Composition',
        tool: 'validate_composition',
        input: '/* composition from step 4 */',
        output: {
          valid: true,
          score: 95,
          warnings: [
            'Consider adding a footer section'
          ]
        }
      },
      {
        step: 6,
        action: 'Refine Based on Feedback',
        description: 'Add footer based on validation warning',
        tool: 'suggest_next_components',
        input: {
          currentComposition: '/* composition */',
          intent: 'add footer'
        }
      }
    ],

    finalComposition: `{
  "component": "Page",
  "props": {
    "title": "Landing Page"
  },
  "children": [
    {
      "component": "Hero",
      "props": {
        "title": "Welcome to Our Platform",
        "subtitle": "Build amazing things faster",
        "cta": "Get Started"
      }
    },
    {
      "component": "FeatureGrid",
      "props": {
        "columns": 3,
        "title": "Why Choose Us"
      },
      "slots": {
        "features": [
          {
            "component": "FeatureCard",
            "props": {
              "title": "Fast",
              "description": "Lightning fast performance"
            }
          },
          {
            "component": "FeatureCard",
            "props": {
              "title": "Reliable",
              "description": "99.9% uptime guarantee"
            }
          },
          {
            "component": "FeatureCard",
            "props": {
              "title": "Scalable",
              "description": "Grows with your business"
            }
          }
        ]
      }
    },
    {
      "component": "PricingTable",
      "props": {
        "plans": [
          {
            "name": "Starter",
            "price": 9,
            "features": ["Feature 1", "Feature 2"]
          },
          {
            "name": "Pro",
            "price": 29,
            "features": ["All Starter", "Feature 3", "Feature 4"]
          }
        ]
      }
    },
    {
      "component": "CTA",
      "props": {
        "title": "Ready to get started?",
        "buttonText": "Sign Up Now"
      }
    },
    {
      "component": "Footer",
      "props": {
        "copyright": "© 2025 Company Name"
      }
    }
  ]
}`,

    bestPractices: [
      'Always validate after composing',
      'Use specific component queries',
      'Provide meaningful prop values',
      'Include all required sections',
      'Follow validation suggestions'
    ]
  },

  blogPost: {
    title: 'Creating a Blog Post Page',
    description: 'Workflow for blog content pages',

    userIntent: 'Create a blog post page with header, content, and related posts',

    steps: [
      // Similar structure to landing page
    ]
  },

  aboutPage: {
    title: 'Creating an About Page',
    description: 'Workflow for company about pages',

    userIntent: 'Create an about page with team section and company values',

    steps: [
      // Similar structure
    ]
  }
};
```

### Common Patterns

```typescript
// src/ai/docs/patterns.ts
export const commonPatterns = {
  patterns: [
    {
      name: 'Hero + Content + CTA',
      description: 'Standard landing page pattern',
      useCase: 'Most landing pages',
      structure: {
        component: 'Page',
        children: [
          { component: 'Hero' },
          { component: 'Content' },
          { component: 'CTA' }
        ]
      },
      example: '/* full example */'
    },

    {
      name: 'Grid Layout',
      description: 'Organizing content in grids',
      useCase: 'Features, portfolios, product listings',
      structure: {
        component: 'Grid',
        props: { columns: 3 },
        children: [
          { component: 'Card' },
          { component: 'Card' },
          { component: 'Card' }
        ]
      }
    },

    {
      name: 'Nested Slots',
      description: 'Using slots for flexible content',
      useCase: 'Complex layouts with variable content',
      structure: {
        component: 'Layout',
        slots: {
          header: { component: 'Header' },
          sidebar: { component: 'Sidebar' },
          main: { component: 'Content' },
          footer: { component: 'Footer' }
        }
      }
    },

    {
      name: 'Progressive Disclosure',
      description: 'Start simple, add complexity',
      useCase: 'When requirements are unclear',
      steps: [
        'Create minimal valid composition',
        'Validate',
        'Add sections based on suggestions',
        'Validate again',
        'Refine props and content'
      ]
    }
  ],

  antiPatterns: [
    {
      name: 'Over-composition',
      description: 'Adding too many components',
      problem: 'Complex, hard to maintain pages',
      solution: 'Start minimal, add only what\'s needed',
      badExample: '/* composition with 30+ components */',
      goodExample: '/* composition with 5-10 components */'
    },

    {
      name: 'Missing Validation',
      description: 'Not validating before proceeding',
      problem: 'Build-time errors, invalid output',
      solution: 'Always validate after composing',
      workflow: [
        'compose_page',
        'validate_composition', // Always do this
        'Fix errors',
        'Validate again'
      ]
    },

    {
      name: 'Ignoring Required Props',
      description: 'Not providing required props',
      problem: 'Validation errors, broken components',
      solution: 'Use get_component_details to see required props',
      example: {
        wrong: {
          component: 'Card',
          props: {} // Missing required 'title'
        },
        right: {
          component: 'Card',
          props: {
            title: 'Card Title' // Required prop provided
          }
        }
      }
    },

    {
      name: 'Generic Prop Values',
      description: 'Using placeholder values',
      problem: 'Uninformative, requires manual editing',
      solution: 'Generate contextual, meaningful values',
      example: {
        wrong: {
          title: 'Title Here',
          description: 'Description'
        },
        right: {
          title: 'Our Key Features',
          description: 'Discover what makes our platform unique'
        }
      }
    }
  ]
};
```

### Troubleshooting Guide

```typescript
// src/ai/docs/troubleshooting.ts
export const troubleshooting = {
  commonErrors: [
    {
      error: 'Component not found: XYZ',
      cause: 'Component name misspelled or doesn\'t exist',
      solution: {
        steps: [
          'Use discover_components to search for similar components',
          'Check exact component name spelling',
          'Verify component exists in registry'
        ],
        toolCall: {
          tool: 'discover_components',
          args: {
            query: 'XYZ',
            limit: 5
          }
        },
        example: `
// Instead of guessing component names
{ component: 'MyGuessedName' }

// Use discover_components
discover_components({ query: 'hero section' })
// Returns: ['Hero', 'HeroWithImage', 'HeroMinimal']

// Use exact name from discovery
{ component: 'Hero' }
        `
      }
    },

    {
      error: 'Required prop missing: title',
      cause: 'Component requires prop that wasn\'t provided',
      solution: {
        steps: [
          'Use get_component_details to see all required props',
          'Add the missing prop with appropriate value',
          'Validate again'
        ],
        toolCall: {
          tool: 'get_component_details',
          args: {
            component: 'ComponentName'
          }
        },
        example: `
// Get component details
get_component_details({ component: 'Card' })

// Response shows required props
{
  props: [
    { name: 'title', type: 'string', required: true }
  ]
}

// Add required prop
{
  component: 'Card',
  props: {
    title: 'My Card Title'
  }
}
        `
      }
    },

    {
      error: 'Invalid type for prop X. Expected string, got number',
      cause: 'Prop value has wrong data type',
      solution: {
        steps: [
          'Check component details for correct type',
          'Convert value to correct type',
          'Validate again'
        ],
        example: `
// Wrong type
{
  props: {
    title: 123 // number, but should be string
  }
}

// Correct type
{
  props: {
    title: "123" // string
  }
}
        `
      }
    },

    {
      error: 'Unknown slot: xyz',
      cause: 'Trying to use slot that doesn\'t exist',
      solution: {
        steps: [
          'Use get_component_details to see available slots',
          'Use correct slot name',
          'Remove invalid slot'
        ],
        toolCall: {
          tool: 'get_component_details',
          args: {
            component: 'ComponentName'
          }
        }
      }
    },

    {
      error: 'Component XYZ not accepted in this slot',
      cause: 'Slot has restrictions on accepted component types',
      solution: {
        steps: [
          'Check slot definition for acceptedComponents',
          'Use discover_components to find valid components',
          'Use accepted component type'
        ],
        example: `
// Slot definition (from get_component_details)
{
  slots: [
    {
      name: 'header',
      acceptedComponents: ['Header', 'Navigation']
    }
  ]
}

// Invalid
{
  slots: {
    header: { component: 'Card' } // Not in accepted list
  }
}

// Valid
{
  slots: {
    header: { component: 'Header' } // In accepted list
  }
}
        `
      }
    }
  ],

  debuggingStrategies: [
    {
      name: 'Validate Early, Validate Often',
      description: 'Don\'t wait until composition is complete',
      steps: [
        'Validate after adding each major section',
        'Fix errors immediately',
        'Prevents cascading errors'
      ]
    },

    {
      name: 'Start Simple',
      description: 'Begin with minimal valid composition',
      steps: [
        'Create simplest possible structure',
        'Validate to ensure it\'s valid',
        'Add complexity incrementally',
        'Validate after each addition'
      ],
      example: `
// Step 1: Minimal composition
{
  component: 'Page',
  children: []
}
// Validate: ✓ Valid

// Step 2: Add hero
{
  component: 'Page',
  children: [
    { component: 'Hero', props: { title: 'Welcome' } }
  ]
}
// Validate: ✓ Valid

// Step 3: Add more sections
// ...
      `
    },

    {
      name: 'Use Validation Suggestions',
      description: 'Validation provides helpful guidance',
      steps: [
        'Read validation error messages carefully',
        'Follow suggested tool calls',
        'Apply suggested fixes',
        'Validate again'
      ]
    }
  ]
};
```

### Best Practices Guide

```typescript
// src/ai/docs/best-practices.ts
export const bestPractices = {
  composition: [
    {
      practice: 'Always start with user intent',
      why: 'Ensures composition matches requirements',
      how: 'Parse intent into structured requirements before discovering components'
    },

    {
      practice: 'Discover before composing',
      why: 'Ensures you use correct, existing components',
      how: 'Use discover_components to search before assuming component names'
    },

    {
      practice: 'Get details for unfamiliar components',
      why: 'Understand required props, slots, and usage',
      how: 'Use get_component_details before using component'
    },

    {
      practice: 'Validate after every major change',
      why: 'Catch errors early, easier to fix',
      how: 'Call validate_composition after composing or modifying'
    },

    {
      practice: 'Use meaningful prop values',
      why: 'Creates better user experience, less manual editing',
      how: 'Generate contextual values based on section type and purpose'
    },

    {
      practice: 'Follow validation suggestions',
      why: 'Improves composition quality',
      how: 'Implement suggested improvements from validation results'
    },

    {
      practice: 'Keep compositions simple',
      why: 'Easier to maintain, better performance',
      how: 'Aim for 5-15 components per page, use only what\'s needed'
    }
  ],

  toolUsage: [
    {
      tool: 'discover_components',
      when: 'Need to find components',
      tips: [
        'Use descriptive search queries',
        'Filter by category when possible',
        'Review multiple results before selecting',
        'Check returned examples for usage patterns'
      ]
    },

    {
      tool: 'get_component_details',
      when: 'Need to understand component',
      tips: [
        'Always check required props',
        'Review available slots',
        'Study examples before using',
        'Note accepted component types for slots'
      ]
    },

    {
      tool: 'compose_page',
      when: 'Creating initial composition',
      tips: [
        'Provide clear intent',
        'Specify constraints if needed',
        'Review generated composition',
        'Validate immediately after'
      ]
    },

    {
      tool: 'validate_composition',
      when: 'After any composition change',
      tips: [
        'Fix all errors before proceeding',
        'Address warnings for quality',
        'Follow next steps guidance',
        'Use suggested tool calls'
      ]
    },

    {
      tool: 'suggest_next_components',
      when: 'Extending existing composition',
      tips: [
        'Provide current composition',
        'Specify intent for addition',
        'Indicate position if important',
        'Review alternatives'
      ]
    }
  ]
};
```

### Example Dialogues

```typescript
// src/ai/docs/example-dialogues.ts
export const exampleDialogues = [
  {
    scenario: 'User wants landing page',
    dialogue: [
      {
        user: 'Create a landing page for my SaaS product',
        agent: {
          thought: 'User wants landing page. I should discover appropriate components and compose.',
          action: 'discover_components',
          args: { query: 'landing page hero' }
        }
      },
      {
        discovery: ['Hero', 'HeroWithImage', 'HeroMinimal'],
        agent: {
          thought: 'Multiple hero options. I\'ll use standard Hero. Now need features section.',
          action: 'discover_components',
          args: { query: 'features grid' }
        }
      },
      {
        discovery: ['FeatureGrid', 'FeatureCards'],
        agent: {
          thought: 'Good. Now compose the page.',
          action: 'compose_page',
          args: {
            intent: 'Create SaaS landing page with hero and features'
          }
        }
      },
      {
        composition: '/* generated composition */',
        agent: {
          thought: 'Composition created. Must validate.',
          action: 'validate_composition',
          args: { composition: '/* composition */' }
        }
      },
      {
        validation: {
          valid: false,
          errors: [
            { type: 'missing_required_prop', message: 'Missing title prop' }
          ]
        },
        agent: {
          thought: 'Validation failed. Need to add missing prop.',
          action: 'Fix composition and validate again'
        }
      },
      {
        validation: { valid: true, score: 95 },
        agent: {
          response: 'I\'ve created a landing page with hero and features sections. The composition is valid and ready to build.'
        }
      }
    ]
  }
];
```

## Implementation Steps

1. **Create Documentation Structure** (Day 1)
   - Organize documentation files
   - Define structure
   - Create templates

2. **Write Workflow Examples** (Days 2-3)
   - Landing page example
   - Blog post example
   - About page example
   - Other common pages

3. **Document Patterns** (Day 4)
   - Common patterns
   - Anti-patterns
   - Best practices

4. **Create Troubleshooting Guide** (Day 5)
   - Common errors
   - Solutions
   - Debugging strategies

5. **Write Example Dialogues** (Day 6)
   - Successful scenarios
   - Error recovery scenarios
   - Complex requirements

6. **Integration & Testing** (Day 7)
   - Test documentation accuracy
   - Validate examples
   - Gather feedback

## Acceptance Criteria

- [ ] Complete workflow examples for 5+ page types
- [ ] Common patterns documented with examples
- [ ] Anti-patterns identified with solutions
- [ ] Troubleshooting guide covers all error types
- [ ] Best practices are clear and actionable
- [ ] Example dialogues show realistic usage
- [ ] All code examples are valid and tested
- [ ] Documentation is easily navigable