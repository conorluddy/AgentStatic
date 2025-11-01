# Error Handling Specification

**System-Wide Error Handling Patterns, Message Formats, and Recovery Strategies**

This document defines comprehensive error handling patterns for AgentStatic, including error categorization, message formatting, recovery strategies, and debugging support.

---

## Error Categories

### 1. Build-Time Errors (Fatal)
Errors that prevent successful build completion and must be fixed before proceeding.

```typescript
enum BuildErrorCode {
  // Component resolution errors
  COMPONENT_NOT_FOUND = 'ERROR_COMPONENT_NOT_FOUND',
  COMPONENT_PARSE_FAILED = 'ERROR_COMPONENT_PARSE_FAILED',
  TEMPLATE_COMPILE_FAILED = 'ERROR_TEMPLATE_COMPILE_FAILED',

  // JSON/AST errors
  INVALID_PAGE_JSON = 'ERROR_INVALID_PAGE_JSON',
  AST_GENERATION_FAILED = 'ERROR_AST_GENERATION_FAILED',
  AST_INVALID_STRUCTURE = 'ERROR_AST_INVALID_STRUCTURE',

  // Dependency errors
  CIRCULAR_DEPENDENCY = 'ERROR_CIRCULAR_DEPENDENCY',
  MISSING_DEPENDENCY = 'ERROR_MISSING_DEPENDENCY',

  // File system errors
  FILE_NOT_FOUND = 'ERROR_FILE_NOT_FOUND',
  FILE_READ_FAILED = 'ERROR_FILE_READ_FAILED',
  FILE_WRITE_FAILED = 'ERROR_FILE_WRITE_FAILED',

  // Configuration errors
  INVALID_CONFIG = 'ERROR_INVALID_CONFIG',
  MISSING_REQUIRED_CONFIG = 'ERROR_MISSING_REQUIRED_CONFIG'
}
```

### 2. Validation Errors (May be Fatal or Warnings)
Errors related to content validation that may be configured to block or warn.

```typescript
enum ValidationErrorCode {
  // Props validation
  INVALID_PROPS = 'ERROR_INVALID_PROPS',
  MISSING_REQUIRED_PROP = 'ERROR_MISSING_REQUIRED_PROP',
  INVALID_PROP_TYPE = 'ERROR_INVALID_PROP_TYPE',
  INVALID_PROP_VALUE = 'ERROR_INVALID_PROP_VALUE',

  // Slot validation
  SLOT_VALIDATION_FAILED = 'ERROR_SLOT_VALIDATION',
  MISSING_REQUIRED_SLOT = 'ERROR_MISSING_REQUIRED_SLOT',
  INVALID_SLOT_CONTENT = 'ERROR_INVALID_SLOT_CONTENT',
  SLOT_CARDINALITY_VIOLATION = 'ERROR_SLOT_CARDINALITY',

  // Schema validation
  SCHEMA_VALIDATION_FAILED = 'ERROR_SCHEMA_VALIDATION',
  SCHEMA_NOT_FOUND = 'ERROR_SCHEMA_NOT_FOUND'
}
```

### 3. Runtime Errors (Dev Server, MCP Tools)
Errors that occur during development server operation or MCP tool execution.

```typescript
enum RuntimeErrorCode {
  // Server errors
  SERVER_START_FAILED = 'ERROR_SERVER_START_FAILED',
  PORT_IN_USE = 'ERROR_PORT_IN_USE',
  WATCH_FAILED = 'ERROR_WATCH_FAILED',

  // MCP tool errors
  TOOL_EXECUTION_FAILED = 'ERROR_TOOL_EXECUTION_FAILED',
  INVALID_TOOL_INPUT = 'ERROR_INVALID_TOOL_INPUT',
  REGISTRY_QUERY_FAILED = 'ERROR_REGISTRY_QUERY_FAILED',

  // Rendering errors
  RENDER_FAILED = 'ERROR_RENDER_FAILED',
  TEMPLATE_ERROR = 'ERROR_TEMPLATE_ERROR'
}
```

---

## Error Message Format

