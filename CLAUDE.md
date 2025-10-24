# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**AgentStatic** is an AI-first static site generator for brochureware marketing websites. It's currently in the **planning phase** with comprehensive documentation completed and ready for implementation.

### Three-Tier Architecture

1. **Component Library** (Tier 1): 20-30 production-ready CSS components (atoms, molecules, organisms) with predefined theme, dark mode, WCAG AA accessibility
2. **SSG Core** (Tier 2): Bun + Vite build pipeline with Nunjucks templating, static routing, CSS bundling (<50KB gzipped target)
3. **AI Integration** (Tier 3): 5 Claude-optimized MCP tools for autonomous page building from natural language briefs

### Current Status

- ✅ **Planning Complete**: All 7 phases documented (Phases 0-7)
- ✅ **Architecture Finalized**: 17 refined architectural decisions documented
- ✅ **Documentation Ready**: README, INDEX, CODESTYLE, phase plans all complete
- ⏳ **Implementation**: Ready to begin Phase 0 (SSG Foundation) and Phase 1 (Component Foundation)

---

## Planning Documentation Structure

**PRIMARY**: All active planning lives in `/FINALPLAN/` - this is the consolidated, unified plan.

### FINALPLAN Structure (Active - Use This!)
- **`FINALPLAN/README.md`** - Main navigation hub and project overview
- **`FINALPLAN/ROADMAP.md`** - 12-week timeline with parallel tracks
- **`FINALPLAN/DECISIONS.md`** - The 17 architectural decisions

### The 4 Pillars
- **`FINALPLAN/PILLAR-1-COMPONENTS/`** - Visual component system (HTML/CSS)
- **`FINALPLAN/PILLAR-2-REGISTRY/`** - Machine-readable schemas and validation
- **`FINALPLAN/PILLAR-3-BUILD/`** - Static site generation engine
- **`FINALPLAN/PILLAR-4-AI/`** - Claude MCP tools and integration

### Reference Documentation
- **`FINALPLAN/REFERENCE/`** - Technology stack, success metrics, etc.

### Legacy Documentation (Historical Reference)
- **`/PLANNING/`** - Original comprehensive phase-based planning (superseded by FINALPLAN)
- **`/architecture/`** - Technical specifications (merged into FINALPLAN pillars)

---

## The 17 Architectural Decisions

These decisions guide all implementation work:

1. **Brochureware-First**: Visual, read-only content sites only (no forms, apps, complex interactions)
2. **20-30 Components**: Focused set (12-15 atoms/molecules, 8-10 organisms) with extensibility
3. **Predefined Theme + Easy Customization**: Design tokens enable global theming
4. **Claude-Optimized MCP**: 5 tools specifically for component discovery and page building
5. **Template-First Distribution**: Users fork/customize, not npm install
6. **Example Pages Primary**: Show real compositions, blank slate secondary
7. **Dark Mode**: System preference + manual toggle (CSS variables + localStorage)
8. **Static Routing Only**: No dynamic routes, all pages pre-built
9. **Global Theme**: Consistency across site (no per-page overrides)
10. **All Metadata in Registry**: Searchable component schema with rich context
11. **JSON Compositions**: Structured page definitions for validation
12. **Automated a11y Testing**: Pa11y + axe during build (warnings not blocking)
13. **Bundle Warnings**: Build completes even with CSS warnings
14. **12-14 Week Timeline**: Full development from architecture to launch
15. **Storybook 80/20**: Visuals + code snippets (not exhaustive docs)
16. **MCP Suggestions**: Discovery returns alternatives, not just matches
17. **No Phase 8**: Ship complete, no long-term roadmap planning

See `PLANNING/README.md` for detailed explanations.

---

## Technology Stack

### Build System (Phase 0)
- **Runtime**: Bun 1.0+ (modern, fast JavaScript runtime)
- **Build Tool**: Vite 5+ (fast bundling and dev server)
- **Templating**: Nunjucks (logic-light templates)
- **CSS Processing**: PostCSS + Lightning CSS
- **Type Safety**: TypeScript throughout

