import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { PiArrowUpRight, PiCheckBold, PiGooglePlayLogo, PiAppleLogo, PiArrowDown } from 'react-icons/pi'
import { products, productById } from '../data/products'
import Phone from '../components/Phone'
import ProductIcon from '../components/ProductIcon'
import { DURATION as GATER_MS } from '../components/demos/GaterDemo'
import { DURATION as RESTRO_MS } from '../components/demos/RestroDemo'
import { DURATION as SIYYANA_MS } from '../components/demos/SiyyanaDemo'
import { DURATION as PITCHIT_MS } from '../components/demos/PitchItDemo'
import { useTheme } from '../lib/theme'
import { useSmoothScroll } from '../lib/scroll'
import useMediaQuery from '../hooks/useMediaQuery'
import { EASE, reveal, stagger } from '../lib/motion'

const DURATIONS = { gater: GATER_MS, restro: RESTRO_MS, siyyana: SIYYANA_MS, pitchit: PITCHIT_MS }

/* Which product chapter currently sits on the middle of the screen. */
function useActiveChapter(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.dataset.chapter, e.isIntersecting))
        setActive(ids.find((id) => seen.get(id)) ?? null)
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    ids.forEach((id) => {
      const el = document.querySelector(`[data-chapter="${id}"]`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

/* Fit the sticky phone to the viewport height. */
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

const onAccent = (theme) => (theme === 'dark' ? '#131209' : '#FFFFFF')

/* ---------------------------------------------------------------- hero */

function Word({ product, onPick, theme, setRef }) {
  // An inline, non-positioned span so the heading's gradient text fill reaches it.
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPick(product.id)
    }
  }
  return (
    <span
      ref={setRef}
      role="button"
      tabIndex={0}
      onClick={() => onPick(product.id)}
      onKeyDown={onKey}
      aria-label={`${product.word}, show the ${product.name} demo`}
      className="hero-word cursor-pointer"
      style={{ '--u': product.accent[theme] }}
    >
      {product.word}
    </span>
  )
}

const line = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}

const Hero = forwardRef(function Hero({ currentId, onPick, theme }, ref) {
  const { scrollTo } = useSmoothScroll()
  const [gate, table, home, pitch] = products
  const wrapRef = useRef(null)
  const words = useRef({})
  const [bar, setBar] = useState(null)
  const [settled, setSettled] = useState(false)

  // The underline is one bar that travels between the measured word positions.
  const measure = useCallback(() => {
    const wrap = wrapRef.current
    const el = words.current[currentId]
    if (!wrap || !el) return
    const a = wrap.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setBar({ x: r.left - a.left, y: r.bottom - a.top, w: r.width })
  }, [currentId])

  useEffect(() => {
    measure()
  }, [measure, settled])

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 1500)
    window.addEventListener('resize', measure)
    document.fonts?.ready?.then(measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const W = (p) => <Word product={p} onPick={onPick} theme={theme} setRef={(el) => (words.current[p.id] = el)} />
  const accent = productById[currentId].accent[theme]

  return (
    <div ref={ref} className="flex min-h-[88svh] flex-col justify-center pb-12 pt-28 sm:pb-16 sm:pt-32 lg:min-h-screen lg:pb-24 lg:pt-40">
      <div ref={wrapRef} className="relative">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={stagger(0.09, 0.25)}
          className="text-hero max-w-3xl text-[2.75rem] font-semibold leading-[1.08] tracking-tighter min-[400px]:text-5xl sm:text-6xl sm:leading-none xl:text-7xl"
        >
          {[
            <>Software for the {W(gate)},</>,
            <>the {W(table)}, the {W(home)}</>,
            <>and the {W(pitch)}.</>,
          ].map((content, i) => (
            <span key={i} className="block overflow-hidden pb-2 sm:pb-4">
              <motion.span variants={line} className="block">
                {content}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        {bar && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-1 rounded-full sm:h-1.5"
            initial={false}
            animate={{ x: bar.x, y: bar.y + 2, width: bar.w, backgroundColor: accent, opacity: settled ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        )}
        <p className="sr-only" aria-live="polite">
          Showing the {productById[currentId].name} demo
        </p>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: EASE, delay: 0.75 }}
        className="mt-6 max-w-2xl text-lg text-muted-foreground sm:mt-8 sm:text-xl"
      >
        Vizzer Technologies designs, builds and runs mobile apps and web platforms. Gater, Restro, Siyyana and Pitch It
        are ours, and we would like to build yours next.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-10"
      >
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
        >
          Talk to our team
        </button>
        <button
          type="button"
          onClick={() => scrollTo('products')}
          className="group inline-flex items-center gap-2 rounded-full px-2 py-3 text-base font-semibold text-foreground/80 transition-colors ease-fluid-700 hover:text-foreground"
        >
          See our products
          <PiArrowDown className="transition-transform ease-fluid-700 group-hover:translate-y-1" aria-hidden="true" />
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.2 }}
        className="mt-8 text-sm text-muted-foreground sm:mt-12"
      >
        Android, iOS and web, from one team in India.
      </motion.p>
    </div>
  )
})

