# 03 – Validation System

## Purpose
Ensures all compositions are structurally, semantically, and accessibly correct.

## Layers
1. **Structural Validation** – JSON Schema (Ajv)
2. **Semantic Validation** – Slot/child rules via AST walker
3. **Accessibility Validation** – a11y rules (alt text, headings, contrast)

## Example
```ts
const ajv = new Ajv();
const valid = ajv.validate(astSchema, ast);
if (!valid) console.error(ajv.errors);
```

## Acceptance Criteria
- 100% of ASTs validated before render
- Slot/child rules enforced from registry
- a11y CI pipeline (axe/pa11y) with ≥ AA compliance
