# Phase 3: Runtime Validation & Error Handling
## Timeline: Week 5 (Dec 2-8, 2024)

### Overview
This phase implements comprehensive runtime validation, error handling, and recovery mechanisms for component registration and usage. It ensures type safety, provides actionable error messages, and supports graceful degradation.

### Prerequisites
- Schema system (Phase 1) completed
- Registry generation (Phase 2) operational
- Validation framework established

---

## 1. Validation Engine

### 1.1 Enhanced Validator

```typescript
// src/registry/validation/engine.ts
import Ajv, { ValidateFunction, ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

export interface ValidationContext {
  componentId: string;
  path: string[];
  strict: boolean;
  coerce?: boolean;
}

export interface ValidationOptions {
  strict?: boolean;
  allErrors?: boolean;
  coerceTypes?: boolean;
  removeAdditional?: boolean | 'all' | 'failing';
}

export class ValidationEngine {
  private ajv: Ajv;
  private schemas: Map<string, ValidateFunction> = new Map();
  private customValidators: Map<string, CustomValidator> = new Map();

  constructor(options: ValidationOptions = {}) {
    this.ajv = new Ajv({
      allErrors: options.allErrors ?? true,
      verbose: true,
      strict: options.strict ?? false,
      coerceTypes: options.coerceTypes ?? true,
      removeAdditional: options.removeAdditional ?? false,
      useDefaults: true
    });

    addFormats(this.ajv);
    addErrors(this.ajv);

    this.registerCustomFormats();
    this.registerCustomKeywords();
  }

  private registerCustomFormats(): void {
    // CSS color format
    this.ajv.addFormat('css-color', {
      type: 'string',
      validate: (value: string) => {
        return /^(#[0-9a-f]{3,8}|rgb|hsl|var\()/.test(value);
      }
    });

    // Component ID format
    this.ajv.addFormat('component-id', {
      type: 'string',
      validate: (value: string) => {
        return /^[a-z][a-z0-9-]*$/.test(value);
      }
    });

    // Semantic version
    this.ajv.addFormat('semver', {
      type: 'string',
      validate: (value: string) => {
        return /^\d+\.\d+\.\d+(-[a-z0-9.-]+)?$/.test(value);
      }
    });
  }

  private registerCustomKeywords(): void {
    // Custom keyword: componentExists
    this.ajv.addKeyword({
      keyword: 'componentExists',
      validate: (schema: any, data: any, parentSchema: any, context: any) => {
        if (typeof data !== 'string') return false;
        // Check if component exists in registry
        return this.schemas.has(data);
      },
      errors: true
    });

    // Custom keyword: validCSS
    this.ajv.addKeyword({
      keyword: 'validCSS',
      validate: (schema: any, data: any) => {
        if (typeof data !== 'string') return false;
        // Basic CSS validation
        return !data.includes('<script') && !data.includes('javascript:');
      },
      errors: true
    });
  }

  public registerSchema(id: string, schema: JSONSchemaDefinition): void {
    try {
      this.ajv.addSchema(schema, id);
      const validator = this.ajv.getSchema(id);

      if (validator) {
        this.schemas.set(id, validator);
      }
    } catch (error) {
      throw new ValidationError(
        `Failed to register schema for ${id}: ${error.message}`,
        'schema-registration',
        []
      );
    }
  }

  public validate(
    componentId: string,
    data: any,
    context?: Partial<ValidationContext>
  ): ValidationResult {
    const validator = this.schemas.get(componentId);

    if (!validator) {
      return {
        valid: false,
        errors: [{
          message: `No schema registered for component: ${componentId}`,
          path: '',
          type: 'schema-not-found',
          severity: 'error'
        }]
      };
    }

    const valid = validator(data);

    if (valid) {
      return { valid: true, errors: [], warnings: [] };
    }

    const errors = this.transformErrors(validator.errors || [], context);
    const warnings = this.extractWarnings(errors);

    return {
      valid: false,
      errors: errors.filter(e => e.severity === 'error'),
      warnings
    };
  }

  private transformErrors(
    ajvErrors: ErrorObject[],
    context?: Partial<ValidationContext>
  ): EnhancedValidationError[] {
    return ajvErrors.map(err => {
      const path = err.instancePath || '/';
      const property = path.split('/').pop() || 'root';

      return {
        message: this.enhanceErrorMessage(err),
        path,
        property,
        type: err.keyword,
        severity: this.determineSeverity(err),
        suggestion: this.generateSuggestion(err),
        params: err.params,
        schemaPath: err.schemaPath
      };
    });
  }

  private enhanceErrorMessage(error: ErrorObject): string {
    const property = error.instancePath.split('/').pop() || 'value';

    switch (error.keyword) {
      case 'required':
        return `Missing required property: ${error.params.missingProperty}`;

      case 'enum':
        const allowed = error.params.allowedValues.join(', ');
        return `Invalid value for "${property}". Must be one of: ${allowed}`;

      case 'type':
        return `Invalid type for "${property}". Expected ${error.params.type}, got ${typeof error.data}`;

      case 'minLength':
        return `"${property}" must be at least ${error.params.limit} characters long`;

      case 'maxLength':
        return `"${property}" exceeds maximum length of ${error.params.limit} characters`;

      case 'pattern':
        return `"${property}" does not match required pattern`;

      case 'additionalProperties':
        return `Unknown property: ${error.params.additionalProperty}`;

      default:
        return error.message || 'Validation failed';
    }
  }

  private determineSeverity(error: ErrorObject): 'error' | 'warning' {
    // Some validation failures can be warnings
    const warningKeywords = ['deprecated', 'recommended'];

    if (warningKeywords.includes(error.keyword)) {
      return 'warning';
    }

    return 'error';
  }

  private generateSuggestion(error: ErrorObject): string | undefined {
    switch (error.keyword) {
      case 'enum':
        const values = error.params.allowedValues;
        if (typeof error.data === 'string' && values.length > 0) {
          // Find closest match using Levenshtein distance
          const closest = this.findClosestMatch(error.data, values);
          return `Did you mean "${closest}"?`;
        }
        break;

      case 'required':
        return `Add the required property: ${error.params.missingProperty}`;

      case 'additionalProperties':
        return `Remove the unknown property: ${error.params.additionalProperty}`;

      case 'type':
        if (error.params.type === 'object' && typeof error.data === 'string') {
          return 'Try wrapping the value in an object: { ... }';
        }
        break;
    }

    return undefined;
  }

  private findClosestMatch(input: string, options: string[]): string {
    let minDistance = Infinity;
    let closest = options[0];

    options.forEach(option => {
      const distance = this.levenshteinDistance(input, option);
      if (distance < minDistance) {
        minDistance = distance;
        closest = option;
      }
    });

    return closest;
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  private extractWarnings(errors: EnhancedValidationError[]): EnhancedValidationError[] {
    return errors.filter(e => e.severity === 'warning');
  }

  public registerCustomValidator(
    name: string,
    validator: CustomValidator
  ): void {
    this.customValidators.set(name, validator);

    this.ajv.addKeyword({
      keyword: name,
      validate: (schema: any, data: any) => validator.validate(data, schema),
      errors: true
    });
  }
}

export interface CustomValidator {
  validate(data: any, schema: any): boolean;
  errorMessage?(data: any): string;
}

export interface EnhancedValidationError {
  message: string;
  path: string;
  property: string;
  type: string;
  severity: 'error' | 'warning';
  suggestion?: string;
  params?: any;
  schemaPath?: string;
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public type: string,
    public errors: EnhancedValidationError[]
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

---

## 2. Error Reporting

### 2.1 Error Reporter

```typescript
// src/registry/validation/reporter.ts
export class ErrorReporter {
  private errors: Map<string, EnhancedValidationError[]> = new Map();
  private warnings: Map<string, EnhancedValidationError[]> = new Map();

