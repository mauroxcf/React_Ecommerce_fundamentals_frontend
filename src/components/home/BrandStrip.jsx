import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { useBrands } from '@/hooks/useCatalog'
import SectionHeader from '@/components/ui/SectionHeader'

/** Listado de marcas: cada una lleva a la PLP filtrada por esa marca. */
export default function BrandStrip() {
  const { data: brands } = useBrands()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader title="Nuestras marcas" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {brands?.map((brand) => (
          <li key={brand.id}>
            <Link
              to={`${ROUTES.productList()}?marca=${brand.slug}`}
              className="flex h-16 items-center justify-center rounded-xl border border-gray-200 bg-white font-bold text-gray-700 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
