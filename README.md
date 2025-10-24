# AgentStatic

**An AI-First Static Site Generator for Brochureware Marketing Websites**

AgentStatic enables both developers and AI agents (particularly Claude) to build beautiful, accessible, performant marketing websites in minutes instead of weeks.

---

## 🚀 Project Status

**Planning Phase Complete** ✅

All architectural planning and documentation is complete. The project is ready for implementation to begin.

---

## 📚 Documentation

### For Developers & Contributors

1. **Start Here**: [`CLAUDE.md`](./CLAUDE.md) - Essential guide for AI agents and developers
2. **Specification**: [`SPEC/`](./SPEC/) - Complete implementation specification with 4 pillars
3. **Code Style**: [`CODESTYLE.md`](./CODESTYLE.md) - Comprehensive coding standards

### Specification Structure

The project is organized into **4 independent pillars** that can be developed in parallel:

1. **[Component Library](./SPEC/PILLAR-1-COMPONENTS/)** - 20-30 HTML/CSS components
2. **[Registry & Validation](./SPEC/PILLAR-2-REGISTRY/)** - Machine-readable schemas
3. **[Build Engine](./SPEC/PILLAR-3-BUILD/)** - Static site generation
4. **[AI Integration](./SPEC/PILLAR-4-AI/)** - Claude MCP tools

See [`SPEC/README.md`](./SPEC/README.md) for complete navigation.

---

## 🎯 What is AgentStatic?

A three-tier platform that combines:

1. **Component Library**: 20-30 production-ready CSS components (zero JavaScript)
2. **Build Engine**: Bun + Vite powered static site generator
3. **AI Layer**: Claude-optimized MCP tools for autonomous site building

### Key Features

- ✅ **Pure CSS** - No JavaScript required for core functionality
- ✅ **WCAG AA** - 100% accessibility compliance
- ✅ **Dark Mode** - Automatic + manual toggle
- ✅ **<50KB CSS** - Optimized bundle size
- ✅ **AI-Native** - Claude can build complete sites autonomously
- ✅ **Template-First** - Clone and customize, not npm install

---

## 🛠️ Technology Stack

- **Runtime**: Bun 1.0+
- **Build**: Vite 5+
- **Templates**: Nunjucks
- **CSS**: PostCSS + Lightning CSS
- **Documentation**: Storybook 8
- **AI**: MCP (Model Context Protocol)

See [`SPEC/REFERENCE/TECHNOLOGY-STACK.md`](./SPEC/REFERENCE/TECHNOLOGY-STACK.md) for details.

---

## 📅 Implementation Timeline

**12-week parallel development plan**:

- **Weeks 1-7**: Frontend (components) + Backend (build system) in parallel
- **Weeks 8-10**: Integration and rendering
- **Week 11**: AI tools implementation
- **Week 12**: Documentation and launch

See [`SPEC/ROADMAP.md`](./SPEC/ROADMAP.md) for detailed timeline.

---

## 🏗️ Project Structure

```
AgentStatic/
├── SPEC/                   # ✅ SPECIFICATION - Use this!
│   ├── README.md          # Specification navigation
│   ├── ROADMAP.md         # Implementation timeline
│   ├── DECISIONS.md       # 17 architectural decisions
│   ├── PILLAR-1-*/        # Component library specification
│   ├── PILLAR-2-*/        # Registry & validation specification
│   ├── PILLAR-3-*/        # Build engine specification
│   ├── PILLAR-4-*/        # AI integration specification
│   └── REFERENCE/         # Supporting documentation
│
├── CLAUDE.md              # AI agent guide
├── CODESTYLE.md           # Code style guide
├── README.md              # This file
├── package.json           # Project configuration
│
└── .archive/              # Historical docs (reference only)
    ├── PLANNING/          # Original comprehensive planning
    └── architecture/      # Original technical specs
```

---

## 📦 About the Archive

The `.archive/` directory contains historical planning documents that have been consolidated into SPEC:
- **PLANNING/** - Original 7-phase comprehensive planning
- **architecture/** - Original technical specifications

These are kept for historical reference but **should not be used for active development**. Always refer to `/SPEC/` instead.

See [`.archive/README.md`](./.archive/README.md) for details.

---

## 🚦 Getting Started

### For Frontend Developers
Start with [PILLAR 1: Components](./SPEC/PILLAR-1-COMPONENTS/)
- Design system and tokens
- HTML/CSS components
- Storybook setup

### For Backend Developers
Start with [PILLAR 3: Build Engine](./SPEC/PILLAR-3-BUILD/)
- Bun + Vite setup
- Template rendering
- Static generation

### For AI/ML Engineers
Start with [PILLAR 4: AI Integration](./SPEC/PILLAR-4-AI/)
- MCP tools
- Claude integration
- Composition engine

### For Full-Stack Developers
Follow the [complete roadmap](./SPEC/ROADMAP.md) for parallel development tracks.

---

## 🎯 Success Metrics

- **Components**: 20-30 production-ready
- **Bundle Size**: <50KB CSS (gzipped)
- **Accessibility**: WCAG AA (100%)
- **Performance**: Lighthouse 90+
- **AI Speed**: <100ms discovery
- **Build Time**: <10s for 100 pages

See [`SPEC/REFERENCE/SUCCESS-METRICS.md`](./SPEC/REFERENCE/SUCCESS-METRICS.md) for all metrics.

---

## 📝 The 17 Architectural Decisions

Core principles that guide every implementation choice:

1. **Brochureware-First** - Visual, read-only sites only
2. **20-30 Components** - Quality over quantity
3. **Predefined Theme** - Beautiful defaults, easy customization
4. **Claude-Optimized** - MCP tools designed for Claude specifically
5. **Template Distribution** - Clone and modify, not npm

...and 12 more. See [`SPEC/DECISIONS.md`](./SPEC/DECISIONS.md) for complete list.

---

## 🤝 Contributing

This project is currently in the planning phase. Implementation begins soon!

To contribute:
1. Review the planning documentation
2. Choose a pillar to work on
3. Follow the phase plans
4. Adhere to CODESTYLE.md

---

## 📄 License

[License to be determined]

---

## 🙏 Acknowledgments

- Planning assistance from Claude (Anthropic)
- Architecture inspired by modern SSG best practices
- Component patterns from successful design systems

---

*AgentStatic: Where AI meets static site generation.*

**Last Updated**: October 24, 2025
**Status**: Ready for Implementation