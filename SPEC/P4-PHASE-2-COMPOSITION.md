# Phase 2: AI-Powered Composition Implementation

## Overview

This phase implements the intelligent composition engine that translates natural language intents into complete page compositions. The system parses user intents, selects appropriate components, generates sensible default props and slot content, and creates well-structured page hierarchies.

## Goals

1. Parse natural language intents into structured requirements
2. Implement component selection algorithm
3. Generate complete page compositions
4. Provide sensible defaults for props and slots
5. Handle iterative refinement of compositions

## Technical Specification

### Intent Parser

```typescript
// src/ai/composition/intent-parser.ts
import { OpenAI } from 'openai';

export class IntentParser {
  private openai: OpenAI;

  constructor(apiKey?: string) {
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY
    });
  }

  /**
   * Parse natural language intent into structured requirements
   */
  async parse(intent: string): Promise<PageRequirements> {
    const systemPrompt = `
You are an expert at understanding web page requirements.
Parse the user's intent into structured requirements including:
- Page type (landing, blog, about, contact, etc.)
- Required sections (hero, features, pricing, etc.)
- Content types needed (text, images, forms, etc.)
- Desired layout structure
- Any specific component requirements

Output as JSON only.
`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: intent }
      ],
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('Failed to parse intent');
    }

    const parsed = JSON.parse(response);
    return this.validateRequirements(parsed);
  }

  /**
   * Validate and normalize requirements
   */
  private validateRequirements(parsed: any): PageRequirements {
    return {
      pageType: parsed.pageType || 'general',
      sections: parsed.sections || [],
      contentTypes: parsed.contentTypes || [],
      layout: parsed.layout || 'standard',
      constraints: parsed.constraints || {},
      metadata: {
        title: parsed.title,
        description: parsed.description
      }
    };
  }

  /**
   * Extract section requirements from intent
   */
  extractSections(intent: string): string[] {
    const sectionKeywords = {
      hero: ['hero', 'banner', 'header section', 'top section'],
      features: ['features', 'benefits', 'highlights', 'why choose'],
      pricing: ['pricing', 'plans', 'packages', 'tiers'],
      testimonials: ['testimonials', 'reviews', 'customer feedback'],
      cta: ['call to action', 'cta', 'get started', 'sign up'],
      footer: ['footer', 'bottom section', 'contact info']
    };

    const lowerIntent = intent.toLowerCase();
    const sections: string[] = [];

    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(keyword => lowerIntent.includes(keyword))) {
        sections.push(section);
      }
    }

    return sections;
  }
}

export interface PageRequirements {
  pageType: string;
  sections: string[];
  contentTypes: string[];
  layout: string;
  constraints: Record<string, any>;
  metadata: {
    title?: string;
    description?: string;
  };
}
```

### Component Selector

