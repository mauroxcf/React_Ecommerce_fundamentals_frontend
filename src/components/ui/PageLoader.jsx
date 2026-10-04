/** Indicador de carga a pantalla completa (mientras llega el código de una página). */
export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status">
      <span className="size-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
