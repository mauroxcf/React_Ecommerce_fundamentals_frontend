import { CloseIcon } from '@/components/ui/icons'

/** Chips con los filtros aplicados; cada uno se puede quitar con un clic. */
export default function ActiveFilters({ filters, brandName, onRemove, onClearAll }) {
  const chips = [
    filters.query && { param: 'q', label: `"${filters.query}"` },
    filters.brand && { param: 'marca', label: brandName ?? filters.brand },
  ].filter(Boolean)

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.param}
          type="button"
          onClick={() => onRemove(chip.param)}
          className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 hover:bg-brand-100"
          aria-label={`Quitar filtro ${chip.label}`}
        >
          {chip.label}
          <CloseIcon className="size-3.5" />
        </button>
      ))}
      <button type="button" onClick={onClearAll} className="text-sm text-gray-600 underline hover:text-gray-900">
        Limpiar filtros
      </button>
    </div>
  )
}
