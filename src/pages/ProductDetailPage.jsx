import { useParams } from 'react-router'
import { ROUTES } from '@/app/routes'
import ProductDetailSkeleton from '@/components/pdp/ProductDetailSkeleton'
import ProductGallery from '@/components/pdp/ProductGallery'
import ProductInfo from '@/components/pdp/ProductInfo'
import ProductSpecifications from '@/components/pdp/ProductSpecifications'
import RelatedProducts from '@/components/pdp/RelatedProducts'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { STORE_CONFIG } from '@/config/store'
import { useCategories, useProduct } from '@/hooks/useCatalog'
import { findCategoryBySlug } from '@/utils/categoryTree'
import NotFoundPage from './NotFoundPage'

/** PDP (Product Detail Page): /producto/:slug */
export default function ProductDetailPage() {
  const { slug } = useParams()
  const { data: product, isLoading, error } = useProduct(slug)
  const { data: categories } = useCategories()

  if (isLoading) return <ProductDetailSkeleton />
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <ErrorMessage message="No pudimos cargar el producto." />
      </div>
    )
  }
  if (!product) return <NotFoundPage />

  const categoryMatch = findCategoryBySlug(categories, product.categoryId)
  const breadcrumbs = [
    { label: 'Inicio', to: ROUTES.home() },
    categoryMatch?.parent && {
      label: categoryMatch.parent.name,
      to: ROUTES.category(categoryMatch.parent.slug),
    },
    categoryMatch && {
      label: categoryMatch.category.name,
      to: ROUTES.category(categoryMatch.category.slug),
    },
    { label: product.name },
  ].filter(Boolean)

  return (
    <>
      <title>{`${product.name} | ${STORE_CONFIG.name}`}</title>
      <meta name="description" content={product.description} />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumbs items={breadcrumbs} />

        {/*
          `key={product.id}` reinicia el estado interno (imagen elegida,
          cantidad) cuando se navega de un producto a otro.
        */}
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
          <ProductGallery key={`gallery-${product.id}`} images={product.images} productName={product.name} />
          <ProductInfo key={`info-${product.id}`} product={product} />
        </div>
      </div>

      <ProductSpecifications
        specifications={product.specifications}
        brandName={product.brand.name}
        sellerName={product.seller.name}
      />

      <RelatedProducts product={product} />
    </>
  )
}
