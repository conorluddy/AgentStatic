# Phase 3: AI-Friendly Validation Implementation

## Overview

This phase implements comprehensive validation for AI-generated compositions with a focus on providing clear, actionable error messages and automatic fix suggestions. The validation system helps AI agents understand what's wrong and how to fix it, enabling iterative improvement of generated compositions.

## Goals

1. Implement comprehensive composition validation
2. Format errors in AI-friendly structure
3. Generate fix suggestions for common errors
4. Provide validation quality scoring
5. Create validation learning system

## Technical Specification

### Composition Validator

```typescript
// src/ai/validation/composition-validator.ts
import { ComponentRegistry } from '../../registry';
import { ASTValidator } from '../../build/ast/validator';

export class CompositionValidator {
  constructor(
    private registry: ComponentRegistry,
    private astValidator: ASTValidator
  ) {}

  /**
   * Validate complete composition
   */
  async validate(
    composition: any,
    options?: ValidationOptions
  ): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: string[] = [];

    // Structural validation
    await this.validateStructure(composition, errors);

    // Component existence validation
    await this.validateComponents(composition, errors);

    // Props validation
    await this.validateProps(composition, errors, warnings);

    // Slots validation
    await this.validateSlots(composition, errors, warnings);

    // Semantic validation
    await this.validateSemantics(composition, warnings, suggestions);

    // Generate fix suggestions
    const fixes = this.generateFixes(errors);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      fixes,
      score: this.calculateScore(errors, warnings)
    };
  }

  /**
   * Validate composition structure
   */
  private async validateStructure(
    composition: any,
    errors: ValidationError[]
  ): Promise<void> {
    if (!composition) {
      errors.push({
        type: 'missing_composition',
        message: 'Composition is null or undefined',
        path: '$',
        severity: 'error',
        fix: {
          description: 'Provide a valid composition object',
          example: {
            component: 'Page',
            children: []
          }
        }
      });
      return;
    }

    if (!composition.component) {
      errors.push({
        type: 'missing_component',
        message: 'Component name is required',
        path: '$.component',
        severity: 'error',
        fix: {
          description: 'Add component property',
          example: { component: 'Page' }
        }
      });
    }

    // Validate children structure
    if (composition.children && !Array.isArray(composition.children)) {
      errors.push({
        type: 'invalid_children',
        message: 'Children must be an array',
        path: '$.children',
        severity: 'error',
        fix: {
          description: 'Wrap children in array',
          before: composition.children,
          after: [composition.children]
        }
      });
    }
  }

  /**
   * Validate component existence
   */
  private async validateComponents(
    composition: any,
    errors: ValidationError[]
  ): Promise<void> {
    await this.walkComposition(composition, async (node, path) => {
      if (!node.component) return;

      const component = await this.registry.getComponent(node.component);

      if (!component) {
        errors.push({
          type: 'unknown_component',
          message: `Component not found: ${node.component}`,
          path,
          severity: 'error',
          fix: {
            description: 'Use discover_components tool to find valid components',
            toolCall: {
              tool: 'discover_components',
              args: {
                query: node.component,
                limit: 5
              }
            }
          }
        });
      }
    });
  }

  /**
   * Validate props
   */
  private async validateProps(
    composition: any,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): Promise<void> {
    await this.walkComposition(composition, async (node, path) => {
      if (!node.component) return;

      const component = await this.registry.getComponent(node.component);
      if (!component || !component.schema?.props) return;

      const providedProps = node.props || {};

      // Check required props
      for (const [propName, propSchema] of Object.entries(
        component.schema.props
      )) {
        if (propSchema.required && !(propName in providedProps)) {
          errors.push({
            type: 'missing_required_prop',
            message: `Required prop missing: ${propName}`,
            path: `${path}.props.${propName}`,
            severity: 'error',
            fix: {
              description: `Add required prop "${propName}"`,
              example: {
                ...providedProps,
                [propName]: propSchema.example || propSchema.default || '<value>'
              },
              toolCall: {
                tool: 'get_component_details',
                args: { component: node.component }
              }
            }
          });
        }
      }

      // Check prop types
      for (const [propName, propValue] of Object.entries(providedProps)) {
        const propSchema = component.schema.props[propName];

        if (!propSchema) {
          warnings.push({
            type: 'unknown_prop',
            message: `Unknown prop: ${propName}`,
            path: `${path}.props.${propName}`,
            severity: 'warning',
            suggestion: 'Remove unknown prop or check component documentation'
          });
          continue;
        }

        // Validate type
        const typeValid = this.validatePropType(
          propValue,
          propSchema
        );

        if (!typeValid) {
          errors.push({
            type: 'invalid_prop_type',
            message: `Invalid type for prop ${propName}. Expected ${propSchema.type}, got ${typeof propValue}`,
            path: `${path}.props.${propName}`,
            severity: 'error',
            fix: {
              description: `Convert ${propName} to ${propSchema.type}`,
              before: propValue,
              after: this.convertPropType(propValue, propSchema.type)
            }
          });
        }

        // Validate enum
        if (propSchema.enum && !propSchema.enum.includes(propValue)) {
          errors.push({
            type: 'invalid_enum_value',
            message: `Invalid value for ${propName}. Must be one of: ${propSchema.enum.join(', ')}`,
            path: `${path}.props.${propName}`,
            severity: 'error',
            fix: {
              description: `Use valid enum value`,
              options: propSchema.enum,
              suggestion: propSchema.enum[0]
            }
          });
        }
      }
    });
  }

  /**
   * Validate slots
   */
  private async validateSlots(
    composition: any,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): Promise<void> {
    await this.walkComposition(composition, async (node, path) => {
      if (!node.component) return;

      const component = await this.registry.getComponent(node.component);
      if (!component || !component.slots) return;

      const providedSlots = node.slots || {};

      // Check required slots
      for (const [slotName, slotDef] of Object.entries(component.slots)) {
        if (slotDef.required && !(slotName in providedSlots)) {
          warnings.push({
            type: 'missing_required_slot',
            message: `Required slot missing: ${slotName}`,
            path: `${path}.slots.${slotName}`,
            severity: 'warning',
            suggestion: slotDef.example || `Add content to ${slotName} slot`
          });
        }
      }

      // Validate slot content
      for (const [slotName, slotContent] of Object.entries(providedSlots)) {
        const slotDef = component.slots[slotName];

        if (!slotDef) {
          warnings.push({
            type: 'unknown_slot',
            message: `Unknown slot: ${slotName}`,
            path: `${path}.slots.${slotName}`,
            severity: 'warning',
            suggestion: `Valid slots: ${Object.keys(component.slots).join(', ')}`
          });
          continue;
        }

        // Validate accepted components
        if (slotDef.acceptedComponents && slotDef.acceptedComponents.length > 0) {
          await this.validateSlotContent(
            slotContent,
            slotDef,
            `${path}.slots.${slotName}`,
            errors
          );
        }
      }
    });
  }

  /**
   * Validate slot content types
   */
  private async validateSlotContent(
    content: any,
    slotDef: SlotDefinition,
    path: string,
    errors: ValidationError[]
  ): Promise<void> {
    if (!content || !content.component) return;

    const accepted = slotDef.acceptedComponents || [];

    if (accepted.length > 0 && !accepted.includes(content.component)) {
      errors.push({
        type: 'invalid_slot_content',
        message: `Component ${content.component} not accepted in this slot`,
        path,
        severity: 'error',
        fix: {
          description: 'Use accepted component type',
          accepted: accepted,
          toolCall: {
            tool: 'discover_components',
            args: {
              category: accepted[0],
              limit: 5
            }
          }
        }
      });
    }
  }

  /**
   * Validate semantic correctness
   */
  private async validateSemantics(
    composition: any,
    warnings: ValidationWarning[],
    suggestions: string[]
  ): Promise<void> {
    // Check for common anti-patterns
    const componentCount = this.countComponents(composition);

    if (componentCount > 20) {
      warnings.push({
        type: 'complexity_warning',
        message: 'Page has many components (>20), consider simplifying',
        path: '$',
        severity: 'warning',
        suggestion: 'Break into smaller sections or remove unnecessary components'
      });
    }

    // Check for missing essential sections
    const sections = this.extractSections(composition);

    if (!sections.includes('header') && !sections.includes('hero')) {
      suggestions.push(
        'Consider adding a header or hero section at the top'
      );
    }

    if (!sections.includes('footer')) {
      suggestions.push(
        'Consider adding a footer section'
      );
    }
  }

  /**
   * Generate automatic fixes
   */
  private generateFixes(errors: ValidationError[]): AutoFix[] {
    const fixes: AutoFix[] = [];

    for (const error of errors) {
      const fix = this.generateFixForError(error);
      if (fix) {
        fixes.push(fix);
      }
    }

    return fixes;
  }

  /**
   * Generate fix for specific error
   */
  private generateFixForError(error: ValidationError): AutoFix | null {
    switch (error.type) {
      case 'missing_required_prop':
        return {
          type: 'add_prop',
          description: error.fix?.description || 'Add missing prop',
          path: error.path,
          value: error.fix?.example
        };

      case 'invalid_prop_type':
        return {
          type: 'convert_type',
          description: error.fix?.description || 'Convert prop type',
          path: error.path,
          value: error.fix?.after
        };

      case 'invalid_enum_value':
        return {
          type: 'replace_value',
          description: 'Use valid enum value',
          path: error.path,
          value: error.fix?.suggestion
        };

      default:
        return null;
    }
  }

  /**
   * Calculate validation score (0-100)
   */
  private calculateScore(
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): number {
    const errorPenalty = 15;
    const warningPenalty = 5;

    const deductions =
      (errors.length * errorPenalty) +
      (warnings.length * warningPenalty);

    return Math.max(0, 100 - deductions);
  }

  /**
   * Validate prop type
   */
  private validatePropType(value: any, schema: PropSchema): boolean {
    const actualType = Array.isArray(value) ? 'array' : typeof value;

    if (schema.type === 'any') return true;

    return actualType === schema.type;
  }

  /**
   * Convert prop to correct type
   */
  private convertPropType(value: any, targetType: string): any {
    switch (targetType) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'array':
        return Array.isArray(value) ? value : [value];
      default:
        return value;
    }
  }

  /**
   * Walk composition tree
   */
  private async walkComposition(
    composition: any,
    visitor: (node: any, path: string) => Promise<void>,
    path = '$'
  ): Promise<void> {
    await visitor(composition, path);

    // Walk slots
    if (composition.slots) {
      for (const [slotName, slotContent] of Object.entries(
        composition.slots
      )) {
        await this.walkComposition(
          slotContent,
          visitor,
          `${path}.slots.${slotName}`
        );
      }
    }

    // Walk children
    if (composition.children && Array.isArray(composition.children)) {
      for (let i = 0; i < composition.children.length; i++) {
        await this.walkComposition(
          composition.children[i],
          visitor,
          `${path}.children[${i}]`
        );
      }
    }
  }
}

interface ValidationOptions {
  strict?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
  fixes: AutoFix[];
  score: number;
}

export interface ValidationError {
  type: string;
  message: string;
  path: string;
  severity: 'error';
  fix?: {
    description: string;
    example?: any;
    before?: any;
    after?: any;
    options?: any[];
    suggestion?: any;
    toolCall?: {
      tool: string;
      args: any;
    };
  };
}

export interface ValidationWarning {
  type: string;
  message: string;
  path: string;
  severity: 'warning';
  suggestion?: string;
}

export interface AutoFix {
  type: string;
  description: string;
  path: string;
  value: any;
}
```

