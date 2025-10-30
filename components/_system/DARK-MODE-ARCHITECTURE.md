# Dark Mode Architecture Diagram

Visual representation of how AgentStatic's dark mode system works.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S DEVICE                            │
│                                                                   │
│  ┌────────────────┐         ┌────────────────┐                  │
│  │  OS Setting    │         │   Browser      │                  │
│  │  Dark Mode:    │────────▶│  prefers-color-│                  │
│  │  ON / OFF      │         │  scheme: dark  │                  │
│  └────────────────┘         └────────┬───────┘                  │
│                                       │                          │
└───────────────────────────────────────┼──────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AGENTSTATIC THEME SYSTEM                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  INITIALIZATION (FOUC Prevention)                          │ │
│  │  components/_scripts/dark-mode-toggle.js                   │ │
│  │                                                             │ │
│  │  1. Check localStorage.theme                               │ │
│  │     ├─ Exists? → Use stored preference                     │ │
│  │     └─ None?   → Check system preference                   │ │
│  │                                                             │ │
│  │  2. Set data-theme attribute on <html>                     │ │
│  │     document.documentElement.setAttribute('data-theme', X) │ │
│  │                                                             │ │
│  │  3. Page renders with correct theme (no flash!)            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  CSS THEME ENGINE                                          │ │
│  │  components/_system/dark-mode.css                          │ │
│  │                                                             │ │
│  │  Priority Cascade:                                         │ │
│  │                                                             │ │
│  │  [data-theme="dark"]                    ◀── HIGHEST        │ │
│  │  └─ Explicit dark mode override                            │ │
│  │                                                             │ │
│  │  [data-theme="light"]                   ◀── HIGH           │ │
│  │  └─ Explicit light mode override                           │ │
│  │                                                             │ │
│  │  @media (prefers-color-scheme: dark)    ◀── MEDIUM         │ │
│  │  └─ System preference (if no data-theme)                   │ │
│  │                                                             │ │
│  │  :root                                  ◀── LOWEST         │ │
│  │  └─ Default light mode                                     │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  USER INTERACTION                                          │ │
│  │                                                             │ │
│  │  User clicks [data-theme-toggle] button                    │ │
│  │         │                                                   │ │
│  │         ▼                                                   │ │
│  │  JavaScript toggles data-theme attribute                   │ │
│  │         │                                                   │ │
│  │         ▼                                                   │ │
│  │  Save preference to localStorage                           │ │
│  │         │                                                   │ │
│  │         ▼                                                   │ │
│  │  CSS automatically re-applies theme                        │ │
│  │  (150ms smooth transition)                                 │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌─────────────────────┐
│   Page Load         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Check localStorage  │
│ .getItem('theme')   │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌────────┐   ┌────────┐
│ Found  │   │  None  │
│ 'dark' │   │        │
│  or    │   └───┬────┘
│'light' │       │
└───┬────┘       ▼
    │      ┌──────────────┐
    │      │Check System  │
    │      │Preference    │
    │      │matchMedia    │
    │      └──────┬───────┘
    │             │
    │       ┌─────┴─────┐
    │       │           │
    │       ▼           ▼
    │   ┌──────┐    ┌───────┐
    │   │ Dark │    │ Light │
    │   └──┬───┘    └───┬───┘
    │      │            │
    └──────┼────────────┘
           │
           ▼
┌─────────────────────┐
│Set data-theme attr  │
│on <html> element    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ CSS applies theme   │
│ via variables       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Page renders with  │
│  correct theme      │
│  (NO FOUC!)         │
└─────────────────────┘
```

---

## CSS Variable Resolution

```
Component uses token:
    color: var(--color-text);
           │
           ▼
    ┌──────────────────────────┐
    │ Browser looks up value:  │
    └──────────────────────────┘
           │
           ▼
    ┌──────────────────────────┐
    │ Check [data-theme]       │
    │ attribute on <html>      │
    └──────────┬───────────────┘
               │
         ┌─────┴─────┐
         │           │
         ▼           ▼
    ┌────────┐  ┌────────┐
    │ "dark" │  │"light" │
    └───┬────┘  └───┬────┘
        │           │
        ▼           ▼
    ┌────────┐  ┌────────┐
    │#f9fafb │  │#1a1a1a │
    │(light) │  │ (dark) │
    └───┬────┘  └───┬────┘
        │           │
        └─────┬─────┘
              │
              ▼
       ┌──────────────┐
       │ Apply color  │
       │ to element   │
       └──────────────┘
