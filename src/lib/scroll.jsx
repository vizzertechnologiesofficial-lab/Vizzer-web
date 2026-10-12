import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

const ScrollContext = createContext({ scrollTo: () => {} })

export function SmoothScroll({ children }) {
  const reduce = useReducedMotion()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (reduce) return undefined
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    lenisRef.current = lenis
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduce])

  const scrollTo = useCallback((target, opts = {}) => {
    const el = typeof target === 'string' ? document.getElementById(target) : target
    if (!el) return
    const offset = opts.offset ?? 0
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset, duration: 1.4 })
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [reduce])

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(ScrollContext)
