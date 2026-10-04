import BrandFilter from './BrandFilter'
import CategoryFilter from './CategoryFilter'

/**
 * Todos los filtros de la PLP juntos.
 * Para agregar un filtro nuevo (precio, seller...) se crea su componente
 * y se agrega aquí.
 */
export default function FilterSidebar({ filters, onFilterChange }) {
  return (
    <div className="space-y-6">
      <CategoryFilter activeSlug={filters.category} />
      <BrandFilter activeBrand={filters.brand} onChange={(brand) => onFilterChange('marca', brand)} />
    </div>
  )
}
