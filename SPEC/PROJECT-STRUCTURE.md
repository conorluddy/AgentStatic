# Project Structure Specification

**Complete File and Directory Organization for AgentStatic Projects**

This document defines the canonical directory structure, file naming conventions, and organizational patterns for AgentStatic template repositories and projects.

---

## Root Directory Structure

```
agentstatic-template/
├── .agentstatic/              # Build metadata and cache
│   ├── registry.json          # Generated component registry
│   ├── cache/                 # Build cache files
│   └── bundle-size-history.json
│
├── components/                # Component library
│   ├── _system/               # Design system foundation
│   ├── atoms/                 # Atomic components
│   ├── molecules/             # Molecular components
│   └── organisms/             # Organism sections
│
├── pages/                     # Page compositions
│   ├── index.json             # Homepage
│   ├── about.json             # About page
│   └── contact.json           # Contact page
│
├── site/                      # Site configuration
│   ├── config.json            # Global site config
│   ├── layouts/               # Page layouts
│   └── assets/                # Static assets
│
├── dist/                      # Build output (gitignored)
│   ├── index.html             # Generated pages
│   ├── css/                   # Bundled CSS
│   ├── assets/                # Optimized assets
│   └── _redirects             # Deployment config
│
├── .storybook/                # Storybook configuration
│   ├── main.js
│   └── preview.js
│
├── scripts/                   # Build and dev scripts
│   ├── build.js
│   ├── dev.js
│   └── registry.js
│
├── tests/                     # Test suites
│   ├── unit/
│   ├── integration/
│   └── accessibility/
│
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Code formatting
├── agentstatic.config.js      # Build configuration
├── package.json               # Dependencies
├── README.md                  # Project documentation
└── CLAUDE.md                  # AI agent guide
```

---

## Component Library Structure

### System Foundation (`components/_system/`)
```
components/_system/
├── tokens.css                 # Design tokens
├── reset.css                  # Browser reset
├── base.css                   # Base element styles
├── typography.css             # Typography system
├── utilities.css              # Utility classes
└── README.md                  # System documentation
```

**Purpose**: Foundation files that all components depend on. These establish the design language and base styling.

**Rules**:
- Never modified directly by users (use overrides instead)
- Loaded first in cascade order
- No component-specific styles

### Atomic Components (`components/atoms/`)
```
components/atoms/
├── button/
│   ├── button.njk             # Template
│   ├── button.css             # Styles
│   ├── button.schema.json     # Props schema
│   ├── button.stories.js      # Storybook stories
│   └── README.md              # Component docs
│
├── input/
│   ├── input.njk
│   ├── input.css
│   ├── input.schema.json
│   ├── input.stories.js
│   └── README.md
│
├── heading/
├── text/
├── badge/
├── divider/
├── link/
└── breadcrumb/
```

**Naming**: Singular, descriptive nouns (button, input, heading)

**File requirements**:
- `[name].njk` - REQUIRED: Nunjucks template
- `[name].css` - REQUIRED: Component styles
- `[name].schema.json` - REQUIRED: Props schema
- `[name].stories.js` - REQUIRED: Storybook stories
- `README.md` - OPTIONAL but recommended

### Molecular Components (`components/molecules/`)
```
components/molecules/
├── card/
│   ├── card.njk
│   ├── card.css
│   ├── card.schema.json
│   ├── card.stories.js
│   └── README.md
│
├── navigation/
├── cta-block/
├── feature-list/
├── testimonial/
├── stat/
└── pricing-card/
```

**Naming**: Descriptive compound nouns or noun-phrases (card, navigation, cta-block)

### Organism Components (`components/organisms/`)
```
components/organisms/
├── hero/
│   ├── hero.njk
│   ├── hero.css
│   ├── hero.schema.json
│   ├── hero.stories.js
│   ├── hero--center.njk       # Optional variant template
│   ├── hero--split.njk
│   └── README.md
│
├── header/
├── footer/
├── feature-grid/
├── testimonial-section/
├── pricing-section/
└── contact-form/
```