  public report(
    componentId: string,
    result: ValidationResult
  ): FormattedReport {
    if (!result.valid) {
      this.errors.set(componentId, result.errors);
    }

    if (result.warnings && result.warnings.length > 0) {
      this.warnings.set(componentId, result.warnings);
    }

    return this.format(componentId, result);
  }

  private format(
    componentId: string,
    result: ValidationResult
  ): FormattedReport {
    const sections: string[] = [];

    // Header
    sections.push(this.formatHeader(componentId, result));

    // Errors
    if (result.errors.length > 0) {
      sections.push(this.formatErrors(result.errors));
    }

    // Warnings
    if (result.warnings && result.warnings.length > 0) {
      sections.push(this.formatWarnings(result.warnings));
    }

    // Summary
    sections.push(this.formatSummary(result));

    return {
      componentId,
      formatted: sections.join('\n\n'),
      severity: result.valid ? 'success' : 'error',
      errorCount: result.errors.length,
      warningCount: result.warnings?.length || 0
    };
  }

  private formatHeader(componentId: string, result: ValidationResult): string {
    const icon = result.valid ? '✓' : '✗';
    const status = result.valid ? 'VALID' : 'INVALID';
    const color = result.valid ? '\x1b[32m' : '\x1b[31m'; // Green or red
    const reset = '\x1b[0m';

    return `${color}${icon} Component: ${componentId} [${status}]${reset}`;
  }

