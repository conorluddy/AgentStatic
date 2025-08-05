#!/usr/bin/env node

/**
 * GitHub Pages Build Script for AgentStatic
 * 
 * This script builds a demo site using the AgentStatic template content
 * for deployment to GitHub Pages. It showcases the capabilities of the
 * static site generator.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { readFile, writeFile, mkdir, cp, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const templateDir = join(rootDir, 'template');
const outputDir = join(rootDir, 'pages-dist');

console.log('🚀 AgentStatic Pages Build Starting...');
console.log(`📁 Template Dir: ${templateDir}`);
console.log(`📁 Output Dir: ${outputDir}`);

async function buildPagesDemo() {
  try {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });
    
    // Load site configuration
    const configPath = join(templateDir, 'site.config.json');
    let config = {};
    
    if (existsSync(configPath)) {
      const configContent = await readFile(configPath, 'utf8');
      config = JSON.parse(configContent);
      console.log('✅ Loaded site configuration');
    } else {
      console.log('⚠️ No site configuration found, using defaults');
    }
    
    // Process template variables in config
    const processedConfig = processTemplateVars(config, {
      GITHUB_USERNAME: 'conorluddy',
      REPOSITORY_NAME: 'AgentStatic',
      SITE_URL: 'https://conorluddy.github.io/AgentStatic'
    });
    
    // Create a basic HTML structure for demo
    const htmlContent = await generateDemoHTML(processedConfig);
    
    // Write the demo HTML
    await writeFile(join(outputDir, 'index.html'), htmlContent);
    console.log('✅ Generated demo HTML');
    
    // Copy template assets if they exist
    const assetsDir = join(templateDir, 'assets');
    if (existsSync(assetsDir)) {
      await cp(assetsDir, join(outputDir, 'assets'), { recursive: true });
      console.log('✅ Copied template assets');
    }
    
    // Generate CSS for demo
    const cssContent = generateDemoCSS();
    await mkdir(join(outputDir, 'styles'), { recursive: true });
    await writeFile(join(outputDir, 'styles/main.css'), cssContent);
    console.log('✅ Generated demo CSS');
    
    // Copy content for demo
    const contentDir = join(templateDir, 'content');
    if (existsSync(contentDir)) {
      await cp(contentDir, join(outputDir, 'content'), { recursive: true });
      console.log('✅ Copied template content');
    }
    
    // Generate robots.txt and sitemap for demo
    await generateRobotsTxt(outputDir, processedConfig);
    await generateSitemap(outputDir, processedConfig);
    
    console.log('🎉 AgentStatic Pages Build Complete!');
    console.log(`📦 Demo site generated in: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

function processTemplateVars(obj, vars) {
  const jsonStr = JSON.stringify(obj);
  let processed = jsonStr;
  
  for (const [key, value] of Object.entries(vars)) {
    processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  
  return JSON.parse(processed);
}

async function generateDemoHTML(config) {
  const title = config.site?.title || 'AgentStatic Demo';
  const description = config.site?.description || 'AI-Native Static Site Generator Demo';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="generator" content="AgentStatic">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${config.site?.url || ''}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    
    <link rel="stylesheet" href="styles/main.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1>🚀 ${title}</h1>
            </div>
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="https://github.com/conorluddy/AgentStatic">GitHub</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h1 class="hero-title">AgentStatic</h1>
                <p class="hero-subtitle">AI-Native Static Site Generator</p>
                <p class="hero-description">${description}</p>
                <div class="hero-actions">
                    <a href="https://github.com/conorluddy/AgentStatic" class="btn btn-primary">
                        View on GitHub
                    </a>
                    <a href="#demo" class="btn btn-secondary">
                        Live Demo
                    </a>
                </div>
            </div>
        </section>

        <section id="features" class="features">
            <div class="container">
                <h2>Why AgentStatic?</h2>
                <div class="features-grid">
                    <div class="feature">
                        <div class="feature-icon">🧠</div>
                        <h3>AI-Native Design</h3>
                        <p>Built from the ground up with AI integration through Model Context Protocol (MCP)</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">⚡</div>
                        <h3>TypeScript First</h3>
                        <p>Type-safe templates with Zod validation and zero 'any' types</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🎨</div>
                        <h3>Creative Professional Focus</h3>
                        <p>Advanced media handling perfect for portfolios and showcases</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🚀</div>
                        <h3>Lightning Fast</h3>
                        <p>Sub-100ms builds with framework-free vanilla output</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="demo" class="demo">
            <div class="container">
                <h2>Template Repository</h2>
                <p>This site demonstrates AgentStatic as a GitHub Template Repository. 
                   Click "Use this template" on GitHub to create your own AgentStatic site!</p>
                
                <div class="demo-features">
                    <div class="demo-feature">
                        <h3>🏗️ Automatic Setup</h3>
                        <p>GitHub Actions automatically configures your new repository with sample content and deployment</p>
                    </div>
                    <div class="demo-feature">
                        <h3>📦 GitHub Pages Ready</h3>
                        <p>Deploys automatically to GitHub Pages on every push to main branch</p>
                    </div>
                    <div class="demo-feature">
                        <h3>🎯 Template Content</h3>
                        <p>Includes sample pages, posts, and configuration to get you started immediately</p>
                    </div>
                </div>
                
                <div class="cta">
                    <a href="https://github.com/conorluddy/AgentStatic/generate" class="btn btn-primary btn-large">
                        Use This Template
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 AgentStatic. Built with ❤️ for the creative community.</p>
            <p>
                <a href="https://github.com/conorluddy/AgentStatic">GitHub</a> •
                <a href="https://github.com/conorluddy/AgentStatic/blob/main/README.md">Documentation</a> •
                <a href="https://github.com/conorluddy/AgentStatic/discussions">Community</a>
            </p>
        </div>
    </footer>
</body>
</html>`;
}

function generateDemoCSS() {
  return `/* AgentStatic Demo Styles */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6366f1;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --bg-color: #ffffff;
  --bg-light: #f9fafb;
  --border-color: #e5e7eb;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius: 0.5rem;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.header {
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--bg-color);
  color: var(--primary-color);
  border-color: var(--bg-color);
}

.btn-primary:hover {
  background: var(--bg-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Features Section */
.features {
  padding: 4rem 0;
  background: var(--bg-light);
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature {
  background: var(--bg-color);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.2s;
}

.feature:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.feature p {
  color: var(--text-light);
  line-height: 1.6;
}

/* Demo Section */
.demo {
  padding: 4rem 0;
}

.demo h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.demo > .container > p {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.demo-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.demo-feature {
  text-align: center;
  padding: 1.5rem;
}

.demo-feature h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.demo-feature p {
  color: var(--text-light);
}

.cta {
  text-align: center;
}

/* Footer */
.footer {
  background: var(--text-color);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .hero {
    padding: 3rem 0;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature {
  animation: fadeInUp 0.6s ease-out;
}

.feature:nth-child(2) { animation-delay: 0.1s; }
.feature:nth-child(3) { animation-delay: 0.2s; }
.feature:nth-child(4) { animation-delay: 0.3s; }`;
}

async function generateRobotsTxt(outputDir, config) {
  const siteUrl = config.site?.url || 'https://example.com';
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;
  
  await writeFile(join(outputDir, 'robots.txt'), robotsContent);
  console.log('✅ Generated robots.txt');
}

async function generateSitemap(outputDir, config) {
  const siteUrl = config.site?.url || 'https://example.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  
  await writeFile(join(outputDir, 'sitemap.xml'), sitemapContent);
  console.log('✅ Generated sitemap.xml');
}

// Run the build
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildPagesDemo();
}