### Error Object Structure
```typescript
interface ErrorMessage {
  // Error code for programmatic handling
  code: string;

  // Severity level
  severity: 'error' | 'warning' | 'info';

  // Human-readable message
  message: string;

  // Location information
  location?: ErrorLocation;

  // How to fix this error
  suggestion?: string;

  // Related documentation
  documentation?: string;

  // Original error (if wrapped)
  cause?: Error;

  // Stack trace
  stack?: string;

  // Additional context
  context?: Record<string, any>;
}

interface ErrorLocation {
  // Source file
  file?: string;

  // Line and column numbers
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;

  // Component context
  component?: string;

  // AST path
  path?: string[];

  // Code snippet
  snippet?: string;
}
```

### Error Formatting
```typescript
class ErrorFormatter {
  format(error: ErrorMessage): string {
    const parts: string[] = [];

    // Header with severity
    parts.push(this.formatHeader(error));

    // Location if available
    if (error.location) {
      parts.push(this.formatLocation(error.location));
    }

    // Message
    parts.push(`\n${error.message}\n`);

    // Code snippet if available
    if (error.location?.snippet) {
      parts.push(this.formatCodeSnippet(error.location));
    }

    // Suggestion if available
    if (error.suggestion) {
      parts.push(this.formatSuggestion(error.suggestion));
    }

    // Documentation link if available
    if (error.documentation) {
      parts.push(`\nLearn more: ${error.documentation}`);
    }

    return parts.join('\n');
  }

  private formatHeader(error: ErrorMessage): string {
    const emoji = {
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }[error.severity];

    return `${emoji} ${error.severity.toUpperCase()}: ${error.code}`;
  }

  private formatLocation(location: ErrorLocation): string {
    const parts: string[] = [];

    if (location.file) {
      parts.push(`File: ${location.file}`);
    }

    if (location.line !== undefined) {
      parts.push(`Line: ${location.line}`);

      if (location.column !== undefined) {
        parts[parts.length - 1] += `:${location.column}`;
      }
    }

    if (location.component) {
      parts.push(`Component: ${location.component}`);
    }

    if (location.path && location.path.length > 0) {
      parts.push(`Path: ${location.path.join(' > ')}`);
    }

    return parts.join('\n');
  }

  private formatCodeSnippet(location: ErrorLocation): string {
    if (!location.snippet || !location.line) {
      return '';
    }

    const lines = location.snippet.split('\n');
    const startLine = Math.max(0, (location.line || 1) - 3);
    const endLine = Math.min(lines.length, (location.line || 1) + 2);

    const snippet: string[] = ['\nCode:'];

    for (let i = startLine; i < endLine; i++) {
      const lineNum = i + 1;
      const prefix = lineNum === location.line ? '>' : ' ';
      snippet.push(`${prefix} ${lineNum.toString().padStart(4)} | ${lines[i]}`);

      // Add column indicator
      if (lineNum === location.line && location.column) {
        const spaces = ' '.repeat(location.column + 7);
        snippet.push(`${spaces}^`);
      }
    }

    return snippet.join('\n');
  }

  private formatSuggestion(suggestion: string): string {
    return `\nSuggestion:\n  ${suggestion}`;
  }
}
```

---

## Error Codes and Messages

### Component Not Found
```typescript
class ComponentNotFoundError extends BuildError {
  constructor(
    componentId: string,
    searchedPaths: string[],
    suggestions: string[] = []
  ) {
    const message = `Component "${componentId}" could not be found`;

    const suggestion = suggestions.length > 0
      ? `Did you mean one of these?\n  ${suggestions.map(s => `- ${s}`).join('\n  ')}`
      : 'Check that the component exists and the ID is correct';

    super({
      code: 'ERROR_COMPONENT_NOT_FOUND',
      severity: 'error',
      message,
      suggestion,
      context: {
        componentId,
        searchedPaths,
        suggestions
      },
      documentation: 'https://docs.agentstatic.com/errors/component-not-found'
    });
  }
}

// Usage:
throw new ComponentNotFoundError(
  'atoms/buttom', // typo
  ['/components/atoms/buttom.njk'],
  ['atoms/button'] // suggestion
);

// Output:
// ❌ ERROR: ERROR_COMPONENT_NOT_FOUND
//
// Component "atoms/buttom" could not be found
//
// Suggestion:
//   Did you mean one of these?
//   - atoms/button
//
// Learn more: https://docs.agentstatic.com/errors/component-not-found
```

