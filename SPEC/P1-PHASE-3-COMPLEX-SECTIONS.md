# Phase 3: Complex Section Components
## Timeline: Weeks 5-6 (Dec 2-15, 2024)

### Overview
This phase implements complex section components that combine basic elements into full-featured layout patterns. These sections form the building blocks for complete pages and support rich content presentation.

### Prerequisites
- Phase 2 basic components completed
- Component registry operational
- CSS optimization pipeline ready
- Build system configured

---

## 1. Hero Sections

### 1.1 Implementation Requirements

```typescript
// src/components/sections/hero/types.ts
export interface HeroConfig extends BaseComponentConfig {
  variant: 'centered' | 'split' | 'video' | 'parallax' | 'gradient';
  height: 'full' | 'tall' | 'medium' | 'auto';
  content: {
    headline: string;
    subheadline?: string;
    description?: string;
    cta?: {
      primary?: ButtonConfig;
      secondary?: ButtonConfig;
    };
  };
  media?: {
    type: 'image' | 'video' | 'animation';
    source: string;
    alt?: string;
    position?: 'left' | 'right' | 'background';
  };
  overlay?: {
    color?: string;
    opacity?: number;
    gradient?: string;
  };
  animation?: {
    entrance?: 'fade' | 'slide' | 'scale';
    parallax?: boolean;
    speed?: number;
  };
}
```

### 1.2 Component Templates

```nunjucks
{# src/components/sections/hero/hero.njk #}
{% macro hero(config) %}
<section class="hero hero--{{ config.variant }} hero--{{ config.height }}"
         data-component="hero"
         {% if config.animation %}data-animation="{{ config.animation | json }}"{% endif %}>

  {% if config.media and config.media.position == 'background' %}
    <div class="hero__background">
      {% if config.media.type == 'image' %}
        <picture>
          <source srcset="{{ config.media.source | webp }}" type="image/webp">
          <img src="{{ config.media.source }}"
               alt="{{ config.media.alt }}"
               loading="eager"
               class="hero__bg-image">
        </picture>
      {% elif config.media.type == 'video' %}
        <video class="hero__bg-video"
               autoplay muted loop playsinline>
          <source src="{{ config.media.source }}" type="video/mp4">
        </video>
      {% endif %}

      {% if config.overlay %}
        <div class="hero__overlay"
             style="--overlay-color: {{ config.overlay.color }};
                    --overlay-opacity: {{ config.overlay.opacity }}"></div>
      {% endif %}
    </div>
  {% endif %}

  <div class="hero__container container">
    <div class="hero__content">
      <h1 class="hero__headline">{{ config.content.headline | safe }}</h1>

      {% if config.content.subheadline %}
        <p class="hero__subheadline">{{ config.content.subheadline | safe }}</p>
      {% endif %}

      {% if config.content.description %}
        <div class="hero__description">{{ config.content.description | safe }}</div>
      {% endif %}

      {% if config.content.cta %}
        <div class="hero__cta">
          {% if config.content.cta.primary %}
            {{ button(config.content.cta.primary) }}
          {% endif %}
          {% if config.content.cta.secondary %}
            {{ button(config.content.cta.secondary) }}
          {% endif %}
        </div>
      {% endif %}
    </div>

    {% if config.media and config.media.position != 'background' %}
      <div class="hero__media hero__media--{{ config.media.position }}">
        {% if config.media.type == 'image' %}
          {{ image(config.media) }}
        {% elif config.media.type == 'animation' %}
          <div class="hero__animation" data-animation-src="{{ config.media.source }}"></div>
        {% endif %}
      </div>
    {% endif %}
  </div>
</section>
{% endmacro %}
```

### 1.3 Styles

