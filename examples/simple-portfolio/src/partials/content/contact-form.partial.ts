/**
 * Contact Form Partial
 *
 * Type-safe contact form with validation and accessibility features.
 * Follows CODESTYLE.md principles: Fail Fast, Human-Centric Design.
 */

import { z } from 'zod';
import type { AgentPartial } from '../../../../../src/types/partial';

/**
 * Form field schema
 */
const FormFieldSchema = z.object({
  name: z.string().min(1).describe('Field name attribute'),
  label: z.string().min(1).describe('Field label text'),
  type: z
    .enum(['text', 'email', 'tel', 'url', 'textarea', 'select'])
    .describe('Input type'),
  placeholder: z.string().optional().describe('Placeholder text'),
  required: z.boolean().default(false).describe('Whether field is required'),
  options: z.array(z.string()).optional().describe('Options for select fields'),
  validation: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(),
    })
    .optional()
    .describe('Validation rules'),
});

/**
 * Submit button schema
 */
const SubmitButtonSchema = z.object({
  text: z.string().default('Send Message').describe('Button text'),
  variant: z
    .enum(['primary', 'secondary'])
    .default('primary')
    .describe('Button style'),
  loadingText: z.string().default('Sending...').describe('Loading state text'),
});

/**
 * Contact form component props schema
 */
const ContactFormPropsSchema = z.object({
  title: z.string().optional().describe('Form section title'),
  subtitle: z.string().optional().describe('Form section subtitle'),
  description: z.string().optional().describe('Form description text'),
  fields: z.array(FormFieldSchema).describe('Form fields configuration'),
  submitButton: SubmitButtonSchema.default({}).describe(
    'Submit button configuration'
  ),
  action: z.string().optional().describe('Form action URL'),
  method: z.enum(['POST', 'GET']).default('POST').describe('Form method'),
  showRequiredIndicator: z
    .boolean()
    .default(true)
    .describe('Show required field indicators'),
  enableClientValidation: z
    .boolean()
    .default(true)
    .describe('Enable client-side validation'),
  successMessage: z
    .string()
    .default('Thank you! Your message has been sent.')
    .describe('Success message'),
  errorMessage: z
    .string()
    .default(
      'Sorry, there was an error sending your message. Please try again.'
    )
    .describe('Error message'),
});

type ContactFormProps = z.infer<typeof ContactFormPropsSchema>;

/**
 * Contact form partial implementation
 */
