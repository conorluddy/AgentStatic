/**
 * Feature Grid Organism Stories
 *
 * Comprehensive Storybook stories showcasing all variants and use cases
 * for the Feature Grid organism component.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderNunjucksTemplate } from '../../../.storybook/nunjucks-helpers';

const renderComponent = (args: any) => {
  return renderNunjucksTemplate(
    `
    {% from "organisms/feature-grid/feature-grid.njk" import featureGrid %}
    {{ featureGrid(props) }}
  `,
    { props: args }
  );
};


// Configure Nunjucks
// Import styles
import './feature-grid.css';
import '../../_system/tokens.css';
import '../../_system/reset.css';
import '../../_system/base.css';
import '../../atoms/heading/heading.css';
import '../../atoms/text/text.css';
import '../../atoms/icon/icon.css';
import '../../molecules/image-text/image-text.css';
import '../../molecules/feature-list/feature-list.css';

// Define meta
const meta: Meta = {
  title: 'Organisms/Feature Grid',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Versatile marketing component for showcasing product features and benefits. Supports grid and alternating layouts, multiple column configurations, icon-based features, image-based features, and detailed features with feature lists. Essential for SaaS landing pages, product showcases, and service offerings.',
      },
    },
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'Section heading',
    },
    description: {
      control: 'text',
      description: 'Section description',
    },
    headerAlign: {
      control: 'select',
      options: ['center', 'left'],
      description: 'Header alignment',
    },
    layout: {
      control: 'select',
      options: ['grid', 'alternating'],
      description: 'Layout type',
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns (grid layout only)',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'cards', 'minimal'],
      description: 'Visual style variant',
    },
    contentAlign: {
      control: 'select',
      options: ['center', 'left'],
      description: 'Content alignment (grid layout only)',
    },
    backgroundColor: {
      control: 'select',
      options: ['', 'primary', 'secondary', 'accent'],
      description: 'Background color variant',
    },
  },
};

export default meta;
type Story = StoryObj;

// Render function
function render(args: any) {
  return renderNunjucksTemplate('organisms/feature-grid/feature-grid.njk', args);
}

/**
 * Story 1: Default 3-Column Icon Grid
 * Classic SaaS feature showcase with icons
 */
export const Default: Story = {
  args: {
    heading: 'Everything You Need to Succeed',
    description:
      'Powerful features to help you build, launch, and grow your business',
    features: [
      {
        icon: 'analytics',
        title: 'Advanced Analytics',
        description:
          'Track your growth with detailed insights and real-time reports. Make data-driven decisions with confidence.',
      },
      {
        icon: 'shield',
        title: 'Enterprise Security',
        description:
          'Bank-level encryption keeps your data safe and secure. GDPR and SOC 2 compliant.',
      },
      {
        icon: 'zap',
        title: 'Lightning Fast',
        description:
          'Optimized performance for the best user experience. Sub-100ms response times globally.',
      },
      {
        icon: 'users',
        title: 'Team Collaboration',
        description:
          'Work together seamlessly with real-time updates and commenting. Stay in sync.',
      },
      {
        icon: 'integrations',
        title: '100+ Integrations',
        description:
          'Connect with your favorite tools and services. Build custom integrations with our API.',
      },
      {
        icon: 'support',
        title: '24/7 Support',
        description:
          'Our expert team is always here to help. Get answers in minutes, not hours.',
      },
    ],
  },
  render,
};

/**
 * Story 2: 2-Column Grid
 * Fewer, more detailed features
 */
