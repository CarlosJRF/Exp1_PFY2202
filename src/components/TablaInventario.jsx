import FilaProducto from './FilaProducto.jsx'

function TablaInventario({ productos, onCambiarStock, onEliminar }) {
  if (productos.length === 0) {
    return <p className="tarjeta text-gray-600">No hay artículos en el inventario.</p>
  }

  return (
    // overflow-x-auto permite desplazar la tabla en pantallas angostas
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full text-left">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Marca</th>
            <th className="p-2">Tipo</th>
            <th className="p-2 text-right">Stock</th>
            <th className="p-2">Acciones</th>
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
