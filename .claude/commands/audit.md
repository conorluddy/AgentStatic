# Audit Site

You are auditing the AgentStatic site for issues and potential improvements.

**Arguments:** `$ARGUMENTS` (currently unused, reserved for future `--fix` flag)

## Audit Checks

Perform these checks and report findings:

### 1. Broken Include References

Search all `pages/*.html` for `<include-*>` tags and verify each has a matching `partials/*.html` file.

```
Check: <include-{name}> → partials/{name}.html exists?
```

Report any broken references with file:line.

### 2. Missing Element Styles

Search all `pages/*.html` for `<site-*>` tags and verify each has a matching `elements/site-*/styles.css` file.

```
Check: <site-{name}> → elements/site-{name}/styles.css exists?
```

Report any elements used but not defined.

### 3. Undefined CSS Custom Properties

Read `dist/styles.css` (or concatenate token files) and check for any `var(--*)` references that aren't defined.

Report undefined variables with context.

### 4. Accessibility Checks

For each page in `pages/*.html`:

- **Images:** Check `<img>` tags have `alt` attributes
- **Headings:** Check heading hierarchy (no skipped levels, single h1)
- **Links:** Check `<a>` tags have discernible text (not empty or just icons)
- **Form labels:** Check form inputs have associated labels
- **Language:** Check `<html>` has `lang` attribute

### 5. Content Quality

- **Meta descriptions:** Check all pages have `description` in `<include-head>`
- **Page titles:** Check all pages have unique titles
- **Empty sections:** Check for empty `<site-*>` elements

## Report Format

```
## Audit Results

### Critical Issues (must fix)
- [ ] file.html:12 - Broken include: <include-missing>
- [ ] file.html:45 - Missing alt text on image

### Warnings (should fix)
- [ ] file.html:8 - Heading hierarchy skipped (h1 → h3)
- [ ] file.html:20 - Empty site-features section

### Suggestions (nice to have)
- [ ] Consider adding testimonials for social proof
- [ ] FAQ section could improve SEO

### Summary
- X critical issues
- Y warnings
- Z suggestions
```

## Step 2: Offer Fixes

For fixable issues, offer to:
- Add missing alt text (ask user for descriptions)
- Fix heading hierarchy
- Remove empty sections
- Create missing elements with `/new-element`

---

**Start the audit by reading all pages and checking each category.**
