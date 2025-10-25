# AgentStatic SPECIFICATION

**The Unified Implementation Plan for AgentStatic**

This directory contains the consolidated, final planning documentation for AgentStatic - an AI-first static site generator for brochureware marketing websites.

---

## 🎯 Project Vision

**AgentStatic** is a three-tier platform that enables both developers and AI agents (particularly Claude) to build beautiful, accessible, performant marketing websites:

1. **Component Library**: 20-30 production-ready CSS components
2. **Build Engine**: Static site generator powered by Bun + Vite
3. **AI Integration**: Claude-optimized MCP tools for autonomous site building

---

## 🏛️ The Four Pillars

AgentStatic is built on four independent but interconnected pillars:

### PILLAR 1: COMPONENT LIBRARY
The visual component system - HTML/CSS components with zero runtime JavaScript.
- **Phase 1**: Design System Foundation → [P1-PHASE-1-DESIGN-SYSTEM.md](./P1-PHASE-1-DESIGN-SYSTEM.md)
- **Phase 2**: Basic Components → [P1-PHASE-2-BASIC-COMPONENTS.md](./P1-PHASE-2-BASIC-COMPONENTS.md)
- **Phase 3**: Complex Sections → [P1-PHASE-3-COMPLEX-SECTIONS.md](./P1-PHASE-3-COMPLEX-SECTIONS.md)
- **Phase 4**: Polish & Enhancement → [P1-PHASE-4-POLISH.md](./P1-PHASE-4-POLISH.md)
- **Specs**: [P1-COMPONENT-SPECS.md](./P1-COMPONENT-SPECS.md)

### PILLAR 2: REGISTRY & VALIDATION
Making components machine-readable and validated for AI consumption.
- **Phase 1**: Component Schema Definition → [P2-PHASE-1-SCHEMAS.md](./P2-PHASE-1-SCHEMAS.md)
- **Phase 2**: Registry Generation → [P2-PHASE-2-GENERATION.md](./P2-PHASE-2-GENERATION.md)
- **Phase 3**: Validation System → [P2-PHASE-3-VALIDATION.md](./P2-PHASE-3-VALIDATION.md)
- **Phase 4**: Discovery API → [P2-PHASE-4-DISCOVERY.md](./P2-PHASE-4-DISCOVERY.md)
- **Specs**: [P2-AST-SCHEMA.md](./P2-AST-SCHEMA.md)

### PILLAR 3: BUILD ENGINE
Transforming component compositions into optimized static sites.
- **Phase 1**: Core Pipeline → [P3-PHASE-1-PIPELINE.md](./P3-PHASE-1-PIPELINE.md)
- **Phase 2**: AST Processing → [P3-PHASE-2-AST-PROCESSING.md](./P3-PHASE-2-AST-PROCESSING.md)
- **Phase 3**: Render System → [P3-PHASE-3-RENDER.md](./P3-PHASE-3-RENDER.md)
- **Phase 4**: Output Optimization → [P3-PHASE-4-OPTIMIZATION.md](./P3-PHASE-4-OPTIMIZATION.md)
- **Specs**: [P3-ARCHITECTURE.md](./P3-ARCHITECTURE.md), [P3-CSS-OPTIMIZATION.md](./P3-CSS-OPTIMIZATION.md), [P3-CLI-INTERFACE.md](./P3-CLI-INTERFACE.md)

### PILLAR 4: AI INTEGRATION
Enabling Claude to autonomously build complete sites.
- **Phase 1**: MCP Tool Implementation → [P4-PHASE-1-MCP-TOOLS.md](./P4-PHASE-1-MCP-TOOLS.md)
- **Phase 2**: Composition Engine → [P4-PHASE-2-COMPOSITION.md](./P4-PHASE-2-COMPOSITION.md)
- **Phase 3**: Validation & Feedback → [P4-PHASE-3-VALIDATION.md](./P4-PHASE-3-VALIDATION.md)
- **Phase 4**: Documentation & Examples → [P4-PHASE-4-DOCUMENTATION.md](./P4-PHASE-4-DOCUMENTATION.md)
- **Specs**: [P4-ALGORITHMS.md](./P4-ALGORITHMS.md)