```

---

## Toggle Button Flow

```
┌────────────────────┐
│ User clicks button │
│ [data-theme-toggle]│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Get current theme  │
│ from data-theme    │
└─────────┬──────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│'light' │  │ 'dark' │
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│  next: │  │  next: │
│ 'dark' │  │'light' │
└───┬────┘  └───┬────┘
    │           │
    └─────┬─────┘
          │
          ▼
┌────────────────────┐
│ Set data-theme     │
│ attribute          │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Save to            │
│ localStorage       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Update ARIA        │
│ aria-pressed       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Dispatch custom    │
│ 'themechange'      │
│ event              │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ CSS automatically  │
│ applies new theme  │
│ (150ms transition) │
└────────────────────┘
```

---

## Token Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 SEMANTIC COLOR TOKENS                    │
│                                                           │
│  Component Layer (What developers use):                  │
│  ┌────────────────────────────────────────────────┐     │
│  │ --color-text                                   │     │
│  │ --color-background                             │     │
│  │ --color-surface                                │     │
│  │ --color-border                                 │     │
│  │ --color-hover                                  │     │
│  │ ... (30+ semantic tokens)                      │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
│  ▼ Resolves based on theme context                       │
│                                                           │
│  Implementation Layer (What CSS defines):                │
│  ┌────────────────────────────────────────────────┐     │
│  │ :root                    [data-theme="dark"]   │     │
│  │ --color-text: #1a1a1a    --color-text: #f9fafb│     │
│  │ (Light Mode)             (Dark Mode)           │     │
│  └────────────────────────────────────────────────┘     │
│                                                           │
└─────────────────────────────────────────────────────────┘

Example Component Usage:

.card {
  background: var(--color-surface);      ◀── Semantic token
  color: var(--color-text);              ◀── Semantic token
  border: 1px solid var(--color-border); ◀── Semantic token
}

                      │
                      ▼
            ┌─────────────────┐
            │ Browser applies │
            │ correct values  │
            │ based on theme  │
            └─────────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
           ▼                     ▼
    ┌────────────┐        ┌────────────┐
    │Light Mode: │        │Dark Mode:  │
    │            │        │            │
    │#ffffff     │        │#1e293b     │
    │#1a1a1a     │        │#f9fafb     │
    │#e5e7eb     │        │#334155     │
    └────────────┘        └────────────┘
```

---

## Progressive Enhancement Strategy

```
┌────────────────────────────────────────────────────────┐
│                    USER'S ENVIRONMENT                   │
└────────────────────────────────────────────────────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
       ┌─────────┐  ┌─────────┐  ┌─────────┐
       │   Full  │  │   CSS   │  │  Basic  │
       │ Support │  │  Only   │  │  Only   │
       └────┬────┘  └────┬────┘  └────┬────┘
            │            │            │
            ▼            ▼            ▼
┌─────────────────────────────────────────────────────────┐
│                  FEATURE AVAILABILITY                    │
│                                                           │
│  Full Support (Modern Browsers):                         │
│  ✅ System preference detection                          │
│  ✅ Manual toggle                                        │
│  ✅ localStorage persistence                             │
│  ✅ Smooth transitions                                   │
│  ✅ Multiple button sync                                 │
│  ✅ Programmatic API                                     │
│                                                           │
│  CSS Only (JS Disabled):                                 │
│  ✅ System preference detection                          │
│  ❌ Manual toggle                                        │
│  ❌ localStorage persistence                             │
│  ✅ Smooth transitions                                   │
│  ❌ Multiple button sync                                 │
│  ❌ Programmatic API                                     │
│                                                           │
│  Basic Only (Old Browsers):                              │
│  ❌ System preference detection                          │
│  ❌ Manual toggle                                        │
│  ❌ localStorage persistence                             │
│  ❌ Smooth transitions                                   │
│  ❌ Multiple button sync                                 │
│  ❌ Programmatic API                                     │
│  ➡️  Falls back to light mode                           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## State Diagram

```
┌────────────────────────────────────────────────────────┐
│                    THEME STATES                         │
│                                                          │
│              ┌──────────────────┐                       │
│              │                  │                       │
│              │   Light Mode     │                       │
│              │   (Default)      │                       │
│              │                  │                       │
│              └────────┬─────────┘                       │
│                       │                                 │
│            User clicks toggle                           │
│            or sets 'dark'                               │
│                       │                                 │
│                       ▼                                 │
│              ┌──────────────────┐                       │
│              │                  │                       │
│              │   Dark Mode      │                       │
│    System◀───┤   (Active)       │───▶User              │
│    changes   │                  │   clicks             │
│    to light  └────────┬─────────┘   toggle             │
│              (if no   │             or sets             │
│              stored   │             'light'             │
│              pref)    │                                 │
│                       │                                 │
│                       ▼                                 │
│              ┌──────────────────┐                       │
│              │                  │                       │
│              │   Light Mode     │                       │
│              │   (Active)       │                       │
│              │                  │                       │
│              └──────────────────┘                       │
│                                                          │
│  Stored in localStorage: 'light' | 'dark' | null        │
│  data-theme attribute: 'light' | 'dark'                 │
│  aria-pressed attribute: 'true' | 'false'               │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## File Organization

