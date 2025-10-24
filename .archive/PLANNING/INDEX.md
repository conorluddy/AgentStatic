# AgentStatic Planning Index

**Detailed cross-reference and concept map for all planning documents.**

Use this to find specific topics, components, or decisions across all 7 phases and 17 refined decisions.

---

## Quick Reference by Topic

### Architecture & Decisions

| Topic | Location | Purpose |
|-------|----------|---------|
| **17 Refined Decisions** | README.md § "The 17 Refined Decisions" | Core architectural decisions |
| **Decision #1: Brochureware-First** | All phases § "Key Focus" | Visual, read-only sites only |
| **Decision #2: 20-30 Components** | README.md, PHASE-02, PHASE-03 | Focused component count |
| **Decision #3: Customization** | PHASE-01 § "Design Tokens" | Theme customization approach |
| **Decision #4: Claude MCP** | PHASE-06 (entire document) | AI integration strategy |
| **Decision #5: Template Distribution** | README.md § "Tier 1" | How users get AgentStatic |
| **Decision #6: Example-Driven** | PHASE-07 § "Real Content Examples" | Documentation approach |
| **Decision #7: Dark Mode** | PHASE-01 § "Dark Mode" | Light + manual toggle system |
| **Decision #8: Static Routing** | PHASE-00 § "Static Routing System" | No dynamic routes |
| **Decision #9: Global Theme** | PHASE-01 § "Design System" | No per-page overrides |
| **Decision #10: Registry Metadata** | PHASE-05 (entire document) | Component schema system |
| **Decision #11: JSON Compositions** | PHASE-00 § "Page Composition Format" | Structured page definitions |
| **Decision #12: a11y Testing** | PHASE-04 § "Accessibility Audit" | Automated testing approach |
| **Decision #13: Bundle Warnings** | PHASE-00 § "Build Pipeline" | Non-blocking warnings |
| **Decision #14: 12-14 Week Timeline** | README.md § "Phase Gate Criteria" | Project schedule |
| **Decision #15: Storybook 80/20** | PHASE-07 § "Storybook 80/20 Approach" | Documentation strategy |
| **Decision #16: MCP Suggestions** | PHASE-06 § "Tool 1: discover_components" | Discovery returns alternatives |
| **Decision #17: No Phase 8** | PHASE-07 § "Phase Gate" | Ship complete, no roadmap |

### Component Specifications

**Atoms (6 total)**:
- Button: PHASE-02 § "Button Specification"
- Heading: PHASE-02 § "Heading Specification"
- Text/Paragraph: PHASE-02 § "Text Specification"
- Icon: PHASE-02 § "Icon Specification"
- Badge: PHASE-02 § "Badge Specification"
- Visual Divider: PHASE-02 § "Divider Specification"

**Molecules (5-7 total)**:
- Card: PHASE-02 § "Card Specification"
- CTA Block: PHASE-02 § "CTA Block Specification"
- Image+Text Block: PHASE-02 § "Image+Text Block Specification"
- Feature List: PHASE-02 § "Feature List Specification"
- Testimonial: PHASE-02 § "Testimonial Specification"
- Link: PHASE-02 § "Link Specification"
- Breadcrumb: PHASE-02 § "Breadcrumb Specification"

**Organisms (8-10 total)**:
- Hero Section: PHASE-03 § "Hero Section Specification"
- Site Header: PHASE-03 § "Site Header Specification"
- Feature Section: PHASE-03 § "Feature Section Specification"
- Comparison Table: PHASE-03 § "Comparison Table Specification"
- Media Gallery: PHASE-03 § "Media Gallery Specification"
- Timeline: PHASE-03 § "Timeline Specification"
- Testimonial Carousel: PHASE-03 § "Testimonial Carousel Specification"
- Team Grid: PHASE-03 § "Team Grid Specification"
- Social Proof Block: PHASE-03 § "Social Proof Block Specification"
- CTA Section: PHASE-03 § "CTA Section Specification"

### Technology Stack