### Invalid Props
```typescript
class InvalidPropsError extends ValidationError {
  constructor(
    componentId: string,
    propErrors: PropError[],
    location?: ErrorLocation
  ) {
    const message = `Component "${componentId}" has invalid props`;

    const details = propErrors.map(err => {
      const parts = [`  ❌ ${err.prop}: ${err.message}`];

      if (err.expected) {
        parts.push(`     Expected: ${err.expected}`);
      }

      if (err.received !== undefined) {
        parts.push(`     Received: ${JSON.stringify(err.received)}`);
      }

      return parts.join('\n');
    }).join('\n\n');

    super({
      code: 'ERROR_INVALID_PROPS',
      severity: 'error',
      message: `${message}\n\n${details}`,
      location,
      suggestion: 'Check the component schema for required props and types',
      context: {
        componentId,
        propErrors
      },
      documentation: 'https://docs.agentstatic.com/errors/invalid-props'
    });
  }
}

interface PropError {
  prop: string;
  message: string;
  expected?: string;
  received?: any;
}

// Usage:
throw new InvalidPropsError(
  'atoms/button',
  [
    {
      prop: 'text',
      message: 'Missing required prop',
      expected: 'string',
      received: undefined
    },
    {
      prop: 'variant',
      message: 'Invalid value',
      expected: 'one of: primary, secondary, ghost',
      received: 'danger'
    }
  ],
  {
    file: 'pages/home.json',
    line: 15,
    component: 'atoms/button'
  }
);

// Output:
// ❌ ERROR: ERROR_INVALID_PROPS
// File: pages/home.json
// Line: 15
// Component: atoms/button
//
// Component "atoms/button" has invalid props
//
//   ❌ text: Missing required prop
//      Expected: string
//      Received: undefined
//
//   ❌ variant: Invalid value
//      Expected: one of: primary, secondary, ghost
//      Received: "danger"
//
// Suggestion:
//   Check the component schema for required props and types
```

### Slot Validation
```typescript
class SlotValidationError extends ValidationError {
  constructor(
    componentId: string,
    slotErrors: SlotError[],
    location?: ErrorLocation
  ) {
    const message = `Component "${componentId}" has slot validation errors`;

    const details = slotErrors.map(err => {
      switch (err.type) {
        case 'missing_required':
          return `  ❌ Missing required slot: "${err.slot}"`;

        case 'unknown_slot':
          return `  ❌ Unknown slot: "${err.slot}"\n     This component doesn't accept this slot`;

        case 'invalid_content':
          return `  ❌ Invalid content in slot "${err.slot}"\n     ${err.message}`;

        case 'cardinality':
          return `  ❌ Slot "${err.slot}" cardinality violation\n     ${err.message}`;

        default:
          return `  ❌ ${err.message}`;
      }
    }).join('\n\n');

    super({
      code: 'ERROR_SLOT_VALIDATION',
      severity: 'error',
      message: `${message}\n\n${details}`,
      location,
      suggestion: 'Check the component schema for required slots and allowed content',
      context: {
        componentId,
        slotErrors
      }
    });
  }
}

interface SlotError {
  type: 'missing_required' | 'unknown_slot' | 'invalid_content' | 'cardinality';
  slot: string;
  message: string;
}
```

### Circular Dependency
```typescript
class CircularDependencyError extends BuildError {
  constructor(cycle: string[]) {
    const chain = cycle.join(' → ');

    super({
      code: 'ERROR_CIRCULAR_DEPENDENCY',
      severity: 'error',
      message: `Circular dependency detected:\n  ${chain}`,
      suggestion: 'Components cannot include themselves directly or indirectly. Refactor to break the cycle.',
      context: { cycle },
      documentation: 'https://docs.agentstatic.com/errors/circular-dependency'
    });
  }
}

// Usage:
throw new CircularDependencyError([
  'molecules/card',
  'molecules/card-header',
  'molecules/card'
]);

// Output:
// ❌ ERROR: ERROR_CIRCULAR_DEPENDENCY
//
// Circular dependency detected:
//   molecules/card → molecules/card-header → molecules/card
//
// Suggestion:
//   Components cannot include themselves directly or indirectly.
//   Refactor to break the cycle.
```

### Accessibility Warnings
```typescript
class AccessibilityWarning extends ValidationWarning {
  constructor(
    issue: A11yIssue,
    location?: ErrorLocation
  ) {
    super({
      code: `WARNING_A11Y_${issue.wcag.replace(/\./g, '_')}`,
      severity: 'warning',
      message: issue.message,
      location,
      suggestion: issue.suggestion,
      context: {
        wcag: issue.wcag,
        impact: issue.impact
      },
      documentation: `https://www.w3.org/WAI/WCAG21/Understanding/${issue.wcag}`
    });
  }
}

