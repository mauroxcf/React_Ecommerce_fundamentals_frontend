import { formatPrice } from '@/utils/formatPrice'

const SIZES = {
  sm: { price: 'text-lg', listPrice: 'text-xs' },
  lg: { price: 'text-3xl', listPrice: 'text-sm' },
}

/** Precio de venta y, si hay descuento, el precio anterior tachado. */
export default function ProductPrice({ price, listPrice, size = 'sm' }) {
  const hasDiscount = listPrice > price
  const styles = SIZES[size]

  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={`font-bold text-gray-900 ${styles.price}`}>{formatPrice(price)}</span>
      {hasDiscount && (
        <span className={`text-gray-500 line-through ${styles.listPrice}`}>
          <span className="sr-only">Antes: </span>
          {formatPrice(listPrice)}
        </span>
      )}
    </div>
  )
}
