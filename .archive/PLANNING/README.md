# AgentStatic Planning Directory

Comprehensive, phased planning for **AgentStatic**: an AI-first static site generator for brochureware marketing sites, powered by 17 refined architectural decisions.

---

## What is AgentStatic?

**AgentStatic** is a three-tier platform:

1. **Tier 1: Component Library** - 20-30 production-ready components (atoms, molecules, organisms)
2. **Tier 2: Static Site Generator** - Bun + Vite powered build system for composing pages
3. **Tier 3: AI Integration** - 5 Claude-optimized MCP tools for autonomous page building

**Key Focus**: Brochureware marketing sites that are:
- ✅ Accessible (WCAG AA)
- ✅ Responsive (mobile-first)
- ✅ Dark mode enabled
- ✅ AI-discoverable and composable
- ✅ Template-distributed (not npm packages)
- ✅ Example-driven with real content

---

## The 17 Refined Decisions

All planning documents reflect these architectural decisions:

1. **Brochureware-First**: Visual, read-only content sites (no apps, forms, complex interactions)
2. **20-30 Components**: Focused set (12-15 atoms/molecules, 8-10 organisms)
3. **Predefined Theme + Easy Customization**: Design tokens enable global + per-site theming
4. **Claude-Optimized MCP**: Not generic—5 tools specifically for component discovery and page building
5. **Template-First Distribution**: Users fork/customize, not npm install
6. **Example Pages Primary**: Show real compositions, blank slate secondary
7. **Dark Mode: System + Manual Toggle**: CSS variables + localStorage toggle
8. **Static Routing Only**: No dynamic routes, all pages pre-built
9. **Global Theme (No Per-Page Overrides)**: Consistency across site
10. **All Metadata in Registry**: Searchable component schema with rich context
11. **JSON Compositions**: Structured page definitions for validation and composition
12. **Automated a11y Testing**: Pa11y + axe during build (warnings not blocking)
13. **Bundle Warnings (Not Blocking)**: Build completes even with CSS warnings
14. **12-14 Week Timeline**: Full development from architecture to launch
15. **Storybook 80/20**: Visuals + code snippets (not exhaustive auto-generated docs)
16. **MCP Suggestions**: Discovery returns alternatives, not just matches
17. **No Phase 8**: Ship complete, no long-term roadmap

---

## Documents in This Directory

### Core Navigation
- **README.md** (this file) - Overview, decision summary, and navigation
- **INDEX.md** - Detailed cross-reference of all documents and concepts

### Phase Planning (7 Phases)
- **phases/PHASE-00-SSG-FOUNDATION.md** - Build pipeline, static routing, JSON compositions (Week 10)
- **phases/PHASE-01-FOUNDATION.md** - Design system, tokens, CSS architecture, dark mode (Week 1-2)
- **phases/PHASE-02-VISUAL-FOUNDATIONS.md** - 6 atoms, 5-7 molecules (Week 3-4)
- **phases/PHASE-03-COMPLEX-SECTIONS.md** - 8-10 organisms, page sections (Week 5-6)
- **phases/PHASE-04-PATTERNS-ENHANCEMENT.md** - CSS patterns, animations, polish (Week 7-8)
- **phases/PHASE-05-COMPONENT-REGISTRY.md** - Metadata, discovery API, schema generation (Week 9)
- **phases/PHASE-06-AI-INTEGRATION.md** - 5 MCP tools, Claude integration (Week 10-11)
- **phases/PHASE-07-STORYBOOK-DOCS.md** - Storybook, documentation, guides (Week 12)

### Supporting Documents
- **DECISIONS.md** - (optional) Architecture Decision Records (ADRs) for each decision
- **TIMELINE.md** - (optional) Detailed 12-week timeline with milestones

---

## Planning Structure

### 7 Phases, 12-14 Weeks, ~200 Hours

