# Comprehensive marketing component library definition

This audit catalogs **247 distinct component patterns** across 12 UI libraries and 13 reference sites, organized for building minimal/modern landing pages in the Clerk, Linear, and Vercel aesthetic.

---

## Navigation & structure

### Header/Navbar

**Standard sticky header**
Fixed-position navigation bar with logo, navigation links, and CTAs. Remains visible during scroll with optional background blur or color change on scroll.
- *Variants:* Transparent (hero overlay), solid, blur backdrop, hide-on-scroll-down/show-on-scroll-up
- *Used well:* Linear (ultra-minimal), Clerk (context-aware CTAs that change when signed in), Raycast (dark with download focus)

**Mega menu navigation**
Multi-column dropdown menus triggered on hover/click, containing categorized links, descriptions, and optional icons or illustrations.
- *Variants:* Two-column with descriptions, three-column with icons, full-width with featured content cards
- *Used well:* Vercel (nested product categories), Stripe (most complex with product/solutions/resources), Notion (team/size segmentation)
- *Libraries:* Tailwind UI (7 flyout menus), shadcn/ui Navigation Menu, Radix Navigation Menu

**Resizable navbar**
Header that changes width, padding, or element visibility based on scroll position. Creates elegant transition from hero to browsing state.
- *Variants:* Width collapse, logo-only mode, pill-shaped transform
- *Libraries:* Aceternity UI Resizable Navbar

**Floating navbar**
Navigation bar that floats with shadow/border, appearing after scrolling past hero section. Often pill-shaped or rounded.
- *Variants:* Centered floating, edge-attached, with backdrop blur
- *Libraries:* Aceternity UI Floating Navbar

**Announcement banner**
Thin bar above or integrated with header announcing news, product launches, or events. Typically dismissible.
- *Variants:* Sticky top bar, integrated in hero, dismissible with X, with countdown
- *Used well:* Clerk ("Clerk raises $50m Series C"), Linear ("New: Linear agent for Slack"), PlanetScale ("$5 single node Postgres")
- *Libraries:* Tailwind UI (13 banners), HyperUI Announcements (12), Flowbite Banners (5), Aceternity UI Sticky Banner

**Skip link**
Accessibility-focused hidden link that appears on focus, allowing keyboard users to skip to main content.
- *Used well:* Clerk (visible in source)

### Footer

**Mega footer**
Multi-column footer with comprehensive site links organized by category, typically including legal links, social icons, and newsletter signup.
- *Variants:* 3-column, 4-column, 5-column, with newsletter integration, with theme switcher
- *Used well:* Stripe (50+ country/language selector), Linear (unique sections like README, Quality, Brand), Vercel (theme switcher)
- *Libraries:* HyperUI Footers (24 variants), Tailwind UI (7), Flowbite (7), DaisyUI Footer

**Simple footer**
Minimal footer with essential links, copyright, and social icons in single or double row layout.
- *Variants:* Centered, left-aligned, with logo only
- *Libraries:* HyperUI, Flowbite

**Footer with newsletter**
Footer incorporating email signup form, combining navigation with lead capture.
- *Variants:* Inline input, stacked form, with privacy link
- *Used well:* Raycast (footer newsletter with privacy notice)
- *Libraries:* HyperUI Newsletter Signup (4), Flowbite Newsletter (5)

### Mobile navigation

**Hamburger menu**
Three-line icon triggering slide-out or overlay mobile navigation panel.
- *Variants:* Slide from left, slide from right, full-screen overlay, bottom sheet
- *Libraries:* shadcn/ui Sheet, shadcn/ui Drawer, DaisyUI Drawer sidebar

**Floating dock**
macOS-style dock navigation fixed to bottom of viewport with magnification on hover.
- *Variants:* Bottom fixed, expandable on hover, with labels
- *Libraries:* Aceternity UI Floating Dock, Magic UI Dock, cult/ui MacOS Dock

### Breadcrumbs
Horizontal path navigation showing page hierarchy with clickable parent links.
- *Variants:* Slash-separated, chevron-separated, with icons, truncated for deep paths
- *Libraries:* shadcn/ui Breadcrumb, DaisyUI Breadcrumbs, ParkUI

### Sidebar
Vertical navigation panel, typically for documentation or app-like layouts.
- *Variants:* Fixed, collapsible, expandable on hover, with sections
- *Libraries:* shadcn/ui Sidebar, Aceternity UI Sidebar

### Pagination
Navigation controls for multi-page content like blogs or listings.
- *Variants:* Numbered, previous/next only, with ellipsis, infinite scroll trigger
- *Libraries:* shadcn/ui Pagination, DaisyUI Pagination, ParkUI

---

## Hero sections

### Hero with headline and CTA
Primary landing section with large headline, subheadline, and call-to-action buttons. The foundation of most landing pages.
- *Variants:* Centered, left-aligned, right-aligned, with announcement badge
- *Used well:* Linear ("Plan and build products" with floating avatars), Resend ("Email for developers" minimal approach)
- *Libraries:* Tailwind UI Hero Sections (12), Flowbite Hero (14), DaisyUI Hero

### Hero with product screenshot
Hero featuring full-width or floating product UI screenshot as primary visual element.
- *Variants:* Screenshot below headline, screenshot beside headline, screenshot with device frame
- *Used well:* Stripe (live dashboard demo), Supabase (table editor preview), Arc (full-screen browser screenshot)

### Hero with video background
Hero section with looping video as background, text overlay with contrast treatment.
- *Variants:* Full-bleed video, contained video, with gradient overlay, with play button for full video
- *Libraries:* Tailwind UI, Flowbite, cult/ui Bg Media Hero, Magic UI Hero Video Dialog

### Hero with animated graphics
Hero featuring motion graphics, animated SVGs, or WebGL effects as visual interest.
- *Variants:* Particle effects, geometric animations, abstract shapes, gradient animations
- *Used well:* Clerk (circuit-board style animation), Vercel (globe with node pulses), Resend (3D cube animation)
- *Libraries:* Aceternity UI (Aurora, Background Beams, Wavy Background, Lamp Effect), Magic UI (Globe, Particles)

### Hero with code preview
Developer-focused hero showing syntax-highlighted code example alongside headline.
- *Variants:* Single code block, tabbed languages, terminal style, with copy button
- *Used well:* Resend (multi-language SDK tabs), Supabase (CLI command display)
- *Libraries:* Aceternity UI Codeblock, cult/ui Code Block

