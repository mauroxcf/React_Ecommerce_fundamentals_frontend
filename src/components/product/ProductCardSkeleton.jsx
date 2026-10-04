/** Versión "fantasma" de ProductCard que se muestra mientras cargan los datos. */
export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white" aria-hidden="true">
      <div className="aspect-square bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-9 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
