import { ROUTES } from '@/app/routes'
import ActiveFilters from '@/components/plp/ActiveFilters'
import EmptyResults from '@/components/plp/EmptyResults'
import FilterSidebar from '@/components/plp/FilterSidebar'
import SortSelect from '@/components/plp/SortSelect'
import ProductGrid from '@/components/product/ProductGrid'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { ChevronDownIcon } from '@/components/ui/icons'
import { useBrands, useCategories, useProducts } from '@/hooks/useCatalog'
import { useProductFilters } from '@/hooks/useProductFilters'
import { STORE_CONFIG } from '@/config/store'
import { findCategoryBySlug } from '@/utils/categoryTree'
import NotFoundPage from './NotFoundPage'

/**
 * PLP (Product List Page). Atiende dos rutas:
 *   /productos                -> todo el catálogo (o resultados de búsqueda)
 *   /categoria/:categorySlug  -> productos de una categoría
 */
export default function ProductListPage() {
  const { filters, setFilter, clearFilters, hasActiveFilters } = useProductFilters()
  const { data: products, isLoading, error } = useProducts(filters)
  const { data: categories } = useCategories()
  const { data: brands } = useBrands()

  const categoryMatch = findCategoryBySlug(categories, filters.category)
  const brandName = brands?.find((brand) => brand.slug === filters.brand)?.name

  // La URL tiene una categoría que no existe.
  if (filters.category && categories && !categoryMatch) {
    return <NotFoundPage />
  }

  const title = getPageTitle({ categoryMatch, query: filters.query })

  const breadcrumbs = [
    { label: 'Inicio', to: ROUTES.home() },
    categoryMatch?.parent && {
      label: categoryMatch.parent.name,
      to: ROUTES.category(categoryMatch.parent.slug),
    },
    { label: categoryMatch?.category.name ?? 'Productos' },
  ].filter(Boolean)

  const filterSidebar = <FilterSidebar filters={filters} onFilterChange={setFilter} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* React 19 mueve este <title> al <head> automáticamente */}
      <title>{`${title} | ${STORE_CONFIG.name}`}</title>

      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {!isLoading && products && (
          <p className="mt-1 text-sm text-gray-600">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </p>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        {/* Filtros en desktop: columna fija a la izquierda */}
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-36">{filterSidebar}</div>
        </aside>

        <section className="space-y-4" aria-label="Resultados">
          <div className="flex flex-wrap items-start justify-between gap-3">
            {/* Filtros en mobile/tablet: panel desplegable */}
            <details className="group w-full rounded-lg border border-gray-300 bg-white sm:w-auto lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                Filtros
                <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-gray-200 p-4">{filterSidebar}</div>
            </details>

            <div className="ml-auto">
              <SortSelect value={filters.sort} onChange={(sort) => setFilter('orden', sort)} />
            </div>
          </div>

          {hasActiveFilters && (
            <ActiveFilters
              filters={filters}
              brandName={brandName}
              onRemove={(param) => setFilter(param, null)}
              onClearAll={clearFilters}
            />
          )}

          {error && <ErrorMessage message="No pudimos cargar los productos." />}

          {!error && !isLoading && products?.length === 0 && <EmptyResults onClearFilters={clearFilters} />}

          {!error && (isLoading || products?.length > 0) && (
            <ProductGrid products={products ?? []} isLoading={isLoading} skeletonCount={8} />
          )}
        </section>
      </div>
    </div>
  )
}

function getPageTitle({ categoryMatch, query }) {
  if (query) return `Resultados para "${query}"`
  if (categoryMatch) return categoryMatch.category.name
  return 'Todos los productos'
}
