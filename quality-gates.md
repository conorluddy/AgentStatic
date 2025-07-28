# AgentStatic Quality Gates & Git Hooks

## Overview

AgentStatic enforces strict quality standards through automated Git hooks using Husky. These hooks ensure code quality, type safety, and test coverage before code reaches the repository.

## Pre-commit Quality Gates

The pre-commit hook runs automatically before every commit and enforces the following checks:

### 1. TypeScript Type Checking (`npm run type-check`)
- **Requirement**: Zero TypeScript errors
- **No `any` types allowed** - strict mode enforced
- **Fix command**: Review TypeScript errors and fix type issues

### 2. ESLint Linting (`npm run lint`)
- **Requirement**: Zero errors AND zero warnings
- **Fix command**: `npm run lint:fix` (auto-fixes some issues)

### 3. Prettier Formatting (`npm run format:check`)
- **Requirement**: All code properly formatted
- **Fix command**: `npm run format`

### 4. Unit Tests (`npm run test`)
- **Requirement**: All tests must pass
- **Timeout**: 30 seconds maximum
- **Fix command**: Fix failing tests or investigate timeouts

### 5. Build Validation (`npm run build`)
- **Requirement**: Project must build successfully
- **Validates**: TypeScript compilation, bundle generation

### 6. Test Coverage (`npm run test:coverage`)
- **Requirement**: >90% code coverage
- **Fix command**: Add tests for uncovered code paths

### 7. Lint-staged (`npx lint-staged`)
- **Runs**: ESLint, Prettier, and related tests on staged files only
- **Optimizes**: Only checks files you're committing

## Pre-push Quality Gates

The pre-push hook provides additional validation before pushing to remote:

1. **Integration Tests** (if present in `tests/integration/`)
2. **Final Build Check**
3. **TypeScript Type Safety Verification**

## Emergency Bypass Procedures

### ⚠️ CRITICAL WARNING ⚠️
**NEVER bypass pre-commit hooks unless absolutely necessary!**

These hooks protect code quality and prevent broken code from entering the repository.

### When Bypass Might Be Necessary
1. **Critical Production Hotfix**: When immediate deployment is required
2. **Infrastructure Emergency**: When CI/CD pipeline needs immediate fix
3. **Security Patch**: When rapid security response is needed

### How to Bypass (Emergency Only)

```bash
# Bypass pre-commit hooks (USE WITH EXTREME CAUTION)
git commit --no-verify -m "EMERGENCY: [reason]"

# Bypass pre-push hooks (USE WITH EXTREME CAUTION)
git push --no-verify
```

### Post-Bypass Requirements

**If you bypass quality gates, you MUST:**

1. **Document the Reason**: Include "EMERGENCY:" prefix in commit message
2. **Create Follow-up Issue**: File an issue for fixing the skipped checks
3. **Fix Within 24 Hours**: Address all quality issues in the next commit
4. **Run All Checks Manually**: 
   ```bash
   npm run type-check && npm run lint && npm run format:check && npm run test && npm run build
   ```

### Bypass Audit Trail

All emergency bypasses should be logged in the project's incident log with:
- Date and time
- Developer name
- Reason for bypass
- Follow-up issue number
- Resolution status

## Troubleshooting Common Issues

### "Tests timeout after 30 seconds"
- Check for infinite loops in tests
- Review async operations without proper completion
- Consider splitting large test suites

### "ESLint errors/warnings"
- Run `npm run lint:fix` first
- Review remaining issues manually
- Ensure ESLint config matches project standards

### "Coverage below 90%"
- Run `npm run test:coverage` to see uncovered lines
- Focus on critical business logic first
- Add tests for edge cases

### "Build fails"
- Check for circular dependencies
- Verify all imports are correct
- Ensure TypeScript version compatibility

## Configuration Files

- **Husky Configuration**: `.husky/` directory
- **ESLint Rules**: `eslint.config.js`
- **Prettier Config**: `.prettierrc` (if present) or package.json
- **TypeScript Config**: `tsconfig.json`
- **Lint-staged Config**: `package.json` → `lint-staged` section

## Best Practices

1. **Run checks locally before committing**: `npm run lint && npm run test`
2. **Keep commits focused**: Smaller commits = faster checks
3. **Fix issues immediately**: Don't let technical debt accumulate
4. **Update tests with code**: Maintain >90% coverage
5. **Never disable hooks permanently**: They're there for a reason

## Support

If you're consistently having issues with quality gates:
1. Review this documentation
2. Check with team lead about configuration
3. Consider if the gates need adjustment (via proper PR process)
4. **Never silently bypass or disable checks**