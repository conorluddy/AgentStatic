/**
 * Prettier configuration for AgentStatic
 * 
 * Maintains consistent code formatting across the project,
 * optimized for TypeScript and portfolio-focused development.
 */

export default {
  // Core formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Line formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  // JavaScript/TypeScript specific
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  
  // File overrides for specific patterns
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 120,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: ['*.test.ts', '*.spec.ts'],
      options: {
        printWidth: 100, // Slightly wider for test descriptions
      },
    },
    {
      files: 'src/partials/**/*.ts',
      options: {
        printWidth: 100, // Template strings can be longer
      },
    },
  ],
};