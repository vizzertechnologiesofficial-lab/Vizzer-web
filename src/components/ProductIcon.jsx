import { GaterGlyph } from './demos/GaterDemo'

export default function ProductIcon({ product, size = 40, className = '' }) {
  const radius = size >= 48 ? 'rounded-2xl' : size >= 32 ? 'rounded-xl' : 'rounded-lg'
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden ${radius} ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size, background: product.tile }}
    >
      {product.icon ? (
        <img src={product.icon} alt="" width={size} height={size} className="h-full w-full object-cover" />
      ) : (
        <GaterGlyph size={Math.round(size * 0.58)} />
      )}
    </span>
  )
}
