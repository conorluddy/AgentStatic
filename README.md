# 🚀 AgentStatic - GitHub Template Repository

[![Node.js 24+](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-green)](https://pages.github.com/)
[![codecov](https://codecov.io/gh/conorluddy/AgentStatic/graph/badge.svg?token=YOUR_TOKEN)](https://codecov.io/gh/conorluddy/AgentStatic)

> **AI-Native Static Site Generator with TypeScript-First Templating**  
> Create beautiful static sites in < 2 minutes with automatic GitHub Pages deployment

## ✨ Quick Start - Use This Template

**[📋 Use This Template](https://github.com/conorluddy/AgentStatic/generate)** ← Click here to create your site!

1. **Click "Use this template"** → GitHub creates your repository
2. **Wait ~2 minutes** → Automatic setup runs and configures everything
3. **Your site is live!** → Available at `https://yourusername.github.io/yoursite`
4. **Clone and customize** → Start editing content in `content/` directory

## 🎯 What You Get Instantly

- ✅ **Professional static site** deployed to GitHub Pages automatically
- ✅ **Sample content structure** (homepage, about, blog posts) ready to customize
- ✅ **Responsive design** with modern CSS and mobile optimization
- ✅ **SEO optimized** with meta tags, Open Graph, and automatic sitemaps
- ✅ **TypeScript-first development** with zero-configuration setup
- ✅ **Hot reload development** server for rapid iteration
- ✅ **Quality gates** with pre-commit hooks and automated testing

## 🏗️ Architecture Overview

AgentStatic is designed as a **GitHub Template Repository** that combines modern static site generation with AI-native capabilities (coming soon). Perfect for:

- 📸 **Photography Portfolios** - Advanced media handling and galleries
- 💻 **Developer Blogs** - Code showcases with syntax highlighting  
- 🏢 **Agency Websites** - Professional sites with custom branding
- 📚 **Documentation Sites** - Technical content with navigation
- 🎨 **Creative Showcases** - Art, design, and multimedia portfolios

## 🚀 Working Features ✅

### Core Static Site Generation
- **Markdown-based content** with YAML frontmatter
- **Template system** with TypeScript partial components  
- **Asset optimization** with Sharp image processing
- **GitHub Pages deployment** with automated workflows
- **SEO optimization** with structured meta tags and sitemaps

### Development Experience  
- **TypeScript-first** with strict typing and zero `any` policy
- **Zod schema validation** for runtime and compile-time safety
- **ESBuild** for lightning-fast builds (< 100ms)
- **Vitest** testing framework with 90%+ coverage requirements
- **ESLint + Prettier** with automated formatting

### Template Repository Features
- **Automatic setup** workflow that customizes new repositories
- **Sample content** with professional homepage, about, and blog post
- **Configuration templates** with variable replacement
- **Welcome documentation** created automatically for new users
- **GitHub Actions** pre-configured for continuous deployment

## 🚧 Planned Features (Roadmap)

### Phase 2: Core CMS Engine (In Progress)
- [ ] Partial registry and discovery system
- [ ] Dynamic content processing pipeline  
- [ ] Template composition engine
- [ ] File watching and hot reload

### Phase 3: AI Integration (Planned)
- [ ] **Model Context Protocol (MCP)** plugin architecture
- [ ] AI-powered content generation and optimization
- [ ] Natural language templating
- [ ] Intelligent image processing and SEO

### Phase 4: Advanced Features (Planned)
- [ ] Multi-theme support
- [ ] Advanced gallery systems
- [ ] E-commerce integrations
- [ ] Multi-language support

## 📁 Project Structure

When you use this template, your repository will contain:

```
your-site/
├── content/              # Your Markdown content
│   ├── pages/           # Static pages (index.md, about.md)
│   └── posts/           # Blog posts
├── assets/              # Images, videos, media files
├── site.config.json     # Site configuration
├── scripts/             # Build and deployment scripts
└── .github/workflows/   # GitHub Actions for deployment
```

## ⚙️ Configuration

Edit `site.config.json` to customize your site:

```json
{
  "site": {
    "title": "My AgentStatic Site",
    "description": "A beautiful static site powered by AgentStatic",
    "url": "https://yourusername.github.io/yoursite",
    "author": {
      "name": "Your Name",
      "email": "you@example.com"
    }
  },
  "build": {
    "outputDir": "dist",
    "optimizeImages": true,
    "generateSitemap": true
  }
}
```

## 🎨 Content Management

### Pages
Edit files in `content/pages/` to update static pages:
- `index.md` - Homepage content
- `about.md` - About page
- Add more `.md` files for additional pages

### Blog Posts
Add new blog posts in `content/posts/`:
```markdown
---
title: "My New Post"
date: 2024-01-15
tags: ["web", "development"]
---

Your blog post content here...
```

### Assets
Place images and media in `assets/` directory. They'll be automatically optimized during build.

## 🚀 Development

### Local Development
```bash
# Clone your template repository
git clone https://github.com/yourusername/your-site.git
cd your-site

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build static site for production
- `npm run build:pages` - Build and deploy to GitHub Pages
- `npm run test` - Run test suite
- `npm run lint` - Check code quality

## 🆚 Why AgentStatic?

| Feature | AgentStatic | Gatsby | Next.js | Hugo |
|---------|-------------|--------|---------|------|
| **Setup Time** | < 2 minutes | ~30 minutes | ~15 minutes | ~10 minutes |
| **TypeScript-First** | ✅ Built-in | 🔧 Setup required | ✅ Built-in | ❌ Not supported |
| **AI-Native** | 🚧 Coming Soon | ❌ Plugin only | ❌ Custom only | ❌ Not supported |
| **Zero Config Deployment** | ✅ GitHub Actions | 🔧 Setup required | 🔧 Setup required | 🔧 Setup required |
| **Template Repository** | ✅ One-click | ❌ Manual setup | ❌ Manual setup | ❌ Manual setup |
| **Creative Professional Focus** | ✅ Built for portfolios | 🔧 Requires plugins | 🔧 Custom development | 🔧 Limited themes |

## 🎯 Use Cases

### For Photographers
- **High-resolution galleries** with lazy loading and lightbox
- **EXIF data preservation** and display
- **Multiple format support** (WebP, AVIF auto-generation)
- **Mobile-responsive** image serving

### For Developers  
- **Code syntax highlighting** for 20+ languages
- **GitHub integration** for project showcases
- **Technical documentation** with auto-generated navigation
- **Performance optimized** with sub-100ms builds

### For Agencies
- **Custom branding** with flexible theming
- **Client portfolio** management
- **SEO optimization** built-in
- **Professional deployment** pipeline

## 🛠️ Development Roadmap

### ✅ Phase 1: Template Foundation (Complete)
- GitHub Template Repository setup
- Basic static site generation
- GitHub Pages deployment automation
- TypeScript-first development environment
- Quality gates and testing infrastructure

### 🚧 Phase 2: Core Engine (In Progress - Issues #7-#15)
- Partial registry and discovery system
- Content processing pipeline  
- Template composition engine
- Development server with hot reload

### 📋 Phase 3: MCP Integration (Planned - Issues #16-#25)
- Model Context Protocol server implementation
- AI-powered partial composition
- Natural language templating
- Intelligent content optimization

### 🔮 Phase 4: Advanced Features (Future)
- Multi-site management
- E-commerce integration
- Advanced analytics
- Plugin marketplace

## 🤝 Contributing

We welcome contributions! This project follows a structured development approach:

### For Template Users
- **Report issues** with template setup or deployment
- **Request features** for better static site generation
- **Share examples** of sites built with AgentStatic

### For Developers  
- **Check open issues** for areas needing help
- **Follow TypeScript strict mode** (zero `any` types)
- **Add tests** for new functionality (90%+ coverage)
- **Use conventional commits** for PR organization

### Development Setup
```bash
git clone https://github.com/conorluddy/AgentStatic.git
cd AgentStatic
npm install
npm run dev
npm test
```

## 📊 Project Status

- **Template Repository**: ✅ Production Ready
- **Static Site Generation**: ✅ Working  
- **GitHub Pages Deployment**: ✅ Automated
- **TypeScript Foundation**: ✅ Complete
- **Testing Infrastructure**: ✅ 19 tests passing
- **Core CMS Engine**: 🚧 In Development (Issues #7-#15)
- **MCP Integration**: 📋 Planned (Issues #16-#25)

## 📚 Documentation

- **[Getting Started](./docs/getting-started.md)** - Complete setup guide
- **[Template Development](./docs/templates.md)** - Creating custom templates  
- **[Content Management](./docs/content.md)** - Working with Markdown and assets
- **[Deployment Guide](./docs/deployment.md)** - GitHub Pages and other platforms
- **[Contributing](./CONTRIBUTING.md)** - Development guidelines
- **[Roadmap](./docs/roadmap.md)** - Future feature plans

## 🌟 Community

- **[GitHub Discussions](https://github.com/conorluddy/AgentStatic/discussions)** - Community support
- **[Issues](https://github.com/conorluddy/AgentStatic/issues)** - Bug reports and feature requests
- **[Examples](https://github.com/topics/agentstatic)** - Sites built with AgentStatic

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

Built with modern web technologies:
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Zod](https://zod.dev/)** - Schema validation
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization  
- **[Unified](https://unifiedjs.com/)** - Markdown processing
- **[Vitest](https://vitest.dev/)** - Testing framework
- **[ESBuild](https://esbuild.github.io/)** - Fast bundling

---

**Ready to build your site?** **[📋 Use This Template](https://github.com/conorluddy/AgentStatic/generate)**

*AgentStatic - Where AI meets static site generation* ✨