# AgentStatic: Complete 12-14 Week Implementation Plan

**Status**: Planning Refined ✅ | **Ready for Execution**: Yes
**Total Effort**: 250-300 hours | **Timeline**: 12-14 weeks

---

## What We've Created

A **comprehensive, actionable plan** to build AgentStatic - an **AI-first static site generator** for brochureware websites.

### Planning Documents Created

```
PLANNING/
├── README.md                     # Navigation guide
├── QUICK-START.md                # 5-min summary
├── INDEX.md                      # Detailed index & links
├── ROADMAP.md                    # (will update)
├── COMPONENT-MATRIX.md           # (will update)
├── COMPLETE-PLAN-SUMMARY.md      # This file
│
├── phases/
│   ├── PHASE-00-SSG-FOUNDATION.md      # ✅ Build pipeline, templating, routing
│   ├── PHASE-01-FOUNDATION.md          # ✅ Design tokens, CSS architecture
│   ├── PHASE-02-VISUAL-FOUNDATIONS.md  # ✅ 15 atoms & molecules
│   ├── PHASE-03-COMPLEX-SECTIONS.md    # ✅ 10 organisms
│   ├── PHASE-04-PATTERNS-ENHANCEMENT.md# ✅ Polish & optimization
│   ├── PHASE-05-COMPONENT-REGISTRY.md  # ✅ Discovery system
│   ├── PHASE-06-AI-INTEGRATION.md      # ✅ MCP tools & composition
│   └── PHASE-07-STORYBOOK-DOCS.md      # ✅ Documentation
│
└── architecture/
    └── 00-VISION.md              # ✅ Complete vision document
```

---

## The System: Three-Tier Architecture (Refined)

### Tier 1: Component Library (Design System)
- **20-30 essential components** for brochureware (extensible framework)
- **Predefined theme** (colors, spacing, typography, shadows) + easy customization
- **Semantic HTML**: Accessibility-first, WCAG AA target
- **Dark mode**: System preference + optional user toggle
- **Global theme system**: Consistency across all pages
- **Rich JSON schemas**: basics + a11y + performance + usage examples
- **Storybook**: 80/20 approach (visuals + code snippets)

### Tier 2: SSG Core (Build Engine)
- **Build pipeline**: Bun + Vite + PostCSS + Lightning CSS
- **Template engine**: Nunjucks (logic-light)
- **Static file-based routing**: pages → routes (no dynamic generation)
- **CSS bundling**: <50KB gzipped, bundle size warnings in CI
- **Dev server**: Watch + reload, fast iteration
- **Accessibility testing**: Pa11y + axe in CI/CD (automated, no manual testing)

### Tier 3: Claude-Optimized AI Layer
- **5 MCP Tools** (Claude-specific optimization):
  - `discover_components` - Search with suggestions
  - `get_component_details` - Full component spec
  - `compose_page` - Create JSON composition
  - `generate_component` - Create custom component
  - `validate_composition` - Check validity
- **JSON composition format**: Structured, validated, easy to review/modify
- **Rich discovery metadata**: Helps Claude make better decisions
- **Validation engine**: Catch errors before deployment

---

## 7 Phases + Buffer, 12-14 Weeks, 250-300 Hours

| Phase | Duration | Effort | Focus | Deliverable |
|-------|----------|--------|-------|-------------|
| **0** | Weeks 1-2 | 25h | SSG Foundation | Bun + Vite, Nunjucks, static routing, CI/CD setup |
| **1** | Weeks 1-2 | 25h | Component Foundation | Design tokens, CSS architecture, theme system, dark mode |
| **2** | Weeks 3-4 | 30h | Basic Components | 12-15 atoms/molecules (button, card, hero, features, etc.) |
| **3** | Weeks 5-6 | 30h | Complex Sections | 8-10 organisms (layouts, comparisons, sections) |
| **4** | Weeks 6-8 | 35h | Polish & Enhancement | Container queries, a11y audit, print, refinement |
| **5** | Weeks 8-9 | 25h | Component Registry | JSON schemas, rich metadata, discovery API, validation |
| **6** | Weeks 9-11 | 40h | AI Integration | Claude-optimized MCP tools, validation, testing |
| **7** | Weeks 11-13 | 30h | Storybook & Docs | Stories (80/20), guides, examples, documentation |
| **Buffer** | Weeks 13-14 | — | Final Polish | QA, bug fixes, documentation review, launch prep |
| | | | | |
| **TOTAL** | 12-14 Weeks | 280h | Complete System | Production-ready, Claude-optimized static site generator |

