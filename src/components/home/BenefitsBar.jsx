import { ShieldIcon, StoreIcon, TruckIcon } from '@/components/ui/icons'
import { STORE_CONFIG } from '@/config/store'
import { formatPrice } from '@/utils/formatPrice'

const BENEFITS = [
  {
    icon: TruckIcon,
    title: 'Envío gratis',
    description: `En compras desde ${formatPrice(STORE_CONFIG.freeShippingThreshold)}`,
  },
  { icon: ShieldIcon, title: 'Compra segura', description: 'Tus pagos siempre protegidos' },
  { icon: StoreIcon, title: 'Marcas oficiales', description: 'Productos 100% originales' },
]

export default function BenefitsBar() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <ul className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3">
        {BENEFITS.map(({ icon: BenefitIcon, title, description }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="rounded-full bg-brand-50 p-2.5 text-brand-600">
              <BenefitIcon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