export const TwoColumn: Story = {
  args: {
    heading: 'Core Capabilities',
    description: 'The features that power your success',
    columns: 2,
    features: [
      {
        icon: 'code',
        title: 'Developer-Friendly',
        description:
          'Built with modern technologies and best practices. Clean APIs, comprehensive documentation, and extensive code examples to get you started quickly.',
      },
      {
        icon: 'chart',
        title: 'Actionable Insights',
        description:
          'Turn data into action with intelligent analytics and recommendations. Understand what\'s working and what needs improvement at a glance.',
      },
      {
        icon: 'lock',
        title: 'Privacy First',
        description:
          'Your data belongs to you. We never sell your information and comply with all major privacy regulations including GDPR, CCPA, and HIPAA.',
      },
      {
        icon: 'globe',
        title: 'Global Scale',
        description:
          'Serve customers anywhere in the world with our global infrastructure. Low latency and high availability across 6 continents.',
      },
    ],
  },
  render,
};

/**
 * Story 3: 4-Column Compact Grid
 * High-level benefits in minimal space
 */
export const FourColumn: Story = {
  args: {
    heading: 'Why Choose Us',
    columns: 4,
    features: [
      {
        icon: 'check',
        title: 'Easy Setup',
        description: 'Get started in minutes with our guided onboarding',
      },
      {
        icon: 'zap',
        title: 'Fast Performance',
        description: 'Lightning-speed delivery optimized for your users',
      },
      {
        icon: 'shield',
        title: 'Secure',
        description: 'Bank-level security with SOC 2 Type II compliance',
      },
      {
        icon: 'support',
        title: '24/7 Support',
        description: 'Expert help whenever you need it, day or night',
      },
      {
        icon: 'dollar',
        title: 'Affordable',
        description: 'Transparent pricing with no hidden fees',
      },
      {
        icon: 'trend-up',
        title: 'Scalable',
        description: 'Grows with you from startup to enterprise',
      },
      {
        icon: 'refresh',
        title: 'No Lock-In',
        description: 'Export your data anytime with one click',
      },
      {
        icon: 'check-circle',
        title: '99.99% Uptime',
        description: 'Reliable infrastructure you can count on',
      },
    ],
  },
  render,
};

/**
 * Story 4: Alternating Image/Text Layout
 * Product feature showcase with screenshots
 */
export const AlternatingLayout: Story = {
  args: {
    heading: 'See What You Can Do',
    description: 'Powerful features that make work effortless',
    layout: 'alternating',
    features: [
      {
        title: 'Beautiful Dashboards',
        description:
          'Visualize your data with customizable charts and graphs. Drag-and-drop widgets to create the perfect dashboard for your needs. Share insights with your team instantly.',
        image: {
          src: 'https://placehold.co/800x600/e0e7ff/3b82f6?text=Dashboard',
          alt: 'Dashboard interface with charts and graphs',
        },
        imagePosition: 'left',
      },
      {
        title: 'Team Collaboration',
        description:
          'Work together seamlessly with real-time updates. Comment on specific data points, share findings, and make decisions faster. Built-in notifications keep everyone in the loop.',
        image: {
          src: 'https://placehold.co/800x600/d1fae5/22c55e?text=Collaboration',
          alt: 'Team collaboration interface',
        },
        imagePosition: 'right',
      },
      {
        title: 'Automated Reporting',
        description:
          'Schedule reports to be automatically generated and delivered. Customize report templates, set delivery schedules, and never miss a deadline. Export to PDF, Excel, or Google Sheets.',
        image: {
          src: 'https://placehold.co/800x600/fef3c7/f59e0b?text=Reports',
          alt: 'Automated reporting system',
        },
        imagePosition: 'left',
      },
    ],
  },
  render,
};

/**
 * Story 5: Card Variant
 * Elevated cards with hover effects
 */
export const CardVariant: Story = {
  args: {
    heading: 'Our Services',
    description: 'Comprehensive solutions for your digital needs',
    columns: 2,
    variant: 'cards',
    features: [
      {
        icon: 'code',
        title: 'Web Development',
        description:
          'Custom websites built with modern technologies and best practices. Responsive, accessible, and optimized for performance.',
      },
      {
        icon: 'mobile',
        title: 'Mobile Apps',
        description:
          'Native iOS and Android applications for seamless experiences. Built with Swift, Kotlin, and React Native.',
      },
      {
        icon: 'megaphone',
        title: 'Digital Marketing',
        description:
          'SEO, content marketing, and social media strategies that convert. Data-driven campaigns with measurable results.',
      },
      {
        icon: 'chart',
        title: 'Analytics & Insights',
        description:
          'Data-driven insights to optimize your digital presence. Track ROI, understand your audience, and make smarter decisions.',
      },
    ],
  },
  render,
};

