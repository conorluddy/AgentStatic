# Rebrand Site

You are helping the user rebrand their AgentStatic site. Your goal is to gather enough information to update `brand.json` and regenerate the site pages with relevant content.

## Step 1: Gather Brand Information

Use the AskUserQuestion tool to ask the user the following questions. You may ask them in batches of up to 4 questions at a time:

### Required Information
1. **Brand name** — What is the name of the product/company/project?
2. **Tagline** — A short description (under 10 words) that captures what this is
3. **Primary color** — Their brand color (hex code, or describe it and you'll pick one)
4. **Industry/Purpose** — What type of site is this? (SaaS product, agency, portfolio, documentation, etc.)

### Content Information
5. **Target audience** — Who is this site for?
6. **Key features/benefits** — What are 3-4 main selling points or sections to highlight?
7. **Call to action** — What should visitors do? (Sign up, Contact, Download, Learn more, etc.)
8. **Tone** — Professional, friendly, playful, technical, minimal?

## Step 2: Update Configuration

Once you have the answers:

1. Update `brand.json` with:
   - `name`: The brand name
   - `tagline`: The tagline
   - `colors.primary`: A hex color (if user described a color, pick an appropriate hex)

2. If the user wants a different color scheme feel, you can also set `colors.neutral` for a warmer or cooler gray palette.

## Step 3: Update Page Content

Review the pages in `pages/` and update the content to reflect the new brand:
- Headlines and copy should match the brand voice
- Features should reflect what the user described
- CTAs should use the action the user specified

## Step 4: Build and Verify

Run `npm run build` to regenerate the site with the new brand.

Let the user know the rebrand is complete and remind them they can run `npm run serve` to preview locally.

---

**Start now by greeting the user and asking the first batch of questions.**
