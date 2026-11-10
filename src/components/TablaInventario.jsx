import FilaProducto from './FilaProducto.jsx'

function TablaInventario({ productos, mensajeVacio, onCambiarStock, onEliminar }) {
  if (productos.length === 0) {
    return <p className="tarjeta text-gray-600">{mensajeVacio}</p>
  }

  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            {/* hidden sm:table-cell: columna oculta en celulares, visible desde 640 px */}
            <th className="hidden sm:table-cell">Marca</th>
            <th className="hidden sm:table-cell">Tipo</th>
            <th className="text-right">Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <FilaProducto
              key={p.id}
              producto={p}
              onCambiarStock={onCambiarStock}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaInventario
