/**
 * Genera una URL de imagen de prueba (placehold.co).
 * Un salto de línea en `text` se convierte en una nueva línea en la imagen.
 * Cuando exista el backend, las imágenes vendrán con URLs reales.
 */
export function placeholderImage(text, { bg = 'e5e7eb', fg = '1f2937', size = 600 } = {}) {
  const label = encodeURIComponent(text.replace(/\n/g, '\\n'))
  return `https://placehold.co/${size}x${size}/${bg}/${fg}/webp?text=${label}&font=roboto`
}
