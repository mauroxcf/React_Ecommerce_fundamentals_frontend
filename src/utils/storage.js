/**
 * Helpers seguros para localStorage: si el navegador lo bloquea (modo
 * incógnito, cuota llena...) la app sigue funcionando sin romperse.
 */
export function readFromStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Si no se puede guardar, simplemente se ignora.
  }
}
