import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PiArrowRight } from 'react-icons/pi'
import { products } from '../data/products'
import { home } from '../data/content'
import ProductIcon from '../components/ProductIcon'
import { useTheme } from '../lib/theme'
import { reveal, stagger } from '../lib/motion'

export default function ProductGrid() {
  const { theme } = useTheme()
  const { headline, body } = home.products

  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          <motion.h2 variants={reveal} id="products-title" className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {headline}
          </motion.h2>
          <motion.p variants={reveal} className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {body}
          </motion.p>
        </motion.div>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2"
        >
          {products.map((p) => {
            const accent = p.accent[theme]
            return (
              <motion.li key={p.id} variants={reveal}>
                <Link
                  to={`/products#product-${p.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all ease-fluid-700 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.99] sm:p-8"
                  style={{ '--accent': accent }}
                >
                  <div className="flex items-center gap-4">
                    <ProductIcon product={p} size={52} />
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.kind}</p>
                    </div>
                  </div>
                  <p className="mt-6 flex-1 text-lg text-muted-foreground">{p.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold" style={{ color: accent }}>
                    Explore {p.name}
                    <PiArrowRight className="transition-transform ease-fluid-700 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
