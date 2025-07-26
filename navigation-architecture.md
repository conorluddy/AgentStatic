# Navigation Architecture Plan

## Overview
AgentStatic's navigation system combines filesystem-based auto-discovery with frontmatter-driven customization to create intelligent, SEO-friendly navigation trees for static sites.

## Core Data Structures

### NavigationNode Interface
```typescript
interface NavigationNode {
  id: string;                    // Unique identifier (usually file path)
  title: string;                 // Display text
  url: string;                   // Generated URL path
  slug: string;                  // URL-safe identifier
  order: number;                 // Sort order (from frontmatter or auto)
  level: number;                 // Depth in hierarchy (0 = root)
  parent?: string;               // Parent node ID
  children: NavigationNode[];    // Child nodes
  isActive: boolean;             // Current page indicator
  isExternal: boolean;           // External link flag
  metadata: {
    description?: string;        // Meta description
    icon?: string;              // Icon identifier
    hidden: boolean;            // Hide from navigation
    inSitemap: boolean;         // Include in sitemap
    lastModified: Date;         // File modification time
  };
}

interface NavigationTree {
  nodes: Map<string, NavigationNode>;
  root: NavigationNode[];
  currentPath: string;
  breadcrumbs: NavigationNode[];
}
```

## Content Discovery System

### 1. Filesystem Scanner
```typescript
interface ContentDiscovery {
  // Scan content directory for markdown files
  scanContentDirectory(contentPath: string): Promise<ContentFile[]>;
  
  // Extract navigation metadata from frontmatter
  extractNavMetadata(filePath: string): Promise<NavMetadata>;
  
  // Generate URL paths from file structure
  generateUrlPath(filePath: string, baseUrl: string): string;
}

interface ContentFile {
  filePath: string;
  relativePath: string;
  frontmatter: Record<string, any>;
  urlPath: string;
  lastModified: Date;
}

interface NavMetadata {
  title: string;
  order?: number;
  hidden?: boolean;
  parent?: string;
  description?: string;
  icon?: string;
}
```

### 2. Frontmatter Integration
```yaml
---
title: "About Us"
nav:
  order: 2
  hidden: false
  parent: "company"
  description: "Learn about our company"
  icon: "info-circle"
---
```

## Navigation Tree Builder

### 3. Tree Construction Algorithm
```typescript
class NavigationTreeBuilder {
  async buildTree(contentFiles: ContentFile[]): Promise<NavigationTree> {
    // 1. Create nodes from content files
    const nodes = await this.createNodes(contentFiles);
    
    // 2. Establish parent-child relationships
    const hierarchy = this.buildHierarchy(nodes);
    
    // 3. Sort nodes by order/alphabetical
    const sortedTree = this.sortTree(hierarchy);
    
    // 4. Generate breadcrumbs for current path
    const breadcrumbs = this.generateBreadcrumbs(sortedTree, currentPath);
    
    return {
      nodes: new Map(nodes.map(n => [n.id, n])),
      root: sortedTree,
      currentPath,
      breadcrumbs
    };
  }
  
  private buildHierarchy(nodes: NavigationNode[]): NavigationNode[] {
    // Auto-detect hierarchy from URL structure
    // /blog/posts/my-post.md -> blog > posts > my-post
    // Override with frontmatter parent property
  }
}
```

## Template Helper Integration

### 4. Navigation Helpers
```typescript
interface NavigationHelpers {
  // Generate proper URLs with base path handling
  url(path: string): string;
  
  // Check if current page matches path
  isActive(path: string): boolean;
  
  // Generate breadcrumb trail
  breadcrumbs(): NavigationNode[];
  
  // Get navigation tree for current context
  getNavTree(): NavigationTree;
  
  // Get children of specific nav node
  getNavChildren(nodeId: string): NavigationNode[];
  
  // Generate sitemap data
  getSitemapData(): SitemapEntry[];
}
```

## Navigation Partial Component

### 5. Flexible Navigation Partial
```typescript
const NavigationPartial: AgentPartial<NavigationProps> = {
  schema: z.object({
    // Data source configuration
    source: z.enum(['auto', 'manual', 'mixed']).default('auto'),
    maxDepth: z.number().min(1).max(5).default(3),
    
    // Visual configuration
    variant: z.enum(['horizontal', 'vertical', 'sidebar', 'breadcrumb']).default('horizontal'),
    showIcons: z.boolean().default(false),
    showDescriptions: z.boolean().default(false),
    
    // Behavior configuration
    collapsible: z.boolean().default(true),
    activeTrail: z.boolean().default(true),
    
    // Manual override items
    items: z.array(z.object({
      title: z.string(),
      url: z.string(),
      children: z.array(z.any()).optional(),
      external: z.boolean().default(false)
    })).optional(),
    
    // Filtering
    includeHidden: z.boolean().default(false),
    rootPath: z.string().optional()
  }),
  
  template: (props, helpers) => {
    const navTree = props.source === 'manual' 
      ? props.items 
      : helpers.getNavTree().root;
      
    return renderNavigationTree(navTree, props, helpers);
  }
};
```

## Build-Time Integration

### 6. Static Generation Process
```typescript
class StaticSiteBuilder {
  async generateSite() {
    // 1. Discover all content files
    const contentFiles = await this.contentDiscovery.scanContentDirectory('./content');
    
    // 2. Build navigation tree
    const navTree = await this.navBuilder.buildTree(contentFiles);
    
    // 3. Make navigation available to all templates
    this.templateContext.setGlobalData('navigation', navTree);
    
    // 4. Generate pages with navigation context
    for (const file of contentFiles) {
      const pageContext = {
        ...this.templateContext,
        currentPath: file.urlPath,
        navigation: this.updateActiveStates(navTree, file.urlPath)
      };
      
      await this.generatePage(file, pageContext);
    }
    
    // 5. Generate sitemap.xml
    await this.generateSitemap(navTree);
  }
}
```

## Configuration Options

### 7. Site-Level Navigation Config
```typescript
// agentstatic.config.ts
export default {
  navigation: {
    autoGenerate: true,
    baseUrl: 'https://example.com',
    excludePatterns: ['drafts/**', 'private/**'],
    defaultOrder: 'alphabetical', // or 'date', 'manual'
    breadcrumbSeparator: ' > ',
    maxDepth: 3,
    
    // Custom navigation items
    customItems: [
      { title: 'External Link', url: 'https://external.com', external: true },
      { title: 'Contact', url: '/contact', order: 999 }
    ]
  }
};
```

## Performance Considerations

### 8. Optimization Strategies
- **Build-time generation**: Navigation tree built once during static generation
- **Lazy loading**: Large navigation trees can be split and loaded on demand
- **Caching**: Navigation data cached and only rebuilt when content changes
- **Minimal JavaScript**: Core navigation works without JS, enhanced with progressive enhancement

## Implementation Priority

1. **High Priority**: Core data structures, content discovery, tree builder
2. **Medium Priority**: Template helpers, navigation partial, context provider  
3. **Low Priority**: Advanced variants, accessibility enhancements, performance optimizations

This architecture provides a solid foundation for intelligent, maintainable navigation in AgentStatic while supporting both automated and manual navigation management.