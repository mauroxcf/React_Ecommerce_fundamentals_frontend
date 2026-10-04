import { ROUTES } from '@/app/routes'
import BenefitsBar from '@/components/home/BenefitsBar'
import BrandStrip from '@/components/home/BrandStrip'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HeroBanner from '@/components/home/HeroBanner'
import PromoBanner from '@/components/home/PromoBanner'

/**
 * Home: sólo ORDENA secciones. Cada sección es un componente independiente
 * que carga sus propios datos, así agregar o quitar una es una sola línea.
 */
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <BenefitsBar />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner
        title="Semana de la tecnología"
        description="Hasta 25% de descuento en televisores, celulares y audio."
        linkTo={ROUTES.category('tecnologia')}
        linkLabel="Ver tecnología"
      />
      <BrandStrip />
    </>
  )
}
