import { SearchIcon } from '@/components/ui/icons'
import Button from '@/components/ui/Button'

export default function EmptyResults({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <SearchIcon className="size-10 text-gray-400" />
      <p className="mt-4 text-lg font-semibold">No encontramos productos</p>
      <p className="mt-1 text-sm text-gray-600">Prueba con otra búsqueda o quita algunos filtros.</p>
      <Button variant="secondary" size="sm" className="mt-6" onClick={onClearFilters}>
        Limpiar filtros
      </Button>
    </div>
  )
}
