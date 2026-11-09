import { useState } from 'react'
import { Link, useParams } from 'react-router'
import CampoFormulario from '../components/CampoFormulario.jsx'
import useFormulario from '../hooks/useFormulario.js'
import useInventario from '../hooks/useInventario.js'
import { STOCK_BAJO } from '../data/productos.js'
import { validarCantidad } from '../utils/validaciones.js'

function DetalleArticulo() {
  const { id } = useParams() // el :id de la ruta /inventario/:id
  const { productos, carrito, agregarAlCarrito } = useInventario()
  const [agregado, setAgregado] = useState(null)

  const producto = productos.find((p) => p.id === id)
  const enCarrito = carrito.find((item) => item.productoId === id)?.cantidad ?? 0

  const { valores, errores, cambiar, enviar } = useFormulario(
    { cantidad: '1' },
    (datos) => validarCantidad(datos, producto?.stock ?? 0),
    { alCambiar: () => setAgregado(null) },
  )

  if (!producto) {
    return (
      <section className="tarjeta space-y-4 text-center">
        <h2 className="titulo">Artículo no encontrado</h2>
        <p>El artículo no existe o fue eliminado del inventario.</p>
        <Link to="/inventario" className="boton inline-block">Volver al inventario</Link>
      </section>
    )
  }

  const agregar = ({ cantidad }) => {
    agregarAlCarrito(producto.id, Number(cantidad))
    setAgregado(Number(cantidad))
  }

  return (
    <section className="space-y-4">
      <Link to="/inventario" className="text-sm text-green-800 underline">← Volver al inventario</Link>

      <div className="tarjeta space-y-2">
        <h2 className="titulo">{producto.nombre}</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="font-medium">Marca</dt>
          <dd>{producto.marca}</dd>
          <dt className="font-medium">Tipo</dt>
          <dd>{producto.tipo}</dd>
          <dt className="font-medium">Disponible</dt>
          <dd className={producto.stock < STOCK_BAJO ? 'font-bold text-amber-600' : ''}>
            {producto.stock} unidades
          </dd>
          <dt className="font-medium">En el carrito</dt>
          <dd>{enCarrito} unidades</dd>
        </dl>
      </div>

      {producto.stock > 0 ? (
        <form noValidate onSubmit={enviar(agregar)} className="tarjeta flex flex-wrap items-end gap-4">
          <CampoFormulario
            etiqueta="Cantidad"
            id="cantidad"
            name="cantidad"
            type="number"
            min="1"
            max={producto.stock}
            step="1"
            value={valores.cantidad}
            onChange={cambiar}
            error={errores.cantidad}
          />
          <button type="submit" className="boton">Agregar al carrito</button>
        </form>
      ) : (
        <p className="tarjeta font-medium text-red-700">Sin stock disponible.</p>
      )}

      {agregado && (
        <p className="exito">
          Se agregaron {agregado} unidades al carrito; quedan {producto.stock} en el inventario.{' '}
          <Link to="/carrito" className="underline">Ver carrito</Link>
        </p>
      )}
    </section>
  )
}

export default DetalleArticulo
