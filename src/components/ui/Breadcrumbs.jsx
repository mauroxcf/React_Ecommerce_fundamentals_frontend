import { Link } from 'react-router'
import { ChevronRightIcon } from './icons'

/**
 * Migas de pan. El último elemento es la página actual (sin link).
 * items: [{ label: 'Inicio', to: '/' }, { label: 'Snacks' }]
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-brand-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="line-clamp-1 text-gray-900">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRightIcon className="size-3.5 shrink-0" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
