import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-gray-600">La página que buscas no existe o fue movida.</p>
      <Link
        to={ROUTES.home()}
        className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
