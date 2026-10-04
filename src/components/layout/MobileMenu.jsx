import { useEffect } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { ChevronDownIcon, CloseIcon } from '@/components/ui/icons'
import { useCategories } from '@/hooks/useCatalog'

/**
 * Menú lateral para mobile con el árbol de categorías.
 * El acordeón usa <details>/<summary>: es nativo del navegador,
 * accesible y no necesita estado de React.
 */
export default function MobileMenu({ isOpen, onClose }) {
  const { data: categories } = useCategories()

  // Bloquea el scroll de la página y permite cerrar con Escape.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
      {/* Fondo oscuro: al tocarlo se cierra el menú */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <nav className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <p className="text-lg font-bold">Categorías</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Cerrar menú"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Link
            to={ROUTES.productList()}
            onClick={onClose}
            className="block border-b border-gray-100 px-4 py-3 font-semibold"
          >
            Todos los productos
          </Link>

          {categories?.map((department) => (
            <details key={department.id} className="group border-b border-gray-100">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                {department.name}
                <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="bg-gray-50 pb-2">
                <li>
                  <Link
                    to={ROUTES.category(department.slug)}
                    onClick={onClose}
                    className="block px-8 py-2 text-sm font-semibold text-brand-600"
                  >
                    Ver todo {department.name}
                  </Link>
                </li>
                {department.children.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={ROUTES.category(category.slug)}
                      onClick={onClose}
                      className="block px-8 py-2 text-sm text-gray-700"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </nav>
    </div>
  )
}
