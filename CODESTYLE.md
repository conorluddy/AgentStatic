# Code Style Guide

> **Core Principle**: Context is finite. Every line of code, comment, and structure competes for limited attention. Maximize signal, minimize noise.

## Philosophy

The optimal amount of code is the minimum necessary to solve the problem correctly. Every additional line is debt that must be understood, maintained, and reasoned about.

**Progressive Disclosure**: Structure code layer-by-layer. Readers should grasp high-level flow immediately, drilling into details only when needed.

**Self-Documenting**: Names eliminate the need for most comments. When comments exist, they explain "why," never "what."

## Function Design

### Essential Patterns

```typescript
// ✅ Self-contained with explicit contract
async function authenticateUser(
  credentials: UserCredentials,
  database: Database,
  currentTime: DateTime
): Promise<Result<AuthSession, AuthError>> {
  // All dependencies visible in signature
  // Return type reveals all possible outcomes
  // No hidden state or side effects
}

// ❌ Hidden dependencies, unclear contract
async function auth(data: any): Promise<any> {
  // Uses global config, modifies global state
  // Return type unknown, errors invisible
}
```

### Rules

1. **Single Responsibility**: Each function does one thing clearly describable in a sentence
2. **Explicit Dependencies**: All inputs as parameters, no hidden global state
3. **Type Everything**: Leverage type systems fully (TypeScript strict mode, Python type hints)
4. **Name Precisely**: `validateEmailFormat()` not `checkEmail()`, `fetchActiveUsers()` not `getUsers()`
5. **Guard Clauses**: Handle edge cases first, keep happy path unindented and visible

```typescript
// ✅ Guard clauses - happy path clear
function processOrder(order: Order): Result<Receipt, ProcessError> {
  if (!order) return err('missing_order');
  if (order.items.length === 0) return err('empty_order');
  if (order.total <= 0) return err('invalid_total');
  if (!order.paymentMethod) return err('missing_payment');
  
  // Happy path clearly visible at function end
  return ok(completePayment(order));
}

// ❌ Nested conditions - happy path buried
function processOrder(order: Order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.total > 0) {
        // Happy path buried 4 levels deep
      }
    }
  }
}
```

## Error Handling

### Make Errors Explicit

```typescript
// ✅ Result type - errors visible in signature
type Result<T, E> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

type UserError = 'not_found' | 'unauthorized' | 'network_failure';

async function fetchUser(id: string): Promise<Result<User, UserError>> {
  // Errors are part of the contract
}

// Usage forces error handling
const result = await fetchUser(userId);
if (!result.ok) {
  switch (result.error) {
    case 'not_found': return show404();
    case 'unauthorized': return redirectLogin();
    case 'network_failure': return showRetry();
  }
}
```

### Error Principles

1. **Never silently swallow errors** - log or propagate, never ignore
2. **Provide actionable messages** - include context (what failed, expected vs actual, how to fix)
3. **Fail fast at boundaries** - validate inputs immediately, not deep in call stack
4. **Use Result types for expected errors** - exceptions for truly exceptional cases

```typescript
// ✅ Actionable error with context
throw new ValidationError(
  `Email validation failed for field "user_email": ` +
  `Expected format "name@domain.com", received "${input}". ` +
  `Use validateEmailFormat() to check before calling.`
);

// ❌ Generic, unhelpful error
throw new Error("Validation failed");
```

## File Organization

### Structure with Clear Boundaries

```typescript
// ========================================
// PUBLIC API
// ========================================

export class UserService {
  constructor(private readonly db: Database) {}
  
  async createUser(data: CreateUserData): Promise<Result<User, CreateError>> {
    // Public interface
  }
}

// ========================================
// VALIDATION
// ========================================

function validateUserData(data: unknown): Result<ValidatedData, ValidationError> {
  // Validation logic grouped together
}

// ========================================
// PRIVATE HELPERS
// ========================================

function hashPassword(password: string): Promise<HashedPassword> {
  // Internal implementation
}
```

### Rules

1. **Group related functionality** - all validation together, all formatting together
2. **Public API first** - exported functions at top, helpers at bottom
3. **One major export per file** - UserService.ts exports UserService
4. **Co-locate tests** - UserService.test.ts next to UserService.ts
5. **Max 300 lines guideline** - not a hard limit, but refactor trigger

## Naming Excellence

**The #1 impact on readability**: Good names eliminate mental translation overhead.

