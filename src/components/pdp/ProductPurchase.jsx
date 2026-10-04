import { useState } from 'react'
import AddToCartButton from '@/components/product/AddToCartButton'
import QuantitySelector from '@/components/ui/QuantitySelector'

/** Selector de cantidad + botón de agregar al carrito. */
export default function ProductPurchase({ product }) {
  const [quantity, setQuantity] = useState(1)

  if (!product.isAvailable) {
    return <AddToCartButton product={product} size="md" />
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <QuantitySelector value={quantity} onChange={setQuantity} max={product.availableQuantity} />
      <div className="flex-1">
        <AddToCartButton product={product} quantity={quantity} size="md" />
      </div>
    </div>
  )
}
