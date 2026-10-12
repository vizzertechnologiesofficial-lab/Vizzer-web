import { AnimatePresence, motion } from 'framer-motion'
import {
  PiMapPinFill,
  PiMagnifyingGlass,
  PiBowlFood,
  PiHamburger,
  PiCoffee,
  PiClock,
  PiTicket,
  PiHouseFill,
  PiTagFill,
  PiUserFill,
} from 'react-icons/pi'
import { StatusBar, Tap, useTimeline, Sheet, screenSwap } from './ui'
import { EASE } from '../../lib/motion'

const SLATE = '#2B4248'
const ORANGE = '#ED6D46'
const SAGE = '#B9D3B3'
const STEPS = [1800, 800, 2100, 700, 2900]
export const DURATION = STEPS.reduce((a, b) => a + b, 0)

const offers = [
  { name: 'Malabar Grill House', deal: 'Buy one get one on biryani', km: '0.8 km', left: '38 left', icon: PiBowlFood, bg: '#FCE3D8' },
  { name: 'Saffron Street', deal: 'Flat 25% off on dinner', km: '1.6 km', left: '12 left', icon: PiHamburger, bg: '#E2ECDF' },
  { name: 'Cafe Mosaic', deal: 'Free dessert above ₹600', km: '2.3 km', left: '54 left', icon: PiCoffee, bg: '#E6E9F6' },
]

const confetti = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37) % 100,
  r: (i * 53) % 360,
  c: [ORANGE, SAGE, SLATE, '#EFA83D'][i % 4],
  d: (i % 5) * 0.06,
}))

function Home({ step }) {
  return (
    <div className="flex h-full flex-col px-5 pt-2">
      <div className="flex items-center gap-2">
        <PiMapPinFill color={ORANGE} size={18} aria-hidden="true" />
        <div>
          <p className="text-xs text-neutral-500">Offers near</p>
          <p className="text-sm font-bold">Mavoor Road</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-400">
        <PiMagnifyingGlass size={16} aria-hidden="true" /> Search restaurants or dishes
      </div>
      <div className="relative mt-4 overflow-hidden rounded-3xl p-5 text-white" style={{ background: SLATE }}>
        <p className="text-xs font-semibold" style={{ color: SAGE }}>Saffron Street</p>
        <p className="mt-1 text-2xl font-bold leading-tight">Flat 25% off<br />on dinner</p>
        <span className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold" style={{ background: ORANGE }}>Claim now</span>
        <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full" style={{ background: ORANGE, opacity: 0.85 }} />
        <span className="absolute -bottom-10 right-10 h-24 w-24 rounded-full" style={{ background: SAGE, opacity: 0.5 }} />
      </div>
      <div className="mt-4 flex gap-2 overflow-hidden">
        {['All', 'Combo offers', 'Buy one get one'].map((c, i) => (
          <span key={c} className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold" style={i === 0 ? { background: SLATE, color: '#fff' } : { background: '#F1F1EF', color: '#555' }}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {offers.map((o, i) => (
          <div key={o.name} className={`relative flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-all duration-300 ${step === 1 && i === 0 ? 'scale-[0.98] ring-2' : ''}`} style={{ '--tw-ring-color': ORANGE }}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: o.bg }}>
              <o.icon size={24} color={SLATE} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{o.name}</p>
              <p className="truncate text-xs text-neutral-500">{o.deal}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold" style={{ color: ORANGE }}>{o.left}</p>
              <p className="text-xs text-neutral-400">{o.km}</p>
            </div>
            {step === 1 && i === 0 && <Tap />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RestroDemo({ playing = true, onComplete, loop = true }) {
  const step = useTimeline(STEPS, { playing, onComplete, loop })
  const claimed = step >= 3 ? 83 : 82

  return (
    <div className="relative flex h-full flex-col bg-[#FBFAF8] text-neutral-900">
      <StatusBar />
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {step <= 3 && (
            <motion.div key="home" {...screenSwap} className="h-full">
              <Home step={step} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="coupon" {...screenSwap} className="relative flex h-full flex-col items-center px-6 pt-8">
              {confetti.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute top-0 h-2 w-1 rounded-sm"
                  style={{ left: `${p.x}%`, background: p.c }}
                  initial={{ y: -20, rotate: p.r, opacity: 1 }}
                  animate={{ y: 420, rotate: p.r + 220, opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeIn', delay: p.d }}
                />
              ))}
              <p className="text-sm font-semibold" style={{ color: ORANGE }}>Coupon claimed</p>
              <p className="mt-1 text-center text-2xl font-bold leading-tight tracking-tight">Buy one get one<br />on biryani</p>
              <motion.div
                initial={{ rotateX: 70, opacity: 0, y: 24 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                style={{ transformPerspective: 800 }}
                className="relative mt-8 w-full overflow-hidden rounded-3xl bg-white shadow-md"
              >
                <div className="p-5 text-white" style={{ background: SLATE }}>
                  <p className="text-xs" style={{ color: SAGE }}>Malabar Grill House</p>
                  <p className="mt-1 text-sm font-semibold">Valid until 11:00 PM today</p>
                </div>
                <div className="relative border-t-2 border-dashed border-neutral-200 px-5 py-6 text-center">
                  <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#FBFAF8]" />
                  <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#FBFAF8]" />
                  <p className="text-xs text-neutral-500">Your code</p>
                  <p className="mt-1 text-3xl font-bold tracking-widest" style={{ color: SLATE }}>7Q4K</p>
                  <p className="mt-3 text-xs text-neutral-500">Show this at the counter to redeem</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(step === 2 || step === 3) && (
            <Sheet key="sheet">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: '#FCE3D8' }}>
                  <PiBowlFood size={24} color={SLATE} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-base font-bold">Malabar Grill House</p>
                  <p className="text-xs text-neutral-500">0.8 km away</p>
                </div>
              </div>
              <p className="mt-4 text-xl font-bold leading-snug">Buy one get one on any biryani</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <PiClock size={14} aria-hidden="true" /> Ends today at 11:00 PM
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{claimed} of 120 claimed</span>
                  <span style={{ color: ORANGE }}>{120 - claimed} left</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: ORANGE }}
                    initial={{ width: '40%' }}
                    animate={{ width: `${(claimed / 120) * 100}%` }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </div>
              </div>
              <div className="relative mt-6 flex items-center justify-center gap-2 rounded-2xl py-3 text-base font-semibold text-white" style={{ background: ORANGE }}>
                <PiTicket size={18} aria-hidden="true" /> Claim coupon
                {step === 3 && <Tap color="rgba(255,255,255,0.45)" />}
              </div>
            </Sheet>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-around border-t border-neutral-100 bg-white px-6 pb-8 pt-3" aria-hidden="true">
        <PiHouseFill size={22} color={SLATE} />
        <PiTagFill size={22} color="#C8C8C8" />
        <PiTicket size={22} color="#C8C8C8" />
        <PiUserFill size={22} color="#C8C8C8" />
      </div>
    </div>
  )
}
