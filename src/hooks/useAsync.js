import { useEffect, useState } from 'react'

/**
 * Ejecuta una función asíncrona y expone { data, isLoading, error }.
 * Se vuelve a ejecutar cuando cambia algún valor de `deps`.
 *
 * Nota: si la app crece, este hook se puede reemplazar por TanStack Query
 * (caché, reintentos, etc.) sin tocar los componentes.
 */
export function useAsync(asyncFn, deps) {
  const [state, setState] = useState({ data: null, isLoading: true, error: null })

  useEffect(() => {
    // Evita guardar la respuesta de una petición vieja si el usuario
    // navegó rápido y ya se lanzó otra (condición de carrera).
    let isCurrent = true
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    asyncFn()
      .then((data) => isCurrent && setState({ data, isLoading: false, error: null }))
      .catch((error) => isCurrent && setState({ data: null, isLoading: false, error }))

    return () => {
      isCurrent = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