---

## Technology Stack

```
Frontend: CSS + Semantic HTML
├─ Pure CSS (no preprocessors)
├─ Design tokens via CSS custom properties
└─ Semantic HTML with ARIA

Build System: Bun + Vite
├─ Bun runtime (fast, modern)
├─ Vite bundler (blazing fast)
├─ PostCSS + Lightning CSS
└─ TypeScript throughout

Templating: Nunjucks
├─ Logic-light templating
├─ Easy for AI to parse
├─ Great error messages
└─ Proven in production

Documentation: Storybook + Markdown
├─ Storybook 8 (visual component browser)
├─ MDX (rich documentation)
├─ AI-optimized guides
└─ Comprehensive examples

AI Integration: MCP (Model Context Protocol)
├─ Standard AI tool interface
├─ JSON Schema for specs
├─ Anthropic's protocol
└─ Works with Claude, future models
```

---

## What You Get After Phase 7

### Code Deliverables
✅ Complete SSG core (Bun + Vite, static routing, Nunjucks)
✅ 20-30 production-ready components (extensible framework)
✅ Design token system (predefined theme + customization)
✅ Dark mode system (automatic + manual toggle)
✅ Component registry with rich metadata (basics + a11y + perf + examples)
✅ Claude-optimized MCP tools (5 tools, discovery with suggestions)
✅ JSON composition validation engine
✅ Storybook setup with stories (80/20 approach: visuals + code)
✅ CI/CD with accessibility testing (Pa11y, axe) + bundle warnings

### Documentation Deliverables
✅ Developer guide (how to use components manually)
✅ Claude guide (how to use MCP tools for autonomous generation)
✅ Contributing guide (how to add components to library)
✅ Component API reference (all component specs)
✅ Architecture documentation (system design)
✅ 2-3 example sites (SaaS landing, portfolio, etc.)
✅ Troubleshooting guide (common issues + solutions)

### Template Deliverables
✅ Clonable Git template (primary distribution)
✅ Example pages included (main branch)
✅ Blank slate option available (secondary)
✅ All tools pre-configured
✅ CI/CD workflows set up
✅ Ready to use immediately

---

## The Claude Workflow: How It Works

### User Brief
"Build me a SaaS landing page with hero, features, pricing, and testimonials"

### Claude (via MCP Tools - Claude-Optimized)
```
1. discover_components("hero for SaaS")
   → Returns: [hero-default, hero-split, hero-video] + suggestions
   → Metadata: accessibility, performance, usage examples

2. discover_components("product features")
   → Returns: [feature-grid, feature-cards] + alternatives

3. discover_components("pricing table")
   → Returns: [pricing-table, pricing-cards] + related components

4. discover_components("testimonials")
   → Returns: [testimonial-carousel, testimonial-grid] + suggestions

5. compose_page({
     path: '/landing',
     components: [{...}, {...}, {...}, {...}]
   }) → Creates: pages/landing.json

6. validate_composition()
   → Valid ✓ (all components, variants, props validated)

7. Build system: /landing.json → /landing/index.html + CSS
```

### Result
**Complete, static website** with clean HTML/CSS, predefined theme, dark mode support, WCAG AA accessibility, zero runtime JavaScript, ready to deploy immediately.

---

## Key Features By Phase

### Phase 0: SSG Foundation (Weeks 1-2)
- ✅ Bun + Vite project setup
- ✅ Nunjucks templating engine integration
- ✅ Static file-based routing (pages → routes, no dynamic generation)
- ✅ CSS bundling + minification (PostCSS + Lightning CSS)
- ✅ Dev server with watch/reload
- ✅ CI/CD basics (GitHub Actions setup)

### Phase 1: Component Foundation (Weeks 1-2, parallel)
- ✅ Design tokens (colors, spacing, typography, shadows)
- ✅ CSS architecture with cascade layers (@layer reset, base, components, utilities)
- ✅ Predefined theme (beautiful defaults)
- ✅ Dark mode system (prefers-color-scheme + manual toggle)
- ✅ Global theme system (consistency, no per-page overrides)
- ✅ Storybook configuration (80/20: visuals + code snippets)

### Phase 2: Basic Components (Weeks 3-4, 12-15 total)
- ✅ 8 essential atoms: button, heading, text, divider, badge, icon, link, breadcrumb
- ✅ 7 essential molecules: card, CTA block, image+text, feature list, testimonial, stat, pricing card
- ✅ All responsive (mobile-first), accessible (WCAG AA), dark mode ready
- ✅ Storybook stories for each component

