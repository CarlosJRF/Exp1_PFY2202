export const TIPOS_PRODUCTO = [
  'Abarrotes',
  'Lácteos',
  'Panadería',
  'Frutas y verduras',
  'Carnes',
  'Bebidas',
  'Limpieza',
  'Otros',
]

export const STOCK_BAJO = 10

// Todos los ids tienen formato UUID. Los iniciales son fijos para que las pruebas sean predecibles;
// los artículos nuevos reciben uno aleatorio con crypto.randomUUID().
export const productosIniciales = [
  { id: '00000000-0000-4000-8000-000000000001', nombre: 'Arroz grado 1 kg', marca: 'Tucapel', tipo: 'Abarrotes', stock: 40 },
  { id: '00000000-0000-4000-8000-000000000002', nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', stock: 25 },
  { id: '00000000-0000-4000-8000-000000000003', nombre: 'Pan de molde', marca: 'Ideal', tipo: 'Panadería', stock: 8 },
  { id: '00000000-0000-4000-8000-000000000004', nombre: 'Manzana roja 1 kg', marca: 'Granel', tipo: 'Frutas y verduras', stock: 60 },
]
