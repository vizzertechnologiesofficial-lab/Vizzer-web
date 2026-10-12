import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

// Vizzer mark: a signal-amber tile with a "V" and the lens dot above it.
export function Mark({ size = 28, animate = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="18" fill="rgb(var(--signal))" />
      <motion.path
        d="M17 19 L32 46 L47 19"
        fill="none"
        stroke="#131209"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      />
      <motion.circle
        cx="32"
        cy="17"
        r="4.5"
        fill="#131209"
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        style={{ transformOrigin: '32px 17px' }}
      />
    </svg>
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
