import { Link, useNavigate } from 'react-router'
import { STOCK_BAJO } from '../data/productos.js'

function FilaProducto({ producto, onCambiarStock, onEliminar }) {
  const navigate = useNavigate()
  const stockBajo = producto.stock < STOCK_BAJO

  return (
    // Clic en cualquier parte de la fila abre el detalle del artículo
    <tr
      onClick={() => navigate(`/inventario/${producto.id}`)}
      className={`cursor-pointer border-b border-gray-200 hover:bg-green-50 ${stockBajo ? 'bg-amber-100' : ''}`}
    >
      <td className="p-2">
        <Link to={`/inventario/${producto.id}`} className="font-medium text-green-800 underline">
          {producto.nombre}
        </Link>
      </td>
      <td className="p-2">{producto.marca}</td>
      <td className="p-2">{producto.tipo}</td>
      <td className="p-2 text-right">{producto.stock}</td>
      {/* stopPropagation: los botones no deben abrir el detalle */}
      <td className="p-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-1">
          <button className="boton" onClick={() => onCambiarStock(producto.id, 1)}>+1</button>
          <button className="boton" onClick={() => onCambiarStock(producto.id, -1)}>-1</button>
          <button className="boton bg-red-700 hover:bg-red-800" onClick={() => onEliminar(producto)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default FilaProducto
