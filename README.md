# 🚀 AgentStatic - GitHub Template Repository

[![Node.js 24+](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-green)](https://pages.github.com/)
[![Template](https://img.shields.io/badge/GitHub-Template%20Repository-success)](https://github.com/conorluddy/AgentStatic/generate)
[![Tests Passing](https://img.shields.io/badge/Tests-19%20passing-brightgreen)](https://github.com/conorluddy/AgentStatic/actions)

> **Production-Ready GitHub Template Repository**  
> Create professional static sites in < 5 minutes with automatic GitHub Pages deployment

## ✨ Use This Template Now

**[📋 Use This Template](https://github.com/conorluddy/AgentStatic/generate)** ← Click to create your site instantly!

### What Happens When You Click "Use This Template"

1. **GitHub creates your new repository** from this working template
2. **Automatic setup workflow runs** (< 2 minutes) that:
   - Configures your site with your repository details
   - Sets up sample content structure
   - Creates a welcome issue with next steps
   - Prepares GitHub Pages deployment
3. **Manual step: Enable GitHub Pages** (one-time, 30 seconds):
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Click Save
4. **Push to main branch** → Your site deploys automatically!
5. **Your site is live** at `https://yourusername.github.io/yourrepo`

Total time: **< 5 minutes** including the manual Pages setup

## 🎯 What's Working Today

### ✅ Fully Functional Features

- **GitHub Template Repository** - One-click setup with automatic configuration
- **Automatic Setup Workflow** - Configures your repository on creation
- **GitHub Pages Deployment** - Push to main = instant deployment
- **TypeScript-First Development** - Write custom partials with full type safety
- **Sample Content Structure** - Homepage, about page, and blog post ready to edit
- **Clean Development Environment** - ESLint + Prettier configured
- **Professional Demo Site** - See it live at [conorluddy.github.io/AgentStatic](https://conorluddy.github.io/AgentStatic)

### 🚧 In Active Development

- **Core Static Site Engine** - Markdown processing pipeline (Issues #7-#15)
- **Partial System** - Component-based templating
- **Asset Optimization** - Image processing with Sharp
- **Development Server** - Hot reload for rapid development

### 📋 Planned Features

- **MCP Integration** - AI-powered content generation via Model Context Protocol
- **Advanced Media Handling** - Galleries, lazy loading, responsive images
- **Multi-theme Support** - Swappable visual themes
- **Plugin Marketplace** - Extend with community plugins

## 🏗️ Project Structure

When you use this template, your repository will have:

```
your-site/
├── content/              # Your Markdown content
│   ├── pages/           # Static pages (index.md, about.md)
│   └── posts/           # Blog posts
├── assets/              # Images, videos, media files
├── src/                 # TypeScript development
│   └── partials/        # Custom components (TypeScript-first)
├── scripts/             # Build and deployment scripts
├── site.config.json     # Site configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Quick Start Guide

### Step 1: Create Your Repository

1. Click **[Use This Template](https://github.com/conorluddy/AgentStatic/generate)**
2. Name your repository (e.g., "my-portfolio" or "company-blog")
3. Make it public (required for free GitHub Pages hosting)
4. Click "Create repository from template"

### Step 2: Wait for Automatic Setup

Watch the Actions tab - a workflow will:
- Configure your site with your repository details
- Set up the content structure
- Create a welcome issue with instructions
- Prepare for GitHub Pages deployment

This takes about 2 minutes.

### Step 3: Enable GitHub Pages (One-Time Setup)

**Important**: This manual step is required once per repository:

1. Go to your repository's **Settings** tab
2. Scroll down to **Pages** section (left sidebar)
3. Under **Source**, select **"GitHub Actions"**
4. Click **Save**

That's it! This tells GitHub to use our deployment workflow.

### Step 4: Clone and Customize

```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Start development (coming soon - for now, edit directly)
# npm run dev

# Make changes to content/ and push
git add .
git commit -m "Update content"
git push origin main
```

### Step 5: Your Site is Live!

After pushing to main, check the Actions tab. Once the deployment workflow completes:
- Visit `https://YOUR_USERNAME.github.io/YOUR_REPO`
- Your professional static site is live!

## 📝 Content Management

Edit Markdown files in the `content/` directory:

### Pages
- `content/pages/index.md` - Your homepage
- `content/pages/about.md` - About page
- Add more `.md` files for additional pages

### Blog Posts
Create posts in `content/posts/`:
```markdown
---
title: "My First Post"
date: 2024-01-15
tags: ["web", "development"]
description: "Welcome to my new blog"
---

Your blog post content here...
```

### Site Configuration
Edit `site.config.json`:
```json
{
  "site": {
    "title": "My AgentStatic Site",
    "description": "A beautiful static site",
    "author": {
      "name": "Your Name",
      "email": "you@example.com"
    }
  }
}
```

## 🛠️ Development

### TypeScript-First Approach

This template includes a TypeScript development environment:

```typescript
// src/partials/custom-hero.ts
export const customHero = {
  name: 'custom-hero',
  category: 'layout',
  description: 'My custom hero section',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional()
  }),
  template: (props, helpers) => {
    return `<div class="hero">
      <h1>${props.title}</h1>
      ${props.subtitle ? `<p>${props.subtitle}</p>` : ''}
    </div>`;
  }
};
```

### Available Scripts

- `npm run type-check` - Check TypeScript types
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run build:pages` - Build demo site (development only)

## 🆚 Why Choose AgentStatic?

| Feature | AgentStatic | Jekyll | Hugo | Gatsby |
|---------|-------------|--------|------|--------|
| **Setup Time** | < 5 minutes | ~20 minutes | ~15 minutes | ~30 minutes |
| **GitHub Template** | ✅ One-click | ❌ Manual | ❌ Manual | ❌ Manual |
| **TypeScript-First** | ✅ Native | ❌ No | ❌ No | 🔧 Config needed |
| **Automatic Deploy** | ✅ Built-in | 🔧 Config | 🔧 Config | 🔧 Complex |
| **AI-Ready (MCP)** | 🚧 Coming | ❌ No | ❌ No | ❌ No |
| **Zero Config** | ✅ Yes | ❌ No | ❌ No | ❌ No |

## 🎯 Perfect For

- **Developers** - TypeScript-first with professional tooling
- **Photographers** - Portfolio-ready with image optimization (coming soon)
- **Bloggers** - Clean, fast, SEO-optimized blogs
- **Agencies** - Quick client sites with custom branding
- **Documentation** - Technical docs with great navigation (coming soon)

## ❓ Troubleshooting

### GitHub Pages Not Working?

1. **Did you enable GitHub Pages?**
   - Settings → Pages → Source: "GitHub Actions" → Save
   - This is a one-time manual step

2. **Check Actions tab**
   - Look for the "Deploy to GitHub Pages" workflow
   - It should run after each push to main
   - Check for any error messages

3. **Repository must be public**
   - Free GitHub Pages requires public repositories
   - Or have GitHub Pro for private repos

### Template Setup Issues?

1. **Check the Actions tab**
   - "Template Repository Setup" workflow should run automatically
   - Look for any errors in the logs

2. **Welcome issue not created?**
   - The setup workflow creates this automatically
   - If missing, the setup may have failed - check Actions logs

3. **Can I run setup manually?**
   ```bash
   npm install
   node scripts/setup-template.js
   ```

## 🤝 Contributing

We welcome contributions! AgentStatic is in active development:

### Current Focus Areas

1. **Core Engine** (Issues #7-#15) - Help build the static site generator
2. **Documentation** - Improve guides and examples
3. **Templates** - Create beautiful themes
4. **Testing** - Increase test coverage

### Development Setup

```bash
# Clone the main repository (not a template)
git clone https://github.com/conorluddy/AgentStatic.git
cd AgentStatic

# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run type-check
```

### Contribution Guidelines

- Follow TypeScript strict mode (no `any` types)
- Add tests for new features (90%+ coverage target)
- Use conventional commits
- Update documentation

## 📊 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Template Repository | ✅ **Production Ready** | Fully functional, well-tested |
| GitHub Actions | ✅ **Working** | Automatic setup and deployment |
| TypeScript Setup | ✅ **Complete** | Strict mode, zero `any` policy |
| Sample Content | ✅ **Included** | Ready to customize |
| Core Engine | 🚧 **In Development** | Markdown processing pipeline |
| MCP Integration | 📋 **Planned** | AI-powered features coming |

## 🌟 Examples & Showcase

Built something with AgentStatic? We'd love to see it!

- Submit a PR adding your site to this list
- Use the `#agentstatic` tag on social media
- Share in our [GitHub Discussions](https://github.com/conorluddy/AgentStatic/discussions)

## 📚 Documentation

- **[Getting Started](./docs/getting-started.md)** - Detailed setup guide
- **[Template Development](./docs/templates.md)** - Create custom templates
- **[Deployment Guide](./docs/deployment.md)** - Platform-specific deployment
- **[Contributing](./CONTRIBUTING.md)** - Development guidelines
- **[Architecture](./TEMPLATE_ARCHITECTURE.md)** - Technical deep dive

## 🚀 Roadmap

### Q1 2024 (Current)
- ✅ GitHub Template Repository
- ✅ Automatic setup workflow
- 🚧 Core static site engine
- 🚧 Markdown processing

### Q2 2024
- 📋 MCP plugin architecture
- 📋 AI content generation
- 📋 Advanced media handling
- 📋 Theme marketplace

### Q3 2024
- 📋 Multi-language support
- 📋 E-commerce features
- 📋 Advanced analytics
- 📋 CDN integration

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with modern web technologies:
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Zod](https://zod.dev/)** - Runtime validation
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image processing
- **[Unified](https://unifiedjs.com/)** - Markdown processing
- **[Vitest](https://vitest.dev/)** - Testing framework

Special thanks to the open source community and early adopters testing AgentStatic!

---

<div align="center">

**Ready to build your site?** 

**[📋 Use This Template](https://github.com/conorluddy/AgentStatic/generate)**

*AgentStatic - Where static sites meet AI innovation* ✨

</div>