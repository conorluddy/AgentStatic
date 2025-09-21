# 🎨 Simple Portfolio Example

A complete two-page static site showcasing AgentStatic's TypeScript-first partial system. Perfect for personal
portfolios, freelancer websites, or any professional showcase.

## 🌟 What's Included

### Pages

- **Homepage**: Hero section with introduction and featured projects
- **Projects**: Complete project gallery with filtering and details

### Components

- **Header**: Navigation with active states and responsive design
- **Footer**: Site footer with social links and copyright
- **Hero**: Eye-catching page header with call-to-action
- **Project Card**: Reusable project showcase component
- **Contact Form**: Type-safe contact form with validation

### Features

- **TypeScript Partials**: 100% type-safe components with Zod validation
- **Responsive Design**: Mobile-first CSS with clean aesthetics
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Static generation with minimal JavaScript

## 🚀 Quick Start

```bash
# Navigate to this example
cd examples/simple-portfolio

# Install dependencies (inherits from main project)
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📁 Project Structure

```
simple-portfolio/
├── README.md                    # This file
├── content/
│   ├── pages/
│   │   ├── index.md            # Homepage content
│   │   └── projects.md         # Projects page content
│   └── site.config.json        # Site configuration
├── src/
│   └── partials/
│       ├── layout/
│       │   ├── header.partial.ts    # Site navigation
│       │   └── footer.partial.ts    # Site footer
│       └── content/
│           ├── hero.partial.ts      # Hero section
│           ├── project-card.partial.ts  # Project display
│           └── contact-form.partial.ts  # Contact form
├── assets/
│   ├── images/                 # Sample project images
│   └── styles/                 # Custom CSS overrides
└── package.json               # Example dependencies
```

## 🧩 Component Guide

### Header Component

**File**: `src/partials/layout/header.partial.ts`

```typescript
// Usage in content:
sections:
  - partial: "header"
    siteName: "Jane Doe"
    navigation:
      - title: "Home"
        href: "/"
        active: true
      - title: "Projects"
        href: "/projects"
      - title: "Contact"
        href: "#contact"
```

**Features**:

- Responsive hamburger menu for mobile
- Active state highlighting
- Type-safe navigation items
- Accessible ARIA labels

### Hero Component

**File**: `src/partials/content/hero.partial.ts`

```typescript
// Usage in content:
sections:
  - partial: "hero"
    title: "Hi, I'm Jane Doe"
    subtitle: "Full-Stack Developer & Designer"
    description: "I create beautiful, functional web experiences..."
    image: "/assets/images/profile.jpg"
    ctaButton:
      text: "View My Work"
      href: "/projects"
      variant: "primary"
    socialLinks:
      - platform: "github"
        url: "https://github.com/janedoe"
      - platform: "linkedin"
        url: "https://linkedin.com/in/janedoe"
```

**Features**:

- Flexible image placement
- Multiple CTA button styles
- Social media integration
- Responsive layout options

### Project Card Component

**File**: `src/partials/content/project-card.partial.ts`

```typescript
// Usage in content:
sections:
  - partial: "project-grid"
    projects:
      - title: "E-commerce Platform"
        description: "Modern React application with TypeScript"
        image: "/assets/images/project-1.jpg"
        technologies: ["React", "TypeScript", "Node.js"]
        links:
          demo: "https://demo.example.com"
          github: "https://github.com/janedoe/project"
        featured: true
```

**Features**:

- Technology tag display
- Multiple link types (demo, GitHub, etc.)
- Featured project highlighting
- Lazy-loaded images
- Hover animations

### Contact Form Component

**File**: `src/partials/content/contact-form.partial.ts`

```typescript
// Usage in content:
sections:
  - partial: "contact-form"
    title: "Let's Work Together"
    subtitle: "Ready to start your next project?"
    fields:
      - name: "name"
        label: "Your Name"
        type: "text"
        required: true
      - name: "email"
        label: "Email Address"
        type: "email"
        required: true
      - name: "message"
        label: "Project Details"
        type: "textarea"
        required: true
    submitButton:
      text: "Send Message"
      variant: "primary"
```

**Features**:

- Zod validation for all fields
- Accessible form labels
- Error state handling
- Progressive enhancement
- Customizable field types

## 🎨 Styling System

### CSS Custom Properties

The example uses a clean design system with CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;

  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

### Component Styles

Each partial includes scoped styles that:

- Use semantic class names
- Follow BEM methodology
- Support responsive design
- Include hover/focus states
- Maintain accessibility standards

## 📝 Content Structure

### Homepage (`content/pages/index.md`)

```yaml
---
title: 'Jane Doe - Full-Stack Developer'
description: 'Full-stack developer specializing in React, TypeScript, and modern web technologies'
layout: main
sections:
  - partial: 'hero'
    # Hero configuration
  - partial: 'featured-projects'
    # Projects configuration
  - partial: 'about-preview'
    # About section configuration
  - partial: 'contact-form'
    # Contact form configuration
---
# Additional markdown content (optional)
```

### Projects Page (`content/pages/projects.md`)

```yaml
---
title: 'Projects - Jane Doe'
description: 'A showcase of my recent development projects'
layout: main
sections:
  - partial: 'page-header'
    title: 'My Projects'
    subtitle: 'A selection of recent work'
  - partial: 'project-filter'
    categories: ['All', 'Web Apps', 'Mobile', 'Design']
  - partial: 'project-grid'
    projects:
      # Project data array
---
```

## 🔧 Customization Guide

### Adding a New Project

1. **Add project data** to `projects.md`:

```yaml
- title: 'Your Project Name'
  description: 'Brief project description'
  image: '/assets/images/your-project.jpg'
  technologies: ['React', 'TypeScript']
  links:
    demo: 'https://your-demo.com'
    github: 'https://github.com/you/project'
  category: 'Web Apps'
  featured: false
```

2. **Add project image** to `assets/images/`
3. **Rebuild** the site to see changes

### Customizing Colors

1. **Edit CSS variables** in `assets/styles/theme.css`
2. **Update component styles** if needed
3. **Test accessibility** with new color combinations

### Adding a New Section

1. **Create partial** in `src/partials/content/`
2. **Follow TypeScript patterns** from existing components
3. **Add to page frontmatter** in content files
4. **Style with scoped CSS**

## 🚀 Deployment

This example works with any static hosting platform:

### GitHub Pages

```bash
npm run build
# Push to gh-pages branch or configure Actions
```

### Netlify

- Connect repository
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

- Import repository
- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`

## 🎯 Performance Features

- **Static Generation**: Pre-built HTML for instant loading
- **Optimized Images**: Automatic compression and responsive images
- **Minimal JavaScript**: Only essential interactivity
- **Critical CSS**: Above-the-fold styles inlined
- **Perfect Lighthouse Scores**: 100/100/100/100 target

## 🧪 Testing

The example includes basic testing patterns:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build validation
npm run build
```

## 📚 Learning Resources

- **TypeScript Partials**: Learn the component system
- **Zod Validation**: Understand runtime type safety
- **Responsive Design**: Study mobile-first CSS patterns
- **Performance**: Analyze bundle size and loading times

---

**Ready to customize?** Start by editing the content files and experimenting with the partial components! 🎨

_Need help? Check the [main examples guide](../README.md) or the [AgentStatic documentation](../../README.md)._
