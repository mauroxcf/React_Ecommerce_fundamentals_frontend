import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { CartIcon } from '@/components/ui/icons'
import { useCartActions } from '@/hooks/useCart'

const FEEDBACK_DURATION_MS = 1500

/**
 * Botón "Agregar al carrito".
 * Usa `useCartActions` (no `useCart`), así NO se re-renderiza cuando
 * cambia el carrito: importante porque hay uno por cada tarjeta de producto.
 */
export default function AddToCartButton({ product, quantity = 1, size = 'sm', fullWidth = true }) {
  const { addItem } = useCartActions()
  const [wasAdded, setWasAdded] = useState(false)

  // Vuelve el botón a su estado normal después de unos segundos.
  useEffect(() => {
    if (!wasAdded) return
    const timeoutId = setTimeout(() => setWasAdded(false), FEEDBACK_DURATION_MS)
    return () => clearTimeout(timeoutId)
  }, [wasAdded])

  if (!product.isAvailable) {
    return (
      <Button size={size} fullWidth={fullWidth} disabled>
        Agotado
      </Button>
    )
  }

  function handleClick() {
    addItem(product, quantity)
    setWasAdded(true)
  }

  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      variant={wasAdded ? 'success' : 'primary'}
      onClick={handleClick}
    >
      <CartIcon className="size-4" />
      {wasAdded ? '¡Agregado!' : 'Agregar'}
      <span aria-live="polite" className="sr-only">
        {wasAdded ? `${product.name} agregado al carrito` : ''}
      </span>
    </Button>
  )
}
