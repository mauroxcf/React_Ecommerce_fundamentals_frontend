import { memo } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import Badge from '@/components/ui/Badge'
import AddToCartButton from './AddToCartButton'
import ProductPrice from './ProductPrice'

/**
 * Tarjeta de producto usada en la Home, la PLP y "productos relacionados".
 *
 * `memo` evita volver a renderizar la tarjeta si su `product` no cambió
 * (por ejemplo, cuando la PLP se re-renderiza por otro motivo).
 */
function ProductCard({ product }) {
  const image = product.images[0]

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link to={ROUTES.productDetail(product.slug)} className="relative block bg-gray-100">
        <img
          src={image?.url}
          alt={image?.alt ?? product.name}
          width="600"
          height="600"
          loading="lazy"
          decoding="async"
          className={`aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105 ${product.isAvailable ? '' : 'opacity-50'}`}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discountPercentage > 0 && <Badge variant="discount">-{product.discountPercentage}%</Badge>}
          {!product.isAvailable && <Badge>Agotado</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{product.brand.name}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 sm:text-base">
          <Link to={ROUTES.productDetail(product.slug)} className="hover:text-brand-600">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto space-y-3 pt-1">
          <ProductPrice price={product.price} listPrice={product.listPrice} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
