/**
 * Árbol de categorías (departamento -> categorías).
 * Misma idea que el "category tree" de VTEX o las "collections" de Shopify.
 * Se usa para el mega menú y para filtrar la PLP.
 */
export const categoriesMock = [
  {
    id: 'salud',
    name: 'Salud y cuidado personal',
    slug: 'salud',
    children: [
      { id: 'cuidado-oral', name: 'Cuidado oral', slug: 'cuidado-oral' },
      { id: 'cuidado-personal', name: 'Cuidado personal', slug: 'cuidado-personal' },
      { id: 'medicamentos', name: 'Medicamentos', slug: 'medicamentos' },
    ],
  },
  {
    id: 'alimentos',
    name: 'Alimentos y bebidas',
    slug: 'alimentos',
    children: [
      { id: 'snacks', name: 'Snacks', slug: 'snacks' },
      { id: 'bebidas', name: 'Bebidas', slug: 'bebidas' },
      { id: 'desayuno', name: 'Desayuno y café', slug: 'desayuno' },
    ],
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    slug: 'tecnologia',
    children: [
      { id: 'televisores', name: 'Televisores', slug: 'televisores' },
      { id: 'celulares', name: 'Celulares', slug: 'celulares' },
      { id: 'audio', name: 'Audio', slug: 'audio' },
    ],
  },
  {
    id: 'hogar',
    name: 'Hogar',
    slug: 'hogar',
    children: [
      { id: 'electrodomesticos', name: 'Electrodomésticos', slug: 'electrodomesticos' },
      { id: 'limpieza', name: 'Limpieza', slug: 'limpieza' },
    ],
  },
]