### Split hero
Two-column hero with content on one side and visual (image, video, or interactive demo) on the other.
- *Variants:* 50/50 split, 60/40 content-heavy, 40/60 visual-heavy, reversible
- *Used well:* Stripe (headline left, dashboard right)
- *Libraries:* Tailwind UI Hero Sections

### Hero with social proof
Hero incorporating trust elements like customer logos, stats, or testimonial snippets directly in the hero area.
- *Variants:* Logo bar below CTA, stats inline, quote snippet, "trusted by" statement
- *Used well:* Supabase ("Trusted by fast-growing companies" + logo ticker), Arc (quote as headline)

### Hero parallax
Hero with layered elements that move at different speeds during scroll, creating depth effect.
- *Variants:* Image layers, text parallax, 3D depth effect
- *Libraries:* Aceternity UI Hero Parallax, Aceternity UI Container Scroll Animation

### Hero highlight
Hero with animated text highlighting effect drawing attention to key words or phrases.
- *Variants:* Background highlight sweep, underline animation, gradient reveal
- *Libraries:* Aceternity UI Hero Highlight, Magic UI Text Highlighter

---

## Social proof & trust

### Logo cloud
Grid or row of customer/partner company logos demonstrating social proof through brand recognition.
- *Variants:* Static grid, static row, scrolling marquee, multi-row with offset, grayscale with hover color
- *Used well:* Stripe (tier-1 logos: OpenAI, Amazon, Google, Anthropic), Vercel (framework logos carousel), Supabase (auto-scrolling ticker)
- *Libraries:* Tailwind UI Logo Clouds (6), HyperUI Logo Clouds (4), Flowbite Customer Logos (4)

### Logo ticker/marquee
Continuously scrolling horizontal display of logos, creating infinite loop effect.
- *Variants:* Single row, dual row with opposite directions, varying speeds, pause on hover
- *Used well:* Clerk (multi-row with offset timing), Railway (enterprise logos), Supabase
- *Libraries:* Magic UI Marquee, cult/ui Logo Carousel, Aceternity UI Infinite Moving Cards

### Testimonial card
Quote from customer with attribution (photo, name, title, company), typically in card format.
- *Variants:* Photo left, photo top, logo only, with star rating, with company logo
- *Used well:* Framer (full customer story cards with video on hover), Stripe (enterprise case study cards with metrics)
- *Libraries:* Tailwind UI Testimonials (8), HyperUI Cards (9), Flowbite Testimonials (5)

### Testimonial carousel
Horizontally scrollable collection of testimonial cards with navigation controls.
- *Variants:* Single visible, multiple visible, auto-rotate, with pagination dots
- *Used well:* Clerk (carousel with high-profile logos inline), Resend (13+ testimonials)
- *Libraries:* DaisyUI Carousel, Aceternity UI Animated Testimonials, Aceternity UI Card Stack

### Testimonial wall/grid
Grid layout of multiple testimonials creating "wall of love" effect, often with Twitter/X-style cards.
- *Variants:* Masonry layout, uniform grid, scrolling columns, bento-style mixed sizes
- *Used well:* Supabase (Twitter testimonial wall with two-row marquee), Railway (tweet grid)
- *Libraries:* cult/ui Tweet Grid, Magic UI Tweet Card

### Customer story card
Expanded testimonial format with customer photo, detailed quote, outcome metrics, and link to full case study.
- *Variants:* Card with website preview, video testimonial card, metric-focused card
- *Used well:* Stripe (BMW, Amazon, Maersk with specific outcomes), Framer (company + quote + website preview)

### Stats display
Large numerical metrics presented prominently to establish credibility and scale.
- *Variants:* Three-column, four-column, with icons, with animated counting, with change indicators
- *Used well:* Stripe ("500M+ API requests/day", "99.999% uptime"), PlanetScale (p50/p95/p99 latency), Railway ("15M+ monthly deployments")
- *Libraries:* Tailwind UI Stats (8), DaisyUI Stat, Tremor (all visualization components), HyperUI

### Animated counter
Number that counts up from zero to final value when scrolled into view.
- *Variants:* Simple counter, with prefix/suffix, with decimal, eased animation
- *Used well:* Framer (Lighthouse scores counting to 100)
- *Libraries:* Magic UI Number Ticker, cult/ui Animated Number

### Press mentions
Section featuring quotes or logos from publications that have covered the product.
- *Variants:* Quote with publication logo, logo grid, "as featured in" bar
- *Used well:* Notion (The Verge quote with publication attribution)

### Trust badges
Visual indicators of certifications, compliance standards, or security measures.
- *Variants:* Badge row, badge grid, in footer, in dedicated security section
- *Used well:* Linear (SOC 2, GDPR, HIPAA icons), Supabase (SOC2 Type 2, HIPAA in footer), PlanetScale (SOC 1, SOC 2, HIPAA, PCI DSS)
- *Libraries:* Flowbite Social Proof (6)

### GitHub stars badge
Component displaying live or static GitHub repository star count as social proof for developer tools.
- *Variants:* In header, with icon, linked to repo
- *Used well:* Supabase ("92.7K" prominently in nav)

### Avatar group
Overlapping circular avatars showing team members or users, implying community or adoption.
- *Variants:* With "+X more" count, linked to user profiles, with tooltip on hover
- *Used well:* Raycast (24+ notable user avatars with names)
- *Libraries:* Magic UI Avatar Circles, shadcn/ui Avatar

### Award badge
Third-party recognition badges from review platforms like G2, Capterra, Product Hunt.
- *Variants:* G2 badges, Product Hunt badge, app store ratings
- *Used well:* Notion ("Rated best on G2" with badge image)

---

## Features & benefits

### Feature grid
Multi-column grid of feature cards, typically 2-4 columns with icon, title, and description.
- *Variants:* 2-column, 3-column, 4-column, with illustrations, with screenshots
- *Used well:* Notion (screenshot feature cards), Lemon Squeezy (numbered feature grid)
- *Libraries:* Tailwind UI Feature Sections (15), HyperUI Feature Grids (8), Flowbite Feature Sections (9)