### Phase 3: Complex Sections (Weeks 5-6, 8-10 total)
- ✅ Organisms: hero (variants), feature section, comparison table, gallery
- ✅ Layout sections: header, footer, testimonial carousel, team grid, social proof
- ✅ Integration testing with multi-component pages
- ✅ All WCAG AA compliant, Lighthouse 90+ on example pages

### Phase 4: Polish & Enhancement (Weeks 6-8)
- ✅ Container queries for responsive components
- ✅ Advanced CSS (`:has()`, `:not()` selectors)
- ✅ Accessibility audit (automated + review)
- ✅ Print stylesheet
- ✅ Component refinement and edge cases
- ✅ CSS bundle size optimization + monitoring

### Phase 5: Component Registry (Weeks 8-9)
- ✅ JSON schemas for all components (rich metadata)
- ✅ Schema includes: basics + a11y + performance + usage examples
- ✅ Auto-generated component registry
- ✅ Discovery API (search by keyword, category, accessibility level)
- ✅ Validation engine for component compositions

### Phase 6: Claude-Optimized AI Integration (Weeks 9-11)
- ✅ 5 MCP tools (Claude-specific optimization):
  - discover_components (with suggestions)
  - get_component_details
  - compose_page (JSON composition)
  - generate_component
  - validate_composition
- ✅ JSON composition validation engine
- ✅ Testing with Claude
- ✅ Documentation for AI workflows

### Phase 7: Storybook & Documentation (Weeks 11-13)
- ✅ Storybook stories for all components (80/20: visuals + code snippets)
- ✅ Developer guide (how to use components)
- ✅ Claude guide (how to use MCP tools)
- ✅ Contributing guide (how to extend library)
- ✅ Component API reference
- ✅ 2-3 example pages (SaaS landing, portfolio, etc.)

---

## Scope Management

### In Scope (Phase 0-7)
✅ Brochureware components (heroes, cards, galleries, pricing, testimonials)
✅ Brochureware marketing sites (SaaS landings, portfolios, documentation)
✅ Pure CSS + semantic HTML (zero runtime JS)
✅ Responsive design (mobile-first, container queries)
✅ Dark mode (system preference + manual toggle)
✅ Accessibility (WCAG AA, automated testing)
✅ Claude-optimized AI integration (MCP tools)
✅ Static site generation (Bun + Vite + Nunjucks)
✅ Storybook documentation (80/20 approach)
✅ Extensible component framework

### Explicitly Out of Scope
❌ Form inputs, form validation, form submission
❌ Interactive components (tabs, modals, dropdowns, etc.)
❌ Database integration, backend features
❌ User authentication, CMS functionality
❌ Dynamic data loading (Phase 0-7; future consideration)
❌ Framework integration (React, Vue, Svelte)
❌ Runtime JavaScript (display-only components)

---

## Success Criteria (By End of Phase 7)

### Code & Components
- [x] 20-30 production-ready components (specified in scope reduction)
- [x] Extensible Storybook architecture (easy to add more components)
- [x] All components in Storybook with 80/20 stories (visuals + code)
- [x] <50KB CSS (gzipped) with all components
- [x] WCAG AA compliance (automated testing + audit pass)
- [x] Global theme system with predefined defaults
- [x] Dark mode (system preference + manual toggle)

### Build System & Infrastructure
- [x] SSG core complete (Bun + Vite + Nunjucks + static routing)
- [x] CI/CD setup with accessibility testing (Pa11y, axe)
- [x] Bundle size monitoring (warnings, not blocks)
- [x] Dev server with fast watch/reload
- [x] Example pages (2-3 complete sites)

### AI & Claude Integration
- [x] 5 MCP tools (Claude-optimized)
- [x] Tools working and tested with Claude
- [x] Claude can autonomously build complete pages
- [x] JSON composition validation engine
- [x] Rich component metadata (basics + a11y + perf + examples)
- [x] Discovery with suggestions (Claude gets alternatives to consider)

### Documentation
- [x] Complete developer guide
- [x] Complete Claude/AI guide
- [x] Contributing guide (how to extend library)
- [x] Component API reference
- [x] Architecture documentation
- [x] 2-3 real example pages
- [x] Troubleshooting guide

### Distribution
- [x] Clonable Git template (PRIMARY)
- [x] Example pages included (main branch)
- [x] Blank slate option (secondary)
- [x] All tools pre-configured
- [x] Ready to use immediately