---

## 📅 Implementation Timeline

### Parallel Development Tracks

```mermaid
gantt
    title AgentStatic Implementation Timeline
    dateFormat WEEK
    section Track 1: Frontend
    Design System     :p1p1, 1, 2w
    Basic Components  :p1p2, after p1p1, 2w
    Complex Sections  :p1p3, after p1p2, 2w
    Polish           :p1p4, after p1p3, 1w

    section Track 2: Backend
    Build Pipeline   :p3p1, 1, 2w
    Schemas         :p2p1, after p3p1, 2w
    Validation      :p2p3, after p2p1, 2w
    Discovery       :p2p4, after p2p3, 1w

    section Integration
    Render System   :p3p3, 7, 2w
    AI Tools        :p4all, 9, 2w

    section Documentation
    Storybook       :docs, 11, 1w
    Launch          :launch, 12, 1w
```

**Total Duration**: 12 weeks
**Total Effort**: 250-300 hours
**Team Size**: 1-2 developers

---

## 📚 Core Documents

### Planning & Strategy
- **[ROADMAP.md](./ROADMAP.md)** - Detailed timeline, dependencies, and milestones
- **[DECISIONS.md](./DECISIONS.md)** - The 17 architectural decisions that guide the project

### Reference Documentation
- **[TECHNOLOGY-STACK.md](./TECHNOLOGY-STACK.md)** - Technology choices and rationale
- **[SUCCESS-METRICS.md](./SUCCESS-METRICS.md)** - KPIs and targets
- **[ERROR-HANDLING.md](./ERROR-HANDLING.md)** - Error handling patterns and codes
- **[PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md)** - File and directory organization

---

## 🎯 Success Metrics

### Component Library
- ✅ 20-30 production-ready components
- ✅ WCAG AA compliance (100%)
- ✅ Mobile-first responsive design
- ✅ Dark mode support (system + manual)

### Performance
- ✅ <50KB CSS bundle (gzipped)
- ✅ 90+ Lighthouse scores
- ✅ <10 second build time
- ✅ Zero runtime JavaScript for core functionality

### AI Integration
- ✅ 5 Claude-optimized MCP tools
- ✅ <100ms component discovery
- ✅ Autonomous page composition from natural language
- ✅ Rich suggestions and error feedback

### Documentation
- ✅ 50-70 Storybook stories
- ✅ Developer guide
- ✅ AI agent guide
- ✅ 2-3 example sites

---

## 🚀 Quick Start Paths

### For Frontend Developers
Start with **PILLAR 1: COMPONENT LIBRARY**
1. Read [P1-PHASE-1-DESIGN-SYSTEM.md](./P1-PHASE-1-DESIGN-SYSTEM.md)
2. Set up design tokens and CSS architecture
3. Build components progressively through phases 2-4

### For Backend Developers
Start with **PILLAR 3: BUILD ENGINE**
1. Read [P3-PHASE-1-PIPELINE.md](./P3-PHASE-1-PIPELINE.md)
2. Set up Bun + Vite environment
3. Implement AST processing and rendering

### For AI/ML Engineers
Start with **PILLAR 4: AI INTEGRATION**
1. Review [P4-ALGORITHMS.md](./P4-ALGORITHMS.md)
2. Understand [P2-AST-SCHEMA.md](./P2-AST-SCHEMA.md)
3. Implement MCP tools (docs coming soon)

### For Full-Stack Developers
Follow the **[ROADMAP.md](./ROADMAP.md)** for the complete implementation path.

---

## 📂 File Organization

All specification documents are in a **flat structure** for easy navigation:

