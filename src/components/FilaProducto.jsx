import { STOCK_BAJO } from '../data/productos.js'

function FilaProducto({ producto, onCambiarStock, onEliminar }) {
  const stockBajo = producto.stock < STOCK_BAJO

  return (
    <tr className={`border-b border-gray-200 ${stockBajo ? 'bg-amber-100' : ''}`}>
      <td className="p-2">{producto.nombre}</td>
      <td className="p-2">{producto.marca}</td>
      <td className="p-2">{producto.tipo}</td>
      <td className="p-2 text-right">{producto.stock}</td>
      <td className="p-2">
        <div className="flex gap-1">
          <button className="boton" onClick={() => onCambiarStock(producto.id, 1)}>+1</button>
          <button className="boton" onClick={() => onCambiarStock(producto.id, -1)}>-1</button>
          <button className="boton bg-red-700 hover:bg-red-800" onClick={() => onEliminar(producto.id)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default FilaProducto
