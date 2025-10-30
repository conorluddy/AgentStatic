// components/organisms/accordion/accordion.stories.ts

import type { Meta, StoryObj } from '@storybook/html';

/**
 * Accordion/FAQ Component Stories
 *
 * Collapsible Q&A component for FAQs, feature details, and content organization.
 * Critical for objection handling and conversion optimization on marketing sites.
 *
 * Marketing Impact:
 * - 70% of B2B buyers check FAQ before contacting sales
 * - 20% increase in conversion when FAQ placed before final CTA
 * - 45% reduction in support tickets with comprehensive FAQ
 */

// Component metadata
const meta: Meta = {
  title: 'Organisms/Accordion',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle/description',
    },
    behavior: {
      control: 'select',
      options: ['single', 'multi', 'static'],
      description: 'Accordion behavior: single = only one open, multi = many open, static = all open',
      defaultValue: 'single',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card', 'minimal'],
      description: 'Visual style variant',
      defaultValue: 'default',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
      defaultValue: 'right',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Accessible accordion component with collapsible panels for FAQs, feature details, and expandable content. Supports single-open (accordion), multi-open (toggle), and static (all-open) behaviors. Includes keyboard navigation, WCAG AA compliance, and dark mode support.',
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
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Render function
const renderComponent = (props: any) => {
  const {
    title = '',
    subtitle = '',
    items = [],
    behavior = 'single',
    variant = 'default',
    iconPosition = 'right',
    grouped = false,
    categories = [],
    id = '',
    className = '',
  } = props;

  // Build class list
  const classList = ['accordion'];
  if (variant !== 'default') classList.push(`accordion-${variant}`);
  if (iconPosition === 'left') classList.push('accordion-icon-left');
  if (grouped) classList.push('accordion-grouped');
  if (className) classList.push(className);

  const classStr = classList.join(' ');

  // Render header
  const header = title ? `
    <div class="accordion-header">
      <h2 class="accordion-title">${title}</h2>
      ${subtitle ? `<p class="accordion-subtitle">${subtitle}</p>` : ''}
    </div>
  ` : '';

  // Render item
  const renderItem = (item: any, index: number) => {
    const isOpen = item.defaultOpen || false;
    const buttonId = `accordion-button-${item.id}`;
    const panelId = `accordion-panel-${item.id}`;

    // Chevron down icon
    const chevronIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    `;

    return `
      <div class="accordion-item${isOpen ? ' accordion-item-open' : ''}" data-accordion-item>
        <button
          class="accordion-trigger"
          type="button"
          aria-expanded="${isOpen}"
          aria-controls="${panelId}"
          id="${buttonId}"
          data-accordion-trigger
        >
          <span class="accordion-question">${item.question}</span>
          <span class="accordion-icon" aria-hidden="true">${chevronIcon}</span>
        </button>
        <div
          class="accordion-panel"
          id="${panelId}"
          role="region"
          aria-labelledby="${buttonId}"
          data-accordion-panel
          ${!isOpen ? 'hidden' : ''}
        >
          <div class="accordion-content">
            ${item.answer}
          </div>
        </div>
      </div>
    `;
  };

  // Render grouped or flat
  let content = '';
  if (grouped && categories.length > 0) {
    content = categories.map((category: any) => `
      <div class="accordion-category">
        <h3 class="accordion-category-title">${category.title}</h3>
        <div class="accordion-list">
          ${category.items.map((item: any, i: number) => renderItem(item, i)).join('')}
        </div>
      </div>
    `).join('');
  } else {
    content = `
      <div class="accordion-list">
        ${items.map((item: any, i: number) => renderItem(item, i)).join('')}
      </div>
    `;
  }

  return `
    <section
      class="${classStr}"
      data-component="accordion"
      data-behavior="${behavior}"
      ${id ? `id="${id}"` : ''}
    >
      ${header}
      ${content}
    </section>
  `;
};

/**
 * Default accordion with single-open behavior
 */
export const Default: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our product',
    behavior: 'single',
    variant: 'default',
    items: [
      {
        id: 'refund',
        question: 'What is your refund policy?',
        answer: '<p>We offer a 30-day money-back guarantee. If you\'re not satisfied with our product, contact us within 30 days for a full refund.</p>',
        defaultOpen: true,
      },
      {
        id: 'cancel',
        question: 'How do I cancel my subscription?',
        answer: '<p>You can cancel anytime from your account settings. No questions asked.</p>',
      },
      {
        id: 'upgrade',
        question: 'Can I upgrade or downgrade my plan?',
        answer: '<p>Yes! You can change plans anytime. Changes are prorated automatically.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Pricing FAQ - common pre-purchase questions
 */
export const PricingFAQ: Story = {
  args: {
    title: 'Pricing Questions',
    subtitle: 'Common questions about pricing and billing',
    behavior: 'single',
    variant: 'default',
    items: [
      {
        id: 'cost',
        question: 'How much does it cost?',
        answer: '<p>Plans start at $19/month. See our <a href="/pricing">pricing page</a> for details.</p>',
        defaultOpen: true,
      },
      {
        id: 'trial',
        question: 'Is there a free trial?',
        answer: '<p>Yes! All plans include a 14-day free trial with full access to all features. No credit card required.</p>',
      },
      {
        id: 'refund',
        question: 'What is your refund policy?',
        answer: '<p>We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund you in full.</p>',
      },
      {
        id: 'payment',
        question: 'What payment methods do you accept?',
        answer: '<p>We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and wire transfers for annual plans.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Product FAQ - multi-open for feature comparison
 */
export const ProductFAQ: Story = {
  args: {
    title: 'Product Questions',
    subtitle: 'Learn about our features and capabilities',
    behavior: 'multi',
    variant: 'bordered',
    items: [
      {
        id: 'features',
        question: 'What features are included?',
        answer: '<p>All plans include:</p><ul><li>Unlimited projects</li><li>Priority support</li><li>Advanced analytics</li><li>Custom branding</li></ul>',
        defaultOpen: true,
      },
      {
        id: 'integrations',
        question: 'What integrations do you support?',
        answer: '<p>We integrate with Slack, GitHub, Jira, Trello, Asana, and 100+ other tools. View our <a href="/integrations">integrations directory</a>.</p>',
      },
      {
        id: 'security',
        question: 'How secure is your platform?',
        answer: '<p>We use bank-level 256-bit encryption, are SOC 2 Type II certified, and offer SSO, 2FA, and audit logs.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Support FAQ - grouped by category
 */
export const SupportFAQ: Story = {
  args: {
    title: 'Help Center',
    subtitle: 'Get answers to common questions',
    grouped: true,
    variant: 'minimal',
    categories: [
      {
        title: 'Getting Started',
        items: [
          {
            id: 'setup',
            question: 'How do I set up my account?',
            answer: '<p>Click Sign Up and follow the 3-step wizard. We\'ll guide you through the process.</p>',
          },
          {
            id: 'onboarding',
            question: 'Do you offer onboarding help?',
            answer: '<p>Yes! We provide free onboarding calls for all new customers. <a href="/contact">Schedule your call</a>.</p>',
          },
        ],
      },
      {
        title: 'Billing & Payments',
        items: [
          {
            id: 'invoice',
            question: 'How do I get an invoice?',
            answer: '<p>Invoices are automatically emailed after each payment. You can also download them from your account.</p>',
          },
          {
            id: 'change-plan',
            question: 'Can I change my plan?',
            answer: '<p>Yes! You can upgrade or downgrade anytime. Changes are prorated automatically.</p>',
          },
        ],
      },
      {
        title: 'Technical Questions',
        items: [
          {
            id: 'api',
            question: 'Is there an API?',
            answer: '<p>Yes! We provide a REST API and webhooks. <a href="/docs/api">View API documentation</a>.</p>',
          },
          {
            id: 'uptime',
            question: 'What is your uptime guarantee?',
            answer: '<p>We guarantee 99.9% uptime with our SLA. Check our <a href="/status">status page</a> for real-time monitoring.</p>',
          },
        ],
      },
    ],
  },
  render: renderComponent,
};

/**
 * Pre-purchase objection handling - before CTA
 */
export const PrePurchaseFAQ: Story = {
  args: {
    title: 'Still have questions?',
    subtitle: 'Here are answers to our most common questions',
    behavior: 'single',
    variant: 'card',
    items: [
      {
        id: 'trial',
        question: 'Is there a free trial?',
        answer: '<p>Yes! All plans include a 14-day free trial. No credit card required to start.</p>',
        defaultOpen: true,
      },
      {
        id: 'contract',
        question: 'Do I need a long-term contract?',
        answer: '<p>No. All plans are month-to-month. Cancel anytime with no penalties or fees.</p>',
      },
      {
        id: 'data',
        question: 'What happens to my data if I cancel?',
        answer: '<p>You can export all your data before canceling. We keep backups for 30 days after cancellation.</p>',
      },
      {
        id: 'support',
        question: 'What kind of support do you offer?',
        answer: '<p>All plans include email support. Pro and Enterprise plans get priority support with faster response times.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * All-open static FAQ for documentation
 */
export const StaticAllOpen: Story = {
  args: {
    title: 'Technical Documentation',
    subtitle: 'Comprehensive answers to technical questions',
    behavior: 'static',
    variant: 'minimal',
    items: [
      {
        id: 'api',
        question: 'Is there an API?',
        answer: '<p>Yes! We provide a REST API and webhooks. <a href="/docs/api">View API documentation</a>.</p>',
        defaultOpen: true,
      },
      {
        id: 'security',
        question: 'How secure is your platform?',
        answer: '<p>We use bank-level 256-bit encryption and are SOC 2 Type II certified.</p>',
        defaultOpen: true,
      },
      {
        id: 'compliance',
        question: 'Are you GDPR compliant?',
        answer: '<p>Yes, we are fully GDPR compliant and offer data processing agreements.</p>',
        defaultOpen: true,
      },
    ],
  },
  render: renderComponent,
};

/**
 * Bordered variant - thick borders with color highlight
 */
export const BorderedVariant: Story = {
  args: {
    title: 'FAQ',
    variant: 'bordered',
    items: [
      {
        id: 'q1',
        question: 'What makes you different?',
        answer: '<p>We focus on simplicity and user experience, making complex tasks feel effortless.</p>',
        defaultOpen: true,
      },
      {
        id: 'q2',
        question: 'How long does setup take?',
        answer: '<p>Most customers are up and running in under 5 minutes.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Card variant - elevated with shadows
 */
export const CardVariant: Story = {
  args: {
    title: 'Common Questions',
    variant: 'card',
    items: [
      {
        id: 'q1',
        question: 'Is there a mobile app?',
        answer: '<p>Yes! We have native iOS and Android apps available.</p>',
        defaultOpen: true,
      },
      {
        id: 'q2',
        question: 'Can I import my existing data?',
        answer: '<p>Yes, we support CSV, Excel, and API imports from most platforms.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Minimal variant - borderless with dividers
 */
export const MinimalVariant: Story = {
  args: {
    title: 'Questions',
    variant: 'minimal',
    items: [
      {
        id: 'q1',
        question: 'How does pricing work?',
        answer: '<p>We charge per user per month. The more users, the lower the per-user cost.</p>',
        defaultOpen: true,
      },
      {
        id: 'q2',
        question: 'Can I add more users later?',
        answer: '<p>Yes! Add users anytime. Charges are prorated automatically.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Icon left position
 */
export const IconLeft: Story = {
  args: {
    title: 'Feature Details',
    iconPosition: 'left',
    variant: 'bordered',
    items: [
      {
        id: 'collaboration',
        question: 'Team Collaboration',
        answer: '<p>Real-time collaboration with unlimited team members. Comments, mentions, and activity feeds keep everyone in sync.</p>',
      },
      {
        id: 'analytics',
        question: 'Advanced Analytics',
        answer: '<p>Track performance with custom dashboards, automated reports, and data exports.</p>',
      },
    ],
  },
  render: renderComponent,
};

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know',
    items: [
      {
        id: 'q1',
        question: 'What is your refund policy?',
        answer: '<p>We offer a 30-day money-back guarantee.</p>',
        defaultOpen: true,
      },
      {
        id: 'q2',
        question: 'How do I cancel?',
        answer: '<p>You can cancel anytime from your account settings.</p>',
      },
    ],
  },
  render: (props: any) => {
    return `
      <div data-theme="dark" style="padding: 2rem; background: #1f2937; border-radius: 8px;">
        ${renderComponent(props)}
      </div>
    `;
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Accordion automatically adapts to dark mode with adjusted colors for proper contrast.',
      },
    },
  },
};

/**
 * Mobile view
 */
export const MobileView: Story = {
  args: {
    title: 'FAQ',
    subtitle: 'Quick answers',
    items: [
      {
        id: 'mobile1',
        question: 'Is there a mobile app?',
        answer: '<p>Yes! We have native iOS and Android apps.</p>',
        defaultOpen: true,
      },
      {
        id: 'mobile2',
        question: 'Does it work offline?',
        answer: '<p>Yes, our apps work offline with automatic sync when connected.</p>',
      },
    ],
  },
  render: (props: any) => {
    return `
      <div style="max-width: 375px; margin: 0 auto; padding: 1rem; border: 1px dashed #e5e7eb; border-radius: 8px;">
        <p style="margin: 0 0 1rem; color: #6b7280; font-size: 0.875rem;">Mobile viewport (375px)</p>
        ${renderComponent(props)}
      </div>
    `;
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Accordion is fully responsive with optimized spacing and font sizes on mobile devices.',
      },
    },
  },
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => {
    const baseItems = [
      {
        id: 'q1',
        question: 'Sample question',
        answer: '<p>Sample answer text goes here.</p>',
        defaultOpen: true,
      },
    ];

    return `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div>
          <h3 style="margin: 0 0 1rem; color: #374151;">Default</h3>
          ${renderComponent({ variant: 'default', items: baseItems })}
        </div>
        <div>
          <h3 style="margin: 0 0 1rem; color: #374151;">Bordered</h3>
          ${renderComponent({ variant: 'bordered', items: baseItems })}
        </div>
        <div>
          <h3 style="margin: 0 0 1rem; color: #374151;">Card</h3>
          ${renderComponent({ variant: 'card', items: baseItems })}
        </div>
        <div>
          <h3 style="margin: 0 0 1rem; color: #374151;">Minimal</h3>
          ${renderComponent({ variant: 'minimal', items: baseItems })}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'All four visual variants: default (standard borders), bordered (thick borders with color), card (elevated with shadows), and minimal (borderless with dividers).',
      },
    },
  },
};