/**
 * Story 6: Bordered Variant
 * Subtle borders for visual separation
 */
export const BorderedVariant: Story = {
  args: {
    heading: 'Platform Features',
    description: 'Everything you need in one place',
    variant: 'bordered',
    features: [
      {
        icon: 'database',
        title: 'Data Management',
        description: 'Store, organize, and access your data effortlessly',
      },
      {
        icon: 'workflow',
        title: 'Automation',
        description: 'Automate repetitive tasks and save hours every week',
      },
      {
        icon: 'api',
        title: 'API Access',
        description: 'Full REST API with comprehensive documentation',
      },
    ],
  },
  render,
};

/**
 * Story 7: Minimal Variant
 * Clean, minimal presentation
 */
export const MinimalVariant: Story = {
  args: {
    heading: 'Core Benefits',
    columns: 4,
    variant: 'minimal',
    contentAlign: 'center',
    features: [
      { icon: 'check', title: 'Easy to Use', description: 'Intuitive interface' },
      { icon: 'zap', title: 'Fast', description: 'Lightning performance' },
      { icon: 'shield', title: 'Secure', description: 'Bank-level security' },
      { icon: 'dollar', title: 'Affordable', description: 'Transparent pricing' },
    ],
  },
  render,
};

/**
 * Story 8: Left-Aligned Content
 * Left-aligned for text-heavy features
 */
export const LeftAligned: Story = {
  args: {
    heading: 'Technical Capabilities',
    description: 'Built for developers, loved by teams',
    headerAlign: 'left',
    contentAlign: 'left',
    features: [
      {
        icon: 'terminal',
        title: 'CLI Tools',
        description:
          'Powerful command-line interface for automation and scripting. Deploy from your terminal with simple commands.',
      },
      {
        icon: 'code',
        title: 'REST API',
        description:
          'Comprehensive REST API with OpenAPI documentation. Build custom integrations and extend functionality.',
      },
      {
        icon: 'webhook',
        title: 'Webhooks',
        description:
          'Real-time event notifications for your applications. React instantly to changes in your data.',
      },
    ],
  },
  render,
};

/**
 * Story 9: Detailed Features with Feature Lists
 * Features with nested feature lists
 */
export const DetailedFeatures: Story = {
  args: {
    heading: 'Platform Capabilities',
    description: 'Everything you need to succeed',
    columns: 2,
    variant: 'bordered',
    features: [
      {
        icon: 'users',
        title: 'Team Management',
        description: 'Comprehensive tools for managing your team',
        featureList: {
          items: [
            { text: 'Unlimited team members' },
            { text: 'Role-based permissions' },
            { text: 'Activity tracking' },
            { text: 'Team analytics' },
          ],
        },
      },
      {
        icon: 'integrations',
        title: 'Integrations',
        description: 'Connect with your favorite tools',
        featureList: {
          items: [
            { text: '100+ pre-built integrations' },
            { text: 'REST API access' },
            { text: 'Webhooks support' },
            { text: 'Custom integrations' },
          ],
        },
      },
    ],
  },
  render,
};

/**
 * Story 10: SaaS Landing Page Pattern
 * Real-world SaaS feature grid
 */
