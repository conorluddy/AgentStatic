# 02 – AST Schema

## Purpose
Defines the canonical page composition format used by AgentStatic.

## Core Entities
### Page
```json
{
  "type": "page",
  "title": "Landing",
  "metadata": { "description": "Landing page", "canonical": "https://example.com" },
  "sections": [ { "...Node" } ]
}
```

### Node
```json
{
  "component": "organisms/hero",
  "variant": "split",
  "props": { "heading": "Build Fast" },
  "slots": {
    "actions": [ { "component": "atoms/button", "props": { "text": "Get Started" } } ]
  }
}
```

## Design Notes
- Slots can contain a single node or array of nodes.
- AST mirrors component hierarchy exactly.
- All nodes must validate against registry schemas.

## Acceptance Criteria
- JSON Schema for AST validated by Ajv
- Zod wrappers for DX
- Deterministic round-trip: AST → HTML → AST