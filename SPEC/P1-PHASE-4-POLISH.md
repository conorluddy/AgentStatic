# Phase 4: Component Polish & Refinement
## Timeline: Weeks 7-8 (Dec 16-29, 2024)

### Overview
This final phase focuses on polishing all components, adding advanced interactions, optimizing performance, and ensuring production readiness. It includes animations, micro-interactions, advanced accessibility features, and comprehensive testing.

### Prerequisites
- All basic and complex components implemented
- Component registry fully operational
- Build pipeline optimized
- Initial testing complete

---

## 1. Animation System

### 1.1 Animation Framework

```typescript
// src/animations/types.ts
export interface AnimationConfig {
  type: 'entrance' | 'exit' | 'attention' | 'interaction';
  name: string;
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
  threshold?: number;
  once?: boolean;
}

export type EasingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'spring'
  | 'bounce'
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export interface AnimationOptions {
  rootMargin?: string;
  threshold?: number | number[];
  respectReducedMotion?: boolean;
}
```

### 1.2 Animation Controller

```typescript
// src/animations/controller.ts
export class AnimationController {
  private observer: IntersectionObserver;
  private animatedElements: Map<Element, AnimationConfig> = new Map();
  private prefersReducedMotion: boolean;

  constructor(options: AnimationOptions = {}) {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0.1
      }
    );

    this.init();
  }

  private init(): void {
    // Auto-discover animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      const config = this.parseAnimationConfig(el);
      this.register(el, config);
    });

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', e => {
        this.prefersReducedMotion = e.matches;
        if (e.matches) {
          this.disableAllAnimations();
        }
      });
  }

  private parseAnimationConfig(element: Element): AnimationConfig {
    const dataset = (element as HTMLElement).dataset;

    return {
      type: (dataset.animateType as any) || 'entrance',
      name: dataset.animate || 'fade-up',
      duration: parseInt(dataset.animateDuration || '600'),
      delay: parseInt(dataset.animateDelay || '0'),
      easing: (dataset.animateEasing as EasingFunction) || 'ease-out',
      threshold: parseFloat(dataset.animateThreshold || '0.1'),
      once: dataset.animateOnce !== 'false'
    };
  }

  public register(element: Element, config: AnimationConfig): void {
    this.animatedElements.set(element, config);
    this.observer.observe(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (this.prefersReducedMotion) return;

    entries.forEach(entry => {
      const config = this.animatedElements.get(entry.target);
      if (!config) return;

      if (entry.isIntersecting) {
        this.animateIn(entry.target as HTMLElement, config);

        if (config.once) {
          this.observer.unobserve(entry.target);
          this.animatedElements.delete(entry.target);
        }
      } else if (!config.once) {
        this.animateOut(entry.target as HTMLElement, config);
      }
    });
  }

  private animateIn(element: HTMLElement, config: AnimationConfig): void {
    element.style.setProperty('--animation-duration', `${config.duration}ms`);
    element.style.setProperty('--animation-delay', `${config.delay}ms`);
    element.style.setProperty('--animation-easing', config.easing!);

    // Remove exit class, add entrance class
    element.classList.remove(`animate-out-${config.name}`);
    element.classList.add(`animate-in-${config.name}`);
  }

  private animateOut(element: HTMLElement, config: AnimationConfig): void {
    element.classList.remove(`animate-in-${config.name}`);
    element.classList.add(`animate-out-${config.name}`);
  }

  private disableAllAnimations(): void {
    this.animatedElements.forEach((config, element) => {
      (element as HTMLElement).style.animation = 'none';
      element.classList.remove(`animate-in-${config.name}`, `animate-out-${config.name}`);
    });
  }

  public destroy(): void {
    this.observer.disconnect();
    this.animatedElements.clear();
  }
}
```

### 1.3 Animation Styles

```scss
// src/styles/animations/_keyframes.scss
@use 'sass:math';

// Fade animations
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

// Slide animations
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Scale animations
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

// Rotate animations
@keyframes rotate-in {
  from {
    opacity: 0;
    transform: rotate(-5deg) scale(0.95);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

// Attention seekers
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-0.5rem); }
  20%, 40%, 60%, 80% { transform: translateX(0.5rem); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-1rem); }
  60% { transform: translateY(-0.5rem); }
}

// Spring effect using cubic-bezier
@function spring($tension: 0.5) {
  @return cubic-bezier(0.68, #{-0.55 * $tension}, 0.265, #{1.55 * $tension});
}
```

