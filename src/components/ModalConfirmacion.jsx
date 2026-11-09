import { useEffect, useRef } from 'react'

// Ventana modal con el elemento nativo <dialog>: bloquea el resto de la página
// y se cierra con Esc. useRef da acceso al elemento del DOM para abrirlo y cerrarlo.
function ModalConfirmacion({ abierto, titulo, children, textoConfirmar, onConfirmar, onCancelar }) {
  const dialogo = useRef(null)

  useEffect(() => {
    if (abierto) dialogo.current.showModal()
    else dialogo.current.close()
  }, [abierto])

  return (
    <dialog
      ref={dialogo}
      onCancel={(e) => {
        e.preventDefault() // Esc: lo cerramos nosotros para mantener el estado sincronizado
        onCancelar()
      }}
      className="m-auto w-full max-w-sm rounded-lg p-6 shadow-xl backdrop:bg-black/50"
    >
      <h2 className="mb-2 text-lg font-bold">{titulo}</h2>
      <div className="mb-6 text-gray-700">{children}</div>
      <div className="flex justify-end gap-2">
        <button className="boton bg-gray-500 hover:bg-gray-600" onClick={onCancelar}>
          Cancelar
        </button>
        <button className="boton bg-red-700 hover:bg-red-800" onClick={onConfirmar}>
          {textoConfirmar}
        </button>
      </div>
    </dialog>
  )
}

export default ModalConfirmacion
