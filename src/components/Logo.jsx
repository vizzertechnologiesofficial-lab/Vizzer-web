import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import mark from '../assets/brand/vizzer-mark.png'

// Vizzer mark: the official orange "V" on a transparent background, so it sits on either theme.
export function Mark({ size = 28, animate = false, className = '' }) {
  return (
    <motion.img
      src={mark}
      alt=""
      width={size}
      height={size}
      draggable="false"
      className={`shrink-0 select-none ${className}`}
      initial={animate ? { opacity: 0, scale: 0.6, y: -4 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
    />
  )
}

export default function Logo({ animate = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark animate={animate} />
      <span className="text-lg font-bold tracking-tight leading-none">vizzer</span>
    </span>
  )
}
