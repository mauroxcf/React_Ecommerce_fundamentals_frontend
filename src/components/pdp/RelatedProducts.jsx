import ProductGrid from '@/components/product/ProductGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import { useRelatedProducts } from '@/hooks/useCatalog'
import { ROUTES } from '@/app/routes'

const RELATED_LIMIT = 4

/** Otros productos de la misma categoría. */
export default function RelatedProducts({ product }) {
  const { data: products, isLoading } = useRelatedProducts(product, RELATED_LIMIT)

  if (!isLoading && !products?.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="También te puede interesar" linkTo={ROUTES.category(product.categoryId)} />
      <ProductGrid products={products ?? []} isLoading={isLoading} skeletonCount={RELATED_LIMIT} />
    </section>
  )
}
