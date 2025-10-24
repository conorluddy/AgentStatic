# Phase 0: SSG Foundation & Build Pipeline

**Duration**: Weeks 1-2 (parallel with Phase 1) | **Effort**: 25 hours | **Priority**: Critical

---

## Overview

Establish the **complete static site generation core** that all components and pages depend on. This phase runs **in parallel with Phase 1** (Component Foundation) to maximize velocity and create a fully functioning template immediately.

**Key Focus** (reflecting 17 refined decisions):
- **Bun + Vite** build pipeline (not Node/npm)
- **Nunjucks** template rendering (logic-light)
- **Static file-based routing only** (pages → routes, no dynamic generation)
- **CI/CD from day one** (GitHub Actions with accessibility testing)
- **Bundle monitoring** (warnings, not blocks)
- **JSON compositions** (structured page data format)

---

## Deliverables

### 0.1 Project Structure & Build Pipeline

**Goal**: Get from `bun install` to working dev server in <5 minutes

**What to Build**:
- **Bun project** setup with `bun.toml` (not package.json focused)
- **Vite configuration**: Dev (with HMR) and production (with minification) configs
- **PostCSS pipeline**: CSS processing with Lightning CSS minification
- **Output structure**: Clean `dist/` with HTML, CSS, assets

**Acceptance Criteria**:
- [ ] `bun install` sets up entire project
- [ ] `bun run dev` starts dev server with HMR (hot module reload)
- [ ] `bun run build` produces optimized static output
- [ ] Build completes in <10 seconds for incremental changes
- [ ] CSS properly minified using Lightning CSS and hashed for cache-busting
- [ ] All source maps work in development, excluded from production
- [ ] Bundle size monitoring included in build output (warnings only, not blocking)

**Estimate**: 8 hours

**Technical Notes**:
```typescript
// core/engine/build-config.ts - Key build settings
export interface BuildConfig {
  // Bun runtime config
  runtime: 'bun';
  minNode: '20.0.0';

  // Vite config
  viteConfig: {
    dev: { hsr: true };  // Hot module reload
    build: {
      minify: 'esbuild';
      cssCodeSplit: false; // Single CSS file
      reportCompressedSize: true;
    };
  };

  // CSS settings
  css: {
    minifier: 'lightningcss';
    bundleTarget: '<50KB'; // With all Phase 2-4 components
    warnings: true; // Bundle size warnings
  };
}
```

---

### 0.2 Template Engine Integration

**Goal**: Render HTML from JSON compositions + component templates

**What to Build**:
- **Nunjucks engine**: Configure as primary template renderer (logic-light, AI-friendly)
- **Template filters**: Custom filters for common operations (asset paths, CSS classes, theme vars)
- **Page composition loader**: Load JSON compositions as page specs
- **Layout system**: Base template with `<head>`, `<body>`, dark mode toggle
- **Global data**: Site config, metadata, theme variables accessible to all templates

**Acceptance Criteria**:
- [ ] Can render a template from JSON page composition
- [ ] Component templates load correctly from `components/` directory
- [ ] Global variables accessible (siteTitle, theme, darkModeToggle, etc.)
- [ ] Custom filters work (asset paths, CSS classes, color tokens, etc.)
- [ ] Error messages are helpful and include file/line numbers
- [ ] Template syntax documented with examples
- [ ] Dark mode toggle rendered in page template (manual control via localStorage)

**Estimate**: 6 hours

**Page Composition Format** (JSON):
```json
{
  "path": "/landing",
  "title": "Our Product",
  "components": [
    {
      "type": "hero",
      "variant": "split",
      "props": {
        "heading": "Build fast",
        "image": "/assets/hero.jpg"
      }
    },
    {
      "type": "feature-section",
      "variant": "default",
      "props": { ... }
    }
  ],
  "metadata": {
    "description": "...",
    "canonical": "https://example.com/landing"
  }
}
```

---

### 0.3 File-Based Routing (Static Only)

**Goal**: Convert file structure to URLs automatically, **static routing only**

**What to Build**:
- **Page discovery**: Find all `.json` page compositions in `site/pages/`
- **Route builder**: Convert `site/pages/about.json` → `dist/about/index.html`
- **URL generation**: Nested pages work (`site/pages/blog/post.json` → `dist/blog/post/index.html`)
- **Static file copy**: Copy static assets without rendering
- **Sitemap generation**: Auto-generate `sitemap.xml` from all routes

**Key Decision**: **NO dynamic route generation** in Phase 0-7. One file = one route. If users need dynamic routes later (Phase 8+), that's a future enhancement.

**Acceptance Criteria**:
- [ ] All `.json` files in `site/pages/` discovered automatically
- [ ] Routes generated without manual configuration
- [ ] Nested directories work correctly
- [ ] `sitemap.xml` auto-generated and valid
- [ ] Can exclude certain pages from sitemap
- [ ] Clear error messages for malformed page definitions
- [ ] Build fails gracefully if page references non-existent components

