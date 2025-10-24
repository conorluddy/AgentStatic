# 01 – Architecture Overview

## Purpose
Defines how AgentStatic’s three pillars (Library, Registry, Engine) interact via data flow.

## Data Flow Diagram
```
Library → Registry → AST → Renderer → Static Site
         ↑           ↓
        MCP ← Validator
```

## Responsibilities by Layer
| Layer | Role | Key Artifacts |
|-------|------|----------------|
| Component Library | Human-facing HTML+CSS components | Storybook, component markup |
| Component Registry | Machine-readable schemas | JSON Schemas, components.json |
| Composition & Render Engine | Execution pipeline | AST validator, renderer, static output |

## Interfaces
- **Registry → Validator:** JSON Schemas per component
- **Validator → Engine:** Validated AST
- **MCP Tools → Registry/Validator:** Query, composition, validation

## Acceptance Criteria
- Unified data contracts
- All tools consuming same schema definitions