### Error Formatter

```typescript
// src/ai/validation/error-formatter.ts
export class ErrorFormatter {
  /**
   * Format errors for AI consumption
   */
  formatForAI(result: ValidationResult): AIValidationReport {
    return {
      summary: this.createSummary(result),
      errors: result.errors.map(e => this.formatError(e)),
      warnings: result.warnings.map(w => this.formatWarning(w)),
      nextSteps: this.generateNextSteps(result),
      score: result.score,
      canAutoFix: result.fixes.length > 0
    };
  }

  /**
   * Create validation summary
   */
  private createSummary(result: ValidationResult): string {
    if (result.valid) {
      return `✅ Composition is valid (score: ${result.score}/100)`;
    }

    const parts: string[] = [];

    if (result.errors.length > 0) {
      parts.push(`${result.errors.length} error(s)`);
    }

    if (result.warnings.length > 0) {
      parts.push(`${result.warnings.length} warning(s)`);
    }

    return `❌ Validation failed: ${parts.join(', ')} (score: ${result.score}/100)`;
  }

  /**
   * Format single error
   */
  private formatError(error: ValidationError): FormattedError {
    return {
      type: error.type,
      message: error.message,
      location: error.path,
      howToFix: error.fix?.description || 'See documentation',
      example: error.fix?.example,
      toolSuggestion: error.fix?.toolCall
    };
  }

  /**
   * Format warning
   */
  private formatWarning(warning: ValidationWarning): FormattedWarning {
    return {
      type: warning.type,
      message: warning.message,
      location: warning.path,
      suggestion: warning.suggestion
    };
  }

  /**
   * Generate next steps for AI
   */
  private generateNextSteps(result: ValidationResult): string[] {
    const steps: string[] = [];

    if (result.errors.length > 0) {
      steps.push('Fix all errors before proceeding');

      // Group errors by type
      const errorTypes = new Set(result.errors.map(e => e.type));

      if (errorTypes.has('unknown_component')) {
        steps.push('Use discover_components tool to find valid components');
      }

      if (errorTypes.has('missing_required_prop')) {
        steps.push('Use get_component_details to see required props');
      }
    }

    if (result.warnings.length > 0 && result.errors.length === 0) {
      steps.push('Address warnings to improve quality');
    }

    if (result.suggestions.length > 0) {
      steps.push('Consider suggestions for better composition');
    }

    return steps;
  }
}

interface AIValidationReport {
  summary: string;
  errors: FormattedError[];
  warnings: FormattedWarning[];
  nextSteps: string[];
  score: number;
  canAutoFix: boolean;
}

interface FormattedError {
  type: string;
  message: string;
  location: string;
  howToFix: string;
  example?: any;
  toolSuggestion?: {
    tool: string;
    args: any;
  };
}

interface FormattedWarning {
  type: string;
  message: string;
  location: string;
  suggestion?: string;
}
```

