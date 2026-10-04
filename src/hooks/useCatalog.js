import { useAsync } from './useAsync'
import {
  getBrands,
  getCategories,
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from '@/services/catalogService'

/**
 * Hooks de datos del catálogo. Los componentes usan estos hooks y
 * nunca llaman directamente al servicio.
 */

export function useProducts({ category, brand, query, sort } = {}) {
  return useAsync(
    () => getProducts({ category, brand, query, sort }),
    [category, brand, query, sort],
  )
}

export function useFeaturedProducts(limit) {
  return useAsync(() => getFeaturedProducts(limit), [limit])
}

export function useProduct(slug) {
  return useAsync(() => getProductBySlug(slug), [slug])
}

export function useRelatedProducts(product, limit) {
  return useAsync(
    () => (product ? getRelatedProducts(product, limit) : Promise.resolve([])),
    [product?.id, limit],
  )
}

export function useCategories() {
  return useAsync(getCategories, [])
}

export function useBrands() {
  return useAsync(getBrands, [])
}
