# Create New Element

You are creating a new `site-*` element for the AgentStatic component library.

**Arguments:** `$ARGUMENTS` may contain the element name (without `site-` prefix)

## Step 1: Determine Element Name

If `$ARGUMENTS` contains a name, use it. Otherwise, use AskUserQuestion to ask:
- What should this element be called? (e.g., `testimonials`, `team`, `blog-card`)

The element will be created as `site-{name}`.

## Step 2: Gather Requirements

Use AskUserQuestion to ask about:

1. **Purpose:** What does this element do? (Brief description)
2. **Variants:** What variations are needed? (e.g., `centered`, `dark`, `compact`, `split`)
3. **Child elements:** Does it need namespaced children? (e.g., `site-testimonials-item`, `site-testimonials-author`)

## Step 3: Check Component Patterns

Read `docs/component-patterns.md` and search for relevant patterns. If a matching pattern exists:
- Reference its description and variants
- Note which libraries implement it well
- Use real-world examples as inspiration

## Step 4: Create Element Files

Create directory `elements/site-{name}/` with these files:

### README.md
```markdown
# site-{name}

{Description from Step 2}

## Usage

\`\`\`html
<site-{name}>
  <!-- content -->
</site-{name}>
\`\`\`

## Variants

| Attribute | Effect |
|-----------|--------|
| `variant="..."` | ... |
| `theme="dark"` | Dark background variant |

## Child Elements

- `site-{name}-{child}` — Description
```

### element.html
Example markup showing the element in use with realistic content.

### styles.css
CSS using design tokens (`--color-*`, `--space-*`, `--text-*`). Include:
- Base styles for `site-{name}`
- Variant styles using attribute selectors `[variant="..."]`
- Child element styles
- Responsive adjustments using container queries or media queries

## Step 5: Confirm Creation

Report what was created:
- Directory path
- Files created
- Available variants
- Remind user to run `npm run build` to include in stylesheet

---

**Start by determining the element name from arguments or asking the user.**
