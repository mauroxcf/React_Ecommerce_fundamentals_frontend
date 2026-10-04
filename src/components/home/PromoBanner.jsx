import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'

/** Banner promocional secundario. Recibe el contenido por props para reutilizarlo. */
export default function PromoBanner({ title, description, linkTo, linkLabel }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-gray-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-gray-300">{description}</p>
        </div>
        <Link
          to={linkTo ?? ROUTES.productList()}
          className="shrink-0 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  )
}
