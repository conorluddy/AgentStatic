---
title: 'Projects - Jane Doe'
description: 'A showcase of my recent development projects and technical work'
layout: main
sections:
  - partial: 'header'
    siteName: 'Jane Doe'
    siteUrl: '/'
    navigation:
      - title: 'Home'
        href: '/'
      - title: 'Projects'
        href: '/projects'
        active: true
      - title: 'About'
        href: '/#about'
      - title: 'Contact'
        href: '/#contact'
    variant: 'default'

  - partial: 'page-header'
    title: 'My Projects'
    subtitle: 'A collection of work that showcases my skills and passion for development'
    description:
      "From full-stack web applications to open source contributions, here are some of the projects I'm most proud of.
      Each represents a unique challenge and learning opportunity."

  - partial: 'project-filter'
    categories: ['All', 'Web Applications', 'Websites', 'Open Source', 'Mobile']
    defaultCategory: 'All'

  - partial: 'projects-grid'
    projects:
      - id: 'ecommerce-platform'
        title: 'E-commerce Platform'
        description:
          'Modern e-commerce platform built with React, TypeScript, and Node.js. Features include real-time inventory,
          payment processing, admin dashboard, and mobile-responsive design.'
        image: '/assets/images/project-ecommerce.jpg'
        imageAlt: 'E-commerce platform dashboard screenshot'
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker']
        links:
          - type: 'demo'
            url: 'https://ecommerce-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/ecommerce-platform'
          - type: 'docs'
            url: 'https://docs.ecommerce-demo.janedoe.dev'
        category: 'Web Applications'
        featured: true
        status: 'completed'
        year: 2024

      - id: 'task-management'
        title: 'Task Management App'
        description:
          'Collaborative task management application with real-time updates, team collaboration features, advanced
          filtering, and project timeline visualization.'
        image: '/assets/images/project-tasks.jpg'
        imageAlt: 'Task management app kanban board view'
        technologies: ['Vue.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'PWA']
        links:
          - type: 'demo'
            url: 'https://tasks-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/task-manager'
        category: 'Web Applications'
        featured: true
        status: 'completed'
        year: 2024

      - id: 'portfolio-website'
        title: 'Portfolio Website'
        description:
          'Personal portfolio website built with AgentStatic, showcasing modern web development practices, responsive
          design, and performance optimization.'
        image: '/assets/images/project-portfolio.jpg'
        imageAlt: 'Portfolio website homepage design'
        technologies: ['AgentStatic', 'TypeScript', 'CSS3', 'Zod', 'GitHub Actions']
        links:
          - type: 'website'
            url: 'https://janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/portfolio'
        category: 'Websites'
        featured: true
        status: 'completed'
        year: 2024

      - id: 'weather-app'
        title: 'Weather Dashboard'
        description:
          'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather
          analytics. Features offline support and progressive web app capabilities.'
        image: '/assets/images/project-weather.jpg'
        imageAlt: 'Weather dashboard with forecast charts'
        technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Service Workers']
        links:
          - type: 'demo'
            url: 'https://weather-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/weather-dashboard'
        category: 'Web Applications'
        featured: false
        status: 'completed'
        year: 2023

      - id: 'blog-platform'
        title: 'Personal Blog Platform'
        description:
          'Custom blog platform with markdown support, syntax highlighting, tag-based organization, and full-text
          search. Built for performance and SEO optimization.'
        image: '/assets/images/project-blog.jpg'
        imageAlt: 'Blog platform article editor interface'
        technologies: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL', 'Vercel']
        links:
          - type: 'website'
            url: 'https://blog.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/blog-platform'
        category: 'Websites'
        featured: false
        status: 'completed'
        year: 2023

      - id: 'react-component-library'
        title: 'React Component Library'
        description:
          'Comprehensive React component library with TypeScript support, Storybook documentation, automated testing,
          and npm publishing workflow.'
        image: '/assets/images/project-components.jpg'
        imageAlt: 'Component library Storybook documentation'
        technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Rollup', 'GitHub Actions']
        links:
          - type: 'demo'
            url: 'https://components.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/react-components'
          - type: 'docs'
            url: 'https://components.janedoe.dev/docs'
        category: 'Open Source'
        featured: false
        status: 'completed'
        year: 2023

      - id: 'mobile-expense-tracker'
        title: 'Expense Tracker Mobile App'
        description:
          'Cross-platform mobile application for expense tracking with categories, budgets, reports, and data
          synchronization across devices.'
        image: '/assets/images/project-expense.jpg'
        imageAlt: 'Mobile expense tracker app screenshots'
        technologies: ['React Native', 'TypeScript', 'Expo', 'SQLite', 'Chart.js']
        links:
          - type: 'github'
            url: 'https://github.com/janedoe/expense-tracker'
          - type: 'download'
            url: 'https://expo.dev/@janedoe/expense-tracker'
        category: 'Mobile'
        featured: false
        status: 'completed'
        year: 2023

      - id: 'api-monitoring-tool'
        title: 'API Monitoring Tool'
        description:
          'Real-time API monitoring and alerting system with uptime tracking, response time analysis, and notification
          integrations for development teams.'
        image: '/assets/images/project-monitoring.jpg'
        imageAlt: 'API monitoring dashboard with charts'
        technologies: ['Node.js', 'TypeScript', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes']
        links:
          - type: 'demo'
            url: 'https://monitor-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/api-monitor'
        category: 'Web Applications'
        featured: false
        status: 'completed'
        year: 2022

      - id: 'design-system-docs'
        title: 'Design System Documentation'
        description:
          'Interactive design system documentation site with live code examples, design tokens, and component guidelines
          for enterprise design teams.'
        image: '/assets/images/project-design-system.jpg'
        imageAlt: 'Design system documentation interface'
        technologies: ['Gatsby', 'MDX', 'Styled Components', 'Design Tokens', 'Figma API']
        links:
          - type: 'website'
            url: 'https://design.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/design-system-docs'
        category: 'Websites'
        featured: false
        status: 'completed'
        year: 2022

      - id: 'ai-chatbot'
        title: 'AI Customer Support Bot'
        description:
          'Intelligent customer support chatbot with natural language processing, conversation history, and integration
          with existing support systems.'
        image: '/assets/images/project-chatbot.jpg'
        imageAlt: 'AI chatbot conversation interface'
        technologies: ['Python', 'OpenAI API', 'FastAPI', 'WebSocket', 'MongoDB']
        links:
          - type: 'demo'
            url: 'https://chatbot-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/ai-support-bot'
        category: 'Web Applications'
        featured: false
        status: 'in-progress'
        year: 2024

  - partial: 'project-stats'
    stats:
      - label: 'Projects Completed'
        value: '25+'
        description: 'Successful projects delivered'
      - label: 'Technologies Mastered'
        value: '15+'
        description: 'Programming languages and frameworks'
      - label: 'Years Experience'
        value: '5+'
        description: 'Professional development experience'
      - label: 'Happy Clients'
        value: '20+'
        description: 'Satisfied clients and employers'

  - partial: 'contact-cta'
    title: 'Like What You See?'
    subtitle: "Let's discuss your next project"
    description:
      "I'm always excited to work on new challenges and collaborate with talented teams. Whether you have a specific
      project in mind or just want to explore possibilities, I'd love to hear from you."
    ctaButton:
      text: 'Start a Conversation'
      href: '/#contact'
      variant: 'primary'
    secondaryButton:
      text: 'Download Resume'
      href: '/assets/files/jane-doe-resume.pdf'
      variant: 'outline'
      external: true

  - partial: 'footer'
    siteName: 'Jane Doe'
    socialLinks:
      - platform: 'github'
        url: 'https://github.com/janedoe'
      - platform: 'linkedin'
        url: 'https://linkedin.com/in/janedoe'
      - platform: 'email'
        url: 'mailto:hello@janedoe.dev'
    sections:
      - title: 'Navigation'
        links:
          - title: 'Home'
            href: '/'
          - title: 'Projects'
            href: '/projects'
          - title: 'About'
            href: '/#about'
          - title: 'Contact'
            href: '/#contact'
      - title: 'Resources'
        links:
          - title: 'Resume'
            href: '/assets/files/jane-doe-resume.pdf'
            external: true
          - title: 'Blog'
            href: 'https://blog.janedoe.dev'
            external: true
    variant: 'default'
    showBackToTop: true
---

# Project Portfolio

This collection represents my journey as a developer, from early learning projects to complex enterprise applications.
Each project taught me something new and helped shape my approach to solving problems with code.

## Project Categories

### Web Applications

Full-featured applications with complex business logic, user authentication, real-time features, and database
integration.

### Websites

Marketing sites, portfolios, and content-focused projects emphasizing performance, SEO, and user experience.

### Open Source

Libraries, tools, and contributions to the developer community that help others build better software.

### Mobile

Cross-platform mobile applications focusing on native performance and user experience.

## Technologies I Love Working With

- **Frontend**: React, Vue.js, TypeScript, Next.js, Tailwind CSS
- **Backend**: Node.js, Python, PostgreSQL, MongoDB, REST APIs
- **Mobile**: React Native, Expo, Progressive Web Apps
- **DevOps**: Docker, AWS, Vercel, GitHub Actions, Kubernetes
- **Tools**: Git, VS Code, Figma, Postman, Jest, Cypress

## What's Next?

I'm always learning and exploring new technologies. Currently interested in:

- **AI/ML Integration**: Exploring ways to integrate AI capabilities into web applications
- **Web3 Technologies**: Learning about blockchain and decentralized applications
- **Performance Optimization**: Advanced techniques for ultra-fast web experiences
- **Accessibility**: Ensuring all users can access and enjoy digital experiences
