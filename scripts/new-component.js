#!/usr/bin/env node

/**
 * Component Generator Script
 *
 * Creates a new component from templates with proper naming and structure.
 *
 * Usage:
 *   node scripts/new-component.js atom button
 *   node scripts/new-component.js molecule card
 *   node scripts/new-component.js organism hero-section
 *
 * This will:
 * 1. Copy the appropriate template (atom, molecule, or organism)
 * 2. Replace all placeholder text with actual component names
 * 3. Rename files to match the component name
 * 4. Create the component directory in the correct location
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper functions for name transformations
const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const toPascalCase = (str) => {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const toCamelCase = (str) => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

// Main component creation function
async function createComponent(type, name) {
  // Validate component type
  const validTypes = ['atom', 'molecule', 'organism'];
  if (!validTypes.includes(type)) {
    console.error(
      `❌ Invalid component type: ${type}. Must be one of: ${validTypes.join(', ')}`
    );
    process.exit(1);
  }

  // Validate component name
  if (!name) {
    console.error('❌ Component name is required');
    console.log('\nUsage: node scripts/new-component.js <type> <name>');
    console.log('Example: node scripts/new-component.js atom button');
    process.exit(1);
  }

  // Transform names
  const kebabName = toKebabCase(name);
  const pascalName = toPascalCase(name);
  const camelName = toCamelCase(name);

  // Define paths
  const projectRoot = path.join(__dirname, '..');
  const templateDir = path.join(
    projectRoot,
    'components',
    '_templates',
    `${type}.template`
  );
  const pluralType = type === 'atom' ? 'atoms' : type === 'molecule' ? 'molecules' : 'organisms';
  const componentDir = path.join(
    projectRoot,
    'components',
    pluralType,
    kebabName
  );

  // Check if template exists
  if (!existsSync(templateDir)) {
    console.error(`❌ Template not found: ${templateDir}`);
    process.exit(1);
  }

  // Check if component already exists
  if (existsSync(componentDir)) {
    console.error(`❌ Component already exists: ${componentDir}`);
    process.exit(1);
  }

  console.log(`\n🔨 Creating ${type} component: ${pascalName}\n`);

  try {
    // Create component directory
    mkdirSync(componentDir, { recursive: true });
    console.log(`✓ Created directory: ${componentDir}`);

    // Copy and process template files
    const files = await fs.readdir(templateDir);

    for (const file of files) {
      const templateFilePath = path.join(templateDir, file);
      const stat = await fs.stat(templateFilePath);

      // Skip directories (shouldn't have any, but be safe)
      if (stat.isDirectory()) {
        continue;
      }

      // Skip non-template files (files ending with .template are templates)
      // All other files should be processed
      const isTemplate = file.endsWith('.template');

      // Read template content
      let content = await fs.readFile(templateFilePath, 'utf-8');

      // Replace all placeholders
      content = content
        .replace(/COMPONENT_NAME_KEBAB/g, kebabName)
        .replace(/COMPONENT_NAME_PASCAL/g, pascalName)
        .replace(/COMPONENT_NAME_CAMEL/g, camelName)
        .replace(/COMPONENT_TYPE/g, type);

      // Determine new file name
      // If it's a .template file, remove the .template suffix
      let newFileName = file.replace('component', kebabName);
      if (isTemplate) {
        newFileName = newFileName.replace('.template', '');
      }

      const newFilePath = path.join(componentDir, newFileName);

      // Write the processed file
      await fs.writeFile(newFilePath, content, 'utf-8');
      console.log(`✓ Created file: ${newFileName}`);
    }

    console.log(`\n✨ Successfully created ${type} component: ${pascalName}`);
    console.log(`\nLocation: ${componentDir}`);
    console.log('\nNext steps:');
    console.log(`1. Edit the component files in: components/${pluralType}/${kebabName}/`);
    console.log(`2. Customize the CSS in: ${kebabName}.css`);
    console.log(`3. Update the Nunjucks template in: ${kebabName}.njk`);
    console.log(`4. Define the schema in: ${kebabName}.schema.json`);
    console.log(`5. Create Storybook stories in: ${kebabName}.stories.ts`);
    console.log(`6. Document usage in: README.md`);
    console.log('\nTo view in Storybook:');
    console.log('  npm run storybook\n');
  } catch (error) {
    console.error(`\n❌ Error creating component: ${error.message}`);
    // Clean up on error
    if (existsSync(componentDir)) {
      rmSync(componentDir, { recursive: true, force: true });
      console.log('Cleaned up partial component directory');
    }
    process.exit(1);
  }
}

// Parse command line arguments
const [, , type, name] = process.argv;

// Show help if no arguments
if (!type || type === '--help' || type === '-h') {
  console.log(`
AgentStatic Component Generator

Usage:
  node scripts/new-component.js <type> <name>

Arguments:
  type    Component type: atom, molecule, or organism
  name    Component name (kebab-case, PascalCase, or camelCase)

Examples:
  node scripts/new-component.js atom button
  node scripts/new-component.js molecule card
  node scripts/new-component.js organism hero-section

The script will:
  • Create a new directory in components/<type>s/<name>
  • Copy template files (CSS, Nunjucks, schema, stories, README)
  • Replace placeholders with your component name
  • Set up the proper file structure

Component Naming Convention:
  • CSS classes: component-scoped flat naming (.button, .button-text, .button-primary)
  • Files: kebab-case (button.css, hero-section.njk)
  • Nunjucks macros: camelCase (button, heroSection)
  • TypeScript: PascalCase (Button, HeroSection)

For more information, see: components/_templates/README.md
`);
  process.exit(0);
}

// Run the generator
createComponent(type, name);
