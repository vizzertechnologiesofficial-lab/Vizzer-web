import { useRef } from 'react'
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = cubicBezier(0.32, 0.72, 0, 1)

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.28, 1], { ease })
  const y = useTransform(progress, range, [6, 0], { ease })
  return (
    <motion.span style={still ? undefined : { opacity, y }} className="inline-block will-change-transform">
      {children}
    </motion.span>
  )
}

// Large statement whose words light up one by one as it scrolls into view.
// `lines` are shown as separate blocks; `children` render underneath.
export default function Tagline({ lines, eyebrow, label, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = lines.flatMap((l, li) => l.split(' ').map((w, wi) => ({ w, li, wi })))
  const n = words.length

  return (
    <section aria-label={label ?? eyebrow} className="relative border-y border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
        <p
          ref={ref}
          className={`max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight ${eyebrow ? 'mt-6' : ''}`}
        >
          {lines.map((l, li) => (
            <span key={li} className={li > 0 ? 'mt-4 block sm:mt-6' : 'block'}>
              {words
                .map((w, i) => ({ ...w, i }))
                .filter((w) => w.li === li)
                .map(({ w, i }) => (
                  <span key={i}>
                    <Word progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.6) / n)]} still={reduce}>
                      {w}
                    </Word>{' '}
                  </span>
                ))}
            </span>
          ))}
        </p>
        {children}
      </div>
    </section>
  )
}
