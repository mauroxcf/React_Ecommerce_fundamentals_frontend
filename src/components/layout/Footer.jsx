import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { STORE_CONFIG } from '@/config/store'
import { useCategories } from '@/hooks/useCatalog'

export default function Footer() {
  const { data: categories } = useCategories()

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">{STORE_CONFIG.name}</p>
          <p className="mt-2 text-sm text-gray-600">
            Tecnología, alimentos, salud y hogar en un solo lugar.
          </p>
        </div>

        <div>
          <p className="font-semibold">Categorías</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {categories?.map((department) => (
              <li key={department.id}>
                <Link to={ROUTES.category(department.slug)} className="hover:text-brand-600">
                  {department.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold">Ayuda</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Envíos y entregas</li>
            <li>Cambios y devoluciones</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>servicio@fundamentals.store</li>
            <li>Lunes a sábado, 8:00 a. m. - 6:00 p. m.</li>
          </ul>
        </div>
      </div>

      <p className="border-t border-gray-100 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {STORE_CONFIG.name}. Proyecto de ejemplo con fines educativos.
      </p>
    </footer>
  )
}
