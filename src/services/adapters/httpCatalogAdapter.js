import { httpGet } from '@/services/httpClient'

/**
 * Adaptador HTTP: consume el backend real (otro repositorio).
 * Los endpoints son una propuesta; ajústalos al contrato final del backend.
 * Debe exponer exactamente las mismas funciones que `mockCatalogAdapter`.
 */
export const httpCatalogAdapter = {
  getProducts({ category, brand, query, sort, tag, limit } = {}) {
    return httpGet('/products', { category, brand, q: query, sort, tag, limit })
  },

  getProductBySlug(slug) {
    return httpGet(`/products/${encodeURIComponent(slug)}`)
  },

  getCategories() {
    return httpGet('/categories')
  },

  getBrands() {
    return httpGet('/brands')
  },
}