**Naming**: Section-level descriptive names (hero, footer, feature-grid)

---

## Component File Specifications

### Nunjucks Template (`[name].njk`)
```njk
{#
  Component: [Name]
  Category: [atoms|molecules|organisms]
  Description: [Brief description]

  Props:
    - prop1: Type - Description
    - prop2: Type - Description

  Slots:
    - slotName: Description

  Example:
    {% raw %}
    {{ component('atoms/button', {
      text: 'Click me',
      variant: 'primary'
    }) }}
    {% endraw %}
#}

<button
  class="button button--{{ variant | default('primary') }} button--{{ size | default('md') }}"
  type="button"
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
</button>
```

### Component Schema (`[name].schema.json`)
```json
{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "id": "atoms/button",
  "name": "Button",
  "category": "atoms",
  "description": "Interactive button element for actions and CTAs",

  "props": {
    "text": {
      "type": "string",
      "required": true,
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
      "description": "If provided, renders as anchor styled as button"
    },
    "ariaLabel": {
      "type": "string",
      "description": "Accessible label if different from text"
    }
  },

  "slots": {},

  "metadata": {
    "tags": ["interactive", "cta", "action"],
    "wcag": "AA",
    "responsive": true,
    "darkMode": true
  }
}
```

### Component Styles (`[name].css`)
```css
/* ============================================================================
   Button Component
   Category: Atoms
   ============================================================================ */

@layer components {
  /* Base button styles */
  .button {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    font-weight: 500;
    line-height: 1.5;
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-base);

    /* Ensure minimum touch target */
    min-height: 44px;
  }

  /* Variants */
  .button--primary {
    background-color: var(--color-primary);
    color: var(--color-surface);
  }

  .button--primary:hover {
    background-color: var(--color-primary-dark);
  }

  .button--secondary {
    background-color: var(--color-secondary);
    color: var(--color-surface);
  }

  /* Sizes */
  .button--sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    min-height: 36px;
  }

  .button--lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
    min-height: 52px;
  }

  /* States */
  .button:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Elements */
  .button__icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  /* Responsive */
  @media (max-width: 767px) {
    .button--full-width {
      width: 100%;
      justify-content: center;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }
  }
}
```

### Component Stories (`[name].stories.js`)
```javascript
import { html } from 'lit-html';

export default {
  title: 'Atoms/Button',
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

// Primary variant
export const Primary = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
    size: 'md'
  }
};

// Secondary variant
export const Secondary = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
    size: 'md'
  }
};

// All sizes
export const Sizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
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
```

---

## Page Compositions

### Page JSON Structure (`pages/[name].json`)
```json
{
  "path": "/",
  "title": "Welcome to AgentStatic",
  "description": "Build better websites with our component library",
  "layout": "default",

  "seo": {
    "title": "AgentStatic - Modern Static Site Generator",
    "description": "AI-powered static site generation with beautiful components",
    "ogImage": "/assets/og-image.png",
    "twitterCard": "summary_large_image"
  },

  "sections": [
    {
      "component": "organisms/hero",
      "props": {
        "heading": "Build Better Websites Faster",
        "subheading": "Create stunning marketing sites with our component library and AI-powered tools",
        "variant": "center"
      },
      "slots": {
        "actions": [
          {
            "component": "atoms/button",
            "props": {
              "text": "Get Started Free",
              "variant": "primary",
              "size": "lg"
            }
          },
          {
            "component": "atoms/button",
            "props": {
              "text": "View Demo",
              "variant": "ghost",
              "size": "lg"
            }
          }
        ]
      }
    },
    {
      "component": "organisms/feature-grid",
      "props": {
        "heading": "Everything You Need",
        "columns": 3
      },
      "slots": {
        "features": [
          {
            "component": "molecules/card",
            "props": {
              "title": "Lightning Fast",
              "description": "Optimized for speed with sub-second load times"
            }
          }
        ]
      }
    }
  ]
}
```

