/**
 * Navigation Generation System for AgentStatic
 *
 * Generates navigation structures from discovered pages.
 * Follows CODESTYLE.md principles: Fail Fast, Fix Early.
 */

import { z } from 'zod';
import { type PageFile } from './page-discovery';

/**
 * Navigation item schema with validation
 */
export const NavigationItemSchema = z.object({
  href: z.string().describe('Navigation link URL'),
  title: z.string().describe('Display text for navigation'),
  slug: z.string().describe('Page slug for identification'),
  priority: z.number().default(999).describe('Sort priority (lower = first)'),
  active: z
    .boolean()
    .default(false)
    .describe('Whether this item is currently active'),
  external: z
    .boolean()
    .default(false)
    .describe('Whether this is an external link'),
});

export type NavigationItem = z.infer<typeof NavigationItemSchema>;

/**
 * Navigation configuration schema
 */
export const NavigationConfigSchema = z.object({
  items: z.array(NavigationItemSchema),
  currentSlug: z.string().optional().describe('Currently active page slug'),
  showHome: z
    .boolean()
    .default(false)
    .describe('Whether to show home link in navigation'),
  maxItems: z.number().default(10).describe('Maximum number of items to show'),
});

export type NavigationConfig = z.infer<typeof NavigationConfigSchema>;

/**
 * Navigation generation options
 */
export interface NavigationGenerationOptions {
  includeHomepage?: boolean;
  maxItems?: number;
  currentSlug?: string;
  customItems?: Array<{
    title: string;
    href: string;
    priority?: number;
    external?: boolean;
  }>;
}

/**
 * Navigation validation result
 */
export interface NavigationValidationResult {
  success: boolean;
  navigation?: NavigationConfig;
  errors: string[];
  warnings: string[];
}

/**
 * Navigation Generator
 *
 * Single responsibility: Generate and validate navigation from pages
 */