```
Phase 0: SSG Foundation (Week 10)
├─ Build pipeline (Bun + Vite)
├─ Static routing system
├─ JSON composition format
└─ Component registry generation
   ↓
Phase 1: Foundation (Week 1-2)
├─ Design tokens (colors, spacing, typography)
├─ CSS architecture (cascade layers, BEM naming)
├─ Build pipeline integration
└─ Dark mode infrastructure
   ↓
Phase 2: Visual Foundations (Week 3-4)
├─ 6 Atoms (button, heading, text, icon, badge, divider)
├─ 5-7 Molecules (card, CTA, image+text, feature list, testimonial)
└─ Storybook setup with 30 stories
   ↓
Phase 3: Complex Sections (Week 5-6)
├─ 8-10 Organisms (hero, header, feature section, gallery, etc.)
├─ Integration testing
└─ Page composition patterns
   ↓
Phase 4: Enhancement & Polish (Week 7-8)
├─ Container queries, modern CSS patterns
├─ Animations with reduced-motion support
├─ Responsive image optimization
└─ Comprehensive accessibility audit
   ↓
Phase 5: Component Registry (Week 9)
├─ Auto-generate component schemas
├─ Semantic search implementation
├─ Discovery API
└─ Registry CLI tools
   ↓
Phase 6: AI Integration (Week 10-11)
├─ 5 Claude-optimized MCP tools
├─ Tool implementations
├─ Validation and composition system
└─ AI example workflows
   ↓
Phase 7: Storybook & Docs (Week 12)
├─ 50-70 component stories
├─ 5-layer documentation
├─ Developer guide
├─ AI agent guide
└─ Contributing guide
```

### Target Outcome

**By End of Phase 7**:
- ✅ **20-30 Components**: Fully documented and tested
- ✅ **42KB CSS**: Compressed bundle (~120KB uncompressed)
- ✅ **WCAG AA**: 100% compliant across all components
- ✅ **Storybook**: 50-70 stories showing all variants
- ✅ **5 MCP Tools**: Integrated with Claude API
- ✅ **Complete Documentation**: For developers, AI agents, and contributors
- ✅ **Production Ready**: Template ready for fork and customize

---

## Phase Gate Criteria

Each phase has a gate before proceeding:

### Phase 0 → 1
- [x] Build pipeline working with Bun + Vite
- [x] Static routing system functional
- [x] Component registry generation working

### Phase 1 → 2
- [x] Design system documented
- [x] CSS architecture defined
- [x] Dark mode infrastructure in place

### Phase 2 → 3
- [x] All atoms and molecules built (12-15 total)
- [x] 30+ Storybook stories
- [x] WCAG AA compliance on all components

### Phase 3 → 4
- [x] All organisms built (8-10 total)
- [x] Real page compositions working
- [x] Integration testing passing

### Phase 4 → 5
- [x] Modern CSS patterns implemented
- [x] All animations respect prefers-reduced-motion
- [x] Accessibility audit 100% passing

### Phase 5 → 6
- [x] Component registry searchable
- [x] Discovery API functioning
- [x] Schema generation automated

### Phase 6 → 7
- [x] All 5 MCP tools implemented
- [x] Claude integration tested
- [x] AI workflows validated

### Phase 7 → Launch
- [x] All documentation complete
- [x] Storybook deployed publicly
- [x] Template ready for users

---

## Quick Navigation

**Never seen AgentStatic before?**
→ Start with: Overview section above (5 min) + PHASE-01-FOUNDATION.md (10 min)

**Want to understand the decisions?**
→ Read: The 17 Refined Decisions section above + each phase's "Key Focus"

**Ready to build a specific phase?**
→ Read: `phases/PHASE-XX-*.md` (phases are self-contained)

**Need component specifications?**
→ Read:
- PHASE-02-VISUAL-FOUNDATIONS.md (atoms & molecules)
- PHASE-03-COMPLEX-SECTIONS.md (organisms)

**Building the AI integration?**
→ Read: PHASE-06-AI-INTEGRATION.md (includes tool schemas)

**Setting up documentation?**
→ Read: PHASE-07-STORYBOOK-DOCS.md (includes guide templates)

**Looking for implementation details?**
→ Check individual phase documents for file structure and code examples

---

## Key Architectural Patterns

