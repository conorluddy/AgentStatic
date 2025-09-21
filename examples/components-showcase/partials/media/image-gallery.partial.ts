/**
 * Image Gallery Partial
 *
 * Advanced image gallery with lightbox, lazy loading, and responsive layouts.
 * Demonstrates sophisticated TypeScript patterns and accessibility features.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../src/types/partial.js';

/**
 * Gallery image schema
 */
const GalleryImageSchema = z.object({
  src: z.string().url().describe('Image source URL'),
  alt: z.string().min(1).describe('Alt text for accessibility'),
  caption: z.string().optional().describe('Image caption'),
  title: z.string().optional().describe('Image title'),
  width: z.number().optional().describe('Image width in pixels'),
  height: z.number().optional().describe('Image height in pixels'),
  thumbnail: z.string().url().optional().describe('Thumbnail image URL'),
  category: z.string().optional().describe('Image category for filtering'),
  featured: z.boolean().default(false).describe('Whether image is featured'),
});

/**
 * Gallery configuration schema
 */
const GalleryConfigSchema = z.object({
  columns: z
    .object({
      mobile: z.number().min(1).max(4).default(2),
      tablet: z.number().min(1).max(6).default(3),
      desktop: z.number().min(1).max(8).default(4),
    })
    .default({})
    .describe('Responsive column configuration'),
  gap: z
    .enum(['small', 'medium', 'large'])
    .default('medium')
    .describe('Gap size between images'),
  aspectRatio: z
    .enum(['auto', 'square', '16:9', '4:3', '3:2'])
    .default('auto')
    .describe('Image aspect ratio'),
});

/**
 * Lightbox configuration schema
 */
const LightboxConfigSchema = z.object({
  enabled: z.boolean().default(true).describe('Enable lightbox functionality'),
  showCaptions: z.boolean().default(true).describe('Show captions in lightbox'),
  showNavigation: z.boolean().default(true).describe('Show navigation arrows'),
  showCounter: z.boolean().default(true).describe('Show image counter'),
  enableKeyboard: z
    .boolean()
    .default(true)
    .describe('Enable keyboard navigation'),
  enableSwipe: z
    .boolean()
    .default(true)
    .describe('Enable touch/swipe gestures'),
  autoplay: z.boolean().default(false).describe('Enable slideshow autoplay'),
  autoplayDelay: z
    .number()
    .min(1000)
    .default(3000)
    .describe('Autoplay delay in milliseconds'),
});

/**
 * Image gallery component props schema
 */
const ImageGalleryPropsSchema = z.object({
  title: z.string().optional().describe('Gallery title'),
  description: z.string().optional().describe('Gallery description'),
  images: z.array(GalleryImageSchema).min(1).describe('Gallery images'),
  layout: z
    .enum(['grid', 'masonry', 'carousel'])
    .default('grid')
    .describe('Gallery layout style'),
  config: GalleryConfigSchema.default({}).describe('Gallery configuration'),
  lightbox: LightboxConfigSchema.default({}).describe('Lightbox configuration'),
  filtering: z
    .object({
      enabled: z.boolean().default(false),
      categories: z.array(z.string()).default([]),
      showAll: z.boolean().default(true),
    })
    .default({})
    .describe('Category filtering options'),
  lazyLoading: z.boolean().default(true).describe('Enable lazy loading'),
  loadingPlaceholder: z
    .string()
    .optional()
    .describe('Loading placeholder image'),
});

type ImageGalleryProps = z.infer<typeof ImageGalleryPropsSchema>;

/**
 * Image gallery partial implementation
 */