**Estimate**: 4 hours

---

### 0.4 CSS Asset Pipeline

**Goal**: Bundle, minify, and optimize all CSS

**What to Build**:
- **CSS bundling**: Collect all component CSS into single output file
- **CSS minification**: Use Lightning CSS for ultra-fast processing
- **Bundle size monitoring**: Report current size, warn if approaching 50KB limit (don't block)
- **Asset hashing**: Generate content-hashed filenames for cache-busting
- **Dark mode CSS**: Ensure all CSS variables support `prefers-color-scheme` media query

**Key Decision**: Bundle monitoring provides **warnings only** (informational, not blocking). Build succeeds even if approaching limit.

**Acceptance Criteria**:
- [ ] All component CSS bundled into single `.css` file
- [ ] CSS minified using Lightning CSS (not cssnano)
- [ ] Bundle size reported at end of build (e.g., "CSS: 28KB gzipped")
- [ ] Bundle size warnings logged if >45KB (not blocking)
- [ ] Asset hashing works (filename includes content hash)
- [ ] CSS source maps available in development mode
- [ ] All dark mode variables working (`prefers-color-scheme` queries)

**Estimate**: 5 hours

---

### 0.5 Build Orchestration & CI/CD

**Goal**: Tie everything together, add automation and testing

**What to Build**:
- **Build orchestrator**: Main entry point that coordinates all build steps
- **Incremental builds**: Only rebuild changed pages (watch mode)
- **Watching**: Monitor source files and rebuild on changes
- **Error handling**: Clear, actionable error messages
- **Logging**: Informative build logs with timing
- **GitHub Actions CI/CD**: Automated testing on each commit
  - Build test
  - Accessibility testing (Pa11y, axe)
  - Bundle size reporting
  - Tests must pass before PR merge

**Key Decision**: **Accessibility testing is automated** via Pa11y + axe in CI/CD. No manual testing required for Phase 0-7.

**Acceptance Criteria**:
- [ ] `bun run build` completes all steps in order
- [ ] `bun run dev` watches for changes and rebuilds
- [ ] Watch mode detects changes within <1 second
- [ ] Build failures show clear, actionable error messages
- [ ] Build logs show progress and timings
- [ ] Can run build headlessly (no user input)
- [ ] GitHub Actions workflow configured (`.github/workflows/build.yml`)
- [ ] Accessibility tests run automatically on PR
- [ ] Build status visible on PRs

**Estimate**: 6 hours

---

## Configuration Files

### `bun.toml`
```toml
[build]
root = "."
target = "node"
entrypoints = ["core/cli/cli.ts"]

[test]
root = "."

[env]
NODE_ENV = "development"
```

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  root: '.',
  publicDir: 'site/assets',
  build: {
    target: 'esnext',
    outDir: 'dist',
    minify: 'esbuild',
    cssCodeSplit: false, // Single CSS file
    reportCompressedSize: true,
    sourcemap: false // Production: no source maps
  },
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    middlewareMode: false,
    watch: {
      include: ['site/**', 'components/**', 'core/**']
    }
  }
})
```

### `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    'autoprefixer': { browsers: ['> 1%', 'last 2 versions'] },
    'lightningcss': {} // Ultra-fast minification
  }
}
```

### `.github/workflows/build.yml`
```yaml
name: Build & Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Test accessibility
        run: bun run test:a11y

      - name: Report bundle size
        run: bun run bundle-size
