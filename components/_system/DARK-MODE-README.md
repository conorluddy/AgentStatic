# Dark Mode Infrastructure

**Status**: ✅ Complete (Issue #56)
**Phase**: 1 - Design System Foundation
**Files**: `dark-mode.css`, `dark-mode-toggle.js`

---

## Overview

AgentStatic's dark mode infrastructure uses a **pure CSS approach** with minimal vanilla JavaScript for toggle functionality. The architecture prioritizes:

1. **System preference respect**: Automatically adapts to OS dark mode settings
2. **User override**: Manual toggle that persists across sessions
3. **No FOUC**: Flash of Unstyled Content prevented via inline script
4. **Progressive enhancement**: Works without JavaScript (system preference only)
5. **Performance**: Zero runtime CSS computation, pure variable switching

---

## Architecture

### 1. CSS Variable System (`dark-mode.css`)

All color tokens are defined as CSS custom properties (variables) in three contexts:

```css
/* Default: Light mode */
:root {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
  /* ... more tokens */
}

/* System preference: Dark mode */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-background: #0f172a;
    --color-text: #f9fafb;
    /* ... more tokens */
  }
}

/* Manual override: Dark mode */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-text: #f9fafb;
  /* ... more tokens */
}

/* Manual override: Light mode */
[data-theme="light"] {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
  /* ... more tokens */
}
```

**Token Categories**:
- Core semantic colors (text, background, surface, borders)
- Interactive states (hover, focus, active)
- Status colors (success, error, warning, info)
- Shadow definitions

### 2. JavaScript Toggle (`dark-mode-toggle.js`)

Minimal vanilla JavaScript handles three responsibilities:

1. **FOUC Prevention** (runs immediately in `<head>`):
   - Checks localStorage for saved preference
   - Falls back to system preference if none saved
   - Sets `data-theme` attribute before page renders

2. **Toggle Functionality** (runs after DOM loads):
   - Binds click handlers to `[data-theme-toggle]` buttons
   - Toggles between light/dark themes
   - Updates ARIA attributes for accessibility

3. **localStorage Persistence**:
   - Saves user preference across sessions
   - Handles privacy mode gracefully (fails silently)

---

## Usage

### Basic Implementation

#### 1. Include CSS
```html
<link rel="stylesheet" href="/components/_system/dark-mode.css">
```

#### 2. Include JavaScript (inline in `<head>`)
```html
<head>
  <!-- Prevent FOUC - must be inline and in head -->
  <script src="/components/_scripts/dark-mode-toggle.js"></script>
</head>
```

#### 3. Add Toggle Button (anywhere in body)
```html
<button
  type="button"
  data-theme-toggle
  aria-label="Toggle dark mode"
  aria-pressed="false"
>
  <!-- Icon or text -->
  <svg><!-- sun icon --></svg>
  <svg><!-- moon icon --></svg>
</button>
```

### Advanced Usage

#### Programmatic Theme Control
```javascript
// Set theme
window.AgentStatic.theme.set('dark');

// Get current theme
const current = window.AgentStatic.theme.get(); // 'light' or 'dark'

// Toggle theme
const newTheme = window.AgentStatic.theme.toggle(); // Returns new theme
```

#### React to Theme Changes
```javascript
document.documentElement.addEventListener('themechange', (event) => {
  console.log('Theme changed to:', event.detail.theme);
  // Update UI, reload images, etc.
});
```

#### Component-Specific Styles
```css
.my-component {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/* No dark mode overrides needed - tokens handle it! */
```

---

## Color Tokens Reference

### Core Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-text` | `#1a1a1a` | `#f9fafb` | Primary text |
| `--color-text-secondary` | `#4a4a4a` | `#d1d5db` | Secondary text |
| `--color-text-tertiary` | `#737373` | `#9ca3af` | Tertiary text |
| `--color-text-inverse` | `#ffffff` | `#1a1a1a` | Text on opposite background |
| `--color-background` | `#ffffff` | `#0f172a` | Page background |
| `--color-background-secondary` | `#f9fafb` | `#1e293b` | Section backgrounds |
| `--color-surface` | `#ffffff` | `#1e293b` | Cards, panels |
| `--color-surface-elevated` | `#ffffff` | `#334155` | Modals, dropdowns |
| `--color-surface-alt` | `#f3f4f6` | `#334155` | Alternate surfaces |
| `--color-border` | `#e5e7eb` | `#334155` | Standard borders |
| `--color-border-strong` | `#d1d5db` | `#475569` | Emphasized borders |
| `--color-border-subtle` | `#f3f4f6` | `#1e293b` | Subtle borders |
| `--color-divider` | `#e5e7eb` | `#334155` | Dividing lines |

### Interactive States

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-hover` | `#f9fafb` | `#334155` | Hover background |
| `--color-focus` | `rgba(59,130,246,0.1)` | `rgba(59,130,246,0.2)` | Focus ring background |
| `--color-active` | `#f3f4f6` | `#475569` | Active/pressed state |

### Status Colors

Each status color has three variants: base, background, text

| Base Token | Light Mode | Dark Mode | Usage |
|------------|------------|-----------|-------|
| `--color-success` | `#10b981` | `#34d399` | Success indicators |
| `--color-error` | `#ef4444` | `#f87171` | Error indicators |
| `--color-warning` | `#f59e0b` | `#fbbf24` | Warning indicators |
| `--color-info` | `#3b82f6` | `#60a5fa` | Info indicators |

### Shadows

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--shadow-sm` | `rgba(0,0,0,0.05)` | `rgba(0,0,0,0.3)` |
| `--shadow-md` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.4)` |
| `--shadow-lg` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.4)` |
| `--shadow-xl` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.5)` |

