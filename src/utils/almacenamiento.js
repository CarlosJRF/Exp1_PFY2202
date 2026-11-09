import { productosIniciales } from '../data/productos.js'
import { esProductoValido, REGEX_UUID } from './validaciones.js'

// La versión va en la clave: si cambia la estructura guardada, se crea una clave nueva
// y se migra la anterior en vez de leer datos con un formato que ya no corresponde.
const VERSION = 2
const CLAVE = `superinventario.v${VERSION}`
const CLAVE_V1 = 'superinventario.productos' // v1: arreglo de productos, ids "inicial-N"

const estadoPorDefecto = () => ({ productos: productosIniciales, carrito: [] })

// Descarta productos inválidos y líneas de carrito que no apunten a un producto existente
function sanear({ productos, carrito }) {
  const productosValidos = Array.isArray(productos) ? productos.filter(esProductoValido) : []
  const ids = new Set(productosValidos.map((p) => p.id))
  const carritoValido = Array.isArray(carrito)
    ? carrito.filter(
        (item) => ids.has(item?.productoId) && Number.isInteger(item.cantidad) && item.cantidad > 0,
      )
    : []
  return { productos: productosValidos, carrito: carritoValido }
}

// v1 → v2: los ids "inicial-N" pasan al UUID fijo del producto inicial N;
// cualquier otro id que no sea UUID recibe uno nuevo para no perder el artículo.
function migrarDesdeV1(productosV1) {
  const productos = productosV1.map((p) => {
    const inicial = /^inicial-(\d+)$/.exec(p?.id)
    let id = p?.id
    if (inicial) id = productosIniciales[Number(inicial[1]) - 1]?.id ?? crypto.randomUUID()
    else if (typeof id !== 'string' || !REGEX_UUID.test(id)) id = crypto.randomUUID()
    return { ...p, id }
  })
  return sanear({ productos, carrito: [] })
}

export function cargarEstado() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) {
      const datos = JSON.parse(guardado)
      if (datos?.version === VERSION && Array.isArray(datos.productos)) return sanear(datos)
      return estadoPorDefecto() // estructura desconocida o alterada
    }

    const antiguo = localStorage.getItem(CLAVE_V1)
    if (antiguo) {
      const productosV1 = JSON.parse(antiguo)
      if (Array.isArray(productosV1)) return migrarDesdeV1(productosV1)
    }
  } catch {
    // JSON dañado o localStorage bloqueado: se parte de los datos iniciales
  }
  return estadoPorDefecto()
}

export function guardarEstado({ productos, carrito }) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ version: VERSION, productos, carrito }))
    localStorage.removeItem(CLAVE_V1) // ya migrado
  } catch {
    // Sin acceso a localStorage el inventario solo vive en memoria
  }
}
