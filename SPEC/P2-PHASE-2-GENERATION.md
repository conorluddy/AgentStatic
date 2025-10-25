# Phase 2: Component Registry Generation
## Timeline: Week 4 (Nov 25-Dec 1, 2024)

### Overview
This phase implements the automated registry generation system that discovers components, validates their definitions, generates type definitions, and creates registry indices. The system supports incremental builds and watch mode for development.

### Prerequisites
- Phase 1 schema system completed
- Component definitions created
- Build system configured
- File system utilities ready

---

## 1. Component Discovery

### 1.1 Discovery Scanner

```typescript
// src/registry/discovery/scanner.ts
import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

export interface ScanOptions {
  componentDirs: string[];
  extensions: string[];
  exclude?: string[];
  maxDepth?: number;
}

export interface ComponentFile {
  path: string;
  relativePath: string;
  name: string;
  type: 'config' | 'template' | 'style' | 'script' | 'asset';
  category?: string;
  lastModified: Date;
}

export class ComponentScanner {
  private options: ScanOptions;
  private cache: Map<string, ComponentFile> = new Map();

  constructor(options: ScanOptions) {
    this.options = {
      extensions: ['ts', 'js', 'njk', 'scss', 'css'],
      exclude: ['node_modules', 'dist', '.git'],
      maxDepth: 5,
      ...options
    };
  }

  public async scan(): Promise<ComponentFile[]> {
    const files: ComponentFile[] = [];

    for (const dir of this.options.componentDirs) {
      const found = await this.scanDirectory(dir);
      files.push(...found);
    }

    // Update cache
    this.cache.clear();
    files.forEach(file => this.cache.set(file.path, file));

    return files;
  }

  private async scanDirectory(dir: string): Promise<ComponentFile[]> {
    const files: ComponentFile[] = [];
    const pattern = `**/*.{${this.options.extensions.join(',')}}`;

    const matches = await glob(pattern, {
      cwd: dir,
      absolute: true,
      ignore: this.options.exclude,
      nodir: true
    });

    for (const match of matches) {
      const file = await this.analyzeFile(match, dir);
      if (file) {
        files.push(file);
      }
    }

    return files;
  }

  private async analyzeFile(
    filePath: string,
    baseDir: string
  ): Promise<ComponentFile | null> {
    const stats = await fs.stat(filePath);
    const relativePath = path.relative(baseDir, filePath);
    const ext = path.extname(filePath).slice(1);

    // Determine file type
    let type: ComponentFile['type'];
    if (path.basename(filePath).includes('.config.') || path.basename(filePath).includes('.component.')) {
      type = 'config';
    } else if (['njk', 'hbs', 'ejs'].includes(ext)) {
      type = 'template';
    } else if (['scss', 'css', 'pcss'].includes(ext)) {
      type = 'style';
    } else if (['ts', 'js'].includes(ext)) {
      type = 'script';
    } else {
      type = 'asset';
    }

    // Extract category from path
    const pathParts = relativePath.split(path.sep);
    const category = pathParts.length > 1 ? pathParts[0] : undefined;

    return {
      path: filePath,
      relativePath,
      name: path.basename(filePath, path.extname(filePath)),
      type,
      category,
      lastModified: stats.mtime
    };
  }

  public async watchChanges(
    onChange: (files: ComponentFile[]) => void
  ): Promise<() => void> {
    const chokidar = await import('chokidar');

    const watcher = chokidar.watch(
      this.options.componentDirs.map(dir => `${dir}/**/*.{${this.options.extensions.join(',')}}`),
      {
        ignored: this.options.exclude,
        persistent: true,
        ignoreInitial: true
      }
    );

    const handleChange = async (eventPath: string) => {
      const files = await this.scan();
      onChange(files);
    };

    watcher
      .on('add', handleChange)
      .on('change', handleChange)
      .on('unlink', handleChange);

    return () => watcher.close();
  }
}
```

### 1.2 Component Loader