```scss
// src/styles/components/sections/_hero.scss
.hero {
  --hero-min-height: 100vh;
  --hero-padding: var(--space-2xl) 0;

  position: relative;
  min-height: var(--hero-min-height);
  padding: var(--hero-padding);
  display: flex;
  align-items: center;

  // Height variants
  &--full {
    --hero-min-height: 100vh;
  }

  &--tall {
    --hero-min-height: 80vh;
  }

  &--medium {
    --hero-min-height: 60vh;
  }

  &--auto {
    --hero-min-height: auto;
  }

  // Background handling
  &__background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;
  }

  &__bg-image,
  &__bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: var(--overlay-color, rgba(0, 0, 0, 0.5));
    opacity: var(--overlay-opacity, 1);
  }

  // Content layout
  &__container {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  &__content {
    max-width: 65ch;
  }

  &__headline {
    font-size: clamp(2rem, 5vw + 1rem, 4rem);
    line-height: 1.1;
    margin-bottom: var(--space-md);
  }

  &__subheadline {
    font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
    opacity: 0.9;
    margin-bottom: var(--space-lg);
  }

  &__description {
    font-size: 1.125rem;
    margin-bottom: var(--space-xl);
  }

  &__cta {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  // Variant: Split
  &--split &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  // Variant: Centered
  &--centered &__content {
    text-align: center;
    margin: 0 auto;
  }

  &--centered &__cta {
    justify-content: center;
  }

  // Parallax effect
  &[data-parallax] &__background {
    transform: translateY(var(--parallax-offset, 0));
    will-change: transform;
  }
}
```

### 1.4 JavaScript Enhancement

```typescript
// src/components/sections/hero/hero.ts
export class HeroComponent {
  private element: HTMLElement;
  private config: HeroConfig;
  private parallaxEnabled: boolean = false;
  private observer?: IntersectionObserver;

  constructor(element: HTMLElement) {
    this.element = element;
    this.config = JSON.parse(element.dataset.config || '{}');
    this.init();
  }

  private init(): void {
    this.setupParallax();
    this.setupAnimations();
    this.setupVideoPlayback();
  }

  private setupParallax(): void {
    if (!this.config.animation?.parallax) return;

    const background = this.element.querySelector('.hero__background') as HTMLElement;
    if (!background) return;

    this.parallaxEnabled = true;

    const handleScroll = () => {
      if (!this.parallaxEnabled) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * (this.config.animation?.speed || 0.5);

      background.style.setProperty('--parallax-offset', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private setupAnimations(): void {
    if (!this.config.animation?.entrance) return;

    const content = this.element.querySelector('.hero__content');
    if (!content) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`animate--${this.config.animation?.entrance}`);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(content);
  }

  private setupVideoPlayback(): void {
    const video = this.element.querySelector('video');
    if (!video) return;

    // Optimize video playback
    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.parallaxEnabled = false;
  }
}
```

---

## 2. Feature Sections

### 2.1 Feature Grid Component

```typescript
// src/components/sections/features/types.ts
export interface FeatureGridConfig extends BaseComponentConfig {
  layout: 'grid' | 'list' | 'cards' | 'alternating';
  columns: 2 | 3 | 4;
  features: FeatureItem[];
  heading?: {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface FeatureItem {
  icon?: string;
  image?: string;
  title: string;
  description: string;
  link?: {
    url: string;
    text: string;
  };
  badge?: string;
  highlight?: boolean;
}
```

### 2.2 Feature Templates

```nunjucks
{# src/components/sections/features/feature-grid.njk #}
{% macro featureGrid(config) %}
<section class="features features--{{ config.layout }}" data-component="feature-grid">
  <div class="container">
    {% if config.heading %}
      <header class="features__header features__header--{{ config.heading.alignment or 'center' }}">
        <h2 class="features__title">{{ config.heading.title }}</h2>
        {% if config.heading.subtitle %}
          <p class="features__subtitle">{{ config.heading.subtitle }}</p>
        {% endif %}
      </header>
    {% endif %}

    <div class="features__grid features__grid--{{ config.columns }}">
      {% for feature in config.features %}
        <article class="feature-item {% if feature.highlight %}feature-item--highlight{% endif %}">
          {% if feature.icon %}
            <div class="feature-item__icon">
              {{ icon(feature.icon) }}
            </div>
          {% elif feature.image %}
            <div class="feature-item__image">
              {{ image({ src: feature.image, alt: feature.title }) }}
            </div>
          {% endif %}

          <div class="feature-item__content">
            <h3 class="feature-item__title">
              {{ feature.title }}
              {% if feature.badge %}
                <span class="feature-item__badge">{{ feature.badge }}</span>
              {% endif %}
            </h3>

            <p class="feature-item__description">{{ feature.description }}</p>

            {% if feature.link %}
              <a href="{{ feature.link.url }}" class="feature-item__link">
                {{ feature.link.text }}
                <svg class="feature-item__arrow" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
{% endmacro %}
```

