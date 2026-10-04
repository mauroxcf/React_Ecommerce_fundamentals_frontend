/**
 * Configuración leída de las variables de entorno (archivo .env).
 * Centralizarla aquí evita usar import.meta.env por todo el proyecto.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
}

/** true cuando no hay backend configurado y se usan los mocks locales. */
export const useMockData = !env.apiBaseUrl
