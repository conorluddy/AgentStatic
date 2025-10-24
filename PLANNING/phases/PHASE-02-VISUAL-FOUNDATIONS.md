# Phase 2: Visual Foundations (Atoms & Molecules)

**Duration**: Weeks 3-4 | **Effort**: 30 hours | **Priority**: High

## Overview

Build **12-15 essential visual components** that form the building blocks of brochureware sites. Focus exclusively on display and read-only components (decision #1: brochureware-only, no forms).

**Key Focus** (reflecting 17 refined decisions):
- **12-15 components** (focused scope, not 40+)
- **Brochureware-only**: Heroes, cards, galleries, pricing - NOT forms or interactions
- **Extensible framework**: Design for easy addition of future components
- **All responsive**: Mobile-first, container queries
- **Dark mode ready**: All use design tokens
- **Storybook 80/20**: Visuals + code snippets
- **WCAG AA**: Automated testing + manual audit

## Module 2.1: Basic Atoms

### Button
Visual treatment for CTAs, not form submission.
- **Variants**: Primary, secondary, ghost, outline
- **Sizes**: Small, medium, large
- **States**: Default, hover, active, disabled, loading
- **Features**: Icon support, full-width option, text alignment
- **CSS approach**: BEM + cascade layers
- **Accessibility**: Focus indicators, ARIA labels for loading state

**Estimate**: 4 hours

### Heading Atoms
Pre-styled heading hierarchy (H1-H6) with consistent sizing.
- **Variants**: Default, accent (smaller caps/highlight)
- **Sizes**: Scale based on design tokens
- **Spacing**: Consistent margins for document flow
- **Features**: Optional baseline grid alignment

**Estimate**: 2 hours

### Text Atoms
Display text, emphasis, and metadata.
- **Text**: Body, small, micro sizes
- **Emphasis**: Bold, italic, mark (highlight), code
- **Metadata**: Byline, timestamp, category tag
- **Color variants**: Primary, secondary, muted, accent

**Estimate**: 2 hours

### Visual Dividers
Visual separation without semantic meaning.
- **Types**: Horizontal line, vertical line, spacer
- **Variants**: Solid, dashed, gradient
- **Spacing**: Configurable margins

**Estimate**: 1 hour

### Badge/Pill
Small labels for categorization and status.
- **Variants**: Solid, outline, subtle
- **Sizes**: Small, medium
- **Colors**: Category-based (primary, success, warning, danger)
- **Content**: Text only or with icons

**Estimate**: 2 hours

### Icon Placeholder
Container and sizing standards for SVG icons.
- **Sizes**: 16px, 24px, 32px, 48px (via tokens)
- **Behavior**: Respects parent color, doesn't resize unless specified
- **Accessibility**: Can be decorative or semantic

**Estimate**: 1 hour

---

## Module 2.2: Basic Molecules

### Card
Contained content block. Core brochureware component.
- **Sections**: Optional header, body, footer
- **Features**: Image support, border/shadow variants, hover effects
- **Responsive**: Container query responsive layouts
- **Variants**: Minimal, outlined, elevated (shadow)

**Estimate**: 4 hours

### Call-to-Action Block
Text + button combo for conversion.
- **Variants**: Image-left, image-right, image-background
- **Content**: Heading, body text, optional description, CTA button
- **Responsive**: Stacks on mobile, side-by-side on desktop
- **Spacing**: Consistent padding/gap

**Estimate**: 3 hours

### Image + Text Block
Flexible layout combining image and text content.
- **Orientation**: Horizontal, vertical, vertical-centered
- **Image**: Full-width, constrained-width, aspect ratios
- **Text alignment**: Left, center, right
- **Responsive**: Stacks on mobile, switches on larger screens

**Estimate**: 3 hours

### Feature List
List of features/benefits with optional icons.
- **Variants**: Bullet points, icons, numbered, checkmarks
- **Content**: Heading + description per item
- **Grid**: 1, 2, or 3-column layouts
- **Icons**: Optional left-aligned icons

**Estimate**: 2 hours

### Testimonial/Quote
Typography-focused quote display.
- **Content**: Quote text, attribution, optional photo
- **Variants**: Inline quotes, block quotes, testimonial cards
- **Styling**: Quotation marks, emphasis, source styling

**Estimate**: 2 hours

### Stat/Metric Block
Large number display with supporting text.
- **Content**: Large number/metric, unit, description
- **Variants**: Single stat, stat comparison
- **Alignment**: Vertical stack (default), horizontal

**Estimate**: 1 hour

---

## Module 2.3: Navigation Atoms

### Link
Styled hyperlinks with consistent treatment.
- **Variants**: Inline (with underline), standalone, button-like
- **States**: Unvisited, visited, hover, active, focus
- **Colors**: Default, accent, secondary
- **Icons**: Support for trailing/leading icons

**Estimate**: 2 hours

### Breadcrumb
Hierarchical navigation path.
- **Items**: Link items with separators
- **Current page**: Marked as current (no link), ARIA current="page"
- **Responsive**: Condense on mobile, show all on larger

**Estimate**: 2 hours

---

## Key Decisions (Reflecting All 17 Refinements)

| Decision | Choice | Phase 2 Impact |
|----------|--------|----------------|
| **Scope** | Brochureware-only (decision #1) | Only display/read-only components, no forms |
| **Component Count** | 12-15 focused (decision #2) | Exactly 12 atoms + molecules (no 40+) |
| **Theme** | Predefined + customizable (decision #3) | All components use design tokens |
| **Dark Mode** | System + toggle (decision #7) | All colors support dark mode variants |
| **Routing** | Static file-based (decision #8) | Components used in static compositions |
| **Theme System** | Global only (decision #9) | No per-component CSS overrides |
| **Metadata** | Rich (decision #10) | Each component includes accessibility metadata |
| **CSS Bundling** | Single file (Phase 0) | All Phase 2 CSS in one output file |
| **Bundle Monitoring** | Warnings only (decision #13) | Phase 2 should add <15KB to bundle |
| **Storybook** | 80/20 approach (decision #15) | Visuals + code snippets, not comprehensive |
| **Accessibility** | Automated + audit (decision #12) | WCAG AA verified, part of CI/CD |
| **Extensibility** | Framework-based (decision #2) | Make it easy to add Phase 3+ components |

---

## Detailed Component Specifications

### Module 2.1: Basic Atoms (6 components, ~12 hours)

#### Button
**Purpose**: Visual treatment for calls-to-action, not form submission (decision #1)

**Specifications**:
```css
/* BEM structure */
.button              /* Base element */
.button--primary     /* Primary variant */
.button--secondary   /* Secondary variant */
.button--ghost       /* Ghost (minimal) variant */
.button--outline     /* Outline variant */
.button--small       /* Size modifier */
.button--medium      /* Size modifier (default) */
.button--large       /* Size modifier */
.button:hover        /* Hover state */
.button:active       /* Active state */
.button:disabled     /* Disabled state */
.button.loading      /* Loading state with spinner */
.button__icon        /* Icon child element */
.button--full-width  /* Full-width modifier */
```

**Features**:
- Icon support (leading/trailing)
- Full-width option
- Loading state with visual feedback
- All states: default, hover, active, disabled, loading
- Text alignment options

**Accessibility** (decision #12):
- Visible focus indicators (3px outline, proper contrast)
- `aria-busy="true"` in loading state
- `disabled` attribute for disabled state
- Sufficient color contrast (WCAG AA: 4.5:1)

**Dark Mode** (decision #7):
- All colors use CSS variables
- Automatic switching via `prefers-color-scheme` or `.dark` class
- Maintains contrast in both modes

**Responsive**: Base design is mobile-first, scales naturally

**Estimate**: 4 hours

---

#### Heading Atoms (H1-H6)
**Purpose**: Pre-styled heading hierarchy with consistent sizing

**Specifications**:
```css
.h1, h1              /* 2.5rem / 40px */
.h2, h2              /* 2rem / 32px */
.h3, h3              /* 1.5rem / 24px */
.h4, h4              /* 1.25rem / 20px */
.h5, h5              /* 1.125rem / 18px */
.h6, h6              /* 1rem / 16px */

/* Optional variants */
.h1--accent          /* Smaller caps, highlight color */
.h2--accent
/* ... etc */

/* Baseline grid alignment (optional) */
.h1--grid-aligned    /* Aligns to baseline grid */
```

**Features**:
- Consistent sizing based on design tokens
- Margin normalization (0 top, consistent bottom)
- Accent variant for highlighted headings
- Optional baseline grid alignment
- All levels use design tokens (spacing, colors)

**Accessibility** (decision #12):
- Semantic heading elements (h1-h6)
- Color contrast verified (WCAG AA)
- Sufficient size for readability

**Dark Mode** (decision #7):
- Colors adjust automatically via tokens
- Ensure accent variants visible in both modes

**Responsive**: Scales on mobile/tablet/desktop via tokens

**Estimate**: 2 hours

---

#### Text Atoms
**Purpose**: Display text, emphasis, and metadata with consistent styling

**Specifications**:
```css
/* Text sizes */
.text-body           /* Base size, 1rem */
.text-small          /* 0.875rem */
.text-micro          /* 0.75rem (metadata) */

/* Emphasis elements */
.text-bold           /* font-weight: 600 */
.text-italic         /* font-style: italic */
.text-mark           /* Highlight, background color */
.text-code           /* Monospace, code styling */

/* Semantic variants */
.text-primary        /* Primary color text */
.text-secondary      /* Secondary/muted color */
.text-muted          /* Very muted, metadata */
.text-accent         /* Accent color */

/* Metadata-specific */
.byline              /* Author, attribution */
.timestamp           /* Publication date */
.category-tag        /* Topic/category label */
```

**Features**:
- Multiple text sizes based on tokens
- Color variants (primary, secondary, muted, accent)
- Emphasis options (bold, italic, highlight, code)
- Metadata-specific styling

**Accessibility** (decision #12):
- Color not sole means of distinction
- Sufficient contrast for all text sizes
- Code text distinguishable from body text

**Dark Mode** (decision #7):
- All colors via CSS variables
- Metadata text clearly visible in both modes

**Responsive**: Base size is 1rem, adjusts naturally

**Estimate**: 2 hours

---

#### Visual Dividers
**Purpose**: Visual separation without semantic meaning

**Specifications**:
```css
.divider             /* Horizontal line (default) */
.divider--vertical   /* Vertical line */
.divider--spacer     /* Invisible spacer with margin */
.divider--solid      /* Solid line variant */
.divider--dashed     /* Dashed line variant */
.divider--gradient   /* Gradient variant */

/* Spacing control */
.divider--compact    /* Smaller margins */
.divider--regular    /* Standard margins (default) */
.divider--loose      /* Larger margins */
```

**Features**:
- Horizontal, vertical, or spacer types
- Multiple visual styles (solid, dashed, gradient)
- Configurable margins
- Purely decorative (no semantic role)

**Accessibility** (decision #12):
- `role="presentation"` or `aria-hidden="true"`
- Never the sole visual separator for semantic content

**Dark Mode** (decision #7):
- Colors adjust automatically

**Responsive**: Fixed height/width, adapts naturally

**Estimate**: 1 hour

---

#### Badge/Pill
**Purpose**: Small labels for categorization and status

**Specifications**:
```css
.badge               /* Base element */
.badge--solid        /* Solid background */
.badge--outline      /* Outline variant (default) */
.badge--subtle       /* Subtle/ghost variant */
.badge--small        /* Small size (default) */
.badge--medium       /* Medium size */

/* Color variants (category-based) */
.badge--primary      /* Primary color */
.badge--success      /* Success/positive */
.badge--warning      /* Warning */
.badge--danger       /* Danger/error */

.badge__icon         /* Icon child */
```

**Features**:
- Multiple variants (solid, outline, subtle)
- Category-based colors
- Small and medium sizes
- Icon support
- Text-only or text + icon

**Accessibility** (decision #12):
- Sufficient contrast for all color variants
- Readable in both light and dark modes
- Not solely relying on color for meaning

**Dark Mode** (decision #7):
- All colors have dark variants
- Maintain contrast and clarity

**Responsive**: Inline element, adjusts naturally

**Estimate**: 2 hours

---

#### Icon Placeholder
**Purpose**: Container and sizing standards for SVG icons

**Specifications**:
```css
.icon                /* Base container */
.icon--16            /* 16px icon (smallest) */
.icon--24            /* 24px icon (default) */
.icon--32            /* 32px icon */
.icon--48            /* 48px icon (largest) */

/* Behavior modifiers */
.icon--decorative    /* aria-hidden by default */
.icon--semantic      /* Has aria-label or title */

/* Color inheritance */
.icon                /* Inherits parent color by default */
.icon--primary       /* Explicit primary color */
.icon--secondary     /* Explicit secondary color */
```

**Features**:
- Standard sizes via CSS tokens (16, 24, 32, 48px)
- Respects parent color by default
- Can be decorative or semantic
- Consistent sizing system
- No automatic resizing (parent controls size)

**Accessibility** (decision #12):
- Decorative icons: `aria-hidden="true"`
- Semantic icons: `aria-label` or `<title>` element
- Sufficient contrast when used as standalone icons

**Dark Mode** (decision #7):
- Automatically inherits parent text color
- Can have explicit color variants

**Responsive**: Fixed sizes, no scaling needed

**Estimate**: 1 hour

---

### Module 2.2: Basic Molecules (5 components, ~15 hours)

#### Card
**Purpose**: Contained content block, core brochureware component

**Specifications**:
```css
.card                    /* Base container */
.card__header           /* Optional header section */
.card__body             /* Main content area */
.card__footer           /* Optional footer section */

/* Visual variants */
.card--minimal           /* No border/shadow (clean) */
.card--outlined          /* Subtle border */
.card--elevated          /* Shadow effect */

/* Image support */
.card__image            /* Image container (top) */
.card__image-bg         /* Background image variant */

/* Responsive behavior */
.card--responsive       /* Container query aware */
```

**Features**:
- Optional header, body, footer sections
- Image support (top, background, constrained)
- Three visual variants (minimal, outlined, elevated)
- Hover effects (shadow increase, subtle scale)
- Container query responsive layouts

**Accessibility** (decision #12):
- Semantic heading in card header
- Images have alt text
- Sufficient color contrast
- Links within card properly identified

**Dark Mode** (decision #7):
- Shadow colors adjust for dark mode
- Border colors use CSS variables
- All text colors have dark variants

**Responsive**: Container query aware, adapts to available width

**Estimate**: 4 hours

---

#### Call-to-Action Block
**Purpose**: Text + button combination for conversion

**Specifications**:
```css
.cta-block                    /* Base container */
.cta-block__content           /* Text content area */
.cta-block__media             /* Image area */

/* Layout variants */
.cta-block--image-left        /* Image on left, text right */
.cta-block--image-right       /* Image on right, text left */
.cta-block--image-background  /* Image as background */

/* Content elements */
.cta-block__heading           /* Heading */
.cta-block__description       /* Body text */
.cta-block__subtext           /* Optional additional text */
.cta-block__button            /* CTA button */
```

**Features**:
- Three layout variants
- Includes heading, body, optional description, button
- Responsive stacking (mobile: stacked, desktop: side-by-side)
- Consistent padding and gap system
- Image aspect ratio control

**Accessibility** (decision #12):
- Semantic heading
- Images have alt text
- Button is keyboard accessible
- Sufficient color contrast

**Dark Mode** (decision #7):
- All colors use CSS variables
- Maintain contrast in both modes
- Image variants adjust for dark backgrounds

**Responsive**: Stacks on mobile, side-by-side on desktop

**Estimate**: 3 hours

---

#### Image + Text Block
**Purpose**: Flexible layout combining image and text content

**Specifications**:
```css
.image-text-block               /* Base container */
.image-text-block__image        /* Image element */
.image-text-block__content      /* Text content */

/* Orientation variants */
.image-text-block--horizontal   /* Image left, text right */
.image-text-block--vertical     /* Image top, text bottom */
.image-text-block--vertical-centered /* Centered layout */

/* Image sizing */
.image-text-block--image-full   /* Full width image */
.image-text-block--image-constrained /* Limited width */

/* Text alignment */
.image-text-block--text-left    /* Text aligned left */
.image-text-block--text-center  /* Text aligned center */
.image-text-block--text-right   /* Text aligned right */
```

**Features**:
- Three orientation options
- Flexible image sizing
- Multiple text alignments
- Aspect ratio control for images
- Responsive: stacks on mobile, switches on desktop

**Accessibility** (decision #12):
- Images have descriptive alt text
- Semantic heading within content
- Sufficient color contrast
- Text readable on all screen sizes

**Dark Mode** (decision #7):
- Background colors use CSS variables
- Text colors adjust automatically
- Images remain visible in both modes

**Responsive**: Stacks on mobile (vertical), switches to horizontal on desktop

**Estimate**: 3 hours

---

#### Feature List
**Purpose**: List of features/benefits with optional icons

**Specifications**:
```css
.feature-list                  /* Base container */
.feature-list__item            /* List item */
.feature-list__icon            /* Icon container */
.feature-list__content         /* Text content */
.feature-list__heading         /* Item heading */
.feature-list__description     /* Item description */

/* Variant styles */
.feature-list--bullets         /* Bullet point style */
.feature-list--icons           /* Icon-based style */
.feature-list--numbered        /* Numbered list */
.feature-list--checkmarks      /* Checkmark style */

/* Grid layouts */
.feature-list--columns-1       /* Single column */
.feature-list--columns-2       /* Two columns */
.feature-list--columns-3       /* Three columns */
```

**Features**:
- Multiple visual styles (bullets, icons, numbered, checkmarks)
- Heading + description per item
- Grid layouts (1, 2, or 3 columns)
- Optional left-aligned icons
- Responsive grid layouts

**Accessibility** (decision #12):
- Semantic list structure (ul/ol with li)
- Icons marked as decorative
- Sufficient color contrast
- Readable on all screen sizes

**Dark Mode** (decision #7):
- All colors use CSS variables
- Icons inherit colors properly
- Backgrounds adjust for dark mode

**Responsive**: Single column on mobile, expands to 2-3 columns on desktop

**Estimate**: 2 hours

---

#### Testimonial/Quote
**Purpose**: Typography-focused quote display

**Specifications**:
```css
.testimonial                     /* Base container */
.testimonial__quote              /* Quote text */
.testimonial__attribution        /* Source/author */
.testimonial__photo              /* Optional author photo */

/* Variant styles */
.testimonial--inline             /* Inline quote with marks */
.testimonial--block              /* Block quote style */
.testimonial--card               /* Card-style with photo */

/* Text styling */
.testimonial__quote-mark-open   /* Opening quotation mark */
.testimonial__quote-mark-close  /* Closing quotation mark */
.testimonial__emphasis           /* Emphasized text within quote */
```

**Features**:
- Three visual variants (inline, block, card)
- Quote text with optional quotation marks
- Attribution with optional photo
- Typography-focused styling
- Photo support (circular crop)

**Accessibility** (decision #12):
- Semantic quote element (blockquote)
- Photos have alt text
- Quotation marks rendered as CSS content (not screen-reader confusion)
- Sufficient text contrast

**Dark Mode** (decision #7):
- Colors adjust automatically
- Quote marks visible in both modes
- Photo styling adapts for dark mode

**Responsive**: Scales naturally, photo adjusts size

**Estimate**: 2 hours

---

### Module 2.3: Navigation Atoms (2 components, ~4 hours)

#### Link
**Purpose**: Styled hyperlinks with consistent treatment

**Specifications**:
```css
.link                        /* Semantic a element styling */

/* Variant styles */
.link--inline                /* Inline with underline */
.link--standalone            /* Standalone, larger */
.link--button-like           /* Styled as button */

/* State classes */
.link:visited                /* Visited state (passive) */
.link:hover                  /* Hover state */
.link:active                 /* Active/pressed state */
.link:focus                  /* Focus state */
.link:focus-visible          /* Keyboard focus only */

/* Color variants */
.link--default               /* Default color */
.link--accent                /* Accent color */
.link--secondary             /* Secondary color */

/* Icon support */
.link__icon-leading         /* Icon before text */
.link__icon-trailing        /* Icon after text */
```

**Features**:
- Three visual variants (inline, standalone, button-like)
- All link states: unvisited, visited, hover, active, focus
- Color variants
- Icon support (leading/trailing)
- Underline treatment varies by variant

**Accessibility** (decision #12):
- Visible focus indicators (3px outline or underline)
- Sufficient color contrast (4.5:1)
- Distinguishable without color alone
- Keyboard accessible
- Clear link purpose from text or aria-label

**Dark Mode** (decision #7):
- Colors adjust automatically
- Underlines remain visible in both modes
- Focus indicators work in both modes

**Responsive**: Scales naturally, inline or standalone

**Estimate**: 2 hours

---

#### Breadcrumb
**Purpose**: Hierarchical navigation path

**Specifications**:
```css
.breadcrumb                    /* Container */
.breadcrumb__list              /* Ordered list */
.breadcrumb__item              /* List item */
.breadcrumb__link              /* Navigable link */
.breadcrumb__current           /* Current page marker */
.breadcrumb__separator         /* Visual separator */

/* Responsive behavior */
.breadcrumb--responsive        /* Collapses on mobile */
.breadcrumb--full              /* Always show all items */
```

**Features**:
- Link items with separators
- Current page marked (no link)
- ARIA current="page" for current item
- Responsive: condense on mobile, show all on desktop
- Semantic ordered list structure

**Accessibility** (decision #12):
- Semantic nav element
- Ordered list structure (ol/li)
- ARIA current="page" on current item
- Links keyboard accessible
- Separators invisible to screen readers (aria-hidden)

**Dark Mode** (decision #7):
- All colors use CSS variables
- Separators visible in both modes
- Links accessible in both modes

**Responsive**: Collapses to fewer items on mobile (via container queries)

**Estimate**: 2 hours

---

## Implementation Checklist

- [ ] All components in Storybook with stories for each variant
- [ ] WCAG AA compliance verified (contrast, focus, keyboard)
- [ ] Mobile responsive tested (320px - 1440px)
- [ ] Dark mode variants working
- [ ] CSS bundle size measured and reported
- [ ] No JavaScript required
- [ ] Documentation complete with usage examples
- [ ] Component API (classes, data attributes) clearly documented

## File Structure
```
src/components/
├── atoms/
│   ├── button/
│   │   ├── button.css
│   │   └── button.stories.js
│   ├── heading/
│   │   ├── heading.css
│   │   └── heading.stories.js
│   ├── text/
│   ├── divider/
│   ├── badge/
│   ├── icon/
│   ├── link/
│   └── breadcrumb/
├── molecules/
│   ├── card/
│   │   ├── card.css
│   │   └── card.stories.js
│   ├── cta-block/
│   ├── image-text-block/
│   ├── feature-list/
│   ├── testimonial/
│   └── stat-block/
└── index.css  # Imports all components
```

## Success Metrics

- [ ] 12-15 components (atoms + molecules) built and in Storybook
- [ ] All Storybook stories follow 80/20 approach (visuals + code, not comprehensive)
- [ ] WCAG AA compliance verified (automated + audit)
- [ ] Lighthouse 90+ on all test pages
- [ ] CSS bundle increase < 15KB
- [ ] Dark mode variants working perfectly
- [ ] Mobile responsiveness tested (320px to 1440px)
- [ ] All components use design tokens (no hardcoded values)
- [ ] Component names match registry (Phase 5+)

## Phase Gate

Complete all atoms before starting molecules. Molecules depend on atoms. Must be finished before Phase 3 (Weeks 5-6).
