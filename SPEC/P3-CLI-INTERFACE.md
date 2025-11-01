# CLI Interface Specification

## Overview

This document specifies the complete command-line interface for AgentStatic, including all commands, arguments, configuration options, environment variables, and error handling.

## Command Structure

```bash
agentstatic <command> [options]
```

## Commands

### `build` - Build Static Site

Build a complete static site from component definitions.

```bash
agentstatic build [source] [options]
```

**Arguments:**
- `source` (optional) - Path to source directory or page definition file (default: `./pages`)

**Options:**
- `-o, --output <dir>` - Output directory (default: `./dist`)
- `-c, --config <file>` - Config file path (default: `agentstatic.config.js`)
- `--clean` - Clean output directory before build
- `--watch` - Watch for changes and rebuild
- `--minify` - Minify HTML, CSS, JS output
- `--no-optimize` - Disable optimization
- `--parallel` - Enable parallel processing (default: true)
- `--workers <n>` - Number of worker threads (default: CPU cores)
- `--verbose` - Verbose logging
- `--silent` - No output except errors

**Examples:**
```bash
# Basic build
agentstatic build

# Build with custom paths
agentstatic build ./src/pages -o ./public

# Build with minification
agentstatic build --minify

# Watch mode for development
agentstatic build --watch

# Verbose build with 8 workers
agentstatic build --verbose --workers 8
```

**Exit Codes:**
- `0` - Success
- `1` - Build error (invalid composition, missing components)
- `2` - Configuration error
- `3` - File system error

---

### `dev` - Development Server

Start development server with hot reload.

```bash
agentstatic dev [options]
```

**Options:**
- `-p, --port <port>` - Server port (default: 3000)
- `-H, --host <host>` - Server host (default: localhost)
- `--open` - Open browser automatically
- `--https` - Use HTTPS
- `--cert <file>` - SSL certificate file
- `--key <file>` - SSL key file

**Examples:**
```bash
# Start dev server
agentstatic dev

# Custom port
agentstatic dev -p 8080

# HTTPS with custom cert
agentstatic dev --https --cert ./cert.pem --key ./key.pem

# Open browser automatically
agentstatic dev --open
```

**Exit Codes:**
- `0` - Server stopped gracefully
- `1` - Server error
- `2` - Port already in use

---

### `init` - Initialize Project

Initialize a new AgentStatic project.

```bash
agentstatic init [directory] [options]
```

**Arguments:**
- `directory` (optional) - Project directory (default: current directory)

**Options:**
- `-t, --template <name>` - Project template (default: basic)
  - `basic` - Basic setup
  - `landing` - Landing page template
  - `blog` - Blog template
  - `docs` - Documentation site template
- `--npm` - Use npm (default)
- `--yarn` - Use yarn
- `--pnpm` - Use pnpm
- `-y, --yes` - Skip prompts, use defaults

**Examples:**
```bash
# Interactive initialization
agentstatic init

# Initialize with template
agentstatic init my-site --template landing

# Quick init with defaults
agentstatic init -y
```

**Exit Codes:**
- `0` - Success
- `1` - Directory already exists
- `2` - Template not found

---

### `validate` - Validate Composition

Validate a page composition without building.

```bash
agentstatic validate <file> [options]
```

**Arguments:**
- `file` - Path to composition file (JSON)

**Options:**
- `--strict` - Use strict validation
- `--fix` - Apply automatic fixes
- `--format <type>` - Output format (json, text) (default: text)

**Examples:**
```bash
# Validate composition
agentstatic validate ./pages/home.json

# Strict validation with auto-fix
agentstatic validate ./pages/home.json --strict --fix

# JSON output for programmatic use
agentstatic validate ./pages/home.json --format json
```

**Exit Codes:**
- `0` - Validation passed
- `1` - Validation failed (errors)
- `2` - File not found

**Output Format (text):**
```
✓ Validation passed (score: 95/100)

Warnings:
  - Consider adding a footer section

Suggestions:
  - Use semantic HTML elements
```

**Output Format (json):**
```json
{
  "valid": true,
  "score": 95,
  "errors": [],
  "warnings": [
    {
      "type": "missing_section",
      "message": "Consider adding a footer section",
      "path": "$"
    }
  ],
  "suggestions": [
    "Use semantic HTML elements"
  ]
}
```

---

### `registry` - Manage Component Registry

Manage local component registry.

```bash
agentstatic registry <action> [options]
```

**Actions:**
- `list` - List all registered components
- `add <path>` - Add component to registry
- `remove <name>` - Remove component from registry
- `update` - Update registry index
- `search <query>` - Search registry

**Options:**
- `--category <cat>` - Filter by category
- `--tag <tag>` - Filter by tag
- `--format <type>` - Output format (json, table) (default: table)

