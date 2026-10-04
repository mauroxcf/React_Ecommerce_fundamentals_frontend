import { env } from '@/config/env'

/**
 * Pequeño wrapper sobre fetch para hablar con el backend.
 * Centraliza la URL base, los headers y el manejo de errores.
 */
export async function httpGet(path, params = {}) {
  const url = new URL(`${env.apiBaseUrl}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url, { headers: { Accept: 'application/json' } })

  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${url.pathname}`)
  }

  return response.json()
}
