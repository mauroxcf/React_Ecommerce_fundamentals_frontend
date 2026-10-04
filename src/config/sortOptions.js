/** Opciones de ordenamiento de la PLP. `value` es lo que viaja en la URL (?orden=). */
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'discount', label: 'Mayor descuento' },
]

export const DEFAULT_SORT = 'relevance'
