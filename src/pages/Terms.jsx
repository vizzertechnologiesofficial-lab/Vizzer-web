import LegalPage from '../components/LegalPage'
import { seo, site } from '../data/site'
import { usePageMeta } from '../lib/meta'

// Draft terms for the company website only. Have these reviewed before publishing.
const sections = [
  {
    h: 'About these terms',
    p: `These terms apply when you use ${site.domain}, the website of ${site.name}. By using the site you agree to them. Each of our products has its own terms, which apply when you use that product.`,
  },
  {
    h: 'Using this site',
    p: 'You may browse this site and share links to it. Please do not copy, reuse or republish its text, images, logos or product names without our written permission.',
  },
  {
    h: 'Information on this site',
    p: 'We keep the information here accurate and up to date, but it is provided for general information only. Product details may change as our products develop.',
  },
  {
    h: 'Links to other sites',
    p: 'Some links take you to websites and app stores we do not run. We are not responsible for their content or how they handle your information.',
  },
  {
    h: 'Changes to these terms',
    p: 'We may update these terms from time to time. The date at the top of this page shows when they last changed.',
  },
  {
    h: 'Contact',
    p: `Questions about these terms can be sent to ${site.email}.`,
  },
]

export default function Terms() {
  usePageMeta(seo.terms)
  return <LegalPage title="Terms of Use" updated="12 October 2026" sections={sections} />
}