### Feature card with icon
Individual feature presentation with icon, headline, and description in card format.
- *Variants:* Icon top, icon left, with background, with hover effect, with link
- *Used well:* Supabase (7 product cards with icons and hover states), Clerk (code component names as features)
- *Libraries:* shadcn/ui Card, ParkUI Card, DaisyUI Card

### Bento grid
Asymmetric grid layout with mixed-size cards creating visual interest, popularized by Apple.
- *Variants:* 2x3 with one large, 3x3 with varied sizes, with images, with interactive elements
- *Used well:* Clerk (mixed-size feature cards), Linear (modern asymmetric layout)
- *Libraries:* Tailwind UI Bento Grids (3), Magic UI Bento Grid, Aceternity UI Bento Grid

### Feature list with checkmarks
Vertical list of features with check icons, often used in pricing cards or comparison sections.
- *Variants:* Green checks, branded check icons, with X for missing features
- *Used well:* All pricing sections universally
- *Libraries:* DaisyUI List, Tremor List/ListItem

### Feature comparison table
Table comparing features across products, competitors, or pricing tiers.
- *Variants:* Horizontal scroll on mobile, sticky first column, with tooltips, grouped rows
- *Used well:* Stripe (multi-product comparison)
- *Libraries:* shadcn/ui Table, shadcn/ui Data Table, Tremor Table, ParkUI Table

### Interactive feature demo
Live or simulated product demonstration embedded in marketing page.
- *Variants:* Clickable prototype, animated simulation, real embedded product, code playground
- *Used well:* Clerk (live component preview of SignIn, SignUp), Railway (animated deployment canvas), Stripe (interactive product icon selector)

### Before/after comparison
Side-by-side or slider-based comparison showing transformation or improvement.
- *Variants:* Horizontal slider, vertical slider, side-by-side static, toggle switch
- *Libraries:* DaisyUI Diff, Magic UI Compare, Aceternity UI Compare

### Tab-based feature showcase
Features organized into tabs, each revealing different content or demonstrations.
- *Variants:* Horizontal tabs, vertical tabs, with animated content switch, with product screenshots
- *Used well:* Clerk (SignUp, SignIn component tabs), Vercel (AI Apps, Web Apps use case tabs), Framer (AI/Design/CMS/Collaborate)
- *Libraries:* shadcn/ui Tabs, Radix Tabs, DaisyUI Tab, ParkUI Tabs, Aceternity UI Tabs

### Feature section with alternating layout
Sections alternating image-left/text-right and image-right/text-left patterns.
- *Variants:* 50/50 split, 60/40, with background color alternation
- *Libraries:* Flowbite Content Sections (7), HyperUI Sections (4)

### Wobble card
Card with subtle rotation/scale animation on mouse movement for tactile feel.
- *Variants:* Light wobble, dramatic tilt, with shadow response
- *Libraries:* Aceternity UI Wobble Card

### 3D card effect
Card with perspective transform creating depth illusion on hover.
- *Variants:* Tilt on hover, floating elements, parallax internal layers
- *Libraries:* Aceternity UI 3D Card Effect, DaisyUI Hover 3D Card

### Glare card
Card with light reflection effect following cursor movement.
- *Variants:* Subtle glare, dramatic shine, with gradient
- *Used well:* Linear-style cards
- *Libraries:* Aceternity UI Glare Card

### Focus cards
Card collection where hovering one card dims/blurs others.
- *Variants:* Blur others, dim others, scale focused
- *Libraries:* Aceternity UI Focus Cards

### Expandable card
Card that expands on click to reveal additional content.
- *Variants:* Modal expansion, inline expansion, full-screen expansion
- *Libraries:* Aceternity UI Expandable Card, cult/ui Expandable Card, cult/ui Expandable Screen

---

## Pricing

### Pricing cards
Side-by-side presentation of pricing tiers, typically 2-4 cards with features and CTA.
- *Variants:* 2-tier, 3-tier (with highlighted "popular"), 4-tier, with toggle for billing period
- *Used well:* Stripe (pricing table demo showing their actual product output)
- *Libraries:* Tailwind UI Pricing (12), HyperUI Pricing (2), Flowbite Pricing (7)

### Pricing table with comparison
Full table format showing all features across all tiers for detailed comparison.
- *Variants:* Feature groups, with tooltips, sticky header row
- *Libraries:* shadcn/ui Table, Tailwind UI

### Billing toggle
Switch component toggling between monthly/annual pricing, often showing savings percentage.
- *Variants:* Switch, segmented control, tabs, with "Save X%" badge
- *Used well:* Most SaaS pricing pages
- *Libraries:* shadcn/ui Switch, DaisyUI Toggle, ParkUI Segment Group, Flowbite (toggle variants)

### Enterprise contact card
Special pricing card for enterprise tier with "Contact sales" CTA instead of price.
- *Variants:* Highlighted differently, with enterprise features list, with demo CTA
- *Used well:* All enterprise SaaS products

### Usage-based pricing display
Pricing visualization showing costs based on usage metrics with calculator or slider.
- *Variants:* Slider-based calculator, tier visualization, example calculations
- *Used well:* Vercel, Supabase (usage-based models)

### Free tier highlight
Prominent display of free tier availability, often with "Get started free" CTA.
- *Variants:* In hero, in pricing card, banner style, with limitations listed
- *Used well:* Clerk ("Free for first 10,000 MAU"), Lemon Squeezy ("Get started for free")

---

## CTA sections

### Simple CTA banner
Full-width section with headline and CTA button, typically before footer.
- *Variants:* Centered, dark background, gradient background, with pattern
- *Used well:* Clerk (dark gradient with free tier details), Railway ("A better future is now boarding")
- *Libraries:* Tailwind UI CTA Sections (11), HyperUI CTAs (7), Flowbite CTA (8)

### CTA with background visual
CTA section featuring background image, illustration, or pattern for visual interest.
- *Variants:* Full image, pattern overlay, gradient wash
- *Libraries:* Tailwind UI, Flowbite, cult/ui Bg Media Hero

### Newsletter signup
Email capture form for newsletter subscription, typically with single input and submit button.
- *Variants:* Inline, stacked, with name field, with GDPR checkbox, with privacy link
- *Used well:* Raycast (footer with privacy link)
- *Libraries:* Tailwind UI Newsletter (6), HyperUI Newsletter Signup (4), Flowbite Newsletter (5), Aceternity UI Signup Form

