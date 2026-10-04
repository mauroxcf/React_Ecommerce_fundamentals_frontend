import { Link } from 'react-router'
import { ROUTES } from '@/app/routes'
import { useCategories } from '@/hooks/useCatalog'
import SectionHeader from '@/components/ui/SectionHeader'

// Estilo visual de cada departamento. Si se agrega uno nuevo y no está
// aquí, se usa DEFAULT_STYLE.
const DEPARTMENT_STYLES = {
  salud: { emoji: '🩺', className: 'bg-emerald-50 hover:bg-emerald-100' },
  alimentos: { emoji: '🍪', className: 'bg-amber-50 hover:bg-amber-100' },
  tecnologia: { emoji: '📱', className: 'bg-sky-50 hover:bg-sky-100' },
  hogar: { emoji: '🏠', className: 'bg-rose-50 hover:bg-rose-100' },
}
const DEFAULT_STYLE = { emoji: '🛍️', className: 'bg-gray-100 hover:bg-gray-200' }

export default function CategoryShowcase() {
  const { data: categories } = useCategories()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader title="Compra por categoría" />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories?.map((department) => {
          const style = DEPARTMENT_STYLES[department.slug] ?? DEFAULT_STYLE
          return (
            <li key={department.id}>
              <Link
                to={ROUTES.category(department.slug)}
                className={`flex h-full flex-col gap-2 rounded-xl p-4 transition-colors sm:p-6 ${style.className}`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {style.emoji}
                </span>
                <span className="font-bold text-gray-900">{department.name}</span>
                <span className="text-xs text-gray-600">
                  {department.children.map((child) => child.name).join(' · ')}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
