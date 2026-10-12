import { motion } from 'framer-motion'
import { home } from '../data/content'
import { reveal, stagger } from '../lib/motion'

export default function Approach() {
  const { headline, steps } = home.approach
  return (
    <section aria-labelledby="approach-title" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          id="approach-title"
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {headline}
        </motion.h2>
        <motion.ol
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8"
        >
          {steps.map((s, i) => (
            <motion.li key={s.title} variants={reveal}>
              <span className="text-5xl font-semibold tracking-tight text-signal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
