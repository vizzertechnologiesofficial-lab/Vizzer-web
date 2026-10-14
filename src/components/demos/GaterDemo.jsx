import { AnimatePresence, motion } from 'framer-motion'
import { PiCheckBold, PiShieldCheck, PiCaretLeft } from 'react-icons/pi'
import { StatusBar, Tap, Typed, useTimeline, screenSwap, FakeQR } from './ui'
import { EASE } from '../../lib/motion'
import gaterGlyph from '../../assets/apps/gater-glyph.png'

const TEAL = '#137566'
const STEPS = [1900, 2700, 800, 1900, 2700]
export const DURATION = STEPS.reduce((a, b) => a + b, 0)

const fields = [
  { label: 'Full name', value: 'Aisha Rahman' },
  { label: 'Phone', value: '+91 98470 31562' },
  { label: 'Visiting', value: 'Accounts, 3rd floor' },
  { label: 'Vehicle number', value: 'KL 11 BK 4821' },
]

export default function GaterDemo({ playing = true, onComplete, loop = true }) {
  const step = useTimeline(STEPS, { playing, onComplete, loop })

  return (
    <div className="relative flex h-full flex-col bg-[#F6F8F7] text-neutral-900">
      <StatusBar />
      <div className="flex items-center gap-2 px-6 pt-2">
        {step >= 1 ? <PiCaretLeft className="text-neutral-400" size={18} aria-hidden="true" /> : null}
        <img src={gaterGlyph} alt="" width={20} height={20} />
        <span className="text-sm font-bold">Gater</span>
        <span className="ml-auto rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-500 shadow-sm">Gate 2</span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="scan" {...screenSwap} className="flex h-full flex-col items-center px-6 pt-8">
              <p className="text-2xl font-bold tracking-tight">Scan to check in</p>
              <p className="mt-1 text-sm text-neutral-500">Harbour Point Offices</p>
              <div className="relative mt-8 grid h-60 w-60 place-items-center rounded-3xl bg-white shadow-sm">
                {['left-3 top-3 border-l-4 border-t-4 rounded-tl-xl', 'right-3 top-3 border-r-4 border-t-4 rounded-tr-xl', 'left-3 bottom-3 border-l-4 border-b-4 rounded-bl-xl', 'right-3 bottom-3 border-r-4 border-b-4 rounded-br-xl'].map((c) => (
                  <span key={c} className={`absolute h-8 w-8 ${c}`} style={{ borderColor: TEAL }} />
                ))}
                <FakeQR size={152} seed={11} />
                <motion.span
                  className="absolute inset-x-6 h-0.5 rounded-full"
                  style={{ background: TEAL, boxShadow: `0 0 16px 2px ${TEAL}` }}
                  initial={{ top: '14%' }}
                  animate={{ top: ['14%', '84%', '14%'] }}
                  transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>
              <p className="mt-6 text-center text-sm text-neutral-500">Point your camera at the code on the wall</p>
            </motion.div>
          )}

          {(step === 1 || step === 2) && (
            <motion.div key="form" {...screenSwap} className="flex h-full flex-col px-6 pt-6">
              <p className="text-2xl font-bold tracking-tight">Visitor details</p>
              <p className="mt-1 text-sm text-neutral-500">Harbour Point Offices asks for these</p>
              <div className="mt-6 flex flex-col gap-3">
                {fields.map((f, i) => (
                  <div key={f.label} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold text-neutral-400">{f.label}</p>
                    <p className="mt-0.5 h-6 text-base font-semibold">
                      <Typed text={f.value} start delay={150 + i * 620} speed={34} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative mt-auto mb-10">
                <div className="rounded-2xl py-3 text-center text-base font-semibold text-white" style={{ background: TEAL }}>
                  Send to guard
                </div>
                {step === 2 && <Tap color="rgba(255,255,255,0.45)" />}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="wait" {...screenSwap} className="flex h-full flex-col items-center justify-center px-6 pb-16">
              <div className="relative grid h-28 w-28 place-items-center">
                {[0, 1].map((r) => (
                  <motion.span
                    key={r}
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${TEAL}` }}
                    initial={{ scale: 0.6, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: r * 0.7, ease: 'easeOut' }}
                  />
                ))}
                <span className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-md">
                  <PiShieldCheck size={36} color={TEAL} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-8 text-xl font-bold">Waiting for the guard</p>
              <p className="mt-1 text-center text-sm text-neutral-500">Ravi at Gate 2 has your request</p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="cleared" {...screenSwap} className="flex h-full flex-col items-center px-6 pt-10">
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="grid h-20 w-20 place-items-center rounded-full text-white"
                style={{ background: TEAL }}
              >
                <PiCheckBold size={36} aria-hidden="true" />
              </motion.span>
              <p className="mt-6 text-2xl font-bold tracking-tight">You're cleared</p>
              <p className="mt-1 text-sm text-neutral-500">Entered at 10:42 AM</p>
              <motion.div
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                className="mt-8 w-full rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl text-base font-bold text-white" style={{ background: TEAL }}>
                    AR
                  </span>
                  <div>
                    <p className="text-base font-bold">Aisha Rahman</p>
                    <p className="text-xs text-neutral-500">Accounts, 3rd floor</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F6F8F7] px-4 py-3">
                  <div>
                    <p className="text-xs text-neutral-500">Logged by</p>
                    <p className="text-sm font-semibold">Ravi, Gate 2</p>
                  </div>
                  <FakeQR size={44} seed={3} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
