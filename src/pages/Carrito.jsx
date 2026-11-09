import { Link } from 'react-router'
import FilaCarrito from '../components/FilaCarrito.jsx'
import useInventario from '../hooks/useInventario.js'

function Carrito() {
  const { productos, carrito, unidadesEnCarrito, cambiarCantidadCarrito, quitarDelCarrito } =
    useInventario()

  // El carrito solo guarda { productoId, cantidad }; nombre, marca y stock se leen del inventario
  const lineas = carrito.map((item) => ({
    ...item,
    producto: productos.find((p) => p.id === item.productoId),
  }))

  if (lineas.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="titulo">Carrito</h2>
        <div className="tarjeta space-y-4">
          <p className="text-gray-600">Tu carrito está vacío.</p>
          <Link to="/inventario" className="boton inline-block">Ir al inventario</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <h2 className="titulo">Carrito</h2>
      <p>
        {unidadesEnCarrito} unidades en {lineas.length} artículos. Cada cambio de cantidad se
        descuenta o se devuelve al inventario.
      </p>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2">Artículo</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2 text-right">Disponible</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lineas.map((linea) => (
              <FilaCarrito
                key={linea.productoId}
                producto={linea.producto}
                cantidad={linea.cantidad}
                onCambiarCantidad={cambiarCantidadCarrito}
                onQuitar={quitarDelCarrito}
              />
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600">
        “Quitar” devuelve todas las unidades de ese artículo al inventario.
      </p>
    </section>
  )
}

export default Carrito