### 2.3 Alternating Layout

```nunjucks
{# src/components/sections/features/feature-alternating.njk #}
{% macro featureAlternating(config) %}
<section class="features-alt" data-component="feature-alternating">
  <div class="container">
    {% for feature in config.features %}
      <div class="features-alt__item {% if loop.index % 2 == 0 %}features-alt__item--reverse{% endif %}">
        <div class="features-alt__content">
          <h3 class="features-alt__title">{{ feature.title }}</h3>
          <p class="features-alt__description">{{ feature.description }}</p>

          {% if feature.points %}
            <ul class="features-alt__points">
              {% for point in feature.points %}
                <li>{{ point }}</li>
              {% endfor %}
            </ul>
          {% endif %}

          {% if feature.link %}
            {{ button({
              text: feature.link.text,
              url: feature.link.url,
              variant: 'secondary'
            }) }}
          {% endif %}
        </div>

        <div class="features-alt__media">
          {% if feature.image %}
            {{ image({
              src: feature.image,
              alt: feature.title,
              loading: 'lazy'
            }) }}
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</section>
{% endmacro %}
```

---

## 3. Content Sections

### 3.1 Article Layout

```typescript
// src/components/sections/content/types.ts
export interface ArticleConfig extends BaseComponentConfig {
  header: {
    title: string;
    subtitle?: string;
    author?: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    publishDate?: string;
    readTime?: string;
    categories?: string[];
  };
  content: string;
  sidebar?: {
    position: 'left' | 'right';
    sticky?: boolean;
    sections: SidebarSection[];
  };
  related?: RelatedContent[];
}
```

### 3.2 Article Template

```nunjucks
{# src/components/sections/content/article.njk #}
{% macro article(config) %}
<article class="article" data-component="article">
  <header class="article__header">
    <div class="container container--narrow">
      {% if config.header.categories %}
        <div class="article__categories">
          {% for category in config.header.categories %}
            <span class="article__category">{{ category }}</span>
          {% endfor %}
        </div>
      {% endif %}

      <h1 class="article__title">{{ config.header.title }}</h1>

      {% if config.header.subtitle %}
        <p class="article__subtitle">{{ config.header.subtitle }}</p>
      {% endif %}

      <div class="article__meta">
        {% if config.header.author %}
          <div class="article__author">
            {% if config.header.author.avatar %}
              <img src="{{ config.header.author.avatar }}"
                   alt="{{ config.header.author.name }}"
                   class="article__author-avatar">
            {% endif %}
            <div>
              <span class="article__author-name">{{ config.header.author.name }}</span>
              {% if config.header.author.bio %}
                <span class="article__author-bio">{{ config.header.author.bio }}</span>
              {% endif %}
            </div>
          </div>
        {% endif %}

        {% if config.header.publishDate %}
          <time class="article__date" datetime="{{ config.header.publishDate }}">
            {{ config.header.publishDate | formatDate }}
          </time>
        {% endif %}

        {% if config.header.readTime %}
          <span class="article__read-time">{{ config.header.readTime }} min read</span>
        {% endif %}
      </div>
    </div>
  </header>

  <div class="article__body">
    <div class="container {% if config.sidebar %}container--with-sidebar{% endif %}">
      {% if config.sidebar and config.sidebar.position == 'left' %}
        {{ articleSidebar(config.sidebar) }}
      {% endif %}

      <div class="article__content prose">
        {{ config.content | safe }}
      </div>

      {% if config.sidebar and config.sidebar.position == 'right' %}
        {{ articleSidebar(config.sidebar) }}
      {% endif %}
    </div>
  </div>

  {% if config.related %}
    <footer class="article__footer">
      <div class="container">
        <h2 class="article__related-title">Related Articles</h2>
        <div class="article__related-grid">
          {% for item in config.related %}
            {{ contentCard(item) }}
          {% endfor %}
        </div>
      </div>
    </footer>
  {% endif %}
</article>
{% endmacro %}
```

