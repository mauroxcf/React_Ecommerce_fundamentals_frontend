import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import EmptyCart from '@/components/cart/EmptyCart'
import { STORE_CONFIG } from '@/config/store'
import { useCart, useCartActions } from '@/hooks/useCart'

/** Página del carrito: /carrito */
export default function CartPage() {
  const { items, itemsCount, subtotal, discount, total } = useCart()
  const { clearCart } = useCartActions()

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <title>{`Carrito | ${STORE_CONFIG.name}`}</title>

      <h1 className="text-2xl font-bold sm:text-3xl">Carrito de compras</h1>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyCart />
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section aria-label="Productos en el carrito" className="rounded-2xl border border-gray-200 bg-white px-4 sm:px-6">
            <div className="flex items-center justify-between border-b border-gray-200 py-4">
              <p className="text-sm text-gray-600">
                {itemsCount} {itemsCount === 1 ? 'producto' : 'productos'}
              </p>
              <button type="button" onClick={clearCart} className="text-sm text-gray-500 underline hover:text-red-600">
                Vaciar carrito
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </section>

          <aside className="lg:sticky lg:top-36 lg:self-start">
            <CartSummary subtotal={subtotal} discount={discount} total={total} />
          </aside>
        </div>
      )}
    </div>
  )
}
