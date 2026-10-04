/** Devuelve el % de descuento entre el precio de lista y el precio de venta. */
export function getDiscountPercentage(listPrice, price) {
  if (!listPrice || listPrice <= price) return 0
  return Math.round(((listPrice - price) / listPrice) * 100)
}
