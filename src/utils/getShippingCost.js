import { STORE_CONFIG } from '@/config/store'

/** Envío gratis desde cierto monto; si no, costo fijo. */
export function getShippingCost(total) {
  if (total === 0 || total >= STORE_CONFIG.freeShippingThreshold) return 0
  return STORE_CONFIG.shippingCost
}