/**
 * Real-world marketing example - complete landing page FAQ
 */
export const MarketingExample: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know before signing up',
    behavior: 'single',
    variant: 'default',
    items: [
      {
        id: 'pricing',
        question: 'How much does it cost?',
        answer: '<p>Plans start at $19/month for individuals. Team plans start at $49/month. All plans include a 14-day free trial.</p>',
        defaultOpen: true,
      },
      {
        id: 'trial',
        question: 'Is the free trial really free?',
        answer: '<p>Yes! No credit card required. Get full access to all features for 14 days. Cancel anytime with no charges.</p>',
      },
      {
        id: 'refund',
        question: 'What if I\'m not satisfied?',
        answer: '<p>We offer a 30-day money-back guarantee. If you\'re not happy, contact us for a full refund. No questions asked.</p>',
      },
      {
        id: 'data-security',
        question: 'Is my data secure?',
        answer: '<p>Absolutely. We use bank-level 256-bit encryption, are SOC 2 Type II certified, and never share your data with third parties.</p>',
      },
      {
        id: 'support',
        question: 'What kind of support do you offer?',
        answer: '<p>All plans include email support. Pro and Enterprise customers get priority support with response times under 2 hours.</p>',
      },
      {
        id: 'cancel',
        question: 'Can I cancel anytime?',
        answer: '<p>Yes. All plans are month-to-month with no long-term contracts. Cancel anytime with one click from your account settings.</p>',
      },
      {
        id: 'migration',
        question: 'Can you help me migrate my data?',
        answer: '<p>Yes! We offer free migration assistance for all new customers. Our team will help you import your existing data.</p>',
      },
      {
        id: 'team',
        question: 'Can I add team members later?',
        answer: '<p>Absolutely. Start solo and add teammates whenever you\'re ready. Pricing scales automatically based on your team size.</p>',
      },
    ],
  },
  render: renderComponent,
  parameters: {
    docs: {
      description: {
        story: 'Complete FAQ section optimized for landing pages. Addresses common objections (pricing, trial, refund, security, support, cancellation) in strategic order. Place this before your final CTA to reduce conversion friction.',
      },
    },
  },
};