interface A11yIssue {
  wcag: string;
  message: string;
  suggestion: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
}

// Usage:
throw new AccessibilityWarning(
  {
    wcag: '1.1.1',
    message: 'Image missing alt text',
    suggestion: 'Add alt attribute with descriptive text',
    impact: 'serious'
  },
  {
    file: 'pages/home.json',
    line: 42,
    component: 'molecules/card'
  }
);

// Output:
// ⚠️  WARNING: WARNING_A11Y_1_1_1
// File: pages/home.json
// Line: 42
// Component: molecules/card
//
// Image missing alt text
//
// Suggestion:
//   Add alt attribute with descriptive text
//
// Learn more: https://www.w3.org/WAI/WCAG21/Understanding/1.1.1
```

---

## Recovery Strategies

### Component Not Found Recovery
```typescript
class ComponentFallbackHandler {
  handleMissingComponent(
    componentId: string,
    context: RenderContext
  ): RenderResult {
    // Log error
    this.logger.error(
      new ComponentNotFoundError(
        componentId,
        this.getSearchPaths(componentId),
        this.getSuggestions(componentId)
      )
    );

    // Development mode: Render error component
    if (context.environment === 'development') {
      return {
        html: this.renderErrorComponent(componentId),
        error: true
      };
    }

    // Production mode: Skip component with HTML comment
    if (context.environment === 'production') {
      return {
        html: `<!-- Component not found: ${componentId} -->`,
        error: true
      };
    }

    // Test mode: Throw error
    throw new ComponentNotFoundError(componentId, [], []);
  }

  private renderErrorComponent(componentId: string): string {
    return `
      <div class="error-component" role="alert">
        <h3>⚠️ Component Not Found</h3>
        <p><strong>Component ID:</strong> ${componentId}</p>
        <p>This component does not exist. Check the console for suggestions.</p>
      </div>
    `;
  }

  private getSuggestions(componentId: string): string[] {
    const allComponents = this.registry.getAllComponentIds();

    // Use Levenshtein distance for fuzzy matching
    return allComponents
      .map(id => ({
        id,
        distance: this.levenshteinDistance(componentId, id)
      }))
      .filter(item => item.distance < 5)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map(item => item.id);
  }
}
```

### Invalid Props Recovery
```typescript
class PropsFallbackHandler {
  handleInvalidProps(
    componentId: string,
    props: any,
    schema: ComponentSchema,
    strict: boolean = false
  ): any {
    if (strict) {
      throw new InvalidPropsError(componentId, this.validateProps(props, schema));
    }

    const sanitized = { ...props };
    const warnings: PropError[] = [];

    // Fill in missing required props with defaults
    for (const [key, propSchema] of Object.entries(schema.props || {})) {
      if (propSchema.required && !(key in sanitized)) {
        if (propSchema.default !== undefined) {
          sanitized[key] = propSchema.default;

          warnings.push({
            prop: key,
            message: `Using default value for missing required prop`,
            expected: propSchema.type,
            received: propSchema.default
          });
        } else {
          // No default available - use sensible fallback
          sanitized[key] = this.getFallbackValue(propSchema.type);

          warnings.push({
            prop: key,
            message: `Using fallback value for missing required prop`,
            expected: propSchema.type,
            received: sanitized[key]
          });
        }
      }

      // Coerce types if possible
      if (key in sanitized) {
        const coerced = this.coerceType(sanitized[key], propSchema.type);

        if (coerced !== sanitized[key]) {
          sanitized[key] = coerced;

          warnings.push({
            prop: key,
            message: 'Type coerced to match schema',
            expected: propSchema.type,
            received: coerced
          });
        }
      }
    }

    // Remove unknown props
    for (const key of Object.keys(sanitized)) {
      if (!schema.props || !schema.props[key]) {
        delete sanitized[key];

        warnings.push({
          prop: key,
          message: 'Unknown prop removed',
          expected: 'defined in schema',
          received: sanitized[key]
        });
      }
    }

    // Log warnings
    if (warnings.length > 0) {
      this.logger.warn(
        new InvalidPropsError(componentId, warnings)
      );
    }

    return sanitized;
  }

