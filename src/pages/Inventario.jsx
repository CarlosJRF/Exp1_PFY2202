import TablaInventario from '../components/TablaInventario.jsx'
import useInventario from '../hooks/useInventario.js'
import { STOCK_BAJO } from '../data/productos.js'

function Inventario() {
  const { productos, cambiarStock, eliminarProducto } = useInventario()

  return (
    <section className="space-y-4">
      <h2 className="titulo">Inventario</h2>
      <p>Artículos disponibles actualmente: {productos.length}.</p>

      <TablaInventario
        productos={productos}
        onCambiarStock={cambiarStock}
        onEliminar={eliminarProducto}
      />

      <p className="text-sm text-gray-600">
        Las filas resaltadas tienen menos de {STOCK_BAJO} unidades.
      </p>
    </section>
  )
}

export default Inventario
