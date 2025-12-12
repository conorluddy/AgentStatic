# Create New Page

You are creating a new page for the AgentStatic site.

**Arguments:** `$ARGUMENTS` may contain the page name (without `.html`)

## Step 1: Determine Page Name

If `$ARGUMENTS` contains a name, use it. Otherwise, use AskUserQuestion to ask:
- What should this page be called? (e.g., `pricing`, `about`, `contact`, `blog`)

The page will be created as `pages/{name}.html`.

## Step 2: Gather Requirements

Use AskUserQuestion to ask:

1. **Page title:** What's the page title for the browser tab?
2. **Meta description:** Brief description for SEO (under 160 chars)
3. **Page purpose:** What's the goal? (Conversions, Information, Trust-building, Lead capture)

## Step 3: Check Existing Elements

List the elements in `elements/` to see what's available for building this page.

## Step 4: Suggest Sections

Based on the page purpose, suggest which sections to include. Reference `docs/component-patterns.md` for ideas.

Common page structures:

### Landing Page
```
include-nav → site-hero → site-features → site-testimonials → site-cta → include-footer
```

### Pricing Page
```
include-nav → site-hero (compact) → site-pricing → site-faq → site-cta → include-footer
```

### About Page
```
include-nav → site-hero → site-team → site-values → include-footer
```

### Contact Page
```
include-nav → site-hero (compact) → site-contact-form → include-footer
```

## Step 5: Create Page File

Create `pages/{name}.html` with this structure:

```html
<!DOCTYPE html>
<html lang="en">

<include-head
  title="{title} | {brand name from brand.json}"
  description="{meta description}"
/>

<body>
  <include-nav logo="/assets/logo.svg" siteName="{brand name}" />

  <!-- Page sections based on purpose -->

  <include-footer siteName="{brand name}" tagline="{tagline from brand.json}" />
</body>
</html>
```

## Step 6: Confirm Creation

Report:
- File path created
- Sections included
- Any elements that don't exist yet (offer to create with `/new-element`)
- Remind user to run `npm run build` to generate output

---

**Start by determining the page name from arguments or asking the user.**
