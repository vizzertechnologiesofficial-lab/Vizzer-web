import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PiArrowUpRight, PiCheckBold, PiGooglePlayLogo, PiAppleLogo, PiChatCircleText } from 'react-icons/pi'
import { products, productById } from '../data/products'
import { productsPage, home } from '../data/content'
import { seo } from '../data/site'
import Phone from '../components/Phone'
import ProductIcon from '../components/ProductIcon'
import DemoTabs from '../components/DemoTabs'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { secondaryCls } from '../components/Buttons'
import { useTheme } from '../lib/theme'
import { useSmoothScroll } from '../lib/scroll'
import { usePageMeta } from '../lib/meta'
import useMediaQuery from '../hooks/useMediaQuery'
import { EASE, reveal, stagger } from '../lib/motion'

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
const accentCls =
  'inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]'

function StoreLinks({ p }) {
  const links = []
  if (p.stores?.play) links.push({ href: p.stores.play, label: 'Google Play', Icon: PiGooglePlayLogo })
  if (p.stores?.apple) links.push({ href: p.stores.apple, label: 'App Store', Icon: PiAppleLogo })
  return links.map(({ href, label, Icon }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={secondaryCls}>
      <Icon size={18} aria-hidden="true" /> {label}
    </a>
  ))
}

function Chapter({ p, theme, isDesktop }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const accent = p.accent[theme]
  const hasOwnLink = Boolean(p.link || p.stores?.play || p.stores?.apple)

  return (
    <article
      ref={ref}
      data-chapter={p.id}
      id={`product-${p.id}`}
      aria-labelledby={`${p.id}-title`}
      className="flex scroll-mt-8 flex-col justify-center py-16 sm:py-24 lg:min-h-screen lg:py-32"
    >
      <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <motion.div variants={reveal} className="flex items-center gap-4">
          <ProductIcon product={p} size={52} />
          <div>
            <h2 className="text-xl font-bold tracking-tight">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.kind}</p>
          </div>
        </motion.div>

        <motion.h3
          variants={reveal}
          id={`${p.id}-title`}
          className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:mt-8 sm:text-5xl sm:leading-none"
        >
          {p.title}
        </motion.h3>

        <motion.p variants={reveal} className="mt-6 max-w-xl text-lg text-muted-foreground">
          {p.body}
        </motion.p>

        <motion.p variants={reveal} className="mt-6 max-w-xl text-base">
          <span className="font-semibold">Who it’s for: </span>
          <span className="text-muted-foreground">{p.audience}</span>
        </motion.p>

        {!isDesktop && (
          <motion.div variants={reveal} className="mt-10 flex justify-center sm:mt-12">
            <Phone productId={p.id} width={276} playing={inView} glow={`${accent}66`} label={`${p.name} app preview`} />
          </motion.div>
        )}

        <motion.ul variants={reveal} className="mt-10 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2" aria-label={`${p.name} key features`}>
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

        <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
          {p.link && (
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${accentCls}`}
              style={{ background: accent, color: onAccent(theme) }}
            >
              {p.link.label}
              <PiArrowUpRight className="transition-transform ease-fluid-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <StoreLinks p={p} />
          {/* The enquiry button is the main action until the product has its own link or store listing */}
          <Link
            to={`/contact?enquiry=product&product=${p.id}`}
            className={hasOwnLink ? secondaryCls : accentCls}
            style={hasOwnLink ? undefined : { background: accent, color: onAccent(theme) }}
          >
            <PiChatCircleText size={18} aria-hidden="true" /> Enquire about {p.name}
          </Link>
        </motion.div>
      </motion.div>
    </article>
  )
}

const PRODUCT_IDS = products.map((p) => p.id)

export default function Products() {
  usePageMeta(seo.products)
  const { theme } = useTheme()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isSmall = useMediaQuery('(max-width: 639px)')
  const phoneWidth = usePhoneWidth()
  const { scrollTo } = useSmoothScroll()

  const chapter = useActiveChapter(PRODUCT_IDS)
  const shownId = chapter ?? products[0].id
  const shown = productById[shownId]
  const accent = shown.accent[theme]
  const stage = chapter ? productById[chapter].stage[theme] : null

  const pickTab = useCallback((id) => scrollTo(`product-${id}`), [scrollTo])

  return (
    <>
      <section
        aria-label="Our products"
        className="grain relative transition-colors duration-1000 ease-fluid"
        style={{ backgroundColor: stage ?? 'rgb(var(--background))' }}
      >
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-x-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <PageHeader eyebrow={productsPage.eyebrow} title={productsPage.headline}>
              <p>{productsPage.body}</p>
            </PageHeader>

            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.6 }}
                className="flex justify-center"
              >
                <DemoTabs compact={isSmall} currentId={shownId} onPick={pickTab} theme={theme} layoutKey="products-tab" />
              </motion.div>
            )}

            {products.map((p) => (
              <Chapter key={p.id} p={p} theme={theme} isDesktop={isDesktop} />
            ))}
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
                  <Phone productId={shownId} width={phoneWidth} playing glow={`${accent}66`} label={`${shown.name} app preview`} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}>
                  <DemoTabs currentId={shownId} onPick={pickTab} theme={theme} layoutKey="products-tab" />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="pt-24 lg:pt-32">
        <CtaBand title={home.cta.headline} body={home.cta.body} button={home.cta.button} />
      </div>
    </>
  )
}
