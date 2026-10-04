import { ROUTES } from '@/app/routes'
import ProductGrid from '@/components/product/ProductGrid'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useFeaturedProducts } from '@/hooks/useCatalog'
import SectionHeader from '@/components/ui/SectionHeader'

const FEATURED_LIMIT = 8

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useFeaturedProducts(FEATURED_LIMIT)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader title="Productos destacados" linkTo={ROUTES.productList()} />
      {error ? (
        <ErrorMessage message="No pudimos cargar los productos destacados." />
      ) : (
        <ProductGrid products={products ?? []} isLoading={isLoading} skeletonCount={FEATURED_LIMIT} />
      )}
    </section>
  )
}
