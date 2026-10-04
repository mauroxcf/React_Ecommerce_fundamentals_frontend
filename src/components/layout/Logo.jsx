import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { STORE_CONFIG } from '@/config/store'

export default function Logo() {
  return (
    <Link to={ROUTES.home()} className="flex shrink-0 items-center gap-2" aria-label="Ir al inicio">
      <img src="/favicon.svg" alt="" width="32" height="32" className="size-8" />
      <span className="hidden text-lg font-extrabold tracking-tight text-gray-900 sm:inline">
        {STORE_CONFIG.name}
      </span>
    </Link>
  )
}
