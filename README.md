# SuperInventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **React Router**, HTML, CSS y JavaScript (Vite).

## Páginas

- **Inicio (`/`)**: tabla de inventario donde se pueden agregar productos, ajustar stock y eliminarlos. Resalta productos con stock bajo.
- **Quiénes somos (`/quienes-somos`)**: información, misión, visión y valores del supermercado.
- **Contáctanos (`/contactanos`)**: datos de contacto y formulario.

La navegación se realiza desde un menú inferior fijo usando `NavLink` de React Router.

## Ejecutar

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── main.jsx                  # Monta la app dentro de BrowserRouter
├── App.jsx                   # Define las rutas
├── index.css                 # Estilos
├── components/
│   └── MenuInferior.jsx      # Menú de navegación inferior
└── pages/
    ├── Home.jsx              # Gestión de inventario
    ├── QuienesSomos.jsx
    └── Contactanos.jsx
```
