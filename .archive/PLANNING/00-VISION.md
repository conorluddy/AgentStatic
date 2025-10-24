# AgentStatic: The Complete Vision

**Project**: AI-First Static Site Generator for Brochureware
**Last Updated**: October 24, 2025
**Status**: Planning Complete, Ready for Implementation

---

## Executive Summary

**AgentStatic** is a complete, standalone static site generator for brochureware websites. Users clone the template, start with beautiful example pages, and either customize manually or use Claude with MCP tools to autonomously compose sites.

The system combines:
1. A **CSS-first component library** (20-30 components) designed for visual/display components
2. A **lightweight SSG core** for converting components into static sites
3. A **Claude-optimized MCP layer** that enables autonomous site generation

---

## The Problem It Solves

### Current State
- Developers waste time building the same marketing site patterns repeatedly
- Component libraries are designed for developers, not for AI consumption
- Static site generators are powerful but require significant technical knowledge
- AI agents lack structured interfaces to generate websites autonomously

### AgentStatic's Solution
1. **Pre-built component library** (20-30 essential components) saves weeks of design and implementation
2. **Claude-optimized architecture** makes components discoverable and usable by Claude
3. **MCP tools** (discover, compose, validate, generate) let Claude autonomously build sites
4. **Clonable template** with example pages gets users started immediately (primary distribution)
5. **Human-friendly Storybook** with 80/20 documentation (visuals + code snippets) keeps developers productive

---

## Core Design Principles

### 1. Claude-Optimized Architecture
Every architectural decision is optimized for Claude's capabilities and patterns:
- Components as callable APIs with JSON schema (for agent composition)
- Rich metadata for discovery (basics + a11y + performance + examples)
- Clear tool interfaces via MCP protocol (Claude-specific optimization)
- JSON composition format (structured, validated, easy to modify)

### 2. CSS-First, Zero Runtime JS
- All presentation via pure CSS
- Optional JS for progressive enhancement
- No framework dependencies
- Renders in any environment (browser, headless, API)

### 3. Brochureware-Focused (With Extensibility)
- Components for visual/display (heroes, cards, galleries, pricing, testimonials)
- Explicitly NOT form inputs or complex interactions (out of scope)
- Optimized for marketing, landing pages, and promotional sites
- Beautiful predefined theme (easily customizable) + framework designed for easy component additions
- 20-30 essential components + Storybook architecture for frictionless expansion

### 4. Human and AI Collaboration
- Storybook for human developers to browse and learn
- MCP tools for AI agents to discover and compose
- Both working in the same codebase
- Developers can review and customize AI-generated output

### 5. Production-Ready
- <50KB CSS budget (with all components)
- WCAG AA accessibility by default
- Lighthouse 90+ on all components
- Works on all modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## What AgentStatic Is

✅ **A component library** - 20-30 production-ready components (extensible framework)
✅ **A static site generator** - Convert JSON compositions to static HTML + CSS
✅ **A Claude-optimized platform** - MCP tools designed for Claude's strengths
✅ **A standalone template** - Clone and start with beautiful example pages immediately
✅ **A developer tool** - Storybook (80/20: visuals + code) for learning and extending
✅ **A documentation system** - Comprehensive guides for humans and AI agents
✅ **An AI-friendly system** - Rich component metadata (basics + a11y + performance + examples)

---

## What AgentStatic Is NOT

❌ **Not a page builder UI** - Agents compose via JSON + MCP tools, not visual editors
❌ **Not a CMS** - No content management, no dynamic data loading (Phase 0-7 scope)
❌ **Not for complex apps** - Limited to static brochureware, no form inputs or runtime interactions
❌ **Not a library to add to your project** - Standalone template system, clone and go
❌ **Not generic for all AI models** - Optimized specifically for Claude (future extension possible)
❌ **Not a full-stack solution** - Frontend only, no backend, no database integration

---

## The Three-Tier Architecture

```
┌──────────────────────────────────────────────────┐
│ Tier 3: Claude-Optimized AI Layer                │
│                                                  │
│ • MCP Tools (discover, details, compose,         │
│   generate, validate) - Claude-specific          │
│ • Discovery with suggestions (consider X, Y, Z)  │
│ • JSON composition + validation                  │
│ • Rich metadata for better decisions             │
└──────────────────────────────────────────────────┘
                        ↑
┌──────────────────────────────────────────────────┐
│ Tier 2: SSG Core (Build Engine)                  │
│                                                  │
│ • Nunjucks templating (logic-light)              │
│ • Static file-based routing (pages → routes)     │
│ • CSS bundling + minification                    │
│ • Bundle size monitoring (warnings, not blocks)  │
│ • Dev server with watch/reload                   │
│ • Accessibility testing in CI/CD (Pa11y, axe)    │
└──────────────────────────────────────────────────┘
                        ↑
┌──────────────────────────────────────────────────┐
│ Tier 1: Component Library (The API)              │
│                                                  │
│ • Pure CSS + semantic HTML (zero runtime JS)     │
│ • Predefined theme + easy customization          │
│ • Dark mode (system preference + manual toggle)  │
│ • Global theme system (consistency)              │
│ • Rich JSON schemas (basics + a11y + perf)       │
│ • 20-30 essential components (extensible)        │
└──────────────────────────────────────────────────┘
```

