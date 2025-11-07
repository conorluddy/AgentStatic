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
 * Templates must be precompiled by running: npm run precompile:templates
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
 * The template must be precompiled first using: npm run precompile:templates
 *
 * WORKAROUND: We create a simple wrapper in the precompiled store that calls the macro.
 * This avoids using renderString() or getTemplate() which require Node.js path module.
 *
 * @param templatePath - Path to the template (e.g., 'organisms/hero/hero.njk')
 * @param macroName - Name of the macro to call (e.g., 'hero')
 * @param props - Props object to pass to the macro
 */
export function renderNunjucks(templatePath: string, macroName: string, props: any = {}): string {
  try {
    // Check if the main template exists in precompiled store
    const precompiledTemplate = window.nunjucksPrecompiled?.[templatePath];

    if (!precompiledTemplate) {
      throw new Error(`Template "${templatePath}" not found in precompiled store. Available: ${Object.keys(window.nunjucksPrecompiled || {}).length}. Run: npm run precompile:templates`);
    }

    // Create a unique wrapper ID for this macro call
    const wrapperId = `__macro_${templatePath.replace(/[/.]/g, '_')}_${macroName}`;

    // Only create the wrapper once
    if (!window.nunjucksPrecompiled[wrapperId]) {
      // Create a wrapper template that calls the macro
      // This wrapper gets the precompiled template's exports and calls the specific macro
      window.nunjucksPrecompiled[wrapperId] = (function() {
        function root(env: any, context: any, frame: any, runtime: any, cb: any) {
          // Create a new Template instance for the source template
          const Template = (nunjucks as any).Template;
          const sourceTemplate = new Template(precompiledTemplate.root, env, templatePath, true);

          // Get the macro from the template's exports
          sourceTemplate.getExported((err: any, exported: any) => {
            if (err) {
              cb(err);
              return;
            }

            const macro = exported[macroName];
            if (!macro || typeof macro !== 'function') {
              cb(new Error(`Macro "${macroName}" not found in ${templatePath}. Available: ${Object.keys(exported || {}).join(', ')}`));
              return;
            }

            // Call the macro with the props from context
            try {
              const result = runtime.callWrap(macro, macroName, context, [context.lookup('props')]);
              cb(null, result);
            } catch (e) {
              cb(e);
            }
          });
        }
        return { root };
      })();
    }

    // Render the wrapper with props in context
    const result = nunjucks.render(wrapperId, { props });

    return result;
  } catch (error) {
    console.error(`[Nunjucks] Failed to render macro ${macroName} from ${templatePath}:`, error);
    return `<p style="color: red;">Failed to render ${macroName} from ${templatePath}: ${(error as Error).message}</p>`;
  }
}