**Examples:**
```bash
# List all components
agentstatic registry list

# Search for components
agentstatic registry search "hero section"

# Add component
agentstatic registry add ./components/MyComponent

# List by category
agentstatic registry list --category layout

# JSON output
agentstatic registry list --format json
```

---

### `serve` - Serve Built Site

Serve a built static site.

```bash
agentstatic serve [directory] [options]
```

**Arguments:**
- `directory` (optional) - Directory to serve (default: `./dist`)

**Options:**
- `-p, --port <port>` - Server port (default: 8080)
- `-H, --host <host>` - Server host (default: localhost)
- `--open` - Open browser automatically
- `--spa` - SPA mode (serve index.html for all routes)

**Examples:**
```bash
# Serve built site
agentstatic serve

# Custom port
agentstatic serve -p 3000

# SPA mode
agentstatic serve --spa --open
```

---

### `mcp` - Start MCP Server

Start Model Context Protocol server for AI agents.

```bash
agentstatic mcp [options]
```

**Options:**
- `--stdio` - Use stdio transport (default)
- `--http` - Use HTTP transport
- `--port <port>` - HTTP server port (default: 3100)
- `--verbose` - Verbose logging

**Examples:**
```bash
# Start MCP server (stdio)
agentstatic mcp

# HTTP server mode
agentstatic mcp --http --port 3100
```

---

## Configuration File

### `agentstatic.config.js`

```javascript
module.exports = {
  // Input/Output
  input: './pages',
  output: './dist',

  // Build options
  build: {
    clean: true,
    minify: true,
    optimize: true,
    parallel: true,
    workers: 4
  },

  // Registry
  registry: {
    sources: [
      './components',
      '@agentstatic/components'
    ],
    cache: true
  },

  // Optimization
  optimization: {
    html: {
      collapseWhitespace: true,
      removeComments: true
    },
    css: {
      minify: true,
      autoprefixer: true,
      purgeUnused: true
    },
    images: {
      optimize: true,
      formats: ['webp', 'avif']
    }
  },

  // Dev server
  server: {
    port: 3000,
    host: 'localhost',
    open: true,
    https: false
  },

  // AI/MCP options
  ai: {
    enabled: true,
    mcpPort: 3100
  }
};
```

### Alternative: `agentstatic.config.json`

```json
{
  "input": "./pages",
  "output": "./dist",
  "build": {
    "clean": true,
    "minify": true
  }
}
```

### Alternative: `package.json`

```json
{
  "agentstatic": {
    "input": "./pages",
    "output": "./dist"
  }
}
```

## Environment Variables

```bash
# Registry
AGENTSTATIC_REGISTRY_PATH=./components
AGENTSTATIC_REGISTRY_CACHE=true

# Build
AGENTSTATIC_OUTPUT=./dist
AGENTSTATIC_MINIFY=true
AGENTSTATIC_WORKERS=4

# Development
AGENTSTATIC_DEV_PORT=3000
AGENTSTATIC_DEV_OPEN=true

# MCP Server
AGENTSTATIC_MCP_PORT=3100
AGENTSTATIC_MCP_VERBOSE=false

# Optimization
AGENTSTATIC_OPTIMIZE_IMAGES=true
AGENTSTATIC_OPTIMIZE_CSS=true

# AI Integration (optional)
OPENAI_API_KEY=sk-...
```

## Global Options

Available for all commands:

- `-h, --help` - Show help
- `-v, --version` - Show version
- `--debug` - Enable debug mode
- `--no-color` - Disable colored output

## Help Text Examples

### Main Help

```bash
$ agentstatic --help

AgentStatic - AI-powered static site generator

Usage: agentstatic <command> [options]

Commands:
  build [source]          Build static site
  dev                     Start development server
  init [directory]        Initialize new project
  validate <file>         Validate composition
  registry <action>       Manage component registry
  serve [directory]       Serve built site
  mcp                     Start MCP server for AI agents

Options:
  -h, --help             Show help
  -v, --version          Show version
  --debug                Enable debug mode
  --no-color             Disable colored output

Examples:
  $ agentstatic build --minify
  $ agentstatic dev --port 8080
  $ agentstatic validate ./pages/home.json

Documentation: https://agentstatic.dev/docs
```

### Command-Specific Help

```bash
$ agentstatic build --help

Build static site from component definitions

Usage: agentstatic build [source] [options]

Arguments:
  source                 Path to source directory [default: ./pages]

Options:
  -o, --output <dir>     Output directory [default: ./dist]
  -c, --config <file>    Config file path
  --clean                Clean output directory before build
  --watch                Watch for changes and rebuild
  --minify               Minify HTML, CSS, JS output
  --no-optimize          Disable optimization
  --parallel             Enable parallel processing [default: true]
  --workers <n>          Number of worker threads [default: CPU cores]
  --verbose              Verbose logging
  --silent               No output except errors
  -h, --help             Show help

Examples:
  $ agentstatic build
  $ agentstatic build ./src/pages -o ./public
  $ agentstatic build --watch --minify
```