```

### `agentstatic.config.json` (Site Config)
```json
{
  "siteTitle": "My Site",
  "siteDescription": "A beautiful brochureware site",
  "siteUrl": "https://example.com",
  "author": "Your Name",

  "build": {
    "outputDir": "dist",
    "cleanOutputDir": true,
    "minifyCss": true,
    "hashAssets": true,
    "bundleSizeWarning": "45KB",
    "bundleSizeError": null
  },

  "theme": {
    "darkMode": {
      "system": true,
      "toggle": true
    }
  },

  "navigation": {
    "main": [
      { "label": "Home", "url": "/" },
      { "label": "About", "url": "/about" }
    ]
  }
}
```

---

## File Structure After Phase 0

```
agentstatic/  (clonable template)
├── core/                       # SSG core (Phase 0)
│   ├── engine/
│   │   ├── template-engine.ts   # Nunjucks setup + filters
│   │   ├── composition-loader.ts # Load JSON page compositions
│   │   ├── filter-registry.ts   # Custom template filters
│   │   ├── globals.ts           # Global template variables
│   │   └── dark-mode.ts         # Dark mode system setup
│   ├── router/
│   │   ├── route-builder.ts     # Static routes from pages/
│   │   ├── page-discovery.ts    # Find all page compositions
│   │   └── sitemap-generator.ts # Auto-generate sitemap.xml
│   ├── builder/
│   │   ├── index.ts             # Main build orchestrator
│   │   ├── page-renderer.ts     # Render individual pages
│   │   ├── watch-mode.ts        # File watching
│   │   └── logger.ts            # Build logging
│   ├── assets/
│   │   ├── css-bundler.ts       # CSS collection + minification
│   │   ├── asset-hasher.ts      # Content-based hashing
│   │   └── bundle-monitor.ts    # Size reporting (warnings only)
│   ├── config/
│   │   └── build-config.ts      # Build configuration
│   └── cli/
│       └── cli.ts               # Command-line interface
│
├── components/                 # Added in Phase 1
│   └── (structure from Phase 1)
│
├── site/                       # User content
│   ├── pages/                  # JSON page compositions
│   │   └── index.json          # Homepage composition
│   ├── assets/                 # User assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── custom.css          # Optional custom styles
│   └── content/                # Optional markdown/text content
│
├── .github/
│   └── workflows/
│       └── build.yml           # CI/CD automation
│
├── dist/                       # Build output (gitignored)
│   ├── index.html
│   ├── assets/
│   │   ├── styles.[hash].css
│   │   └── images/
│   └── sitemap.xml
│
├── tests/                      # Phase 0 basic tests
│   └── build.test.ts
│
├── bun.toml
├── vite.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
├── .agentstatic.config.json
└── README.md
```

---

## Integration Points

Phase 0 establishes the **build infrastructure** that Phases 1-7 depend on:

1. **Template Engine** loads component templates from Phase 2-4
2. **CSS Bundler** collects CSS files from components
3. **Page Composition Loader** processes JSON page definitions
4. **Asset Pipeline** optimizes component-related assets
5. **CI/CD** validates accessibility on every commit

When Phase 2 adds the first component:
```
components/atoms/button/
├── button.html              ← Loaded by template engine
├── button.css               ← Bundled by css-bundler
└── button.schema.json       ← Metadata for registry
```

The build pipeline treats components as **first-class citizens** from day one.

---

## Key Decisions (Reflecting All 17 Refinements)

| Decision | Choice | Why |
|----------|--------|-----|
| **Runtime** | Bun | Modern, fast, excellent DX |
| **Build Tool** | Vite | Fast dev server, proven performance |
| **Templating** | Nunjucks | Logic-light, AI-parseable |
| **CSS Minifier** | Lightning CSS | Ultra-fast, Rust-based |
| **Routing** | Static file-based | Simple, predictable, no complexity |
| **Page Format** | JSON compositions | Structured, validated, agent-friendly |
| **CSS Bundling** | Single file | Simpler caching, better performance |
| **Bundle Monitoring** | Warnings only | Information without blocking |
| **Dark Mode** | System + toggle | Best UX (automatic + manual override) |
| **A11y Testing** | Automated (Pa11y, axe) | Fast, repeatable, cost-effective |
| **CI/CD** | GitHub Actions | Integrated, free, proven |

---

## Success Metrics

- [ ] Build time: <5 seconds for incremental changes
- [ ] Dev setup: <5 minutes from clone to running dev server
- [ ] CSS output: Properly minified and hashed, <50KB budget
- [ ] Error messages: Helpful, include file/line info
- [ ] Source maps: Working in dev, excluded from prod
- [ ] Bundle reporting: Visible and informative
- [ ] Accessibility: Tests run automatically in CI
- [ ] Template rendering: Fast and error-clear

---

## Phase Gate (Before Moving to Phase 1)

Phase 0 must be complete before components are built:

**Must Have**:
- [ ] Dev server runs with HMR
- [ ] Build completes successfully
- [ ] Basic page composition renders
- [ ] CSS pipeline operational
- [ ] Error handling clear and helpful
- [ ] GitHub Actions CI/CD passing
- [ ] Bundle size reporting working

Only then proceed to Phase 1.

---

## Open Questions

1. **Asset Optimization**: How aggressive should image optimization be? Responsive images, WebP, etc.?
   - *Decision*: Start simple (copy only), add plugins in Phase 4+ if needed

2. **Watch Mode Performance**: Should watch mode rebuild entire site or only changed pages?
   - *Decision*: Incremental rebuilds only (changed pages)

3. **Dynamic Routes**: Should we support dynamic route generation (e.g., per-variant pages)?
   - *Decision*: No, out of scope for Phase 0-7. Static routing only.

4. **Plugin System**: Should build system support plugins?
   - *Decision*: Out of scope for launch. Evaluate post-Phase 7.

---

## Next Phase

**Phase 1** (Component Foundation) runs in parallel:
- Design tokens definition
- CSS architecture setup
- Theme system implementation
- Dark mode infrastructure
- Storybook configuration

Both Phase 0 and Phase 1 complete by end of Week 2.

---

*Phase 0 Plan v2.0 (Refined) - October 24, 2025*