---

## 4. Gallery Sections

### 4.1 Image Gallery Component

```typescript
// src/components/sections/gallery/types.ts
export interface GalleryConfig extends BaseComponentConfig {
  layout: 'grid' | 'masonry' | 'carousel' | 'lightbox';
  columns: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  images: GalleryImage[];
  options?: {
    gap?: string;
    aspectRatio?: string;
    lightbox?: boolean;
    lazy?: boolean;
    animation?: 'fade' | 'zoom' | 'slide';
  };
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
  srcset?: string[];
  sizes?: string;
  width?: number;
  height?: number;
}
```

### 4.2 Gallery Implementation

```nunjucks
{# src/components/sections/gallery/gallery.njk #}
{% macro gallery(config) %}
<section class="gallery gallery--{{ config.layout }}"
         data-component="gallery"
         data-gallery-config='{{ config | json }}'>
  <div class="container">
    <div class="gallery__grid"
         style="--columns-desktop: {{ config.columns.desktop }};
                --columns-tablet: {{ config.columns.tablet }};
                --columns-mobile: {{ config.columns.mobile }};
                --gap: {{ config.options.gap or 'var(--space-md)' }}">

      {% for image in config.images %}
        <figure class="gallery__item"
                data-index="{{ loop.index0 }}"
                {% if config.options.animation %}
                data-aos="{{ config.options.animation }}"
                data-aos-delay="{{ loop.index0 * 100 }}"
                {% endif %}>

          <div class="gallery__image-wrapper"
               {% if config.options.aspectRatio %}
               style="aspect-ratio: {{ config.options.aspectRatio }}"
               {% endif %}>

            <picture>
              {% if image.srcset %}
                {% for src in image.srcset %}
                  <source srcset="{{ src }}" media="(min-width: {{ loop.index * 400 }}px)">
                {% endfor %}
              {% endif %}

              <img src="{{ image.thumbnail or image.src }}"
                   data-src="{{ image.src }}"
                   alt="{{ image.alt }}"
                   {% if image.width %}width="{{ image.width }}"{% endif %}
                   {% if image.height %}height="{{ image.height }}"{% endif %}
                   {% if config.options.lazy %}loading="lazy"{% endif %}
                   class="gallery__image">
            </picture>

            {% if config.options.lightbox %}
              <button class="gallery__overlay"
                      aria-label="View {{ image.alt }} in lightbox">
                <svg class="gallery__zoom-icon">
                  <use href="#icon-zoom"></use>
                </svg>
              </button>
            {% endif %}
          </div>

          {% if image.caption %}
            <figcaption class="gallery__caption">{{ image.caption }}</figcaption>
          {% endif %}
        </figure>
      {% endfor %}
    </div>
  </div>

  {% if config.options.lightbox %}
    <div class="lightbox" id="gallery-lightbox" aria-hidden="true">
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__container">
        <button class="lightbox__close" aria-label="Close lightbox">
          <svg><use href="#icon-close"></use></svg>
        </button>
        <button class="lightbox__prev" aria-label="Previous image">
          <svg><use href="#icon-chevron-left"></use></svg>
        </button>
        <button class="lightbox__next" aria-label="Next image">
          <svg><use href="#icon-chevron-right"></use></svg>
        </button>
        <div class="lightbox__content">
          <img class="lightbox__image" alt="">
          <div class="lightbox__caption"></div>
        </div>
      </div>
    </div>
  {% endif %}
</section>
{% endmacro %}
```

### 4.3 Gallery JavaScript

