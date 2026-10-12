// Approved website copy, taken from the "Website Content & Copy-Paste Guide".
// Edit wording here, not in the page components.

export const home = {
  hero: {
    eyebrow: 'Vizzer Technologies',
    // Each entry is one line of the headline
    headline: ['Building Technology', 'That Moves', 'Business Forward.'],
    body:
      'We build digital products and software solutions designed to simplify operations, solve real-world problems, and create new possibilities for businesses.',
    primary: 'Explore Our Products',
    secondary: 'Connect With Us',
  },
  about: {
    eyebrow: 'About Vizzer',
    // Shown large, revealed word by word on scroll
    lead: [
      'At Vizzer Technologies, we believe technology should do more than digitise existing processes.',
      'It should make businesses simpler to operate, easier to scale, and better equipped for the future.',
    ],
    body:
      'We focus on developing digital products and software solutions that address practical challenges across different industries. Our approach is simple: understand the problem, build with purpose, and keep improving.',
    link: 'More about Vizzer',
  },
  products: {
    headline: 'A Growing Portfolio of Digital Products',
    body:
      'Each product in the Vizzer portfolio is being developed to address a distinct set of customer needs. Explore our products to learn more about their purpose, capabilities, and the problems they are designed to solve.',
  },
  whatWeDo: {
    headline: 'What We Do',
    body:
      'Vizzer brings together product thinking, software engineering, and practical problem-solving to create useful digital experiences. Our capabilities may include the following, depending on the project:',
    items: [
      {
        id: 'product',
        title: 'Digital Product Development',
        body: 'Designing, developing, testing, and improving digital products from concept to launch.',
      },
      {
        id: 'automation',
        title: 'Business Process Automation',
        body: 'Helping businesses streamline repetitive tasks and improve operational workflows.',
      },
      {
        id: 'integration',
        title: 'Software Integration',
        body: 'Connecting software systems and services to support smoother business operations.',
      },
      {
        id: 'maintenance',
        title: 'Product Improvement & Maintenance',
        body: 'Supporting products through testing, feedback, maintenance, and ongoing development.',
      },
    ],
    link: 'Technology & Solutions',
  },
  approach: {
    headline: 'Our Approach',
    steps: [
      {
        title: 'Understand the problem',
        body: 'We begin by understanding the users, the business need, and the outcome to be achieved.',
      },
      {
        title: 'Build with purpose',
        body: 'We focus on practical functionality, clear user experiences, and solutions suited to the problem.',
      },
      {
        title: 'Improve continuously',
        body: 'We use feedback, testing, and learning to make products better over time.',
      },
    ],
  },
  cta: {
    headline: 'Let’s Build Something Meaningful',
    body:
      'Great ideas grow through collaboration. Whether you are exploring a technology partnership, looking for a digital solution, or interested in one of our products, we welcome conversations that create mutual value.',
    button: 'Start a Conversation',
  },
}

export const about = {
  eyebrow: 'About Vizzer',
  headline: 'Technology Built Around Real-World Needs',
  paragraphs: [
    'Vizzer Technologies is a technology company focused on developing digital products and software solutions that address practical challenges.',
    'We believe technology should be useful, accessible, and designed around the people who use it. Our work brings together thoughtful problem-solving, software development, and a commitment to continuous improvement.',
    'Through our portfolio of digital products, we aim to simplify processes, improve experiences, and create lasting value for individuals and businesses.',
    'We take a purposeful approach to innovation: understand the need, develop the right solution, and keep improving as needs evolve.',
  ],
  vision: {
    title: 'Our Vision',
    body: 'To create a future where technology makes everyday life and business simpler, smarter, and more connected.',
  },
  mission: {
    title: 'Our Mission',
    body: 'To develop purposeful digital products that solve meaningful problems, improve user experiences, and create lasting value.',
  },
  values: {
    title: 'Our Values',
    items: [
      {
        title: 'Purpose Before Complexity',
        body: 'We focus on solving real needs rather than using technology for its own sake.',
      },
      {
        title: 'Continuous Innovation',
        body: 'We look for better ways to solve problems and improve what we build.',
      },
      {
        title: 'Trust and Responsibility',
        body: 'We aim to build dependable products and handle customer information responsibly.',
      },
      {
        title: 'Long-Term Thinking',
        body: 'We value sustainable products, meaningful relationships, and lasting impact.',
      },
    ],
  },
}

export const productsPage = {
  eyebrow: 'Our Products',
  headline: 'Products Designed for Different Needs',
  body:
    'Vizzer’s product portfolio brings together digital solutions developed for distinct users and use cases. Select a product to learn about its purpose, key features, and how it can help.',
}

export const technology = {
  eyebrow: 'Technology & Solutions',
  headline: 'Practical Technology. Thoughtful Execution.',
  body:
    'We combine technical expertise with a problem-solving mindset to develop, support, and improve digital solutions. Our work is guided by the needs of users and the goals of each product or project.',
  areasTitle: 'Capability Areas',
  // `tools` lists what we actually use for this today. Leave it empty to hide the row.
  areas: [
    {
      id: 'engineering',
      title: 'Software Engineering',
      body: 'Developing and maintaining software applications and digital platforms.',
      tools: ['React', 'Django REST', 'PostgreSQL'],
    },
    {
      id: 'apps',
      title: 'Application Development',
      body: 'Building web and mobile experiences based on user and business requirements.',
      tools: ['Flutter', 'Dart', 'React', 'Tailwind CSS'],
    },
    {
      id: 'deployment',
      title: 'Implementation & Deployment',
      body: 'Preparing, configuring, and deploying software for intended users and environments.',
      tools: ['Docker', 'Linux servers'],
    },
    {
      id: 'support',
      title: 'Technical Support & Maintenance',
      body: 'Investigating issues, supporting users, and maintaining product reliability.',
      tools: [],
    },
    {
      id: 'integration',
      title: 'Integration & Automation',
      body: 'Connecting systems and streamlining workflows where appropriate.',
      tools: ['Firebase', 'Razorpay', 'JWT auth'],
    },
    {
      id: 'qa',
      title: 'Quality Assurance',
      body: 'Testing functionality and helping identify issues before release.',
      tools: [],
    },
  ],
}

export const partnerships = {
  eyebrow: 'Partnerships',
  headline: 'Let’s Create Value Together',
  paragraphs: [
    'We believe meaningful partnerships can help good ideas reach more people and create greater value. Vizzer welcomes conversations with businesses, technology providers, and potential collaborators who share an interest in useful, responsible innovation.',
    'If you would like to explore a partnership, integration, or business opportunity, we would be pleased to hear from you.',
  ],
  button: 'Discuss a Partnership',
}

export const contact = {
  eyebrow: 'Contact',
  headline: 'Let’s Start a Conversation',
  body:
    'Have a question about Vizzer or one of our products? Interested in a partnership or business opportunity? Send us a message and the relevant team will get back to you.',
  enquiryTypes: ['General', 'Product', 'Partnership', 'Careers', 'Other'],
}
