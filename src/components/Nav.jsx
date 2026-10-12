import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiMoon, PiSun } from 'react-icons/pi'
import Logo from './Logo'
import { nav, site } from '../data/site'
import { useTheme } from '../lib/theme'
import { useSmoothScroll } from '../lib/scroll'
import { EASE } from '../lib/motion'

function useActiveSection(ids, enabled) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return undefined
    }
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
        const current = ids.filter((id) => seen.get(id)).pop() ?? null
        setActive(current)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids, enabled])
  return active
}

export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative grid h-10 w-10 place-items-center rounded-full md:h-9 md:w-9 text-foreground/80 transition-all ease-fluid-700 hover:bg-muted hover:text-foreground active:scale-95 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid place-items-center"
        >
          {dark ? <PiSun size={18} /> : <PiMoon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const onHome = location.pathname === '/'
  const active = useActiveSection(
    nav.map((n) => n.id),
    onHome,
  )

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setOpen(false)
    if (onHome) {
      scrollTo(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const goHome = () => {
    setOpen(false)
    if (onHome) {
      scrollTo(document.body)
      window.scrollTo({ top: 0 })
    } else navigate('/')
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[env(safe-area-inset-top)]"
      >
        <nav
          aria-label="Main"
          className="glass mt-4 flex w-max max-w-full items-center gap-1 rounded-full border border-border/80 p-2 shadow-sm sm:mt-6"
        >
          <button
            type="button"
            onClick={goHome}
            className="rounded-full px-2 py-1 transition-all ease-fluid-700 active:scale-95"
            aria-label={`${site.name}, back to top`}
          >
            <Logo animate />
          </button>

          <ul className="ml-2 hidden items-center md:flex">
            {nav.map((item) => (
              <li key={item.id} className="relative">
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm font-semibold transition-colors ease-fluid-700 ${
                    active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <ThemeToggle className="ml-1" />

          <button
            type="button"
            onClick={() => go('contact')}
            className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] md:inline-flex"
          >
            Talk to us
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative ml-1 h-10 w-10 rounded-full transition-all ease-fluid-700 hover:bg-muted active:scale-95 md:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-foreground transition-all ease-fluid-700 ${
                open ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-foreground transition-all ease-fluid-700 ${
                open ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between gap-10 overflow-y-auto overscroll-contain bg-background/90 px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-28 backdrop-blur-3xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => go(item.id)}
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.05 }}
                    className={`py-2 text-left text-4xl font-semibold tracking-tight ${
                      active === item.id ? 'text-foreground' : 'text-foreground/70'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <button
                type="button"
                onClick={() => go('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground active:scale-[0.98]"
              >
                Talk to us
              </button>
              <a href={`mailto:${site.email}`} className="text-center text-sm text-muted-foreground">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
