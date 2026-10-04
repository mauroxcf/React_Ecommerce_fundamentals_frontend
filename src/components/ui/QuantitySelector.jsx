import { MinusIcon, PlusIcon } from './icons'

/**
 * Selector de cantidad [-] 2 [+].
 * Es "controlado": el valor y el cambio los maneja el componente padre.
 */
export default function QuantitySelector({ value, onChange, min = 1, max, label = 'Cantidad' }) {
  const canDecrease = value > min
  const canIncrease = max === undefined || value < max

  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={!canDecrease}
        className="p-2.5 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Disminuir cantidad"
      >
        <MinusIcon className="size-4" />
      </button>
      <span className="min-w-10 text-center font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={!canIncrease}
        className="p-2.5 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Aumentar cantidad"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}
