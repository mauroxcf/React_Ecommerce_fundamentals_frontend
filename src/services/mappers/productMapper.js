import { getDiscountPercentage } from '@/utils/getDiscountPercentage'

/**
 * Convierte un producto "crudo" (como llega del backend o del mock) al
 * modelo que usan los componentes.
 *
 * Si el backend cambia el nombre de un campo, SÓLO se ajusta este archivo.
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} sku
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {{ id: string, name: string, slug: string }} brand
 * @property {string} categoryId
 * @property {{ id: string, name: string }} seller
 * @property {number} price              Precio de venta
 * @property {number} listPrice          Precio "antes" (tachado)
 * @property {number} discountPercentage
 * @property {number} availableQuantity  Unidades en inventario
 * @property {boolean} isAvailable
 * @property {{ url: string, alt: string }[]} images
 * @property {{ name: string, value: string }[]} specifications
 * @property {string[]} tags
 */

/** @returns {Product} */
export function mapProduct(raw) {
  const price = Number(raw.price)
  const listPrice = Number(raw.listPrice ?? raw.price)
  const availableQuantity = Number(raw.availableQuantity ?? 0)

  return {
    id: String(raw.productId),
    sku: raw.sku,
    slug: raw.slug,
    name: raw.name,
    description: raw.description ?? '',
    brand: raw.brand,
    categoryId: raw.categoryId,
    seller: raw.seller,
    price,
    listPrice,
    discountPercentage: getDiscountPercentage(listPrice, price),
    availableQuantity,
    isAvailable: availableQuantity > 0,
    images: (raw.images ?? []).map((url, index) => ({
      url,
      alt: index === 0 ? raw.name : `${raw.name} - imagen ${index + 1}`,
    })),
    specifications: Object.entries(raw.specifications ?? {}).map(([name, value]) => ({
      name,
      value,
    })),
    tags: raw.tags ?? [],
  }
}
