# AgentStatic: 17 Architectural Decisions

**The Core Principles That Guide Every Implementation Choice**

These 17 decisions were refined through extensive planning and represent the fundamental constraints and choices that make AgentStatic unique. Every line of code should respect these decisions.

---

## Decision 1: Brochureware-First
**Choice**: Focus exclusively on visual, read-only content sites.

**Rationale**:
- Brochureware represents 80% of static site use cases
- Simplifies component design (no form handling, no state management)
- Enables zero-JavaScript requirement
- Perfect match for AI-generated content

**Implications**:
- ✅ Heroes, galleries, testimonials, pricing tables
- ❌ Form inputs, authentication, dashboards, real-time features
- ❌ E-commerce, user accounts, complex interactions

**Implementation**: All components are display-only. Interactive features belong in separate systems.

---

## Decision 2: 20-30 Components (Focused Set)
**Choice**: Build exactly 20-30 high-quality components rather than 100+ mediocre ones.

**Rationale**:
- Quality over quantity
- Easier for AI to learn and use effectively
- Reduces CSS bundle size
- Simpler maintenance

**Breakdown**:
- 6-8 atoms (button, heading, text, badge, icon, divider, link, breadcrumb)
- 5-7 molecules (card, CTA block, feature list, testimonial, stat, pricing)
- 8-10 organisms (hero, header, feature section, gallery, comparison table, etc.)

**Implementation**: Reject component requests outside this scope. Focus on perfecting the core set.

---

## Decision 3: Predefined Theme + Easy Customization
**Choice**: Ship with a beautiful default theme, but make customization straightforward.

**Rationale**:
- Users want to start with something beautiful
- Most sites need only minor brand adjustments
- Reduces decision fatigue
- Enables quick prototyping

**Implementation**:
```css
/* Predefined theme */
:root {
  --primary: #0066cc;
  --secondary: #6c757d;
  --spacing-base: 1rem;
  /* ... complete token set ... */
}

/* Easy override */
:root {
  --primary: #ff6b6b; /* Brand color */
}
```

---

## Decision 4: Claude-Optimized MCP (Not Generic)
**Choice**: Design MCP tools specifically for Claude's capabilities and patterns.

**Rationale**:
- Claude has specific strengths we can leverage
- Generic tools are jack-of-all-trades, master of none
- Can optimize prompts and responses for Claude's context window
- Better user experience with Claude

**Implementation**:
- Tool responses include "suggestions" (Claude likes alternatives)
- Rich metadata in responses (Claude can reason about it)
- Structured errors with remediation steps
- Examples in tool descriptions

---

## Decision 5: Template-First Distribution
**Choice**: Primary distribution via clonable Git repository, not npm package.

**Rationale**:
- Users need to customize components directly
- Template repos are easier to understand
- No dependency management issues
- Fork-and-modify workflow is familiar

**Implementation**:
```bash
# Primary usage
git clone https://github.com/agentstatic/template my-site
cd my-site
bun install
bun dev

# NOT primary
npm install @agentstatic/components
```

---

## Decision 6: Example Pages Primary
**Choice**: Ship with 2-3 complete example sites, blank slate is secondary.

**Rationale**:
- Users learn by example
- Demonstrates component composition
- Provides immediate value
- Reduces time to first deploy

**Examples**:
1. SaaS landing page (hero, features, pricing, testimonials)
2. Portfolio site (gallery, about, work samples)
3. Marketing site (multi-section, CTAs, social proof)

**Implementation**: Examples live in main branch, blank template in separate branch.

---

## Decision 7: Dark Mode (System + Manual Toggle)
**Choice**: Automatic dark mode based on system preference, with optional manual override.

**Rationale**:
- Respects user's OS-level preference
- Allows per-site override when needed
- Modern expectation for professional sites
- CSS-only implementation possible

**Implementation**:
```css
/* Automatic */
@media (prefers-color-scheme: dark) {
  :root { /* dark tokens */ }
}

/* Manual override */
:root.dark { /* dark tokens */ }
```

```javascript
// Optional toggle
localStorage.setItem('theme', 'dark');
document.documentElement.classList.add('dark');
```

---

## Decision 8: Static Routing Only
**Choice**: All routes are file-based and pre-determined at build time.

**Rationale**:
- Simplifies mental model
- No route configuration needed
- Perfect for brochureware (finite pages)
- Faster builds

**Implementation**:
```
pages/
├── index.json       → /
├── about.json       → /about
├── products.json    → /products
└── contact.json     → /contact
```

No dynamic routes, no wildcards, no parameters.

---

## Decision 9: Global Theme (No Per-Page Overrides)
**Choice**: One consistent theme across the entire site.

**Rationale**:
- Ensures brand consistency
- Simplifies CSS cascade
- Reduces bundle size
- Easier to reason about

