import { useState } from 'react'

/** Imagen principal + miniaturas para cambiarla. */
export default function ProductGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="flex-1 overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={selectedImage?.url}
          alt={selectedImage?.alt ?? productName}
          width="600"
          height="600"
          // Es la imagen más importante de la página: se carga de inmediato.
          fetchPriority="high"
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex gap-3 md:flex-col">
          {images.map((image, index) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver imagen ${index + 1}`}
                aria-pressed={index === selectedIndex}
                className={`block size-16 overflow-hidden rounded-lg border-2 sm:size-20 ${index === selectedIndex ? 'border-brand-600' : 'border-transparent hover:border-gray-300'}`}
              >
                <img
                  src={image.url}
                  alt=""
                  width="80"
                  height="80"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
