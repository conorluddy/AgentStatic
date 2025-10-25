# Phase 2: Basic Components (Atoms & Molecules)

**Duration**: 2 weeks | **Effort**: 40 hours | **Dependencies**: Phase 1 complete

---

## Overview

This phase implements the foundational building blocks of the design system: 8 atom components and 7 molecule components. These 15 components form the core vocabulary for all higher-level compositions.

**Key Principle**: Build robust, accessible primitives that compose predictably.

---

## Goals

### Primary Objectives
1. Implement 8 atomic components (buttons, inputs, text elements)
2. Implement 7 molecular components (cards, form fields, navigation)
3. Achieve 100% WCAG AA compliance for all components
4. Create comprehensive Storybook stories
5. Maintain CSS budget <15KB (cumulative with Phase 1)

### Quality Standards
- All components keyboard accessible
- All components work in dark mode
- All components responsive (mobile-first)
- All props validated against schemas
- All variants tested and documented

---

## Component Inventory

### Atoms to Implement (8 components)

1. **Button** - Interactive button for actions and CTAs
2. **Input** - Text input field with validation states
3. **Link** - Navigation and external links
4. **Label** - Form labels and identifiers
5. **Badge** - Status indicators and tags
6. **Icon** - SVG icon wrapper
7. **Heading** - Semantic headings (h1-h6)
8. **Text** - Paragraph and inline text

### Molecules to Implement (7 components)

1. **Card** - Content container with image, text, and actions
2. **Form Field** - Label + input + helper/error message
3. **Button Group** - Multiple buttons in a group
4. **Link List** - Navigation list of links
5. **Media Object** - Image + text side-by-side
6. **Stat** - Number with label for metrics
7. **Alert** - Notice/warning/error message box

---

## Implementation Order

### Week 1: Atoms (Days 1-5)

**Day 1-2: Core Interactive Atoms**
- Button (all variants, sizes, states)
- Link (internal, external, styles)

**Day 3-4: Form Atoms**
- Input (text, email, password, with states)
- Label (required indicator, help text)

**Day 5: Display Atoms**
- Badge (variants, sizes)
- Icon (wrapper component)
- Heading (h1-h6 with proper scaling)
- Text (paragraph, inline variants)

### Week 2: Molecules (Days 6-10)

**Day 6-7: Content Molecules**
- Card (image + content + actions)
- Media Object (flexible image + text)

**Day 8-9: Form Molecules**
- Form Field (label + input + validation)
- Button Group (primary + secondary actions)

**Day 10: Utility Molecules**
- Link List (navigation lists)
- Stat (metric display)
- Alert (notifications and messages)

---

## Detailed Component Specifications

## ATOMS

### 1. Button Component

**Reference**: See `/SPEC/P1-COMPONENT-SPECS.md` lines 11-161 for full specification

#### Implementation Steps

**Step 1: Create Directory Structure**
```bash
mkdir -p /components/atoms/button
touch /components/atoms/button/button.njk
touch /components/atoms/button/button.css
touch /components/atoms/button/button.schema.json
touch /components/atoms/button/button.stories.ts
```

**Step 2: Implement Template** (`button.njk`)
```njk
{#
  Button Component
  Category: Atom
  Description: Interactive button element for actions and CTAs
#}

{% set tag = 'a' if href else 'button' %}
{% set variantClass = 'button--' + (variant | default('primary')) %}
{% set sizeClass = 'button--' + (size | default('md')) %}

<{{ tag }}
  class="button {{ variantClass }} {{ sizeClass }}{% if fullWidth %} button--full-width{% endif %}"
  {% if not href %}type="button"{% else %}href="{{ href }}"{% endif %}
  {% if disabled %}disabled aria-disabled="true"{% endif %}
  {% if ariaLabel %}aria-label="{{ ariaLabel }}"{% endif %}
>
  {% if iconStart %}
  <svg class="button__icon button__icon--start" aria-hidden="true">
    {{ iconStart | safe }}
  </svg>
  {% endif %}

  <span class="button__text">{{ text }}</span>

  {% if iconEnd %}
  <svg class="button__icon button__icon--end" aria-hidden="true">
    {{ iconEnd | safe }}
  </svg>
  {% endif %}
</{{ tag }}>
```

