import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { ChevronDownIcon, ChevronRightIcon } from '@/components/ui/icons'
import { useBrands, useCategories } from '@/hooks/useCatalog'

/**
 * Mega menú de categorías (sólo desktop).
 * Se abre con hover o clic y se cierra con Escape, clic afuera o al navegar.
 */
export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const { data: categories } = useCategories()
  const { data: brands } = useBrands()

  const closeMenu = () => setIsOpen(false)

  // Con mouse el menú se abre/cierra con hover. En touch o teclado se usa el clic.
  function handlePointerEnter(event) {
    if (event.pointerType === 'mouse') setIsOpen(true)
  }
  function handlePointerLeave(event) {
    if (event.pointerType === 'mouse') setIsOpen(false)
  }
  function handleClick(event) {
    if (event.nativeEvent.pointerType === 'mouse') return // ya se abrió con hover
    setIsOpen((open) => !open)
  }

  // Los listeners globales sólo existen mientras el menú está abierto.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-controls="mega-menu-panel"
        className="flex items-center gap-1 py-3 font-semibold text-gray-900 hover:text-brand-600"
      >
        Categorías
        <ChevronDownIcon className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* El panel se posiciona respecto al <header> (que es "sticky"). */}
      {isOpen && (
        <div
          id="mega-menu-panel"
          className="absolute inset-x-0 top-full border-t border-gray-200 bg-white shadow-xl"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8 px-4 py-8">
            {categories?.map((department) => (
              <div key={department.id}>
                <Link
                  to={ROUTES.category(department.slug)}
                  onClick={closeMenu}
                  className="font-bold text-gray-900 hover:text-brand-600"
                >
                  {department.name}
                </Link>
                <ul className="mt-3 space-y-2">
                  {department.children.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={ROUTES.category(category.slug)}
                        onClick={closeMenu}
                        className="text-sm text-gray-600 hover:text-brand-600"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={ROUTES.category(department.slug)}
                      onClick={closeMenu}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600"
                    >
                      Ver todo <ChevronRightIcon className="size-3.5" />
                    </Link>
                  </li>
                </ul>
              </div>
            ))}

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="font-bold text-gray-900">Marcas</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {brands?.map((brand) => (
                  <li key={brand.id}>
                    <Link
                      to={`${ROUTES.productList()}?marca=${brand.slug}`}
                      onClick={closeMenu}
                      className="text-sm text-gray-600 hover:text-brand-600"
                    >
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
