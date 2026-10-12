import { motion } from 'framer-motion'
import { PiHandshake, PiPlugsConnected, PiBuildings } from 'react-icons/pi'
import PageHeader from '../components/PageHeader'
import { PrimaryLink } from '../components/Buttons'
import { partnerships } from '../data/content'
import { seo, site } from '../data/site'
import { usePageMeta } from '../lib/meta'
import { reveal, stagger } from '../lib/motion'

// The three kinds of conversation named in the partnerships copy
const KINDS = [
  { label: 'Partnerships', Icon: PiHandshake },
  { label: 'Integrations', Icon: PiPlugsConnected },
  { label: 'Business opportunities', Icon: PiBuildings },
]

export default function Partnerships() {
  usePageMeta(seo.partnerships)
  const [first, ...rest] = partnerships.paragraphs
  const email = site.partnershipsEmail || site.email

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader eyebrow={partnerships.eyebrow} title={partnerships.headline}>
        <p>{first}</p>
      </PageHeader>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16 lg:pb-32"
      >
        <motion.div variants={reveal} className="lg:col-span-6">
          {rest.map((p) => (
            <p key={p} className="max-w-xl text-xl leading-relaxed text-foreground/90 sm:text-2xl sm:leading-relaxed">
              {p}
            </p>
          ))}
          <div className="mt-10 flex flex-col items-start gap-4">
            <PrimaryLink to="/contact?enquiry=partnership">{partnerships.button}</PrimaryLink>
            <p className="text-sm text-muted-foreground">
              Or write to{' '}
              <a href={`mailto:${email}`} className="font-semibold text-foreground hover:underline">
                {email}
              </a>
            </p>
          </div>
        </motion.div>

        <motion.ul variants={reveal} className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
          {KINDS.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="text-xl font-semibold tracking-tight">{label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}