### 1.4 Animation Utilities

```scss
// src/styles/animations/_utilities.scss
[data-animate] {
  // Initial hidden state for entrance animations
  &:not(.animate-in-*) {
    opacity: 0;
  }
}

// Animation classes
@each $name in (fade-up, fade-down, slide-left, slide-right, scale-in, rotate-in) {
  .animate-in-#{$name} {
    animation: #{$name}
      var(--animation-duration, 600ms)
      var(--animation-easing, ease-out)
      var(--animation-delay, 0ms)
      both;
  }
}

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 2. Micro-Interactions

### 2.1 Button Interactions

```typescript
// src/components/interactions/button-ripple.ts
export class ButtonRippleEffect {
  private button: HTMLElement;

  constructor(button: HTMLElement) {
    this.button = button;
    this.init();
  }

  private init(): void {
    this.button.addEventListener('click', this.createRipple.bind(this));
  }

  private createRipple(event: MouseEvent): void {
    const button = this.button;
    const rect = button.getBoundingClientRect();

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    // Calculate position
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;

    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    // Remove after animation
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
}

// Auto-initialize on all buttons with ripple effect
document.querySelectorAll('[data-ripple]').forEach(button => {
  new ButtonRippleEffect(button as HTMLElement);
});
```

```scss
// src/styles/interactions/_ripple.scss
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple-animation 600ms ease-out;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

[data-ripple] {
  position: relative;
  overflow: hidden;
}
```

### 2.2 Hover Effects

```scss
// src/styles/interactions/_hover-effects.scss
// Lift effect
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
}

// Grow effect
.hover-grow {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

// Glow effect
.hover-glow {
  position: relative;
  transition: box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      45deg,
      var(--color-primary),
      var(--color-secondary)
    );
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    filter: blur(10px);
  }

  &:hover::before {
    opacity: 0.7;
  }
}

// Underline effect
.hover-underline {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

// Shine effect
.hover-shine {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
}
```

---

## 3. Advanced Accessibility

### 3.1 Keyboard Navigation Enhancement

```typescript
// src/accessibility/keyboard-nav.ts
export class KeyboardNavigationManager {
  private focusableElements: HTMLElement[] = [];
  private currentIndex: number = -1;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init(): void {
    this.updateFocusableElements();
    this.setupKeyboardHandlers();
    this.setupFocusTrap();
  }

  private updateFocusableElements(): void {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    this.focusableElements = Array.from(
      this.container.querySelectorAll<HTMLElement>(selector)
    );
  }

  private setupKeyboardHandlers(): void {
    this.container.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          this.handleTab(e);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          this.handleNext(e);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          this.handlePrevious(e);
          break;
        case 'Home':
          this.handleHome(e);
          break;
        case 'End':
          this.handleEnd(e);
          break;
      }
    });
  }

  private handleTab(e: KeyboardEvent): void {
    // Let browser handle normal tab behavior
    // This is just for tracking
    const target = e.target as HTMLElement;
    this.currentIndex = this.focusableElements.indexOf(target);
  }

  private handleNext(e: KeyboardEvent): void {
    e.preventDefault();
    this.currentIndex = (this.currentIndex + 1) % this.focusableElements.length;
    this.focusableElements[this.currentIndex].focus();
  }

  private handlePrevious(e: KeyboardEvent): void {
    e.preventDefault();
    this.currentIndex =
      this.currentIndex <= 0
        ? this.focusableElements.length - 1
        : this.currentIndex - 1;
    this.focusableElements[this.currentIndex].focus();
  }

  private handleHome(e: KeyboardEvent): void {
    e.preventDefault();
    this.currentIndex = 0;
    this.focusableElements[0].focus();
  }

  private handleEnd(e: KeyboardEvent): void {
    e.preventDefault();
    this.currentIndex = this.focusableElements.length - 1;
    this.focusableElements[this.currentIndex].focus();
  }

  private setupFocusTrap(): void {
    // Trap focus within container when modal/dialog
    if (this.container.getAttribute('role') === 'dialog') {
      this.container.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const firstElement = this.focusableElements[0];
          const lastElement = this.focusableElements[this.focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }

  public destroy(): void {
    this.focusableElements = [];
  }
}
```

### 3.2 Screen Reader Announcements

```typescript
// src/accessibility/announcer.ts
export class LiveRegionAnnouncer {
  private liveRegion: HTMLElement;

  constructor() {
    this.liveRegion = this.createLiveRegion();
  }

  private createLiveRegion(): HTMLElement {
    const region = document.createElement('div');
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
    return region;
  }

  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.liveRegion.setAttribute('aria-live', priority);

    // Clear and set message
    this.liveRegion.textContent = '';
    setTimeout(() => {
      this.liveRegion.textContent = message;
    }, 100);
  }

  public announceNavigation(from: string, to: string): void {
    this.announce(`Navigated from ${from} to ${to}`);
  }

  public announceLoading(isLoading: boolean, context?: string): void {
    const message = isLoading
      ? `Loading ${context || 'content'}...`
      : `${context || 'Content'} loaded`;
    this.announce(message);
  }

  public announceError(error: string): void {
    this.announce(`Error: ${error}`, 'assertive');
  }
}

