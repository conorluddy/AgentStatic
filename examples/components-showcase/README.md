# 🧩 Component Showcase

An advanced collection of AgentStatic TypeScript partials demonstrating sophisticated patterns, interactive elements,
and media handling capabilities.

## 🌟 Featured Components

### Media Components

- **Image Gallery**: Responsive photo galleries with lightbox functionality
- **Video Embed**: Multi-platform video embedding with custom players
- **Media Grid**: Masonry-style layouts for mixed media content

### Interactive Components

- **Tabs**: Accessible tab interfaces with keyboard navigation
- **Accordion**: Collapsible content sections with smooth animations
- **Modal**: Overlay dialogs with focus management
- **Carousel**: Touch-friendly content sliders

### Layout Utilities

- **Grid System**: Flexible CSS Grid-based layouts
- **Container**: Responsive content containers
- **Spacer**: Consistent spacing utilities

## 🎯 Learning Objectives

This showcase demonstrates:

- **Advanced TypeScript patterns** for complex component props
- **Accessibility best practices** with ARIA labels and keyboard navigation
- **Performance optimization** techniques for interactive elements
- **CSS architecture** for maintainable styling systems
- **Progressive enhancement** strategies for JavaScript features

## 🚀 Usage Examples

Each component includes:

- **TypeScript interfaces** with comprehensive Zod validation
- **Accessibility features** following WCAG 2.1 guidelines
- **Responsive design** patterns for all screen sizes
- **Customization options** through CSS custom properties
- **Integration examples** showing real-world usage

## 📚 Component Documentation

### Media Components

#### Image Gallery

```typescript
// Basic usage
sections:
  - partial: "image-gallery"
    images:
      - src: "/images/photo1.jpg"
        alt: "Description"
        caption: "Photo caption"
      - src: "/images/photo2.jpg"
        alt: "Description"
        caption: "Another photo"
    layout: "masonry"
    lightbox: true
```

#### Video Embed

```typescript
// Multi-platform video support
sections:
  - partial: "video-embed"
    title: "Project Demo"
    videos:
      - platform: "youtube"
        videoId: "dQw4w9WgXcQ"
        title: "Demo Video"
      - platform: "vimeo"
        videoId: "123456789"
        title: "Behind the Scenes"
    aspectRatio: "16:9"
    autoplay: false
```

### Interactive Components

#### Tabs

```typescript
// Accessible tab interface
sections:
  - partial: "tabs"
    tabs:
      - id: "overview"
        label: "Overview"
        content: "<p>Project overview content...</p>"
      - id: "technical"
        label: "Technical Details"
        content: "<p>Technical specifications...</p>"
    defaultTab: "overview"
    variant: "pills"
```

#### Accordion

```typescript
// Collapsible FAQ sections
sections:
  - partial: "accordion"
    items:
      - title: "What technologies do you use?"
        content: "I specialize in React, TypeScript, and Node.js..."
        expanded: true
      - title: "How long does a project take?"
        content: "Project timelines vary based on scope..."
    allowMultiple: false
    variant: "bordered"
```

## 🎨 Styling System

All components use a consistent design token system:

```css
:root {
  /* Component-specific tokens */
  --gallery-gap: var(--spacing-md);
  --gallery-border-radius: 8px;
  --gallery-transition: 0.3s ease;

  /* Interactive states */
  --tab-active-color: var(--color-primary);
  --accordion-border: var(--color-border);
  --modal-backdrop: rgba(0, 0, 0, 0.5);
}
```

## ♿ Accessibility Features

Every component includes:

- **Semantic HTML** with proper heading hierarchy
- **ARIA attributes** for screen reader support
- **Keyboard navigation** with visible focus indicators
- **Color contrast** meeting WCAG AA standards
- **Reduced motion** support for accessibility preferences

## 📱 Responsive Design

Components adapt across device sizes:

- **Mobile-first** CSS with progressive enhancement
- **Touch-friendly** interactive elements (44px minimum)
- **Flexible layouts** using CSS Grid and Flexbox
- **Optimized images** with responsive loading strategies

## 🛠️ Customization Guide

### Theme Integration

```css
/* Override component variables */
.image-gallery {
  --gallery-columns: 4;
  --gallery-gap: 2rem;
}

@media (max-width: 768px) {
  .image-gallery {
    --gallery-columns: 2;
    --gallery-gap: 1rem;
  }
}
```

### Variant System

```typescript
// Component variants for different use cases
variant: 'grid' | 'masonry' | 'carousel' | 'slider';
size: 'small' | 'medium' | 'large';
theme: 'light' | 'dark' | 'auto';
```

## 🧪 Testing Patterns

Components include testing examples for:

- **Accessibility testing** with jest-axe
- **Interaction testing** with user events
- **Responsive testing** with viewport simulation
- **Performance testing** with Core Web Vitals

## 🔧 Integration Examples

### With Content Management

```typescript
// Dynamic content from CMS
sections:
  - partial: "dynamic-gallery"
    source: "cms"
    collection: "portfolio-images"
    filter: { featured: true }
    limit: 12
```

### With Form Handling

```typescript
// Interactive forms with validation
sections:
  - partial: "contact-modal"
    trigger: "Contact Me"
    form:
      fields: [...]
      validation: true
      endpoint: "/api/contact"
```

## 📈 Performance Features

- **Lazy loading** for images and videos
- **Code splitting** for interactive components
- **Preloading** for critical resources
- **Caching strategies** for optimal loading

## 🎯 Best Practices

1. **Progressive Enhancement**: Components work without JavaScript
2. **Type Safety**: Full TypeScript coverage with strict mode
3. **Error Boundaries**: Graceful handling of component failures
4. **Loading States**: Clear feedback during asynchronous operations
5. **Offline Support**: Service worker integration where applicable

---

**Ready to explore?** Each component includes detailed documentation, usage examples, and customization options. Perfect
for learning advanced AgentStatic patterns! 🚀
