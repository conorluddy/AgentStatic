# Recommend Components

You are helping the user choose which components to build for their AgentStatic site. Your goal is to analyze their brand and page type, then recommend the most impactful components from the catalog.

**Arguments:** `$ARGUMENTS` may contain a page type (e.g., `landing`, `pricing`, `about`, `docs`, `blog`)

## Step 1: Gather Context

1. Read `brand.json` to understand the brand (name, tagline, colors, industry hints)
2. Read `docs/component-patterns.md` to know the full 247-component catalog
3. List the existing elements in `elements/` to see what's already built

## Step 2: Determine Page Type

If `$ARGUMENTS` contains a page type, use it. Otherwise, use AskUserQuestion to ask:

- What type of page are you building? (Landing, Pricing, About, Documentation, Blog, Other)
- What's the primary goal? (Conversions, Information, Trust-building, Lead capture)

## Step 3: Recommend Components

Based on the brand and page type, recommend **8-12 priority components** organized by importance:

### For Landing Pages:
1. **Must-have:** Hero, Navigation, Footer, CTA section
2. **High-impact:** Logo cloud, Feature grid, Testimonials
3. **Nice-to-have:** FAQ, Stats display, Pricing preview

### For Pricing Pages:
1. **Must-have:** Pricing cards, FAQ, Navigation, Footer
2. **High-impact:** Feature comparison table, Testimonials, CTA
3. **Nice-to-have:** Stats, Trust badges

### For About Pages:
1. **Must-have:** Hero (company story), Team section, Navigation, Footer
2. **High-impact:** Timeline, Stats, Values/mission
3. **Nice-to-have:** Press mentions, Office photos

### For Documentation:
1. **Must-have:** Sidebar navigation, Breadcrumbs, Code blocks
2. **High-impact:** Search, Table of contents, Version selector
3. **Nice-to-have:** Feedback widget, Edit on GitHub link

### For Blog:
1. **Must-have:** Blog post cards, Navigation, Footer
2. **High-impact:** Author cards, Categories/tags, Newsletter signup
3. **Nice-to-have:** Related posts, Reading time, Share buttons

## Step 4: Present Recommendations

For each recommended component:
1. Name it and briefly explain why it's valuable for this page type
2. Reference the pattern from `docs/component-patterns.md` with variants
3. Note if an element already exists in `elements/` or needs to be created
4. Suggest implementation order (critical path first)

## Step 5: Offer Next Steps

Ask the user:
- Would you like me to create any of these elements? (Use `/new-element`)
- Should I scaffold the page with these components? (Use `/new-page`)

---

**Start by reading the brand and component catalog, then make your recommendations.**
