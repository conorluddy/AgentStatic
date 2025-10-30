// components/atoms/input/input.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Input Component Stories
 *
 * Versatile form input component supporting all standard HTML input types:
 * - Text inputs (text, email, password, number, tel, url, search)
 * - Textarea
 * - Select dropdown
 * - Checkbox
 * - Radio button
 *
 * Critical for email capture, contact forms, and lead generation.
 */

// Simple icon SVGs for demos
const emailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`;

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;

const lockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

// Component metadata
const meta: Meta = {
  title: 'Atoms/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'textarea', 'select', 'checkbox', 'radio'],
      description: 'Input type',
      defaultValue: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      defaultValue: 'md',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'Validation state',
      defaultValue: 'default',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Required field',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Versatile form input component supporting all standard HTML input types with comprehensive validation states, icon support, and WCAG AA accessibility compliance. Critical for email capture, contact forms, and lead generation.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Render function - complex component with multiple input types
const renderComponent = (props: any) => {
  const {
    type = 'text',
    size = 'md',
    name = '',
    id = `input-${Math.random().toString(36).substr(2, 9)}`,
    value = '',
    placeholder = '',
    disabled = false,
    readonly = false,
    required = false,
    state = 'default',
    iconStart = '',
    iconEnd = '',
    fullWidth = false,
    rows = 4,
    options = [],
    checked = false,
    label = '',
    ariaLabel = '',
    ariaDescribedBy = '',
    className = '',
    attributes = {},
  } = props;

  // Build class list for standard inputs
  const inputClasses = ['input', `input-${size}`];
  if (state !== 'default') inputClasses.push(`input-${state}`);
  if (iconStart) inputClasses.push('input-with-icon-start');
  if (iconEnd) inputClasses.push('input-with-icon-end');
  if (fullWidth) inputClasses.push('input-full-width');
  if (className) inputClasses.push(className);

  const inputClassStr = inputClasses.join(' ');

  // Build base attributes
  const buildAttrs = (extraClass = '') => {
    let attrs = extraClass ? `class="${extraClass}"` : `class="${inputClassStr}"`;
    if (name) attrs += ` name="${name}"`;
    if (id) attrs += ` id="${id}"`;
    if (disabled) attrs += ` disabled`;
    if (readonly) attrs += ` readonly`;
    if (required) attrs += ` required`;
    if (ariaLabel) attrs += ` aria-label="${ariaLabel}"`;
    if (ariaDescribedBy) attrs += ` aria-describedby="${ariaDescribedBy}"`;
    if (state === 'error') attrs += ` aria-invalid="true"`;
    for (const [key, val] of Object.entries(attributes)) {
      attrs += ` ${key}="${val}"`;
    }
    return attrs;
  };

  // CHECKBOX
  if (type === 'checkbox') {
    return `<label class="input-checkbox input-checkbox-${size} ${className}">
      <input type="checkbox" class="input-checkbox-input" ${name ? `name="${name}"` : ''} ${id ? `id="${id}"` : ''} ${value ? `value="${value}"` : ''} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${ariaLabel ? `aria-label="${ariaLabel}"` : ''} ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}>
      <span class="input-checkbox-label">${label}</span>
      <span class="input-checkbox-box"></span>
    </label>`;
  }

  // RADIO
  if (type === 'radio') {
    return `<label class="input-radio input-radio-${size} ${className}">
      <input type="radio" class="input-radio-input" ${name ? `name="${name}"` : ''} ${id ? `id="${id}"` : ''} ${value ? `value="${value}"` : ''} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${ariaLabel ? `aria-label="${ariaLabel}"` : ''} ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}>
      <span class="input-radio-label">${label}</span>
      <span class="input-radio-circle"></span>
    </label>`;
  }

  // TEXTAREA
  if (type === 'textarea') {
    const textareaClasses = [...inputClasses, 'input-textarea'];
    return `<textarea ${buildAttrs(textareaClasses.join(' '))} ${placeholder ? `placeholder="${placeholder}"` : ''} ${rows ? `rows="${rows}"` : ''}>${value}</textarea>`;
  }

  // SELECT
  if (type === 'select') {
    const selectClasses = [...inputClasses, 'input-select'];
    const selectHtml = `<select ${buildAttrs(selectClasses.join(' '))}>
      ${options.map((opt: any) => `<option value="${opt.value}" ${opt.disabled ? 'disabled' : ''} ${opt.selected ? 'selected' : ''}>${opt.label}</option>`).join('')}
    </select>`;

    if (iconStart || iconEnd) {
      return `<div class="input-wrapper ${fullWidth ? 'input-full-width' : ''}">
        ${iconStart ? `<span class="input-icon input-icon-start" aria-hidden="true">${iconStart}</span>` : ''}
        ${selectHtml}
        ${iconEnd ? `<span class="input-icon input-icon-end" aria-hidden="true">${iconEnd}</span>` : ''}
      </div>`;
    }
    return selectHtml;
  }

  // TEXT INPUTS (text, email, password, etc.)
  const inputHtml = `<input type="${type}" ${buildAttrs()} ${value ? `value="${value}"` : ''} ${placeholder ? `placeholder="${placeholder}"` : ''}>`;

  if (iconStart || iconEnd) {
    return `<div class="input-wrapper ${fullWidth ? 'input-full-width' : ''}">
      ${iconStart ? `<span class="input-icon input-icon-start" aria-hidden="true">${iconStart}</span>` : ''}
      ${inputHtml}
      ${iconEnd ? `<span class="input-icon input-icon-end" aria-hidden="true">${iconEnd}</span>` : ''}
    </div>`;
  }

  return inputHtml;
};

/**
 * Default text input
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
    ariaLabel: 'Text input',
  },
  render: renderComponent,
};

/**
 * Email input - most common for lead capture
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'your@email.com',
    ariaLabel: 'Email address',
  },
  render: renderComponent,
};

/**
 * Email input with icon - for hero email capture
 */
export const EmailWithIcon: Story = {
  args: {
    type: 'email',
    placeholder: 'your@email.com',
    iconStart: emailIcon,
    ariaLabel: 'Email address',
    size: 'lg',
  },
  render: renderComponent,
};

/**
 * Password input with icon
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    iconStart: lockIcon,
    ariaLabel: 'Password',
  },
  render: renderComponent,
};

/**
 * Search input with icon
 */
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    iconStart: searchIcon,
    ariaLabel: 'Search',
  },
  render: renderComponent,
};

/**
 * Textarea for messages
 */
export const Textarea: Story = {
  args: {
    type: 'textarea',
    placeholder: 'Enter your message',
    rows: 6,
    ariaLabel: 'Message',
  },
  render: renderComponent,
};

/**
 * Select dropdown
 */
export const Select: Story = {
  args: {
    type: 'select',
    options: [
      { value: '', label: 'Select country', disabled: true, selected: true },
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
    ariaLabel: 'Country',
  },
  render: renderComponent,
};

/**
 * Checkbox - for terms acceptance
 */
export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    checked: false,
  },
  render: renderComponent,
};

/**
 * Radio button group
 */
export const RadioButtons: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${renderComponent({ type: 'radio', name: 'plan', value: 'monthly', label: 'Monthly billing ($10/month)', checked: true })}
        ${renderComponent({ type: 'radio', name: 'plan', value: 'yearly', label: 'Yearly billing ($100/year - Save 17%)', checked: false })}
      </div>
    `;
  },
};

