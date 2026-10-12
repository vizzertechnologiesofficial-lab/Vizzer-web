import { motion } from 'framer-motion'
import { PrimaryLink } from './Buttons'
import { reveal, stagger } from '../lib/motion'

// Closing call to action used at the bottom of pages.
export default function CtaBand({ title, body, button, to = '/contact' }) {
  return (
    <section aria-labelledby="cta-title" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-border bg-card px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
        >
          <motion.h2 variants={reveal} id="cta-title" className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </motion.h2>
          {body && (
            <motion.p variants={reveal} className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {body}
            </motion.p>
          )}
          <motion.div variants={reveal} className="mt-10">
            <PrimaryLink to={to}>{button}</PrimaryLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