// Global instance
export const announcer = new LiveRegionAnnouncer();
```

---

## 4. Performance Optimization

### 4.1 Critical CSS Extraction

```typescript
// build/plugins/critical-css.ts
import { critical } from 'critical';
import { promises as fs } from 'fs';
import path from 'path';

export async function extractCriticalCSS(
  htmlPath: string,
  cssPath: string,
  outputPath: string
): Promise<void> {
  try {
    const { css, html } = await critical.generate({
      base: path.dirname(htmlPath),
      src: htmlPath,
      css: [cssPath],
      width: 1300,
      height: 900,
      inline: false,
      extract: true,
      dimensions: [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }  // Desktop
      ]
    });

    await fs.writeFile(outputPath, css);
    console.log(`Critical CSS extracted to ${outputPath}`);
  } catch (error) {
    console.error('Critical CSS extraction failed:', error);
    throw error;
  }
}
```

### 4.2 Resource Hints

```typescript
// src/utils/resource-hints.ts
export interface ResourceHint {
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: 'style' | 'script' | 'font' | 'image' | 'document';
  crossorigin?: boolean;
}

export function generateResourceHints(hints: ResourceHint[]): string {
  return hints
    .map(hint => {
      const attrs = [`rel="${hint.type}"`, `href="${hint.href}"`];

      if (hint.as) attrs.push(`as="${hint.as}"`);
      if (hint.crossorigin) attrs.push('crossorigin');

      return `<link ${attrs.join(' ')}>`;
    })
    .join('\n');
}

