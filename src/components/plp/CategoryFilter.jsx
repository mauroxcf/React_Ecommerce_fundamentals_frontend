import { Link, useLocation } from 'react-router'
import { ROUTES } from '@/app/routes'
import { useCategories } from '@/hooks/useCatalog'

const linkClass = (isActive) =>
  `block rounded-md px-2 py-1 text-sm ${isActive ? 'bg-brand-50 font-semibold text-brand-700' : 'text-gray-700 hover:text-brand-600'}`

/**
 * Árbol de categorías como filtro. Al cambiar de categoría se conservan
 * los demás filtros (marca, orden, búsqueda) gracias a `location.search`.
 */
export default function CategoryFilter({ activeSlug }) {
  const { data: categories } = useCategories()
  const { search } = useLocation()

  return (
    <div>
      <h3 className="mb-2 font-semibold">Categorías</h3>
      <ul className="space-y-1">
        <li>
          <Link to={ROUTES.productList() + search} className={linkClass(!activeSlug)}>
            Todas
          </Link>
        </li>
        {categories?.map((department) => (
          <li key={department.id}>
            <Link
              to={ROUTES.category(department.slug) + search}
              className={linkClass(activeSlug === department.slug)}
            >
              {department.name}
            </Link>
            <ul className="ml-3 border-l border-gray-200 pl-2">
              {department.children.map((category) => (
                <li key={category.id}>
                  <Link
                    to={ROUTES.category(category.slug) + search}
                    className={linkClass(activeSlug === category.slug)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
