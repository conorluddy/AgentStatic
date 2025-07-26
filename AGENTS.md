# AGENTS.md - AgentStatic Development Guide

## Build/Test Commands
```bash
# Current state: No build scripts configured yet
npm test                    # Currently returns error - needs implementation
# Planned commands (to be implemented):
npm run dev                 # Development server with file watching  
npm run build              # Static site generation
npm run lint               # TypeScript and ESLint validation
npm run test               # Vitest test suite (>90% coverage required)
npm run test:single        # Run single test file: npm run test -- path/to/test.spec.ts
```

## Code Style Guidelines
- **TypeScript**: Strict mode, zero `any` types allowed
- **Imports**: Use ES modules, prefer named imports, group by: node_modules → local modules → types
- **Naming**: camelCase for variables/functions, PascalCase for classes/types, kebab-case for files
- **Error Handling**: Use Result<T, E> pattern, avoid throwing exceptions in core logic
- **Validation**: Zod schemas for all data validation (runtime + compile-time safety)
- **Comments**: Minimal - code should be self-documenting via TypeScript types

## Architecture Principles  
- **MCP-First**: AI-extensible plugin architecture using Model Context Protocol
- **Zero Framework Dependencies**: Vanilla CSS/JS for maximum performance
- **Portfolio-Optimized**: Advanced media handling for creative professionals
- **TDD Required**: Write tests first, maintain >90% coverage
- **Git Flow**: Never push to main, use feature branches and PRs only