// Example usage in templates
export const commonResourceHints: ResourceHint[] = [
  { type: 'preconnect', href: 'https://fonts.googleapis.com' },
  { type: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  { type: 'preload', href: '/fonts/main.woff2', as: 'font', crossorigin: true },
  { type: 'preload', href: '/styles/critical.css', as: 'style' },
  { type: 'prefetch', href: '/scripts/main.js', as: 'script' }
];
```

### 4.3 Image Optimization

```typescript
// src/utils/image-optimizer.ts
import sharp from 'sharp';
import { promises as fs } from 'fs';

export interface ImageOptimizationOptions {
  formats?: Array<'webp' | 'avif' | 'jpeg' | 'png'>;
  sizes?: number[];
  quality?: number;
}

export async function optimizeImage(
  inputPath: string,
  outputDir: string,
  options: ImageOptimizationOptions = {}
): Promise<Map<string, string[]>> {
  const {
    formats = ['webp', 'jpeg'],
    sizes = [320, 640, 960, 1280, 1920],
    quality = 80
  } = options;

  const results = new Map<string, string[]>();
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  for (const format of formats) {
    const outputs: string[] = [];

    for (const size of sizes) {
      // Skip if size is larger than original
      if (metadata.width && size > metadata.width) continue;

      const outputPath = `${outputDir}/${path.basename(
        inputPath,
        path.extname(inputPath)
      )}-${size}.${format}`;

      await image
        .clone()
        .resize(size, null, { withoutEnlargement: true })
        .toFormat(format, { quality })
        .toFile(outputPath);

      outputs.push(outputPath);
    }

    results.set(format, outputs);
  }

  return results;
}

export function generateSrcSet(images: string[]): string {
  return images
    .map(img => {
      const width = img.match(/-(\d+)\./)?.[1];
      return `${img} ${width}w`;
    })
    .join(', ');
}
```

---

## 5. Form Enhancements

### 5.1 Advanced Form Validation

```typescript
// src/components/forms/validator.ts
export interface ValidationRule {
  type: 'required' | 'email' | 'url' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
}

export class FormValidator {
  private form: HTMLFormElement;
  private rules: Map<string, ValidationRule[]> = new Map();
  private errors: Map<string, string[]> = new Map();

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.init();
  }

  private init(): void {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Add real-time validation
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field as HTMLInputElement));
      field.addEventListener('input', () => this.clearFieldError(field as HTMLInputElement));
    });
  }

  public addRule(fieldName: string, rule: ValidationRule): void {
    if (!this.rules.has(fieldName)) {
      this.rules.set(fieldName, []);
    }
    this.rules.get(fieldName)!.push(rule);
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    this.errors.clear();
    let isValid = true;

    // Validate all fields
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!this.validateField(field as HTMLInputElement)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.onSuccess();
    } else {
      this.onError();
    }
  }

  private validateField(field: HTMLInputElement): boolean {
    const rules = this.rules.get(field.name);
    if (!rules) return true;

    const fieldErrors: string[] = [];

    rules.forEach(rule => {
      if (!this.checkRule(field.value, rule)) {
        fieldErrors.push(rule.message);
      }
    });

    if (fieldErrors.length > 0) {
      this.errors.set(field.name, fieldErrors);
      this.showFieldError(field, fieldErrors[0]);
      return false;
    }

    this.clearFieldError(field);
    return true;
  }

  private checkRule(value: any, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'required':
        return value.trim().length > 0;

      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      case 'url':
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }

      case 'minLength':
        return value.length >= rule.value;

      case 'maxLength':
        return value.length <= rule.value;

      case 'pattern':
        return new RegExp(rule.value).test(value);

      case 'custom':
        return rule.validator ? rule.validator(value) : true;

      default:
        return true;
    }
  }

  private showFieldError(field: HTMLInputElement, message: string): void {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('field--error');

    // Create or update error message
    let errorEl = field.parentElement?.querySelector('.field__error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field__error';
      errorEl.id = `${field.id}-error`;
      field.setAttribute('aria-describedby', errorEl.id);
      field.parentElement?.appendChild(errorEl);
    }

    errorEl.textContent = message;

    // Announce to screen readers
    announcer.announce(message, 'assertive');
  }

  private clearFieldError(field: HTMLInputElement): void {
    field.removeAttribute('aria-invalid');
    field.classList.remove('field--error');

    const errorEl = field.parentElement?.querySelector('.field__error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  private onSuccess(): void {
    const formData = new FormData(this.form);
    this.form.dispatchEvent(new CustomEvent('validation:success', {
      detail: { data: Object.fromEntries(formData) }
    }));
  }

  private onError(): void {
    this.form.dispatchEvent(new CustomEvent('validation:error', {
      detail: { errors: Object.fromEntries(this.errors) }
    }));

    // Focus first field with error
    const firstError = this.form.querySelector('[aria-invalid="true"]') as HTMLElement;
    firstError?.focus();
  }
}
```

---

## 6. Testing Suite

### 6.1 Component Testing

```typescript
// src/tests/components/polish.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AnimationController } from '@/animations/controller';
import { FormValidator } from '@/components/forms/validator';

describe('Animation System', () => {
  describe('AnimationController', () => {
    let controller: AnimationController;
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = `
        <div data-animate="fade-up" data-animate-duration="300">
          Test element
        </div>
      `;
      document.body.appendChild(container);
      controller = new AnimationController();
    });

    it('parses animation config correctly', () => {
      const element = container.querySelector('[data-animate]')!;
      const config = (controller as any).parseAnimationConfig(element);

      expect(config.name).toBe('fade-up');
      expect(config.duration).toBe(300);
      expect(config.type).toBe('entrance');
    });

    it('respects reduced motion preference', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: vi.fn()
        }))
      });

      const controller = new AnimationController();
      expect((controller as any).prefersReducedMotion).toBe(true);
    });
  });
});

