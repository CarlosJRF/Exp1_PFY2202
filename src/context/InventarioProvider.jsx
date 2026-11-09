import { useEffect, useReducer } from 'react'
import { InventarioContext } from './InventarioContext.js'
import { inventarioReducer } from './inventarioReducer.js'
import { cargarEstado, guardarEstado } from '../utils/almacenamiento.js'
import { esProductoValido } from '../utils/validaciones.js'

function InventarioProvider({ children }) {
  // El tercer argumento inicializa el estado una sola vez leyendo localStorage
  const [estado, dispatch] = useReducer(inventarioReducer, undefined, cargarEstado)
  const { productos, carrito } = estado

  // Cada vez que cambia el estado, se guarda para que sobreviva a una recarga
  useEffect(() => {
    guardarEstado(estado)
  }, [estado])

  // Devuelve el artículo creado, o null si los datos no son válidos
  const agregarProducto = ({ nombre, marca, tipo, stock }) => {
    const nuevo = { id: crypto.randomUUID(), nombre, marca, tipo, stock }
    if (!esProductoValido(nuevo)) return null
    dispatch({ tipo: 'agregar_producto', producto: nuevo })
    return nuevo
  }

  const valor = {
    productos,
    carrito,
    unidadesEnCarrito: carrito.reduce((total, item) => total + item.cantidad, 0),
    agregarProducto,
    eliminarProducto: (id) => dispatch({ tipo: 'eliminar_producto', id }),
    cambiarStock: (id, cantidad) => dispatch({ tipo: 'cambiar_stock', id, cantidad }),
    agregarAlCarrito: (id, cantidad) => dispatch({ tipo: 'agregar_al_carrito', id, cantidad }),
    cambiarCantidadCarrito: (id, delta) => dispatch({ tipo: 'cambiar_cantidad_carrito', id, delta }),
    quitarDelCarrito: (id) => dispatch({ tipo: 'quitar_del_carrito', id }),
  }

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export default InventarioProvider