### Component Organization (Atomic Design)

```
Atoms (6 - fundamental elements)
├─ Button, Heading, Text, Icon, Badge, Divider

Molecules (5-7 - atom combinations)
├─ Card, CTA Block, Image+Text, Feature List, Testimonial

Organisms (8-10 - full page sections)
├─ Hero Section, Header, Feature Section, Gallery, etc.
```

### Technology Stack

**Runtime & Build**:
- Bun 1.0+ (runtime)
- Vite 5+ (build tool)
- Nunjucks (templating)

**Styling**:
- CSS Custom Properties (design tokens)
- Cascade Layers (@layer)
- BEM naming convention
- Mobile-first responsive design
- Container queries

**Documentation**:
- Storybook 8 (component browser)
- Markdown (guides)
- MDX (docs pages)

**AI Integration**:
- Claude MCP (Model Context Protocol)
- 5 specialized tools
- JSON composition validation

### Design System

**Design Tokens** (`site/design-system.css`):
- Color palette (primary, secondary, surface, text)
- Spacing scale (xs → 2xl)
- Typography (font families, sizes, weights, line heights)
- Border radius, shadows, transitions
- Dark mode via CSS variables

**CSS Architecture**:
```css
@layer reset;           /* Browser reset */
@layer base;            /* Typography, base elements */
@layer components;      /* Component styles */
@layer utilities;       /* Utility classes */
@layer overrides;       /* Custom site overrides */
```

### Page Composition

Pages are defined in **JSON** with structured sections:

```json
{
  "path": "/landing",
  "title": "Our Product",
  "metadata": { "description": "..." },
  "sections": [
    {
      "component": "organisms/hero-section",
      "variant": "split",
      "props": { "heading": "...", "image": "..." }
    },
    {
      "component": "organisms/feature-section",
      "props": { "features": [...] }
    }
  ]
}
```

### AI Integration Pattern

**Discovery → Details → Composition → Validation → Build**

1. **discover_components** - Find matching components
2. **get_component_details** - Understand component options
3. **compose_page** - Build page from components
4. **validate_composition** - Check before building
5. **suggest_next_components** - Get recommendations

---

## What's In & What's Out

### ✅ In Scope (Brochureware-Focused)

**Visual Components**:
- CTAs and buttons
- Hero sections and banners
- Feature showcases
- Testimonial carousels
- Image galleries
- Pricing tables (read-only)
- Team grids
- Process timelines
- Social proof blocks

**Capabilities**:
- Responsive design (mobile-first)
- Dark mode
- Accessibility (WCAG AA)
- CSS animations
- Print styling
- Open Graph meta tags

### ❌ Out of Scope

**Not for Brochureware**:
- Form inputs and validation
- Complex interactions
- Search functionality
- Data tables with sorting
- User authentication
- Payment processing
- Real-time features

**Philosophy**: These belong in backend systems or dedicated applications, not in a brochureware template.

---

## Component Counts

**Total: 20-30 Components**

- **Atoms**: 6 (button, heading, text, icon, badge, divider)
- **Molecules**: 5-7 (card, CTA block, image+text block, feature list, testimonial, link, breadcrumb)
- **Organisms**: 8-10 (hero, header, feature section, comparison table, gallery, timeline, testimonial carousel, team grid, social proof, CTA section)

**Story Count**: 50-70 (average 2-3 stories per component showing variants and states)

---

## Success Metrics

### Bundle Size
- Phase 1: < 5KB (tokens + base)
- Phase 2: < 20KB (atoms/molecules)
- Phase 3: < 40KB (organisms)
- Phase 4-7: < 42KB final (gzipped)

### Components & Documentation
- Phase 2: 12-15 components, 30 stories
- Phase 3: 20-25 components, 45 stories
- Phase 4: 20-30 components, 50 stories
- Phase 7: 20-30 components, 50-70 stories

### Accessibility & Performance
- WCAG AA: 100% from Phase 2 onwards
- Lighthouse: 90+ for all example pages
- No JavaScript required for layout/style
- Mobile-first responsive (375px, 768px, 1440px)

