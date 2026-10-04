import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

/**
 * Grilla responsive de productos (mobile first):
 * 2 columnas en mobile -> 3 en tablet -> 4 en desktop.
 */
export default function ProductGrid({ products, isLoading = false, skeletonCount = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => <ProductCardSkeleton key={index} />)
        : products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
