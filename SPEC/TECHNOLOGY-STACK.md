# Technology Stack

## Core Technologies

### Runtime & Build
- **Bun 1.0+** - Modern JavaScript runtime (faster than Node.js)
- **Vite 5+** - Lightning-fast build tool
- **TypeScript 5+** - Type safety throughout

### Templating & Rendering
- **Nunjucks** - Logic-light templating engine
- **PostCSS** - CSS processing
- **Lightning CSS** - Fast CSS minification

### Documentation
- **Storybook 8** - Component development and documentation
- **MDX** - Rich documentation format

### AI Integration
- **MCP (Model Context Protocol)** - Anthropic's standard for AI tools
- **JSON Schema** - Component and validation schemas

## Why These Choices?

### Why Bun?
- 4x faster than Node.js for our use case
- Built-in TypeScript support
- Excellent package management
- Modern and actively developed

### Why Vite?
- Instant HMR in development
- Optimized production builds
- First-class CSS handling
- Plugin ecosystem

### Why Nunjucks?
- Logic-light (perfect for static sites)
- Familiar syntax (similar to Jinja2/Liquid)
- Excellent error messages
- Easy for AI to understand

### Why Lightning CSS?
- 100x faster than traditional minifiers
- Modern CSS features support
- Smaller output sizes
- Built in Rust for performance

### Why Storybook?
- Industry standard for component development
- Excellent addon ecosystem
- Good accessibility testing tools
- Visual regression testing support

### Why MCP?
- Designed specifically for AI agents
- Standardized by Anthropic
- Clear tool interfaces
- Good error handling

## Technology Constraints

### What We DON'T Use
- ❌ CSS preprocessors (Sass, Less) - use modern CSS
- ❌ JavaScript frameworks (React, Vue) - pure HTML/CSS
- ❌ Complex bundlers (Webpack) - Vite is sufficient
- ❌ CSS-in-JS - separation of concerns
- ❌ Server-side rendering - static only
- ❌ Database - file-based only

## Performance Targets

- Build time: <10 seconds for 100 pages
- Dev server start: <1 second
- HMR update: <100ms
- CSS bundle: <50KB gzipped
- Zero runtime JavaScript for core

## Browser Support

- Chrome 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)
- Edge 90+ (2021)
- No IE11 support

## Development Environment

### Required
- Bun 1.0+
- Git 2.0+
- VS Code or similar editor

### Recommended
- VS Code extensions:
  - Nunjucks syntax highlighting
  - PostCSS syntax
  - Storybook extension
  - ESLint
  - Prettier

## CI/CD Pipeline

### Testing
- Vitest for unit tests
- Playwright for E2E tests
- Pa11y for accessibility
- Lighthouse CI for performance

### Build & Deploy
- GitHub Actions for CI
- Netlify/Vercel for hosting
- Automated preview deployments
- Performance budgets enforced