import { Link, NavLink } from 'react-router-dom'

// NavLink entrega isActive para resaltar la página actual
const claseEnlace = ({ isActive }) =>
  `rounded px-3 py-1.5 text-sm font-medium ${
    isActive ? 'bg-white text-green-800' : 'text-green-50 hover:bg-green-700'
  }`

function Cabecera() {
  return (
    <header className="bg-green-800 text-white shadow">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-xl font-bold">
          SuperInventario
        </Link>
        {/* Menú de gestión del inventario */}
        <nav className="flex gap-2">
          <NavLink to="/inventario" className={claseEnlace}>
            Inventario
          </NavLink>
          <NavLink to="/agregar" className={claseEnlace}>
            Agregar artículo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Cabecera
