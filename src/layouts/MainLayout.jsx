import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageLoader from '@/components/ui/PageLoader'

/**
 * Estructura común a todas las páginas: navbar + contenido + footer.
 * <Outlet /> es donde React Router pinta la página activa.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