```typescript
// src/registry/discovery/loader.ts
import { ComponentConfig } from '../types/base';

export class ComponentLoader {
  private loadedComponents: Map<string, ComponentConfig> = new Map();

  public async loadComponent(file: ComponentFile): Promise<ComponentConfig | null> {
    if (file.type !== 'config') {
      return null;
    }

    try {
      const module = await import(file.path);
      const config = module.default || module.component || module;

      if (!this.isValidComponentConfig(config)) {
        console.warn(`Invalid component config in ${file.path}`);
        return null;
      }

      this.loadedComponents.set(config.metadata.id, config);
      return config;
    } catch (error) {
      console.error(`Failed to load component from ${file.path}:`, error);
      return null;
    }
  }

  public async loadAll(files: ComponentFile[]): Promise<Map<string, ComponentConfig>> {
    const configFiles = files.filter(f => f.type === 'config');

    await Promise.all(
      configFiles.map(file => this.loadComponent(file))
    );

    return this.loadedComponents;
  }

  private isValidComponentConfig(obj: any): obj is ComponentConfig {
    return (
      obj &&
      typeof obj === 'object' &&
      obj.metadata &&
      obj.metadata.id &&
      obj.metadata.name &&
      obj.schema &&
      obj.implementation
    );
  }

  public get(id: string): ComponentConfig | undefined {
    return this.loadedComponents.get(id);
  }

  public getAll(): ComponentConfig[] {
    return Array.from(this.loadedComponents.values());
  }

  public clear(): void {
    this.loadedComponents.clear();
  }
}
```

---

## 2. Registry Builder

### 2.1 Registry Generator

