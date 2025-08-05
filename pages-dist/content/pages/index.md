---
title: "Welcome to AgentStatic"
description: "A beautiful static site powered by AI-native content management"
layout: main
partial: hero
date: 2024-01-01
hero:
  title: "Welcome to AgentStatic"
  subtitle: "AI-Native Static Site Generator with TypeScript Partials"
  backgroundImage: "/assets/images/hero-bg.jpg"
  ctaButton:
    text: "Get Started"
    url: "/getting-started"
    variant: "primary"
  alignment: "center"
sections:
  - partial: "features"
    title: "Why AgentStatic?"
    features:
      - title: "🧠 AI-Native Design"
        description: "Built from the ground up with AI integration through Model Context Protocol (MCP)"
        icon: "🧠"
      - title: "⚡ TypeScript First"
        description: "Type-safe templates with Zod validation and zero 'any' types"
        icon: "⚡"
      - title: "🎨 Creative Professional Focus"
        description: "Advanced media handling perfect for portfolios and showcases"
        icon: "🎨"
      - title: "🚀 Lightning Fast"
        description: "Sub-100ms builds with framework-free vanilla output"
        icon: "🚀"
  - partial: "cta"
    title: "Ready to Build?"
    subtitle: "Start creating your static site with AgentStatic today"
    button:
      text: "View Documentation"
      url: "https://github.com/conorluddy/AgentStatic/blob/main/README.md"
      variant: "outline"
---

# Welcome to Your AgentStatic Site

This is your homepage content. AgentStatic combines the power of static site generation with AI-native features, giving you:

## 🏗️ Modern Architecture

- **TypeScript-first templating** with full type safety
- **Zod schema validation** for runtime and compile-time checks  
- **MCP integration** for AI-powered content enhancement
- **Partial-based components** for maximum reusability

## 📝 Content Management

Edit this file and others in the `content/` directory to customize your site. AgentStatic supports:

- **Markdown with YAML frontmatter** for structured content
- **Advanced media handling** with automatic optimization
- **SEO optimization** built-in with meta tags and sitemaps
- **Multi-format deployment** to any static hosting platform

## 🎯 Getting Started

1. **Edit content** in the `content/` directory
2. **Customize partials** in `src/partials/` 
3. **Configure your site** in `site.config.json`
4. **Deploy** by pushing to your main branch

Your site is automatically built and deployed to GitHub Pages on every push!

---

*This site was generated using [AgentStatic](https://github.com/conorluddy/AgentStatic) - the AI-native static site generator.*