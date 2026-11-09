import { useState } from 'react'
import { Link } from 'react-router'
import FormularioProducto from '../components/FormularioProducto.jsx'
import useInventario from '../hooks/useInventario.js'

function AgregarArticulo() {
  const { agregarProducto } = useInventario()
  const [ultimoAgregado, setUltimoAgregado] = useState(null)

  const manejarAgregar = (datos) => {
    setUltimoAgregado(agregarProducto(datos))
  }

  return (
    <section className="space-y-4">
      <h2 className="titulo">Agregar artículo</h2>
      <p>Completa todos los campos para ingresar un artículo nuevo al inventario.</p>

      {/* La confirmación se oculta al empezar a escribir el siguiente artículo */}
      <FormularioProducto onAgregar={manejarAgregar} onEditar={() => setUltimoAgregado(null)} />

      {ultimoAgregado && (
        <p className="exito">
          Se agregó «{ultimoAgregado.nombre}» ({ultimoAgregado.marca}) con {ultimoAgregado.stock}{' '}
          unidades. <Link to="/inventario" className="underline">Ver inventario</Link>
        </p>
      )}
    </section>
  )
}

export default AgregarArticulo