```typescript
// src/registry/builder/generator.ts
import { ComponentConfig } from '../types/base';
import { ComponentValidator } from '../validation/validator';
import { DependencyResolver } from '../dependencies/resolver';

export interface RegistryConfig {
  outputDir: string;
  generateTypes: boolean;
  generateDocs: boolean;
  generateSchemas: boolean;
  minify: boolean;
}

export interface Registry {
  version: string;
  generatedAt: string;
  components: Map<string, ComponentConfig>;
  index: RegistryIndex;
  stats: RegistryStats;
}

export interface RegistryIndex {
  byId: Map<string, string>; // id -> file path
  byCategory: Map<string, string[]>; // category -> ids
  byTag: Map<string, string[]>; // tag -> ids
  dependencies: Map<string, string[]>; // id -> dependency ids
}

export interface RegistryStats {
  totalComponents: number;
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  avgDependencies: number;
}

export class RegistryGenerator {
  private config: RegistryConfig;
  private validator: ComponentValidator;
  private resolver: DependencyResolver;

  constructor(config: RegistryConfig) {
    this.config = config;
    this.validator = new ComponentValidator();
    this.resolver = new DependencyResolver();
  }

  public async generate(components: Map<string, ComponentConfig>): Promise<Registry> {
    console.log(`Generating registry for ${components.size} components...`);

    // Validate all components
    const validationResults = this.validateComponents(components);
    const validComponents = this.filterValidComponents(components, validationResults);

    // Build dependency graph
    this.buildDependencyGraph(validComponents);

    // Detect circular dependencies
    const cycles = this.resolver.detectCircular();
    if (cycles.length > 0) {
      console.warn('Circular dependencies detected:', cycles);
    }

    // Generate index
    const index = this.generateIndex(validComponents);

    // Generate stats
    const stats = this.generateStats(validComponents);

    const registry: Registry = {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      components: validComponents,
      index,
      stats
    };

    // Write registry files
    await this.writeRegistry(registry);

    if (this.config.generateTypes) {
      await this.generateTypeDefinitions(registry);
    }

    if (this.config.generateSchemas) {
      await this.generateSchemaFiles(registry);
    }

    if (this.config.generateDocs) {
      await this.generateDocumentation(registry);
    }

    return registry;
  }

  private validateComponents(
    components: Map<string, ComponentConfig>
  ): Map<string, ValidationResult> {
    console.log('Validating components...');

    // Register schemas
    components.forEach((config, id) => {
      this.validator.registerSchema(id, config.schema.jsonSchema);
    });

    // Validate each component's example data
    const results = new Map<string, ValidationResult>();

    components.forEach((config, id) => {
      const errors: ValidationError[] = [];

      // Validate each example
      config.examples.forEach(example => {
        const result = this.validator.validate(id, example.code.json);
        if (!result.valid) {
          errors.push(...result.errors);
        }
      });

      results.set(id, {
        valid: errors.length === 0,
        errors
      });
    });

    return results;
  }

  private filterValidComponents(
    components: Map<string, ComponentConfig>,
    validationResults: Map<string, ValidationResult>
  ): Map<string, ComponentConfig> {
    const valid = new Map<string, ComponentConfig>();

    components.forEach((config, id) => {
      const result = validationResults.get(id);

      if (result && result.valid) {
        valid.set(id, config);
      } else {
        console.error(`Component ${id} failed validation:`, result?.errors);
      }
    });

    console.log(`${valid.size} of ${components.size} components passed validation`);

    return valid;
  }

  private buildDependencyGraph(components: Map<string, ComponentConfig>): void {
    components.forEach(config => {
      this.resolver.addComponent(config);
    });
  }

  private generateIndex(components: Map<string, ComponentConfig>): RegistryIndex {
    const index: RegistryIndex = {
      byId: new Map(),
      byCategory: new Map(),
      byTag: new Map(),
      dependencies: new Map()
    };

    components.forEach((config, id) => {
      // By ID
      index.byId.set(id, config.implementation.template.path);

      // By category
      const category = config.metadata.category;
      if (!index.byCategory.has(category)) {
        index.byCategory.set(category, []);
      }
      index.byCategory.get(category)!.push(id);

      // By tag
      config.metadata.tags.forEach(tag => {
        if (!index.byTag.has(tag)) {
          index.byTag.set(tag, []);
        }
        index.byTag.get(tag)!.push(id);
      });

      // Dependencies
      const depIds = config.dependencies.map(dep => dep.id);
      index.dependencies.set(id, depIds);
    });

    return index;
  }

  private generateStats(components: Map<string, ComponentConfig>): RegistryStats {
    const byCategory: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalDeps = 0;

    components.forEach(config => {
      // Count by category
      byCategory[config.metadata.category] =
        (byCategory[config.metadata.category] || 0) + 1;

      // Count by type (template engine)
      const templateType = config.implementation.template.engine;
      byType[templateType] = (byType[templateType] || 0) + 1;

      // Sum dependencies
      totalDeps += config.dependencies.length;
    });

    return {
      totalComponents: components.size,
      byCategory,
      byType,
      avgDependencies: components.size > 0 ? totalDeps / components.size : 0
    };
  }

  private async writeRegistry(registry: Registry): Promise<void> {
    const { promises: fs } = await import('fs');
    const path = await import('path');

    await fs.mkdir(this.config.outputDir, { recursive: true });

    // Write main registry file
    const registryPath = path.join(this.config.outputDir, 'registry.json');

    const serialized = {
      version: registry.version,
      generatedAt: registry.generatedAt,
      components: Object.fromEntries(registry.components),
      index: {
        byId: Object.fromEntries(registry.index.byId),
        byCategory: Object.fromEntries(registry.index.byCategory),
        byTag: Object.fromEntries(registry.index.byTag),
        dependencies: Object.fromEntries(registry.index.dependencies)
      },
      stats: registry.stats
    };

    await fs.writeFile(
      registryPath,
      JSON.stringify(serialized, null, this.config.minify ? 0 : 2)
    );

    console.log(`Registry written to ${registryPath}`);

    // Write index file for fast lookups
    const indexPath = path.join(this.config.outputDir, 'index.json');
    await fs.writeFile(
      indexPath,
      JSON.stringify(serialized.index, null, this.config.minify ? 0 : 2)
    );
  }

  private async generateTypeDefinitions(registry: Registry): Promise<void> {
    const generator = new TypeDefinitionGenerator();
    const types = await generator.generate(registry);

    const { promises: fs } = await import('fs');
    const path = await import('path');

    const typesPath = path.join(this.config.outputDir, 'types.d.ts');
    await fs.writeFile(typesPath, types);

    console.log(`Type definitions written to ${typesPath}`);
  }

  private async generateSchemaFiles(registry: Registry): Promise<void> {
    const { promises: fs } = await import('fs');
    const path = await import('path');

    const schemasDir = path.join(this.config.outputDir, 'schemas');
    await fs.mkdir(schemasDir, { recursive: true });

    for (const [id, config] of registry.components) {
      const schemaPath = path.join(schemasDir, `${id}.json`);
      await fs.writeFile(
        schemaPath,
        JSON.stringify(config.schema.jsonSchema, null, 2)
      );
    }

    console.log(`Schemas written to ${schemasDir}`);
  }

  private async generateDocumentation(registry: Registry): Promise<void> {
    const generator = new DocumentationGenerator();
    await generator.generate(registry, this.config.outputDir);
  }
}
```

