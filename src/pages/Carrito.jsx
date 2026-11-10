import { Link } from 'react-router'
import TablaCarrito from '../components/TablaCarrito.jsx'
import useInventario from '../hooks/useInventario.js'
import { contar } from '../utils/texto.js'

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
        {contar(unidadesEnCarrito, 'unidad', 'unidades')} en{' '}
        {contar(lineas.length, 'artículo', 'artículos')}. Cada cambio de cantidad se descuenta o se
        devuelve al inventario.
      </p>

      <TablaCarrito
        lineas={lineas}
        onCambiarCantidad={cambiarCantidadCarrito}
        onQuitar={quitarDelCarrito}
      />

      <p className="text-sm text-gray-600">
        “Quitar” devuelve todas las unidades de ese artículo al inventario.
      </p>
    </section>
  )
}

export default Carrito