  private getFallbackValue(type: string): any {
    const fallbacks: Record<string, any> = {
      string: '',
      number: 0,
      boolean: false,
      array: [],
      object: {}
    };

    return fallbacks[type] || null;
  }

  private coerceType(value: any, expectedType: string): any {
    switch (expectedType) {
      case 'string':
        return String(value);

      case 'number':
        const num = Number(value);
        return isNaN(num) ? 0 : num;

      case 'boolean':
        return Boolean(value);

      case 'array':
        return Array.isArray(value) ? value : [value];

      default:
        return value;
    }
  }
}
```

### Slot Validation Recovery
```typescript
class SlotFallbackHandler {
  handleInvalidSlot(
    componentId: string,
    slotName: string,
    content: any,
    schema: SlotSchema,
    strict: boolean = false
  ): ASTNode | null {
    if (strict) {
      throw new SlotValidationError(componentId, [
        {
          type: 'invalid_content',
          slot: slotName,
          message: `Invalid content in slot "${slotName}"`
        }
      ]);
    }

    // Log warning
    this.logger.warn(
      `Skipping invalid content in slot "${slotName}" of component "${componentId}"`
    );

    // Return empty content for required slots
    if (schema.required) {
      return {
        type: 'text',
        content: `<!-- Required slot "${slotName}" had invalid content -->`
      };
    }

    // Skip optional slots
    return null;
  }

  handleMissingRequiredSlot(
    componentId: string,
    slotName: string,
    schema: SlotSchema
  ): ASTNode {
    // Return placeholder content
    return {
      type: 'text',
      content: `<!-- Missing required slot: ${slotName} -->`
    };
  }

  handleSlotCardinalityViolation(
    componentId: string,
    slotName: string,
    items: ASTNode[],
    schema: SlotSchema
  ): ASTNode[] {
    const { minItems = 0, maxItems = Infinity } = schema;

    // Too few items
    if (items.length < minItems) {
      this.logger.warn(
        `Slot "${slotName}" expects at least ${minItems} items, got ${items.length}`
      );

      // Pad with placeholders
      const padding = Array(minItems - items.length).fill({
        type: 'text',
        content: '<!-- Placeholder -->'
      });

      return [...items, ...padding];
    }

    // Too many items
    if (items.length > maxItems) {
      this.logger.warn(
        `Slot "${slotName}" expects at most ${maxItems} items, got ${items.length}. Truncating.`
      );

      return items.slice(0, maxItems);
    }

    return items;
  }
}
```

### Build Error Recovery
```typescript
class BuildErrorHandler {
  async handleBuildError(
    error: Error,
    context: BuildContext
  ): Promise<RecoveryResult> {
    // Log the error
    this.logger.error(error);

    // Attempt recovery based on error type
    if (error instanceof ComponentNotFoundError) {
      return this.recoverFromMissingComponent(error, context);
    }

    if (error instanceof InvalidPropsError) {
      return this.recoverFromInvalidProps(error, context);
    }

    if (error instanceof CircularDependencyError) {
      return this.recoverFromCircularDependency(error, context);
    }

    // Unknown error - cannot recover
    return {
      recovered: false,
      error
    };
  }

  private async recoverFromMissingComponent(
    error: ComponentNotFoundError,
    context: BuildContext
  ): Promise<RecoveryResult> {
    // In watch mode, skip this page and continue
    if (context.watch) {
      this.logger.info('Skipping page with missing component (watch mode)');

      return {
        recovered: true,
        skipped: true
      };
    }

    // In production build, fail
    return {
      recovered: false,
      error
    };
  }

  private async recoverFromInvalidProps(
    error: InvalidPropsError,
    context: BuildContext
  ): Promise<RecoveryResult> {
    // Attempt to use defaults/fallbacks
    if (!context.strict) {
      this.logger.warn('Using fallback values for invalid props');

      return {
        recovered: true,
        modified: true
      };
    }

    return {
      recovered: false,
      error
    };
  }
}

interface RecoveryResult {
  recovered: boolean;
  error?: Error;
  skipped?: boolean;
  modified?: boolean;
}
```

---

## Debug Logging

### Log Levels
```typescript
enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

class Logger {
  private level: LogLevel = LogLevel.INFO;
  private outputs: LogOutput[] = [new ConsoleOutput()];

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  error(message: string | Error, context?: any): void {
    this.log(LogLevel.ERROR, message, context);
  }

