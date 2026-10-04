import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { CartIcon } from '@/components/ui/icons'

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <CartIcon className="size-12 text-gray-400" />
      <p className="mt-4 text-lg font-semibold">Tu carrito está vacío</p>
      <p className="mt-1 text-sm text-gray-600">Agrega productos para verlos aquí.</p>
      <Link
        to={ROUTES.productList()}
        className="mt-6 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
      >
        Explorar productos
      </Link>
    </div>
  )
}