```
SPEC/
├── README.md                          # This file
├── ROADMAP.md                         # Timeline & dependencies
├── DECISIONS.md                       # 17 architectural decisions
│
├── P1-COMPONENT-SPECS.md              # Component specifications
├── P1-PHASE-1-DESIGN-SYSTEM.md        # Pillar 1, Phase 1
├── P1-PHASE-2-BASIC-COMPONENTS.md     # Pillar 1, Phase 2
├── P1-PHASE-3-COMPLEX-SECTIONS.md     # Pillar 1, Phase 3
├── P1-PHASE-4-POLISH.md               # Pillar 1, Phase 4
│
├── P2-AST-SCHEMA.md                   # AST schema specification
├── P2-PHASE-1-SCHEMAS.md              # Pillar 2, Phase 1
├── P2-PHASE-2-GENERATION.md           # Pillar 2, Phase 2
├── P2-PHASE-3-VALIDATION.md           # Pillar 2, Phase 3
├── P2-PHASE-4-DISCOVERY.md            # Pillar 2, Phase 4
│
├── P3-ARCHITECTURE.md                 # Build architecture
├── P3-CSS-OPTIMIZATION.md             # CSS optimization strategy
├── P3-PHASE-1-PIPELINE.md             # Pillar 3, Phase 1
├── P3-PHASE-2-AST-PROCESSING.md       # Pillar 3, Phase 2
├── P3-PHASE-3-RENDER.md               # Pillar 3, Phase 3
├── P3-PHASE-4-OPTIMIZATION.md         # Pillar 3, Phase 4
│
├── P4-ALGORITHMS.md                   # AI algorithms
├── P4-PHASE-1-MCP-TOOLS.md            # Pillar 4, Phase 1
├── P4-PHASE-2-COMPOSITION.md          # Pillar 4, Phase 2
├── P4-PHASE-3-VALIDATION.md           # Pillar 4, Phase 3
├── P4-PHASE-4-DOCUMENTATION.md        # Pillar 4, Phase 4
│
├── ERROR-HANDLING.md                  # Error handling patterns
├── IMPLEMENTATION-STATUS.md           # Current implementation status
├── PROJECT-STRUCTURE.md               # File organization
├── SUCCESS-METRICS.md                 # KPIs and targets
└── TECHNOLOGY-STACK.md                # Tech choices
```

**Naming Convention:**
- `P{N}-` prefix indicates pillar number (P1, P2, P3, P4)
- `PHASE-{N}-` indicates implementation phase
- Spec files use descriptive names (COMPONENT-SPECS, AST-SCHEMA, etc.)
- Reference docs have no prefix

---

## 🔄 Relationship to Previous Documentation

This SPEC consolidates and supersedes:
- `.archive/PLANNING/` - Original comprehensive phase-based planning (kept for historical reference)
- `.archive/architecture/` - Technical specifications (merged into pillar documents)
- `/CODESTYLE.md` - Remains as the active code style guide

For implementation, **always refer to SPEC** as the source of truth.

---

## 📝 Key Principles

1. **Pillar Independence**: Each pillar can be developed in isolation
2. **Progressive Enhancement**: Start simple, layer complexity
3. **AI-First Design**: Every decision optimized for AI consumption
4. **Documentation-Driven**: Document before implementing
5. **Accessibility Non-Negotiable**: WCAG AA from day one
6. **Performance Budgets**: Enforce limits at every phase

---

## ❓ Where to Start?

1. **Understand the vision**: Read [DECISIONS.md](./DECISIONS.md) for the 17 guiding principles
2. **Choose your track**: Pick a pillar based on your expertise (see Quick Start Paths above)
3. **Read the phase docs**: Start with Phase 1 of your chosen pillar
4. **Follow the phases**: Work through phases sequentially
5. **Track progress**: Use phase acceptance criteria in each document

---

## 🎉 The Goal

By the end of this plan's implementation, AgentStatic will be:
- A **production-ready** static site generator
- With **20-30 beautiful components**
- That **Claude can use autonomously**
- To build **accessible, performant marketing sites**
- In **minutes instead of weeks**

---

*Last Updated: October 25, 2025*
*Status: Specification Complete (30 docs), Ready for Implementation*