### Waitlist form
Pre-launch email capture for upcoming product, often with social proof of waitlist size.
- *Variants:* Email only, with name, with "Join X others" counter
- *Libraries:* Magic UI (startup landing template), Aceternity UI Signup Form

### Demo request form
Lead capture form for sales demos with additional fields beyond email.
- *Variants:* Inline form, modal form, with calendar integration
- *Used well:* Vercel ("Get a Demo"), Notion ("Request a demo")
- *Libraries:* Flowbite Contact Forms (5), HyperUI Contact Forms (10)

### App store badges
Apple App Store and Google Play Store download badges.
- *Variants:* Black badges, white badges, side-by-side, stacked
- *Used well:* Arc Browser, Raycast

### Download buttons
Platform-specific download buttons with OS icons.
- *Variants:* Mac/Windows/Linux, with version number, with system requirements
- *Used well:* Raycast ("Download for Mac" + "Download for Windows (beta)" with homebrew option), Arc (direct .dmg/.exe links)

### Dual CTA pattern
Two CTAs side-by-side offering different paths (self-serve vs. sales contact).
- *Variants:* Primary + secondary styling, primary + ghost, with descriptions
- *Used well:* Vercel ("Deploy" + "Get a Demo"), Stripe ("Start now" + "Contact sales"), Notion ("Get free" + "Request demo")

### Multi-intent CTA section
Footer CTA area with 3+ options for different user intents.
- *Variants:* Card format, button row, with icons
- *Used well:* Linear (Contact sales, Get started, Download, Open app as four options), Stripe (three distinct next-step paths)

---

## Content sections

### Blog post card
Preview card for blog articles with image, title, excerpt, date, and author.
- *Variants:* Horizontal, vertical, featured large, minimal text-only
- *Libraries:* Tailwind UI Blog Sections (7), HyperUI Blog Cards (13), Flowbite Blog (5)

### Blog listing layout
Grid or list layout for multiple blog posts with filtering/categories.
- *Variants:* 3-column grid, 2-column with sidebar, list view, masonry
- *Libraries:* Tailwind UI, Flowbite

### Documentation preview
Section showcasing documentation structure or featured articles.
- *Variants:* Card grid, sidebar preview, search-focused
- *Used well:* Resend (prominent "Documentation" CTA), Supabase

### Changelog entry
Individual update entry with version number, date, and description of changes.
- *Variants:* Card format, timeline format, with badges for type (Feature, Fix, etc.)
- *Used well:* Framer ("December Update: Squircle" in CMS preview), Linear (dedicated /now page)
- *Libraries:* DaisyUI Timeline, Aceternity UI Timeline, Magic UI Timeline

### Timeline component
Vertical or horizontal timeline showing chronological events or process steps.
- *Variants:* Vertical with alternating sides, horizontal, with icons, with images
- *Used well:* Framer (customer journey), Linear (progress updates)
- *Libraries:* DaisyUI Timeline, Aceternity UI Timeline, Magic UI Timeline

### FAQ accordion
Expandable question-and-answer format for frequently asked questions.
- *Variants:* Single expansion, multiple expansion, with icons, with search
- *Used well:* Arc (Privacy, business model FAQs)
- *Libraries:* shadcn/ui Accordion, Radix Accordion, DaisyUI Accordion, Tailwind UI FAQs (7), HyperUI FAQs (6), Flowbite FAQ (5)

### Team member card
Profile card showing team member photo, name, role, and optional social links.
- *Variants:* Photo focus, with bio, with social links, grid layout
- *Libraries:* Tailwind UI Team Sections (9), HyperUI Team Sections (6), Flowbite Team (5)

### Career/job listing
Job posting cards with title, department, location, and apply link.
- *Variants:* Card grid, list format, with filters, grouped by department
- *Libraries:* Flowbite (full page templates)

### Steps/process indicator
Numbered or icon-based visualization of multi-step process.
- *Variants:* Horizontal steps, vertical steps, with connecting lines, progress indication
- *Used well:* Lemon Squeezy (numbered 01-06 sections)
- *Libraries:* DaisyUI Steps, shadcn/ui Progress

---

## Media & visual

### Image gallery
Collection of images in grid or carousel format with optional lightbox.
- *Variants:* Grid, masonry, carousel, with captions, with lightbox
- *Used well:* Framer (website gallery as hero social proof)
- *Libraries:* DaisyUI Carousel, DaisyUI Hover Gallery

### Video embed/player
Embedded video player, typically YouTube/Vimeo or custom player.
- *Variants:* Inline, modal trigger, with custom thumbnail, autoplay on scroll
- *Used well:* Clerk ("Watch demo (2 min)" with duration callout)
- *Libraries:* Magic UI Hero Video Dialog, cult/ui YouTube Video Player, cult/ui Hover Video Player

### Screenshot showcase
High-fidelity product screenshots displayed prominently.
- *Variants:* Single screenshot, carousel, with annotations, with zoom
- *Used well:* Arc (full-screen browser screenshot), Stripe (dashboard screenshots), Notion (database views)

### Browser mockup
Browser window chrome wrapping screenshot or content.
- *Variants:* Safari-style, Chrome-style, generic, light/dark frame
- *Libraries:* DaisyUI Browser mockup, Magic UI Safari, cult/ui Browser Window

### Phone mockup
Mobile device frame wrapping app screenshot.
- *Variants:* iPhone, Android, generic, angled, flat
- *Libraries:* DaisyUI Phone mockup, Magic UI iPhone, Magic UI Android

### Laptop mockup
Laptop device frame for desktop application screenshots.
- *Variants:* MacBook-style, generic, angled view
- *Used well:* Stripe (device mockups for terminal)

### Code snippet display
Syntax-highlighted code block with language indicator and optional actions.
- *Variants:* With line numbers, with filename tab, with copy button, with language selector
- *Used well:* Resend (multi-language tabs: Node.js, Python, Ruby, Go, etc.), Vercel (AI SDK examples)
- *Libraries:* DaisyUI Code mockup, Aceternity UI Codeblock, Magic UI Terminal, cult/ui Code Block

### Terminal/CLI preview
Command-line interface mockup showing terminal commands and output.
- *Variants:* macOS terminal, generic, with typing animation, with output
- *Used well:* Supabase (`$supabase functions deploy`), Railway (build logs streaming)
- *Libraries:* Magic UI Terminal, DaisyUI Window mockup

