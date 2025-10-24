# 05 – Build System

## Purpose
Render validated ASTs into static HTML/CSS with deterministic outputs.

## Pipeline
1. Parse input (JSON/ASX)
2. Structural + Semantic validation
3. Render templates
4. Bundle CSS (<50KB gzipped)
5. Emit static files and sitemap.xml

## Example CLI
```bash
agentstatic build pages/landing.json --out dist/
```

## Acceptance Criteria
- Deterministic builds from valid AST
- <50KB gzipped CSS total
- 90+ Lighthouse performance
