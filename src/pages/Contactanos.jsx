import { useState } from 'react'
import CampoFormulario from '../components/CampoFormulario.jsx'

const formularioVacio = { nombre: '', correo: '', mensaje: '' }

function validar(datos) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'Ingresa tu nombre.'
  if (!datos.correo.trim()) errores.correo = 'Ingresa tu correo.'
  else if (!/^\S+@\S+\.\S+$/.test(datos.correo)) errores.correo = 'El correo no tiene un formato válido.'
  if (!datos.mensaje.trim()) errores.mensaje = 'Escribe tu mensaje.'
  return errores
}

// Formulario controlado, igual que FormularioProducto
function Contactanos() {
  const [datos, setDatos] = useState(formularioVacio)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setEnviado(false) // la confirmación se oculta al empezar un mensaje nuevo
  }

  const enviar = (e) => {
    e.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviado(true)
    setDatos(formularioVacio)
  }

  return (
    <section className="space-y-4">
      <h2 className="titulo">Contáctanos</h2>
      <ul className="tarjeta space-y-1">
        <li><strong>Dirección:</strong> Av. Principal 123, Santiago</li>
        <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
        <li><strong>Correo:</strong> contacto@superinventario.cl</li>
        <li><strong>Horario:</strong> Lunes a domingo, 8:00 a 22:00</li>
      </ul>

      <form noValidate onSubmit={enviar} className="tarjeta grid max-w-md gap-4">
        <CampoFormulario
          etiqueta="Nombre"
          id="contacto-nombre"
          name="nombre"
          value={datos.nombre}
          onChange={cambiar}
          error={errores.nombre}
        />
        <CampoFormulario
          etiqueta="Correo"
          id="contacto-correo"
          name="correo"
          type="email"
          value={datos.correo}
          onChange={cambiar}
          error={errores.correo}
        />
        <CampoFormulario etiqueta="Mensaje" id="contacto-mensaje" error={errores.mensaje}>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            rows="4"
            className="campo"
            value={datos.mensaje}
            onChange={cambiar}
          />
        </CampoFormulario>
        <button type="submit" className="boton">Enviar</button>
      </form>

      {/* El sitio no tiene servidor: se informa que el mensaje no se envía realmente */}
      {enviado && (
        <p className="exito">
          Formulario completado correctamente. Este sitio es una demostración, por lo que el
          mensaje no se envía; para contactarnos usa el teléfono o correo indicados.
        </p>
      )}
    </section>
  )
}

export default Contactanos