```typescript
// src/components/sections/gallery/gallery.ts
export class GalleryComponent {
  private element: HTMLElement;
  private config: GalleryConfig;
  private lightbox?: LightboxController;
  private masonry?: MasonryLayout;

  constructor(element: HTMLElement) {
    this.element = element;
    this.config = JSON.parse(element.dataset.galleryConfig || '{}');
    this.init();
  }

  private init(): void {
    this.setupLayout();
    this.setupLightbox();
    this.setupLazyLoading();
  }

  private setupLayout(): void {
    if (this.config.layout === 'masonry') {
      this.masonry = new MasonryLayout(this.element.querySelector('.gallery__grid')!, {
        columns: this.config.columns,
        gap: this.config.options?.gap
      });
    }
  }

  private setupLightbox(): void {
    if (!this.config.options?.lightbox) return;

    const lightboxElement = document.getElementById('gallery-lightbox');
    if (!lightboxElement) return;

    this.lightbox = new LightboxController(lightboxElement, {
      images: this.config.images,
      onOpen: () => document.body.style.overflow = 'hidden',
      onClose: () => document.body.style.overflow = ''
    });

    // Bind click handlers
    this.element.querySelectorAll('.gallery__overlay').forEach((btn, index) => {
      btn.addEventListener('click', () => this.lightbox?.open(index));
    });
  }

  private setupLazyLoading(): void {
    if (!this.config.options?.lazy) return;

    const images = this.element.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          delete img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// Masonry layout helper
class MasonryLayout {
  private container: HTMLElement;
  private items: HTMLElement[];
  private columns: number;

  constructor(container: HTMLElement, options: any) {
    this.container = container;
    this.items = Array.from(container.children) as HTMLElement[];
    this.columns = this.getColumns();
    this.layout();

    window.addEventListener('resize', debounce(() => this.layout(), 250));
  }

  private getColumns(): number {
    const width = this.container.offsetWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  private layout(): void {
    const columnHeights = new Array(this.columns).fill(0);
    const gap = 16; // pixels

    this.items.forEach((item, index) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = (100 / this.columns) * column;
      const y = columnHeights[column];

      item.style.position = 'absolute';
      item.style.left = `${x}%`;
      item.style.top = `${y}px`;
      item.style.width = `calc(${100 / this.columns}% - ${gap}px)`;

      columnHeights[column] += item.offsetHeight + gap;
    });

    this.container.style.height = `${Math.max(...columnHeights)}px`;
  }
}
```

---

## 5. Pricing Tables

### 5.1 Pricing Component

```typescript
// src/components/sections/pricing/types.ts
export interface PricingConfig extends BaseComponentConfig {
  plans: PricingPlan[];
  billing?: {
    monthly: boolean;
    annual: boolean;
    discount?: number;
  };
  features?: {
    comparison: boolean;
    groups?: FeatureGroup[];
  };
  highlight?: number; // Index of highlighted plan
}

export interface PricingPlan {
  name: string;
  description?: string;
  price: {
    monthly: number;
    annual?: number;
    currency: string;
    decimals?: number;
  };
  features: string[];
  cta: {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  badge?: string;
  popular?: boolean;
}
```

### 5.2 Pricing Template

```nunjucks
{# src/components/sections/pricing/pricing.njk #}
{% macro pricingTable(config) %}
<section class="pricing" data-component="pricing">
  <div class="container">
    {% if config.billing and (config.billing.monthly and config.billing.annual) %}
      <div class="pricing__toggle">
        <span class="pricing__toggle-label">Monthly</span>
        <button class="pricing__toggle-switch"
                role="switch"
                aria-checked="false"
                aria-label="Toggle annual billing">
          <span class="pricing__toggle-slider"></span>
        </button>
        <span class="pricing__toggle-label">
          Annual
          {% if config.billing.discount %}
            <span class="pricing__discount">Save {{ config.billing.discount }}%</span>
          {% endif %}
        </span>
      </div>
    {% endif %}

    <div class="pricing__grid">
      {% for plan in config.plans %}
        <div class="pricing-card {% if plan.popular %}pricing-card--popular{% endif %}"
             {% if loop.index0 == config.highlight %}data-highlight="true"{% endif %}>

          {% if plan.badge %}
            <div class="pricing-card__badge">{{ plan.badge }}</div>
          {% endif %}

          <header class="pricing-card__header">
            <h3 class="pricing-card__name">{{ plan.name }}</h3>
            {% if plan.description %}
              <p class="pricing-card__description">{{ plan.description }}</p>
            {% endif %}
          </header>

          <div class="pricing-card__price">
            <span class="pricing-card__currency">{{ plan.price.currency }}</span>
            <span class="pricing-card__amount" data-monthly="{{ plan.price.monthly }}"
                  data-annual="{{ plan.price.annual or plan.price.monthly * 12 }}">
              {{ plan.price.monthly }}
            </span>
            <span class="pricing-card__period">/month</span>
          </div>

          <ul class="pricing-card__features">
            {% for feature in plan.features %}
              <li class="pricing-card__feature">
                <svg class="pricing-card__check" aria-hidden="true">
                  <use href="#icon-check"></use>
                </svg>
                {{ feature }}
              </li>
            {% endfor %}
          </ul>

          <div class="pricing-card__cta">
            {{ button({
              text: plan.cta.text,
              url: plan.cta.url,
              variant: plan.cta.variant or 'primary',
              fullWidth: true
            }) }}
          </div>
        </div>
      {% endfor %}
    </div>

    {% if config.features and config.features.comparison %}
      {{ pricingComparison(config) }}
    {% endif %}
  </div>
</section>
{% endmacro %}
```

