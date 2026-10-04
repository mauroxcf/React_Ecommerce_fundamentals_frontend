/**
 * Busca una categoría (departamento o subcategoría) en el árbol.
 * Devuelve { category, parent } o null si no existe.
 *
 * findCategoryBySlug(tree, 'snacks')
 *   -> { category: { name: 'Snacks', ... }, parent: { name: 'Alimentos y bebidas', ... } }
 */
export function findCategoryBySlug(categoryTree, slug) {
  if (!categoryTree || !slug) return null

  for (const department of categoryTree) {
    if (department.slug === slug) return { category: department, parent: null }

    const child = department.children.find((category) => category.slug === slug)
    if (child) return { category: child, parent: department }
  }

  return null
}