Each tier is independently useful:
- **Tier 1 alone**: Use as a traditional component library
- **Tier 1 + 2**: Use as a developer-focused static site generator
- **All three tiers**: Enable AI agents to build sites autonomously

---

## Key Differentiators from Existing Solutions

### vs. Eleventy
- **Eleventy**: Content-first, blog-focused, flexible
- **AgentStatic**: Component-first, brochureware-focused, AI-optimized
- **Both**: Lightweight, JavaScript runtime

### vs. Astro
- **Astro**: Framework-agnostic (React, Vue, Svelte), zero JS by default
- **AgentStatic**: Pure CSS and semantic HTML, component-as-API design
- **Both**: Component-centric, zero runtime JS by default

### vs. Hugo
- **Hugo**: Blog-focused, taxonomy-rich, Go-based
- **AgentStatic**: Brochureware-focused, AI-first, JavaScript-based
- **Both**: Fast builds, static output, minimal configuration

### vs. Next.js Static Export
- **Next.js**: Framework-heavy, React-based, supports dynamic features
- **AgentStatic**: Lightweight, framework-free, purely static
- **Both**: TypeScript-friendly, modern tooling

### vs. Webflow / Framer
- **Webflow/Framer**: Visual editors, design tool integration
- **AgentStatic**: Code-first, AI automation, open source
- **Webflow**: Hosted solution; AgentStatic: Self-contained

---

## Technology Stack (Final)

### Core Runtime & Build
- **Bun 1.0+**: Fast, modern JavaScript runtime
- **Vite 5+**: Lightning-fast build tool and dev server
- **TypeScript 5+**: Type safety for build system

### CSS & Styling
- **PostCSS 8+**: CSS transformation pipeline
- **Lightning CSS**: Ultra-fast CSS minification
- **Design Tokens**: Token system via CSS custom properties

### Templating & Rendering
- **Nunjucks**: Logic-light template engine
- **HTML**: Pure semantic markup
- **ARIA**: Accessibility-first attributes

### Documentation & Storybook
- **Storybook 8+**: Component browser and documentation
- **MDX**: Rich documentation format
- **Markdown**: Clear, human-readable docs

### AI Integration
- **MCP (Model Context Protocol)**: Standard AI tool interface
- **JSON Schema**: Machine-readable component specifications
- **TypeScript Types**: Generated from schemas

### Testing & Quality
- **Vitest**: Unit testing
- **Pa11y**: Accessibility testing
- **Percy**: Visual regression testing
- **Playwright**: End-to-end testing

---

## Distribution Model

### PRIMARY: Clonable Template
```bash
git clone git@github.com:conor/agentstatic.git my-site
cd my-site
bun install
bun run dev
```

Ships with:
- Beautiful, complete example pages (SaaS landing, portfolio, etc.)
- Blank slate option available (secondary branch or subdirectory)
- All tools pre-configured and ready to use
- Storybook set up for component browsing
- Immediate productivity for humans and Claude

### SECONDARY: npm Package (Future Consideration)
npm package distribution deferred post-Phase 7. Focus on template-first experience initially. Package can be extracted from template codebase if needed later.

### Why Template-First?
- **Get started immediately** - Clone, install, run
- **Better example** - Users see what's possible right away
- **Easier with Claude** - AI agents have complete context in one repo
- **Lower friction** - No integration questions, everything is configured

---

## The Claude Workflow (Happy Path)

```
User Brief
    ↓
Claude (via MCP Tools)
    ↓
discover_components("hero")
  → Returns: [hero-default, hero-split, hero-video] + suggestions
    ↓
discover_components("features")
  → Returns: [feature-grid, feature-cards] + related suggestions
    ↓
compose_page({
  path: '/landing',
  components: [
    { type: 'hero', variant: 'split', props: {...} },
    { type: 'features', variant: 'cards', props: {...} }
  ]
}) → Creates: pages/landing.json
    ↓
validate_composition() → Valid ✓
    ↓
Build system: /landing.json → /landing/index.html + CSS
    ↓
Static HTML + CSS → Ready to Deploy
```

**Key Design Decisions**:
- Agents work with **JSON compositions** (structured, validated, modifiable)
- Discovery includes **suggestions** (alternatives for better decisions)
- Rich **metadata** (basics + a11y + performance + examples) in registry
- **Claude-optimized** (not generic for all AI models)

