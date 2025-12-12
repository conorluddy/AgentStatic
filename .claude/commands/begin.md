<!-- Initialize a fresh repo after cloning -->

# Initialize Repository

Initialize this repo with your own branding, content, and site structure. This command will wipe boilerplate content and ask you a series of questions to customize the site.

<!-- ============================================================================ -->
<!-- STAGE 0: Initial Context Gathering -->
<!-- ============================================================================ -->

<stage name="initial-context" title="Understanding your vision">

<outcome>Initial context captured to inform smart suggestions</outcome>

**Ask directly (no options):**

In 1-2 sentences, describe what you want to build. What is the product/service and who is it for?

Example answers:
- "A task management app for remote teams that need better async collaboration"
- "A design agency portfolio showcasing luxury branding work for fashion brands"
- "An AI-powered code review tool for enterprise development teams"

**Store the response as:** `projectVision`

**IMPORTANT:** This answer will be used to generate contextual, intelligent suggestions for all following questions. Analyze the vision to understand:
- Industry/domain (SaaS, agency, docs, etc.)
- Target audience (developers, designers, enterprises, etc.)
- Tone/personality (professional, playful, technical, etc.)
- Likely color preferences based on industry norms

</stage>

<!-- ============================================================================ -->
<!-- STAGE 1: Wipe Boilerplate Content -->
<!-- ============================================================================ -->

<stage name="wipe-boilerplate" title="Wiping boilerplate content">

<outcome>The repo is cleaned of all AgentStatic branding and ready for customization</outcome>

<!-- ACTION: Delete boilerplate pages -->
1. Delete boilerplate pages (AgentStatic landing, about, docs):
   - `pages/index.html` → DELETED
   - `pages/about.html` → DELETED
   - `pages/docs.html` → DELETED

2. Reset `brand.json` to minimal structure:
   ```json
   {
     "name": "",
     "tagline": "",
     "colors": {
       "primary": ""
     }
   }
   ```

**Status:** Boilerplate wiped. Ready to gather information.

</stage>

<!-- ============================================================================ -->
<!-- STAGE 2: Gather Brand Identity (Batch 1) -->
<!-- ============================================================================ -->

<stage name="brand-identity" title="Gathering brand identity">

<questions batch="1" count="4">

Use AskUserQuestion to ask these 4 questions in a single batch.

**IMPORTANT:** For each question, generate 5 contextually intelligent suggestions based on the `projectVision` from Stage 0. Analyze the vision to infer appropriate options.

1. **Brand Name**
   - Question: "What should we call your product/company/project?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `brandName`
   - **Generate 5 smart suggestions** based on projectVision:
     - Extract keywords from vision (e.g., "task management" → TaskFlow, TeamSync, AsyncHub)
     - Consider industry conventions (SaaS = short/techy, Agency = creative/abstract)
     - Mix styles: descriptive, abstract, portmanteau, made-up words
     - Example for "task management for remote teams":
       - "TeamSync"
       - "AsyncHub"
       - "TaskFlow"
       - "RemoteBase"
       - "FlowState"

2. **Tagline**
   - Question: "What's your tagline or value proposition?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `tagline`
   - **Generate 5 smart suggestions** based on projectVision:
     - Extract core benefit from vision
     - Use formulas: "X for Y", "The Z way to X", "X made Y"
     - Keep under 10 words
     - Example for "task management for remote teams":
       - "Task management built for remote teams"
       - "Async collaboration that actually works"
       - "Keep your team in sync, anywhere"
       - "The modern way to manage work"
       - "Remote work, made simple"

3. **Primary Color**
   - Question: "What's your primary brand color?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `primaryColor`
   - **Generate 5 smart suggestions** based on projectVision and industry:
     - Consider industry norms (tech = blue/purple, creative = bold colors, finance = navy/green)
     - Consider target audience (enterprise = conservative, startup = vibrant)
     - Provide hex codes with descriptive labels
     - Example for "SaaS task management":
       - "Modern Blue (#3b82f6)"
       - "Professional Purple (#8b5cf6)"
       - "Trust Navy (#1e40af)"
       - "Energy Teal (#14b8a6)"
       - "Focus Indigo (#6366f1)"
   - **If user selects "Other"**: Accept hex codes OR color descriptions, then map:
     - Parse hex if starts with #
     - Map natural descriptions: "warm blue" → #3b82f6, "forest green" → #059669, etc.

4. **Site Purpose**
   - Question: "What type of site is this?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `sitePurpose`
   - **Generate 5 smart suggestions** based on projectVision:
     - Analyze vision to determine most likely site type
     - Order options by relevance (most likely first)
     - Example for "AI code review tool":
       - "SaaS Product (Recommended)"
       - "Documentation"
       - "Developer Tool"
       - "Marketing Site"
       - "Technical Product"
   - Common options pool:
     - "SaaS Product"
     - "Agency/Portfolio"
     - "Documentation"
     - "Blog/Content"
     - "Marketing Site"
     - "Developer Tool"
     - "E-commerce"

