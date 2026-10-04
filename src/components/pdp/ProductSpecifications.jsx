/** Tabla de especificaciones técnicas (nombre / valor). */
export default function ProductSpecifications({ specifications, brandName, sellerName }) {
  const rows = [{ name: 'Marca', value: brandName }, ...specifications, { name: 'Vendedor', value: sellerName }]

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-xl font-bold">Especificaciones</h2>
      <dl className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm sm:grid-cols-3">
            <dt className="font-medium text-gray-600">{row.name}</dt>
            <dd className="text-gray-900 sm:col-span-2">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
