import { motion } from 'framer-motion'
import { PiCube, PiFlowArrow, PiPlugsConnected, PiWrench } from 'react-icons/pi'
import { home } from '../data/content'
import { ArrowLink } from '../components/Buttons'
import { reveal, stagger } from '../lib/motion'

const ICONS = { product: PiCube, automation: PiFlowArrow, integration: PiPlugsConnected, maintenance: PiWrench }

export default function WhatWeDo() {
  const { headline, body, items, link } = home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="wwd-title" className="scroll-mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 sm:gap-12 sm:px-6 sm:py-24 lg:grid-cols-12 lg:px-8 lg:py-32">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="lg:sticky lg:top-32">
            <motion.h2 variants={reveal} id="wwd-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {headline}
            </motion.h2>
            <motion.p variants={reveal} className="mt-6 max-w-md text-lg text-muted-foreground">
              {body}
            </motion.p>
            <motion.div variants={reveal} className="mt-8">
              <ArrowLink to="/technology">{link}</ArrowLink>
            </motion.div>
          </div>
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
        >
          {items.map((item) => {
            const Icon = ICONS[item.id]
            return (
              <motion.li key={item.id} variants={reveal} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-base text-muted-foreground">{item.body}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