```typescript
// src/ai/composition/component-selector.ts
import { ComponentRegistry } from '../../registry';
import { SearchAlgorithm } from '../algorithms/search';

export class ComponentSelector {
  constructor(
    private registry: ComponentRegistry,
    private searchAlgo: SearchAlgorithm
  ) {}

  /**
   * Select best component for a requirement
   */
  async selectComponent(
    requirement: SectionRequirement,
    context: SelectionContext
  ): Promise<ComponentSelection> {
    // Get candidate components
    const candidates = await this.getCandidates(requirement);

    // Rank candidates
    const ranked = await this.rankCandidates(
      candidates,
      requirement,
      context
    );

    // Select best match
    const selected = ranked[0];

    if (!selected) {
      throw new Error(
        `No suitable component found for: ${requirement.type}`
      );
    }

    return {
      component: selected.component,
      confidence: selected.score,
      alternatives: ranked.slice(1, 4).map(r => r.component),
      reasoning: this.explainSelection(selected, requirement)
    };
  }

  /**
   * Get candidate components
   */
  private async getCandidates(
    requirement: SectionRequirement
  ): Promise<ComponentDefinition[]> {
    const { type, keywords, category } = requirement;

    // Start with category filter
    let candidates = await this.registry.getByCategory(category);

    // Apply keyword search
    if (keywords && keywords.length > 0) {
      const query = keywords.join(' ');
      candidates = await this.searchAlgo.search(query, candidates);
    }

    // Apply type-specific filters
    candidates = this.filterByType(candidates, type);

    return candidates;
  }

  /**
   * Rank candidate components
   */
  private async rankCandidates(
    candidates: ComponentDefinition[],
    requirement: SectionRequirement,
    context: SelectionContext
  ): Promise<RankedComponent[]> {
    const ranked = candidates.map(component => {
      const score = this.calculateScore(
        component,
        requirement,
        context
      );

      return {
        component,
        score,
        reasons: this.getScoreReasons(component, requirement)
      };
    });

    return ranked.sort((a, b) => b.score - a.score);
  }

  /**
   * Calculate component score
   */
  private calculateScore(
    component: ComponentDefinition,
    requirement: SectionRequirement,
    context: SelectionContext
  ): number {
    let score = 0;

    // Category match (30%)
    if (component.category === requirement.category) {
      score += 30;
    }

    // Keyword relevance (25%)
    const keywordScore = this.calculateKeywordScore(
      component,
      requirement.keywords || []
    );
    score += keywordScore * 25;

    // Usage popularity (20%)
    const popularityScore = component.metadata?.usage || 0;
    score += Math.min(popularityScore / 100, 1) * 20;

    // Context compatibility (15%)
    const compatScore = this.calculateCompatibilityScore(
      component,
      context
    );
    score += compatScore * 15;

    // Simplicity preference (10%)
    const complexityPenalty = this.calculateComplexityPenalty(
      component
    );
    score += (1 - complexityPenalty) * 10;

    return score;
  }

  /**
   * Calculate keyword relevance score
   */
  private calculateKeywordScore(
    component: ComponentDefinition,
    keywords: string[]
  ): number {
    if (keywords.length === 0) return 0.5;

    const componentText = [
      component.name,
      component.description,
      ...(component.tags || [])
    ].join(' ').toLowerCase();

    const matches = keywords.filter(keyword =>
      componentText.includes(keyword.toLowerCase())
    );

    return matches.length / keywords.length;
  }

  /**
   * Calculate context compatibility
   */
  private calculateCompatibilityScore(
    component: ComponentDefinition,
    context: SelectionContext
  ): number {
    let score = 1.0;

    // Check if already used (prefer variety)
    if (context.usedComponents.includes(component.name)) {
      score *= 0.5;
    }

    // Check constraints
    if (context.constraints.excludeComponents?.includes(component.name)) {
      score = 0;
    }

    return score;
  }

  /**
   * Calculate complexity penalty
   */
  private calculateComplexityPenalty(
    component: ComponentDefinition
  ): number {
    const requiredProps = Object.values(
      component.schema?.props || {}
    ).filter(p => p.required).length;

    const slotCount = Object.keys(component.slots || {}).length;

    // Prefer simpler components (fewer required props/slots)
    return Math.min((requiredProps + slotCount) / 10, 1);
  }

  /**
   * Explain why component was selected
   */
  private explainSelection(
    selected: RankedComponent,
    requirement: SectionRequirement
  ): string {
    const reasons: string[] = [];

    if (selected.component.category === requirement.category) {
      reasons.push(`Matches category: ${requirement.category}`);
    }

    if (selected.reasons.keywordMatch > 0.7) {
      reasons.push('Strong keyword match');
    }

    if (selected.component.metadata?.usage > 50) {
      reasons.push('Frequently used component');
    }

    return reasons.join('; ');
  }
}

interface SectionRequirement {
  type: string;
  category: string;
  keywords?: string[];
  constraints?: Record<string, any>;
}

interface SelectionContext {
  usedComponents: string[];
  pageType: string;
  constraints: Record<string, any>;
}

interface ComponentSelection {
  component: ComponentDefinition;
  confidence: number;
  alternatives: ComponentDefinition[];
  reasoning: string;
}

interface RankedComponent {
  component: ComponentDefinition;
  score: number;
  reasons: {
    categoryMatch?: boolean;
    keywordMatch?: number;
    popularity?: number;
  };
}
```

### Page Composer

