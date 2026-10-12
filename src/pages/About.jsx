import { motion } from 'framer-motion'
import { PiEye, PiTarget, PiLightbulb, PiArrowsClockwise, PiShieldCheck, PiPlant } from 'react-icons/pi'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { about, home } from '../data/content'
import { seo } from '../data/site'
import { usePageMeta } from '../lib/meta'
import { reveal, stagger } from '../lib/motion'

const VALUE_ICONS = [PiLightbulb, PiArrowsClockwise, PiShieldCheck, PiPlant]

export default function About() {
  usePageMeta(seo.about)
  const [first, ...rest] = about.paragraphs

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={about.eyebrow} title={about.headline}>
          <p>{first}</p>
        </PageHeader>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex max-w-2xl flex-col gap-6 pb-20 sm:pb-24 lg:ml-auto lg:max-w-3xl lg:pb-32"
        >
          {rest.map((p) => (
            <motion.p key={p} variants={reveal} className="text-xl leading-relaxed text-foreground/90 sm:text-2xl sm:leading-relaxed">
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <section aria-label="Vision and mission" className="border-t border-border/60 bg-background">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8 lg:py-32"
        >
          {[
            { ...about.vision, Icon: PiEye },
            { ...about.mission, Icon: PiTarget },
          ].map(({ title, body, Icon }) => (
            <motion.div key={title} variants={reveal} className="rounded-3xl border border-border bg-card p-6 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-signal text-[#131209]">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-4 text-xl text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section aria-labelledby="values-title" className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            id="values-title"
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {about.values.title}
          </motion.h2>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
          >
            {about.values.items.map((v, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <motion.li key={v.title} variants={reveal} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground">{v.body}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </section>

      <CtaBand title={home.cta.headline} body={home.cta.body} button={home.cta.button} />
    </>
  )
}