---

## 3. Type Definition Generation

### 3.1 TypeScript Generator

```typescript
// src/registry/builder/type-generator.ts
export class TypeDefinitionGenerator {
  public async generate(registry: Registry): Promise<string> {
    const parts: string[] = [];

    // File header
    parts.push(this.generateHeader());

    // Global types
    parts.push(this.generateGlobalTypes());

    // Component types
    for (const [id, config] of registry.components) {
      parts.push(this.generateComponentTypes(id, config));
    }

    // Registry interface
    parts.push(this.generateRegistryInterface(registry));

    return parts.join('\n\n');
  }

  private generateHeader(): string {
    return `
/**
 * AgentStatic Component Registry Types
 * Auto-generated - DO NOT EDIT
 * Generated: ${new Date().toISOString()}
 */

/* eslint-disable */
`.trim();
  }

  private generateGlobalTypes(): string {
    return `
export type ComponentCategory =
  | 'layout'
  | 'navigation'
  | 'content'
  | 'form'
  | 'media'
  | 'interactive'
  | 'utility';

export interface BaseComponentProps {
  id?: string;
  className?: string;
  style?: Record<string, string>;
  [key: string]: any;
}
`.trim();
  }

  private generateComponentTypes(id: string, config: ComponentConfig): string {
    const typeName = this.toTypeName(id);
    const props = this.generatePropsInterface(typeName, config.schema.props);
    const events = this.generateEventsInterface(typeName, config.schema.events);

    return `
/**
 * ${config.metadata.name}
 * ${config.metadata.description}
 * @category ${config.metadata.category}
 */
${props}

${events}

export interface ${typeName}Config {
  props: ${typeName}Props;
  events?: ${typeName}Events;
}
`.trim();
  }

  private generatePropsInterface(typeName: string, props: PropDefinition[]): string {
    const properties = props.map(prop => {
      const optional = prop.required ? '' : '?';
      const type = this.propTypeToTS(prop);
      const comment = prop.description ? `\n  /** ${prop.description} */` : '';

      return `${comment}\n  ${prop.name}${optional}: ${type};`;
    });

    return `
export interface ${typeName}Props extends BaseComponentProps {${properties.join('')}
}
`.trim();
  }

  private generateEventsInterface(
    typeName: string,
    events?: EventDefinition[]
  ): string {
    if (!events || events.length === 0) {
      return `export interface ${typeName}Events {}`;
    }

    const properties = events.map(event => {
      const payloadType = event.payload
        ? this.eventPayloadToTS(event.payload)
        : 'void';

      return `\n  /** ${event.description} */\n  ${event.name}?: (payload: ${payloadType}) => void;`;
    });

    return `