---

## Site Configuration

### Site Config (`site/config.json`)
```json
{
  "site": {
    "title": "AgentStatic",
    "description": "Modern static site generator",
    "baseUrl": "https://agentstatic.com",
    "language": "en",
    "author": "AgentStatic Team"
  },

  "navigation": {
    "main": [
      { "text": "Features", "href": "/features" },
      { "text": "Pricing", "href": "/pricing" },
      { "text": "Docs", "href": "/docs" },
      { "text": "Blog", "href": "/blog" }
    ],
    "footer": [
      {
        "heading": "Product",
        "links": [
          { "text": "Features", "href": "/features" },
          { "text": "Pricing", "href": "/pricing" },
          { "text": "Changelog", "href": "/changelog" }
        ]
      },
      {
        "heading": "Resources",
        "links": [
          { "text": "Documentation", "href": "/docs" },
          { "text": "Blog", "href": "/blog" },
          { "text": "Support", "href": "/support" }
        ]
      }
    ]
  },

  "social": {
    "twitter": "https://twitter.com/agentstatic",
    "github": "https://github.com/agentstatic"
  },

  "theme": {
    "primaryColor": "#0066cc",
    "fontFamily": "system-ui, sans-serif"
  }
}
```

### Layout Template (`site/layouts/default.njk`)
```njk
<!DOCTYPE html>
<html lang="{{ site.language | default('en') }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{{ page.seo.title or page.title }} | {{ site.title }}</title>
  <meta name="description" content="{{ page.seo.description or page.description }}">

  {# Open Graph #}
  <meta property="og:title" content="{{ page.seo.title or page.title }}">
  <meta property="og:description" content="{{ page.seo.description or page.description }}">
  {% if page.seo.ogImage %}
  <meta property="og:image" content="{{ site.baseUrl }}{{ page.seo.ogImage }}">
  {% endif %}

  {# Twitter Card #}
  <meta name="twitter:card" content="{{ page.seo.twitterCard or 'summary' }}">
  <meta name="twitter:title" content="{{ page.seo.title or page.title }}">

  {# Critical CSS (inlined) #}
  {% if page.criticalCSS %}
  <style id="critical-css">{{ page.criticalCSS | safe }}</style>
  {% endif %}

  {# Main CSS bundle #}
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  {# Page content #}
  <main id="main-content">
    {{ content | safe }}
  </main>

  {# Analytics, etc. #}
  {% if site.analytics %}
  {{ site.analytics | safe }}
  {% endif %}
</body>
</html>
```

---

## Build Configuration

### Build Config (`agentstatic.config.js`)
```javascript
export default {
  // Input/Output paths
  componentsDir: './components',
  pagesDir: './pages',
  outputDir: './dist',
  layoutsDir: './site/layouts',
  assetsDir: './site/assets',

  // Site configuration
  siteConfig: './site/config.json',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  defaultLayout: 'default',

  // Build options
  environment: process.env.NODE_ENV || 'development',
  minifyHTML: process.env.NODE_ENV === 'production',
  enableSourceMaps: process.env.NODE_ENV === 'development',

  // Component settings
  componentCategories: ['atoms', 'molecules', 'organisms'],
  strictValidation: true,

  // CSS options
  css: {
    bundle: true,
    optimize: true,
    extractCritical: true,
    targetSize: 50 * 1024, // 50KB
    warnThreshold: 48 * 1024 // 48KB
  },

  // Development server
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    watch: true,
    liveReload: true,
    watchPaths: [
      './components/**/*',
      './pages/**/*',
      './site/**/*'
    ]
  },

  // Build plugins
  plugins: [
    // Add custom plugins here
  ]
};
```

---

## Naming Conventions

### File Naming
- **kebab-case** for all files: `feature-grid.njk`, `cta-block.css`
- **Lowercase only**: No uppercase letters
- **Descriptive**: Names should clearly indicate purpose

