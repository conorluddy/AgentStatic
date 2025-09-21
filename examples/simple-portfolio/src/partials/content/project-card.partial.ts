/**
 * Project Card Partial
 *
 * Reusable project showcase component with image, description, technologies, and links.
 * Follows CODESTYLE.md principles: Modularity & Reusability, Type Safety.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../../src/types/partial.js';

/**
 * Project link schema
 */
const ProjectLinkSchema = z.object({
  type: z
    .enum(['demo', 'github', 'website', 'download', 'docs', 'video'])
    .describe('Link type'),
  url: z.string().url().describe('Link URL'),
  label: z.string().optional().describe('Custom link label'),
});

/**
 * Project data schema
 */
const ProjectSchema = z.object({
  id: z.string().optional().describe('Unique project identifier'),
  title: z.string().min(1).describe('Project title'),
  description: z.string().min(1).describe('Project description'),
  image: z.string().optional().describe('Project image URL'),
  imageAlt: z.string().optional().describe('Alt text for project image'),
  technologies: z.array(z.string()).default([]).describe('Technologies used'),
  links: z.array(ProjectLinkSchema).default([]).describe('Project links'),
  category: z.string().optional().describe('Project category'),
  featured: z.boolean().default(false).describe('Whether project is featured'),
  status: z
    .enum(['completed', 'in-progress', 'planned'])
    .default('completed')
    .describe('Project status'),
  year: z.number().optional().describe('Project year'),
});

/**
 * Project card component props schema
 */
const ProjectCardPropsSchema = z.object({
  project: ProjectSchema.describe('Project data'),
  variant: z
    .enum(['card', 'list', 'minimal'])
    .default('card')
    .describe('Display variant'),
  showCategory: z.boolean().default(true).describe('Show project category'),
  showStatus: z.boolean().default(false).describe('Show project status'),
  showYear: z.boolean().default(false).describe('Show project year'),
  showTechnologies: z.boolean().default(true).describe('Show technology tags'),
  lazyLoad: z
    .boolean()
    .default(true)
    .describe('Enable lazy loading for images'),
});

type ProjectCardProps = z.infer<typeof ProjectCardPropsSchema>;

/**
 * Project card partial implementation
 */
