import { AnimatePresence, motion } from 'framer-motion'
import {
  PiBroom,
  PiCar,
  PiWashingMachine,
  PiCookingPot,
  PiPlant,
  PiWrench,
  PiMagnifyingGlass,
  PiSealCheckFill,
  PiStarFill,
  PiCheckBold,
  PiCaretLeft,
  PiTranslate,
} from 'react-icons/pi'
import { StatusBar, Tap, useTimeline, screenSwap } from './ui'
import { EASE } from '../../lib/motion'

const BLUE = '#056C95'
const STEPS = [1700, 800, 1900, 2100, 700, 2900]
export const DURATION = STEPS.reduce((a, b) => a + b, 0)

const services = [
  { name: 'Home cleaning', icon: PiBroom, bg: '#E3F1F7' },
  { name: 'Car cleaning', icon: PiCar, bg: '#EDE7FB' },
  { name: 'Laundry', icon: PiWashingMachine, bg: '#E6F6EE' },
  { name: 'Cooking', icon: PiCookingPot, bg: '#FDEDE3' },
  { name: 'Gardening', icon: PiPlant, bg: '#EAF5E1' },
  { name: 'Mechanic', icon: PiWrench, bg: '#F2EEE6' },
]

const days = [
  { d: 'Mon', n: '12' },
  { d: 'Tue', n: '13' },
  { d: 'Wed', n: '14' },
  { d: 'Thu', n: '15' },
]
const slots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']

function Header({ title, back }) {
  return (
    <div className="flex items-center gap-2 px-6 pt-2">
      {back && <PiCaretLeft size={18} className="text-neutral-400" aria-hidden="true" />}
      <p className="text-base font-bold">{title}</p>
    </div>
  )
}

export default function SiyyanaDemo({ playing = true, onComplete, loop = true }) {
  const step = useTimeline(STEPS, { playing, onComplete, loop })

  return (
    <div className="relative flex h-full flex-col bg-white text-neutral-900">
      <StatusBar />
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {step <= 1 && (
            <motion.div key="home" {...screenSwap} className="flex h-full flex-col px-6 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold tracking-wide" style={{ color: BLUE }}>SIYYANA</p>
                <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                  <PiTranslate size={14} aria-hidden="true" /> EN <span className="text-neutral-300">|</span> <span lang="ar">عربي</span>
                </span>
              </div>
              <p className="mt-6 text-3xl font-bold leading-tight tracking-tight">
                What service
                <br />
                do you need?
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-400">
                <PiMagnifyingGlass size={16} aria-hidden="true" /> Search services
              </div>
              <p className="mt-6 text-sm font-bold">Popular services</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {services.map((s, i) => (
                  <div
                    key={s.name}
                    className={`relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-300 ${step === 1 && i === 0 ? 'scale-95' : ''}`}
                    style={{ background: s.bg }}
                  >
                    <s.icon size={28} color={BLUE} aria-hidden="true" />
                    <span className="text-center text-xs font-semibold leading-tight">{s.name}</span>
                    {step === 1 && i === 0 && <Tap />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="pros" {...screenSwap} className="flex h-full flex-col">
              <Header title="Home cleaning" back />
              <p className="px-6 pt-1 text-xs text-neutral-500">4 specialists within 25 km</p>
              <div className="mt-4 flex flex-col gap-3 px-6">
                {[
                  { n: 'Fathima K.', r: '4.8', c: '126', y: '6 years', sel: true },
                  { n: 'Joseph M.', r: '4.7', c: '89', y: '4 years' },
                  { n: 'Nadia S.', r: '4.9', c: '211', y: '8 years' },
                ].map((p, i) => (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border p-3"
                    style={{ borderColor: p.sel ? BLUE : '#EEE', background: p.sel ? '#F0F8FC' : '#fff' }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white" style={{ background: i === 0 ? BLUE : i === 1 ? '#7C8B93' : '#3E7A6E' }}>
                      {p.n.split(' ').map((w) => w[0]).join('')}
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-1 text-sm font-bold">
                        {p.n} <PiSealCheckFill color={BLUE} size={14} aria-label="ID verified" />
                      </p>
                      <p className="flex items-center gap-1 text-xs text-neutral-500">
                        <PiStarFill color="#EFA83D" size={12} aria-hidden="true" /> {p.r} ({p.c}) · {p.y}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {(step === 3 || step === 4) && (
            <motion.div key="slot" {...screenSwap} className="flex h-full flex-col">
              <Header title="Book Fathima K." back />
              <div className="px-6">
                <p className="mt-6 text-sm font-bold">Select date</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {days.map((d, i) => {
                    const on = i === 1
                    return (
                      <motion.div
                        key={d.n}
                        animate={on ? { backgroundColor: BLUE, color: '#ffffff' } : {}}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                        className="rounded-2xl bg-neutral-100 py-3 text-center"
                      >
                        <p className="text-xs opacity-70">{d.d}</p>
                        <p className="text-lg font-bold">{d.n}</p>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="mt-6 text-sm font-bold">Select time</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {slots.map((s, i) => {
                    const on = i === 1
                    return (
                      <motion.div
                        key={s}
                        animate={on ? { backgroundColor: '#F0F8FC', borderColor: BLUE, color: BLUE } : {}}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
                        className="rounded-2xl border border-neutral-200 py-3 text-center text-sm font-semibold"
                      >
                        {s}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <div className="relative mx-6 mb-10 mt-auto rounded-2xl py-3 text-center text-base font-semibold text-white" style={{ background: BLUE }}>
                Confirm booking
                {step === 4 && <Tap color="rgba(255,255,255,0.45)" />}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="done" {...screenSwap} className="flex h-full flex-col items-center px-6 pt-12">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="grid h-20 w-20 place-items-center rounded-full text-white"
                style={{ background: BLUE }}
              >
                <PiCheckBold size={36} aria-hidden="true" />
              </motion.span>
              <p className="mt-6 text-2xl font-bold tracking-tight">Booking confirmed</p>
              <p className="mt-1 text-center text-sm text-neutral-500">Fathima K. arrives Tue 13, 11:00 AM</p>
              <div className="mt-8 w-full rounded-3xl bg-[#F0F8FC] p-5 text-center">
                <p className="text-sm font-bold">Completion PIN</p>
                <div className="mt-4 flex justify-center gap-2">
                  {['4', '8', '2', '1'].map((d, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.12 }}
                      className="grid h-14 w-12 place-items-center rounded-xl bg-white text-2xl font-bold shadow-sm"
                      style={{ color: BLUE }}
                    >
                      {d}
                    </motion.span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-neutral-500">Share it with Fathima when the job is done</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
