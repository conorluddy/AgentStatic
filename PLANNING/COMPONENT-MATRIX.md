# Component Implementation Matrix

Quick reference for what gets built in each phase.

---

## Phase 2: Visual Foundations (Atoms & Molecules)

### Atoms (8 components)

| Component | Purpose | States | Estimate |
|-----------|---------|--------|----------|
| **Button** | CTA and interactive trigger | default, hover, active, disabled, loading | 4h |
| **Heading** | Semantic H1-H6 with styling | default, accent variant | 2h |
| **Text** | Body, small, micro typography | default, bold, italic, mark, code, muted | 2h |
| **Divider** | Visual separation | horizontal, vertical, spacer | 1h |
| **Badge** | Category labels and status | solid, outline, subtle (3 sizes) | 2h |
| **Icon** | SVG sizing standards | 16px, 24px, 32px, 48px | 1h |
| **Link** | Hyperlink styling | inline, standalone, button-like, visited | 2h |
| **Breadcrumb** | Navigation path display | standard, current page highlighted | 2h |
| | | **TOTAL ATOMS** | **16h** |

### Molecules (7 components)

| Component | Purpose | Variants | Estimate |
|-----------|---------|----------|----------|
| **Card** | Content container | minimal, outlined, elevated | 4h |
| **CTA Block** | Text + button combo | image-left, image-right, background | 3h |
| **Image + Text** | Flexible layout | horizontal, vertical, centered | 3h |
| **Feature List** | Benefits showcase | bullets, icons, numbered, checkmarks (1-3 columns) | 2h |
| **Testimonial** | Quote display | inline quote, block quote, with photo | 2h |
| **Stat Block** | Metric display | single stat, comparison | 1h |
| | | **TOTAL MOLECULES** | **15h** |

**Phase 2 Total**: 31 hours (20 atoms + molecules + testing)

---

## Phase 3: Complex Sections (Organisms)

### Organisms (10+ components)

| Component | Purpose | Content | Estimate |
|-----------|---------|---------|----------|
| **Hero Section** | Page banner | text, image, video, overlay, CTA | 6h |
| **Site Header** | Top navigation | logo, menu, search, CTA | 5h |
| **Feature Section** | Showcase capabilities | heading, features, image, CTA (2-3 layouts) | 4h |
| **Comparison Table** | Feature comparison (read-only) | rows × columns with checkmarks | 3h |
| **Media Gallery** | Image/video grid | uniform, masonry, featured + thumbnails | 4h |
| **Timeline** | Process or history flow | vertical/horizontal, items with descriptions | 3h |
| **Testimonials Carousel** | Multiple testimonials | carousel nav, indicators, attribution | 4h |
| **Team Grid** | People showcase | photo, name, title, optional bio | 3h |
| **Social Proof** | Customers or stats | logo grid, metrics, mini testimonials | 2h |
| **Footer** | Site footer | columns, links, copyright, social display | 3h |
| | | **TOTAL ORGANISMS** | **37h** |

**Optional Advanced** (Phase 4 alt):
- Interactive Carousel: 5h
- Dropdown Menu: 4h

**Phase 3 Total**: 40+ hours (10 organisms + testing + integration)

---

## Phase 4: Patterns & Enhancement

### Modern CSS Patterns

| Pattern | Purpose | Usage | Estimate |
|---------|---------|-------|----------|
| **Container Queries** | Responsive components | Cards that adjust to available space | 4h |
| **Advanced Selectors** | Clean markup patterns | `:has()`, `:not()`, `:where()` examples | 3h |
| **CSS Grid** | Complex layouts | Masonry, auto-fit/auto-fill patterns | 3h |
| **Animations** | Subtle effects | Entrance, hover, state transitions | 3h |

### Enhancements

| Feature | Purpose | Coverage | Estimate |
|---------|---------|----------|----------|
| **Responsive Images** | Optimal delivery | srcset, picture elements, lazy loading | 3h |
| **Dark Mode** | Accessibility | Complete dark variant support | 3h |
| **Print Stylesheet** | Printed materials | Optimized for paper output | 2h |
| **Keyboard Navigation** | A11y | Tab order, focus management | 4h |
| **Screen Reader Testing** | A11y | ARIA labels, heading hierarchy | 3h |
| **Contrast Validation** | A11y | WCAG AA compliance | 2h |

### Optimization

