import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import GaterDemo from './demos/GaterDemo'
import RestroDemo from './demos/RestroDemo'
import SiyyanaDemo from './demos/SiyyanaDemo'
import PitchItDemo from './demos/PitchItDemo'
import { EASE } from '../lib/motion'

const DEMOS = { gater: GaterDemo, restro: RestroDemo, siyyana: SiyyanaDemo, pitchit: PitchItDemo }

// Design size of the device. Everything inside is laid out at this size and scaled.
const W = 360
const H = 760

function useTilt(ref, enabled) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(ry, { stiffness: 120, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return undefined
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return undefined
    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      ry.set(Math.max(-1, Math.min(1, dx)) * 14)
      rx.set(Math.max(-1, Math.min(1, dy)) * -10)
    }
    const onLeave = () => {
      rx.set(0)
      ry.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, ref, rx, ry])

  return { rotateX: sx, rotateY: sy }
}

export default function Phone({ productId, width = 320, playing = true, loop = true, onComplete, glow = '#000', label }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { rotateX, rotateY } = useTilt(ref, !reduce)
  const glareX = useTransform(rotateY, [-14, 14], ['-30%', '30%'])
  const scale = width / W
  const Demo = DEMOS[productId]

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      style={{ width, height: H * scale }}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <motion.div
          className="device relative h-full w-full p-2.5"
          animate={{ boxShadow: `0 60px 120px -40px ${glow}, 0 30px 60px -30px rgba(0,0,0,0.55)` }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1600,
            background: 'linear-gradient(145deg, #2a2a2a 0%, #0c0c0c 40%, #1b1b1b 100%)',
          }}
        >
          {/* side buttons */}
          <span className="absolute -left-1 top-32 h-10 w-1 rounded-l bg-neutral-700" />
          <span className="absolute -left-1 top-48 h-16 w-1 rounded-l bg-neutral-700" />
          <span className="absolute -right-1 top-40 h-20 w-1 rounded-r bg-neutral-700" />

          <div className="device-screen relative h-full w-full overflow-hidden bg-white" aria-hidden="true">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={productId}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {Demo && <Demo playing={playing} loop={loop} onComplete={onComplete} />}
              </motion.div>
            </AnimatePresence>

            {/* dynamic island */}
            <div className="absolute left-1/2 top-3 z-40 h-8 w-28 -translate-x-1/2 rounded-full bg-black" />
            {/* home indicator */}
            <div className="absolute bottom-2 left-1/2 z-40 h-1 w-32 -translate-x-1/2 rounded-full bg-neutral-900/80 mix-blend-difference" />
            {/* glass glare */}
            <motion.div
              className="pointer-events-none absolute -inset-1/2 z-40"
              style={{
                x: glareX,
                background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.10) 48%, transparent 56%)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