### Auto-Fix Engine

```typescript
// src/ai/validation/auto-fix.ts
export class AutoFixEngine {
  /**
   * Apply automatic fixes to composition
   */
  applyFixes(
    composition: any,
    fixes: AutoFix[]
  ): FixResult {
    let modified = JSON.parse(JSON.stringify(composition));
    const applied: AutoFix[] = [];
    const failed: { fix: AutoFix; reason: string }[] = [];

    for (const fix of fixes) {
      try {
        modified = this.applyFix(modified, fix);
        applied.push(fix);
      } catch (error) {
        failed.push({
          fix,
          reason: error.message
        });
      }
    }

    return {
      composition: modified,
      applied,
      failed,
      success: failed.length === 0
    };
  }

  /**
   * Apply single fix
   */
  private applyFix(composition: any, fix: AutoFix): any {
    const pathParts = this.parsePath(fix.path);

    let current = composition;
    let parent = null;
    let lastKey = null;

    // Navigate to target location
    for (let i = 0; i < pathParts.length - 1; i++) {
      parent = current;
      lastKey = pathParts[i];
      current = current[lastKey];

      if (!current) {
        throw new Error(`Path not found: ${fix.path}`);
      }
    }

    // Apply fix based on type
    const finalKey = pathParts[pathParts.length - 1];

    switch (fix.type) {
      case 'add_prop':
        current[finalKey] = fix.value;
        break;

      case 'convert_type':
        current[finalKey] = fix.value;
        break;

      case 'replace_value':
        current[finalKey] = fix.value;
        break;

      default:
        throw new Error(`Unknown fix type: ${fix.type}`);
    }

    return composition;
  }

  /**
   * Parse JSONPath to array
   */
  private parsePath(path: string): string[] {
    return path
      .replace(/^\$\./, '')
      .split('.')
      .map(part => part.replace(/\[(\d+)\]/, '.$1'))
      .join('.')
      .split('.');
  }
}

interface FixResult {
  composition: any;
  applied: AutoFix[];
  failed: { fix: AutoFix; reason: string }[];
  success: boolean;
}
```

