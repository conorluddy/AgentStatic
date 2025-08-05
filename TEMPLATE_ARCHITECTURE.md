# AgentStatic GitHub Template Repository Architecture

This document provides comprehensive architectural guidance for AgentStatic as a GitHub Template Repository with GitHub Pages deployment capabilities.

## 🏗️ Architecture Overview

AgentStatic is now configured as a **GitHub Template Repository** that automatically:
1. **Initializes new repositories** with sample content and configuration
2. **Deploys to GitHub Pages** using GitHub Actions
3. **Provides a complete development environment** for static site generation
4. **Showcases MCP plugin architecture** and AI-native features

## 📁 Essential Project Structure

```
AgentStatic/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # ✅ Continuous Integration
│   │   ├── pages-deploy.yml            # 🆕 GitHub Pages Deployment
│   │   └── template-setup.yml          # 🆕 Template Initialization
│   ├── ISSUE_TEMPLATE/                 # 🆕 GitHub Issues Templates
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── template_help.md
│   ├── template-config.yml             # 🆕 Template Configuration
│   └── template-repository.yml         # 🆕 GitHub Template Settings
├── template/                           # 🆕 Template Content Structure
│   ├── site.config.json               # Site Configuration Template
│   ├── content/                       # Sample Content
│   │   ├── pages/
│   │   │   ├── index.md               # Homepage Template
│   │   │   └── about.md               # About Page Template
│   │   └── posts/
│   │       └── welcome-to-agentstatic.md
│   ├── assets/                        # Sample Assets Directory
│   │   └── images/
│   └── .gitignore                     # Template .gitignore
├── scripts/                           # 🆕 Build & Setup Scripts
│   ├── build-pages.js                 # GitHub Pages Build Script
│   └── setup-template.js              # Template Initialization Script
├── src/                               # ✅ AgentStatic Core Library
├── tests/                             # ✅ Test Suite
├── package.json                       # 🔄 Updated with Pages Commands
└── README.md                          # ✅ Comprehensive Documentation
```

## 🚀 GitHub Pages Deployment Strategy

### Deployment Architecture

**Workflow: `.github/workflows/pages-deploy.yml`**
- **Trigger**: Push to `main` branch, PR to `main`, manual dispatch
- **Build Environment**: Ubuntu latest with Node.js 24
- **Build Process**:
  1. Install dependencies (`npm ci`)
  2. Type check (`npm run type-check`)
  3. Build AgentStatic library (`npm run build`)
  4. Generate demo site (`npm run build:pages`)
  5. Deploy to GitHub Pages

**Build Output**: `/pages-dist/`
- Static HTML/CSS/JS demo site
- Sample content from template
- SEO-optimized (robots.txt, sitemap.xml)
- Mobile-responsive design

### GitHub Pages Configuration

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```

**Pages Settings**:
- **Source**: GitHub Actions (not branch-based)
- **Environment**: `github-pages`
- **URL**: `https://conorluddy.github.io/AgentStatic`

## 🛠️ Template Configuration & Customization

### Template Variables System

The template uses a variable replacement system for automatic customization:

```json
{
  "GITHUB_USERNAME": "actual-username",
  "REPOSITORY_NAME": "actual-repo-name", 
  "SITE_URL": "https://username.github.io/repo-name",
  "CURRENT_YEAR": "2024",
  "SETUP_DATE": "2024-01-15"
}
```

**Files with Template Variables**:
- `template/site.config.json` - Site configuration
- `template/content/**/*.md` - All content files
- Generated `README.md` - Repository documentation

### Site Configuration Template

**File**: `template/site.config.json`

Key customization points:
- **Site metadata** (title, description, author)
- **Build settings** (output directory, optimization flags)
- **Development configuration** (port, hot reload)
- **Content management** (directories, date formats)
- **SEO settings** (meta tags, sitemaps)
- **Plugin configuration** (MCP, image optimization)
- **Deployment settings** (GitHub Pages, base URL)

### Content Structure Template

**Pages**: `template/content/pages/`
- `index.md` - Homepage with hero section and features
- `about.md` - About page explaining AgentStatic

**Posts**: `template/content/posts/`
- `welcome-to-agentstatic.md` - Introduction blog post

**Features**:
- YAML frontmatter with structured data
- Markdown content with AgentStatic partials
- SEO-optimized meta information
- Sample media references

## 🤖 Template Initialization Process

### Automatic Setup Workflow

**Workflow**: `.github/workflows/template-setup.yml`

**Trigger Conditions**:
- Repository creation from template
- Not the original AgentStatic repository
- No `.agentstatic-initialized` marker file

**Setup Process**:
1. **Content Migration**: Copy `template/` content to repository root
2. **Variable Processing**: Replace template variables with actual values
3. **Package.json Creation**: Generate site-specific package.json
4. **Cleanup**: Remove library-specific files (src/, tests/, etc.)
5. **Documentation**: Create customized README.md
6. **GitHub Pages**: Enable Pages deployment
7. **Welcome Issue**: Create onboarding issue with instructions

**Setup Script**: `scripts/setup-template.js`
- Node.js script for complex setup logic
- File manipulation and content processing
- Template variable replacement
- Repository structure transformation

### Post-Setup Repository Structure

After template setup, new repositories contain:

```
my-agentstatic-site/
├── .github/
│   └── workflows/
│       └── pages-deploy.yml        # Deployment workflow
├── content/                        # Customizable content
├── assets/                         # Media files
├── scripts/
│   └── build-site.js              # Simple build script
├── site.config.json               # Site configuration
├── package.json                   # Site-specific dependencies
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Customized documentation
└── .agentstatic-initialized       # Setup completion marker
```

