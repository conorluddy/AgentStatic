import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, relative } from 'path';
import { buildFontLinks } from './fonts.js';

const MAX_DEPTH = 10;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseAttributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  // Match attribute="value" or attribute='value'
  const regex = /(\w+)=["']([^"']*)["']/g;
  let match;
  while ((match = regex.exec(tag)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function extractChildren(html: string, tagName: string): string {
  // Find content between opening and closing tags
  // Handle self-closing tags (no children)
  const selfClosing = new RegExp(`<${tagName}[^>]*/\\s*>`, 'i');
  if (selfClosing.test(html)) {
    return '';
  }

  const openTag = new RegExp(`<${tagName}[^>]*>`, 'i');
  const closeTag = new RegExp(`</${tagName}>`, 'i');

  const openMatch = html.match(openTag);
  const closeMatch = html.match(closeTag);

  if (!openMatch || !closeMatch) return '';

  const start = openMatch.index! + openMatch[0].length;
  const end = html.lastIndexOf(`</${tagName}>`);

  return html.slice(start, end).trim();
}

function extractSlottedContent(children: string): { default: string; named: Record<string, string> } {
  const named: Record<string, string> = {};

  // Extract elements with slot="name" attribute
  const slotRegex = /<(\w+)[^>]*\sslot=["'](\w+)["'][^>]*>([\s\S]*?)<\/\1>/gi;
  let defaultContent = children;
  let match;

  while ((match = slotRegex.exec(children)) !== null) {
    const [fullMatch, , slotName, content] = match;
    // Include the full element in the slot (without the slot attribute)
    const cleanedElement = fullMatch.replace(/\sslot=["']\w+["']/, '');
    named[slotName] = (named[slotName] || '') + cleanedElement;
    defaultContent = defaultContent.replace(fullMatch, '');
  }

  return { default: defaultContent.trim(), named };
}

function replaceSlots(partial: string, slotted: { default: string; named: Record<string, string> }): string {
  let result = partial;

  // Replace named slots: <slot name="x">fallback</slot>
  result = result.replace(/<slot\s+name=["'](\w+)["'][^>]*>([\s\S]*?)<\/slot>/gi, (_, name, fallback) => {
    return slotted.named[name] || fallback;
  });

  // Replace default slot: <slot>fallback</slot>
  result = result.replace(/<slot>([\s\S]*?)<\/slot>/gi, (_, fallback) => {
    return slotted.default || fallback;
  });

  // Handle self-closing slots: <slot name="x" /> or <slot />
  result = result.replace(/<slot\s+name=["'](\w+)["'][^>]*\/>/gi, (_, name) => {
    return slotted.named[name] || '';
  });
  result = result.replace(/<slot\s*\/>/gi, () => {
    return slotted.default || '';
  });

  return result;
}

function processIncludes(html: string, partialsDir: string, depth: number = 0): string {
  if (depth > MAX_DEPTH) {
    console.warn('  warning: max include depth reached');
    return html;
  }

  // Match <include-name ...> or <include-name .../>
  const includeRegex = /<include-(\w+)([^>]*?)(?:\/>|>([\s\S]*?)<\/include-\1>)/gi;

  return html.replace(includeRegex, (fullMatch, name, attrsStr, children = '') => {
    const partialPath = join(partialsDir, `${name}.html`);

    if (!existsSync(partialPath)) {
      console.warn(`  warning: partial not found: ${name}.html`);
      return fullMatch;
    }

    let partial = readFileSync(partialPath, 'utf-8');

    // Replace {{attribute}} placeholders with HTML-escaped values
    const attrs = parseAttributes(attrsStr);
    partial = partial.replace(/\{\{(\w+)\}\}/g, (_, attrName) => {
      return escapeHtml(attrs[attrName] || '');
    });

    // Handle slots
    const slotted = extractSlottedContent(children);
    partial = replaceSlots(partial, slotted);

    // Recursively process nested includes
    return processIncludes(partial, partialsDir, depth + 1);
  });
}

function processFile(srcPath: string, destPath: string, partialsDir: string, fontLinks: string): void {
  let html = readFileSync(srcPath, 'utf-8');
  html = processIncludes(html, partialsDir);

  // Inject font links after opening <head> tag
  if (fontLinks) {
    html = html.replace(/<head>/, `<head>\n  ${fontLinks}`);
  }

  writeFileSync(destPath, html);
}

function processDirectory(srcDir: string, destDir: string, partialsDir: string, fontLinks: string): void {
  if (!existsSync(srcDir)) return;

  mkdirSync(destDir, { recursive: true });

  const entries = readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(srcPath, destPath, partialsDir, fontLinks);
    } else if (entry.name.endsWith('.html')) {
      processFile(srcPath, destPath, partialsDir, fontLinks);
    }
  }
}

export function buildHtml(rootDir: string): void {
  const pagesDir = join(rootDir, 'pages');
  const distDir = join(rootDir, 'dist');
  const partialsDir = join(rootDir, 'partials');

  const fontLinks = buildFontLinks(rootDir);
  processDirectory(pagesDir, distDir, partialsDir, fontLinks);

  console.log('  html: processed');
  if (fontLinks) console.log('  fonts: injected');
}
