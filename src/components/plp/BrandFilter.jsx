import { useId } from 'react'
import { useBrands } from '@/hooks/useCatalog'

/** Filtro de marca: se puede elegir una marca o "Todas". */
export default function BrandFilter({ activeBrand, onChange }) {
  const { data: brands } = useBrands()
  const groupName = useId() // nombre único: el filtro se pinta en mobile y en desktop

  return (
    <fieldset>
      <legend className="mb-2 font-semibold">Marcas</legend>
      <div className="space-y-1">
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-50">
          <input
            type="radio"
            name={groupName}
            checked={!activeBrand}
            onChange={() => onChange(null)}
            className="accent-brand-600"
          />
          Todas
        </label>
        {brands?.map((brand) => (
          <label
            key={brand.id}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-50"
          >
            <input
              type="radio"
              name={groupName}
              checked={activeBrand === brand.slug}
              onChange={() => onChange(brand.slug)}
              className="accent-brand-600"
            />
            {brand.name}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
