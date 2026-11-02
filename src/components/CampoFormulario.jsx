// Etiqueta + control + mensaje de error; lo usan todos los formularios del sitio.
// "children" permite pasar un <select> o <textarea> en lugar del <input> por defecto.
function CampoFormulario({ etiqueta, id, error, children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {etiqueta}
      </label>
      {children ?? <input id={id} className="campo" {...props} />}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}

export default CampoFormulario
