import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PiArrowUpRight, PiInstagramLogo, PiLinkedinLogo, PiXLogo } from 'react-icons/pi'
import { products } from '../data/products'
import { site } from '../data/site'
import { useSmoothScroll } from '../lib/scroll'
import ProductIcon from './ProductIcon'

const SOCIAL = [
  { key: 'instagram', label: 'Instagram', Icon: PiInstagramLogo },
  { key: 'linkedin', label: 'LinkedIn', Icon: PiLinkedinLogo },
  { key: 'x', label: 'X', Icon: PiXLogo },
]

export function SocialLinks({ className = '' }) {
  const items = SOCIAL.filter((s) => site.social[s.key])
  if (!items.length) return null
  return (
    <ul className={`flex gap-2 ${className}`}>
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${label}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all ease-fluid-700 hover:-translate-y-0.5 hover:bg-muted active:scale-95"
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])

  const go = (id) => {
    if (location.pathname === '/') scrollTo(id)
    else navigate('/', { state: { scrollTo: id } })
  }

  const linkCls = 'text-left text-base text-foreground/80 transition-colors ease-fluid-700 hover:text-foreground'

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <p className="max-w-sm text-2xl font-semibold leading-snug tracking-tight">
              Vizzer Technologies builds and runs software for everyday places.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Products" className="lg:col-span-3">
            <p className="text-sm text-muted-foreground">Products</p>
            <ul className="mt-4 flex flex-col gap-3">
              {products.map((p) => (
                <li key={p.id}>
                  {p.link ? (
                    <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-3 ${linkCls}`}>
                      <ProductIcon product={p} size={24} />
                      {p.name}
                      <PiArrowUpRight className="opacity-50 transition-all ease-fluid-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      <span className="sr-only">(opens gaterlogs.com in a new tab)</span>
                    </a>
                  ) : (
                    <button type="button" onClick={() => go(`product-${p.id}`)} className={`inline-flex items-center gap-3 ${linkCls}`}>
                      <ProductIcon product={p} size={24} />
                      {p.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <p className="text-sm text-muted-foreground">Company</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <button type="button" onClick={() => go('capabilities')} className={linkCls}>
                  What we do
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('contact')} className={linkCls}>
                  Contact
                </button>
              </li>
              <li>
                <Link to="/privacy" className={linkCls}>
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <p className="text-sm text-muted-foreground">Reach us</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkCls}>
                  {site.email.split('@')[0]}
                  <wbr />@{site.email.split('@')[1]}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={linkCls}>
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border py-6 sm:mt-16 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vizzer Technologies. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <motion.svg style={{ y }} viewBox="0 0 1000 250" className="mx-auto -mb-8 block w-full max-w-7xl px-4 sm:-mb-12">
          <text
            x="50%"
            y="200"
            textAnchor="middle"
            fontFamily="'Manrope Variable', Manrope, sans-serif"
            fontWeight="700"
            fontSize="280"
            letterSpacing="-14"
            fill="rgb(var(--foreground))"
            opacity="0.06"
          >
            vizzer
          </text>
        </motion.svg>
      </div>
    </footer>
  )
}
