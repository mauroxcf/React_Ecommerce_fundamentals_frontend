import { STORE_CONFIG } from '@/config/store'

// Se crea UNA sola vez (crear Intl.NumberFormat en cada render es costoso).
const priceFormatter = new Intl.NumberFormat(STORE_CONFIG.locale, {
  style: 'currency',
  currency: STORE_CONFIG.currency,
  maximumFractionDigits: 0,
})

/** formatPrice(12900) -> "$ 12.900" */
export function formatPrice(value) {
  return priceFormatter.format(value)
}