| Technology | Phases | Purpose | Details |
|------------|--------|---------|---------|
| **Bun 1.0+** | All | Runtime & package manager | PHASE-00 § "Technology Stack" |
| **Vite 5+** | All | Build tool | PHASE-00 § "Build Pipeline" |
| **Nunjucks** | PHASE-00, 01 | Templating language | PHASE-00 § "Templating Engine" |
| **CSS Custom Properties** | PHASE-01 | Design tokens | PHASE-01 § "Design Tokens" |
| **Cascade Layers** | PHASE-01, 04 | CSS organization | PHASE-01 § "CSS Architecture" |
| **Container Queries** | PHASE-04 | Responsive components | PHASE-04 § "Container Queries" |
| **PostCSS** | PHASE-04 | CSS processing | PHASE-04 § "CSS Processing" |
| **Pa11y** | PHASE-04 | a11y testing | PHASE-04 § "Automated Testing" |
| **axe** | PHASE-04 | a11y testing | PHASE-04 § "Automated Testing" |
| **Storybook 8** | PHASE-07 | Component browser | PHASE-07 § "Storybook Setup" |
| **Claude MCP** | PHASE-06 | AI integration | PHASE-06 (entire document) |

### Design System

| Aspect | Location | Details |
|--------|----------|---------|
| **Color Palette** | PHASE-01 § "Design Tokens" | Primary, secondary, surface, text |
| **Spacing Scale** | PHASE-01 § "Design Tokens" | xs → 2xl (8px multiples) |
| **Typography** | PHASE-01 § "Design Tokens" | Font families, sizes, weights, line heights |
| **Border Radius** | PHASE-01 § "Design Tokens" | sm, md, lg, full values |
| **Shadows** | PHASE-01 § "Design Tokens" | Elevation system |
| **Transitions** | PHASE-01 § "Design Tokens" | Animation timing and easing |
| **Dark Mode** | PHASE-01 § "Dark Mode" | CSS variables + localStorage |
| **BEM Naming** | PHASE-01 § "CSS Architecture" | `.block`, `.block__element`, `.block--modifier` |
| **Breakpoints** | PHASE-01 § "Responsive Design" | Mobile (375px), tablet (768px), desktop (1440px) |
| **CSS Layers** | PHASE-01 § "CSS Architecture" | reset → base → components → utilities → overrides |

### Documentation Structure

**5 Layers**:
1. **Storybook** (Interactive browser) - PHASE-07 § "7.1 Storybook Setup"
2. **Developer Guide** (How to use) - PHASE-07 § "7.3.2 Developer Quick Start"
3. **AI Agent Guide** (Tool reference) - PHASE-07 § "7.3.3 AI Agent Guide"
4. **Contributing Guide** (How to add) - PHASE-07 § "7.3.4 Contributing Guide"
5. **In-Code Documentation** (Technical) - PHASE-07 § "7.4 Complete Documentation Summary"

**Story Coverage**:
- Atoms: 19 stories (4-5 per atom × 6) - PHASE-07 § "7.2 Component Stories"
- Molecules: 16 stories (2-3 per molecule × 7) - PHASE-07 § "7.2 Component Stories"
- Organisms: 25 stories (2-3 per organism × 10) - PHASE-07 § "7.2 Component Stories"
- **Total**: 50-70 stories across 20-30 components

### AI Integration

**5 MCP Tools** (PHASE-06 entire document):

1. **discover_components** - PHASE-06 § "Tool 1: discover_components"
   - Input: query, category, minAccessibility, limit
   - Output: matches, suggestions, searchMetadata
   - Use: Find components by description

2. **get_component_details** - PHASE-06 § "Tool 2: get_component_details"
   - Input: componentId, includeExamples
   - Output: Full schema with all properties, variants, examples
   - Use: Understand single component

3. **compose_page** - PHASE-06 § "Tool 3: compose_page"
   - Input: title, metadata, sections
   - Output: Validated page with composition summary
   - Use: Build page from components

4. **validate_composition** - PHASE-06 § "Tool 4: validate_composition"
   - Input: sections array
   - Output: Errors, warnings, suggestions
   - Use: Check page validity before building

5. **suggest_next_components** - PHASE-06 § "Tool 5: suggest_next_components"
   - Input: currentComponents, pageContext
   - Output: Ranked suggestions with confidence scores
   - Use: Get recommendations for next section

**Example Workflows**:
- Build SaaS Landing Page - PHASE-06 § "Workflow: Build a SaaS Landing Page from Brief"
- Build Multi-Page Site - PHASE-07 § "7.3.3 AI Agent Guide / Workflow 2"
- Add Page to Site - PHASE-07 § "7.3.3 AI Agent Guide / Workflow 3"

### Build System

| Aspect | Location | Details |
|--------|----------|---------|
| **Build Pipeline** | PHASE-00 § "Build Pipeline" | Complete build flow |
| **Static Routing** | PHASE-00 § "Static Routing System" | Route generation from pages/ |
| **Component Registry** | PHASE-05 § "Component Registry Generation" | Auto-generated searchable index |
| **JSON Composition** | PHASE-00 § "Page Composition Format" | Structured page definitions |
| **Validation System** | PHASE-00 § "Composition Validation" | Schema-based validation |
| **Performance Monitoring** | PHASE-00 § "Performance Monitoring" | Bundle size tracking |

