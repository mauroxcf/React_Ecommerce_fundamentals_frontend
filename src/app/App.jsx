import { RouterProvider } from 'react-router'
import { router } from './router'

/**
 * Componente raíz. Aquí se montan los "providers" globales
 * (carrito, sesión, tema...) que envuelven a toda la aplicación.
 */
export default function App() {
  return <RouterProvider router={router} />
}
