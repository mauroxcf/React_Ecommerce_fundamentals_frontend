import { useId } from 'react'
import { SORT_OPTIONS } from '@/config/sortOptions'

export default function SortSelect({ value, onChange }) {
  const selectId = useId()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={selectId} className="text-sm whitespace-nowrap text-gray-600">
        Ordenar por
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