  warn(message: string | Error, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }

  info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  trace(message: string, context?: any): void {
    this.log(LogLevel.TRACE, message, context);
  }

  private log(level: LogLevel, message: string | Error, context?: any): void {
    if (level > this.level) return;

    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message: message instanceof Error ? message.message : message,
      error: message instanceof Error ? message : undefined,
      context
    };

    for (const output of this.outputs) {
      output.write(entry);
    }
  }
}

interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  error?: Error;
  context?: any;
}
```

### Structured Logging
```typescript
class StructuredLogger extends Logger {
  logComponentResolution(
    componentId: string,
    resolved: boolean,
    duration: number
  ): void {
    this.debug('Component resolution', {
      operation: 'component_resolution',
      componentId,
      resolved,
      duration_ms: duration
    });
  }

  logTemplateRender(
    templatePath: string,
    duration: number,
    cached: boolean
  ): void {
    this.debug('Template rendered', {
      operation: 'template_render',
      templatePath,
      duration_ms: duration,
      cached
    });
  }

  logPageBuild(
    pagePath: string,
    duration: number,
    componentCount: number
  ): void {
    this.info('Page built', {
      operation: 'page_build',
      pagePath,
      duration_ms: duration,
      componentCount
    });
  }

  logBuildComplete(
    pageCount: number,
    totalDuration: number,
    errors: number,
    warnings: number
  ): void {
    this.info('Build complete', {
      operation: 'build_complete',
      pageCount,
      duration_ms: totalDuration,
      errors,
      warnings
    });
  }
}
```

### Performance Timing Logs
```typescript
class PerformanceLogger {
  private timers = new Map<string, number>();

  startTimer(id: string): void {
    this.timers.set(id, performance.now());
  }

  endTimer(id: string, log: boolean = true): number {
    const start = this.timers.get(id);

    if (!start) {
      throw new Error(`Timer "${id}" was not started`);
    }

    const duration = performance.now() - start;
    this.timers.delete(id);

    if (log) {
      logger.debug(`[PERF] ${id}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measure<T>(id: string, fn: () => T): T {
    this.startTimer(id);

    try {
      const result = fn();
      return result;
    } finally {
      this.endTimer(id);
    }
  }

  async measureAsync<T>(id: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(id);

    try {
      const result = await fn();
      return result;
    } finally {
      this.endTimer(id);
    }
  }
}

// Usage:
await perfLogger.measureAsync('page-build', async () => {
  return buildPage(pageConfig);
});
```

---

## Error Collection and Reporting

### Error Collector
```typescript
class ErrorCollector {
  private errors: ErrorMessage[] = [];
  private warnings: ErrorMessage[] = [];

  addError(error: ErrorMessage): void {
    this.errors.push(error);
  }

  addWarning(warning: ErrorMessage): void {
    this.warnings.push(warning);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  hasWarnings(): boolean {
    return this.warnings.length > 0;
  }

  getReport(): ErrorReport {
    return {
      errors: this.errors,
      warnings: this.warnings,
      summary: this.getSummary()
    };
  }

  private getSummary(): string {
    const parts: string[] = [];

    if (this.errors.length > 0) {
      parts.push(`${this.errors.length} error(s)`);
    }

    if (this.warnings.length > 0) {
      parts.push(`${this.warnings.length} warning(s)`);
    }

    if (parts.length === 0) {
      return 'No errors or warnings';
    }

    return parts.join(', ');
  }

  clear(): void {
    this.errors = [];
    this.warnings = [];
  }

  printReport(): void {
    const report = this.getReport();

    console.log('\n' + '='.repeat(60));
    console.log('BUILD REPORT');
    console.log('='.repeat(60));

    console.log(`\n${report.summary}\n`);

    if (this.errors.length > 0) {
      console.log('ERRORS:');
      this.errors.forEach(err => {
        console.log('\n' + new ErrorFormatter().format(err));
      });
    }

    if (this.warnings.length > 0) {
      console.log('\nWARNINGS:');
      this.warnings.forEach(warn => {
        console.log('\n' + new ErrorFormatter().format(warn));
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }
}

interface ErrorReport {
  errors: ErrorMessage[];
  warnings: ErrorMessage[];
  summary: string;
}
```

---

*This specification defines all error handling patterns for AgentStatic. Implementations must provide clear, actionable error messages with appropriate recovery strategies.*