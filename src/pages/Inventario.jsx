import { useState } from 'react'
import FiltroTipo from '../components/FiltroTipo.jsx'
import ModalConfirmacion from '../components/ModalConfirmacion.jsx'
import TablaInventario from '../components/TablaInventario.jsx'
import useInventario from '../hooks/useInventario.js'
import { STOCK_BAJO } from '../data/productos.js'

function Inventario() {
  const { productos, carrito, cambiarStock, eliminarProducto } = useInventario()
  const [tipoFiltro, setTipoFiltro] = useState('')
  const [porEliminar, setPorEliminar] = useState(null)

  // Lista derivada: el filtro no modifica el inventario original, solo lo que se muestra
  const productosVisibles = tipoFiltro ? productos.filter((p) => p.tipo === tipoFiltro) : productos
  const enCarrito = porEliminar && carrito.find((item) => item.productoId === porEliminar.id)

  const confirmarEliminar = () => {
    eliminarProducto(porEliminar.id)
    setPorEliminar(null)
  }

  return (
    <section className="space-y-4">
      <h2 className="titulo">Inventario</h2>
      <p>
        Mostrando {productosVisibles.length} de {productos.length} artículos. Haz clic en un
        artículo para ver su detalle y agregarlo al carrito.
      </p>

      <FiltroTipo valor={tipoFiltro} onCambiar={setTipoFiltro} />

      <TablaInventario
        productos={productosVisibles}
        mensajeVacio={
          tipoFiltro ? `No hay artículos de la categoría ${tipoFiltro}.` : 'No hay artículos en el inventario.'
        }
        onCambiarStock={cambiarStock}
        onEliminar={setPorEliminar}
      />

      <p className="text-sm text-gray-600">
        Las filas resaltadas tienen menos de {STOCK_BAJO} unidades.
      </p>

      <ModalConfirmacion
        abierto={porEliminar !== null}
        titulo="¿Eliminar artículo?"
        textoConfirmar="Eliminar"
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      >
        {porEliminar && (
          <>
            <p>
              Se eliminará «{porEliminar.nombre}» ({porEliminar.marca}, {porEliminar.stock} unidades)
              del inventario. Esta acción no se puede deshacer.
            </p>
            {enCarrito && (
              <p className="mt-2 font-medium text-red-700">
                También se quitará del carrito ({enCarrito.cantidad} unidades).
              </p>
            )}
          </>
        )}
      </ModalConfirmacion>
    </section>
  )
}

export default Inventario
