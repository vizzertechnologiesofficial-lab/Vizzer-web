// One easing curve for the whole site: heavy, spring-like settle.
export const EASE = [0.32, 0.72, 0, 1]

export const reveal = {
  hidden: { opacity: 0, y: 64, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})
