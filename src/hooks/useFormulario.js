import { useState } from 'react'

// Hook genérico para formularios controlados: guarda los valores y errores,
// actualiza un campo por su "name" y valida antes de entregar los datos.
function useFormulario(valoresIniciales, validar, { alCambiar } = {}) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  const cambiar = (e) => {
    const { name, value } = e.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: undefined }))
    alCambiar?.()
  }

  // Uso: <form onSubmit={enviar((valores) => ...)}>
  // Si alEnviar devuelve false (la acción falló), el formulario conserva lo escrito.
  const enviar = (alEnviar) => (e) => {
    e.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return
    if (alEnviar(valores) === false) return
    setValores(valoresIniciales)
  }

  return { valores, errores, cambiar, enviar }
}

export default useFormulario
