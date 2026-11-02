import { NavLink } from 'react-router-dom'

const claseEnlace = ({ isActive }) =>
  `flex-1 py-4 text-center ${
    isActive ? 'border-t-4 border-green-800 font-bold text-green-800' : 'text-gray-600'
  }`

function MenuInferior() {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-gray-300 bg-white">
      <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
      <NavLink to="/quienes-somos" className={claseEnlace}>Quiénes somos</NavLink>
      <NavLink to="/contactanos" className={claseEnlace}>Contáctanos</NavLink>
    </nav>
  )
}

export default MenuInferior