</questions>

<outcome>Core brand identity defined (name, tagline, color, purpose)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 3: Gather Content Direction (Batch 2) -->
<!-- ============================================================================ -->

<stage name="content-direction" title="Gathering content direction">

<questions batch="2" count="4">

Use AskUserQuestion to ask these 4 questions in a single batch.

**IMPORTANT:** Generate 5 contextually intelligent suggestions based on `projectVision` and answers from Stage 2.

5. **Target Audience**
   - Question: "Who is your primary target audience?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `audience`
   - **Generate 5 smart suggestions** based on projectVision:
     - Extract or infer audience from vision
     - Consider industry-specific audiences
     - Order by relevance (most likely first)
     - Example for "AI code review tool for enterprises":
       - "Enterprise development teams (Recommended)"
       - "Software engineers"
       - "DevOps teams"
       - "Engineering managers"
       - "CTO/Tech leaders"
   - Common audiences: developers, designers, startups, enterprises, small businesses, creators, students, professionals

6. **Key Features/Benefits**
   - Question: "What are your top 3-4 key features or benefits?"
   - Type: Multi-select (allow 3-4 selections) with 5-7 options + "Other" (auto-provided)
   - Required: Yes (must select 3-4)
   - Store as: `features` (array)
   - **Generate 5-7 smart suggestions** based on projectVision and sitePurpose:
     - Extract benefits/features mentioned in vision
     - Add complementary features common to the industry
     - Use benefit-oriented language
     - Example for "task management for remote teams":
       - "Async collaboration tools"
       - "Real-time team visibility"
       - "Automated workflows"
       - "Time zone friendly scheduling"
       - "Integration with Slack/Teams"
       - "Mobile-first design"
       - "Secure & compliant"

7. **Call to Action**
   - Question: "What's the primary action you want visitors to take?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `cta`
   - **Generate 5 smart suggestions** based on projectVision and sitePurpose:
     - Match CTA to business model (SaaS = sign up, Agency = contact, Docs = get started)
     - Use action-oriented language
     - Example for "SaaS Product":
       - "Start free trial (Recommended)"
       - "Get started"
       - "Request demo"
       - "Sign up free"
       - "Book a call"
   - Common CTAs by type:
     - SaaS: "Start free trial", "Get started", "Sign up"
     - Agency: "Contact us", "Get a quote", "See our work"
     - Docs: "Get started", "Read docs", "View examples"
     - Blog: "Subscribe", "Read more", "Join newsletter"

8. **Brand Tone**
   - Question: "What's your brand tone/personality?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `tone`
   - **Generate 5 smart suggestions** based on projectVision and audience:
     - Infer tone from vision language and target audience
     - Consider industry norms
     - Order by relevance
     - Example for "enterprise SaaS":
       - "Professional (Recommended)"
       - "Technical"
       - "Trustworthy"
       - "Modern & clean"
       - "Friendly but professional"
   - Common tones: Professional, Friendly, Technical, Playful, Minimal, Bold, Elegant, Casual, Authoritative

</questions>

<outcome>Content strategy defined (audience, features, CTA, tone)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 4: Gather Advanced Settings (Batch 3) -->
<!-- ============================================================================ -->

<stage name="advanced-settings" title="Gathering advanced settings">

<questions batch="3" count="2">

Use AskUserQuestion to ask these 2 questions in a single batch.

**IMPORTANT:** Generate contextually intelligent suggestions based on all previous answers.

9. **Typography Style**
   - Question: "What typography style matches your brand?"
   - Type: Single select with 5 options + "Other" (auto-provided)
   - Required: Yes
   - Store as: `typographyStyle`
   - **Generate 5 smart suggestions** based on tone and sitePurpose:
     - Match font personality to brand tone
     - Consider industry norms
     - Provide clear descriptions with font families
     - Example for "Professional SaaS":
       - "Modern Sans-Serif - Inter (Recommended)"
       - "Clean & Minimal - DM Sans"
       - "Corporate - IBM Plex Sans"
       - "Technical - Space Grotesk"
       - "Friendly - Plus Jakarta Sans"
   - Font mapping:
     - Modern/Clean: Inter, DM Sans, Plus Jakarta Sans
     - Technical: JetBrains Mono, Space Grotesk, IBM Plex Mono
     - Classic/Elegant: Playfair Display, Merriweather, Crimson Text
     - Bold/Impactful: Outfit, Sora, Urbanist
     - Friendly: Nunito, Quicksand, Comfortaa