---

## 6. Testimonial Sections

### 6.1 Testimonial Types

```typescript
// src/components/sections/testimonials/types.ts
export interface TestimonialConfig extends BaseComponentConfig {
  layout: 'grid' | 'carousel' | 'masonry' | 'featured';
  testimonials: Testimonial[];
  options?: {
    autoplay?: boolean;
    duration?: number;
    columns?: number;
    showRating?: boolean;
  };
}

export interface Testimonial {
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
  date?: string;
  featured?: boolean;
  source?: 'google' | 'trustpilot' | 'g2' | 'custom';
}
```

### 6.2 Testimonial Templates

```nunjucks
{# src/components/sections/testimonials/testimonial-grid.njk #}
{% macro testimonialGrid(config) %}
<section class="testimonials testimonials--{{ config.layout }}" data-component="testimonials">
  <div class="container">
    <div class="testimonials__grid">
      {% for testimonial in config.testimonials %}
        <blockquote class="testimonial-card {% if testimonial.featured %}testimonial-card--featured{% endif %}">
          {% if config.options.showRating and testimonial.rating %}
            <div class="testimonial-card__rating" aria-label="{{ testimonial.rating }} out of 5 stars">
              {% for star in range(5) %}
                <svg class="testimonial-card__star {% if star < testimonial.rating %}testimonial-card__star--filled{% endif %}">
                  <use href="#icon-star"></use>
                </svg>
              {% endfor %}
            </div>
          {% endif %}

          <div class="testimonial-card__content">
            "{{ testimonial.content }}"
          </div>

          <footer class="testimonial-card__footer">
            {% if testimonial.author.avatar %}
              <img src="{{ testimonial.author.avatar }}"
                   alt="{{ testimonial.author.name }}"
                   class="testimonial-card__avatar"
                   loading="lazy">
            {% endif %}

            <div class="testimonial-card__author">
              <cite class="testimonial-card__name">{{ testimonial.author.name }}</cite>
              {% if testimonial.author.title %}
                <div class="testimonial-card__title">
                  {{ testimonial.author.title }}
                  {% if testimonial.author.company %}
                    at {{ testimonial.author.company }}
                  {% endif %}
                </div>
              {% endif %}
            </div>

            {% if testimonial.source %}
              <div class="testimonial-card__source">
                <svg class="testimonial-card__source-icon">
                  <use href="#icon-{{ testimonial.source }}"></use>
                </svg>
              </div>
            {% endif %}
          </footer>
        </blockquote>
      {% endfor %}
    </div>
  </div>
</section>
{% endmacro %}
```

---

## 7. Testing Requirements

### 7.1 Component Testing