**Step 3: Implement Styles** (`button.css`)
```css
/* ============================================================================
   Button Component
   Category: Atoms
   Size Budget: <500 bytes (gzipped)
   ============================================================================ */

@layer components {
  .button {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    /* Sizing */
    padding: var(--spacing-sm) var(--spacing-md);
    min-height: 44px; /* Touch target minimum */

    /* Typography */
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    text-decoration: none;
    white-space: nowrap;

    /* Appearance */
    border: var(--border-width-thin) solid transparent;
    border-radius: var(--radius-md);
    background: none;
    cursor: pointer;

    /* Transitions */
    transition:
      background-color var(--transition-base),
      border-color var(--transition-base),
      color var(--transition-base),
      transform var(--transition-fast),
      box-shadow var(--transition-base);
  }

  /* ========================================
     VARIANTS
     ======================================== */

  /* Primary variant */
  .button--primary {
    background-color: var(--color-primary-500);
    color: var(--color-white);
    border-color: var(--color-primary-500);
  }

  .button--primary:hover:not(:disabled) {
    background-color: var(--color-primary-600);
    border-color: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .button--primary:active:not(:disabled) {
    background-color: var(--color-primary-700);
    transform: translateY(0);
  }

  /* Secondary variant */
  .button--secondary {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
    border-color: var(--color-gray-300);
  }

  .button--secondary:hover:not(:disabled) {
    background-color: var(--color-gray-200);
    border-color: var(--color-gray-400);
  }

  /* Ghost variant */
  .button--ghost {
    background-color: transparent;
    color: var(--color-primary-500);
    border-color: transparent;
  }

  .button--ghost:hover:not(:disabled) {
    background-color: var(--color-primary-50);
  }

  /* Danger variant */
  .button--danger {
    background-color: var(--color-error);
    color: var(--color-white);
    border-color: var(--color-error);
  }

  .button--danger:hover:not(:disabled) {
    background-color: #dc2626; /* Darker red */
  }

  /* ========================================
     SIZES
     ======================================== */

  .button--sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    min-height: 36px;
  }

  .button--md {
    /* Default size - already defined in base */
  }

  .button--lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
    min-height: 52px;
  }

  /* ========================================
     MODIFIERS
     ======================================== */

  .button--full-width {
    width: 100%;
  }

  /* ========================================
     STATES
     ======================================== */

  .button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }

  .button:disabled,
  .button[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* ========================================
     ELEMENTS
     ======================================== */

  .button__icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  .button__text {
    /* Ensure text doesn't wrap */
  }

  /* ========================================
     RESPONSIVE
     ======================================== */

  @media (max-width: 767px) {
    .button--full-width {
      width: 100%;
    }
  }

  /* ========================================
     REDUCED MOTION
     ======================================== */

  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }
  }
}
```

**Step 4: Define Schema** (`button.schema.json`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "id": "atoms/button",
  "title": "Button",
  "category": "atom",
  "description": "Interactive button element for actions and CTAs",

  "props": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50,
        "description": "Button label text"
      },
      "variant": {
        "type": "string",
        "enum": ["primary", "secondary", "ghost", "danger"],
        "default": "primary",
        "description": "Visual style variant"
      },
      "size": {
        "type": "string",
        "enum": ["sm", "md", "lg"],
        "default": "md",
        "description": "Button size"
      },
      "fullWidth": {
        "type": "boolean",
        "default": false,
        "description": "Whether button spans full container width"
      },
      "href": {
        "type": "string",
        "format": "uri-reference",
        "description": "If provided, renders as anchor styled as button"
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "description": "Whether button is disabled"
      },
      "ariaLabel": {
        "type": "string",
        "description": "Accessible label if different from text"
      },
      "iconStart": {
        "type": "string",
        "description": "SVG markup for icon at start"
      },
      "iconEnd": {
        "type": "string",
        "description": "SVG markup for icon at end"
      }
    },
    "required": ["text"],
    "additionalProperties": false
  },

  "slots": {},

  "metadata": {
    "keywords": ["button", "cta", "action", "interactive"],
    "wcag": "AA",
    "responsive": true,
    "darkMode": true,
    "cssSize": "480B"
  }
}
```

**Step 5: Create Storybook Story** (`button.stories.ts`)
```typescript
import type { Meta, StoryObj } from '@storybook/html';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
}

