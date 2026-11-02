import { useEffect, useState } from 'react'
import { InventarioContext } from './InventarioContext.js'
import { productosIniciales } from '../data/productos.js'

const CLAVE_STORAGE = 'superinventario.productos'

// Lee el inventario guardado; si no hay (o está dañado) usa los datos iniciales
function cargarProductos() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    return guardado ? JSON.parse(guardado) : productosIniciales
  } catch {
    return productosIniciales
  }
}

function InventarioProvider({ children }) {
  const [productos, setProductos] = useState(cargarProductos)

  // Cada vez que cambia la lista, se guarda para que sobreviva a una recarga
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos))
    } catch {
      // Sin acceso a localStorage el inventario solo vive en memoria
    }
  }, [productos])

  const agregarProducto = ({ nombre, marca, tipo, stock }) => {
    const nuevo = { id: crypto.randomUUID(), nombre, marca, tipo, stock }
    setProductos((actuales) => [...actuales, nuevo])
    return nuevo
  }

  const cambiarStock = (id, cantidad) => {
    setProductos((actuales) =>
      actuales.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + cantidad) } : p)),
    )
  }

  const eliminarProducto = (id) => {
    setProductos((actuales) => actuales.filter((p) => p.id !== id))
  }

  const valor = { productos, agregarProducto, cambiarStock, eliminarProducto }

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export default InventarioProvider
