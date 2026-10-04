import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import ProductPrice from '@/components/product/ProductPrice'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/utils/formatPrice'
import ProductPurchase from './ProductPurchase'
import StockStatus from './StockStatus'

/** Columna derecha de la PDP: datos principales y compra. */
export default function ProductInfo({ product }) {
  const savings = product.listPrice - product.price

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link
          to={`${ROUTES.productList()}?marca=${product.brand.slug}`}
          className="text-sm font-semibold tracking-wide text-brand-600 uppercase hover:text-brand-700"
        >
          {product.brand.name}
        </Link>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{product.name}</h1>
        <p className="mt-1 text-xs text-gray-500">SKU: {product.sku}</p>
      </div>

      <div className="space-y-1">
        <ProductPrice price={product.price} listPrice={product.listPrice} size="lg" />
        {savings > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="discount">-{product.discountPercentage}%</Badge>
            <span className="text-sm font-medium text-emerald-700">Ahorras {formatPrice(savings)}</span>
          </div>
        )}
      </div>

      <StockStatus availableQuantity={product.availableQuantity} />

      <ProductPurchase product={product} />

      <p className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
        Vendido y despachado por <span className="font-semibold">{product.seller.name}</span>
      </p>

      <div>
        <h2 className="font-semibold">Descripción</h2>
        <p className="mt-2 leading-relaxed text-gray-700">{product.description}</p>
      </div>
    </div>
  )
}