```typescript
// ✅ Descriptive, unambiguous names
async function validateJsonAgainstSchema(
  schema: ZodSchema,
  input: string
): Promise<ValidationResult>

function calculateExponentialBackoff(
  attemptNumber: number,
  baseDelayMs: number
): number

interface UserAuthenticationCredentials {
  email: string;
  password: string;
  mfaToken?: string;
}

// ❌ Vague, abbreviated, requires mental translation
async function valJson(s: any, i: string): Promise<any>
function calcBackoff(n: number, d: number): number
interface UAC { e: string; p: string; m?: string; }
```

### Naming Rules

1. **Be specific**: `activeUsers` not `users`, `httpTimeout` not `timeout`
2. **Include units**: `delayMs` not `delay`, `maxRetries` not `max`
3. **Avoid abbreviations**: `customer` not `cust`, `configuration` not `cfg`
4. **Use domain language**: Names from business domain, not technical abstractions
5. **Boolean prefixes**: `isValid`, `hasPermission`, `canEdit`, `shouldRetry`

## Context Management

### Module-Level Documentation

Every major directory needs a README.md:

```markdown
# Module: User Authentication

## Purpose
JWT-based authentication with refresh token rotation

## Key Decisions
- bcrypt cost factor 12 for password hashing
- Access tokens expire after 15 minutes
- Refresh tokens stored in HTTP-only cookies
- Token blacklist uses Redis with 24h TTL

## Dependencies
- jose library for JWT (not jsonwebtoken - more secure)
- PostgreSQL for user storage
- Redis for token blacklist

## Common Patterns
See examples/:
- login-flow.ts: Standard authentication
- refresh-flow.ts: Token refresh pattern
```

### Rules for AI + Human Collaboration

Create `.cursor/rules/` or similar context files:

```markdown
# Core Development Patterns

## TypeScript Conventions
- Use strict mode with all checks enabled
- Prefer Result types over throwing for expected errors
- Use guard clauses over nested if statements
- All async functions return Promises explicitly typed

## Code Organization
- Public API at top of file
- Private helpers at bottom
- Max one major export per file
- Group related functions with section comments

## Error Handling
- Never use empty catch blocks
- Include context in all error messages
- Log errors before rethrowing
- Use Result types for recoverable errors
```

### Progressive Context Disclosure

1. **README.md at project root** - system overview, entry points, setup
2. **README.md per major module** - module purpose, key decisions, patterns
3. **Section comments in files** - group related code with clear headers
4. **Function/class docs** - purpose, examples for non-obvious cases
5. **Inline comments** - only for "why" decisions, never "what" code does

## Type Safety

### TypeScript Strict Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true
  }
}
```

### Branded Types for Validation

```typescript
// Validation encoded in type system
type ValidatedEmail = string & { readonly __brand: 'ValidatedEmail' };
type UserId = string & { readonly __brand: 'UserId' };

function validateEmail(input: string): ValidatedEmail | null {
  return input.includes('@') && input.includes('.')
    ? (input as ValidatedEmail)
    : null;
}

// Type system prevents using unvalidated data
function sendEmail(to: ValidatedEmail, subject: string) {
  // No need to re-validate - type guarantees validity
}
```

## Testing Strategy

### Write Tests That Document Behavior

```typescript
// ✅ Test describes scenario clearly
test('should reject invalid credentials without revealing if username exists', async () => {
  const auth = new Authenticator(database);
  
  const result = await auth.authenticate({
    email: 'nonexistent@example.com',
    password: 'any-password'
  });
  
  expect(result.ok).toBe(false);
  expect(result.error.code).toBe('INVALID_CREDENTIALS');
  expect(result.error.message).not.toContain('user not found');
});

// ❌ Test name unclear, implementation-focused
test('returns false', async () => {
  const result = await auth.check('test', 'pass');
  expect(result).toBe(false);
});
```

### Testing Philosophy

1. **Test behavior, not implementation** - focus on inputs/outputs, not internal state
2. **Integration over unit** - test multiple pieces working together (where bugs actually occur)
3. **Clear test names** - describe the scenario being tested
4. **One concept per test** - don't test multiple unrelated things in one test
5. **Tests are documentation** - new developers learn system by reading tests

### Example-First Documentation

For complex functions, show usage examples:

```typescript
/**
 * Execute operations in batches with configurable error handling.
 * 
 * @example
 * // Simple batch processing
 * const ops = data.map(d => new UpdateOperation(d));
 * const result = await executeBatch(ops);
 * 
 * @example
 * // Continue processing even if some operations fail
 * const result = await executeBatch(ops, {
 *   batchSize: 100,
 *   errorHandling: 'continue'
 * });
 * // Check result.failures for any errors
 */