```typescript
// src/ai/composition/page-composer.ts
export class PageComposer {
  constructor(
    private intentParser: IntentParser,
    private componentSelector: ComponentSelector,
    private propsGenerator: PropsGenerator,
    private validator: CompositionValidator
  ) {}

  /**
   * Compose complete page from intent
   */
  async compose(
    requirements: PageRequirements,
    options?: ComposeOptions
  ): Promise<PageComposition> {
    const context: CompositionContext = {
      usedComponents: [],
      pageType: requirements.pageType,
      constraints: requirements.constraints
    };

    // Build composition section by section
    const sections: ComponentNode[] = [];

    for (const sectionReq of requirements.sections) {
      const section = await this.composeSection(
        sectionReq,
        context
      );

      sections.push(section);
      context.usedComponents.push(section.component);
    }

    // Wrap in layout if needed
    const composition = this.wrapInLayout(sections, requirements);

    // Generate metadata
    const metadata = this.generateMetadata(requirements);

    return {
      component: composition,
      metadata,
      sections: sections.map(s => s.component)
    };
  }

  /**
   * Compose individual section
   */
  private async composeSection(
    sectionType: string,
    context: CompositionContext
  ): Promise<ComponentNode> {
    // Convert section type to requirement
    const requirement = this.sectionToRequirement(sectionType);

    // Select component
    const selection = await this.componentSelector.selectComponent(
      requirement,
      context
    );

    // Generate props
    const props = await this.propsGenerator.generateProps(
      selection.component,
      { sectionType }
    );

    // Generate slot content
    const slots = await this.generateSlots(
      selection.component,
      context
    );

    return {
      component: selection.component.name,
      props,
      slots
    };
  }

  /**
   * Convert section type to requirement
   */
  private sectionToRequirement(
    sectionType: string
  ): SectionRequirement {
    const requirementMap: Record<string, SectionRequirement> = {
      hero: {
        type: 'hero',
        category: 'layout',
        keywords: ['hero', 'banner', 'header']
      },
      features: {
        type: 'features',
        category: 'content',
        keywords: ['features', 'benefits', 'grid']
      },
      pricing: {
        type: 'pricing',
        category: 'content',
        keywords: ['pricing', 'plans', 'table']
      },
      testimonials: {
        type: 'testimonials',
        category: 'content',
        keywords: ['testimonials', 'reviews', 'carousel']
      },
      cta: {
        type: 'cta',
        category: 'content',
        keywords: ['call to action', 'button', 'form']
      },
      footer: {
        type: 'footer',
        category: 'layout',
        keywords: ['footer', 'links', 'contact']
      }
    };

    return requirementMap[sectionType] || {
      type: sectionType,
      category: 'content',
      keywords: [sectionType]
    };
  }

  /**
   * Generate slot content
   */
  private async generateSlots(
    component: ComponentDefinition,
    context: CompositionContext
  ): Promise<Record<string, any>> {
    const slots: Record<string, any> = {};

    for (const [name, slotDef] of Object.entries(component.slots || {})) {
      // Use default if available
      if (slotDef.default) {
        slots[name] = slotDef.default;
        continue;
      }

      // Generate content based on accepted components
      if (slotDef.acceptedComponents?.length > 0) {
        const slotContent = await this.generateSlotContent(
          slotDef,
          context
        );
        slots[name] = slotContent;
      }
    }

    return slots;
  }

  /**
   * Generate content for a slot
   */
  private async generateSlotContent(
    slotDef: SlotDefinition,
    context: CompositionContext
  ): Promise<any> {
    // Select appropriate component for slot
    const acceptedType = slotDef.acceptedComponents?.[0];
    if (!acceptedType) {
      return undefined;
    }

    // Simple text content for now
    // Could be enhanced to generate nested components
    return `<!-- ${slotDef.description || 'Slot content'} -->`;
  }

  /**
   * Wrap sections in layout
   */
  private wrapInLayout(
    sections: ComponentNode[],
    requirements: PageRequirements
  ): ComponentNode {
    return {
      component: 'Page',
      props: {
        title: requirements.metadata.title || 'Untitled Page'
      },
      children: sections
    };
  }

  /**
   * Generate page metadata
   */
  private generateMetadata(
    requirements: PageRequirements
  ): PageMetadata {
    return {
      title: requirements.metadata.title || 'Generated Page',
      description: requirements.metadata.description,
      type: requirements.pageType,
      sections: requirements.sections
    };
  }
}

interface ComposeOptions {
  maxComponents?: number;
  preferSimple?: boolean;
  baseComposition?: any;
}

interface CompositionContext {
  usedComponents: string[];
  pageType: string;
  constraints: Record<string, any>;
}

interface ComponentNode {
  component: string;
  props?: Record<string, any>;
  slots?: Record<string, any>;
  children?: ComponentNode[];
}

interface PageComposition {
  component: ComponentNode;
  metadata: PageMetadata;
  sections: string[];
}

interface PageMetadata {
  title: string;
  description?: string;
  type: string;
  sections: string[];
}
```

### Props Generator

