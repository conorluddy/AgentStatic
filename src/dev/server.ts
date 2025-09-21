/**
 * AgentStatic Development Server
 *
 * Hot-reloading development server for multi-page sites with:
 * - File watching for content and config changes
 * - Auto-rebuild on changes
 * - Live browser reload
 * - Static file serving
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'http';
import { readFile, stat } from 'fs/promises';
import { extname, join } from 'path';
import { watch } from 'chokidar';
import { MultiPageBuilder } from '../build/multi-page-builder';
import { resolveProjectRoot } from '../utils/paths';
import type { DevServerOptions } from '../types/config';

export class DevServer {
  private port: number;
  private host: string;
  private rootDir: string;
  private verbose: boolean;
  private builder: MultiPageBuilder;
  private distDir: string;
  private isBuilding = false;

  constructor(options: Partial<DevServerOptions> = {}) {
    this.port = options.port || 3000;
    this.host = options.host || 'localhost';
    this.rootDir = options.rootDir || resolveProjectRoot();
    this.verbose = options.verbose || false;
    this.distDir = join(this.rootDir, 'dist');

    this.builder = new MultiPageBuilder({
      mode: 'development',
      rootDir: this.rootDir,
      verbose: this.verbose,
      outputDir: this.distDir,
    });
  }

  /**
   * Start the development server
   */
  async start(): Promise<void> {
    console.log('🚀 Starting AgentStatic Development Server...');

    // Initial build
    await this.rebuild();

    // Setup file watcher
    this.setupWatcher();

    // Create HTTP server
    const server = createServer(this.handleRequest.bind(this));

    server.listen(this.port, this.host, () => {
      console.log(
        `✅ Development server running at http://${this.host}:${this.port}`
      );
      console.log(`📁 Serving files from: ${this.distDir}`);
      console.log(`👀 Watching for changes in: ${this.rootDir}`);

      if (this.verbose) {
        console.log(`🔧 Verbose mode enabled`);
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down development server...');

      // Set a timeout to force exit if server doesn't close gracefully
      const timeout = setTimeout(() => {
        console.log('⚠️ Forcing server shutdown...');
        process.exit(1);
      }, 5000);

      server.close(() => {
        clearTimeout(timeout);
        console.log('✅ Server shutdown complete');
        process.exit(0);
      });

      // Close any open connections
      server.closeAllConnections?.();
    });
  }

  /**
   * Handle HTTP requests
   */
  private async handleRequest(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    const url = req.url ?? ('/' as string);
    let filePath = url === '/' ? '/index.html' : url;

    // Remove query parameters
    filePath = filePath.split('?')[0] || filePath;

    // Security: prevent directory traversal
    if (filePath.includes('..')) {
      this.send404(res);
      return;
    }

    const fullPath = join(this.distDir, filePath);

    try {
      const stats = await stat(fullPath);

      if (stats.isFile()) {
        await this.serveFile(fullPath, res);
      } else {
        this.send404(res);
      }
    } catch {
      // If file doesn't exist, try with .html extension for clean URLs
      if (filePath.endsWith('/')) {
        filePath += 'index.html';
      } else if (!extname(filePath)) {
        filePath += '.html';
      }

      const htmlPath = join(this.distDir, filePath);

      try {
        await this.serveFile(htmlPath, res);
      } catch {
        this.send404(res);
      }
    }
  }

  /**
   * Serve a file with proper MIME type
   */
  private async serveFile(
    filePath: string,
    res: ServerResponse
  ): Promise<void> {
    try {
      const content = await readFile(filePath);
      const ext = extname(filePath);
      const mimeType = this.getMimeType(ext);

      res.writeHead(200, {
        'Content-Type': mimeType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      });

      res.end(content);

      if (this.verbose) {
        console.log(`📄 Served: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error serving file ${filePath}:`, error);
      this.send500(res);
    }
  }

  /**
   * Send 404 response
   */
  private send404(res: ServerResponse): void {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>404 - Page Not Found</title></head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested page could not be found.</p>
          <a href="/">← Back to Home</a>
        </body>
      </html>
    `);
  }

  /**
   * Send 500 response
   */
  private send500(res: ServerResponse): void {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>500 - Server Error</title></head>
        <body>
          <h1>500 - Server Error</h1>
          <p>An internal server error occurred.</p>
        </body>
      </html>
    `);
  }

  /**
   * Get MIME type for file extension
   */
  private getMimeType(ext: string): string {
    const mimeTypes: Record<string, string> = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.txt': 'text/plain',
      '.xml': 'application/xml',
    };

    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
  }

  /**
   * Setup file watcher for hot reloading
   */
  private setupWatcher(): void {
    const watchPaths = [
      join(this.rootDir, 'content/**/*'),
      join(this.rootDir, 'assets/**/*'),
      join(this.rootDir, 'site.config.json'),
    ];

    const watcher = watch(watchPaths, {
      ignored: /node_modules|\.git|dist/,
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('change', path => {
      console.log(`📝 File changed: ${path}`);
      this.rebuild();
    });

    watcher.on('add', path => {
      console.log(`➕ File added: ${path}`);
      this.rebuild();
    });

    watcher.on('unlink', path => {
      console.log(`➖ File removed: ${path}`);
      this.rebuild();
    });

    if (this.verbose) {
      console.log(`👀 Watching paths:`, watchPaths);
    }
  }

  /**
   * Rebuild the site
   */
  private async rebuild(): Promise<void> {
    if (this.isBuilding) {
      return;
    }

    this.isBuilding = true;

    try {
      console.log('🔄 Rebuilding site...');
      const startTime = Date.now();

      await this.builder.build();

      const buildTime = Date.now() - startTime;
      console.log(`✅ Rebuild completed in ${buildTime}ms`);
    } catch (error) {
      console.error('❌ Rebuild failed:', error);
    } finally {
      this.isBuilding = false;
    }
  }
}

/**
 * Start development server
 */
export async function startDevServer(
  options: Partial<DevServerOptions> = {}
): Promise<void> {
  const server = new DevServer(options);
  await server.start();
}
