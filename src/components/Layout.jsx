import { Outlet } from 'react-router-dom'
import Cabecera from './Cabecera.jsx'
import MenuInferior from './MenuInferior.jsx'

// Estructura común a todas las páginas; <Outlet /> muestra la página de la ruta actual
function Layout() {
  return (
    <>
      <Cabecera />
      {/* pb-24 deja espacio para que el menú inferior fijo no tape el contenido */}
      <main className="mx-auto max-w-4xl px-4 pt-6 pb-24">
        <Outlet />
      </main>
      <MenuInferior />
    </>
  )
}

export default Layout