function executeBatch(
  operations: Operation[],
  options?: BatchOptions
): Promise<BatchResult>
```

## Observability

### Structured Logging

```typescript
// ✅ Structured, queryable, informative
logger.info('Request processed', {
  request_id: requestId,
  user_id: userId,
  endpoint: req.path,
  method: req.method,
  duration_ms: duration,
  status_code: res.statusCode,
  cache_hit: cacheHit
});

// ❌ Unstructured - hard to query
logger.info(`User ${userId} accessed ${req.path}`);
```

### What to Log

**Always include**:
- Request context: request_id, user_id, trace_id
- Business context: entity IDs, operation types
- Technical context: duration_ms, error details
- Environment: version, region

**Log at critical boundaries**:
- External API calls (request/response)
- Database operations (query, duration)
- Authentication/authorization decisions
- Error occurrences with full context

## Performance Patterns

### Token-Efficient Functions

```typescript
// ✅ Paginated, summary with drill-down
function getUserActivitySummary(
  userId: string,
  limit: number = 100
): ActivitySummary {
  return {
    totalEvents: 1247,
    recentEvents: getRecentEvents(userId, 10),
    eventIdsByType: groupEventIds(userId),
    // Provide IDs for detail fetching
  };
}

// ❌ Returns everything, wastes memory/tokens
function getUserActivity(userId: string): Activity[] {
  return getAllEvents(userId); // Returns thousands of events
}
```

### Async Patterns

```typescript
// ✅ Parallel execution
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]);

// ❌ Sequential execution (3x slower)
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);
```

## Anti-Patterns to Avoid

### ❌ Premature Optimization
Don't optimize before measuring. Profile first, optimize second.

### ❌ Hasty Abstractions
Wait for 3rd duplication before extracting. Wrong abstraction worse than duplication.

### ❌ Clever Code
```typescript
// ❌ Clever one-liner
const result = arr.reduce((a,b)=>({...a,[b.k]:b.v}),{});

// ✅ Clear and obvious
const result: Record<string, string> = {};
for (const item of arr) {
  result[item.key] = item.value;
}
```

### ❌ Vague Interfaces
```typescript
// ❌ Too vague - provides no guidance
function process(data: any): any { }

// ✅ Specific contract
function validateUserRegistration(
  input: UnvalidatedUserInput
): Result<ValidatedUser, ValidationError[]>
```

### ❌ Silent Failures
```typescript
// ❌ Swallows errors
try {
  await riskyOperation();
} catch {
  // Silent failure
}

// ✅ Handles or propagates
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new OperationError('Failed to complete', { cause: error });
}
```

## Code Review Checklist

Before submitting code for review:

- [ ] Does it solve the stated problem with minimal code?
- [ ] Can a new developer understand it without extensive context?
- [ ] Are errors handled with actionable messages?
- [ ] Are names clear, specific, and unambiguous?
- [ ] Do functions have single, clear responsibilities?
- [ ] Are dependencies explicit (no hidden global state)?
- [ ] Are there tests for critical paths?
- [ ] Is the cognitive load reasonable?

## Refactoring Triggers

Consider refactoring when you see:

- Functions over 50 lines
- Files over 300 lines  
- More than 3 levels of nesting
- Repeated patterns (3rd occurrence)
- Names requiring explanatory comments
- Complex conditions needing lengthy explanation

## AI Collaboration Best Practices

### Structure Code for AI Understanding

1. **Write detailed function comments** - AI generates better code with clear intent
2. **Use guard clauses** - AI handles linear logic better than deep nesting
3. **Keep functions focused** - single responsibility aids AI comprehension
4. **Provide examples** - show AI the patterns you want repeated

### Comment-Driven Development

```typescript
// Validate user credentials against database using bcrypt
// Generate JWT token with 15-minute expiration
// Include user ID and role in token payload
// Return token and user profile
// Throw UnauthorizedError if credentials invalid
async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  // Detailed comments → better AI implementation
}
```

### Review AI-Generated Code

- [ ] Does it follow project conventions?
- [ ] Are there security issues? (SQL injection, XSS, hardcoded secrets)
- [ ] Does it handle errors properly?
- [ ] Are types correct and specific?
- [ ] Is business logic sound?
- [ ] Are tests included?

## Build System & Static Site Generation

### TypeScript Build Patterns

```typescript
// ✅ Clear function contract with explicit error handling
async function generateColorTokens(
  brandConfig: BrandConfig,
  outputPath: string
): Promise<Result<void, ConfigError>> {
  const colors = parseColors(brandConfig.colors);
  if (!colors.ok) return colors;

  const css = buildColorCSS(colors.value);
  await writeFile(outputPath, css);

  return ok(undefined);
}

