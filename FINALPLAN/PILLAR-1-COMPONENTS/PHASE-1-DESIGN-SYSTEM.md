# Phase 1: Design System Foundation

**Duration**: 2 weeks | **Effort**: 25 hours | **Dependencies**: None

---

## Overview

This phase establishes the foundational design system that all components will build upon. This includes design tokens, CSS architecture, dark mode infrastructure, and the development environment.

**Key Principle**: Get the foundation right, and everything else becomes easier.

---

## Deliverables

### 1. Design Token System
Complete CSS custom property system defining:
- Color palette (light and dark modes)
- Spacing scale (consistent rhythm)
- Typography scale (font sizes, weights, line heights)
- Shadows and elevation
- Borders and radii
- Transitions and animations

### 2. CSS Architecture
Organized, scalable CSS structure:
- Cascade layers for specificity management
- BEM naming conventions
- Base styles and resets
- Utility classes
- Dark mode implementation

### 3. Development Environment
Working development setup:
- Storybook configured
- Build pipeline ready
- Hot module replacement
- CSS processing pipeline

### 4. Documentation
Clear guidelines for:
- Token usage
- CSS conventions
- Component structure
- Contribution guidelines

---

## Implementation Steps

### Step 1: Define Design Tokens (Day 1-2)

**File**: `components/_system/tokens.css`

```css
:root {
  /* ===========================================
     COLOR SYSTEM
     =========================================== */

  /* Brand Colors */
  --color-primary-50: #e6f2ff;
  --color-primary-100: #bae0ff;
  --color-primary-200: #7cc0ff;
  --color-primary-300: #36a3ff;
  --color-primary-400: #0080ff;
  --color-primary-500: #0066cc; /* Main brand */
  --color-primary-600: #0052a3;
  --color-primary-700: #003d7a;
  --color-primary-800: #002952;
  --color-primary-900: #001429;

  /* Neutral Colors */
  --color-gray-50: #f8f9fa;
  --color-gray-100: #f1f3f5;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Surface Colors (Light Mode) */
  --color-surface: var(--color-white);
  --color-surface-alt: var(--color-gray-50);
  --color-background: var(--color-gray-50);

  /* Text Colors (Light Mode) */
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);
  --color-text-disabled: var(--color-gray-400);

  /* ===========================================
     SPACING SYSTEM (8px base)
     =========================================== */

  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  --spacing-4xl: 6rem;     /* 96px */
  --spacing-5xl: 8rem;     /* 128px */

  /* ===========================================
     TYPOGRAPHY SYSTEM
     =========================================== */

  /* Font Families */
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-serif: Georgia, Cambria, 'Times New Roman', serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

  /* Font Sizes (Mobile First) */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  --font-size-7xl: 4.5rem;    /* 72px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* ===========================================
     BORDERS & RADII
     =========================================== */

  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;

  --radius-sm: 0.25rem;     /* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-full: 9999px;    /* Pill shape */

  /* ===========================================
     SHADOWS & ELEVATION
     =========================================== */

  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* ===========================================
     TRANSITIONS & ANIMATIONS
     =========================================== */

  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  --transition-slower: 500ms ease;

  /* ===========================================
     Z-INDEX SCALE
     =========================================== */

  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

### Step 2: Dark Mode Tokens (Day 3)

**File**: `components/_system/dark-mode.css`

```css
/* System preference dark mode */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Surface Colors (Dark Mode) */
    --color-surface: var(--color-gray-900);
    --color-surface-alt: var(--color-gray-800);
    --color-background: #0a0a0a;

    /* Text Colors (Dark Mode) */
    --color-text: var(--color-gray-50);
    --color-text-muted: var(--color-gray-400);
    --color-text-disabled: var(--color-gray-600);

    /* Borders (Dark Mode) */
    --border-color: var(--color-gray-700);

    /* Shadows (Dark Mode - more subtle) */
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.2);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
    /* ... adjust all shadows ... */
  }
}

/* Manual dark mode override */
:root.dark {
  /* Same overrides as media query */
}
```

### Step 3: CSS Architecture (Day 4-5)

**File**: `components/_system/architecture.css`

```css
/* ===========================================
   CASCADE LAYERS
   =========================================== */

@layer reset, base, components, utilities, overrides;

/* ===========================================
   RESET LAYER
   =========================================== */

@layer reset {
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
}

/* ===========================================
   BASE LAYER
   =========================================== */

@layer base {
  :root {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
    color: var(--color-text);
    background-color: var(--color-background);
  }

  /* Typography */
  h1 {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }

  h2 {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  /* ... rest of base styles ... */
}
```

### Step 4: Storybook Configuration (Day 6-7)

**File**: `.storybook/main.js`

```javascript
export default {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  }
};
```

**File**: `.storybook/preview.js`

```javascript
import '../components/_system/tokens.css';
import '../components/_system/architecture.css';
import '../components/_system/dark-mode.css';

export const parameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: { width: '375px', height: '667px' }
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '768px', height: '1024px' }
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1440px', height: '900px' }
      }
    }
  },
  darkMode: {
    darkClass: 'dark',
    lightClass: 'light',
    stylePreview: true
  }
};
```

### Step 5: Build Pipeline Integration (Day 8-9)

**File**: `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import { nunjucks } from 'vite-plugin-nunjucks';

export default defineConfig({
  css: {
    postcss: './postcss.config.js'
  },
  plugins: [
    nunjucks()
  ],
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
```

### Step 6: Documentation (Day 10)

Create comprehensive documentation for:
- Design token usage guide
- CSS architecture patterns
- Component development guide
- Dark mode implementation
- Accessibility guidelines

---

## Testing & Validation

### Design Token Tests
- [ ] All tokens defined and documented
- [ ] Color contrast meets WCAG AA
- [ ] Spacing creates consistent rhythm
- [ ] Typography scales properly

### Dark Mode Tests
- [ ] Automatic switching works
- [ ] Manual toggle works
- [ ] All colors have dark variants
- [ ] Contrast remains accessible

### Architecture Tests
- [ ] Cascade layers work correctly
- [ ] BEM naming consistent
- [ ] No specificity battles
- [ ] CSS validates

### Environment Tests
- [ ] Storybook loads
- [ ] Hot reload works
- [ ] Build completes
- [ ] CSS processes correctly

---

## Success Criteria

This phase is complete when:

1. **Tokens Complete** ✓
   - All token categories defined
   - Light and dark modes working
   - Documentation complete

2. **Architecture Solid** ✓
   - Cascade layers established
   - BEM conventions documented
   - Base styles implemented

3. **Environment Ready** ✓
   - Storybook configured
   - Build pipeline working
   - Development workflow smooth

4. **Tests Pass** ✓
   - Color contrast validated
   - Dark mode tested
   - Build successful

---

## Common Issues & Solutions

### Issue: Dark mode flash on load
**Solution**: Add blocking script to `<head>`:
```html
<script>
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Issue: Token inheritance complex
**Solution**: Use CSS custom property fallbacks:
```css
color: var(--color-brand, var(--color-primary-500, #0066cc));
```

### Issue: Cascade layer order issues
**Solution**: Define layer order explicitly at start of main CSS:
```css
@layer reset, base, components, utilities, overrides;
```

---

## Next Phase

After completing this phase, proceed to [Phase 2: Basic Components](./PHASE-2-BASIC-COMPONENTS.md) to begin building atoms and molecules using this foundation.

---

*Foundation work is invisible when done right, but impossible to ignore when done wrong.*