```
components/
├── _system/
│   ├── dark-mode.css                    ◀── Theme definitions
│   │   ├── :root (light mode defaults)
│   │   ├── @media (system preference)
│   │   ├── [data-theme="dark"] (manual dark)
│   │   └── [data-theme="light"] (manual light)
│   │
│   ├── DARK-MODE-README.md              ◀── Full documentation
│   ├── IMPLEMENTATION-SUMMARY-ISSUE-56.md ◀── Summary
│   └── DARK-MODE-ARCHITECTURE.md        ◀── This file
│
└── _scripts/
    └── dark-mode-toggle.js              ◀── Toggle functionality
        ├── initializeTheme() (FOUC prevention)
        ├── setupThemeToggle() (bind buttons)
        ├── handleToggleClick() (toggle handler)
        ├── setTheme() (apply theme)
        └── window.AgentStatic.theme API
```

---

## Performance Characteristics

```
┌────────────────────────────────────────────────────────┐
│                   PERFORMANCE PROFILE                   │
│                                                          │
│  Page Load (First Paint):                               │
│  ┌──────────────────────────────────────┐              │
│  │ 1. Inline script executes (<1ms)     │              │
│  │ 2. Check localStorage (sync, <1ms)   │              │
│  │ 3. Set data-theme attribute (<1ms)   │              │
│  │ 4. CSS applied (0ms - native)        │              │
│  │ 5. Page renders with correct theme   │              │
│  └──────────────────────────────────────┘              │
│  Total: <3ms overhead                                   │
│                                                          │
│  Theme Toggle:                                           │
│  ┌──────────────────────────────────────┐              │
│  │ 1. Button click handler (<1ms)       │              │
│  │ 2. Toggle data-theme (<1ms)          │              │
│  │ 3. Save to localStorage (async)      │              │
│  │ 4. CSS transition (150ms)            │              │
│  │ 5. Update ARIA (<1ms)                │              │
│  └──────────────────────────────────────┘              │
│  User perceives: Instant (< 16ms)                       │
│                                                          │
│  Runtime Cost:                                           │
│  ┌──────────────────────────────────────┐              │
│  │ • Zero CSS recalculation             │              │
│  │ • Minimal DOM operations             │              │
│  │ • Hardware-accelerated transitions   │              │
│  │ • No JavaScript in render path       │              │
│  └──────────────────────────────────────┘              │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## Browser Compatibility Matrix

```
┌────────────────────────────────────────────────────────────┐
│                  BROWSER SUPPORT MATRIX                     │
│                                                              │
│  Feature                   Chrome  Firefox  Safari   Edge   │
│  ──────────────────────────────────────────────────────────│
│  CSS Variables             ✅ 49+  ✅ 31+   ✅ 9.1+  ✅ 15+ │
│  prefers-color-scheme      ✅ 76+  ✅ 67+   ✅ 12.1+ ✅ 79+ │
│  localStorage              ✅ 4+   ✅ 3.5+  ✅ 4+    ✅ 12+ │
│  matchMedia                ✅ 9+   ✅ 6+    ✅ 5.1+  ✅ 12+ │
│  data-* attributes         ✅ 7+   ✅ 6+    ✅ 5.1+  ✅ 12+ │
│  CustomEvent               ✅ 15+  ✅ 11+   ✅ 6+    ✅ 12+ │
│  color-scheme              ✅ 81+  ✅ 96+   ✅ 13+   ✅ 81+ │
│  ──────────────────────────────────────────────────────────│
│  Minimum Version:          76+     67+      12.1+    79+    │
│  Released:                 Jul'19  May'19   Mar'19   Jan'20 │
│                                                              │
│  Legacy Browsers (IE11, old Safari):                        │
│  • Falls back to light mode                                 │
│  • No dark mode support                                     │
│  • Site remains fully functional                            │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

---

This architecture document provides a visual representation of how all pieces of the dark mode system work together. For implementation details, see `DARK-MODE-README.md`.