### Styling (Phase 1)
- **Pure CSS**: No preprocessors (Sass/Less)
- **Design Tokens**: CSS Custom Properties
- **Architecture**: Cascade Layers (`@layer reset, base, components, utilities, overrides`)
- **Naming**: BEM convention
- **Responsive**: Mobile-first (375px, 768px, 1440px breakpoints)
- **Modern Features**: Container queries, `:has()`, `:not()` selectors

### Documentation (Phase 7)
- **Component Browser**: Storybook 8
- **Guides**: Markdown + MDX
- **API Docs**: Generated from component schemas

### AI Integration (Phase 6)
- **Protocol**: MCP (Model Context Protocol)
- **Tools**: 5 specialized tools for Claude
- **Composition Format**: JSON with validation

---

## Implementation Approach

### Parallel Development Tracks

**Track 1: Frontend (Weeks 1-7)**
- Pillar 1, Phase 1: Design System Foundation
- Pillar 1, Phase 2: Basic Components (atoms/molecules)
- Pillar 1, Phase 3: Complex Sections (organisms)
- Pillar 1, Phase 4: Polish & Enhancement

**Track 2: Backend (Weeks 1-7)**
- Pillar 3, Phase 1: Build Pipeline (Bun + Vite)
- Pillar 2, Phase 1-2: Component Schemas & Registry
- Pillar 2, Phase 3-4: Validation & Discovery API

**Integration Track (Weeks 8-12)**
- Pillar 3, Phase 3-4: Render System & Optimization
- Pillar 4, All Phases: AI Integration & MCP Tools
- Documentation & Launch Preparation

**Read**: `FINALPLAN/ROADMAP.md` for detailed timeline and `FINALPLAN/PILLAR-*/README.md` for specific tracks


---

## Code Style Guide

**Full guide**: `/CODESTYLE.md` (2056 lines covering general principles + AgentStatic-specific patterns)

### Key Principles
1. **Jackson's Law**: Write minimum code necessary for correctness
2. **Progressive Disclosure**: Understand code layer by layer
3. **Self-Documenting**: Names and structure explain intent, comments explain "why"
4. **Explicit Dependencies**: No hidden global state
5. **Context Isolation**: Related functionality grouped, unrelated separated

### AgentStatic-Specific Patterns (CODESTYLE.md Section 10)
- **JSON Composition Validation**: Structured page definitions with TypeScript interfaces
- **Component Registry & Schema**: Rich metadata including accessibility, responsive behavior, dark mode
- **MCP Tool Implementation**: Input/output schemas for all 5 tools
- **Semantic Search**: Component discovery with relevance scoring and suggestions
- **Build System Integration**: Static routing, registry generation, accessibility audits

### Performance Targets (CODESTYLE.md Section 12)
- Phase 1: <5KB (tokens + base)
- Phase 2: <20KB (atoms/molecules)
- Phase 3: <40KB (organisms)
- Phase 4-7: <42KB final (gzipped)

---

## File Structure (When Implementation Begins)

```
agentstatic/
├── core/                    # SSG engine (Phase 0)
│   ├── engine/             # Template rendering
│   ├── router/             # Static routing
│   ├── builder/            # Build pipeline
│   └── cli/                # Command-line interface
│
├── components/              # Component library (Phases 1-4)
│   ├── _system/            # Design tokens & base styles
│   ├── atoms/              # 8 basic components
│   ├── molecules/          # 7 combined components
│   ├── organisms/          # 10+ page sections
│   └── _registry/          # Generated schemas (Phase 5)
│
├── ai/                      # AI layer (Phase 6)
│   ├── tools/              # MCP tool definitions
│   ├── registry/           # Component index & validation
│   ├── composer/           # Page composition logic
│   └── mcp/                # MCP server
│
├── site/                    # User site content
│   ├── pages/              # Page compositions (JSON)
│   ├── content/            # Markdown content
│   └── assets/             # Images, fonts, etc.
│
├── .storybook/             # Storybook config (Phase 7)
├── docs/                   # Documentation (Phase 7)
├── tests/                  # Test suites
├── PLANNING/               # Planning docs (current state)
├── CODESTYLE.md            # Code style guide
├── package.json
├── bun.toml
└── vite.config.ts
```

