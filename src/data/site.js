// Company details used across the site. Edit here, not in components.
export const site = {
  name: 'Vizzer Technologies',
  shortName: 'Vizzer',
  tagline: 'Building technology that moves business forward.',
  domain: 'vizzertechnologies.com',
  url: 'https://vizzertechnologies.com',
  country: 'India',
  // General enquiries
  email: 'vizzertechnologies.official@gmail.com',
  phone: '+91 79941 13975',
  phoneHref: 'tel:+917994113975',
  // Optional contact details. Leave a value empty to hide it on the Contact page.
  partnershipsEmail: '',
  careersEmail: '',
  address: '',
  // Add full profile URLs to show icons in the footer and Contact page.
  // Leave a value empty to hide that icon.
  social: {
    linkedin: '',
    instagram: '',
    x: '',
  },
}

// Main navigation. "Contact" is shown as the button at the end of the bar.
export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/technology', label: 'Technology & Solutions' },
  { to: '/partnerships', label: 'Partnerships' },
]

export const footerLinks = [
  { to: '/about', label: 'About Vizzer' },
  { to: '/products', label: 'Our Products' },
  { to: '/technology', label: 'Technology & Solutions' },
  { to: '/partnerships', label: 'Partnerships' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' },
]

// Page titles and descriptions for search engines and link previews.
export const seo = {
  home: {
    path: '/',
    title: 'Vizzer Technologies | Digital Products & Software Solutions',
    description: 'Discover Vizzer Technologies and its portfolio of digital products and software solutions.',
  },
  about: {
    path: '/about',
    title: 'About Vizzer Technologies | Our Vision & Mission',
    description:
      'Learn about Vizzer Technologies, our approach to innovation, and our focus on purposeful digital products.',
  },
  products: {
    path: '/products',
    title: 'Our Products | Vizzer Technologies',
    description: 'Explore the digital products developed within the Vizzer Technologies portfolio.',
  },
  technology: {
    path: '/technology',
    title: 'Technology & Software Solutions | Vizzer',
    description: 'Learn about Vizzer’s software development and technology capabilities.',
  },
  partnerships: {
    path: '/partnerships',
    title: 'Partnerships | Vizzer Technologies',
    description: 'Connect with Vizzer Technologies to explore business and technology partnerships.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Vizzer Technologies',
    description: 'Contact Vizzer Technologies for product, business, and partnership enquiries.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | Vizzer Technologies',
    description: 'How the Vizzer Technologies website handles your information.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use | Vizzer Technologies',
    description: 'The terms that apply when you use the Vizzer Technologies website.',
  },
  notFound: {
    path: null,
    title: 'Page not found | Vizzer Technologies',
    description: 'This page could not be found.',
  },
}