export interface ${typeName}Events {${properties.join('')}
}
`.trim();
  }

  private propTypeToTS(prop: PropDefinition): string {
    switch (prop.type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return 'any[]'; // Could be more specific with itemType
      case 'object':
        return 'Record<string, any>';
      case 'function':
        return '(...args: any[]) => any';
      case 'date':
        return 'Date | string';
      case 'enum':
        const values = prop.validation?.find(v => v.type === 'custom')?.value;
        if (values && Array.isArray(values)) {
          return values.map(v => `'${v}'`).join(' | ');
        }
        return 'string';
      default:
        return 'any';
    }
  }

  private eventPayloadToTS(payload: EventPayloadDefinition): string {
    if (payload.type === 'primitive') {
      return payload.primitiveType || 'any';
    }

    if (payload.properties) {
      const props = Object.entries(payload.properties).map(([key, def]) => {
        return `${key}: ${this.propTypeToTS(def as any)}`;
      });
      return `{ ${props.join('; ')} }`;
    }

    return 'any';
  }

  private generateRegistryInterface(registry: Registry): string {
    const componentIds = Array.from(registry.components.keys())
      .map(id => `'${id}'`)
      .join(' | ');

    return `
export type ComponentId = ${componentIds};

export interface ComponentRegistry {
  get(id: ComponentId): ComponentConfig | undefined;
  getAll(): ComponentConfig[];
  getByCategory(category: ComponentCategory): ComponentConfig[];
  getByTag(tag: string): ComponentConfig[];
}
`.trim();
  }

  private toTypeName(id: string): string {
    return id
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }
}
```

---

## 4. Incremental Build System

### 4.1 Build Cache

```typescript
// src/registry/builder/cache.ts
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface CacheEntry {
  hash: string;
  component: ComponentConfig;
  dependencies: string[];
  timestamp: number;
}

export class BuildCache {
  private cacheDir: string;
  private cache: Map<string, CacheEntry> = new Map();

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
  }

  public async load(): Promise<void> {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });

      const cacheFile = path.join(this.cacheDir, 'build-cache.json');
      const data = await fs.readFile(cacheFile, 'utf-8');
      const entries = JSON.parse(data);

      this.cache = new Map(Object.entries(entries));
      console.log(`Loaded ${this.cache.size} cached entries`);
    } catch {
      console.log('No existing cache found, starting fresh');
    }
  }

  public async save(): Promise<void> {
    const cacheFile = path.join(this.cacheDir, 'build-cache.json');
    const entries = Object.fromEntries(this.cache);

    await fs.writeFile(cacheFile, JSON.stringify(entries, null, 2));
    console.log(`Saved ${this.cache.size} cache entries`);
  }

  public async checkComponent(
    id: string,
    config: ComponentConfig,
    files: ComponentFile[]
  ): Promise<boolean> {
    const cached = this.cache.get(id);
    if (!cached) return false;

    // Calculate current hash
    const currentHash = await this.calculateHash(config, files);

    return cached.hash === currentHash;
  }

  public async updateComponent(
    id: string,
    config: ComponentConfig,
    files: ComponentFile[]
  ): Promise<void> {
    const hash = await this.calculateHash(config, files);
    const deps = config.dependencies.map(d => d.id);

    this.cache.set(id, {
      hash,
      component: config,
      dependencies: deps,
      timestamp: Date.now()
    });
  }

  private async calculateHash(
    config: ComponentConfig,
    files: ComponentFile[]
  ): Promise<string> {
    const hash = crypto.createHash('sha256');

    // Hash config
    hash.update(JSON.stringify(config));

    // Hash file contents
    for (const file of files) {
      const content = await fs.readFile(file.path, 'utf-8');
      hash.update(content);
    }

    return hash.digest('hex');
  }

  public invalidate(id: string): void {
    this.cache.delete(id);

    // Invalidate dependents
    this.cache.forEach((entry, cid) => {
      if (entry.dependencies.includes(id)) {
        this.invalidate(cid);
      }
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}
```

