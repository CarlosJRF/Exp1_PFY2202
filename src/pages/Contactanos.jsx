import { useState } from 'react'

function Contactanos() {
  const [enviado, setEnviado] = useState(false)

  const enviarFormulario = (e) => {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }

  return (
    <section>
      <h2>Contáctanos</h2>
      <ul className="datos-contacto">
        <li><strong>Dirección:</strong> Av. Principal 123, Santiago</li>
        <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
        <li><strong>Correo:</strong> contacto@superinventario.cl</li>
        <li><strong>Horario:</strong> Lunes a domingo, 8:00 a 22:00</li>
      </ul>

      <form className="formulario columna" onSubmit={enviarFormulario}>
        <input name="nombre" placeholder="Tu nombre" required />
        <input name="correo" type="email" placeholder="Tu correo" required />
        <textarea name="mensaje" rows="4" placeholder="Tu mensaje" required />
        <button type="submit">Enviar</button>
      </form>

      {enviado && <p className="exito">¡Gracias! Hemos recibido tu mensaje.</p>}
    </section>
  )
}

export default Contactanos