### Window mockup
OS window chrome (macOS/Windows style) wrapping content.
- *Variants:* macOS traffic lights, Windows buttons, generic
- *Libraries:* DaisyUI Window mockup

### Comparison slider
Interactive slider allowing before/after or side-by-side comparison of images.
- *Variants:* Horizontal, vertical, with labels
- *Libraries:* DaisyUI Diff, Aceternity UI Compare, Magic UI Code Comparison

### Device frame carousel
Multiple device mockups in carousel showcasing responsive designs.
- *Variants:* Desktop + mobile, all device sizes, interactive switching

### Macbook scroll animation
Animation where content emerges from laptop screen as user scrolls.
- *Libraries:* Aceternity UI Macbook Scroll

### Lens/zoom component
Magnifying glass effect for examining image details.
- *Libraries:* Magic UI Lens, Aceternity UI Lens

---

## Data & metrics

### Stat card
Individual card displaying single metric with label, often with icon or trend indicator.
- *Variants:* Large number, with icon, with trend arrow, with sparkline
- *Used well:* Stripe (large numerical proof points), Railway (stats badges in feature sections)
- *Libraries:* DaisyUI Stat, Tremor Card (KPI composition)

### Metric with delta
Stat display showing current value plus change indicator (up/down arrow with percentage).
- *Variants:* Positive/negative coloring, with period comparison
- *Libraries:* Tremor BadgeDelta

### Progress circle
Circular progress indicator, often used for percentages or scores.
- *Variants:* With label, with percentage inside, animated fill
- *Used well:* Framer (Lighthouse scores: 100/100)
- *Libraries:* DaisyUI Radial progress, Tremor Progress Circle, Magic UI Animated Circular Progress Bar

### Progress bar
Linear progress indicator for goals, capacity, or completion status.
- *Variants:* With label, segmented, with percentage
- *Libraries:* shadcn/ui Progress, Tremor Progress Bar, DaisyUI Progress

### Sparkline
Minimal inline chart showing trend without axes or labels.
- *Variants:* Line, bar, area
- *Libraries:* Tremor Spark Charts

### Simple charts for marketing
Lightweight chart components suitable for landing pages (not full dashboard complexity).
- *Variants:* Area chart (growth), bar chart (comparison), donut (breakdown)
- *Used well:* Framer (analytics dashboard preview), PlanetScale (latency graphs)
- *Libraries:* Tremor (Area Chart, Bar Chart, Donut Chart, Line Chart), shadcn/ui Chart

### Uptime tracker
Status grid showing historical uptime/downtime, often seen in status pages.
- *Variants:* Daily blocks, with percentage, linked to status page
- *Used well:* PlanetScale ("99.999% for multi-region" SLA)
- *Libraries:* Tremor Tracker

### Bar list
Ranked list with horizontal bars showing relative values.
- *Variants:* With percentages, with labels, sorted
- *Libraries:* Tremor Bar List

### Funnel visualization
Chart showing conversion or process stages with decreasing values.
- *Libraries:* Tremor Funnel Chart

---

## Interactive elements

### Tabs
Tabbed interface for organizing content into switchable panels.
- *Variants:* Horizontal, vertical, with icons, animated transitions, underline indicator, pill style
- *Used well:* All reference sites use tabs extensively
- *Libraries:* shadcn/ui Tabs, Radix Tabs, DaisyUI Tab, ParkUI Tabs, Aceternity UI Tabs, cult/ui Direction Aware Tabs

### Accordion
Collapsible content sections, typically for FAQs or grouped information.
- *Variants:* Single open, multiple open, with icons, animated
- *Libraries:* shadcn/ui Accordion, Radix Accordion, DaisyUI Accordion, ParkUI Accordion, Luxe Accordion

### Carousel/slider
Horizontally scrollable content with navigation controls.
- *Variants:* Auto-rotate, manual navigation, with dots, with arrows, infinite loop
- *Libraries:* shadcn/ui Carousel, DaisyUI Carousel, ParkUI Carousel, Aceternity UI Carousel, Aceternity UI Apple Cards Carousel, cult/ui 3D Carousel

### Modal/dialog
Overlay window for focused content or actions.
- *Variants:* Centered, full-screen, slide-up, with close button, with backdrop
- *Libraries:* shadcn/ui Dialog, Radix Dialog, DaisyUI Modal, ParkUI Dialog, Luxe Dialog, Aceternity UI Animated Modal, cult/ui Expandable Screen

### Drawer/sheet
Slide-out panel from edge of screen, often for mobile menus or detail views.
- *Variants:* From left, from right, from bottom, with overlay
- *Libraries:* shadcn/ui Drawer, shadcn/ui Sheet, ParkUI Drawer, Tremor Drawer

### Tooltip
Hover-triggered informational popup for additional context.
- *Variants:* Above, below, left, right, with arrow, animated
- *Libraries:* shadcn/ui Tooltip, Radix Tooltip, DaisyUI Tooltip, ParkUI Tooltip, Luxe Tooltip, Aceternity UI Animated Tooltip

### Popover
Click-triggered floating panel for menus, forms, or extended content.
- *Variants:* With arrow, positioned variants, with close button
- *Libraries:* shadcn/ui Popover, Radix Popover, ParkUI Popover, cult/ui Popover, cult/ui Popover Form

### Dropdown menu
Click-triggered menu with list of actions or links.
- *Variants:* With icons, with keyboard shortcuts, with submenus, with sections
- *Libraries:* shadcn/ui Dropdown Menu, Radix Dropdown Menu, DaisyUI Dropdown, ParkUI Menu, Luxe Dropdown Menu

### Command palette
Keyboard-triggered search/command interface (⌘K pattern).
- *Variants:* With categories, with recent items, with keyboard navigation
- *Used well:* Raycast (their entire product), Framer (search in nav)
- *Libraries:* shadcn/ui Command

### Toast notifications
Temporary notification messages appearing at screen edge.
- *Variants:* Success, error, info, warning, with action button, dismissible
- *Libraries:* shadcn/ui Toast, shadcn/ui Sonner, Radix Toast, DaisyUI Toast, ParkUI Toast, Tremor Toast

