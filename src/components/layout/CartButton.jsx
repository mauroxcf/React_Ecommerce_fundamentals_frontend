import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { CartIcon } from '@/components/ui/icons'
import { useCart } from '@/hooks/useCart'

/** Ícono del carrito con la cantidad de productos agregados. */
export default function CartButton() {
  const { itemsCount } = useCart()

  return (
    <Link
      to={ROUTES.cart()}
      className="relative inline-flex rounded-full p-2 text-gray-700 hover:bg-gray-100"
      aria-label={`Carrito de compras, ${itemsCount} productos`}
    >
      <CartIcon />
      {itemsCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">
          {itemsCount > 99 ? '99+' : itemsCount}
        </span>
      )}
    </Link>
  )
}
