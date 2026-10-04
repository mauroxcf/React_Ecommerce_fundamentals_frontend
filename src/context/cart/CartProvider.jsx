import { useEffect, useMemo, useReducer } from 'react'
import { CartActionsContext, CartStateContext } from './cartContext'
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer'
import { readFromStorage, writeToStorage } from '@/utils/storage'

const STORAGE_KEY = 'fundamentals-store:cart'

/** Lee el carrito guardado sólo UNA vez, al montar la app. */
function loadInitialState() {
  return readFromStorage(STORAGE_KEY, initialCartState)
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  // Guarda el carrito para que no se pierda al recargar la página.
  useEffect(() => {
    writeToStorage(STORAGE_KEY, state)
  }, [state])

  // Valores derivados: se recalculan sólo cuando cambian los items.
  const cartState = useMemo(() => {
    const itemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = state.items.reduce((total, item) => total + item.listPrice * item.quantity, 0)
    const total = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

    return {
      items: state.items,
      itemsCount,
      subtotal,
      discount: subtotal - total,
      total,
    }
  }, [state.items])

  // `dispatch` nunca cambia, así que este objeto se crea una sola vez.
  const actions = useMemo(
    () => ({
      addItem: (product, quantity = 1) =>
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } }),
      removeItem: (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } }),
      clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
    }),
    [],
  )

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={cartState}>{children}</CartStateContext.Provider>
    </CartActionsContext.Provider>
  )
}
