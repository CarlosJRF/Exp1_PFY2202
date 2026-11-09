import { Link } from 'react-router'

function FilaCarrito({ producto, cantidad, onCambiarCantidad, onQuitar }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-2">
        <Link to={`/inventario/${producto.id}`} className="font-medium text-green-800 underline">
          {producto.nombre}
        </Link>
        <span className="block text-sm text-gray-600">{producto.marca}</span>
      </td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <button
            className="boton disabled:cursor-not-allowed disabled:opacity-40"
            disabled={cantidad <= 1}
            onClick={() => onCambiarCantidad(producto.id, -1)}
            aria-label={`Disminuir ${producto.nombre}`}
          >
            −
          </button>
          <span className="w-8 text-center font-bold">{cantidad}</span>
          <button
            className="boton disabled:cursor-not-allowed disabled:opacity-40"
            disabled={producto.stock < 1}
            onClick={() => onCambiarCantidad(producto.id, 1)}
            aria-label={`Aumentar ${producto.nombre}`}
          >
            +
          </button>
        </div>
      </td>
      <td className="p-2 text-right">{producto.stock}</td>
      <td className="p-2">
        <button className="boton bg-red-700 hover:bg-red-800" onClick={() => onQuitar(producto.id)}>
          Quitar
        </button>
      </td>
    </tr>
  )
}

export default FilaCarrito
