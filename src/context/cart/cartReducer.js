/**
 * Reducer del carrito: función PURA que recibe el estado actual y una
 * acción, y devuelve el nuevo estado. No hace llamadas a APIs ni a
 * localStorage, por eso es fácil de entender y de testear.
 *
 * Estado: { items: CartItem[] }
 *
 * @typedef {Object} CartItem
 * @property {string} id                 Id del producto
 * @property {string} sku
 * @property {string} slug
 * @property {string} name
 * @property {string} brandName
 * @property {string} sellerName
 * @property {string} image
 * @property {number} price
 * @property {number} listPrice
 * @property {number} quantity
 * @property {number} availableQuantity  Stock máximo que se puede agregar
 */

export const CART_ACTIONS = {
  ADD_ITEM: 'cart/addItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  REMOVE_ITEM: 'cart/removeItem',
  CLEAR: 'cart/clear',
}

export const initialCartState = { items: [] }

/** Nunca menos de 1 ni más del stock disponible. */
function clampQuantity(quantity, availableQuantity) {
  return Math.max(1, Math.min(quantity, availableQuantity))
}

/** Convierte un Product (del catálogo) en un CartItem. */
function createCartItem(product, quantity) {
  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    brandName: product.brand.name,
    sellerName: product.seller.name,
    image: product.images[0]?.url ?? '',
    price: product.price,
    listPrice: product.listPrice,
    availableQuantity: product.availableQuantity,
    quantity: clampQuantity(quantity, product.availableQuantity),
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity } = action.payload
      if (!product.isAvailable) return state

      const existingItem = state.items.find((item) => item.id === product.id)

      // Si ya estaba en el carrito, sólo se suma la cantidad.
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: clampQuantity(item.quantity + quantity, item.availableQuantity) }
              : item,
          ),
        }
      }

      return { ...state, items: [...state.items, createCartItem(product, quantity)] }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: clampQuantity(quantity, item.availableQuantity) } : item,
        ),
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }

    case CART_ACTIONS.CLEAR:
      return initialCartState

    default:
      return state
  }
}
