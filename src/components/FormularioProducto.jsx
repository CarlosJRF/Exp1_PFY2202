import { useState } from 'react'
import CampoFormulario from './CampoFormulario.jsx'
import { TIPOS_PRODUCTO } from '../data/productos.js'

const formularioVacio = { nombre: '', marca: '', tipo: '', stock: '' }

function validar(datos) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'Ingresa el nombre del artículo.'
  if (!datos.marca.trim()) errores.marca = 'Ingresa la marca.'
  if (!datos.tipo) errores.tipo = 'Selecciona un tipo de producto.'

  const stock = Number(datos.stock)
  if (datos.stock === '') errores.stock = 'Ingresa el stock.'
  else if (!Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un número entero mayor o igual a 0.'
  }
  return errores
}

// Formulario controlado: cada campo toma su valor del estado "datos"
function FormularioProducto({ onAgregar, onEditar }) {
  const [datos, setDatos] = useState(formularioVacio)
  const [errores, setErrores] = useState({})

  const cambiar = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    onEditar?.()
  }

  const enviar = (e) => {
    e.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onAgregar({
      nombre: datos.nombre.trim(),
      marca: datos.marca.trim(),
      tipo: datos.tipo,
      stock: Number(datos.stock),
    })
    setDatos(formularioVacio)
  }

  return (
    <form noValidate onSubmit={enviar} className="tarjeta grid gap-4 sm:grid-cols-2">
      <CampoFormulario
        etiqueta="Nombre"
        id="nombre"
        name="nombre"
        value={datos.nombre}
        onChange={cambiar}
        error={errores.nombre}
      />
      <CampoFormulario
        etiqueta="Marca"
        id="marca"
        name="marca"
        value={datos.marca}
        onChange={cambiar}
        error={errores.marca}
      />
      <CampoFormulario etiqueta="Tipo de producto" id="tipo" error={errores.tipo}>
        <select id="tipo" name="tipo" className="campo" value={datos.tipo} onChange={cambiar}>
          <option value="">Selecciona…</option>
          {TIPOS_PRODUCTO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </CampoFormulario>
      <CampoFormulario
        etiqueta="Stock (unidades)"
        id="stock"
        name="stock"
        type="number"
        min="0"
        step="1"
        value={datos.stock}
        onChange={cambiar}
        error={errores.stock}
      />
      <button type="submit" className="boton sm:col-span-2">
        Agregar al inventario
      </button>
    </form>
  )
}

export default FormularioProducto
