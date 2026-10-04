import { createContext } from 'react'

/*
 * El carrito usa DOS contextos a propósito (optimización de performance):
 *
 * - CartStateContext:   los datos (items, totales). Cambia cada vez que el carrito cambia.
 * - CartActionsContext: las funciones (addItem, removeItem...). NUNCA cambia.
 *
 * Así, un botón "Agregar al carrito" que sólo usa las acciones no se
 * vuelve a renderizar cada vez que cambia el contenido del carrito.
 */
export const CartStateContext = createContext(null)
export const CartActionsContext = createContext(null)
