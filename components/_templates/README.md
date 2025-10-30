# Component Templates

This directory contains template files for creating new AgentStatic components.

## Templates

- **`atom.template/`**: Template for atomic components (buttons, inputs, headings)
- **`molecule.template/`**: Template for molecular components (cards, form groups)
- **`organism.template/`**: Template for organism components (headers, heroes, footers)

## Usage

### Automatic (Recommended)

Use the component generator script:

```bash
# Create an atom
node scripts/new-component.js atom button

# Create a molecule
node scripts/new-component.js molecule card

# Create an organism
node scripts/new-component.js organism hero-section
```

The script will:
1. Copy the appropriate template
2. Replace all placeholders with your component name
3. Rename files to match the component
4. Place it in the correct directory

### Manual

If you need to manually copy a template:

1. Copy the template directory:
   ```bash
   cp -r components/_templates/atom.template components/atoms/button
   ```

2. Rename all files from `component.*` to `<your-component>.*`:
   ```bash
   cd components/atoms/button
   for file in component.*; do
     mv "$file" "button.${file#component.}"
   done
   ```

3. Replace placeholders in all files:
   - `COMPONENT_NAME_KEBAB` → Your component name in kebab-case (e.g., `button`, `hero-section`)
   - `COMPONENT_NAME_PASCAL` → Your component name in PascalCase (e.g., `Button`, `HeroSection`)
   - `COMPONENT_NAME_CAMEL` → Your component name in camelCase (e.g., `button`, `heroSection`)
   - `COMPONENT_TYPE` → Component type (`atom`, `molecule`, or `organism`)

## Template Structure

Each template contains:

- **`component.css`**: CSS styles with component-scoped naming (NOT BEM)
- **`component.njk`**: Nunjucks template macro
- **`component.schema.json`**: JSON Schema with rich metadata
- **`component.stories.ts`**: Storybook stories
- **`README.md`**: Component documentation

## Naming Convention

AgentStatic uses **component-scoped flat naming**, NOT BEM:

```css
/* ✅ Component-Scoped (Use this) */
.button { }
.button-text { }
.button-icon { }
.button-primary { }
.button-lg { }

/* ❌ BEM Syntax (Don't use) */
.button { }
.button__text { }
.button__icon { }
.button--primary { }
.button--large { }
```

## Key Principles

1. **Pure CSS**: No preprocessors (Sass, Less, etc.)
2. **Design Tokens**: Use CSS custom properties from `_system/tokens.css`
3. **Cascade Layers**: All styles in `@layer components`
4. **Accessibility**: WCAG AA compliance required
5. **Responsive**: Mobile-first design
6. **Dark Mode**: Automatic support via semantic tokens

## Template Differences

### Atom Template
- Single-purpose components
- No dependencies on other components
- Simple props
- Minimal complexity

### Molecule Template
- Combines 2-5 atoms
- Functional grouping
- Moderate complexity
- Header/body/footer structure

### Organism Template
- Complex page sections
- 12-column grid layout
- Multiple layout patterns
- Full responsive support

## Examples

### Create a Button Atom

```bash
node scripts/new-component.js atom button
```

Result:
```
components/atoms/button/
├── button.css
├── button.njk
├── button.schema.json
├── button.stories.ts
└── README.md
```

### Create a Card Molecule

```bash
node scripts/new-component.js molecule card
```

Result:
```
components/molecules/card/
├── card.css
├── card.njk
├── card.schema.json
├── card.stories.ts
└── README.md
```

### Create a Hero Organism

```bash
node scripts/new-component.js organism hero-section
```

Result:
```
components/organisms/hero-section/
├── hero-section.css
├── hero-section.njk
├── hero-section.schema.json
├── hero-section.stories.ts
└── README.md
```

## After Creating a Component

1. **Customize the CSS**: Edit component styles using design tokens
2. **Update the template**: Modify the Nunjucks macro structure and props
3. **Define the schema**: Add component-specific props and metadata
4. **Create stories**: Add Storybook stories for all variants
5. **Write documentation**: Document usage, props, and examples in README
6. **Test**: Verify accessibility, responsiveness, and dark mode

## Help

For detailed guidance, see:
- `/components/COMPONENT-GUIDE.md` - Complete component development guide
- `/CODESTYLE.md` - Code style guide
- `/SPEC/PILLAR-1-COMPONENTS/` - Component specifications

## Troubleshooting

### Script not working?

Ensure it's executable:
```bash
chmod +x scripts/new-component.js
```

### Placeholders not replaced?

Check that you're using the generator script. Manual copying requires manual replacement.

### Need to modify templates?

Edit the template files directly in `_templates/`. Future components will use the updated templates.