---

## Development Workflow (When Implementation Begins)

### Project Setup (Phase 0 Start)
```bash
# Initialize Bun project
bun init

# Install dependencies (will be defined in Phase 0)
bun install

# Start dev server
bun run dev

# Build for production
bun run build
```

### Component Development (Phases 2-4)
```bash
# Start Storybook
bun run storybook

# Run accessibility tests
bun run test:a11y

# Check bundle size
bun run build:analyze
```

### Testing (All Phases)
```bash
# Run all tests
bun test

# Run with coverage
bun test --coverage

# Run accessibility audit
bun run test:a11y
```

### AI Integration (Phase 6)
```bash
# Start MCP server
bun run mcp:server

# Test with Claude
bun run mcp:test

# Validate compositions
bun run validate:compositions
```

---

## Git Workflow

### Branch Strategy
- **`main`**: Production-ready code
- **`feature/phase-X-*`**: Phase-specific feature branches
- **`fix/*`**: Bug fixes
- Never push directly to `main` (use PRs)

### Pre-commit Checks
- NEVER bypass pre-commit hooks with `--no-verify`
- All checks must pass before commit
- Use `gh` (GitHub CLI) for issue/PR management

### Commit Messages
Follow conventional commits:
```
feat(phase-2): add button atom component
fix(phase-1): correct dark mode toggle behavior
docs(phase-7): add MCP tool usage examples
test(phase-4): add accessibility tests for card molecule
```

---

## Key Success Metrics

Track throughout implementation:

### Bundle Size
- Warn at 90% of phase target
- Monitor with `bun run build:analyze`
- Targets: 5KB (P1), 20KB (P2), 40KB (P3), 42KB (P4-7)

### Accessibility
- WCAG AA compliance: 100% target
- Automated testing with Pa11y + axe
- Manual audit in Phase 4

### Components
- Phase 2: 12-15 atoms/molecules
- Phase 3: 8-10 organisms
- Total: 20-30 components

### Documentation
- Storybook: 20-30 stories (80/20 approach)
- Coverage: 100% of components
- Guides: Developer, AI agent, contributing

### Performance
- Lighthouse: 90+ on all example pages
- Build time: <10 seconds
- Dev server: <1 second hot reload

---

## Common Patterns

### Component File Structure (Phases 2-4)
```
components/atoms/button/
├── button.css              # Component styles
├── button.njk              # Nunjucks template
├── button.schema.json      # JSON schema (Phase 5)
├── button.stories.ts       # Storybook stories (Phase 7)
└── README.md              # Component documentation
```

### Page Composition Format (Phase 6)
```json
{
  "path": "/landing",
  "title": "Product Landing",
  "metadata": {
    "description": "Our product helps you succeed"
  },
  "sections": [
    {
      "component": "organisms/hero-section",
      "variant": "split",
      "props": {
        "heading": "Welcome to Our Product",
        "subheading": "Build better, faster",
        "cta": { "text": "Get Started", "url": "/signup" }
      }
    }
  ]
}
```

### MCP Tool Usage (Phase 6)
```typescript
// Claude discovers components
const results = await discoverComponents({
  query: "hero section with background image",
  category: "organism",
  minAccessibility: "wcag-aa",
  limit: 5
});

// Returns matches + suggestions for alternatives
console.log(results.matches);      // Relevant components
console.log(results.suggestions);  // Alternative components
```

---

## Phase Gate Criteria

Before proceeding to next phase, ensure:

### Phase 0 → 1
- Build pipeline working (Bun + Vite)
- Static routing functional
- Component registry generation working

