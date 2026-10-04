const VARIANTS = {
  discount: 'bg-red-600 text-white',
  neutral: 'bg-gray-800 text-white',
  success: 'bg-emerald-100 text-emerald-800',
}

/** Etiqueta pequeña: "-20%", "Agotado", etc. */
export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${VARIANTS[variant]} ${className}`}>
      {children}
    </span>
  )
}