export const imageGalleryPartial: AgentPartial<ImageGalleryProps> = {
  schema: ImageGalleryPropsSchema,

  template: props => {
    const {
      title,
      description,
      images,
      layout,
      config,
      lightbox,
      filtering,
      lazyLoading,
      loadingPlaceholder,
    } = props;

    // Generate unique gallery ID
    const galleryId = `gallery-${Math.random().toString(36).substr(2, 9)}`;

    // Extract categories for filtering
    const allCategories = filtering.enabled
      ? [...new Set(images.map(img => img.category).filter(Boolean))]
      : [];

    // Generate filter buttons
    const filterButtonsHtml =
      filtering.enabled && allCategories.length > 0
        ? `
      <div class="gallery-filters" role="toolbar" aria-label="Gallery filters">
        ${
          filtering.showAll
            ? `
          <button 
            class="filter-btn filter-btn--active" 
            data-filter="all"
            aria-pressed="true"
          >
            All (${images.length})
          </button>
        `
            : ''
        }
        ${allCategories
          .map(category => {
            const count = images.filter(
              img => img.category === category
            ).length;
            return `
            <button 
              class="filter-btn" 
              data-filter="${category}"
              aria-pressed="false"
            >
              ${category} (${count})
            </button>
          `;
          })
          .join('')}
      </div>
    `
        : '';

    // Generate images
    const imagesHtml = images
      .map((image, index) => {
        const imageId = `${galleryId}-image-${index}`;
        const thumbnailSrc = image.thumbnail || image.src;

        return `
        <div 
          class="gallery-item ${image.featured ? 'gallery-item--featured' : ''}" 
          data-category="${image.category || 'all'}"
          data-index="${index}"
        >
          <figure class="gallery-figure">
            <div class="gallery-image-wrapper">
              ${
                lazyLoading
                  ? `
                <img 
                  class="gallery-image" 
                  data-src="${thumbnailSrc}"
                  alt="${image.alt}"
                  ${image.title ? `title="${image.title}"` : ''}
                  ${image.width ? `width="${image.width}"` : ''}
                  ${image.height ? `height="${image.height}"` : ''}
                  loading="lazy"
                  ${loadingPlaceholder ? `src="${loadingPlaceholder}"` : ''}
                />
              `
                  : `
                <img 
                  class="gallery-image" 
                  src="${thumbnailSrc}"
                  alt="${image.alt}"
                  ${image.title ? `title="${image.title}"` : ''}
                  ${image.width ? `width="${image.width}"` : ''}
                  ${image.height ? `height="${image.height}"` : ''}
                />
              `
              }
              
              ${
                lightbox.enabled
                  ? `
                <button 
                  class="gallery-overlay"
                  data-lightbox-trigger="${galleryId}"
                  data-image-index="${index}"
                  aria-label="View ${image.alt} in lightbox"
                >
                  <span class="gallery-overlay__icon" aria-hidden="true">🔍</span>
                  <span class="gallery-overlay__text">View Full Size</span>
                </button>
              `
                  : ''
              }
            </div>
            
            ${
              image.caption
                ? `
              <figcaption class="gallery-caption">
                ${image.caption}
              </figcaption>
            `
                : ''
            }
          </figure>
        </div>
      `;
      })
      .join('');

    // Generate lightbox modal
    const lightboxHtml = lightbox.enabled
      ? `
      <div 
        class="lightbox" 
        id="${galleryId}-lightbox"
        role="dialog" 
        aria-modal="true"
        aria-hidden="true"
        aria-labelledby="${galleryId}-lightbox-title"
      >
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__container">
          <header class="lightbox__header">
            <h2 id="${galleryId}-lightbox-title" class="lightbox__title">Image Gallery</h2>
            <button 
              class="lightbox__close" 
              data-lightbox-close
              aria-label="Close lightbox"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>
          
          <div class="lightbox__content">
            <div class="lightbox__image-container">
              <img 
                class="lightbox__image" 
                data-lightbox-image
                alt=""
                loading="eager"
              />
              
              ${
                lightbox.showNavigation
                  ? `
                <button 
                  class="lightbox__nav lightbox__nav--prev" 
                  data-lightbox-prev
                  aria-label="Previous image"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button 
                  class="lightbox__nav lightbox__nav--next" 
                  data-lightbox-next
                  aria-label="Next image"
                >
                  <span aria-hidden="true">›</span>
                </button>
              `
                  : ''
              }
            </div>
            
            ${
              lightbox.showCaptions
                ? `
              <div class="lightbox__caption" data-lightbox-caption></div>
            `
                : ''
            }
            
            ${
              lightbox.showCounter
                ? `
              <div class="lightbox__counter" data-lightbox-counter></div>
            `
                : ''
            }
          </div>
        </div>
      </div>
    `
      : '';

    return `
      <section class="gallery-section">
        <div class="gallery-container">
          
          ${
            title || description
              ? `
            <header class="gallery-header">
              ${title ? `<h2 class="gallery-title">${title}</h2>` : ''}
              ${description ? `<p class="gallery-description">${description}</p>` : ''}
            </header>
          `
              : ''
          }
          
          ${filterButtonsHtml}
          
          <div 
            class="gallery gallery--${layout}"
            id="${galleryId}"
            style="
              --gallery-columns-mobile: ${config.columns.mobile};
              --gallery-columns-tablet: ${config.columns.tablet};
              --gallery-columns-desktop: ${config.columns.desktop};
            "
            data-gallery
            data-layout="${layout}"
          >
            ${imagesHtml}
          </div>
          
        </div>
        
        ${lightboxHtml}
      </section>

      <script>
        // Image Gallery functionality
        document.addEventListener('DOMContentLoaded', function() {
          const gallery = document.getElementById('${galleryId}');
          const lightboxModal = document.getElementById('${galleryId}-lightbox');
          
          if (!gallery) return;
          
          // Lazy loading implementation
          ${
            lazyLoading
              ? `
            const imageObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  const src = img.dataset.src;
                  if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                  }
                }
              });
            });
            
            gallery.querySelectorAll('img[data-src]').forEach(img => {
              imageObserver.observe(img);
            });
          `
              : ''
          }
          
          // Filter functionality
          ${
            filtering.enabled
              ? `
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = gallery.querySelectorAll('.gallery-item');
            
            filterButtons.forEach(btn => {
              btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update button states
                filterButtons.forEach(b => {
                  b.classList.remove('filter-btn--active');
                  b.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('filter-btn--active');
                this.setAttribute('aria-pressed', 'true');
                
                // Filter items
                galleryItems.forEach(item => {
                  const category = item.dataset.category;
                  const shouldShow = filter === 'all' || category === filter;
                  item.style.display = shouldShow ? 'block' : 'none';
                });
              });
            });
          `
              : ''
          }
          
          // Lightbox functionality
          ${
            lightbox.enabled
              ? `
            const lightboxTriggers = gallery.querySelectorAll('[data-lightbox-trigger]');
            const lightboxImage = lightboxModal?.querySelector('[data-lightbox-image]');
            const lightboxCaption = lightboxModal?.querySelector('[data-lightbox-caption]');
            const lightboxCounter = lightboxModal?.querySelector('[data-lightbox-counter]');
            const lightboxClose = lightboxModal?.querySelectorAll('[data-lightbox-close]');
            const lightboxPrev = lightboxModal?.querySelector('[data-lightbox-prev]');
            const lightboxNext = lightboxModal?.querySelector('[data-lightbox-next]');
            
            let currentImageIndex = 0;
            let isLightboxOpen = false;
            
            function openLightbox(index) {
              if (!lightboxModal || !lightboxImage) return;
              
              currentImageIndex = index;
              isLightboxOpen = true;
              
              updateLightboxImage();
              lightboxModal.setAttribute('aria-hidden', 'false');
              lightboxModal.style.display = 'flex';
              
              // Focus management
              const firstFocusable = lightboxModal.querySelector('button');
              if (firstFocusable) firstFocusable.focus();
              
              // Prevent body scroll
              document.body.style.overflow = 'hidden';
            }
            
            function closeLightbox() {
              if (!lightboxModal) return;
              
              isLightboxOpen = false;
              lightboxModal.setAttribute('aria-hidden', 'true');
              lightboxModal.style.display = 'none';
              
              // Restore body scroll
              document.body.style.overflow = '';
              
              // Return focus to trigger
              const trigger = gallery.querySelector(\`[data-image-index="\${currentImageIndex}"]\`);
              if (trigger) trigger.focus();
            }
            
            function updateLightboxImage() {
              if (!lightboxImage || currentImageIndex < 0 || currentImageIndex >= ${images.length}) return;
              
              const imageData = ${JSON.stringify(images)}[currentImageIndex];
              lightboxImage.src = imageData.src;
              lightboxImage.alt = imageData.alt;
              
              if (lightboxCaption) {
                lightboxCaption.textContent = imageData.caption || '';
                lightboxCaption.style.display = imageData.caption ? 'block' : 'none';
              }
              
              if (lightboxCounter) {
                lightboxCounter.textContent = \`\${currentImageIndex + 1} of ${images.length}\`;
              }
              
              // Update navigation button states
              if (lightboxPrev) {
                lightboxPrev.disabled = currentImageIndex === 0;
              }
              if (lightboxNext) {
                lightboxNext.disabled = currentImageIndex === ${images.length - 1};
              }
            }
            
            function navigateLightbox(direction) {
              const newIndex = currentImageIndex + direction;
              if (newIndex >= 0 && newIndex < ${images.length}) {
                currentImageIndex = newIndex;
                updateLightboxImage();
              }
            }
            
            // Event listeners
            lightboxTriggers.forEach(trigger => {
              trigger.addEventListener('click', function() {
                const index = parseInt(this.dataset.imageIndex);
                openLightbox(index);
              });
            });
            
            lightboxClose?.forEach(btn => {
              btn.addEventListener('click', closeLightbox);
            });
            
            lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
            lightboxNext?.addEventListener('click', () => navigateLightbox(1));
            
            // Keyboard navigation
            ${
              lightbox.enableKeyboard
                ? `
              document.addEventListener('keydown', function(e) {
                if (!isLightboxOpen) return;
                
                switch(e.key) {
                  case 'Escape':
                    closeLightbox();
                    break;
                  case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                  case 'ArrowRight':
                    navigateLightbox(1);
                    break;
                }
              });
            `
                : ''
            }
          `
              : ''
          }
        });
      </script>
    `;
  },

  styles: `
    /* Gallery Section */
    .gallery-section {
      padding: var(--spacing-xl, 3rem) 0;
    }

    .gallery-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-sm, 1rem);
    }

    /* Gallery Header */
    .gallery-header {
      text-align: center;
      margin-bottom: var(--spacing-lg, 2rem);
    }

    .gallery-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text, #1f2937);
      margin: 0 0 var(--spacing-sm, 1rem) 0;
    }

    .gallery-description {
      color: var(--color-text-light, #6b7280);
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0;
    }

    /* Filter Buttons */
    .gallery-filters {
      display: flex;
      justify-content: center;
      gap: var(--spacing-xs, 0.5rem);
      margin-bottom: var(--spacing-lg, 2rem);
      flex-wrap: wrap;
    }

    .filter-btn {
      background-color: var(--color-surface, #f9fafb);
      color: var(--color-text, #1f2937);
      border: 1px solid var(--color-border, #e5e7eb);
      padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn:hover,
    .filter-btn:focus {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      border-color: var(--color-primary, #3b82f6);
      outline: none;
    }

    .filter-btn--active {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      border-color: var(--color-primary, #3b82f6);
    }

    /* Gallery Layouts */
    .gallery {
      display: grid;
      gap: var(--spacing-md, 1.5rem);
    }

    .gallery--grid {
      grid-template-columns: repeat(var(--gallery-columns-mobile, 2), 1fr);
    }

    @media (min-width: 768px) {
      .gallery--grid {
        grid-template-columns: repeat(var(--gallery-columns-tablet, 3), 1fr);
      }
    }

    @media (min-width: 1024px) {
      .gallery--grid {
        grid-template-columns: repeat(var(--gallery-columns-desktop, 4), 1fr);
      }
    }

    .gallery--masonry {
      column-count: var(--gallery-columns-mobile, 2);
      column-gap: var(--spacing-md, 1.5rem);
    }

    @media (min-width: 768px) {
      .gallery--masonry {
        column-count: var(--gallery-columns-tablet, 3);
      }
    }

    @media (min-width: 1024px) {
      .gallery--masonry {
        column-count: var(--gallery-columns-desktop, 4);
      }
    }

    /* Gallery Items */
    .gallery-item {
      position: relative;
      break-inside: avoid;
      margin-bottom: var(--spacing-md, 1.5rem);
    }

    .gallery-item--featured {
      grid-column: span 2;
    }

    .gallery-figure {
      margin: 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .gallery-figure:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .gallery-image-wrapper {
      position: relative;
      overflow: hidden;
    }

    .gallery-image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
    }

    .gallery-image[data-src] {
      background-color: var(--color-surface, #f9fafb);
      min-height: 200px;
    }

    /* Gallery Overlay */
    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs, 0.5rem);
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }

    .gallery-overlay__icon {
      font-size: 2rem;
      line-height: 1;
    }

    .gallery-overlay__text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Gallery Caption */
    .gallery-caption {
      padding: var(--spacing-sm, 1rem);
      background-color: var(--color-background, #ffffff);
      color: var(--color-text-light, #6b7280);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    /* Lightbox */
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-lg, 2rem);
    }

    .lightbox__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      cursor: pointer;
    }

    .lightbox__container {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .lightbox__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 1rem);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      background: var(--color-background, #ffffff);
    }

    .lightbox__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }

    .lightbox__close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: var(--spacing-xs, 0.5rem);
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .lightbox__close:hover,
    .lightbox__close:focus {
      background-color: var(--color-surface, #f9fafb);
      outline: none;
    }

    .lightbox__content {
      position: relative;
    }

    .lightbox__image-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
    }

    .lightbox__image {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    .lightbox__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .lightbox__nav:hover:not(:disabled) {
      background: white;
      transform: translateY(-50%) scale(1.1);
    }

    .lightbox__nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .lightbox__nav--prev {
      left: var(--spacing-sm, 1rem);
    }

    .lightbox__nav--next {
      right: var(--spacing-sm, 1rem);
    }

    .lightbox__caption {
      padding: var(--spacing-sm, 1rem);
      background: var(--color-background, #ffffff);
      color: var(--color-text, #1f2937);
      text-align: center;
      border-top: 1px solid var(--color-border, #e5e7eb);
    }

    .lightbox__counter {
      position: absolute;
      top: var(--spacing-sm, 1rem);
      right: var(--spacing-sm, 1rem);
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 767px) {
      .lightbox {
        padding: var(--spacing-sm, 1rem);
      }
      
      .lightbox__nav {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }
      
      .gallery-filters {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: var(--spacing-xs, 0.5rem);
      }
      
      .filter-btn {
        flex-shrink: 0;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .gallery-figure,
      .gallery-image,
      .gallery-overlay,
      .lightbox__nav {
        transition: none;
      }
      
      .gallery-figure:hover {
        transform: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .gallery-figure {
        border: 2px solid var(--color-border, #e5e7eb);
      }
      
      .filter-btn {
        border-width: 2px;
      }
    }
  `,

  metadata: {
    description:
      'Advanced image gallery with lightbox, filtering, and responsive layouts',
    category: 'media',
    keywords: [
      'gallery',
      'images',
      'lightbox',
      'masonry',
      'responsive',
      'lazy-loading',
    ],
    usageExamples: [
      'Portfolio image galleries',
      'Product photo showcases',
      'Event photography collections',
      'Before/after image comparisons',
    ],
  },
};