```typescript
// src/tests/components/sections/hero.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/dom';
import { HeroComponent } from '@/components/sections/hero/hero';

describe('Hero Component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('rendering', () => {
    it('renders all content elements', () => {
      const config = {
        variant: 'centered',
        height: 'full',
        content: {
          headline: 'Test Headline',
          subheadline: 'Test Subheadline',
          description: 'Test Description'
        }
      };

      container.innerHTML = renderHero(config);

      expect(screen.getByText('Test Headline')).toBeInTheDocument();
      expect(screen.getByText('Test Subheadline')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('applies correct variant classes', () => {
      const config = { variant: 'split', height: 'tall' };
      container.innerHTML = renderHero(config);

      const hero = container.querySelector('.hero');
      expect(hero).toHaveClass('hero--split');
      expect(hero).toHaveClass('hero--tall');
    });
  });

  describe('media handling', () => {
    it('renders background video correctly', () => {
      const config = {
        media: {
          type: 'video',
          source: 'video.mp4',
          position: 'background'
        }
      };

      container.innerHTML = renderHero(config);
      const video = container.querySelector('video');

      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('muted');
      expect(video).toHaveAttribute('loop');
    });

    it('generates responsive images', () => {
      const config = {
        media: {
          type: 'image',
          source: 'image.jpg',
          position: 'background'
        }
      };

      container.innerHTML = renderHero(config);
      const picture = container.querySelector('picture');
      const sources = picture?.querySelectorAll('source');

      expect(sources?.length).toBeGreaterThan(0);
      expect(sources?.[0]).toHaveAttribute('type', 'image/webp');
    });
  });

  describe('parallax functionality', () => {
    it('initializes parallax when enabled', () => {
      const config = {
        animation: {
          parallax: true,
          speed: 0.5
        }
      };

      container.innerHTML = renderHero(config);
      const hero = new HeroComponent(container.querySelector('.hero')!);

      // Simulate scroll
      window.pageYOffset = 100;
      window.dispatchEvent(new Event('scroll'));

      const background = container.querySelector('.hero__background') as HTMLElement;
      expect(background.style.getPropertyValue('--parallax-offset')).toBe('50px');
    });
  });
});
```

### 7.2 Visual Regression Tests

```typescript
// src/tests/visual/sections.test.ts
import { test, expect } from '@playwright/test';

test.describe('Section Components Visual Tests', () => {
  test('hero variants render correctly', async ({ page }) => {
    await page.goto('/styleguide/sections/hero');

    const variants = ['centered', 'split', 'video', 'parallax'];

    for (const variant of variants) {
      await page.click(`[data-variant="${variant}"]`);
      await expect(page).toHaveScreenshot(`hero-${variant}.png`);
    }
  });

  test('feature grid responsive layout', async ({ page }) => {
    await page.goto('/styleguide/sections/features');

    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('features-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('features-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('features-mobile.png');
  });

  test('gallery lightbox interaction', async ({ page }) => {
    await page.goto('/styleguide/sections/gallery');

    // Open lightbox
    await page.click('.gallery__overlay:first-child');
    await expect(page.locator('.lightbox')).toBeVisible();
    await expect(page).toHaveScreenshot('gallery-lightbox-open.png');

    // Navigate
    await page.click('.lightbox__next');
    await expect(page).toHaveScreenshot('gallery-lightbox-next.png');

    // Close
    await page.click('.lightbox__close');
    await expect(page.locator('.lightbox')).toBeHidden();
  });
});
```

---

## 8. Performance Optimizations

### 8.1 Lazy Loading Strategy

```typescript
// src/utils/lazy-load.ts
export class LazyLoader {
  private observer: IntersectionObserver;
  private pendingElements: Map<Element, () => void> = new Map();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '50px',
        threshold: 0.01,
        ...options
      }
    );
  }

  public observe(element: Element, loader: () => void): void {
    this.pendingElements.set(element, loader);
    this.observer.observe(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const loader = this.pendingElements.get(entry.target);
        if (loader) {
          loader();
          this.pendingElements.delete(entry.target);
          this.observer.unobserve(entry.target);
        }
      }
    });
  }

  public disconnect(): void {
    this.observer.disconnect();
    this.pendingElements.clear();
  }
}
```

### 8.2 Component Code Splitting

```typescript
// src/components/sections/index.ts
export const sectionLoaders = {
  hero: () => import('./hero/hero'),
  features: () => import('./features/feature-grid'),
  gallery: () => import('./gallery/gallery'),
  pricing: () => import('./pricing/pricing'),
  testimonials: () => import('./testimonials/testimonials'),
  article: () => import('./content/article')
};

export async function loadSection(type: string): Promise<any> {
  const loader = sectionLoaders[type];
  if (!loader) {
    throw new Error(`Unknown section type: ${type}`);
  }

  const module = await loader();
  return module.default;
}
```

---

## 9. Accessibility Requirements

### 9.1 ARIA Implementation

