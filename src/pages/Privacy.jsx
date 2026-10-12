import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PiArrowLeft } from 'react-icons/pi'
import { site } from '../data/site'
import { EASE } from '../lib/motion'

const sections = [
  {
    h: 'What this site collects',
    p: 'Nothing. This website has no sign in, sets no tracking cookies and runs no analytics. Your theme choice (light or dark) is kept in your own browser so the site remembers it next time.',
  },
  {
    h: 'The contact form',
    p: 'The form on this site does not send anything to a server. It opens your own email app with your message filled in, and nothing leaves your device until you press send there. We use what you send only to reply to you.',
  },
  {
    h: 'Our products',
    p: 'Gater, Restro, Siyyana and Pitch It each have their own privacy policy inside the app or on their own website. Those policies cover the data each product handles.',
  },
  {
    h: 'Questions',
    p: `Write to ${site.email} and a person on our team will answer.`,
  },
]

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy | Vizzer Technologies'
    return () => {
      document.title = 'Vizzer Technologies | Mobile apps, web products and SaaS'
    }
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-all ease-fluid-700 hover:bg-muted active:scale-[0.98]"
      >
        <PiArrowLeft aria-hidden="true" /> Back to home
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-hero mt-10 pb-2 text-5xl font-semibold tracking-tight"
      >
        Privacy
      </motion.h1>
      <p className="mt-4 text-base text-muted-foreground">Last updated 11 October 2026</p>
      <div className="mt-12 flex flex-col gap-10">
        {sections.map((s, i) => (
          <motion.div
            key={s.h}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.07 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight">{s.h}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{s.p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
