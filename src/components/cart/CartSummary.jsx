import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/utils/formatPrice'
import { getShippingCost } from '@/utils/getShippingCost'
import FreeShippingProgress from './FreeShippingProgress'

/** Resumen de la compra: subtotal, descuentos, envío y total. */
export default function CartSummary({ subtotal, discount, total }) {
  const shippingCost = getShippingCost(total)
  const grandTotal = total + shippingCost

  return (
    <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold">Resumen de compra</h2>

      <FreeShippingProgress total={total} />

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <dt>Descuentos</dt>
            <dd>-{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-gray-600">Envío</dt>
          <dd>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(grandTotal)}</dd>
        </div>
      </dl>

      {/* El checkout se conectará cuando exista el backend. */}
      <Button fullWidth disabled title="Disponible cuando se integre el backend">
        Ir a pagar
      </Button>
      <p className="-mt-2 text-center text-xs text-gray-500">El checkout estará disponible próximamente.</p>

      <Link
        to={ROUTES.productList()}
        className="block text-center text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Seguir comprando
      </Link>
    </div>
  )
}