describe('Form Validation', () => {
  let form: HTMLFormElement;
  let validator: FormValidator;

  beforeEach(() => {
    form = document.createElement('form');
    form.innerHTML = `
      <input type="email" name="email" id="email">
      <input type="text" name="name" id="name">
      <button type="submit">Submit</button>
    `;
    document.body.appendChild(form);
    validator = new FormValidator(form);
  });

  it('validates email format', () => {
    validator.addRule('email', {
      type: 'email',
      message: 'Invalid email'
    });

    const emailField = form.querySelector('[name="email"]') as HTMLInputElement;
    emailField.value = 'invalid-email';

    const isValid = (validator as any).validateField(emailField);
    expect(isValid).toBe(false);

    emailField.value = 'valid@email.com';
    const isValidNow = (validator as any).validateField(emailField);
    expect(isValidNow).toBe(true);
  });

  it('handles custom validation rules', () => {
    validator.addRule('name', {
      type: 'custom',
      message: 'Name must start with capital letter',
      validator: (value) => /^[A-Z]/.test(value)
    });

    const nameField = form.querySelector('[name="name"]') as HTMLInputElement;
    nameField.value = 'john';

    const isValid = (validator as any).validateField(nameField);
    expect(isValid).toBe(false);

    nameField.value = 'John';
    expect((validator as any).validateField(nameField)).toBe(true);
  });
});
```

### 6.2 Performance Testing

```typescript
// src/tests/performance/metrics.test.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test('page load performance meets targets', async ({ page }) => {
    await page.goto('/');

    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      return {
        fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        lcp: 0, // Would be populated by PerformanceObserver
        cls: 0,
        fid: 0,
        ttfb: navigation.responseStart - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart
      };
    });

    // Assert performance targets
    expect(metrics.fcp).toBeLessThan(1800); // FCP < 1.8s
    expect(metrics.ttfb).toBeLessThan(600); // TTFB < 600ms
    expect(metrics.domContentLoaded).toBeLessThan(2000);
  });

  test('critical CSS is inlined', async ({ page }) => {
    await page.goto('/');

    const hasCriticalCSS = await page.evaluate(() => {
      const style = document.querySelector('style[data-critical]');
      return style !== null && style.textContent!.length > 0;
    });

    expect(hasCriticalCSS).toBe(true);
  });

  test('images are lazy loaded', async ({ page }) => {
    await page.goto('/gallery');

    const images = await page.$$('img[loading="lazy"]');
    expect(images.length).toBeGreaterThan(0);
  });
});
```

---

## 7. Documentation

### 7.1 Animation Guide

```markdown
# Animation System Guide

## Overview
The animation system provides a declarative way to add entrance, exit, and
interaction animations to components with automatic support for reduced motion
preferences.

## Basic Usage

### HTML Attributes
```html
<div data-animate="fade-up"
     data-animate-duration="600"
     data-animate-delay="100"
     data-animate-easing="ease-out">
  Content
</div>
```

### Available Animations

**Entrance:**
- `fade-in` - Simple fade in
- `fade-up` - Fade in from below
- `fade-down` - Fade in from above
- `slide-left` - Slide in from right
- `slide-right` - Slide in from left
- `scale-in` - Scale up fade in
- `rotate-in` - Rotate and fade in

**Attention:**
- `pulse` - Pulse scaling effect
- `shake` - Horizontal shake
- `bounce` - Vertical bounce

### JavaScript API

```typescript
import { AnimationController } from '@/animations/controller';

const controller = new AnimationController({
  rootMargin: '50px',
  threshold: 0.1
});

// Register custom animation
controller.register(element, {
  type: 'entrance',
  name: 'custom-fade',
  duration: 800,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});
```

## Accessibility

The system automatically respects `prefers-reduced-motion` by:
- Reducing animation duration to 1ms
- Removing transform effects
- Maintaining layout changes without motion

## Performance

- Uses IntersectionObserver for efficient triggering
- Leverages CSS animations (GPU accelerated)
- Automatic cleanup of one-time animations
