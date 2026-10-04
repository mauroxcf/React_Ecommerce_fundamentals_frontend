import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'

/**
 * Banner principal. Se construye sólo con CSS (sin imagen pesada) para que
 * sea lo primero que pinta el navegador (mejor LCP).
 */
export default function HeroBanner() {
  return (
    <section className="bg-linear-to-br from-brand-700 via-brand-600 to-fuchsia-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
        <p className="text-sm font-semibold tracking-widest text-brand-100 uppercase">Nueva temporada</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Todo lo que necesitas, en un solo lugar
        </h1>
        <p className="mt-4 max-w-xl text-base text-brand-100 sm:text-lg">
          Tecnología, alimentos, salud y hogar de tus marcas favoritas con envío a todo el país.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={ROUTES.productList()}
            className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-brand-700 hover:bg-brand-50"
          >
            Ver productos
          </Link>
          <Link
            to={`${ROUTES.productList()}?orden=discount`}
            className="rounded-lg border border-white/60 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
          >
            Ver ofertas
          </Link>
        </div>
      </div>
    </section>
  )
}
