import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

// The opening block of an inner page: small label, large heading, intro text.
export default function PageHeader({ eyebrow, title, children, className = '' }) {
  return (
    <header className={`pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pt-48 ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="text-hero mt-4 max-w-3xl pb-2 text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {title}
      </motion.h1>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:mt-8 sm:text-xl"
        >
          {children}
        </motion.div>
      )}
    </header>
  )
}
