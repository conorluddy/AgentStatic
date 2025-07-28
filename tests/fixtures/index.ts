/**
 * Test fixtures index
 *
 * Central export point for all test fixtures and sample data
 * used throughout the AgentStatic test suite.
 */

// Partial fixtures
export * from './partials';

// Content fixtures
export {
  sampleFrontmatter,
  sampleMarkdownContent,
  sampleContentFiles,
  sampleProcessedContent,
  sampleContentQueries,
} from './content';

// Template helper fixtures
export * from './helpers';

// Configuration fixtures
export {
  sampleContentDiscoveryConfigs,
  sampleCompositionContexts,
  sampleBuildConfigs,
  sampleDeploymentConfigs,
  sampleThemeConfigs,
} from './config';

/**
 * Quick access to commonly used test fixtures
 */
export const fixtures = {
  // Partials
  get hero() {
    return require('./partials').heroPartialFixture;
  },
  get card() {
    return require('./partials').cardPartialFixture;
  },
  get navigation() {
    return require('./partials').navigationPartialFixture;
  },
  get testPartials() {
    return require('./partials').testPartials;
  },
  get testPartialProps() {
    return require('./partials').testPartialProps;
  },

  // Content
  get sampleContentFiles() {
    return require('./content').sampleContentFiles;
  },
  get sampleProcessedContent() {
    return require('./content').sampleProcessedContent;
  },
  get sampleFrontmatter() {
    return require('./content').sampleFrontmatter;
  },
  get sampleMarkdownContent() {
    return require('./content').sampleMarkdownContent;
  },

  // Helpers
  get mockTemplateHelpers() {
    return require('./helpers').mockTemplateHelpers;
  },
  get helperTestData() {
    return require('./helpers').helperTestData;
  },
  get helperExpectedOutputs() {
    return require('./helpers').helperExpectedOutputs;
  },

  // Config
  get sampleContentDiscoveryConfigs() {
    return require('./config').sampleContentDiscoveryConfigs;
  },
  get sampleCompositionContexts() {
    return require('./config').sampleCompositionContexts;
  },
  get sampleBuildConfigs() {
    return require('./config').sampleBuildConfigs;
  },
};