/**
 * Small size inputs
 */
export const SmallSize: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 300px;">
        ${renderComponent({ type: 'text', size: 'sm', placeholder: 'Small text input', ariaLabel: 'Small text' })}
        ${renderComponent({ type: 'email', size: 'sm', placeholder: 'email@example.com', ariaLabel: 'Small email' })}
        ${renderComponent({ type: 'select', size: 'sm', options: [{ value: '', label: 'Small select' }], ariaLabel: 'Small select' })}
      </div>
    `;
  },
};

/**
 * Medium size inputs (default)
 */
export const MediumSize: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
        ${renderComponent({ type: 'text', size: 'md', placeholder: 'Medium text input', ariaLabel: 'Medium text' })}
        ${renderComponent({ type: 'email', size: 'md', placeholder: 'email@example.com', ariaLabel: 'Medium email' })}
        ${renderComponent({ type: 'select', size: 'md', options: [{ value: '', label: 'Medium select' }], ariaLabel: 'Medium select' })}
      </div>
    `;
  },
};

/**
 * Large size inputs - ideal for hero CTAs
 */
export const LargeSize: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 500px;">
        ${renderComponent({ type: 'text', size: 'lg', placeholder: 'Large text input', ariaLabel: 'Large text' })}
        ${renderComponent({ type: 'email', size: 'lg', placeholder: 'email@example.com', iconStart: emailIcon, ariaLabel: 'Large email' })}
        ${renderComponent({ type: 'select', size: 'lg', options: [{ value: '', label: 'Large select' }], ariaLabel: 'Large select' })}
      </div>
    `;
  },
};

/**
 * Error state - for validation feedback
 */
export const ErrorState: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
        ${renderComponent({ type: 'email', value: 'invalid-email', state: 'error', ariaDescribedBy: 'email-error', ariaLabel: 'Email with error' })}
        <p id="email-error" style="color: #ef4444; font-size: 0.875rem; margin: 0;">Please enter a valid email address</p>

        ${renderComponent({ type: 'text', value: '', state: 'error', placeholder: 'Required field', ariaDescribedBy: 'name-error', ariaLabel: 'Name with error' })}
        <p id="name-error" style="color: #ef4444; font-size: 0.875rem; margin: 0;">This field is required</p>
      </div>
    `;
  },
};

/**
 * Success state - confirms valid input
 */
export const SuccessState: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
        ${renderComponent({ type: 'email', value: 'valid@email.com', state: 'success', ariaLabel: 'Valid email' })}
        <p style="color: #22c55e; font-size: 0.875rem; margin: 0;">Email is valid</p>

        ${renderComponent({ type: 'text', value: 'John Doe', state: 'success', ariaLabel: 'Valid name' })}
        <p style="color: #22c55e; font-size: 0.875rem; margin: 0;">Name accepted</p>
      </div>
    `;
  },
};

/**
 * Warning state
 */
export const WarningState: Story = {
  args: {
    type: 'email',
    value: 'user@example',
    state: 'warning',
    ariaLabel: 'Email with warning',
  },
  render: renderComponent,
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
        ${renderComponent({ type: 'text', value: 'Disabled input', disabled: true, ariaLabel: 'Disabled text' })}
        ${renderComponent({ type: 'email', value: 'disabled@email.com', disabled: true, ariaLabel: 'Disabled email' })}
        ${renderComponent({ type: 'checkbox', label: 'Disabled checkbox', disabled: true })}
        ${renderComponent({ type: 'radio', name: 'disabled', label: 'Disabled radio', disabled: true })}
      </div>
    `;
  },
};

/**
 * Readonly state
 */
export const Readonly: Story = {
  args: {
    type: 'text',
    value: 'Readonly value',
    readonly: true,
    ariaLabel: 'Readonly text',
  },
  render: renderComponent,
};

/**
 * Full width inputs - recommended for mobile
 */
export const FullWidth: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${renderComponent({ type: 'email', placeholder: 'your@email.com', fullWidth: true, ariaLabel: 'Full width email' })}
        ${renderComponent({ type: 'text', placeholder: 'Full name', fullWidth: true, ariaLabel: 'Full width name' })}
        ${renderComponent({ type: 'textarea', placeholder: 'Your message', rows: 4, fullWidth: true, ariaLabel: 'Full width message' })}
      </div>
    `;
  },
};

/**
 * Complete contact form example
 */
export const ContactForm: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px; padding: 1.5rem; background: #f9fafb; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Contact Us</h3>

        <div>
          <label for="name" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Name *</label>
          ${renderComponent({ type: 'text', id: 'name', name: 'name', placeholder: 'John Doe', required: true, fullWidth: true, ariaLabel: 'Name' })}
        </div>

        <div>
          <label for="email" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Email *</label>
          ${renderComponent({ type: 'email', id: 'email', name: 'email', placeholder: 'john@example.com', iconStart: emailIcon, required: true, fullWidth: true, ariaLabel: 'Email' })}
        </div>

        <div>
          <label for="subject" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Subject</label>
          ${renderComponent({ type: 'select', id: 'subject', name: 'subject', options: [
            { value: '', label: 'Select a topic', disabled: true, selected: true },
            { value: 'support', label: 'Technical Support' },
            { value: 'sales', label: 'Sales Inquiry' },
            { value: 'other', label: 'Other' }
          ], fullWidth: true, ariaLabel: 'Subject' })}
        </div>

        <div>
          <label for="message" style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Message *</label>
          ${renderComponent({ type: 'textarea', id: 'message', name: 'message', placeholder: 'How can we help you?', rows: 6, required: true, fullWidth: true, ariaLabel: 'Message' })}
        </div>

        <div>
          ${renderComponent({ type: 'checkbox', name: 'newsletter', label: 'Subscribe to newsletter' })}
        </div>

        <div>
          ${renderComponent({ type: 'checkbox', name: 'terms', label: 'I agree to the terms and conditions', required: true })}
        </div>
      </form>
    `;
  },
};

