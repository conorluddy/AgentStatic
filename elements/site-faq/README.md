# site-faq

FAQ accordion section using native `<details>` and `<summary>` elements.

## Usage

```html
<site-faq>
  <site-faq-header>
    <h2>Frequently Asked Questions</h2>
  </site-faq-header>

  <details>
    <summary>How does billing work?</summary>
    <p>We bill monthly. Cancel anytime.</p>
  </details>

  <details>
    <summary>Can I change plans?</summary>
    <p>Yes, upgrade or downgrade at any time.</p>
  </details>

  <details>
    <summary>Is there a free trial?</summary>
    <p>Yes, 14 days free on all plans.</p>
  </details>
</site-faq>
```

## Features

- Uses native `<details>` / `<summary>` for JS-free accordion
- Custom styling for open/closed indicator
- Accessible by default

## Child Elements

- `site-faq-header` — Section header
- `details` — Individual FAQ item
- `summary` — Question (clickable)
- `p` — Answer content
