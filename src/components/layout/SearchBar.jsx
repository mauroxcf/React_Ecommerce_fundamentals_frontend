import { useId } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { ROUTES } from '@/app/routes'
import { SearchIcon } from '@/components/ui/icons'

/**
 * Buscador del navbar. Al enviar, lleva a la PLP con ?q=texto.
 * Es un input "no controlado" (sin useState): no re-renderiza en cada tecla.
 */
export default function SearchBar({ className = '' }) {
  const navigate = useNavigate()
  const inputId = useId() // id único: el buscador aparece en mobile y en desktop
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get('q') ?? ''

  function handleSubmit(event) {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q').trim()
    navigate(query ? `${ROUTES.productList()}?q=${encodeURIComponent(query)}` : ROUTES.productList())
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Buscar productos
      </label>
      <input
        // `key` reinicia el input si la búsqueda de la URL cambia
        key={currentQuery}
        id={inputId}
        name="q"
        type="search"
        defaultValue={currentQuery}
        placeholder="Buscar productos o marcas..."
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pr-12 pl-4 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-brand-600 p-2 text-white hover:bg-brand-700"
        aria-label="Buscar"
      >
        <SearchIcon className="size-4" />
      </button>
    </form>
  )
}
