import { Link } from 'react-router'
import { ChevronRightIcon } from '@/components/ui/icons'

/** Título de sección con un link opcional "Ver todo" a la derecha. */
export default function SectionHeader({ title, linkTo, linkLabel = 'Ver todo' }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          {linkLabel} <ChevronRightIcon className="size-4" />
        </Link>
      )}
    </div>
  )
}
