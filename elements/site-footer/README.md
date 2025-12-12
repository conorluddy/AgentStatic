# site-footer

Page footer with brand, links, and legal sections.

## Usage

```html
<site-footer>
  <site-footer-brand>
    <img src="/logo.svg" alt="Acme" />
    <p>Building the future.</p>
  </site-footer-brand>

  <site-footer-links>
    <nav>
      <h4>Product</h4>
      <a href="/features">Features</a>
      <a href="/pricing">Pricing</a>
    </nav>
    <nav>
      <h4>Company</h4>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
    </nav>
    <nav>
      <h4>Legal</h4>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </nav>
  </site-footer-links>

  <site-footer-legal>
    <p>&copy; 2025 Acme Inc. All rights reserved.</p>
  </site-footer-legal>
</site-footer>
```

## Child Elements

- `site-footer-brand` — Logo and tagline
- `site-footer-links` — Navigation link columns
- `site-footer-legal` — Copyright and legal text

## Notes

- Dark background by default
- Logo automatically inverted to white
- Responsive grid layout (2 columns on desktop)
