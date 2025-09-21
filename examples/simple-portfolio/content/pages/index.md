---
title: 'Jane Doe - Full-Stack Developer'
description: 'Full-stack developer specializing in React, TypeScript, and modern web technologies'
layout: main
sections:
  - partial: 'header'
    siteName: 'Jane Doe'
    siteUrl: '/'
    navigation:
      - title: 'Home'
        href: '/'
        active: true
      - title: 'Projects'
        href: '/projects'
      - title: 'About'
        href: '#about'
      - title: 'Contact'
        href: '#contact'
    variant: 'default'

  - partial: 'hero'
    title: "Hi, I'm Jane Doe"
    subtitle: 'Full-Stack Developer & Creative Problem Solver'
    description:
      'I create beautiful, functional web experiences that solve real-world problems. Specializing in React, TypeScript,
      and modern web technologies.'
    image: '/assets/images/profile.jpg'
    imageAlt: 'Jane Doe - Full-Stack Developer'
    ctaButton:
      text: 'View My Work'
      href: '/projects'
      variant: 'primary'
    secondaryButton:
      text: 'Get In Touch'
      href: '#contact'
      variant: 'outline'
    socialLinks:
      - platform: 'github'
        url: 'https://github.com/janedoe'
      - platform: 'linkedin'
        url: 'https://linkedin.com/in/janedoe'
      - platform: 'email'
        url: 'mailto:hello@janedoe.dev'
    alignment: 'center'
    variant: 'default'
    showScrollIndicator: true

  - partial: 'about-section'
    title: 'About Me'
    subtitle: 'Passionate about creating exceptional digital experiences'
    description: |
      With over 5 years of experience in full-stack development, I specialize in building 
      scalable web applications using modern technologies. I'm passionate about clean code, 
      user experience, and solving complex problems with elegant solutions.

      When I'm not coding, you can find me exploring new technologies, contributing to open 
      source projects, or enjoying the great outdoors with my camera.
    skills:
      - category: 'Frontend'
        technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js']
      - category: 'Backend'
        technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs']
      - category: 'Tools & DevOps'
        technologies: ['Git', 'Docker', 'AWS', 'Vercel', 'Jest', 'Cypress']
    image: '/assets/images/about-photo.jpg'
    imageAlt: 'Jane Doe working on a project'

  - partial: 'featured-projects'
    title: 'Featured Projects'
    subtitle: 'A selection of my recent work'
    projects:
      - title: 'E-commerce Platform'
        description:
          'Modern e-commerce platform built with React, TypeScript, and Node.js. Features include real-time inventory,
          payment processing, and admin dashboard.'
        image: '/assets/images/project-ecommerce.jpg'
        imageAlt: 'E-commerce platform screenshot'
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe']
        links:
          - type: 'demo'
            url: 'https://ecommerce-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/ecommerce-platform'
        category: 'Web Application'
        featured: true
        status: 'completed'
        year: 2024

      - title: 'Task Management App'
        description:
          'Collaborative task management application with real-time updates, team collaboration features, and advanced
          filtering capabilities.'
        image: '/assets/images/project-tasks.jpg'
        imageAlt: 'Task management app interface'
        technologies: ['Vue.js', 'TypeScript', 'Firebase', 'Tailwind CSS']
        links:
          - type: 'demo'
            url: 'https://tasks-demo.janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/task-manager'
        category: 'Web Application'
        featured: true
        status: 'completed'
        year: 2024

      - title: 'Portfolio Website'
        description:
          'Personal portfolio website built with AgentStatic, showcasing modern web development practices and responsive
          design.'
        image: '/assets/images/project-portfolio.jpg'
        imageAlt: 'Portfolio website homepage'
        technologies: ['AgentStatic', 'TypeScript', 'CSS3', 'Zod']
        links:
          - type: 'website'
            url: 'https://janedoe.dev'
          - type: 'github'
            url: 'https://github.com/janedoe/portfolio'
        category: 'Website'
        featured: true
        status: 'completed'
        year: 2024

  - partial: 'contact-form'
    title: "Let's Work Together"
    subtitle: 'Ready to start your next project?'
    description:
      "I'm always interested in hearing about new opportunities and exciting projects. Whether you have a question or
      just want to say hello, I'd love to hear from you."
    fields:
      - name: 'name'
        label: 'Your Name'
        type: 'text'
        placeholder: 'Enter your full name'
        required: true
        validation:
          minLength: 2
          maxLength: 50
      - name: 'email'
        label: 'Email Address'
        type: 'email'
        placeholder: 'your.email@example.com'
        required: true
      - name: 'subject'
        label: 'Subject'
        type: 'select'
        required: true
        options:
          - 'General Inquiry'
          - 'Project Collaboration'
          - 'Job Opportunity'
          - 'Speaking Engagement'
          - 'Other'
      - name: 'message'
        label: 'Message'
        type: 'textarea'
        placeholder: 'Tell me about your project or inquiry...'
        required: true
        validation:
          minLength: 10
          maxLength: 1000
    submitButton:
      text: 'Send Message'
      variant: 'primary'
      loadingText: 'Sending...'
    action: '/contact'
    method: 'POST'
    enableClientValidation: true
    successMessage: "Thank you! Your message has been sent. I'll get back to you within 24 hours."
    errorMessage: 'Sorry, there was an error sending your message. Please try again or email me directly.'

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
      - title: 'Quick Links'
        links:
          - title: 'Projects'
            href: '/projects'
          - title: 'About'
            href: '#about'
          - title: 'Contact'
            href: '#contact'
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

# Welcome to My Portfolio

This portfolio showcases my work as a full-stack developer, highlighting projects that demonstrate my expertise in
modern web technologies and user-centered design.

## What I Do

I specialize in creating digital experiences that are:

- **User-Focused**: Designed with the end user in mind
- **Performance-Optimized**: Fast, accessible, and SEO-friendly
- **Scalable**: Built to grow with your business needs
- **Modern**: Using the latest technologies and best practices

## Let's Build Something Great Together

Whether you're a startup looking to build your first product or an established company wanting to modernize your digital
presence, I'd love to help bring your vision to life.