/**
 * Hero email capture example
 */
export const HeroEmailCapture: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="max-width: 600px; padding: 3rem 1.5rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1rem;">
        <h1 style="color: white; font-size: 2.5rem; margin: 0 0 1rem;">Start Your Free Trial</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.125rem; margin: 0 0 2rem;">Join 10,000+ companies already using our platform</p>

        <div style="display: flex; gap: 0.75rem; max-width: 500px; margin: 0 auto;">
          ${renderComponent({ type: 'email', placeholder: 'your@email.com', iconStart: emailIcon, size: 'lg', ariaLabel: 'Email address', fullWidth: true })}
        </div>

        <p style="color: rgba(255,255,255,0.8); font-size: 0.875rem; margin: 1rem 0 0;">No credit card required. Cancel anytime.</p>
      </div>
    `;
  },
};

/**
 * All input types showcase
 */
export const AllInputTypes: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem;">Text</h4>
          ${renderComponent({ type: 'text', placeholder: 'Enter text', ariaLabel: 'Text' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Email</h4>
          ${renderComponent({ type: 'email', placeholder: 'email@example.com', ariaLabel: 'Email' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Password</h4>
          ${renderComponent({ type: 'password', placeholder: 'Password', ariaLabel: 'Password' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Number</h4>
          ${renderComponent({ type: 'number', placeholder: '0', ariaLabel: 'Number' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Tel</h4>
          ${renderComponent({ type: 'tel', placeholder: '+1 (555) 000-0000', ariaLabel: 'Phone' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">URL</h4>
          ${renderComponent({ type: 'url', placeholder: 'https://example.com', ariaLabel: 'URL' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Search</h4>
          ${renderComponent({ type: 'search', placeholder: 'Search...', iconStart: searchIcon, ariaLabel: 'Search' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Select</h4>
          ${renderComponent({ type: 'select', options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }], ariaLabel: 'Select' })}
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <h4 style="margin: 0 0 0.5rem;">Textarea</h4>
        ${renderComponent({ type: 'textarea', placeholder: 'Enter message', rows: 4, ariaLabel: 'Message' })}
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem;">Checkbox</h4>
          ${renderComponent({ type: 'checkbox', label: 'Checkbox option' })}
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem;">Radio</h4>
          ${renderComponent({ type: 'radio', name: 'example', label: 'Radio option' })}
        </div>
      </div>
    `;
  },
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  render: () => {
    return `
      <style>${styles}</style>
      <div data-theme="dark" style="padding: 2rem; background: #1f2937; border-radius: 0.5rem;">
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
          ${renderComponent({ type: 'text', placeholder: 'Text input', ariaLabel: 'Dark text' })}
          ${renderComponent({ type: 'email', placeholder: 'email@example.com', iconStart: emailIcon, ariaLabel: 'Dark email' })}
          ${renderComponent({ type: 'textarea', placeholder: 'Message', rows: 4, ariaLabel: 'Dark message' })}
          ${renderComponent({ type: 'select', options: [{ value: '', label: 'Select option' }], ariaLabel: 'Dark select' })}
          ${renderComponent({ type: 'checkbox', label: 'Dark checkbox' })}
          ${renderComponent({ type: 'radio', name: 'dark', label: 'Dark radio' })}
        </div>
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