```typescript
// src/components/sections/accessibility.ts
export function enhanceAccessibility(element: HTMLElement): void {
  // Add live regions for dynamic content
  const dynamicElements = element.querySelectorAll('[data-dynamic]');
  dynamicElements.forEach(el => {
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
  });

  // Ensure proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  validateHeadingHierarchy(headings);

  // Add skip links for long sections
  if (element.offsetHeight > window.innerHeight * 2) {
    addSkipLink(element);
  }

  // Ensure interactive elements are keyboard accessible
  const interactiveElements = element.querySelectorAll(
    'a, button, [role="button"], [tabindex]'
  );
  interactiveElements.forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
  });
}

function validateHeadingHierarchy(headings: NodeListOf<Element>): void {
  let lastLevel = 0;

  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1]);

    if (level - lastLevel > 1) {
      console.warn(
        `Heading hierarchy skip detected: h${lastLevel} to h${level}`,
        heading
      );
    }

    lastLevel = level;
  });
}

function addSkipLink(element: HTMLElement): void {
  const skipLink = document.createElement('a');
  skipLink.href = '#' + (element.id || 'content');
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to end of section';

  element.insertBefore(skipLink, element.firstChild);
}
```

---

## 10. Documentation

### 10.1 Component Documentation

```markdown
# Complex Section Components

## Overview
Complex section components combine basic elements into full-featured layouts
that form complete page sections. These components are the primary building
blocks for constructing pages.

## Available Sections

### Hero Section
Full-width introductory section with multiple layout variants.

**Variants:**
- `centered`: Center-aligned content
- `split`: Two-column layout with content and media
- `video`: Background video support
- `parallax`: Parallax scrolling effect
- `gradient`: Gradient overlay effects

**Usage:**
```nunjucks
{{ hero({
  variant: 'split',
  height: 'tall',
  content: {
    headline: 'Welcome to Our Platform',
    subheadline: 'Build better websites faster',
    description: 'Our tools help you create amazing web experiences.',
    cta: {
      primary: { text: 'Get Started', url: '/signup' },
      secondary: { text: 'Learn More', url: '/features' }
    }
  },
  media: {
    type: 'image',
    source: '/images/hero.jpg',
    position: 'right'
  }
}) }}
```

### Feature Grid
Displays features in various grid layouts.

**Layouts:**
- `grid`: Standard grid layout
- `list`: Vertical list layout
- `cards`: Card-based layout
- `alternating`: Alternating left/right layout

### Gallery
Image gallery with lightbox support.

**Features:**
- Responsive grid layout
- Lightbox viewer
- Lazy loading
- Masonry option
- Touch gestures (mobile)

### Pricing Table
Flexible pricing display with comparison features.

**Features:**
- Monthly/annual toggle
- Plan comparison
- Feature matrix
- Highlight popular plans

### Testimonials
Customer testimonials in various formats.

**Layouts:**
- Grid layout
- Carousel
- Masonry
- Featured testimonial

## Performance Considerations

1. **Lazy Loading**: All media-heavy sections support lazy loading
2. **Code Splitting**: Sections are dynamically imported
3. **Image Optimization**: Automatic WebP generation and srcset
4. **CSS Containment**: Layout containment for better performance

## Accessibility

All section components follow WCAG 2.1 Level AA guidelines:
- Proper heading hierarchy
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA labels and descriptions
```

---

## Deliverables Checklist

### Phase 3 Completed Items

- [x] Hero section component with variants
- [x] Feature grid layouts
- [x] Content/article sections
- [x] Image gallery with lightbox
- [x] Pricing tables with toggle
- [x] Testimonial sections
- [x] Performance optimizations
- [x] Accessibility enhancements
- [x] Component tests
- [x] Visual regression tests
- [x] Documentation

### Integration Points

- [x] Component registry integration
- [x] Build pipeline compatibility
- [x] CSS optimization applied
- [x] Template inheritance working
- [x] JavaScript enhancements
- [x] Lazy loading implemented

### Success Metrics

- [ ] All sections render correctly
- [ ] Lighthouse performance score > 90
- [ ] WCAG 2.1 Level AA compliant
- [ ] Visual regression tests passing
- [ ] < 3kb CSS per section
- [ ] < 5kb JS per section (gzipped)