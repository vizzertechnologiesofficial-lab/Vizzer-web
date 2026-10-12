import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { products } from '../data/products'
import { home } from '../data/content'
import Phone from '../components/Phone'
import DemoTabs from '../components/DemoTabs'
import { PrimaryLink, SecondaryLink } from '../components/Buttons'
import { useTheme } from '../lib/theme'
import useMediaQuery from '../hooks/useMediaQuery'
import { EASE, stagger } from '../lib/motion'

const line = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}

/* Fit the phone to the viewport height on large screens. */
function usePhoneWidth() {
  const calc = () => {
    if (typeof window === 'undefined') return 320
    const h = window.innerHeight - 220
    return Math.round(Math.max(250, Math.min(340, (h * 360) / 760)))
  }
  const [w, setW] = useState(calc)
  useEffect(() => {
    const on = () => setW(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

export default function HomeHero() {
  const { hero } = home
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isSmall = useMediaQuery('(max-width: 639px)')
  const phoneWidth = usePhoneWidth()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const playing = inView && !reduce

  const [idx, setIdx] = useState(0)
  const [cycle, setCycle] = useState(0)
  const current = products[idx]

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % products.length)
    setCycle((c) => c + 1)
  }, [])

  const pick = useCallback((id) => {
    setIdx(products.findIndex((p) => p.id === id))
    setCycle((c) => c + 1)
  }, [])

  const width = isDesktop ? phoneWidth : Math.min(300, typeof window !== 'undefined' ? window.innerWidth - 72 : 300)

  return (
    <section ref={ref} aria-labelledby="hero-title" className="grain relative bg-background">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-12 px-4 sm:px-6 lg:min-h-screen lg:grid-cols-12 lg:px-8">
        <div className="flex flex-col justify-center pb-12 pt-32 sm:pt-40 lg:col-span-7 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial="hidden"
            animate="show"
            variants={stagger(0.09, 0.25)}
            className="text-hero mt-6 max-w-2xl text-[2.75rem] font-semibold leading-[1.08] tracking-tighter min-[400px]:text-5xl sm:text-6xl sm:leading-none xl:text-7xl"
          >
            {hero.headline.map((content, i) => (
              <span key={i} className="block overflow-hidden pb-2 sm:pb-4">
                <motion.span variants={line} className="block">
                  {content}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:mt-8 sm:text-xl"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          >
            <PrimaryLink to="/products">{hero.primary}</PrimaryLink>
            <SecondaryLink to="/contact">{hero.secondary}</SecondaryLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: isDesktop ? 96 : 64, rotateX: isDesktop ? 24 : 0 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
          style={{ transformPerspective: 1400 }}
          className="flex flex-col items-center gap-6 pb-16 sm:pb-24 lg:col-span-5 lg:gap-8 lg:pb-0 lg:pt-20"
        >
          <Phone
            productId={current.id}
            width={width}
            playing={playing}
            loop={false}
            onComplete={next}
            glow={`${current.accent[theme]}66`}
            label={`${current.name} app preview`}
          />
          <DemoTabs
            compact={isSmall}
            currentId={current.id}
            onPick={pick}
            progress={{ key: cycle }}
            playing={playing}
            theme={theme}
            layoutKey="hero-tab"
          />
        </motion.div>
      </div>
    </section>
  )
}
