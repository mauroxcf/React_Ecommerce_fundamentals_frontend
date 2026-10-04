const VARIANTS = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-gray-300 disabled:text-gray-500',
  secondary: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  success: 'bg-emerald-600 text-white',
}

const SIZES = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
}

/**
 * Botón base de la tienda. Cualquier prop extra (onClick, type, disabled...)
 * se pasa directo al <button>.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
