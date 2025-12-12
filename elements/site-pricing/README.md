# site-pricing

Pricing table section for displaying pricing tiers.

## Usage

```html
<site-pricing>
  <site-pricing-header>
    <h2>Simple pricing</h2>
    <p>No hidden fees.</p>
  </site-pricing-header>

  <site-pricing-tier>
    <h3>Starter</h3>
    <site-pricing-price>
      <span class="amount">$9</span>
      <span class="period">/month</span>
    </site-pricing-price>
    <ul>
      <li>5 projects</li>
      <li>Basic support</li>
    </ul>
    <a href="/signup?plan=starter" class="button-ghost">Get Started</a>
  </site-pricing-tier>

  <site-pricing-tier featured>
    <h3>Pro</h3>
    <site-pricing-price>
      <span class="amount">$29</span>
      <span class="period">/month</span>
    </site-pricing-price>
    <ul>
      <li>Unlimited projects</li>
      <li>Priority support</li>
    </ul>
    <a href="/signup?plan=pro" class="button">Get Started</a>
  </site-pricing-tier>
</site-pricing>
```

## Variants

| Attribute | Description |
|-----------|-------------|
| `featured` | Highlights the tier with accent border and shadow |

## Child Elements

- `site-pricing-header` — Section header
- `site-pricing-tier` — Individual pricing card
- `site-pricing-price` — Price display with `.amount` and `.period`