### 4.2 Incremental Builder

```typescript
// src/registry/builder/incremental.ts
export class IncrementalBuilder {
  private cache: BuildCache;
  private scanner: ComponentScanner;
  private loader: ComponentLoader;
  private generator: RegistryGenerator;

  constructor(config: RegistryConfig) {
    this.cache = new BuildCache(path.join(config.outputDir, '.cache'));
    this.scanner = new ComponentScanner(config as any);
    this.loader = new ComponentLoader();
    this.generator = new RegistryGenerator(config);
  }

  public async build(incremental: boolean = true): Promise<Registry> {
    if (incremental) {
      await this.cache.load();
    }

    // Scan all component files
    const files = await this.scanner.scan();

    // Load components
    const components = await this.loader.loadAll(files);

    // Determine what needs rebuilding
    const toBuild = new Map<string, ComponentConfig>();

    for (const [id, config] of components) {
      const componentFiles = files.filter(f =>
        f.relativePath.includes(id) || f.name.includes(id)
      );

      const isCached = incremental
        ? await this.cache.checkComponent(id, config, componentFiles)
        : false;

      if (!isCached) {
        toBuild.set(id, config);
        console.log(`Will rebuild: ${id}`);
      } else {
        console.log(`Using cached: ${id}`);
      }
    }

    if (toBuild.size === 0 && incremental) {
      console.log('No components need rebuilding');
      return this.loadCachedRegistry();
    }

    // Generate registry
    console.log(`Building ${toBuild.size} components...`);
    const registry = await this.generator.generate(components);

    // Update cache
    if (incremental) {
      for (const [id, config] of toBuild) {
        const componentFiles = files.filter(f =>
          f.relativePath.includes(id) || f.name.includes(id)
        );
        await this.cache.updateComponent(id, config, componentFiles);
      }

      await this.cache.save();
    }

    return registry;
  }

  public async watch(): Promise<void> {
    console.log('Starting watch mode...');

    const unwatch = await this.scanner.watchChanges(async (files) => {
      console.log('\nDetected changes, rebuilding...');

      try {
        await this.build(true);
        console.log('Rebuild complete');
      } catch (error) {
        console.error('Rebuild failed:', error);
      }
    });

    process.on('SIGINT', () => {
      unwatch();
      process.exit(0);
    });
  }

  private async loadCachedRegistry(): Promise<Registry> {
    const { promises: fs } = await import('fs');
    const registryPath = path.join(this.generator['config'].outputDir, 'registry.json');

    const data = await fs.readFile(registryPath, 'utf-8');
    const parsed = JSON.parse(data);

    return {
      version: parsed.version,
      generatedAt: parsed.generatedAt,
      components: new Map(Object.entries(parsed.components)),
      index: {
        byId: new Map(Object.entries(parsed.index.byId)),
        byCategory: new Map(Object.entries(parsed.index.byCategory)),
        byTag: new Map(Object.entries(parsed.index.byTag)),
        dependencies: new Map(Object.entries(parsed.index.dependencies))
      },
      stats: parsed.stats
    };
  }
}
```

---

## 5. CLI Tool

### 5.1 Registry CLI