### Hover card
Preview card appearing on hover over linked content.
- *Variants:* User preview, content preview, with loading state
- *Libraries:* shadcn/ui Hover Card, Radix Hover Card, ParkUI Hover Card

### Link preview
Dynamic preview of external links showing title, image, and description.
- *Libraries:* Aceternity UI Link Preview

---

## Utility components

### Badge/tag
Small label component for categorization, status, or highlighting.
- *Variants:* Solid, outline, with dot, with icon, removable, colored by status
- *Used well:* Linear ("New" on features), Raycast ("beta" tags), Clerk (component name badges)
- *Libraries:* shadcn/ui Badge, DaisyUI Badge, ParkUI Badge, Tremor Badge, Luxe Badge

### Pill
Rounded badge variant, often used for categories or filters.
- *Variants:* Clickable, with count, with icon
- *Used well:* Vercel (product pills: AI SDK, AI Gateway, etc.)

### Avatar
Circular image component for user photos with fallback.
- *Variants:* Sizes (xs-xl), with status indicator, with fallback initials, with ring
- *Libraries:* shadcn/ui Avatar, Radix Avatar, DaisyUI Avatar, ParkUI Avatar, Luxe Avatar

### Avatar group
Overlapping avatars showing multiple users.
- *Variants:* With +N overflow, different overlap amounts, linked to profiles
- *Libraries:* Magic UI Avatar Circles

### Button
Primary interactive element for actions.
- *Variants:* Primary, secondary, outline, ghost, link, destructive, with icon, loading state, disabled
- *Used well:* All sites (Stripe dual-path, Linear confident single CTA, Arc minimal text links)
- *Libraries:* shadcn/ui Button, DaisyUI Button (extensive variants), ParkUI Button, Luxe Button (9 variants: shine, animated-border, rotate-border, magnetic), Tremor Button, Magic UI (Rainbow, Shimmer, Ripple, Pulsating, Shiny buttons), Aceternity UI Tailwind Buttons, cult/ui (Neumorph, Family, Texture, Bg Animate buttons)

### Button group
Multiple related buttons joined together.
- *Variants:* Horizontal, vertical, with dividers
- *Libraries:* shadcn/ui Button Group, DaisyUI Join

### Link with arrow
Text link with arrow icon indicating navigation.
- *Variants:* Arrow right, arrow external, animated on hover
- *Used well:* Stripe ("Start with Payments →"), Notion ("Try now →")

### Divider/separator
Visual line separating content sections.
- *Variants:* Horizontal, vertical, with text, dashed
- *Libraries:* shadcn/ui Separator, Radix Separator, DaisyUI Divider, Tremor Divider

### Card (base)
Generic container component with padding, border, and shadow.
- *Variants:* With header, with footer, with image, hoverable, clickable
- *Libraries:* shadcn/ui Card, DaisyUI Card, ParkUI Card, Tremor Card, Luxe Card

### Announcement badge
Floating badge announcing new features, typically above hero headline.
- *Variants:* Pill shape, with icon, with link, animated
- *Used well:* Linear ("New: Linear agent for Slack"), Raycast announcement banner

### Cookie consent banner
GDPR-compliant cookie notification, typically fixed to bottom of viewport.
- *Variants:* Full-width bar, corner popup, modal
- *Libraries:* Flowbite Cookie Consent (3)

### Back to top button
Fixed button to scroll back to page top, appearing after scrolling down.
- *Variants:* Icon only, with text, animated appearance

### Skeleton loader
Placeholder shapes shown while content loads.
- *Variants:* Text lines, image placeholder, card placeholder, custom shapes
- *Libraries:* shadcn/ui Skeleton, DaisyUI Skeleton, ParkUI Skeleton

### Spinner/loading indicator
Animation indicating loading state.
- *Variants:* Circular spinner, dots, bars, branded animation
- *Libraries:* shadcn/ui Spinner, DaisyUI Loading, ParkUI Spinner, Luxe Spinner, Aceternity UI Loaders

### Empty state
Placeholder content for sections with no data.
- *Variants:* With illustration, with CTA, minimal text
- *Libraries:* shadcn/ui Empty, HyperUI Empty Content (10)

### Keyboard shortcut display
Styled keyboard key indicators for shortcuts.
- *Variants:* Single key, combination, inline with text
- *Used well:* Raycast (`option + command + L` styled as keys)
- *Libraries:* shadcn/ui Kbd, DaisyUI Kbd

---

## Specialized marketing

### Integration logo grid
Grid of third-party integration/partner logos with optional links to integration pages.
- *Variants:* Grid, carousel, with categories, with "and more" indication
- *Used well:* Notion (Figma, Slack, GitHub cards with "Try now"), PlanetScale (Fivetran, Airbyte, Datadog), Railway ("Replaces" competitor logos)

### API/developer section
Dedicated section targeting developers with code examples and documentation links.
- *Variants:* With code preview, with SDK tabs, with "Explore API" CTA
- *Used well:* Resend (12 language tabs), Stripe (terminal-style interface), Lemon Squeezy ("Built for developers" section)

### SDK/framework selector
Tab or dropdown interface for selecting programming language or framework for code examples.
- *Variants:* Tabs, dropdown, with icons, nested (language → framework)
- *Used well:* Resend (Node.js | Next.js | Remix | Nuxt | Express | Hono...), Vercel (AI SDK | Python | OpenAI HTTP)

### Security/compliance section
Dedicated area highlighting security measures, certifications, and compliance standards.
- *Variants:* Badge grid, with descriptions, linked to security page/trust center
- *Used well:* Linear (SOC 2, GDPR, HIPAA), PlanetScale (trust.planetscale.com link), Supabase (footer badges)

### Architecture diagram
Visual representation of system architecture or product topology.
- *Variants:* Flow diagram, infrastructure diagram, API flow
- *Used well:* PlanetScale (ASCII database architecture showing VTGate → Primary → Replica), Stripe (platform flow Buyers → Platform → Sellers)

### Roadmap display
Public product roadmap showing planned features.
- *Variants:* Timeline, kanban, quarter-based
- *Used well:* Linear (/now page)

### Changelog section
Recent updates and releases displayed on marketing page.
- *Variants:* Latest entry, list of recent, linked to full changelog
- *Used well:* Framer (Squircle announcement in nav), Linear (/now page)

