# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AgentStatic is a modern, AI-extensible CMS system designed for creative professionals (photographers, developers) that combines Markdown-driven content with MCP (Model Context Protocol) plugins for intelligent automation. The project uses Node.js 24, TypeScript, and generates static sites deployable to S3/CDN platforms.

## Current Project State

**⚠️ Early Development Phase**: This is a new project with comprehensive planning documentation but minimal implementation. Only `package.json` and `README.md` exist currently.

## Planned Architecture

### Core Technology Stack
- **Runtime**: Node.js 24.x with TypeScript 5.x
- **Content**: Markdown with YAML frontmatter
- **Output**: Static HTML/CSS/JS sites
- **Plugins**: Model Context Protocol (MCP) for AI-powered extensibility
- **UI**: Vanilla CSS + TypeScript (no framework dependencies)
- **Deployment**: Multi-platform static hosting (S3, Netlify, Vercel, GitHub Pages)

### Planned Directory Structure
```
src/
├── core/           # Content engine & build system
├── plugins/        # MCP plugin architecture
├── templates/      # HTML template engine
├── media/          # Asset processing & optimization
├── admin/          # Content management interface
└── deploy/         # Deployment automation
content/            # Markdown content files
assets/             # Source media files
themes/             # Visual themes and layouts
plugins/            # Custom MCP servers
```

### Key Design Principles
- **MCP-First**: AI-extensible plugin architecture using Model Context Protocol
- **Portfolio-Optimized**: Advanced media handling for photography, video, and code showcases
- **Zero Framework Dependencies**: Vanilla CSS/JS for maximum performance
- **Multi-Platform Deployment**: Static generation works with any hosting provider

## Development Commands

**Current State**: No build scripts configured yet. The project needs initial setup.

**Planned Commands** (to be implemented):
```bash
npm run dev          # Development server with file watching
npm run build        # Static site generation
npm run lint         # TypeScript and code linting
npm run test         # Test suite execution
npm run deploy:s3    # Deploy to AWS S3
npm run deploy:netlify # Deploy to Netlify
```

## Key Dependencies to Install

Based on the architecture plan, core dependencies will include:
- TypeScript 5.x
- `@modelcontextprotocol/sdk` - Official MCP SDK for plugin system
- Markdown processing libraries
- Image optimization tools
- File watching utilities for development

## MCP Integration Strategy

The project's unique selling point is deep MCP integration:

### Planned MCP Plugins
- **Image Processing**: Auto-resize, compress, format conversion
- **SEO Optimization**: Meta generation, sitemap creation
- **Analytics Integration**: Google Analytics, privacy-focused alternatives
- **Social Media**: Auto-posting, embedding, sharing capabilities
- **Search & Discovery**: Content indexing, search functionality
- **Deployment Automation**: Multi-platform publishing

### Plugin Architecture
- Hot-pluggable MCP servers using TypeScript SDK
- JSON configuration for plugin management
- AI-assisted content enhancement and optimization

## Portfolio Features Focus

This CMS is specifically designed for creative professionals:

### Photography Portfolio
- High-resolution galleries with lazy loading
- EXIF data extraction and display
- Responsive image serving (WebP, AVIF)
- Lightbox viewing with keyboard navigation

### Video Showcase
- Multi-platform embedding (YouTube, Vimeo, self-hosted)
- Automatic thumbnail generation
- Responsive video players

### Code Portfolio
- Syntax highlighting for 20+ languages
- GitHub integration for project showcases
- Live code demos with interactive examples
- Technical documentation generation

## Development Roadmap

**Phase 1** (Weeks 1-2): Foundation - Node 24 + TypeScript project setup, basic markdown processing
**Phase 2** (Weeks 3-4): Static Generation - Complete build pipeline, asset optimization
**Phase 3** (Weeks 5-6): MCP Integration - Plugin architecture, core MCP plugins
**Phase 4** (Weeks 7-8): Portfolio Features - Media galleries, code showcase
**Phase 5** (Weeks 9-10): Deployment & Polish - Multi-platform deployment, optimization

## Important Notes

- Use Node.js 24.x specifically for modern JavaScript features
- Follow git-flow methodology - never push directly to main
- Prioritize TypeScript type safety throughout the codebase
- MCP plugin system should be designed for extensibility from day one
- Performance is critical - vanilla CSS/JS approach is intentional for speed
- Asset optimization pipeline is crucial for portfolio media handling