import { Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import Inventario from './pages/Inventario.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contactanos from './pages/Contactanos.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<AgregarArticulo />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/inventario/:id" element={<DetalleArticulo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
