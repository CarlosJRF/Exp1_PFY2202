import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contactanos from './pages/Contactanos.jsx'
import MenuInferior from './components/MenuInferior.jsx'

function App() {
  return (
    <>
      <header className="cabecera">
        <h1>SuperInventario</h1>
      </header>

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="*" element={<p>Página no encontrada.</p>} />
        </Routes>
      </main>

      <MenuInferior />
    </>
  )
}

export default App
