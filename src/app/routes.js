/**
 * Rutas de la tienda en un solo lugar.
 * Usar estas funciones en vez de escribir strings evita links rotos
 * si algún día cambia una URL.
 */
export const ROUTES = {
  home: () => '/',
  productList: () => '/productos',
  category: (categorySlug) => `/categoria/${categorySlug}`,
  productDetail: (slug) => `/producto/${slug}`,
  cart: () => '/carrito',
}
