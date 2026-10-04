import { useContext } from 'react'
import { CartActionsContext, CartStateContext } from '@/context/cart/cartContext'

/**
 * Datos del carrito: { items, itemsCount, subtotal, discount, total }.
 * El componente se re-renderiza cada vez que el carrito cambia.
 */
export function useCart() {
  const context = useContext(CartStateContext)
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return context
}

/**
 * Acciones del carrito: { addItem, updateQuantity, removeItem, clearCart }.
 * Usar este hook cuando el componente sólo MODIFICA el carrito
 * (no se re-renderiza cuando el carrito cambia).
 */
export function useCartActions() {
  const context = useContext(CartActionsContext)
  if (!context) throw new Error('useCartActions debe usarse dentro de <CartProvider>')
  return context
}