/* ---------------------------------------------------------------- tabs under the phone */

function DemoTabs({ currentId, onPick, progress, playing, theme, compact = false }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur-md" role="group" aria-label="Choose a product demo">
      {products.map((p) => {
        const active = p.id === currentId
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(p.id)}
            aria-pressed={active}
            aria-label={compact ? p.name : undefined}
            className={`relative flex items-center gap-2 rounded-full py-1.5 pl-1.5 text-sm font-semibold transition-colors ease-fluid-700 ${
              compact ? 'pr-1.5' : 'pr-3'
            } ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {active && (
              <motion.span
                layoutId={compact ? 'tab-bg-compact' : 'tab-bg'}
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
            <ProductIcon product={p} size={24} className="relative" />
            {!compact && <span className="relative">{p.name}</span>}
            {compact && active && <span className="relative pr-1.5">{p.name}</span>}
            {active && progress && (
              <span className="absolute inset-x-4 bottom-0.5 h-0.5 overflow-hidden rounded-full bg-foreground/10">
                <span
                  key={`${p.id}-${progress.key}`}
                  className="block h-full origin-left rounded-full"
                  style={{
                    background: p.accent[theme],
                    animation: `vz-grow ${DURATIONS[p.id]}ms linear forwards`,
                    animationPlayState: playing ? 'running' : 'paused',
                  }}
                />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- product chapter */

function StoreLinks({ p }) {
  const links = []
  if (p.stores?.play) links.push({ href: p.stores.play, label: 'Google Play', Icon: PiGooglePlayLogo })
  if (p.stores?.apple) links.push({ href: p.stores.apple, label: 'App Store', Icon: PiAppleLogo })
  return links.map(({ href, label, Icon }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-base font-semibold transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
    >
      <Icon size={18} aria-hidden="true" /> {label}
    </a>
  ))
}

function Chapter({ p, theme, isDesktop }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const accent = p.accent[theme]

  return (
    <article
      ref={ref}
      data-chapter={p.id}
      id={`product-${p.id}`}
      aria-labelledby={`${p.id}-title`}
      className="flex flex-col justify-center py-16 sm:py-24 lg:min-h-screen lg:py-32"
    >
      <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <motion.div variants={reveal} className="flex items-center gap-4">
          <ProductIcon product={p} size={52} />
          <div>
            <p className="text-xl font-bold tracking-tight">{p.name}</p>
            <p className="text-sm text-muted-foreground">{p.kind}</p>
          </div>
        </motion.div>

        <motion.h3
          variants={reveal}
          id={`${p.id}-title`}
          className="mt-6 max-w-2xl text-[2rem] font-semibold leading-tight tracking-tight sm:mt-8 sm:text-5xl sm:leading-none"
        >
          {p.title}
        </motion.h3>

        <motion.p variants={reveal} className="mt-6 max-w-xl text-lg text-muted-foreground">
          {p.body}
        </motion.p>

        {!isDesktop && (
          <motion.div variants={reveal} className="mt-10 flex justify-center sm:mt-12">
            <Phone productId={p.id} width={276} playing={inView} glow={`${accent}66`} label={`${p.name} app preview`} />
          </motion.div>
        )}

        <motion.ul variants={reveal} className="mt-10 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3 text-base">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: `${accent}22`, color: accent }}>
                <PiCheckBold size={12} aria-hidden="true" />
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
          {p.fact && (
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-semibold tracking-tight" style={{ color: accent }}>
                {p.fact.value}
              </span>
              <span className="max-w-48 text-sm text-muted-foreground">{p.fact.label}</span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {p.platforms.map((pl) => (
              <span key={pl} className="rounded-full border border-border px-3 py-1 text-sm font-semibold text-muted-foreground">
                {pl}
              </span>
            ))}
          </div>
        </motion.div>

        {(p.link || p.stores?.play || p.stores?.apple) && (
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
            {p.link && (
              <a
                href={p.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                style={{ background: accent, color: onAccent(theme) }}
              >
                {p.link.label}
                <PiArrowUpRight className="transition-transform ease-fluid-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <StoreLinks p={p} />
          </motion.div>
        )}
      </motion.div>
    </article>
  )
}

/* ---------------------------------------------------------------- section */

const PRODUCT_IDS = products.map((p) => p.id)

export default function HeroProducts() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isSmall = useMediaQuery('(max-width: 639px)')
  const phoneWidth = usePhoneWidth()
  const { scrollTo } = useSmoothScroll()

  const chapter = useActiveChapter(PRODUCT_IDS)
  const [heroIdx, setHeroIdx] = useState(0)
  const [cycle, setCycle] = useState(0)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { amount: 0.25 })

  const heroMode = !chapter
  const shownId = chapter ?? products[heroIdx].id
  const shown = productById[shownId]
  const accent = shown.accent[theme]
  const stage = chapter ? productById[chapter].stage[theme] : null
  const heroPlaying = heroInView && !reduce

  const next = useCallback(() => {
    setHeroIdx((i) => (i + 1) % products.length)
    setCycle((c) => c + 1)
  }, [])

  const pickHero = useCallback((id) => {
    setHeroIdx(products.findIndex((p) => p.id === id))
    setCycle((c) => c + 1)
  }, [])

  const pickTab = useCallback(
    (id) => {
      if (heroMode) pickHero(id)
      else scrollTo(`product-${id}`)
    },
    [heroMode, pickHero, scrollTo],
  )

  return (
    <section
      aria-label="Vizzer Technologies and our products"
      className="grain relative transition-colors duration-1000 ease-fluid"
      style={{ backgroundColor: stage ?? 'rgb(var(--background))' }}
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-x-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <Hero ref={heroRef} currentId={heroMode ? shownId : products[heroIdx].id} onPick={pickHero} theme={theme} />

          {!isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 64 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
              className="flex flex-col items-center gap-6 pb-12 sm:pb-24"
            >
              <Phone
                key="hero-phone"
                productId={products[heroIdx].id}
                width={Math.min(300, typeof window !== 'undefined' ? window.innerWidth - 72 : 300)}
                playing={heroPlaying}
                loop={false}
                onComplete={next}
                glow={`${products[heroIdx].accent[theme]}66`}
                label={`${products[heroIdx].name} app preview`}
              />
              <DemoTabs
                compact={isSmall}
                currentId={products[heroIdx].id}
                onPick={pickHero}
                progress={{ key: cycle }}
                playing={heroPlaying}
                theme={theme}
              />
            </motion.div>
          )}

          <div id="products" className="scroll-mt-20 pt-8 sm:pt-16 lg:pt-24">
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
              <motion.h2 variants={reveal} className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Four products, owned and run by our team.
              </motion.h2>
              <motion.p variants={reveal} className="mt-4 max-w-xl text-lg text-muted-foreground">
                Each one solves a job people do every day. Scroll through them, or tap a name to jump.
              </motion.p>
            </motion.div>
            {products.map((p) => (
              <Chapter key={p.id} p={p} theme={theme} isDesktop={isDesktop} />
            ))}
          </div>
        </div>

        {isDesktop && (
          <div className="lg:col-span-5">
            <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8 pt-20">
              <motion.div
                initial={{ opacity: 0, y: 96, rotateX: 24 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.45 }}
                style={{ transformPerspective: 1400 }}
              >
                <Phone
                  productId={shownId}
                  width={phoneWidth}
                  playing={heroMode ? heroPlaying : true}
                  loop={!heroMode}
                  onComplete={heroMode ? next : undefined}
                  glow={`${accent}66`}
                  label={`${shown.name} app preview`}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}>
                <DemoTabs
                  currentId={shownId}
                  onPick={pickTab}
                  progress={heroMode ? { key: cycle } : null}
                  playing={heroPlaying}
                  theme={theme}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