export const projectCardPartial: AgentPartial<ProjectCardProps> = {
  schema: ProjectCardPropsSchema,

  template: props => {
    const {
      project,
      variant,
      showCategory,
      showStatus,
      showYear,
      showTechnologies,
      lazyLoad,
    } = props;

    // Link type configurations
    const linkTypes = {
      demo: { icon: '🚀', label: 'Live Demo' },
      github: { icon: '💻', label: 'Source Code' },
      website: { icon: '🌐', label: 'Website' },
      download: { icon: '⬇️', label: 'Download' },
      docs: { icon: '📚', label: 'Documentation' },
      video: { icon: '🎥', label: 'Video' },
    };

    // Status configurations
    const statusConfig = {
      completed: { label: 'Completed', class: 'completed' },
      'in-progress': { label: 'In Progress', class: 'in-progress' },
      planned: { label: 'Planned', class: 'planned' },
    };

    // Generate technology tags
    const technologiesHtml =
      showTechnologies && project.technologies.length > 0
        ? `
      <div class="project-card__technologies">
        <ul class="tech-list">
          ${project.technologies
            .map(
              tech => `
            <li class="tech-item">
              <span class="tech-tag">${tech}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `
        : '';

    // Generate project links
    const linksHtml =
      project.links.length > 0
        ? `
      <div class="project-card__links">
        ${project.links
          .map(link => {
            const linkConfig = linkTypes[link.type];
            const label = link.label || linkConfig.label;

            return `
            <a 
              href="${link.url}" 
              class="project-link project-link--${link.type}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="${label} for ${project.title}"
            >
              <span class="project-link__icon" aria-hidden="true">${linkConfig.icon}</span>
              <span class="project-link__text">${label}</span>
            </a>
          `;
          })
          .join('')}
      </div>
    `
        : '';

    // Generate meta information
    const metaItems = [];
    if (showCategory && project.category) {
      metaItems.push(
        `<span class="project-meta__category">${project.category}</span>`
      );
    }
    if (showYear && project.year) {
      metaItems.push(`<span class="project-meta__year">${project.year}</span>`);
    }
    if (showStatus) {
      const status = statusConfig[project.status];
      metaItems.push(
        `<span class="project-meta__status project-meta__status--${status.class}">${status.label}</span>`
      );
    }

    const metaHtml =
      metaItems.length > 0
        ? `
      <div class="project-card__meta">
        ${metaItems.join('')}
      </div>
    `
        : '';

    // Generate image
    const imageHtml = project.image
      ? `
      <div class="project-card__image">
        <img 
          src="${project.image}" 
          alt="${project.imageAlt || project.title}"
          class="project-image"
          ${lazyLoad ? 'loading="lazy"' : 'loading="eager"'}
        />
        ${project.featured ? '<span class="project-featured-badge" aria-label="Featured project">⭐</span>' : ''}
      </div>
    `
      : '';

    return `
      <article class="project-card project-card--${variant} ${project.featured ? 'project-card--featured' : ''}" ${project.id ? `data-project-id="${project.id}"` : ''}>
        
        ${imageHtml}
        
        <div class="project-card__content">
          
          <!-- Project Header -->
          <header class="project-card__header">
            <h3 class="project-card__title">${project.title}</h3>
            ${metaHtml}
          </header>
          
          <!-- Project Description -->
          <div class="project-card__body">
            <p class="project-card__description">${project.description}</p>
            ${technologiesHtml}
          </div>
          
          <!-- Project Actions -->
          ${
            linksHtml
              ? `
            <footer class="project-card__footer">
              ${linksHtml}
            </footer>
          `
              : ''
          }
          
        </div>
        
      </article>
    `;
  },

  styles: `
    /* Project Card Base Styles */
    .project-card {
      display: flex;
      flex-direction: column;
      background-color: var(--color-background, #ffffff);
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: var(--color-primary, #3b82f6);
    }

    .project-card--featured {
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
    }

    .project-card--featured::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary, #3b82f6), var(--color-primary-dark, #2563eb));
    }

    /* Project Card Variants */
    .project-card--list {
      flex-direction: row;
      align-items: flex-start;
    }

    .project-card--list .project-card__image {
      flex-shrink: 0;
      width: 200px;
      height: 150px;
    }

    .project-card--list .project-card__content {
      flex: 1;
      padding: var(--spacing-md, 1.5rem);
    }

    .project-card--minimal {
      border: none;
      background-color: transparent;
      padding: var(--spacing-sm, 1rem);
    }

    .project-card--minimal:hover {
      transform: none;
      box-shadow: none;
      background-color: var(--color-surface, #f9fafb);
    }

    /* Project Image */
    .project-card__image {
      position: relative;
      overflow: hidden;
      background-color: var(--color-surface, #f9fafb);
    }

    .project-card--card .project-card__image {
      aspect-ratio: 16 / 10;
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image {
      transform: scale(1.05);
    }

    .project-featured-badge {
      position: absolute;
      top: var(--spacing-sm, 1rem);
      right: var(--spacing-sm, 1rem);
      background-color: var(--color-primary, #3b82f6);
      color: white;
      padding: var(--spacing-xs, 0.5rem);
      border-radius: 50%;
      font-size: 0.875rem;
      line-height: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    /* Project Content */
    .project-card__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: var(--spacing-md, 1.5rem);
    }

    .project-card--minimal .project-card__content {
      padding: var(--spacing-sm, 1rem) 0;
    }

    /* Project Header */
    .project-card__header {
      margin-bottom: var(--spacing-sm, 1rem);
    }

    .project-card__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text, #1f2937);
      margin: 0 0 var(--spacing-xs, 0.5rem) 0;
      line-height: 1.3;
    }

    /* Project Meta */
    .project-card__meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs, 0.5rem);
      font-size: 0.875rem;
    }

    .project-meta__category {
      color: var(--color-primary, #3b82f6);
      font-weight: 500;
    }

    .project-meta__year {
      color: var(--color-text-light, #6b7280);
    }

    .project-meta__status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-meta__status--completed {
      background-color: #dcfce7;
      color: #166534;
    }

    .project-meta__status--in-progress {
      background-color: #fef3c7;
      color: #92400e;
    }

    .project-meta__status--planned {
      background-color: #e0e7ff;
      color: #3730a3;
    }

    /* Project Body */
    .project-card__body {
      flex: 1;
      margin-bottom: var(--spacing-md, 1.5rem);
    }

    .project-card__description {
      color: var(--color-text-light, #6b7280);
      line-height: 1.6;
      margin: 0 0 var(--spacing-sm, 1rem) 0;
    }

    /* Technologies */
    .project-card__technologies {
      margin-top: var(--spacing-sm, 1rem);
    }

    .tech-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs, 0.5rem);
    }

    .tech-item {
      display: flex;
    }

    .tech-tag {
      background-color: var(--color-surface, #f9fafb);
      color: var(--color-text, #1f2937);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid var(--color-border, #e5e7eb);
    }

    /* Project Links */
    .project-card__links {
      display: flex;
      gap: var(--spacing-sm, 1rem);
      flex-wrap: wrap;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
      padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: 1px solid var(--color-border, #e5e7eb);
      background-color: var(--color-background, #ffffff);
      color: var(--color-text, #1f2937);
    }

    .project-link:hover,
    .project-link:focus {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      border-color: var(--color-primary, #3b82f6);
      transform: translateY(-1px);
      outline: none;
    }

    .project-link--demo {
      background-color: var(--color-primary, #3b82f6);
      color: white;
      border-color: var(--color-primary, #3b82f6);
    }

    .project-link--demo:hover,
    .project-link--demo:focus {
      background-color: var(--color-primary-dark, #2563eb);
      border-color: var(--color-primary-dark, #2563eb);
    }

    .project-link__icon {
      font-size: 1rem;
      line-height: 1;
    }

    .project-link__text {
      white-space: nowrap;
    }

    /* Responsive Design */
    @media (max-width: 767px) {
      .project-card--list {
        flex-direction: column;
      }
      
      .project-card--list .project-card__image {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 10;
      }
      
      .project-card__links {
        justify-content: center;
      }
      
      .project-link {
        flex: 1;
        justify-content: center;
        min-width: 120px;
      }
    }

    /* Grid Layout Support */
    .projects-grid {
      display: grid;
      gap: var(--spacing-lg, 2rem);
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .projects-grid--large {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    .projects-grid--small {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    /* List Layout Support */
    .projects-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg, 2rem);
    }

    .projects-list .project-card {
      max-width: none;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .project-card,
      .project-image,
      .project-link {
        transition: none;
        transform: none;
      }
      
      .project-card:hover {
        transform: none;
      }
      
      .project-card:hover .project-image {
        transform: none;
      }
      
      .project-link:hover {
        transform: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .project-card {
        border-width: 2px;
      }
      
      .tech-tag,
      .project-link {
        border-width: 2px;
      }
      
      .project-meta__status {
        border: 2px solid currentColor;
      }
    }

    /* Print styles */
    @media print {
      .project-card {
        break-inside: avoid;
        border: 1px solid #000;
        box-shadow: none;
      }
      
      .project-card:hover {
        transform: none;
        box-shadow: none;
      }
      
      .project-link {
        border: 1px solid #000;
      }
      
      .project-link::after {
        content: " (" attr(href) ")";
        font-size: 0.75rem;
        color: #666;
      }
    }
  `,

  metadata: {
    description:
      'Reusable project showcase component with image, technologies, and links',
    category: 'content',
    keywords: [
      'project',
      'portfolio',
      'showcase',
      'card',
      'gallery',
      'technologies',
    ],
    usageExamples: [
      'Portfolio project galleries',
      'Work showcase grids',
      'Case study previews',
      'Featured project highlights',
    ],
  },
};
