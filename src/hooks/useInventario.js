import { useContext } from 'react'
import { InventarioContext } from '../context/InventarioContext.js'

// Hook personalizado: da acceso al estado global del inventario desde cualquier componente
function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) {
    throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  }
  return contexto
}

export default useInventario
