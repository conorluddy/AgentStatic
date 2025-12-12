---
title: Using Site Elements
description: A reference guide to all available custom elements
date: 2025-02-01
---

This template uses custom HTML elements styled with CSS. No JavaScript required—browsers render unknown tags and CSS styles them.

## Available Elements

### site-hero

Full-width hero section for your main headline.

```html
<site-hero variant="centered" theme="dark">
  <h1>Your Headline</h1>
  <p>Supporting text</p>
  <site-hero-actions>
    <a href="#" class="button">Primary Action</a>
    <a href="#" class="button-ghost">Secondary</a>
  </site-hero-actions>
</site-hero>
```

**Variants:** `centered` (default), `split`
**Themes:** `light` (default), `dark`

### site-features

Grid of feature cards.

```html
<site-features variant="3-col">
  <site-features-header>
    <h2>Features</h2>
    <p>Optional subhead</p>
  </site-features-header>

  <site-feature>
    <site-feature-icon>🚀</site-feature-icon>
    <h3>Feature Name</h3>
    <p>Feature description</p>
  </site-feature>
  <!-- more features -->
</site-features>
```

**Variants:** `2-col`, `3-col`, `4-col`

### site-pricing

Pricing tier comparison.

```html
<site-pricing>
  <site-pricing-header>
    <h2>Pricing</h2>
  </site-pricing-header>

  <site-pricing-tier>
    <h3>Free</h3>
    <site-pricing-price>
      <span class="amount">$0</span>
      <span class="period">/month</span>
    </site-pricing-price>
    <ul>
      <li>Feature one</li>
      <li>Feature two</li>
    </ul>
    <a href="#" class="button">Get Started</a>
  </site-pricing-tier>

  <site-pricing-tier featured>
    <!-- highlighted tier -->
  </site-pricing-tier>
</site-pricing>
```

Add `featured` attribute to highlight a tier.

### site-faq

FAQ section using native `<details>` for accordion behavior.

```html
<site-faq>
  <site-faq-header>
    <h2>FAQ</h2>
  </site-faq-header>

  <details>
    <summary>Question text?</summary>
    <p>Answer text.</p>
  </details>
</site-faq>
```

### site-cta

Call-to-action section.

```html
<site-cta theme="dark">
  <h2>Ready to start?</h2>
  <p>Supporting text</p>
  <site-cta-actions>
    <a href="#" class="button">Primary Action</a>
  </site-cta-actions>
</site-cta>
```

**Themes:** `light` (default), `dark`

## Button Classes

Three button styles available:

- `.button` — Solid primary color
- `.button-ghost` — Outlined
- `.button-text` — Text only

```html
<a href="#" class="button">Solid Button</a>
<a href="#" class="button-ghost">Ghost Button</a>
<a href="#" class="button-text">Text Button</a>
```

## Learn More

Check `elements/*/README.md` for detailed documentation on each element.
