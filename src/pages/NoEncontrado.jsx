import { Link, useLocation } from 'react-router'

function NoEncontrado() {
  const { pathname } = useLocation()

  return (
    <section className="tarjeta space-y-4 text-center">
      <p className="text-5xl font-bold text-green-800">404</p>
      <h2 className="titulo">Página no encontrada</h2>
      <p>
        La dirección <code className="rounded bg-gray-100 px-1">{pathname}</code> no existe en el sitio.
      </p>
      <Link to="/" className="boton inline-block">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrado
