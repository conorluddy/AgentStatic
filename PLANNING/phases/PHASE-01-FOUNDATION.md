# Phase 1: Component Foundation & Design System

**Duration**: Weeks 1-2 (parallel with Phase 0) | **Effort**: 25 hours | **Priority**: Critical

---

## Overview

Establish the **design token system, CSS architecture, and component infrastructure** that Phases 2-7 depend on. This phase runs **in parallel with Phase 0** to create a fully operational system immediately after Week 2.

**Key Focus** (reflecting 17 refined decisions):
- **Predefined theme** with beautiful defaults (not requiring customization)
- **Easy customization** via CSS variables (global theme system only)
- **Dark mode system** supporting both automatic (system preference) and manual toggle
- **Global theme consistency** (no per-page CSS overrides)
- **Cascade layers** for clean CSS architecture
- **Storybook 80/20** (visuals + code snippets, not comprehensive)
- **Zero runtime JavaScript** for component rendering

---

## Deliverables

### 1.1 Predefined Design Token System

**Goal**: Create beautiful default theme that users can customize but not override per-page

**What to Build**:
- **Token categories**: Colors, spacing, typography, shadows, borders, transitions
- **Color palette**: Light mode + dark mode variants
  - Primary, secondary, success, warning, error, neutral
  - Each with 50-900 variants for depth
- **Spacing scale**: 0.25rem to 4rem (8 steps)
- **Typography**: Font families, sizes (sm, base, lg, xl, 2xl), weights, line heights
- **Shadows**: Elevation system (none, sm, md, lg, xl)
- **Borders**: Radius scale, width standards
- **Transitions**: Duration (150ms, 200ms, 300ms) and easing
- **Output**: `components/_system/tokens.css` (~3KB)

**Token Format** (CSS Custom Properties):
```css
:root {
  /* Colors - Light Mode */
  --color-primary: #0066ff;
  --color-primary-50: #f0f7ff;
  --color-primary-900: #001a4d;

  /* Colors - Dark Mode (separate vars) */
  --color-primary-dark: #4d94ff;

  /* Spacing */
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  /* ... up to --space-32 */

  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* And more... */
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: var(--color-primary-dark);
    /* ... other dark mode overrides */
  }
}
```

**Key Decision**: **Predefined theme + easy customization**. Users get beautiful defaults immediately but can customize via CSS variables globally. No per-page theme overrides allowed (decision #9).

**Acceptance Criteria**:
- [ ] All tokens documented with usage examples
- [ ] Token values tested for accessibility (contrast ratios)
- [ ] Light mode colors finalized and approved
- [ ] Dark mode colors generated from light mode
- [ ] Tokens support system preference + manual toggle
- [ ] Can be overridden globally at `:root` level
- [ ] No hardcoded colors in components (all use tokens)
- [ ] Token file <5KB

**Estimate**: 8 hours

---

### 1.2 CSS Architecture with Cascade Layers

**Goal**: Create clean, maintainable CSS structure using cascade layers

**What to Build**:
- **Layer definitions**: `@layer reset, base, components, utilities, overrides`
- **Reset layer**: Sensible browser defaults (not aggressive)
  - Normalize margins, padding for semantic elements
  - Set box-sizing: border-box globally
  - Remove default button/input styles
- **Base layer**: Foundation styles for semantic HTML
  - Typography hierarchy (h1-h6, p, code, etc.)
  - Link underlines, focus states
  - Form element base styles (but NOT form inputs themselves - out of scope)
- **Components layer**: Home for all component CSS (Phases 2-4)
- **Utilities layer**: Optional quick layout helpers (margin, padding, display)
- **Overrides layer**: User customizations (empty by default)
- **Output**: `components/_system/architecture.css` (~1.5KB)

**CSS Architecture Example**:
```css
/* 1. Reset - Browser defaults */
@layer reset {
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
  button { appearance: none; }
}

/* 2. Base - Semantic HTML foundations */
@layer base {
  h1, h2, h3 { font-weight: 600; margin: var(--space-3) 0; }
  p { margin: 0; line-height: 1.6; }
  a { color: var(--color-primary); text-decoration: underline; }
  a:hover { text-decoration: none; }
}

/* 3. Components - Added by Phases 2-4 */
@layer components {
  .button { /* ... */ }
  .card { /* ... */ }
}

/* 4. Utilities - Optional helpers */
@layer utilities {
  .m-0 { margin: 0; }
  .m-1 { margin: var(--space-1); }
}

/* 5. Overrides - User customizations */
@layer overrides {
  /* User can add custom styles here */
}
```

**Key Decision**: **Cascade layers** for specificity management (no !important needed).

**Acceptance Criteria**:
- [ ] Layers defined in correct order
- [ ] Reset doesn't break semantic HTML
- [ ] Base styles apply sensible defaults
- [ ] Components layer ready for Phase 2+
- [ ] No specificity conflicts (layers handle it)
- [ ] Documentation explains each layer
- [ ] All examples in comments

**Estimate**: 6 hours

---

### 1.3 Dark Mode System (System + Manual Toggle)

**Goal**: Implement dark mode supporting automatic detection AND manual user toggle

**Key Decision**: **Both system preference AND manual toggle** (decision #7). Users get automatic dark mode but can also toggle manually.

**What to Build**:
- **System preference detection**: Use `prefers-color-scheme` media query
- **Manual toggle**: Small button in page template to switch modes
- **Persistence**: Save user preference to localStorage
- **CSS variables**: All colors have light + dark variants
- **No runtime JS for components**: Toggle logic in template, components use pure CSS
- **Minimal JavaScript**: Only for toggle persistence (3-5 lines)

**Implementation**:
```html
<!-- In page template (base layout) -->
<script>
  // Minimal JS for dark mode toggle (localStorage only)
  const isDark = localStorage.getItem('theme') === 'dark' ||
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) document.documentElement.classList.add('dark');
</script>

<!-- Toggle button (template, not component) -->
<button id="dark-mode-toggle" aria-label="Toggle dark mode">
  <span class="light-icon">☀️</span>
  <span class="dark-icon">🌙</span>
</button>

<script>
  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

**CSS**:
```css
/* Dark mode colors */
@media (prefers-color-scheme: dark),
       .dark {
  :root {
    --color-primary: #4d94ff;
    --color-background: #1a1a1a;
    /* ... all dark variants */
  }
}
```

**Acceptance Criteria**:
- [ ] System preference detected automatically
- [ ] Manual toggle button works
- [ ] User preference persisted to localStorage
- [ ] All color tokens have dark variants
- [ ] Components render correctly in both modes
- [ ] Minimal JavaScript (no framework)
- [ ] No runtime JS in component rendering

**Estimate**: 6 hours

---

### 1.4 Storybook Setup (80/20 Approach)

**Goal**: Set up Storybook for component development and documentation

**Key Decision**: **Storybook 80/20** (decision #15) - Visual variants + code snippets, not comprehensive docs.

**What to Build**:
- **Storybook 8 configuration**: CSS-only, no framework
- **Story template**: Standard structure for all components
  - Visuals (default, variants, states)
  - Code snippet (copy-paste ready)
  - Basic usage notes
- **Viewport presets**: Mobile (375px), Tablet (768px), Desktop (1024px), Wide (1440px)
- **Dark mode toggle**: Switch between light/dark in Storybook
- **Component template**: Reusable story structure
- **Output**: Storybook running at http://localhost:6006

**Story Structure** (80/20):
```typescript
// components/atoms/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/html';
import './button.css';

const meta: Meta = {
  title: 'Atoms/Button',
  render: (args) => `<button class="button button--${args.variant}">${args.label}</button>`,
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'danger'] },
    label: { control: 'text' }
  },
};

export default meta;

// Visual variants only
export const Default: StoryObj = { args: { variant: 'default', label: 'Click me' } };
export const Secondary: StoryObj = { args: { variant: 'secondary', label: 'Secondary' } };
export const Danger: StoryObj = { args: { variant: 'danger', label: 'Delete' } };

// Code snippet (shown in docs)
export const CodeExample: StoryObj = {
  render: () => `
    <!-- Copy-paste ready -->
    <button class="button">Default Button</button>
    <button class="button button--secondary">Secondary</button>
  `,
};
```

**Acceptance Criteria**:
- [ ] Storybook runs with `bun run storybook`
- [ ] Can view components in multiple viewports
- [ ] Dark mode toggle works in Storybook
- [ ] Story template is clear and consistent
- [ ] Code snippets are copy-paste ready
- [ ] Hot reload works during development
- [ ] Documentation builds in <10 seconds

**Estimate**: 5 hours

---

## Configuration Files

### `.storybook/main.ts`
```typescript
import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  framework: '@storybook/html-vite',
  stories: ['../components/**/*.stories.ts'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-themes',
  ],
  core: {
    disableTelemetry: true,
  },
};

