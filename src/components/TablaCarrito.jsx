import FilaCarrito from './FilaCarrito.jsx'

// lineas: [{ productoId, cantidad, producto }]
function TablaCarrito({ lineas, onCambiarCantidad, onQuitar }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>Artículo</th>
            <th>Cantidad</th>
            <th className="hidden text-right sm:table-cell">Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <FilaCarrito
              key={linea.productoId}
              producto={linea.producto}
              cantidad={linea.cantidad}
              onCambiarCantidad={onCambiarCantidad}
              onQuitar={onQuitar}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaCarrito
