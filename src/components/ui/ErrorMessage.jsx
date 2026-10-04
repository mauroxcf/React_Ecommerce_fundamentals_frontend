/** Mensaje genérico cuando falla la carga de datos. */
export default function ErrorMessage({ message = 'Ocurrió un error al cargar la información.' }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-800">
      <p className="font-semibold">{message}</p>
      <p className="mt-1 text-sm">Intenta recargar la página.</p>
    </div>
  )
}
