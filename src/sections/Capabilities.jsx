import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiDeviceMobile, PiBrowser, PiDatabase, PiPenNib, PiPlus } from 'react-icons/pi'
import { productById } from '../data/products'
import ProductIcon from '../components/ProductIcon'
import { EASE, reveal, stagger } from '../lib/motion'

const items = [
  {
    id: 'mobile',
    title: 'Mobile apps',
    Icon: PiDeviceMobile,
    body:
      'Android and iOS apps from one Flutter codebase. Phone OTP, Google and Apple sign in, push notifications, location search and in app payments are all running in our apps today.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Razorpay'],
    runningIn: ['restro', 'siyyana', 'pitchit'],
  },
  {
    id: 'web',
    title: 'Web platforms',
    Icon: PiBrowser,
    body:
      'Company sites, dashboards and subscription software. React on the front, Django REST APIs behind it, with separate access for admins and staff.',
    stack: ['React', 'Tailwind CSS', 'Django REST', 'JWT auth'],
    runningIn: ['gater'],
  },
  {
    id: 'backend',
    title: 'Backends and hosting',
    Icon: PiDatabase,
    body:
      'APIs, PostgreSQL databases and Docker deployments. We set up the servers, keep them patched and watch them after launch, so nothing goes quiet once your app is live.',
    stack: ['PostgreSQL', 'Docker', 'Linux servers', 'Multi tenant schemas'],
    runningIn: ['gater', 'restro', 'siyyana', 'pitchit'],
  },
  {
    id: 'design',
    title: 'Product design',
    Icon: PiPenNib,
    body:
      'User flows, screens, store listings and launch material, worked out with you before a line of code is written.',
    stack: ['User flows', 'Interface design', 'Prototypes', 'Store listings'],
    runningIn: ['gater'],
  },
]

function Row({ item, open, onToggle }) {
  const panelId = `cap-${item.id}`
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
            <item.Icon size={24} aria-hidden="true" />
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
            <div className="grid gap-8 pb-10 sm:pl-16 md:grid-cols-5 md:pl-20">
              <p className="text-lg text-muted-foreground md:col-span-3">{item.body}</p>
              <div className="flex flex-col gap-6 md:col-span-2">
                <ul className="flex flex-wrap gap-2" aria-label="Tools we use">
                  {item.stack.map((s) => (
                    <li key={s} className="rounded-full border border-border px-3 py-1 text-sm font-semibold">
                      {s}
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-sm text-muted-foreground">Running in</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.runningIn.map((id) => (
                      <li key={id} className="flex items-center gap-2 rounded-full bg-muted py-1 pl-1 pr-3 text-sm font-semibold">
                        <ProductIcon product={productById[id]} size={24} />
                        {productById[id].name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Capabilities() {
  const [open, setOpen] = useState('mobile')
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-32">
            <motion.h2 variants={reveal} id="capabilities-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              What we do
            </motion.h2>
            <motion.p variants={reveal} className="mt-6 max-w-sm text-lg text-muted-foreground">
              One team covers the whole product: the app on the phone, the dashboard on the laptop and the server
              both of them talk to.
            </motion.p>
          </div>
        </motion.div>

        <motion.ul
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="border-t border-border lg:col-span-8"
        >
          {items.map((item) => (
            <Row key={item.id} item={item} open={open === item.id} onToggle={() => setOpen((o) => (o === item.id ? null : item.id))} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