const meta: Meta<ButtonProps> = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Primary button
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
    size: 'md'
  }
};

// Secondary button
export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
    size: 'md'
  }
};

// Ghost button
export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
    size: 'md'
  }
};

// Danger button
export const Danger: Story = {
  args: {
    text: 'Delete',
    variant: 'danger',
    size: 'md'
  }
};

// All sizes
export const Sizes = () => `
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <button class="button button--primary button--sm">
      <span class="button__text">Small</span>
    </button>
    <button class="button button--primary button--md">
      <span class="button__text">Medium</span>
    </button>
    <button class="button button--primary button--lg">
      <span class="button__text">Large</span>
    </button>
  </div>
`;

// All variants
export const Variants = () => `
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <button class="button button--primary button--md">
      <span class="button__text">Primary</span>
    </button>
    <button class="button button--secondary button--md">
      <span class="button__text">Secondary</span>
    </button>
    <button class="button button--ghost button--md">
      <span class="button__text">Ghost</span>
    </button>
    <button class="button button--danger button--md">
      <span class="button__text">Danger</span>
    </button>
  </div>
`;

// Disabled states
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true
  }
};

// Full width
export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    variant: 'primary',
    size: 'md',
    fullWidth: true
  }
};

// As link
export const AsLink: Story = {
  args: {
    text: 'Link Button',
    variant: 'primary',
    size: 'md',
    href: '#'
  }
};
```

**Step 6: Test Component**
- [ ] Visual testing in Storybook (all variants, all states)
- [ ] Keyboard navigation (Tab to focus, Space/Enter to activate)
- [ ] Screen reader announces button text
- [ ] Focus indicator visible
- [ ] All color contrasts meet WCAG AA
- [ ] Dark mode works correctly
- [ ] Responsive behavior (full-width on mobile when needed)

---

### 2. Input Component

**Reference**: See `/SPEC/P1-COMPONENT-SPECS.md` lines 164-317

#### Implementation (following same structure as Button)

**Template** (`input.njk`):
```njk
<div class="input-group{% if errorText %} input-group--error{% endif %}">
  <label class="input-group__label" for="{{ id }}">
    {{ label }}
    {% if required %}
      <span class="input-group__required" aria-label="required">*</span>
    {% endif %}
  </label>

  <input
    type="{{ type | default('text') }}"
    id="{{ id }}"
    name="{{ name | default(id) }}"
    class="input-group__input{% if errorText %} input-group__input--error{% endif %}"
    {% if placeholder %}placeholder="{{ placeholder }}"{% endif %}
    {% if value %}value="{{ value }}"{% endif %}
    {% if required %}required aria-required="true"{% endif %}
    {% if disabled %}disabled{% endif %}
    {% if errorText %}aria-invalid="true"{% else %}aria-invalid="false"{% endif %}
    aria-describedby="{% if helperText %}{{ id }}-helper{% endif %}{% if errorText %} {{ id }}-error{% endif %}"
  />

  {% if helperText %}
  <span class="input-group__helper" id="{{ id }}-helper">
    {{ helperText }}
  </span>
  {% endif %}

  {% if errorText %}
  <span class="input-group__error" id="{{ id }}-error" role="alert">
    {{ errorText }}
  </span>
  {% endif %}