### Phase 1 → 2
- Design system documented
- CSS architecture defined
- Dark mode infrastructure in place

### Phase 2 → 3
- All atoms and molecules built (12-15 total)
- 30+ Storybook stories
- WCAG AA compliance on all components

### Phase 3 → 4
- All organisms built (8-10 total)
- Real page compositions working
- Integration testing passing

### Phase 4 → 5
- Modern CSS patterns implemented
- Animations respect prefers-reduced-motion
- Accessibility audit 100% passing

### Phase 5 → 6
- Component registry searchable
- Discovery API functioning
- Schema generation automated

### Phase 6 → 7
- All 5 MCP tools implemented
- Claude integration tested
- AI workflows validated

### Phase 7 → Launch
- All documentation complete
- Storybook deployed publicly
- Template ready for users

---

## Important Context for AI Agents

### When Working on Phases
1. **Always read the full phase document first**: `PLANNING/phases/PHASE-XX-*.md`
2. **Reference the 17 decisions**: Understand which decisions apply to current work
3. **Follow CODESTYLE.md**: Both general principles and AgentStatic-specific patterns
4. **Check phase gate criteria**: Ensure prerequisites are met before starting
5. **Track metrics**: Bundle size, accessibility, component count per phase targets

### When Adding Components
1. **Check COMPONENT-MATRIX.md**: Verify component is planned for current phase
2. **Use atomic design**: Classify as atom, molecule, or organism
3. **Follow file structure**: CSS, Nunjucks template, schema, stories, README
4. **Include metadata**: Accessibility, responsive behavior, dark mode support
5. **Test thoroughly**: Visual regression, accessibility, responsive design

### When Writing MCP Tools (Phase 6)
1. **Optimize for Claude**: Tools are Claude-specific, not generic
2. **Return suggestions**: Discovery should offer alternatives (Decision #16)
3. **Rich metadata**: Include accessibility, performance, usage examples
4. **Clear errors**: Actionable error messages for invalid compositions
5. **Validate everything**: Compositions, props, component compatibility

---

## Resources

### Primary Planning (Active)
- **Navigation**: `FINALPLAN/README.md`
- **Timeline**: `FINALPLAN/ROADMAP.md`
- **Decisions**: `FINALPLAN/DECISIONS.md`
- **Pillars**: `FINALPLAN/PILLAR-*/README.md`

### Code Standards
- **Style Guide**: `CODESTYLE.md` (comprehensive)
- **Technology**: `FINALPLAN/REFERENCE/TECHNOLOGY-STACK.md`
- **Metrics**: `FINALPLAN/REFERENCE/SUCCESS-METRICS.md`

### Implementation Starting Points
- **Frontend Dev**: Start with `FINALPLAN/PILLAR-1-COMPONENTS/`
- **Backend Dev**: Start with `FINALPLAN/PILLAR-3-BUILD/`
- **AI/ML Dev**: Start with `FINALPLAN/PILLAR-4-AI/`
- **Full Stack**: Follow `FINALPLAN/ROADMAP.md`

---

## Questions or Clarifications

When unclear about implementation:
1. Check the relevant pillar in `FINALPLAN/PILLAR-*/`
2. Review the 17 decisions in `FINALPLAN/DECISIONS.md`
3. Consult `FINALPLAN/ROADMAP.md` for timeline and dependencies
4. Check `CODESTYLE.md` for code patterns
5. Review `FINALPLAN/REFERENCE/` for technology and metrics

All architectural decisions are documented. If something seems ambiguous, it's likely addressed in the FINALPLAN docs.

---

**Current State**: Planning complete, ready for implementation.

**Next Step**: Choose your development track:
- **Frontend**: Start with `FINALPLAN/PILLAR-1-COMPONENTS/README.md`
- **Backend**: Start with `FINALPLAN/PILLAR-3-BUILD/README.md`
- **Full Stack**: Follow `FINALPLAN/ROADMAP.md` for parallel tracks