---

## Implementation Details

### Priority Cascade

The theme application follows this priority:

1. **Explicit `data-theme` attribute** (highest priority)
   - `[data-theme="dark"]` → Dark mode
   - `[data-theme="light"]` → Light mode

2. **System preference** (medium priority)
   - `@media (prefers-color-scheme: dark)` → Dark mode
   - Only applies if no explicit `data-theme` set

3. **Default** (lowest priority)
   - `:root` defaults → Light mode

### FOUC Prevention Strategy

The script must run **before** the page renders to prevent a flash of incorrect theme:

```html
<head>
  <!-- Critical: inline before any content renders -->
  <script>
    (function() {
      const stored = localStorage.getItem('theme');
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (system ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>

  <!-- Rest of head content -->
</head>
```

### Smooth Transitions

Theme changes animate smoothly via CSS transitions:

```css
:root,
*,
*::before,
*::after {
  transition-property: background-color, color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  :root,
  *,
  *::before,
  *::after {
    transition-duration: 0ms !important;
  }
}
```

### Accessibility Features

1. **ARIA Attributes**: Toggle buttons use `aria-pressed` to indicate state
2. **Keyboard Navigation**: All toggle buttons are focusable and keyboard-accessible
3. **Color Scheme Metadata**: `color-scheme: light dark` informs browser about support
4. **Reduced Motion**: Respects `prefers-reduced-motion` for animations
5. **Semantic Labels**: `aria-label` provides clear purpose to screen readers

---

## Browser Support

### CSS Features
- CSS Custom Properties (variables)
- `@media (prefers-color-scheme)` media query
- Attribute selectors (`[data-theme]`)
- `color-scheme` property
- CSS transitions

**Support**: All modern browsers (Chrome 76+, Firefox 67+, Safari 12.1+, Edge 79+)

### JavaScript Features
- localStorage API
- window.matchMedia API
- CustomEvent API
- addEventListener
- querySelector/querySelectorAll

**Support**: All modern browsers (IE11 not supported, but degrades gracefully)

### Graceful Degradation

Without JavaScript:
- ✅ System preference detection still works (pure CSS)
- ❌ Manual toggle not available
- ❌ Preference persistence not available

With JavaScript disabled in localStorage (privacy mode):
- ✅ Theme toggle still works (via data attribute)
- ❌ Preference doesn't persist across sessions
- ✅ Falls back to system preference on reload

---

## Testing Checklist

### Manual Testing

