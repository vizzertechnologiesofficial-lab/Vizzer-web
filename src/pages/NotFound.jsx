import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mark } from '../components/Logo'
import { EASE } from '../lib/motion'
import { seo } from '../data/site'
import { usePageMeta } from '../lib/meta'

export default function NotFound() {
  usePageMeta(seo.notFound)

  return (
    <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-4 py-32 sm:px-6">
      <motion.div
        initial={{ rotate: -12, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Mark size={64} animate />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="text-hero mt-10 pb-2 text-5xl font-semibold tracking-tight sm:text-6xl"
      >
        This page isn’t here.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        className="mt-6 max-w-xl text-lg text-muted-foreground"
      >
        The link may be old or mistyped. You can find everything we do from the home page.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}>
        <Link
          to="/"
          className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
        >
          Go to the home page
        </Link>
      </motion.div>
    </section>
  )
}