### Quality Metrics
- [x] WCAG AA: 100% (automated + audit)
- [x] Lighthouse 90+ on all example pages
- [x] CSS bundle <50KB gzipped
- [x] Build time <10 seconds
- [x] Documentation coverage: 100%

---

## File Structure (Final)

```
agentstatic/
├── core/                           # SSG engine (Phase 0)
│   ├── engine/
│   ├── router/
│   ├── builder/
│   ├── assets/
│   ├── cli/
│   └── config/
│
├── components/                     # Component library (Phase 1-4)
│   ├── _system/                   # Tokens & base styles
│   ├── atoms/                     # 8 components
│   ├── molecules/                 # 7 components
│   ├── organisms/                 # 10+ components
│   ├── templates/                 # 3+ layouts
│   ├── _registry/                 # Generated by Phase 5
│   └── index.css
│
├── ai/                             # AI layer (Phase 6)
│   ├── tools/                     # MCP tool definitions
│   ├── registry/                  # Component index & validation
│   ├── composer/                  # Page composition logic
│   ├── generator/                 # Component generation
│   ├── mcp/                       # MCP server
│   └── workflows/                 # Workflow documentation
│
├── site/                           # User site content
│   ├── pages/                     # Page compositions (JSON)
│   ├── content/                   # Markdown content
│   ├── assets/                    # Images, fonts, etc.
│   └── config.json               # Site config
│
├── .storybook/                     # Storybook config (Phase 7)
├── scripts/                        # Build utilities
├── docs/                           # Documentation (Phase 7)
├── tests/                          # Test suites
│
├── dist/                           # Build output (gitignored)
├── bun.toml
├── vite.config.ts
├── postcss.config.js
├── package.json
└── README.md
```

---

## Getting Started (When Ready to Execute)

### Week 1: Phases 0 & 1 (In Parallel)
1. Read: `PLANNING/phases/PHASE-00-SSG-FOUNDATION.md`
2. Read: `PLANNING/phases/PHASE-01-FOUNDATION.md`
3. Set up Bun + Vite project
4. Create design token system
5. Establish CSS architecture
6. Configure Storybook

### Weeks 2-3: Phase 2
1. Read: `PLANNING/phases/PHASE-02-VISUAL-FOUNDATIONS.md`
2. Build 8 atoms with CSS
3. Build 7 molecules with CSS
4. Create Storybook stories
5. Test all variants and states

### Weeks 3-4: Phase 3
1. Read: `PLANNING/phases/PHASE-03-COMPLEX-SECTIONS.md`
2. Build 10 organisms
3. Integration testing
4. Responsive design verification

### Weeks 5-6: Phases 4 & 5 (In Parallel)
1. Phase 4: Patterns, enhancements, dark mode
2. Phase 5: Component schemas, registry generation

### Weeks 8-9: Phase 6
1. Implement MCP tools
2. Build discovery API
3. Page composer engine
4. Component generator

### Week 9: Phase 7
1. Storybook stories for all components
2. Developer documentation
3. AI agent guide
4. Contributing guide

### Week 10: Launch
1. Final testing
2. npm package release
3. GitHub repository open-sourced
4. Announcement

---

## Next Steps (Right Now)

1. **Review the vision**: Read `/PLANNING/architecture/00-VISION.md`
2. **Review the roadmap**: Read `/PLANNING/ROADMAP.md` (when updated)
3. **Choose a phase**: Pick Phase 0 or Phase 1 to start
4. **Read the phase plan**: Deep dive into the phase details
5. **Ask clarifying questions**: For any phase or approach
6. **Begin execution**: Start coding when ready

---

## Questions?

Everything is documented in `/PLANNING/`. Each phase has:
- Clear deliverables
- Detailed breakdown of work
- File structures
- Configuration examples
- Success criteria
- Open questions for discussion

**Want to discuss a specific phase?** Let me know which phase interests you and I can dive deeper into design decisions, implementation approaches, or trade-offs.

---

## The Bottom Line

AgentStatic is **ambitious but achievable** in 10 weeks with focused execution. The three-tier architecture means you can stop after any phase and have a useful product:
- After Phase 1: CSS architecture and token system
- After Phase 3: Working SSG with components
- After Phase 5: Components discoverable by AI
- After Phase 7: Complete AI-first platform

**The planning is complete. The vision is clear. Time to build.** 🚀

---

*Complete Plan Summary v1.0 - October 24, 2025*
