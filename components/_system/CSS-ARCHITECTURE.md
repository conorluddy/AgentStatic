# CSS Architecture Guide

## Overview

AgentStatic uses a modern CSS architecture built on **Cascade Layers** and **Component-Scoped Naming**. This eliminates the need for verbose naming conventions like BEM while maintaining predictable specificity and excellent maintainability.

---

## Table of Contents

1. [Cascade Layers](#cascade-layers)
2. [Component-Scoped Naming](#component-scoped-naming)
3. [File Organization](#file-organization)
4. [Best Practices](#best-practices)
5. [Common Patterns](#common-patterns)
6. [Migration from BEM](#migration-from-bem)

---

## Cascade Layers

### What are Cascade Layers?

Cascade Layers (`@layer`) are a modern CSS feature that allows you to explicitly control specificity without relying on selector complexity or `!important`. Layers create isolated contexts where styles can exist without conflicting with other layers.

### Layer Hierarchy

AgentStatic uses 5 layers, defined in `layers.css`:

```css
@layer reset, base, components, utilities, overrides;
```

**Order matters!** Layers declared first have the lowest priority. Here's the hierarchy:

| Layer | Priority | Purpose | Example |
|-------|----------|---------|---------|
| `reset` | Lowest | Browser normalization | Box model reset, margin/padding removal |
| `base` | Low | Element defaults | Typography, form elements, links |
| `components` | Medium | Component styles | Buttons, cards, heroes, navigation |
| `utilities` | High | Helper classes | `.sr-only`, `.text-center`, spacing utilities |
| `overrides` | Highest | User customizations | Theme overrides, one-off adjustments |

### Key Benefits

1. **Predictable Specificity**: Layers determine priority, not selector complexity
2. **No !important Needed**: Layer order handles priority naturally
3. **Component Isolation**: Each component's styles stay in the `components` layer
4. **Easy Overrides**: Users can override in the `overrides` layer without fighting specificity

### Example

```css
/* reset.css */
@layer reset {
  button {
    background: none;
    border: none;
  }
}

/* base.css */
@layer base {
  button {
    font-weight: 500;
    border-radius: 0.375rem;
  }
}

/* button.css */
@layer components {
  .button {
    padding: 0.5rem 1rem;
    background: blue;
    color: white;
  }
}

/* utilities.css */
@layer utilities {
  .rounded-full {
    border-radius: 9999px;
  }
}
```

Even though `button` in `reset` is more specific than `.button` in `components`, the component layer wins because it comes later in the layer order. The utility class `.rounded-full` will override the button's border-radius because utilities come after components.

---

## Component-Scoped Naming

### Philosophy

**NO BEM!** We use simple, flat class names scoped to each component.

**Why?**
- Cascade layers handle specificity, so we don't need BEM's verbose naming
- Component files are isolated, so `.button` in `button.css` won't conflict with `.card` in `card.css`
- Simpler names = cleaner HTML and easier to read
- Modern CSS features (`:has()`, `:not()`, attribute selectors) provide all the scoping we need

### Naming Convention

```css
/* Component name (noun) */
.component-name { }

/* Component parts (noun + descriptor) */
.component-name-part { }
.component-name-subpart { }

/* Variants (adjective modifiers) */
.component-name-variant { }

/* States (attribute selectors preferred) */
.component-name[data-state="value"] { }
.component-name[data-loading] { }
.component-name:disabled { }
```

### Real Examples

#### Button Component (`atoms/button/button.css`)

```css
@layer components {
  /* Base button */
  .button {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  /* Button parts */
  .button-text {
    flex: 1;
  }

  .button-icon {
    inline-size: 1.25rem;
    block-size: 1.25rem;
  }

  /* Variants (additional classes) */
  .button-primary {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  .button-secondary {
    background: var(--color-gray-200);
    color: var(--color-gray-900);
  }

  .button-large {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
  }

  .button-small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }

  /* States (data attributes or pseudo-classes) */
  .button[data-loading] {
    opacity: 0.7;
    cursor: wait;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**HTML Usage:**

```html
<!-- Primary button -->
<button class="button button-primary">
  <span class="button-text">Click Me</span>
</button>

<!-- Large secondary button with icon -->
<button class="button button-secondary button-large">
  <svg class="button-icon">...</svg>
  <span class="button-text">Save</span>
</button>

<!-- Loading state -->
<button class="button button-primary" data-loading>
  <span class="button-text">Saving...</span>
</button>
```

#### Card Component (`molecules/card/card.css`)

```css
@layer components {
  .card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .card-image {
    inline-size: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .card-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-block-end: var(--spacing-sm);
  }

  .card-description {
    color: var(--color-text-muted);
    margin-block-end: var(--spacing-md);
  }

  .card-actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  /* Variants */
  .card-horizontal {
    flex-direction: row;
  }

  .card-horizontal .card-image {
    inline-size: 40%;
    aspect-ratio: 1;
  }

  .card-featured {
    box-shadow: var(--shadow-lg);
    border: 2px solid var(--color-primary-500);
  }
}
```

**HTML Usage:**

```html
<article class="card">
  <img class="card-image" src="..." alt="...">
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Card description text...</p>
    <div class="card-actions">
      <button class="button button-primary">Action</button>
    </div>
  </div>
</article>
```

#### Hero Section (`organisms/hero/hero.css`)

```css
@layer components {
  .hero {
    display: grid;
    gap: var(--spacing-2xl);
    padding-block: var(--spacing-3xl);
    padding-inline: var(--spacing-lg);
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .hero-title {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-text-muted);
  }

  .hero-actions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  .hero-image {
    inline-size: 100%;
    border-radius: var(--radius-xl);
  }

  /* Variants */
  .hero-centered {
    text-align: center;
    justify-items: center;
  }

  .hero-split {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-split {
      grid-template-columns: 1fr;
    }
  }
}
```

---

## File Organization

### Directory Structure

```
components/
├── _system/
│   ├── layers.css              # Layer definitions (import first!)
│   ├── reset.css               # Browser reset (@layer reset)
│   ├── base.css                # Element defaults (@layer base)
│   ├── utilities.css           # Helper classes (@layer utilities)
│   ├── tokens.css              # Design tokens (CSS variables)
│   ├── dark-mode.css           # Dark mode overrides
│   └── CSS-ARCHITECTURE.md     # This file
│
├── atoms/
│   ├── button/
│   │   ├── button.css          # Button component styles
│   │   ├── button.njk          # Nunjucks template
│   │   └── button.stories.ts   # Storybook stories
│   └── [other-atoms]/
│
├── molecules/
│   ├── card/
│   │   ├── card.css
│   │   ├── card.njk
│   │   └── card.stories.ts
│   └── [other-molecules]/
│
├── organisms/
│   ├── hero/
│   │   ├── hero.css
│   │   ├── hero.njk
│   │   └── hero.stories.ts
│   └── [other-organisms]/
│
└── index.css                   # Main entry point
```

### Main Entry Point (`components/index.css`)

```css
/**
 * AgentStatic Component Library
 * Main CSS entry point
 */

/* 1. Define cascade layers (MUST be first!) */
@import './_system/layers.css';

/* 2. Design tokens */
@import './_system/tokens.css';
@import './_system/dark-mode.css';

/* 3. Foundation styles */
@import './_system/reset.css';
@import './_system/base.css';

/* 4. Components (in @layer components) */
@import './atoms/button/button.css';
@import './atoms/input/input.css';
/* ... other atoms ... */

@import './molecules/card/card.css';
@import './molecules/form-group/form-group.css';
/* ... other molecules ... */

@import './organisms/hero/hero.css';
@import './organisms/navigation/navigation.css';
/* ... other organisms ... */

/* 5. Utilities */
@import './_system/utilities.css';
```

### Component File Structure

Each component lives in its own directory with related files:

```
component-name/
├── component-name.css          # Styles (@layer components)
├── component-name.njk          # Nunjucks template
├── component-name.stories.ts   # Storybook stories
├── component-name.schema.json  # JSON schema (Phase 5)
└── README.md                   # Component documentation
```

---

## Best Practices

### DO ✅

1. **Use Simple, Descriptive Names**
   ```css
   .button { }          /* Good */
   .btn { }             /* Avoid abbreviations */
   ```

2. **Scope Parts to Component**
   ```css
   .card-title { }      /* Good - clear parent relationship */
   .title { }           /* Bad - too generic */
   ```

3. **Use Data Attributes for States**
   ```css
   .button[data-loading] { }    /* Good - semantic */
   .button.loading { }          /* Also fine */
   .button--loading { }         /* No BEM! */
   ```

4. **Wrap All Component Styles in @layer**
   ```css
   @layer components {
     .component { }
   }
   ```

5. **Use CSS Custom Properties**
   ```css
   .button {
     padding: var(--spacing-sm);
     color: var(--color-primary-600);
   }
   ```

6. **Use Logical Properties**
   ```css
   .card {
     padding-inline: var(--spacing-md);    /* Good */
     padding-left: var(--spacing-md);      /* Avoid */
   }
   ```

### DON'T ❌

1. **Don't Use BEM**
   ```css
   .button__text { }           /* No */
   .button--primary { }        /* No */
   .button-text { }            /* Yes */
   .button-primary { }         /* Yes */
   ```

2. **Don't Nest Too Deeply**
   ```css
   /* Bad - over-specific */
   .card .card-content .card-title span { }

   /* Good - flat and simple */
   .card-title-highlight { }
   ```

3. **Don't Fight the Cascade**
   ```css
   /* Bad - unnecessary !important */
   .button {
     color: blue !important;
   }

   /* Good - use layer order */
   @layer overrides {
     .button {
       color: blue;
     }
   }
   ```

4. **Don't Hardcode Values**
   ```css
   /* Bad */
   .button {
     padding: 8px 16px;
     color: #0066cc;
   }

   /* Good */
   .button {
     padding: var(--spacing-sm) var(--spacing-md);
     color: var(--color-primary-600);
   }
   ```

---

## Common Patterns

### Variant Pattern

Use additional classes for variants:

```css
/* Base component */
.button { }

/* Size variants */
.button-small { }
.button-large { }

/* Style variants */
.button-primary { }
.button-secondary { }
.button-ghost { }
```

```html
<button class="button button-primary button-large">Click Me</button>
```

### State Pattern

Use data attributes or pseudo-classes:

```css
/* Loading state */
.button[data-loading] { }

/* Active state */
.button[aria-pressed="true"] { }

/* Hover state */
.button:hover:not(:disabled) { }
```

### Responsive Pattern

Use container queries when possible, media queries when needed:

```css
.card {
  /* Mobile first */
  display: flex;
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card-horizontal {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1440px) {
  .card {
    padding: var(--spacing-2xl);
  }
}
```

### Composition Pattern

Components can contain other components:

```css
/* Hero contains buttons */
.hero { }
.hero .button {
  /* Hero-specific button adjustments */
  min-inline-size: 200px;
}
```

```html
<section class="hero">
  <div class="hero-actions">
    <button class="button button-primary">Get Started</button>
    <button class="button button-secondary">Learn More</button>
  </div>
</section>
```

---

## Migration from BEM

If you're coming from BEM, here's how the naming translates:

| BEM | AgentStatic | Example |
|-----|-------------|---------|
| `.block` | `.component` | `.card` |
| `.block__element` | `.component-part` | `.card-title` |
| `.block--modifier` | `.component-variant` | `.card-featured` |
| `.block__element--modifier` | `.component-part-variant` or data attribute | `.card-title-large` or `.card-title[data-size="large"]` |

**BEM Example:**
```html
<div class="card card--featured">
  <h3 class="card__title card__title--large">Title</h3>
  <p class="card__description">Text</p>
  <div class="card__actions">
    <button class="button button--primary button--large">Action</button>
  </div>
</div>
```

**AgentStatic Example:**
```html
<div class="card card-featured">
  <h3 class="card-title card-title-large">Title</h3>
  <p class="card-description">Text</p>
  <div class="card-actions">
    <button class="button button-primary button-large">Action</button>
  </div>
</div>
```

---

## Browser Support

**Cascade Layers** are supported in all modern browsers:
- Chrome 99+ (March 2022)
- Firefox 97+ (February 2022)
- Safari 15.4+ (March 2022)
- Edge 99+ (March 2022)

This covers 95%+ of global browser usage. If you need to support older browsers, cascade layers gracefully degrade (styles still work, just without layer isolation).

---

## Additional Resources

- [MDN: CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [CSS Tricks: A Complete Guide to CSS Cascade Layers](https://css-tricks.com/css-cascade-layers/)
- [Web.dev: CSS Cascade Layers](https://web.dev/articles/css-cascade-layers)

---

**Last Updated**: Phase 1 Implementation
**Maintained By**: AgentStatic Core Team
