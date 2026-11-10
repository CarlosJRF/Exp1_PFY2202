import { Link } from 'react-router'

function FilaCarrito({ producto, cantidad, onCambiarCantidad, onQuitar }) {
  return (
    <tr>
      <td>
        <Link to={`/inventario/${producto.id}`} className="font-medium text-green-800 underline">
          {producto.nombre}
        </Link>
        <span className="block text-sm text-gray-600">{producto.marca}</span>
        {/* En celulares el stock disponible se muestra aquí, porque su columna se oculta */}
        <span className="block text-sm text-gray-600 sm:hidden">Disponible: {producto.stock}</span>
      </td>
      <td>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            className="boton"
            disabled={cantidad <= 1}
            onClick={() => onCambiarCantidad(producto.id, -1)}
            aria-label={`Disminuir ${producto.nombre}`}
          >
            −
          </button>
          <span className="w-8 text-center font-bold">{cantidad}</span>
          <button
            className="boton"
            disabled={producto.stock < 1}
            onClick={() => onCambiarCantidad(producto.id, 1)}
            aria-label={`Aumentar ${producto.nombre}`}
          >
            +
          </button>
        </div>
      </td>
      <td className="hidden text-right sm:table-cell">{producto.stock}</td>
      <td>
        <button className="boton bg-red-700 hover:bg-red-800" onClick={() => onQuitar(producto.id)}>
          Quitar
        </button>
      </td>
    </tr>
  )
}

export default FilaCarrito
