import { Link } from 'react-router-dom'
import { PiArrowRight } from 'react-icons/pi'

export const primaryCls =
  'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all ease-fluid-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]'

export const secondaryCls =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold transition-all ease-fluid-700 hover:-translate-y-0.5 hover:bg-muted active:translate-y-0 active:scale-[0.98]'

export function PrimaryLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`${primaryCls} ${className}`}>
      {children}
    </Link>
  )
}

export function SecondaryLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`${secondaryCls} ${className}`}>
      {children}
    </Link>
  )
}

// Inline text link with a sliding arrow
export function ArrowLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-base font-semibold text-foreground/80 transition-colors ease-fluid-700 hover:text-foreground ${className}`}
    >
      {children}
      <PiArrowRight className="transition-transform ease-fluid-700 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
