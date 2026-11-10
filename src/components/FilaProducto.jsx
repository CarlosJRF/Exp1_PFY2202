import { Link, useLocation, useNavigate } from 'react-router'
import { STOCK_BAJO } from '../data/productos.js'

// Detiene el clic para que no llegue a la fila (evita navegar dos veces o abrir el detalle)
const detener = (e) => e.stopPropagation()

function FilaProducto({ producto, onCambiarStock, onEliminar }) {
  const navigate = useNavigate()
  // Se envía el filtro actual (?tipo=...) para que "Volver al inventario" lo conserve
  const estado = { filtro: useLocation().search }
  const stockBajo = producto.stock < STOCK_BAJO

  return (
    // Clic en cualquier parte de la fila abre el detalle del artículo
    <tr
      onClick={() => navigate(`/inventario/${producto.id}`, { state: estado })}
      className={`cursor-pointer hover:bg-green-50 ${stockBajo ? 'bg-amber-100' : ''}`}
    >
      <td>
        <Link
          to={`/inventario/${producto.id}`}
          state={estado}
          onClick={detener}
          className="font-medium text-green-800 underline"
        >
          {producto.nombre}
        </Link>
        {/* En celulares la marca se muestra bajo el nombre, porque su columna se oculta */}
        <span className="block text-sm text-gray-600 sm:hidden">{producto.marca}</span>
      </td>
      <td className="hidden sm:table-cell">{producto.marca}</td>
      <td className="hidden sm:table-cell">{producto.tipo}</td>
      <td className="text-right">{producto.stock}</td>
      <td onClick={detener}>
        <div className="flex flex-wrap gap-1">
          <button className="boton" onClick={() => onCambiarStock(producto.id, 1)}>+1</button>
          <button
            className="boton"
            disabled={producto.stock === 0}
            onClick={() => onCambiarStock(producto.id, -1)}
          >
            -1
          </button>
          <button className="boton bg-red-700 hover:bg-red-800" onClick={() => onEliminar(producto)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default FilaProducto