export const contactFormPartial: AgentPartial<ContactFormProps> = {
  schema: ContactFormPropsSchema,

  template: props => {
    const {
      title,
      subtitle,
      description,
      fields,
      submitButton,
      action,
      method,
      showRequiredIndicator,
      enableClientValidation,
      successMessage,
      errorMessage,
    } = props;

    // Generate form fields
    const fieldsHtml = fields
      .map(field => {
        const fieldId = `field-${field.name}`;
        const isRequired = field.required;
        const validation = field.validation || {};

        // Build validation attributes
        const validationAttrs = [];
        if (isRequired) validationAttrs.push('required');
        if (validation.minLength)
          validationAttrs.push(`minlength="${validation.minLength}"`);
        if (validation.maxLength)
          validationAttrs.push(`maxlength="${validation.maxLength}"`);
        if (validation.pattern)
          validationAttrs.push(`pattern="${validation.pattern}"`);

        const commonAttrs = [
          `id="${fieldId}"`,
          `name="${field.name}"`,
          `class="form-field__input"`,
          ...validationAttrs,
          field.placeholder ? `placeholder="${field.placeholder}"` : '',
        ]
          .filter(Boolean)
          .join(' ');

        let inputHtml = '';

        switch (field.type) {
          case 'textarea':
            inputHtml = `
            <textarea 
              ${commonAttrs}
              rows="4"
              aria-describedby="${fieldId}-error"
            ></textarea>
          `;
            break;

          case 'select':
            const options = field.options || [];
            inputHtml = `
            <select 
              ${commonAttrs}
              aria-describedby="${fieldId}-error"
            >
              <option value="">Choose...</option>
              ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
          `;
            break;

          default:
            inputHtml = `
            <input 
              type="${field.type}"
              ${commonAttrs}
              aria-describedby="${fieldId}-error"
            />
          `;
        }

        return `
        <div class="form-field ${isRequired ? 'form-field--required' : ''}">
          <label for="${fieldId}" class="form-field__label">
            ${field.label}
            ${isRequired && showRequiredIndicator ? '<span class="required-indicator" aria-label="required">*</span>' : ''}
          </label>
          ${inputHtml}
          <div class="form-field__error" id="${fieldId}-error" role="alert" aria-live="polite"></div>
        </div>
      `;
      })
      .join('');

    return `
      <section class="contact-form-section" id="contact">
        <div class="contact-form__container">
          
          ${
            title || subtitle || description
              ? `
            <!-- Form Header -->
            <header class="contact-form__header">
              ${title ? `<h2 class="contact-form__title">${title}</h2>` : ''}
              ${subtitle ? `<p class="contact-form__subtitle">${subtitle}</p>` : ''}
              ${description ? `<p class="contact-form__description">${description}</p>` : ''}
            </header>
          `
              : ''
          }
          
          <!-- Contact Form -->
          <div class="contact-form__wrapper">
            <form 
              class="contact-form" 
              ${action ? `action="${action}"` : ''} 
              method="${method}"
              novalidate="${enableClientValidation ? 'false' : 'true'}"
              data-contact-form
            >
              
              <!-- Form Fields -->
              <div class="form-fields">
                ${fieldsHtml}
              </div>
              
              <!-- Form Actions -->
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="form-submit form-submit--${submitButton.variant}"
                  data-submit-button
                >
                  <span class="submit-text" data-submit-text>${submitButton.text}</span>
                  <span class="submit-loading" data-submit-loading style="display: none;">
                    <span class="loading-spinner" aria-hidden="true"></span>
                    ${submitButton.loadingText}
                  </span>
                </button>
              </div>
              
              <!-- Form Messages -->
              <div class="form-messages">
                <div class="form-message form-message--success" data-success-message style="display: none;" role="alert">
                  ${successMessage}
                </div>
                <div class="form-message form-message--error" data-error-message style="display: none;" role="alert">
                  ${errorMessage}
                </div>
              </div>
              
            </form>
          </div>
          
        </div>
      </section>

      ${
        enableClientValidation
          ? `
        <script>
          // Contact form validation and submission
          document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('[data-contact-form]');
            const submitButton = document.querySelector('[data-submit-button]');
            const submitText = document.querySelector('[data-submit-text]');
            const submitLoading = document.querySelector('[data-submit-loading]');
            const successMessage = document.querySelector('[data-success-message]');
            const errorMessage = document.querySelector('[data-error-message]');
            
            if (!form) return;
            
            // Validation patterns
            const validationRules = {
              email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
              tel: /^[\\d\\s\\-\\+\\(\\)]+$/,
              url: /^https?:\\/\\/.+/
            };
            
            // Validate individual field
            function validateField(field) {
              const fieldContainer = field.closest('.form-field');
              const errorElement = fieldContainer.querySelector('.form-field__error');
              const fieldType = field.type;
              const value = field.value.trim();
              const isRequired = field.hasAttribute('required');
              
              // Clear previous errors
              fieldContainer.classList.remove('form-field--error');
              errorElement.textContent = '';
              
              // Required field validation
              if (isRequired && !value) {
                showFieldError(fieldContainer, errorElement, 'This field is required.');
                return false;
              }
              
              // Type-specific validation
              if (value && validationRules[fieldType] && !validationRules[fieldType].test(value)) {
                let errorMsg = 'Please enter a valid value.';
                if (fieldType === 'email') errorMsg = 'Please enter a valid email address.';
                if (fieldType === 'tel') errorMsg = 'Please enter a valid phone number.';
                if (fieldType === 'url') errorMsg = 'Please enter a valid URL.';
                
                showFieldError(fieldContainer, errorElement, errorMsg);
                return false;
              }
              
              // Length validation
              const minLength = field.getAttribute('minlength');
              const maxLength = field.getAttribute('maxlength');
              
              if (minLength && value.length < parseInt(minLength)) {
                showFieldError(fieldContainer, errorElement, \`Minimum \${minLength} characters required.\`);
                return false;
              }
              
              if (maxLength && value.length > parseInt(maxLength)) {
                showFieldError(fieldContainer, errorElement, \`Maximum \${maxLength} characters allowed.\`);
                return false;
              }
              
              // Pattern validation
              const pattern = field.getAttribute('pattern');
              if (pattern && !new RegExp(pattern).test(value)) {
                showFieldError(fieldContainer, errorElement, 'Please match the required format.');
                return false;
              }
              
              return true;
            }
            
            function showFieldError(container, errorElement, message) {
              container.classList.add('form-field--error');
              errorElement.textContent = message;
            }
            
            // Real-time validation
            form.addEventListener('input', function(e) {
              if (e.target.matches('.form-field__input')) {
                validateField(e.target);
              }
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              
              // Validate all fields
              const fields = form.querySelectorAll('.form-field__input');
              let isValid = true;
              
              fields.forEach(field => {
                if (!validateField(field)) {
                  isValid = false;
                }
              });
              
              if (!isValid) {
                // Focus first error field
                const firstError = form.querySelector('.form-field--error .form-field__input');
                if (firstError) {
                  firstError.focus();
                }
                return;
              }
              
              // Show loading state
              setLoadingState(true);
              hideMessages();
              
              // Simulate form submission (replace with actual implementation)
              setTimeout(() => {
                // For demo purposes, we'll show success
                // In real implementation, submit to server
                setLoadingState(false);
                showSuccessMessage();
                form.reset();
              }, 2000);
            });
            
            function setLoadingState(loading) {
              submitButton.disabled = loading;
              submitText.style.display = loading ? 'none' : 'inline';
              submitLoading.style.display = loading ? 'flex' : 'none';
            }
            
            function showSuccessMessage() {
              successMessage.style.display = 'block';
              setTimeout(() => {
                successMessage.style.display = 'none';
              }, 5000);
            }
            
            function showErrorMessage() {
              errorMessage.style.display = 'block';
              setTimeout(() => {
                errorMessage.style.display = 'none';
              }, 5000);
            }
            
            function hideMessages() {
              successMessage.style.display = 'none';
              errorMessage.style.display = 'none';
            }
          });
        </script>
      `
          : ''
      }
    `;
  },

  styles: `
    /* Contact Form Section */
    .contact-form-section {
      padding: var(--spacing-xl, 3rem) 0;
      background-color: var(--color-surface, #f9fafb);
    }

    .contact-form__container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 var(--spacing-sm, 1rem);
    }

    /* Form Header */
    .contact-form__header {
      text-align: center;
      margin-bottom: var(--spacing-xl, 3rem);
    }

    .contact-form__title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text, #1f2937);
      margin: 0 0 var(--spacing-sm, 1rem) 0;
    }

    .contact-form__subtitle {
      font-size: 1.25rem;
      color: var(--color-primary, #3b82f6);
      font-weight: 600;
      margin: 0 0 var(--spacing-sm, 1rem) 0;
    }

    .contact-form__description {
      color: var(--color-text-light, #6b7280);
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }

    /* Form Wrapper */
    .contact-form__wrapper {
      background-color: var(--color-background, #ffffff);
      border-radius: 12px;
      padding: var(--spacing-xl, 3rem);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--color-border, #e5e7eb);
    }

    /* Form Fields */
    .form-fields {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg, 2rem);
      margin-bottom: var(--spacing-xl, 3rem);
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 0.5rem);
    }

    .form-field__label {
      font-weight: 600;
      color: var(--color-text, #1f2937);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .required-indicator {
      color: var(--color-error, #dc2626);
      font-weight: 700;
    }

    /* Form Inputs */
    .form-field__input {
      padding: var(--spacing-sm, 1rem);
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: 8px;
      font-size: 1rem;
      line-height: 1.5;
      background-color: var(--color-background, #ffffff);
      color: var(--color-text, #1f2937);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-field__input:focus {
      outline: none;
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-field__input::placeholder {
      color: var(--color-text-light, #6b7280);
    }

    /* Textarea Specific */
    textarea.form-field__input {
      resize: vertical;
      min-height: 120px;
      font-family: inherit;
    }

    /* Select Specific */
    select.form-field__input {
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      appearance: none;
    }

    /* Error States */
    .form-field--error .form-field__input {
      border-color: var(--color-error, #dc2626);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .form-field__error {
      color: var(--color-error, #dc2626);
      font-size: 0.875rem;
      font-weight: 500;
      min-height: 1.25rem;
      display: flex;
      align-items: center;
    }

    /* Submit Button */
    .form-actions {
      margin-bottom: var(--spacing-lg, 2rem);
    }

    .form-submit {
      width: 100%;
      padding: var(--spacing-sm, 1rem) var(--spacing-lg, 2rem);
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs, 0.5rem);
    }

    .form-submit--primary {
      background-color: var(--color-primary, #3b82f6);
      color: white;
    }

    .form-submit--primary:hover:not(:disabled) {
      background-color: var(--color-primary-dark, #2563eb);
      transform: translateY(-1px);
    }

    .form-submit--primary:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    .form-submit--secondary {
      background-color: var(--color-text, #1f2937);
      color: white;
    }

    .form-submit--secondary:hover:not(:disabled) {
      background-color: var(--color-text-light, #6b7280);
      transform: translateY(-1px);
    }

    .form-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .submit-loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.5rem);
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Form Messages */
    .form-messages {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 1rem);
    }

    .form-message {
      padding: var(--spacing-sm, 1rem);
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
    }

    .form-message--success {
      background-color: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .form-message--error {
      background-color: #fee2e2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    /* Responsive Design */
    @media (max-width: 767px) {
      .contact-form-section {
        padding: var(--spacing-lg, 2rem) 0;
      }
      
      .contact-form__wrapper {
        padding: var(--spacing-lg, 2rem);
        border-radius: 8px;
      }
      
      .contact-form__title {
        font-size: 1.75rem;
      }
      
      .form-fields {
        gap: var(--spacing-md, 1.5rem);
        margin-bottom: var(--spacing-lg, 2rem);
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .form-field__input,
      .form-submit {
        transition: none;
      }
      
      .form-submit:hover:not(:disabled) {
        transform: none;
      }
      
      .loading-spinner {
        animation: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .form-field__input,
      .form-submit {
        border-width: 2px;
      }
      
      .form-field--error .form-field__input {
        border-width: 3px;
      }
    }

    /* Focus management */
    .form-field__input:focus-visible {
      outline: 2px solid var(--color-primary, #3b82f6);
      outline-offset: 2px;
    }

    .form-submit:focus-visible {
      outline: 2px solid var(--color-background, #ffffff);
      outline-offset: 2px;
    }

    /* Print styles */
    @media print {
      .contact-form-section {
        background: white;
      }
      
      .contact-form__wrapper {
        box-shadow: none;
        border: 1px solid #000;
      }
      
      .form-submit,
      .form-messages {
        display: none;
      }
    }
  `,

  metadata: {
    description:
      'Type-safe contact form with validation and accessibility features',
    category: 'content',
    keywords: ['contact', 'form', 'validation', 'accessibility', 'type-safe'],
    usageExamples: [
      'Contact forms with client-side validation',
      'Newsletter signup forms',
      'Feedback and support forms',
      'Custom inquiry forms',
    ],
  },
};
