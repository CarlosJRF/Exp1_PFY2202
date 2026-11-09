import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import InventarioProvider from './context/InventarioProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </BrowserRouter>
  </StrictMode>,
)
