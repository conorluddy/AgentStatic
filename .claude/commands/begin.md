<!-- Initialize a fresh repo after cloning -->

# Initialize Repository

Initialize this repo with your own branding, content, and site structure. This command will wipe boilerplate content and ask you a series of questions to customize the site.

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

Use AskUserQuestion to ask these 4 questions in a single batch:

1. **Brand Name**
   - Question: "What is your product/company/project name?"
   - Type: Text input
   - Required: Yes
   - Store as: `brandName`

2. **Tagline**
   - Question: "What's your tagline? (under 10 words)"
   - Type: Text input
   - Required: Yes
   - Store as: `tagline`

3. **Primary Color**
   - Question: "What's your primary brand color? (hex code like #3b82f6, or describe: warm blue, dark red, forest green, etc.)"
   - Type: Text input
   - Required: Yes
   - Store as: `primaryColor`
   - Validation: If hex format (starts with #), use directly. Otherwise, map color descriptions:
     - "warm blue" → #3b82f6
     - "dark red" → #dc2626
     - "forest green" → #059669
     - "sunny yellow" → #eab308
     - "purple" → #a855f7
     - "pink" → #ec4899
     - (use sensible mappings for natural color descriptions)

4. **Site Purpose**
   - Question: "What type of site is this?"
   - Type: Single select from options
   - Options:
     - "SaaS Product"
     - "Agency/Portfolio"
     - "Documentation"
     - "Blog/Content"
     - "Marketing Site"
   - Required: Yes
   - Store as: `sitePurpose`

</questions>

<outcome>Core brand identity defined (name, tagline, color, purpose)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 3: Gather Content Direction (Batch 2) -->
<!-- ============================================================================ -->

<stage name="content-direction" title="Gathering content direction">

<questions batch="2" count="4">

Use AskUserQuestion to ask these 4 questions in a single batch:

5. **Target Audience**
   - Question: "Who is your target audience? (e.g., developers, startups, enterprises, designers)"
   - Type: Text input
   - Required: Yes
   - Store as: `audience`

6. **Key Features/Benefits**
   - Question: "What are 3-4 key features or benefits? (comma-separated)"
   - Type: Text input
   - Required: Yes
   - Store as: `features` (parse as array by splitting on comma)

7. **Call to Action**
   - Question: "What should visitors do? (e.g., Sign up, Contact us, Download, Learn more)"
   - Type: Text input
   - Required: Yes
   - Store as: `cta`

8. **Brand Tone**
   - Question: "What's your brand tone/personality?"
   - Type: Single select from options
   - Options:
     - "Professional"
     - "Friendly"
     - "Technical"
     - "Playful"
     - "Minimal"
   - Required: Yes
   - Store as: `tone`

</questions>

<outcome>Content strategy defined (audience, features, CTA, tone)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 4: Gather Advanced Settings (Batch 3) -->
<!-- ============================================================================ -->

<stage name="advanced-settings" title="Gathering advanced settings (optional)">

<questions batch="3" count="3">

Use AskUserQuestion to ask these 3 optional questions in a single batch. If user skips, use defaults:

9. **Typography Style**
   - Question: "What's your typography preference?"
   - Type: Single select from options
   - Options:
     - "Modern (Inter sans-serif) - (Recommended)"
     - "Classic (Playfair serif)"
     - "Technical (JetBrains Mono)"
     - "Use defaults"
   - Required: No
   - Default: "Modern (Inter sans-serif)"
   - Store as: `typographyStyle`

10. **Logo Path**
    - Question: "Do you have a logo file? Provide the path, or leave blank if you'll add it later"
    - Type: Text input
    - Required: No
    - Default: None
    - Store as: `logoPath`
    - Validation: If provided, verify file exists

11. **Additional Pages**
    - Question: "Which additional pages do you need?"
    - Type: Multi-select checkboxes
    - Options:
      - "About"
      - "Pricing"
      - "Contact"
      - "Blog"
      - "Docs"
    - Required: No
    - Default: [] (empty, only create index.html)
    - Store as: `additionalPages` (array)

</questions>

<outcome>Advanced preferences captured (font style, logo, additional pages)</outcome>

</stage>

<!-- ============================================================================ -->
<!-- STAGE 4B: Image Management -->
<!-- ============================================================================ -->

<stage name="image-management" title="Managing your images">

<outcome>User understands where to place images; images are detected and analyzed</outcome>

<instructions>

1. **Inform user** about image handling:
   ```
   Images help bring your site to life. You can:
   - Add a logo (square, any size)
   - Add a hero image (wide, for the homepage header)
   - Add supporting images (for features, etc.)

   Place any images you have in the `assets/` folder now, then I'll analyze them.
   ```

2. **Ask if they have images ready** (optional, single question):
   - Question: "Do you have any images to use? (logo, hero image, etc.)"
   - Type: Single select
   - Options:
     - "Yes, I'll add them now"
     - "No, I'll add them later"
     - "No, create placeholders"
   - Store as: `hasImages`

3. **If "Yes, I'll add them now":**
   - Tell user: "Go ahead and add image files to the `assets/` folder. I'll wait for 30 seconds while you do that."
   - Wait 30 seconds for user to add files
   - Continue to image analysis

4. **If "No, I'll add them later" or "No, create placeholders":**
   - Skip to image analysis (no images to analyze, but continue)

</instructions>

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