</div>
```

**Styles** (`input.css`):
```css
@layer components {
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .input-group__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }

  .input-group__required {
    color: var(--color-error);
    margin-left: var(--spacing-xs);
  }

  .input-group__input {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-base);
    font-family: var(--font-sans);
    color: var(--color-text);
    background-color: var(--color-surface);
    border: var(--border-width-thin) solid var(--color-gray-300);
    border-radius: var(--radius-md);
    min-height: 44px;
    transition: border-color var(--transition-base), box-shadow var(--transition-base);
  }

  .input-group__input:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px var(--color-primary-50);
  }

  .input-group__input--error {
    border-color: var(--color-error);
  }

  .input-group__input--error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .input-group__input:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .input-group__helper {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  .input-group__error {
    font-size: var(--font-size-sm);
    color: var(--color-error);
    font-weight: var(--font-weight-medium);
  }
}
```

---

### Remaining Atoms (3-8)

Follow the same implementation pattern for:

3. **Link** - Navigation and external links
4. **Label** - Standalone labels
5. **Badge** - Status indicators
6. **Icon** - SVG wrapper
7. **Heading** - h1-h6
8. **Text** - Paragraph and inline text

Each should have:
- Template (.njk)
- Styles (.css)
- Schema (.schema.json)
- Stories (.stories.ts)
- Full testing

---

## MOLECULES

### 1. Card Component

**Reference**: See `/SPEC/P1-COMPONENT-SPECS.md` lines 321-449

#### Implementation

**Template** (`card.njk`):
```njk
<article class="card{% if variant %} card--{{ variant }}{% endif %}">
  {% if image %}
  <div class="card__media">
    <img
      src="{{ image.src }}"
      alt="{{ image.alt }}"
      class="card__image"
      loading="lazy"
    />
  </div>
  {% endif %}

  <div class="card__content">
    {% if badge %}
    <span class="card__badge">{{ badge }}</span>
    {% endif %}

    <h3 class="card__title">{{ title }}</h3>

    <p class="card__description">{{ description }}</p>

    {% if link %}
    <div class="card__actions">
      <a href="{{ link.href }}" class="card__link">
        {{ link.text }}
        <svg class="card__link-icon" aria-hidden="true" width="16" height="16">
          <path d="M8 4l4 4-4 4" stroke="currentColor" fill="none"/>
        </svg>
      </a>
    </div>
    {% endif %}
  </div>
</article>
```

**Styles** (`card.css`):
```css
@layer components {
  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-surface);
    border: var(--border-width-thin) solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .card__media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card__content {
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .card__badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: var(--color-primary-50);
    color: var(--color-primary-700);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-full);
    width: fit-content;
  }

  .card__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0;
  }

  .card__description {
    font-size: var(--font-size-base);
    color: var(--color-text-muted);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }

  .card__actions {
    margin-top: auto;
    padding-top: var(--spacing-md);
  }

  .card__link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-primary-500);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: color var(--transition-base);
  }

  .card__link:hover {
    color: var(--color-primary-600);
  }

  .card__link-icon {
    transition: transform var(--transition-base);
  }

  .card__link:hover .card__link-icon {
    transform: translateX(4px);
  }

  /* Variants */
  .card--featured {
    border-width: var(--border-width-medium);
    border-color: var(--color-primary-500);
    box-shadow: var(--shadow-lg);
  }

  .card--compact {
    font-size: var(--font-size-sm);
  }

  .card--compact .card__content {
    padding: var(--spacing-md);
  }
}
```

---

### 2. Form Field Component

**Purpose**: Combines label + input + helper/error in a reusable molecule

**Template** (`form-field.njk`):
```njk
<div class="form-field{% if error %} form-field--error{% endif %}">
  {{ renderSlot(slots.label) | safe }}
  {{ renderSlot(slots.input) | safe }}
  {% if slots.helper %}
    {{ renderSlot(slots.helper) | safe }}
  {% endif %}
  {% if slots.error %}
    {{ renderSlot(slots.error) | safe }}
  {% endif %}
</div>
```

**Schema** (`form-field.schema.json`):
```json
{
  "id": "molecules/form-field",
  "title": "Form Field",
  "category": "molecule",
  "description": "Composite form field with label, input, and validation",

  "props": {},

  "slots": {
    "label": {
      "accepts": ["atoms/label"],
      "required": true,
      "multiple": false
    },
    "input": {
      "accepts": ["atoms/input", "atoms/textarea", "atoms/select"],
      "required": true,
      "multiple": false
    },
    "helper": {
      "accepts": ["text"],
      "required": false,
      "multiple": false
    },
    "error": {
      "accepts": ["text"],
      "required": false,
      "multiple": false
    }
  },

  "metadata": {
    "keywords": ["form", "field", "input", "validation"],
    "wcag": "AA",
    "responsive": true,
    "darkMode": true
  }
}
```

---

### Remaining Molecules (3-7)

Follow the same pattern for:

3. **Button Group** - Multiple buttons together
4. **Link List** - List of navigation links
5. **Media Object** - Image + text layout
6. **Stat** - Number + label for metrics
7. **Alert** - Notification/warning message box

---

## Testing Strategy

### Visual Regression Testing
```bash
# Run Storybook visual tests
npm run test:visual