**Implementation**: Theme tokens defined once in `:root`, applied everywhere. No page-specific style overrides.

---

## Decision 10: All Metadata in Registry
**Choice**: Component registry contains comprehensive metadata beyond just props.

**Rationale**:
- AI needs rich context for decision-making
- Enables smart discovery and suggestions
- Supports accessibility validation
- Documents performance characteristics

**Metadata Includes**:
- Basic: name, description, category
- Props: types, defaults, validation
- Accessibility: WCAG level, ARIA support, keyboard nav
- Responsive: breakpoints, mobile-first, container queries
- Performance: render cost, CSS size
- Examples: usage patterns, common combinations

---

## Decision 11: JSON Compositions
**Choice**: Pages are composed via structured JSON, not markdown or JSX.

**Rationale**:
- Machine-readable and validatable
- Clear structure for AI
- Version control friendly
- Easy to transform

**Format**:
```json
{
  "path": "/landing",
  "title": "Product Landing",
  "sections": [
    {
      "component": "organisms/hero-section",
      "props": {
        "heading": "Build Faster",
        "subheading": "Ship tomorrow"
      }
    }
  ]
}
```

---

## Decision 12: Automated a11y Testing
**Choice**: Accessibility testing runs automatically but doesn't block builds.

**Rationale**:
- Accessibility is non-negotiable
- But shouldn't block development iteration
- Warnings encourage fixing
- Automated testing catches most issues

**Implementation**:
- Pa11y + axe-core in CI pipeline
- WCAG AA as target
- Warnings in dev, reports in CI
- Manual audit before launch

---

## Decision 13: Bundle Warnings (Not Blocking)
**Choice**: CSS bundle size warnings don't fail builds.

**Rationale**:
- Allows temporary overages during development
- Encourages optimization without forcing it
- Pragmatic for real-world development
- Can stricten for production

**Thresholds**:
- <42KB: ✅ Good
- 42-50KB: ⚠️ Warning
- >50KB: ⚠️ Warning (strong)
- Production build can enforce

---

## Decision 14: 12-14 Week Timeline
**Choice**: Full implementation spans 12-14 weeks, not 6.

**Rationale**:
- Quality requires time
- Allows for iteration and polish
- Realistic for comprehensive system
- Includes documentation and testing

**Breakdown**:
- Weeks 1-7: Core development
- Weeks 8-10: Integration
- Week 11: AI tools
- Week 12: Documentation
- Weeks 13-14: Buffer for polish

---

## Decision 15: Storybook 80/20
**Choice**: Focus on visual documentation and code snippets, not exhaustive props tables.

**Rationale**:
- Visual examples are most valuable
- Code snippets enable quick usage
- Exhaustive docs are rarely read
- AI can generate detailed docs if needed

**Implementation**:
- Every component has 2-3 visual stories
- Each story includes copy-paste code
- Props documented in component schema
- No auto-generated props tables

---

## Decision 16: MCP Suggestions
**Choice**: Discovery tools return alternatives, not just exact matches.

**Rationale**:
- Claude benefits from choices
- Users might not know exact terms
- Encourages exploration
- Prevents dead ends

**Example**:
```json
{
  "matches": [
    { "id": "hero-section", "relevance": 0.95 }
  ],
  "suggestions": [
    { "id": "cta-section", "reason": "Often follows hero" },
    { "id": "feature-section", "reason": "Alternative layout" }
  ]
}
```

---

## Decision 17: No Phase 8
**Choice**: Ship complete at Phase 7, no long-term roadmap.

**Rationale**:
- Prevents scope creep
- Forces focus on core features
- "Done" is better than "perfect"
- Community can extend post-launch

**Implementation**:
- Phase 7 is final phase
- Post-launch is community-driven
- Core team moves on
- Fork for extensions

---

## Decision Hierarchy

When decisions conflict, this hierarchy applies:

1. **Accessibility** - Never compromise WCAG AA
2. **Performance** - Stay under 50KB CSS
3. **Simplicity** - Choose simple over clever
4. **AI-Optimized** - Make it work well with Claude
5. **Developer Experience** - Make it pleasant to use
6. **Extensibility** - Allow (but don't require) customization

---

## Enforcement

These decisions are enforced through:
- Code review checklist
- Automated tests where possible
- Architecture documentation
- Component rejection criteria
- Build-time validations

---

## Amendments

These decisions are final for v1.0. Changes require:
1. Clear rationale for why the decision was wrong
2. Impact analysis on other decisions
3. Migration path for existing implementations
4. Consensus from core team

---

*These 17 decisions represent months of planning and refinement. They are the foundation of AgentStatic's success.*

**Decided**: October 24, 2025
**Status**: Final for v1.0