### Version badge
Current version number display, often with release date.
- *Variants:* Badge, text, with changelog link
- *Used well:* Raycast ("v1.103.10 macOS 13+")

### Open source indicators
GitHub repo links, stars count, contribution stats for open source products.
- *Variants:* GitHub badge, stars counter, contributor avatars
- *Used well:* Supabase (92.7K stars in nav), Resend ("Powered by react-email, our open source component library")

### Community links
Links to Discord, Slack, or other community platforms.
- *Variants:* Button, badge with member count, icon links
- *Used well:* Raycast ("32k members" Slack, "80k followers" X/Twitter), Supabase (Discord CTA)

### Marketplace badges
AWS Marketplace, GCP Marketplace, or similar procurement platform badges.
- *Variants:* With pricing, linked to listing
- *Used well:* PlanetScale (AWS + GCP Marketplace badges)

---

## Background effects & animations

### Grid/dot pattern background
Subtle repeating pattern as section background.
- *Variants:* Grid lines, dots, combined, with fade
- *Libraries:* Aceternity UI Grid and Dot Backgrounds, Magic UI (Dot Pattern, Grid Pattern, Animated Grid Pattern, Flickering Grid, Retro Grid)

### Gradient background
Animated or static gradient as section backdrop.
- *Variants:* Two-color, multi-color, animated, radial, linear
- *Libraries:* Aceternity UI Background Gradient, Aceternity UI Gradient Animation, Magic UI Warp Background

### Aurora/northern lights
Subtle, flowing color effect resembling aurora borealis.
- *Libraries:* Aceternity UI Aurora Background, Magic UI Aurora Text

### Particle effects
Floating particle animation as background.
- *Libraries:* Magic UI Particles, Aceternity UI Sparkles

### Beam effects
Animated line/beam effects, often radiating or traveling across background.
- *Variants:* Multiple beams, collision effects, tracing scroll
- *Libraries:* Aceternity UI (Background Beams, Background Beams With Collision, Tracing Beam), Magic UI (Animated Beam, Border Beam)