  private formatErrors(errors: EnhancedValidationError[]): string {
    const lines = ['\x1b[31mErrors:\x1b[0m'];

    errors.forEach((error, index) => {
      lines.push(`  ${index + 1}. ${error.message}`);
      lines.push(`     Path: ${error.path}`);

      if (error.suggestion) {
        lines.push(`     💡 ${error.suggestion}`);
      }
    });

    return lines.join('\n');
  }

  private formatWarnings(warnings: EnhancedValidationError[]): string {
    const lines = ['\x1b[33mWarnings:\x1b[0m'];

    warnings.forEach((warning, index) => {
      lines.push(`  ${index + 1}. ${warning.message}`);
      lines.push(`     Path: ${warning.path}`);
    });

    return lines.join('\n');
  }

  private formatSummary(result: ValidationResult): string {
    const errorCount = result.errors.length;
    const warningCount = result.warnings?.length || 0;

    if (errorCount === 0 && warningCount === 0) {
      return '\x1b[32m✓ No issues found\x1b[0m';
    }

    const parts: string[] = [];

    if (errorCount > 0) {
      parts.push(`\x1b[31m${errorCount} error${errorCount > 1 ? 's' : ''}\x1b[0m`);
    }

    if (warningCount > 0) {
      parts.push(`\x1b[33m${warningCount} warning${warningCount > 1 ? 's' : ''}\x1b[0m`);
    }

    return `Summary: ${parts.join(', ')}`;
  }

  public getSummary(): ReportSummary {
    return {
      totalComponents: this.errors.size + this.warnings.size,
      componentsWithErrors: this.errors.size,
      componentsWithWarnings: this.warnings.size,
      totalErrors: Array.from(this.errors.values()).reduce((sum, errs) => sum + errs.length, 0),
      totalWarnings: Array.from(this.warnings.values()).reduce((sum, warns) => sum + warns.length, 0)
    };
  }

  public clear(): void {
    this.errors.clear();
    this.warnings.clear();
  }
}

export interface FormattedReport {
  componentId: string;
  formatted: string;
  severity: 'success' | 'warning' | 'error';
  errorCount: number;
  warningCount: number;
}

export interface ReportSummary {
  totalComponents: number;
  componentsWithErrors: number;
  componentsWithWarnings: number;
  totalErrors: number;
  totalWarnings: number;
}
```

---

## 3. Runtime Validation

### 3.1 Component Validator Middleware

```typescript
// src/registry/validation/middleware.ts
export class ValidationMiddleware {
  private engine: ValidationEngine;
  private reporter: ErrorReporter;
  private cache: Map<string, ValidationResult> = new Map();

  constructor(engine: ValidationEngine) {
    this.engine = engine;
    this.reporter = new ErrorReporter();
  }

  public validate(
    componentId: string,
    props: any,
    options: {
      cache?: boolean;
      throwOnError?: boolean;
      logWarnings?: boolean;
    } = {}
  ): ValidationResult {
    const cacheKey = `${componentId}:${JSON.stringify(props)}`;

    // Check cache
    if (options.cache !== false) {
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;
    }

    // Validate
    const result = this.engine.validate(componentId, props);

    // Report
    const report = this.reporter.report(componentId, result);
    if (!result.valid || (options.logWarnings && result.warnings?.length)) {
      console.log(report.formatted);
    }

    // Cache result
    if (options.cache !== false) {
      this.cache.set(cacheKey, result);
    }

    // Throw if configured
    if (options.throwOnError && !result.valid) {
      throw new ValidationError(
        `Component validation failed for: ${componentId}`,
        'component-validation',
        result.errors
      );
    }

    return result;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}
```

---

## 4. Graceful Degradation

### 4.1 Fallback System

```typescript
// src/registry/validation/fallback.ts
export interface FallbackStrategy {
  type: 'default' | 'empty' | 'error' | 'custom';
  handler?: (error: ValidationError) => any;
}

export class FallbackManager {
  private strategies: Map<string, FallbackStrategy> = new Map();
  private defaults: Map<string, any> = new Map();

  public registerFallback(
    componentId: string,
    strategy: FallbackStrategy
  ): void {
    this.strategies.set(componentId, strategy);
  }

  public registerDefault(componentId: string, defaultProps: any): void {
    this.defaults.set(componentId, defaultProps);
  }