```typescript
// src/ai/composition/props-generator.ts
export class PropsGenerator {
  /**
   * Generate sensible default props for component
   */
  async generateProps(
    component: ComponentDefinition,
    context: PropsContext
  ): Promise<Record<string, any>> {
    const props: Record<string, any> = {};

    for (const [name, schema] of Object.entries(
      component.schema?.props || {}
    )) {
      props[name] = await this.generatePropValue(
        name,
        schema,
        context
      );
    }

    return props;
  }

  /**
   * Generate value for single prop
   */
  private async generatePropValue(
    name: string,
    schema: PropSchema,
    context: PropsContext
  ): Promise<any> {
    // Use example if available
    if (schema.example !== undefined) {
      return schema.example;
    }

    // Use default if available
    if (schema.default !== undefined) {
      return schema.default;
    }

    // Generate based on type
    switch (schema.type) {
      case 'string':
        return this.generateStringValue(name, schema, context);

      case 'number':
        return this.generateNumberValue(name, schema);

      case 'boolean':
        return this.generateBooleanValue(name, schema);

      case 'array':
        return this.generateArrayValue(name, schema);

      case 'object':
        return this.generateObjectValue(name, schema);

      default:
        return undefined;
    }
  }

  /**
   * Generate string value
   */
  private generateStringValue(
    name: string,
    schema: PropSchema,
    context: PropsContext
  ): string {
    // Check for enum
    if (schema.enum && schema.enum.length > 0) {
      return schema.enum[0];
    }

    // Generate based on common prop names
    const nameGenerators: Record<string, () => string> = {
      title: () => this.generateTitle(context),
      heading: () => this.generateHeading(context),
      description: () => this.generateDescription(context),
      label: () => this.generateLabel(name),
      placeholder: () => this.generatePlaceholder(name),
      url: () => '#',
      href: () => '#',
      src: () => 'https://via.placeholder.com/400',
      alt: () => 'Placeholder image'
    };

    const generator = nameGenerators[name.toLowerCase()];
    return generator ? generator() : `${name} value`;
  }

  /**
   * Generate title based on context
   */
  private generateTitle(context: PropsContext): string {
    const titleTemplates = {
      hero: 'Welcome to Our Platform',
      features: 'Our Key Features',
      pricing: 'Simple, Transparent Pricing',
      testimonials: 'What Our Customers Say',
      cta: 'Ready to Get Started?',
      footer: 'Company Name'
    };

    return titleTemplates[context.sectionType as keyof typeof titleTemplates]
      || 'Section Title';
  }

  /**
   * Generate description
   */
  private generateDescription(context: PropsContext): string {
    return 'This is a placeholder description. Replace with your actual content.';
  }

  /**
   * Generate number value
   */
  private generateNumberValue(
    name: string,
    schema: PropSchema
  ): number {
    // Use min/max if available
    if (schema.min !== undefined) {
      return schema.min;
    }

    // Common number defaults
    const defaults: Record<string, number> = {
      columns: 3,
      rows: 3,
      count: 5,
      max: 100,
      min: 0
    };

    return defaults[name.toLowerCase()] || 0;
  }

  /**
   * Generate boolean value
   */
  private generateBooleanValue(
    name: string,
    schema: PropSchema
  ): boolean {
    // Enable features by default
    return true;
  }

  /**
   * Generate array value
   */
  private generateArrayValue(
    name: string,
    schema: PropSchema
  ): any[] {
    // Return empty array for now
    // Could be enhanced to generate sample items
    return [];
  }
}

interface PropsContext {
  sectionType?: string;
  pageType?: string;
}
```

## Implementation Steps

1. **Intent Parser** (Days 1-2)
   - Implement NLP parsing
   - Extract requirements
   - Test with various intents

2. **Component Selector** (Days 3-4)
   - Implement scoring algorithm
   - Add ranking logic
   - Test component selection

3. **Props Generator** (Day 5)
   - Generate default props
   - Context-aware generation
   - Test prop generation

4. **Page Composer** (Days 6-7)
   - Integrate components
   - Section composition
   - Layout wrapping
   - Test end-to-end

5. **Refinement & Testing** (Days 8-9)
   - Iterative composition
   - Error handling
   - Integration tests

## Testing Strategy

```typescript
describe('AI Composition', () => {
  it('composes landing page from intent', async () => {
    const composition = await composer.compose({
      pageType: 'landing',
      sections: ['hero', 'features', 'pricing'],
      contentTypes: [],
      layout: 'standard',
      constraints: {},
      metadata: {}
    });

    expect(composition.sections).toContain('hero');
    expect(composition.sections).toContain('features');
    expect(composition.component).toBeDefined();
  });

  it('generates appropriate props', async () => {
    const props = await generator.generateProps(
      heroComponent,
      { sectionType: 'hero' }
    );

    expect(props.title).toBeTruthy();
    expect(typeof props.title).toBe('string');
  });
});
```

## Common Issues and Solutions

### Issue: Component Selection Inconsistent
**Problem**: Different components selected for same intent
**Solution**: Implement deterministic ranking with consistent scoring

### Issue: Generated Props Generic
**Problem**: Props lack context-specific content
**Solution**: Enhance context awareness in props generator

### Issue: Composition Too Complex
**Problem**: Generated pages have too many components
**Solution**: Add simplicity preference and component count limits

## Acceptance Criteria

- [ ] Intent parser extracts requirements accurately
- [ ] Component selector chooses appropriate components
- [ ] Props generator creates sensible defaults
- [ ] Composer creates valid page structures
- [ ] Generated compositions pass validation
- [ ] Test coverage exceeds 85%