export class NavigationGenerator {
  /**
   * Generate navigation from page files
   *
   * Principle: Simple > Clever - straightforward navigation generation
   */
  generateFromPages(
    pages: PageFile[],
    options: NavigationGenerationOptions = {}
  ): NavigationItem[] {
    const {
      includeHomepage = false,
      maxItems = 10,
      currentSlug,
      customItems = [],
    } = options;

    // Filter pages for navigation
    const navigationPages = pages.filter(page => {
      // Include homepage only if explicitly requested
      if (page.isHomepage) {
        return includeHomepage;
      }

      // Include if marked for navigation
      return page.frontmatter.showInNavigation !== false;
    });

    // Convert pages to navigation items
    const pageItems: NavigationItem[] = navigationPages.map(page => ({
      href: this.generatePageHref(page),
      title: page.frontmatter.navigationTitle || page.frontmatter.title,
      slug: page.slug,
      priority: page.frontmatter.navigationOrder ?? 999,
      active: page.slug === currentSlug,
      external: false,
    }));

    // Add custom items
    const customNavItems: NavigationItem[] = customItems.map(item => ({
      href: item.href,
      title: item.title,
      slug: this.generateSlugFromHref(item.href),
      priority: item.priority ?? 999,
      active: false,
      external: item.external ?? false,
    }));

    // Combine and sort items
    const allItems = [...pageItems, ...customNavItems];

    // Sort by priority, then by title
    allItems.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.title.localeCompare(b.title);
    });

    // Limit number of items
    return allItems.slice(0, maxItems);
  }

  /**
   * Validate navigation structure
   *
   * Principle: Validate inputs at boundaries immediately
   */
  validateNavigationStructure(
    items: NavigationItem[]
  ): NavigationValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Validate each item
      const validatedItems = items.map(item => {
        try {
          return NavigationItemSchema.parse(item);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const itemErrors = error.errors.map(
              err =>
                `Navigation item "${item.title || 'unknown'}": ${err.message}`
            );
            errors.push(...itemErrors);
          }
          throw error;
        }
      });

      // Check for duplicate hrefs
      const hrefs = validatedItems.map(item => item.href);
      const duplicateHrefs = hrefs.filter(
        (href, index) => hrefs.indexOf(href) !== index
      );
      if (duplicateHrefs.length > 0) {
        warnings.push(
          `Duplicate navigation hrefs found: ${duplicateHrefs.join(', ')}`
        );
      }

      // Check for empty titles
      const emptyTitles = validatedItems.filter(item => !item.title.trim());
      if (emptyTitles.length > 0) {
        errors.push(`${emptyTitles.length} navigation items have empty titles`);
      }

      // Check for too many items
      if (validatedItems.length > 15) {
        warnings.push(
          `Navigation has ${validatedItems.length} items, consider reducing for better UX`
        );
      }

      const navigation: NavigationConfig = {
        items: validatedItems,
        currentSlug: validatedItems.find(item => item.active)?.slug,
        showHome: validatedItems.some(
          item => item.href === '/' || item.href === '/index.html'
        ),
        maxItems: validatedItems.length,
      };

      return {
        success: errors.length === 0,
        navigation,
        errors,
        warnings,
      };
    } catch (error) {
      errors.push(
        `Navigation validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return {
        success: false,
        errors,
        warnings,
      };
    }
  }

  /**
   * Create navigation configuration
   *
   * Principle: Explicit > Implicit - clear navigation configuration
   */
  createNavigationConfig(
    pages: PageFile[],
    options: NavigationGenerationOptions = {}
  ): NavigationValidationResult {
    try {
      const items = this.generateFromPages(pages, options);
      return this.validateNavigationStructure(items);
    } catch (error) {
      return {
        success: false,
        errors: [
          `Failed to create navigation: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ],
        warnings: [],
      };
    }
  }

  /**
   * Generate HTML for navigation
   *
   * Principle: Simple templates for common use cases
   */
  renderNavigationHTML(
    navigation: NavigationConfig,
    options: {
      className?: string;
      showActive?: boolean;
      linkClass?: string;
      activeClass?: string;
    } = {}
  ): string {
    const {
      className = 'nav-links',
      showActive = true,
      linkClass = '',
      activeClass = 'active',
    } = options;

    const items = navigation.items
      .map(item => {
        const isActive = showActive && item.active;
        const classes = [linkClass, isActive ? activeClass : '']
          .filter(Boolean)
          .join(' ');
        const classAttr = classes ? ` class="${classes}"` : '';
        const target = item.external ? ' target="_blank" rel="noopener"' : '';

        return `    <li><a href="${item.href}"${classAttr}${target}>${item.title}</a></li>`;
      })
      .join('\n');

    return `<ul class="${className}">
${items}
</ul>`;
  }

  /**
   * Generate page href based on file structure
   *
   * Principle: Consistent URL generation
   */
  private generatePageHref(page: PageFile): string {
    if (page.isHomepage) {
      return '/';
    }

    // Generate clean URLs
    if (page.slug === 'index') {
      return '/';
    }

    return `/${page.slug}.html`;
  }

  /**
   * Generate slug from href for custom items
   */
  private generateSlugFromHref(href: string): string {
    return (
      href
        .replace(/^\//, '')
        .replace(/\.html$/, '')
        .replace(/[^a-z0-9-]/gi, '-')
        .toLowerCase() || 'external'
    );
  }

  /**
   * Get breadcrumb navigation for a page
   */
  generateBreadcrumbs(
    page: PageFile,
    pages: PageFile[]
  ): Array<{ title: string; href: string; active: boolean }> {
    const breadcrumbs: Array<{ title: string; href: string; active: boolean }> =
      [];

    // Always start with home
    const homepage = pages.find(p => p.isHomepage);
    if (homepage && !page.isHomepage) {
      breadcrumbs.push({
        title: 'Home',
        href: '/',
        active: false,
      });
    }

    // Add current page
    breadcrumbs.push({
      title: page.frontmatter.title,
      href: this.generatePageHref(page),
      active: true,
    });

    return breadcrumbs;
  }
}
