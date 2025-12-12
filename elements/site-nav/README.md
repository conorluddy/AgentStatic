# site-nav

Site navigation header with logo, links, and actions.

## Usage

```html
<site-nav>
  <a href="/" class="site-nav-logo">
    <img src="/logo.svg" alt="Acme" />
  </a>
  <nav>
    <a href="/features">Features</a>
    <a href="/pricing">Pricing</a>
    <a href="/about">About</a>
  </nav>
  <site-nav-actions>
    <a href="/login" class="button-ghost">Log In</a>
    <a href="/signup" class="button">Sign Up</a>
  </site-nav-actions>
</site-nav>
```

## Child Elements

- `.site-nav-logo` — Logo link container
- `nav` — Navigation links
- `site-nav-actions` — CTA buttons

## Behavior

- Sticky positioning (stays at top on scroll)
- Nav links hidden on mobile (< 768px)
