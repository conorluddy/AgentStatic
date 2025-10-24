# Phase 7: Storybook & Complete Documentation

**Duration**: 1 week (Week 12) | **Effort**: 25 hours | **Priority**: High

---

## Overview

Complete the AgentStatic platform with Storybook 8 as the primary **human-facing component browser** and comprehensive documentation for developers, AI agents, and contributors. This phase ensures the component library is discoverable, understandable, and maintainable.

**Key Focus** (reflecting 17 refined decisions):
- **Storybook 80/20**: Focus on visuals + code snippets, not exhaustive auto-generated docs (decision #15)
- **Both audiences**: Documentation for human developers AND AI agents (decision #15)
- **20-30 components**: Stories for exactly the components built (decision #2)
- **Example-driven**: Real page compositions show actual usage (decision #6)
- **Template-first mindset**: Documentation reflects the distributed template approach (decision #5)
- **Dark mode showcase**: All stories show dark mode support (decision #7)
- **Accessibility first**: Every story includes a11y audit results (decision #12)
- **Static site mentality**: Documentation explains brochureware constraints (decision #1)

---

## The 5 Documentation Layers

AgentStatic documentation is tiered to serve different audiences with exactly what they need:

### Layer 1: Storybook Visual Browser (Primary)
**Audience**: Designers, developers, visual decision-makers
**Purpose**: See all components, all variants, all states in one place
**Medium**: Interactive component stories with live controls
**Scope**: 50-70 stories across 20-30 components

### Layer 2: Developer Guide
**Audience**: Backend developers, frontend engineers building sites
**Purpose**: How to create pages, customize, deploy
**Medium**: Markdown guide with step-by-step instructions
**Scope**: Getting started, creating pages, customization, deployment

### Layer 3: AI Agent Guide
**Audience**: AI agents (Claude, others) building sites autonomously
**Purpose**: Tool reference, workflows, patterns, limitations
**Medium**: Detailed specifications and examples
**Scope**: All 5 MCP tools, workflows, patterns, decision trees

### Layer 4: Contribution Guide
**Audience**: Developers contributing new components
**Purpose**: Standards, process, checklist for quality
**Medium**: Step-by-step component creation guide
**Scope**: Planning, implementation, testing, submission

### Layer 5: In-Code Documentation
**Audience**: Engineers maintaining component code
**Purpose**: Context on why components exist, what's special
**Medium**: Code comments, schema metadata, README files
**Scope**: Component-level technical details

---

## 7.1 Storybook Setup & Configuration

**Goal**: Get Storybook 8 with Vite running, styled, and optimized for AgentStatic

### Setup Files

**Directory Structure**:
```
.storybook/
├── main.ts                          # Storybook config
├── preview.ts                       # Global setup & providers
├── manager.ts                       # Sidebar & UI customization
├── theme.ts                         # Storybook theme matching AgentStatic
└── stories/
    ├── intro.mdx                    # Landing page
    ├── getting-started.mdx          # Quick start for developers
    └── ai-agent-guide.mdx           # Guide for AI agents
```

### Configuration (`main.ts`)

```typescript
import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'path';

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',

  stories: [
    './.storybook/stories/**/*.mdx',           // Documentation pages
    '../components/**/*.stories.ts',            // Component stories
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',              // Docs, Controls, Actions
    '@storybook/addon-a11y',                    // Accessibility audit
    '@storybook/addon-viewport',                // Mobile/tablet/desktop
    '@storybook/addon-themes',                  // Dark mode toggle
    '@storybook/addon-interactions',            // User interaction debugging
  ],

  docs: {
    autodocs: false,                            // Use manual docs instead of auto-generated
    defaultName: 'Documentation',               // Tab label
  },

  staticDirs: [
    { from: '../site/assets', to: '/assets' }  // Component assets
  ],

  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.nunjucks$/,
      loader: 'nunjucks-loader'
    });
    return config;
  }
};

export default config;
```

### Global Setup (`preview.ts`)

```typescript
import type { Preview } from '@storybook/web-components';
import '../site/design-system.css';              // Design tokens
import '../site/base.css';                      // Reset + typography
import '../components/**/*.css';                 // All component styles

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',                       // Full viewport by default

    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile'
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet'
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop'
        }
      }
    },

    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'image-alt',
            enabled: true
          }
        ]
      }
    },

    darkMode: {
      current: 'light',
      classTarget: 'html',
      classNameDark: 'dark',
      classNameLight: 'light',
      stylePreview: true
    }
  },

  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ]
      }
    }
  }
};

export default preview;
```

### Storybook Theme (`theme.ts`)

```typescript
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  // Brand
  brandTitle: 'AgentStatic',
  brandUrl: 'https://agentstatic.dev',
  brandImage: '/assets/logo.svg',
  brandTarget: '_self',

  // UI
  colorPrimary: '#0066ff',           // Match AgentStatic primary
  colorSecondary: '#666666',          // Secondary text
  appBg: '#ffffff',
  appContentBg: '#fafafa',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // Text
  textColor: '#1a1a1a',
  textInverseColor: '#ffffff',

  // Toolbar
  barTextColor: '#999999',
  barBg: '#ffffff',
  barBorder: '#e0e0e0',
  barSelectedColor: '#0066ff',

  booleanBgActive: '#0066ff',
  booleanSelectedBg: '#0066ff'
});
```

### Acceptance Criteria

- [x] Storybook runs with `bun storybook` in <5 seconds
- [x] All 20-30 components discoverable in sidebar
- [x] Viewport addon shows mobile (375px), tablet (768px), desktop (1440px)
- [x] Dark mode toggle works smoothly with instant preview
- [x] Accessibility audit tab shows WCAG AA results
- [x] Theme matches AgentStatic design tokens
- [x] No auto-generated docs (manual control only)
- [x] Storybook styling doesn't conflict with component styles

**Estimate**: 6 hours

---

## 7.2 Component Stories (50-70 Stories)

**Goal**: Create stories for all 20-30 components showing variants, states, and real content

### Story Structure

Each component gets **2-5 stories** showing:
1. **Primary story** - Default/most common usage
2. **Variant stories** - Each design variant
3. **State stories** - Interactive states (hover, disabled, loading, etc.)
4. **Real content stories** - With actual copy, not Lorem ipsum
5. **Responsive story** - How it adapts to viewport changes

### Story Template Example (`atoms/button/button.stories.ts`)

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import './button.css';

const meta = {
  title: 'Atoms/Button',
  component: 'button',

  parameters: {
    layout: 'centered',

    // Accessibility audit enabled
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }]
      }
    },

    // Show at multiple viewports
    viewport: {
      defaultViewport: 'desktop'
    }
  },

  // Control panel for interactive testing
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost', 'outline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY VARIANTS
// ============================================================================

/**
 * Primary button for most important actions.
 * Use for the main CTA on a page.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    text: 'Get Started'
  },

  render: (args) => `
    <button
      class="button button--${args.variant} button--${args.size}"
      ${args.disabled ? 'disabled' : ''}
      ${args.loading ? 'data-loading' : ''}
    >
      ${args.text}
    </button>
  `
};

export const Secondary: Story = {
  ...Primary,
  args: { ...Primary.args, variant: 'secondary', text: 'Learn More' }
};

export const Ghost: Story = {
  ...Primary,
  args: { ...Primary.args, variant: 'ghost', text: 'Dismiss' }
};

export const Outline: Story = {
  ...Primary,
  args: { ...Primary.args, variant: 'outline', text: 'Browse' }
};

// ============================================================================
// SIZES
// ============================================================================

export const Small: Story = {
  ...Primary,
  args: { ...Primary.args, size: 'small', text: 'Copy' }
};

export const Large: Story = {
  ...Primary,
  args: { ...Primary.args, size: 'large', text: 'Start Free Trial' }
};

// ============================================================================
// STATES
// ============================================================================

/**
 * Disabled buttons prevent interaction and show reduced opacity.
 * Use when action is unavailable.
 */
export const Disabled: Story = {
  ...Primary,
  args: { ...Primary.args, disabled: true, text: 'Unavailable' }
};

/**
 * Loading state shows spinner while action completes.
 * Prevents accidental double-clicks.
 */
export const Loading: Story = {
  ...Primary,
  args: { ...Primary.args, loading: true, text: 'Submitting' }
};

// ============================================================================
// REAL CONTENT EXAMPLES
// ============================================================================

/**
 * Hero CTA - Large button with compelling copy
 */
export const HeroCTA: Story = {
  ...Primary,
  args: {
    variant: 'primary',
    size: 'large',
    text: 'Start Building Today'
  },
  decorators: [
    (story) => `
      <div style="padding: 4rem; text-align: center;">
        <h1>Ready to create your site?</h1>
        ${story}
      </div>
    `
  ]
};

/**
 * Form actions - Multiple buttons with different meanings
 */
export const FormActions: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem;">
      <button class="button button--primary">Save Changes</button>
      <button class="button button--ghost">Cancel</button>
    </div>
  `
};
```

### Atoms & Molecules (12-15 total)

Each gets 2-4 stories:

**Atoms** (6):
- `button` (4 variants × 3 sizes + states = 5 stories)
- `heading` (h1-h6 levels + variants = 4 stories)
- `text/paragraph` (sizes + styles = 3 stories)
- `icon` (all 20 icons displayed = 2 stories)
- `badge` (colors + variants = 3 stories)
- `visual-divider` (orientations = 2 stories)

**Molecules** (5-7):
- `card` (with image, no image, interactive = 3 stories)
- `cta-block` (text + button = 2 stories)
- `image-text-block` (image left, image right = 2 stories)
- `feature-list` (2-col, 3-col layouts = 2 stories)
- `testimonial` (with image, avatar-only = 2 stories)
- `link` (visited, hover states = 2 stories)
- `breadcrumb` (long paths, with icons = 2 stories)

**Subtotal**: ~30 stories

### Organisms (8-10 total)

Each gets 3-5 stories:

- `hero-section` (4 variants = 4 stories)
- `site-header` (sticky, transparent, solid, with nav = 3 stories)
- `feature-section` (2-col, 3-col, 4-col = 3 stories)
- `comparison-table` (2-col, 3-col, pricing table = 3 stories)
- `media-gallery` (grid, masonry, carousel = 3 stories)
- `timeline` (vertical, horizontal = 2 stories)
- `testimonial-carousel` (auto-scroll, manual = 2 stories)
- `team-grid` (2-col, 3-col, with descriptions = 2 stories)
- `social-proof` (logo grid, text testimonials = 2 stories)
- `cta-section` (different CTAs and layouts = 2 stories)

**Subtotal**: ~28 stories

**Total**: ~58 stories across 20-30 components

### Story Organization

Stories are organized by category in the sidebar:

```
Atoms
├── Button (5 stories)
├── Heading (4 stories)
├── Text (3 stories)
├── Icon (2 stories)
├── Badge (3 stories)
└── Visual Divider (2 stories)

Molecules
├── Card (3 stories)
├── CTA Block (2 stories)
├── Image-Text Block (2 stories)
├── Feature List (2 stories)
├── Testimonial (2 stories)
├── Link (2 stories)
└── Breadcrumb (2 stories)

Organisms
├── Hero Section (4 stories)
├── Site Header (3 stories)
├── Feature Section (3 stories)
├── Comparison Table (3 stories)
├── Media Gallery (3 stories)
├── Timeline (2 stories)
├── Testimonial Carousel (2 stories)
├── Team Grid (2 stories)
├── Social Proof (2 stories)
└── CTA Section (2 stories)
```

### Storybook 80/20 Approach

Focus on **visual clarity + code snippets**, not exhaustive documentation:

**Included** (20%):
- Interactive component preview with live controls
- HTML code snippet showing markup
- List of available props/variants
- Simple accessibility notes
- Responsive preview across viewports

**NOT Included** (auto-generated noise):
- Exhaustive prop type documentation (use schema.json)
- API reference for every prop (covered in schema)
- Usage guidelines spread across multiple pages
- Generated Markdown from JSDoc comments
- Complex nested stories with deep nesting

**Why**: Developers know how to read code. Show them the component, show them the markup, let them explore with interactive controls. If they need detailed prop types, they check the schema.

### Acceptance Criteria

- [x] 50-70 stories total covering all 20-30 components
- [x] Every variant has a dedicated story
- [x] Every state (disabled, loading, etc.) has a story
- [x] Real content in examples, no Lorem ipsum
- [x] Interactive stories with working controls
- [x] A11y panel passes for all stories (WCAG AA)
- [x] Responsive preview at mobile/tablet/desktop sizes
- [x] Dark mode visible for all stories
- [x] Code snippets show correct HTML
- [x] Storybook build completes in <10 seconds

**Estimate**: 8 hours

---

## 7.3 Documentation Pages (Introduction & Guides)

**Goal**: Create 3-4 MDX documentation pages for context and guidance

### 7.3.1 Introduction Page (`.storybook/stories/intro.mdx`)

```markdown
# AgentStatic Component Library

Welcome! AgentStatic is an **AI-first static site generator** for brochureware marketing sites.

## What You'll Find Here

This Storybook contains **20-30 production-ready components** organized in three tiers:

### Atoms (6 components)
Small, fundamental building blocks: buttons, headings, text, icons, badges, dividers.

### Molecules (5-7 components)
Combinations of atoms that form reusable patterns: cards, CTAs, feature lists, testimonials.

### Organisms (8-10 components)
Large page sections you can compose together: heroes, headers, feature sections, galleries.

## Getting Started

### For Designers
Browse this Storybook to see all components, variants, and states. Every component is fully responsive and supports dark mode.

### For Developers
See **[Developer Guide](#)** for how to create pages using these components.

### For AI Agents
See **[AI Agent Guide](#)** for tool reference and workflows.

### For Contributors
See **[Contributing Guide](#)** for how to add new components.

## Design Principles

All components follow these principles:

**1. Brochureware First**
Designed specifically for marketing and content sites, not applications.

**2. Accessibility Built-In**
WCAG AA compliance, keyboard navigation, screen reader support.

**3. Token-Based**
All colors, spacing, typography use design tokens for consistency.

**4. Dark Mode Native**
Every component automatically supports light and dark themes.

**5. Mobile First**
Responsive by default, using mobile-first cascade layers.

**6. No Lock-In**
Plain HTML, CSS, and Nunjucks. Fork it, modify it, make it yours.

## Statistics

- **20-30 Components** total
- **50-70 Stories** showing variants and states
- **WCAG AA** compliant
- **Mobile + Dark Mode** support built-in
- **Single CSS Bundle** ~42KB compressed
- **Zero Dependencies** in component CSS
```

### 7.3.2 Developer Quick Start (`.storybook/stories/developer-guide.mdx`)

```markdown
# Developer Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/agentstatic.git
   cd agentstatic
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **View components**
   ```bash
   bun storybook
   ```

Open http://localhost:5173 to see your site, and http://localhost:6006 for Storybook.

## Creating Your First Page

### Step 1: Create Page Composition

Create `site/pages/landing.json`:

```json
{
  "path": "/",
  "title": "Welcome to Our Site",
  "metadata": {
    "description": "Build fast, ship faster.",
    "canonical": "https://example.com"
  },
  "sections": [
    {
      "component": "organisms/hero-section",
      "props": {
        "heading": "Build Beautiful Sites Fast",
        "subheading": "No coding required with AgentStatic",
        "cta": {
          "text": "Get Started",
          "url": "/about"
        }
      }
    },
    {
      "component": "organisms/feature-section",
      "props": {
        "heading": "Why AgentStatic?",
        "features": [
          { "title": "Fast", "description": "Static by design" },
          { "title": "Accessible", "description": "WCAG AA compliant" },
          { "title": "Customizable", "description": "Use design tokens" }
        ]
      }
    }
  ]
}
```

### Step 2: Build Your Site

```bash
bun run build
```

This generates `dist/index.html` with your page.

### Step 3: Deploy

Upload the `dist/` folder to any static host:
- **Netlify**: Connect your repo, deploy automatically
- **Vercel**: Same as Netlify
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload dist/ folder

## Customizing Components

### Using Design Tokens

All colors, spacing, and typography are defined in `site/design-system.css`:

```css
:root {
  --color-primary: #0066ff;
  --color-surface: #ffffff;
  --space-md: 1rem;
  --font-size-md: 1rem;
}
```

Change any token and it updates globally.

### Using Component Variants

Each component has variants. Specify in your composition:

```json
{
  "component": "organisms/hero-section",
  "variant": "split",
  "props": { ... }
}
```

### Adding Custom CSS

For site-specific styling, add to `site/custom.css`. This loads last and can override anything.

## Page Composition Rules

- Every page must have a `path`, `title`, and `sections`
- Each section specifies a component ID and props
- Props must match the component's schema
- Sections render in order (top to bottom)

## Common Tasks

### Add a New Page
1. Create `site/pages/about.json`
2. Add hero, features, team, CTA sections
3. Run `bun run build`

### Change a Color
1. Edit `site/design-system.css`
2. Change `--color-primary` to new color
3. Entire site updates

### Use a Different Font
1. Import font in `site/design-system.css`
2. Update `--font-family-sans`
3. All text updates

### Make a Page Dark Only
1. Add `"darkMode": "dark-only"` to page metadata
2. No light mode toggle for this page

## Troubleshooting

### Build Fails with "Unknown component"
1. Check component ID matches schema (e.g., `organisms/hero-section`)
2. Run `bun storybook` to see available components
3. Check component is spelled correctly

### Styling Looks Wrong
1. Check design tokens are loaded before your CSS
2. Check `site/custom.css` isn't conflicting
3. Check dark mode isn't active

### Mobile Looks Different
1. Components are mobile-first, so mobile = baseline
2. Larger breakpoints stack on top
3. Test at 375px (mobile), 768px (tablet), 1440px (desktop)

## What AgentStatic CAN Do
- Static marketing sites
- Multi-page brochureware
- Blog sites (static content)
- Portfolios and case studies
- Documentation sites

## What AgentStatic CANNOT Do
- Web apps with complex interactions
- Database-backed content
- User authentication
- Forms with backend processing
- Real-time features

For those, build a separate backend service.
```

### 7.3.3 AI Agent Guide (`.storybook/stories/ai-guide.mdx`)

```markdown
# AgentStatic: Guide for AI Agents

## What is AgentStatic?

AgentStatic is an **AI-first static site generator** optimized for Claude and other AI agents to autonomously:

1. **Discover** components matching requirements
2. **Compose** pages from components
3. **Validate** compositions before building
4. **Suggest** next components in page flow

## The 5 MCP Tools You Have

### 1. `discover_components`
Find components by description.

**Input**:
```json
{
  "query": "hero section with background image",
  "category": "organism",
  "limit": 5
}
```

**Output**:
```json
{
  "matches": [
    {
      "id": "organisms/hero-section",
      "name": "Hero Section",
      "relevance": 0.95,
      "reason": "Exact match - supports background images"
    }
  ],
  "suggestions": [...]
}
```

### 2. `get_component_details`
Get complete documentation for a component.

**Input**:
```json
{
  "componentId": "organisms/hero-section"
}
```

**Output**: Full schema with all props, variants, examples, accessibility notes.

### 3. `compose_page`
Create a page by composing multiple components.

**Input**:
```json
{
  "title": "Product Landing",
  "sections": [
    {
      "component": "organisms/hero-section",
      "props": { ... }
    }
  ]
}
```

**Output**: Validated page composition with warnings.

### 4. `validate_composition`
Check page validity before building.

**Input**: Array of sections
**Output**: Errors, warnings, and improvement suggestions

### 5. `suggest_next_components`
Get recommendations for next section in flow.

**Input**:
```json
{
  "currentComponents": ["organisms/hero-section"],
  "pageContext": "SaaS landing page"
}
```

**Output**: Top suggestions with confidence scores and typical props.

## Typical Workflows

### Workflow 1: Build a Landing Page from Brief

**User**: "Create a SaaS landing page for a project management tool"

**You**:
1. `discover_components("hero")` → organisms/hero-section
2. `get_component_details("organisms/hero-section")`
3. `discover_components("features")` → organisms/feature-section
4. `discover_components("testimonials")` → organisms/testimonial-carousel
5. `discover_components("pricing")` → organisms/comparison-table
6. `discover_components("footer cta")` → organisms/cta-section
7. `compose_page({
     title: "Project Manager Pro",
     sections: [hero, features, testimonials, pricing, cta]
   })`
8. `validate_composition()` → Returns any errors
9. Return composed page

**Result**: Production-ready landing page

### Workflow 2: Create Multi-Page Site

**User**: "Build a marketing site with home, about, pricing, and contact pages"

**You**:
1. Create `/` (landing) with hero + features + CTA
2. Create `/about` with hero + team grid + testimonials
3. Create `/pricing` with pricing table + FAQ + CTA
4. Create `/contact` with contact form component (if exists, else explain limitation)

**Result**: 4-page site

### Workflow 3: Add Page to Existing Site

**User**: "Add a blog post page"

**You**:
1. `discover_components("hero")` → organisms/hero-section
2. `discover_components("blog")` → Look for blog-specific components
3. If not found, ask: "AgentStatic is for brochureware, not dynamic blogs"
4. Suggest: "I can create a static blog post page with hero + content + author + CTA"
5. `compose_page()` with minimal hero + content block + author card + related posts

**Result**: Static blog post page

## Decision Trees

### When User Asks for [X], Do This:

**"Add a signup form"**
- AgentStatic is brochureware-only
- Forms need backend processing
- You can't do this
- Suggest: "I can build a landing page with form layout, but you'll need a backend to process submissions"

**"Create a shopping cart"**
- Requires database and checkout
- Not possible with static site
- Decline politely: "AgentStatic builds marketing sites, not storefronts. Try Shopify or WooCommerce"

**"Build an admin dashboard"**
- Web app, not brochureware
- Not possible
- Decline: "That's a web application. AgentStatic is for static marketing sites"

**"Add real-time chat"**
- Requires backend
- Not possible
- Decline: "AgentStatic is static. For real-time features, build a separate app"

**"Create a custom hero layout"**
- Check hero variants first: `get_component_details("organisms/hero-section")`
- If variant exists, use it
- If not, ask: "What specifically do you need?" and discover_components for alternatives
- Last resort: Explain limitations of static components

**"Add dark mode"**
- All components support it
- Just tell user: "Dark mode is built in - users can toggle in top right"
- No action needed

**"Make it faster"**
- Static sites are already fast
- Suggest: "AgentStatic generates static HTML, so it's already blazingly fast. No optimization needed"

**"Add animations"**
- Check PHASE-04 for animation patterns
- Most animations use CSS only (respects prefers-reduced-motion)
- Include animations in component variants
- If user wants complex JS animations: decline, explain static limitations

## Page Composition Patterns

### SaaS Landing Page Pattern
```
1. Hero (with heading, subheading, CTA)
2. Feature Section (3-column grid of key features)
3. Testimonial Carousel (social proof)
4. Comparison Table (competitors or plans)
5. CTA Section (final call to action)
6. Footer (links + copyright)
```

### Product/Portfolio Pattern
```
1. Hero (product name + headline)
2. Media Gallery (screenshots or project photos)
3. Feature Section (what makes it special)
4. Testimonials (client testimonials)
5. CTA Section (get it now)
```

### About/Company Pattern
```
1. Hero (company name + mission)
2. Content Block (company story)
3. Team Grid (team members)
4. Values Grid (company values)
5. CTA Section (let's work together)
```

### Blog/Docs Pattern
```
1. Hero (blog title + date)
2. Content Block (article markdown or HTML)
3. Author Card (author info)
4. Related Posts Grid (other articles)
5. CTA Section (subscribe to newsletter)
```

## Component Discovery Tips

**Use semantic search, not just keyword matching**:
- "I need social proof" → search: `"testimonial"` or `"social-proof"`
- "I need a product showcase" → search: `"feature"` or `"gallery"`
- "I need team members" → search: `"team"` or `"people"`

**Use category filtering**:
- Atoms: Basic building blocks (button, heading, text)
- Molecules: Reusable patterns (card, testimonial)
- Organisms: Full sections (hero, feature section)

**Look at suggestions**:
- `discover_components` returns `suggestions` - these are related components
- Use suggestions to discover alternatives

## When to Decline

Tell the user "I can't do that" for:
- ✗ Forms with backend submission
- ✗ Database integration
- ✗ User authentication
- ✗ Real-time features
- ✗ Web applications
- ✗ Ecommerce/shopping carts
- ✗ Complex JavaScript interactions

Tell the user "That's outside AgentStatic" and recommend:
- For forms → Add a backend
- For commerce → Use Shopify, WooCommerce, etc.
- For apps → Build separate web app
- For real-time → Use Socket.io, WebSockets
- For complex UX → Use React, Vue, etc.

## Best Practices

1. **Use realistic content** - Avoid Lorem ipsum, use actual product/company info
2. **Check examples** - Always look at component examples before using
3. **Validate before composing** - Use `validate_composition()` to catch errors early
4. **Follow page patterns** - Hero at top, CTA at bottom, features in middle
5. **Pick variants wisely** - Hero variants exist for different layouts, pick the right one
6. **Use consistent proportions** - 3-column feature sections usually work better than 5-column

## Examples

Real example compositions are in `/ai/examples/`:
- `landing-page.json` - Product landing page
- `about-page.json` - Company about page
- `pricing-page.json` - Pricing page
- `blog-page.json` - Blog post

Study these to understand patterns.

## Limitations & Transparency

Always be transparent about what you can and cannot do:

**You CAN**:
- Build multi-page brochureware sites
- Compose pages from 20-30 components
- Suggest component improvements
- Create mobile-responsive layouts
- Support light and dark themes
- Optimize for accessibility

**You CANNOT**:
- Process form submissions
- Access databases
- Authenticate users
- Store data
- Process payments
- Handle complex interactions
- Run JavaScript logic beyond CSS animations

## Error Messages & Debugging

If `validate_composition()` returns errors:
1. Read the error message carefully
2. Check the prop against the schema
3. Look at component examples
4. Use `get_component_details()` to see all valid props
5. Adjust composition and validate again

If `compose_page()` fails:
1. Check all components exist
2. Verify all props match schema
3. Run `validate_composition()` first
4. Check for typos in component IDs

## Closing Thought

You're not a generic code generator. You're **AgentStatic's AI agent**, specialized for building brochureware sites. Know your strengths (component discovery, composition, validation) and know your limits (no backends, no databases, no complex interactions).

Be helpful, be honest about limitations, and guide users to the right tool for their job.
```

### 7.3.4 Contributing Guide

Create as `CONTRIBUTING.md` in project root:

```markdown
# Contributing to AgentStatic

Thanks for wanting to contribute! This guide explains how to add components to AgentStatic.

## Prerequisites

- Fork the repository
- Clone locally
- Install dependencies: `bun install`
- Start dev server: `bun run dev`
- View Storybook: `bun storybook`

## Component Contribution Process

### Step 1: Plan Your Component

1. **Check if it exists**: Open Storybook, search for component
2. **Open an issue**: Describe what you want to build
3. **Get feedback**: Wait for maintainers to approve
4. **Don't start coding** without approval

### Step 2: Choose Component Type

**Atom** - Single, fundamental element
- Example: Button, Heading, Badge

**Molecule** - Combination of atoms
- Example: Card (image + heading + text), CTA (button + text)

**Organism** - Full page section
- Example: Hero, Feature grid, Testimonial carousel

### Step 3: Create Component Files

Create directory: `components/{category}/{component-name}/`

Required files:
```
components/atoms/my-component/
├── my-component.html          # Nunjucks template
├── my-component.css           # Component styles
├── my-component.schema.json   # Metadata & props
├── my-component.stories.ts    # Storybook stories
└── my-component.test.ts       # Tests (optional)
```

### Step 4: Write Semantic HTML

```html
<!-- components/atoms/badge/badge.html -->
<span class="badge badge--{{ variant }}">
  {{ text }}
</span>
```

**Requirements**:
- Use semantic HTML elements (don't div-ify everything)
- Include ARIA roles/attributes if needed
- Keyboard navigable if interactive
- Accessible to screen readers

### Step 5: Use Design Tokens

```css
/* components/atoms/badge/badge.css */
@layer components.atoms {
  .badge {
    background: var(--color-surface);
    color: var(--color-text);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
  }

  .badge--primary {
    background: var(--color-primary);
    color: white;
  }
}
```

**Never hardcode** colors, spacing, typography, or border-radius. Use variables.

**Dark mode** is automatic with CSS variables - no extra work needed.

### Step 6: Add Schema Metadata

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "id": "atoms/badge",
  "title": "Badge",
  "description": "Small label or status indicator",
  "category": "atom",
  "accessibility": {
    "wcag": "AA",
    "keyboard": false,
    "screenReader": true,
    "notes": "Semantic span element with no interactive elements"
  },
  "responsive": {
    "mobileFirst": true,
    "breakpoints": "all",
    "behavior": "Scales via design tokens"
  },
  "darkMode": {
    "supported": true,
    "approach": "CSS variables",
    "tested": true
  },
  "properties": {
    "text": {
      "type": "string",
      "description": "Badge text content",
      "example": "New"
    },
    "variant": {
      "type": "string",
      "enum": ["default", "primary", "success", "warning", "danger"],
      "default": "default",
      "description": "Visual style variant"
    }
  },
  "variants": ["default", "primary", "success", "warning", "danger"],
  "examples": [
    {
      "title": "Default Badge",
      "props": { "text": "New", "variant": "default" }
    },
    {
      "title": "Primary Badge",
      "props": { "text": "Featured", "variant": "primary" }
    }
  ],
  "keywords": ["badge", "label", "pill", "tag", "status"]
}
```

### Step 7: Create Storybook Stories

```typescript
// components/atoms/badge/badge.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import './badge.css';

const meta = {
  title: 'Atoms/Badge',
  parameters: { layout: 'centered' },
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'success', 'warning', 'danger']
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'New', variant: 'default' }
};

export const Primary: Story = {
  args: { text: 'Featured', variant: 'primary' }
};

export const Success: Story = {
  args: { text: 'Active', variant: 'success' }
};
```

### Step 8: Test Your Component

Run Storybook and check:

- [ ] Component appears in sidebar
- [ ] All variants render correctly
- [ ] Text is readable (contrast ratio >= 4.5:1)
- [ ] Mobile view looks good (test at 375px)
- [ ] Dark mode looks good (toggle theme)
- [ ] Responsive at all breakpoints
- [ ] Accessibility audit passes (Tab key, no errors)
- [ ] Works with keyboard navigation
- [ ] Screen reader reads it correctly

```bash
bun storybook
# Open http://localhost:6006
# Search for your component
# Test all views
```

### Step 9: Submit PR

```bash
git checkout -b add-badge-component
git add components/atoms/badge/*
git commit -m "Add Badge atom component

- Badge component for labels and status indicators
- Supports 5 variants (default, primary, success, warning, danger)
- WCAG AA accessible
- Fully responsive and dark mode support
- Complete Storybook stories and schema"
git push origin add-badge-component
```

Open a Pull Request with:
- What the component does
- Why it's useful
- Screenshots from Storybook
- Link to GitHub issue (if any)

### Review Criteria

Your PR will be checked for:

- ✅ **Semantic HTML** - Proper tags, no div-ified elements
- ✅ **WCAG AA Compliance** - Accessible markup, keyboard support, color contrast
- ✅ **Design Tokens** - No hardcoded colors/spacing
- ✅ **Complete Schema** - All props documented
- ✅ **Storybook Stories** - All variants and states covered
- ✅ **Mobile Responsive** - Works on 375px viewports
- ✅ **Dark Mode** - Looks good in dark theme
- ✅ **Performance** - Minimal CSS, no bloat

## Questions?

Open an issue or ask in discussions. We're here to help!

Thank you for contributing to AgentStatic! 🚀
```

### Acceptance Criteria

- [x] Introduction/landing page created and styled
- [x] Developer guide covers all main workflows
- [x] AI agent guide explains all tools and patterns
- [x] Contributing guide is clear and beginner-friendly
- [x] All examples are copy-pasteable and correct
- [x] Links between guides work properly
- [x] Mobile-responsive documentation layout
- [x] Code examples syntax-highlighted

**Estimate**: 5 hours

---

## 7.4 Complete Documentation Summary

By end of Phase 7, users have access to **5 documentation layers**:

1. **Storybook** (Interactive visual browser)
   - 50-70 stories
   - All variants visible
   - Interactive controls
   - Accessibility audit results
   - Responsive preview

2. **Developer Guide** (How to use)
   - Quick start
   - Create pages
   - Customize themes
   - Deployment options
   - Troubleshooting

3. **AI Agent Guide** (Tool reference)
   - 5 MCP tools explained
   - Workflows with examples
   - Decision trees for common requests
   - Limitations clearly stated
   - Page composition patterns

4. **Contributing Guide** (How to add)
   - Step-by-step process
   - File structure template
   - Review criteria
   - Testing checklist

5. **In-Code Documentation** (Technical)
   - Schema.json metadata
   - CSS comments (why, not what)
   - Storybook stories as examples
   - README files in component directories

---

## Success Metrics

- [x] Storybook loads in <5 seconds (Vite + fast build)
- [x] 50-70 stories showing all 20-30 components and variants
- [x] 100% of components have working stories
- [x] Developer guide enables non-technical users to create pages
- [x] AI agent guide enables autonomous page building
- [x] Contributing guide converts contributors into maintainers
- [x] Accessibility audit passes on all stories (WCAG AA)
- [x] Mobile and dark mode visible in all stories
- [x] Documentation findable and searchable
- [x] All code examples actually work

---

## Implementation Checklist

- [ ] Storybook configured with Vite
- [ ] Theme customized to match AgentStatic
- [ ] All 20-30 components have stories
- [ ] 50-70 total stories created
- [ ] Introduction page written
- [ ] Developer guide complete
- [ ] AI agent guide complete
- [ ] Contributing guide complete
- [ ] All examples tested
- [ ] Dark mode preview in all stories
- [ ] Accessibility audit enabled
- [ ] Responsive viewport addon working
- [ ] Storybook build optimized (<10 seconds)
- [ ] Documentation deployed alongside app

---

## File Structure

```
.storybook/
├── main.ts                      # Storybook config
├── preview.ts                   # Global setup
├── manager.ts                   # UI customization
├── theme.ts                     # Theme matching AgentStatic
└── stories/
    ├── intro.mdx                # Landing page
    ├── getting-started.mdx      # Developer quick start
    └── ai-agent-guide.mdx       # AI agent tool reference

components/
├── atoms/
│   ├── button/
│   │   ├── button.html
│   │   ├── button.css
│   │   ├── button.schema.json
│   │   └── button.stories.ts
│   └── ... (6 atoms total)
├── molecules/
│   └── ... (5-7 molecules)
└── organisms/
    └── ... (8-10 organisms)

docs/
├── CONTRIBUTING.md              # Contributing guide
├── README.md                    # Project overview
└── ...

site/
├── design-system.css            # Design tokens
├── base.css                     # Reset + typography
└── pages/
    └── examples/
        ├── landing-page.json
        ├── about-page.json
        ├── pricing-page.json
        └── blog-page.json
```

---

## Phase Gate

Before Phase 8 (or product launch):

- [x] Storybook fully functional with all components
- [x] 50-70 stories covering all variants and states
- [x] All documentation complete and reviewed
- [x] Examples tested and working
- [x] Accessibility audit passing on all stories
- [x] Mobile responsive verified
- [x] Dark mode working throughout
- [x] Ready for external users and contributors

---

## Integration with Deployment

Phase 7 feeds into:
- **Public Storybook** deployed to Vercel/Netlify as live reference
- **Documentation site** built from `.storybook/stories/` MDX files
- **Example compositions** used in tutorials and guides
- **Contributing guide** in GitHub repo for new contributors

---

*Phase 7 Plan v3.0 (Comprehensive Rewrite) - October 24, 2025*

**Key Changes from Previous Version**:
- Shifted focus to **Storybook 80/20** (visuals + code snippets, not exhaustive docs)
- Added **5-layer documentation structure** (visual, developer, AI, contributor, in-code)
- Created **AI agent guide** as first-class documentation (decision #15)
- Emphasized **real content** over Lorem ipsum in all stories
- Added **decision tree** for common AI agent requests
- Reframed as **supporting both human and AI users** equally
- Included specific **story count targets** (50-70 total)
- Added **accessibility testing** and dark mode previews as standard