```typescript
// src/cli/registry-cli.ts
import { Command } from 'commander';
import { IncrementalBuilder } from '../registry/builder/incremental';

const program = new Command();

program
  .name('agentstatic-registry')
  .description('AgentStatic component registry management')
  .version('1.0.0');

program
  .command('build')
  .description('Build the component registry')
  .option('-i, --incremental', 'Enable incremental builds', true)
  .option('-o, --output <dir>', 'Output directory', 'dist/registry')
  .option('--no-types', 'Skip TypeScript definition generation')
  .option('--no-schemas', 'Skip JSON schema generation')
  .option('--no-docs', 'Skip documentation generation')
  .action(async (options) => {
    const builder = new IncrementalBuilder({
      outputDir: options.output,
      generateTypes: options.types,
      generateSchemas: options.schemas,
      generateDocs: options.docs,
      minify: false,
      componentDirs: ['src/components']
    });

    try {
      const registry = await builder.build(options.incremental);
      console.log('\n✓ Registry built successfully');
      console.log(`  Components: ${registry.stats.totalComponents}`);
      console.log(`  Categories: ${Object.keys(registry.stats.byCategory).length}`);
    } catch (error) {
      console.error('✗ Build failed:', error);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch for changes and rebuild')
  .option('-o, --output <dir>', 'Output directory', 'dist/registry')
  .action(async (options) => {
    const builder = new IncrementalBuilder({
      outputDir: options.output,
      generateTypes: true,
      generateSchemas: true,
      generateDocs: false,
      minify: false,
      componentDirs: ['src/components']
    });

    console.log('Watching for changes...');
    await builder.watch();
  });

program
  .command('validate')
  .description('Validate all component definitions')
  .action(async () => {
    const scanner = new ComponentScanner({
      componentDirs: ['src/components'],
      extensions: ['ts']
    });

    const loader = new ComponentLoader();
    const validator = new ComponentValidator();

    const files = await scanner.scan();
    const components = await loader.loadAll(files);

    components.forEach((config, id) => {
      validator.registerSchema(id, config.schema.jsonSchema);
    });

    let errors = 0;
    components.forEach((config, id) => {
      config.examples.forEach((example, idx) => {
        const result = validator.validate(id, example.code.json);
        if (!result.valid) {
          console.error(`✗ ${id} example ${idx} validation failed:`);
          result.errors.forEach(err => {
            console.error(`  ${err.path}: ${err.message}`);
          });
          errors++;
        }
      });
    });

    if (errors === 0) {
      console.log('✓ All components validated successfully');
    } else {
      console.error(`✗ ${errors} validation errors found`);
      process.exit(1);
    }
  });

program.parse();
```

---

## 6. Testing

### 6.1 Registry Generation Tests

```typescript
// src/tests/registry/generation.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { RegistryGenerator } from '@/registry/builder/generator';
import { mockComponents } from '../fixtures/components';

describe('Registry Generation', () => {
  let generator: RegistryGenerator;

  beforeEach(() => {
    generator = new RegistryGenerator({
      outputDir: 'test/output',
      generateTypes: true,
      generateDocs: false,
      generateSchemas: true,
      minify: false
    });
  });

  it('generates registry with correct structure', async () => {
    const registry = await generator.generate(mockComponents);

    expect(registry.version).toBe('1.0.0');
    expect(registry.components.size).toBe(mockComponents.size);
    expect(registry.index).toBeDefined();
    expect(registry.stats).toBeDefined();
  });

  it('creates correct index mappings', async () => {
    const registry = await generator.generate(mockComponents);

    expect(registry.index.byId.size).toBe(mockComponents.size);
    expect(registry.index.byCategory.size).toBeGreaterThan(0);
    expect(registry.index.byTag.size).toBeGreaterThan(0);
  });

  it('validates components before registration', async () => {
    const invalidComponent = {
      ...mockComponents.get('button')!,
      examples: [{
        name: 'Invalid',
        code: {
          json: { invalid: 'prop' }
        }
      }]
    };

    const components = new Map([['invalid', invalidComponent]]);

    await expect(generator.generate(components)).rejects.toThrow();
  });
});
```

---

## Deliverables Checklist

### Phase 2 Completed Items

- [x] Component scanner
- [x] Component loader
- [x] Registry generator
- [x] Type definition generator
- [x] Schema file generation
- [x] Build cache system
- [x] Incremental builder
- [x] CLI tool
- [x] Tests

### Success Metrics

- [ ] Successfully scans all component directories
- [ ] Validates 100% of components
- [ ] Generates type-safe definitions
- [ ] Incremental builds complete in < 2s
- [ ] Full builds complete in < 10s
- [ ] CLI provides clear feedback
- [ ] Test coverage > 85%
