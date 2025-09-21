#!/usr/bin/env node

/**
 * AgentStatic CLI
 *
 * Command line interface for AgentStatic operations
 */

import { startDevServer } from '@/dev/server';
import { MultiPageBuilder } from '@/build/multi-page-builder';

const command = process.argv[2];
const args = process.argv.slice(3);

// Parse CLI flags
const flags = {
  verbose: args.includes('--verbose') || args.includes('-v'),
  port: getFlag('--port') || '3000',
  help: args.includes('--help') || args.includes('-h'),
};

function getFlag(name: string): string | undefined {
  const index = args.indexOf(name);
  return index !== -1 && index + 1 < args.length ? args[index + 1] : undefined;
}

function showHelp() {
  console.log(`
🏗️  AgentStatic CLI

Usage:
  agentstatic <command> [options]

Commands:
  dev       Start development server with hot reloading
  build     Build the site for production
  help      Show this help message

Options:
  --verbose, -v    Enable verbose output
  --port <port>    Port for dev server (default: 3000)
  --help, -h       Show help

Examples:
  agentstatic dev
  agentstatic dev --port 8080 --verbose
  agentstatic build
  agentstatic build --verbose
`);
}

async function main() {
  try {
    switch (command) {
      case 'dev':
      case 'serve':
        if (flags.help) {
          showHelp();
          return;
        }

        console.log('🚀 Starting AgentStatic development server...');
        await startDevServer({
          port: parseInt(flags.port),
          verbose: flags.verbose,
        });
        break;

      case 'build': {
        if (flags.help) {
          showHelp();
          return;
        }

        console.log('🏗️ Building site...');
        const builder = new MultiPageBuilder({
          mode: 'production',
          verbose: flags.verbose,
        });
        await builder.build();
        break;
      }

      case 'help':
      case '--help':
      case '-h':
        showHelp();
        break;

      default:
        console.error(`❌ Unknown command: ${command || '(none)'}`);
        console.log('Run "agentstatic help" for usage information.');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Command failed:', error);
    process.exit(1);
  }
}

// Run CLI
main();
