# Portfolio Assets

This directory contains placeholder assets for the simple portfolio example. Replace these with your own images to
customize the portfolio.

## Required Images

### Profile & About

- `profile.jpg` - Hero section profile image (recommended: 800x800px, square)
- `about-photo.jpg` - About section photo (recommended: 600x400px)

### Projects

- `project-ecommerce.jpg` - E-commerce platform screenshot (recommended: 1200x800px)
- `project-tasks.jpg` - Task management app screenshot (recommended: 1200x800px)
- `project-portfolio.jpg` - Portfolio website screenshot (recommended: 1200x800px)
- `project-weather.jpg` - Weather app screenshot (recommended: 1200x800px)
- `project-blog.jpg` - Blog platform screenshot (recommended: 1200x800px)
- `project-components.jpg` - Component library screenshot (recommended: 1200x800px)
- `project-expense.jpg` - Expense tracker app screenshot (recommended: 600x1200px, mobile)
- `project-monitoring.jpg` - API monitoring tool screenshot (recommended: 1200x800px)
- `project-design-system.jpg` - Design system docs screenshot (recommended: 1200x800px)
- `project-chatbot.jpg` - AI chatbot interface screenshot (recommended: 1200x800px)

### SEO & Social

- `og-image.jpg` - Open Graph image for social sharing (recommended: 1200x630px)

## Image Guidelines

### Optimization

- Use WebP format when possible for better compression
- Provide multiple sizes for responsive images
- Compress images to reduce file size while maintaining quality

### Accessibility

- All images should have meaningful alt text in the content files
- Use high contrast for text overlays
- Consider color blind users when choosing color schemes

### Performance

- Lazy load images below the fold
- Use appropriate image dimensions for their display size
- Consider using a CDN for image delivery

## File Naming Convention

Use descriptive, kebab-case naming:

- `hero-background.jpg`
- `project-name-screenshot.jpg`
- `about-jane-coding.jpg`

## Placeholder Service

For development/demo purposes, you can use placeholder services:

- [Unsplash](https://unsplash.com/) - High-quality stock photos
- [Lorem Picsum](https://picsum.photos/) - Placeholder images by size
- [UI Faces](https://uifaces.co/) - Profile pictures

Example URLs:

```
https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&h=800&fit=crop
https://picsum.photos/1200/800?random=1
```

## Example Implementation

```yaml
# In your markdown frontmatter
image: '/assets/images/profile.jpg'
imageAlt: 'Jane Doe, Full-Stack Developer, smiling while working on laptop'

# For responsive images
images:
  - src: '/assets/images/project-large.jpg'
    width: 1200
    height: 800
  - src: '/assets/images/project-medium.jpg'
    width: 800
    height: 533
  - src: '/assets/images/project-small.jpg'
    width: 400
    height: 267
```