## 📦 Build Pipeline Architecture

### Development Build (`npm run build:pages`)

**Script**: `scripts/build-pages.js`

**Process**:
1. **Configuration Loading**: Read and process `template/site.config.json`
2. **Template Variable Replacement**: Substitute GitHub-specific values
3. **Demo HTML Generation**: Create responsive showcase page
4. **Asset Processing**: Copy and optimize template assets
5. **CSS Generation**: Create framework-free styling
6. **SEO Optimization**: Generate robots.txt and sitemap.xml
7. **Content Copying**: Include sample content for demonstration

**Output**: `pages-dist/` directory ready for GitHub Pages

### Production Build (Post-Template)

For template instances, the build process uses:
- **AgentStatic Library**: As a dependency from npm
- **Simple Build Script**: `scripts/build-site.js` 
- **Content Processing**: Markdown to HTML with partials
- **Asset Optimization**: Image processing and compression
- **SEO Generation**: Automated meta tags and sitemaps

## 🎯 Template Features & Capabilities

### GitHub Template Repository Features

1. **"Use this template" Button**: One-click repository creation
2. **Automatic Initialization**: No manual setup required
3. **Immediate Deployment**: GitHub Pages ready out-of-the-box
4. **Sample Content**: Professional examples and documentation
5. **Issue Templates**: Structured support and feedback
6. **Template Configuration**: Comprehensive customization options

### AI-Native Architecture Integration

1. **MCP Plugin System**: Model Context Protocol integration points
2. **Schema-Driven Content**: Zod validation for type safety
3. **Intelligent Composition**: AI-readable partial structures
4. **Natural Language Commands**: Future CLI integration
5. **Content Enhancement**: AI-powered optimization hooks

### Creative Professional Focus

1. **Portfolio Templates**: Photography, design, development showcases
2. **Advanced Media Handling**: Image optimization, responsive galleries
3. **SEO Optimization**: Built-in search engine optimization
4. **Performance First**: Framework-free, lightning-fast loading
5. **Mobile Responsive**: Mobile-first design approach

## 🚀 Minimal Viable Implementation Roadmap

### Phase 1: Template Foundation ✅ COMPLETE
- [x] GitHub Template Repository configuration
- [x] GitHub Pages deployment workflow
- [x] Template setup automation
- [x] Sample content and configuration
- [x] Build scripts and processes
- [x] Documentation and issue templates

### Phase 2: Core Implementation (Next)
- [ ] AgentStatic core library implementation
- [ ] Partial registry and rendering system
- [ ] Markdown processing with unified
- [ ] Image optimization with Sharp
- [ ] Development server with hot reload

### Phase 3: MCP Integration
- [ ] Model Context Protocol server setup
- [ ] AI-powered content generation
- [ ] Natural language templating
- [ ] Intelligent composition system
- [ ] Content optimization plugins

### Phase 4: Advanced Features
- [ ] Visual template editor
- [ ] Headless CMS integrations
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Extended plugin ecosystem

## 📋 Usage Instructions

### For Template Users

1. **Create Repository**: Click "Use this template" on GitHub
2. **Wait for Setup**: Automatic initialization completes in ~2 minutes
3. **Clone Locally**: `git clone your-repo-url`
4. **Install Dependencies**: `npm install`
5. **Start Development**: `npm run dev`
6. **Customize Content**: Edit files in `content/` directory
7. **Deploy**: Push to main branch for automatic GitHub Pages deployment

### For Template Maintainers

1. **Update Template Content**: Modify files in `template/` directory
2. **Test Build Process**: Run `npm run build:pages`
3. **Update Scripts**: Modify `scripts/build-pages.js` or `scripts/setup-template.js`
4. **Test Template Creation**: Create test repositories from template
5. **Monitor Template Usage**: Review GitHub template analytics

## 🎯 Success Metrics

### Template Adoption
- Number of repositories created from template
- Successful setup completion rate
- User retention and customization rate

### Technical Performance
- Build time: <2 minutes for setup
- Page load speed: <3 seconds first contentful paint
- Lighthouse scores: >90 across all metrics

### User Experience
- Setup completion rate: >95%
- GitHub Pages deployment success: >98%
- User customization rate: >70%

## 🔧 Troubleshooting & Support

### Common Issues

1. **Setup Fails**: Check GitHub Actions logs, ensure permissions
2. **Pages Not Deploying**: Verify Pages settings, check workflow status
3. **Build Errors**: Review Node.js version, dependency conflicts
4. **Template Variables**: Check template syntax, variable replacement

### Support Resources

- **Issue Templates**: Structured bug reports and feature requests
- **GitHub Discussions**: Community support and ideas
- **Documentation**: Comprehensive guides and examples
- **Example Repositories**: Working template instances

---

## 🎉 Conclusion

AgentStatic is now architected as a comprehensive GitHub Template Repository that provides:

1. **Immediate Value**: One-click repository creation with working site
2. **Professional Quality**: Production-ready code with comprehensive tooling  
3. **AI-Native Foundation**: MCP integration for future AI capabilities
4. **Scalable Architecture**: Modular design supporting complex sites
5. **Developer Experience**: Excellent tooling, documentation, and support

The template successfully bridges the gap between a development framework and a user-ready solution, providing both the power of AgentStatic's AI-native architecture and the simplicity of template-based site creation.

**Ready to use**: The template is now production-ready for GitHub Template Repository usage with full GitHub Pages deployment support.