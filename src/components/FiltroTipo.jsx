import { TIPOS_PRODUCTO } from '../data/productos.js'

function FiltroTipo({ valor, onCambiar }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="filtro-tipo" className="text-sm font-medium">
        Filtrar por categoría:
      </label>
      <select
        id="filtro-tipo"
        className="campo"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
      >
        <option value="">Todas</option>
        {TIPOS_PRODUCTO.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FiltroTipo
