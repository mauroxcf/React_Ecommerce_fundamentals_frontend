import { useMockData } from '@/config/env'
import { mockCatalogAdapter } from './adapters/mockCatalogAdapter'
import { httpCatalogAdapter } from './adapters/httpCatalogAdapter'
import { mapProduct } from './mappers/productMapper'

/**
 * Punto ÚNICO de acceso a los datos del catálogo.
 *
 * Los hooks llaman a estas funciones y no saben (ni les importa) si los
 * datos vienen del mock o del backend. Para cambiar de fuente basta con
 * definir VITE_API_BASE_URL en el archivo .env.
 */
const adapter = useMockData ? mockCatalogAdapter : httpCatalogAdapter

/**
 * @param {{ category?: string, brand?: string, query?: string, sort?: string, tag?: string, limit?: number }} filters
 */
export async function getProducts(filters = {}) {
  const rawProducts = await adapter.getProducts(filters)
  return rawProducts.map(mapProduct)
}

export function getFeaturedProducts(limit = 8) {
  return getProducts({ tag: 'featured', limit })
}

export async function getProductBySlug(slug) {
  const rawProduct = await adapter.getProductBySlug(slug)
  return rawProduct ? mapProduct(rawProduct) : null
}

/** Productos de la misma categoría, excluyendo el producto actual. */
export async function getRelatedProducts(product, limit = 4) {
  const products = await getProducts({ category: product.categoryId })
  return products.filter((item) => item.id !== product.id).slice(0, limit)
}

// Categorías y marcas casi nunca cambian: se piden una sola vez y se
// reutiliza la misma promesa (caché en memoria).
let categoriesPromise
let brandsPromise

export function getCategories() {
  categoriesPromise ??= adapter.getCategories().catch((error) => {
    categoriesPromise = undefined // permite reintentar si falló
    throw error
  })
  return categoriesPromise
}

export function getBrands() {
  brandsPromise ??= adapter.getBrands().catch((error) => {
    brandsPromise = undefined
    throw error
  })
  return brandsPromise
}
