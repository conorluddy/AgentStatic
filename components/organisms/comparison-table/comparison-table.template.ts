/**
 * Comparison Table Template Helper
 *
 * Converts Nunjucks template to HTML for Storybook stories
 */

import nunjucks from 'nunjucks';
import { readFileSync } from 'fs';
import { join } from 'path';

// Configure Nunjucks environment
const env = nunjucks.configure(join(__dirname, '../../'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

// Load templates
const comparisonTableContent = readFileSync(
  join(__dirname, 'comparison-table.njk'),
  'utf-8'
);
const buttonTemplate = readFileSync(
  join(__dirname, '../../atoms/button/button.njk'),
  'utf-8'
);
const badgeTemplate = readFileSync(
  join(__dirname, '../../atoms/badge/badge.njk'),
  'utf-8'
);

// Add templates to environment
env.addGlobal('comparisonTable', comparisonTableContent);
env.addGlobal('button', buttonTemplate);
env.addGlobal('badge', badgeTemplate);

/**
 * Render comparison table with props
 */
export function comparisonTableTemplate(args: any): string {
  const template = `
    {% from "organisms/comparison-table/comparison-table.njk" import comparisonTable %}
    {{ comparisonTable(props) }}
  `;

  return env.renderString(template, { props: args });
}
