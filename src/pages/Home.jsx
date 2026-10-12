import { motion } from 'framer-motion'
import HomeHero from '../sections/HomeHero'
import Tagline from '../sections/Tagline'
import ProductGrid from '../sections/ProductGrid'
import WhatWeDo from '../sections/WhatWeDo'
import Approach from '../sections/Approach'
import CtaBand from '../components/CtaBand'
import { ArrowLink } from '../components/Buttons'
import { home } from '../data/content'
import { seo } from '../data/site'
import { usePageMeta } from '../lib/meta'
import { reveal } from '../lib/motion'

export default function Home() {
  usePageMeta(seo.home)
  const { about, cta } = home

  return (
    <>
      <HomeHero />
      <Tagline lines={about.lead} eyebrow={about.eyebrow}>
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mt-10 sm:mt-12">
          <p className="max-w-2xl text-lg text-muted-foreground">{about.body}</p>
          <ArrowLink to="/about" className="mt-8">
            {about.link}
          </ArrowLink>
        </motion.div>
      </Tagline>
      <ProductGrid />
      <WhatWeDo />
      <Approach />
      <CtaBand title={cta.headline} body={cta.body} button={cta.button} />
    </>
  )
}