---

## Success Metrics (By End of Phase 7)

### Phase 7 Completion (12-14 weeks)
- ✅ 20-30 essential components in library
- ✅ Extensible Storybook architecture (easy to add more components)
- ✅ Complete SSG core working (Bun + Vite + Nunjucks + static routing)
- ✅ MCP tools functional and Claude-optimized
- ✅ Claude can autonomously build complete pages from brief
- ✅ <50KB CSS bundle (gzipped)
- ✅ WCAG AA compliance (automated testing + audit)
- ✅ Lighthouse 90+ on all example pages
- ✅ Clonable template with example pages ready to use
- ✅ Complete documentation (developer + AI guides)

### Year 1
- 100+ components in ecosystem
- Active community contributions
- Real-world sites built with AgentStatic
- Plugins and extensions
- Integration with major AI platforms

### Year 2+
- Plugin marketplace
- Component marketplace
- Themes and variations
- Advanced features (dynamic content, etc.)
- Team collaboration features

---

## How Humans and AI Will Use AgentStatic

### Workflow 1: AI-Assisted (Primary)
1. **Human**: Write brief ("Build SaaS landing page")
2. **AI**: Use tools to autonomously build site
3. **Human**: Review, provide feedback
4. **AI**: Iterate and refine
5. **Human**: Deploy

### Workflow 2: Human-Driven (Secondary)
1. **Human**: Browses Storybook to learn components
2. **Human**: Manually writes page compositions (JSON)
3. **Human**: Runs build, views output
4. **Human**: Iterates and refines
5. **Human**: Deploys

### Workflow 3: Hybrid (Flexible)
1. **Human**: Start with high-level requirements
2. **AI**: Generates rough page structure
3. **Human**: Reviews, customizes, adds content
4. **AI**: Validates and refines
5. **Human**: Reviews final result
6. **Deployed**: Live site

---

## Economic Model & Sustainability

### Open Source Core
- AgentStatic core is MIT licensed
- Free for personal and commercial use
- Community-driven development

### Monetization Opportunities (Future)
- Premium hosting
- Professional services (customization, consultation)
- Component marketplace revenue sharing
- Enterprise support

### Why This Matters
By making the core free and open, AgentStatic can become the standard tool for AI-driven static site generation. Monetization comes from services, not licensing.

---

## Risks and Mitigations

### Risk: AI agents generate poor-quality pages
**Mitigation**:
- Comprehensive validation before deployment
- Clear error messages guide agents to better choices
- Human review required before deployment
- Component design enforces good defaults

### Risk: Component library becomes too large to manage
**Mitigation**:
- Clear scope (brochureware only)
- Strict contribution guidelines
- Regular pruning of unused components
- Plugin system for extended components

### Risk: Developers won't contribute
**Mitigation**:
- Clear contribution guide
- Easy setup for contributors
- Quick review turnaround
- Recognition and community standing

### Risk: CSS bundle grows beyond 50KB
**Mitigation**:
- Bundle size monitoring in CI
- Aggressive code review
- Auto-PurgeCSS in production builds
- Consider splitting into modules if needed

### Risk: Accessibility compliance issues
**Mitigation**:
- WCAG AA requirement from day one
- Automated a11y testing
- Manual testing with real assistive tech
- Community audits

---

## Beyond Phase 7 (Future Planning)

Post-Phase 7 work is deferred pending launch evaluation. Initial focus is on solid core delivery (Phases 0-7).

Potential future directions:
- **Dynamic data loading** - JSON/markdown sources (Phase 8+)
- **Ecosystem growth** - Community components, plugin system (Phase 9+)
- **Advanced features** - i18n, image optimization, component versioning (Phase 10+)
- **npm package** - Extract template into distributable package (Phase 8+)

Current Phase 7 goal: Solid, complete, extensible core system.

---

## Conclusion

AgentStatic is a **complete, standalone system** for building brochureware websites. By optimizing specifically for Claude while maintaining excellent developer experience, we create a tool that serves both humans and AI exceptionally well.

**Core strengths**:
- **Template-first**: Clone, see beautiful examples, start immediately
- **Claude-optimized**: MCP tools designed for Claude's patterns and strengths
- **20-30 components**: Focused, high-quality library with extensible framework
- **Rich metadata**: Helps Claude make smarter composition decisions
- **Predefined theme**: Beautiful defaults + trivial customization

**The three-tier architecture remains elegant**:
- Tier 1: Brochureware component library (standalone value)
- Tiers 1+2: Traditional SSG for human developers
- All three: Claude-autonomous site generation

**Timeline**: 12-14 weeks to deliver solid Phase 0-7 core. No post-launch planning initially—focus on nailing the foundation.

**AgentStatic is purpose-built for the Claude + static site generation future.**

---

*Vision Document v2.0 (Refined) - October 24, 2025*
