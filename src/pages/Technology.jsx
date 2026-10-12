import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiCode, PiDevices, PiRocketLaunch, PiLifebuoy, PiPlugsConnected, PiCheckSquare, PiPlus } from 'react-icons/pi'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { technology, home } from '../data/content'
import { seo } from '../data/site'
import { usePageMeta } from '../lib/meta'
import { EASE, reveal, stagger } from '../lib/motion'

const ICONS = {
  engineering: PiCode,
  apps: PiDevices,
  deployment: PiRocketLaunch,
  support: PiLifebuoy,
  integration: PiPlugsConnected,
  qa: PiCheckSquare,
}

function Row({ item, open, onToggle }) {
  const panelId = `area-${item.id}`
  const Icon = ICONS[item.id]
  return (
    <li className="border-b border-border">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center gap-4 py-6 text-left transition-colors ease-fluid-700 sm:gap-6 sm:py-8"
        >
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all ease-fluid-700 ${
              open ? 'bg-signal text-[#131209]' : 'bg-muted text-foreground group-hover:bg-muted/60'
            }`}
          >
            <Icon size={24} aria-hidden="true" />
          </span>
          <span
            className={`flex-1 text-2xl font-semibold tracking-tight transition-all ease-fluid-700 sm:text-4xl ${
              open ? 'text-foreground' : 'text-foreground/60 group-hover:translate-x-1 group-hover:text-foreground'
            }`}
          >
            {item.title}
          </span>
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-all ease-fluid-700 group-hover:bg-muted ${
              open ? 'rotate-45' : ''
            }`}
          >
            <PiPlus size={18} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-10 sm:pl-16 md:grid-cols-5 md:gap-8 md:pl-20">
              <p className="text-lg text-muted-foreground md:col-span-3">{item.body}</p>
              {item.tools.length > 0 && (
                <ul className="flex flex-wrap content-start gap-2 md:col-span-2" aria-label="Tools we use">
                  {item.tools.map((s) => (
                    <li key={s} className="rounded-full border border-border px-3 py-1 text-sm font-semibold">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Technology() {
  usePageMeta(seo.technology)
  const [open, setOpen] = useState(technology.areas[0].id)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={technology.eyebrow} title={technology.headline}>
          <p>{technology.body}</p>
        </PageHeader>
      </div>

      <section aria-labelledby="areas-title" className="bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-20 pt-8 sm:gap-12 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:px-8 lg:pb-32">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="lg:col-span-4"
          >
            <motion.h2 variants={reveal} id="areas-title" className="text-3xl font-semibold tracking-tight sm:text-4xl lg:sticky lg:top-32">
              {technology.areasTitle}
            </motion.h2>
          </motion.div>

          <motion.ul
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="border-t border-border lg:col-span-8"
          >
            {technology.areas.map((item) => (
              <Row key={item.id} item={item} open={open === item.id} onToggle={() => setOpen((o) => (o === item.id ? null : item.id))} />
            ))}
          </motion.ul>
        </div>
      </section>

      <CtaBand title={home.cta.headline} body={home.cta.body} button={home.cta.button} />
    </>
  )
}