### AI Integration
- 5 MCP tools fully functional
- Discovery <100ms on 20-30 components
- Validation catches all invalid props
- Claude autonomously builds pages from briefs

---

## How to Use This Planning

### For Project Managers
1. Review the 7-phase timeline above
2. Check phase gate criteria before advancing
3. Track metrics in each phase document
4. Update timelines when actual work differs

### For Engineers
1. Start with PHASE-01-FOUNDATION.md
2. Follow the ordered phases (0 → 7)
3. Implement acceptance criteria before moving to next phase
4. Reference the file structure in each phase document

### For Designers
1. Review component specifications in PHASE-02 and PHASE-03
2. Check accessibility requirements in each component
3. Review responsive design patterns in PHASE-04
4. Ensure dark mode support for all designs

### For AI Integrators
1. Wait until Phase 5 (registry) is complete
2. Study PHASE-06-AI-INTEGRATION.md thoroughly
3. Implement the 5 MCP tools as specified
4. Test with example workflows in PHASE-07

### For Documentation
1. Wait until Phase 7
2. Review PHASE-07-STORYBOOK-DOCS.md for structure
3. Use the guide templates provided
4. Deploy Storybook publicly

---

## File Locations

```
PLANNING/
├── README.md                          (you are here)
├── INDEX.md                           (cross-reference)
├── TIMELINE.md                        (optional detailed schedule)
├── DECISIONS.md                       (optional ADRs)
└── phases/
    ├── PHASE-00-SSG-FOUNDATION.md
    ├── PHASE-01-FOUNDATION.md
    ├── PHASE-02-VISUAL-FOUNDATIONS.md
    ├── PHASE-03-COMPLEX-SECTIONS.md
    ├── PHASE-04-PATTERNS-ENHANCEMENT.md
    ├── PHASE-05-COMPONENT-REGISTRY.md
    ├── PHASE-06-AI-INTEGRATION.md
    └── PHASE-07-STORYBOOK-DOCS.md

Source Code (will be created):
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── site/
│   └── pages/
├── build/
└── ai/
    └── mcp/
```

---

## Related Documentation

- **Original SPECS**: `/SPECS/` (legacy reference, superseded by PLANNING)
- **Source Code**: `src/` (created during Phase 1)
- **Build Config**: `vite.config.js`, `bun.lock`, `package.json`
- **AI MCP Server**: `ai/mcp/` (created during Phase 6)
- **Public Storybook**: (deployed during Phase 7)

---

## Key Principles

### 1. Brochureware First
Design every component with marketing sites in mind. Think: landing pages, portfolios, content sites. Not web apps.

### 2. Accessibility is Non-Negotiable
Every component must be WCAG AA compliant. Test with real users, keyboard navigation, and screen readers.

### 3. Design Tokens Power Everything
No hardcoded colors, spacing, or typography. Everything flows from the token system.

### 4. Mobile-First Responsive
Start with mobile (375px), then enhance for tablet (768px) and desktop (1440px).

### 5. Dark Mode is Built-In
All components automatically support dark mode via CSS variables. No extra work.

### 6. AI-First Composition
Components are discoverable, documentable, and composable. Claude can build pages autonomously.

### 7. No Lock-In
Plain HTML, CSS, and Nunjucks. Users can fork, modify, and extend freely.

---

## Status

✅ **Planning Complete** (all 7 phases documented)
✅ **17 Decisions Refined** (architecture finalized)
⏳ **Ready for Phase 1 Implementation**

---

## Questions?

- **What should I read first?** → The 17 Refined Decisions above (2 min)
- **Where's the implementation roadmap?** → Each phase document (phases are self-contained)
- **How do I track progress?** → Check acceptance criteria in each phase
- **Can I modify the plan?** → Yes, update the relevant phase document and this README
- **When do we ship?** → End of Phase 7 (12-14 weeks)

---

**Last Updated**: October 24, 2025

**Planning Version**: 3.0 (Comprehensive 7-phase)

**Status**: All phase documents rewritten to reflect 17 refined decisions ✅
