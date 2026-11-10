import { useState } from 'react'
import { Link } from 'react-router'
import FormularioProducto from '../components/FormularioProducto.jsx'
import useInventario from '../hooks/useInventario.js'
import { contar } from '../utils/texto.js'

function AgregarArticulo() {
  const { agregarProducto } = useInventario()
  const [ultimoAgregado, setUltimoAgregado] = useState(null)
  const [error, setError] = useState(false)

  // agregarProducto devuelve null si el estado global rechaza los datos;
  // en ese caso se avisa y se devuelve false para que el formulario no se vacíe
  const manejarAgregar = (datos) => {
    const nuevo = agregarProducto(datos)
    setUltimoAgregado(nuevo)
    setError(nuevo === null)
    return nuevo !== null
  }

  const limpiarMensajes = () => {
    setUltimoAgregado(null)
    setError(false)
  }

  return (
    <section className="space-y-4">
      <h2 className="titulo">Agregar artículo</h2>
      <p>Completa todos los campos para ingresar un artículo nuevo al inventario.</p>

      {/* Los mensajes se ocultan al empezar a escribir el siguiente artículo */}
      <FormularioProducto onAgregar={manejarAgregar} onEditar={limpiarMensajes} />

      {ultimoAgregado && (
        <p className="exito">
          Se agregó «{ultimoAgregado.nombre}» ({ultimoAgregado.marca}) con{' '}
          {contar(ultimoAgregado.stock, 'unidad', 'unidades')}.{' '}
          <Link to="/inventario" className="underline">Ver inventario</Link>
        </p>
      )}
      {error && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-red-800">
          No se pudo agregar el artículo: los datos no son válidos. Revisa los campos e inténtalo de nuevo.
        </p>
      )}
    </section>
  )
}

export default AgregarArticulo