# Update snapshots
npm run test:visual:update
```

### Accessibility Testing
```bash
# Run Pa11y against all Storybook stories
npm run test:a11y

# Run axe-core tests
npm run test:axe
```

### Unit Testing
```typescript
// Example test for button component
describe('Button Component', () => {
  it('renders with required props', () => {
    const html = renderComponent('atoms/button', {
      text: 'Click me'
    });
    expect(html).toContain('Click me');
    expect(html).toContain('button--primary');
  });

  it('applies variant classes correctly', () => {
    const html = renderComponent('atoms/button', {
      text: 'Delete',
      variant: 'danger'
    });
    expect(html).toContain('button--danger');
  });

  it('renders as link when href provided', () => {
    const html = renderComponent('atoms/button', {
      text: 'Visit',
      href: '/page'
    });
    expect(html).toContain('<a');
    expect(html).toContain('href="/page"');
  });
});
```

---

## CSS Budget Tracking

### Per-Component Budgets
- Atoms: <500 bytes each
- Molecules: <1KB each

### Cumulative Budget
- Phase 1 (Design System): ~5KB
- Phase 2 (Atoms + Molecules): Target <15KB total

### Budget Monitoring
```bash
# Check CSS bundle size
npm run build:css -- --report

# Get per-component breakdown
npm run analyze:css
```

---

## Acceptance Criteria

### Completion Checklist

#### All 15 Components Implemented
- [ ] 8 atoms complete (button, input, link, label, badge, icon, heading, text)
- [ ] 7 molecules complete (card, form-field, button-group, link-list, media-object, stat, alert)

#### Quality Standards Met
- [ ] All components have .njk templates
- [ ] All components have .css styles
- [ ] All components have .schema.json definitions
- [ ] All components have .stories.ts Storybook stories
- [ ] All components tested in Storybook

#### Accessibility Compliance
- [ ] 100% WCAG AA compliance (Pa11y tests passing)
- [ ] Keyboard navigation working for all interactive elements
- [ ] Screen reader announcements correct
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet standards

#### Responsive Design
- [ ] All components work on mobile (375px)
- [ ] All components work on tablet (768px)
- [ ] All components work on desktop (1440px)
- [ ] Touch targets minimum 44x44px

#### Dark Mode
- [ ] All components tested in dark mode
- [ ] All colors have dark mode variants
- [ ] Contrast maintained in dark mode

#### Performance
- [ ] CSS bundle ≤15KB (gzipped)
- [ ] No runtime JavaScript required
- [ ] Images lazy-loaded where appropriate

#### Documentation
- [ ] All props documented in schemas
- [ ] All variants documented in Storybook
- [ ] Usage examples provided
- [ ] Common patterns documented

---

## Common Issues & Solutions

### Issue: CSS Specificity Conflicts
**Symptoms**: Styles not applying, cascade issues
**Solution**: Use cascade layers properly
```css
@layer components {
  .button { /* component styles */ }
}
```

### Issue: Dark Mode Flash
**Symptoms**: White flash on page load in dark mode
**Solution**: Add blocking script in layout head
```html
<script>
  if (localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Issue: SVG Icons Not Sizing
**Symptoms**: Icons too large or small
**Solution**: Use 1em sizing
```css
.button__icon {
  width: 1em;
  height: 1em;
}
```

### Issue: Input Validation State Not Showing
**Symptoms**: Error styles not applying
**Solution**: Use aria-invalid attribute
```njk
aria-invalid="{% if errorText %}true{% else %}false{% endif %}"
```

---

## Next Phase

After completing this phase, proceed to [Phase 3: Complex Sections](./PHASE-3-COMPLEX-SECTIONS.md) to build organism-level page sections using these foundational components.

---

**Remember**: These 15 components are the vocabulary for the entire design system. Build them right, and everything else becomes easier.