---

## Phase Guides

### Phase 0: SSG Foundation (Week 10)

**Read First**: PHASE-00-SSG-FOUNDATION.md

**What**: Build pipeline, static routing, JSON composition system

**Key Outputs**:
- Bun + Vite build pipeline configured
- Static routing system working
- Component registry generator functional
- JSON composition schema defined

**Success Criteria**: See PHASE-00 § "Success Metrics"

**Effort**: 30 hours

---

### Phase 1: Foundation (Weeks 1-2)

**Read First**: PHASE-01-FOUNDATION.md

**What**: Design system, tokens, CSS architecture, dark mode

**Key Outputs**:
- Design tokens file (colors, spacing, typography)
- CSS cascade layers structure
- Dark mode implementation
- Base HTML reset and typography

**Components**: None (foundation only)

**Success Criteria**: See PHASE-01 § "Success Metrics"

**Effort**: 20 hours

---

### Phase 2: Visual Foundations (Weeks 3-4)

**Read First**: PHASE-02-VISUAL-FOUNDATIONS.md

**What**: All atoms (6) and molecules (5-7) with Storybook

**Key Components**:
- Atoms: Button, Heading, Text, Icon, Badge, Divider (6)
- Molecules: Card, CTA Block, Image+Text, Feature List, Testimonial, Link, Breadcrumb (5-7)

**Stories**: ~30 total showing variants and states

**Success Criteria**: See PHASE-02 § "Success Metrics"

**Effort**: 30 hours

---

### Phase 3: Complex Sections (Weeks 5-6)

**Read First**: PHASE-03-COMPLEX-SECTIONS.md

**What**: All organisms (8-10) and page composition patterns

**Key Components**:
- Hero Section, Header, Feature Section, Comparison Table
- Gallery, Timeline, Testimonial Carousel, Team Grid
- Social Proof, CTA Section (8-10 total)

**Page Patterns**: SaaS landing, product portfolio, about/company, blog/docs

**Success Criteria**: See PHASE-03 § "Success Metrics"

**Effort**: 40 hours

---

### Phase 4: Enhancement & Polish (Weeks 7-8)

**Read First**: PHASE-04-PATTERNS-ENHANCEMENT.md

**What**: Modern CSS patterns, animations, accessibility, responsive optimization

**Key Additions**:
- Container queries for responsive components
- Animation library (respects prefers-reduced-motion)
- Advanced responsive image handling
- Comprehensive accessibility audit

**Success Criteria**: See PHASE-04 § "Success Metrics"

**Effort**: 30 hours

---

### Phase 5: Component Registry (Week 9)

**Read First**: PHASE-05-COMPONENT-REGISTRY.md

**What**: Metadata schema, discovery API, searchable registry

**Key Outputs**:
- JSON Schema for every component
- Discovery API with semantic search
- Registry CLI tools
- Auto-generated component reference

**Success Criteria**: See PHASE-05 § "Success Metrics"

**Effort**: 25 hours

---

### Phase 6: AI Integration (Weeks 10-11)

**Read First**: PHASE-06-AI-INTEGRATION.md

**What**: 5 Claude-optimized MCP tools, autonomous page building

**Key Tools**:
- discover_components
- get_component_details
- compose_page
- validate_composition
- suggest_next_components

**Success Criteria**: See PHASE-06 § "Success Metrics"

**Effort**: 40 hours

---

### Phase 7: Storybook & Docs (Week 12)

**Read First**: PHASE-07-STORYBOOK-DOCS.md

**What**: Complete documentation, guides, Storybook, contributing guide

**Key Deliverables**:
- Storybook with 50-70 stories
- Developer guide (how to use)
- AI agent guide (tool reference)
- Contributing guide (how to add)
- Introduction and quick start

**Success Criteria**: See PHASE-07 § "Success Metrics"

**Effort**: 25 hours

---

## Component Matrix Quick Reference

### Complete Component List (20-30)

