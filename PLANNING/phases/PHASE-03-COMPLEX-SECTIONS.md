# Phase 3: Complex Sections (Organisms & Patterns)

**Duration**: Weeks 5-6 | **Effort**: 30 hours | **Priority**: High

---

## Overview

Build **8-10 larger, multi-component sections** that combine atoms and molecules from Phase 2 into complete page sections. These organisms form the structural building blocks of real brochureware pages, focusing exclusively on display and read-only content (decision #1: brochureware-only).

**Key Focus** (reflecting 17 refined decisions):
- **8-10 organisms** (focused scope, complementing Phase 2's 12-15 atoms/molecules)
- **Composition-based**: Each organism reuses atoms/molecules, demonstrating extensibility
- **Display-only**: No forms, no interaction beyond navigation
- **All responsive**: Mobile-first, container queries
- **Dark mode ready**: All use design tokens from Phase 1
- **Storybook 80/20**: Visuals + code snippets + realistic content examples
- **WCAG AA**: Accessible navigation, semantic structures
- **Rich metadata**: Each component documented for Phase 5 registry

---

## Key Decisions (Reflecting All 17 Refinements)

| Decision | Choice | Phase 3 Impact |
|----------|--------|----------------|
| **Scope** | Brochureware-only (decision #1) | Only display/layout organisms, no interactive forms |
| **Component Count** | 20-30 total: 12-15 atoms/molecules (Phase 2) + 8-10 organisms (Phase 3) | Exactly 8-10 organisms in this phase |
| **Theme** | Predefined + customizable (decision #3) | All organisms use design tokens |
| **Dark Mode** | System + toggle (decision #7) | All color schemes support dark mode |
| **Routing** | Static file-based (decision #8) | Organisms used in static page compositions |
| **Theme System** | Global only (decision #9) | No per-organism CSS overrides |
| **Metadata** | Rich (decision #10) | Each organism has accessibility, responsive, structure metadata |
| **CSS Bundling** | Single file (Phase 0) | All Phase 3 CSS in one output file |
| **Bundle Monitoring** | Warnings only (decision #13) | Phase 3 should add <20KB to bundle |
| **Storybook** | 80/20 approach (decision #15) | Real content examples, not placeholder text |
| **Accessibility** | Automated + audit (decision #12) | WCAG AA verified, semantic HTML, keyboard nav |
| **Extensibility** | Framework-based (decision #2) | Pattern-based design for easy expansion |

---

## Module 3.1: Hero & Navigation Organisms

### Hero Section
**Purpose**: Large banner section for page top/campaigns, combining typography and media

**Variants**:
- **Text-only**: Dark/light background with heading + subheading + CTA
- **Image background**: Full-width background with text overlay
- **Split layout**: Image + text side-by-side (desktop), stacked (mobile)
- **Video background**: Placeholder support for video backgrounds

**Specifications**:
```css
.hero                        /* Base container */
.hero__content               /* Text content area */
.hero__media                 /* Image/video media */
.hero--text-only             /* Text-only variant */
.hero--image-background      /* Background image variant */
.hero--split-layout          /* Split layout variant */
.hero--video-background      /* Video background variant */
.hero__heading               /* Main heading (h1) */
.hero__subheading            /* Secondary heading (h2) */
.hero__description           /* Description text */
.hero__actions               /* CTA button container */
.hero__overlay               /* Text overlay (for image/video) */
```

**Components Used**:
- Heading atoms (h1, h2)
- Text atoms (body, description)
- Button atoms (primary, secondary)
- Icon atoms (optional decorative)

**Features**:
- Heading, subheading, description text
- Multiple CTA buttons (primary + secondary)
- Optional image or video background
- Semi-transparent text overlay for readability over images
- Full-width on mobile, constrained on desktop
- Progressive enhancement: parallax scroll option (CSS-only)

**Accessibility** (decision #12):
- Semantic heading structure (h1 as main, h2 as subheading)
- Text overlay contrast verified (WCAG AA: 4.5:1)
- Text alternatives for background images
- Links keyboard accessible
- Skip link targeting hero content (in header)

**Dark Mode** (decision #7):
- Text colors adjust automatically
- Overlay darkness adjusts for readability
- Background images remain clear

**Responsive**:
- Full-width on mobile, 100% viewport height
- Stacks vertically on tablet
- Side-by-side on desktop (split layout)
- Container query aware for flexible sizing

**Estimate**: 5 hours

---

### Site Header
**Purpose**: Top-level site navigation and branding

**Specifications**:
```css
.site-header                 /* Base container */
.site-header--sticky         /* Sticky variant */
.site-header--transparent    /* Transparent background variant */
.site-header--solid          /* Solid background variant */
.site-header__branding       /* Logo/site name area */
.site-header__nav            /* Navigation menu */
.site-header__actions        /* Right-side actions (CTA, etc) */
.site-header__mobile-toggle  /* Mobile menu button */

/* Navigation structure */
.site-nav                    /* Navigation container */
.site-nav__list              /* Navigation list */
.site-nav__item              /* Navigation item */
.site-nav__link              /* Navigation link */
.site-nav__link--active      /* Active/current link */
```

**Components Used**:
- Link atoms (styled navigation links)
- Button atoms (CTA button)
- Icon atoms (mobile menu, social icons)
- Logo/branding image

**Features**:
- Logo/site branding with optional text or image
- Main navigation menu (7-10 items)
- Optional CTA button (right side)
- Sticky/fixed positioning option
- Transparent background (over hero) or solid
- Active link highlighting
- Mobile-responsive: hamburger menu on mobile
- Desktop: horizontal menu bar

**Accessibility** (decision #12):
- Semantic `<nav>` element
- ARIA current="page" on active link
- Mobile menu: `aria-expanded` for toggle state
- Links have clear labels
- Keyboard navigation (Tab, Enter, Escape for menu)
- Skip link to main content

**Dark Mode** (decision #7):
- Background colors adjust automatically
- Text colors maintain contrast
- Transparent backgrounds work in both modes

**Responsive**:
- Mobile: hamburger icon + collapsed menu
- Tablet: reduced menu items or dropdown
- Desktop: full horizontal menu bar
- Container query aware

**Estimate**: 4 hours

---

## Module 3.2: Content Display Organisms

### Feature Section
**Purpose**: Showcase features/capabilities with multiple layout options

**Specifications**:
```css
.feature-section             /* Base container */
.feature-section__header     /* Section header */
.feature-section__content    /* Content area */
.feature-section__items      /* Items container */
.feature-section__item       /* Individual item */

/* Layout variants */
.feature-section--two-column /* 2-column layout (text + image) */
.feature-section--three-column /* 3-column grid */
.feature-section--alternating /* Alternating text-image blocks */
.feature-section--full-width /* Full-width variant */

/* Content structure */
.feature-section__image      /* Image container */
.feature-section__text       /* Text content */
.feature-section__cta        /* Call-to-action button */
```

**Components Used**:
- Heading atoms (section heading)
- Card molecules (feature cards in grid)
- Image + Text Block molecules
- Feature List molecules
- Button atoms (CTAs)
- Icon atoms (feature icons)

**Features**:
- Section heading + optional description
- Multiple layout options (2-column, 3-column grid, alternating)
- Each feature includes icon, heading, description
- Optional images per feature
- Optional CTA button for section
- Consistent spacing and rhythm

**Accessibility** (decision #12):
- Semantic heading structure
- List structure for features (ul/li or div with role)
- Images have alt text
- Links keyboard accessible
- Sufficient color contrast

**Dark Mode** (decision #7):
- Colors adjust automatically
- Background colors use CSS variables
- Images remain visible in both modes

**Responsive**:
- Mobile: single column
- Tablet: 2 columns
- Desktop: 2-3 columns depending on variant
- Container query aware

**Estimate**: 4 hours

---

### Comparison Table
**Purpose**: Side-by-side feature comparison for display only

**Specifications**:
```css
.comparison-table            /* Base table container */
.comparison-table__header    /* Header row */
.comparison-table__body      /* Body rows */
.comparison-table__row       /* Individual row */
.comparison-table__cell      /* Table cell */
.comparison-table__label     /* Row label (left column) */

/* Row variants */
.comparison-table__row--included /* Feature included */
.comparison-table__row--excluded /* Feature excluded */
.comparison-table__row--highlight /* Highlighted row */
```

**Components Used**:
- Badge atoms (status indicators)
- Icon atoms (checkmark/cross icons)
- Text atoms (labels, values)
- Feature List molecules (feature descriptions)

**Features**:
- Multiple rows and columns (no form inputs)
- Alternating row backgrounds
- Header row with column titles
- Feature inclusion indicators (checkmarks/icons)
- Highlighted rows for emphasis
- Sticky header (optional)

**Accessibility** (decision #12):
- Semantic table structure (table, thead, tbody, tr, td/th)
- Header cells marked with `scope="col"` and `scope="row"`
- Row labels in first column (th scope="row")
- Descriptions linked to rows via ARIA or text

**Dark Mode** (decision #7):
- Row backgrounds use CSS variables
- Borders adjust for contrast
- Text colors maintain readability

**Responsive**:
- Desktop: horizontal scrolling table
- Tablet: condensed columns or card layout
- Mobile: stacked cards (one row per card)

**Estimate**: 3 hours

---

### Media Gallery
**Purpose**: Grid display of images and videos

**Specifications**:
```css
.media-gallery               /* Base container */
.media-gallery--grid         /* Uniform grid layout */
.media-gallery--masonry      /* Masonry layout */
.media-gallery--featured     /* Featured item + thumbnails */

.media-gallery__items        /* Items container */
.media-gallery__item         /* Individual item */
.media-gallery__image        /* Image element */
.media-gallery__video        /* Video placeholder */
.media-gallery__overlay      /* Hover overlay */
.media-gallery__caption      /* Optional caption */

/* Aspect ratio support */
.media-gallery__item--square /* 1:1 aspect ratio */
.media-gallery__item--wide   /* 16:9 or 2:1 aspect ratio */
.media-gallery__item--tall   /* 1:2 or 3:4 aspect ratio */
```

**Components Used**:
- Icon atoms (play button overlay)
- Text atoms (captions)
- Badge atoms (video indicator)

**Features**:
- Multiple layout options (uniform grid, masonry, featured)
- Flexible image aspect ratios
- Lazy loading hints via CSS
- Lightbox trigger indicators (hover state)
- Optional captions per item
- Video placeholder support

**Accessibility** (decision #12):
- Images have descriptive alt text
- Video items clearly marked
- Lightbox trigger clearly accessible
- Color not sole indication (use icons + text)

**Dark Mode** (decision #7):
- Captions adjust color automatically
- Overlays adjust for visibility
- Play icons visible in both modes

**Responsive**:
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Container query aware

**Estimate**: 4 hours

---

### Timeline / Process Flow
**Purpose**: Vertical or horizontal timeline visualization

**Specifications**:
```css
.timeline                    /* Base container */
.timeline--vertical          /* Vertical layout (default) */
.timeline--horizontal        /* Horizontal layout */

.timeline__items             /* Items container */
.timeline__item              /* Individual item */
.timeline__item--left        /* Left-aligned (vertical) */
.timeline__item--right       /* Right-aligned (vertical) */
.timeline__item--active      /* Current/active step */
.timeline__item--completed   /* Completed step */

/* Content elements */
.timeline__marker            /* Step number or icon */
.timeline__connector         /* Line between items */
.timeline__content           /* Text content */
.timeline__title             /* Step title */
.timeline__description       /* Step description */
.timeline__label             /* Date or status label */
```

**Components Used**:
- Badge atoms (step numbers)
- Icon atoms (step icons)
- Heading atoms (step titles)
- Text atoms (descriptions)

**Features**:
- Vertical or horizontal layout
- Step numbers or icons
- Connecting lines between steps
- Alternating left/right (vertical) for visual balance
- Optional dates or status labels
- Current/completed step highlighting

**Accessibility** (decision #12):
- Semantic ordered list structure (ol/li)
- ARIA attributes for current step
- Text labels for each step
- Sufficient color contrast for status indicators

**Dark Mode** (decision #7):
- Connector lines adjust color
- Step markers visible in both modes
- Status colors maintain contrast

**Responsive**:
- Mobile: single column
- Tablet: 1 column
- Desktop: vertical or horizontal as specified
- Container query aware

**Estimate**: 3 hours

---

## Module 3.3: Social & Community Organisms

### Testimonials Carousel
**Purpose**: Multiple testimonials in carousel format

**Specifications**:
```css
.testimonials-carousel       /* Base container */
.testimonials-carousel__viewport /* Visible area */
.testimonials-carousel__track /* Carousel track */
.testimonials-carousel__slide /* Individual slide */
.testimonials-carousel__slide--active /* Active slide */

.testimonials-carousel__content /* Testimonial content */
.testimonials-carousel__quote /* Quote text */
.testimonials-carousel__attribution /* Author info */
.testimonials-carousel__photo /* Author photo */

.testimonials-carousel__controls /* Navigation controls */
.testimonials-carousel__button /* Previous/next button */
.testimonials-carousel__indicator /* Slide indicator */
```

**Components Used**:
- Testimonial/Quote molecules
- Button atoms (prev/next navigation)
- Badge atoms (slide indicators)
- Icon atoms (carousel controls)

**Features**:
- Multiple testimonials cycling through
- Previous/next navigation buttons
- Slide indicator dots
- Optional autoplay (disabled by default)
- Author photos and attribution
- Rating/stars optional

**Accessibility** (decision #12):
- Semantic structure with proper ARIA attributes
- ARIA live region announcing current testimonial
- Keyboard navigation (arrow keys, Tab)
- Pause/play controls if autoplay enabled
- Clear button labels for navigation

**Dark Mode** (decision #7):
- Colors adjust automatically
- Navigation buttons visible in both modes
- Indicators have good contrast

**Responsive**:
- Mobile: full-width cards, vertical scrolling
- Tablet: narrower cards
- Desktop: centered carousel
- Container query aware

**Estimate**: 4 hours

---

### Team/People Grid
**Purpose**: Grid display of people with photos and information

**Specifications**:
```css
.team-grid                   /* Base container */
.team-grid__items            /* Grid container */
.team-grid__item             /* Individual person card */
.team-grid__image            /* Person photo */
.team-grid__content          /* Text content */
.team-grid__name             /* Person name */
.team-grid__title            /* Job title */
.team-grid__bio              /* Optional bio/description */
.team-grid__socials          /* Social links container */
.team-grid__social-link      /* Individual social link */

/* Layout variants */
.team-grid--columns-2        /* 2-column layout */
.team-grid--columns-3        /* 3-column layout */
.team-grid--columns-4        /* 4-column layout */
```

**Components Used**:
- Card molecules (person cards)
- Heading atoms (person names)
- Text atoms (titles, bios)
- Link atoms (social media links)
- Icon atoms (social media icons)
- Image + Text Block molecules

**Features**:
- Grid of person cards
- Photo (circular crop)
- Name and job title
- Optional bio/description
- Optional social media links (display-only)
- Responsive column layout
- Optional hover reveal of additional info

**Accessibility** (decision #12):
- Images have alt text (person name + title)
- Semantic list or grid structure
- Social links have clear labels or ARIA labels
- Sufficient color contrast for text

**Dark Mode** (decision #7):
- Card backgrounds use CSS variables
- Text colors adjust automatically
- Photos remain visible in both modes

**Responsive**:
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Container query aware

**Estimate**: 3 hours

---

### Social Proof Block
**Purpose**: Customer logos, stats, or testimonials for credibility

**Specifications**:
```css
.social-proof                /* Base container */
.social-proof--logos         /* Logo variant */
.social-proof--stats         /* Stats variant */
.social-proof--testimonials  /* Mini testimonials variant */

.social-proof__header        /* Optional header */
.social-proof__items         /* Items container */
.social-proof__item          /* Individual item */
.social-proof__logo          /* Logo image */
.social-proof__stat          /* Stat display */
.social-proof__testimonial   /* Mini testimonial */
```

**Components Used**:
- Heading atoms (optional header)
- Badge atoms (stat labels)
- Testimonial/Quote molecules (for testimonial variant)
- Icon atoms (optional icons)
- Text atoms (stat values, testimonial text)

**Features**:
- Logo grid (display customer logos)
- Stats display (metrics with icons/labels)
- Mini testimonials (brief quotes with attribution)
- Lightweight, scannable layout
- Consistent spacing between items
- Optional section heading

**Accessibility** (decision #12):
- Logos have alt text
- Stats have clear labels
- Color not sole indication of meaning
- Text readable at all sizes

**Dark Mode** (decision #7):
- Logo backgrounds adjust if needed
- Text colors maintain contrast
- Icons visible in both modes

**Responsive**:
- Mobile: 1-2 items per row
- Tablet: 2-3 items per row
- Desktop: 3-4 items per row
- Container query aware

**Estimate**: 2 hours

---

## Implementation Checklist

- [ ] All 8-10 organisms in Storybook with realistic content examples
- [ ] Each organism composes atoms/molecules (demonstrates reusability)
- [ ] WCAG AA compliance verified (semantic HTML, keyboard nav, contrast)
- [ ] Mobile responsive tested (320px - 1440px)
- [ ] Dark mode support verified
- [ ] No hardcoded colors (all use design tokens)
- [ ] No JavaScript required (pure CSS + semantic HTML)
- [ ] CSS bundle size measured (Phase 3 adds <20KB)
- [ ] All components use consistent naming (matches Phase 2)
- [ ] Storybook stories follow 80/20 approach (real content + code snippets)
- [ ] Component API documented (CSS classes, structure)
- [ ] Ready for Phase 4 refinement and polish

## File Structure

```
src/components/
├── atoms/                     # Phase 2
├── molecules/                 # Phase 2
├── organisms/
│   ├── hero-section/
│   │   ├── hero-section.css
│   │   ├── hero-section.html  (template composition)
│   │   └── hero-section.stories.js
│   ├── site-header/
│   ├── feature-section/
│   ├── comparison-table/
│   ├── media-gallery/
│   ├── timeline/
│   ├── testimonials-carousel/
│   ├── team-grid/
│   ├── social-proof-block/
│   └── footer-section/       # Simple footer (next)
└── index.css                  # Updated with organisms
```

## Success Metrics

- [ ] 8-10 organisms built and in Storybook
- [ ] Realistic content examples (not placeholder text)
- [ ] All organisms compose Phase 2 atoms/molecules
- [ ] WCAG AA compliance (semantic HTML, keyboard accessible)
- [ ] Lighthouse 90+ on test pages using organisms
- [ ] CSS bundle increase: <20KB for Phase 3
- [ ] Dark mode working perfectly on all organisms
- [ ] Mobile responsiveness tested (320px to 1440px)
- [ ] All colors use design tokens (no hardcoded values)
- [ ] Storybook stories follow 80/20 (visuals + code snippets)
- [ ] Zero JavaScript required (pure CSS)
- [ ] Component names and structure clear for registry (Phase 5)

## Integration Testing

Test realistic page layouts combining multiple organisms:

- **Marketing landing page**: Hero + Feature Section + Testimonials + Footer
- **Feature showcase page**: Site Header + Feature Section (multiple variants) + CTA
- **Product comparison page**: Comparison Table + Social Proof + Team Grid
- **Team/about page**: Hero + Team Grid + Testimonials Carousel + Footer

Each test page should:
- Load without JavaScript errors
- Render correctly in light and dark modes
- Be responsive from mobile to desktop
- Pass accessibility audit (Pa11y + axe)
- Validate against Lighthouse standards

## Phase Gate

**Completion criteria before proceeding to Phase 4**:

- [ ] All 8-10 organisms complete and in Storybook
- [ ] Each organism demonstrates composition (reuses atoms/molecules)
- [ ] WCAG AA compliance verified
- [ ] Bundle size increase documented (<20KB)
- [ ] Test pages validate accessibility and performance
- [ ] Dark mode working across all organisms
- [ ] No hardcoded values or CSS overrides
- [ ] Organisms ready for metadata documentation (Phase 5)

Organisms should cleanly compose atoms and molecules. If duplicating styles, refactor into a shared atom or molecule first. This demonstrates the extensibility framework from decision #2.

---

## Notes for Future Phases

- **Phase 4**: Refinement, container query optimization, print styles, edge cases
- **Phase 5**: Rich metadata (accessibility, responsive behavior, usage)
- **Phase 6**: MCP integration - organisms available to Claude for page composition
- **Phase 7**: Storybook documentation with real example pages

---

*Phase 3 Plan v2.0 (Comprehensive) - October 24, 2025*