| Task | Purpose | Impact | Estimate |
|------|---------|--------|----------|
| **CSS Bundle Analysis** | Performance | Remove unused styles | 3h |
| **Build Optimization** | Speed | Dev/prod build performance | 2h |
| **AI Documentation** | Developer experience | Structured metadata for agents | 3h |

**Phase 4 Total**: 30+ hours (patterns + enhancements + optimization)

---

## Component Inventory Summary

### By Category

```
Branding & Structure (3)
  └─ Header, Footer, Logo/Branding

Display (7)
  └─ Hero, Feature Section, Media Gallery, Timeline,
     Social Proof, Testimonial Carousel, Team Grid

Cards & Containers (2)
  └─ Card, CTA Block

Typography (5)
  └─ Heading, Text, Breadcrumb, Link, Emphasis

Visual Elements (4)
  └─ Button, Badge, Divider, Icon

Comparison & Data (2)
  └─ Comparison Table, Stat Block

Content Blocks (3)
  └─ Image + Text, Feature List, Testimonial Quote
```

### By Complexity Level

```
Simple (Atoms): 8 components
  • Button, Heading, Text, Divider, Badge, Icon, Link, Breadcrumb

Medium (Molecules): 7 components
  • Card, CTA Block, Image+Text, Feature List, Testimonial, Stat

Complex (Organisms): 10+ components
  • Hero, Header, Feature Section, Table, Gallery, Timeline,
    Testimonials Carousel, Team Grid, Social Proof, Footer
    (+ optional: Interactive Carousel, Dropdown)
```

### By Usage Frequency

**High Priority** (implement first):
- Button
- Card
- Heading
- Hero Section
- CTA Block
- Image + Text Block

**Medium Priority**:
- Feature List
- Feature Section
- Testimonial Carousel
- Footer
- Header

**Lower Priority** (can wait):
- Timeline
- Team Grid
- Comparison Table
- Advanced patterns

---

## Implementation Order (Recommended)

### Week 1: Phase 1 Foundation
1. Design tokens
2. CSS architecture & layers
3. Build pipeline
4. Storybook setup

### Week 2: Early Phase 2
1. Button (atom)
2. Card (molecule)
3. Heading (atom)
4. Text (atom)
5. CTA Block (molecule)
6. Image + Text (molecule)

### Week 2-3: Rest of Phase 2
7. Link (atom)
8. Badge (atom)
9. Feature List (molecule)
10. Testimonial (molecule)
11. Divider (atom)
12. Icon (atom)
13. Breadcrumb (atom)
14. Stat Block (molecule)

### Week 3-4: Phase 3 Early
1. Hero Section
2. Site Header
3. Feature Section
4. Media Gallery

### Week 4: Phase 3 Complete
5. Testimonials Carousel
6. Footer
7. Comparison Table
8. Timeline
9. Team Grid
10. Social Proof

### Week 5-6: Phase 4
1. Pattern examples
2. Dark mode
3. Enhancements (a11y, print)
4. Optimization
5. Final documentation

---

## Progress Tracking

Print this out and mark as you complete:

### Phase 2 Progress
- [ ] Button
- [ ] Heading
- [ ] Text
- [ ] Divider
- [ ] Badge
- [ ] Icon
- [ ] Link
- [ ] Breadcrumb
- [ ] Card
- [ ] CTA Block
- [ ] Image + Text
- [ ] Feature List
- [ ] Testimonial
- [ ] Stat Block

### Phase 3 Progress
- [ ] Hero Section
- [ ] Site Header
- [ ] Feature Section
- [ ] Comparison Table
- [ ] Media Gallery
- [ ] Timeline
- [ ] Testimonials Carousel
- [ ] Team Grid
- [ ] Social Proof
- [ ] Footer
- [ ] Interactive Carousel (optional)
- [ ] Dropdown Menu (optional)

### Phase 4 Progress
- [ ] Container Queries
- [ ] Advanced Selectors
- [ ] CSS Grid Patterns
- [ ] Animation Patterns
- [ ] Responsive Images
- [ ] Dark Mode
- [ ] Print Stylesheet
- [ ] Keyboard Navigation
- [ ] Screen Reader Testing
- [ ] Bundle Optimization

---

**Total Effort**: ~120 hours across 6 weeks
**Total Components**: 40+
**Target CSS Size**: <50KB gzipped
**Accessibility Target**: WCAG AA 100%
