import { useState } from 'react'

const productosIniciales = [
  { id: 1, nombre: 'Arroz 1 kg', categoria: 'Abarrotes', stock: 40 },
  { id: 2, nombre: 'Leche entera 1 L', categoria: 'Lácteos', stock: 25 },
  { id: 3, nombre: 'Pan amasado', categoria: 'Panadería', stock: 8 },
  { id: 4, nombre: 'Manzana roja', categoria: 'Frutas', stock: 60 },
]

const STOCK_BAJO = 10

function Home() {
  const [productos, setProductos] = useState(productosIniciales)
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [stock, setStock] = useState('')

  const agregarProducto = (e) => {
    e.preventDefault()
    if (!nombre.trim() || stock === '') return

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      categoria: categoria.trim() || 'General',
      stock: Number(stock),
    }
    setProductos([...productos, nuevo])
    setNombre('')
    setCategoria('')
    setStock('')
  }

  const cambiarStock = (id, cantidad) => {
    setProductos(
      productos.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + cantidad) } : p,
      ),
    )
  }

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id))
  }

  return (
    <section>
      <h2>Inventario</h2>
      <p>Administra los productos del supermercado y su stock disponible.</p>

      <form className="formulario" onSubmit={agregarProducto}>
        <input
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className={p.stock < STOCK_BAJO ? 'stock-bajo' : ''}>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.stock}</td>
              <td className="acciones">
                <button onClick={() => cambiarStock(p.id, 1)}>+1</button>
                <button onClick={() => cambiarStock(p.id, -1)}>-1</button>
                <button className="eliminar" onClick={() => eliminarProducto(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="nota">Las filas resaltadas tienen menos de {STOCK_BAJO} unidades.</p>
    </section>
  )
}

export default Home
