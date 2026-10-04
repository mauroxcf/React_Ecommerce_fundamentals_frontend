import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import PageLoader from '@/components/ui/PageLoader'

/**
 * Estructura común a todas las páginas.
 * <Outlet /> es donde React Router pinta la página activa.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}
