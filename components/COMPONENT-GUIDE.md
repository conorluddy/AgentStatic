# AgentStatic Component Guide

Complete guide to creating, organizing, and maintaining components in AgentStatic.

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Component Types](#component-types)
4. [Naming Conventions](#naming-conventions)
5. [File Structure](#file-structure)
6. [Creating Components](#creating-components)
7. [CSS Architecture](#css-architecture)
8. [Nunjucks Templates](#nunjucks-templates)
9. [Component Schemas](#component-schemas)
10. [Storybook Stories](#storybook-stories)
11. [Accessibility](#accessibility)
12. [Responsive Design](#responsive-design)
13. [Dark Mode](#dark-mode)
14. [Best Practices](#best-practices)

---

## Overview

AgentStatic uses **Atomic Design** methodology to organize UI components:
- **Atoms**: Basic building blocks (buttons, inputs, headings)
- **Molecules**: Simple combinations of atoms (cards, form groups)
- **Organisms**: Complex sections (headers, heroes, footers)

### Key Principles

1. **Component-Scoped Naming**: Use simple, flat class names (NOT BEM)
2. **Pure CSS**: No preprocessors, use modern CSS features
3. **Nunjucks Templates**: Logic-light, composable macros
4. **Rich Schemas**: Detailed metadata for AI discovery
5. **WCAG AA**: Accessibility compliance required

---

## Directory Structure

```
components/
├── atoms/                  # Basic building blocks
│   ├── button/
│   ├── heading/
│   └── input/
│
├── molecules/              # Compound components
│   ├── card/
│   ├── form-group/
│   └── nav-item/
│
├── organisms/              # Complete page sections
│   ├── header/
│   ├── hero/
│   └── footer/
│
├── _templates/             # Component templates
│   ├── atom.template/
│   ├── molecule.template/
│   └── organism.template/
│
├── _config/                # Configuration
│   └── component.schema.json
│
├── _system/                # Design system
│   ├── tokens.css          # Design tokens
│   ├── layers.css          # Cascade layers
│   └── reset.css           # CSS reset
│
└── COMPONENT-GUIDE.md      # This file
```

### Component File Structure

Each component has its own directory with these files:

```
button/
├── button.css              # Component styles (pure CSS)
├── button.njk              # Nunjucks template macro
├── button.schema.json      # JSON Schema with metadata
├── button.stories.ts       # Storybook stories
└── README.md              # Component documentation
```

---

## Component Types

### Atoms

**Purpose**: Basic, indivisible UI elements

**Examples**: button, input, heading, icon, image, link

**Characteristics**:
- Single-purpose
- No dependencies on other components
- Highly reusable
- Simple props

**Template**: `components/_templates/atom.template/`

### Molecules

**Purpose**: Simple combinations of atoms with specific functionality

**Examples**: card, form-group, nav-item, search-bar

**Characteristics**:
- Composed of 2-5 atoms
- Functional grouping
- Moderate complexity
- Can be reused across organisms

**Template**: `components/_templates/molecule.template/`

### Organisms

**Purpose**: Complex page sections combining molecules and atoms

**Examples**: header, hero, footer, feature-grid, testimonials

**Characteristics**:
- Complete page sections
- Combine multiple molecules
- Layout-aware
- Context-specific

**Template**: `components/_templates/organism.template/`

---

## Naming Conventions

AgentStatic uses **component-scoped flat naming** (NOT BEM).

### Why Not BEM?

BEM (Block Element Modifier) syntax like `.button__text` and `.button--primary` is verbose. With CSS cascade layers, we can use simpler names:

```css
/* ❌ BEM Style (Don't use) */
.button { }
.button__text { }
.button__icon { }
.button--primary { }
.button--large { }

/* ✅ Component-Scoped Style (Use this) */
.button { }
.button-text { }
.button-icon { }
.button-primary { }
.button-lg { }
```

### Naming Rules

#### File Names (kebab-case)
```
button.css
hero-section.njk
feature-card.stories.ts
```

#### CSS Classes (component-scoped)
```css
/* Base component */
.button { }

/* Child elements */
.button-text { }
.button-icon { }

/* Variants */
.button-primary { }
.button-secondary { }

/* Sizes */
.button-sm { }
.button-lg { }

/* States (use pseudo-classes) */
.button:hover { }
.button:disabled { }
```

#### Nunjucks Macros (camelCase)
```njk
{% macro button(props) %}
{% macro heroSection(props) %}
{% macro featureCard(props) %}
```

#### TypeScript/JavaScript (PascalCase)
```typescript
export const Button: Story = { };
export const HeroSection: Story = { };
```

### Component Name Examples

| Component | Files | CSS Class | Macro | TypeScript |
|-----------|-------|-----------|-------|------------|
| Button | `button.*` | `.button` | `button()` | `Button` |
| Hero Section | `hero-section.*` | `.hero-section` | `heroSection()` | `HeroSection` |
| Feature Card | `feature-card.*` | `.feature-card` | `featureCard()` | `FeatureCard` |

---

## File Structure

### component.css

Pure CSS styles using cascade layers:

```css
/* components/atoms/button/button.css */
@layer components {
  .button {
    /* Styles using design tokens */
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-primary);
    color: white;
  }

  .button-text {
    display: inline-block;
  }

  .button-primary {
    background: var(--color-primary);
  }
}
```

### component.njk

Nunjucks macro with props:

```njk
{% macro button(props = {}) %}
  {% set defaults = {
    variant: 'default',
    size: 'md'
  } %}
  {% set config = defaults | merge(props) %}

  <button class="button button-{{ config.variant }}">
    <span class="button-text">{{ config.text }}</span>
  </button>
{% endmacro %}
```

### component.schema.json

JSON Schema with rich metadata:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "components/atoms/button/schema",
  "title": "Button",
  "category": "atom",
  "metadata": {
    "displayName": "Button",
    "description": "Interactive button component",
    "tags": ["atom", "interactive", "cta"],
    "accessibility": {
      "wcagLevel": "AA",
      "keyboardNavigable": true
    }
  }
}
```

### component.stories.ts

Storybook stories for documentation:

```typescript
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: { variant: 'default' },
  render: renderComponent,
};
```

### README.md

Component documentation with examples.

---

## Creating Components

### Using the Generator Script

The fastest way to create a component:

```bash
# Create an atom
node scripts/new-component.js atom button

# Create a molecule
node scripts/new-component.js molecule card

# Create an organism
node scripts/new-component.js organism hero-section
```

This will:
1. Create the component directory
2. Copy template files
3. Replace placeholders with your component name
4. Set up proper file structure

### Manual Creation

If you prefer manual creation:

1. **Copy the template**:
   ```bash
   cp -r components/_templates/atom.template components/atoms/button
   ```

2. **Rename files**:
   ```bash
   cd components/atoms/button
   mv component.css button.css
   mv component.njk button.njk
   # ... rename all files
   ```

3. **Replace placeholders**:
   - `COMPONENT_NAME_KEBAB` → `button`
   - `COMPONENT_NAME_PASCAL` → `Button`
   - `COMPONENT_NAME_CAMEL` → `button`
   - `COMPONENT_TYPE` → `atom`

---

## CSS Architecture

### Cascade Layers

All component CSS uses `@layer components`:

```css
@layer components {
  .button {
    /* Component styles */
  }
}
```

**Layer order** (defined in `_system/layers.css`):
1. `reset` - CSS reset
2. `base` - Base styles
3. `components` - Component styles (your code here)
4. `utilities` - Utility classes
5. `overrides` - User overrides

### Design Tokens

Use semantic design tokens from `_system/tokens.css`:

```css
.button {
  /* ✅ Use tokens */
  padding: var(--spacing-md);
  background: var(--color-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);

  /* ❌ Don't hardcode values */
  padding: 16px;
  background: #3b82f6;
  border-radius: 8px;
  transition: all 200ms ease;
}
```

### Component Custom Properties

Define component-specific CSS variables:

```css
.button {
  --button-padding-y: var(--spacing-sm);
  --button-padding-x: var(--spacing-md);

  padding: var(--button-padding-y) var(--button-padding-x);
}

/* Variants override custom properties */
.button-sm {
  --button-padding-y: var(--spacing-xs);
  --button-padding-x: var(--spacing-sm);
}
```

### States

Use CSS pseudo-classes:

```css
.button:hover {
  opacity: 0.9;
}

.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.button:active {
  transform: scale(0.98);
}

.button:disabled,
.button[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Nunjucks Templates

### Macro Structure

```njk
{% macro componentName(props = {}) %}
  {# 1. Define defaults #}
  {% set defaults = {
    variant: 'default',
    size: 'md',
    className: '',
    attributes: {},
    a11y: {}
  } %}

  {# 2. Merge with provided props #}
  {% set config = defaults | merge(props) %}

  {# 3. Build class list #}
  {% set classList = [
    'component',
    'component-' + config.variant,
    config.className
  ] | join(' ') | trim %}

  {# 4. Render HTML #}
  <div class="{{ classList }}">
    {{ config.content | safe }}
  </div>
{% endmacro %}
```

### Props Pattern

All components accept:

```typescript
{
  // Visual variants
  variant?: string;
  size?: string;

  // Common attributes
  id?: string;
  className?: string;
  attributes?: Record<string, string>;

  // Accessibility
  a11y?: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    role?: string;
  };

  // Component-specific props
  // ...
}
```

### Using Other Components

Import and use other component macros:

```njk
{# Import atoms #}
{% from "atoms/button/button.njk" import button %}
{% from "atoms/heading/heading.njk" import heading %}

{% macro card(props) %}
  <div class="card">
    {{ heading({ level: 2, text: props.title }) }}
    {{ button({ text: "Learn More" }) }}
  </div>
{% endmacro %}
```

### Caller Content

Support custom content with `caller()`:

```njk
{% macro card(props) %}
  <div class="card">
    {{ props.content | safe if props.content }}
    {{ caller() if caller }}
  </div>
{% endmacro %}

{# Usage #}
{% call card({ variant: 'primary' }) %}
  <p>Custom content here</p>
{% endcall %}
```

---

## Component Schemas

### Schema Structure

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "components/atoms/button/schema",
  "title": "Button",
  "type": "object",
  "category": "atom",
  "metadata": {
    "displayName": "Button",
    "description": "Interactive button for actions",
    "tags": ["atom", "interactive", "cta"],
    "accessibility": {
      "wcagLevel": "AA",
      "keyboardNavigable": true,
      "screenReaderFriendly": true
    },
    "responsive": {
      "breakpoints": ["mobile", "tablet", "desktop"],
      "behavior": "fluid"
    },
    "darkMode": true,
    "usageExamples": [
      {
        "title": "Primary CTA",
        "code": "{{ button({ variant: 'primary', text: 'Get Started' }) }}"
      }
    ]
  },
  "properties": {
    "variant": {
      "type": "string",
      "enum": ["default", "primary", "secondary"],
      "default": "default"
    }
  }
}
```

### Metadata Fields

#### Required
- `displayName`: Human-readable name
- `description`: Detailed description for AI discovery
- `category`: "atom", "molecule", or "organism"

#### Recommended
- `tags`: Searchable keywords
- `composedOf`: Child component paths
- `accessibility`: WCAG level, features
- `responsive`: Breakpoint support
- `darkMode`: Boolean support flag
- `usageExamples`: Code snippets

---

## Storybook Stories

### Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: renderComponent,
};
```

### Essential Stories

Every component should have:

1. **Default**: Default state
2. **All Variants**: Show all variants
3. **All Sizes**: Show all sizes
4. **Dark Mode**: Dark mode example
5. **States**: Hover, focus, disabled

### Organism Stories

Organisms need `fullscreen` layout:

```typescript
const meta: Meta = {
  parameters: {
    layout: 'fullscreen', // Important for organisms
  },
};
```

---

## Accessibility

### WCAG AA Requirements

All components must meet WCAG AA:

- **Color Contrast**: 4.5:1 for text, 3:1 for UI
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Indicators**: Visible focus states

### Focus Styles

Always include visible focus:

```css
.component:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

### ARIA Attributes

Use semantic HTML first, ARIA second:

```njk
{# ✅ Semantic HTML preferred #}
<button type="button">Click me</button>

{# ✅ ARIA when needed #}
<div role="button" tabindex="0" aria-label="Close">×</div>

{# ❌ Avoid redundant ARIA #}
<button role="button" aria-label="Click me">Click me</button>
```

### Common ARIA Props

```njk
{% macro component(props) %}
  <div
    {% if props.a11y.role %}role="{{ props.a11y.role }}"{% endif %}
    {% if props.a11y.ariaLabel %}aria-label="{{ props.a11y.ariaLabel }}"{% endif %}
    {% if props.a11y.ariaDescribedBy %}aria-describedby="{{ props.a11y.ariaDescribedBy }}"{% endif %}
  >
  </div>
{% endmacro %}
```

---

## Responsive Design

### Mobile-First Approach

Start with mobile styles, enhance for larger screens:

```css
/* Mobile (default) */
.component {
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
}

/* Tablet (768px+) */
@media (min-width: 48em) {
  .component {
    padding: var(--spacing-lg);
    font-size: var(--font-size-base);
  }
}

/* Desktop (1440px+) */
@media (min-width: 90em) {
  .component {
    padding: var(--spacing-xl);
    font-size: var(--font-size-lg);
  }
}
```

### Breakpoints

Standard breakpoints:
- **Mobile**: 375px (default)
- **Tablet**: 768px (`48em`)
- **Desktop**: 1440px (`90em`)

### Container Queries

Use when component size matters more than viewport:

```css
@container (min-width: 600px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## Dark Mode

### Automatic Dark Mode

Components automatically adapt using semantic tokens:

```css
.component {
  /* Tokens automatically switch in dark mode */
  color: var(--color-text);
  background: var(--color-background);
}

/* Optional: explicit dark mode overrides */
@media (prefers-color-scheme: dark) {
  .component {
    /* Dark mode specific adjustments */
  }
}
```

### Testing Dark Mode

In Storybook:

```typescript
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
```

---

## Best Practices

### DO

✅ Use component-scoped flat naming (`.button-text`, not `.button__text`)
✅ Use design tokens for all values
✅ Support dark mode automatically
✅ Meet WCAG AA standards
✅ Test with keyboard navigation
✅ Provide rich schema metadata
✅ Write comprehensive stories
✅ Document usage examples
✅ Use CSS cascade layers
✅ Keep components focused and single-purpose

### DON'T

❌ Use BEM syntax (`.component__element--modifier`)
❌ Hardcode values (use tokens)
❌ Use preprocessors (pure CSS only)
❌ Forget accessibility
❌ Skip responsive design
❌ Create overly complex atoms
❌ Mix concerns across atomic levels
❌ Forget to test in Storybook
❌ Skip schema metadata
❌ Use global styles (use layers)

### Component Checklist

Before considering a component complete:

- [ ] CSS uses component-scoped naming
- [ ] All values use design tokens
- [ ] Styles in `@layer components`
- [ ] Nunjucks macro with proper props
- [ ] JSON Schema with rich metadata
- [ ] Storybook stories (default, variants, sizes, dark mode)
- [ ] README with usage examples
- [ ] WCAG AA compliant
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Visible focus states
- [ ] Mobile-first responsive
- [ ] Dark mode support
- [ ] Reduced motion respected
- [ ] High contrast support

---

## Additional Resources

### Project Documentation
- `/SPEC/README.md` - Project specifications
- `/SPEC/PILLAR-1-COMPONENTS/` - Component pillar docs
- `/CODESTYLE.md` - Code style guide
- `/SPEC/DECISIONS.md` - Architectural decisions

### External Resources
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [JSON Schema Documentation](https://json-schema.org/)
- [Storybook Documentation](https://storybook.js.org/docs)

---

## Getting Help

### Common Issues

**Q: Should I use BEM syntax?**
A: No. Use component-scoped flat naming (`.button-text`, not `.button__text`).

**Q: Can I use Sass/Less?**
A: No. Use pure CSS with modern features (custom properties, cascade layers, etc.).

**Q: How do I handle component variants?**
A: Use modifier classes (`.button-primary`) or custom properties.

**Q: Do I need to support dark mode?**
A: Yes. Use semantic tokens that automatically adapt.

**Q: What accessibility level is required?**
A: WCAG AA minimum for all components.

---

## Changelog

### Version 1.0.0 (Phase 1)
- Initial component structure
- Atom, molecule, organism templates
- Component generator script
- Base schema definitions
- Component-scoped naming convention
- Pure CSS architecture
- Nunjucks macro patterns
