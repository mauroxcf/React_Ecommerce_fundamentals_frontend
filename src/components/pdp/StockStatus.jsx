const LOW_STOCK_THRESHOLD = 5

/** Indica si hay inventario y avisa cuando quedan pocas unidades. */
export default function StockStatus({ availableQuantity }) {
  if (availableQuantity <= 0) {
    return <p className="text-sm font-semibold text-red-600">Producto agotado</p>
  }

  if (availableQuantity <= LOW_STOCK_THRESHOLD) {
    return (
      <p className="text-sm font-semibold text-amber-600">
        ¡Últimas {availableQuantity} {availableQuantity === 1 ? 'unidad' : 'unidades'}!
      </p>
    )
  }

  return (
    <p className="text-sm font-semibold text-emerald-600">
      Disponible <span className="font-normal text-gray-600">({availableQuantity} unidades)</span>
    </p>
  )
}
