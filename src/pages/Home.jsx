import { Link } from 'react-router-dom'
import useInventario from '../hooks/useInventario.js'
import { STOCK_BAJO } from '../data/productos.js'

function Home() {
  const { productos } = useInventario()
  const conStockBajo = productos.filter((p) => p.stock < STOCK_BAJO).length

  return (
    <section className="space-y-4">
      <h2 className="titulo">Bienvenido a SuperInventario</h2>
      <p>Administra los artículos del supermercado y su stock disponible.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="tarjeta">
          <p className="text-sm text-gray-600">Artículos en inventario</p>
          <p className="text-3xl font-bold text-green-800">{productos.length}</p>
        </div>
        <div className="tarjeta">
          <p className="text-sm text-gray-600">Con stock bajo (menos de {STOCK_BAJO})</p>
          <p className="text-3xl font-bold text-amber-600">{conStockBajo}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/inventario" className="boton">Ver inventario</Link>
        <Link to="/agregar" className="boton">Agregar artículo</Link>
      </div>
    </section>
  )
}

export default Home