export default config;
```

### `.storybook/preview.ts`
```typescript
import type { Preview } from '@storybook/html';
import '../components/_system/tokens.css';
import '../components/_system/architecture.css';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
        wide: { name: 'Wide', styles: { width: '1440px', height: '900px' } },
      },
    },
    themes: {
      default: 'light',
      list: [
        { name: 'Light', class: '', color: '#ffffff' },
        { name: 'Dark', class: 'dark', color: '#1a1a1a' },
      ],
    },
  },
};

export default preview;
```

---

## File Structure After Phase 1

```
agentstatic/
├── components/
│   ├── _system/                    # Design system (Phase 1)
│   │   ├── tokens.css             # Design tokens (~3KB)
│   │   ├── tokens.md              # Token documentation
│   │   ├── architecture.css       # Cascade layers (~1.5KB)
│   │   ├── dark-mode.css          # Dark mode support
│   │   └── README.md              # System overview
│   ├── atoms/                      # Added in Phase 2
│   ├── molecules/                  # Added in Phase 2
│   ├── organisms/                  # Added in Phase 3
│   └── index.css                  # Main component bundle
│
├── .storybook/                     # Storybook config (Phase 1)
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
│
├── bun.toml
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Integration with Phase 0

Phase 1 works with Phase 0's:
- **Build pipeline**: CSS is bundled by Phase 0's CSS bundler
- **Template engine**: Components will use tokens via CSS variables
- **Dark mode**: Template toggle button from Phase 0's base layout
- **Storybook**: Runs independently, also uses Phase 0's build pipeline

---

## Key Decisions (Reflecting All 17 Refinements)

| Decision | Choice | Why |
|----------|--------|-----|
| **Predefined Theme** | Beautiful defaults | Users get immediate value without customization |
| **Theme Customization** | CSS variables globally | Easy to customize, no per-page overrides |
| **Dark Mode** | System + manual toggle | Best UX (automatic + user control) |
| **Theme Consistency** | Global only | No per-page overrides (decision #9) |
| **CSS Architecture** | Cascade layers | Clean specificity management, no !important |
| **Color Tokens** | Light + dark pairs | Efficient dark mode support |
| **Storybook** | 80/20 (visuals + code) | Practical, maintainable documentation |
| **Runtime JS** | Minimal (dark mode toggle only) | Pure CSS components |
| **Accessibility** | Tokens + WCAG AA | Built-in from day one |

---

## Success Metrics

- [ ] Design tokens documented and accessible
- [ ] Light and dark mode complete and tested
- [ ] Cascade layers working without specificity conflicts
- [ ] Storybook running with dark mode toggle
- [ ] All tokens <5KB
- [ ] CSS bundle <50KB (empty of components)
- [ ] Zero !important flags in CSS
- [ ] Documentation complete for designers + developers

---

## Phase Gate (Before Moving to Phase 2)

Phase 1 must be complete before components are built:

**Must Have**:
- [ ] All design tokens finalized
- [ ] CSS architecture documented
- [ ] Dark mode system tested
- [ ] Storybook running and configured
- [ ] Token documentation clear
- [ ] CSS files optimized
- [ ] No hardcoded values in system files

Only then proceed to Phase 2.

---

## Open Questions

1. **Custom Theme Support**: Should users be able to completely replace the predefined theme?
   - *Decision*: No for Phase 0-7. Global CSS variable overrides sufficient. Full theming system in Phase 8+.

2. **Design Token Format**: Should tokens be exported to Figma, design tools?
   - *Decision*: Not in scope. CSS custom properties are the single source of truth.

3. **Additional Color Scales**: Should we support more color palettes (extended palette)?
   - *Decision*: No. Keep minimal. Users can add custom colors via CSS variables.

4. **Animation System**: Should we define standard animations/transitions?
   - *Decision*: Yes, include transition durations and easing. Animations (complex keyframes) deferred.

---

## Next Phase

**Phases 0 and 1 complete by end of Week 2**:
- Build pipeline fully operational
- Design system in place
- Development environment ready

**Phase 2** (Weeks 3-4):
- Build first 12-15 atoms and molecules
- Create Storybook stories for each
- Test theme system with real components

---

*Phase 1 Plan v2.0 (Refined) - October 24, 2025*