```
ATOMS (6)
├─ Button        [PHASE-02, 4-5 variants/sizes]
├─ Heading       [PHASE-02, 6 levels + variants]
├─ Text          [PHASE-02, sizes + styles]
├─ Icon          [PHASE-02, 20 icons]
├─ Badge         [PHASE-02, 5 variants]
└─ Divider       [PHASE-02, orientations]

MOLECULES (5-7)
├─ Card          [PHASE-02, with/without image]
├─ CTA Block     [PHASE-02, text + button]
├─ Image+Text    [PHASE-02, left/right layouts]
├─ Feature List  [PHASE-02, 2-col/3-col]
├─ Testimonial   [PHASE-02, with/without image]
├─ Link          [PHASE-02, visited states]
└─ Breadcrumb    [PHASE-02, long paths]

ORGANISMS (8-10)
├─ Hero          [PHASE-03, 4 variants]
├─ Header        [PHASE-03, sticky/transparent/solid]
├─ Features      [PHASE-03, 2/3/4-column]
├─ Comparison    [PHASE-03, pricing/comparison]
├─ Gallery       [PHASE-03, grid/masonry]
├─ Timeline      [PHASE-03, vertical/horizontal]
├─ Carousel      [PHASE-03, testimonials]
├─ Team          [PHASE-03, 2/3-column]
├─ Social Proof  [PHASE-03, logos/testimonials]
└─ CTA           [PHASE-03, multiple variants]
```

---

## Key Concepts & Definitions

### Brochureware
Visual, read-only marketing sites. Examples: landing pages, portfolios, case studies, blogs.
Not: web apps, dashboards, real-time platforms.

### Component Hierarchy
1. **Atoms**: Smallest reusable UI elements (button, text)
2. **Molecules**: Atoms combined into patterns (card = image + text + button)
3. **Organisms**: Molecules assembled into page sections (hero = heading + image + CTA)

### Design Tokens
Variables defining the design system: colors, spacing, typography, shadows, etc.
All components reference tokens, enabling global theme customization.

### Cascade Layers
CSS @layer rule organizes styles in order of specificity:
- reset (browser reset)
- base (typography, defaults)
- components (component styles)
- utilities (utility classes)
- overrides (custom site styles)

### Dark Mode
Implementation via CSS variables + manual toggle:
- System preference detected via `prefers-color-scheme`
- Manual toggle stored in `localStorage`
- CSS variables defined for both light and dark values

### JSON Compositions
Structured page definitions using JSON schema:
- Path (route)
- Title and metadata
- Array of sections (each with component + props)
- Validated against component schemas before building

### Container Queries
CSS feature allowing components to respond to container size instead of viewport.
Enables truly responsive components without media queries.

### MCP (Model Context Protocol)
Protocol for AI agents (Claude, etc.) to call tools and receive structured data.
AgentStatic provides 5 MCP tools for component discovery and page composition.

### WCAG AA
Web Content Accessibility Guidelines Level AA. Minimum accessibility standard.
Requirements: color contrast 4.5:1, keyboard navigation, screen reader support.

---

## Getting Started with this Index

1. **New to AgentStatic?** → Start with README.md "The 17 Refined Decisions"
2. **Looking for a specific component?** → Use "Component Matrix Quick Reference" above
3. **Want to build a specific phase?** → Use "Phase Guides" section above
4. **Need to find a concept?** → Use "Key Concepts & Definitions" section
5. **Searching for something specific?** → Use Ctrl+F on README.md or this INDEX.md

---

## Document Status

| Document | Status | Last Updated | Phases |
|----------|--------|--------------|--------|
| README.md | ✅ Complete | Oct 24, 2025 | Overview |
| INDEX.md | ✅ Complete | Oct 24, 2025 | This file |
| PHASE-00-SSG-FOUNDATION.md | ✅ Complete | Oct 24, 2025 | 0 |
| PHASE-01-FOUNDATION.md | ✅ Complete | Oct 24, 2025 | 1 |
| PHASE-02-VISUAL-FOUNDATIONS.md | ✅ Complete | Oct 24, 2025 | 2 |
| PHASE-03-COMPLEX-SECTIONS.md | ✅ Complete | Oct 24, 2025 | 3 |
| PHASE-04-PATTERNS-ENHANCEMENT.md | ✅ Complete | Oct 24, 2025 | 4 |
| PHASE-05-COMPONENT-REGISTRY.md | ✅ Complete | Oct 24, 2025 | 5 |
| PHASE-06-AI-INTEGRATION.md | ✅ Complete | Oct 24, 2025 | 6 |
| PHASE-07-STORYBOOK-DOCS.md | ✅ Complete | Oct 24, 2025 | 7 |

**Total Coverage**: 10 documents, ~3000+ lines, 17 decisions, 7 phases

**Status**: Complete planning suite ready for Phase 0-1 implementation ✅

---

**Last Updated**: October 24, 2025

**Index Version**: 2.0 (7-phase comprehensive)

**All 17 refined decisions documented across all phases ✅**
