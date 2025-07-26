/**
 * Vitest global setup for AgentStatic tests
 * 
 * Configures test environment with TypeScript path mapping,
 * global utilities, and mock helpers.
 */

import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

// Global test setup
beforeAll(async () => {
  // Setup global test environment
  console.log('🧪 Starting AgentStatic test suite...');
  
  // Initialize any global test dependencies
  process.env['NODE_ENV'] = 'test';
});

afterAll(async () => {
  // Cleanup global test environment
  console.log('✅ AgentStatic test suite completed');
});

beforeEach(() => {
  // Reset any global state before each test
});

afterEach(() => {
  // Cleanup after each test
});