10. **Additional Pages**
    - Question: "Which additional pages should we create?"
    - Type: Multi-select with 5-6 options + "Other" (auto-provided)
    - Required: No (can skip all to only create index.html)
    - Store as: `additionalPages` (array)
    - **Generate 5-6 smart suggestions** based on sitePurpose:
      - Order by relevance to site type
      - Mark recommended pages
      - Example for "SaaS Product":
        - "Pricing (Recommended)"
        - "About"
        - "Contact"
        - "Blog"
        - "Documentation"
        - "Changelog"
    - Common pages by type:
      - SaaS: Pricing, About, Contact, Blog, Docs, Changelog, Customers
      - Agency: About, Portfolio, Services, Contact, Team, Case Studies
      - Docs: Getting Started, API Reference, Guides, Examples, FAQ
      - Blog: About, Archive, Categories, Authors, Newsletter

</questions>

<outcome>Advanced preferences captured (typography, additional pages)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 4B: Image Management -->
<!-- ============================================================================ -->

<stage name="image-management" title="Managing your images">

<outcome>User understands where to place images; images are detected and analyzed</outcome>

<questions batch="4" count="1">

**Inform user first:**
```
Images help bring your site to life. Recommended:
- Logo (square, any size)
- Hero image (wide, for the homepage header)
- Supporting images (for features, about, etc.)

If you have images ready, add them to the `assets/` folder now.
```

Use AskUserQuestion to ask this single question:

11. **Image Assets**
    - Question: "Do you have images ready to add?"
    - Type: Single select with 3 options (no "Other" needed)
    - Options:
      - "Yes, I'll add them now (I'll wait 30 seconds)"
      - "No, I'll add them later"
      - "No, use color-based placeholders"
    - Required: Yes
    - Store as: `hasImages`

**Action based on response:**
- **"Yes, I'll add them now"**: Tell user "Add your image files to the `assets/` folder. I'll wait 30 seconds..." → Wait 30 seconds → Continue to image analysis
- **"No, I'll add them later"**: Set `detectedImages = []` → Continue (site will work without images, user can add later)
- **"No, use color-based placeholders"**: Set `detectedImages = []` and `usePlaceholders = true` → Create colorful gradient/shape placeholders in markup

</questions>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 4C: Image Detection & Analysis -->
<!-- ============================================================================ -->

<stage name="image-detection" title="Analyzing images">

<outcome>Images are detected, analyzed for type/purpose, and ready to be integrated</outcome>

<actions>

**Examine assets/ folder** for image files (png, jpg, jpeg, svg, webp, gif):

For each image found, analyze:

1. **File properties:**
   - Filename (hint about purpose: logo, hero, feature, icon, etc.)
   - File type/extension
   - File size

2. **Image dimensions:**
   - Width × Height
   - Aspect ratio (square ≈1:1, landscape >1:1, portrait <1:1)
   - Estimated purpose based on size:
     - Small (< 200px wide) → Logo or icon
     - Medium (200-600px wide) → Feature image or avatar
     - Large (> 600px wide) → Hero/banner image

3. **Image purpose classification:**
   - **Logo**: Filename contains "logo", square aspect ratio, small size → Use as navbar logo
   - **Hero/Banner**: Filename contains "hero" or "banner", landscape ratio, large width → Use in hero section
   - **Feature**: Other images with medium-large size → Use in features section
   - **Icon/Small**: Filename suggests it, very small → Store for future use

4. **Store detected images:**
   ```
   detectedImages = [
     {
       filename: "logo.png",
       path: "assets/logo.png",
       width: 200,
       height: 200,
       type: "logo",
       aspectRatio: "square"
     },
     {
       filename: "hero.jpg",
       path: "assets/hero.jpg",
       width: 1200,
       height: 600,
       type: "hero",
       aspectRatio: "landscape"
     },
     // ... etc
   ]
   ```

5. **Report findings to user:**
   ```
   Found {count} images:
   - {logoImage.filename} → Logo
   - {heroImage.filename} → Hero background
   - {otherImages} → Feature images

   I'll integrate these into your homepage.
   ```

If no images found, set `detectedImages = []` and continue with default placeholders.

</actions>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 5: Generate brand.json -->
<!-- ============================================================================ -->

<stage name="generate-brand-config" title="Generating brand configuration">

<actions>

Update `brand.json` with collected answers:

```json
{
  "name": "{brandName}",
  "tagline": "{tagline}",
  "colors": {
    "primary": "{primaryColor}"
  },
  "typography": {
    "fonts": {
      "sans": "{mappedSansFont}",
      "mono": "JetBrains Mono"
    }
  }
}
```

Where `{mappedSansFont}` is based on typographyStyle:
- "Modern" → "Inter"
- "Classic" → "Playfair Display" (and add serif to fonts)
- "Technical" → "JetBrains Mono" (and set as primary)
- "Use defaults" → "Inter"

