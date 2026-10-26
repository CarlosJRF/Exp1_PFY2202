import { NavLink } from 'react-router-dom'

function MenuInferior() {
  return (
    <nav className="menu-inferior">
      <NavLink to="/" end>Inicio</NavLink>
      <NavLink to="/quienes-somos">Quiénes somos</NavLink>
      <NavLink to="/contactanos">Contáctanos</NavLink>
    </nav>
  )
}

export default MenuInferior