// ❌ Hidden dependencies, unclear contract
async function generate(config: any) {
  // Modifies global state, errors unclear
}
```

### Brand Tokens & Configuration

```json
// ✅ Complete schema in brand.json
{
  "name": "Acme Corp",
  "tagline": "Build amazing things",
  "colors": {
    "primary": "#3b82f6",
    "neutral": "#64748b"
  },
  "typography": {
    "fonts": ["Inter", "sans-serif"],
    "base": 16,
    "scale": 1.25
  },
  "spacing": {
    "base": 4
  }
}

// ❌ Hardcoded values scattered in CSS
:root {
  --primary: #3b82f6;
  --space-1: 4px;
  --text-base: 16px;
}
```

All CSS must use token variables:
```css
/* ✅ Always use tokens */
button {
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary-500);
  font-size: var(--text-base);
}

/* ❌ Never hardcode values */
button {
  padding: 8px 16px;
  background: #3b82f6;
  font-size: 16px;
}
```

### HTML Element Patterns

```html
<!-- ✅ Clear structure with semantic naming -->
<site-hero variant="centered" theme="dark">
  <h1>Clear, descriptive heading</h1>
  <p>Supporting text</p>
  <site-hero-actions>
    <a href="#next">Call to action</a>
  </site-hero-actions>
</site-hero>

<!-- ❌ Generic div soup, unclear intent -->
<div class="hero">
  <div class="container">
    <h1>Title</h1>
  </div>
</div>
```

### CSS Organization

```css
/* ✅ Grouped by concerns with CSS variables */
site-hero {
  display: flex;
  min-height: var(--space-32);
  padding: var(--gutter);
  background: var(--color-bg);
}

site-hero h1 {
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

site-hero[variant="centered"] {
  justify-content: center;
  text-align: center;
}

/* ❌ Magic values, no organization */
site-hero { display: flex; min-height: 128px; padding: 16px; }
```

### Partial Includes & Composition

```html
<!-- ✅ Explicit slot contracts, clear fallbacks -->
<include-footer siteName="Acme">
  <nav slot="links">
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</include-footer>

<!-- Partial: partials/footer.html -->
<footer>
  <p>{{siteName}}</p>
  <slot name="links">
    <!-- Default links if not provided -->
    <nav><a href="/">Home</a></nav>
  </slot>
</footer>

<!-- ❌ Vague partial requirements, unclear contract -->
<include-footer content="data"/>
```

### Element File Structure

```typescript
// ✅ Clear organization for element discovery
elements/
├── site-hero/
│   ├── README.md           // Variants, usage, examples
│   ├── element.html        // Example markup
│   └── styles.css          // Self-contained styles
├── site-features/
│   ├── README.md
│   ├── element.html
│   └── styles.css
```

Each element's README should document:
1. **Purpose** - what this section does
2. **Variants** - available attribute variations
3. **Slots** - what child content it accepts
4. **Examples** - common usage patterns

```markdown
# site-hero

Visual hero section with headline, subtext, and call-to-action area.

## Variants

- `variant="centered"` - Center-aligned text
- `theme="dark"` - Dark background with light text

## Slots

- Default slot - Main content (heading, description, etc)
- `actions` - Call-to-action buttons

## Example

\`\`\`html
<site-hero variant="centered">
  <h1>Welcome</h1>
  <p>Start building</p>
</site-hero>
\`\`\`
```

## Summary: Remember the Core Principles

1. **Minimize code** - less code = less cognitive load
2. **Progressive disclosure** - reveal complexity only when needed
3. **Explicit over implicit** - make dependencies and errors visible
4. **Name exceptionally** - eliminate mental translation overhead
5. **Self-documenting** - code structure tells the story
6. **Context is finite** - every token counts for humans and AI
7. **Test behavior** - document expected functionality through tests
8. **Fail fast** - surface errors immediately with actionable messages

**Great code is**:
- Human-readable (optimized for understanding)
- Maintainable (easy to change and extend)
- Observable (makes debugging straightforward)
- Resilient (handles failure gracefully)

---

*"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler*