# PILLAR 1: Component Library

**The Visual Foundation of AgentStatic**

This pillar contains everything related to the HTML/CSS component system - the visual building blocks that compose into complete marketing websites.

---

## Overview

The Component Library is a collection of 20-30 production-ready, accessible, responsive components designed specifically for brochureware marketing sites. Every component is:

- ✅ **Pure CSS** - Zero JavaScript required for core functionality
- ✅ **Accessible** - WCAG AA compliant with keyboard and screen reader support
- ✅ **Responsive** - Mobile-first design with container query support
- ✅ **Dark Mode Ready** - Automatic theme switching via CSS variables
- ✅ **Optimized** - Contributes to <50KB total CSS bundle

---

## The Four Phases

### [Phase 1: Design System Foundation](./PHASE-1-DESIGN-SYSTEM.md)
**Duration**: 2 weeks | **Effort**: 25 hours

Establish the foundational design system that all components build upon:
- Design tokens (colors, spacing, typography, shadows)
- CSS architecture with cascade layers
- Dark mode infrastructure
- Base styles and resets
- Storybook configuration

**Key Deliverable**: Complete token system and CSS architecture

---

### [Phase 2: Basic Components](./PHASE-2-BASIC-COMPONENTS.md)
**Duration**: 2 weeks | **Effort**: 30 hours

Build the atomic and molecular components:
- **8 Atoms**: button, heading, text, divider, badge, icon, link, breadcrumb
- **7 Molecules**: card, CTA block, image+text, feature list, testimonial, stat, pricing

**Key Deliverable**: 15 fully-styled, documented components

---

### [Phase 3: Complex Sections](./PHASE-3-COMPLEX-SECTIONS.md)
**Duration**: 2 weeks | **Effort**: 30 hours

Combine atoms and molecules into complete page sections:
- **10 Organisms**: hero, header, feature section, comparison table, gallery, timeline, testimonial carousel, team grid, social proof, footer

**Key Deliverable**: Complete page sections ready for composition

---

### [Phase 4: Polish & Enhancement](./PHASE-4-POLISH.md)
**Duration**: 1 week | **Effort**: 15 hours

Refine and optimize the component library:
- Container queries for responsive components
- CSS animations (respecting prefers-reduced-motion)
- Print stylesheets
- Performance optimization
- Final accessibility audit

**Key Deliverable**: Production-ready component library

---

## Component Architecture

### Atomic Design Hierarchy
```
Atoms (Indivisible)
├── button
├── heading (h1-h6)
├── text (p, small)
├── divider
├── badge
├── icon
├── link
└── breadcrumb

Molecules (Simple Combinations)
├── card (image + text + button)
├── cta-block (heading + text + button)
├── image-text (image + text)
├── feature-list (icon + text items)
├── testimonial (quote + attribution)
├── stat (number + label)
└── pricing-card (price + features + cta)

Organisms (Complex Sections)
├── hero-section
├── header-nav
├── feature-section
├── comparison-table
├── media-gallery
├── process-timeline
├── testimonial-carousel
├── team-grid
├── social-proof
└── footer-section
```

### File Structure Pattern
```
components/
├── _system/                    # Foundation
│   ├── tokens.css             # Design tokens
│   ├── base.css               # Base styles
│   └── utilities.css          # Utility classes
│
├── atoms/
│   └── button/
│       ├── button.css         # Styles
│       ├── button.njk         # Template
│       ├── button.stories.js  # Storybook
│       └── README.md          # Documentation
│
├── molecules/
│   └── card/
│       └── [same structure]
│
└── organisms/
    └── hero-section/
        └── [same structure]
```

---

## Design Tokens

### Core Token Categories
```css
:root {
  /* Colors */
  --color-primary: #0066cc;
  --color-secondary: #6c757d;
  --color-surface: #ffffff;
  --color-surface-alt: #f8f9fa;
  --color-text: #212529;
  --color-text-muted: #6c757d;

  /* Spacing (8px base) */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-display: var(--font-sans);
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 3rem;

  /* Borders & Radii */
  --border-width: 1px;
  --border-color: #dee2e6;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### Dark Mode Tokens
```css
:root.dark,
:root:has(.dark),
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-surface: #1a1a1a;
    --color-surface-alt: #2d2d2d;
    --color-text: #ffffff;
    --color-text-muted: #a0a0a0;
    --border-color: #404040;
    /* Shadow adjustments for dark mode */
  }
}
```

---

## CSS Architecture

### Cascade Layers
```css
@layer reset {
  /* Browser resets */
}

@layer base {
  /* Typography and base elements */
}

@layer components {
  /* All component styles */
}

@layer utilities {
  /* Utility classes */
}

@layer overrides {
  /* User customizations */
}
```

### BEM Naming Convention
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card--dark { }

/* State */
.card.is-loading { }
.card.is-disabled { }
```

---

## Component Specifications

See [COMPONENT-SPECS.md](./COMPONENT-SPECS.md) for detailed specifications of all 20-30 components including:
- Props and variants
- Accessibility requirements
- Responsive behavior
- Dark mode implementation
- Usage examples

---

## Development Guidelines

### Component Checklist
Every component must have:
- [ ] Semantic HTML structure
- [ ] BEM class naming
- [ ] CSS using design tokens
- [ ] Dark mode support
- [ ] Responsive design (mobile-first)
- [ ] WCAG AA compliance
- [ ] Keyboard navigation (if interactive)
- [ ] Storybook stories (2-3 variants)
- [ ] Documentation (usage, props, a11y)

### Accessibility Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators (visible)
- Color contrast (4.5:1 minimum)
- Screen reader compatibility
- Reduced motion support

### Performance Targets
- Component CSS < 2KB (gzipped)
- No runtime JavaScript
- Single CSS file per component
- Efficient selectors (avoid deep nesting)
- Minimal specificity battles

---

## Testing Strategy

### Visual Testing
- Storybook for component development
- Visual regression testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsive design testing (375px, 768px, 1440px)

### Accessibility Testing
- Pa11y automated testing
- axe-core integration
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)

### Performance Testing
- Bundle size monitoring
- Lighthouse audits
- CSS complexity analysis
- Render performance testing

---

## Success Criteria

### Phase 1 Complete When
- [ ] Design tokens defined and documented
- [ ] CSS architecture established
- [ ] Dark mode infrastructure working
- [ ] Storybook configured and running
- [ ] Base styles implemented

### Phase 2 Complete When
- [ ] All 15 atoms/molecules built
- [ ] Components responsive at all breakpoints
- [ ] WCAG AA compliance verified
- [ ] Storybook stories created
- [ ] Dark mode tested

### Phase 3 Complete When
- [ ] All 10 organisms built
- [ ] Integration tested with real content
- [ ] Performance targets met
- [ ] Accessibility audit passed
- [ ] Documentation complete

### Phase 4 Complete When
- [ ] Container queries implemented
- [ ] Animations respect preferences
- [ ] Print styles implemented
- [ ] Bundle under 50KB
- [ ] Production ready

---

## Integration Points

### With Pillar 2 (Registry)
- Component metadata exported to schemas
- Props validated against registry
- Discovery API searches components

### With Pillar 3 (Build)
- Templates processed by Nunjucks
- CSS bundled by build system
- Assets optimized during build

### With Pillar 4 (AI)
- Components discoverable by MCP tools
- Props understood by Claude
- Composition validated against specs

---

## Quick Start

1. **Set up environment**:
   ```bash
   cd PILLAR-1-COMPONENTS
   bun install
   ```

2. **Start Storybook**:
   ```bash
   bun run storybook
   ```

3. **Build a component**:
   ```bash
   bun run create:component button atom
   ```

4. **Test accessibility**:
   ```bash
   bun run test:a11y
   ```

5. **Check bundle size**:
   ```bash
   bun run analyze:css
   ```

---

## Resources

- [Design System Foundation](./PHASE-1-DESIGN-SYSTEM.md)
- [Component Specifications](./COMPONENT-SPECS.md)
- [Storybook Documentation](../REFERENCE/STORYBOOK.md)
- [17 Architectural Decisions](../DECISIONS.md)

---

*This pillar is the visual heart of AgentStatic. Every pixel matters.*