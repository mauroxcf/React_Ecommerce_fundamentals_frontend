import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import MainLayout from '@/layouts/MainLayout'

/*
 * Cada página se carga con `lazy` (code splitting): el navegador sólo
 * descarga el código de una página cuando el usuario la visita.
 */
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductListPage = lazy(() => import('@/pages/ProductListPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'productos', element: <ProductListPage /> },
      { path: 'categoria/:categorySlug', element: <ProductListPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
