import { useState } from 'react'
import CampoFormulario from '../components/CampoFormulario.jsx'
import useFormulario from '../hooks/useFormulario.js'
import { validarContacto } from '../utils/validaciones.js'

const formularioVacio = { nombre: '', correo: '', mensaje: '' }

function Contactanos() {
  const [enviado, setEnviado] = useState(false)
  // Mismo hook que FormularioProducto; la confirmación se oculta al empezar un mensaje nuevo
  const { valores, errores, cambiar, enviar } = useFormulario(formularioVacio, validarContacto, {
    alCambiar: () => setEnviado(false),
  })

  return (
    <section className="space-y-4">
      <h2 className="titulo">Contáctanos</h2>
      <ul className="tarjeta space-y-1">
        <li><strong>Dirección:</strong> Av. Principal 123, Santiago</li>
        <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
        <li><strong>Correo:</strong> contacto@superinventario.cl</li>
        <li><strong>Horario:</strong> Lunes a domingo, 8:00 a 22:00</li>
      </ul>

      <form noValidate onSubmit={enviar(() => setEnviado(true))} className="tarjeta grid max-w-md gap-4">
        <CampoFormulario
          etiqueta="Nombre"
          id="contacto-nombre"
          name="nombre"
          maxLength={60}
          value={valores.nombre}
          onChange={cambiar}
          error={errores.nombre}
        />
        <CampoFormulario
          etiqueta="Correo"
          id="contacto-correo"
          name="correo"
          type="email"
          value={valores.correo}
          onChange={cambiar}
          error={errores.correo}
        />
        <CampoFormulario etiqueta="Mensaje" id="contacto-mensaje" error={errores.mensaje}>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            rows="4"
            className="campo"
            value={valores.mensaje}
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