### Spotlight effect
Light source that follows cursor or highlights specific elements.
- *Libraries:* Aceternity UI Spotlight, Aceternity UI Canvas Reveal Effect (like Clerk's site)

### Wave background
Animated wave pattern as section backdrop.
- *Libraries:* Aceternity UI Wavy Background, Magic UI Ripple

### Meteor effect
Animated meteors/shooting stars in background.
- *Libraries:* Aceternity UI Meteors, Aceternity UI Shooting Stars, Magic UI Meteors

### Lamp effect
Section header illumination effect popularized by Linear.
- *Libraries:* Aceternity UI Lamp Effect

### Vortex effect
Swirling, vortex-style background animation for CTA sections.
- *Libraries:* Aceternity UI Vortex

### Glowing border
Border glow effect that follows container or animates.
- *Libraries:* Aceternity UI Glowing Effect (like Cursor's site), Magic UI Shine Border, Luxe Button animated-border variant

### Moving border
Animated border traveling around container edge.
- *Libraries:* Aceternity UI Moving Border, Luxe Button rotate-border variant

---

## Text animations

### Typewriter effect
Text appearing character-by-character as if being typed.
- *Variants:* With cursor, with deletion, looping phrases
- *Libraries:* Aceternity UI Typewriter Effect, Magic UI Typing Animation, cult/ui Typewriter

### Text generate/reveal
Text words or characters fading/animating in sequentially.
- *Variants:* Fade in, slide up, blur reveal
- *Libraries:* Aceternity UI Text Generate Effect, Magic UI Text Reveal, Magic UI Blur Fade

### Flip words
Cycling through different words with flip animation.
- *Variants:* Vertical flip, horizontal slide, fade transition
- *Used well:* Linear (headline cycling through variants)
- *Libraries:* Aceternity UI Flip Words, Aceternity UI Container Text Flip, Magic UI Word Rotate

### Gradient text
Text with animated or static gradient fill.
- *Libraries:* Magic UI Animated Gradient Text, cult/ui Gradient Heading

### Shiny/shimmer text
Text with moving shine or shimmer effect.
- *Libraries:* Magic UI Animated Shiny Text, Magic UI Sparkles Text

### Number ticker/counter
Animated counting number, typically triggered on scroll into view.
- *Variants:* Count up, count down, with formatting
- *Libraries:* Magic UI Number Ticker, cult/ui Animated Number

### Morphing text
Text that smoothly transitions between different words.
- *Libraries:* Magic UI Morphing Text

### Encrypted text reveal
Text that appears to decrypt, showing random characters before revealing actual text.
- *Libraries:* Aceternity UI Encrypted Text

### Text rotate
Text rotating through list of words.
- *Libraries:* DaisyUI Text Rotate, Magic UI Word Rotate, Magic UI Spinning Text

### Hyper text
Hyperactive, energetic text animation effect.
- *Libraries:* Magic UI Hyper Text

### Video text
Text with video as fill/texture.
- *Libraries:* Magic UI Video Text

---

## 3D & globe components

### Interactive globe
3D Earth visualization showing global presence or data connections.
- *Variants:* With connection arcs, with markers, with activity pulses
- *Used well:* Vercel (globe with node activity pulses)
- *Libraries:* Aceternity UI GitHub Globe, Magic UI Globe

### World map
Flat map with animated markers or connection lines.
- *Libraries:* Magic UI Dotted Map, Aceternity UI World Map

### 3D pin/marker
Three-dimensional pin for location or product highlighting.
- *Libraries:* Aceternity UI 3D Pin

### 3D marquee
Three-dimensional carousel/marquee effect.
- *Libraries:* Aceternity UI 3D Marquee

### Icon cloud
Floating icons in three-dimensional arrangement.
- *Libraries:* Magic UI Icon Cloud

### Orbiting circles
Animated circles orbiting a center point, showing ecosystem or integrations.
- *Libraries:* Magic UI Orbiting Circles

---

## Cursor & pointer effects

### Custom cursor/pointer
Custom cursor design or animation following mouse.
- *Libraries:* Magic UI Pointer, Magic UI Smooth Cursor, Aceternity UI Following Pointer

### Pointer highlight
Effect highlighting text or elements at cursor position.
- *Libraries:* Aceternity UI Pointer Highlight

### Magnetic button
Button that attracts and follows cursor movement.
- *Libraries:* Luxe Button magnetic variant

### Tooltip card following cursor
Information card that follows mouse position on hover.
- *Libraries:* Aceternity UI Tooltip Card

---

## Scroll animations

### Parallax scroll
Elements moving at different speeds during scroll creating depth.
- *Libraries:* Aceternity UI Parallax Scroll

### Sticky scroll reveal
Content that sticks and reveals as user scrolls.
- *Libraries:* Aceternity UI Sticky Scroll Reveal

### Container scroll animation
3D rotation and transformation tied to scroll position.
- *Libraries:* Aceternity UI Container Scroll Animation

### Scroll progress indicator
Visual indicator of page scroll position.
- *Libraries:* Magic UI Scroll Progress

### Scroll-based velocity text
Text speed changing based on scroll velocity.
- *Libraries:* Magic UI Scroll Based Velocity

---

## Form components

### Input field
Standard text input with label and validation states.
- *Variants:* With icon, with addon, error state, disabled
- *Libraries:* shadcn/ui Input, DaisyUI Input field, ParkUI Input, Tremor Input, Luxe Input

### Input with vanishing placeholder
Input where placeholder text animates out on focus.
- *Libraries:* Aceternity UI Placeholders And Vanish Input

### Textarea
Multi-line text input.
- *Variants:* Auto-resize, with character count, with error state
- *Libraries:* shadcn/ui Textarea, DaisyUI Textarea, ParkUI Textarea, Tremor Textarea

### Select/dropdown
Single-selection dropdown input.
- *Variants:* Native, styled, searchable, with groups
- *Libraries:* shadcn/ui Select, Radix Select, DaisyUI Select, ParkUI Select, Tremor Select

### Checkbox
Binary selection control.
- *Variants:* With label, indeterminate state, error state
- *Libraries:* shadcn/ui Checkbox, Radix Checkbox, DaisyUI Checkbox, ParkUI Checkbox, Tremor Checkbox, Luxe Checkbox

### Radio group
Single selection from multiple options.
- *Variants:* Vertical, horizontal, card-style, with descriptions
- *Libraries:* shadcn/ui Radio Group, Radix Radio Group, DaisyUI Radio, ParkUI Radio Group, Tremor Radio Group

### Switch/toggle
Binary on/off control.
- *Variants:* With label, with icon, different sizes
- *Libraries:* shadcn/ui Switch, Radix Switch, DaisyUI Toggle, ParkUI Switch, Tremor Switch, Luxe Switch

### Slider/range
Value selection along a range.
- *Variants:* Single value, range, with marks, with tooltip
- *Libraries:* shadcn/ui Slider, Radix Slider, DaisyUI Range, ParkUI Slider, Tremor Slider

### OTP/PIN input
Multi-digit code input with individual boxes.
- *Variants:* 4-digit, 6-digit, with auto-focus advance
- *Libraries:* shadcn/ui Input OTP, Radix One-Time Password Field, ParkUI Pin Input, Luxe Input OTP

### File upload
File input with drag-and-drop support.
- *Variants:* Simple button, dropzone, with preview, with progress
- *Libraries:* ParkUI File Upload, Aceternity UI File Upload

### Color picker
Color selection interface.
- *Libraries:* ParkUI Color Picker, cult/ui Color Picker

### Date picker
Date selection interface with calendar.
- *Variants:* Single date, date range, with presets
- *Libraries:* shadcn/ui Date Picker, shadcn/ui Calendar, ParkUI Date Picker, Tremor Date Picker

### Rating input
Star rating selection.
- *Libraries:* DaisyUI Rating, ParkUI Rating Group

### Combobox
Searchable select with autocomplete.
- *Libraries:* shadcn/ui Combobox, ParkUI Combobox

---

## Platform-specific components

### Dynamic Island
Apple-inspired Dynamic Island component for notifications or status.
- *Libraries:* cult/ui Dynamic Island

### Stripe background guides
Decorative background guide lines inspired by Stripe's design.
- *Libraries:* cult/ui Stripe Bg Guides

### Confetti
Celebration animation for successful actions.
- *Libraries:* Magic UI Confetti

### Theme toggle
Dark/light mode switcher.
- *Variants:* Switch, button, system-aware
- *Libraries:* DaisyUI Theme Controller, Magic UI Animated Theme Toggler

### Countdown timer
Animated countdown to a specific date/time.
- *Variants:* Days/hours/minutes/seconds, compact, with labels
- *Libraries:* DaisyUI Countdown, cult/ui Timer

---

## Device & product mockups

### Safari browser frame
macOS Safari browser chrome for screenshots.
- *Libraries:* Magic UI Safari

### iPhone frame
iPhone device frame for mobile app screenshots.
- *Libraries:* DaisyUI Phone mockup, Magic UI iPhone

### Android frame
Android device frame for app screenshots.
- *Libraries:* Magic UI Android

### Browser mockup
Generic browser frame.
- *Libraries:* DaisyUI Browser mockup, cult/ui Browser Window

### Code editor mockup
IDE/code editor frame for code screenshots.
- *Libraries:* DaisyUI Code mockup

### Window mockup
OS window chrome frame.
- *Libraries:* DaisyUI Window mockup

---

## Summary statistics

| Category | Component Count |
|----------|----------------|
| Navigation & Structure | 18 |
| Hero Sections | 12 |
| Social Proof & Trust | 15 |
| Features & Benefits | 19 |
| Pricing | 6 |
| CTA Sections | 12 |
| Content Sections | 9 |
| Media & Visual | 16 |
| Data & Metrics | 10 |
| Interactive Elements | 14 |
| Utility Components | 21 |
| Specialized Marketing | 13 |
| Background Effects | 14 |
| Text Animations | 14 |
| 3D & Globe | 7 |
| Cursor Effects | 4 |
| Scroll Animations | 5 |
| Form Components | 17 |
| Platform-Specific | 5 |
| Device Mockups | 6 |
| **Total** | **247** |

This component library definition provides a complete foundation for building minimal/modern marketing sites. The components are drawn from both dedicated libraries (shadcn/ui, Aceternity UI, Magic UI) and patterns observed on gold-standard sites (Clerk, Linear, Vercel, Stripe). Priority should be given to the high-frequency patterns (headers, hero sections, feature grids, testimonials, CTAs) while selectively incorporating animation effects to create distinctive visual identity.