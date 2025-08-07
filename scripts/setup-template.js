#!/usr/bin/env node

/**
 * Template Setup Script for AgentStatic
 *
 * This script runs when someone creates a new repository from the AgentStatic template.
 * It initializes the repository with customized content and configuration.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { readFile, writeFile, mkdir, cp, rm, readdir } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('🚀 AgentStatic Template Setup Starting...');

// Get environment variables
const githubRepo = process.env.GITHUB_REPOSITORY || 'user/repository';
const [githubUsername, repositoryName] = githubRepo.split('/');

console.log(`📂 Repository: ${githubRepo}`);
console.log(`👤 Username: ${githubUsername}`);
console.log(`📦 Repository Name: ${repositoryName}`);

async function setupTemplate() {
  try {
    // Step 1: Copy template content to root
    await copyTemplateContent();

    // Step 2: Process template variables
    await processTemplateVariables();

    // Step 3: Create package.json for the new site
    await createSitePackageJson();

    // Step 4: Clean up template-specific files
    await cleanupTemplateFiles();

    // Step 5: Create welcome documentation
    await createWelcomeFiles();

    console.log('🎉 AgentStatic Template Setup Complete!');
    console.log('📋 Next Steps:');
    console.log('   1. Run: npm install');
    console.log('   2. Run: npm run dev');
    console.log('   3. Edit content in content/ directory');
    console.log('   4. Push to main branch to deploy!');
  } catch (error) {
    console.error('❌ Template setup failed:', error);
    process.exit(1);
  }
}

async function copyTemplateContent() {
  console.log('📋 Copying template content...');

  const templateDir = join(rootDir, 'template');

  if (!existsSync(templateDir)) {
    console.log('⚠️ No template directory found, skipping content copy');
    return;
  }

  // Copy content directory
  const contentDir = join(templateDir, 'content');
  if (existsSync(contentDir)) {
    await cp(contentDir, join(rootDir, 'content'), { recursive: true });
    console.log('✅ Copied content directory');
  }

  // Copy assets directory
  const assetsDir = join(templateDir, 'assets');
  if (existsSync(assetsDir)) {
    await cp(assetsDir, join(rootDir, 'assets'), { recursive: true });
    console.log('✅ Copied assets directory');
  }

  // Copy site configuration
  const configFile = join(templateDir, 'site.config.json');
  if (existsSync(configFile)) {
    await cp(configFile, join(rootDir, 'site.config.json'));
    console.log('✅ Copied site configuration');
  }

  // Copy gitignore if it doesn't exist
  const gitignoreFile = join(templateDir, '.gitignore');
  const rootGitignore = join(rootDir, '.gitignore');
  if (existsSync(gitignoreFile) && !existsSync(rootGitignore)) {
    await cp(gitignoreFile, rootGitignore);
    console.log('✅ Copied .gitignore');
  }
}

async function processTemplateVariables() {
  console.log('🔄 Processing template variables...');

  const templateVars = {
    GITHUB_USERNAME: githubUsername,
    REPOSITORY_NAME: repositoryName,
    SITE_URL: `https://${githubUsername}.github.io/${repositoryName}`,
    CURRENT_YEAR: new Date().getFullYear().toString(),
    SETUP_DATE: new Date().toISOString().split('T')[0],
  };

  // Process site.config.json
  const configPath = join(rootDir, 'site.config.json');
  if (existsSync(configPath)) {
    let configContent = await readFile(configPath, 'utf8');

    for (const [key, value] of Object.entries(templateVars)) {
      configContent = configContent.replace(
        new RegExp(`{{${key}}}`, 'g'),
        value
      );
    }

    await writeFile(configPath, configContent);
    console.log('✅ Processed site configuration variables');
  }

  // Process content files
  await processContentFiles(join(rootDir, 'content'), templateVars);
}

async function processContentFiles(dir, vars) {
  if (!existsSync(dir)) return;

  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(dir, file.name);

    if (file.isDirectory()) {
      await processContentFiles(filePath, vars);
    } else if (file.name.endsWith('.md')) {
      let content = await readFile(filePath, 'utf8');

      for (const [key, value] of Object.entries(vars)) {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }

      await writeFile(filePath, content);
    }
  }
}

async function createSitePackageJson() {
  console.log('📦 Creating site package.json...');

  // Read the template package.json
  const templatePackagePath = join(rootDir, 'package.json');
  const templatePackage = JSON.parse(
    await readFile(templatePackagePath, 'utf8')
  );

  // Create a new package.json for the site
  const sitePackage = {
    name: repositoryName.toLowerCase(),
    version: '1.0.0',
    type: 'module',
    description: `A beautiful static site built with AgentStatic`,
    main: 'src/index.js',
    scripts: {
      dev: 'tsx scripts/build-site.js --watch',
      build: 'node scripts/build-site.js',
      'build:pages': 'node scripts/build-site.js',
      preview: 'cd build && python -m http.server 8080',
      deploy: 'npm run build',
      lint: 'eslint scripts src --ext .ts,.js',
      'lint:fix': 'eslint scripts src --ext .ts,.js --fix',
      format: 'prettier --write scripts src content',
      'format:check': 'prettier --check scripts src content',
      'type-check': 'tsc --noEmit',
    },
    keywords: [
      'static-site',
      'agentstatic',
      'portfolio',
      'blog',
      'typescript',
      'ai-native',
    ],
    author: githubUsername,
    license: 'MIT',
    homepage: `https://${githubUsername}.github.io/${repositoryName}`,
    repository: {
      type: 'git',
      url: `https://github.com/${githubUsername}/${repositoryName}.git`,
    },
    bugs: {
      url: `https://github.com/${githubUsername}/${repositoryName}/issues`,
    },
    dependencies: {
      // Core markdown processing dependencies
      'gray-matter': '^4.0.3',
      unified: '^11.0.0',
      'remark-parse': '^11.0.0',
      'remark-rehype': '^11.0.0',
      'rehype-stringify': '^10.0.0',
      'remark-frontmatter': '^5.0.0',
      'remark-gfm': '^4.0.0',
      // Utility dependencies
      'date-fns': '^3.6.0',
      'lodash-es': '^4.17.21',
      'fast-glob': '^3.3.2',
      zod: '^3.25.0',
    },
    devDependencies: {
      '@types/node': '^24.0.0',
      '@types/lodash-es': '^4.17.12',
      typescript: '^5.7.0',
      tsx: '^4.19.0',
      eslint: '^9.0.0',
      '@typescript-eslint/eslint-plugin': '^8.0.0',
      '@typescript-eslint/parser': '^8.0.0',
      prettier: '^3.0.0',
    },
    engines: {
      node: '>=24.0.0',
    },
  };

  await writeFile(
    join(rootDir, 'package.json'),
    JSON.stringify(sitePackage, null, 2)
  );
  console.log('✅ Created site package.json');
}

async function cleanupTemplateFiles() {
  console.log('🧹 Cleaning up template files...');

  const filesToRemove = [
    'template',
    'src', // Remove library source (will create new template-specific src/)
    'tests',
    'coverage',
    'dist',
    '.husky', // Remove git hooks - template sites don't need pre-commit validation
    'esbuild.config.ts',
    'vitest.config.ts',
    'tsconfig.json', // Will create a template-specific one
    'eslint.config.js',
    '.github/workflows/ci.yml', // Remove CI workflow from template repos
    '.codecov.yml', // Remove Codecov config if present
    'codecov.yml', // Alternative Codecov config location
    'tempPlanningDoc.md',
    'github-issues-breakdown.md',
    'navigation-architecture.md',
    'quality-gates.md',
    'AGENTS.md',
  ];

  for (const file of filesToRemove) {
    const filePath = join(rootDir, file);
    if (existsSync(filePath)) {
      await rm(filePath, { recursive: true, force: true });
      console.log(`🗑️ Removed ${file}`);
    }
  }
}

async function createWelcomeFiles() {
  console.log('📝 Creating welcome files...');

  // Create TypeScript config for template sites (TypeScript-first but with flexible includes)
  const tsConfig = {
    compilerOptions: {
      target: 'ES2023',
      module: 'ESNext',
      moduleResolution: 'Node',
      lib: ['ES2023', 'DOM'],
      strict: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      allowJs: true,
      noEmit: true,
    },
    include: [
      'scripts/**/*',
      'src/**/*', // For future custom partials/components
      '*.js',
      '*.ts',
    ],
    exclude: ['node_modules', 'dist', 'build', 'pages-dist', 'content/**/*'],
  };

  await writeFile(
    join(rootDir, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );
  console.log('✅ Created tsconfig.json');

  // Create basic src directory structure for TypeScript-first development
  await mkdir(join(rootDir, 'src'), { recursive: true });
  await mkdir(join(rootDir, 'src/partials'), { recursive: true });

  // Create placeholder TypeScript file so type-check doesn't fail
  const placeholderContent = `/**
 * Custom partials and components for your AgentStatic site
 * 
 * This directory is for TypeScript-first development of custom partials,
 * components, and site-specific functionality.
 */

// Example custom partial (you can delete this)
export const siteName = '${repositoryName}';

// TODO: Add your custom partials and components here
// Example:
// export const customHero: AgentPartial<{title: string}> = { ... }
`;

  await writeFile(join(rootDir, 'src/index.ts'), placeholderContent);
  console.log('✅ Created src/ directory with TypeScript placeholder');

  // Create ESLint config for template sites
  const eslintConfig = `import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off', // Allow console for build scripts
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'pages-dist/**', 'content/**'],
  },
];
`;

  await writeFile(join(rootDir, 'eslint.config.js'), eslintConfig);
  console.log('✅ Created eslint.config.js');

  // Create a build script for the template site that uses AgentStatic utilities
  const buildScript = `#!/usr/bin/env node

/**
 * Template Site Build Script
 * 
 * This script builds your AgentStatic site using the core path resolution
 * and content processing utilities embedded in this template.
 */

import { join, dirname, resolve } from 'path';
import { readFile, writeFile, mkdir, cp } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Embedded AgentStatic utilities for template repositories
function resolveProjectRoot(startPath) {
  let dir = startPath || process.cwd();
  
  if (existsSync(join(dir, 'package.json'))) {
    return dir;
  }
  
  while (dir !== '/' && dir !== dirname(dir)) {
    const parentDir = dirname(dir);
    if (existsSync(join(parentDir, 'package.json'))) {
      return parentDir;
    }
    dir = parentDir;
  }
  
  return process.cwd();
}

async function loadConfig(rootDir) {
  const configPath = join(rootDir, 'site.config.json');
  if (existsSync(configPath)) {
    try {
      const configContent = await readFile(configPath, 'utf8');
      return JSON.parse(configContent);
    } catch (error) {
      console.warn('⚠️ Failed to parse site.config.json:', error);
    }
  }
  
  return {
    site: {
      title: '${repositoryName}',
      description: 'A beautiful static site built with AgentStatic',
      url: 'https://${githubUsername}.github.io/${repositoryName}'
    },
    build: {
      outputDir: 'build',
      generateSitemap: true,
      generateRobotsTxt: true
    }
  };
}

async function buildSite() {
  console.log('🚀 Building your AgentStatic site...');
  
  const rootDir = resolveProjectRoot();
  const outputDir = join(rootDir, 'build');
  
  console.log(\`📁 Project root: \${rootDir}\`);
  console.log(\`📁 Output directory: \${outputDir}\`);
  
  // Load configuration
  const config = await loadConfig(rootDir);
  console.log(\`✅ Configuration loaded for "\${config.site?.title || 'Untitled Site'}"\`);
  
  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });
  
  // Copy content
  const contentDir = join(rootDir, 'content');
  if (existsSync(contentDir)) {
    await cp(contentDir, join(outputDir, 'content'), { recursive: true });
    console.log('✅ Copied content directory');
  }
  
  // Copy assets
  const assetsDir = join(rootDir, 'assets');
  if (existsSync(assetsDir)) {
    await cp(assetsDir, join(outputDir, 'assets'), { recursive: true });
    console.log('✅ Copied assets directory');
  }
  
  // Generate basic HTML (will be enhanced with full template system)
  const htmlContent = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${config.site.title}</title>
    <meta name="description" content="\${config.site.description}">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
               max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
        .hero { background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; 
                padding: 3rem; border-radius: 12px; text-align: center; margin: 2rem 0; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>\${config.site.title}</h1>
        <p>\${config.site.description}</p>
    </div>
    
    <h2>🎯 Your AgentStatic Site is Ready!</h2>
    <p>This site was built using the embedded AgentStatic build system.</p>
    <p>Edit your content in the <code>content/</code> directory and rebuild to see changes.</p>
    
    <footer>
        <p><em>Built with AgentStatic - AI-Native Static Site Generator</em></p>
        <p>Build time: \${new Date().toISOString()}</p>
    </footer>
</body>
</html>\`;
  
  await writeFile(join(outputDir, 'index.html'), htmlContent);
  console.log('✅ Generated HTML page');
  
  // Generate robots.txt
  if (config.build?.generateRobotsTxt !== false) {
    const robotsContent = \`User-agent: *
Allow: /

Sitemap: \${config.site.url}/sitemap.xml\`;
    await writeFile(join(outputDir, 'robots.txt'), robotsContent);
    console.log('✅ Generated robots.txt');
  }
  
  // Generate sitemap
  if (config.build?.generateSitemap !== false) {
    const currentDate = new Date().toISOString().split('T')[0];
    const sitemapContent = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>\${config.site.url}/</loc>
    <lastmod>\${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\`;
    await writeFile(join(outputDir, 'sitemap.xml'), sitemapContent);
    console.log('✅ Generated sitemap.xml');
  }
  
  console.log('🎉 Site built successfully!');
  console.log(\`📦 Output directory: \${outputDir}\`);
  console.log('💡 Run "npm run preview" to preview your site');
}

// Handle watch mode for development
if (process.argv.includes('--watch')) {
  console.log('👀 Watch mode not implemented yet. Run "npm run build" after making changes.');
}

buildSite().catch(console.error);
`;

  await mkdir(join(rootDir, 'scripts'), { recursive: true });
  await writeFile(join(rootDir, 'scripts/build-site.js'), buildScript);
  console.log('✅ Created build script');

  // Create README for the new site
  const readme = `# ${repositoryName}

A beautiful static site built with [AgentStatic](https://github.com/conorluddy/AgentStatic).

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
${repositoryName}/
├── content/          # Your content (Markdown files)
├── assets/           # Images, videos, and other media
├── src/              # Custom partials and components
├── site.config.json  # Site configuration
└── scripts/          # Build and deployment scripts
\`\`\`

## 📝 Content Management

Edit the Markdown files in the \`content/\` directory to update your site:

- \`content/pages/index.md\` - Homepage
- \`content/pages/about.md\` - About page  
- \`content/posts/\` - Blog posts

## 🎨 Customization

- **Site Settings**: Edit \`site.config.json\`
- **Styling**: Customize partials in \`src/partials/\`
- **Content**: Add/edit Markdown files in \`content/\`
- **Media**: Add images and assets to \`assets/\`

## 🚀 Deployment

This site automatically deploys to GitHub Pages when you push to the main branch.

Your site will be available at: https://${githubUsername}.github.io/${repositoryName}

## 📚 Learn More

- [AgentStatic Documentation](https://github.com/conorluddy/AgentStatic/blob/main/README.md)
- [Template Development](https://github.com/conorluddy/AgentStatic/blob/main/docs/templates.md)
- [MCP Integration](https://github.com/conorluddy/AgentStatic/blob/main/docs/mcp-integration.md)

---

*Built with [AgentStatic](https://github.com/conorluddy/AgentStatic) - AI-Native Static Site Generator*
`;

  await writeFile(join(rootDir, 'README.md'), readme);
  console.log('✅ Created README.md');
}

// Run the setup
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  setupTemplate();
}
