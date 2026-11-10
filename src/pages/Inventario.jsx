import { useState } from 'react'
import { useSearchParams } from 'react-router'
import FiltroTipo from '../components/FiltroTipo.jsx'
import ModalConfirmacion from '../components/ModalConfirmacion.jsx'
import TablaInventario from '../components/TablaInventario.jsx'
import useInventario from '../hooks/useInventario.js'
import { STOCK_BAJO, TIPOS_PRODUCTO } from '../data/productos.js'
import { contar } from '../utils/texto.js'

function Inventario() {
  const { productos, carrito, cambiarStock, eliminarProducto } = useInventario()
  const [porEliminar, setPorEliminar] = useState(null)

  // El filtro vive en la URL (/inventario?tipo=Lácteos): se conserva al volver del detalle
  // o al recargar. Un valor que no sea un tipo válido se trata como "Todas".
  const [parametros, setParametros] = useSearchParams()
  const tipoUrl = parametros.get('tipo') ?? ''
  const tipoFiltro = TIPOS_PRODUCTO.includes(tipoUrl) ? tipoUrl : ''

  // replace: cambiar el filtro no agrega entradas al historial del navegador
  const cambiarFiltro = (tipo) => setParametros(tipo ? { tipo } : {}, { replace: true })

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
        Mostrando {productosVisibles.length} de {contar(productos.length, 'artículo', 'artículos')}.
        Haz clic en un artículo para ver su detalle y agregarlo al carrito.
      </p>

      <FiltroTipo valor={tipoFiltro} onCambiar={cambiarFiltro} />

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
              Se eliminará «{porEliminar.nombre}» ({porEliminar.marca}, {contar(porEliminar.stock, 'unidad', 'unidades')})
              del inventario. Esta acción no se puede deshacer.
            </p>
            {enCarrito && (
              <p className="mt-2 font-medium text-red-700">
                También se quitará del carrito ({contar(enCarrito.cantidad, 'unidad', 'unidades')}).
              </p>
            )}
          </>
        )}
      </ModalConfirmacion>
    </section>
  )
}

export default Inventario
