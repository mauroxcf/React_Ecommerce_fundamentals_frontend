import { STORE_CONFIG } from '@/config/store'
import { formatPrice } from '@/utils/formatPrice'

/** Barra que muestra cuánto falta para el envío gratis. */
export default function FreeShippingProgress({ total }) {
  const threshold = STORE_CONFIG.freeShippingThreshold
  const missing = threshold - total
  const progress = Math.min(100, Math.round((total / threshold) * 100))

  return (
    <div className="space-y-2">
      <p className="text-sm">
        {missing > 0 ? (
          <>
            Te faltan <span className="font-semibold">{formatPrice(missing)}</span> para el envío gratis
          </>
        ) : (
          <span className="font-semibold text-emerald-700">¡Tienes envío gratis!</span>
        )}
      </p>
      <div
        className="h-2 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso para envío gratis"
      >
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
