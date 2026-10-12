import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/**
 * Steps through a list of durations (ms). Returns the current step index.
 * Calls onComplete when the last step finishes, then loops if `loop` is set.
 */
export function useTimeline(durations, { playing = true, loop = true, onComplete } = {}) {
  const [step, setStep] = useState(0)
  const done = useRef(onComplete)
  done.current = onComplete

  useEffect(() => {
    if (!playing) return undefined
    const t = setTimeout(() => {
      if (step < durations.length - 1) {
        setStep(step + 1)
      } else {
        done.current?.()
        if (loop) setStep(0)
      }
    }, durations[step])
    return () => clearTimeout(t)
    // durations is a static array per demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, playing])

  return step
}

/** Types `text` one character at a time once `start` is true. */
export function Typed({ text, start, speed = 42, delay = 0, caret = true }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) {
      setN(0)
      return undefined
    }
    let i = 0
    let timer
    const begin = setTimeout(function tick() {
      i += 1
      setN(i)
      if (i < text.length) timer = setTimeout(tick, speed)
    }, delay)
    return () => {
      clearTimeout(begin)
      clearTimeout(timer)
    }
  }, [start, text, speed, delay])
  const typing = start && n > 0 && n < text.length
  return (
    <span>
      {text.slice(0, n)}
      {caret && typing && <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-current align-baseline" />}
    </span>
  )
}

/** A soft touch ripple, placed absolutely over the element being "tapped". */
export function Tap({ x = '50%', y = '50%', color = 'rgba(0,0,0,0.18)' }) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute z-30 rounded-full"
      style={{ left: x, top: y, width: 44, height: 44, marginLeft: -22, marginTop: -22, background: color }}
      initial={{ scale: 0.3, opacity: 0.9 }}
      animate={{ scale: 1.6, opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    />
  )
}

/** iOS style status bar. */
export function StatusBar({ dark = false, time = '10:42' }) {
  const c = dark ? 'text-white' : 'text-neutral-900'
  return (
    <div className={`relative z-20 flex h-12 items-end justify-between px-8 pb-1 text-sm font-semibold ${c}`}>
      <span>{time}</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.6 10.6 0 0 0 8 .4C5.1.4 2.5 1.6.5 3.4l1.3 1.3A8.8 8.8 0 0 1 8 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.5l1.3-1.3A7 7 0 0 0 8 4a7 7 0 0 0-5 2l1.3 1.3c1-.9 2.3-1.5 3.7-1.5Zm0 3.6c.5 0 1 .2 1.3.5L8 11.3 6.7 9.9c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
          <rect x="24" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}

/** Bottom sheet that slides up inside the phone. */
export function Sheet({ children, className = '' }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`absolute inset-x-0 bottom-0 z-20 rounded-t-3xl bg-white px-6 pb-12 pt-4 shadow-2xl ${className}`}
    >
      <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200" />
      {children}
    </motion.div>
  )
}

export const screenSwap = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.28, ease: EASE } },
}

/** Deterministic fake QR pattern (looks like a QR code, encodes nothing). */
export function FakeQR({ size = 120, color = '#131209', seed = 7 }) {
  const n = 21
  const cells = []
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const finder = (x, y) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      if (finder(x, y)) continue
      if (rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)
    }
  }
  const Finder = ({ x, y }) => (
    <g>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} fill={color} shapeRendering="crispEdges" aria-hidden="true">
      {cells}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  )
}
