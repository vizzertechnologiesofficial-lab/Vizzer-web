import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductIcon from './ProductIcon'
import { DURATION as GATER_MS } from './demos/GaterDemo'
import { DURATION as RESTRO_MS } from './demos/RestroDemo'
import { DURATION as SIYYANA_MS } from './demos/SiyyanaDemo'
import { DURATION as PITCHIT_MS } from './demos/PitchItDemo'
import { EASE } from '../lib/motion'

const DURATIONS = { gater: GATER_MS, restro: RESTRO_MS, siyyana: SIYYANA_MS, pitchit: PITCHIT_MS }

// The product switcher that sits under a phone demo.
export default function DemoTabs({ currentId, onPick, progress, playing, theme, compact = false, layoutKey = 'tab' }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur-md" role="group" aria-label="Choose a product demo">
      {products.map((p) => {
        const active = p.id === currentId
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(p.id)}
            aria-pressed={active}
            aria-label={compact ? p.name : undefined}
            className={`relative flex items-center gap-2 rounded-full py-1.5 pl-1.5 text-sm font-semibold transition-colors ease-fluid-700 ${
              compact ? 'pr-1.5' : 'pr-3'
            } ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {active && (
              <motion.span
                layoutId={`${layoutKey}-bg${compact ? '-compact' : ''}`}
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
            <ProductIcon product={p} size={24} className="relative" />
            {!compact && <span className="relative whitespace-nowrap">{p.name}</span>}
            {compact && active && <span className="relative whitespace-nowrap pr-1.5">{p.name}</span>}
            {active && progress && (
              <span className="absolute inset-x-4 bottom-0.5 h-0.5 overflow-hidden rounded-full bg-foreground/10">
                <span
                  key={`${p.id}-${progress.key}`}
                  className="block h-full origin-left rounded-full"
                  style={{
                    background: p.accent[theme],
                    animation: `vz-grow ${DURATIONS[p.id]}ms linear forwards`,
                    animationPlayState: playing ? 'running' : 'paused',
                  }}
                />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