## Implementation Steps

1. **Core Validator** (Days 1-2)
   - Implement validation logic
   - Add error collection
   - Test validation rules

2. **Error Formatting** (Day 3)
   - Format errors for AI
   - Generate fix suggestions
   - Test error messages

3. **Auto-Fix Engine** (Days 4-5)
   - Implement fix application
   - Test automatic fixes
   - Handle edge cases

4. **Integration** (Day 6)
   - Connect to MCP tools
   - End-to-end testing
   - Performance optimization

## Testing Strategy

```typescript
describe('Composition Validator', () => {
  it('detects missing required props', async () => {
    const result = await validator.validate({
      component: 'Card',
      props: {} // Missing required props
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        type: 'missing_required_prop'
      })
    );
  });

  it('provides fix suggestions', async () => {
    const result = await validator.validate(invalidComposition);

    expect(result.fixes.length).toBeGreaterThan(0);
    expect(result.fixes[0]).toHaveProperty('description');
  });
});
```

## Common Issues and Solutions

### Issue: Too Many Validation Errors
**Problem**: Overwhelming number of errors for AI
**Solution**: Prioritize and group related errors

### Issue: Unclear Fix Suggestions
**Problem**: AI doesn't understand how to fix
**Solution**: Provide concrete examples and tool calls

### Issue: Auto-Fix Breaks Composition
**Problem**: Automatic fixes create invalid state
**Solution**: Validate after each fix, rollback if invalid

## Acceptance Criteria

- [ ] Validation detects all error types
- [ ] Error messages are clear and actionable
- [ ] Fix suggestions are accurate
- [ ] Auto-fix applies corrections safely
- [ ] Validation score correlates with quality
- [ ] Test coverage exceeds 90%