- [ ] **Light mode**: Default state shows light theme
- [ ] **Dark mode**: Toggle switches to dark theme
- [ ] **Persistence**: Reload page, theme persists
- [ ] **System preference**: OS dark mode triggers dark theme automatically
- [ ] **Manual override**: Toggle overrides system preference
- [ ] **Clear storage**: Clear localStorage, falls back to system preference
- [ ] **No FOUC**: No flash when loading page
- [ ] **Transitions**: Smooth color transitions (150ms)
- [ ] **Reduced motion**: No transitions with prefers-reduced-motion
- [ ] **Multiple toggles**: Multiple buttons on page sync correctly
- [ ] **ARIA states**: aria-pressed reflects theme state
- [ ] **Keyboard access**: Toggle works with keyboard (Enter/Space)
- [ ] **Screen reader**: Toggle announces state correctly

### Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

### Edge Cases

- [ ] **Incognito mode**: Fails gracefully when localStorage blocked
- [ ] **No JavaScript**: System preference still works
- [ ] **Rapid toggling**: No race conditions or flashing
- [ ] **Programmatic changes**: window.AgentStatic.theme.set() works
- [ ] **Custom events**: themechange event fires correctly

---

## Performance Characteristics

### Bundle Size
- **CSS**: ~5KB uncompressed (~1.5KB gzipped)
- **JavaScript**: ~4KB uncompressed (~1.2KB gzipped)
- **Total**: ~9KB uncompressed (~2.7KB gzipped)

### Runtime Performance
- **Zero CSS recalculation**: Pure variable switching, no style recomputation
- **Minimal DOM operations**: Only attribute changes, no element manipulation
- **Event listeners**: One per toggle button + one media query listener
- **localStorage operations**: Read on init, write on toggle (both async-safe)

### Critical Rendering Path
- **Inline script**: ~100 lines (~2KB) inline in head (prevents FOUC)
- **Blocking**: Minimal blocking (< 1ms execution time)
- **Trade-off**: Small inline script prevents larger FOUC visual issue

---

## Future Enhancements (Optional)

Potential improvements for future phases:

1. **Auto theme switching**: Switch at sunrise/sunset based on location
2. **Theme customization**: Allow users to customize colors within themes
3. **Accent color picker**: Let users choose primary color in both themes
4. **Preview mode**: Live preview theme before applying
5. **Scheduled themes**: Different themes for different times of day
6. **Contrast modes**: High contrast variants for accessibility
7. **Color blind modes**: Specialized palettes for color vision deficiency

These are NOT required for Phase 1 completion but may be considered in Phase 4 (Polish & Enhancement).

---

## Troubleshooting

### Issue: Flash of incorrect theme on load

**Cause**: Script running after page render
**Solution**: Move script to `<head>` and make it inline

### Issue: Theme doesn't persist across sessions

**Cause**: localStorage blocked or privacy mode
**Solution**: This is expected behavior - theme will work but not persist

### Issue: Toggle button not working

**Cause**: Missing `data-theme-toggle` attribute
**Solution**: Add attribute to button element

### Issue: Multiple toggles out of sync

**Cause**: ARIA state not updating on all buttons
**Solution**: Script automatically syncs all buttons - check console for errors

### Issue: Dark mode colors wrong

**Cause**: Component using hardcoded colors instead of tokens
**Solution**: Replace hardcoded colors with CSS variables

### Issue: Transitions too slow/fast

**Cause**: transition-duration setting
**Solution**: Adjust `transition-duration` in dark-mode.css (currently 150ms)

---

## Related Documentation

- **Design Tokens**: See `components/_system/tokens.css` (when created)
- **CSS Architecture**: See Issue #55 for cascade layer definitions
- **Component Guidelines**: See `CODESTYLE.md` Section 10
- **Phase 1 Spec**: See `.archive/PLANNING/phases/PHASE-01-DESIGN-SYSTEM.md`

---

## Questions or Issues

For problems with dark mode implementation:

1. Check browser console for JavaScript errors
2. Verify `data-theme` attribute is set on `<html>` element
3. Confirm CSS variables are loaded (inspect element in DevTools)
4. Test with JavaScript disabled (system preference should still work)
5. Clear localStorage and test fallback behavior

Report issues to GitHub issue tracker referencing #56.
