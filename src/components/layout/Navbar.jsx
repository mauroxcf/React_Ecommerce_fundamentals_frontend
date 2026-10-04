import { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ROUTES } from '@/app/routes'
import { MenuIcon } from '@/components/ui/icons'
import CartButton from './CartButton'
import Logo from './Logo'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar'

const NAV_LINKS = [
  { label: 'Todos los productos', to: ROUTES.productList() },
  { label: 'Tecnología', to: ROUTES.category('tecnologia') },
  { label: 'Alimentos', to: ROUTES.category('alimentos') },
  { label: 'Salud', to: ROUTES.category('salud') },
  { label: 'Ofertas', to: `${ROUTES.productList()}?orden=discount` },
]


/**
 * Barra de navegación (mobile first):
 * - Mobile:  [☰] [logo] .......... [🛒]  +  buscador debajo
 * - Desktop: [logo] [buscador] [🛒]  +  fila con mega menú y links
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const currentUrl = location.pathname + location.search

  // useCallback mantiene la misma función entre renders, así el
  // useEffect de MobileMenu no se vuelve a ejecutar sin necesidad.
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-8">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="-ml-2 rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Abrir menú"
        >
          <MenuIcon />
        </button>

        <Logo />

        <SearchBar className="hidden flex-1 md:block lg:max-w-xl" />

        <div className="ml-auto">
          <CartButton />
        </div>
      </div>

      {/* Buscador en su propia fila para pantallas pequeñas */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Fila de navegación (sólo desktop) */}
      <nav className="hidden border-t border-gray-100 lg:block" aria-label="Principal">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4">
          <MegaMenu />
          {NAV_LINKS.map((link) => {
            // Se compara ruta + query (?orden=...) para distinguir "Ofertas" de "Todos".
            const isActive = currentUrl === link.to
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={isActive ? 'page' : undefined}
                className={`py-3 text-sm font-medium hover:text-brand-600 ${isActive ? 'text-brand-600' : 'text-gray-700'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  )
}
