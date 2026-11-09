// Reducer: función pura (estado, acción) → nuevo estado.
// Inventario y carrito cambian juntos en una misma acción para que nunca queden desincronizados.

const restarStock = (productos, id, cantidad) =>
  productos.map((p) => (p.id === id ? { ...p, stock: p.stock - cantidad } : p))

export function inventarioReducer(estado, accion) {
  const { productos, carrito } = estado

  switch (accion.tipo) {
    case 'agregar_producto':
      return { ...estado, productos: [...productos, accion.producto] }

    case 'eliminar_producto':
      return {
        productos: productos.filter((p) => p.id !== accion.id),
        carrito: carrito.filter((item) => item.productoId !== accion.id),
      }

    case 'cambiar_stock':
      return {
        ...estado,
        productos: productos.map((p) =>
          p.id === accion.id ? { ...p, stock: Math.max(0, p.stock + accion.cantidad) } : p,
        ),
      }

    case 'agregar_al_carrito': {
      const { id, cantidad } = accion
      const producto = productos.find((p) => p.id === id)
      if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
        return estado
      }
      const enCarrito = carrito.some((item) => item.productoId === id)
      return {
        productos: restarStock(productos, id, cantidad),
        carrito: enCarrito
          ? carrito.map((item) =>
              item.productoId === id ? { ...item, cantidad: item.cantidad + cantidad } : item,
            )
          : [...carrito, { productoId: id, cantidad }],
      }
    }

    // delta = +1 toma una unidad del inventario; delta = -1 la devuelve
    case 'cambiar_cantidad_carrito': {
      const { id, delta } = accion
      const producto = productos.find((p) => p.id === id)
      const item = carrito.find((i) => i.productoId === id)
      if (!producto || !item) return estado
      if (delta > 0 && producto.stock < delta) return estado
      if (item.cantidad + delta < 1) return estado
      return {
        productos: restarStock(productos, id, delta),
        carrito: carrito.map((i) => (i.productoId === id ? { ...i, cantidad: i.cantidad + delta } : i)),
      }
    }

    // Devuelve al inventario todas las unidades de esa línea
    case 'quitar_del_carrito': {
      const item = carrito.find((i) => i.productoId === accion.id)
      if (!item) return estado
      return {
        productos: restarStock(productos, accion.id, -item.cantidad),
        carrito: carrito.filter((i) => i.productoId !== accion.id),
      }
    }

    default:
      return estado
  }
}
