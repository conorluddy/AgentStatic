# Create New Partial

You are creating a new reusable partial (include) for AgentStatic.

**Arguments:** `$ARGUMENTS` may contain the partial name

## Step 1: Determine Partial Name

If `$ARGUMENTS` contains a name, use it. Otherwise, use AskUserQuestion to ask:
- What should this partial be called? (e.g., `card`, `modal`, `banner`)

The partial will be created as `partials/{name}.html` and used as `<include-{name}>`.

## Step 2: Gather Requirements

Use AskUserQuestion to ask:

1. **Purpose:** What does this partial do?
2. **Attributes:** What configurable values should it accept? (e.g., `title`, `href`, `icon`)
3. **Slots:** What content areas should be replaceable?
   - Default slot (children without `slot` attribute)
   - Named slots (e.g., `<slot name="actions">`)

## Step 3: Create Partial File

Create `partials/{name}.html` with:

1. **HTML comment** at top documenting usage:
```html
<!--
  include-{name}

  Attributes:
    - attributeName: Description (required/optional)

  Slots:
    - default: Description
    - slotName: Description

  Example:
    <include-{name} attributeName="value">
      <div slot="slotName">...</div>
      Default content here
    </include-{name}>
-->
```

2. **Partial markup** using:
   - `{{attributeName}}` for attribute placeholders (HTML-escaped)
   - `<slot>` for default content
   - `<slot name="x">Fallback</slot>` for named slots with fallbacks

## Example Partial Structure

```html
<!--
  include-card

  Attributes:
    - title: Card heading (required)
    - href: Link destination (optional)

  Slots:
    - default: Card body content
    - footer: Card footer actions
-->
<div class="card">
  <h3>{{title}}</h3>
  <div class="card-body">
    <slot>Default body content</slot>
  </div>
  <div class="card-footer">
    <slot name="footer"></slot>
  </div>
</div>
```

## Step 4: Confirm Creation

Report:
- File path created
- Available attributes
- Available slots
- Example usage snippet

---

**Start by determining the partial name from arguments or asking the user.**
