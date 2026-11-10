import CampoFormulario from './CampoFormulario.jsx'
import useFormulario from '../hooks/useFormulario.js'
import { TIPOS_PRODUCTO } from '../data/productos.js'
import { validarProducto } from '../utils/validaciones.js'

const formularioVacio = { nombre: '', marca: '', tipo: '', stock: '' }

function FormularioProducto({ onAgregar, onEditar }) {
  const { valores, errores, cambiar, enviar } = useFormulario(formularioVacio, validarProducto, {
    alCambiar: onEditar,
  })

  // Se devuelve el resultado de onAgregar: false mantiene lo escrito en el formulario
  const agregar = (datos) =>
    onAgregar({
      nombre: datos.nombre.trim(),
      marca: datos.marca.trim(),
      tipo: datos.tipo,
      stock: Number(datos.stock),
    })

  return (
    <form noValidate onSubmit={enviar(agregar)} className="tarjeta grid gap-4 sm:grid-cols-2">
      <CampoFormulario
        etiqueta="Nombre"
        id="nombre"
        name="nombre"
        maxLength={60}
        value={valores.nombre}
        onChange={cambiar}
        error={errores.nombre}
      />
      <CampoFormulario
        etiqueta="Marca"
        id="marca"
        name="marca"
        maxLength={40}
        value={valores.marca}
        onChange={cambiar}
        error={errores.marca}
      />
      <CampoFormulario etiqueta="Tipo de producto" id="tipo" error={errores.tipo}>
        <select id="tipo" name="tipo" className="campo" value={valores.tipo} onChange={cambiar}>
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
        value={valores.stock}
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
