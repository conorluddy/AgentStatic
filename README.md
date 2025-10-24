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
2. **Planning**: [`FINALPLAN/`](./FINALPLAN/) - Complete implementation plan with 4 pillars
3. **Code Style**: [`CODESTYLE.md`](./CODESTYLE.md) - Comprehensive coding standards

### Planning Structure

The project is organized into **4 independent pillars** that can be developed in parallel:

1. **[Component Library](./FINALPLAN/PILLAR-1-COMPONENTS/)** - 20-30 HTML/CSS components
2. **[Registry & Validation](./FINALPLAN/PILLAR-2-REGISTRY/)** - Machine-readable schemas
3. **[Build Engine](./FINALPLAN/PILLAR-3-BUILD/)** - Static site generation
4. **[AI Integration](./FINALPLAN/PILLAR-4-AI/)** - Claude MCP tools

See [`FINALPLAN/README.md`](./FINALPLAN/README.md) for complete navigation.

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

See [`FINALPLAN/REFERENCE/TECHNOLOGY-STACK.md`](./FINALPLAN/REFERENCE/TECHNOLOGY-STACK.md) for details.

---

## 📅 Implementation Timeline

**12-week parallel development plan**:

- **Weeks 1-7**: Frontend (components) + Backend (build system) in parallel
- **Weeks 8-10**: Integration and rendering
- **Week 11**: AI tools implementation
- **Week 12**: Documentation and launch

See [`FINALPLAN/ROADMAP.md`](./FINALPLAN/ROADMAP.md) for detailed timeline.

---

## 🏗️ Project Structure

```
AgentStatic/
├── FINALPLAN/              # Active planning documentation
│   ├── README.md          # Planning navigation
│   ├── ROADMAP.md         # Implementation timeline
│   ├── DECISIONS.md       # 17 architectural decisions
│   ├── PILLAR-1-*/        # Component library plans
│   ├── PILLAR-2-*/        # Registry & validation plans
│   ├── PILLAR-3-*/        # Build engine plans
│   ├── PILLAR-4-*/        # AI integration plans
│   └── REFERENCE/         # Supporting documentation
│
├── CLAUDE.md              # AI agent guide (start here!)
├── CODESTYLE.md           # Code style guide
├── package.json           # Project configuration
│
├── PLANNING/              # Legacy planning (historical)
└── architecture/          # Legacy specs (historical)
```

---

## 🚦 Getting Started

### For Frontend Developers
Start with [PILLAR 1: Components](./FINALPLAN/PILLAR-1-COMPONENTS/)
- Design system and tokens
- HTML/CSS components
- Storybook setup

### For Backend Developers
Start with [PILLAR 3: Build Engine](./FINALPLAN/PILLAR-3-BUILD/)
- Bun + Vite setup
- Template rendering
- Static generation

### For AI/ML Engineers
Start with [PILLAR 4: AI Integration](./FINALPLAN/PILLAR-4-AI/)
- MCP tools
- Claude integration
- Composition engine

### For Full-Stack Developers
Follow the [complete roadmap](./FINALPLAN/ROADMAP.md) for parallel development tracks.

---

## 🎯 Success Metrics

- **Components**: 20-30 production-ready
- **Bundle Size**: <50KB CSS (gzipped)
- **Accessibility**: WCAG AA (100%)
- **Performance**: Lighthouse 90+
- **AI Speed**: <100ms discovery
- **Build Time**: <10s for 100 pages

See [`FINALPLAN/REFERENCE/SUCCESS-METRICS.md`](./FINALPLAN/REFERENCE/SUCCESS-METRICS.md) for all metrics.

---

## 📝 The 17 Architectural Decisions

Core principles that guide every implementation choice:

1. **Brochureware-First** - Visual, read-only sites only
2. **20-30 Components** - Quality over quantity
3. **Predefined Theme** - Beautiful defaults, easy customization
4. **Claude-Optimized** - MCP tools designed for Claude specifically
5. **Template Distribution** - Clone and modify, not npm

...and 12 more. See [`FINALPLAN/DECISIONS.md`](./FINALPLAN/DECISIONS.md) for complete list.

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