### Component IDs
- **Format**: `category/component-name`
- **Examples**: `atoms/button`, `molecules/card`, `organisms/hero`
- **Pattern**: `/^(atoms|molecules|organisms)\/[a-z][a-z0-9-]*$/`

### CSS Classes
- **BEM naming**: `.block__element--modifier`
- **Component prefix**: Always start with component name
- **Examples**:
  - `.button` (block)
  - `.button__icon` (element)
  - `.button--primary` (modifier)
  - `.button--lg` (modifier)

### Variable Names
- **CSS custom properties**: `--kebab-case`
- **JavaScript**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`

---

## Git Configuration

### `.gitignore`
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
.agentstatic/cache/

# Development
.DS_Store
*.log
npm-debug.log*

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/

# Temporary
tmp/
temp/
```

### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": "*.njk",
      "options": {
        "parser": "html"
      }
    }
  ]
}
```

---

## CLAUDE.md Structure

### AI Agent Guide (`CLAUDE.md`)
```markdown
# AgentStatic Project Guide

## Overview
This is an AgentStatic project - a static site built with a component-based architecture optimized for AI-assisted development.

## Key Entry Points
- `/components/` - Component library (atoms, molecules, organisms)
- `/pages/` - Page compositions in JSON format
- `/site/config.json` - Global site configuration
- `/agentstatic.config.js` - Build configuration

## Component Architecture
Components follow Atomic Design:
- **Atoms**: Basic building blocks (button, input, heading)
- **Molecules**: Simple combinations (card, navigation)
- **Organisms**: Complex sections (hero, footer, feature-grid)

Each component has:
- `.njk` template file (Nunjucks)
- `.css` styles (using design tokens)
- `.schema.json` props schema
- `.stories.js` Storybook stories

## Development Workflow

### Add a new page:
1. Create JSON file in `/pages/`
2. Compose using existing components
3. Run `npm run build` to generate HTML

### Add a new component:
1. Create directory in appropriate category
2. Add template, styles, and schema
3. Update registry: `npm run registry:update`
4. Add Storybook story

### Modify styling:
- Never edit `_system/` files directly
- Override via component-specific CSS
- Use design tokens from `tokens.css`

## Common Tasks

### Build site:
```bash
npm run build
```

### Development server:
```bash
npm run dev
```

### Component registry:
```bash
npm run registry:update
```

### Storybook:
```bash
npm run storybook
```

## Important Constraints
- CSS bundle must stay under 50KB
- All components must be WCAG AA compliant
- No JavaScript required for core functionality
- Mobile-first responsive design

## Getting Help
- Documentation: `/docs/`
- Component specs: `SPEC/P1-COMPONENT-SPECS.md`
- Architectural decisions: `SPEC/DECISIONS.md`
```

---

## Package.json Scripts

### `package.json`
```json
{
  "name": "agentstatic-template",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js",
    "preview": "node scripts/preview.js",

    "registry:update": "node scripts/registry.js",
    "registry:validate": "node scripts/registry.js --validate",

    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",

    "test": "vitest",
    "test:a11y": "node scripts/test-a11y.js",
    "test:css": "node scripts/test-css-size.js",

    "format": "prettier --write .",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },

  "dependencies": {
    "nunjucks": "^3.2.4"
  },

  "devDependencies": {
    "@storybook/html": "^7.6.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

---

## Directory Size Guidelines

### Expected Sizes
- `/components/` - ~500KB total (uncompiled)
- `/pages/` - ~50KB (all JSON files)
- `/site/` - ~100KB (config, layouts, assets)
- `/dist/` - ~200KB (compressed HTML + CSS)

### Growth Limits
- Maximum 30 components total
- Maximum 50 pages
- CSS bundle stays under 50KB (gzipped)

---

*This specification defines the complete project structure for AgentStatic. All projects must follow these organizational patterns for consistency and AI-agent compatibility.*