export const SaaSLandingPage: Story = {
  args: {
    heading: 'Everything You Need to Scale',
    description:
      'Powerful features designed to help growing teams move faster and accomplish more',
    features: [
      {
        icon: 'workflow',
        title: 'Visual Workflow Builder',
        description:
          'Build complex automations with our drag-and-drop interface. No coding required.',
      },
      {
        icon: 'analytics',
        title: 'Real-Time Analytics',
        description:
          'Monitor your performance with live dashboards and custom reports.',
      },
      {
        icon: 'users',
        title: 'Team Collaboration',
        description:
          'Work together with real-time syncing, comments, and notifications.',
      },
      {
        icon: 'integrations',
        title: '500+ Integrations',
        description:
          'Connect with tools you already use. Zapier, Slack, and more.',
      },
      {
        icon: 'mobile',
        title: 'Mobile Apps',
        description:
          'Stay productive on the go with native iOS and Android apps.',
      },
      {
        icon: 'support',
        title: 'Priority Support',
        description:
          'Get help from real humans within minutes. Available 24/7.',
      },
    ],
  },
  render,
};

/**
 * Story 11: Dark Mode
 * Showcase dark mode support
 */
export const DarkMode: Story = {
  args: {
    heading: 'Features That Shine',
    description: 'Beautiful in light mode and dark mode',
    variant: 'cards',
    features: [
      {
        icon: 'moon',
        title: 'Dark Mode Support',
        description: 'Seamless dark mode for comfortable viewing',
      },
      {
        icon: 'palette',
        title: 'Theme Customization',
        description: 'Customize colors to match your brand',
      },
      {
        icon: 'eye',
        title: 'Accessibility First',
        description: 'WCAG AA compliant with excellent contrast',
      },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render,
};

/**
 * Story 12: Mobile View
 * Showcase responsive behavior
 */
export const MobileView: Story = {
  args: {
    heading: 'Mobile Optimized',
    description: 'Looks great on any device',
    features: [
      {
        icon: 'mobile',
        title: 'Responsive Design',
        description: 'Adapts perfectly to any screen size',
      },
      {
        icon: 'touch',
        title: 'Touch Friendly',
        description: '44px minimum touch targets',
      },
      {
        icon: 'performance',
        title: 'Fast Loading',
        description: 'Optimized for 3G networks',
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render,
};

/**
 * Story 13: With Background Color
 * Showcase background color variants
 */
export const WithBackgroundColor: Story = {
  args: {
    heading: 'Stand Out Features',
    description: 'Features that demand attention',
    backgroundColor: 'primary',
    variant: 'minimal',
    features: [
      {
        icon: 'star',
        title: 'Award Winning',
        description: 'Recognized by industry leaders',
      },
      {
        icon: 'trophy',
        title: 'Top Rated',
        description: '4.9/5 stars from 10,000+ users',
      },
      {
        icon: 'trending',
        title: 'Fastest Growing',
        description: 'Join 50,000+ happy customers',
      },
    ],
  },
  render,
};

/**
 * Story 14: How It Works (Step-by-Step)
 * Process explanation with alternating images
 */
export const HowItWorks: Story = {
  args: {
    heading: 'How It Works',
    description: 'Get started in three simple steps',
    layout: 'alternating',
    features: [
      {
        title: '1. Connect Your Tools',
        description:
          'Integrate with your existing workflow in minutes. No technical knowledge required. We support all major platforms including Slack, Google Workspace, Microsoft 365, and more.',
        image: {
          src: 'https://placehold.co/800x600/e0e7ff/3b82f6?text=Step+1',
          alt: 'Connect your tools interface',
        },
        imagePosition: 'left',
      },
      {
        title: '2. Automate Your Workflow',
        description:
          'Set up automation rules using our visual workflow builder. No coding required. Watch your productivity soar as repetitive tasks run automatically in the background.',
        image: {
          src: 'https://placehold.co/800x600/d1fae5/22c55e?text=Step+2',
          alt: 'Automation workflow builder',
        },
        imagePosition: 'right',
      },
      {
        title: '3. Track Your Results',
        description:
          'Monitor your progress with detailed analytics and insights. See how much time you\'re saving, identify bottlenecks, and optimize your workflows for even better results.',
        image: {
          src: 'https://placehold.co/800x600/fef3c7/f59e0b?text=Step+3',
          alt: 'Analytics dashboard',
        },
        imagePosition: 'left',
      },
    ],
  },
  render,
};