## Error Messages

### File Not Found

```
Error: Page definition not found

  File: ./pages/home.json

  Make sure the file exists and path is correct.

  Tip: Use 'agentstatic init' to create a new project.
```

### Invalid Composition

```
Error: Invalid composition

  File: ./pages/home.json
  Line: 12

  Component not found: HeroSection

  Did you mean: Hero, HeroWithImage, HeroMinimal?

  Fix: Use 'agentstatic registry search hero' to find components.
```

### Build Failed

```
Error: Build failed

  Pages processed: 5/10
  Errors: 3

  Failed pages:
    - ./pages/about.json (missing required prop: title)
    - ./pages/contact.json (component not found: ContactForm)
    - ./pages/blog.json (invalid slot content)

  Fix: Run 'agentstatic validate <file>' for detailed error info.
```

### Port In Use

```
Error: Port 3000 is already in use

  Try one of:
    - Kill the process using port 3000
    - Use a different port: agentstatic dev --port 8080
    - Set PORT environment variable: PORT=8080 agentstatic dev
```

## Progress Indicators

### Build Progress

```
Building static site...

✓ Loading configuration
✓ Initializing registry (142 components)
✓ Parsing compositions (10 pages)
⠋ Building pages... [5/10]
  └─ Processing: home.json

Pages: 5/10 | Errors: 0 | Time: 2.3s
```

### Validation Progress

```
Validating composition...

✓ Structure validation
✓ Component existence
⠋ Props validation
  └─ Checking: Hero.title

Progress: 60% | Errors: 0 | Warnings: 2
```

## Exit Codes Summary

| Code | Meaning | Example |
|------|---------|---------|
| 0 | Success | All operations completed successfully |
| 1 | General error | Build failed, validation failed |
| 2 | Configuration error | Invalid config file, missing required config |
| 3 | File system error | File not found, permission denied |
| 4 | Network error | Failed to fetch remote component |
| 5 | Port conflict | Dev server port already in use |

## Shell Completion

### Bash

```bash
# Add to ~/.bashrc
eval "$(agentstatic completion bash)"
```

### Zsh

```bash
# Add to ~/.zshrc
eval "$(agentstatic completion zsh)"
```

### Fish

```bash
# Add to ~/.config/fish/config.fish
agentstatic completion fish | source
```

## Logging

### Log Levels

- `ERROR` - Errors only
- `WARN` - Warnings and errors
- `INFO` - General information (default)
- `DEBUG` - Detailed debug information
- `TRACE` - Everything

### Log Format

```
[2025-01-15 10:23:45] INFO  Building pages...
[2025-01-15 10:23:45] DEBUG Loaded config from ./agentstatic.config.js
[2025-01-15 10:23:46] WARN  Component 'OldCard' is deprecated
[2025-01-15 10:23:47] ERROR Missing required prop: title
```

### Log File

```bash
# Enable file logging
agentstatic build --log-file ./build.log

# Log file location
./agentstatic.log
```

## Implementation Notes

### Argument Parsing

Use `commander` for CLI parsing:

```typescript
import { Command } from 'commander';

const program = new Command();

program
  .name('agentstatic')
  .description('AI-powered static site generator')
  .version('1.0.0');

program
  .command('build [source]')
  .description('Build static site')
  .option('-o, --output <dir>', 'output directory', './dist')
  .option('--minify', 'minify output')
  .action(async (source, options) => {
    await buildCommand(source, options);
  });
```

### Configuration Loading

Priority order:
1. CLI arguments
2. Environment variables
3. Config file (agentstatic.config.js)
4. package.json (agentstatic field)
5. Default values

### Progress Indicators

Use `ora` for spinners:

```typescript
import ora from 'ora';

const spinner = ora('Building pages...').start();

// Update
spinner.text = 'Processing home.json';

// Success
spinner.succeed('Build complete');

// Error
spinner.fail('Build failed');
```

## Testing CLI

```typescript
describe('CLI', () => {
  it('builds site with default options', async () => {
    const result = await exec('agentstatic build');
    expect(result.exitCode).toBe(0);
  });

  it('validates composition', async () => {
    const result = await exec('agentstatic validate test.json');
    expect(result.stdout).toContain('Validation passed');
  });
});
```

## Acceptance Criteria

- [ ] All commands implemented and functional
- [ ] Help text clear and complete
- [ ] Error messages actionable
- [ ] Progress indicators smooth
- [ ] Exit codes correct
- [ ] Configuration loading works
- [ ] Environment variables respected
- [ ] Shell completion available