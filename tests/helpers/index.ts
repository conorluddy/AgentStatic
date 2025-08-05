/**
 * Test helpers index
 *
 * Central export point for all test utilities and helpers
 * used throughout the AgentStatic test suite.
 */

// Partial testing utilities
export * from './partial-testing';

// Content testing utilities
export * from './content-testing';

// General test utilities
export * from './test-utils';

/**
 * Quick access to commonly used test helpers
 */
export const testHelpers = {
  // Partial testing
  get PartialSchemaValidator() {
    return require('./partial-testing').PartialSchemaValidator;
  },
  get PartialTemplateRenderer() {
    return require('./partial-testing').PartialTemplateRenderer;
  },
  get PartialStyleValidator() {
    return require('./partial-testing').PartialStyleValidator;
  },
  get PartialMetadataValidator() {
    return require('./partial-testing').PartialMetadataValidator;
  },
  get PartialCompositionTester() {
    return require('./partial-testing').PartialCompositionTester;
  },
  get PartialTestSuite() {
    return require('./partial-testing').PartialTestSuite;
  },
  get PartialPerformanceTester() {
    return require('./partial-testing').PartialPerformanceTester;
  },

  // Content testing
  get FrontmatterValidator() {
    return require('./content-testing').FrontmatterValidator;
  },
  get ContentFileProcessor() {
    return require('./content-testing').ContentFileProcessor;
  },
  get ContentQueryTester() {
    return require('./content-testing').ContentQueryTester;
  },
  get ContentCollectionTester() {
    return require('./content-testing').ContentCollectionTester;
  },
  get ContentDiscoveryTester() {
    return require('./content-testing').ContentDiscoveryTester;
  },
  get ContentTestSuite() {
    return require('./content-testing').ContentTestSuite;
  },

  // General utilities
  get TestDataGenerator() {
    return require('./test-utils').TestDataGenerator;
  },
  get PerformanceTestUtils() {
    return require('./test-utils').PerformanceTestUtils;
  },
  get MockUtils() {
    return require('./test-utils').MockUtils;
  },
  get AssertionUtils() {
    return require('./test-utils').AssertionUtils;
  },
  get TestEnvironmentUtils() {
    return require('./test-utils').TestEnvironmentUtils;
  },
  get AsyncTestUtils() {
    return require('./test-utils').AsyncTestUtils;
  },
  get ErrorTestUtils() {
    return require('./test-utils').ErrorTestUtils;
  },
};
