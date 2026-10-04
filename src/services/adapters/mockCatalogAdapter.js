import { productsMock } from '@/data/mocks/products'
import { categoriesMock } from '@/data/mocks/categories'
import { brandsMock } from '@/data/mocks/brands'

/**
 * Adaptador MOCK: simula las respuestas del backend usando los datos locales.
 * Debe exponer exactamente las mismas funciones que `httpCatalogAdapter`.
 *
 * Todas devuelven Promesas para que el resto de la app ya trabaje de forma
 * asíncrona, igual que lo hará con el backend real.
 */

/** Devuelve el slug de la categoría y el de todas sus subcategorías. */
function getCategoryWithChildren(categorySlug) {
  for (const department of categoriesMock) {
    if (department.slug === categorySlug) {
      return [department.slug, ...department.children.map((child) => child.slug)]
    }
    if (department.children.some((child) => child.slug === categorySlug)) {
      return [categorySlug]
    }
  }
  return []
}

/** "Café" -> "cafe" (minúsculas y sin tildes) para búsquedas más flexibles. */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

const sorters = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'name-asc': (a, b) => a.name.localeCompare(b.name, 'es'),
  discount: (a, b) => b.listPrice - b.price - (a.listPrice - a.price),
}

export const mockCatalogAdapter = {
  async getProducts({ category, brand, query, sort, tag, limit } = {}) {
    let result = productsMock

    if (category) {
      const allowedCategories = getCategoryWithChildren(category)
      result = result.filter((product) => allowedCategories.includes(product.categoryId))
    }

    if (brand) {
      result = result.filter((product) => product.brand.slug === brand)
    }

    if (tag) {
      result = result.filter((product) => product.tags.includes(tag))
    }

    if (query) {
      const search = normalizeText(query)
      result = result.filter((product) =>
        normalizeText(`${product.name} ${product.brand.name}`).includes(search),
      )
    }

    if (sorters[sort]) {
      result = [...result].sort(sorters[sort])
    }

    return limit ? result.slice(0, limit) : result
  },

  async getProductBySlug(slug) {
    return productsMock.find((product) => product.slug === slug) ?? null
  },

  async getCategories() {
    return categoriesMock
  },

  async getBrands() {
    return brandsMock
  },
}
