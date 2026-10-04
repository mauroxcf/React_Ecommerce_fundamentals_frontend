import { memo } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { TrashIcon } from '@/components/ui/icons'
import QuantitySelector from '@/components/ui/QuantitySelector'
import { useCartActions } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'

/**
 * Una línea del carrito. Con `memo`, al cambiar la cantidad de un producto
 * sólo se vuelve a renderizar SU línea, no todas.
 */
function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartActions()
  const lineTotal = item.price * item.quantity

  return (
    <li className="flex gap-4 py-5">
      <Link to={ROUTES.productDetail(item.slug)} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          width="96"
          height="96"
          loading="lazy"
          className="size-20 rounded-lg bg-gray-100 object-cover sm:size-24"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">{item.brandName}</p>
            <Link
              to={ROUTES.productDetail(item.slug)}
              className="line-clamp-2 font-medium text-gray-900 hover:text-brand-600"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-gray-500">Vendido por {item.sellerName}</p>
          </div>
          <p className="font-bold whitespace-nowrap">{formatPrice(lineTotal)}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <QuantitySelector
              value={item.quantity}
              max={item.availableQuantity}
              onChange={(quantity) => updateQuantity(item.id, quantity)}
              label={`Cantidad de ${item.name}`}
            />
            <span className="text-xs text-gray-500">{formatPrice(item.price)} c/u</span>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
          >
            <TrashIcon className="size-4" />
            Eliminar
          </button>
        </div>
      </div>
    </li>
  )
}

export default memo(CartItem)
