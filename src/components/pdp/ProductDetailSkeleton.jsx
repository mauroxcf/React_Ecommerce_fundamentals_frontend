/** Esqueleto de la PDP mientras carga el producto. */
export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse gap-8 px-4 py-6 md:grid-cols-2" aria-hidden="true">
      <div className="aspect-square rounded-2xl bg-gray-200" />
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-8 w-full rounded bg-gray-200" />
        <div className="h-8 w-2/3 rounded bg-gray-200" />
        <div className="h-10 w-40 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-lg bg-gray-200" />
        <div className="h-24 w-full rounded bg-gray-200" />
      </div>
    </div>
  )
}
