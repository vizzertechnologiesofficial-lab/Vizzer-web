import LegalPage from '../components/LegalPage'
import { products } from '../data/products'
import { seo, site } from '../data/site'
import { usePageMeta } from '../lib/meta'

const names = products.map((p) => p.name)
const productList = `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`

const sections = [
  {
    h: 'What this site collects',
    p: 'Nothing. This website has no sign in, sets no tracking cookies and runs no analytics. Your theme choice (light or dark) is kept in your own browser so the site remembers it next time.',
  },
  {
    h: 'The contact form',
    p: 'The form on this site does not send anything to a server. It opens your own email app with your name, business email, company and message filled in, and nothing leaves your device until you press send there. We use what you send only to reply to your enquiry.',
  },
  {
    h: 'Our products',
    p: `${productList} each have their own privacy policy inside the app or on their own website. Those policies cover the data each product handles.`,
  },
  {
    h: 'Questions',
    p: `Write to ${site.email} and a person on our team will answer.`,
  },
]

export default function Privacy() {
  usePageMeta(seo.privacy)
  return <LegalPage title="Privacy Policy" updated="12 October 2026" sections={sections} />
}
