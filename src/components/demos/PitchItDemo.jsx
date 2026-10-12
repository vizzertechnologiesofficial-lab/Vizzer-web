import { AnimatePresence, motion } from 'framer-motion'
import {
  PiHeartFill,
  PiChatCircleFill,
  PiShareFat,
  PiCalendarCheck,
  PiCheckBold,
  PiHouse,
  PiPlayFill,
  PiPlusBold,
  PiUser,
  PiVideoCamera,
} from 'react-icons/pi'
import { StatusBar, Tap, useTimeline, Sheet } from './ui'
import { EASE } from '../../lib/motion'
import reel from '../../assets/apps/pitch-reel.jpg'
import bulb from '../../assets/apps/pitch-entrepreneur.png'

const GREEN = '#36603C'
const LIME = '#9ACD32'
const STEPS = [2100, 900, 900, 2300, 700, 2600]
export const DURATION = STEPS.reduce((a, b) => a + b, 0)

function Rail({ liked, step }) {
  return (
    <div className="absolute bottom-60 right-3 z-20 flex flex-col items-center gap-5 text-white">
      <div className="relative flex flex-col items-center">
        <motion.span animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.45, ease: EASE }}>
          <PiHeartFill size={32} color={liked ? '#FF2D55' : '#ffffff'} aria-hidden="true" />
        </motion.span>
        <span className="text-xs font-semibold">{liked ? '1,285' : '1,284'}</span>
        {step === 1 && <Tap color="rgba(255,255,255,0.4)" />}
      </div>
      <div className="flex flex-col items-center">
        <PiChatCircleFill size={30} aria-hidden="true" />
        <span className="text-xs font-semibold">96</span>
      </div>
      <div className="flex flex-col items-center">
        <PiShareFat size={30} aria-hidden="true" />
        <span className="text-xs font-semibold">Share</span>
      </div>
    </div>
  )
}

export default function PitchItDemo({ playing = true, onComplete, loop = true }) {
  const step = useTimeline(STEPS, { playing, onComplete, loop })
  const liked = step >= 1

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-white">
      {/* "Video" frame: slow push in on the pitch footage */}
      <motion.img
        src={reel}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.22 }}
        transition={{ duration: 12, ease: 'linear' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,22,12,0.55) 0%, rgba(10,22,12,0.05) 30%, rgba(10,22,12,0.15) 55%, rgba(10,22,12,0.92) 100%)' }} />
      <motion.img
        src={bulb}
        alt=""
        className="absolute left-1/2 top-40 w-28 -translate-x-1/2 drop-shadow-2xl"
        animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <StatusBar dark />
      <div className="relative z-10 flex items-center justify-center gap-6 pt-2 text-sm font-semibold">
        <span className="text-white/60">Following</span>
        <span className="relative">
          For you
          <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full" style={{ background: LIME }} />
        </span>
      </div>
      <div className="relative z-10 mx-6 mt-4 h-0.5 overflow-hidden rounded-full bg-white/25">
        <motion.div className="h-full bg-white" initial={{ width: '8%' }} animate={{ width: '100%' }} transition={{ duration: 10, ease: 'linear' }} />
      </div>

      <Rail liked={liked} step={step} />

      <div className="absolute inset-x-0 bottom-24 z-10 pl-5 pr-16">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold" style={{ background: LIME, color: '#16301A' }}>AK</span>
          <div>
            <p className="text-sm font-bold">Ananya Krishnan</p>
            <p className="text-xs text-white/70">Entrepreneur</p>
          </div>
          <span className="ml-2 rounded-full border border-white/50 px-3 py-1 text-xs font-semibold">Connect</span>
        </div>
        <p className="mt-3 text-sm leading-snug">Cold storage lockers for neighbourhood grocery stores. Pilot running in 14 shops.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Seed stage', '₹25L to ₹40L', 'Margin 18.4%'].map((t) => (
            <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{t}</span>
          ))}
        </div>
        <div className="relative -mr-11 mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold" style={{ background: LIME, color: '#16301A' }}>
          <PiCalendarCheck size={18} aria-hidden="true" /> Request meeting
          {step === 2 && <Tap color="rgba(22,48,26,0.25)" />}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-around bg-black/70 px-6 pb-8 pt-3 backdrop-blur" aria-hidden="true">
        <PiHouse size={22} />
        <PiPlayFill size={22} color={LIME} />
        <span className="grid h-8 w-10 place-items-center rounded-xl" style={{ background: LIME, color: '#16301A' }}><PiPlusBold size={16} /></span>
        <PiVideoCamera size={22} />
        <PiUser size={22} />
      </div>

      <AnimatePresence>
        {(step === 3 || step === 4) && (
          <Sheet key="meet" className="text-neutral-900">
            <p className="text-xl font-bold">Request a meeting</p>
            <p className="mt-1 text-sm text-neutral-500">with Ananya Krishnan</p>
            <p className="mt-6 text-xs font-semibold text-neutral-500">Platform</p>
            <div className="relative mt-2 grid grid-cols-2 rounded-2xl bg-neutral-100 p-1 text-sm font-semibold">
              <motion.span
                className="absolute bottom-1 top-1 rounded-xl bg-white shadow-sm"
                initial={{ left: '4px', width: 'calc(50% - 4px)' }}
                animate={{ left: '50%', width: 'calc(50% - 4px)' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              />
              <span className="relative py-2 text-center">Zoom</span>
              <span className="relative py-2 text-center" style={{ color: GREEN }}>Google Meet</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-200 px-4 py-3">
                <p className="text-xs text-neutral-500">Date</p>
                <p className="text-sm font-bold">Thu, 15 Oct</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 px-4 py-3">
                <p className="text-xs text-neutral-500">Time</p>
                <p className="text-sm font-bold">4:30 PM</p>
              </div>
            </div>
            <div className="relative mt-6 rounded-2xl py-3 text-center text-base font-semibold text-white" style={{ background: GREEN }}>
              Send request
              {step === 4 && <Tap color="rgba(255,255,255,0.4)" />}
            </div>
          </Sheet>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 5 && (
          <motion.div
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0E1C10]/80 px-8 text-center backdrop-blur-md"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid h-20 w-20 place-items-center rounded-full"
              style={{ background: LIME, color: '#16301A' }}
            >
              <PiCheckBold size={36} aria-hidden="true" />
            </motion.span>
            <p className="mt-6 text-2xl font-bold tracking-tight">Request sent</p>
            <p className="mt-2 text-sm text-white/75">Google Meet, Thu 15 Oct at 4:30 PM</p>
            <p className="mt-6 text-xs text-white/60">You'll get a notification when Ananya accepts</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
