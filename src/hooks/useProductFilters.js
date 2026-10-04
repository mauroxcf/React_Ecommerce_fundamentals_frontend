import { useParams, useSearchParams } from 'react-router'
import { DEFAULT_SORT } from '@/config/sortOptions'

/**
 * Lee y modifica los filtros de la PLP. Los filtros viven en la URL:
 *
 *   /categoria/snacks?marca=frito-lay&orden=price-asc&q=papas
 *
 * Ventajas: el usuario puede compartir el link, recargar o usar el
 * botón "atrás" del navegador sin perder los filtros.
 */
export function useProductFilters() {
  const { categorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    category: categorySlug,
    brand: searchParams.get('marca') ?? undefined,
    query: searchParams.get('q') ?? undefined,
    sort: searchParams.get('orden') ?? DEFAULT_SORT,
  }

  /** setFilter('marca', 'samsung') | setFilter('marca', null) para quitarlo. */
  function setFilter(paramName, value) {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams)
        if (value) nextParams.set(paramName, value)
        else nextParams.delete(paramName)
        return nextParams
      },
      { preventScrollReset: true },
    )
  }

  function clearFilters() {
    setSearchParams({})
  }

  const hasActiveFilters = Boolean(filters.brand || filters.query)

  return { filters, setFilter, clearFilters, hasActiveFilters }
}
