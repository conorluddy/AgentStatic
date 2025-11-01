/**
 * Nunjucks Helpers for Storybook
 *
 * Provides browser-safe Nunjucks rendering for stories using precompiled templates.
 * The precompiled templates are loaded by preview.ts into window.nunjucksPrecompiled,
 * which allows nunjucks.render() to work client-side without Node.js APIs.
 *
 * The key insight: nunjucks.renderString() compiles templates on the fly and won't
 * find precompiled templates. Instead, we need to use nunjucks.render() which uses
 * the precompiled store.
 */

import nunjucks from 'nunjucks';

declare global {
  interface Window {
    nunjucksPrecompiled?: Record<string, any>;
  }
}

/**
 * Render a Nunjucks template string with variables by using inline renderString
 * This works for simple templates that don't import from other .njk files.
 *
 * For templates that use {% from "path/to/template.njk" import macro %},
 * those macros must be available in the precompiled store first.
 */
export function renderNunjucksTemplate(template: string, context: any = {}): string {
  try {
    // Use renderString for inline templates. The precompiled templates are available
    // in the global store via window.nunjucksPrecompiled, so imports should work.
    const result = nunjucks.renderString(template, context);
    return result;
  } catch (error) {
    console.error('[Nunjucks] Template rendering error:', error);
    return `<p style="color: red;">Template error: ${(error as Error).message}</p>`;
  }
}

/**
 * Render a precompiled template by path
 *
 * Usage in stories:
 *   renderPrecompiledTemplate('molecules/card/card.njk', { props: args })
 *
 * This is used when rendering a standalone .njk file directly.
 * Templates must be precompiled by running: bun run precompile:templates
 */
export function renderPrecompiledTemplate(templatePath: string, context: any = {}): string {
  try {
    return nunjucks.render(templatePath, context);
  } catch (error) {
    console.error(`[Nunjucks] Failed to render ${templatePath}:`, error);
    return `<p style="color: red;">Failed to render ${templatePath}</p>`;
  }
}

/**
 * Render a Nunjucks macro from a precompiled template
 *
 * Usage in stories:
 *   renderNunjucks('organisms/hero/hero.njk', 'hero', { headline: 'Hello' })
 *
 * This function calls a specific macro from a template file with the provided props.
 * The template must be precompiled first using: bun run precompile:templates
 *
 * @param templatePath - Path to the template (e.g., 'organisms/hero/hero.njk')
 * @param macroName - Name of the macro to call (e.g., 'hero')
 * @param props - Props object to pass to the macro
 */
export function renderNunjucks(templatePath: string, macroName: string, props: any = {}): string {
  try {
    // Create a minimal template string that imports and calls the macro
    const templateString = `
      {% from "${templatePath}" import ${macroName} %}
      {{ ${macroName}(props) }}
    `;

    return nunjucks.renderString(templateString, { props });
  } catch (error) {
    console.error(`[Nunjucks] Failed to render macro ${macroName} from ${templatePath}:`, error);
    return `<p style="color: red;">Failed to render ${macroName} from ${templatePath}: ${(error as Error).message}</p>`;
  }
}