  public handle(
    componentId: string,
    error: ValidationError,
    originalProps: any
  ): any {
    const strategy = this.strategies.get(componentId) || { type: 'default' };

    switch (strategy.type) {
      case 'default':
        return this.applyDefaults(componentId, originalProps);

      case 'empty':
        return {};

      case 'error':
        throw error;

      case 'custom':
        if (strategy.handler) {
          return strategy.handler(error);
        }
        return this.applyDefaults(componentId, originalProps);

      default:
        return originalProps;
    }
  }

  private applyDefaults(componentId: string, props: any): any {
    const defaults = this.defaults.get(componentId);

    if (!defaults) {
      return props;
    }

    return {
      ...defaults,
      ...props
    };
  }
}
```

---

## 5. Type Coercion

### 5.1 Coercion Engine

```typescript
// src/registry/validation/coercion.ts
export class TypeCoercion {
  public coerce(value: any, targetType: PropType): any {
    switch (targetType) {
      case 'string':
        return this.coerceToString(value);

      case 'number':
        return this.coerceToNumber(value);

      case 'boolean':
        return this.coerceToBoolean(value);

      case 'array':
        return this.coerceToArray(value);

      case 'object':
        return this.coerceToObject(value);

      case 'date':
        return this.coerceToDate(value);

      default:
        return value;
    }
  }

  private coerceToString(value: any): string {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  private coerceToNumber(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  private coerceToBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  }

  private coerceToArray(value: any): any[] {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined) return [];
    return [value];
  }

  private coerceToObject(value: any): any {
    if (typeof value === 'object' && value !== null) return value;
    return {};
  }

  private coerceToDate(value: any): Date {
    if (value instanceof Date) return value;
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  }
}
```

---

## 6. Testing

### 6.1 Validation Tests

```typescript
// src/tests/registry/validation.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ValidationEngine, ErrorReporter } from '@/registry/validation';

describe('Validation Engine', () => {
  let engine: ValidationEngine;

  beforeEach(() => {
    engine = new ValidationEngine({
      strict: false,
      coerceTypes: true
    });
  });

  describe('schema validation', () => {
    it('validates correct data', () => {
      const schema = {
        $id: 'test',
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name']
      };

      engine.registerSchema('test', schema);

      const result = engine.validate('test', {
        name: 'John',
        age: 30
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('detects missing required properties', () => {
      const schema = {
        $id: 'test',
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          name: { type: 'string' }
        },
        required: ['name']
      };

      engine.registerSchema('test', schema);

      const result = engine.validate('test', {});

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('required');
      expect(result.errors[0].message).toContain('name');
    });

    it('provides helpful suggestions', () => {
      const schema = {
        $id: 'test',
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          variant: {
            enum: ['primary', 'secondary', 'tertiary']
          }
        }
      };

      engine.registerSchema('test', schema);

      const result = engine.validate('test', {
        variant: 'primery' // Typo
      });

      expect(result.valid).toBe(false);
      expect(result.errors[0].suggestion).toContain('primary');
    });
  });

  describe('type coercion', () => {
    it('coerces string to number', () => {
      const schema = {
        $id: 'test',
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          count: { type: 'number' }
        }
      };

      engine.registerSchema('test', schema);

      const data = { count: '42' };
      const result = engine.validate('test', data);

      expect(result.valid).toBe(true);
      expect(data.count).toBe(42);
    });
  });
});

describe('Error Reporter', () => {
  it('formats validation errors', () => {
    const reporter = new ErrorReporter();

    const result: ValidationResult = {
      valid: false,
      errors: [{
        message: 'Missing required property: name',
        path: '/name',
        property: 'name',
        type: 'required',
        severity: 'error'
      }],
      warnings: []
    };

    const report = reporter.report('test-component', result);

    expect(report.formatted).toContain('test-component');
    expect(report.formatted).toContain('Missing required property');
    expect(report.errorCount).toBe(1);
  });
});
```

---

## Deliverables Checklist

### Phase 3 Completed Items

- [x] Enhanced validation engine
- [x] Error reporting system
- [x] Runtime validation middleware
- [x] Graceful degradation
- [x] Type coercion
- [x] Custom validators
- [x] Helpful error messages
- [x] Suggestions for common mistakes
- [x] Comprehensive tests

### Success Metrics

- [ ] Validates all component props correctly
- [ ] Provides actionable error messages
- [ ] Suggests fixes for common mistakes
- [ ] Handles type coercion automatically
- [ ] Falls back gracefully on errors
- [ ] Test coverage > 90%