</actions>

<outcome>`brand.json` is now fully configured with user's brand identity</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 6: Generate Starter Homepage -->
<!-- ============================================================================ -->

<stage name="generate-homepage" title="Creating starter homepage">

<actions>

Create `pages/index.html` with minimal structure, **incorporating detected images**:

```html
<!DOCTYPE html>
<html lang="en">

<include-head
  title="{brandName}"
  description="{tagline}"
/>

<body>
  <include-nav logo="{logoFromDetected || logoPath || '/assets/logo.svg'}" />

  <site-hero variant="{toneVariant}" {heroImageStyle}>
    {heroImageHTML}
    <h1>{brandName}</h1>
    <p>{tagline}</p>
    <site-hero-actions>
      <a href="#" class="btn btn-primary">{cta}</a>
    </site-hero-actions>
  </site-hero>

  <site-features>
    {featureCardsWithImagesHTML}
  </site-features>

  <site-cta variant="{toneVariant}">
    <h2>Ready to get started?</h2>
    <a href="#" class="btn btn-primary">{cta}</a>
  </site-cta>

  <include-footer siteName="{brandName}" />
</body>

</html>
```

**Image Integration Logic:**

1. **Logo**: If `detectedImages` contains logo type:
   - Use `detectedImages[logo].path` in `<include-nav logo="...">`
   - Otherwise fall back to `logoPath` or default

2. **Hero Image**: If `detectedImages` contains hero type:
   - Use `detectedImages[hero].path` as background image
   - Set style: `style="background-image: url('{heroPath}')"`
   - Adjust hero variant based on image dimensions

3. **Feature Images**: If `detectedImages` contains feature/medium images:
   - Create feature cards with embedded images:
   ```html
   <site-feature-card>
     <img src="{featureImage.path}" alt="{featureName}" />
     <h3>{feature}</h3>
     <p>Feature description</p>
   </site-feature-card>
   ```
   - Otherwise create text-only cards with placeholders

4. **Fallback**: If no images detected, create text-only structure with color-based visual interest

Where `{toneVariant}` maps tone to visual style:
- "Professional" → "centered"
- "Friendly" → "colorful"
- "Technical" → "minimal"
- "Playful" → "bold"
- "Minimal" → "minimal"

</actions>

<outcome>`pages/index.html` created with branded homepage template</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 7: Generate Additional Pages (Optional) -->
<!-- ============================================================================ -->

<stage name="generate-additional-pages" title="Creating additional pages">

<actions>

For each page in {additionalPages} array, create minimal template:

**If "About" selected:**
- Create `pages/about.html` with: hero + content sections + site footer

**If "Pricing" selected:**
- Create `pages/pricing.html` with: pricing table placeholder + features + CTA

**If "Contact" selected:**
- Create `pages/contact.html` with: contact form placeholder + info sections

**If "Blog" selected:**
- Create `pages/blog.html` with: blog post list placeholder + featured posts

**If "Docs" selected:**
- Create `pages/docs.html` with: documentation structure (quick start, guides, reference)

All additional pages use:
- Same `<include-head>`, `<include-nav>`, `<include-footer>`
- Brand name and colors from brand.json
- Minimal placeholder content ready to customize

</actions>

<outcome>All selected additional pages created with minimal templates</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 8: Run Build & Verify -->
<!-- ============================================================================ -->

<stage name="build-and-verify" title="Building your site">

<actions>

1. Run: `npm run build`
   - Generates tokens from brand.json
   - Compiles CSS (tokens + utilities + elements)
   - Processes HTML includes and injects Google Fonts
   - Outputs to `dist/`

2. Verify build succeeded:
   - Check for `dist/index.html` (and any additional pages)
   - Check for `dist/styles.css`
   - Report build status to user

</actions>

<outcome>Site successfully built and ready to preview</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 9: Success & Next Steps -->
<!-- ============================================================================ -->

<stage name="success-and-guidance" title="Repository initialized!">

<outcome>User has a customized, buildable site ready to develop</outcome>

Output success message:

```
✅ Repository initialized successfully!

Your new site:
  • Brand: {brandName}
  • Tagline: {tagline}
  • Primary color: {primaryColor}
  • Pages: index.html {+ additionalPages.join(", ")}

Next steps:
  1. Preview: npm run serve
  2. Customize: Edit pages/index.html
  3. Explore components: /recommend {sitePurpose}
  4. Add content: Read CLAUDE.md for workflow
  5. Need help? Check .claude/commands/ for available commands

Happy building! 🚀
```

</stage>

<!-- ============================================================================ -->
<!-- END OF WORKFLOW -->
<!-- ============================================================================ -->
